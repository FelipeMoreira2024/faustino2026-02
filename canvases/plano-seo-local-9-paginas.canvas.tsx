import {
  Button,
  Callout,
  Card,
  CardBody,
  CardHeader,
  Code,
  CollapsibleSection,
  Divider,
  Grid,
  H1,
  H2,
  H3,
  Link,
  Pill,
  Row,
  Stack,
  Stat,
  Table,
  Text,
  useHostTheme,
  useState,
} from "cursor/canvas";

type View = "resumo" | "paginas" | "arquitetura" | "tecnico" | "publicacao";

type PagePlan = {
  id: number;
  short: string;
  cluster: string;
  url: string;
  primary: string;
  intent: string;
  title: string;
  description: string;
  h1: string;
  subheadline: string;
  keywords: string[];
  angle: string;
  sections: string[];
  faqs: string[];
  cta: string;
  message: string;
  links: string[];
  localProof: string;
};

const BASE = "https://adv.rodrigofaustinoadvocacia.com.br";

const pages: PagePlan[] = [
  {
    id: 1,
    short: "Flagrante · Goiânia",
    cluster: "Urgência e liberdade",
    url: "/advogado-flagrante-goiania/",
    primary: "advogado para flagrante em Goiânia",
    intent: "Urgência máxima: familiar ou pessoa presa procura orientação e presença na delegacia.",
    title: "Advogado para Flagrante em Goiânia 24h | Faustino",
    description:
      "Prisão em flagrante em Goiânia? Atendimento criminal 24h na delegacia, orientação à família e atuação na audiência de custódia. Fale com o advogado.",
    h1: "Advogado para Flagrante em Goiânia",
    subheadline:
      "Atuação imediata na delegacia, orientação à família e preparação da defesa para as próximas etapas, com atendimento direto e sigiloso.",
    keywords: [
      "advogado flagrante Goiânia",
      "prisão em flagrante Goiânia",
      "advogado criminalista 24h Goiânia",
      "advogado na delegacia Goiânia",
      "familiar preso em Goiânia",
      "defesa em flagrante",
    ],
    angle:
      "Página operacional: responder o que fazer agora, quais informações reunir e o que acontece entre a delegacia e a audiência de custódia.",
    sections: [
      "Resposta imediata: o que fazer nas primeiras horas",
      "Como o advogado atua na delegacia e analisa a legalidade do flagrante",
      "Informações que a família deve reunir sem expor detalhes sensíveis",
      "O que pode acontecer após a lavratura do flagrante",
      "Relação entre flagrante, fiança, audiência de custódia e prisão preventiva",
      "Atendimento real em Goiânia: logística e abrangência confirmadas",
      "Experiência e credenciais do advogado, somente com provas verificáveis",
      "Perguntas frequentes e CTA final de urgência",
    ],
    faqs: [
      "O que fazer quando um familiar é preso em flagrante em Goiânia?",
      "A pessoa deve prestar depoimento antes da chegada do advogado?",
      "Em quanto tempo ocorre a audiência de custódia?",
      "O advogado pode pedir liberdade ainda na delegacia?",
      "Quais dados devo enviar no primeiro contato?",
    ],
    cta: "Falar com o plantão criminal",
    message:
      "URGENTE: houve uma prisão em flagrante em Goiânia. Nome do preso: ___. Local informado: ___.",
    links: [
      "/advogado-audiencia-de-custodia-goiania/",
      "/pedido-liberdade-provisoria-goiania/",
      "/advogado-prisao-temporaria-goiania/",
    ],
    localProof:
      "Confirmar atendimento 24h, tempo e forma de deslocamento e quais unidades podem ser citadas. Não inventar tempo de chegada nem presença física permanente.",
  },
  {
    id: 2,
    short: "Custódia · Goiânia",
    cluster: "Urgência e liberdade",
    url: "/advogado-audiencia-de-custodia-goiania/",
    primary: "advogado para audiência de custódia em Goiânia",
    intent: "Urgência com horário próximo: família quer entender a audiência e preparar a defesa.",
    title: "Advogado para Audiência de Custódia em Goiânia | Faustino",
    description:
      "Audiência de custódia em Goiânia nas próximas horas? Preparação dos documentos e atuação técnica para análise da prisão e das medidas cabíveis.",
    h1: "Advogado para Audiência de Custódia em Goiânia",
    subheadline:
      "Preparação técnica para a audiência, organização de documentos e defesa das medidas juridicamente cabíveis no caso concreto.",
    keywords: [
      "audiência de custódia Goiânia advogado",
      "advogado audiência de custódia",
      "documentos audiência de custódia",
      "prisão preventiva audiência de custódia",
      "liberdade na audiência de custódia",
      "advogado criminalista Goiânia 24h",
    ],
    angle:
      "Página de preparação: explicar o que o juiz analisa, os possíveis encaminhamentos e os documentos úteis, sem prometer soltura.",
    sections: [
      "Resposta direta: finalidade da audiência de custódia",
      "O que será analisado e o que não é julgamento do mérito",
      "Possíveis decisões: relaxamento, liberdade, cautelares ou preventiva",
      "Checklist de documentos pessoais, familiares, profissionais e de saúde",
      "Como a defesa se prepara antes da audiência",
      "O que acontece depois da audiência",
      "Atuação em Goiânia e credenciais verificadas",
      "Perguntas frequentes e CTA com data e horário",
    ],
    faqs: [
      "Quando a audiência de custódia costuma acontecer?",
      "O que o juiz avalia nessa audiência?",
      "Quais documentos a família deve separar?",
      "A família pode acompanhar a audiência?",
      "A contratação de advogado garante liberdade?",
    ],
    cta: "Preparar a defesa para a audiência",
    message:
      "Há uma audiência de custódia em Goiânia. Data e horário informados: ___. Nome da pessoa presa: ___.",
    links: [
      "/advogado-flagrante-goiania/",
      "/pedido-liberdade-provisoria-goiania/",
      "/",
    ],
    localProof:
      "Validar a rotina local e qualquer referência a fórum, central ou unidade com fonte oficial e revisão do advogado.",
  },
  {
    id: 3,
    short: "Liberdade provisória · Goiânia",
    cluster: "Urgência e liberdade",
    url: "/pedido-liberdade-provisoria-goiania/",
    primary: "pedido de liberdade provisória em Goiânia",
    intent: "Comercial e informacional: usuário procura medida jurídica após prisão ou decisão cautelar.",
    title: "Pedido de Liberdade Provisória em Goiânia | Faustino",
    description:
      "Entenda quando cabe pedido de liberdade provisória em Goiânia, com ou sem fiança, quais documentos ajudam e como a defesa atua no caso concreto.",
    h1: "Pedido de Liberdade Provisória em Goiânia",
    subheadline:
      "Análise individual da prisão, dos requisitos legais e dos documentos necessários para apresentar a medida adequada ao caso.",
    keywords: [
      "advogado liberdade provisória Goiânia",
      "pedido de soltura Goiânia",
      "liberdade provisória com fiança",
      "liberdade provisória sem fiança",
      "medidas cautelares diversas da prisão",
      "revogação de prisão preventiva Goiânia",
    ],
    angle:
      "Página de decisão: diferenciar liberdade provisória, relaxamento, revogação e habeas corpus; mostrar que a medida depende do caso.",
    sections: [
      "Quando a liberdade provisória pode ser analisada",
      "Diferença entre liberdade provisória, relaxamento, revogação e habeas corpus",
      "Com fiança, sem fiança e medidas cautelares",
      "Documentos e circunstâncias que a defesa precisa avaliar",
      "Etapas do pedido e acompanhamento da decisão",
      "O que não pode ser prometido antes da análise dos autos",
      "Atuação em Goiânia e autoridade profissional",
      "Perguntas frequentes e CTA de avaliação",
    ],
    faqs: [
      "Quem pode pedir liberdade provisória?",
      "Liberdade provisória sempre exige fiança?",
      "Quanto tempo leva para o juiz analisar o pedido?",
      "Quais documentos podem ser relevantes?",
      "Qual a diferença entre liberdade provisória e habeas corpus?",
    ],
    cta: "Solicitar análise do caso",
    message:
      "Preciso avaliar pedido de liberdade provisória em Goiânia. A prisão ocorreu em: ___. Há audiência ou decisão marcada? ___.",
    links: [
      "/advogado-flagrante-goiania/",
      "/advogado-audiencia-de-custodia-goiania/",
      "/advogado-prisao-temporaria-goiania/",
    ],
    localProof:
      "Usar apenas prazos e procedimentos revisados na data de publicação; não associar a página a uma unidade local sem confirmar a competência.",
  },
  {
    id: 4,
    short: "Inquérito · Goiânia",
    cluster: "Investigação criminal",
    url: "/advogado-inquerito-policial-goiania/",
    primary: "advogado para inquérito policial em Goiânia",
    intent: "Preventiva: investigado ou intimado busca orientação antes de depor ou depois de descobrir o inquérito.",
    title: "Advogado para Inquérito Policial em Goiânia | Faustino",
    description:
      "Investigado ou intimado em inquérito policial em Goiânia? Acompanhamento em delegacia, análise dos autos e orientação antes do depoimento.",
    h1: "Advogado para Inquérito Policial em Goiânia",
    subheadline:
      "Acompanhamento desde a intimação, análise do que já foi produzido e orientação técnica antes de qualquer declaração.",
    keywords: [
      "advogado inquérito policial Goiânia",
      "acompanhamento em delegacia Goiânia",
      "intimação policial advogado",
      "advogado para depoimento Goiânia",
      "investigado em inquérito policial",
      "investigação defensiva Goiânia",
    ],
    angle:
      "Página preventiva e educativa: reduzir decisões precipitadas, explicar acesso aos autos, depoimento, produção de elementos e possíveis desfechos.",
    sections: [
      "Recebi uma intimação: primeiros cuidados",
      "O que é o inquérito e qual o papel do advogado",
      "Acesso aos autos e limites de diligências em andamento",
      "Preparação para depoimento ou interrogatório",
      "Preservação de documentos, conversas e outras evidências",
      "Investigação defensiva e pedidos juridicamente cabíveis",
      "Possíveis desfechos e passagem para a ação penal",
      "Atuação em Goiânia, FAQ e CTA preventivo",
    ],
    faqs: [
      "Preciso comparecer à delegacia com advogado?",
      "O advogado pode acessar o inquérito?",
      "Testemunha e investigado têm a mesma posição?",
      "O que devo levar para a primeira análise?",
      "Um inquérito pode terminar sem denúncia?",
    ],
    cta: "Falar antes do depoimento",
    message:
      "Recebi uma intimação ou sou investigado em inquérito policial em Goiânia. A data informada é: ___.",
    links: [
      "/advogado-prisao-temporaria-goiania/",
      "/advogado-crimes-sexuais-goiania/",
      "/",
    ],
    localProof:
      "Citar Polícia Civil, Polícia Federal ou unidade específica apenas quando isso corresponder ao caso e a informação pública estiver confirmada.",
  },
  {
    id: 5,
    short: "Prisão temporária · Goiânia",
    cluster: "Urgência e liberdade",
    url: "/advogado-prisao-temporaria-goiania/",
    primary: "advogado para prisão temporária em Goiânia",
    intent: "Urgência por mandado, cumprimento de prisão ou familiar detido durante investigação.",
    title: "Advogado para Prisão Temporária em Goiânia | Faustino",
    description:
      "Mandado ou prisão temporária em Goiânia? Defesa criminal para analisar a decisão, os prazos e as medidas jurídicas adequadas ao caso.",
    h1: "Advogado para Prisão Temporária em Goiânia",
    subheadline:
      "Análise imediata da decisão, dos fundamentos, do prazo e das medidas defensivas possíveis durante a investigação.",
    keywords: [
      "prisão temporária Goiânia advogado",
      "mandado de prisão temporária Goiânia",
      "revogação de prisão temporária",
      "prazo prisão temporária",
      "habeas corpus prisão temporária",
      "advogado criminalista urgente Goiânia",
    ],
    angle:
      "Página de diagnóstico: diferenciar prisão temporária de flagrante e preventiva e orientar a família sobre documentos e prazos.",
    sections: [
      "O que caracteriza a prisão temporária",
      "Diferenças entre temporária, preventiva e flagrante",
      "Fundamentos, crimes abrangidos e prazos: revisão jurídica obrigatória",
      "Como a defesa obtém e analisa a decisão",
      "Medidas possíveis conforme o caso, sem promessa de soltura",
      "O que a família deve reunir e evitar divulgar",
      "Atuação urgente em Goiânia e credenciais",
      "Perguntas frequentes e CTA específico",
    ],
    faqs: [
      "Quem pode decretar prisão temporária?",
      "Qual é o prazo da prisão temporária?",
      "Ela pode ser prorrogada?",
      "Qual a diferença para prisão preventiva?",
      "O advogado pode pedir revogação ou impetrar habeas corpus?",
    ],
    cta: "Analisar a prisão temporária",
    message:
      "Há mandado ou prisão temporária em Goiânia. Nome da pessoa: ___. Data do cumprimento ou informação: ___.",
    links: [
      "/advogado-inquerito-policial-goiania/",
      "/pedido-liberdade-provisoria-goiania/",
      "/advogado-flagrante-goiania/",
    ],
    localProof:
      "Prazos variam conforme a hipótese legal. O texto final precisa ser conferido em legislação atualizada e revisado pelo advogado.",
  },
  {
    id: 6,
    short: "Criminalista · Anápolis",
    cluster: "Página local ampla",
    url: "/advogado-criminalista-anapolis/",
    primary: "advogado criminalista em Anápolis",
    intent: "Busca comercial ampla por defesa criminal local, urgente ou programada.",
    title: "Advogado Criminalista em Anápolis | Rodrigo Faustino",
    description:
      "Defesa criminal em Anápolis para flagrante, investigação, audiência e processo penal. Atendimento particular, direto com o advogado e sob sigilo profissional.",
    h1: "Advogado Criminalista em Anápolis",
    subheadline:
      "Defesa criminal para prisões, investigações, intimações e processos em Anápolis, com atendimento direto e estratégia definida para cada fase.",
    keywords: [
      "advogado criminal Anápolis",
      "advogado penal Anápolis",
      "defesa criminal Anápolis",
      "advogado 24h Anápolis",
      "advogado delegacia Anápolis",
      "advogado processo criminal Anápolis",
    ],
    angle:
      "Página local abrangente: deve provar atendimento real em Anápolis e organizar a oferta por fase, sem copiar a home de Goiânia.",
    sections: [
      "Em que situações a defesa criminal pode começar",
      "Mapa por fase: delegacia, inquérito, audiência, processo e recurso",
      "Atendimentos urgentes e atendimentos com horário marcado",
      "Como funciona o atendimento em Anápolis, com logística verdadeira",
      "Áreas de atuação descritas sempre na perspectiva da defesa",
      "Documentos para uma primeira análise responsável",
      "Rodrigo Faustino: credenciais e experiência comprováveis",
      "Perguntas frequentes, atendimento regional e CTA",
    ],
    faqs: [
      "O atendimento em Anápolis é presencial ou também online?",
      "Há atendimento para prisão em flagrante?",
      "O escritório acompanha depoimento e inquérito?",
      "Como são definidos os honorários?",
      "Quais informações devo enviar no primeiro contato?",
    ],
    cta: "Falar sobre um caso em Anápolis",
    message:
      "Preciso de defesa criminal em Anápolis. Minha situação é: prisão / investigação / intimação / processo.",
    links: [
      "/advogado-crimes-sexuais-anapolis/",
      "/",
    ],
    localProof:
      "Se não há endereço físico em Anápolis, escrever 'atendimento em Anápolis', nunca 'escritório em Anápolis'. Exigir provas de atuação e logística antes de publicar.",
  },
  {
    id: 7,
    short: "Crimes sexuais · Aparecida",
    cluster: "Defesa em crimes sexuais",
    url: "/advogado-crimes-sexuais-aparecida-de-goiania/",
    primary: "advogado para crimes sexuais em Aparecida de Goiânia",
    intent: "Investigado, acusado ou familiar procura defesa discreta e especializada na cidade.",
    title: "Advogado para Crimes Sexuais em Aparecida de Goiânia",
    description:
      "Defesa técnica e sigilosa para investigados ou acusados de crimes sexuais em Aparecida de Goiânia, desde a delegacia até o processo criminal.",
    h1: "Advogado para Crimes Sexuais em Aparecida de Goiânia",
    subheadline:
      "Defesa técnica para investigados ou acusados, com cuidado na preservação de provas, orientação antes do depoimento e sigilo profissional.",
    keywords: [
      "advogado defesa crime sexual Aparecida de Goiânia",
      "advogado acusação de estupro Aparecida",
      "defesa estupro de vulnerável Aparecida",
      "advogado importunação sexual Aparecida",
      "investigação crime sexual Aparecida de Goiânia",
      "defesa criminal sigilosa Aparecida",
    ],
    angle:
      "Página local para a região metropolitana, com filtro explícito para defesa de investigados ou acusados e prova real de cobertura local.",
    sections: [
      "Para quem é esta página: defesa de investigados e acusados",
      "Primeiros cuidados antes de depoimento ou contato com terceiros",
      "Acusações abrangidas, sem sensacionalismo ou prejulgamento",
      "Preservação lícita de conversas, arquivos, localização e testemunhas",
      "Atuação no inquérito, no processo e em situações de prisão",
      "Sigilo profissional, comunicação e proteção da privacidade",
      "Como funciona o atendimento em Aparecida de Goiânia",
      "Autoridade, perguntas frequentes e CTA discreto",
    ],
    faqs: [
      "Fui chamado para depor: devo ir com advogado?",
      "Quais provas devo preservar?",
      "O processo corre em sigilo?",
      "A página atende vítimas ou apenas defesa criminal?",
      "Como funciona o atendimento em Aparecida de Goiânia?",
    ],
    cta: "Falar com discrição sobre a acusação",
    message:
      "Preciso de defesa em uma acusação de natureza sexual em Aparecida de Goiânia e busco atendimento sigiloso.",
    links: [
      "/advogado-inquerito-policial-goiania/",
      "/advogado-crimes-sexuais-goiania/",
      "/",
    ],
    localProof:
      "Só publicar se houver atendimento real na cidade e ao menos três elementos locais verificáveis. Não usar o endereço de Goiânia como se fosse de Aparecida.",
  },
  {
    id: 8,
    short: "Crimes sexuais · Anápolis",
    cluster: "Defesa em crimes sexuais",
    url: "/advogado-crimes-sexuais-anapolis/",
    primary: "advogado para crimes sexuais em Anápolis",
    intent: "Investigado, acusado ou familiar procura defesa técnica em investigação ou processo em Anápolis.",
    title: "Advogado para Crimes Sexuais em Anápolis | Faustino",
    description:
      "Defesa criminal para investigados ou acusados de crimes sexuais em Anápolis, com análise de provas, orientação antes do depoimento e atendimento sigiloso.",
    h1: "Advogado para Crimes Sexuais em Anápolis",
    subheadline:
      "Atuação desde a investigação, com análise cuidadosa de provas digitais, testemunhais e periciais e orientação técnica em cada fase.",
    keywords: [
      "advogado defesa crime sexual Anápolis",
      "advogado acusação de estupro Anápolis",
      "defesa estupro de vulnerável Anápolis",
      "advogado importunação sexual Anápolis",
      "investigação crime sexual Anápolis",
      "defesa criminal sigilosa Anápolis",
    ],
    angle:
      "Página focada no percurso investigação-processo e na análise de provas. A diferenciação local precisa vir de fatos reais, não de troca de cidade.",
    sections: [
      "Recebi intimação ou descobri uma investigação em Anápolis",
      "Tipos de acusação e por que a tipificação exige análise individual",
      "Provas digitais, testemunhais e periciais: preservação e leitura técnica",
      "Preparação para depoimento e acompanhamento em delegacia",
      "Da investigação à ação penal: marcos que o cliente precisa entender",
      "Situações urgentes envolvendo prisão ou medidas cautelares",
      "Atendimento real em Anápolis e credenciais do advogado",
      "Perguntas frequentes e CTA específico",
    ],
    faqs: [
      "Quando procurar defesa após uma acusação?",
      "Posso apagar conversas ou arquivos pessoais?",
      "Como o advogado analisa provas digitais?",
      "O atendimento em Anápolis é presencial?",
      "A defesa pode acompanhar todas as fases?",
    ],
    cta: "Solicitar análise sigilosa em Anápolis",
    message:
      "Preciso de defesa em uma acusação de natureza sexual em Anápolis. A fase atual é: investigação / intimação / processo / prisão.",
    links: [
      "/advogado-criminalista-anapolis/",
      "/advogado-crimes-sexuais-goiania/",
      "/advogado-inquerito-policial-goiania/",
    ],
    localProof:
      "Exigir comprovação de cobertura de Anápolis. Se não houver material local suficiente, consolidar em uma página regional em vez de publicar conteúdo-clone.",
  },
  {
    id: 9,
    short: "Crimes sexuais · Goiânia",
    cluster: "Defesa em crimes sexuais",
    url: "/advogado-crimes-sexuais-goiania/",
    primary: "advogado para crimes sexuais em Goiânia",
    intent: "Busca principal do cluster por defesa técnica, sigilosa e local em Goiânia.",
    title: "Advogado para Crimes Sexuais em Goiânia | Faustino",
    description:
      "Defesa técnica e sigilosa em acusações de crimes sexuais em Goiânia, desde o inquérito e depoimento até o processo criminal e recursos.",
    h1: "Advogado para Crimes Sexuais em Goiânia",
    subheadline:
      "Defesa de investigados e acusados desde o primeiro contato, com análise responsável das provas, orientação técnica e sigilo profissional.",
    keywords: [
      "advogado crimes sexuais Goiânia",
      "advogado defesa estupro Goiânia",
      "defesa estupro de vulnerável Goiânia",
      "advogado importunação sexual Goiânia",
      "advogado assédio sexual Goiânia",
      "crimes sexuais digitais defesa Goiânia",
    ],
    angle:
      "Página-pilar do tema: a mais completa do cluster, com linguagem sóbria, fontes jurídicas, filtros de público e links às páginas locais.",
    sections: [
      "Defesa de investigados e acusados: escopo claro já no primeiro bloco",
      "O que fazer antes de falar, publicar ou contatar pessoas envolvidas",
      "Estupro, vulnerável, importunação, assédio e condutas digitais",
      "Como analisar prova oral, digital, documental e pericial",
      "Inquérito, depoimento, medidas cautelares, processo e recursos",
      "Privacidade, sigilo profissional e comunicação responsável",
      "Experiência verificável do advogado e atendimento em Goiânia",
      "Perguntas frequentes, atendimento regional e CTA sigiloso",
    ],
    faqs: [
      "Devo prestar depoimento sem orientação jurídica?",
      "Quais tipos de acusação a defesa acompanha?",
      "Como preservar conversas e arquivos sem alterar provas?",
      "Todos os processos dessa natureza correm em sigilo?",
      "Há atendimento para situações de prisão?",
      "O escritório atende vítimas ou apenas investigados e acusados?",
    ],
    cta: "Falar com o advogado sob sigilo profissional",
    message:
      "Preciso de defesa em uma acusação de natureza sexual em Goiânia e busco atendimento sigiloso. A fase atual é: ___.",
    links: [
      "/advogado-inquerito-policial-goiania/",
      "/advogado-crimes-sexuais-aparecida-de-goiania/",
      "/advogado-crimes-sexuais-anapolis/",
    ],
    localProof:
      "Usar o endereço real do Setor Marista apenas nesta entidade/localização de Goiânia; validar credenciais, números e avaliações antes da publicação.",
  },
];

