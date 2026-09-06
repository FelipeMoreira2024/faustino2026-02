"use client";

import { FormEvent, useCallback, useEffect, useMemo, useState } from "react";

type Page = { id: string; name: string; path: string };
type Experiment = {
  id: string;
  name: string;
  mode: "manual" | "automatic";
  status: "active" | "completed" | "inconclusive";
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
    const response = await fetch("/api/admin/dashboard", { cache: "no-store" });
    const payload = await response.json();
    if (response.status === 401) return window.location.assign("/admin/login");
    if (!response.ok) return setError(payload.error ?? "Não foi possível carregar os dados.");
    setData(payload);
    setError("");
  }, []);

  useEffect(() => {
    void load();
    const timer = window.setInterval(() => void load(), 30_000);
    return () => window.clearInterval(timer);
  }, [load]);

  const active = data?.experiments.find((experiment) => experiment.status === "active");
  const currentPage = data?.pages.find((page) => page.id === data.currentPageId);

  async function mutate(url: string, body: unknown) {
    setBusy(true);
    setError("");
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
            <p className="mt-2 text-sm text-ink-soft">Home atual: {currentPage ? `${currentPage.name} (${currentPage.path})` : "—"}</p>
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
      <p className="text-sm text-ink-soft">{path}</p>
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
  return (
    <section className="mt-8 border border-[#b99a54]/40 bg-[#fffaf0] p-6">
      <div className="flex flex-wrap justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#8a6c2d]">Teste ativo</p>
          <h2 className="mt-2 text-2xl font-semibold">{experiment.name}</h2>
          <p className="mt-2 text-sm text-ink-soft">{leader} · diferença de {pct(Math.abs(aRate - bRate))}</p>
        </div>
        <p className="text-sm text-ink-soft">{experiment.ends_at ? `Prazo: ${new Date(experiment.ends_at).toLocaleDateString("pt-BR")}` : "Encerramento manual"}</p>
      </div>
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <ResultCard label="Versão A · base" name={experiment.baseline_name} path={experiment.baseline_path} visits={experiment.baseline_visits} conversions={experiment.baseline_conversions} />
        <ResultCard label="Versão B · concorrente" name={experiment.challenger_name} path={experiment.challenger_path} visits={experiment.challenger_visits} conversions={experiment.challenger_conversions} />
      </div>
      <div className="mt-6 flex flex-wrap gap-3">
        <button disabled={busy} onClick={() => mutate(`/api/admin/experiments/${experiment.id}/end`, { decisionType: "manual", winnerPageId: experiment.baseline_page_id })} className="bg-ink px-4 py-3 text-sm font-semibold text-paper disabled:opacity-50">Encerrar com A</button>
        <button disabled={busy} onClick={() => mutate(`/api/admin/experiments/${experiment.id}/end`, { decisionType: "manual", winnerPageId: experiment.challenger_page_id })} className="bg-ink px-4 py-3 text-sm font-semibold text-paper disabled:opacity-50">Encerrar com B</button>
        <button disabled={busy} onClick={() => mutate(`/api/admin/experiments/${experiment.id}/end`, { decisionType: "automatic" })} className="border border-ink/25 px-4 py-3 text-sm font-semibold disabled:opacity-50">Avaliar evidência agora</button>
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
      <p className="mt-2 text-sm text-ink-soft">A vencedora atual será a versão A. As visitas da home serão divididas igualmente.</p>
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
  return <section className="border border-ink/15 bg-white p-6"><h2 className="text-xl font-semibold">Páginas disponíveis</h2><ul className="mt-5 divide-y divide-ink/10">{pages.map((page) => <li key={page.id} className="flex justify-between gap-4 py-3"><span className="font-semibold">{page.name}</span><span className="text-ink-soft">{page.path}</span></li>)}</ul></section>;
}

function History({ experiments }: { experiments: Experiment[] }) {
  return (
    <section className="mt-8">
      <h2 className="text-2xl font-semibold">Histórico</h2>
      {experiments.length === 0 ? <p className="mt-3 text-sm text-ink-soft">Nenhum teste encerrado.</p> : (
        <div className="mt-4 space-y-4">{experiments.map((experiment) => <article key={experiment.id} className="border border-ink/15 bg-white p-5"><div className="flex flex-wrap justify-between gap-3"><div><h3 className="font-semibold">{experiment.name}</h3><p className="mt-1 text-sm text-ink-soft">{experiment.baseline_name}: {pct(rate(experiment.baseline_conversions, experiment.baseline_visits))} · {experiment.challenger_name}: {pct(rate(experiment.challenger_conversions, experiment.challenger_visits))}</p></div><div className="text-right text-sm"><p className="font-semibold">{experiment.status === "inconclusive" ? "Inconclusivo" : `Vencedora: ${experiment.winner_name}`}</p><p className="text-ink-soft">{experiment.ended_at ? new Date(experiment.ended_at).toLocaleDateString("pt-BR") : "—"}</p></div></div></article>)}</div>
      )}
    </section>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <label className="block text-sm font-semibold">{label}<span className="mt-2 block">{children}</span></label>;
}
