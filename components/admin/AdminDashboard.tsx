"use client";

import { FormEvent, useCallback, useEffect, useState } from "react";

import { HOME_HOST, LANDING_HOST, landingUrl, landingContentKey } from "@/lib/ab/urls";
import { hasAllocationMismatch } from "@/lib/ab/stats";

type Page = { id: string; name: string; host: string; path: string; available: boolean };
type Experiment = {
  id: string;
  name: string;
  mode: "manual" | "automatic";
  status: "active" | "paused" | "completed" | "inconclusive" | "cancelled";
  started_at: string;
  ends_at: string | null;
  ended_at: string | null;
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
  baseline_participants: number | null;
  challenger_participants: number | null;
  baseline_visits: number;
  baseline_conversions: number;
  challenger_visits: number;
  challenger_conversions: number;
};
type Dashboard = { pages: Page[]; experiments: Experiment[]; publications: { entry_page_id: string; page_id: string }[] };
const pageUrl = (page: Page) => landingUrl(page.host, page.path);

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

function ResultCard({ label, name, url, visits, conversions, participants }: {
  label: string; name: string; url: string; visits: number; conversions: number; participants: number | null;
}) {
  return (
    <article className="border border-ink/15 bg-white p-5">
      <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#8a6c2d]">{label}</p>
      <h3 className="mt-2 text-xl font-semibold">{name}</h3>
      <a href={url} target="_blank" rel="noreferrer" className="text-sm text-ink-soft underline">{url}</a>
      <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Metric label="Sessões" value={String(visits)} />
        <Metric label="Navegadores" value={String(participants ?? "—")} />
        <Metric label="Cliques WhatsApp" value={String(conversions)} />
        <Metric label="Taxa" value={pct(rate(conversions, visits))} />
      </div>
    </article>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return <div><p className="text-xs text-ink-soft">{label}</p><p className="mt-1 text-2xl font-semibold">{value}</p></div>;
}

function ActiveExperiment({ experiment, busy, mutate }: {
  experiment: Experiment; busy: boolean; mutate: (url: string, body: unknown) => Promise<boolean>;
}) {
  const aRate = rate(experiment.baseline_conversions, experiment.baseline_visits);
  const bRate = rate(experiment.challenger_conversions, experiment.challenger_visits);
  const leader = !experiment.baseline_visits || !experiment.challenger_visits ? "Aguardando sessões das duas versões" : aRate === bRate ? "Empate no momento" : `${aRate > bRate ? experiment.baseline_name : experiment.challenger_name} está à frente no momento`;
  const paused = experiment.status === "paused";
  const entryUrl = landingUrl(experiment.entry_host, experiment.entry_path);
  const mismatch = hasAllocationMismatch(experiment.baseline_participants ?? 0, experiment.challenger_participants ?? 0);
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
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#8a6c2d]">{paused ? "Teste pausado" : "Teste ativo"}</p>
          <h2 className="mt-2 text-2xl font-semibold">{experiment.name}</h2>
          <a className="break-all text-sm underline" href={entryUrl} target="_blank" rel="noreferrer">{entryUrl}</a>
          {mismatch && <p className="mt-2 text-sm font-semibold text-red-800" role="status">Distribuição fora do esperado. A decisão automática está bloqueada enquanto houver desequilíbrio.</p>}
          <p className="mt-2 text-sm text-ink-soft">{leader} · diferença de {Math.abs(aRate - bRate).toLocaleString("pt-BR", { maximumFractionDigits: 1 })} pontos percentuais</p>
        </div>
        <p className="text-sm text-ink-soft">{experiment.ends_at ? `Prazo: ${new Date(experiment.ends_at).toLocaleDateString("pt-BR")}` : "Encerramento manual"}</p>
      </div>
      <div className="mt-5 flex flex-wrap items-center justify-between gap-4 border border-ink/15 bg-white p-4">
        <div><p className="font-semibold">Distribuição e coleta</p><p className="text-sm text-ink-soft">{paused ? "Pausadas. A URL exibe o conteúdo publicado antes do teste." : "Ativas. A URL de entrada distribui visitantes entre A e B."}</p></div>
        <button role="switch" aria-checked={!paused} disabled={busy} onClick={() => void control(paused ? "resume" : "pause")} className={`min-w-32 rounded-full px-4 py-2 text-sm font-semibold text-white disabled:opacity-50 ${paused ? "bg-slate-500" : "bg-emerald-700"}`}>{paused ? "Retomar teste" : "Pausar teste"}</button>
      </div>
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <ResultCard label="Versão A" name={experiment.baseline_name} url={landingUrl(experiment.baseline_host, experiment.baseline_path)} participants={experiment.baseline_participants} visits={experiment.baseline_visits} conversions={experiment.baseline_conversions} />
        <ResultCard label="Versão B" name={experiment.challenger_name} url={landingUrl(experiment.challenger_host, experiment.challenger_path)} participants={experiment.challenger_participants} visits={experiment.challenger_visits} conversions={experiment.challenger_conversions} />
      </div>
      <div className="mt-6 border-t border-ink/15 pt-5">
        <p className="font-semibold">Finalizar e escolher a página da URL de entrada</p>
        <p className="mt-1 text-sm text-ink-soft">Escolher uma página encerra o teste e passa a exibi-la em {entryUrl}.</p>
        <div className="mt-3 flex flex-wrap gap-3">
          <button disabled={busy} onClick={() => void chooseWinner(experiment.baseline_page_id, experiment.baseline_name)} className="bg-ink px-4 py-3 text-sm font-semibold text-paper disabled:opacity-50">Finalizar e manter {experiment.baseline_name}</button>
          <button disabled={busy} onClick={() => void chooseWinner(experiment.challenger_page_id, experiment.challenger_name)} className="bg-ink px-4 py-3 text-sm font-semibold text-paper disabled:opacity-50">Finalizar e usar {experiment.challenger_name}</button>
          <button disabled={busy} onClick={() => void control("cancel")} className="border border-red-700 px-4 py-3 text-sm font-semibold text-red-800 disabled:opacity-50">Encerrar sem vencedora</button>
        </div>
        <p className="mt-3 text-sm">A decisão automática ocorre somente no prazo definido, com pelo menos 1.000 navegadores e 30 conversões em cada página.</p>
      </div>
    </section>
  );
}

