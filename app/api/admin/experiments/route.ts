import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/ab/auth";
import { startExperiment } from "@/lib/ab/db";
import { MAX_ATTRIBUTION_DAYS, MAX_COLLECTION_DAYS, planSample } from "@/lib/ab/stats";
import type { ExperimentPlanInput } from "@/lib/ab/types";

export async function POST(request: Request) {
  if (!(await isAdmin())) return NextResponse.json({ error: "Não autorizado." }, { status: 401 });
  const body = (await request.json().catch(() => null)) as {
    name?: string;
    baselinePageId?: string;
    challengerPageId?: string;
    mode?: "manual" | "automatic";
    durationDays?: number;
    plan?: Partial<ExperimentPlanInput>;
  } | null;
  if (
    typeof body?.name !== "string" || !body.name.trim() || body.name.trim().length > 200 ||
    typeof body.baselinePageId !== "string" || typeof body.challengerPageId !== "string" ||
    !/^[0-9a-f]{8}(?:-[0-9a-f]{4}){3}-[0-9a-f]{12}$/i.test(body.baselinePageId) ||
    !/^[0-9a-f]{8}(?:-[0-9a-f]{4}){3}-[0-9a-f]{12}$/i.test(body.challengerPageId) ||
    (body.mode !== "manual" && body.mode !== "automatic")
  ) {
    return NextResponse.json({ error: "Preencha todos os dados do teste." }, { status: 400 });
  }
  const { plan, durationDays } = body;
  if (!plan || typeof plan.hypothesis !== "string" || !plan.hypothesis.trim() || plan.hypothesis.length > 400 ||
      (plan.metric !== "qualified_lead" && plan.metric !== "whatsapp_click") ||
      typeof plan.baselineRate !== "number" || typeof plan.minimumLift !== "number" || typeof plan.dailyBrowsers !== "number" ||
      typeof plan.attributionDays !== "number" || !Number.isInteger(plan.attributionDays) ||
      plan.attributionDays < 1 || plan.attributionDays > MAX_ATTRIBUTION_DAYS ||
      typeof durationDays !== "number" || !Number.isInteger(durationDays) || durationDays < 1 || durationDays > MAX_COLLECTION_DAYS) {
    return NextResponse.json({ error: "Preencha a hipótese, a métrica, a amostra e os prazos do plano." }, { status: 400 });
  }
  const sample = planSample(plan.baselineRate, plan.minimumLift, plan.dailyBrowsers);
  if (!sample) return NextResponse.json({ error: "Informe uma taxa histórica, uma melhora mínima e um volume diário válidos." }, { status: 400 });
  if (body.mode === "automatic" && durationDays < sample.collectionDays) {
    return NextResponse.json({ error: `O tráfego previsto exige ${sample.collectionDays} dias de coleta. Ajuste o plano ou use o modo manual para validar a medição.` }, { status: 400 });
  }
  try {
    return NextResponse.json(await startExperiment({
      name: body.name.trim(),
      baselinePageId: body.baselinePageId,
      challengerPageId: body.challengerPageId,
      mode: body.mode,
      durationDays,
      plan: {
        hypothesis: plan.hypothesis.trim(), metric: plan.metric,
        baselineRate: plan.baselineRate, minimumLift: plan.minimumLift, dailyBrowsers: plan.dailyBrowsers,
        attributionDays: plan.attributionDays, perVariant: sample.perVariant,
      },
    }), { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Não foi possível iniciar o teste." },
      { status: 400 }
    );
  }
}
