import { createWhatsAppLink, WA_HOME_STANDARD, WA_SIGILO } from "@/lib/whatsapp";

/**
 * Conteúdo e dados estruturados da nova página `/advogado-defesa-criminal`
 * (https://goiania.rodrigofaustinoadvocacia.com.br/advogado-defesa-criminal).
 *
 * Projetada do zero para disputar e superar a home (`/`) em conversões e
 * contratos fechados no Google Ads (mobile e desktop), tanto via tráfego direto
 * quanto no painel de testes A/B (`/admin/experimentos`).
 *
 * Conformidade integral com o Provimento 205/2021 da OAB:
 * - Sem promessa de resultado ou garantia de êxito;
 * - Sem expressões comparativas ou superlativas;
 * - Sem divulgação de valores, descontos ou gratuidade;
 * - Inscrição OAB restrita ao rodapé e ao Schema.org;
 * - Códigos de tópico neutros no dataLayer (`adc_cenario_1`..`6`).
 */

export const ADC_SLUG = "advogado-defesa-criminal";
export const ADC_PATH = `/${ADC_SLUG}`;
export const ADC_VARIANT = "e";

/** Perfil público conferido no Google Maps: 4,9 estrelas em 249 avaliações. */
export const GOOGLE_RATING = "4,9";
export const GOOGLE_REVIEWS_COUNT = 249;
export const GOOGLE_REVIEWS_URL =
  "https://www.google.com/maps/place//data=!4m4!3m3!1s0x935ef125d318e55f:0x979360c733412b7f!9m1!1b1";

export const OFFICE_BUILDING = "Condomínio Personalité Business";

export type HeroPreset = {
  id: string;
  label: string;
  topic: string;
  preview: string;
  href: string;
};

/**
 * Seleção opcional em 1 toque no Hero: prepara uma mensagem contextual de
 * defesa criminal particular, mantendo o botão principal sempre em 1 clique.
 */
export const heroPresets: HeroPreset[] = [
  {
    id: "flagrante",
    label: "Prisão / Flagrante",
    topic: "adc_cenario_1",
    preview: "Prisão em flagrante ou custódia — atendimento particular urgente",
    href: createWhatsAppLink(
      "Olá, Dr. Rodrigo. Busco atendimento particular urgente de defesa criminal: houve prisão em flagrante agora em Goiânia/região."
    ),
  },
  {
    id: "intimacao",
    label: "Intimação",
    topic: "adc_cenario_2",
    preview: "Intimação para depor — orientação prévia particular",
    href: createWhatsAppLink(
      "Olá, Dr. Rodrigo. Busco atendimento particular de defesa criminal: recebi intimação para depor e preciso de orientação antes do ato."
    ),
  },
  {
    id: "investigacao",
    label: "Investigação",
    topic: "adc_cenario_3",
    preview: "Inquérito ou mandado — análise particular do caso",
    href: createWhatsAppLink(
      "Olá, Dr. Rodrigo. Busco atendimento particular de defesa criminal para acompanhar investigação ou mandado."
    ),
  },
  {
    id: "sigilo",
    label: "Caso sigiloso",
    topic: "adc_cenario_4",
    preview: "Acusação delicada — atendimento particular e reservado",
    href: WA_SIGILO,
  },
];

export type UrgencyScenario = {
  key: string;
  tag: string;
  title: string;
  impact: string;
  ctaLabel: string;
  href: string;
};

