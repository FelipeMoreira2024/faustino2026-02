// Passada de revisão: baixa a página renderizada e confere a copy exata + deep-links.
const res = await fetch("http://localhost:3000");
const html = await res.text();

const text = html
  .replace(/<script[\s\S]*?<\/script>/g, "")
  .replace(/<style[\s\S]*?<\/style>/g, "")
  .replace(/<[^>]+>/g, " ")
  .replaceAll("&amp;", "&")
  .replaceAll("&quot;", '"')
  .replaceAll("&#x27;", "'")
  .replace(/\s+/g, " ");

const checks = [
  // Seção 1
  "PLANTÃO CRIMINAL 24H",
  "Prisão em flagrante? Fale agora:",
  "(62) 9 9444-2343",
  // Seção 2
  "DEFESA CRIMINAL • ATENDIMENTO 24 HORAS",
  "Advogado Criminalista em Goiânia",
  "Defesa imediata, 24 horas",
  "Você foi preso, intimado, está sendo investigado ou acusado de um crime? Ou um familiar acaba de ser detido? Atuação imediata na defesa criminal em Goiânia, Aparecida de Goiânia e região.",
  "Falar agora com o advogado de defesa",
  "Atendimento particular, direto com o advogado. Sigilo absoluto.",
  "Melhor avaliação de Goiânia no Google",
  "+950 defesas realizadas",
  "Sigilo total",
  // Seção 3
  "ATENÇÃO IMEDIATA",
  "Situação urgente? Cada hora conta.",
  "Prisão em flagrante (sua ou de um familiar)",
  "Intimação policial ou judicial",
  "Mandado de prisão ou de busca e apreensão",
  "Acusação de crime sexual",
  "Investigação ou inquérito em andamento",
  "Audiência de custódia nas próximas horas",
  "Não preste depoimento sem um advogado criminalista.",
  "Uma declaração equivocada nas primeiras horas pode definir o rumo de todo o processo.",
  "Falar com o advogado agora",
  // Seção 4
  "COMO ATUAMOS",
  "Atuação exclusiva em Defesa Criminal",
  "exclusivamente na defesa",
  "de pessoas presas, investigadas, intimadas ou acusadas em processos criminais — em qualquer fase: delegacia, inquérito, processo ou recurso.",
  "Atendemos você se:",
  "Você ou um familiar foi preso ou detido",
  "Você está sendo investigado ou foi indiciado",
  "Você recebeu intimação para depor",
  "Você responde a um processo criminal",
  "Você foi acusado de um crime (mesmo que ainda sem processo)",
  "Este não é o serviço adequado se:",
  "vítima de golpe online",
  "e busca recuperar valores — nesse caso, procure um advogado cível ou do consumidor",
  "registrar denúncia ou medida protetiva",
  "como vítima",
  "Defensoria Pública",
  "(atendimento gratuito do Estado)",
  // Seção 5
  "ESPECIALIDADES",
  "Defesa especializada em direito criminal",
  "Prisão em Flagrante e Audiência de Custódia",
  "Atuação nas primeiras 24 horas: acompanhamento na delegacia, análise da legalidade da prisão e defesa na audiência de custódia.",
  "Pedidos de Liberdade",
  "Habeas corpus, liberdade provisória, relaxamento de prisão e revogação de preventiva, com fundamentação técnica e agilidade.",
  "Defesa em Crimes Sexuais",
  "Defesa técnica e sigilosa para quem é",
  "em casos de estupro, importunação, assédio ou crimes online. Estratégia definida antes de qualquer declaração.",
  "Defesa em Crimes de Drogas",
  "Acusações de posse ou tráfico: análise do flagrante, tese de desclassificação e estratégia defensiva desde o início.",
  "Defesa em Acusações de Estelionato e Crimes Patrimoniais",
  "Para quem está sendo",
  "investigado ou acusado",
  "de estelionato, fraude ou crimes cibernéticos.",
  "Defesa em Crimes Violentos e Tribunal do Júri",
  "Atuação em acusações graves, com preparação técnica para plenário e foco na preservação de direitos.",
  "Acompanhamento em Delegacia 24h",
  "Presença do advogado em depoimentos, oitivas e ocorrências urgentes, a qualquer hora.",
  // Seção 6
  "REFERÊNCIA EM DIREITO CRIMINAL",
  "Dr. Rodrigo Faustino",
  "Advogado Criminalista • OAB/GO 64.028",
  "Secretário-Geral da Comissão de Direitos e Prerrogativas da ABRACRIM/GO",
  "(Associação Brasileira dos Advogados Criminalistas), com mais de",
  "950 casos de defesa criminal",
  "conduzidos em Goiânia e em todo o Estado de Goiás.",
  "Atua com defesa criminal estratégica em casos urgentes e delicados, com atendimento direto, postura técnica e orientação clara desde o primeiro contato — sempre com sigilo e responsabilidade profissional.",
  "Atendimento direto com o advogado",
  "Referência em defesa criminal em Goiás",
  "Plantão 24 horas para emergências",
  "Falar com o Dr. Rodrigo no WhatsApp",
  // Seção 7
  "Como funciona o atendimento",
  "Contato imediato",
  "Você chama no WhatsApp, descreve a situação em poucas linhas e recebe retorno rápido — 24 horas para casos urgentes.",
  "Análise do caso",
  "O advogado avalia o momento do processo, os riscos imediatos e o que precisa ser feito primeiro.",
  "Proposta de atuação e honorários",
  "proposta de honorários com total transparência",
  ", de acordo com a complexidade do caso, e as formas de pagamento. A defesa começa assim que formalizada.",
  // Seção 8
  "DEFESA ESPECIALIZADA",
  "Acusado de um crime sexual? Aja antes de falar.",
  "Acusações de crimes contra a dignidade sexual exigem defesa técnica, responsável e absolutamente sigilosa",
  "desde o primeiro contato",
  "— muitas vezes, o que é dito antes da orientação jurídica define o rumo do caso.",
  "Defesa em acusações de estupro, importunação e assédio",
  "Defesa em acusações de crimes sexuais online",
  "Acompanhamento desde o início da investigação",
  "Atuação ética, técnica e com sigilo absoluto",
  "Falar com o advogado com total sigilo",
  // Seção 9
  "O que dizem os clientes",
  "Avaliação média 5.0 no Google",
  "— por clientes reais",
  "Ver avaliações no Google",
  // Seção 10
  "Perguntas frequentes",
  "O atendimento é 24 horas?",
  "Sim. Para situações urgentes — prisão em flagrante, mandado de prisão, audiência de custódia — o plantão funciona 24h, todos os dias, em Goiânia, Aparecida de Goiânia e região.",
  "Vocês atendem vítimas de crimes ou de golpes?",
  "Quanto custa contratar a defesa?",
  "O atendimento é sigiloso?",
  "Como funciona em caso de prisão em flagrante?",
  "Atendem em Aparecida de Goiânia?",
  // Seção 11
  "Atendimento em Goiânia",
  "Dr. Rodrigo Faustino — OAB/GO 64.028",
  "Rua 1.136, nº 246 — Setor Marista, Goiânia/GO — CEP 74180-150",
  "Plantão 24 horas para urgências",
  "Falar no WhatsApp",
  "Ver no Google Maps",
  // Seção 12
  "Precisa de defesa criminal agora?",
  "Na defesa criminal,",
  "cada hora conta",
  ". Fale diretamente com o advogado e entenda o próximo passo do seu caso.",
  "Atendimento imediato no WhatsApp",
  "Disponível 24h",
  "Sigilo absoluto",
  "Atendimento particular",
];

