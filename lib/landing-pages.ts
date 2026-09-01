export type LandingKind = "urgent" | "investigation" | "local" | "sensitive";

export type LandingSection = {
  eyebrow: string;
  title: string;
  paragraphs: string[];
  bullets?: string[];
};

export type LandingFaq = {
  question: string;
  answer: string;
};

export type LandingSource = {
  label: string;
  href: string;
};

export type LandingPage = {
  slug: string;
  kind: LandingKind;
  city: "Goiânia" | "Aparecida de Goiânia" | "Anápolis";
  topic: string;
  seoTitle: string;
  description: string;
  h1: string;
  accent: string;
  badge: string;
  lead: string;
  quickAnswer: string;
  notice: string;
  primaryKeyword: string;
  secondaryKeywords: string[];
  whatsappMessage: string;
  situationsTitle: string;
  situationsIntro: string;
  situations: string[];
  stepsTitle: string;
  steps: Array<{ title: string; text: string }>;
  sections: LandingSection[];
  localTitle: string;
  localParagraphs: string[];
  localPoints: string[];
  faqs: LandingFaq[];
  relatedSlugs: string[];
  sources: LandingSource[];
  lastUpdated: string;
};

const CPP = {
  label: "Código de Processo Penal — Presidência da República",
  href: "https://www.planalto.gov.br/ccivil_03/decreto-lei/del3689compilado.htm",
};

const CNJ_CUSTODY = {
  label: "Resolução CNJ nº 213/2015 — audiência de custódia",
  href: "https://atos.cnj.jus.br/atos/detalhar/2234",
};

const TEMPORARY_PRISON = {
  label: "Lei nº 7.960/1989 — prisão temporária",
  href: "https://www.planalto.gov.br/ccivil_03/leis/l7960.htm",
};

const PENAL_CODE = {
  label: "Código Penal — Presidência da República",
  href: "https://www.planalto.gov.br/ccivil_03/decreto-lei/del2848compilado.htm",
};

