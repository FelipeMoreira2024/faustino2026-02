"use client";

import { useEffect } from "react";

export function ExperimentTracker() {
  useEffect(() => {
    if (window.location.pathname !== "/" || document.visibilityState !== "visible") return;
    void fetch("/api/ab/visit", {
      method: "POST",
      credentials: "same-origin",
      keepalive: true,
      headers: { "Content-Type": "application/json" },
    });
  }, []);
  return null;
}

export function trackExperimentConversion() {
  if (typeof window === "undefined" || window.location.pathname !== "/") return;
  void fetch("/api/ab/conversion", {
    method: "POST",
    credentials: "same-origin",
    keepalive: true,
    headers: { "Content-Type": "application/json" },
  });
}
