import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/ab/auth";
import { databaseConfigured, getAdminDashboard } from "@/lib/ab/db";

export const dynamic = "force-dynamic";

export async function GET() {
  if (!(await isAdmin())) return NextResponse.json({ error: "Não autorizado." }, { status: 401 });
  if (!databaseConfigured()) {
    return NextResponse.json({ error: "Configure DATABASE_URL e execute a migração do banco." }, { status: 503 });
  }
  try {
    return NextResponse.json(await getAdminDashboard(), {
      headers: { "Cache-Control": "private, no-store" },
    });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Não foi possível consultar os testes." },
      { status: 500 }
    );
  }
}
