import { faqItems } from "@/lib/faq";

/**
 * Conteúdo da landing de anúncios `/defesa-criminal` (domínio de Goiânia).
 *
 * Página independente da home: tem copy, fotos e evento de conversão próprios
 * (`lead_whatsapp_rodrigo_faustino_v3`), para treinar uma conversão nova no
 * Google Ads sem misturar com a da home (`..._v2`).
 */

export const LP_SLUG = "defesa-criminal";
export const LP_PATH = `/${LP_SLUG}`;

export type Situation = {
  /**
   * Vai para o dataLayer como `lead_topic`. Código neutro de propósito: o tema
   * (prisão, investigação, crime sexual…) nunca sai do site, mesmo que um dia
   * uma variável do GTM passe a ler esse campo. O mapa é a ordem desta lista:
   * situacao_1 flagrante · situacao_2 intimação · situacao_3 mandado ·
   * situacao_4 acusação sensível · situacao_5 investigação · situacao_6 custódia.
   */
  key: string;
  title: string;
  detail: string;
};

/** Triagem de um toque: cada opção abre o WhatsApp com a mensagem já escrita. */
export const situations: Situation[] = [
  {
    key: "situacao_1",
    title: "Prisão em flagrante (sua ou de um familiar)",
    detail: "Flagrante, delegacia ou audiência de custódia",
  },
  {
    key: "situacao_2",
    title: "Intimação policial ou judicial",
    detail: "Para depor na delegacia ou em juízo",
  },
  {
    key: "situacao_3",
    title: "Mandado de prisão ou de busca e apreensão",
    detail: "Defesa imediata na delegacia e acompanhamento do caso",
  },
  {
    key: "situacao_4",
    title: "Acusação de crime sexual",
    detail: "Atendimento reservado, com sigilo absoluto",
  },
  {
    key: "situacao_5",
    title: "Investigação ou inquérito em andamento",
    detail: "Estratégia defensiva antes de qualquer declaração",
  },
  {
    key: "situacao_6",
    title: "Audiência de custódia nas próximas horas",
    detail: "Análise da legalidade da prisão e defesa na audiência",
  },
];

export const practiceAreas = [
  {
    title: "Prisão em Flagrante e Audiência de Custódia",
    text: "Atuação nas primeiras 24 horas: acompanhamento na delegacia, análise da legalidade da prisão e defesa na audiência de custódia.",
  },
  {
    title: "Pedidos de Liberdade",
    text: "Habeas corpus, liberdade provisória, relaxamento de prisão e revogação de preventiva, com fundamentação técnica e agilidade.",
  },
  {
    title: "Defesa em Crimes Sexuais",
    text: "Defesa técnica e sigilosa para quem é acusado em casos de estupro, importunação, assédio ou crimes online. Estratégia definida antes de qualquer declaração.",
  },
  {
    title: "Defesa em Crimes de Drogas",
    text: "Acusações de posse ou tráfico: análise do flagrante, tese de desclassificação e estratégia defensiva desde o início.",
  },
  {
    title: "Defesa em Acusações de Estelionato e Crimes Patrimoniais",
    text: "Para quem está sendo investigado ou acusado de estelionato, fraude ou crimes cibernéticos.",
  },
  {
    title: "Defesa em Crimes Violentos e Tribunal do Júri",
    text: "Atuação em acusações graves, com preparação técnica para plenário e foco na preservação de direitos.",
  },
  {
    title: "Acompanhamento em Delegacia 24h",
    text: "Presença do advogado em depoimentos, oitivas e ocorrências urgentes, a qualquer hora.",
  },
];

export const notServed = [
  "Você busca registrar denúncia ou medida protetiva como vítima",
  "Você procura a Defensoria Pública (atendimento gratuito do Estado)",
  "Você foi vítima de golpe online e busca recuperar valores.",
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
    title: "Contato imediato",
    text: "Você chama no WhatsApp, descreve a situação em poucas linhas e recebe retorno rápido — 24 horas para casos urgentes.",
  },
  {
    title: "Análise do caso",
    text: "O advogado avalia o momento do processo, os riscos imediatos e o que precisa ser feito primeiro.",
  },
  {
    title: "Proposta de atuação",
    text: "Após a análise, você recebe a proposta de honorários com total transparência, de acordo com a complexidade do caso, e as formas de pagamento. A defesa começa assim que formalizada.",
  },
];

/** A mesma copy de FAQ da home, com o contato da landing somente por WhatsApp. */
export const faqs = faqItems.map(({ question, answer }) => ({
  question,
  answer: answer.replace("WhatsApp ou telefone", "WhatsApp"),
}));
