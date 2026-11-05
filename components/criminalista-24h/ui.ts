/** Classes compartilhadas pelas seções da /criminalista-24h. */

export const CONTAINER = "mx-auto w-full max-w-6xl px-5 sm:px-8 lg:px-12";

/** Botão principal: verde só para ação de WhatsApp, 56px, texto em uma linha no celular. */
export const BTN_WA =
  "c24-btn-wa inline-flex min-h-[56px] w-full items-center justify-center gap-2.5 rounded-lg bg-whatsapp px-6 text-[17px] font-semibold leading-tight text-ink sm:w-auto sm:px-8";

export const EYEBROW = "text-xs font-semibold uppercase tracking-[0.16em]";

export const H2 =
  "font-display text-[2rem] font-semibold leading-[1.1] tracking-[-0.015em] sm:text-[2.55rem]";

export const AVATAR_SRC = "/images/criminalista-24h/dr-rodrigo-avatar.webp";

/** Âncoras observadas pela barra fixa (ficam aqui porque módulos "use client" não exportam constantes para o servidor). */
export const HERO_CTA_ID = "c24-hero-cta";
export const FINAL_CTA_ID = "cta-final";
