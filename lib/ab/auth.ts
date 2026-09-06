import "server-only";
import { createHmac, scryptSync, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";
import { ADMIN_COOKIE } from "@/lib/ab/crypto";

function signature(value: string) {
  const secret = process.env.AB_SESSION_SECRET;
  if (!secret) return "";
  return createHmac("sha256", secret).update(value).digest("base64url");
}

export function verifyPassword(password: string) {
  const configured = process.env.AB_ADMIN_PASSWORD_HASH;
  if (!configured) return false;
  const [salt, expectedHex] = configured.split(":");
  if (!salt || !expectedHex) return false;
  try {
    const actual = scryptSync(password, salt, 64);
    const expected = Buffer.from(expectedHex, "hex");
    return actual.length === expected.length && timingSafeEqual(actual, expected);
  } catch {
    return false;
  }
}

export function createAdminSession() {
  const expires = Math.floor(Date.now() / 1000) + 60 * 60 * 8;
  const payload = Buffer.from(JSON.stringify({ expires })).toString("base64url");
  return `${payload}.${signature(payload)}`;
}

export function validAdminSession(token: string | undefined) {
  if (!token) return false;
  const [payload, provided, extra] = token.split(".");
  if (!payload || !provided || extra) return false;
  const expected = signature(payload);
  if (!expected || expected.length !== provided.length) return false;
  if (!timingSafeEqual(Buffer.from(expected), Buffer.from(provided))) return false;
  try {
    const parsed = JSON.parse(Buffer.from(payload, "base64url").toString()) as { expires: number };
    return parsed.expires > Math.floor(Date.now() / 1000);
  } catch {
    return false;
  }
}

export async function isAdmin() {
  return validAdminSession((await cookies()).get(ADMIN_COOKIE)?.value);
}
