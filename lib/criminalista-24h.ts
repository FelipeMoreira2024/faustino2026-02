/**
 * Conteúdo da página desafiante `/criminalista-24h` (domínio de Goiânia).
 *
 * Desenhada para disputar com a home no painel A/B (`/admin/experimentos`):
 * mantém o que a home já provou (título, mensagem do WhatsApp, telefone na
 * topbar, paleta) e muda layout, prova social e argumentos de fechamento.
 *
 * Copy pensada para o Provimento 205/2021 da OAB: sem promessa de resultado,
 * sem comparação com outros advogados, sem valores ou condições de pagamento.
 */

export const C24_SLUG = "criminalista-24h";
export const C24_PATH = `/${C24_SLUG}`;

/** Vai para o dataLayer como `ab_variant` (a home é "a", a /b é "b"). */
export const C24_VARIANT = "c";

/**
 * Perfil do Google conferido em 05/11/2026: 4,9 estrelas, 249 avaliações.
 * Atualize os dois valores quando o perfil mudar.
 */
export const GOOGLE_RATING = "4,9";
export const GOOGLE_REVIEWS_COUNT = 249;

/** Abre o Perfil da Empresa no Google Maps direto na aba de avaliações. */
export const GOOGLE_REVIEWS_URL =
  "https://www.google.com/maps/place//data=!4m4!3m3!1s0x935ef125d318e55f:0x979360c733412b7f!9m1!1b1";

export const OFFICE_BUILDING = "Condomínio Personalité Business";

export type Situation = {
  /**
   * `lead_topic` no dataLayer. Código neutro de propósito: o tema do caso não
   * sai do site. Mapa: 1 familiar preso · 2 intimação · 3 investigação ·
   * 4 processo · 5 acusação sensível · 6 outra situação.
   */
  key: string;
  title: string;
  detail: string;
};

/** Cada opção abre o WhatsApp com a mesma mensagem padrão da home. */
export const situations: Situation[] = [
  {
    key: "c24_situacao_1",
    title: "Um familiar foi preso",
    detail: "Flagrante, delegacia ou audiência de custódia",
  },
  {
    key: "c24_situacao_2",
    title: "Recebi uma intimação",
    detail: "Para depor na delegacia ou em juízo",
  },
  {
    key: "c24_situacao_3",
    title: "Estou sendo investigado",
    detail: "Inquérito, mandado de busca ou de prisão",
  },
  {
    key: "c24_situacao_4",
    title: "Respondo a um processo criminal",
    detail: "Defesa, audiências e recursos",
  },
  {
    key: "c24_situacao_5",
    title: "Acusação de crime sexual",
    detail: "Atendimento reservado, com sigilo absoluto",
  },
  {
    key: "c24_situacao_6",
    title: "Outra situação criminal",
    detail: "Explique em poucas linhas no WhatsApp",
  },
];

/** O que acontece depois de uma prisão em flagrante (CPP, art. 310; Res. CNJ 213/2015). */
export const firstHours = [
  {
    when: "Logo após a prisão",
    title: "Na delegacia",
    text: "Registro do flagrante e depoimento. O advogado acompanha a pessoa presa, orienta sobre o direito de permanecer em silêncio e verifica se a prisão foi legal.",
  },
  {
    when: "Em até 24 horas",
    title: "Audiência de custódia",
    text: "O juiz decide se a prisão será mantida ou se a pessoa vai responder em liberdade. É quando a defesa apresenta os fundamentos para a liberdade provisória.",
  },
  {
    when: "Se a prisão for mantida",
    title: "Pedidos de liberdade",
    text: "A defesa segue com as medidas cabíveis: habeas corpus, relaxamento da prisão ou revogação da prisão preventiva.",
  },
];

export const familyChecklist = [
  "Anote o nome completo da pessoa e, se souber, a delegacia onde ela está.",
  "Se conseguir falar com ela, oriente a não prestar depoimento antes da chegada do advogado.",
  "Chame o advogado e conte o que sabe, mesmo que sejam poucas informações.",
];

export const attorneyHighlights = [
  "Atuação exclusiva em defesa criminal",
  "Atendimento direto com o advogado, desde o primeiro contato",
  "Plantão 24 horas para prisões e casos urgentes",
  "Goiânia, Aparecida de Goiânia e região metropolitana",
];

/** Nomes e instituições conferidos nas próprias fotos (mesmos da landing /defesa-criminal). */
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

/**
 * Avaliações públicas do Google (mesmo texto da home), com sobrenome abreviado.
 * Ficou de fora a que dizia "um dos melhores advogados": frase comparativa é
 * vedada pelo Provimento 205/2021, mesmo na voz do cliente.
 */
export const reviews = [
  {
    name: "Mariangela P.",
    text: "Profissional muito qualificado, transmitindo tranquilidade em um caso complexo. Excelente suporte do início ao fim. Muito satisfeita.",
  },
  {
    name: "Leonardo P.",
    text: "Advogado superinteligente e muito prestativo com minha causa. Fiquei feliz com o resultado e grato pela dedicação dele.",
  },
  {
    name: "Luiz C.",
    text: "Atendimento rápido e profissional. Parabéns pelo profissionalismo.",
  },
];

