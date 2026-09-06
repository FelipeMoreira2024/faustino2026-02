import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { AB_OPTOUT_COOKIE, ASSIGNMENT_COOKIE, SESSION_COOKIE, verifyAssignment } from "@/lib/ab/crypto";
import { recordConversion, recordVisit } from "@/lib/ab/db";

export const dynamic = "force-dynamic";

export async function POST() {
  const secret = process.env.AB_SIGNING_SECRET;
  if (!secret) return NextResponse.json({ tracked: false });
  const store = await cookies();
  if (store.get(AB_OPTOUT_COOKIE)?.value === "1") return NextResponse.json({ tracked: false });
  const assignment = await verifyAssignment(store.get(ASSIGNMENT_COOKIE)?.value, secret);
  if (!assignment) return NextResponse.json({ tracked: false });
  try {
    const sessionId = store.get(SESSION_COOKIE)?.value ?? await recordVisit(assignment);
    if (!sessionId) return NextResponse.json({ tracked: false });
    const tracked = await recordConversion(sessionId, assignment.experimentId, assignment.participantId);
    return NextResponse.json({ tracked });
  } catch {
    return NextResponse.json({ tracked: false }, { status: 503 });
  }
}
