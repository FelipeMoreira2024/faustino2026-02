import { Button, H1, H2, Row, Stack, Table, Text, useHostTheme, useState } from "cursor/canvas";

const root = "C:/Users/goexp/.cursor/projects/RODRIGO-FAUSTINO-FABLE/faustino2026-02/";
const findings = [
  {
    id: "01", priority: "P1", category: "Privacidade", title: "Consentimento automático contradiz a política publicada",
    evidence: "CookieConsent concede analytics_storage, ad_storage, ad_user_data e ad_personalization quando não há recusa. O DOM de produção contém gtm-auto, GA4, analytics.js e script de conversão DoubleClick. A política publicada diz que o GTM só carrega após aceitação. A regra automática está documentada como decisão do cliente; mesmo assim, a contradição com a informação ao visitante permanece.",
    impact: "O visitante recebe uma descrição incorreta do tratamento; a opção de recusa só aparece no rodapé, depois do carregamento das tags.",
    fix: "Alinhar implementação e política. Para tratamento baseado em consentimento, iniciar como denied e só conceder as finalidades escolhidas. Revisar a base legal e manter recusa acessível. Não basta trocar o texto do botão.",
    file: "components/CookieConsent.tsx", line: 78,
    check: "Reproduzido em produção + confirmado no código. Contraponto: app/politica-de-privacidade/page.tsx:24.",
  },
  {
    id: "02", priority: "P1", category: "Medição", title: "Evento de telefone sem gatilho no GTM publicado",
    evidence: "LpPhoneLink emite lead_phone_rodrigo_faustino_v3. No contêiner público GTM-KXMJTXP, versão 38, há predicados para lead_whatsapp_rodrigo_faustino_v2 e v3, mas nenhum para lead_phone, tel: ou telefone. O evento v3 de WhatsApp aciona a tag Ads 35; o de telefone não tem regra correspondente.",
    impact: "Cliques no telefone não geram a conversão personalizada pretendida nesse contêiner, prejudicando a comparação de canais e a otimização da campanha. Clique não comprova ligação atendida.",
    fix: "Criar gatilho e tag próprios para o evento de telefone, publicar e validar no Tag Assistant. Tratar a ação como clique no telefone; medir ligação efetiva exige outra integração.",
    file: "components/lp/tracking.ts", line: 19,
    check: "Confirmado por comparação entre código e configuração pública do GTM; sem disparar conversões de teste. Configurações privadas do Ads não foram inspecionadas.",
  },
  {
    id: "03", priority: "P2", category: "Privacidade", title: "Situação criminal exposta desnecessariamente ao dataLayer",
    evidence: "A triagem passa familiar_preso, investigacao e acusacao_sensivel para lead_topic. trackLpLead inclui o valor no dataLayer, acessível às tags da página. A landing também concede ad_personalization por padrão. O contêiner público inspecionado não mapeia lead_topic para uma tag: não foi demonstrada transmissão desse parâmetro ao Google.",
    impact: "Cria uma superfície desnecessária de coleta de informação delicada e permite que alterações futuras no GTM a transmitam. O Google restringe personalização baseada em acusações e antecedentes criminais; ativação de campanha de remarketing não foi verificada.",
    fix: "Retirar a classificação do caso da camada de publicidade. Manter somente canal e identificador neutro do botão; revisar personalização e audiências no Ads. Mensagem de WhatsApp e metadados de publicidade precisam ser tratados separadamente.",
    file: "components/lp/tracking.ts", line: 57,
    check: "Exposição no código confirmada; transmissão e uso em audiências não confirmados. Não é uma alegação de vazamento já ocorrido.",
  },
  {
    id: "04", priority: "P2", category: "UX / responsividade", title: "Telefone cortado no cabeçalho estreito",
    evidence: "Em viewport de 320 × 640, o cabeçalho mostra ‘PLANTÃO CRIMINAL 24H ...’. O link de telefone vai de x=190,5 a 287,3, mas o contêiner truncate termina em x=234,8. O CTA de WhatsApp mede 38 × 30 px; o link telefônico tem 35 px de altura.",
    impact: "O número de urgência fica ilegível. Os controles pequenos tornam o toque menos confortável, especialmente para quem chega sob pressão. Há alternativas no hero, mas exigem rolagem nessa altura de tela.",
    fix: "Dar prioridade ao telefone: abreviar o texto do plantão ou usar duas linhas em telas estreitas. Aumentar área acionável para aproximadamente 44 × 44 px. A medida de 44 px é uma meta de usabilidade/critério aprimorado, não prova isolada de falha WCAG AA.",
    file: "components/lp/sections/LpTopbar.tsx", line: 25,
    check: "Reproduzido no navegador com captura visual e medidas DOM. Em 390 px, o número coube.",
  },
  {
    id: "05", priority: "P2", category: "Conteúdo / lógica", title: "Orientações opostas sobre enviar documentos",
    evidence: "‘Como funciona’ orienta: ‘Se tiver, envie a foto da intimação’. A política publicada orienta evitar documentos e imagens antes de receber orientação.",
    impact: "O usuário não sabe qual instrução seguir e pode enviar documentos com dados próprios ou de terceiros antes da triagem mínima.",
    fix: "Padronizar o primeiro contato: informar urgência, cidade, fase e próximo prazo; enviar documento somente quando o advogado solicitar. Revisar os textos em conjunto.",
    file: "lib/lp-defesa-criminal.ts", line: 168,
    check: "Ambos os textos confirmados em produção e código. Contraponto: app/politica-de-privacidade/page.tsx:20.",
  },
  {
    id: "06", priority: "P2", category: "Performance", title: "Duas fontes sem uso recebem preload",
    evidence: "O HTML de produção pré-carrega cinco fontes. Fraunces normal e itálica estão entre elas, mas nenhum elemento da landing usa Fraunces no estilo computado. Os arquivos correspondentes do build local têm 67.388 e 81.704 bytes: total de 149.092 bytes, aproximadamente 146 KiB.",
    impact: "Downloads antecipados competem com foto, CSS e fontes efetivamente utilizadas na primeira visita, especialmente em conexão móvel.",
    fix: "Mover Fraunces para um layout das páginas que a usam ou desativar seu preload global. Manter Inter e Newsreader para esta landing. Medir novamente o LCP após a mudança.",
    file: "app/layout.tsx", line: 22,
    check: "Preloads e ausência de uso confirmados em produção; tamanhos obtidos dos arquivos locais de mesmo nome/hash. Não houve medição de Core Web Vitals de campo.",
  },
  {
    id: "07", priority: "P2", category: "Performance / tags", title: "Universal Analytics antigo ainda carrega",
    evidence: "A tag 5 do GTM público é __ua, usa UA-231669819-1 e está na regra de gtm.js. O navegador carrega https://www.google-analytics.com/analytics.js junto com GA4.",
    impact: "Código legado sem utilidade para coleta atual do Universal Analytics adiciona execução e manutenção. O serviço foi encerrado pelo Google.",
    fix: "Remover a tag Universal Analytics do contêiner, preservando GA4 e as conversões Ads necessárias. Aproveitar para revisar tags antigas e a finalidade do evento genérico ‘Ga4’.",
    file: "app/layout.tsx", line: 14,
    check: "Confirmado em produção e no GTM versão 38. A correção é no GTM, não nesse ponto de referência do código.",
  },
  {
    id: "08", priority: "P3", category: "UX", title: "Link de avaliações abre uma busca genérica",
    evidence: "‘Ver as avaliações no Google’ aponta para google.com/search?q=Rodrigo+Faustino+Advogado+Criminalista+Goiânia, sem identificar diretamente o perfil ou a lista de avaliações.",
    impact: "O usuário pode ter de localizar o perfil e abrir as avaliações manualmente. O destino varia conforme localização e resultados de busca.",
    fix: "Usar um link direto, verificado, do perfil empresarial ou das avaliações existentes. Não substituir por um link de escrever avaliação.",
    file: "lib/lp-defesa-criminal.ts", line: 162,
    check: "Destino confirmado no HTML e código. Não classificado como link quebrado.",
  },
  {
    id: "09", priority: "P3", category: "Segurança / reforço", title: "Ausência de Content-Security-Policy",
    evidence: "A resposta HTTP 200 tem HSTS, nosniff, X-Frame-Options SAMEORIGIN e Permissions-Policy, mas não apresenta Content-Security-Policy. A configuração local também não define CSP.",
    impact: "Falta uma camada adicional de restrição de scripts e conexões caso uma injeção ou tag comprometida ocorra. A ausência de CSP, sozinha, não comprova vulnerabilidade explorável.",
    fix: "Introduzir CSP inicialmente em Report-Only, inventariar origens realmente necessárias e compatibilizar scripts Next/GTM antes de aplicar enforcement. Evitar uma política ampla que apenas aparente proteção.",
    file: "next.config.ts", line: 39,
    check: "Confirmado por consulta HTTP aos cabeçalhos públicos. Nenhum exploit foi executado.",
  },
];

