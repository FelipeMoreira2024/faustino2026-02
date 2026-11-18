/**
 * Conteúdo e dados estruturados da página desafiante `/advogado-criminal`
 * (https://goiania.rodrigofaustinoadvocacia.com.br/advogado-criminal).
 *
 * Projetada para disputar diretamente com a home (`/`) em conversão e taxa de
 * fechamento comercial (mobile e desktop), tanto via tráfego direto de anúncios
 * quanto no painel de experimentos A/B (`/admin/experimentos`).
 *
 * Conformidade integral com o Provimento 205/2021 da OAB:
 * - Sem promessa de resultado ou garantia de êxito;
 * - Sem expressões comparativas ou superlativas ("melhor de Goiânia");
 * - Sem divulgação de valores, descontos ou gratuidade;
 * - Número de inscrição na OAB restrito ao rodapé e ao JSON-LD institucional;
 * - Parâmetros de rastreamento neutros no dataLayer (nenhum dado sensível do caso).
 */

export const AC_SLUG = "advogado-criminal";
export const AC_PATH = `/${AC_SLUG}`;

/** Identificador da variante no dataLayer (`ab_variant`: home="a", home-b="b", c24="c", esta="d"). */
export const AC_VARIANT = "d";

/** Perfil público no Google Maps conferido: 4,9 estrelas em 249 avaliações. */
export const GOOGLE_RATING = "4,9";
export const GOOGLE_REVIEWS_COUNT = 249;

export const GOOGLE_REVIEWS_URL =
  "https://www.google.com/maps/place//data=!4m4!3m3!1s0x935ef125d318e55f:0x979360c733412b7f!9m1!1b1";

export const OFFICE_BUILDING = "Condomínio Personalité Business";

export type TriageItem = {
  /** Código neutro enviado ao dataLayer (`lead_topic`). */
  key: string;
  tag: string;
  title: string;
  impact: string;
  ctaLabel: string;
};

/**
 * Cartões de triagem por cenário: espelham a dor real do visitante e explicam
 * em uma frase por que agir agora protege a defesa, abrindo o WhatsApp padrão.
 */
export const triageItems: TriageItem[] = [
  {
    key: "ac_triagem_1",
    tag: "Plantão 24h",
    title: "Familiar ou conhecido foi preso agora",
    impact:
      "As primeiras 24h decidem a audiência de custódia. Oriente a não depor até o advogado chegar à delegacia.",
    ctaLabel: "Acionar plantão agora",
  },
  {
    key: "ac_triagem_2",
    tag: "Antes de depor",
    title: "Recebi intimação para depor",
    impact:
      "Nunca compareça “só para esclarecer”. O advogado examina os autos antes e define como você deve se posicionar.",
    ctaLabel: "Orientar meu depoimento",
  },
  {
    key: "ac_triagem_3",
    tag: "Fase de inquérito",
    title: "Investigação ou busca e apreensão",
    impact:
      "Atuar ainda no inquérito permite acessar o procedimento, questionar provas e apontar ilegalidades desde a origem.",
    ctaLabel: "Analisar investigação",
  },
  {
    key: "ac_triagem_4",
    tag: "Sigilo absoluto",
    title: "Acusação de crime sexual ou caso sensível",
    impact:
      "Atendimento estritamente reservado, sem julgamento moral, focado na preservação da sua imagem e dos seus direitos.",
    ctaLabel: "Falar em sigilo absoluto",
  },
  {
    key: "ac_triagem_5",
    tag: "Ação penal",
    title: "Respondo a processo criminal ou Júri",
    impact:
      "Defesa técnica em resposta à acusação, audiências de instrução, plenário do Tribunal do Júri e recursos.",
    ctaLabel: "Avaliar meu processo",
  },
  {
    key: "ac_triagem_6",
    tag: "Liberdade",
    title: "Preciso pedir liberdade urgente",
    impact:
      "Habeas corpus, liberdade provisória, relaxamento de flagrante ou revogação de prisão preventiva.",
    ctaLabel: "Pedir análise urgente",
  },
];

export const servedProfiles = [
  "Pessoa presa em flagrante, preventiva ou temporária (ou familiar buscando defesa)",
  "Intimado a comparecer em delegacia ou audiência judicial",
  "Investigado em inquérito policial, operação ou busca e apreensão",
  "Acusado em processo criminal, Tribunal do Júri ou recurso em tribunal",
  "Quem sofre acusação grave ou delicada e precisa de orientação antes de falar",
];