function CreateExperiment({ pages, busy, mutate }: {
  pages: Page[]; busy: boolean; mutate: (url: string, body: unknown) => Promise<boolean>;
}) {
  const [baselineId, setBaselineId] = useState("");
  const [challengerId, setChallengerId] = useState("");
  const baseline = pages.find((page) => page.id === baselineId);
  const challenger = pages.find((page) => page.id === challengerId);
  const candidates = pages.filter((page) => !baseline ||
    landingContentKey(page.host, page.path) !== landingContentKey(baseline.host, baseline.path));
  const validPair = baseline && challenger && candidates.includes(challenger);
  const [mode, setMode] = useState<"manual" | "automatic">("automatic");
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    await mutate("/api/admin/experiments", {
      name: form.get("name"), baselinePageId: baselineId,
      challengerPageId: form.get("challengerPageId"), mode,
      durationDays: Number(form.get("durationDays")),
    });
  }
  return (
    <section className="mt-8 border border-ink/15 bg-white p-6">
      <h2 className="text-2xl font-semibold">Iniciar novo teste</h2>
      <p className="mt-2 text-sm text-ink-soft">Escolha duas landings. A URL da versão A recebe o tráfego do teste.</p>
      <form onSubmit={submit} className="mt-6 grid gap-4 md:grid-cols-2">
        <Field label="Nome do teste"><input name="name" required placeholder="Ex.: Home original × Home B" className="admin-input" /></Field>
        <Field label="Versão A"><select value={baselineId} onChange={(event) => { setBaselineId(event.target.value); setChallengerId(""); }} required className="admin-input"><option value="">Selecione</option>{pages.map((page) => <option key={page.id} value={page.id}>{page.name} · {pageUrl(page)}</option>)}</select></Field>
        <Field label="Versão B"><select name="challengerPageId" value={challengerId} onChange={(event) => setChallengerId(event.target.value)} required className="admin-input"><option value="">Selecione</option>{candidates.map((page) => <option key={page.id} value={page.id}>{page.name} · {pageUrl(page)}</option>)}</select></Field>
        {baseline && <p className="break-all text-sm md:col-span-2">URL de entrada <strong>{pageUrl(baseline)}</strong></p>}
        <Field label="Encerramento"><select value={mode} onChange={(event) => setMode(event.target.value as typeof mode)} className="admin-input"><option value="automatic">Automático com evidência</option><option value="manual">Manual</option></select></Field>
        <Field label="Prazo em dias"><input name="durationDays" type="number" min="1" max="90" defaultValue="14" disabled={mode === "manual"} className="admin-input disabled:opacity-50" /></Field>
        <button disabled={busy || !validPair} className="min-h-12 bg-ink px-5 font-semibold text-paper disabled:opacity-50 md:col-span-2">Iniciar teste 50/50</button>
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
};

