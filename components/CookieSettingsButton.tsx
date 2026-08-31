"use client";

import { SETTINGS_EVENT } from "@/components/CookieConsent";

export function CookieSettingsButton() {
  return (
    <button
      type="button"
      className="link-underline"
      onClick={() => window.dispatchEvent(new Event(SETTINGS_EVENT))}
    >
      Preferências de cookies
    </button>
  );
}
