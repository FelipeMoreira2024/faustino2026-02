"use client";

import { FormEvent, useCallback, useEffect, useMemo, useState } from "react";

import { HOME_HOST, LANDING_HOST, landingUrl, landingContentKey } from "@/lib/ab/urls";
import { detectableLift, evaluatePlannedWinner, hasAllocationMismatch, MAX_ATTRIBUTION_DAYS } from "@/lib/ab/stats";
import type { ExperimentMetric, ExperimentMode, ExperimentPlan, ExperimentStatus } from "@/lib/ab/types";

type Page = { id: string; name: string; host: string; path: string; available: boolean };
type Experiment = {
  id: string;
  name: string;
  mode: ExperimentMode;
  status: ExperimentStatus;
  started_at: string;
  ends_at: string | null;
  ended_at: string | null;
  plan: ExperimentPlan | null;
  decision_at: string | null;
  revision_changed: boolean;
  baseline_allocation: number;
  baseline_page_id: string;
  baseline_name: string;
  entry_page_id: string;
  entry_host: string;
  entry_path: string;
  baseline_host: string;
  challenger_host: string;
  baseline_path: string;
  challenger_page_id: string;
  challenger_name: string;
  challenger_path: string;
  winner_page_id: string | null;
  winner_name: string | null;
  decision_type: string | null;
  decision_details: { reason?: string; lower?: number; upper?: number } | null;
  baseline_participants?: number | null;
  challenger_participants?: number | null;
  baseline_visits: number;
  baseline_conversions: number;
  challenger_visits: number;
  challenger_conversions: number;
  baseline_clicking_browsers?: number;
  challenger_clicking_browsers?: number;
  baseline_conversations?: number;
  challenger_conversations?: number;
  baseline_qualified?: number;
  challenger_qualified?: number;
};
type Dashboard = { pages: Page[]; experiments: Experiment[]; publications: { entry_page_id: string; page_id: string }[] };
type Mutate = (url: string, body: unknown) => Promise<boolean>;
type Tab = "current" | "leads" | "history" | "pages";

const DAY_MS = 86_400_000;
const DEFAULT_DAILY_VISITORS = 8;
const DEFAULT_RATES: Record<ExperimentMetric, number> = { whatsapp_click: 5, qualified_lead: 2 };
const DURATION_OPTIONS = [30, 60, 90];

const pageUrl = (page: Page) => landingUrl(page.host, page.path);
const localDate = new Intl.DateTimeFormat("pt-BR", { dateStyle: "short", timeStyle: "short", timeZone: "America/Sao_Paulo" });
const shortDate = new Intl.DateTimeFormat("pt-BR", { dateStyle: "medium", timeZone: "America/Sao_Paulo" });
const count = new Intl.NumberFormat("pt-BR");
const oneDecimal = new Intl.NumberFormat("pt-BR", { maximumFractionDigits: 1, minimumFractionDigits: 1 });

/** Como cada métrica é chamada em linguagem do dia a dia. */
const metricWords: Record<ExperimentMetric, { goal: string; action: string; noun: string; technical: string }> = {
  whatsapp_click: {
    goal: "Mais pessoas clicando no WhatsApp",
    action: "clicaram no WhatsApp",
    noun: "contatos pelo WhatsApp",
    technical: "Clique no WhatsApp por navegador",
  },
  qualified_lead: {
    goal: "Mais clientes de verdade (leads qualificados)",
    action: "viraram clientes",
    noun: "clientes qualificados",
    technical: "Lead qualificado por navegador",
  },
};

/** Motivos de "sem vencedor", traduzidos. */
const plainReasons: Record<string, string> = {
  minimum_sample: "Não chegaram visitantes suficientes para ter certeza.",
  confidence_interval: "A diferença entre as páginas é pequena demais. Pode ter sido sorte.",
  minimum_lift: "Uma página foi um pouco melhor, mas a diferença é menor do que o teste consegue garantir.",
  allocation_mismatch: "Houve um problema na divisão dos visitantes entre A e B.",
  page_unavailable: "A página vencedora saiu do ar antes da publicação.",
  revision_changed: "O site foi alterado durante o teste, e os dados deixaram de valer.",
  stopped_without_winner: "O teste foi cancelado.",
};

function armMetrics(experiment: Experiment, arm: "baseline" | "challenger") {
  const browsers = experiment[`${arm}_participants`] ?? null;
  const visits = experiment[`${arm}_visits`] ?? 0;
  const conversions = experiment[`${arm}_conversions`] ?? 0;
  const clicks = experiment[`${arm}_clicking_browsers`] ?? 0;
  const conversations = experiment[`${arm}_conversations`] ?? 0;
  const qualified = experiment[`${arm}_qualified`] ?? 0;
  const outcomes = experiment.plan ? (experiment.plan.metric === "qualified_lead" ? qualified : clicks) : conversions;
  const base = experiment.plan ? browsers ?? 0 : visits;
  const value = rate(outcomes, base);
  return { browsers, visits, conversions, clicks, conversations, qualified, outcomes, base, value };
}
type ArmMetrics = ReturnType<typeof armMetrics>;

function rate(part: number, whole: number) {
  return whole ? (part / whole) * 100 : 0;
}

function pct(value: number) {
  return `${oneDecimal.format(value)}%`;
}

/** "27% mais" ou "2,4x mais", sempre comparando a líder com a outra. */
function advantage(leader: number, other: number) {
  if (other <= 0) return null;
  const ratio = leader / other;
  if (ratio >= 2) return `${oneDecimal.format(ratio)}x mais`;
  return `${Math.round((ratio - 1) * 100)}% mais`;
}

function daysUntil(date: string | null) {
  if (!date) return null;
  return Math.max(0, Math.ceil((Date.parse(date) - Date.now()) / DAY_MS));
}