// Eyebrows são renderizados em maiúsculas via CSS text-transform (igual à copy),
// então a comparação é feita sobre o texto em caixa alta.
const upper = text.toUpperCase();
let fail = 0;
for (const c of checks) {
  if (!text.includes(c) && !upper.includes(c.toUpperCase())) {
    console.log("FALTA:", c);
    fail++;
  }
}
console.log(
  fail === 0 ? `COPY OK — ${checks.length} trechos conferidos` : `${fail} trechos ausentes`
);

// Deep-links: decodifica os hrefs de wa.me presentes no HTML e compara com a copy
const expected = {
  padrao:
    "Olá, preciso de DEFESA CRIMINAL. Minha situação é:\n( ) Fui preso / familiar foi preso\n( ) Estou sendo investigado\n( ) Recebi intimação\n( ) Respondo a processo criminal",
  flagrante:
    "URGENTE: prisão em flagrante. Preciso de um advogado criminalista agora.",
  sigilo:
    "Olá, preciso de defesa em uma acusação delicada e busco atendimento sigiloso.",
};
// O payload RSC repete os hrefs com aspas escapadas (\") — remove a barra residual.
const hrefs = [
  ...new Set(
    (html.match(/https:\/\/wa\.me\/5562994442343\?text=[^"&]+/g) ?? []).map((h) =>
      h.replace(/\\+$/, "")
    )
  ),
];
console.log(`\n${hrefs.length} deep-links únicos encontrados:`);
for (const h of hrefs) {
  const msg = decodeURIComponent(h.split("?text=")[1].replaceAll("&amp;", "&"));
  const match = Object.entries(expected).find(([, v]) => v === msg);
  console.log(match ? `OK (${match[0]})` : `NÃO BATE: ${JSON.stringify(msg)}`);
}

// JSON-LD válido
const ld = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
for (const [, body] of ld) {
  const parsed = JSON.parse(body);
  console.log("JSON-LD OK:", parsed["@type"]);
}
