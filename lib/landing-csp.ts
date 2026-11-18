const googleTagOrigins = [
  "https://*.googletagmanager.com",
  "https://*.google-analytics.com",
  "https://*.analytics.google.com",
  "https://*.g.doubleclick.net",
  "https://*.doubleclick.net",
  "https://*.googleadservices.com",
  "https://*.googlesyndication.com",
  "https://*.google.com",
  "https://*.google.com.br",
].join(" ");

export const landingCsp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline' ${googleTagOrigins}`,
  "style-src 'self' 'unsafe-inline'",
  `img-src 'self' data: blob: ${googleTagOrigins}`,
  "font-src 'self' data:",
  `connect-src 'self' ${googleTagOrigins}`,
  `frame-src ${googleTagOrigins}`,
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'self'",
].join("; ");