function plural(value: number, one: string, many: string) {
  return `${count.format(value)} ${value === 1 ? one : many}`;
}

/** Estima visitas/dia e taxa atual a partir do teste mais recente com dados. */
function estimateTraffic(experiments: Experiment[], metric: ExperimentMetric) {
  for (const experiment of experiments) {
    const a = experiment.baseline_participants ?? 0;
    const b = experiment.challenger_participants ?? 0;
    if (a + b < 20) continue;
    const end = experiment.ended_at ? Date.parse(experiment.ended_at) : Date.now();
    const days = Math.max(1, (end - Date.parse(experiment.started_at)) / DAY_MS);
    const daily = Math.max(1, Math.round((a + b) / days));
    const outcomes = metric === "qualified_lead" ? experiment.baseline_qualified ?? 0 : experiment.baseline_clicking_browsers ?? 0;
    const observed = Math.round(rate(outcomes, a) * 10) / 10;
    return {
      daily,
      rate: observed >= 0.1 ? observed : DEFAULT_RATES[metric],
      source: `com base no teste "${experiment.name}"`,
    };
  }
  return { daily: DEFAULT_DAILY_VISITORS, rate: DEFAULT_RATES[metric], source: "estimativa padrão (ainda não há testes anteriores)" };
}

export function AdminDashboard() {
  const [data, setData] = useState<Dashboard | null>(null);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [tab, setTab] = useState<Tab>("current");

  const load = useCallback(async () => {
    try {
      const response = await fetch("/api/admin/dashboard", { cache: "no-store" });
      const payload = await response.json();
      if (response.status === 401) return window.location.assign("/admin/login");
      if (!response.ok) return setError(payload.error ?? "Não foi possível carregar os dados.");
      setData(payload);
      setError("");
    } catch { setError("Não foi possível atualizar os dados. Tentaremos novamente."); }
  }, []);

  useEffect(() => {
    void fetch("/api/admin/pages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "sync" }),
    }).then((response) => {
      if (!response.ok && response.status !== 401) throw new Error();
      return load();
    }).catch(() => setError("Não foi possível sincronizar o catálogo. Recarregue o painel."));
    const timer = window.setInterval(() => void load(), 30_000);
    return () => window.clearInterval(timer);
  }, [load]);

  const active = data?.experiments.find((experiment) => ["active", "paused"].includes(experiment.status));
  const canRecordLeads = Boolean(active?.plan && (!active.decision_at || Date.parse(active.decision_at) > Date.now()));

  async function mutate(url: string, body: unknown) {
    setBusy(true);
    setError("");
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const payload = await response.json();
      if (!response.ok) {
        setError(payload.error ?? "A operação não foi concluída.");
        return false;
      }
      await load();
      return true;
    } catch { setError("Falha de conexão. Atualize os dados antes de tentar novamente."); return false; }
    finally { setBusy(false); }
  }

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    window.location.assign("/admin/login");
  }

  const tabs: { id: Tab; label: string }[] = [
    { id: "current", label: active ? "Teste em andamento" : "Novo teste" },
    ...(canRecordLeads ? [{ id: "leads" as const, label: "Registrar atendimento" }] : []),
    { id: "history", label: "Histórico" },
    { id: "pages", label: "Páginas" },
  ];
  const currentTab = tabs.some(({ id }) => id === tab) ? tab : "current";

  return (
    <main className="min-h-screen bg-[#f4f0e7] px-5 py-10 text-ink sm:px-8">
      <div className="mx-auto max-w-5xl">
        <header className="flex flex-wrap items-center justify-between gap-4 border-b border-ink/15 pb-7">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#8a6c2d]">Faustino Advocacia</p>
            <h1 className="mt-2 font-display text-4xl font-semibold">Testes A/B</h1>
            <p className="mt-2 max-w-xl text-sm text-ink-soft">
              Mostre duas versões de uma página para visitantes diferentes e descubra qual traz mais contatos.
            </p>
          </div>
          <button onClick={logout} className="border border-ink/20 px-4 py-2 text-sm font-semibold">Sair</button>
        </header>

        {data && (
          <nav className="mt-6 flex flex-wrap gap-2" aria-label="Seções do painel">
            {tabs.map(({ id, label }) => (
              <button key={id} type="button" onClick={() => setTab(id)} aria-current={currentTab === id ? "page" : undefined}
                className={`min-h-11 px-4 text-sm font-semibold ${currentTab === id ? "bg-ink text-paper" : "border border-ink/20 bg-white"}`}>
                {label}
              </button>
            ))}
          </nav>
        )}

        {error ? <div className="mt-6 border border-red-300 bg-red-50 p-4 text-sm text-red-800" role="alert">{error}</div> : null}
        {!data && !error ? <p className="mt-8">Carregando resultados…</p> : null}

        {data && currentTab === "current" && (active
          ? <ActiveExperiment experiment={active} busy={busy} mutate={mutate} onRecordLeads={canRecordLeads ? () => setTab("leads") : undefined} />
          : <CreateExperiment pages={data.pages.filter((page) => page.available)} experiments={data.experiments} busy={busy} mutate={mutate} />)}
        {data && currentTab === "leads" && active && <RecordLead key={active.id} experiment={active} busy={busy} mutate={mutate} />}
        {data && currentTab === "history" && (
          <History experiments={data.experiments.filter((experiment) => experiment.status !== "active" && experiment.status !== "paused")} />
        )}
        {data && currentTab === "pages" && (
          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            <Pages pages={data.pages} publications={data.publications} activeEntryId={active?.entry_page_id} busy={busy} mutate={mutate} />
            <AddPage busy={busy} mutate={mutate} />
          </div>
        )}
      </div>
    </main>
  );
}

