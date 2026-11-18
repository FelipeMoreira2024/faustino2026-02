import Image from "next/image";
import { ShieldCheck, Star, Lock, Briefcase } from "lucide-react";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import { LivePlantaoBadge } from "@/components/advogado-criminal/LivePlantaoBadge";
import { AcWhatsAppLink } from "@/components/advogado-criminal/WhatsAppCta";
import {
  AC_AVATAR_SRC,
  AC_BTN_WA,
  AC_CONTAINER,
  AC_HERO_CTA_ID,
} from "@/components/advogado-criminal/ui";
import { GOOGLE_RATING, GOOGLE_REVIEWS_COUNT } from "@/lib/advogado-criminal";

const microPillars = [
  { icon: Briefcase, text: "Atendimento particular" },
  { icon: Lock, text: "Sigilo absoluto" },
  { icon: ShieldCheck, text: "Sem julgamento" },
];

/**
 * Primeira dobra desenhada para alta conversão e pré-fechamento:
 * - Identidade real do Dr. Rodrigo visível imediatamente no celular antes do H1;
 * - H1 alinhado 1:1 com a busca de alta intenção no Google Ads;
 * - Subtítulo que cria urgência real tanto para flagrante quanto para intimação/inquérito;
 * - Credenciais objetivas (4,9 ★ · 249 avaliações, +950 casos, ABRACRIM/GO) sem superlativos;
 * - Retrato real em estúdio no escritório do Setor Marista com prioridade máxima de LCP.
 */
