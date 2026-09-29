import { landingPages, landingPath } from "@/lib/landing-pages";
import { LP_PATH } from "@/lib/lp-defesa-criminal";
import { absoluteUrl, homeUrl, HOME_URL } from "@/lib/site";

export const dynamic = "force-dynamic";

const HOME_HOST = "goiania.rodrigofaustinoadvocacia.com.br";
const LAST_MODIFIED = "2026-08-31T15:00:00.000Z";
const DEFESA_CRIMINAL_URL = homeUrl(LP_PATH);

function entry(url: string) {
  const lastModified = url === DEFESA_CRIMINAL_URL ? "2026-09-29" : LAST_MODIFIED;
  return `<url><loc>${url}</loc><lastmod>${lastModified}</lastmod></url>`;
}

export function GET(request: Request) {
  const host = request.headers.get("host")?.split(":")[0].toLowerCase();
  const urls =
    host === HOME_HOST
      ? [HOME_URL, DEFESA_CRIMINAL_URL]
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