export const processSteps = [
  {
    title: "Você chama no WhatsApp",
    text: "A conversa abre com a mensagem pronta. Conte em poucas linhas o que aconteceu — não precisa ter todos os detalhes.",
  },
  {
    title: "O advogado analisa o caso",
    text: "Avalia a fase do caso, os riscos imediatos e o que precisa ser feito primeiro, e explica tudo com clareza.",
  },
  {
    title: "Proposta clara, antes de começar",
    text: "Você recebe a proposta de honorários com total transparência, de acordo com a complexidade do caso. A defesa começa assim que formalizada.",
  },
];

export const practiceAreas = [
  {
    title: "Prisão em flagrante e audiência de custódia",
    text: "Acompanhamento na delegacia, análise da legalidade da prisão e defesa na audiência de custódia.",
  },
  {
    title: "Pedidos de liberdade",
    text: "Habeas corpus, liberdade provisória, relaxamento de prisão e revogação de preventiva.",
  },
  {
    title: "Inquérito e investigação",
    text: "Orientação antes do depoimento, acompanhamento de intimações e estratégia desde o início.",
  },
  {
    title: "Defesa em crimes sexuais",
    text: "Defesa técnica e sigilosa para quem é acusado em casos de estupro, importunação, assédio ou crimes online.",
  },
  {
    title: "Defesa em crimes de drogas",
    text: "Acusações de posse ou tráfico: análise do flagrante e estratégia defensiva desde o início.",
  },
  {
    title: "Estelionato e crimes patrimoniais",
    text: "Para quem está sendo investigado ou acusado de estelionato, fraude ou crimes cibernéticos.",
  },
  {
    title: "Crimes violentos e Tribunal do Júri",
    text: "Atuação em acusações graves, com preparação técnica para o plenário.",
  },
  {
    title: "Acompanhamento em delegacia 24h",
    text: "Presença do advogado em depoimentos, oitivas e ocorrências urgentes, a qualquer hora.",
  },
];

export const servedProfiles = [
  "Você ou um familiar foi preso ou detido",
  "Você está sendo investigado ou foi indiciado",
  "Você recebeu intimação para depor",
  "Você responde a um processo criminal",
  "Você foi acusado de um crime, mesmo que ainda sem processo",
];

export const notServed = [
  "Você busca registrar denúncia ou medida protetiva como vítima",
  "Você procura atendimento gratuito (Defensoria Pública)",
  "Você foi vítima de golpe e busca recuperar valores",
];

export const sensitivePoints = [
  "Defesa em acusações de estupro, importunação e assédio",
  "Defesa em acusações de crimes sexuais online",
  "Acompanhamento desde o início da investigação",
  "Atuação ética, técnica e com sigilo absoluto",
];

/** Texto plano: o mesmo vai para o JSON-LD FAQPage. */
export const faqs = [
  {
    question: "O atendimento é mesmo 24 horas?",
    answer:
      "Sim. Para situações urgentes — prisão em flagrante, mandado de prisão, audiência de custódia — o plantão funciona 24 horas, todos os dias, inclusive fins de semana e feriados, em Goiânia, Aparecida de Goiânia e região.",
  },
  {
    question: "Vou falar diretamente com o advogado?",
    answer:
      "Sim. O atendimento é direto com o advogado desde o primeiro contato pelo WhatsApp. É ele quem analisa o caso e orienta os próximos passos.",
  },
  {
    question: "Quanto custa contratar a defesa?",
    answer:
      "Os honorários são definidos após a análise do caso, de acordo com a complexidade e a urgência, e apresentados com total transparência antes de qualquer contratação.",
  },
  {
    question: "O atendimento é gratuito?",
    answer:
      "Não. O atendimento é particular. Quem busca atendimento gratuito deve procurar a Defensoria Pública.",
  },
  {
    question: "Como funciona em caso de prisão em flagrante?",
    answer:
      "Entre em contato imediatamente pelo WhatsApp. O advogado orienta os primeiros passos, acompanha na delegacia e atua na audiência de custódia. Oriente o familiar detido a não prestar depoimento antes da chegada do advogado.",
  },
  {
    question: "Recebi uma intimação para depor. Preciso de advogado?",
    answer:
      "É o recomendado. O depoimento fica registrado no inquérito e pode ser usado ao longo de todo o processo. Com orientação prévia, você comparece sabendo quais são os seus direitos e como se posicionar.",
  },
  {
    question: "O atendimento é sigiloso?",
    answer:
      "Absolutamente. Todo contato é protegido pelo sigilo profissional, desde a primeira mensagem no WhatsApp.",
  },
  {
    question: "Vocês atendem vítimas de crimes ou de golpes?",
    answer:
      "Não. A atuação do escritório é exclusiva em defesa criminal — pessoas presas, investigadas ou acusadas. Se você foi vítima de golpe e busca recuperar valores, o indicado é um advogado da área cível ou do consumidor.",
  },
  {
    question: "Atendem em Aparecida de Goiânia e região?",
    answer:
      "Sim — Goiânia, Aparecida de Goiânia e região metropolitana, com atendimento presencial e plantão 24 horas.",
  },
];