const keywordRows = pages.map((page) => [
  String(page.id),
  page.primary,
  page.url,
  page.cluster,
]);

const tabs: Array<{ id: View; label: string }> = [
  { id: "resumo", label: "Visão geral" },
  { id: "paginas", label: "9 páginas" },
  { id: "arquitetura", label: "Arquitetura" },
  { id: "tecnico", label: "SEO técnico" },
  { id: "publicacao", label: "Publicação e métricas" },
];

function BulletList({ items }: { items: string[] }) {
  const theme = useHostTheme();
  return (
    <Stack gap={8}>
      {items.map((item) => (
        <Row key={item} gap={8} align="start">
          <span style={{ color: theme.accent.primary, lineHeight: "20px" }}>—</span>
          <Text style={{ margin: 0 }}>{item}</Text>
        </Row>
      ))}
    </Stack>
  );
}

function SummaryView() {
  const theme = useHostTheme();
  return (
    <Stack gap={24}>
      <Grid columns="minmax(0, 1.6fr) minmax(240px, 0.7fr)" gap={20} align="start">
        <Stack gap={12}>
          <H2>Decisão central</H2>
          <Text>
            A home atual deve continuar dona da busca ampla “advogado criminalista em Goiânia”. As nove novas páginas recebem uma intenção própria e não podem ser variações automáticas de cidade ou palavra-chave.
          </Text>
          <Callout tone="warning" title="Risco a evitar">
            Páginas substancialmente iguais, criadas só para consultas ou cidades diferentes e levando ao mesmo destino, podem ser interpretadas como doorway pages. As páginas de Aparecida e Anápolis só passam para publicação com prova local e conteúdo realmente específico.
          </Callout>
        </Stack>
        <Stack gap={16} style={{ borderLeft: "1px solid " + theme.stroke.tertiary, paddingLeft: 20 }}>
          <Stat value="9" label="novas páginas de intenção" />
          <Stat value="3" label="clusters editoriais" />
          <Stat value="1" label="domínio canônico único" />
        </Stack>
      </Grid>

      <Divider />

      <H2>Diagnóstico do projeto atual</H2>
      <Grid columns="repeat(auto-fit, minmax(220px, 1fr))" gap={12}>
        <Card>
          <CardHeader>Base aproveitável</CardHeader>
          <CardBody>
            <BulletList
              items={[
                "Next.js 15 com App Router",
                "Landing page responsiva e componentizada",
                "robots.ts, sitemap.ts e metadata existentes",
                "JSON-LD de LegalService, Attorney, Person e FAQ",
                "GTM e CTAs de WhatsApp já integrados",
              ]}
            />
          </CardBody>
        </Card>
        <Card>
          <CardHeader>Correção obrigatória</CardHeader>
          <CardBody>
            <Text>
              O repositório usa <Code>goiania.rodrigofaustinoadvocacia.com.br</Code> em metadata, sitemap, robots e JSON-LD, enquanto o destino informado é <Code>adv.rodrigofaustinoadvocacia.com.br</Code>.
            </Text>
          </CardBody>
        </Card>
        <Card>
          <CardHeader>Oportunidade editorial</CardHeader>
          <CardBody>
            <Text>
              A amostra de resultados atuais mostra muitas páginas amplas e pouco diferenciadas. O ganho possível está em responder cada urgência com profundidade, contexto local verificável e um caminho claro de ação.
            </Text>
          </CardBody>
        </Card>
      </Grid>

      <H2>Mapa de palavras-chave sem canibalização</H2>
      <Table
        headers={["#", "Consulta principal", "URL dona da intenção", "Cluster"]}
        rows={keywordRows}
        striped
        stickyHeader
        columnAlign={["right", "left", "left", "left"]}
      />

      <Callout tone="info" title="A regra de qualidade">
        Não existe densidade ideal nem contagem mínima de palavras definida pelo Google. O critério será cobertura completa da intenção, clareza, autoria jurídica, informação original e ausência de repetição mecânica.
      </Callout>
    </Stack>
  );
}

