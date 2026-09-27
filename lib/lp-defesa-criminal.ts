/**
 * Conteúdo da landing de anúncios `/defesa-criminal` (domínio de Goiânia).
 *
 * Página independente da home: tem copy, fotos e evento de conversão próprios
 * (`lead_whatsapp_rodrigo_faustino_v3`), para treinar uma conversão nova no
 * Google Ads sem misturar com a da home (`..._v2`).
 */

export const LP_SLUG = "defesa-criminal";
export const LP_PATH = `/${LP_SLUG}`;

/** Corpo padrão da mensagem de WhatsApp (a saudação é montada no clique). */
export const DEFAULT_MESSAGE = "Preciso falar com um advogado criminalista.";

export type Situation = {
  /**
   * Vai para o dataLayer como `lead_topic`. Código neutro de propósito: o tema
   * (prisão, investigação, crime sexual…) nunca sai do site, mesmo que um dia
   * uma variável do GTM passe a ler esse campo. O mapa é a ordem desta lista:
   * situacao_1 familiar preso · situacao_2 intimação · situacao_3 investigação ·
   * situacao_4 acusação sensível · situacao_5 processo.
   */
  key: string;
  title: string;
  detail: string;
  message: string;
};

/** Triagem de um toque: cada opção abre o WhatsApp com a mensagem já escrita. */
export const situations: Situation[] = [
  {
    key: "situacao_1",
    title: "Um familiar foi preso",
    detail: "Flagrante, delegacia ou audiência de custódia",
    message:
      "Um familiar foi preso e preciso de um advogado criminalista com urgência.",
  },
  {
    key: "situacao_2",
    title: "Recebi uma intimação",
    detail: "Para depor na delegacia ou em juízo",
    message:
      "Recebi uma intimação e preciso de um advogado criminalista para me acompanhar.",
  },
  {
    key: "situacao_3",
    title: "Estou sendo investigado",
    detail: "Inquérito, mandado de busca ou de prisão",
    message: "Estou sendo investigado e preciso de um advogado criminalista.",
  },
  {
    key: "situacao_4",
    title: "Fui acusado de crime sexual",
    detail: "Atendimento reservado, com sigilo absoluto",
    message:
      "Preciso de defesa em uma acusação delicada e gostaria de atendimento sigiloso.",
  },
  {
    key: "situacao_5",
    title: "Respondo a um processo",
    detail: "Defesa, audiências, júri ou recursos",
    message: "Respondo a um processo criminal e preciso de um advogado.",
  },
];

export const DEPOSITION_MESSAGE =
  "Preciso de um advogado para me orientar antes de um depoimento.";

export const SENSITIVE_MESSAGE =
  "Preciso de defesa em uma acusação delicada e gostaria de atendimento sigiloso.";

export const practiceAreas = [
  {
    title: "Prisão em flagrante e audiência de custódia",
    text: "Acompanhamento na delegacia, análise da legalidade da prisão e defesa na audiência de custódia.",
  },
  {
    title: "Pedidos de liberdade",
    text: "Habeas corpus, liberdade provisória, relaxamento da prisão e revogação da preventiva.",
  },
  {
    title: "Inquérito e investigação",
    text: "Acompanhamento de depoimentos e oitivas, acesso aos autos e estratégia antes de qualquer declaração.",
  },
  {
    title: "Acusações de crimes sexuais",
    text: "Defesa técnica e sigilosa de quem é acusado de estupro, importunação, assédio ou crimes pela internet.",
  },
  {
    title: "Crimes relacionados a drogas",
    text: "Posse ou tráfico: análise do flagrante, da abordagem policial e da possibilidade de desclassificação.",
  },
  {
    title: "Estelionato, fraudes e crimes patrimoniais",
    text: "Defesa de quem é investigado ou acusado, inclusive em crimes cometidos pela internet.",
  },
  {
    title: "Crimes violentos e Tribunal do Júri",
    text: "Acusações graves, com preparação técnica para o plenário do júri.",
  },
];

export const notServed = [
  "é vítima e quer registrar ocorrência ou pedir medida protetiva;",
  "sofreu um golpe e quer recuperar valores;",
  "procura o atendimento gratuito da Defensoria Pública.",
];

