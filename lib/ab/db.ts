import "server-only";
import postgres from "postgres";
import { evaluateAutomaticWinner } from "@/lib/ab/stats";
import type { PublicExperimentConfig } from "@/lib/ab/types";

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
  if (!sql) return { experiment: null, permanentPath: "/" };

  await finalizeExpiredExperiments();
  const active = await sql<{
    id: string;
    baseline_page_id: string;
    baseline_path: string;
    challenger_page_id: string;
    challenger_path: string;
    baseline_allocation: number;
    ends_at: Date | null;
  }[]>`
    SELECT e.id, e.baseline_page_id, bp.path AS baseline_path,
      e.challenger_page_id, cp.path AS challenger_path,
      e.baseline_allocation, e.ends_at
    FROM ab_experiments e
    JOIN ab_pages bp ON bp.id = e.baseline_page_id
    JOIN ab_pages cp ON cp.id = e.challenger_page_id
    WHERE e.status = 'active'
    LIMIT 1
  `;
  const permanent = await sql<{ path: string }[]>`
    SELECT p.path FROM ab_settings s
    JOIN ab_pages p ON p.id::text = s.value
    WHERE s.key = 'current_home_page_id'
    LIMIT 1
  `;
  const row = active[0];
  return {
    experiment: row
      ? {
          id: row.id,
          baselinePageId: row.baseline_page_id,
          baselinePath: row.baseline_path,
          challengerPageId: row.challenger_page_id,
          challengerPath: row.challenger_path,
          baselineAllocation: row.baseline_allocation,
          endsAt: row.ends_at?.toISOString() ?? null,
        }
      : null,
    permanentPath: permanent[0]?.path ?? "/",
  };
}

export async function recordVisit(payload: {
  experimentId: string;
  participantId: string;
  pageId: string;
  variant: "a" | "b";
}) {
  const sql = getDatabase();
  if (!sql) return null;
  return sql.begin(async (transaction) => {
    const active = await transaction<{ id: string }[]>`
      SELECT id FROM ab_experiments
      WHERE id = ${payload.experimentId} AND status = 'active'
        AND (ends_at IS NULL OR ends_at > now())
      FOR SHARE
    `;
    if (!active[0]) return null;
    await transaction`
      INSERT INTO ab_participants (id, experiment_id, page_id, variant)
      VALUES (${payload.participantId}, ${payload.experimentId}, ${payload.pageId}, ${payload.variant})
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
      AND s.last_seen_at >= now() - interval '30 minutes'
    RETURNING s.id
  `;
  return Boolean(updated[0]);
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
    baseline_page_id: string;
    challenger_page_id: string;
    mode: string;
    status: string;
    ends_at: Date | null;
  }[]>`SELECT id, baseline_page_id, challenger_page_id, mode, status, ends_at FROM ab_experiments WHERE id = ${experimentId} FOR UPDATE`;
  const experiment = rows[0];
  if (!experiment) throw new Error("Teste não encontrado.");
  if (experiment.status !== "active") return { status: experiment.status };
  if (options.decisionType === "automatic" && (experiment.mode !== "automatic" || !experiment.ends_at || experiment.ends_at.getTime() > Date.now())) {
    throw new Error("A avaliação automática só pode ocorrer após o prazo definido.");
  }

  const metricRows = await transaction<{
    baseline_visits: number;
    baseline_conversions: number;
    challenger_visits: number;
    challenger_conversions: number;
  }[]>`
    SELECT
      count(*) FILTER (WHERE variant = 'a')::int AS baseline_visits,
      count(*) FILTER (WHERE variant = 'a' AND converted_at IS NOT NULL)::int AS baseline_conversions,
      count(*) FILTER (WHERE variant = 'b')::int AS challenger_visits,
      count(*) FILTER (WHERE variant = 'b' AND converted_at IS NOT NULL)::int AS challenger_conversions
    FROM ab_sessions WHERE experiment_id = ${experimentId}
  `;
  const finalMetrics = metricRows[0] ?? {
    baseline_visits: 0,
    baseline_conversions: 0,
    challenger_visits: 0,
    challenger_conversions: 0,
  };

  let winnerPageId: string | null = null;
  let status: "completed" | "inconclusive" = "completed";
  let details: { outcome?: string; reason?: string; lower?: number; upper?: number } = {};
  if (options.decisionType === "manual") {
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
      winnerPageId = experiment.baseline_page_id;
    }
  }

    const updated = await transaction<{ id: string }[]>`
      UPDATE ab_experiments SET status = ${status}, ended_at = now(),
        winner_page_id = ${winnerPageId}, decision_type = ${options.decisionType},
        decision_details = ${transaction.json(details)},
        final_metrics = ${transaction.json(finalMetrics)}
      WHERE id = ${experimentId} AND status = 'active'
      RETURNING id
    `;
    if (!updated[0]) throw new Error("O teste foi encerrado por outra solicitação.");
    await transaction`
      INSERT INTO ab_settings (key, value, updated_at)
      VALUES ('current_home_page_id', ${winnerPageId}, now())
      ON CONFLICT (key) DO UPDATE SET value = excluded.value, updated_at = now()
    `;
  return { status, winnerPageId, details };
  });
}

