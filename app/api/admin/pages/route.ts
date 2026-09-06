import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/ab/auth";
import { addPage } from "@/lib/ab/db";

export async function POST(request: Request) {
  if (!(await isAdmin())) return NextResponse.json({ error: "Não autorizado." }, { status: 401 });
  const body = (await request.json().catch(() => null)) as { name?: string; path?: string } | null;
  const name = body?.name?.trim();
  let path = body?.path?.trim();
  if (!name || !path) return NextResponse.json({ error: "Informe nome e caminho." }, { status: 400 });
  try {
    const parsed = new URL(path, "https://goiania.rodrigofaustinoadvocacia.com.br");
    if (parsed.hostname !== "goiania.rodrigofaustinoadvocacia.com.br") {
      return NextResponse.json({ error: "Use uma página do domínio de Goiânia." }, { status: 400 });
    }
    path = parsed.pathname.replace(/\/$/, "") || "/";
    if (!/^\/[a-z0-9/_-]*$/.test(path)) {
      return NextResponse.json({ error: "O caminho da página não é válido." }, { status: 400 });
    }
    const target = `https://goiania.rodrigofaustinoadvocacia.com.br${path}`;
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5_000);
    let pageResponse: Response;
    try {
      pageResponse = await fetch(target, { method: "HEAD", redirect: "manual", cache: "no-store", signal: controller.signal });
    } finally {
      clearTimeout(timeout);
    }
    if (!pageResponse.ok) {
      return NextResponse.json({ error: "A página precisa estar publicada e responder sem redirecionamento." }, { status: 400 });
    }
    const contentType = pageResponse.headers.get("content-type") ?? "";
    if (contentType && !contentType.includes("text/html")) {
      return NextResponse.json({ error: "O endereço informado não é uma página HTML." }, { status: 400 });
    }
    return NextResponse.json(await addPage(name, path), { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Não foi possível cadastrar a página." },
      { status: 400 }
    );
  }
}
