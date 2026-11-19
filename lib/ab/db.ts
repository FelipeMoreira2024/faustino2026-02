import "server-only";
import postgres from "postgres";
import { evaluateAutomaticWinner, evaluatePlannedWinner } from "@/lib/ab/stats";
import { landingCatalog } from "@/lib/ab/catalog";
import { probeLanding } from "@/lib/ab/probe";
import { HOME_HOST, landingContentKey } from "@/lib/ab/urls";
import type { ExperimentMode, ExperimentPlan, Exposure, LeadStage, PublicExperimentConfig } from "@/lib/ab/types";

const DAY_MS = 86_400_000;
const revision = process.env.VERCEL_GIT_COMMIT_SHA || process.env.VERCEL_DEPLOYMENT_ID || null;

let client: ReturnType<typeof postgres> | null | undefined;

export function getDatabase() {
  if (process.env.VERCEL_ENV !== "production") return null;
  if (client !== undefined) return client;
  const connectionString = process.env.DATABASE_URL || process.env.POSTGRES_URL;
  client = connectionString
    ? postgres(connectionString, { max: 5, idle_timeout: 20, connect_timeout: 10 })
    : null;
  return client;
}

export function databaseConfigured() {
  return Boolean(process.env.DATABASE_URL || process.env.POSTGRES_URL);
}

export async function getPublicExperimentConfig(): Promise<PublicExperimentConfig> {
  const sql = getDatabase();
  if (!sql) return { experiment: null, publications: [] };
  await finalizeExpiredExperiments();
  const [active, publications] = await Promise.all([
    sql<NonNullable<PublicExperimentConfig["experiment"]>[]>`
      SELECT e.id, e.baseline_page_id AS "baselinePageId", e.challenger_page_id AS "challengerPageId",
        e.baseline_allocation AS "baselineAllocation", e.ends_at AS "endsAt", e.plan IS NOT NULL AS "measureLeads",
        json_build_object('host', ep.host, 'path', ep.path) AS entry,
        json_build_object('host', bp.host, 'path', bp.path) AS baseline,
        json_build_object('host', cp.host, 'path', cp.path) AS challenger
      FROM ab_experiments e
      JOIN ab_pages ep ON ep.id = e.entry_page_id AND ep.available
      JOIN ab_pages bp ON bp.id = e.baseline_page_id AND bp.available
      JOIN ab_pages cp ON cp.id = e.challenger_page_id AND cp.available
      WHERE e.status = 'active' AND (e.ends_at IS NULL OR e.ends_at > now())
        AND (e.plan->>'revision' IS NULL OR e.plan->>'revision' = ${revision})
    `,
    sql<PublicExperimentConfig["publications"]>`
      SELECT json_build_object('host', ep.host, 'path', ep.path) AS entry,
        json_build_object('host', p.host, 'path', p.path) AS page
      FROM ab_publications pub
      JOIN ab_pages ep ON ep.id = pub.entry_page_id AND ep.available
      JOIN ab_pages p ON p.id = pub.page_id AND p.available
    `,
  ]);
  return { experiment: active[0] ?? null, publications };
}

