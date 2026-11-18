import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/ab/auth";
import { addPage, restorePublication, syncLandingCatalog } from "@/lib/ab/db";
import { probeLanding } from "@/lib/ab/probe";
import { parseLandingUrl } from "@/lib/ab/urls";

export async function POST(request: Request) {
  if (!(await isAdmin())) return NextResponse.json({ error: "Não autorizado." }, { status: 401 });
  const body = await request.json().catch(() => null);
  try {
    if (body?.action === "sync") {
      await syncLandingCatalog();
      return NextResponse.json({ ok: true });
    }
    if (body?.action === "restore" && typeof body.entryId === "string" &&
        /^[0-9a-f]{8}(?:-[0-9a-f]{4}){3}-[0-9a-f]{12}$/i.test(body.entryId)) {
      await restorePublication(body.entryId);
      return NextResponse.json({ ok: true });
    }

    const name = typeof body?.name === "string" ? body.name.trim() : "";
    const input = typeof body?.path === "string" ? body.path.trim() : "";
    const page = parseLandingUrl(input, body?.host);
    if (!name || name.length > 200 || !page) {
      return NextResponse.json({ error: "Informe um nome e uma URL válida do Faustino." }, { status: 400 });
    }
    const probe = await probeLanding(page);
    if (probe === "unverified") {
      return NextResponse.json({ error: "Não foi possível verificar a URL agora. Tente novamente." }, { status: 503 });
    }
    if (probe === "unavailable") {
      return NextResponse.json({ error: "Use uma landing publicada que abra diretamente e tenha medição de WhatsApp." }, { status: 400 });
    }
    return NextResponse.json(await addPage(name, page.host, page.path), { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Não foi possível atualizar o catálogo." },
      { status: 400 }
    );
  }
}
