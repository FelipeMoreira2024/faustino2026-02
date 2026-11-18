export const HOME_HOST = "goiania.rodrigofaustinoadvocacia.com.br";
export const LANDING_HOST = "adv.rodrigofaustinoadvocacia.com.br";
export const LANDING_HOSTS = [HOME_HOST, LANDING_HOST];

export function isLandingHost(host: string) {
  return LANDING_HOSTS.includes(host);
}

export function landingUrl(host: string, path: string) {
  return `https://${host}${path}`;
}

export function parseLandingUrl(input: string, host = HOME_HOST) {
  if (!isLandingHost(host) || !input || /[\\?#]/.test(input)) return null;
  if (!input.startsWith("https://") && (!input.startsWith("/") || input.startsWith("//"))) return null;
  const url = URL.parse(input, landingUrl(host, "/"));
  if (!url || url.protocol !== "https:" || !isLandingHost(url.host) || url.username || url.password) return null;
  const path = url.pathname.replace(/\/$/, "") || "/";
  if (!/^\/(?:[a-z0-9_-]+(?:\/[a-z0-9_-]+)*)?$/.test(path)) return null;
  if (/^\/(?:api|admin|_next|images|politica-de-privacidade)(?:\/|$)/.test(path)) return null;
  return { host: url.host, path };
}

export function landingContentKey(host: string, path: string) {
  if (path === "/b" || path === "/criminalista-24h") return landingUrl(HOME_HOST, "/criminalista-24h");
  return landingUrl(host, path);
}
