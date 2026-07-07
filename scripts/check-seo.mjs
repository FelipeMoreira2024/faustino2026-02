/**
 * Verifica as tags de SEO no HTML renderizado do dev server.
 * Uso: node scripts/check-seo.mjs [porta]
 */
const port = process.argv[2] || "3000";
const html = await (await fetch(`http://localhost:${port}/`)).text();

const checks = {
  "title otimizado": html.includes("Advogado Criminalista em Goiânia 24h"),
  "meta description": html.includes("plantão 24h"),
  canonical: html.includes('rel="canonical"'),
  "og:image": html.includes("og-image.jpg"),
  "twitter card": html.includes("summary_large_image"),
  "JSON-LD Attorney": html.includes("Attorney"),
  "JSON-LD Person": html.includes('"Person"'),
  "JSON-LD FAQPage": html.includes("FAQPage"),
  GTM: html.includes("GTM-KXMJTXP"),
  "h1 único": (html.match(/<h1/g) || []).length === 1,
  "preconnect GTM": html.includes("preconnect"),
  "robots max-image-preview": html.includes("max-image-preview"),
};

let failed = 0;
for (const [name, ok] of Object.entries(checks)) {
  console.log(`${ok ? "OK    " : "FALHOU"} ${name}`);
  if (!ok) failed++;
}
process.exit(failed ? 1 : 0);
