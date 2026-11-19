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

const urls = load("lib/ab/urls.ts", {});
const { HOME_HOST, LANDING_HOST } = urls;
const crypto = load("lib/ab/crypto.ts", {}, { crypto: globalThis.crypto, TextEncoder, TextDecoder, atob, btoa });
const home = { host: HOME_HOST, path: "/" };
const c24 = { host: HOME_HOST, path: "/criminalista-24h" };
const defesa = { host: HOME_HOST, path: "/defesa-criminal" };
const flagship = { host: LANDING_HOST, path: "/advogado-flagrante-goiania" };

function response(options = {}) {
  return { options, headers: new Headers(), setCookies: [], cookies: {
    set(name, value) { this.result.setCookies.push({ name, value }); },
  } };
}
function makeResponse(options) {
  const result = response(options);
  result.cookies.result = result;
  return result;
}
const NextResponse = {
  next: (options) => ({ next: true, ...makeResponse(options) }),
  json: (body, options) => ({ body, ...options }),
  rewrite: (url, options) => ({ url, ...makeResponse(options) }),
};

function middleware(config, globals = {}) {
  return load("middleware.ts", {
    "next/server": { NextResponse },
    "@/lib/ab/crypto": crypto,
    "@/lib/ab/urls": urls,
    "@/lib/landing-csp": { landingCsp: "default-src 'self'" },
  }, {
    process: { env: { VERCEL_ENV: "production", AB_SIGNING_SECRET: "test" } },
    fetch: async () => ({ ok: true, json: async () => config }),
    crypto: globalThis.crypto,
    ...globals,
  }).middleware;
}
function visit(page, { cookie, headers, query = "" } = {}) {
  const url = new URL(`https://${page.host}${page.path}${query}`);
  url.clone = () => new URL(url);
  return { url: url.href, nextUrl: url, method: "GET", headers: new Headers(headers),
    cookies: { get: (name) => name === crypto.ASSIGNMENT_COOKIE ? cookie && { value: cookie } : undefined } };
}
const experiment = (entry, challenger) => ({
  id: "experiment", entry, baseline: entry, challenger, baselinePageId: "first", challengerPageId: "second",
  baselineAllocation: 50, endsAt: null,
});
const challengerRandom = Object.assign(Object.create(Math), { random: () => 0.9 });
const exposureHeader = (result) => result.options.request.headers.get(crypto.AB_EXPOSURE_HEADER);

test("C × D distribui só na entrada, preserva campanha e mantém atribuição", async () => {
  const route = middleware({ publications: [], experiment: experiment(c24, defesa) }, { Math: challengerRandom });
  const result = await route(visit(c24, { query: "?utm_source=ads&gclid=example" }));
  assert.equal(result.url.pathname, defesa.path);
  assert.equal(result.url.search, "?utm_source=ads&gclid=example");
  assert.equal(result.headers.get("Cache-Control"), "private, no-store");
  assert.equal(result.headers.get("Content-Security-Policy"), "default-src 'self'");
  const exposure = await crypto.verifyExposure(exposureHeader(result), "test");
  assert.equal(exposure.entryPath, c24.path);
  assert.equal(exposure.pageId, "second");

  const cookie = result.setCookies[0].value;
  const reload = await route(visit(c24, { cookie }));
  assert.equal(reload.url.pathname, defesa.path);
  assert.equal(exposureHeader(reload), exposureHeader(result));
  assert.equal(reload.setCookies.length, 0);
  assert.equal(exposureHeader(await route(visit(defesa, { cookie }))), null);
  assert.equal((await route(visit(home))).next, true);
});

test("cruza subdomínios por rewrite interno e entrega o publicado em pausa ou no acesso direto", async () => {
  const config = { publications: [{ entry: flagship, page: defesa }], experiment: experiment(flagship, c24) };
  const route = middleware(config, { Math: challengerRandom });
  const assigned = await route(visit(flagship));
  assert.equal(assigned.url.hostname, LANDING_HOST);
  assert.equal(assigned.url.pathname, c24.path);
  for (const headers of [{ "user-agent": "Googlebot" }, { "next-router-prefetch": "1" }]) {
    const excluded = await route(visit(flagship, { headers }));
    assert.equal(excluded.url.pathname, defesa.path);
    assert.equal(exposureHeader(excluded), null);
  }
  const paused = middleware({ ...config, experiment: null });
  assert.equal((await paused(visit(flagship))).url.pathname, defesa.path);
  const expired = middleware({ ...config, experiment: { ...config.experiment, endsAt: "2020-01-01" } });
  assert.equal(exposureHeader(await expired(visit(flagship))), null);
});