export const urgencyScenarios: UrgencyScenario[] = [
  {
    key: "adc_cenario_1",
    tag: "Plantão 24h",
    title: "Familiar ou conhecido foi preso agora",
    impact:
      "As primeiras horas na delegacia definem a audiência de custódia. Oriente a não depor até o advogado chegar.",
    ctaLabel: "Acionar plantão agora",
    href: createWhatsAppLink(
      "Olá, Dr. Rodrigo. Busco atendimento particular urgente: um familiar/conhecido foi preso agora e preciso de advogado de defesa criminal."
    ),
  },
  {
    key: "adc_cenario_2",
    tag: "Antes de depor",
    title: "Recebi intimação policial ou judicial",
    impact:
      "Nunca compareça “só para esclarecer”. Analisamos os autos antes para você saber exatamente como se posicionar.",
    ctaLabel: "Orientar meu depoimento",
    href: createWhatsAppLink(
      "Olá, Dr. Rodrigo. Busco atendimento particular de defesa criminal: recebi intimação para depor e preciso de orientação prévia."
    ),
  },
  {
    key: "adc_cenario_3",
    tag: "Fase policial",
    title: "Inquérito, mandado ou busca e apreensão",
    impact:
      "Atuação imediata para acessar o procedimento, questionar apreensões e controlar a legalidade desde a origem.",
    ctaLabel: "Analisar investigação",
    href: createWhatsAppLink(
      "Olá, Dr. Rodrigo. Busco atendimento particular de defesa criminal para inquérito policial, mandado ou busca e apreensão."
    ),
  },
  {
    key: "adc_cenario_4",
    tag: "Sigilo absoluto",
    title: "Acusação de crime sexual ou caso sensível",
    impact:
      "Atendimento estritamente reservado, sem julgamento moral, focado na preservação da sua liberdade e reputação.",
    ctaLabel: "Falar em sigilo absoluto",
    href: WA_SIGILO,
  },
  {
    key: "adc_cenario_5",
    tag: "Liberdade",
    title: "Audiência de custódia ou pedido de soltura",
    impact:
      "Preparação documental e sustentação técnica para liberdade provisória, relaxamento de prisão ou Habeas Corpus.",
    ctaLabel: "Pedir análise urgente",
    href: createWhatsAppLink(
      "Olá, Dr. Rodrigo. Busco atendimento particular urgente para audiência de custódia ou pedido de liberdade."
    ),
  },
  {
    key: "adc_cenario_6",
    tag: "Ação penal",
    title: "Respondo a processo criminal ou Tribunal do Júri",
    impact:
      "Defesa técnica estratégica em resposta à acusação, audiências de instrução, plenário do Júri e recursos.",
    ctaLabel: "Avaliar meu processo",
    href: createWhatsAppLink(
      "Olá, Dr. Rodrigo. Busco atendimento particular de defesa criminal para acompanhar um processo criminal em andamento."
    ),
  },
];

export const servedProfiles = [
  "Pessoa presa em flagrante, preventiva ou temporária (ou familiar buscando defesa)",
  "Intimado para prestar depoimento em delegacia ou audiência judicial",
  "Investigado em inquérito policial, operação ou mandado de busca e apreensão",
  "Acusado em processo criminal, Tribunal do Júri ou recurso em tribunais",
  "Quem enfrenta acusação delicada e precisa de orientação técnica antes de falar",
];

export const notServedProfiles = [
  {
    bold: "Vítimas buscando registrar denúncia",
    rest: "ou pedir medida protetiva contra terceiros — nossa atuação é exclusiva na defesa criminal.",
  },
  {
    bold: "Vítimas de golpes financeiros ou internet",
    rest: "que buscam recuperar valores — o caminho indicado é um advogado cível ou do consumidor.",
  },
  {
    bold: "Atendimento gratuito pelo Estado",
    rest: "(Defensoria Pública). Nosso escritório atua exclusivamente em caráter particular.",
  },
];

export const criticalPhases = [
  {
    step: "01",
    when: "Primeiras horas · Delegacia",
    title: "Entrevista reservada e acesso aos autos",
    text: "Não existe conversa informal em delegacia. O advogado acessa o procedimento, confere a legalidade da abordagem e orienta sobre o direito constitucional ao silêncio.",
  },
  {
    step: "02",
    when: "Em até 24 horas · Fórum",
    title: "Audiência de custódia preparada",
    text: "O juiz analisa a legalidade da prisão e decide se a pessoa responde em liberdade. Chegar à audiência com documentos de vínculo e tese pronta é decisivo.",
  },
  {
    step: "03",
    when: "Curso do processo · Tribunais",
    title: "Habeas Corpus e defesa probatória",
    text: "Impugnação de provas ilícitas, pedidos de liberdade provisória ou revogação de preventiva, oitivas em audiência e recursos perante tribunais.",
  },
];