export const landingPages: LandingPage[] = [
  {
    slug: "advogado-flagrante-goiania",
    kind: "urgent",
    city: "Goiânia",
    topic: "Prisão em flagrante",
    seoTitle: "Advogado para Flagrante em Goiânia | Faustino",
    description:
      "Prisão em flagrante em Goiânia? Atendimento criminal urgente na delegacia, orientação à família e atuação na audiência de custódia.",
    h1: "Advogado para Flagrante em Goiânia",
    accent: "Atuação imediata desde a delegacia",
    badge: "PLANTÃO CRIMINAL · GOIÂNIA",
    lead:
      "Quando alguém é preso, as primeiras informações costumam chegar incompletas. A defesa começa organizando o que já se sabe, localizando a ocorrência e acompanhando os atos que podem influenciar as etapas seguintes.",
    quickAnswer:
      "O advogado para flagrante acompanha a pessoa presa na delegacia, verifica a documentação da prisão, orienta sobre declarações e avalia as medidas cabíveis. Depois, prepara a atuação para a audiência de custódia ou para o pedido adequado ao caso.",
    notice:
      "Evite divulgar versões do caso em redes sociais ou orientar a pessoa presa a assinar documentos sem compreender o conteúdo. Informe ao advogado apenas os dados necessários para localizar a ocorrência.",
    primaryKeyword: "advogado para flagrante em Goiânia",
    secondaryKeywords: [
      "prisão em flagrante Goiânia",
      "advogado na delegacia Goiânia",
      "advogado criminalista urgente Goiânia",
      "familiar preso em Goiânia",
      "defesa em flagrante",
    ],
    whatsappMessage:
      "URGENTE: houve uma prisão em flagrante em Goiânia. Nome da pessoa presa: ___. Local informado: ___.",
    situationsTitle: "Quando procurar defesa imediatamente",
    situationsIntro:
      "O contato pode ser feito pela pessoa conduzida, por familiares ou por alguém responsável por reunir as informações básicas.",
    situations: [
      "A pessoa foi conduzida para uma delegacia e a família não sabe qual unidade",
      "O auto de prisão em flagrante está sendo preparado",
      "Há informação de apreensão de objetos, telefone, veículo ou documentos",
      "A pessoa será ouvida e ainda não recebeu orientação jurídica",
      "A audiência de custódia deve ocorrer nas próximas horas",
      "Existe dúvida sobre fiança, liberação ou encaminhamento ao sistema prisional",
    ],
    stepsTitle: "Como funciona a atuação no flagrante",
    steps: [
      {
        title: "Localização e triagem",
        text: "A família informa nome, horário aproximado, local da abordagem e unidade policial, quando conhecida.",
      },
      {
        title: "Acompanhamento na delegacia",
        text: "O advogado busca acesso às informações disponíveis, acompanha os atos permitidos e orienta a pessoa presa.",
      },
      {
        title: "Análise da prisão",
        text: "São avaliados o contexto da abordagem, os registros, as apreensões e a documentação produzida.",
      },
      {
        title: "Próxima medida",
        text: "A estratégia considera audiência de custódia, fiança, liberdade provisória ou outra providência juridicamente adequada.",
      },
    ],
    sections: [
      {
        eyebrow: "PRIMEIRAS HORAS",
        title: "O que a família pode fazer sem prejudicar a defesa",
        paragraphs: [
          "O primeiro passo é confirmar o nome completo da pessoa presa, o horário aproximado da abordagem e o local para onde ela foi levada. Informações fragmentadas devem ser tratadas como provisórias até a conferência dos registros oficiais.",
          "Também é útil separar documentos de identificação e informar condições de saúde, uso contínuo de medicamentos ou necessidade de contato com responsáveis por crianças e dependentes. Esses dados ajudam a defesa a compreender urgências concretas sem transformar o WhatsApp em um depoimento informal.",
        ],
        bullets: [
          "Não publicar acusações, nomes de terceiros ou versões do fato",
          "Não apagar conversas, arquivos ou registros do aparelho",
          "Não combinar versões entre familiares ou testemunhas",
          "Guardar protocolos, nomes de unidades e horários informados",
        ],
      },
      {
        eyebrow: "LEGALIDADE",
        title: "O flagrante precisa ser examinado no caso concreto",
        paragraphs: [
          "A prisão em flagrante não encerra a discussão sobre liberdade e também não equivale a condenação. A defesa verifica se a situação descrita nos registros corresponde às hipóteses legais, se os direitos foram respeitados e se a documentação contém inconsistências relevantes.",
          "Esse exame depende do acesso aos elementos disponíveis. Por isso, não é responsável prometer soltura antes de conhecer a ocorrência, a imputação, os antecedentes processuais e as circunstâncias registradas pela autoridade policial.",
        ],
      },
      {
        eyebrow: "ETAPA SEGUINTE",
        title: "Da delegacia à audiência de custódia",
        paragraphs: [
          "Quando o flagrante é formalizado, o caso segue para controle judicial. Na audiência de custódia são examinadas a legalidade da prisão, eventuais relatos de violência e a necessidade ou não de manutenção da restrição de liberdade.",
          "A preparação deve começar antes da audiência. Comprovantes de residência, trabalho, estudo, dependentes e condições de saúde podem ser relevantes, mas a utilidade de cada documento depende da situação concreta e da tese que será apresentada.",
        ],
        bullets: [
          "Organização dos documentos úteis para a audiência",
          "Análise de medidas cautelares diversas da prisão",
          "Avaliação de pedido de liberdade ou relaxamento, quando cabível",
          "Orientação à família sobre os próximos atos",
        ],
      },
    ],
    localTitle: "Atendimento de flagrante em Goiânia",
    localParagraphs: [
      "O escritório está sediado no Setor Marista, em Goiânia, e mantém canal de plantão para situações criminais urgentes. O atendimento começa pelo telefone ou WhatsApp para identificar a unidade e a necessidade imediata.",
      "O tempo de deslocamento depende da localização, do trânsito e da disponibilidade no momento do chamado. A confirmação é feita diretamente no primeiro contato, sem promessa automática de chegada em prazo fixo.",
    ],
    localPoints: [
      "Sede no Setor Marista, Goiânia",
      "Contato direto com o advogado",
      "Plantão para ocorrências urgentes",
    ],
    faqs: [
      {
        question: "O que fazer quando um familiar é preso em flagrante em Goiânia?",
        answer:
          "Confirme nome completo, horário aproximado e unidade para onde a pessoa foi levada. Em seguida, procure orientação jurídica e evite divulgar versões do fato ou pedir que terceiros interfiram nos depoimentos.",
      },
      {
        question: "A pessoa deve prestar depoimento antes da chegada do advogado?",
        answer:
          "A pessoa presa tem direito ao silêncio e à assistência de advogado. A decisão sobre declarar ou permanecer em silêncio deve ser tomada com orientação adequada ao caso, não por mensagens de terceiros.",
      },
      {
        question: "O advogado consegue libertar a pessoa ainda na delegacia?",
        answer:
          "Algumas situações admitem fiança pela autoridade policial; outras dependem de decisão judicial. Também pode haver discussão sobre a legalidade da prisão. A medida correta só pode ser definida após análise.",
      },
      {
        question: "Quais informações devo enviar no primeiro contato?",
        answer:
          "Nome da pessoa presa, local informado, horário aproximado, delegacia conhecida e eventual condição de saúde urgente. Evite enviar narrativas longas, documentos sensíveis ou dados de terceiros sem solicitação.",
      },
      {
        question: "A contratação garante liberdade?",
        answer:
          "Não. Nenhum advogado pode garantir uma decisão. A defesa apresenta as medidas juridicamente cabíveis e atua para que os direitos e as circunstâncias do caso sejam considerados.",
      },
    ],
    relatedSlugs: [
      "advogado-audiencia-de-custodia-goiania",
      "pedido-liberdade-provisoria-goiania",
      "advogado-prisao-temporaria-goiania",
    ],
    sources: [CPP, CNJ_CUSTODY],
    lastUpdated: "31 de agosto de 2026",
  },
  {
    slug: "advogado-audiencia-de-custodia-goiania",
    kind: "urgent",
    city: "Goiânia",
    topic: "Audiência de custódia",
    seoTitle: "Advogado para Audiência de Custódia em Goiânia | Faustino",
    description:
      "Audiência de custódia em Goiânia nas próximas horas? Preparação de documentos e atuação técnica para análise da prisão e das medidas cabíveis.",
    h1: "Advogado para Audiência de Custódia em Goiânia",
    accent: "Preparação técnica para uma decisão urgente",
    badge: "AUDIÊNCIA DE CUSTÓDIA · GOIÂNIA",
    lead:
      "A audiência de custódia ocorre pouco depois da prisão e exige preparação rápida. O objetivo não é julgar definitivamente a acusação, mas controlar a prisão e decidir quais medidas serão adotadas naquele momento.",
    quickAnswer:
      "O advogado organiza os dados do flagrante, conversa com a pessoa presa, reúne documentos relevantes e apresenta ao juízo os fundamentos relacionados à legalidade da prisão e à necessidade de cautelares. O resultado depende do caso e da decisão judicial.",
    notice:
      "Não espere a audiência começar para procurar documentos. Informe data, horário, nome da pessoa presa e número do processo, se já estiver disponível.",
    primaryKeyword: "advogado para audiência de custódia em Goiânia",
    secondaryKeywords: [
      "audiência de custódia Goiânia advogado",
      "documentos audiência de custódia",
      "liberdade na audiência de custódia",
      "prisão preventiva audiência de custódia",
      "advogado criminalista Goiânia",
    ],
    whatsappMessage:
      "Há uma audiência de custódia em Goiânia. Data e horário informados: ___. Nome da pessoa presa: ___.",
    situationsTitle: "O que precisa ser organizado antes da audiência",
    situationsIntro:
      "A preparação combina informações do flagrante, condições pessoais documentadas e análise dos riscos apontados no caso.",
    situations: [
      "Auto de prisão, número do processo ou consulta processual disponível",
      "Comprovante de residência atualizado",
      "Documentos de trabalho, estudo ou atividade lícita",
      "Informações sobre filhos, dependentes ou pessoas sob cuidado",
      "Laudos, receitas e medicamentos de uso contínuo",
      "Relato reservado de eventual violência ou necessidade médica",
    ],
    stepsTitle: "Preparação da audiência de custódia",
    steps: [
      {
        title: "Identificação do processo",
        text: "Localizam-se os registros do flagrante, a unidade responsável e os dados da audiência.",
      },
      {
        title: "Conversa reservada",
        text: "A defesa busca compreender a prisão e orientar a pessoa antes da apresentação ao juízo.",
      },
      {
        title: "Documentação útil",
        text: "Os documentos são selecionados conforme os pontos relevantes, evitando volume sem propósito.",
      },
      {
        title: "Manifestação técnica",
        text: "A defesa apresenta a medida juridicamente adequada e esclarece circunstâncias concretas ao juízo.",
      },
    ],
    sections: [
      {
        eyebrow: "FINALIDADE",
        title: "O que o juiz analisa na audiência de custódia",
        paragraphs: [
          "A audiência permite o contato rápido entre a pessoa presa e o sistema de justiça. Nela, o juízo controla a legalidade do flagrante, verifica as condições da prisão e avalia se existe fundamento para manter uma medida cautelar pessoal.",
          "Não se trata do julgamento final da acusação. A discussão probatória completa acontece em outro momento. Ainda assim, a decisão da custódia pode produzir efeitos imediatos sobre a liberdade e sobre as obrigações impostas ao investigado.",
        ],
        bullets: [
          "Legalidade da prisão em flagrante",
          "Existência de maus-tratos ou necessidade de atendimento",
          "Fundamentos para prisão preventiva ou medidas alternativas",
          "Condições pessoais relevantes para a decisão",
        ],
      },
      {
        eyebrow: "POSSÍVEIS DECISÕES",
        title: "Liberdade, cautelares ou prisão preventiva",
        paragraphs: [
          "Conforme os fatos e os requisitos legais, o flagrante pode ser relaxado, a liberdade provisória pode ser concedida com ou sem medidas cautelares, ou a prisão pode ser convertida em preventiva. A defesa precisa enfrentar os fundamentos concretos apresentados no processo.",
          "Medidas como comparecimento periódico, proibição de contato, restrição de lugares ou monitoração eletrônica não são automáticas. A adequação e a proporcionalidade de cada imposição também podem ser discutidas.",
        ],
      },
      {
        eyebrow: "DOCUMENTOS",
        title: "Quantidade não substitui relevância",
        paragraphs: [
          "Documentos pessoais ajudam quando dialogam com o ponto que será analisado. Um comprovante desatualizado, uma declaração genérica ou dezenas de arquivos sem organização podem dificultar a leitura em vez de ajudar.",
          "A defesa seleciona o material compatível com a tese, identifica o que ainda precisa ser confirmado e evita apresentar informações contraditórias ou documentos cuja origem não possa ser explicada.",
        ],
      },
    ],
    localTitle: "Audiência de custódia em Goiânia",
    localParagraphs: [
      "O atendimento é iniciado pelo plantão para localizar o processo e confirmar os dados disponíveis. A sede do escritório fica no Setor Marista, em Goiânia.",
      "Horário e forma de realização da audiência podem variar. A defesa confirma as informações no processo e nos canais oficiais, em vez de depender apenas de mensagens repassadas à família.",
    ],
    localPoints: [
      "Preparação antes da audiência",
      "Análise de documentos e cautelares",
      "Orientação à família sobre a decisão",
    ],
    faqs: [
      {
        question: "Quando ocorre a audiência de custódia?",
        answer:
          "A apresentação deve ocorrer sem demora após a prisão, observadas as regras legais e do CNJ. O horário concreto precisa ser confirmado no processo ou com a unidade responsável.",
      },
      {
        question: "A audiência decide se a pessoa é culpada?",
        answer:
          "Não. A audiência de custódia não substitui o processo criminal nem realiza o julgamento definitivo da acusação. Ela examina a prisão e as medidas imediatas.",
      },
      {
        question: "Quais documentos a família deve separar?",
        answer:
          "Em geral, identificação, residência, trabalho, estudo, dependentes e saúde. A defesa deve indicar quais documentos são realmente pertinentes ao caso.",
      },
      {
        question: "É possível sair livre da audiência?",
        answer:
          "É uma das possibilidades legais, assim como a aplicação de cautelares ou a decretação de preventiva. Não existe resultado automático ou garantido.",
      },
      {
        question: "O que acontece depois da decisão?",
        answer:
          "A defesa orienta sobre o cumprimento de cautelares, a expedição de alvará quando houver liberdade ou as medidas cabíveis se a prisão for mantida.",
      },
    ],
    relatedSlugs: [
      "advogado-flagrante-goiania",
      "pedido-liberdade-provisoria-goiania",
      "advogado-inquerito-policial-goiania",
    ],
    sources: [CPP, CNJ_CUSTODY],
    lastUpdated: "31 de agosto de 2026",
  },
  {
    slug: "pedido-liberdade-provisoria-goiania",
    kind: "urgent",
    city: "Goiânia",
    topic: "Liberdade provisória",
    seoTitle: "Pedido de Liberdade Provisória em Goiânia | Faustino",
    description:
      "Entenda quando cabe pedido de liberdade provisória em Goiânia, com ou sem fiança, quais documentos ajudam e como a defesa atua.",
    h1: "Pedido de Liberdade Provisória em Goiânia",
    accent: "Análise individual da prisão e das medidas cabíveis",
    badge: "LIBERDADE PROVISÓRIA · GOIÂNIA",
    lead:
      "Liberdade provisória não é um formulário genérico nem uma promessa de soltura. O pedido precisa responder aos fundamentos da prisão, apresentar circunstâncias verificáveis e indicar por que outra medida é suficiente no caso concreto.",
    quickAnswer:
      "A defesa examina a decisão, o flagrante e os requisitos legais para definir se cabe liberdade provisória, relaxamento, revogação de preventiva, habeas corpus ou outra providência. Cada medida tem pressupostos e momento próprios.",
    notice:
      "Desconfie de promessas de prazo ou resultado antes da leitura da decisão. O primeiro documento relevante costuma ser exatamente aquele que fundamentou a prisão.",
    primaryKeyword: "pedido de liberdade provisória em Goiânia",
    secondaryKeywords: [
      "advogado liberdade provisória Goiânia",
      "liberdade provisória com fiança",
      "liberdade provisória sem fiança",
      "revogação de prisão preventiva Goiânia",
      "medidas cautelares diversas da prisão",
    ],
    whatsappMessage:
      "Preciso avaliar pedido de liberdade provisória em Goiânia. A prisão ocorreu em: ___. Há audiência ou decisão: ___.",
    situationsTitle: "Informações necessárias para avaliar a medida",
    situationsIntro:
      "O pedido começa pela leitura dos fundamentos usados para restringir a liberdade e pela conferência da fase processual.",
    situations: [
      "Decisão que manteve ou decretou a prisão",
      "Auto de prisão e documentos da audiência de custódia",
      "Número do processo e órgão responsável",
      "Endereço, trabalho, estudo e vínculos familiares comprováveis",
      "Condições de saúde e responsabilidades de cuidado",
      "Medidas anteriores e histórico de comparecimento ao processo",
    ],
    stepsTitle: "Como o pedido é construído",
    steps: [
      {
        title: "Leitura da decisão",
        text: "A defesa identifica os fatos e requisitos utilizados para justificar a prisão.",
      },
      {
        title: "Escolha da medida",
        text: "Define-se o instrumento adequado à fase e ao tipo de prisão existente.",
      },
      {
        title: "Prova das circunstâncias",
        text: "Documentos pertinentes são organizados para sustentar os pontos apresentados.",
      },
      {
        title: "Protocolo e acompanhamento",
        text: "A medida é apresentada ao órgão competente e a família recebe orientação sobre a tramitação.",
      },
    ],
    sections: [
      {
        eyebrow: "MEDIDA ADEQUADA",
        title: "Liberdade provisória, relaxamento e revogação não são sinônimos",
        paragraphs: [
          "O relaxamento discute uma prisão ilegal. A liberdade provisória permite responder ao processo em liberdade, eventualmente com cautelares. A revogação enfrenta a permanência dos motivos de uma prisão preventiva. O habeas corpus, por sua vez, possui função própria de proteção da liberdade diante de ilegalidade ou abuso.",
          "A escolha errada pode desviar o foco do problema real. Por isso, a defesa precisa identificar o tipo de prisão, a decisão vigente e o órgão competente antes de elaborar a medida.",
        ],
      },
      {
        eyebrow: "FIANÇA E CAUTELARES",
        title: "A liberdade pode ter condições",
        paragraphs: [
          "Nem toda liberdade provisória exige fiança, e o pagamento de fiança não resolve automaticamente todas as situações. A lei também prevê medidas cautelares diversas da prisão, aplicáveis conforme necessidade e adequação.",
          "A defesa pode discutir a suficiência, a proporcionalidade e a forma de cumprimento dessas medidas. Se forem impostas, o cliente deve compreendê-las desde o início, porque o descumprimento pode gerar consequências processuais.",
        ],
        bullets: [
          "Comparecimento periódico",
          "Proibição de contato ou de acesso a lugares",
          "Restrições de deslocamento",
          "Monitoração eletrônica, quando determinada",
        ],
      },
      {
        eyebrow: "EXPECTATIVA RESPONSÁVEL",
        title: "Prazo e resultado dependem do processo",
        paragraphs: [
          "Não existe prazo único para todos os pedidos. Urgência, competência, plantão judiciário, necessidade de manifestação do Ministério Público e volume do órgão podem influenciar a tramitação.",
          "O papel da defesa é apresentar uma medida tecnicamente consistente, acompanhar o andamento e informar a família com clareza. Prometer decisão favorável ou horário exato de soltura antes do pronunciamento judicial não é responsável.",
        ],
      },
    ],
    localTitle: "Pedidos de liberdade em processos de Goiânia",
    localParagraphs: [
      "A equipe atende casos vinculados às unidades judiciais de Goiânia e confirma a competência a partir do número do processo e da decisão existente.",
      "O atendimento particular começa com o envio seguro dos documentos essenciais. Quando o processo está sob sigilo, o acesso depende da habilitação e das regras aplicáveis.",
    ],
    localPoints: [
      "Análise da decisão vigente",
      "Organização de documentos relevantes",
      "Acompanhamento e comunicação com a família",
    ],
    faqs: [
      {
        question: "Quem pode pedir liberdade provisória?",
        answer:
          "A possibilidade depende do tipo de prisão e das circunstâncias do processo. O pedido é apresentado pela defesa ao órgão competente, com fundamentos ligados ao caso concreto.",
      },
      {
        question: "Liberdade provisória sempre exige fiança?",
        answer:
          "Não. Há hipóteses com e sem fiança. Também podem ser impostas outras medidas cautelares. A situação precisa ser analisada individualmente.",
      },
      {
        question: "Quanto tempo o juiz leva para decidir?",
        answer:
          "Não existe prazo de resposta idêntico para todos os casos. A defesa acompanha a distribuição e os atos necessários, mas não pode garantir horário ou resultado.",
      },
      {
        question: "Quais documentos podem ajudar?",
        answer:
          "Documentos de residência, trabalho, estudo, dependentes e saúde podem ser pertinentes. Eles devem ser verdadeiros, atuais e relacionados aos fundamentos do pedido.",
      },
      {
        question: "Qual a diferença entre liberdade provisória e habeas corpus?",
        answer:
          "São instrumentos diferentes. O habeas corpus protege a liberdade diante de ilegalidade ou abuso, enquanto a liberdade provisória é tratada no contexto das medidas cautelares do processo penal.",
      },
    ],
    relatedSlugs: [
      "advogado-audiencia-de-custodia-goiania",
      "advogado-flagrante-goiania",
      "advogado-prisao-temporaria-goiania",
    ],
    sources: [CPP],
    lastUpdated: "31 de agosto de 2026",
  },
  {
    slug: "advogado-inquerito-policial-goiania",
    kind: "investigation",
    city: "Goiânia",
    topic: "Inquérito policial",
    seoTitle: "Advogado para Inquérito Policial em Goiânia | Faustino",
    description:
      "Investigado ou intimado em inquérito policial em Goiânia? Acompanhamento em delegacia, análise dos autos e orientação antes do depoimento.",
    h1: "Advogado para Inquérito Policial em Goiânia",
    accent: "Defesa desde a fase de investigação",
    badge: "INQUÉRITO POLICIAL · GOIÂNIA",
    lead:
      "A investigação é a fase em que documentos, depoimentos, perícias e dados digitais começam a formar a narrativa do caso. Procurar orientação antes de falar ou entregar material permite decisões mais conscientes e preserva direitos.",
    quickAnswer:
      "O advogado acompanha intimações e depoimentos, busca acesso aos elementos já documentados, orienta sobre direitos e avalia a necessidade de apresentar documentos, requerer diligências ou produzir investigação defensiva dentro da lei.",
    notice:
      "Receber uma intimação não revela, por si só, se a pessoa será ouvida como testemunha, vítima ou investigada. Essa posição deve ser confirmada antes do depoimento.",
    primaryKeyword: "advogado para inquérito policial em Goiânia",
    secondaryKeywords: [
      "advogado inquérito policial Goiânia",
      "intimação policial advogado",
      "advogado para depoimento Goiânia",
      "acompanhamento em delegacia Goiânia",
      "investigação defensiva Goiânia",
    ],
    whatsappMessage:
      "Recebi uma intimação ou sou investigado em inquérito policial em Goiânia. A data informada é: ___.",
    situationsTitle: "Sinais de que é hora de buscar orientação",
    situationsIntro:
      "A defesa pode começar antes de indiciamento, denúncia ou processo, inclusive quando as informações ainda são limitadas.",
    situations: [
      "Recebimento de intimação para comparecer à delegacia",
      "Contato de policial solicitando documentos ou acesso a aparelho",
      "Cumprimento de busca e apreensão",
      "Notícia de investigação por meio de terceiros",
      "Convocação para reconhecimento, acareação ou perícia",
      "Indiciamento ou relatório final já produzido",
    ],
    stepsTitle: "Atuação durante o inquérito",
    steps: [
      {
        title: "Confirmar a condição",
        text: "A defesa identifica o procedimento e verifica em que posição a pessoa será ouvida.",
      },
      {
        title: "Acessar o que está documentado",
        text: "São examinados os elementos já formalizados, respeitados os limites legais de diligências em andamento.",
      },
      {
        title: "Preparar o comparecimento",
        text: "O cliente recebe orientação sobre direitos, documentos e finalidade do ato.",
      },
      {
        title: "Definir postura defensiva",
        text: "A estratégia pode envolver manifestação, documentos, diligências, perícia ou preservação de elementos próprios.",
      },
    ],
    sections: [
      {
        eyebrow: "INTIMAÇÃO",
        title: "Não compareça sem entender por que foi chamado",
        paragraphs: [
          "A intimação costuma indicar unidade, data e procedimento, mas nem sempre esclarece todos os detalhes. Antes do comparecimento, o advogado pode buscar informações disponíveis e orientar sobre a posição jurídica da pessoa convocada.",
          "Testemunha e investigado possuem deveres e riscos diferentes. Se a condição mudar durante o ato, a defesa deve estar atenta para proteger os direitos correspondentes e evitar que a pessoa seja surpreendida por perguntas fora do contexto informado.",
        ],
      },
      {
        eyebrow: "ACESSO AOS AUTOS",
        title: "A defesa analisa o que já foi formalizado",
        paragraphs: [
          "O acesso aos elementos documentados permite compreender a linha da investigação, as datas, os depoimentos e os materiais já juntados. Diligências em andamento podem ter proteção específica para preservar sua eficácia.",
          "O objetivo não é apenas ler o boletim de ocorrência. É relacionar o que consta nos autos com documentos, comunicações e fatos que o cliente pode comprovar, identificando lacunas e riscos antes de uma manifestação.",
        ],
      },
      {
        eyebrow: "PROVA ESTRATÉGICA",
        title: "Preservar é diferente de produzir uma versão",
        paragraphs: [
          "Conversas, arquivos, registros de localização, notas, contratos e testemunhas podem ser relevantes. Eles devem ser preservados em sua forma original e obtidos por meios lícitos. Apagar conteúdo ou editar arquivos pode comprometer a credibilidade e a perícia.",
          "A investigação defensiva permite buscar elementos favoráveis dentro de regras profissionais e legais. A medida precisa ter finalidade clara, documentação de origem e respeito aos direitos de terceiros.",
        ],
        bullets: [
          "Preservar aparelhos e backups",
          "Registrar a origem de documentos",
          "Evitar contato orientado com testemunhas",
          "Consultar antes de entregar senhas ou dispositivos",
        ],
      },
    ],
    localTitle: "Acompanhamento de inquérito em Goiânia",
    localParagraphs: [
      "O escritório acompanha procedimentos em unidades da Polícia Civil e, conforme o caso, da Polícia Federal e de outros órgãos com atribuição investigativa em Goiânia.",
      "A unidade, a autoridade responsável e a condição da pessoa são confirmadas a partir da intimação ou do número do procedimento. A sede permanece no Setor Marista, sem confundir atendimento com vínculo institucional.",
    ],
    localPoints: [
      "Orientação antes de depoimento",
      "Acompanhamento em delegacia",
      "Análise dos elementos formalizados",
    ],
    faqs: [
      {
        question: "Preciso ir à delegacia com advogado?",
        answer:
          "A assistência jurídica é especialmente importante quando existe risco de investigação ou dúvida sobre a condição da pessoa. O advogado pode orientar e acompanhar o ato.",
      },
      {
        question: "O advogado pode acessar o inquérito?",
        answer:
          "A defesa pode acessar os elementos já documentados relevantes ao exercício defensivo. Diligências em curso podem ter restrições específicas para preservar sua eficácia.",
      },
      {
        question: "Posso entregar meu celular espontaneamente?",
        answer:
          "Antes de consentir com acesso, extração ou entrega, procure orientação sobre o pedido, sua extensão e a forma de documentação. Não apague nem altere o conteúdo.",
      },
      {
        question: "Um inquérito sempre termina em processo?",
        answer:
          "Não. A investigação pode resultar em arquivamento, outras providências ou oferecimento de denúncia, conforme a análise dos elementos e a atuação dos órgãos competentes.",
      },
      {
        question: "O que levar à primeira conversa?",
        answer:
          "Intimação, número do procedimento, documentos recebidos e uma linha do tempo objetiva. Outros materiais devem ser enviados apenas após orientação sobre relevância e segurança.",
      },
    ],
    relatedSlugs: [
      "advogado-prisao-temporaria-goiania",
      "advogado-crimes-sexuais-goiania",
      "advogado-flagrante-goiania",
    ],
    sources: [CPP],
    lastUpdated: "31 de agosto de 2026",
  },
  {
    slug: "advogado-prisao-temporaria-goiania",
    kind: "investigation",
    city: "Goiânia",
    topic: "Prisão temporária",
    seoTitle: "Advogado para Prisão Temporária em Goiânia | Faustino",
    description:
      "Mandado ou prisão temporária em Goiânia? Defesa criminal para analisar a decisão, os prazos e as medidas jurídicas adequadas ao caso.",
    h1: "Advogado para Prisão Temporária em Goiânia",
    accent: "Análise do mandado, fundamentos e prazo",
    badge: "PRISÃO TEMPORÁRIA · GOIÂNIA",
    lead:
      "A prisão temporária está ligada à investigação e depende de decisão judicial. Quando existe mandado ou cumprimento da medida, a defesa precisa localizar a decisão, conferir o prazo e examinar os fundamentos apresentados.",
    quickAnswer:
      "O advogado analisa o mandado e a decisão, verifica o enquadramento legal e acompanha a situação da pessoa presa. Conforme o caso, pode requerer revogação, apresentar habeas corpus ou adotar outra medida adequada, sem garantia prévia de resultado.",
    notice:
      "O prazo não deve ser calculado apenas por informações da internet. Confirme a data efetiva do cumprimento, a hipótese legal e o que consta no mandado.",
    primaryKeyword: "advogado para prisão temporária em Goiânia",
    secondaryKeywords: [
      "prisão temporária Goiânia advogado",
      "mandado de prisão temporária Goiânia",
      "revogação de prisão temporária",
      "prazo prisão temporária",
      "habeas corpus prisão temporária",
    ],
    whatsappMessage:
      "Há mandado ou prisão temporária em Goiânia. Nome da pessoa: ___. Data do cumprimento ou informação: ___.",
    situationsTitle: "Quando a análise precisa começar",
    situationsIntro:
      "A medida pode ser conhecida antes do cumprimento, durante uma operação ou quando a família recebe informação sobre a prisão.",
    situations: [
      "Mandado de prisão temporária foi apresentado ou informado",
      "A pessoa foi presa durante operação policial",
      "Houve busca e apreensão junto com a prisão",
      "A família desconhece o prazo ou o local de custódia",
      "Existe risco de prorrogação da medida",
      "A investigação envolve mais de uma pessoa ou procedimento sigiloso",
    ],
    stepsTitle: "O que a defesa verifica",
    steps: [
      {
        title: "Mandado e decisão",
        text: "Confere-se a autoridade, o processo, o prazo indicado e os fundamentos da medida.",
      },
      {
        title: "Hipótese legal",
        text: "A defesa compara a imputação e a necessidade alegada com os requisitos aplicáveis.",
      },
      {
        title: "Situação da custódia",
        text: "São verificados local, data do cumprimento, condições pessoais e atos investigativos relacionados.",
      },
      {
        title: "Medida defensiva",
        text: "Revogação, habeas corpus ou outra providência são avaliados conforme a decisão e o estágio do caso.",
      },
    ],
    sections: [
      {
        eyebrow: "DIFERENÇAS",
        title: "Temporária, preventiva e flagrante têm funções distintas",
        paragraphs: [
          "O flagrante decorre de uma situação prevista em lei e passa por controle judicial. A temporária é decretada por prazo determinado durante a investigação. A preventiva é uma medida cautelar que depende de fundamentos próprios e não possui o mesmo regime de prazo da temporária.",
          "Identificar corretamente a prisão evita pedidos genéricos. A decisão judicial, o mandado e a data de cumprimento são documentos centrais para saber qual medida está vigente e quando ela deve ser reavaliada.",
        ],
      },
      {
        eyebrow: "PRAZO",
        title: "O termo final depende do enquadramento e da decisão",
        paragraphs: [
          "A Lei nº 7.960/1989 disciplina a prisão temporária e outras leis podem estabelecer regime diferente para determinadas hipóteses. O mandado deve indicar o período da medida, e eventual prorrogação exige nova análise judicial.",
          "A defesa confere a data em que a prisão foi efetivamente cumprida, o tipo penal indicado e a existência de decisão de prorrogação. Essa conferência é mais segura do que aplicar um número genérico sem ler o processo.",
        ],
      },
      {
        eyebrow: "DURANTE A INVESTIGAÇÃO",
        title: "A prisão não elimina os direitos defensivos",
        paragraphs: [
          "A pessoa presa mantém direito a advogado, comunicação permitida, integridade física e atendimento de saúde. A defesa também acompanha os atos investigativos acessíveis e orienta sobre depoimento e preservação de elementos.",
          "A família deve evitar divulgar detalhes de operação, nomes de outras pessoas ou documentos do processo. Em procedimentos sigilosos, a circulação desnecessária de informações pode criar riscos adicionais.",
        ],
      },
    ],
    localTitle: "Atuação em prisão temporária em Goiânia",
    localParagraphs: [
      "O atendimento começa com a identificação do mandado, do processo e do local de custódia. A sede do escritório fica em Goiânia e o plantão recebe situações urgentes.",
      "Operações podem envolver unidades e competências diferentes. A defesa confirma essas informações nos documentos disponíveis antes de indicar o próximo passo.",
    ],
    localPoints: [
      "Conferência do mandado e do prazo",
      "Acompanhamento da investigação",
      "Avaliação de medida urgente",
    ],
    faqs: [
      {
        question: "Quem decreta a prisão temporária?",
        answer:
          "A prisão temporária depende de decisão judicial, a partir das hipóteses e requerimentos previstos em lei. A decisão precisa ser analisada no processo concreto.",
      },
      {
        question: "Qual é o prazo da prisão temporária?",
        answer:
          "O prazo varia conforme a hipótese legal e deve constar no mandado. A data do cumprimento e eventual prorrogação precisam ser conferidas pela defesa.",
      },
      {
        question: "A prisão temporária pode ser prorrogada?",
        answer:
          "A lei admite prorrogação em situações específicas, mediante decisão fundamentada. Não é uma extensão automática.",
      },
      {
        question: "Qual a diferença para a prisão preventiva?",
        answer:
          "A temporária é ligada à investigação e possui prazo legal. A preventiva é cautelar processual com requisitos próprios e exige controle contínuo de necessidade.",
      },
      {
        question: "O advogado pode pedir revogação?",
        answer:
          "Pode avaliar pedido de revogação, habeas corpus ou outra medida. A escolha depende do fundamento da decisão e dos elementos acessíveis.",
      },
    ],
    relatedSlugs: [
      "advogado-inquerito-policial-goiania",
      "pedido-liberdade-provisoria-goiania",
      "advogado-flagrante-goiania",
    ],
    sources: [TEMPORARY_PRISON, CPP],
    lastUpdated: "31 de agosto de 2026",
  },
  {
    slug: "advogado-criminalista-anapolis",
    kind: "local",
    city: "Anápolis",
    topic: "Defesa criminal",
    seoTitle: "Advogado Criminalista em Anápolis | Rodrigo Faustino",
    description:
      "Defesa criminal em Anápolis para flagrante, investigação, audiência e processo penal. Atendimento particular e direto com o advogado.",
    h1: "Advogado Criminalista em Anápolis",
    accent: "Defesa em cada fase do caso criminal",
    badge: "ATENDIMENTO CRIMINAL · ANÁPOLIS",
    lead:
      "Uma situação criminal pode começar com intimação, busca, flagrante, mandado ou citação. Identificar a fase correta permite agir com prioridade e evita tratar uma urgência como consulta comum.",
    quickAnswer:
      "Rodrigo Faustino atua na defesa de pessoas presas, investigadas ou acusadas e atende normalmente em Anápolis. A sede do escritório fica em Goiânia, a uma curta distância, com deslocamento para atos presenciais sempre que o caso exigir.",
    notice:
      "Se houver prisão, audiência próxima, mandado ou intimação com prazo, informe isso logo no primeiro contato. Assim, o advogado pode identificar a urgência e orientar você sobre o próximo passo.",
    primaryKeyword: "advogado criminalista em Anápolis",
    secondaryKeywords: [
      "advogado criminal Anápolis",
      "advogado penal Anápolis",
      "defesa criminal Anápolis",
      "advogado delegacia Anápolis",
      "advogado processo criminal Anápolis",
    ],
    whatsappMessage:
      "Preciso de defesa criminal em Anápolis. Minha situação é: prisão / investigação / intimação / processo.",
    situationsTitle: "Em qual fase está o seu caso?",
    situationsIntro:
      "A primeira conversa serve para classificar a urgência e identificar documentos mínimos antes de definir a atuação.",
    situations: [
      "Prisão em flagrante ou audiência de custódia",
      "Intimação para comparecer à delegacia",
      "Inquérito, busca e apreensão ou prisão temporária",
      "Citação em ação penal ou audiência de instrução",
      "Acusação envolvendo crime sexual, patrimonial, drogas ou violência",
      "Recurso ou medida relacionada à liberdade",
    ],
    stepsTitle: "Do primeiro contato à estratégia",
    steps: [
      {
        title: "Classificar a urgência",
        text: "Prisão, mandado e audiência próxima recebem triagem diferente de consulta programada.",
      },
      {
        title: "Identificar a fase",
        text: "Intimação, decisão, processo e documentos disponíveis ajudam a localizar o problema jurídico.",
      },
      {
        title: "Organizar o atendimento",
        text: "O advogado define com você se o momento exige reunião online, encontro presencial ou deslocamento em Anápolis.",
      },
      {
        title: "Formalizar a atuação",
        text: "Escopo da atuação e próximos passos são apresentados antes do início do trabalho contratado.",
      },
    ],
    sections: [
      {
        eyebrow: "FASE POLICIAL",
        title: "Defesa antes de existir processo",
        paragraphs: [
          "Muitos casos começam na delegacia. Intimações, apreensões e depoimentos podem produzir elementos usados posteriormente pelo Ministério Público. A presença da defesa permite compreender a finalidade do ato e orientar o cliente antes de decisões irreversíveis.",
          "O acompanhamento pode incluir análise do inquérito, preparação para depoimento, preservação de documentos e avaliação de medidas relacionadas à liberdade ou a bens apreendidos.",
        ],
      },
      {
        eyebrow: "AÇÃO PENAL",
        title: "Estratégia construída a partir dos autos",
        paragraphs: [
          "Após uma denúncia, a defesa precisa conhecer a acusação formal, os elementos que a sustentam, os prazos e os atos já designados. A resposta não deve ser genérica: cada prova e cada testemunha precisam ser relacionadas à tese defensiva possível.",
          "Audiências, perícias, memoriais e recursos exigem preparação compatível com o estágio do processo. O cliente também recebe orientação sobre comparecimento, cautelares e comunicação durante a tramitação.",
        ],
      },
      {
        eyebrow: "ATENDIMENTO PARTICULAR",
        title: "Escopo da atuação definido com transparência",
        paragraphs: [
          "A análise inicial identifica o serviço necessário. Depois, o cliente recebe uma proposta profissional com o escopo e a forma de atuação adequados à complexidade, à urgência e aos deslocamentos envolvidos.",
          "O escritório atua de forma particular. Quem não pode contratar defesa privada pode procurar a Defensoria Pública ou verificar a assistência disponível no processo.",
        ],
      },
    ],
    localTitle: "Defesa criminal em Anápolis com atendimento direto",
    localParagraphs: [
      "Se você está em Anápolis e precisa de um advogado criminalista, pode contar com atendimento direto de Rodrigo Faustino. Embora a sede do escritório fique em Goiânia, o advogado atende normalmente na cidade e se desloca para delegacias, fóruns, audiências e reuniões quando a presença física é necessária.",
      "O primeiro contato pode ser feito por telefone ou WhatsApp para entender a fase do caso e a urgência. A partir dessas informações, o atendimento é organizado de forma presencial ou online, para que você receba orientação clara e saiba quais providências podem ser adotadas.",
    ],
    localPoints: [
      "Atendimento regular de clientes em Anápolis",
      "Deslocamento para delegacias, fóruns e audiências",
      "Reuniões presenciais ou online conforme o momento do caso",
    ],
    faqs: [
      {
        question: "O escritório tem endereço em Anápolis?",
        answer:
          "A sede física do escritório fica no Setor Marista, em Goiânia, mas o advogado atende normalmente em Anápolis e realiza os deslocamentos necessários para reuniões e atos do caso.",
      },
      {
        question: "Há atendimento para flagrante em Anápolis?",
        answer:
          "Sim. Informe o nome da pessoa presa, o local, o horário aproximado e a unidade policial, se conhecida. Com esses dados, o advogado identifica a urgência e organiza o atendimento em Anápolis.",
      },
      {
        question: "É possível fazer reunião online?",
        answer:
          "Sim, quando a natureza do ato e a segurança das informações permitem. Atos em delegacia ou fórum podem exigir presença física.",
      },
      {
        question: "O escritório acompanha inquérito e processo?",
        answer:
          "A atuação pode abranger fase policial, ação penal e recursos, conforme o escopo contratado e a análise do caso.",
      },
      {
        question: "Como é definido o escopo da atuação?",
        answer:
          "Após identificar fase, urgência, volume documental e deslocamentos, é apresentada uma proposta profissional com os serviços incluídos e os limites da atuação.",
      },
    ],
    relatedSlugs: [
      "advogado-crimes-sexuais-anapolis",
      "advogado-inquerito-policial-goiania",
      "advogado-flagrante-goiania",
    ],
    sources: [CPP],
    lastUpdated: "31 de agosto de 2026",
  },
  {
    slug: "advogado-crimes-sexuais-aparecida-de-goiania",
    kind: "sensitive",
    city: "Aparecida de Goiânia",
    topic: "Defesa em crimes sexuais",
    seoTitle: "Advogado para Crimes Sexuais em Aparecida de Goiânia",
    description:
      "Defesa técnica e sigilosa para investigados ou acusados de crimes sexuais em Aparecida de Goiânia, desde a delegacia até o processo.",
    h1: "Advogado para Crimes Sexuais em Aparecida de Goiânia",
    accent: "Defesa de investigados e acusados com discrição",
    badge: "DEFESA CRIMINAL · APARECIDA DE GOIÂNIA",
    lead:
      "Acusações de natureza sexual exigem cuidado com depoimentos, comunicações e provas digitais. A defesa deve começar sem hostilidade, exposição pública ou tentativa de contato com pessoas envolvidas.",
    quickAnswer:
      "O atendimento é destinado à defesa de investigados ou acusados. O advogado acompanha intimações, analisa os elementos disponíveis, orienta sobre preservação de provas e atua na investigação ou no processo, com sigilo profissional.",
    notice:
      "Esta página não oferece representação de vítimas ou medidas protetivas. Nesses casos, procure a rede de atendimento, a autoridade competente ou profissional que atue na assistência à vítima.",
    primaryKeyword: "advogado para crimes sexuais em Aparecida de Goiânia",
    secondaryKeywords: [
      "defesa crime sexual Aparecida de Goiânia",
      "advogado acusação de estupro Aparecida",
      "defesa estupro de vulnerável Aparecida",
      "advogado importunação sexual Aparecida",
      "investigação crime sexual Aparecida",
    ],
    whatsappMessage:
      "Preciso de defesa em uma acusação de natureza sexual em Aparecida de Goiânia e busco atendimento sigiloso.",
    situationsTitle: "Quando procurar orientação defensiva",
    situationsIntro:
      "O contato pode ocorrer antes do depoimento, durante o inquérito, após medida cautelar ou quando já existe ação penal.",
    situations: [
      "Intimação para prestar esclarecimentos ou depoimento",
      "Notícia de boletim de ocorrência ou investigação",
      "Apreensão de telefone, computador ou mídias",
      "Acusação de estupro, vulnerável, importunação ou assédio",
      "Fatos relacionados a mensagens, imagens ou redes sociais",
      "Citação, audiência, medida cautelar ou prisão",
    ],
    stepsTitle: "Atendimento discreto e documentado",
    steps: [
      {
        title: "Contato reservado",
        text: "A primeira conversa identifica fase, cidade, urgência e documentos, sem exigir relato público ou exposição desnecessária.",
      },
      {
        title: "Preservação de elementos",
        text: "O cliente recebe orientação para não apagar, editar ou circular conversas e arquivos.",
      },
      {
        title: "Leitura do procedimento",
        text: "A defesa busca acesso ao que já foi documentado e organiza uma linha do tempo verificável.",
      },
      {
        title: "Estratégia por fase",
        text: "Depoimento, perícia, cautelares, resposta e audiência são tratados conforme o momento processual.",
      },
    ],
    sections: [
      {
        eyebrow: "ANTES DE FALAR",
        title: "Evite contato, postagem ou explicação improvisada",
        paragraphs: [
          "A tentativa de resolver a acusação diretamente pode ser interpretada de maneira diferente da intenção de quem envia a mensagem. Contatar a pessoa envolvida, familiares ou testemunhas pode gerar novos registros e, em alguns casos, violar medidas existentes.",
          "A orientação defensiva começa por compreender a intimação e o que já foi formalizado. O cliente deve manter comunicações originais e interromper exposições públicas sobre o caso.",
        ],
        bullets: [
          "Não procurar a pessoa que fez a acusação",
          "Não publicar indiretas ou justificativas",
          "Não apagar conversas, fotos ou históricos",
          "Não pedir que terceiros colham versões",
        ],
      },
      {
        eyebrow: "PROVAS",
        title: "Contexto, integridade e origem dos arquivos importam",
        paragraphs: [
          "Uma captura de tela isolada pode omitir datas, sequência e autoria. A defesa avalia como preservar o conteúdo, sua origem e o dispositivo, considerando a necessidade de perícia ou documentação técnica.",
          "Prova oral também exige cuidado. Divergências precisam ser examinadas dentro do conjunto, sem abordagem ofensiva ou estereótipos. O objetivo é construir defesa técnica com base no que pode ser demonstrado.",
        ],
      },
      {
        eyebrow: "FASES DO CASO",
        title: "Da delegacia ao processo criminal",
        paragraphs: [
          "Na investigação, a prioridade pode ser o acesso aos autos, a preparação para depoimento e a preservação de dados. Em ação penal, a defesa responde à acusação, acompanha produção de prova, participa de audiência e avalia recursos.",
          "Medidas cautelares ou prisão exigem frente urgente própria. A existência de sigilo judicial protege o acesso processual, mas não elimina os cuidados com mensagens, trabalho, família e exposição social.",
        ],
      },
    ],
    localTitle: "Atendimento em Aparecida de Goiânia",
    localParagraphs: [
      "A sede do escritório fica no Setor Marista, em Goiânia. O atendimento de casos em Aparecida de Goiânia é confirmado conforme a urgência, a unidade responsável e a necessidade de deslocamento.",
      "A proximidade metropolitana não autoriza indicar endereço inexistente em Aparecida. Reuniões e atos são planejados de forma transparente no primeiro contato.",
    ],
    localPoints: [
      "Sede oficial em Goiânia",
      "Atendimento de casos em Aparecida sob confirmação",
      "Contato direto e sigilo profissional",
    ],
    faqs: [
      {
        question: "Fui chamado para depor. Devo ir com advogado?",
        answer:
          "É recomendável compreender sua condição e receber orientação antes do ato. O advogado pode acompanhar o depoimento e proteger os direitos aplicáveis.",
      },
      {
        question: "Quais provas devo preservar?",
        answer:
          "Conversas completas, arquivos originais, aparelhos, e-mails, registros de localização e documentos relacionados podem ser relevantes. Não altere nem apague conteúdo.",
      },
      {
        question: "O processo corre em sigilo?",
        answer:
          "A legislação prevê segredo de justiça para processos dessa natureza. A extensão concreta e o acesso devem ser verificados no procedimento.",
      },
      {
        question: "O escritório atende vítimas?",
        answer:
          "Não nesta área. A atuação descrita é de defesa de pessoas investigadas ou acusadas. Vítimas devem buscar atendimento específico e os canais oficiais de proteção.",
      },
      {
        question: "Existe escritório físico em Aparecida de Goiânia?",
        answer:
          "Não. A sede oficial fica em Goiânia. O atendimento de casos em Aparecida é alinhado conforme disponibilidade e necessidade do ato.",
      },
    ],
    relatedSlugs: [
      "advogado-crimes-sexuais-goiania",
      "advogado-inquerito-policial-goiania",
      "advogado-audiencia-de-custodia-goiania",
    ],
    sources: [PENAL_CODE, CPP],
    lastUpdated: "31 de agosto de 2026",
  },
  {
    slug: "advogado-crimes-sexuais-anapolis",
    kind: "sensitive",
    city: "Anápolis",
    topic: "Defesa em crimes sexuais",
    seoTitle: "Advogado para Crimes Sexuais em Anápolis | Faustino",
    description:
      "Defesa criminal para investigados ou acusados de crimes sexuais em Anápolis, com análise de provas, orientação e atendimento sigiloso.",
    h1: "Advogado para Crimes Sexuais em Anápolis",
    accent: "Análise de provas desde a investigação",
    badge: "DEFESA CRIMINAL · ANÁPOLIS",
    lead:
      "Uma acusação pode envolver relatos, mensagens, arquivos, perícias e contextos anteriores. Organizar esses elementos com integridade é mais útil do que reagir com explicações precipitadas ou tentar influenciar pessoas envolvidas.",
    quickAnswer:
      "A defesa atende investigados ou acusados em Anápolis, acompanha depoimentos e analisa provas digitais, documentais, testemunhais e periciais. A sede fica em Goiânia, com atendimento e deslocamento para Anápolis sempre que o caso exigir.",
    notice:
      "Não apague mensagens ou formate aparelhos. Também não procure a pessoa envolvida para pedir retratação, explicação ou acordo sem orientação jurídica.",
    primaryKeyword: "advogado para crimes sexuais em Anápolis",
    secondaryKeywords: [
      "defesa crime sexual Anápolis",
      "advogado acusação de estupro Anápolis",
      "defesa estupro de vulnerável Anápolis",
      "advogado importunação sexual Anápolis",
      "investigação crime sexual Anápolis",
    ],
    whatsappMessage:
      "Preciso de defesa em uma acusação de natureza sexual em Anápolis. A fase atual é: investigação / intimação / processo / prisão.",
    situationsTitle: "O caso pode exigir atuação em várias frentes",
    situationsIntro:
      "A estratégia muda conforme a existência de intimação, apreensão, perícia, cautelar ou processo já instaurado.",
    situations: [
      "Depoimento ou interrogatório agendado",
      "Apreensão e extração de dados de aparelhos",
      "Investigação envolvendo criança ou adolescente",
      "Acusação de estupro, importunação, assédio ou conduta digital",
      "Medida de proibição de contato ou afastamento",
      "Prisão, audiência ou ação penal em andamento",
    ],
    stepsTitle: "Da informação dispersa à linha do tempo",
    steps: [
      {
        title: "Mapear os atos",
        text: "Datas, contatos, intimações e decisões são organizados em ordem verificável.",
      },
      {
        title: "Preservar dados",
        text: "Arquivos e aparelhos são mantidos íntegros para possível análise técnica.",
      },
      {
        title: "Examinar os autos",
        text: "A defesa confronta o relato formal com os elementos documentados disponíveis.",
      },
      {
        title: "Preparar cada ato",
        text: "Depoimento, perícia, audiência e petições recebem estratégia compatível com a fase.",
      },
    ],
    sections: [
      {
        eyebrow: "PROVA DIGITAL",
        title: "Captura de tela não conta a história inteira",
        paragraphs: [
          "Mensagens precisam ser avaliadas com sequência, data, participantes e origem. Arquivos encaminhados podem perder metadados, e recortes podem ocultar contexto. A defesa orienta a preservação antes de qualquer seleção ou edição.",
          "Quando necessário, podem ser avaliadas ata notarial, extração técnica, perícia ou assistência especializada. A escolha depende do que está em discussão e da forma como a acusação foi documentada.",
        ],
      },
      {
        eyebrow: "PROVA ORAL E PERICIAL",
        title: "Relatos e laudos precisam ser examinados no conjunto",
        paragraphs: [
          "O processo pode conter declarações prestadas em momentos diferentes, laudos médicos, exames e avaliações técnicas. A defesa identifica convergências, divergências e limites metodológicos sem desrespeitar as pessoas envolvidas.",
          "A atuação responsável evita conclusões automáticas. O valor de cada elemento depende de sua produção, do contraditório possível e da relação com os demais dados do caso.",
        ],
      },
      {
        eyebrow: "MEDIDAS E PROCESSO",
        title: "Cautelares exigem cumprimento e avaliação jurídica",
        paragraphs: [
          "Proibição de contato, afastamento e outras medidas devem ser lidas com atenção. Mesmo quando a defesa discorda, o cliente precisa cumprir a ordem enquanto ela estiver vigente e discutir eventual revisão pelos meios adequados.",
          "Se houver ação penal, a estratégia inclui resposta, provas, audiência e recursos cabíveis. O atendimento também considera impactos profissionais e familiares sem transformar reputação em promessa de resultado judicial.",
        ],
      },
    ],
    localTitle: "Atendimento reservado em Anápolis",
    localParagraphs: [
      "Quem está em Anápolis pode falar diretamente com o advogado em um atendimento reservado e sem exposição desnecessária. A sede do escritório fica em Goiânia, a uma curta distância, e o advogado atende normalmente na cidade, inclusive com deslocamento para atos presenciais.",
      "A primeira conversa pode ocorrer por telefone, videochamada ou presencialmente. Quando houver depoimento, perícia, audiência ou outro compromisso oficial, o atendimento é organizado de acordo com o local, o horário e a urgência do caso.",
    ],
    localPoints: [
      "Atendimento regular e reservado em Anápolis",
      "Deslocamento para atos presenciais quando necessário",
      "Atuação da investigação ao processo criminal",
    ],
    faqs: [
      {
        question: "Quando devo procurar defesa após saber da acusação?",
        answer:
          "O quanto antes, especialmente se houver intimação, apreensão, medida cautelar ou risco de prisão. Orientação precoce ajuda a preservar dados e preparar o próximo ato.",
      },
      {
        question: "Posso apagar conversas pessoais?",
        answer:
          "Não é recomendável apagar, editar ou selecionar conteúdo depois de saber da investigação. Preserve os arquivos e procure orientação sobre armazenamento e apresentação.",
      },
      {
        question: "Como o advogado analisa provas digitais?",
        answer:
          "A análise considera origem, integridade, sequência, datas e relação com os autos. Conforme o caso, pode haver apoio técnico ou perícia.",
      },
      {
        question: "O atendimento em Anápolis é presencial?",
        answer:
          "Sim. O advogado atende presencialmente em Anápolis quando o caso ou o ato exige essa presença. Reuniões de orientação também podem ser realizadas online, de acordo com a necessidade e a preferência do cliente.",
      },
      {
        question: "A defesa acompanha todas as fases?",
        answer:
          "O escopo pode incluir investigação, processo e recursos. A proposta esclarece quais fases e atos estão incluídos na contratação.",
      },
    ],
    relatedSlugs: [
      "advogado-criminalista-anapolis",
      "advogado-crimes-sexuais-goiania",
      "advogado-inquerito-policial-goiania",
    ],
    sources: [PENAL_CODE, CPP],
    lastUpdated: "31 de agosto de 2026",
  },
  {
    slug: "advogado-crimes-sexuais-goiania",
    kind: "sensitive",
    city: "Goiânia",
    topic: "Defesa em crimes sexuais",
    seoTitle: "Advogado para Crimes Sexuais em Goiânia | Faustino",
    description:
      "Defesa técnica e sigilosa em acusações de crimes sexuais em Goiânia, desde o inquérito e depoimento até o processo criminal.",
    h1: "Advogado para Crimes Sexuais em Goiânia",
    accent: "Defesa técnica desde o primeiro contato",
    badge: "DEFESA EM CRIMES SEXUAIS · GOIÂNIA",
    lead:
      "Casos envolvendo dignidade sexual combinam consequências jurídicas, familiares, profissionais e reputacionais. A resposta defensiva precisa ser técnica, discreta e baseada em elementos verificáveis, sem exposição pública ou ataques pessoais.",
    quickAnswer:
      "O escritório atua exclusivamente na defesa de investigados ou acusados. O trabalho pode começar na intimação, incluir análise de provas e depoimento, acompanhar medidas cautelares e seguir pela ação penal e recursos.",
    notice:
      "Não entre em contato com a pessoa envolvida, não publique versões e não apague dados. Se houver ordem de afastamento ou proibição de contato, cumpra integralmente até orientação jurídica sobre eventual revisão.",
    primaryKeyword: "advogado para crimes sexuais em Goiânia",
    secondaryKeywords: [
      "advogado crimes sexuais Goiânia",
      "advogado defesa estupro Goiânia",
      "defesa estupro de vulnerável Goiânia",
      "advogado importunação sexual Goiânia",
      "crimes sexuais digitais defesa Goiânia",
    ],
    whatsappMessage:
      "Preciso de defesa em uma acusação de natureza sexual em Goiânia e busco atendimento sigiloso. A fase atual é: ___.",
    situationsTitle: "Acusações e fases acompanhadas pela defesa",
    situationsIntro:
      "A classificação jurídica depende dos fatos e não deve ser presumida por mensagens, notícias ou nomes populares atribuídos ao caso.",
    situations: [
      "Estupro e estupro de vulnerável",
      "Importunação ou assédio sexual",
      "Condutas envolvendo imagens, mensagens ou ambiente digital",
      "Investigação, depoimento e perícias",
      "Medidas cautelares, mandado ou prisão",
      "Ação penal, audiência, sentença e recursos",
    ],
    stepsTitle: "Como a defesa é organizada",
    steps: [
      {
        title: "Definir a fase",
        text: "Intimação, inquérito, cautelar e processo exigem prioridades e documentos diferentes.",
      },
      {
        title: "Controlar a exposição",
        text: "O cliente é orientado a preservar sigilo, cumprir ordens e evitar novos contatos ou publicações.",
      },
      {
        title: "Analisar as provas",
        text: "Relatos, arquivos, laudos e cronologia são examinados em conjunto e com respeito à integridade.",
      },
      {
        title: "Executar a estratégia",
        text: "A defesa prepara depoimentos, petições, perícias, audiência e recursos conforme o caso.",
      },
    ],
    sections: [
      {
        eyebrow: "ESCOPO DA DEFESA",
        title: "Atuação para investigados e acusados",
        paragraphs: [
          "A página é direcionada a quem precisa de defesa criminal. Vítimas de violência sexual necessitam atendimento próprio, com rede de proteção, autoridade policial e assistência jurídica voltada aos seus direitos.",
          "Essa separação evita confusão no primeiro contato e permite tratar a defesa com a responsabilidade necessária. A presunção de inocência e o direito de defesa coexistem com o dever de não constranger ou expor a pessoa envolvida.",
        ],
      },
      {
        eyebrow: "ANÁLISE DE PROVAS",
        title: "Nenhum elemento deve ser lido isoladamente",
        paragraphs: [
          "Depoimentos, mensagens, dados de localização, imagens e laudos possuem contextos e limitações. A defesa examina quando foram produzidos, quem teve acesso, se houve preservação de integridade e como se relacionam entre si.",
          "Quando existe questão técnica, pode ser necessário apoio pericial. O objetivo não é criar prova artificial, mas compreender o material disponível e produzir elementos lícitos que permitam contraditório efetivo.",
        ],
        bullets: [
          "Linha do tempo do relacionamento e dos contatos",
          "Preservação de aparelhos e contas",
          "Origem e completude das conversas",
          "Laudos, prontuários e perícias documentadas",
        ],
      },
      {
        eyebrow: "SIGILO E POSTURA",
        title: "Discrição é parte da estratégia, não promessa de invisibilidade",
        paragraphs: [
          "O advogado está sujeito ao sigilo profissional, e processos dessa natureza possuem proteção legal de acesso. Ainda assim, o cliente precisa adotar cuidados próprios com trabalho, família, redes e armazenamento de documentos.",
          "Não é possível garantir que nenhuma informação circule fora dos autos. A atuação responsável reduz exposições desnecessárias, orienta a comunicação e reage pelos meios jurídicos adequados quando há divulgação indevida.",
        ],
      },
      {
        eyebrow: "URGÊNCIA",
        title: "Prisão e medidas cautelares exigem frente imediata",
        paragraphs: [
          "Se houver mandado, flagrante, audiência de custódia ou pedido de preventiva, a defesa da liberdade precisa ser tratada junto com a estratégia probatória. Uma medida não substitui a outra.",
          "Ordens de proibição de contato, afastamento ou restrição devem ser cumpridas enquanto vigentes. Eventual revisão é solicitada ao órgão competente, nunca por descumprimento informal.",
        ],
      },
    ],
    localTitle: "Defesa em crimes sexuais em Goiânia",
    localParagraphs: [
      "O escritório está localizado no Setor Marista, em Goiânia. O atendimento começa por canal reservado e pode seguir para reunião presencial conforme necessidade e segurança.",
      "Casos urgentes são triados pelo plantão. Para consultas programadas, a equipe solicita apenas os documentos essenciais e evita circulação desnecessária de conteúdo sensível.",
    ],
    localPoints: [
      "Sede no Setor Marista",
      "Atendimento direto com o advogado",
      "Comunicação reservada e particular",
    ],
    faqs: [
      {
        question: "Devo prestar depoimento sem orientação jurídica?",
        answer:
          "É recomendável compreender sua condição, os direitos aplicáveis e o contexto do procedimento antes de declarar. O advogado pode acompanhar o ato.",
      },
      {
        question: "Quais acusações o escritório acompanha?",
        answer:
          "A atuação pode envolver diferentes crimes contra a dignidade sexual e condutas digitais, sempre após análise dos fatos e da tipificação formal.",
      },
      {
        question: "Como preservar conversas e arquivos?",
        answer:
          "Mantenha o conteúdo original, os aparelhos e backups. Não edite, recorte ou apague. A forma de documentação será definida conforme a utilidade jurídica.",
      },
      {
        question: "O processo fica em segredo de justiça?",
        answer:
          "A legislação prevê segredo de justiça para processos dessa natureza. A defesa verifica a situação concreta e orienta sobre circulação segura de documentos.",
      },
      {
        question: "Há atendimento em caso de prisão?",
        answer:
          "Sim, situações de mandado, flagrante e audiência recebem triagem urgente pelo plantão, sujeita à confirmação de disponibilidade e localização.",
      },
      {
        question: "O escritório representa vítimas?",
        answer:
          "Não nesta área. A atuação é exclusiva na defesa criminal de investigados ou acusados. Vítimas devem buscar assistência e canais próprios de proteção.",
      },
    ],
    relatedSlugs: [
      "advogado-inquerito-policial-goiania",
      "advogado-crimes-sexuais-aparecida-de-goiania",
      "advogado-crimes-sexuais-anapolis",
    ],
    sources: [PENAL_CODE, CPP],
    lastUpdated: "31 de agosto de 2026",
  },
];

export const landingPagesBySlug = new Map(
  landingPages.map((page) => [page.slug, page])
);

export function getLandingPage(slug: string) {
  return landingPagesBySlug.get(slug);
}

export function landingPath(slug: string) {
  return `/${slug}`;
}