test("home legada mantém a publicação e ambientes externos ficam fora da distribuição", async () => {
  const conf = { publications: [{ entry: home, page: c24 }], experiment: null };
  assert.equal((await middleware(conf)(visit(home))).url.pathname, c24.path);
  assert.equal((await middleware(conf)(visit({ ...home, host: "elsewhere.example" }))).next, true);
  assert.equal((await middleware(conf, { process: { env: { VERCEL_ENV: "preview" } } })(visit(home))).next, true);
});

test("middleware expira a configuração em 25 s e tenta novamente após falha", async () => {
  let now = Date.now();
  let calls = 0;
  const route = middleware({}, {
    Date: class extends Date { static now() { return now; } },
    fetch: async (_, options) => {
      assert.equal(options.cache, "no-store");
      return { ok: ++calls > 1, json: async () => ({ publications: [{ entry: home, page: c24 }], experiment: null }) };
    },
  });
  assert.equal((await route(visit(home))).next, true);
  assert.equal((await route(visit(home))).url.pathname, c24.path);
  now += 24_999;
  await route(visit(home));
  assert.equal(calls, 2);
  now += 1;
  await route(visit(home));
  assert.equal(calls, 3);
});

test("referência do WhatsApp é estável por navegador e restrita aos novos testes", async () => {
  const going = { ...experiment(home, c24), measureLeads: true };
  const route = middleware({ publications: [], experiment: going }, { Math: challengerRandom });
  const first = await route(visit(home));
  const firstExposure = await crypto.verifyExposure(exposureHeader(first), "test");
  assert.match(firstExposure.contactReference, /^[A-F0-9]{16}$/);
  const cookie = first.setCookies[0].value;
  const repeat = await route(visit(home, { cookie }));
  assert.equal(exposureHeader(first), exposureHeader(repeat));
  const newcomer = await route(visit(home));
  assert.notEqual((await crypto.verifyExposure(exposureHeader(newcomer), "test")).contactReference, firstExposure.contactReference);
  assert.equal(exposureHeader(await route(visit(c24, { cookie }))), null);
});

test("registra visita de uma aba quando fica visível", () => {
  let effect;
  const listeners = new Map();
  const target = { addEventListener: (name, fn) => listeners.set(name, fn), removeEventListener: (name) => listeners.delete(name) };
  const document = { ...target, visibilityState: "hidden" };
  const calls = [];
  const tracker = load("components/ExperimentTracker.tsx", {
    react: { useEffect: (fn) => { effect = fn; } }, "@/lib/ab/crypto": crypto,
  }, {
    document, window: { ...target, setTimeout: () => 1 }, clearTimeout: () => {},
    fetch: async (path, init) => { calls.push([path, JSON.parse(init.body).exposure]); return { ok: true }; },
  });
  tracker.ExperimentTracker({ exposure: "signed" });
  const cleanup = effect();
  assert.equal(calls.length, 0);
  document.visibilityState = "visible";
  listeners.get("visibilitychange")();
  assert.deepEqual(calls, [["/api/ab/visit", "signed"]]);
  cleanup();
  assert.equal(listeners.size, 0);
});

test("enriquece o destino do WhatsApp e envia ao GA4 apenas a atribuição do teste", () => {
  const calls = [];
  const opened = [];
  const document = {
    cookie: "",
    querySelector: () => ({ dataset: {
      abExposure: "signed", abExperimentId: "test", abVariant: "b", abContactReference: "0123456789ABCDEF",
    } }),
    createElement: () => ({ click() { opened.push(this.href); } }),
  };
  const tracker = load("components/ExperimentTracker.tsx", { react: {}, "@/lib/ab/crypto": crypto }, {
    document, fetch: async (path) => calls.push(path),
  });
  const href = "https://wa.me/5562000000000?text=Ol%C3%A1";
  const event = { currentTarget: { href }, preventDefault() { this.defaultPrevented = true; } };
  tracker.trackExperimentConversion(event);
  assert.equal(event.currentTarget.href, href);
  assert.equal(new URL(opened[0]).searchParams.get("text"), "Olá\n\nRef. AB-0123456789ABCDEF");
  assert.deepEqual(calls, ["/api/ab/conversion"]);
  assert.equal(event.defaultPrevented, true);
  assert.equal(JSON.stringify(tracker.experimentAnalytics("c")), '{"ab_experiment_id":"test","ab_variant":"b"}');
  document.cookie = `${crypto.AB_OPTOUT_COOKIE}=1`;
  const optedOut = { ...event, defaultPrevented: false };
  tracker.trackExperimentConversion(optedOut);
  assert.equal(optedOut.defaultPrevented, false);
  assert.equal(calls.length, 1);
  assert.equal(JSON.stringify(tracker.experimentAnalytics("c")), '{"ab_experiment_id":null,"ab_variant":"c"}');
});