export async function recordVisit(payload: Exposure) {
  const sql = getDatabase();
  if (!sql) return null;
  return sql.begin(async (transaction) => {
    const active = await transaction<{ id: string }[]>`
      SELECT e.id FROM ab_experiments e
      JOIN ab_pages ep ON ep.id = e.entry_page_id AND ep.available
      JOIN ab_pages bp ON bp.id = e.baseline_page_id AND bp.available
      JOIN ab_pages cp ON cp.id = e.challenger_page_id AND cp.available
      WHERE e.id = ${payload.experimentId} AND e.status = 'active'
        AND (e.ends_at IS NULL OR e.ends_at > now())
        AND (e.plan->>'revision' IS NULL OR e.plan->>'revision' = ${revision})
        AND ep.host = ${payload.entryHost} AND ep.path = ${payload.entryPath}
        AND (CASE WHEN ${payload.variant} = 'a' THEN e.baseline_page_id ELSE e.challenger_page_id END) = ${payload.pageId}
      FOR SHARE OF e
    `;
    if (!active[0]) return null;
    await transaction`
      INSERT INTO ab_participants (id, experiment_id, page_id, variant, contact_reference)
      VALUES (${payload.participantId}, ${payload.experimentId}, ${payload.pageId}, ${payload.variant}, ${payload.contactReference ?? null})
      ON CONFLICT (experiment_id, id) DO NOTHING
    `;
    await transaction`SELECT id FROM ab_participants WHERE experiment_id = ${payload.experimentId} AND id = ${payload.participantId} FOR UPDATE`;
    const existing = await transaction<{ id: string }[]>`
      SELECT id FROM ab_sessions
      WHERE experiment_id = ${payload.experimentId}
        AND participant_id = ${payload.participantId}
        AND last_seen_at >= now() - interval '30 minutes'
      ORDER BY last_seen_at DESC LIMIT 1 FOR UPDATE
    `;
    if (existing[0]) {
      await transaction`UPDATE ab_sessions SET last_seen_at = now() WHERE id = ${existing[0].id}`;
      return existing[0].id;
    }
    const created = await transaction<{ id: string }[]>`
      INSERT INTO ab_sessions (experiment_id, participant_id, page_id, variant)
      VALUES (${payload.experimentId}, ${payload.participantId}, ${payload.pageId}, ${payload.variant})
      RETURNING id
    `;
    return created[0]?.id ?? null;
  });
}

export async function recordConversion(sessionId: string, experimentId: string, participantId: string) {
  const sql = getDatabase();
  if (!sql) return false;
  return sql.begin(async (transaction) => {
    const active = await transaction`SELECT id FROM ab_experiments WHERE id = ${experimentId} AND status = 'active' FOR SHARE`;
    if (!active[0]) return false;
    const updated = await transaction<{ id: string }[]>`
      UPDATE ab_sessions s SET converted_at = COALESCE(s.converted_at, now()), last_seen_at = now()
      FROM ab_experiments e
      WHERE s.id = ${sessionId}
        AND s.experiment_id = ${experimentId}
        AND s.participant_id = ${participantId}
        AND e.id = s.experiment_id
        AND e.status = 'active'
        AND (e.ends_at IS NULL OR e.ends_at > now())
        AND (e.plan->>'revision' IS NULL OR e.plan->>'revision' = ${revision})
        AND s.last_seen_at >= now() - interval '30 minutes'
      RETURNING s.id
    `;
    return Boolean(updated[0]);
  });
}

export async function recordLead(reference: string, stage: LeadStage) {
  const sql = getDatabase();
  if (!sql) throw new Error("Banco de dados não configurado.");
  return sql.begin(async (transaction) => {
    const [participant] = await transaction<{ id: string; experiment_id: string }[]>`
      SELECT p.id, p.experiment_id FROM ab_participants p
      JOIN ab_experiments e ON e.id = p.experiment_id
      WHERE p.contact_reference = ${reference} AND e.status IN ('active', 'paused')
        AND now() <= p.created_at + (e.plan->>'attributionDays')::int * interval '24 hours'
      FOR SHARE OF e
    `;
    if (!participant) return false;
    await transaction`
      UPDATE ab_participants SET
        contacted_at = COALESCE(contacted_at, now()),
        qualified_at = CASE WHEN ${stage} = 'qualified' THEN COALESCE(qualified_at, now()) ELSE qualified_at END
      WHERE experiment_id = ${participant.experiment_id} AND id = ${participant.id}
    `;
    return true;
  });
}

type ExperimentMetrics = {
  baseline_participants: number;
  challenger_participants: number;
  baseline_visits: number;
  challenger_visits: number;
  baseline_conversions: number;
  challenger_conversions: number;
  baseline_clicking_browsers: number;
  challenger_clicking_browsers: number;
  baseline_conversations: number;
  challenger_conversations: number;
  baseline_qualified: number;
  challenger_qualified: number;
};