/* ------------------------------------------------------------------ */
/* Teste em andamento                                                  */
/* ------------------------------------------------------------------ */

type Tone = "blue" | "yellow" | "green" | "gray" | "red";
const toneStyles: Record<Tone, { box: string; dot: string }> = {
  blue: { box: "border-sky-300 bg-sky-50", dot: "🔵" },
  yellow: { box: "border-amber-300 bg-amber-50", dot: "🟡" },
  green: { box: "border-emerald-400 bg-emerald-50", dot: "🟢" },
  gray: { box: "border-ink/20 bg-white", dot: "⚪" },
  red: { box: "border-red-300 bg-red-50", dot: "⚠️" },
};

function ActiveExperiment({ experiment, busy, mutate, onRecordLeads }: {
  experiment: Experiment; busy: boolean; mutate: Mutate; onRecordLeads?: () => void;
}) {
  const a = armMetrics(experiment, "baseline");
  const b = armMetrics(experiment, "challenger");
  const { plan } = experiment;
  const metric = plan?.metric ?? "whatsapp_click";
  const words = metricWords[metric];
  const paused = experiment.status === "paused";
  const now = Date.now();
  const collecting = !experiment.ends_at || Date.parse(experiment.ends_at) > now;
  const reviewReady = !paused && Boolean(experiment.decision_at && Date.parse(experiment.decision_at) <= now);
  const entryUrl = landingUrl(experiment.entry_host, experiment.entry_path);
  const mismatch = hasAllocationMismatch(a.browsers ?? 0, b.browsers ?? 0);
  const result = plan && evaluatePlannedWinner(plan, { browsers: a.browsers ?? 0, outcomes: a.outcomes }, { browsers: b.browsers ?? 0, outcomes: b.outcomes });
  const suggestedWinner = !result || result.outcome === "inconclusive" ? null : result.outcome;
  const totalVisitors = (a.browsers ?? 0) + (b.browsers ?? 0);
  const leader = a.value === b.value ? null : b.value > a.value ? "challenger" : "baseline";
  const leaderName = leader === "challenger" ? experiment.challenger_name : experiment.baseline_name;
  const leaderAdvantage = leader && advantage(Math.max(a.value, b.value), Math.min(a.value, b.value));
  const remainingDays = daysUntil(experiment.ends_at);
  const decisionDays = daysUntil(experiment.decision_at);

  async function chooseWinner(pageId: string, name: string) {
    if (!window.confirm(`Encerrar o teste e mostrar "${name}" para todos os visitantes de ${entryUrl}?`)) return;
    await mutate(`/api/admin/experiments/${experiment.id}/end`, { decisionType: "manual", winnerPageId: pageId });
  }
  async function control(action: "pause" | "resume" | "cancel") {
    if (action === "cancel" && !window.confirm("Cancelar o teste? Todos os visitantes voltarão a ver a página que estava no ar antes do teste.")) return;
    await mutate(`/api/admin/experiments/${experiment.id}/control`, { action });
  }

  // ---- Um único estado, com uma frase e no máximo um botão principal ----
  let tone: Tone;
  let title: string;
  let message: string;
  let primary: React.ReactNode = null;

  const leaderSentence = leader
    ? `Até agora, ${leaderName} está à frente: ${pct(Math.max(a.value, b.value))} contra ${pct(Math.min(a.value, b.value))}${leaderAdvantage ? ` (${leaderAdvantage} ${words.noun})` : ""}.`
    : "Até agora, as duas páginas estão empatadas.";

  if (experiment.revision_changed) {
    tone = "red";
    title = "O site foi alterado durante o teste";
    message = "Uma nova versão do site foi publicada depois que o teste começou. Os dados anteriores não valem mais. Cancele este teste e comece outro.";
    primary = <button disabled={busy} onClick={() => void control("cancel")} className="bg-ink px-4 py-3 text-sm font-semibold text-paper disabled:opacity-50">Cancelar e começar de novo</button>;
  } else if (!plan) {
    // Testes antigos, criados antes do planejamento.
    tone = "blue";
    title = paused ? "Teste pausado" : "Teste em andamento";
    message = leaderSentence;
    primary = <>
      <button disabled={busy} onClick={() => void chooseWinner(experiment.baseline_page_id, experiment.baseline_name)} className="bg-ink px-4 py-3 text-sm font-semibold text-paper disabled:opacity-50">Encerrar e manter {experiment.baseline_name}</button>
      <button disabled={busy} onClick={() => void chooseWinner(experiment.challenger_page_id, experiment.challenger_name)} className="bg-ink px-4 py-3 text-sm font-semibold text-paper disabled:opacity-50">Encerrar e usar {experiment.challenger_name}</button>
    </>;
  } else if (paused) {
    tone = "gray";
    title = "Teste pausado";
    message = "Enquanto estiver pausado, todos os visitantes veem a página atual. O prazo fica congelado até você retomar.";
  } else if (collecting) {
    const outcomesSoFar = a.outcomes + b.outcomes;
    const dayText = remainingDays === null ? "" : remainingDays === 0 ? " Termina hoje." : ` Faltam cerca de ${plural(remainingDays, "dia", "dias")}.`;
    if (outcomesSoFar === 0) {
      tone = "blue";
      title = "Coletando dados";
      message = `Metade dos visitantes vê a versão A e a outra metade vê a B. Ainda não houve ${words.noun} para comparar.${dayText}`;
    } else {
      tone = "yellow";
      title = "Ainda é cedo para decidir";
      message = suggestedWinner
        ? `${leaderSentence} A vantagem já é clara, mas espere o fim do prazo para confirmar.${dayText}`
        : `${leaderSentence} Com ${plural(totalVisitors, "visitante", "visitantes")}, essa diferença ainda pode ser sorte.${dayText}`;
    }
  } else if (!reviewReady) {
    tone = "blue";
    title = "Aguardando os últimos atendimentos";
    message = `A divisão dos visitantes terminou. Você tem ${decisionDays ? `mais ${plural(decisionDays, "dia", "dias")}` : "até hoje"} para registrar os atendimentos que ainda chegarem pelo WhatsApp. Depois disso, o resultado sai aqui.`;
  } else if (suggestedWinner) {
    const winnerIsB = suggestedWinner === "challenger";
    const winnerName = winnerIsB ? experiment.challenger_name : experiment.baseline_name;
    const winnerId = winnerIsB ? experiment.challenger_page_id : experiment.baseline_page_id;
    tone = "green";
    title = `Temos um vencedor: ${winnerName}`;
    message = `${winnerName} trouxe ${leaderAdvantage ?? "mais"} ${words.noun} (${pct(Math.max(a.value, b.value))} contra ${pct(Math.min(a.value, b.value))}). Pode confiar nesse resultado.`;
    primary = <button disabled={busy} onClick={() => void chooseWinner(winnerId, winnerName)} className="bg-emerald-800 px-4 py-3 text-sm font-semibold text-white disabled:opacity-50">{winnerIsB ? `Publicar ${winnerName}` : `Manter ${winnerName}`}</button>;
  } else {
    tone = "gray";
    title = "Empate: sem vencedor claro";
    const reason = result && "reason" in result && result.reason ? plainReasons[result.reason] : "";
    message = `${reason} Recomendação: mantenha a página atual ou teste uma mudança mais ousada.`;
    primary = <button disabled={busy} onClick={() => void control("cancel")} className="bg-ink px-4 py-3 text-sm font-semibold text-paper disabled:opacity-50">Encerrar e manter a página atual</button>;
  }

  const goal = plan ? plan.perVariant * 2 : null;
  const progress = goal ? Math.min(100, Math.round((totalVisitors / goal) * 100)) : null;
  const styles = toneStyles[tone];

  return (
    <section className="mt-8 space-y-6">
      <div>
        <h2 className="text-2xl font-semibold">{experiment.name}</h2>
        <p className="mt-1 text-sm text-ink-soft">
          Endereço testado: <a className="break-all underline" href={entryUrl} target="_blank" rel="noreferrer">{entryUrl}</a>
          {plan && <> · Objetivo: <strong>{words.goal.toLowerCase()}</strong></>}
        </p>
      </div>

      {/* Placar principal */}
      <div className={`border-2 p-6 ${styles.box}`} role="status">
        <p className="text-xl font-semibold"><span aria-hidden="true" className="mr-2">{styles.dot}</span>{title}</p>
        <p className="mt-2 text-base">{message}</p>
        {progress !== null && collecting && !paused && !experiment.revision_changed && (
          <div className="mt-5">
            <div className="flex justify-between text-sm text-ink-soft">
              <span>Visitantes: {count.format(totalVisitors)} de ~{count.format(goal ?? 0)} necessários</span>
              <span>{progress}%</span>
            </div>
            <div className="mt-1 h-3 w-full bg-white/80" aria-hidden="true"><div className="h-3 bg-ink" style={{ width: `${progress}%` }} /></div>
          </div>
        )}
        {mismatch && !experiment.revision_changed && (
          <p className="mt-4 font-semibold text-red-800">⚠️ A divisão dos visitantes entre A e B está desigual. Algo pode estar errado na medição. Peça para o suporte técnico verificar antes de decidir.</p>
        )}
        {(primary || (!experiment.revision_changed && (paused || collecting))) && (
          <div className="mt-5 flex flex-wrap gap-3">
            {primary}
            {!experiment.revision_changed && (paused || collecting) && (
              <button disabled={busy} onClick={() => void control(paused ? "resume" : "pause")} className="min-h-11 border border-ink/30 bg-white px-4 text-sm font-semibold disabled:opacity-50">{paused ? "Retomar teste" : "Pausar teste"}</button>
            )}
          </div>
        )}
      </div>

      {/* Lado a lado */}
      <div className="grid gap-4 md:grid-cols-2">
        <ArmCard label="Versão A · página atual" name={experiment.baseline_name} url={landingUrl(experiment.baseline_host, experiment.baseline_path)} metrics={a} plan={plan} leading={leader === "baseline" && (a.outcomes + b.outcomes) > 0} />
        <ArmCard label="Versão B · página nova" name={experiment.challenger_name} url={landingUrl(experiment.challenger_host, experiment.challenger_path)} metrics={b} plan={plan} leading={leader === "challenger" && (a.outcomes + b.outcomes) > 0} />
      </div>

      {plan && onRecordLeads && (
        <p className="border border-ink/15 bg-white p-4 text-sm">
          💬 Chegou alguém pelo WhatsApp? <button type="button" onClick={onRecordLeads} className="font-semibold underline">Registre o atendimento</button> para o teste saber qual página trouxe a pessoa.
          {metric === "whatsapp_click" && " (Opcional neste teste, que conta cliques.)"}
        </p>
      )}

      <p className="text-sm text-ink-soft">
        ⚠️ Durante o teste, não publique alterações no site. Qualquer nova versão invalida os dados coletados.
      </p>

      {/* Detalhes técnicos, recolhidos */}
      <details className="border border-ink/15 bg-white p-4 text-sm">
        <summary className="cursor-pointer font-semibold">Ver detalhes técnicos</summary>
        <dl className="mt-3 grid gap-x-6 gap-y-2 text-ink-soft sm:grid-cols-2">
          {plan && <Detail term="Hipótese" value={plan.hypothesis} />}
          {plan && <Detail term="Métrica" value={words.technical} />}
          <Detail term="Divisão planejada" value={`${experiment.baseline_allocation}% A / ${100 - experiment.baseline_allocation}% B`} />
          {totalVisitors > 0 && <Detail term="Divisão observada" value={`${pct(rate(a.browsers ?? 0, totalVisitors))} A / ${pct(rate(b.browsers ?? 0, totalVisitors))} B`} />}
          {plan && <Detail term="Amostra planejada" value={`${count.format(plan.perVariant)} navegadores por versão`} />}
          {plan && <Detail term="Taxa base e melhora mínima" value={`${oneDecimal.format(plan.baselineRate)}% · +${oneDecimal.format(plan.minimumLift)} p.p.`} />}
          {plan && <Detail term="Fim da divisão" value={experiment.ends_at ? localDate.format(new Date(experiment.ends_at)) : "—"} />}
          {plan && <Detail term="Resultado a partir de" value={experiment.decision_at ? localDate.format(new Date(experiment.decision_at)) : "—"} />}
          <Detail term="Diferença B − A" value={`${oneDecimal.format(b.value - a.value)} p.p.`} />
          {result && result.lower !== undefined && result.upper !== undefined && (
            <Detail term="IC 95% da diferença" value={`${oneDecimal.format(100 * result.lower)} a ${oneDecimal.format(100 * result.upper)} p.p.`} />
          )}
        </dl>
        {plan && <p className="mt-3 text-ink-soft">Critério de vitória: amostra planejada atingida, divisão equilibrada, intervalo de confiança de 95% sem o zero e diferença de pelo menos {oneDecimal.format(plan.minimumLift)} p.p. Poder de 80%.</p>}
      </details>

      <div>
        <button disabled={busy} onClick={() => void control("cancel")} className="text-sm font-semibold text-red-800 underline disabled:opacity-50">Cancelar teste</button>
      </div>
    </section>
  );
}