export function AcHero() {
  return (
    <section
      id="inicio"
      aria-labelledby="ac-hero-heading"
      className="relative overflow-clip bg-ink"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-44 -top-24 hidden h-[42rem] w-[42rem] rounded-full bg-[radial-gradient(closest-side,rgba(201,169,97,0.12),transparent)] lg:block"
      />

      <div
        className={`${AC_CONTAINER} relative grid gap-9 pb-12 pt-5 sm:pt-9 lg:grid-cols-[1.13fr_0.87fr] lg:items-center lg:gap-14 lg:pb-20 lg:pt-12`}
      >
        <div>
          {/* Identificação direta do advogado titular logo no topo */}
          <div className="inline-flex max-w-full items-center gap-3 rounded-full border border-brass/25 bg-ink-elevated/80 py-1.5 pl-1.5 pr-4">
            <span className="relative shrink-0">
              <Image
                src={AC_AVATAR_SRC}
                alt=""
                width={44}
                height={44}
                priority
                className="h-11 w-11 rounded-full border border-brass/45 object-cover"
              />
              <span
                aria-hidden="true"
                className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-ink bg-whatsapp"
              />
            </span>
            <p className="min-w-0 leading-tight">
              <span className="block truncate text-[14px] font-semibold text-paper sm:text-[15px]">
                Dr. Rodrigo Faustino
              </span>
              <span className="mt-0.5 block truncate text-[12px] text-brass sm:text-[12.5px]">
                Defesa Criminal
                <span className="hidden min-[360px]:inline"> · Atendimento direto</span>
              </span>
            </p>
          </div>

          <h1
            id="ac-hero-heading"
            className="mt-5 font-display text-[clamp(2.1rem,8.6vw,4.05rem)] font-semibold leading-[1.04] tracking-[-0.022em] text-paper"
          >
            Advogado Criminalista em Goiânia
            <span className="mt-2 block text-[0.75em] italic leading-[1.1] tracking-[-0.012em] text-brass lg:text-[0.71em]">
              Defesa imediata, 24 horas
            </span>
          </h1>

          <p className="mt-4 max-w-[35rem] text-[16.5px] leading-relaxed text-muted sm:mt-5 sm:text-lg [text-wrap:pretty]">
            Familiar preso agora, intimação para depor ou investigação em andamento? Fale{" "}
            <strong className="font-semibold text-paper">diretamente com o Dr. Rodrigo</strong> no
            WhatsApp e receba orientação técnica imediata —{" "}
            <span className="text-paper/90">antes de qualquer depoimento</span>.
          </p>

          <div id={AC_HERO_CTA_ID} className="mt-6">
            <LivePlantaoBadge className="mb-3" />

            <AcWhatsAppLink section="hero" className={`${AC_BTN_WA} ac-btn-hero`}>
              <WhatsAppIcon className="h-5 w-5 shrink-0" />
              Falar agora com o Dr. Rodrigo
            </AcWhatsAppLink>

            <ul className="mt-3.5 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[13px] text-muted">
              {microPillars.map(({ icon: Icon, text }) => (
                <li key={text} className="inline-flex items-center gap-1.5">
                  <Icon className="h-3.5 w-3.5 shrink-0 text-brass" strokeWidth={1.7} aria-hidden="true" />
                  <span>{text}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Faixa de credibilidade objetiva e verificável */}
          <dl className="mt-8 grid max-w-[36rem] grid-cols-2 gap-y-4 border-y border-brass/15 py-4 sm:grid-cols-3 sm:gap-y-0 sm:divide-x sm:divide-brass/15">
            <div className="pr-3 sm:px-5 sm:first:pl-0">
              <dt className="sr-only">Avaliação no Google</dt>
              <dd className="flex items-center gap-1.5 font-display text-[1.55rem] font-semibold leading-none text-paper">
                {GOOGLE_RATING}
                <Star className="h-4 w-4 fill-brass text-brass" strokeWidth={1} aria-hidden="true" />
              </dd>
              <dd className="mt-1.5 text-[12px] leading-snug text-muted sm:text-[12.5px]">
                {GOOGLE_REVIEWS_COUNT} avaliações no Google
              </dd>
            </div>

            <div className="border-l border-brass/15 pl-4 sm:border-l-0 sm:px-5">
              <dt className="sr-only">Experiência comprovada</dt>
              <dd className="font-display text-[1.55rem] font-semibold leading-none text-paper">
                +950
              </dd>
              <dd className="mt-1.5 text-[12px] leading-snug text-muted sm:text-[12.5px]">
                defesas criminais conduzidas
              </dd>
            </div>

            <div className="col-span-2 border-t border-brass/15 pt-3.5 sm:col-span-1 sm:border-t-0 sm:pl-5 sm:pr-0 sm:pt-0">
              <dt className="sr-only">Representação institucional</dt>
              <dd className="font-display text-[1.15rem] font-semibold leading-tight text-brass sm:text-[1.2rem]">
                ABRACRIM/GO
              </dd>
              <dd className="mt-1 text-[12px] leading-snug text-muted sm:text-[12.5px]">
                Pres. Comissão de Direitos e Prerrogativas
              </dd>
            </div>
          </dl>
        </div>

        {/* Retrato executivo real no Setor Marista (LCP candidate) */}
        <figure className="relative mx-auto w-full max-w-[32rem] lg:mr-0">
          <div className="ac-hero-frame relative aspect-[4/5] overflow-clip rounded-2xl border border-brass/25 bg-ink-elevated shadow-[0_28px_64px_-28px_rgba(0,0,0,0.9)]">
            <Image
              src="/images/advogado-criminal/dr-rodrigo-hero.webp"
              alt="Dr. Rodrigo Faustino, advogado criminalista em Goiânia, em seu escritório no Setor Marista"
              fill
              priority
              fetchPriority="high"
              quality={75}
              sizes="(min-width: 1024px) 32rem, (min-width: 640px) 32rem, calc(100vw - 2.5rem)"
              className="object-cover object-[center_12%]"
            />
          </div>

          <figcaption className="absolute inset-x-3 bottom-3 rounded-xl border border-brass/30 bg-ink/90 px-4 py-3 backdrop-blur-md sm:inset-x-4 sm:bottom-4 sm:px-5 sm:py-3.5">
            <div className="flex items-center justify-between gap-3">
              <div className="min-w-0">
                <span className="block truncate text-[15px] font-semibold text-paper">
                  Dr. Rodrigo Faustino
                </span>
                <span className="mt-0.5 block text-xs leading-snug text-brass">
                  Advogado de Defesa Criminal · Setor Marista, Goiânia
                </span>
              </div>
              <span className="hidden shrink-0 rounded-md border border-brass/30 bg-brass/10 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-paper sm:inline-block">
                24 horas
              </span>
            </div>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
