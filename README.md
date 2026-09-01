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