function ArmCard({ label, name, url, metrics, plan, leading }: {
  label: string; name: string; url: string; metrics: ArmMetrics; plan: ExperimentPlan | null; leading: boolean;
}) {
  const metric = plan?.metric;
  const visitors = plan ? metrics.browsers ?? 0 : metrics.visits;
  return (
    <article className={`border bg-white p-5 ${leading ? "border-emerald-500" : "border-ink/15"}`}>
      <div className="flex items-start justify-between gap-2">
        <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#8a6c2d]">{label}</p>
        {leading && <span className="bg-emerald-100 px-2 py-0.5 text-xs font-semibold text-emerald-900">À frente</span>}
      </div>
      <h3 className="mt-2 text-xl font-semibold">{name}</h3>
      <a href={url} target="_blank" rel="noreferrer" className="break-all text-sm text-ink-soft underline">{url}</a>
      <ul className="mt-4 space-y-2 text-sm">
        <Line value={count.format(visitors)} label={plan ? "visitantes" : "visitas"} />
        <Line value={count.format(plan ? metrics.clicks : metrics.conversions)} label="clicaram no WhatsApp"
          extra={visitors ? pct(rate(plan ? metrics.clicks : metrics.conversions, visitors)) : undefined} highlight={!plan || metric === "whatsapp_click"} />
        {plan && <Line value={count.format(metrics.conversations)} label="conversaram (registrado)" />}
        {plan && <Line value={count.format(metrics.qualified)} label="viraram clientes (registrado)"
          extra={visitors ? pct(rate(metrics.qualified, visitors)) : undefined} highlight={metric === "qualified_lead"} />}
      </ul>
    </article>
  );
}