export const notServedProfiles = [
  {
    bold: "Vítimas buscando registrar denúncia",
    rest: "ou pedir medida protetiva contra terceiros (atuamos somente na defesa de quem é acusado ou investigado).",
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

export const criticalWindows = [
  {
    step: "01",
    when: "Imediatamente após a abordagem ou intimação",
    title: "Delegacia e acesso prévio aos autos",
    text: "Não existe “conversa informal” na delegacia. O advogado entrevista o cliente em reservado, analisa o auto de prisão ou o inquérito e orienta sobre o direito constitucional ao silêncio.",
  },
  {
    step: "02",
    when: "Em até 24 horas da prisão",
    title: "Audiência de custódia",
    text: "Momento decisivo em que o juiz avalia a legalidade do flagrante e define se a pessoa responderá ao processo em liberdade. Chegar com documentação e fundamentação técnica pronta faz diferença.",
  },
  {
    step: "03",
    when: "No curso do inquérito ou processo",
    title: "Habeas Corpus e estratégia probatória",
    text: "Impugnação de provas obtidas fora da lei, pedidos de revogação de preventiva, acompanhamento em audiências e sustentação técnica perante juízes e tribunais.",
  },
];

export const familyActionSteps = [
  "Se conseguir contato com a pessoa detida, oriente a permanecer em silêncio até falar reservadamente com o advogado.",
  "Anote o nome completo e, se já souber, a delegacia ou central de flagrantes para onde foi conduzida.",
  "Acione o plantão 24h no WhatsApp agora mesmo — ainda que você tenha poucas informações em mãos.",
];

export const attorneyCredentials = [
  {
    title: "Liderança institucional na advocacia criminal",
    detail:
      "Presidente da Comissão de Direitos e Prerrogativas da ABRACRIM/GO — atuação firme para exigir que autoridades policiais e judiciais respeitem a lei.",
  },
  {
    title: "Mais de 950 defesas criminais conduzidas",
    detail:
      "Vivência diária em delegacias, audiências de custódia, varas criminais, Tribunal do Júri e tribunais em Goiânia e em todo o Estado de Goiás.",
  },
  {
    title: "Atendimento direto com o titular, sem intermediários",
    detail:
      "Você não trata o seu caso com robôs ou triagens impessoais: conversa diretamente com o Dr. Rodrigo desde a primeira mensagem.",
  },
  {
    title: "Postura técnica, humana e sem julgamento moral",
    detail:
      "Sigilo profissional absoluto e clareza sobre riscos reais e próximos passos, qualquer que seja a natureza da acusação.",
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

/**
 * Avaliações públicas verificadas no Google Maps, em conformidade com o
 * Provimento 205/2021 da OAB (sem trechos comparativos).
 */
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

export const onboardingSteps = [
  {
    title: "Envie a mensagem pronta no WhatsApp",
    text: "A conversa abre já preenchida. Informe apenas a cidade, o que aconteceu em poucas linhas e se há urgência. Não envie documentos ou fotos antes da orientação inicial.",
  },
  {
    title: "Diagnóstico direto com o Dr. Rodrigo",
    text: "O advogado avalia o estágio do caso (flagrante, intimação, inquérito ou processo), explica os riscos imediatos sem juridiquês e indica o que fazer primeiro.",
  },
  {
    title: "Proposta clara e atuação imediata",
    text: "Os honorários particulares são apresentados com transparência conforme a complexidade e urgência da atuação. Formalizada a contratação, a defesa começa imediatamente.",
  },
];

export const practiceAreas = [
  {
    title: "Prisão em flagrante e audiência de custódia",
    text: "Ida imediata à delegacia, verificação da legalidade do flagrante e defesa técnica na audiência de custódia.",
  },
  {
    title: "Pedidos de liberdade e Habeas Corpus",
    text: "Liberdade provisória, relaxamento de prisão ilegal, revogação de preventiva e habeas corpus em tribunais.",
  },
  {
    title: "Intimações e inquérito policial",
    text: "Acesso prévio aos autos, orientação estratégica antes de prestar depoimento e acompanhamento em oitivas.",
  },
  {
    title: "Defesa em crimes sexuais",
    text: "Atuação técnica e estritamente sigilosa para acusados ou investigados em crimes contra a dignidade sexual.",
  },
  {
    title: "Defesa em crimes de drogas",
    text: "Exame da legalidade da abordagem e busca, cadeia de custódia da prova e teses defensivas cabíveis.",
  },
  {
    title: "Estelionato, fraude e crimes digitais",
    text: "Defesa de investigados ou acusados em crimes patrimoniais, financeiros, empresariais e cibernéticos.",
  },
  {
    title: "Crimes graves e Tribunal do Júri",
    text: "Defesa artesanal desde a instrução até a atuação combativa no plenário do Tribunal do Júri.",
  },
  {
    title: "Plantão em delegacia 24 horas",
    text: "Presença física urgente em Goiânia, Aparecida de Goiânia e região metropolitana, inclusive de madrugada.",
  },
];

export const sensitiveHighlights = [
  "Sigilo absoluto desde a primeira mensagem no WhatsApp",
  "Análise prévia do inquérito antes de qualquer manifestação ou depoimento",
  "Defesa técnica em acusações de estupro, importunação, assédio e crimes digitais",
  "Postura ética, discreta e isenta de qualquer julgamento moral",
];

/** Perguntas frequentes alinhadas 1:1 ao JSON-LD FAQPage. */
export const faqs = [
  {
    question: "Vou falar diretamente com o Dr. Rodrigo ou com um robô?",
    answer:
      "Diretamente com o advogado. Desde o primeiro contato pelo WhatsApp, a triagem e a orientação inicial são conduzidas de forma pessoal, humana e protegida pelo sigilo profissional.",
  },
  {
    question: "O plantão criminal funciona mesmo de madrugada e fim de semana?",
    answer:
      "Sim. Para emergências como prisão em flagrante, cumprimento de mandado de prisão, busca e apreensão ou audiência de custódia, o plantão atende 24 horas todos os dias em Goiânia, Aparecida de Goiânia e região metropolitana.",
  },
  {
    question: "Recebi intimação para depor na delegacia. Devo ir sozinho primeiro?",
    answer:
      "Não é recomendável. Na delegacia não existe conversa informal: tudo o que é declarado fica registrado no inquérito e pode impactar todo o processo. Com orientação prévia, o advogado consulta os autos antes e define a estratégia segura para o ato.",
  },
  {
    question: "Quanto custa contratar a defesa criminal?",
    answer:
      "O atendimento é particular. Os honorários são definidos com transparência após a avaliação do caso, considerando a fase processual, a urgência e a complexidade técnica, sempre apresentados antes de qualquer contratação.",
  },
  {
    question: "O escritório faz atendimento gratuito ou pela Defensoria Pública?",
    answer:
      "Não. A banca atua exclusivamente como advocacia particular. Pessoas que necessitam de assistência jurídica gratuita do Estado devem procurar diretamente a Defensoria Pública.",
  },
  {
    question: "Vocês atendem vítimas de crimes, medidas protetivas ou golpes?",
    answer:
      "Não. Nossa atuação é 100% dedicada à defesa criminal de pessoas presas, intimadas, investigadas ou acusadas. Se você foi vítima de golpe financeiro e busca recuperar valores, o indicado é procurar um advogado cível ou consumerista.",
  },
  {
    question: "O que eu conversar no WhatsApp fica em sigilo mesmo se eu não fechar?",
    answer:
      "Absolutamente. O dever de sigilo profissional do advogado protege toda informação compartilhada desde o primeiro contato, independentemente da futura contratação.",
  },
  {
    question: "Como proceder agora se um familiar acabou de ser preso em flagrante?",
    answer:
      "Chame imediatamente no WhatsApp ou telefone do plantão 24h. Se conseguir contato com o familiar, oriente-o a aguardar o advogado antes de prestar depoimento. Informe o nome completo e, se souber, a delegacia para onde foi levado.",
  },
  {
    question: "Atendem apenas em Goiânia ou também em Aparecida e interior?",
    answer:
      "O escritório físico fica no Setor Marista, em Goiânia, com plantão presencial imediato em Goiânia, Aparecida de Goiânia e região metropolitana, além de atuação em processos e tribunais em todo o Estado de Goiás.",
  },
];