function History({ experiments }: { experiments: Experiment[] }) {
  return (
    <section className="mt-8">
      <h2 className="text-2xl font-semibold">Histórico</h2>
      {experiments.length === 0 ? <p className="mt-3 text-sm text-ink-soft">Nenhum teste encerrado.</p> : (
        <div className="mt-4 space-y-4">
          {experiments.map((experiment) => {
            const rateA = rate(experiment.baseline_conversions, experiment.baseline_visits);
            const rateB = rate(experiment.challenger_conversions, experiment.challenger_visits);
            const decision = experiment.decision_details;
            const reason = decision?.reason && inconclusiveReasons[decision.reason];
            const status = experiment.status === "cancelled" ? "Encerrado sem vencedora" :
              experiment.status === "inconclusive" ? "Inconclusivo" : `Página escolhida · ${experiment.winner_name}`;
            return (
              <article key={experiment.id} className="flex flex-wrap justify-between gap-3 border border-ink/15 bg-white p-5">
                <div>
                  <h3 className="font-semibold">{experiment.name}</h3>
                  <p className="break-all text-sm">{landingUrl(experiment.entry_host, experiment.entry_path)}</p>
                  <p className="mt-1 text-sm text-ink-soft">
                    {experiment.baseline_name} · {experiment.baseline_visits} sessões · {experiment.baseline_conversions} cliques · {pct(rateA)}
                  </p>
                  <p className="text-sm text-ink-soft">
                    {experiment.challenger_name} · {experiment.challenger_visits} sessões · {experiment.challenger_conversions} cliques · {pct(rateB)}
                  </p>
                  {experiment.baseline_participants !== null && <p className="text-sm text-ink-soft">
                    {experiment.baseline_participants} navegadores em A · {experiment.challenger_participants} em B
                  </p>}
                  <p className="text-sm text-ink-soft">Diferença B − A de {(rateB - rateA).toFixed(1)} p.p.</p>
                  {reason && <p className="text-sm">{reason}</p>}
                  {decision?.lower !== undefined && decision.upper !== undefined && <p className="text-sm">
                    IC 95% da diferença B − A de {(100 * decision.lower).toFixed(1)} a {(100 * decision.upper).toFixed(1)} p.p.
                  </p>}
                </div>
                <div className="text-sm">
                  <p className="font-semibold">{status}</p>
                  <p className="text-ink-soft">{experiment.ended_at ? new Date(experiment.ended_at).toLocaleDateString("pt-BR") : "—"}</p>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <label className="block text-sm font-semibold">{label}<span className="mt-2 block">{children}</span></label>;
}
