import type { NextConfig } from "next";

const LANDING_URL = "https://adv.rodrigofaustinoadvocacia.com.br";
const LANDING_HOST = "adv.rodrigofaustinoadvocacia.com.br";
const HOME_URL = "https://goiania.rodrigofaustinoadvocacia.com.br";
const HOME_HOST = "goiania.rodrigofaustinoadvocacia.com.br";

const landingPaths = [
  "/advogado-flagrante-goiania",
  "/advogado-audiencia-de-custodia-goiania",
  "/pedido-liberdade-provisoria-goiania",
  "/advogado-inquerito-policial-goiania",
  "/advogado-prisao-temporaria-goiania",
  "/advogado-criminalista-anapolis",
  "/advogado-crimes-sexuais-aparecida-de-goiania",
  "/advogado-crimes-sexuais-anapolis",
  "/advogado-crimes-sexuais-goiania",
  "/sobre-rodrigo-faustino",
  "/contato",
  "/politica-de-privacidade",
];

const legacyRedirects = [
  ["/advogado-criminalista-goiania", "/"],
  ["/defesa-criminal-urgente", "/advogado-flagrante-goiania"],
  ["/prisao-em-flagrante", "/advogado-flagrante-goiania"],
  ["/audiencia-de-custodia", "/advogado-audiencia-de-custodia-goiania"],
  ["/habeas-corpus", "/pedido-liberdade-provisoria-goiania"],
  ["/crimes-sexuais", "/advogado-crimes-sexuais-goiania"],
];

/**
 * CSP da landing /defesa-criminal (só dela; as demais páginas não mudam).
 * Libera o próprio site e o que GTM, GA4 e Google Ads usam. `unsafe-inline`
 * continua necessário para os scripts inline do Next (página estática, sem nonce)
 * e para o carregador do GTM. Ao adicionar outra ferramenta no GTM (ex.: Pixel
 * da Meta), inclua os domínios dela aqui, senão ela será bloqueada.
 */
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

const landingCsp = [
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

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60 * 60 * 24 * 30,
    qualities: [65, 70, 75],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
      {
        source: "/defesa-criminal",
        headers: [{ key: "Content-Security-Policy", value: landingCsp }],
      },
      {
        source: "/images/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/",
        has: [
          {
            type: "host",
            value: LANDING_HOST,
          },
        ],
        destination: HOME_URL,
        permanent: true,
      },
      ...landingPaths.map((source) => ({
        source,
        has: [{ type: "host" as const, value: HOME_HOST }],
        destination: `${LANDING_URL}${source}`,
        permanent: true,
      })),
      ...legacyRedirects.map(([source, destination]) => ({
        source,
        has: [{ type: "host" as const, value: HOME_HOST }],
        destination:
          destination === "/" ? HOME_URL : `${LANDING_URL}${destination}`,
        permanent: true,
      })),
      ...legacyRedirects.map(([source, destination]) => ({
        source,
        destination,
        permanent: true,
      })),
    ];
  },
};

export default nextConfig;
