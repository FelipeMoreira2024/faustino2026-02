"use client";

import { useEffect } from "react";

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

export function trackExperimentConversion() {
  const exposure = document.querySelector<HTMLElement>("[data-ab-exposure]")?.dataset.abExposure;
  if (exposure) void track("conversion", exposure).catch(() => {});
}
