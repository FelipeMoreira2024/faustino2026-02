"use client";

import { FormEvent, useCallback, useEffect, useState } from "react";

import { HOME_HOST, LANDING_HOST, landingUrl, landingContentKey } from "@/lib/ab/urls";
import { evaluatePlannedWinner, hasAllocationMismatch, MAX_ATTRIBUTION_DAYS, MAX_COLLECTION_DAYS, planSample } from "@/lib/ab/stats";
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
const pageUrl = (page: Page) => landingUrl(page.host, page.path);
const localDate = new Intl.DateTimeFormat("pt-BR", { dateStyle: "short", timeStyle: "short", timeZone: "America/Sao_Paulo" });
const count = new Intl.NumberFormat("pt-BR");
const percentagePoints = new Intl.NumberFormat("pt-BR", { maximumFractionDigits: 1, minimumFractionDigits: 1 });
const metricLabels: Record<ExperimentMetric, string> = {
  qualified_lead: "Lead qualificado por navegador",
  whatsapp_click: "Clique no WhatsApp por navegador",
};

function armMetrics(experiment: Experiment, arm: "baseline" | "challenger") {
  const browsers = experiment[`${arm}_participants`] ?? null;
  const visits = experiment[`${arm}_visits`] ?? 0;
  const conversions = experiment[`${arm}_conversions`] ?? 0;
  const clicks = experiment[`${arm}_clicking_browsers`] ?? 0;
  const conversations = experiment[`${arm}_conversations`] ?? 0;
  const qualified = experiment[`${arm}_qualified`] ?? 0;
  const outcomes = experiment.plan?.metric === "qualified_lead" ? qualified : clicks;
  const value = experiment.plan ? rate(outcomes, browsers ?? 0) : rate(conversions, visits);
  return { browsers, visits, conversions, clicks, conversations, qualified, outcomes, value };
}

function rate(conversions: number, visits: number) {
  return visits ? (conversions / visits) * 100 : 0;
}

function pct(value: number) {
  return `${value.toLocaleString("pt-BR", { minimumFractionDigits: 1, maximumFractionDigits: 1 })}%`;
}

export function AdminDashboard() {
  const [data, setData] = useState<Dashboard | null>(null);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

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

  return (
    <main className="min-h-screen bg-[#f4f0e7] px-5 py-10 text-ink sm:px-8">
      <div className="mx-auto max-w-6xl">
        <header className="flex flex-wrap items-center justify-between gap-4 border-b border-ink/15 pb-7">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#8a6c2d]">Faustino Advocacia</p>
            <h1 className="mt-2 font-display text-4xl font-semibold">Testes A/B</h1>
          </div>
          <button onClick={logout} className="border border-ink/20 px-4 py-2 text-sm font-semibold">Sair</button>
        </header>

        {error ? <div className="mt-6 border border-red-300 bg-red-50 p-4 text-sm text-red-800">{error}</div> : null}
        {!data && !error ? <p className="mt-8">Carregando resultados…</p> : null}

        {data ? (
          <>
            {active ? <ActiveExperiment experiment={active} busy={busy} mutate={mutate} /> : (
              <CreateExperiment pages={data.pages.filter((page) => page.available)} busy={busy} mutate={mutate} />
            )}
            {active?.plan && (!active.decision_at || Date.parse(active.decision_at) > Date.now()) && <RecordLead key={active.id} busy={busy} mutate={mutate} />}
            <div className="mt-8 grid gap-6 lg:grid-cols-2">
              <AddPage busy={busy} mutate={mutate} />
              <Pages pages={data.pages} publications={data.publications} activeEntryId={active?.entry_page_id} busy={busy} mutate={mutate} />
            </div>
            <History experiments={data.experiments.filter((experiment) => experiment.status !== "active" && experiment.status !== "paused")} />
          </>
        ) : null}
      </div>
    </main>
  );
}

