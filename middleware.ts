import { NextRequest, NextResponse } from "next/server";
import { AB_OPTOUT_COOKIE, ASSIGNMENT_COOKIE, signAssignment, verifyAssignment } from "@/lib/ab/crypto";
import type { PublicExperimentConfig } from "@/lib/ab/types";

function isRobot(userAgent: string) {
  return /bot|crawler|spider|preview|facebookexternalhit|whatsapp/i.test(userAgent);
}

/**
 * Cache da config do A/B, para a home não esperar a função serverless + banco a
 * cada visita. Duas camadas:
 * 1. /api/ab/config responde com s-maxage=30 + stale-while-revalidate, então o
 *    CDN da Vercel devolve a config sem acordar a função (ver a rota);
 * 2. cada instância do middleware guarda a última config boa por 30 s.
 * Por isso uma mudança em /admin/experimentos leva cerca de 30–60 s para valer.
 * Falha (rede, timeout, 503) não é guardada: cai no mesmo fallback de antes.
 */
const CONFIG_TTL_MS = 30_000;
let cachedConfig: { value: PublicExperimentConfig; expiresAt: number } | undefined;

async function loadConfig(requestUrl: string) {
  if (cachedConfig && cachedConfig.expiresAt > Date.now()) return cachedConfig.value;
  const configResponse = await fetch(new URL("/api/ab/config", requestUrl), { signal: AbortSignal.timeout(5000) });
  if (!configResponse.ok) throw new Error("Configuração indisponível");
  const value = (await configResponse.json()) as PublicExperimentConfig;
  cachedConfig = { value, expiresAt: Date.now() + CONFIG_TTL_MS };
  return value;
}

export async function middleware(request: NextRequest) {
  const allowed = process.env.VERCEL_ENV === "production" && request.nextUrl.hostname === "goiania.rodrigofaustinoadvocacia.com.br";
  if (request.nextUrl.pathname.startsWith("/api/ab/") || request.nextUrl.pathname.startsWith("/api/admin/")) {
    if (!allowed) return NextResponse.json({ error: "A/B disponível somente no domínio de produção." }, { status: 403 });
    if (request.method !== "GET" && request.headers.get("origin") !== request.nextUrl.origin) {
      return NextResponse.json({ error: "Origem inválida." }, { status: 403 });
    }
    return NextResponse.next();
  }
  if (!allowed || request.method !== "GET") {
    return NextResponse.next();
  }

  try {
    const config = await loadConfig(request.url);
    const secret = process.env.AB_SIGNING_SECRET;

    if (request.cookies.get(AB_OPTOUT_COOKIE)?.value === "1" || isRobot(request.headers.get("user-agent") ?? "")) {
      if (config.permanentPath === "/") return NextResponse.next();
      const optOutUrl = request.nextUrl.clone();
      optOutUrl.pathname = config.permanentPath;
      const optOutHeaders = new Headers(request.headers);
      optOutHeaders.set("x-ab-home-rewrite", "1");
      return NextResponse.rewrite(optOutUrl, { request: { headers: optOutHeaders } });
    }

    if (!config.experiment) {
      if (config.permanentPath === "/") return NextResponse.next();
      const rewriteUrl = request.nextUrl.clone();
      rewriteUrl.pathname = config.permanentPath;
      const headers = new Headers(request.headers);
      headers.set("x-ab-home-rewrite", "1");
      return NextResponse.rewrite(rewriteUrl, { request: { headers } });
    }
    if (!secret) return NextResponse.next();

    const experiment = config.experiment;
    const existing = await verifyAssignment(request.cookies.get(ASSIGNMENT_COOKIE)?.value, secret);
    const assignment = existing?.experimentId === experiment.id
      ? existing
      : {
          experimentId: experiment.id,
          participantId: crypto.randomUUID(),
          pageId: Math.random() * 100 < experiment.baselineAllocation
            ? experiment.baselinePageId
            : experiment.challengerPageId,
          variant: "a" as "a" | "b",
          exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 180,
        };
    if (!existing || existing.experimentId !== experiment.id) {
      assignment.variant = assignment.pageId === experiment.baselinePageId ? "a" : "b";
    }
    const destination = assignment.variant === "a"
      ? experiment.baselinePath
      : experiment.challengerPath;
    const headers = new Headers(request.headers);
    headers.set("x-ab-home-rewrite", "1");
    const rewriteUrl = request.nextUrl.clone();
    rewriteUrl.pathname = destination;
    const response = destination === "/"
      ? NextResponse.next({ request: { headers } })
      : NextResponse.rewrite(rewriteUrl, { request: { headers } });
    response.headers.set("Cache-Control", "private, no-store");

    if (!existing || existing.experimentId !== experiment.id) {
      response.cookies.set(ASSIGNMENT_COOKIE, await signAssignment(assignment, secret), {
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        path: "/",
        maxAge: 60 * 60 * 24 * 180,
      });
    }
    return response;
  } catch {
    const response = NextResponse.next();
    response.cookies.delete(ASSIGNMENT_COOKIE);
    response.headers.set("Cache-Control", "private, no-store");
    return response;
  }
}

export const config = { matcher: ["/", "/api/ab/:path*", "/api/admin/:path*"] };