function Line({ value, label, extra, highlight }: { value: string; label: string; extra?: string; highlight?: boolean }) {
  return (
    <li className={`flex items-baseline gap-2 ${highlight ? "font-semibold text-ink" : "text-ink-soft"}`}>
      <span className={highlight ? "text-2xl" : "text-lg text-ink"}>{value}</span>
      <span>{label}</span>
      {extra && <span className="ml-auto">{extra}</span>}
    </li>
  );
}

function Detail({ term, value }: { term: string; value: string }) {
  return <div><dt className="font-semibold text-ink">{term}</dt><dd>{value}</dd></div>;
}

/* ------------------------------------------------------------------ */
/* Novo teste: 3 passos                                                */
/* ------------------------------------------------------------------ */

function CreateExperiment({ pages, experiments, busy, mutate }: {
  pages: Page[]; experiments: Experiment[]; busy: boolean; mutate: Mutate;
}) {
  const initialA = pages.find((page) => page.host === HOME_HOST && page.path === "/")?.id ?? "";
  const initialB = pages.find((page) => page.host === HOME_HOST && page.path === "/b")?.id ?? "";
  const [baselineId, setBaselineId] = useState(initialA);
  const [challengerId, setChallengerId] = useState(initialB);
  const [metric, setMetric] = useState<ExperimentMetric>("whatsapp_click");
  const [days, setDays] = useState(DURATION_OPTIONS[0]);
  const [name, setName] = useState("");
  const [hypothesis, setHypothesis] = useState("");
  const estimate = useMemo(() => estimateTraffic(experiments, metric), [experiments, metric]);
  const [dailyOverride, setDailyOverride] = useState("");
  const [rateOverride, setRateOverride] = useState("");
  const [attributionDays, setAttributionDays] = useState("3");

  const baseline = pages.find((page) => page.id === baselineId);
  const challenger = pages.find((page) => page.id === challengerId);
  const candidates = pages.filter((page) => !baseline ||
    landingContentKey(page.host, page.path) !== landingContentKey(baseline.host, baseline.path));
  const validPair = Boolean(baseline && challenger && candidates.includes(challenger));
  const daily = dailyOverride ? Math.round(Number(dailyOverride)) : estimate.daily;
  const baseRate = rateOverride ? Number(rateOverride) : estimate.rate;
  const words = metricWords[metric];
  const options = DURATION_OPTIONS.map((option) => ({ days: option, lift: detectableLift(baseRate, daily, option) }));
  const chosen = options.find((option) => option.days === days)?.lift ?? null;
  const autoName = baseline && challenger ? `${baseline.name} × ${challenger.name}` : "";

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!baseline || !challenger || !chosen) return;
    await mutate("/api/admin/experiments", {
      name: name.trim() || autoName,
      baselinePageId: baselineId,
      challengerPageId: challengerId,
      mode: "manual",
      durationDays: days,
      plan: {
        hypothesis: hypothesis.trim() || `${challenger.name} traz mais ${words.noun} que ${baseline.name}.`,
        metric,
        baselineRate: baseRate,
        minimumLift: chosen.minimumLift,
        dailyBrowsers: daily,
        attributionDays: metric === "qualified_lead" ? Number(attributionDays) : 1,
      },
    });
  }

  return (
    <section className="mt-8 border border-ink/15 bg-white p-6">
      <h2 className="text-2xl font-semibold">Criar um novo teste</h2>
      <p className="mt-2 text-sm text-ink-soft">São 3 passos. Os cálculos ficam por conta do painel.</p>
      <form onSubmit={submit} className="mt-6 space-y-8">
        <Step number={1} title="O que você quer comparar?">
          <div className="grid gap-4 md:grid-cols-2">
            <Field label="Versão A: a página que está no ar hoje">
              <select value={baselineId} onChange={(event) => { setBaselineId(event.target.value); setChallengerId(""); }} required className="admin-input">
                <option value="">Selecione</option>
                {pages.map((page) => <option key={page.id} value={page.id}>{page.name} · {pageUrl(page)}</option>)}
              </select>
            </Field>
            <Field label="Versão B: a página nova que você quer testar">
              <select value={challengerId} onChange={(event) => setChallengerId(event.target.value)} required className="admin-input">
                <option value="">Selecione</option>
                {candidates.map((page) => <option key={page.id} value={page.id}>{page.name} · {pageUrl(page)}</option>)}
              </select>
            </Field>
          </div>
          {baseline && <p className="mt-3 break-all text-sm text-ink-soft">Quem acessar <strong className="text-ink">{pageUrl(baseline)}</strong> vai ver A ou B, metade das pessoas para cada lado. Cada visitante vê sempre a mesma versão.</p>}
        </Step>

        <Step number={2} title={'O que conta como "ganhar"?'}>
          <div className="space-y-3">
            <Choice checked={metric === "whatsapp_click"} onChange={() => setMetric("whatsapp_click")} name="metric"
              title="Mais pessoas clicando no WhatsApp" badge="Recomendado"
              description="O resultado sai mais rápido e é contado automaticamente." />
            <Choice checked={metric === "qualified_lead"} onChange={() => setMetric("qualified_lead")} name="metric"
              title="Mais clientes de verdade (leads qualificados)"
              description="É mais preciso, mas demora mais e exige registrar no painel cada atendimento que chegar pelo WhatsApp." />
          </div>
        </Step>

        <Step number={3} title="Quanto tempo você aceita esperar?">
          <p className="text-sm text-ink-soft">
            Com cerca de <strong className="text-ink">{plural(daily, "visitante", "visitantes")} por dia</strong> e
            {" "}<strong className="text-ink">{pct(baseRate)}</strong> de pessoas que hoje {words.action} ({estimate.source}),
            {" "}veja o tamanho da diferença que o teste consegue perceber em cada prazo:
          </p>
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            {options.map((option) => {
              const relative = option.lift ? option.lift.minimumLift / baseRate : null;
              return (
                <label key={option.days} className={`block cursor-pointer border p-4 ${days === option.days ? "border-ink bg-[#fffaf0]" : "border-ink/20"} ${option.lift ? "" : "cursor-not-allowed opacity-50"}`}>
                  <input type="radio" name="days" className="sr-only" checked={days === option.days} disabled={!option.lift} onChange={() => setDays(option.days)} />
                  <span className="block text-lg font-semibold">{option.days} dias</span>
                  <span className="mt-1 block text-sm text-ink-soft">
                    {relative === null ? "O tráfego é baixo demais para esse prazo." :
                      `Só detecta se B trouxer pelo menos ${relative >= 1 ? `${oneDecimal.format(1 + relative)}x` : `${Math.round(relative * 100)}% mais`} ${relative >= 1 ? "o resultado de A" : words.noun}.`}
                  </span>
                </label>
              );
            })}
          </div>
          <p className="mt-3 text-sm text-ink-soft">
            💡 Com pouco tráfego, o teste só consegue confirmar diferenças grandes. Prefira comparar páginas <strong>bem diferentes</strong> entre si. Mudar só a cor de um botão não costuma aparecer no resultado.
          </p>
        </Step>

        <details className="border border-ink/15 p-4 text-sm">
          <summary className="cursor-pointer font-semibold">Opções avançadas (opcional)</summary>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <Field label="Nome do teste">
              <input value={name} onChange={(event) => setName(event.target.value)} maxLength={200} placeholder={autoName || "Home atual × Criminalista 24h"} className="admin-input" />
            </Field>
            <Field label="Por que você acha que B vai ganhar?">
              <input value={hypothesis} onChange={(event) => setHypothesis(event.target.value)} maxLength={400} placeholder="Ex.: o título novo é mais direto" className="admin-input" />
            </Field>
            <Field label="Visitantes por dia (somando A e B)">
              <input type="number" min="1" step="1" value={dailyOverride} onChange={(event) => setDailyOverride(event.target.value)} placeholder={String(estimate.daily)} className="admin-input" />
            </Field>
            <Field label={`% de pessoas que hoje ${words.action}`}>
              <input type="number" min="0.1" max="99" step="0.1" value={rateOverride} onChange={(event) => setRateOverride(event.target.value)} placeholder={String(estimate.rate)} className="admin-input" />
            </Field>
            {metric === "qualified_lead" && (
              <Field label="Dias para registrar um atendimento depois da visita">
                <input type="number" min="1" max={MAX_ATTRIBUTION_DAYS} value={attributionDays} onChange={(event) => setAttributionDays(event.target.value)} className="admin-input" />
              </Field>
            )}
          </div>
        </details>

        <div className="border border-ink/15 bg-[#fffaf0] p-4 text-sm" aria-live="polite">
          {validPair && chosen ? (
            <p>
              <strong>Resumo:</strong> por {days} dias, metade dos visitantes verá <strong>{baseline?.name}</strong> e a outra metade verá <strong>{challenger?.name}</strong>.
              {" "}Ao final, o painel mostra quem trouxe mais {words.noun}, e você decide se publica a vencedora.
              {" "}<span className="font-semibold text-amber-900">Não publique alterações no site durante esse período, ou o teste perde a validade.</span>
            </p>
          ) : (
            <p className="text-ink-soft">{validPair ? "Escolha um prazo possível no passo 3." : "Escolha duas páginas diferentes no passo 1."}</p>
          )}
        </div>

        <button disabled={busy || !validPair || !chosen} className="min-h-12 w-full bg-ink px-5 font-semibold text-paper disabled:opacity-50">Iniciar teste</button>
      </form>
    </section>
  );
}