function ResultCard({ label, name, url, metrics, plan }: {
  label: string; name: string; url: string; metrics: ReturnType<typeof armMetrics>; plan: ExperimentPlan | null;
}) {
  return (
    <article className="border border-ink/15 bg-white p-5">
      <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#8a6c2d]">{label}</p>
      <h3 className="mt-2 text-xl font-semibold">{name}</h3>
      <a href={url} target="_blank" rel="noreferrer" className="text-sm text-ink-soft underline">{url}</a>
      <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Metric label="Navegadores" value={metrics.browsers === null ? "—" : count.format(metrics.browsers)} />
        {plan ? <>
          <Metric label="Com clique" value={count.format(metrics.clicks)} />
          <Metric label="Com conversa" value={count.format(metrics.conversations)} />
          <Metric label="Qualificados" value={count.format(metrics.qualified)} />
        </> : <>
          <Metric label="Sessões" value={count.format(metrics.visits)} />
          <Metric label="Sessões com clique" value={count.format(metrics.conversions)} />
        </>}
      </div>
      <p className="mt-4 border-t border-ink/10 pt-3 text-sm text-ink-soft">
        <strong className="mr-2 text-base text-ink">{(plan ? metrics.browsers : metrics.visits) ? pct(metrics.value) : "—"}</strong>
        {plan ? metricLabels[plan.metric] : "Taxa por sessão"}
      </p>
    </article>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return <div><p className="text-xs text-ink-soft">{label}</p><p className="mt-1 text-2xl font-semibold">{value}</p></div>;
}

function ActiveExperiment({ experiment, busy, mutate }: {
  experiment: Experiment; busy: boolean; mutate: Mutate;
}) {
  const a = armMetrics(experiment, "baseline");
  const b = armMetrics(experiment, "challenger");
  const { plan } = experiment;
  const paused = experiment.status === "paused";
  const collectionEnded = Boolean(experiment.ends_at && Date.parse(experiment.ends_at) <= Date.now());
  const reviewReady = !paused && Boolean(experiment.decision_at && Date.parse(experiment.decision_at) <= Date.now());
  const entryUrl = landingUrl(experiment.entry_host, experiment.entry_path);
  const mismatch = hasAllocationMismatch(a.browsers ?? 0, b.browsers ?? 0);
  const result = plan && evaluatePlannedWinner(plan, { browsers: a.browsers ?? 0, outcomes: a.outcomes }, { browsers: b.browsers ?? 0, outcomes: b.outcomes });
  const total = (a.browsers ?? 0) + (b.browsers ?? 0);
  const suggestedWinner = !result || result.outcome === "inconclusive" ? null : result.outcome;
  const canPublish = !plan || (experiment.mode === "manual" && reviewReady && !experiment.revision_changed && suggestedWinner !== null);
  async function chooseWinner(pageId: string, name: string) {
    if (!window.confirm(`Finalizar o teste e exibir ${name} em ${entryUrl}?`)) return;
    await mutate(`/api/admin/experiments/${experiment.id}/end`, { decisionType: "manual", winnerPageId: pageId });
  }
  async function control(action: "pause" | "resume" | "cancel") {
    if (action === "cancel" && !window.confirm("Encerrar o teste sem vencedora? A URL voltará ao conteúdo publicado antes do teste.")) return;
    await mutate(`/api/admin/experiments/${experiment.id}/control`, { action });
  }
  return (
    <section className="mt-8 border border-[#b99a54]/40 bg-[#fffaf0] p-6">
      <div className="flex flex-wrap justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#8a6c2d]">{experiment.revision_changed ? "Coleta interrompida" : paused ? "Teste pausado" : collectionEnded ? reviewReady ? "Coleta encerrada" : "Janela de qualificação" : "Teste ativo"}</p>
          <h2 className="mt-2 text-2xl font-semibold">{experiment.name}</h2>
          <a className="break-all text-sm underline" href={entryUrl} target="_blank" rel="noreferrer">{entryUrl}</a>
          {plan && <p className="mt-2 text-sm text-ink-soft">{plan.hypothesis}</p>}
        </div>
        <div className="space-y-1 text-sm text-ink-soft">
          {experiment.ends_at ? <p>Fim da distribuição · {localDate.format(new Date(experiment.ends_at))}</p> : <p>Encerramento manual</p>}
          {plan && experiment.decision_at && <p>Decisão a partir de {localDate.format(new Date(experiment.decision_at))}</p>}
        </div>
      </div>
      <div className="mt-5 flex flex-wrap items-center justify-between gap-4 border border-ink/15 bg-white p-4">
        <div className="space-y-1 text-sm text-ink-soft">
          <p className="font-semibold text-ink">Distribuição planejada {experiment.baseline_allocation}/{100 - experiment.baseline_allocation}</p>
          {total > 0 && <p>Observada · {pct(rate(a.browsers ?? 0, total))} em A · {pct(rate(b.browsers ?? 0, total))} em B</p>}
          {plan && <p>Amostra · A {count.format(a.browsers ?? 0)}/{count.format(plan.perVariant)} · B {count.format(b.browsers ?? 0)}/{count.format(plan.perVariant)}</p>}
          {mismatch && <p className="font-semibold text-red-800" role="status">Distribuição fora do esperado. Investigue a coleta antes da decisão.</p>}
          {experiment.revision_changed && <p className="font-semibold text-red-800" role="status">O deploy mudou. Encerre esta rodada sem vencedora antes de testar a nova versão.</p>}
        </div>
        {!experiment.revision_changed && (paused || !collectionEnded) && <button disabled={busy} onClick={() => void control(paused ? "resume" : "pause")} className="min-h-11 border border-ink/20 px-4 text-sm font-semibold disabled:opacity-50">{paused ? "Retomar teste" : "Pausar teste"}</button>}
      </div>
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <ResultCard label="Versão A" name={experiment.baseline_name} url={landingUrl(experiment.baseline_host, experiment.baseline_path)} metrics={a} plan={plan} />
        <ResultCard label="Versão B" name={experiment.challenger_name} url={landingUrl(experiment.challenger_host, experiment.challenger_path)} metrics={b} plan={plan} />
      </div>
      {result && result.lower !== undefined && result.upper !== undefined && <p className="mt-4 text-sm text-ink-soft">
        Diferença B − A de {percentagePoints.format(b.value - a.value)} p.p. · IC 95% de {percentagePoints.format(100 * result.lower)} a {percentagePoints.format(100 * result.upper)} p.p.
      </p>}
      <div className="mt-6 border-t border-ink/15 pt-5">
        <p className="font-semibold">Encerramento e publicação</p>
        <p className="mt-1 text-sm text-ink-soft">{plan ? `A publicação exige amostra suficiente, distribuição equilibrada e diferença de pelo menos ${percentagePoints.format(plan.minimumLift)} p.p. com intervalo de confiança que exclua zero.` : "A decisão automática exige pelo menos 1.000 navegadores e 30 sessões com clique por variante."}</p>
        {reviewReady && result && "reason" in result && result.reason && <p className="mt-1 text-sm font-semibold">{inconclusiveReasons[result.reason]}</p>}
        <div className="mt-3 flex flex-wrap gap-3">
          {canPublish && (!plan || suggestedWinner === "baseline") && <button disabled={busy} onClick={() => void chooseWinner(experiment.baseline_page_id, experiment.baseline_name)} className="bg-ink px-4 py-3 text-sm font-semibold text-paper disabled:opacity-50">Finalizar e manter {experiment.baseline_name}</button>}
          {canPublish && (!plan || suggestedWinner === "challenger") && <button disabled={busy} onClick={() => void chooseWinner(experiment.challenger_page_id, experiment.challenger_name)} className="bg-ink px-4 py-3 text-sm font-semibold text-paper disabled:opacity-50">Finalizar e usar {experiment.challenger_name}</button>}
          <button disabled={busy} onClick={() => void control("cancel")} className="border border-red-700 px-4 py-3 text-sm font-semibold text-red-800 disabled:opacity-50">Encerrar sem vencedora</button>
        </div>
      </div>
    </section>
  );
}

function CreateExperiment({ pages, busy, mutate }: {
  pages: Page[]; busy: boolean; mutate: Mutate;
}) {
  const initialA = pages.find((page) => page.host === HOME_HOST && page.path === "/")?.id ?? "";
  const initialB = pages.find((page) => page.host === HOME_HOST && page.path === "/b")?.id ?? "";
  const [baselineId, setBaselineId] = useState(initialA);
  const [challengerId, setChallengerId] = useState(initialB);
  const baseline = pages.find((page) => page.id === baselineId);
  const challenger = pages.find((page) => page.id === challengerId);
  const candidates = pages.filter((page) => !baseline ||
    landingContentKey(page.host, page.path) !== landingContentKey(baseline.host, baseline.path));
  const validPair = baseline && challenger && candidates.includes(challenger);
  const [mode, setMode] = useState<ExperimentMode>("automatic");
  const [metric, setMetric] = useState<ExperimentMetric>("qualified_lead");
  const [baselineRate, setBaselineRate] = useState("");
  const [minimumLift, setMinimumLift] = useState("");
  const [dailyBrowsers, setDailyBrowsers] = useState("8");
  const [duration, setDuration] = useState("");
  const sample = planSample(Number(baselineRate), Number(minimumLift), Number(dailyBrowsers));
  const durationDays = duration ? Number(duration) : Math.min(sample?.collectionDays ?? 14, MAX_COLLECTION_DAYS);
  const shortfall = Boolean(sample && durationDays < sample.collectionDays);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    await mutate("/api/admin/experiments", {
      name: form.get("name"), baselinePageId: baselineId, challengerPageId: challengerId, mode, durationDays,
      plan: {
        hypothesis: form.get("hypothesis"), metric, baselineRate: Number(baselineRate), minimumLift: Number(minimumLift),
        dailyBrowsers: Number(dailyBrowsers), attributionDays: Number(form.get("attributionDays")),
      },
    });
  }
  return (
    <section className="mt-8 border border-ink/15 bg-white p-6">
      <h2 className="text-2xl font-semibold">Planejar novo teste</h2>
      <p className="mt-2 text-sm text-ink-soft">A URL de A divide o tráfego em 50/50. Uma mudança na versão do deploy interrompe a coleta.</p>
      <form onSubmit={submit} className="mt-6 grid gap-4 md:grid-cols-2">
        <div className="md:col-span-2"><Field label="Nome do teste"><input name="name" required maxLength={200} placeholder="Home original × Criminalista 24h" className="admin-input" /></Field></div>
        <Field label="Versão A"><select value={baselineId} onChange={(event) => { setBaselineId(event.target.value); setChallengerId(""); }} required className="admin-input"><option value="">Selecione</option>{pages.map((page) => <option key={page.id} value={page.id}>{page.name} · {pageUrl(page)}</option>)}</select></Field>
        <Field label="Versão B"><select value={challengerId} onChange={(event) => setChallengerId(event.target.value)} required className="admin-input"><option value="">Selecione</option>{candidates.map((page) => <option key={page.id} value={page.id}>{page.name} · {pageUrl(page)}</option>)}</select></Field>
        {baseline && <p className="break-all text-sm md:col-span-2">URL de entrada <strong>{pageUrl(baseline)}</strong></p>}
        <div className="md:col-span-2"><Field label="Hipótese"><textarea name="hypothesis" required maxLength={400} rows={2} placeholder="A Criminalista 24h aumenta a taxa de leads qualificados por navegador." className="admin-input" /></Field></div>
        <Field label="Métrica principal"><select value={metric} onChange={(event) => {
          setMetric(event.target.value as ExperimentMetric);
          setBaselineRate("");
          setMinimumLift("");
        }} className="admin-input">{Object.entries(metricLabels).map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select></Field>
        <Field label="Navegadores por dia, somando A e B"><input type="number" min="1" required value={dailyBrowsers} onChange={(event) => setDailyBrowsers(event.target.value)} className="admin-input" /></Field>
        <Field label="Taxa histórica (%)"><input type="number" min="0.1" max="99.8" step="0.1" required value={baselineRate} onChange={(event) => setBaselineRate(event.target.value)} className="admin-input" /></Field>
        <Field label="Melhora mínima (pontos percentuais)"><input type="number" min="0.1" max="99.8" step="0.1" required value={minimumLift} onChange={(event) => setMinimumLift(event.target.value)} className="admin-input" /></Field>
        <Field label="Prazo de distribuição em dias"><input type="number" min="1" max={MAX_COLLECTION_DAYS} placeholder={String(durationDays)} value={duration} onChange={(event) => setDuration(event.target.value)} className="admin-input" /></Field>
        <Field label="Janela de qualificação em dias desde a primeira visita"><input name="attributionDays" type="number" min="1" max={MAX_ATTRIBUTION_DAYS} required defaultValue="3" className="admin-input" /></Field>
        <Field label="Encerramento"><select value={mode} onChange={(event) => setMode(event.target.value as ExperimentMode)} className="admin-input"><option value="automatic">Publicação automática com evidência</option><option value="manual">Revisão manual antes da publicação</option></select></Field>
        <div className="border border-ink/15 bg-[#fffaf0] p-4 text-sm md:col-span-2" aria-live="polite">
          {sample ? <>
            <p><strong>{count.format(sample.perVariant)} navegadores por variante</strong> · {count.format(sample.collectionDays)} dias estimados de distribuição com o tráfego informado.</p>
            <p className="mt-1 text-ink-soft">Poder de 80%, significância bilateral de 5%. A decisão aguarda a janela de qualificação.</p>
            {shortfall && <p className="mt-2 font-semibold text-amber-900">O prazo configurado de {durationDays} dias fica abaixo da estimativa. A revisão manual permite usar a rodada para validar a medição.</p>}
          </> : <p className="text-ink-soft">Informe a taxa histórica da métrica e a melhora mínima para calcular a amostra. A soma precisa ficar abaixo de 100%.</p>}
        </div>
        <button disabled={busy || !validPair || !sample || (mode === "automatic" && shortfall)} className="min-h-12 bg-ink px-5 font-semibold text-paper disabled:opacity-50 md:col-span-2">Iniciar teste 50/50</button>
      </form>
    </section>
  );
}

function RecordLead({ busy, mutate }: { busy: boolean; mutate: Mutate }) {
  const [saved, setSaved] = useState(false);
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
      <h2 className="text-xl font-semibold">Registrar atendimento</h2>
      <p className="mt-2 text-sm text-ink-soft">Copie o código AB da mensagem recebida. Uma referência conta uma vez por estágio.</p>
      <form className="mt-4 grid gap-4 sm:grid-cols-2" onSubmit={submit}>
        <Field label="Referência do WhatsApp"><input name="reference" required maxLength={32} placeholder="AB-0123456789ABCDEF" spellCheck={false} autoComplete="off" className="admin-input" /></Field>
        <Field label="Estágio"><select name="stage" className="admin-input"><option value="conversation">Conversa iniciada</option><option value="qualified">Lead qualificado</option></select></Field>
        <div className="flex flex-wrap items-center gap-3 sm:col-span-2">
          <button disabled={busy} className="min-h-11 bg-ink px-5 text-sm font-semibold text-paper disabled:opacity-50">Registrar atendimento</button>
          <p className="text-sm font-semibold text-emerald-800" role="status">{saved ? "Atendimento registrado." : ""}</p>
        </div>
      </form>
    </section>
  );
}

