"use client";

import Image from "next/image";
import { useState } from "react";
import { Briefcase, Lock, ShieldCheck, Star } from "lucide-react";
import { PhoneLink } from "@/components/PhoneLink";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import { AdcWhatsAppLink } from "@/components/advogado-defesa-criminal/AdcWhatsAppLink";
import {
  ADC_AVATAR_SRC,
  ADC_BTN_WA,
  ADC_CONTAINER,
  ADC_HERO_CTA_ID,
  ADC_HERO_SRC,
} from "@/components/advogado-defesa-criminal/ui";
import {
  defaultWhatsAppHref,
  GOOGLE_RATING,
  GOOGLE_REVIEWS_COUNT,
  heroPresets,
} from "@/lib/advogado-defesa-criminal";
import { PHONE_DISPLAY } from "@/lib/site";
import { cn } from "@/lib/utils";

const trustPillars = [
  { icon: Briefcase, text: "Atendimento particular" },
  { icon: Lock, text: "Sigilo absoluto" },
  { icon: ShieldCheck, text: "Direto com o Dr. Rodrigo" },
];

/**
 * Primeira dobra orientada a conversão no Google Ads (mobile e desktop):
 * - Identidade real do advogado visível antes do H1;
 * - H1 com match exato de intenção ("Advogado Criminalista em Goiânia");
 * - Seletor opcional de 1 toque que pré-qualifica a mensagem do WhatsApp sem exigir passo extra;
 * - Dupla ação (WhatsApp principal + Ligação urgente) para atender quem está na delegacia;
 * - Retrato de novembro em alta prioridade de LCP.
 */
