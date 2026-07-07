import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Serve AVIF/WebP conforme o suporte do navegador
    formats: ["image/avif", "image/webp"],
    // Cache longo das imagens otimizadas (30 dias)
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },
};

export default nextConfig;
