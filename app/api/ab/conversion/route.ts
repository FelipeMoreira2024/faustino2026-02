import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { AB_OPTOUT_COOKIE, ASSIGNMENT_COOKIE, SESSION_COOKIE, verifyAssignment } from "@/lib/ab/crypto";
import { recordConversion, recordVisit } from "@/lib/ab/db";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  if (/bot|crawler|spider|preview|facebookexternalhit|whatsapp/i.test(request.headers.get("user-agent") ?? "")) return NextResponse.json({ tracked: false });
  const secret = process.env.AB_SIGNING_SECRET;
  if (!secret) return NextResponse.json({ tracked: false });
  const store = await cookies();
  if (store.get(AB_OPTOUT_COOKIE)?.value === "1") return NextResponse.json({ tracked: false });
  const assignment = await verifyAssignment(store.get(ASSIGNMENT_COOKIE)?.value, secret);
  if (!assignment) return NextResponse.json({ tracked: false });
  try {
    const sessionId = await recordVisit(assignment);
    if (!sessionId) return NextResponse.json({ tracked: false });
    const tracked = await recordConversion(sessionId, assignment.experimentId, assignment.participantId);
    const response = NextResponse.json({ tracked });
    response.cookies.set(SESSION_COOKIE, sessionId, { httpOnly: true, sameSite: "lax", secure: process.env.NODE_ENV === "production", path: "/", maxAge: 1800 });
    return response;
  } catch {
    return NextResponse.json({ tracked: false }, { status: 503 });
  }
}