function Step({ number, title, children }: { number: number; title: string; children: React.ReactNode }) {
  return (
    <fieldset>
      <legend className="flex items-center gap-3 text-lg font-semibold">
        <span className="flex h-8 w-8 items-center justify-center bg-ink text-sm text-paper">{number}</span>
        {title}
      </legend>
      <div className="mt-4">{children}</div>
    </fieldset>
  );
}

function Choice({ checked, onChange, name, title, description, badge }: {
  checked: boolean; onChange: () => void; name: string; title: string; description: string; badge?: string;
}) {
  return (
    <label className={`flex cursor-pointer gap-3 border p-4 ${checked ? "border-ink bg-[#fffaf0]" : "border-ink/20"}`}>
      <input type="radio" name={name} checked={checked} onChange={onChange} className="mt-1" />
      <span>
        <span className="font-semibold">{title}</span>
        {badge && <span className="ml-2 bg-emerald-100 px-2 py-0.5 text-xs font-semibold text-emerald-900">{badge}</span>}
        <span className="mt-1 block text-sm text-ink-soft">{description}</span>
      </span>
    </label>
  );
}

/* ------------------------------------------------------------------ */
/* Registrar atendimento                                               */
/* ------------------------------------------------------------------ */

function RecordLead({ experiment, busy, mutate }: { experiment: Experiment; busy: boolean; mutate: Mutate }) {
  const [saved, setSaved] = useState(false);
  const days = experiment.plan?.attributionDays ?? 3;
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    setSaved(false);
    if (await mutate("/api/admin/leads", { reference: data.get("reference"), stage: data.get("stage") })) {
      form.reset();
      setSaved(true);
    }
  }
  return (
    <section className="mt-8 border border-ink/15 bg-white p-6">
      <h2 className="text-2xl font-semibold">Registrar atendimento</h2>
      <ol className="mt-3 list-decimal space-y-1 pl-5 text-sm text-ink-soft">
        <li>Quem chega pelo site manda uma mensagem que termina com um código, por exemplo <code className="bg-[#f4f0e7] px-1">Ref. AB-0123456789ABCDEF</code>.</li>
        <li>Copie esse código e cole abaixo.</li>
        <li>Diga se a pessoa só conversou ou se virou um cliente de verdade. Use o mesmo critério para todos.</li>
      </ol>
      <p className="mt-2 text-sm text-ink-soft">Você tem até {plural(days, "dia", "dias")} depois da visita da pessoa para registrar. Registrar o mesmo código duas vezes não conta em dobro.</p>
      <form className="mt-5 grid gap-4 sm:grid-cols-2" onSubmit={submit}>
        <Field label="Código da mensagem">
          <input name="reference" required maxLength={40} placeholder="AB-0123456789ABCDEF" spellCheck={false} autoComplete="off" className="admin-input" />
        </Field>
        <Field label="Como foi o atendimento?">
          <select name="stage" className="admin-input">
            <option value="conversation">Só conversou</option>
            <option value="qualified">Virou cliente (lead qualificado)</option>
          </select>
        </Field>
        <div className="flex flex-wrap items-center gap-3 sm:col-span-2">
          <button disabled={busy} className="min-h-11 bg-ink px-5 text-sm font-semibold text-paper disabled:opacity-50">Registrar</button>
          <p className="text-sm font-semibold text-emerald-800" role="status">{saved ? "✅ Atendimento registrado." : ""}</p>
        </div>
      </form>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Páginas                                                             */
/* ------------------------------------------------------------------ */

function AddPage({ busy, mutate }: { busy: boolean; mutate: Mutate }) {
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    if (await mutate("/api/admin/pages", { name: data.get("name"), path: data.get("path"), host: data.get("host") })) form.reset();
  }
  return (
    <section className="border border-ink/15 bg-white p-6">
      <h2 className="text-xl font-semibold">Adicionar página</h2>
      <p className="mt-2 text-sm text-ink-soft">Para testar uma página que não está na lista. Ela precisa estar publicada e ter o botão de WhatsApp com medição.</p>
      <form onSubmit={submit} className="mt-5 space-y-4">
        <Field label="Nome (como você quer chamar a página)"><input name="name" required placeholder="Home C" className="admin-input" /></Field>
        <Field label="Site"><select name="host" className="admin-input"><option value={HOME_HOST}>{HOME_HOST}</option><option value={LANDING_HOST}>{LANDING_HOST}</option></select></Field>
        <Field label="Endereço da página"><input name="path" required placeholder="/c" className="admin-input" /></Field>
        <button disabled={busy} className="min-h-11 bg-ink px-5 text-sm font-semibold text-paper disabled:opacity-50">Adicionar</button>
      </form>
    </section>
  );
}