function PagesView() {
  const [selected, setSelected] = useState(1);
  const page = pages.find((item) => item.id === selected) || pages[0];
  return (
    <Stack gap={20}>
      <Row gap={8} wrap>
        {pages.map((item) => (
          <Pill key={item.id} active={selected === item.id} onClick={() => setSelected(item.id)}>
            {item.id}. {item.short}
          </Pill>
        ))}
      </Row>

      <Grid columns="minmax(0, 1.45fr) minmax(260px, 0.75fr)" gap={20} align="start">
        <Stack gap={16}>
          <Stack gap={6}>
            <Row gap={8} align="center" wrap>
              <Pill active size="sm">Página {page.id}</Pill>
              <Text size="small" tone="tertiary">{page.cluster}</Text>
            </Row>
            <H2>{page.h1}</H2>
            <Text>{page.subheadline}</Text>
            <Text size="small" tone="tertiary">Intenção: {page.intent}</Text>
          </Stack>

          <Card>
            <CardHeader>Snippet e endereço</CardHeader>
            <CardBody>
              <Stack gap={12}>
                <Stack gap={4}>
                  <Text size="small" tone="tertiary">URL canônica</Text>
                  <Code>{BASE + page.url}</Code>
                </Stack>
                <Stack gap={4}>
                  <Text size="small" tone="tertiary">SEO title</Text>
                  <Text weight="semibold">{page.title}</Text>
                </Stack>
                <Stack gap={4}>
                  <Text size="small" tone="tertiary">Meta description</Text>
                  <Text>{page.description}</Text>
                </Stack>
              </Stack>
            </CardBody>
          </Card>

          <Stack gap={8}>
            <H3>Ângulo editorial exclusivo</H3>
            <Text>{page.angle}</Text>
          </Stack>

          <Stack gap={10}>
            <H3>Estrutura da página</H3>
            <BulletList items={page.sections} />
          </Stack>

          <CollapsibleSection title="Perguntas frequentes planejadas" count={page.faqs.length} defaultOpen>
            <BulletList items={page.faqs} />
          </CollapsibleSection>

          <CollapsibleSection title="Links internos contextuais" count={page.links.length}>
            <BulletList items={page.links} />
          </CollapsibleSection>
        </Stack>

        <Stack gap={14}>
          <Card>
            <CardHeader>Palavra principal</CardHeader>
            <CardBody>
              <Text weight="semibold">{page.primary}</Text>
            </CardBody>
          </Card>

          <Card>
            <CardHeader>Variações semânticas</CardHeader>
            <CardBody>
              <Row gap={6} wrap>
                {page.keywords.map((keyword) => (
                  <Pill key={keyword} size="sm">{keyword}</Pill>
                ))}
              </Row>
            </CardBody>
          </Card>

          <Card>
            <CardHeader>Conversão</CardHeader>
            <CardBody>
              <Stack gap={10}>
                <Text weight="semibold">{page.cta}</Text>
                <Text size="small" tone="secondary">Mensagem pré-preenchida:</Text>
                <Text>{page.message}</Text>
              </Stack>
            </CardBody>
          </Card>

          <Callout tone="warning" title="Gate de prova local">
            {page.localProof}
          </Callout>
        </Stack>
      </Grid>
    </Stack>
  );
}

