import type { NextConfig } from "next";

const sitelinkPaths = [
  "/advogado-criminalista-goiania",
  "/defesa-criminal-urgente",
  "/prisao-em-flagrante",
  "/audiencia-de-custodia",
  "/habeas-corpus",
  "/crimes-sexuais",
];

const nextConfig: NextConfig = {
  images: {
    // Serve AVIF/WebP conforme o suporte do navegador
    formats: ["image/avif", "image/webp"],
    // Cache longo das imagens otimizadas (30 dias)
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },
  async headers() {
    return [
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
  async rewrites() {
    return sitelinkPaths.map((source) => ({
      source,
      destination: "/",
    }));
  },
};

export default nextConfig;
