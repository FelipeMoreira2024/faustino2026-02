import { NextRequest, NextResponse } from "next/server";
import {
  AB_ENTRY_HEADER, AB_EXPOSURE_HEADER, AB_OPTOUT_COOKIE, AB_PROBE_HEADER,
  ASSIGNMENT_COOKIE, catalogProbeToken, contactReference, signAssignment, signExposure, verifyAssignment,
} from "@/lib/ab/crypto";
import type { PageAddress, PublicExperimentConfig } from "@/lib/ab/types";
import { HOME_HOST, isLandingHost, parseLandingUrl } from "@/lib/ab/urls";
import { landingCsp } from "@/lib/landing-csp";

const CONFIG_TTL_MS = 25_000;
let cachedConfig: { value: PublicExperimentConfig; expiresAt: number } | undefined;
let pendingConfig: Promise<PublicExperimentConfig> | undefined;

async function loadConfig(requestUrl: string) {
  if (cachedConfig && cachedConfig.expiresAt > Date.now()) return cachedConfig.value;
  if (!pendingConfig) {
    const expiresAt = Date.now() + CONFIG_TTL_MS;
    pendingConfig = (async () => {
      // Isola esta versão da configuração legada ainda válida no cache da CDN.
      const response = await fetch(new URL("/api/ab/config?v=2", requestUrl), {
        signal: AbortSignal.timeout(2500), cache: "no-store",
      });
      if (!response.ok) throw new Error("Configuração indisponível");
      const value = await response.json() as PublicExperimentConfig;
      cachedConfig = { value, expiresAt };
      return value;
    })().finally(() => { pendingConfig = undefined; });
  }
  return pendingConfig;
}

function sameAddress(left: PageAddress, right: PageAddress) {
  return left.host === right.host && left.path === right.path;
}

export async function middleware(request: NextRequest) {
  const { hostname: host, pathname: path, origin } = request.nextUrl;
  const allowed = process.env.VERCEL_ENV === "production" && isLandingHost(host);
  const isAdminApi = path.startsWith("/api/admin/");
  const isAdminPage = path === "/admin" || path.startsWith("/admin/");
  if (isAdminApi || path.startsWith("/api/ab/")) {
    if (!allowed || ((isAdminApi || path === "/api/ab/finalize") && host !== HOME_HOST)) {
      return NextResponse.json({ error: "A/B indisponível neste endereço." }, { status: 403 });
    }
    if (request.method !== "GET" && request.headers.get("origin") !== origin) {
      return NextResponse.json({ error: "Origem inválida." }, { status: 403 });
    }
    return NextResponse.next();
  }
  if (isAdminPage && (!allowed || host !== HOME_HOST)) return new NextResponse(null, { status: 404 });

  const headers = new Headers(request.headers);
  const secret = process.env.AB_SIGNING_SECRET;
  const probeToken = headers.get(AB_PROBE_HEADER);
  headers.delete(AB_PROBE_HEADER);
  headers.delete(AB_ENTRY_HEADER);
  headers.delete(AB_EXPOSURE_HEADER);
  headers.delete("x-ab-home-rewrite");
  const next = () => NextResponse.next({ request: { headers } });
  if (!allowed || !parseLandingUrl(path, host) || request.method !== "GET") return next();
  if (probeToken && secret && probeToken === await catalogProbeToken(secret)) {
    const response = next();
    response.headers.set("Cache-Control", "private, no-store");
    return response;
  }

  const entry = { host, path };
  try {
    const config = await loadConfig(request.url);
    const experiment = config.experiment;
    const publication = config.publications.find((item) => sameAddress(item.entry, entry));
    let destination = publication?.page ?? entry;
    let assignmentToken: string | undefined;
    const running = experiment && sameAddress(experiment.entry, entry) &&
      (!experiment.endsAt || Date.parse(experiment.endsAt) > Date.now());
    const excluded = request.cookies.get(AB_OPTOUT_COOKIE)?.value === "1" ||
      /bot|crawler|spider|preview|facebookexternalhit|whatsapp/i.test(headers.get("user-agent") ?? "") ||
      headers.has("next-router-prefetch") || /prefetch/i.test(headers.get("purpose") ?? headers.get("sec-purpose") ?? "");

    if (running && secret && !excluded) {
      const existing = await verifyAssignment(request.cookies.get(ASSIGNMENT_COOKIE)?.value, secret);
      const keep = existing?.experimentId === experiment.id &&
        existing.pageId === (existing.variant === "a" ? experiment.baselinePageId : experiment.challengerPageId);
      const variant = keep ? existing.variant : Math.random() * 100 < experiment.baselineAllocation ? "a" : "b";
      const assignment = keep ? existing : {
        variant, experimentId: experiment.id, participantId: crypto.randomUUID(),
        pageId: variant === "a" ? experiment.baselinePageId : experiment.challengerPageId,
        exp: Math.floor(Date.now() / 1000) + 180 * 86400,
      };
      destination = variant === "a" ? experiment.baseline : experiment.challenger;
      const reference = experiment.measureLeads ? await contactReference(assignment, secret) : undefined;
      headers.set(AB_EXPOSURE_HEADER, await signExposure({
        ...assignment, entryHost: host, entryPath: path, contactReference: reference,
      }, secret));
      if (!keep) assignmentToken = await signAssignment(assignment, secret);
    }
    const rewritten = !sameAddress(destination, entry);
    if (rewritten) headers.set(AB_ENTRY_HEADER, `https://${host}${path}`);
    const url = request.nextUrl.clone();
    url.pathname = destination.path;
    // Ambas as origens usam a mesma árvore de rotas Next. O navegador continua na entrada.
    const response = rewritten && destination.path !== path ? NextResponse.rewrite(url, { request: { headers } }) : next();
    if (running || rewritten) response.headers.set("Cache-Control", "private, no-store");
    if (destination.path === "/defesa-criminal") response.headers.set("Content-Security-Policy", landingCsp);
    if (assignmentToken) {
      response.cookies.set(ASSIGNMENT_COOKIE, assignmentToken, {
        httpOnly: true, sameSite: "lax", secure: true, path: "/", maxAge: 180 * 86400,
      });
    }
    return response;
  } catch {
    const response = next();
    response.headers.set("Cache-Control", "private, no-store");
    return response;
  }
}

export const config = { matcher: ["/((?!_next/|images/|.*\\.[^/]+$).*)"] };