function AddPage({ busy, mutate }: { busy: boolean; mutate: (url: string, body: unknown) => Promise<boolean> }) {
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    if (await mutate("/api/admin/pages", { name: data.get("name"), path: data.get("path"), host: data.get("host") })) form.reset();
  }
  return (
    <section className="border border-ink/15 bg-white p-6">
      <h2 className="text-xl font-semibold">Cadastrar página</h2>
      <p className="mt-2 text-sm text-ink-soft">Use uma landing publicada com medição de WhatsApp habilitada.</p>
      <form onSubmit={submit} className="mt-5 space-y-4">
        <Field label="Nome"><input name="name" required placeholder="Home C" className="admin-input" /></Field>
        <Field label="Subdomínio para caminho relativo"><select name="host" className="admin-input"><option value={HOME_HOST}>goiania</option><option value={LANDING_HOST}>adv</option></select></Field>
        <Field label="Caminho ou URL"><input name="path" required placeholder="/c" className="admin-input" /></Field>
        <button disabled={busy} className="min-h-11 bg-ink px-5 text-sm font-semibold text-paper disabled:opacity-50">Cadastrar</button>
      </form>
    </section>
  );
}

function Pages({ pages, publications, activeEntryId, busy, mutate }: {
  pages: Page[]; publications: Dashboard["publications"]; activeEntryId?: string;
  busy: boolean; mutate: (url: string, body: unknown) => Promise<boolean>;
}) {
  return (
    <section className="border border-ink/15 bg-white p-6">
      <h2 className="text-xl font-semibold">Catálogo de landings</h2>
      <ul className="mt-5 divide-y divide-ink/10">
        {pages.map((page) => {
          const publication = publications.find(({ entry_page_id }) => entry_page_id === page.id);
          const published = publication && pages.find(({ id }) => id === publication.page_id);
          return (
            <li key={page.id} className="py-3">
              <p className="font-semibold">{page.name}</p>
              <a href={pageUrl(page)} target="_blank" rel="noreferrer" className="break-all text-sm text-ink-soft underline">{pageUrl(page)}</a>
              {!page.available && <p className="mt-1 text-sm text-red-800">Indisponível</p>}
              {page.available && !published && <p className="mt-1 text-sm text-ink-soft">Publicação da URL · página original</p>}
              {published && <div className="mt-2 text-sm">
                <p>Publicação da URL · {published.available ? published.name : "página original (vencedora indisponível)"}</p>
                <button type="button" disabled={busy || page.id === activeEntryId}
                  onClick={() => {
                    if (window.confirm(`Restaurar a página original de ${pageUrl(page)}?`)) {
                      void mutate("/api/admin/pages", { action: "restore", entryId: page.id });
                    }
                  }} className="mt-1 underline disabled:opacity-50">Restaurar página original</button>
              </div>}
            </li>
          );
        })}
      </ul>
    </section>
  );
}

