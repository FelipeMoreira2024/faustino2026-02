"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function ExperimentTracker() {
  const pathname = usePathname();
  useEffect(() => {
    let lastVisit = 0;
    const visit = () => {
      if (pathname !== "/" || document.visibilityState !== "visible" || Date.now() - lastVisit < 60_000) return;
      lastVisit = Date.now();
      void fetch("/api/ab/visit", {
      method: "POST",
      credentials: "same-origin",
      keepalive: true,
      headers: { "Content-Type": "application/json" },
      }).then((response) => { if (!response.ok) lastVisit = 0; }).catch(() => { lastVisit = 0; });
    };
    visit();
    document.addEventListener("visibilitychange", visit);
    window.addEventListener("pointerdown", visit);
    window.addEventListener("keydown", visit);
    const retry = window.setTimeout(visit, 5_000);
    return () => {
      clearTimeout(retry);
      document.removeEventListener("visibilitychange", visit);
      window.removeEventListener("pointerdown", visit);
      window.removeEventListener("keydown", visit);
    };
  }, [pathname]);
  return null;
}

export function trackExperimentConversion() {
  if (typeof window === "undefined" || window.location.pathname !== "/") return;
  void fetch("/api/ab/conversion", {
    method: "POST",
    credentials: "same-origin",
    keepalive: true,
    headers: { "Content-Type": "application/json" },
  }).catch(() => {});
}
