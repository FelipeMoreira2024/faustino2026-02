"use client";

import { FormEvent, useCallback, useEffect, useMemo, useState } from "react";

type Page = { id: string; name: string; path: string };
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
  baseline_path: string;
  challenger_page_id: string;
  challenger_name: string;
  challenger_path: string;
  winner_page_id: string | null;
  winner_name: string | null;
  decision_type: string | null;
  baseline_visits: number;
  baseline_conversions: number;
  challenger_visits: number;
  challenger_conversions: number;
};
type Dashboard = { pages: Page[]; experiments: Experiment[]; currentPageId: string | null };
const SITE_URL = "https://goiania.rodrigofaustinoadvocacia.com.br";
const pageUrl = (path: string) => `${SITE_URL}${path === "/" ? "" : path}`;

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
    void load();
    const timer = window.setInterval(() => void load(), 30_000);
    return () => window.clearInterval(timer);
  }, [load]);

  const active = data?.experiments.find((experiment) => ["active", "paused"].includes(experiment.status));
  const currentPage = data?.pages.find((page) => page.id === data.currentPageId);

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
    setBusy(false);
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
            <p className="mt-2 text-sm text-ink-soft">URL de entrada e referência do teste</p>
            <a className="mt-1 block font-semibold underline" href={SITE_URL} target="_blank" rel="noreferrer">{SITE_URL}/</a>
            <p className="mt-1 text-xs text-ink-soft">Página exibida quando o teste está pausado ou encerrado: {currentPage ? `${currentPage.name} — ${pageUrl(currentPage.path)}` : "—"}</p>
          </div>
          <button onClick={logout} className="border border-ink/20 px-4 py-2 text-sm font-semibold">Sair</button>
        </header>

        {error ? <div className="mt-6 border border-red-300 bg-red-50 p-4 text-sm text-red-800">{error}</div> : null}
        {!data && !error ? <p className="mt-8">Carregando resultados…</p> : null}

        {data ? (
          <>
            {active ? <ActiveExperiment experiment={active} busy={busy} mutate={mutate} /> : (
              <CreateExperiment pages={data.pages} currentPageId={data.currentPageId} busy={busy} mutate={mutate} />
            )}
            <div className="mt-8 grid gap-6 lg:grid-cols-2">
              <AddPage busy={busy} mutate={mutate} />
              <Pages pages={data.pages} />
            </div>
            <History experiments={data.experiments.filter((experiment) => experiment.status !== "active")} />
          </>
        ) : null}
      </div>
    </main>
  );
}