export default function Audit() {
  const theme = useHostTheme();
  const [filter, setFilter] = useState("Todos");
  const visible = findings.filter(f => filter === "Todos" || f.priority === filter);
  return <Stack gap={24} style={{ padding: 28, maxWidth: 1080, margin: "0 auto", color: theme.text.primary, background: theme.bg.editor }}>
    <Stack gap={8}>
      <H1>Reauditoria de /defesa-criminal</H1>
      <Text>27/09/2026, aproximadamente 19h25 BRT · Código d83e394 e produção · GTM versão 39.</Text>
      <Text>Dos nove achados anteriores: sete corrigidos e dois parcialmente resolvidos. Um problema adicional confirmado: a landing anuncia nota 5,0, mas o perfil do Google vinculado mostra 4,9 em 241 avaliações.</Text>
    </Stack>
    <Stack gap={12}>
      <H2>Estado atual das correções</H2>
      <Table headers={["Achado anterior", "Estado", "Verificação atual"]} rows={[
        ["01 · Consentimento e política", "Parcial", "A política agora informa o carregamento automático. O código mantém os quatro consentimentos como granted, inclusive personalização, sem escolha prévia."],
        ["02 · Conversão de telefone", "Corrigido", "GTM v39 tem predicado lead_phone_rodrigo_faustino_v3 ligado à tag Ads 37. Confirmada configuração publicada; sem disparar conversão artificial."],
        ["03 · Situação criminal no dataLayer", "Parcial", "Tópicos passaram a situacao_1…5, mas lead_section ainda recebe acusacoes-sensiveis. O código de situação mantém correspondência direta com a escolha."],
        ["04 · Cabeçalho estreito", "Corrigido", "Em 320 × 640, telefone inteiro dentro do contêiner e WhatsApp com 44 × 44 px. Link de telefone continua com 35 px de altura: melhoria opcional."],
        ["05 · Envio de documentos", "Corrigido", "Produção orienta informar cidade, fase e próximo ato; documentos somente quando o advogado pedir."],
        ["06 · Fontes sem uso", "Corrigido", "Newsreader removida. Landing usa Fraunces já carregada pelo site. Preloads caíram de cinco para três, eliminando 122.652 bytes de fontes Newsreader do conjunto anterior."],
        ["07 · Universal Analytics", "Corrigido", "Tag UA 5 pausada no GTM v39; analytics.js ausente no DOM após carregamento. Evento genérico Ga4 também pausado."],
        ["08 · Link de avaliações", "Corrigido", "Abre Faustino Advogado Criminalista no Google Maps com a aba Avaliações selecionada."],
        ["09 · Ausência de CSP", "Corrigido com ressalva", "Cabeçalho CSP presente na resposta HTTP. Inclui object-src none, base-uri self e frame-ancestors self. Ainda permite unsafe-inline e várias origens Google com wildcard."],
      ]} />
    </Stack>
    <Stack gap={12}>
      <H2>O que ainda precisa de atenção</H2>
      <Text>Privacidade: a contradição documental foi corrigida, mas o mecanismo de consentimento não mudou. A política descreve opt-out; isso não demonstra, por si só, adequação da base legal. A personalização continua granted. A revisão não conclui ilegalidade nem confirma configuração de audiências na conta Ads.</Text>
      <Text>Rastreamento: renomear acusacao_sensivel para situacao_4 não remove a informação da escolha. Além disso, LpSensitive.tsx:47 ainda passa section=acusacoes-sensiveis, que tracking.ts:56 copia para lead_section. Remover o assunto dos eventos de publicidade e usar eventos agregados por canal resolve melhor o achado. Não foi comprovada transmissão desses campos pelo GTM atual.</Text>
      <Text>Novo achado P2 — nota pública divergente: hero e seção de avaliações mostram 5,0; Google Maps mostra 4,9 e 241 avaliações. Atualizar ambos e o aria-label de estrelas, ou retirar a média fixa até haver manutenção confiável. Arquivos: LpHero.tsx:70, LpReviews.tsx:15 e ui.tsx:32.</Text>
      <a style={{ color: theme.text.link }} href="https://www.google.com/maps/place//data=!4m4!3m3!1s0x935ef125d318e55f:0x979360c733412b7f!9m1!1b1">Perfil e avaliações consultados em 27/09/2026</a>
      <Text>CSP: a ausência foi resolvida. A política atual fornece proteções úteis, mas unsafe-inline reduz a proteção contra injeção de JavaScript. Não considerar este cabeçalho uma garantia contra XSS; endurecimento adicional deve preservar Next e GTM.</Text>
      <Text>Validação atual: TypeScript passou; detector Impeccable sem achados; FAQ abriu; nenhum erro ou aviso de console observado na landing após carregamento. O lint inicial desta reauditoria encontrou duas aspas não escapadas no relatório criado por mim, sem erro no código da página; as aspas foram corrigidas nesta atualização. Não foram feitas ligações, enviadas mensagens ou geradas conversões de teste. Opt-out não foi testado ponta a ponta, e recebimento das conversões no Ads não foi verificado.</Text>
      <Text>As correções estão publicadas: não são apenas alterações locais. Esta execução atualizou somente o relatório, sem modificar a landing ou o GTM.</Text>
    </Stack>
    <Stack gap={12}>
      <H2>Verificação de SEO e sitemap — 27/09/2026, 19h37 BRT</H2>
      <Text>A landing não consta no sitemap e está configurada para exclusão da busca orgânica. O HTML público contém robots e googlebot com noindex, follow. O código documenta a intenção de usá-la em anúncios. A ausência no sitemap é coerente com essa intenção; não é um erro isolado a corrigir sem decidir o objetivo da página.</Text>
      <Table headers={["Verificação", "Resultado em produção"]} rows={[
        ["Sitemap de goiania", "Contém apenas a raiz. /defesa-criminal ausente."],
        ["Sitemap de adv", "Contém as outras landings e páginas institucionais. /defesa-criminal ausente."],
        ["Robots.txt", "Permite rastreamento da landing e aponta para o sitemap correto; isso permite ao Google ler o noindex."],
        ["Indexação", "robots=noindex, follow e googlebot=noindex, follow. Canonical não anula noindex."],
        ["Canonical", "Correto, aponta para a própria URL HTTPS no subdomínio goiania."],
        ["HTML e títulos", "HTTP 200, conteúdo no HTML inicial, lang pt-BR, um H1 e hierarquia H2/H3."],
        ["Metadados", "Título e descrição específicos, cidade e atuação; Open Graph com imagem 1200 × 630 e metadados Twitter configurados."],
        ["Dados estruturados", "Nenhum script application/ld+json no HTML da landing. Oportunidade caso passe a ter objetivo orgânico; ausência não bloqueia indexação."],
        ["Links internos", "Busca no código não encontrou link de navegação para /defesa-criminal. Descoberta interna deve ser trabalhada se houver objetivo orgânico."],
        ["Manutenção do sitemap", "lastmod fixo em 31/08/2026 para todas as URLs, inclusive páginas posteriormente editadas. Usar datas reais de alterações relevantes."],
        ["Teste de SEO", "scripts/check-seo.mjs não inclui /defesa-criminal. Incluir verificações de acordo com o objetivo de indexação escolhido."],
      ]} />
      <Text>Se continuar exclusiva de anúncios: manter noindex e fora do sitemap. Se a intenção for ranquear esta URL: remover noindex de robots e googleBot, incluí-la no sitemap de goiania, criar links internos e diferenciar sua intenção/conteúdo da home, que já mira advogado criminalista em Goiânia. Adicionar dados estruturados coerentes de negócio/serviço/pessoa é complementar, não garantia de posicionamento. Para uma variante equivalente à home, avaliar consolidação por canonical em vez de indexar duas páginas com a mesma finalidade.</Text>
      <Text>A nota 5,0 divergente do perfil Google continua sendo uma pendência de precisão do conteúdo. Não houve consulta autenticada ao Search Console nem medição de Core Web Vitals de campo; esta verificação confirma configuração pública, não a situação efetiva no índice ou desempenho de rankings. Não foram modificados robots, sitemap ou metadados.</Text>
      <a style={{ color: theme.text.link }} href="https://goiania.rodrigofaustinoadvocacia.com.br/sitemap.xml">Sitemap de Goiânia verificado</a>
      <a style={{ color: theme.text.link }} href="https://developers.google.com/search/docs/crawling-indexing/block-indexing">Google Search Central — efeito de noindex</a>
      <a style={{ color: theme.text.link }} href="https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap">Google Search Central — sitemap e lastmod</a>
      <a style={{ color: theme.text.link }} href="https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls">Google Search Central — canonicalização</a>
    </Stack>
    <details>
      <summary style={{ cursor: "pointer", color: theme.text.link }}>Consultar a auditoria anterior — histórico, não estado atual</summary>
    <Stack gap={8}>
      <H2>Auditoria anterior</H2>
      <Text>27/09/2026 · Código local, página em produção e GTM público · 9 achados: 2 P1, 5 P2 e 2 P3. Nenhum P0 confirmado.</Text>
      <Text>Prioridade: resolver a divergência de privacidade e conectar a medição de telefone. A página permite contato; não foi encontrado bloqueio geral do fluxo.</Text>
      <a style={{ color: theme.text.link }} href="https://goiania.rodrigofaustinoadvocacia.com.br/defesa-criminal" target="_blank" rel="noreferrer">Página auditada</a>
    </Stack>
    <Stack gap={10}>
      <H2>Qualidade observada: 14/20</H2>
      <Text>Nota indicativa da revisão técnica amostral; não equivale a Lighthouse, certificação WCAG ou pentest. A identidade visual é coerente; a integridade funcional precisa de ajustes de privacidade e medição.</Text>
      <Table headers={["Dimensão", "Nota / 4", "Evidência principal"]} rows={[
        ["Acessibilidade", "3", "FAQ nativo com teclado e foco; controles compactos no cabeçalho."],
        ["Performance", "2", "Lazy loading presente; fontes não usadas e Universal Analytics legado."],
        ["Responsividade", "3", "Boa adaptação geral; telefone cortado em 320 px."],
        ["Tema", "4", "Tokens e paleta coerentes; não há seletor de tema a validar."],
        ["Integridade", "2", "Conteúdo e consentimento divergentes; evento telefônico sem gatilho."],
      ]} />
    </Stack>
    <Stack gap={12}>
      <H2>Achados e correções propostas</H2>
      <Row wrap gap={8}>{["Todos", "P1", "P2", "P3"].map(value => <Button key={value} variant={filter === value ? "primary" : "secondary"} onClick={() => setFilter(value)}>{value}</Button>)}</Row>
      <Text>P1: corrigir com prioridade. P2: corrigir na próxima revisão. P3: melhoria ou reforço preventivo.</Text>
      {visible.map(f => <section key={f.id} style={{ padding: "20px 0", borderTop: `1px solid ${theme.stroke.tertiary}` }}>
        <Text>{f.priority} · {f.category}</Text>
        <H2>{f.title}</H2>
        <p><strong>Evidência. </strong>{f.evidence}</p>
        <p><strong>Impacto. </strong>{f.impact}</p>
        <p><strong>Correção. </strong>{f.fix}</p>
        <p style={{ color: theme.text.secondary }}>{f.check}</p>
        <a style={{ color: theme.text.link }} href={`${root}${f.file}:${f.line}`}>{f.file}:{f.line}</a>
      </section>)}
    </Stack>
    <Stack gap={10}>
      <H2>Verificações que passaram</H2>
      <ul>
        <li>HTTP 200 e HTTPS; HSTS, proteção contra enquadramento externo, nosniff e restrições de câmera/microfone/geolocalização presentes.</li>
        <li>TypeScript e ESLint sem erros. npm audit --omit=dev: zero vulnerabilidades conhecidas no lockfile local na data da consulta.</li>
        <li>Detector Impeccable sem achados mecânicos no escopo da landing.</li>
        <li>FAQ abriu com clique e fechou por Enter, com foco visível. Botão flutuante apareceu após rolagem e ficou inerte junto ao CTA final.</li>
        <li>Links WhatsApp e telefone apontam consistentemente para +55 62 99444-2343. Links externos usam proteção noopener/noreferrer.</li>
        <li>Imagens observadas carregaram; lazy loading e tamanhos responsivos estão implementados. Nenhum erro de console na visita inicial.</li>
        <li>Canonical e Open Graph apontam para a landing. O noindex é intencional para tráfego pago, documentado no código; não foi tratado como bug.</li>
        <li>WhatsApp v3 tem regra e tag Ads próprias, distintas da v2, na configuração pública consultada.</li>
      </ul>
    </Stack>
    <Stack gap={10}>
      <H2>Limites e validações adicionais</H2>
      <Text>Viewports efetivamente medidos: 1440 × 900, 390 × 844 e 320 × 640, em Chromium. Não houve teste em iPhone/Safari real, simulação de rede lenta, Lighthouse, leitor de tela completo ou pentest do backend. Não foram enviadas mensagens, realizadas ligações ou disparadas conversões artificiais. O opt-out foi revisado no código; não foi testado ponta a ponta nesta execução.</Text>
      <Text>Risco de resiliência: o HTML nasce com className=&quot;js&quot; e .reveal começa com opacity:0. Se o JavaScript estiver habilitado, mas a hidratação falhar, o fallback noscript não atua e seções podem permanecer invisíveis. Evidência de código: app/layout.tsx:85, app/globals.css:96 e components/Reveal.tsx:34. Cenário não reproduzido; validar bloqueando chunks em ambiente de teste.</Text>
      <Text>Não foi comprovada exploração de XSS, exposição de segredo ou vulnerabilidade conhecida nas dependências de produção. Isso não atesta ausência de vulnerabilidades. A nota Google 5,0, os 950+ casos, os cargos institucionais, a disponibilidade 24h e a conformidade profissional da publicidade dependem de comprovação do escritório.</Text>
      <Text>Próxima sequência: privacidade e GTM; cabeçalho e textos; fontes e tags antigas; melhorias opcionais. Para a interface: $impeccable harden, $impeccable adapt, $impeccable clarify e $impeccable optimize; finalizar com $impeccable polish e repetir a auditoria. Nenhuma correção ou publicação foi feita.</Text>
    </Stack>
    <Stack gap={8}>
      <H2>Fontes externas e evidências públicas</H2>
      <a style={{ color: theme.text.link }} href="https://www.googletagmanager.com/gtm.js?id=GTM-KXMJTXP">GTM público — versão 38 observada em 27/09/2026</a>
      <a style={{ color: theme.text.link }} href="https://adv.rodrigofaustinoadvocacia.com.br/politica-de-privacidade">Política de privacidade publicada</a>
      <a style={{ color: theme.text.link }} href="https://www.gov.br/anpd/pt-br/assuntos/noticias/anpd-emite-recomendacoes-para-adequacao-da-pratica-de-coleta-de-cookies-do-portal-gov-br">ANPD — recomendações sobre cookies baseados em consentimento</a>
      <a style={{ color: theme.text.link }} href="https://support.google.com/adspolicy/answer/16701956?hl=en-AU">Google Ads — acusações criminais em publicidade personalizada</a>
      <a style={{ color: theme.text.link }} href="https://support.google.com/analytics/answer/10089681?hl=en">Google — encerramento do Universal Analytics</a>
    </Stack>
    </details>
  </Stack>;
}
