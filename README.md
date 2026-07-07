# Landing Page — Dr. Rodrigo Faustino, Advogado Criminalista (Goiânia)

Landing page de conversão mobile-first, 100% WhatsApp, construída sobre a copy de `docs/copy.md` (fonte da verdade — 13 seções, deep-links pré-preenchidos, conformidade com o Provimento 205/2021 da OAB).

## Stack

- Next.js 15 (App Router) + TypeScript
- Tailwind CSS 4 (tokens em CSS variables em `app/globals.css`)
- shadcn/ui (apenas Accordion, via Radix)
- lucide-react (ícones em stroke fino)
- Sem bibliotecas de animação — CSS transitions + IntersectionObserver

## Rodando

```bash
npm install
npm run dev    # desenvolvimento
npm run build  # build de produção
npm run start  # servir build
```

## Estrutura

- `app/page.tsx` — montagem das seções, hairline assinatura e JSON-LD (LegalService + FAQPage)
- `components/sections/` — um componente por seção, na ordem da copy
- `components/WhatsAppButton.tsx` — CTA centralizado com evento `lead_whatsapp_rodrigo_faustino_v2` no `dataLayer` e delay de 300ms antes do WhatsApp
- `lib/whatsapp.ts` — deep-links da Seção 13 (padrão, flagrante, sigilo)
- `lib/faq.ts` — perguntas da Seção 10, compartilhadas entre o accordion e o schema FAQPage

## Tokens de design

| Token | Valor | Uso |
| --- | --- | --- |
| `--ink` | `#101418` | background principal |
| `--ink-elevated` | `#1A2028` | cards e superfícies elevadas |
| `--brass` | `#C9A961` | eyebrows, hairlines, ícones — nunca em botões |
| `--paper` | `#F2EFE9` | texto sobre dark; fundo das seções 4, 7, 10 e 11 |
| `--muted` | `#8B93A1` | texto secundário sobre dark |
| `--whatsapp` | `#25D366` | exclusivo dos CTAs de WhatsApp e do ponto de plantão |

`--brass-deep` e `--ink-soft` são derivados internos para garantir contraste AA sobre `--paper`.

## Fotografia

Substitua `public/images/dr-rodrigo-hero.jpg` pela foto real do Dr. Rodrigo (retrato vertical 4:5). O duotone ink/brass é aplicado via CSS (`.duotone`). Os três slots de credenciais na seção Autoridade são placeholders — troque pelas fotos com autoridades quando autorizadas.

## QA

Scripts de verificação em `scripts/` (requerem o servidor rodando em `localhost:3000`):

- `node scripts/check-copy.mjs` — confere a copy renderizada contra a copy.md, os 3 deep-links e os JSON-LD
- `node scripts/qa-viewport.mjs` — overflow em 390px, botão flutuante, dataLayer e altura dos CTAs
- `node scripts/qa-fullpage.mjs` — screenshots de página inteira

## Deploy

Pronto para Vercel: `vercel deploy`. Defina `NEXT_PUBLIC_GTM_ID` para carregar o container do Google Tag Manager — os cliques de WhatsApp empurram o evento `lead_whatsapp_rodrigo_faustino_v2` para `window.dataLayer`.
