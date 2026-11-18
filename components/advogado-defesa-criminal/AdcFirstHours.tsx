import Image from "next/image";
import { Check } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import { AdcWhatsAppLink } from "@/components/advogado-defesa-criminal/AdcWhatsAppLink";
import {
  ADC_BTN_WA,
  ADC_CONTAINER,
  ADC_EYEBROW,
  ADC_H2,
} from "@/components/advogado-defesa-criminal/ui";
import { criticalPhases, familyChecklist, urgencyScenarios } from "@/lib/advogado-defesa-criminal";

/**
 * Combina retrato real em mesa de trabalho com as 3 janelas decisivas da defesa
 * (Delegacia, Audiência de Custódia e Inquérito/HC) e guia prático imediato para familiares.
 */
export function AdcFirstHours() {
  return (
    <section
      id="primeiras-horas"
      aria-labelledby="adc-hours-heading"
      className="adc-defer relative bg-ink text-paper"
    >
      <div className={`${ADC_CONTAINER} py-16 lg:py-28`}>
        <div className="grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-14">
          <Reveal className="lg:col-span-5">
            <figure>
              <div className="relative aspect-[4/5] w-full overflow-clip rounded-2xl border border-brass/20 bg-ink-elevated shadow-[0_24px_56px_-24px_rgba(0,0,0,0.85)]">
                <Image
                  src="/images/advogado-defesa-criminal/escritorio-mesa.webp"
                  alt="Dr. Rodrigo Faustino analisando autos em sua mesa no Setor Marista, em Goiânia"
                  fill
                  loading="lazy"
                  quality={75}
                  sizes="(min-width: 1024px) 26rem, (min-width: 640px) 34rem, calc(100vw - 2.5rem)"
                  className="object-cover object-center"
                />
              </div>
              <figcaption className="mt-3 text-xs leading-relaxed text-muted">
                Análise técnica prévia dos autos antes de qualquer oitiva ou manifestação.
              </figcaption>
            </figure>
          </Reveal>

          <div className="lg:col-span-7">
            <Reveal>
              <p className={`${ADC_EYEBROW} text-brass`}>Estratégia desde o primeiro minuto</p>
              <h2 id="adc-hours-heading" className={`${ADC_H2} mt-3 text-paper`}>
                Por que as primeiras horas definem o rumo da defesa criminal
              </h2>
              <p className="mt-4 max-w-2xl text-[16px] leading-relaxed text-muted sm:text-[17px] [text-wrap:pretty]">
                Grande parte dos prejuízos em processos penais acontece antes mesmo da denúncia, por
                falta de defesa técnica na delegacia ou na custódia. Veja como agimos:
              </p>
            </Reveal>

            <ol className="mt-8 space-y-5">
              {criticalPhases.map(({ step, when, title, text }, index) => (
                <li key={step}>
                  <Reveal delay={index * 65}>
                    <div className="rounded-xl border border-brass/18 bg-ink-elevated p-5 sm:p-6">
                      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-3">
                        <span className="font-display text-2xl font-semibold leading-none text-brass">
                          {step}
                        </span>
                        <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-brass">
                          {when}
                        </span>
                      </div>
                      <h3 className="mt-3.5 font-display text-xl font-semibold text-paper">
                        {title}
                      </h3>
                      <p className="mt-1.5 text-[14.5px] leading-relaxed text-muted [text-wrap:pretty]">
                        {text}
                      </p>
                    </div>
                  </Reveal>
                </li>
              ))}
            </ol>
          </div>
        </div>

        <Reveal delay={100}>
          <div className="mt-12 rounded-2xl border border-brass/30 bg-ink-elevated p-6 sm:p-8 lg:grid lg:grid-cols-[1.22fr_0.78fr] lg:items-center lg:gap-12 lg:p-10">
            <div>
              <p className={`${ADC_EYEBROW} text-brass`}>Guia imediato para familiares</p>
              <h3 className="mt-2.5 font-display text-2xl font-semibold text-paper sm:text-[1.7rem]">
                Um familiar acabou de ser preso? Faça isto nos próximos 10 minutos:
              </h3>
              <ul className="mt-5 space-y-3.5">
                {familyChecklist.map((step) => (
                  <li key={step} className="flex items-start gap-3 text-[15px] leading-relaxed text-paper">
                    <Check
                      className="mt-1 h-4 w-4 shrink-0 text-brass"
                      strokeWidth={2.3}
                      aria-hidden="true"
                    />
                    <span className="[text-wrap:pretty]">{step}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-7 border-t border-brass/15 pt-6 lg:mt-0 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
              <AdcWhatsAppLink
                section="primeiras-horas"
                href={urgencyScenarios[0].href}
                topic="adc_cenario_1"
                className={`${ADC_BTN_WA} lg:w-full`}
              >
                <WhatsAppIcon className="h-5 w-5 shrink-0" />
                Acionar plantão 24h agora
              </AdcWhatsAppLink>
              <p className="mt-3 text-[13px] leading-relaxed text-muted">
                Atendimento imediato à noite, de madrugada, fins de semana e feriados em Goiânia e
                Aparecida de Goiânia.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