function metricsQuery(sql: postgres.Sql | postgres.TransactionSql, experimentId: string | postgres.Fragment) {
  return sql<ExperimentMetrics[]>`
    SELECT
      count(DISTINCT s.participant_id) FILTER (WHERE s.variant = 'a')::int AS baseline_participants,
      count(DISTINCT s.participant_id) FILTER (WHERE s.variant = 'b')::int AS challenger_participants,
      count(*) FILTER (WHERE s.variant = 'a')::int AS baseline_visits,
      count(*) FILTER (WHERE s.variant = 'b')::int AS challenger_visits,
      count(*) FILTER (WHERE s.variant = 'a' AND s.converted_at IS NOT NULL)::int AS baseline_conversions,
      count(*) FILTER (WHERE s.variant = 'b' AND s.converted_at IS NOT NULL)::int AS challenger_conversions,
      count(DISTINCT s.participant_id) FILTER (WHERE s.variant = 'a' AND s.converted_at IS NOT NULL)::int AS baseline_clicking_browsers,
      count(DISTINCT s.participant_id) FILTER (WHERE s.variant = 'b' AND s.converted_at IS NOT NULL)::int AS challenger_clicking_browsers,
      count(DISTINCT s.participant_id) FILTER (WHERE s.variant = 'a' AND p.contacted_at IS NOT NULL)::int AS baseline_conversations,
      count(DISTINCT s.participant_id) FILTER (WHERE s.variant = 'b' AND p.contacted_at IS NOT NULL)::int AS challenger_conversations,
      count(DISTINCT s.participant_id) FILTER (WHERE s.variant = 'a' AND p.qualified_at IS NOT NULL)::int AS baseline_qualified,
      count(DISTINCT s.participant_id) FILTER (WHERE s.variant = 'b' AND p.qualified_at IS NOT NULL)::int AS challenger_qualified
    FROM ab_sessions s
    JOIN ab_participants p ON (p.experiment_id, p.id) = (s.experiment_id, s.participant_id)
    WHERE s.experiment_id = ${experimentId}
  `;
}

function plannedResult(plan: ExperimentPlan, metrics: ExperimentMetrics) {
  return evaluatePlannedWinner(plan, {
    browsers: metrics.baseline_participants,
    outcomes: plan.metric === "qualified_lead" ? metrics.baseline_qualified : metrics.baseline_clicking_browsers,
  }, {
    browsers: metrics.challenger_participants,
    outcomes: plan.metric === "qualified_lead" ? metrics.challenger_qualified : metrics.challenger_clicking_browsers,
  });
}

async function participantResults(sql: postgres.TransactionSql, experimentId: string, variant: "a" | "b") {
  return sql<{ visits: number; conversions: number }[]>`
    SELECT count(*)::int AS visits,
      count(*) FILTER (WHERE converted_at IS NOT NULL)::int AS conversions
    FROM ab_sessions
    WHERE experiment_id = ${experimentId} AND variant = ${variant}
    GROUP BY participant_id
    ORDER BY participant_id
  `;
}

