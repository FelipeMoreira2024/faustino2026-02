import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/ab/auth";
import { controlExperiment } from "@/lib/ab/db";

export async function POST(request: Request, context: { params: Promise<{ id: string }> }) {
  if (!(await isAdmin())) return NextResponse.json({ error: "Não autorizado." }, { status: 401 });
  const body = (await request.json().catch(() => null)) as { action?: "pause" | "resume" | "cancel" } | null;
  if (!body?.action || !["pause", "resume", "cancel"].includes(body.action)) {
    return NextResponse.json({ error: "Ação inválida." }, { status: 400 });
  }
  try {
    return NextResponse.json(await controlExperiment((await context.params).id, body.action));
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Não foi possível alterar o teste." }, { status: 400 });
  }
}
