import { NextResponse } from "next/server";
import { ADMIN_COOKIE } from "@/lib/ab/crypto";
import { createAdminSession, verifyPassword } from "@/lib/ab/auth";

const attempts = new Map<string, { count: number; resetAt: number }>();

export async function POST(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  const now = Date.now();
  const attempt = attempts.get(forwarded);
  if (attempt && attempt.resetAt > now && attempt.count >= 5) {
    return NextResponse.json({ error: "Muitas tentativas. Aguarde 15 minutos." }, { status: 429 });
  }
  const body = (await request.json().catch(() => null)) as { password?: string } | null;
  if (!body?.password || !verifyPassword(body.password)) {
    attempts.set(forwarded, {
      count: attempt && attempt.resetAt > now ? attempt.count + 1 : 1,
      resetAt: now + 15 * 60_000,
    });
    return NextResponse.json({ error: "Senha inválida." }, { status: 401 });
  }
  attempts.delete(forwarded);
  const response = NextResponse.json({ ok: true });
  response.cookies.set(ADMIN_COOKIE, createAdminSession(), {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 8,
  });
  return response;
}
