import { NextResponse } from "next/server";
import { ADMIN_COOKIE } from "@/lib/ab/crypto";
import { createAdminSession, verifyPassword } from "@/lib/ab/auth";
import { createHmac } from "node:crypto";
import { getDatabase } from "@/lib/ab/db";

export async function POST(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  const sql = getDatabase();
  if (!sql || !process.env.AB_SESSION_SECRET) return NextResponse.json({ error: "Login temporariamente indisponível." }, { status: 503 });
  const key = "login_rate:" + createHmac("sha256", process.env.AB_SESSION_SECRET).update(forwarded).digest("hex");
  let count: number;
  try {
    const rows = await sql`
      INSERT INTO ab_settings (key, value, updated_at) VALUES (${key}, '1', now())
      ON CONFLICT (key) DO UPDATE SET
        value = CASE WHEN ab_settings.updated_at < now() - interval '15 minutes' THEN '1' ELSE (ab_settings.value::int + 1)::text END,
        updated_at = CASE WHEN ab_settings.updated_at < now() - interval '15 minutes' THEN now() ELSE ab_settings.updated_at END
      RETURNING value
    `;
    count = Number(rows[0].value);
    await sql`DELETE FROM ab_settings WHERE key LIKE 'login_rate:%' AND updated_at < now() - interval '1 day'`;
  } catch {
    return NextResponse.json({ error: "Login temporariamente indisponível." }, { status: 503 });
  }
  if (count > 5) {
    return NextResponse.json({ error: "Muitas tentativas. Aguarde 15 minutos." }, { status: 429 });
  }
  const body = (await request.json().catch(() => null)) as { password?: string } | null;
  if (typeof body?.password !== "string" || body.password.length > 1024 || !verifyPassword(body.password)) {
    return NextResponse.json({ error: "Senha inválida." }, { status: 401 });
  }
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