test("exposição exige cookie correspondente, entrada correta e permissão", async () => {
  const assignment = {
    experimentId: "experiment", pageId: "second", participantId: "participant", variant: "b",
    exp: Math.floor(Date.now() / 1000) + 3600,
  };
  const data = { ...assignment, entryHost: c24.host, entryPath: c24.path };
  const token = await crypto.signExposure(data, "test");
  let stored = await crypto.signAssignment(assignment, "test");
  let optOut;
  const { requestExposure } = load("lib/ab/request-exposure.ts", {
    "next/headers": { cookies: async () => ({ get: (name) => ({ value: name === crypto.AB_OPTOUT_COOKIE ? optOut : stored }) }) },
    "@/lib/ab/crypto": crypto,
  }, { process: { env: { AB_SIGNING_SECRET: "test" } } });
  const request = (page) => ({
    headers: new Headers({ origin: `https://${page.host}`, referer: `https://${page.host}${page.path}?gclid=x` }),
    json: async () => ({ exposure: token }),
  });
  assert.equal((await requestExposure(request(c24))).pageId, data.pageId);
  assert.equal(await requestExposure(request(defesa)), null);
  optOut = "1";
  assert.equal(await requestExposure(request(c24)), null);
  optOut = undefined;
  stored = await crypto.signAssignment({ ...assignment, experimentId: "later" }, "test");
  assert.equal(await requestExposure(request(c24)), null);
});

test("conversão imediata abre a sessão antes de registrar o clique", async () => {
  const calls = [];
  const route = load("app/api/ab/conversion/route.ts", {
    "next/server": { NextResponse },
    "@/lib/ab/request-exposure": { requestExposure: async () => ({ experimentId: "test", participantId: "p" }) },
    "@/lib/ab/db": {
      recordVisit: async () => { calls.push("visit"); return "session"; },
      recordConversion: async (...args) => { calls.push(args); return true; },
    },
  });
  assert.equal((await route.POST({})).body.tracked, true);
  assert.deepEqual(calls, ["visit", ["session", "test", "p"]]);
});

test("avaliação automática antecipada falha antes de consultar métricas ou gravar", async () => {
  let queries = 0;
  const transaction = async () => {
    queries++;
    return [{ id: "test", status: "active", mode: "automatic", ends_at: new Date(Date.now() + 86400000) }];
  };
  const db = load("lib/ab/db.ts", {
    "server-only": {}, postgres: () => ({ begin: (fn) => fn(transaction) }), "@/lib/ab/stats": {},
    "@/lib/ab/catalog": {}, "@/lib/ab/urls": urls, "@/lib/ab/probe": {},
  }, { process: { env: { VERCEL_ENV: "production", DATABASE_URL: "test-only" } } });
  await assert.rejects(db.endExperiment("test", { decisionType: "automatic" }), /após o prazo/);
  assert.equal(queries, 1);
});

test("cadastro aceita os dois domínios e reconhece o alias da Criminalista 24h", () => {
  assert.equal(urls.parseLandingUrl(flagship.path, LANDING_HOST).host, LANDING_HOST);
  assert.equal(urls.parseLandingUrl(`https://${LANDING_HOST}${flagship.path}`).path, flagship.path);
  assert.equal(urls.parseLandingUrl("//localhost/example"), null);
  assert.equal(urls.parseLandingUrl("/api/admin"), null);
  assert.equal(urls.landingContentKey(HOME_HOST, "/b"), urls.landingContentKey(HOME_HOST, c24.path));
});