function ArchitectureView() {
  return (
    <Stack gap={22}>
      <H2>Hierarquia recomendada</H2>
      <Card>
        <CardHeader>{BASE}</CardHeader>
        <CardBody>
          <Stack gap={14}>
            <Text weight="semibold">/ — Advogado Criminalista em Goiânia</Text>
            <Divider />
            <CollapsibleSection title="Urgência e liberdade" count={4} defaultOpen>
              <BulletList
                items={[
                  "/advogado-flagrante-goiania/",
                  "/advogado-audiencia-de-custodia-goiania/",
                  "/pedido-liberdade-provisoria-goiania/",
                  "/advogado-prisao-temporaria-goiania/",
                ]}
              />
            </CollapsibleSection>
            <CollapsibleSection title="Investigação criminal" count={1} defaultOpen>
              <BulletList items={["/advogado-inquerito-policial-goiania/"]} />
            </CollapsibleSection>
            <CollapsibleSection title="Defesa em crimes sexuais" count={3} defaultOpen>
              <BulletList
                items={[
                  "/advogado-crimes-sexuais-goiania/ — página-pilar",
                  "/advogado-crimes-sexuais-aparecida-de-goiania/ — página local condicionada",
                  "/advogado-crimes-sexuais-anapolis/ — página local condicionada",
                ]}
              />
            </CollapsibleSection>
            <CollapsibleSection title="Página local ampla" count={1} defaultOpen>
              <BulletList items={["/advogado-criminalista-anapolis/"]} />
            </CollapsibleSection>
          </Stack>
        </CardBody>
      </Card>

      <Grid columns="repeat(auto-fit, minmax(250px, 1fr))" gap={16}>
        <Stack gap={8}>
          <H3>Home como hub</H3>
          <Text>
            A home mantém a busca ampla de Goiânia. Os cards atuais passam a resumir cada serviço e apontar para a página profunda com âncoras descritivas.
          </Text>
        </Stack>
        <Stack gap={8}>
          <H3>Breadcrumbs reais</H3>
          <Text>
            Exemplo: Início › Defesa criminal › Audiência de custódia em Goiânia. O mesmo caminho aparece na interface e no JSON-LD.
          </Text>
        </Stack>
        <Stack gap={8}>
          <H3>Links com contexto</H3>
          <Text>
            Cada página recebe de dois a quatro links úteis para a etapa anterior ou seguinte. Evitar blocos repetidos com nove links exatos em todas as páginas.
          </Text>
        </Stack>
      </Grid>

      <H2>Páginas de confiança que sustentam o projeto</H2>
      <Table
        headers={["Página", "Função", "Indexação"]}
        rows={[
          ["/sobre-rodrigo-faustino/", "Autoria, OAB, formação, atuação, vínculos e provas verificáveis", "Indexável e no sitemap"],
          ["/contato/", "NAP consistente, canais, endereço real de Goiânia e áreas atendidas", "Indexável se tiver conteúdo útil"],
          ["/politica-de-privacidade/", "LGPD, WhatsApp, analytics, cookies e tratamento de dados", "Acessível no footer; sitemap opcional"],
          ["Aviso jurídico no footer", "Conteúdo informativo, sem promessa de resultado e identificação OAB", "Em todas as páginas"],
        ]}
        striped
      />

      <Callout tone="warning" title="Regra para cidades sem escritório físico">
        O endereço de Goiânia permanece associado somente ao local verdadeiro. Anápolis e Aparecida entram como áreas de atendimento, nunca como sedes ou endereços postais fictícios.
      </Callout>
    </Stack>
  );
}