function Pages({ pages, publications, activeEntryId, busy, mutate }: {
  pages: Page[]; publications: Dashboard["publications"]; activeEntryId?: string; busy: boolean; mutate: Mutate;
}) {
  return (
    <section className="border border-ink/15 bg-white p-6">
      <h2 className="text-xl font-semibold">Páginas disponíveis</h2>
      <ul className="mt-5 divide-y divide-ink/10">
        {pages.map((page) => {
          const publication = publications.find(({ entry_page_id }) => entry_page_id === page.id);
          const published = publication && pages.find(({ id }) => id === publication.page_id);
          return (
            <li key={page.id} className="py-3">
              <p className="font-semibold">{page.name}</p>
              <a href={pageUrl(page)} target="_blank" rel="noreferrer" className="break-all text-sm text-ink-soft underline">{pageUrl(page)}</a>
              {!page.available && <p className="mt-1 text-sm text-red-800">Fora do ar</p>}
              {published && <div className="mt-2 text-sm">
                <p>Hoje este endereço mostra: <strong>{published.available ? published.name : "a página original (a vencedora saiu do ar)"}</strong></p>
                <button type="button" disabled={busy || page.id === activeEntryId}
                  onClick={() => {
                    if (window.confirm(`Voltar a mostrar a página original em ${pageUrl(page)}?`)) {
                      void mutate("/api/admin/pages", { action: "restore", entryId: page.id });
                    }
                  }} className="mt-1 underline disabled:opacity-50">Voltar para a página original</button>
              </div>}
            </li>
          );
        })}
      </ul>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Histórico                                                           */
/* ------------------------------------------------------------------ */

function History({ experiments }: { experiments: Experiment[] }) {
  return (
    <section className="mt-8">
      <h2 className="text-2xl font-semibold">Testes anteriores</h2>
      {experiments.length === 0 ? <p className="mt-3 text-sm text-ink-soft">Nenhum teste encerrado ainda.</p> : (
        <div className="mt-4 space-y-4">
          {experiments.map((experiment) => {
            const a = armMetrics(experiment, "baseline");
            const b = armMetrics(experiment, "challenger");
            const { plan } = experiment;
            const words = metricWords[plan?.metric ?? "whatsapp_click"];
            const decision = experiment.decision_details;
            const reason = decision?.reason && plainReasons[decision.reason];
            const leaderIsB = b.value > a.value;
            const edge = a.value !== b.value ? advantage(Math.max(a.value, b.value), Math.min(a.value, b.value)) : null;
            const status = experiment.status === "cancelled" ? { dot: "⚪", text: "Cancelado" } :
              experiment.status === "inconclusive" ? { dot: "⚪", text: "Sem vencedor claro" } :
              { dot: "🟢", text: `${experiment.winner_name} venceu` };
            return (
              <article key={experiment.id} className="border border-ink/15 bg-white p-5">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h3 className="font-semibold">{experiment.name}</h3>
                    <p className="text-sm text-ink-soft">{experiment.ended_at ? shortDate.format(new Date(experiment.ended_at)) : "—"} · {words.goal}</p>
                  </div>
                  <p className="font-semibold"><span aria-hidden="true">{status.dot}</span> {status.text}</p>
                </div>
                <p className="mt-3 text-sm">
                  A ({experiment.baseline_name}): <strong>{a.base ? pct(a.value) : "—"}</strong> {words.action} ·
                  {" "}B ({experiment.challenger_name}): <strong>{b.base ? pct(b.value) : "—"}</strong>
                  {edge && <> · {leaderIsB ? "B" : "A"} teve {edge} {words.noun}</>}
                </p>
                {reason && experiment.status !== "completed" && <p className="mt-1 text-sm text-ink-soft">{reason}</p>}
                <details className="mt-3 text-sm text-ink-soft">
                  <summary className="cursor-pointer">Detalhes técnicos</summary>
                  <p className="mt-2 break-all">{landingUrl(experiment.entry_host, experiment.entry_path)}</p>
                  <p>{historyMetric(a, plan)} (A)</p>
                  <p>{historyMetric(b, plan)} (B)</p>
                  {plan && <p>{words.technical} · {count.format(plan.perVariant)} navegadores planejados por versão</p>}
                  {decision?.lower !== undefined && decision.upper !== undefined && (
                    <p>IC 95% da diferença B − A: {oneDecimal.format(100 * decision.lower)} a {oneDecimal.format(100 * decision.upper)} p.p.</p>
                  )}
                </details>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
}

function historyMetric(metrics: ArmMetrics, plan: ExperimentPlan | null) {
  if (plan) return `${count.format(metrics.browsers ?? 0)} navegadores · ${count.format(metrics.clicks)} com clique · ${count.format(metrics.conversations)} com conversa · ${count.format(metrics.qualified)} qualificados`;
  return `${count.format(metrics.visits)} sessões · ${count.format(metrics.conversions)} com clique`;
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <label className="block text-sm font-semibold">{label}<span className="mt-2 block">{children}</span></label>;
}
