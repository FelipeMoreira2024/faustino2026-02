import { NextResponse } from "next/server";
import { AB_OPTOUT_COOKIE, ASSIGNMENT_COOKIE, SESSION_COOKIE } from "@/lib/ab/crypto";

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as { enabled?: boolean } | null;
  const enabled = body?.enabled !== false;
  const response = NextResponse.json({ optedOut: enabled });
  response.cookies.set(AB_OPTOUT_COOKIE, enabled ? "1" : "", {
    httpOnly: false,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: enabled ? 60 * 60 * 24 * 365 : 0,
  });
  if (enabled) {
    response.cookies.set(ASSIGNMENT_COOKIE, "", { path: "/", maxAge: 0 });
    response.cookies.set(SESSION_COOKIE, "", { path: "/", maxAge: 0 });
  }
  return response;
}