function TechnicalView() {
  return (
    <Stack gap={22}>
      <H2>Plano técnico no Next.js</H2>
      <Table
        headers={["Arquivo ou camada", "Alteração planejada"]}
        rows={[
          ["lib/site.ts", "Fonte única para domínio, escritório, advogado, telefone, endereço e perfis oficiais"],
          ["lib/landing-pages.ts", "Registro tipado das nove páginas, metadados, conteúdo, links e data real de revisão"],
          ["app/[slug]/page.tsx", "Rotas estáticas, generateStaticParams e generateMetadata por página"],
          ["components/landing/*", "Blocos reutilizáveis com variantes para urgência, investigação, cidade e crimes sexuais"],
          ["app/sitemap.ts", "Home, nove landing pages e página do autor; lastModified somente quando houve mudança real"],
          ["app/robots.ts", "Sitemap no domínio adv e liberação apenas da produção"],
          ["next.config.ts", "Redirect permanente do host antigo, se estiver ativo e sob controle"],
          ["GTM", "Eventos por página, seção, tema, cidade e tipo de CTA"],
        ]}
        striped
      />

      <Grid columns="repeat(auto-fit, minmax(260px, 1fr))" gap={16}>
        <Card>
          <CardHeader>Metadata por página</CardHeader>
          <CardBody>
            <BulletList
              items={[
                "title, description e H1 únicos",
                "canonical absoluto e autorreferente",
                "Open Graph e X alinhados ao conteúdo",
                "robots index/follow somente em produção",
                "um idioma: pt-BR",
              ]}
            />
          </CardBody>
        </Card>
        <Card>
          <CardHeader>Dados estruturados</CardHeader>
          <CardBody>
            <BulletList
              items={[
                "Home: LegalService/Attorney, Person e Organization consistentes",
                "Landing: WebPage, Service e BreadcrumbList",
                "FAQPage apenas se perguntas e respostas estiverem visíveis",
                "Sem AggregateRating autorreferente ou dados não comprovados",
                "Endereço físico somente para Goiânia",
              ]}
            />
          </CardBody>
        </Card>
        <Card>
          <CardHeader>Descoberta e indexação</CardHeader>
          <CardBody>
            <BulletList
              items={[
                "Links HTML rastreáveis a partir da home",
                "Sitemap apenas com URLs canônicas desejadas",
                "Sem datas artificiais renovadas a cada build",
                "Vercel previews protegidos ou noindex",
                "Search Console verificado no host final",
              ]}
            />
          </CardBody>
        </Card>
      </Grid>

      <H2>Gate editorial e ético antes de cada publicação</H2>
      <Table
        headers={["Controle", "Critério de aprovação"]}
        rows={[
          ["Intenção", "A página resolve uma necessidade própria e não compete com outra URL"],
          ["Originalidade", "Não foi produzida por troca de cidade; tem seções, exemplos e respostas específicas"],
          ["Localidade", "Toda alegação de atendimento, endereço e logística foi confirmada"],
          ["Autoria", "Revisão por Rodrigo Faustino, OAB/GO 64.028, com data real"],
          ["Fontes", "Legislação e procedimentos citados a partir de fontes oficiais atualizadas"],
          ["OAB", "Sem promessa de resultado, captação indevida, comparação ou adjetivos sem prova"],
          ["Conversão", "CTA informa atendimento particular e coleta apenas o mínimo necessário"],
          ["Schema", "Todo dado estruturado corresponde ao que o visitante consegue ver"],
          ["QA", "Build, links, canonical, sitemap, mobile, acessibilidade e velocidade aprovados"],
        ]}
        striped
      />

      <Callout tone="info" title="FAQ não é atalho para rich result">
        O conteúdo de perguntas frequentes continua útil ao usuário, mas o Google hoje restringe a exibição regular de FAQ rich results principalmente a sites governamentais e de saúde. O schema não deve ser vendido como ganho visual garantido.
      </Callout>
    </Stack>
  );
}

