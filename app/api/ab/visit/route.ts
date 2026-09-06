import { cookies, headers } from "next/headers";
import { NextResponse } from "next/server";
import { AB_OPTOUT_COOKIE, ASSIGNMENT_COOKIE, SESSION_COOKIE, verifyAssignment } from "@/lib/ab/crypto";
import { recordVisit } from "@/lib/ab/db";

export const dynamic = "force-dynamic";

function isRobot(userAgent: string) {
  return /bot|crawler|spider|preview/i.test(userAgent);
}

export async function POST() {
  const secret = process.env.AB_SIGNING_SECRET;
  if (!secret || isRobot((await headers()).get("user-agent") ?? "")) {
    return NextResponse.json({ tracked: false });
  }
  const store = await cookies();
  if (store.get(AB_OPTOUT_COOKIE)?.value === "1") return NextResponse.json({ tracked: false });
  const assignment = await verifyAssignment(store.get(ASSIGNMENT_COOKIE)?.value, secret);
  if (!assignment) return NextResponse.json({ tracked: false });

  try {
    const sessionId = await recordVisit(assignment);
    const response = NextResponse.json({ tracked: Boolean(sessionId) });
    if (sessionId) {
      response.cookies.set(SESSION_COOKIE, sessionId, {
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        path: "/",
        maxAge: 60 * 30,
      });
    }
    return response;
  } catch {
    return NextResponse.json({ tracked: false }, { status: 503 });
  }
}