/** Nomes e instituições conferidos nas próprias fotos e na home atual. */
export const honors = [
  {
    src: "/images/honrarias/homenagem-assembleia-legislativa.webp",
    width: 800,
    height: 1067,
    title: "Medalha do Mérito Legislativo Pedro Ludovico Teixeira",
    source: "Assembleia Legislativa do Estado de Goiás",
  },
  {
    src: "/images/honrarias/homenagem-camara-municipal.webp",
    width: 800,
    height: 1067,
    title: "Comenda Luiz Alberto Maguito Vilela",
    source: "Câmara Municipal de Goiânia",
  },
  {
    src: "/images/honrarias/ministro-stj-rogerio-schietti.webp",
    width: 768,
    height: 960,
    title: "Com o ministro Rogerio Schietti Cruz",
    source: "Superior Tribunal de Justiça",
  },
  {
    src: "/images/honrarias/ex-ministro-jose-eduardo-cardozo.webp",
    width: 768,
    height: 960,
    title: "Com José Eduardo Cardozo",
    source: "Ex-ministro da Justiça",
  },
  {
    src: "/images/honrarias/secretario-nacional-justica-augusto-arruda.webp",
    width: 768,
    height: 960,
    title: "Com Augusto de Arruda Botelho",
    source: "Secretário Nacional de Justiça",
  },
];

/**
 * Avaliações públicas do Google (mesmo texto da home), com sobrenome abreviado
 * por discrição. A que dizia "um dos melhores advogados" ficou de fora: frase
 * comparativa é vedada pelo Provimento 205/2021, mesmo na voz do cliente.
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

/** Abre o Perfil da Empresa no Google Maps direto na aba de avaliações (`!9m1!1b1`). */
export const GOOGLE_REVIEWS_URL =
  "https://www.google.com/maps/place//data=!4m4!3m3!1s0x935ef125d318e55f:0x979360c733412b7f!9m1!1b1";

export const steps = [
  {
    title: "Você conta o que aconteceu",
    text: "Pelo WhatsApp ou por telefone, em poucas linhas: a cidade, a fase do caso e a data do próximo ato, se houver. Documentos, só quando o advogado pedir.",
  },
  {
    title: "O advogado avalia a urgência",
    text: "Riscos imediatos, prazos e a primeira providência: ir à delegacia, pedir a liberdade ou preparar o depoimento.",
  },
  {
    title: "Proposta clara, e a defesa começa",
    text: "Os honorários são apresentados com transparência, conforme a complexidade do caso. Formalizada a contratação, a defesa começa.",
  },
];

export const faqs = [
  {
    question: "O atendimento é mesmo 24 horas?",
    answer:
      "Sim. Em situações urgentes, como prisão em flagrante, mandado de prisão ou audiência de custódia, o plantão funciona 24 horas, todos os dias, inclusive fins de semana.",
  },
  {
    question: "Meu familiar foi preso. O que eu faço agora?",
    answer:
      "Fale com o advogado imediatamente, pelo WhatsApp ou por telefone, e informe o nome completo da pessoa e onde ela está. Oriente-a a não prestar depoimento antes da chegada da defesa.",
  },
  {
    question: "O que acontece na audiência de custódia?",
    answer:
      "A pessoa presa em flagrante é apresentada a um juiz em até 24 horas. Ele decide se a prisão foi legal e se ela poderá responder em liberdade. Por isso a defesa precisa estar preparada antes da audiência.",
  },
  {
    question: "Quanto custa contratar a defesa?",
    answer:
      "Os honorários são definidos depois da análise do caso, conforme a complexidade e a urgência, e apresentados com total transparência. O atendimento é particular.",
  },
  {
    question: "A conversa pelo WhatsApp é sigilosa?",
    answer:
      "Sim. Tudo o que você relata é protegido pelo sigilo profissional desde a primeira mensagem.",
  },
  {
    question: "Vocês atendem vítimas de crimes ou de golpes?",
    answer:
      "Não. O escritório atua exclusivamente na defesa de pessoas presas, investigadas ou acusadas. Para recuperar valores de um golpe, o indicado é um advogado da área cível ou do consumidor.",
  },
  {
    question: "Atendem em Aparecida de Goiânia e em outras cidades?",
    answer:
      "Sim. Goiânia, Aparecida de Goiânia e região metropolitana, com atendimento presencial e plantão 24 horas. Casos em outras cidades de Goiás são avaliados individualmente.",
  },
];