export const familyChecklist = [
  "Se conseguir falar com a pessoa detida, oriente a permanecer em silêncio até conversar reservadamente com o advogado.",
  "Anote o nome completo e, se já souber, a delegacia ou central de flagrantes para onde foi conduzida.",
  "Acione nosso plantão 24h no WhatsApp ou telefone — mesmo que ainda tenha poucas informações.",
];

export const confidentialPillars = [
  "Sigilo profissional garantido por lei desde a primeira mensagem no WhatsApp",
  "Atendimento reservado em Goiânia, sem exposição em recepção compartilhada",
  "Análise prévia do inquérito antes de qualquer manifestação ou depoimento",
  "Postura técnica e objetiva, totalmente isenta de julgamento moral",
];

export const practiceAreas = [
  {
    title: "Prisão em flagrante e audiência de custódia",
    text: "Presença na delegacia, conferência da legalidade do auto e defesa técnica na audiência de custódia.",
  },
  {
    title: "Pedidos de liberdade e Habeas Corpus",
    text: "Liberdade provisória, relaxamento de prisão ilegal, revogação de preventiva e impetração em tribunais.",
  },
  {
    title: "Intimações e inquérito policial",
    text: "Consulta prévia aos autos, preparo estratégico para oitivas e acompanhamento integral em delegacia.",
  },
  {
    title: "Defesa em crimes sexuais",
    text: "Atuação técnica e estritamente sigilosa para investigados ou acusados em crimes contra a dignidade sexual.",
  },
  {
    title: "Defesa em crimes de drogas",
    text: "Exame da legalidade da abordagem, busca domiciliar, cadeia de custódia da prova e teses defensivas.",
  },
  {
    title: "Estelionato, fraude e crimes digitais",
    text: "Defesa de investigados ou acusados em crimes patrimoniais, financeiros, empresariais e cibernéticos.",
  },
  {
    title: "Crimes graves e Tribunal do Júri",
    text: "Defesa artesanal desde a instrução probatória até a sustentação técnica no plenário do Tribunal do Júri.",
  },
  {
    title: "Plantão em delegacia 24 horas",
    text: "Deslocamento urgente em Goiânia, Aparecida de Goiânia e região metropolitana, inclusive de madrugada.",
  },
];

export const attorneyPoints = [
  {
    title: "Presidente da Comissão de Direitos e Prerrogativas da ABRACRIM/GO",
    detail:
      "Atuação institucional voltada a exigir respeito às garantias legais do cidadão e das prerrogativas da defesa em delegacias e juízos.",
  },
  {
    title: "Atendimento direto com o advogado titular",
    detail:
      "Desde o primeiro contato no WhatsApp ou telefone, você trata do caso diretamente com o Dr. Rodrigo Faustino — sem robôs nem triagens impessoais.",
  },
  {
    title: "Atuação concentrada em Goiânia, Aparecida e todo o Estado de Goiás",
    detail:
      "Sede física no Setor Marista aliada a deslocamento ágil para delegacias, fóruns e unidades prisionais, inclusive fora do horário comercial.",
  },
];

export const honors = [
  {
    src: "/images/honrarias/homenagem-assembleia-legislativa.webp",
    caption:
      "Medalha do Mérito Legislativo Pedro Ludovico Teixeira — Assembleia Legislativa do Estado de Goiás",
  },
  {
    src: "/images/honrarias/homenagem-camara-municipal.webp",
    caption: "Comenda Luiz Alberto Maguito Vilela — Câmara Municipal de Goiânia",
  },
  {
    src: "/images/honrarias/ministro-stj-rogerio-schietti.webp",
    caption: "Com o ministro Rogerio Schietti Cruz, do Superior Tribunal de Justiça",
  },
  {
    src: "/images/honrarias/ex-ministro-jose-eduardo-cardozo.webp",
    caption: "Com José Eduardo Cardozo, ex-ministro da Justiça",
  },
  {
    src: "/images/honrarias/secretario-nacional-justica-augusto-arruda.webp",
    caption: "Com Augusto de Arruda Botelho, Secretário Nacional de Justiça",
  },
];

