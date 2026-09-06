import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/ab/auth";
import { endExperiment } from "@/lib/ab/db";

export async function POST(request: Request, context: { params: Promise<{ id: string }> }) {
  if (!(await isAdmin())) return NextResponse.json({ error: "Não autorizado." }, { status: 401 });
  const { id } = await context.params;
  const body = (await request.json().catch(() => null)) as {
    decisionType?: "manual" | "automatic";
    winnerPageId?: string;
  } | null;
  try {
    const options = body?.decisionType === "automatic"
      ? { decisionType: "automatic" as const }
      : { decisionType: "manual" as const, winnerPageId: body?.winnerPageId ?? "" };
    return NextResponse.json(await endExperiment(id, options));
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Não foi possível encerrar o teste." },
      { status: 400 }
    );
  }
}