export async function finalizeExpiredExperiments(cleanup = false) {
  const sql = getDatabase();
  if (!sql) return;
  const expired = await sql<{ id: string }[]>`
    SELECT id FROM ab_experiments
    WHERE status = 'active' AND mode = 'automatic' AND ends_at <= now()
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
    sql`SELECT id, name, path, created_at FROM ab_pages ORDER BY created_at`,
    sql`
      SELECT e.id, e.name, e.mode, e.status, e.started_at, e.ends_at, e.ended_at,
        e.baseline_page_id, bp.name AS baseline_name, bp.path AS baseline_path,
        e.challenger_page_id, cp.name AS challenger_name, cp.path AS challenger_path,
        e.winner_page_id, wp.name AS winner_name, e.decision_type, e.decision_details,
        (CASE WHEN e.status = 'active' THEN count(s.id) FILTER (WHERE s.variant = 'a') ELSE COALESCE((e.final_metrics->>'baseline_visits')::bigint, 0) END)::int AS baseline_visits,
        (CASE WHEN e.status = 'active' THEN count(s.id) FILTER (WHERE s.variant = 'a' AND s.converted_at IS NOT NULL) ELSE COALESCE((e.final_metrics->>'baseline_conversions')::bigint, 0) END)::int AS baseline_conversions,
        (CASE WHEN e.status = 'active' THEN count(s.id) FILTER (WHERE s.variant = 'b') ELSE COALESCE((e.final_metrics->>'challenger_visits')::bigint, 0) END)::int AS challenger_visits,
        (CASE WHEN e.status = 'active' THEN count(s.id) FILTER (WHERE s.variant = 'b' AND s.converted_at IS NOT NULL) ELSE COALESCE((e.final_metrics->>'challenger_conversions')::bigint, 0) END)::int AS challenger_conversions
      FROM ab_experiments e
      JOIN ab_pages bp ON bp.id = e.baseline_page_id
      JOIN ab_pages cp ON cp.id = e.challenger_page_id
      LEFT JOIN ab_pages wp ON wp.id = e.winner_page_id
      LEFT JOIN ab_sessions s ON s.experiment_id = e.id
      GROUP BY e.id, bp.name, bp.path, cp.name, cp.path, wp.name
      ORDER BY e.created_at DESC
    `,
    sql`SELECT value FROM ab_settings WHERE key = 'current_home_page_id'`,
  ]);
  return { pages, experiments, currentPageId: current[0]?.value ?? null };
}

export async function addPage(name: string, path: string) {
  const sql = getDatabase();
  if (!sql) throw new Error("Banco de dados não configurado.");
  const rows = await sql`
    INSERT INTO ab_pages (name, path) VALUES (${name}, ${path})
    ON CONFLICT (path) DO UPDATE SET name = excluded.name
    RETURNING id, name, path, created_at
  `;
  return rows[0];
}

export async function startExperiment(input: {
  name: string;
  baselinePageId: string;
  challengerPageId: string;
  mode: "manual" | "automatic";
  durationDays: number;
}) {
  const sql = getDatabase();
  if (!sql) throw new Error("Banco de dados não configurado.");
  const current = await sql<{ value: string }[]>`
    SELECT value FROM ab_settings WHERE key = 'current_home_page_id'
  `;
  if (current[0]?.value !== input.baselinePageId) {
    throw new Error("A página base deve ser a página atualmente vencedora.");
  }
  const endsAt = input.mode === "automatic"
    ? new Date(Date.now() + input.durationDays * 86_400_000)
    : null;
  const rows = await sql`
    INSERT INTO ab_experiments
      (name, baseline_page_id, challenger_page_id, mode, ends_at)
    VALUES (${input.name}, ${input.baselinePageId}, ${input.challengerPageId}, ${input.mode}, ${endsAt})
    RETURNING id
  `;
  return rows[0];
}