export const onboardingSteps = [
  {
    title: "Chame no WhatsApp ou ligue direto",
    text: "A mensagem já abre pronta. Conte em poucas linhas a cidade, o estágio do caso e se há urgência — não envie documentos antes da orientação inicial.",
  },
  {
    title: "Diagnóstico técnico com o Dr. Rodrigo",
    text: "O advogado avalia o cenário (flagrante, intimação, inquérito ou ação penal), explica os riscos imediatos sem juridiquês e indica o primeiro passo.",
  },
  {
    title: "Proposta clara de honorários particulares",
    text: "Os honorários são apresentados com transparência antes de qualquer contratação, conforme a urgência e a complexidade. Formalizada a contratação, a atuação começa imediatamente.",
  },
];

export const reviews = [
  {
    name: "Mariangela P.",
    context: "Caso criminal complexo · Goiânia",
    text: "Profissional muito qualificado, transmitindo tranquilidade em um caso complexo. Excelente suporte do início ao fim. Muito satisfeita.",
  },
  {
    name: "Leonardo P.",
    context: "Defesa criminal · Goiânia",
    text: "Advogado superinteligente e muito prestativo com minha causa. Fiquei feliz com o resultado e grato pela dedicação dele.",
  },
  {
    name: "Luiz C.",
    context: "Atendimento ágil · Goiânia",
    text: "Atendimento rápido e profissional. Parabéns pelo profissionalismo.",
  },
];

export const faqs = [
  {
    question: "Vou conversar diretamente com o Dr. Rodrigo ou com um atendente/robô?",
    answer:
      "Diretamente com o Dr. Rodrigo Faustino. Desde o primeiro contato pelo WhatsApp ou ligação de emergência, a triagem inicial e a orientação jurídica são conduzidas pelo advogado titular, sob sigilo profissional.",
  },
  {
    question: "O plantão criminal funciona de madrugada, fins de semana e feriados?",
    answer:
      "Sim. Para emergências como prisão em flagrante, cumprimento de mandado de prisão, busca e apreensão ou audiência de custódia, o atendimento funciona 24 horas todos os dias em Goiânia, Aparecida de Goiânia e região metropolitana.",
  },
  {
    question: "Recebi intimação para depor na delegacia. Devo ir sozinho primeiro?",
    answer:
      "Não é recomendável. Tudo o que é declarado em delegacia fica formalizado no inquérito e pode comprometer a defesa futura. O ideal é o advogado consultar os autos antes do comparecimento para orientar sua postura.",
  },
  {
    question: "Como funcionam os honorários do escritório?",
    answer:
      "O atendimento é particular. Após entender o estágio do caso e o nível de urgência no primeiro contato, o Dr. Rodrigo apresenta a proposta de honorários com total transparência antes de iniciar a atuação.",
  },
  {
    question: "O escritório realiza atendimento gratuito ou pela Defensoria Pública?",
    answer:
      "Não. A atuação do escritório é exclusivamente particular. Quem busca assistência jurídica gratuita custeada pelo Estado deve procurar diretamente a Defensoria Pública.",
  },
  {
    question: "Vocês atendem vítimas de crimes, medidas protetivas ou golpes financeiros?",
    answer:
      "Não. Nossa banca atua 100% na defesa criminal de pessoas presas, intimadas, investigadas ou acusadas. Se você sofreu um golpe financeiro e busca recuperar valores, o indicado é consultar um advogado cível ou do consumidor.",
  },
  {
    question: "O que eu enviar no WhatsApp fica em sigilo mesmo se eu não contratar?",
    answer:
      "Sim. O dever legal de sigilo profissional do advogado protege integralmente toda conversa e informação compartilhada desde a primeira mensagem, independentemente da contratação.",
  },
  {
    question: "O que fazer agora se um familiar acabou de ser preso em flagrante?",
    answer:
      "Ligue ou envie mensagem imediata no plantão 24h. Se tiver contato com seu familiar, oriente-o a exercer o direito ao silêncio até a chegada do advogado. Informe o nome completo e, se souber, a delegacia onde ele se encontra.",
  },
  {
    question: "Atendem apenas em Goiânia ou também em Aparecida de Goiânia e interior?",
    answer:
      "O escritório fica no Setor Marista, em Goiânia, com plantão presencial imediato em Goiânia, Aparecida de Goiânia e região metropolitana, além de atuação em inquéritos, processos e tribunais em todo o Estado de Goiás.",
  },
];

export const defaultWhatsAppHref = WA_HOME_STANDARD;
