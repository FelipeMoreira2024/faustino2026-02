/**
 * Valida metadados e elementos essenciais das páginas no servidor local.
 * Uso: node scripts/check-seo.mjs [porta]
 */
import http from "node:http";

const port = process.argv[2] || "3000";
const origin = `http://localhost:${port}`;
const canonicalOrigin = "https://adv.rodrigofaustinoadvocacia.com.br";
const homeOrigin = "https://goiania.rodrigofaustinoadvocacia.com.br";

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
];

const trustPaths = [
  "/sobre-rodrigo-faustino",
  "/contato",
  "/politica-de-privacidade",
];

const paths = ["/", ...landingPaths, ...trustPaths];
const titles = new Map();
const descriptions = new Map();
let failed = 0;

function report(ok, label) {
  console.log(`${ok ? "OK    " : "FALHOU"} ${label}`);
  if (!ok) failed++;
}

function contentOf(html, pattern) {
  return html.match(pattern)?.[1]?.trim() || "";
}

function requestWithHost(path, host) {
  return new Promise((resolve, reject) => {
    const request = http.request(
      {
        hostname: "localhost",
        port,
        path,
        method: "GET",
        headers: { Host: host },
      },
      (response) => {
        let body = "";
        response.setEncoding("utf8");
        response.on("data", (chunk) => (body += chunk));
        response.on("end", () =>
          resolve({ status: response.statusCode, headers: response.headers, body })
        );
      }
    );
    request.on("error", reject);
    request.end();
  });
}

for (const path of paths) {
  const response = await fetch(`${origin}${path}`);
  const html = await response.text();
  const title = contentOf(html, /<title>([^<]+)<\/title>/i);
  const description = contentOf(
    html,
    /<meta\s+name="description"\s+content="([^"]+)"/i
  );
  const canonical = contentOf(
    html,
    /<link\s+rel="canonical"\s+href="([^"]+)"/i
  );
  const h1Count = (html.match(/<h1(?:\s|>)/g) || []).length;

  report(response.ok, `${path} responde 200`);
  report(Boolean(title), `${path} possui title`);
  report(Boolean(description), `${path} possui meta description`);
  report(h1Count === 1, `${path} possui um único H1`);
  const expectedCanonical =
    path === "/" ? homeOrigin : `${canonicalOrigin}${path}`;
  report(canonical === expectedCanonical, `${path} possui canonical correto`);

  if (titles.has(title)) {
    report(false, `${path} repete title de ${titles.get(title)}`);
  } else {
    titles.set(title, path);
  }

  if (descriptions.has(description)) {
    report(false, `${path} repete description de ${descriptions.get(description)}`);
  } else {
    descriptions.set(description, path);
  }

  if (landingPaths.includes(path)) {
    report(html.includes('"WebPage"'), `${path} possui JSON-LD WebPage`);
    report(html.includes('"Service"'), `${path} possui JSON-LD Service`);
    report(html.includes('"BreadcrumbList"'), `${path} possui BreadcrumbList`);
    report(html.includes('"FAQPage"'), `${path} possui FAQPage visível`);
  }
}

const sitemapResponse = await fetch(`${origin}/sitemap.xml`);
const sitemap = await sitemapResponse.text();
report(sitemapResponse.ok, "sitemap.xml responde 200");
for (const path of [...landingPaths, ...trustPaths]) {
  const url = `${canonicalOrigin}${path}`;
  report(sitemap.includes(url), `sitemap contém ${url}`);
}
report(!sitemap.includes(`<loc>${homeOrigin}`), "sitemap de adv não mistura a home de outro host");

const robotsResponse = await fetch(`${origin}/robots.txt`);
const robots = await robotsResponse.text();
report(robotsResponse.ok, "robots.txt responde 200");
report(
  robots.includes(`${canonicalOrigin}/sitemap.xml`),
  "robots aponta para o sitemap canônico"
);

const homeHost = "goiania.rodrigofaustinoadvocacia.com.br";
const advHost = "adv.rodrigofaustinoadvocacia.com.br";
const homeSitemapResponse = await requestWithHost("/sitemap.xml", homeHost);
const homeSitemap = homeSitemapResponse.body;
report(homeSitemapResponse.status === 200, "sitemap da home responde 200");
report(homeSitemap.includes(`<loc>${homeOrigin}`), "sitemap da home contém a home canônica");
report(!homeSitemap.includes(canonicalOrigin), "sitemap da home não mistura URLs de adv");

const homeRobotsResponse = await requestWithHost("/robots.txt", homeHost);
const homeRobots = homeRobotsResponse.body;
report(homeRobotsResponse.status === 200, "robots da home responde 200");
report(
  homeRobots.includes(`${homeOrigin}/sitemap.xml`),
  "robots da home aponta para seu próprio sitemap"
);

const advRootRedirect = await requestWithHost("/", advHost);
report(
  advRootRedirect.status === 308 && advRootRedirect.headers.location === `${homeOrigin}/`,
  "raiz de adv redireciona diretamente para a home"
);

const homeLandingRedirect = await requestWithHost(landingPaths[0], homeHost);
report(
  homeLandingRedirect.status === 308 &&
    homeLandingRedirect.headers.location === `${canonicalOrigin}${landingPaths[0]}`,
  "landing no host da home redireciona diretamente para adv"
);

process.exit(failed ? 1 : 0);
