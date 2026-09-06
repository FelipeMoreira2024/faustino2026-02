import type { AssignmentPayload } from "@/lib/ab/types";

const encoder = new TextEncoder();

function toBase64Url(bytes: Uint8Array) {
  let binary = "";
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function fromBase64Url(value: string) {
  const normalized = value.replace(/-/g, "+").replace(/_/g, "/");
  const padded = normalized.padEnd(Math.ceil(normalized.length / 4) * 4, "=");
  const binary = atob(padded);
  return Uint8Array.from(binary, (character) => character.charCodeAt(0));
}

async function hmac(value: string, secret: string) {
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"]
  );
  return new Uint8Array(await crypto.subtle.sign("HMAC", key, encoder.encode(value)));
}

export async function signAssignment(payload: AssignmentPayload, secret: string) {
  const encoded = toBase64Url(encoder.encode(JSON.stringify(payload)));
  return `${encoded}.${toBase64Url(await hmac(encoded, secret))}`;
}

export async function verifyAssignment(token: string | undefined, secret: string) {
  if (!token) return null;
  const [encoded, signature, extra] = token.split(".");
  if (!encoded || !signature || extra) return null;

  try {
    const expected = await hmac(encoded, secret);
    const actual = fromBase64Url(signature);
    if (expected.length !== actual.length) return null;
    let mismatch = 0;
    for (let index = 0; index < expected.length; index += 1) {
      mismatch |= expected[index] ^ actual[index];
    }
    if (mismatch !== 0) return null;
    const payload = JSON.parse(new TextDecoder().decode(fromBase64Url(encoded))) as AssignmentPayload;
    if (!payload.experimentId || !payload.participantId || !payload.pageId) return null;
    if (payload.variant !== "a" && payload.variant !== "b") return null;
    if (payload.exp <= Math.floor(Date.now() / 1000)) return null;
    return payload;
  } catch {
    return null;
  }
}

export const ASSIGNMENT_COOKIE = "faustino_ab_assignment";
export const SESSION_COOKIE = "faustino_ab_session";
export const ADMIN_COOKIE = "faustino_ab_admin";
export const AB_OPTOUT_COOKIE = "faustino_ab_optout";
