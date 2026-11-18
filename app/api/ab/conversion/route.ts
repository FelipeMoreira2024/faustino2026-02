import { NextResponse } from "next/server";
import { recordVisit, recordConversion } from "@/lib/ab/db";
import { requestExposure } from "@/lib/ab/request-exposure";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const exposure = await requestExposure(request);
  if (!exposure) return NextResponse.json({ tracked: false });
  try {
    const sessionId = await recordVisit(exposure);
    const tracked = sessionId ? await recordConversion(sessionId, exposure.experimentId, exposure.participantId) : false;
    return NextResponse.json({ tracked });
  } catch {
    return NextResponse.json({ tracked: false }, { status: 503 });
  }
}
