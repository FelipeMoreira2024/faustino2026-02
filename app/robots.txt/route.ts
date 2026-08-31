import { HOME_URL, SITE_URL } from "@/lib/site";

export const dynamic = "force-dynamic";

const HOME_HOST = "goiania.rodrigofaustinoadvocacia.com.br";

export function GET(request: Request) {
  const host = request.headers.get("host")?.split(":")[0].toLowerCase() ?? "";
  const preview = process.env.VERCEL_ENV === "preview" || host.endsWith(".vercel.app");
  const canonicalOrigin = host === HOME_HOST ? HOME_URL : SITE_URL;
  const body = preview
    ? "User-agent: *\nDisallow: /\n"
    : `User-agent: *\nAllow: /\n\nSitemap: ${canonicalOrigin}/sitemap.xml\n`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=0, s-maxage=3600",
    },
  });
}
