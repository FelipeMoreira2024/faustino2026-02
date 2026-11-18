import type { NextConfig } from "next";
import { landingCsp } from "./lib/landing-csp";
import { landingPages, landingPath } from "./lib/landing-pages";

const LANDING_URL = "https://adv.rodrigofaustinoadvocacia.com.br";
const LANDING_HOST = "adv.rodrigofaustinoadvocacia.com.br";
const HOME_URL = "https://goiania.rodrigofaustinoadvocacia.com.br";
const HOME_HOST = "goiania.rodrigofaustinoadvocacia.com.br";

const landingPaths = [
  ...landingPages.map(({ slug }) => landingPath(slug)),
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
        source: "/:path(b|criminalista-24h|advogado-criminal|advogado-defesa-criminal)",
        headers: [{ key: "X-Robots-Tag", value: "noindex" }],
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