export async function endExperiment(
  experimentId: string,
  options: { decisionType: "manual"; winnerPageId: string } | { decisionType: "automatic" }
) {
  const sql = getDatabase();
  if (!sql) throw new Error("Banco de dados não configurado.");
  return sql.begin(async (transaction) => {
    const rows = await transaction<{
      id: string;
      entry_page_id: string;
      baseline_page_id: string;
      challenger_page_id: string;
      mode: string;
      status: string;
      ends_at: Date | null;
      plan: ExperimentPlan | null;
    }[]>`SELECT id, entry_page_id, baseline_page_id, challenger_page_id, mode, status, ends_at, plan FROM ab_experiments WHERE id = ${experimentId} FOR UPDATE`;
    const experiment = rows[0];
    if (!experiment) throw new Error("Teste não encontrado.");
    if (!["active", "paused"].includes(experiment.status)) return { status: experiment.status };
    const { plan } = experiment;
    const decisionAt = experiment.ends_at && experiment.ends_at.getTime() + (plan?.attributionDays ?? 0) * DAY_MS;
    if (options.decisionType === "automatic" && (experiment.mode !== "automatic" || !decisionAt || decisionAt > Date.now())) {
      throw new Error("A avaliação automática só pode ocorrer após o prazo definido.");
    }
    if (options.decisionType === "automatic" && experiment.status !== "active") {
      return { status: experiment.status };
    }

    if (plan && options.decisionType === "manual" && (!decisionAt || decisionAt > Date.now() || experiment.status === "paused")) {
      throw new Error("Aguarde o fim da coleta e da janela de qualificação antes de publicar uma vencedora.");
    }
    const [finalMetrics] = await metricsQuery(transaction, experimentId);

    let winnerPageId: string | null = null;
    let status: "completed" | "inconclusive" = "completed";
    let details: { outcome?: string; reason?: string; lower?: number; upper?: number } = {};
    if (plan?.revision && plan.revision !== revision) {
      if (options.decisionType === "manual") throw new Error("O deploy mudou durante o teste. Encerre a rodada sem vencedora.");
      status = "inconclusive";
      details = { outcome: "inconclusive", reason: "revision_changed" };
    } else if (plan) {
      const result = plannedResult(plan, finalMetrics);
      details = result;
      if (result.outcome === "baseline") winnerPageId = experiment.baseline_page_id;
      else if (result.outcome === "challenger") winnerPageId = experiment.challenger_page_id;
      else status = "inconclusive";
      if (options.decisionType === "manual" && winnerPageId !== options.winnerPageId) {
        throw new Error("A página selecionada ainda não atende aos critérios definidos no plano do teste.");
      }
    } else if (options.decisionType === "manual") {
      if (![experiment.baseline_page_id, experiment.challenger_page_id].includes(options.winnerPageId)) {
        throw new Error("A página escolhida não pertence ao teste.");
      }
      winnerPageId = options.winnerPageId;
    } else {
      const [baseline, challenger] = await Promise.all([
        participantResults(transaction, experimentId, "a"),
        participantResults(transaction, experimentId, "b"),
      ]);
      const result = evaluateAutomaticWinner(experimentId, baseline, challenger);
      details = result;
      if (result.outcome === "baseline") winnerPageId = experiment.baseline_page_id;
      else if (result.outcome === "challenger") winnerPageId = experiment.challenger_page_id;
      else {
        status = "inconclusive";
      }
    }

    if (winnerPageId) {
      const publishedPage = await transaction`SELECT id FROM ab_pages WHERE id = ${winnerPageId} AND available FOR SHARE`;
      if (!publishedPage.length) {
        if (options.decisionType === "manual") throw new Error("A página escolhida está indisponível.");
        status = "inconclusive";
        details = { outcome: "inconclusive", reason: "page_unavailable" };
        winnerPageId = null;
      }
    }

    const updated = await transaction<{ id: string }[]>`
      UPDATE ab_experiments SET status = ${status}, ended_at = now(),
        winner_page_id = ${winnerPageId}, decision_type = ${options.decisionType},
        decision_details = ${transaction.json(details)},
        final_metrics = ${transaction.json(finalMetrics)}
      WHERE id = ${experimentId} AND status IN ('active', 'paused')
      RETURNING id
    `;
    if (!updated[0]) throw new Error("O teste foi encerrado por outra solicitação.");
    if (winnerPageId) await setPublication(transaction, experiment.entry_page_id, winnerPageId);
    return { status, winnerPageId, details };
  });
}

export async function controlExperiment(experimentId: string, action: "pause" | "resume" | "cancel") {
  const sql = getDatabase();
  if (!sql) throw new Error("Banco de dados não configurado.");
  return sql.begin(async (transaction) => {
    const rows = await transaction<{ status: string; paused_at: Date | null; ends_at: Date | null; plan: ExperimentPlan | null }[]>`
      SELECT status, paused_at, ends_at, plan FROM ab_experiments WHERE id = ${experimentId} FOR UPDATE
    `;
    const experiment = rows[0];
    if (!experiment) throw new Error("Teste não encontrado.");

    if (action === "pause") {
      if (experiment.status !== "active") throw new Error("Somente um teste ativo pode ser pausado.");
      if (experiment.ends_at && experiment.ends_at.getTime() <= Date.now()) throw new Error("O teste já atingiu o prazo.");
      await transaction`UPDATE ab_experiments SET status = 'paused', paused_at = now() WHERE id = ${experimentId}`;
      return { status: "paused" as const };
    }
    if (action === "resume") {
      if (experiment.status !== "paused" || !experiment.paused_at) throw new Error("Somente um teste pausado pode ser retomado.");
      if (experiment.plan?.revision && experiment.plan.revision !== revision) throw new Error("O deploy mudou durante o teste. Encerre a rodada sem vencedora.");
      await transaction`
        UPDATE ab_experiments SET status = 'active',
          ends_at = CASE WHEN ends_at IS NULL THEN NULL ELSE ends_at + (now() - paused_at) END,
          paused_at = NULL
        WHERE id = ${experimentId}
      `;
      return { status: "active" as const };
    }
    if (!['active', 'paused'].includes(experiment.status)) throw new Error("Este teste já foi encerrado.");
    const [metrics] = await metricsQuery(transaction, experimentId);
    await transaction`
      UPDATE ab_experiments SET status = 'cancelled', ended_at = now(), paused_at = NULL,
        winner_page_id = NULL, decision_type = 'manual',
        decision_details = ${transaction.json({ reason: "stopped_without_winner" })},
        final_metrics = ${transaction.json(metrics)}
      WHERE id = ${experimentId}
    `;
    return { status: "cancelled" as const };
  });
}

