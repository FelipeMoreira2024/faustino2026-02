import { NextResponse } from "next/server";
import { getPublicExperimentConfig } from "@/lib/ab/db";

export const dynamic = "force-dynamic";

/**
 * O middleware lê esta rota a cada visita na home. Para a visita não esperar a
 * função serverless (região iad1) nem o banco, o CDN da Vercel guarda a resposta
 * por 30 s (s-maxage) e, depois disso, continua entregando a cópia antiga na hora
 * enquanto busca a nova em segundo plano (stale-while-revalidate). O SWR longo
 * evita que a primeira visita depois de um tempo sem acessos pague o cold start.
 *
 * Efeito colateral: uma mudança em /admin/experimentos (iniciar, pausar, encerrar)
 * leva cerca de 30–60 s para valer, somando o cache em memória do middleware; se o
 * site ficou um tempo sem visitas, só a primeira visita depois disso ainda recebe a
 * config antiga. Erros (503) não entram no cache.
 */
const CACHE_OK = "public, max-age=0, s-maxage=30, stale-while-revalidate=86400";

export async function GET() {
  try {
    return NextResponse.json(await getPublicExperimentConfig(), {
      headers: { "Cache-Control": CACHE_OK },
    });
  } catch {
    return NextResponse.json(
      { experiment: null, permanentPath: "/" },
      { status: 503, headers: { "Cache-Control": "private, no-store" } }
    );
  }
}