function PublishingView() {
  return (
    <Stack gap={22}>
      <H2>Sequência de execução</H2>
      <CollapsibleSection title="Fase 0 — evidências e decisões" count={5} defaultOpen>
        <BulletList
          items={[
            "Confirmar domínio final e controle do subdomínio antigo",
            "Confirmar atendimento real em Goiânia, Aparecida e Anápolis",
            "Validar plantão 24h, endereço, OAB, formação, ABRACRIM e números de casos",
            "Reunir avaliações que possam ser exibidas eticamente, sem promessas de resultado",
            "Obter dados de Keyword Planner e Search Console para volume, posição e consultas reais",
          ]}
        />
      </CollapsibleSection>
      <CollapsibleSection title="Fase 1 — fundação técnica" count={5} defaultOpen>
        <BulletList
          items={[
            "Centralizar o domínio adv e criar redirecionamento 301 do host antigo, se aplicável",
            "Criar o registro das nove rotas e a página de autor",
            "Atualizar metadata, canonical, robots, sitemap e JSON-LD",
            "Adicionar navegação, breadcrumbs e links internos rastreáveis",
            "Configurar noindex para ambientes de preview",
          ]}
        />
      </CollapsibleSection>
      <CollapsibleSection title="Fase 2 — conteúdo em três ondas" count={3} defaultOpen>
        <BulletList
          items={[
            "Onda A: flagrante, custódia, liberdade provisória, inquérito e prisão temporária",
            "Onda B: crimes sexuais em Goiânia e advogado criminalista em Anápolis",
            "Onda C: crimes sexuais em Aparecida e Anápolis somente após o gate de prova local",
          ]}
        />
      </CollapsibleSection>
      <CollapsibleSection title="Fase 3 — QA e publicação no Vercel" count={6} defaultOpen>
        <BulletList
          items={[
            "Revisão jurídica e ética de todo o texto",
            "Verificação automática de title, description, H1, canonical, schema e links",
            "Teste mobile, contraste, teclado, imagens e Core Web Vitals",
            "Build de produção e checagem de status HTTP",
            "Publicação no domínio canônico e validação do redirect",
            "Envio do sitemap e inspeção das URLs prioritárias no Search Console",
          ]}
        />
      </CollapsibleSection>

      <H2>Medição que liga SEO a clientes qualificados</H2>
      <Table
        headers={["Camada", "Métrica ou evento", "Decisão que permite tomar"]}
        rows={[
          ["Google Search Console", "Impressões, cliques, CTR, posição e consulta por URL", "Ajustar title, conteúdo e canibalização"],
          ["GTM / GA4", "whatsapp_click, tel_click, maps_click, faq_open", "Identificar página e seção que geram contato"],
          ["WhatsApp / CRM", "tema, cidade, urgência e lead qualificado", "Otimizar para contratação potencial, não clique bruto"],
          ["Técnico", "indexação, canonical escolhida, CWV e erros 404/5xx", "Corrigir descoberta e experiência"],
          ["Negócio", "leads qualificados e contratos atribuídos por página", "Priorizar conteúdo com retorno real"],
        ]}
        striped
      />

      <Grid columns="repeat(auto-fit, minmax(220px, 1fr))" gap={14}>
        <Card>
          <CardHeader>Primeiros 30 dias</CardHeader>
          <CardBody>
            <Text>Confirmar indexação, canonicals, consultas emergentes, erros e cliques de CTA. Não reescrever páginas cedo demais.</Text>
          </CardBody>
        </Card>
        <Card>
          <CardHeader>De 30 a 60 dias</CardHeader>
          <CardBody>
            <Text>Melhorar snippets de URLs com impressão e CTR baixo; reforçar links internos e respostas para consultas reais.</Text>
          </CardBody>
        </Card>
        <Card>
          <CardHeader>De 60 a 90 dias</CardHeader>
          <CardBody>
            <Text>Comparar leads qualificados por tema e cidade; consolidar páginas fracas ou muito semelhantes e ampliar as que provaram demanda.</Text>
          </CardBody>
        </Card>
      </Grid>

      <H2>Fontes de política usadas no planejamento</H2>
      <Stack gap={8}>
        <Text>
          <Link href="https://developers.google.com/search/docs/essentials/spam-policies">Google Search — Spam policies e doorway abuse</Link>
        </Text>
        <Text>
          <Link href="https://developers.google.com/search/docs/fundamentals/creating-helpful-content">Google Search — Conteúdo útil, confiável e feito para pessoas</Link>
        </Text>
        <Text>
          <Link href="https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls">Google Search — Canonicalização</Link>
        </Text>
        <Text>
          <Link href="https://support.google.com/business/answer/7091">Google Business Profile — Relevância, distância e proeminência</Link>
        </Text>
        <Text>
          <Link href="https://www.oab.org.br/leisnormas/legislacao/provimentos/205-2021">OAB — Provimento 205/2021</Link>
        </Text>
      </Stack>
    </Stack>
  );
}