export async function finalizeExpiredExperiments(cleanup = false) {
  const sql = getDatabase();
  if (!sql) return;
  const expired = await sql<{ id: string }[]>`
    SELECT id FROM ab_experiments
    WHERE status = 'active' AND mode = 'automatic'
      AND ends_at + COALESCE((plan->>'attributionDays')::int, 0) * interval '24 hours' <= now()
    LIMIT 1
  `;
  if (expired[0]) {
    try {
      await endExperiment(expired[0].id, { decisionType: "automatic" });
    } catch (error) {
      if (!(error instanceof Error) || !error.message.includes("outra solicitação")) throw error;
    }
  }
  if (cleanup) {
    await sql`
      DELETE FROM ab_sessions s USING ab_experiments e
      WHERE s.experiment_id = e.id AND e.ended_at < now() - interval '90 days'
    `;
    await sql`
      DELETE FROM ab_participants p USING ab_experiments e
      WHERE p.experiment_id = e.id AND e.ended_at < now() - interval '90 days'
    `;
  }
}

export async function getAdminDashboard() {
  const sql = getDatabase();
  if (!sql) throw new Error("Banco de dados não configurado.");
  await finalizeExpiredExperiments();
  const [pages, experiments, current] = await Promise.all([
    sql`SELECT id, name, host, path, available FROM ab_pages ORDER BY host, name`,
    sql`
      SELECT e.id, e.name, e.mode, e.status, e.started_at, e.ends_at, e.ended_at, e.plan, e.baseline_allocation,
        e.ends_at + COALESCE((e.plan->>'attributionDays')::int, 0) * interval '24 hours' AS decision_at,
        e.plan->>'revision' IS NOT NULL AND e.plan->>'revision' IS DISTINCT FROM ${revision} AS revision_changed,
        e.baseline_page_id, bp.name AS baseline_name, bp.path AS baseline_path,
        e.challenger_page_id, cp.name AS challenger_name, cp.path AS challenger_path,
        e.winner_page_id, wp.name AS winner_name, e.decision_type, e.decision_details,
        e.entry_page_id, ep.host AS entry_host, ep.path AS entry_path, bp.host AS baseline_host, cp.host AS challenger_host,
        CASE WHEN e.status IN ('active', 'paused') THEN to_jsonb(live) ELSE e.final_metrics END AS metrics
      FROM ab_experiments e
      JOIN ab_pages bp ON bp.id = e.baseline_page_id
      JOIN ab_pages cp ON cp.id = e.challenger_page_id
      JOIN ab_pages ep ON ep.id = e.entry_page_id
      LEFT JOIN ab_pages wp ON wp.id = e.winner_page_id
      LEFT JOIN LATERAL (${metricsQuery(sql, sql`e.id`)}) live ON e.status IN ('active', 'paused')
      ORDER BY e.created_at DESC
    `,
    sql`SELECT entry_page_id, page_id FROM ab_publications`,
  ]);
  return {
    pages,
    experiments: experiments.map(({ metrics, ...experiment }) => ({ ...experiment, ...metrics })),
    publications: current,
  };
}

export async function addPage(name: string, host: string, path: string) {
  const sql = getDatabase();
  if (!sql) throw new Error("Banco de dados não configurado.");
  const rows = await sql`
    INSERT INTO ab_pages (name, host, path) VALUES (${name}, ${host}, ${path})
    ON CONFLICT (host, path) DO UPDATE SET name = excluded.name, available = true
    RETURNING id, name, host, path
  `;
  return rows[0];
}

