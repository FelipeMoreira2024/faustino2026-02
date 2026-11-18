import { Check } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import { AcWhatsAppLink } from "@/components/advogado-criminal/WhatsAppCta";
import { AC_BTN_WA, AC_CONTAINER, AC_EYEBROW, AC_H2 } from "@/components/advogado-criminal/ui";
import { criticalWindows, familyActionSteps } from "@/lib/advogado-criminal";

/**
 * Explica concretamente o valor técnico das primeiras horas (delegacia, custódia
 * e inquérito) para eliminar a objeção "vou esperar para ver o que acontece".
 */
export function AcCriticalHours() {
  return (
    <section
      id="primeiras-horas"
      aria-labelledby="ac-hours-heading"
      className="section-paper ac-defer relative bg-paper text-ink"
    >
      <div className={`${AC_CONTAINER} py-16 lg:py-28`}>
        <Reveal>
          <p className={`${AC_EYEBROW} text-brass-deep`}>Estratégia desde o início</p>
          <h2 id="ac-hours-heading" className={`${AC_H2} mt-3 max-w-3xl text-ink`}>
            Por que as primeiras horas definem o rumo de uma defesa criminal
          </h2>
          <p className="mt-4 max-w-2xl text-[16.5px] leading-relaxed text-ink-soft sm:text-[17px] [text-wrap:pretty]">
            Muitos prejuízos em processos criminais acontecem antes mesmo da denúncia — por falta de
            acompanhamento técnico na delegacia ou na audiência de custódia. Veja como atuamos em
            cada janela crítica:
          </p>
        </Reveal>

        <ol className="mt-11 grid gap-6 lg:grid-cols-3 lg:gap-7">
          {criticalWindows.map(({ step, when, title, text }, index) => (
            <li key={step}>
              <Reveal delay={index * 70} className="h-full">
                <div className="flex h-full flex-col rounded-2xl border border-ink/15 bg-white/60 p-6 sm:p-7">
                  <div className="flex items-center justify-between gap-3 border-b border-ink/10 pb-4">
                    <span
                      aria-hidden="true"
                      className="font-display text-4xl font-semibold leading-none text-brass-deep"
                    >
                      {step}
                    </span>
                    <span className="text-right text-[11px] font-semibold uppercase tracking-[0.13em] text-brass-deep">
                      {when}
                    </span>
                  </div>
                  <h3 className="mt-5 font-display text-xl font-semibold text-ink">{title}</h3>
                  <p className="mt-2.5 text-[15px] leading-relaxed text-ink-soft [text-wrap:pretty]">
                    {text}
                  </p>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>

        <Reveal delay={100}>
          <div className="mt-12 rounded-2xl bg-ink p-6 text-paper shadow-[0_24px_56px_-28px_rgba(16,20,24,0.65)] sm:p-8 lg:grid lg:grid-cols-[1.22fr_0.78fr] lg:items-center lg:gap-12 lg:p-10">
            <div>
              <p className={`${AC_EYEBROW} text-brass`}>Guia imediato para familiares</p>
              <h3 className="mt-2.5 font-display text-2xl font-semibold text-paper sm:text-[1.7rem]">
                Um familiar acabou de ser preso? Faça isto agora:
              </h3>
              <ul className="mt-5 space-y-3.5">
                {familyActionSteps.map((step) => (
                  <li key={step} className="flex items-start gap-3 text-[15px] leading-relaxed">
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
              <AcWhatsAppLink
                section="primeiras-horas"
                topic="ac_triagem_1"
                className={`${AC_BTN_WA} lg:w-full`}
              >
                <WhatsAppIcon className="h-5 w-5 shrink-0" />
                Acionar plantão 24h agora
              </AcWhatsAppLink>
              <p className="mt-3 text-[13px] leading-relaxed text-muted">
                Atendimento imediato inclusive à noite, de madrugada, fins de semana e feriados em
                Goiânia e Aparecida de Goiânia.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