export function AdcHero() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const activePreset = heroPresets.find((preset) => preset.id === selectedId) ?? null;

  return (
    <section
      id="inicio"
      aria-labelledby="adc-hero-heading"
      className="relative overflow-clip bg-ink"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-44 -top-24 hidden h-[42rem] w-[42rem] rounded-full bg-[radial-gradient(closest-side,rgba(201,169,97,0.12),transparent)] lg:block"
      />

      <div
        className={`${ADC_CONTAINER} relative grid gap-9 pb-12 pt-5 sm:pt-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:gap-14 lg:pb-20 lg:pt-11`}
      >
        <div>
          <div className="inline-flex max-w-full items-center gap-3 rounded-full border border-brass/25 bg-ink-elevated/85 py-1.5 pl-1.5 pr-4">
            <span className="relative shrink-0">
              <Image
                src={ADC_AVATAR_SRC}
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
                <span className="hidden min-[360px]:inline"> · Atendimento particular 24h</span>
              </span>
            </p>
          </div>

          <h1
            id="adc-hero-heading"
            className="mt-5 font-display text-[clamp(2.05rem,8.4vw,3.95rem)] font-semibold leading-[1.04] tracking-[-0.022em] text-paper"
          >
            Advogado Criminalista em Goiânia
            <span className="mt-2 block text-[0.74em] italic leading-[1.1] tracking-[-0.012em] text-brass lg:text-[0.7em]">
              Defesa imediata, 24 horas
            </span>
          </h1>

          <p className="mt-4 max-w-[36rem] text-[16.5px] leading-relaxed text-muted sm:mt-5 sm:text-lg [text-wrap:pretty]">
            Prisão em flagrante, intimação para depor ou investigação em andamento? Fale{" "}
            <strong className="font-semibold text-paper">diretamente com o Dr. Rodrigo</strong> e
            receba orientação técnica imediata —{" "}
            <span className="text-paper/95">antes de prestar qualquer declaração</span>.
          </p>

          {/* Pré-seleção opcional em 1 toque (não bloqueia o clique direto no CTA) */}
          <div className="mt-5" role="group" aria-label="Selecione sua urgência antes de chamar">
            <p className="text-[12px] font-medium uppercase tracking-[0.12em] text-muted">
              Toque na sua urgência <span className="text-brass/90">(opcional)</span>:
            </p>
            <div className="mt-2.5 flex flex-wrap gap-2">
              {heroPresets.map((preset) => {
                const isSelected = preset.id === selectedId;
                return (
                  <button
                    key={preset.id}
                    type="button"
                    aria-pressed={isSelected}
                    onClick={() =>
                      setSelectedId((current) => (current === preset.id ? null : preset.id))
                    }
                    className={cn(
                      "min-h-[40px] cursor-pointer rounded-full border px-3.5 py-1.5 text-[13px] font-medium transition-colors duration-200",
                      isSelected
                        ? "border-brass bg-brass text-ink font-semibold"
                        : "border-brass/25 bg-ink-elevated text-paper/90 hover:border-brass/65 hover:bg-ink-elevated/90"
                    )}
                  >
                    {preset.label}
                  </button>
                );
              })}
            </div>
            <p
              aria-live="polite"
              className="mt-2 min-h-[1.25rem] text-[12.5px] text-brass/90"
            >
              {activePreset
                ? `Mensagem preparada: ${activePreset.preview}`
                : "Atendimento particular, sem robôs nem intermediários."}
            </p>
          </div>

          <div id={ADC_HERO_CTA_ID} className="mt-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <AdcWhatsAppLink
                section="hero"
                href={activePreset?.href ?? defaultWhatsAppHref}
                topic={activePreset?.topic}
                className={`${ADC_BTN_WA} adc-btn-hero sm:whitespace-nowrap`}
              >
                <WhatsAppIcon className="h-5 w-5 shrink-0" />
                Falar agora no WhatsApp
              </AdcWhatsAppLink>

              <PhoneLink
                section="hero"
                className="min-h-[56px] rounded-lg border-brass/35 px-5 text-[15px] sm:w-auto"
              >
                Ligar: {PHONE_DISPLAY}
              </PhoneLink>
            </div>

            <ul className="mt-3.5 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[13px] text-muted">
              {trustPillars.map(({ icon: Icon, text }) => (
                <li key={text} className="inline-flex items-center gap-1.5">
                  <Icon className="h-3.5 w-3.5 shrink-0 text-brass" strokeWidth={1.7} aria-hidden="true" />
                  <span>{text}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Credenciais objetivas e verificáveis */}
          <dl className="mt-7 grid max-w-[38rem] grid-cols-2 gap-y-4 border-y border-brass/15 py-4 sm:grid-cols-3 sm:gap-y-0 sm:divide-x sm:divide-brass/15">
            <div className="pr-3 sm:px-5 sm:first:pl-0">
              <dt className="sr-only">Avaliação pública no Google</dt>
              <dd className="flex items-center gap-1.5 font-display text-[1.5rem] font-semibold leading-none text-paper">
                {GOOGLE_RATING}
                <Star className="h-4 w-4 fill-brass text-brass" strokeWidth={1} aria-hidden="true" />
              </dd>
              <dd className="mt-1.5 text-[12px] leading-snug text-muted sm:text-[12.5px]">
                {GOOGLE_REVIEWS_COUNT} avaliações no Google
              </dd>
            </div>

            <div className="border-l border-brass/15 pl-4 sm:border-l-0 sm:px-5">
              <dt className="sr-only">Representação institucional</dt>
              <dd className="font-display text-[1.15rem] font-semibold leading-tight text-brass sm:text-[1.2rem]">
                ABRACRIM/GO
              </dd>
              <dd className="mt-1 text-[12px] leading-snug text-muted sm:text-[12.5px]">
                Pres. Direitos e Prerrogativas
              </dd>
            </div>

            <div className="col-span-2 border-t border-brass/15 pt-3.5 sm:col-span-1 sm:border-t-0 sm:pl-5 sm:pr-0 sm:pt-0">
              <dt className="sr-only">Localização e plantão</dt>
              <dd className="font-display text-[1.15rem] font-semibold leading-tight text-paper sm:text-[1.2rem]">
                Setor Marista
              </dd>
              <dd className="mt-1 text-[12px] leading-snug text-muted sm:text-[12.5px]">
                Sede em Goiânia · Plantão 24h
              </dd>
            </div>
          </dl>
        </div>

        {/* Retrato executivo real no escritório (candidato a LCP) */}
        <figure className="relative mx-auto w-full max-w-[30rem] lg:mr-0">
          <div className="adc-hero-frame relative aspect-[4/5] overflow-clip rounded-2xl border border-brass/25 bg-ink-elevated shadow-[0_28px_64px_-28px_rgba(0,0,0,0.9)]">
            <Image
              src={ADC_HERO_SRC}
              alt="Dr. Rodrigo Faustino, advogado criminalista em Goiânia, em seu escritório no Setor Marista"
              fill
              priority
              fetchPriority="high"
              quality={75}
              sizes="(min-width: 1024px) 30rem, (min-width: 640px) 30rem, calc(100vw - 2.5rem)"
              className="object-cover object-[center_10%]"
            />
          </div>

          <figcaption className="absolute inset-x-3 bottom-3 rounded-xl border border-brass/30 bg-ink/90 px-4 py-3 backdrop-blur-md sm:inset-x-4 sm:bottom-4 sm:px-5 sm:py-3.5">
            <div className="flex items-center justify-between gap-3">
              <div className="min-w-0">
                <span className="block truncate text-[15px] font-semibold text-paper">
                  Dr. Rodrigo Faustino
                </span>
                <span className="mt-0.5 block text-xs leading-snug text-brass">
                  Advogado de Defesa Criminal · Goiânia/GO
                </span>
              </div>
              <span className="hidden shrink-0 items-center gap-1.5 rounded-md border border-brass/30 bg-brass/10 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-paper sm:inline-flex">
                <span className="h-1.5 w-1.5 rounded-full bg-whatsapp" aria-hidden="true" />
                Plantão 24h
              </span>
            </div>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