function ResultCard({ label, name, path, visits, conversions }: {
  label: string; name: string; path: string; visits: number; conversions: number;
}) {
  return (
    <article className="border border-ink/15 bg-white p-5">
      <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#8a6c2d]">{label}</p>
      <h3 className="mt-2 text-xl font-semibold">{name}</h3>
      <a href={pageUrl(path)} target="_blank" rel="noreferrer" className="text-sm text-ink-soft underline">{pageUrl(path)}</a>
      <div className="mt-5 grid grid-cols-3 gap-3">
        <Metric label="Visitas" value={String(visits)} />
        <Metric label="Conversões" value={String(conversions)} />
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
  const leader = aRate === bRate ? "Empate no momento" : `${aRate > bRate ? experiment.baseline_name : experiment.challenger_name} está à frente no momento`;
  const paused = experiment.status === "paused";
  async function chooseWinner(pageId: string, name: string, path: string) {
    if (!window.confirm(`Finalizar o teste e exibir ${name} (${pageUrl(path)}) na URL principal?`)) return;
    await mutate(`/api/admin/experiments/${experiment.id}/end`, { decisionType: "manual", winnerPageId: pageId });
  }
  async function control(action: "pause" | "resume" | "cancel") {
    if (action === "cancel" && !window.confirm("Encerrar o teste sem vencedora? A página de referência atual continuará na home e os resultados ficarão no histórico.")) return;
    await mutate(`/api/admin/experiments/${experiment.id}/control`, { action });
  }
  return (
    <section className="mt-8 border border-[#b99a54]/40 bg-[#fffaf0] p-6">
      <div className="flex flex-wrap justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#8a6c2d]">{paused ? "Teste pausado" : "Teste ativo"}</p>
          <h2 className="mt-2 text-2xl font-semibold">{experiment.name}</h2>
          <p className="mt-2 text-sm text-ink-soft">{leader} · diferença de {Math.abs(aRate - bRate).toLocaleString("pt-BR", { maximumFractionDigits: 1 })} pontos percentuais</p>
        </div>
        <p className="text-sm text-ink-soft">{experiment.ends_at ? `Prazo: ${new Date(experiment.ends_at).toLocaleDateString("pt-BR")}` : "Encerramento manual"}</p>
      </div>
      <div className="mt-5 flex flex-wrap items-center justify-between gap-4 border border-ink/15 bg-white p-4">
        <div><p className="font-semibold">Distribuição e coleta</p><p className="text-sm text-ink-soft">{paused ? "Pausadas. Todos veem a página de referência e nenhum dado é coletado." : "Ativas. A URL principal distribui visitantes entre A e B."}</p></div>
        <button role="switch" aria-checked={!paused} disabled={busy} onClick={() => void control(paused ? "resume" : "pause")} className={`min-w-32 rounded-full px-4 py-2 text-sm font-semibold text-white disabled:opacity-50 ${paused ? "bg-slate-500" : "bg-emerald-700"}`}>{paused ? "Retomar teste" : "Pausar teste"}</button>
      </div>
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <ResultCard label="Versão A · página de referência atual" name={experiment.baseline_name} path={experiment.baseline_path} visits={experiment.baseline_visits} conversions={experiment.baseline_conversions} />
        <ResultCard label="Versão B · concorrente" name={experiment.challenger_name} path={experiment.challenger_path} visits={experiment.challenger_visits} conversions={experiment.challenger_conversions} />
      </div>
      <div className="mt-6 border-t border-ink/15 pt-5">
        <p className="font-semibold">Finalizar e escolher a página da URL principal</p>
        <p className="mt-1 text-sm text-ink-soft">Escolher uma página encerra o teste e passa a exibi-la em {SITE_URL}/.</p>
        <div className="mt-3 flex flex-wrap gap-3">
          <button disabled={busy} onClick={() => void chooseWinner(experiment.baseline_page_id, experiment.baseline_name, experiment.baseline_path)} className="bg-ink px-4 py-3 text-sm font-semibold text-paper disabled:opacity-50">Finalizar e manter {experiment.baseline_name}</button>
          <button disabled={busy} onClick={() => void chooseWinner(experiment.challenger_page_id, experiment.challenger_name, experiment.challenger_path)} className="bg-ink px-4 py-3 text-sm font-semibold text-paper disabled:opacity-50">Finalizar e usar {experiment.challenger_name}</button>
          <button disabled={busy} onClick={() => void control("cancel")} className="border border-red-700 px-4 py-3 text-sm font-semibold text-red-800 disabled:opacity-50">Encerrar sem vencedora</button>
        </div>
        <p className="mt-3 text-sm">A decisão automática ocorre somente no prazo definido, com pelo menos 1.000 navegadores e 30 conversões em cada página.</p>
      </div>
    </section>
  );
}

function CreateExperiment({ pages, currentPageId, busy, mutate }: {
  pages: Page[]; currentPageId: string | null; busy: boolean; mutate: (url: string, body: unknown) => Promise<boolean>;
}) {
  const candidates = useMemo(() => pages.filter((page) => page.id !== currentPageId), [pages, currentPageId]);
  const [mode, setMode] = useState<"manual" | "automatic">("automatic");
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    await mutate("/api/admin/experiments", {
      name: form.get("name"), baselinePageId: currentPageId,
      challengerPageId: form.get("challengerPageId"), mode,
      durationDays: Number(form.get("durationDays")),
    });
  }
  return (
    <section className="mt-8 border border-ink/15 bg-white p-6">
      <h2 className="text-2xl font-semibold">Iniciar novo teste</h2>
      <p className="mt-2 text-sm text-ink-soft">A referência atual será a versão A. Os acessos a {SITE_URL}/ serão divididos igualmente.</p>
      <form onSubmit={submit} className="mt-6 grid gap-4 md:grid-cols-2">
        <Field label="Nome do teste"><input name="name" required placeholder="Ex.: Home original × Home B" className="admin-input" /></Field>
        <Field label="Página concorrente"><select name="challengerPageId" required className="admin-input"><option value="">Selecione</option>{candidates.map((page) => <option key={page.id} value={page.id}>{page.name} ({page.path})</option>)}</select></Field>
        <Field label="Encerramento"><select value={mode} onChange={(event) => setMode(event.target.value as typeof mode)} className="admin-input"><option value="automatic">Automático com evidência</option><option value="manual">Manual</option></select></Field>
        <Field label="Prazo em dias"><input name="durationDays" type="number" min="1" max="90" defaultValue="14" disabled={mode === "manual"} className="admin-input disabled:opacity-50" /></Field>
        <button disabled={busy || !currentPageId || candidates.length === 0} className="min-h-12 bg-ink px-5 font-semibold text-paper disabled:opacity-50 md:col-span-2">Iniciar teste 50/50</button>
      </form>
    </section>
  );
}

