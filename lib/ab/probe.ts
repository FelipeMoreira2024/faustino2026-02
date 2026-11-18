import "server-only";
import { AB_PROBE_HEADER, catalogProbeToken } from "@/lib/ab/crypto";
import type { PageAddress } from "@/lib/ab/types";
import { landingUrl } from "@/lib/ab/urls";

export async function probeLanding(page: PageAddress) {
  const secret = process.env.AB_SIGNING_SECRET;
  if (!secret) return "unverified";
  try {
    const response = await fetch(landingUrl(page.host, page.path), {
      headers: { [AB_PROBE_HEADER]: await catalogProbeToken(secret) },
      redirect: "manual", cache: "no-store", signal: AbortSignal.timeout(4000),
    });
    if (response.status >= 500 || response.status === 429 || response.status === 403) return "unverified";
    if (!response.ok || !response.headers.get("content-type")?.includes("text/html")) return "unavailable";
    return (await response.text()).includes('data-faustino-landing="whatsapp"') ? "available" : "unavailable";
  } catch {
    return "unverified";
  }
}
