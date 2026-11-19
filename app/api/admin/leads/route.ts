import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/ab/auth";
import { recordLead } from "@/lib/ab/db";

export async function POST(request: Request) {
  if (!(await isAdmin())) return NextResponse.json({ error: "Não autorizado." }, { status: 401 });
  const body = (await request.json().catch(() => null)) as { reference?: unknown; stage?: unknown } | null;
  const reference = typeof body?.reference === "string"
    ? body.reference.trim().match(/^(?:REF\.?\s+)?(?:AB-)?([A-F0-9]{16})$/i)?.[1].toUpperCase()
    : undefined;
  if (!reference || (body?.stage !== "conversation" && body?.stage !== "qualified")) {
    return NextResponse.json({ error: "Informe a referência do WhatsApp e o estágio do atendimento." }, { status: 400 });
  }
  try {
    if (!(await recordLead(reference, body.stage))) {
      return NextResponse.json({ error: "Referência fora da janela de qualificação ou sem visita registrada." }, { status: 404 });
    }
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Não foi possível registrar o atendimento. Tente novamente." }, { status: 503 });
  }
}
