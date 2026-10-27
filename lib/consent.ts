export const COOKIE_CONSENT_STORAGE_KEY = "faustino_cookie_consent";
export const COOKIE_SETTINGS_EVENT = "faustino:cookie-settings";

/** A home, sua variante B e a landing respeitam a recusa salva. */
export const AUTO_CONSENT_PATHS = ["/", "/b", "/defesa-criminal"];

export function isAutoConsentPath(pathname: string | null) {
  return AUTO_CONSENT_PATHS.some(
    (path) => pathname === path || (path !== "/" && pathname?.startsWith(`${path}/`))
  );
}
