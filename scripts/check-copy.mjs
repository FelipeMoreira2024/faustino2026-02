const baseUrl = (process.env.QA_URL ?? "http://localhost:3000").replace(/\/$/, "");

const pages = [
  ["/advogado-flagrante-goiania", "Advogado para Flagrante em Goiânia"],
  [
    "/advogado-audiencia-de-custodia-goiania",
    "Advogado para Audiência de Custódia em Goiânia",
  ],
  [
    "/pedido-liberdade-provisoria-goiania",
    "Pedido de Liberdade Provisória em Goiânia",
  ],
  [
    "/advogado-inquerito-policial-goiania",
    "Advogado para Inquérito Policial em Goiânia",
  ],
  [
    "/advogado-prisao-temporaria-goiania",
    "Advogado para Prisão Temporária em Goiânia",
  ],
  ["/advogado-criminalista-anapolis", "Advogado Criminalista em Anápolis"],
  [
    "/advogado-crimes-sexuais-aparecida-de-goiania",
    "Advogado para Crimes Sexuais em Aparecida de Goiânia",
  ],
  [
    "/advogado-crimes-sexuais-anapolis",
    "Advogado para Crimes Sexuais em Anápolis",
  ],
  [
    "/advogado-crimes-sexuais-goiania",
    "Advogado para Crimes Sexuais em Goiânia",
  ],
];

function visibleText(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/g, "")
    .replace(/<style[\s\S]*?<\/style>/g, "")
    .replace(/<[^>]+>/g, " ")
    .replaceAll("&amp;", "&")
    .replaceAll("&quot;", '"')
    .replaceAll("&#x27;", "'")
    .replaceAll("&nbsp;", " ")
    .replace(/\s+/g, " ")
    .trim();
}

async function fetchPage(path) {
  const response = await fetch(`${baseUrl}${path}`);
  if (!response.ok) {
    throw new Error(`${path || "/"}: HTTP ${response.status}`);
  }
  return response.text();
}

let failures = 0;
const homeHtml = await fetchPage("");
const homeText = visibleText(homeHtml);
const homeChecks = [
  "DEFESA CRIMINAL • ATENDIMENTO EM GOIÂNIA",
  "Advogado Criminalista em Goiânia",
  "Solicitar atendimento jurídico",
  "ORIENTAÇÃO POR SITUAÇÃO",
  "Dr. Rodrigo Faustino",
  "Perguntas frequentes",
  "Precisa de orientação em defesa criminal?",
  "Sigilo profissional",
  "Rua 1.136, nº 246",
  "Princípios do atendimento",
];

const removedRiskyClaims = [
  "Melhor avaliação de Goiânia",
  "+950 defesas",
  "O que dizem os clientes",
  "um dos melhores advogados",
  "Referência em defesa criminal em Goiás",
];

for (const expected of homeChecks) {
  if (!homeText.toLocaleLowerCase("pt-BR").includes(expected.toLocaleLowerCase("pt-BR"))) {
    console.error(`FALTA NA HOME: ${expected}`);
    failures += 1;
  }
}

for (const removed of removedRiskyClaims) {
  if (homeText.toLocaleLowerCase("pt-BR").includes(removed.toLocaleLowerCase("pt-BR"))) {
    console.error(`ALEGAÇÃO DE RISCO AINDA PRESENTE: ${removed}`);
    failures += 1;
  }
}

if (!homeHtml.includes("wa.me/5562994442343")) {
  console.error("FALTA NA HOME: link do WhatsApp");
  failures += 1;
}

for (const [path, h1] of pages) {
  const html = await fetchPage(path);
  const text = visibleText(html);

  if (!text.includes(h1)) {
    console.error(`FALTA EM ${path}: ${h1}`);
    failures += 1;
  }
  if (!html.includes("wa.me/5562994442343")) {
    console.error(`FALTA EM ${path}: link do WhatsApp`);
    failures += 1;
  }
  if (!html.includes('type="application/ld+json"')) {
    console.error(`FALTA EM ${path}: JSON-LD`);
    failures += 1;
  }
}

if (failures > 0) {
  console.error(`\nCOPY/CONTEÚDO: ${failures} falha(s)`);
  process.exit(1);
}

console.log(
  `COPY/CONTEÚDO OK — home e ${pages.length} landing pages conferidas`,
);
