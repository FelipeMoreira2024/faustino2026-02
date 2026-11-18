import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/ab/auth";
import { startExperiment } from "@/lib/ab/db";

export async function POST(request: Request) {
  if (!(await isAdmin())) return NextResponse.json({ error: "Não autorizado." }, { status: 401 });
  const body = (await request.json().catch(() => null)) as {
    name?: string;
    baselinePageId?: string;
    challengerPageId?: string;
    mode?: "manual" | "automatic";
    durationDays?: number;
  } | null;
  if (
    typeof body?.name !== "string" || !body.name.trim() || body.name.trim().length > 200 ||
    typeof body.baselinePageId !== "string" || typeof body.challengerPageId !== "string" ||
    !/^[0-9a-f]{8}(?:-[0-9a-f]{4}){3}-[0-9a-f]{12}$/i.test(body.baselinePageId) ||
    !/^[0-9a-f]{8}(?:-[0-9a-f]{4}){3}-[0-9a-f]{12}$/i.test(body.challengerPageId) ||
    !["manual", "automatic"].includes(body.mode ?? "")
  ) {
    return NextResponse.json({ error: "Preencha todos os dados do teste." }, { status: 400 });
  }
  const durationDays = Math.max(1, Math.min(90, Math.trunc(Number(body.durationDays) || 14)));
  try {
    return NextResponse.json(await startExperiment({
      name: body.name.trim(),
      baselinePageId: body.baselinePageId,
      challengerPageId: body.challengerPageId,
      mode: body.mode!,
      durationDays,
    }), { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Não foi possível iniciar o teste." },
      { status: 400 }
    );
  }
}
