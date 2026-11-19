# Faustino Advocacia — site de defesa criminal (Goiânia)

Site Next.js com home em `https://goiania.rodrigofaustinoadvocacia.com.br/` e landings em `https://adv.rodrigofaustinoadvocacia.com.br/`.

A copy vigente das **landings** está em `lib/landing-pages.ts`. A home é montada em `app/page.tsx` e `components/sections/`. O arquivo `docs/copy.md` está desatualizado e **não** deve ser usado como fonte de publicação ou anúncios.

## Stack

- Next.js 15 (App Router) + TypeScript
- Tailwind CSS 4 (tokens em `app/globals.css`)
- Accordion (Radix)
- lucide-react
- Sem bibliotecas de animação — CSS + IntersectionObserver

## Rodando

```bash
npm install
npm run dev    # desenvolvimento
npm run build  # build de produção
npm run start  # servir build
```

## Estrutura

- `app/page.tsx` — home (Goiânia)
- `app/b/page.tsx` — **variante B da home** para teste A/B (`noindex`, canonical `/`). Reexporta `/criminalista-24h`.
- `app/advogado-criminal/page.tsx` — **nova desafiante da home** (`noindex` no acesso direto, indexável via rewrite em `/`). Conteúdo em `lib/advogado-criminal.ts` e seções em `components/advogado-criminal/`; dispara `lead_whatsapp_rodrigo_faustino_v2` e `lead_phone_rodrigo_faustino_v2` com `page_slug: "advogado-criminal"` e `ab_variant: "d"`.
- `app/defesa-criminal/page.tsx` — **landing de anúncios** (Google Ads), independente da home. Ver seção abaixo.
- `app/[slug]/page.tsx` — nove landings
- `lib/landing-pages.ts` — conteúdo das landings
- `lib/site.ts` — domínio, NAP, JSON-LD institucional
- `components/WhatsAppButton.tsx` — contato WhatsApp; evento `lead_whatsapp_rodrigo_faustino_v2`; na home, respeita a recusa de métricas
- `lib/whatsapp.ts` — deep-links
- `app/sitemap.xml/route.ts` e `app/robots.txt/route.ts` — respostas por `Host`

## QA

Scripts em `scripts/` (servidor em `localhost:3000`):

- `node scripts/check-copy.mjs`
- `node scripts/check-seo.mjs`
- `node scripts/qa-viewport.mjs`

## Deploy

Vercel. Na home (/) e em /defesa-criminal, `NEXT_PUBLIC_GTM_ID` carrega o GTM por padrão, salvo recusa pelo link no rodapé. Nas demais páginas, o carregamento depende da aceitação de cookies de métricas.

## Landing de anúncios `/defesa-criminal`

URL: `https://goiania.rodrigofaustinoadvocacia.com.br/defesa-criminal` — página estática,
`noindex, follow` (não disputa a busca orgânica com a home).

- Conteúdo (textos, situações da triagem, FAQ, honrarias): `lib/lp-defesa-criminal.ts`. Os títulos e a copy seguem a home, com contato somente por WhatsApp.
- Seções: `components/lp/sections/`; estilos isolados em `app/defesa-criminal/lp.css`
- Fotos otimizadas: `public/images/lp/` (inclui `og-defesa-criminal.jpg` para o preview no WhatsApp)

**Conversão própria** (a home continua com `_v2`). Assim como a home, esta página
carrega o GTM sem aviso de cookies, com todos os consentimentos concedidos
(`AUTO_CONSENT_PATHS` em `components/CookieConsent.tsx`). O visitante pode recusar
pelo link do rodapé (`components/lp/LpCookieOptOut.tsx`); a partir daí o GTM não
carrega e os eventos não vão para o `dataLayer`:

| Evento | Quando |
| --- | --- |
| `lead_whatsapp_rodrigo_faustino_v3` | clique em qualquer botão/link de WhatsApp da página |

A landing não exibe links de ligação nem habilita a detecção automática de telefones. A conversão de ligação v3 permanece no Ads apenas para observação como secundária.

Parâmetros: `lead_section` (hero, triagem, topbar, cta-final…), `lead_topic`
(códigos neutros `situacao_1` a `situacao_5`, mapeados em `lib/lp-defesa-criminal.ts`,
para o tema do caso não sair do site; também `outra_situacao`, `duvida`, `defesa_criminal`),
`page_slug: "defesa-criminal"`, `version: "v3_lp_defesa_criminal"`.

Todos os botões de WhatsApp da landing usam a mesma mensagem da home: "Olá, preciso conversar com um Advogado de Defesa Criminal."

## Testes A/B

No painel privado `/admin/experimentos`, escolha duas landings do catálogo ou cadastre
uma URL publicada nos subdomínios de Goiânia e `adv`. A URL da versão A distribui
o tráfego em 50/50 e mantém a atribuição do navegador. O painel sugere a home
original e a Criminalista 24h (`/b`). Há um teste ativo ou pausado por vez.

1. Registre a hipótese, a taxa histórica da métrica escolhida, a melhora mínima
   e a previsão diária. O painel calcula a amostra por variante, com poder de
   80% e significância bilateral de 5%. Use a revisão manual para validar a
   medição se a amostra estimada ultrapassar o prazo possível.
2. Acompanhe navegadores com clique, conversa e lead qualificado. No WhatsApp,
   copie o código `AB-…` da mensagem e registre o estágio no painel. Use o mesmo
   critério de qualificação nas duas páginas. O painel conta uma vez por
   navegador e estágio. O prazo de registro começa na primeira visita medida.
3. Ao fim da distribuição, o painel espera a janela de qualificação. O resultado
   exige a amostra planejada, distribuição equilibrada, intervalo de confiança
   que exclua zero e melhora observada de pelo menos o tamanho definido. Uma
   vencedora passa a ser exibida na entrada. O catálogo pode restaurá-la.

Durante uma rodada, uma mudança na revisão do deploy interrompe a distribuição
e impede a publicação da vencedora com os dados da versão anterior. No GTM,
encaminhe `ab_experiment_id` e `ab_variant` do `dataLayer` como parâmetros de
evento ao GA4. `page_slug` continua indicando a landing. Use o ID do experimento
ao filtrar A/B no GA4. Os códigos de atendimento ficam no painel e na mensagem.

Novos slugs de `lib/landing-pages.ts` são sincronizados ao abrir o painel.
Para uma landing independente, inclua `LandingMeasurement`, use os componentes
de CTA com medição e aplique `landingMetadata` aos metadados. Cadastre a URL pelo
painel ou inclua-a no catálogo padrão em `lib/ab/catalog.ts`.

O projeto usa Postgres no Neon. Configure `DATABASE_URL`, `AB_ADMIN_PASSWORD_HASH`,
`AB_SESSION_SECRET`, `AB_SIGNING_SECRET` e `CRON_SECRET` na Vercel.
Gere o hash da senha com `npm run ab:hash-password -- "sua-senha-segura"`.
Valide `npm run ab:migrate` em uma branch isolada com `DATABASE_URL_UNPOOLED`
apontando para a conexão direta dessa branch. Depois aplique as migrações no banco
de produção antes de liberar a versão do app. A migração preserva a publicação
da home, os experimentos e seus resultados. Use `npm run ab:test` para as regressões.
