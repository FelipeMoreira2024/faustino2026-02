"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(event: FormEvent) {
    event.preventDefault();
    setLoading(true);
    setError("");
    const response = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    const data = await response.json();
    setLoading(false);
    if (!response.ok) return setError(data.error ?? "Não foi possível entrar.");
    router.replace("/admin/experimentos");
    router.refresh();
  }

  return (
    <main className="min-h-screen bg-ink px-5 py-20 text-paper">
      <form onSubmit={submit} className="mx-auto max-w-md border border-brass/25 bg-ink-elevated p-7 shadow-2xl">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brass">Área administrativa</p>
        <h1 className="mt-3 font-display text-3xl font-semibold">Testes A/B</h1>
        <label className="mt-8 block text-sm font-semibold" htmlFor="password">Senha</label>
        <input
          id="password"
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className="mt-2 min-h-12 w-full border border-paper/20 bg-ink px-4 text-paper outline-none focus:border-brass"
          required
        />
        {error ? <p className="mt-3 text-sm text-red-300">{error}</p> : null}
        <button
          type="submit"
          disabled={loading}
          className="mt-6 min-h-12 w-full bg-brass px-5 font-semibold text-ink disabled:opacity-60"
        >
          {loading ? "Entrando…" : "Entrar"}
        </button>
      </form>
    </main>
  );
}
