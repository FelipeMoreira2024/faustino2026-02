"use client";

import { useEffect, type MouseEvent } from "react";
import { AB_OPTOUT_COOKIE } from "@/lib/ab/crypto";

function track(action: "visit" | "conversion", exposure: string) {
  return fetch(`/api/ab/${action}`, {
    method: "POST",
    credentials: "same-origin",
    keepalive: true,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ exposure }),
  });
}

export function ExperimentTracker({ exposure }: { exposure: string }) {
  useEffect(() => {
    let lastVisit = 0;
    const visit = () => {
      if (document.visibilityState !== "visible" || Date.now() - lastVisit < 60_000) return;
      lastVisit = Date.now();
      void track("visit", exposure).then((result) => {
        if (!result.ok) lastVisit = 0;
      }).catch(() => { lastVisit = 0; });
    };
    visit();
    document.addEventListener("visibilitychange", visit);
    window.addEventListener("pageshow", visit);
    window.addEventListener("pointerdown", visit);
    window.addEventListener("keydown", visit);
    const retry = window.setTimeout(visit, 5000);
    return () => {
      clearTimeout(retry);
      document.removeEventListener("visibilitychange", visit);
      window.removeEventListener("pageshow", visit);
      window.removeEventListener("pointerdown", visit);
      window.removeEventListener("keydown", visit);
    };
  }, [exposure]);
  return null;
}

function currentExposure() {
  if (document.cookie.split(";").some((cookie) => cookie.trim() === `${AB_OPTOUT_COOKIE}=1`)) return;
  return document.querySelector<HTMLElement>("[data-ab-exposure]")?.dataset;
}

export function experimentAnalytics(legacyVariant?: string) {
  const exposure = currentExposure();
  return { ab_experiment_id: exposure?.abExperimentId ?? null, ab_variant: exposure?.abVariant ?? legacyVariant ?? null };
}

export function trackExperimentConversion(event: MouseEvent<HTMLAnchorElement>) {
  const exposure = currentExposure();
  if (!exposure?.abExposure || event.defaultPrevented) return;
  void track("conversion", exposure.abExposure).catch(() => {});
  if (!exposure.abContactReference) return;

  const href = event.currentTarget.href;
  if (!href.startsWith("https://wa.me/")) return;
  const destination = new URL(href);
  const message = destination.searchParams.get("text");
  if (!message) return;
  destination.searchParams.set("text", `${message}\n\nRef. AB-${exposure.abContactReference}`);

  // O href original fica disponível para copiar e para as tags de clique do GTM.
  const whatsapp = document.createElement("a");
  whatsapp.href = destination.href;
  whatsapp.target = "_blank";
  whatsapp.rel = "noopener noreferrer";
  whatsapp.click();
  event.preventDefault();
}
