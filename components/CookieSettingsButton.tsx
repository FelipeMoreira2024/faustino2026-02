"use client";

import { AbOptOutButton, SETTINGS_EVENT } from "@/components/CookieConsent";
import { usePathname } from "next/navigation";
import { isAutoConsentPath } from "@/lib/consent";
import { LpCookieOptOut } from "@/components/lp/LpCookieOptOut";

export function CookieSettingsButton() {
  const autoConsent = isAutoConsentPath(usePathname());
  if (autoConsent) return (
    <span className="inline-flex flex-wrap justify-center gap-x-4">
      <LpCookieOptOut />
      <AbOptOutButton />
    </span>
  );

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
