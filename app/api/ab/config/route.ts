import { NextResponse } from "next/server";
import { getPublicExperimentConfig } from "@/lib/ab/db";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    return NextResponse.json(await getPublicExperimentConfig(), {
      headers: { "Cache-Control": "private, no-store" },
    });
  } catch {
    return NextResponse.json(
      { experiment: null, permanentPath: "/" },
      { status: 503, headers: { "Cache-Control": "private, no-store" } }
    );
  }
}