function AddPage({ busy, mutate }: { busy: boolean; mutate: (url: string, body: unknown) => Promise<boolean> }) {
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    if (await mutate("/api/admin/pages", { name: data.get("name"), path: data.get("path") })) form.reset();
  }
  return (
    <section className="border border-ink/15 bg-white p-6">
      <h2 className="text-xl font-semibold">Cadastrar página</h2>
      <p className="mt-2 text-sm text-ink-soft">A página precisa estar publicada neste site.</p>
      <form onSubmit={submit} className="mt-5 space-y-4">
        <Field label="Nome"><input name="name" required placeholder="Home C" className="admin-input" /></Field>
        <Field label="Caminho ou URL"><input name="path" required placeholder="/c" className="admin-input" /></Field>
        <button disabled={busy} className="min-h-11 bg-ink px-5 text-sm font-semibold text-paper disabled:opacity-50">Cadastrar</button>
      </form>
    </section>
  );
}

function Pages({ pages }: { pages: Page[] }) {
  return <section className="border border-ink/15 bg-white p-6"><h2 className="text-xl font-semibold">Páginas disponíveis</h2><ul className="mt-5 divide-y divide-ink/10">{pages.map((page) => <li key={page.id} className="flex justify-between gap-4 py-3"><span className="font-semibold">{page.name}</span><a href={pageUrl(page.path)} target="_blank" rel="noreferrer" className="break-all text-right text-ink-soft underline">{pageUrl(page.path)}</a></li>)}</ul></section>;
}

function History({ experiments }: { experiments: Experiment[] }) {
  return (
    <section className="mt-8">
      <h2 className="text-2xl font-semibold">Histórico</h2>
      {experiments.length === 0 ? <p className="mt-3 text-sm text-ink-soft">Nenhum teste encerrado.</p> : (
        <div className="mt-4 space-y-4">{experiments.map((experiment) => <article key={experiment.id} className="border border-ink/15 bg-white p-5"><div className="flex flex-wrap justify-between gap-3"><div><h3 className="font-semibold">{experiment.name}</h3><p className="mt-1 text-sm text-ink-soft">{experiment.baseline_name}: {experiment.baseline_visits} visitas, {experiment.baseline_conversions} conversões, {pct(rate(experiment.baseline_conversions, experiment.baseline_visits))} · {experiment.challenger_name}: {experiment.challenger_visits} visitas, {experiment.challenger_conversions} conversões, {pct(rate(experiment.challenger_conversions, experiment.challenger_visits))}</p></div><div className="text-right text-sm"><p className="font-semibold">{experiment.status === "cancelled" ? "Encerrado sem vencedora" : experiment.status === "inconclusive" ? "Inconclusivo — referência mantida" : `Página escolhida: ${experiment.winner_name}`}</p><p className="text-ink-soft">{experiment.ended_at ? new Date(experiment.ended_at).toLocaleDateString("pt-BR") : "—"}</p></div></div></article>)}</div>
      )}
    </section>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <label className="block text-sm font-semibold">{label}<span className="mt-2 block">{children}</span></label>;
}
