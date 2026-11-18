import type { Metadata } from "next";
import { headers } from "next/headers";
import { ExperimentTracker } from "@/components/ExperimentTracker";
import { AB_ENTRY_HEADER, AB_EXPOSURE_HEADER } from "@/lib/ab/crypto";
import { HOME_HOST, landingUrl, parseLandingUrl } from "@/lib/ab/urls";
import { isVercelPreview } from "@/lib/site";

const directNoIndex = new Set([
  "/b", "/home-b", "/criminalista-24h", "/advogado-criminal",
  "/advogado-defesa-criminal",
]);

export async function landingMetadata(metadata: Metadata): Promise<Metadata> {
  const entry = (await headers()).get(AB_ENTRY_HEADER);
  const address = entry ? parseLandingUrl(entry) : null;
  if (!entry || !address) return metadata;
  const index = !isVercelPreview && !(address.host === HOME_HOST && directNoIndex.has(address.path));
  const canonical = address.host === HOME_HOST && directNoIndex.has(address.path)
    ? landingUrl(HOME_HOST, "/") : entry;
  return {
    ...metadata,
    alternates: { ...metadata.alternates, canonical },
    robots: { index, follow: !isVercelPreview },
    openGraph: metadata.openGraph ? { ...metadata.openGraph, url: entry } : undefined,
  };
}

export async function LandingMeasurement() {
  const exposure = (await headers()).get(AB_EXPOSURE_HEADER);
  return (
    <span hidden data-faustino-landing="whatsapp" data-ab-exposure={exposure ?? undefined}>
      {exposure ? <ExperimentTracker key={exposure} exposure={exposure} /> : null}
    </span>
  );
}
