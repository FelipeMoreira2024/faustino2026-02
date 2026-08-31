import { landingPages, landingPath } from "@/lib/landing-pages";
import { absoluteUrl, HOME_URL } from "@/lib/site";

export const dynamic = "force-dynamic";

const HOME_HOST = "goiania.rodrigofaustinoadvocacia.com.br";
const LAST_MODIFIED = "2026-08-31T15:00:00.000Z";

function entry(url: string) {
  return `<url><loc>${url}</loc><lastmod>${LAST_MODIFIED}</lastmod></url>`;
}

export function GET(request: Request) {
  const host = request.headers.get("host")?.split(":")[0].toLowerCase();
  const urls =
    host === HOME_HOST
      ? [HOME_URL]
      : [
          ...landingPages.map((page) => absoluteUrl(landingPath(page.slug))),
          absoluteUrl("/sobre-rodrigo-faustino"),
          absoluteUrl("/contato"),
          absoluteUrl("/politica-de-privacidade"),
        ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls.map(entry).join("")}</urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=0, s-maxage=3600",
    },
  });
}
