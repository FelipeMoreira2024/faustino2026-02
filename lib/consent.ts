export const COOKIE_CONSENT_STORAGE_KEY = "faustino_cookie_consent";
export const COOKIE_SETTINGS_EVENT = "faustino:cookie-settings";

/** A home e a landing carregam métricas por padrão, respeitando a recusa salva. */
export const AUTO_CONSENT_PATHS = ["/", "/defesa-criminal"];

export function isAutoConsentPath(pathname: string | null) {
  return AUTO_CONSENT_PATHS.some(
    (path) => pathname === path || (path !== "/" && pathname?.startsWith(`${path}/`))
  );
}