const inconclusiveReasons: Record<string, string> = {
  minimum_sample: "Amostra insuficiente",
  confidence_interval: "Intervalo de confiança inclui zero",
  allocation_mismatch: "Desequilíbrio na distribuição",
  page_unavailable: "Página vencedora indisponível",
  minimum_lift: "Diferença abaixo da melhora mínima planejada",
  revision_changed: "Versão do deploy alterada durante o teste",
};

function History({ experiments }: { experiments: Experiment[] }) {
  return (
    <section className="mt-8">
      <h2 className="text-2xl font-semibold">Histórico</h2>
      {experiments.length === 0 ? <p className="mt-3 text-sm text-ink-soft">Nenhum teste encerrado.</p> : (
        <div className="mt-4 space-y-4">
          {experiments.map((experiment) => {
            const a = armMetrics(experiment, "baseline");
            const b = armMetrics(experiment, "challenger");
            const { plan } = experiment;
            const decision = experiment.decision_details;
            const reason = decision?.reason && inconclusiveReasons[decision.reason];
            const status = experiment.status === "cancelled" ? "Encerrado sem vencedora" :
              experiment.status === "inconclusive" ? "Inconclusivo" : `Página escolhida · ${experiment.winner_name}`;
            return (
              <article key={experiment.id} className="flex flex-wrap justify-between gap-3 border border-ink/15 bg-white p-5">
                <div>
                  <h3 className="font-semibold">{experiment.name}</h3>
                  <p className="break-all text-sm">{landingUrl(experiment.entry_host, experiment.entry_path)}</p>
                  {plan && <p className="mt-1 text-sm">{metricLabels[plan.metric]} · {count.format(plan.perVariant)} navegadores planejados por variante</p>}
                  <p className="mt-1 text-sm text-ink-soft">{experiment.baseline_name} · {historyMetric(a, plan)}</p>
                  <p className="text-sm text-ink-soft">{experiment.challenger_name} · {historyMetric(b, plan)}</p>
                  {!plan && a.browsers !== null && <p className="text-sm text-ink-soft">
                    {a.browsers} navegadores em A · {b.browsers ?? "—"} em B
                  </p>}
                  {(plan ? a.browsers && b.browsers : a.visits && b.visits) ? <p className="text-sm text-ink-soft">Diferença B − A de {percentagePoints.format(b.value - a.value)} p.p.</p> : null}
                  {reason && <p className="text-sm">{reason}</p>}
                  {decision?.lower !== undefined && decision.upper !== undefined && <p className="text-sm">
                    IC 95% da diferença B − A de {percentagePoints.format(100 * decision.lower)} a {percentagePoints.format(100 * decision.upper)} p.p.
                  </p>}
                </div>
                <div className="text-sm">
                  <p className="font-semibold">{status}</p>
                  <p className="text-ink-soft">{experiment.ended_at ? localDate.format(new Date(experiment.ended_at)) : "—"}</p>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
}

function historyMetric(metrics: ReturnType<typeof armMetrics>, plan: ExperimentPlan | null) {
  if (plan) return `${count.format(metrics.browsers ?? 0)} navegadores · ${count.format(metrics.clicks)} com clique · ${count.format(metrics.conversations)} com conversa · ${count.format(metrics.qualified)} qualificados · ${metrics.browsers ? pct(metrics.value) : "—"}`;
  return `${count.format(metrics.visits)} sessões · ${count.format(metrics.conversions)} com clique · ${metrics.visits ? pct(metrics.value) : "—"}`;
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <label className="block text-sm font-semibold">{label}<span className="mt-2 block">{children}</span></label>;
}
