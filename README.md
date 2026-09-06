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
- `app/b/page.tsx` — **variante B da home** para teste A/B (`noindex`, canonical `/`). Seções alteradas em `components/sections/home-b/`; o restante é compartilhado. Leads saem com `page_slug: "home-b"` e `ab_variant: "b"`; cliques em telefone disparam `lead_phone_rodrigo_faustino_v2`.
- `app/[slug]/page.tsx` — nove landings
- `lib/landing-pages.ts` — conteúdo das landings
- `lib/site.ts` — domínio, NAP, JSON-LD institucional
- `components/WhatsAppButton.tsx` — contato WhatsApp; evento `lead_whatsapp_rodrigo_faustino_v2` só após consentimento de métricas
- `lib/whatsapp.ts` — deep-links
- `app/sitemap.xml/route.ts` e `app/robots.txt/route.ts` — respostas por `Host`

## QA

Scripts em `scripts/` (servidor em `localhost:3000`):

- `node scripts/check-copy.mjs`
- `node scripts/check-seo.mjs`
- `node scripts/qa-viewport.mjs`

## Deploy

Vercel. `NEXT_PUBLIC_GTM_ID` carrega o GTM **somente** depois de aceitar cookies de métricas.

## Testes A/B

O painel privado fica em `/admin/experimentos`. Ele distribui a home 50/50,
mantém a página por navegador e mede uma conversão por sessão de 30 minutos.

1. Crie um Neon Postgres pelo Marketplace da Vercel e conecte-o ao projeto.
2. Execute `db/001_ab_testing.sql` no console SQL do banco.
3. Gere o hash da senha com `npm run ab:hash-password -- "sua-senha-segura"`.
4. Configure na Vercel: `DATABASE_URL`, `AB_ADMIN_PASSWORD_HASH`,
   `AB_SESSION_SECRET`, `AB_SIGNING_SECRET` e `CRON_SECRET`.
5. Faça o deploy, entre no painel, confira as páginas `/` e `/b` e inicie o teste.

Use valores aleatórios longos e diferentes para os três segredos. A coleta própria
é independente do GTM; o Google Analytics continua condicionado ao consentimento.