export async function startExperiment(input: {
  name: string;
  baselinePageId: string;
  challengerPageId: string;
  mode: ExperimentMode;
  durationDays: number;
  plan: Omit<ExperimentPlan, "revision">;
}) {
  const sql = getDatabase();
  if (!sql) throw new Error("Banco de dados não configurado.");
  await finalizeExpiredExperiments();
  return sql.begin(async (transaction) => {
    const pages = await transaction<{ id: string; host: string; path: string }[]>`
      SELECT id, host, path FROM ab_pages WHERE id IN (${input.baselinePageId}, ${input.challengerPageId})
        AND available ORDER BY id FOR SHARE
    `;
    const [first, second] = pages;
    if (!second || landingContentKey(first.host, first.path) === landingContentKey(second.host, second.path)) {
      throw new Error("Escolha duas landings disponíveis com conteúdos diferentes.");
    }
    const endsAt = new Date(Date.now() + input.durationDays * DAY_MS);
    const rows = await transaction`
      INSERT INTO ab_experiments
        (name, entry_page_id, baseline_page_id, challenger_page_id, mode, ends_at, plan)
      VALUES (${input.name}, ${input.baselinePageId}, ${input.baselinePageId}, ${input.challengerPageId}, ${input.mode}, ${endsAt},
        ${transaction.json({ ...input.plan, revision })})
      RETURNING id
    `;
    return rows[0];
  });
}

async function setPublication(transaction: postgres.TransactionSql, entryId: string, pageId: string) {
  if (entryId === pageId) {
    await transaction`DELETE FROM ab_publications WHERE entry_page_id = ${entryId}`;
  } else {
    await transaction`
      INSERT INTO ab_publications (entry_page_id, page_id) VALUES (${entryId}, ${pageId})
      ON CONFLICT (entry_page_id) DO UPDATE SET page_id = excluded.page_id
    `;
  }
  await transaction`
    UPDATE ab_settings SET value = ${pageId}, updated_at = now()
    WHERE key = 'current_home_page_id' AND EXISTS (
      SELECT 1 FROM ab_pages WHERE id = ${entryId} AND host = ${HOME_HOST} AND path = '/'
    )
  `;
}

export async function restorePublication(entryId: string) {
  const sql = getDatabase();
  if (!sql) throw new Error("Banco de dados não configurado.");
  await sql.begin(async (transaction) => {
    const entry = await transaction`SELECT id FROM ab_pages WHERE id = ${entryId} FOR UPDATE`;
    if (!entry.length) throw new Error("URL de entrada não encontrada.");
    const running = await transaction`
      SELECT id FROM ab_experiments WHERE entry_page_id = ${entryId} AND status IN ('active', 'paused')
    `;
    if (running.length) throw new Error("Encerre o teste desta URL antes de restaurar a página.");
    await setPublication(transaction, entryId, entryId);
  });
}

export async function syncLandingCatalog() {
  const sql = getDatabase();
  if (!sql) throw new Error("Banco de dados não configurado.");
  await sql.begin(async (transaction) => {
    await transaction`
      INSERT INTO ab_pages (host, path, name, discovered)
      SELECT host, path, name, true FROM jsonb_to_recordset(${transaction.json(landingCatalog)}::jsonb)
        AS catalog(host text, path text, name text)
      ORDER BY host, path
      ON CONFLICT (host, path) DO UPDATE SET available = true, discovered = true
      WHERE NOT ab_pages.available OR NOT ab_pages.discovered
    `;
    await transaction`
      UPDATE ab_pages p SET available = false WHERE discovered AND available AND NOT EXISTS (
        SELECT 1 FROM jsonb_to_recordset(${transaction.json(landingCatalog)}::jsonb) AS catalog(host text, path text)
        WHERE catalog.host = p.host AND catalog.path = p.path
      )
    `;
  });
  const manual = await sql<{ id: string; host: string; path: string; available: boolean }[]>`
    SELECT id, host, path, available FROM ab_pages WHERE NOT discovered ORDER BY created_at
  `;
  for (let offset = 0; offset < manual.length; offset += 8) {
    await Promise.all(manual.slice(offset, offset + 8).map(async (page) => {
      const probe = await probeLanding(page);
      if (probe === "unverified" || page.available === (probe === "available")) return;
      await sql`UPDATE ab_pages SET available = ${probe === "available"} WHERE id = ${page.id} AND NOT discovered`;
    }));
  }
}
