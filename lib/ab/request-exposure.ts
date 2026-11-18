import { cookies } from "next/headers";
import { AB_OPTOUT_COOKIE, ASSIGNMENT_COOKIE, verifyAssignment, verifyExposure } from "@/lib/ab/crypto";

export async function requestExposure(request: Request) {
  const secret = process.env.AB_SIGNING_SECRET;
  if (!secret || /bot|crawler|spider|preview|facebookexternalhit|whatsapp/i.test(request.headers.get("user-agent") ?? "")) {
    return null;
  }
  const store = await cookies();
  if (store.get(AB_OPTOUT_COOKIE)?.value === "1") return null;
  const body: unknown = await request.json().catch(() => null);
  const token = (body as { exposure?: unknown } | null)?.exposure;
  if (typeof token !== "string" || token.length > 2048) return null;
  const [exposure, assignment] = await Promise.all([
    verifyExposure(token, secret),
    verifyAssignment(store.get(ASSIGNMENT_COOKIE)?.value, secret),
  ]);
  if (!exposure || !assignment ||
      exposure.participantId !== assignment.participantId ||
      exposure.experimentId !== assignment.experimentId ||
      exposure.pageId !== assignment.pageId || exposure.variant !== assignment.variant) return null;

  const referrer = URL.parse(request.headers.get("referer") ?? "");
  if (!referrer || referrer.origin !== request.headers.get("origin") ||
      referrer.host !== exposure.entryHost || referrer.pathname !== exposure.entryPath) return null;
  return exposure;
}
