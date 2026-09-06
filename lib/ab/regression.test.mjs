import assert from "node:assert/strict";
import test from "node:test";
import { readFileSync } from "node:fs";
import vm from "node:vm";
import ts from "typescript";

function load(file, modules, globals = {}) {
  const exports = {};
  const source = ts.transpileModule(readFileSync(file, "utf8"), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true },
  }).outputText;
  vm.runInNewContext(source, { exports, require: (name) => {
    if (!(name in modules)) throw new Error(`Unexpected dependency ${name}`);
    return modules[name];
  }, Date, URL, Headers, AbortSignal, ...globals });
  return exports;
}

test("aba oculta registra visita quando fica visível e navegação interna reativa coleta", async () => {
  let pathname = "/";
  let effect;
  let calls = 0;
  const listeners = new Map();
  const target = { addEventListener: (name, fn) => listeners.set(name, fn), removeEventListener: (name) => listeners.delete(name) };
  const document = { ...target, visibilityState: "hidden" };
  const tracker = load("components/ExperimentTracker.tsx", {
    react: { useEffect: (fn) => { effect = fn; } },
    "next/navigation": { usePathname: () => pathname },
  }, { document, window: { ...target, setTimeout: () => 1 }, clearTimeout: () => {}, fetch: async () => { calls++; return { ok: true }; } });
  tracker.ExperimentTracker();
  let cleanup = effect();
  assert.equal(calls, 0);
  document.visibilityState = "visible";
  listeners.get("visibilitychange")();
  assert.equal(calls, 1);
  cleanup();
  pathname = "/b";
  tracker.ExperimentTracker();
  cleanup = effect();
  assert.equal(calls, 1);
  cleanup();
  pathname = "/";
  tracker.ExperimentTracker();
  cleanup = effect();
  assert.equal(calls, 2);
  cleanup();
  assert.equal(listeners.size, 0);
});

const response = {
  next: () => ({ next: true, headers: new Headers(), cookies: { delete() {} } }),
  json: (body, options) => ({ body, ...options }),
  rewrite: (url) => ({ path: url.pathname }),
};
test("preview e domínio alternativo não acessam dados nem distribuem variantes", async () => {
  for (const [environment, host] of [["preview", "goiania.rodrigofaustinoadvocacia.com.br"], ["production", "adv.rodrigofaustinoadvocacia.com.br"]]) {
    const middleware = load("middleware.ts", { "next/server": { NextResponse: response }, "@/lib/ab/crypto": {} }, {
      process: { env: { VERCEL_ENV: environment } }, fetch: () => { throw new Error("Unexpected DB access"); },
    });
    for (const path of ["/api/ab/visit", "/api/admin/login"]) {
      const result = await middleware.middleware({ nextUrl: new URL(`https://${host}${path}`), method: "POST", headers: new Headers() });
      assert.equal(result.status, 403);
    }
    assert.equal((await middleware.middleware({ nextUrl: new URL(`https://${host}/`), method: "GET" })).next, true);
  }
});

test("robôs recebem a home permanente sem sorteio", async () => {
  const url = new URL("https://goiania.rodrigofaustinoadvocacia.com.br/");
  url.clone = () => new URL(url);
  const middleware = load("middleware.ts", { "next/server": { NextResponse: response }, "@/lib/ab/crypto": {} }, {
    process: { env: { VERCEL_ENV: "production" } },
    fetch: async () => ({ ok: true, json: async () => ({ permanentPath: "/b", experiment: null }) }),
  });
  const result = await middleware.middleware({ url: url.href, nextUrl: url, method: "GET", headers: new Headers({ "user-agent": "Googlebot" }), cookies: { get() {} } });
  assert.equal(result.path, "/b");
});

test("avaliação automática antecipada falha antes de consultar métricas ou gravar", async () => {
  let queries = 0;
  const transaction = async () => {
    queries++;
    return [{ id: "test", status: "active", mode: "automatic", ends_at: new Date(Date.now() + 86400000) }];
  };
  const db = load("lib/ab/db.ts", { "server-only": {}, postgres: () => ({ begin: (fn) => fn(transaction) }), "@/lib/ab/stats": {} }, {
    process: { env: { VERCEL_ENV: "production", DATABASE_URL: "test-only" } },
  });
  await assert.rejects(db.endExperiment("test", { decisionType: "automatic" }), /após o prazo/);
  assert.equal(queries, 1);
});

test("conversão recupera sessão atual e substitui cookie de experimento antigo", async () => {
  let visits = 0;
  let converted;
  let cookie;
  const route = load("app/api/ab/conversion/route.ts", {
    "next/headers": { cookies: async () => ({ get: (name) => ({ value: name === "session" ? "old-session" : "token" }) }) },
    "next/server": { NextResponse: { json: (body) => ({ body, cookies: { set: (...args) => { cookie = args; } } }) } },
    "@/lib/ab/crypto": { SESSION_COOKIE: "session", verifyAssignment: async () => ({ experimentId: "new", participantId: "participant" }) },
    "@/lib/ab/db": { recordVisit: async () => { visits++; return "current-session"; }, recordConversion: async (...args) => { converted = args; return true; } },
  }, { process: { env: { AB_SIGNING_SECRET: "test" } } });
  const result = await route.POST({ headers: new Headers() });
  assert.equal(result.body.tracked, true);
  assert.equal(visits, 1);
  assert.deepEqual(converted, ["current-session", "new", "participant"]);
  assert.equal(cookie[1], "current-session");
});
