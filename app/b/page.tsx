/**
 * /b = a mesma página da /criminalista-24h, para testar no painel A/B no lugar
 * da antiga variante B (que agora mora em /home-b).
 *
 * Reexporta a página, os metadados e o viewport: qualquer ajuste na
 * /criminalista-24h vale aqui também. Os eventos de lead seguem com
 * `page_slug: "criminalista-24h"` e `ab_variant: "c"`. O acesso direto a /b
 * recebe `X-Robots-Tag: noindex` pelo `next.config.ts`.
 */
export { default, metadata, viewport } from "../criminalista-24h/page";
