import { NextResponse } from "next/server";
import { finalizeExpiredExperiments } from "@/lib/ab/db";

export async function GET(request: Request) {
  const authorization = request.headers.get("authorization");
  if (!process.env.CRON_SECRET || authorization !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Não autorizado." }, { status: 401 });
  }
  await finalizeExpiredExperiments();
  return NextResponse.json({ ok: true });
}