export default function SeoLocalPlanCanvas() {
  const theme = useHostTheme();
  const [view, setView] = useState<View>("resumo");

  return (
    <div style={{ minHeight: "100vh", background: theme.bg.editor, color: theme.text.primary, padding: 24 }}>
      <Stack gap={24} style={{ maxWidth: 1180, margin: "0 auto" }}>
        <Grid columns="minmax(0, 1.6fr) minmax(230px, 0.5fr)" gap={20} align="end">
          <Stack gap={8}>
            <Text size="small" weight="semibold" style={{ color: theme.accent.primary, letterSpacing: "0.08em", textTransform: "uppercase" }}>
              Plano mestre · SEO local jurídico
            </Text>
            <H1>9 landing pages para defesa criminal em Goiás</H1>
            <Text tone="secondary">
              Arquitetura, intenção de busca, títulos, headlines, conteúdo, links internos, dados estruturados, publicação e mensuração.
            </Text>
          </Stack>
          <Stack gap={4}>
            <Text size="small" tone="tertiary">Domínio canônico planejado</Text>
            <Code>{BASE}</Code>
            <Text size="small" tone="quaternary">Versão 1 · 31 ago 2026</Text>
          </Stack>
        </Grid>

        <Row gap={8} wrap>
          {tabs.map((tab) => (
            <Button
              key={tab.id}
              variant={view === tab.id ? "primary" : "secondary"}
              onClick={() => setView(tab.id)}
            >
              {tab.label}
            </Button>
          ))}
        </Row>

        <Divider />

        {view === "resumo" ? <SummaryView /> : null}
        {view === "paginas" ? <PagesView /> : null}
        {view === "arquitetura" ? <ArchitectureView /> : null}
        {view === "tecnico" ? <TechnicalView /> : null}
        {view === "publicacao" ? <PublishingView /> : null}
      </Stack>
    </div>
  );
}
