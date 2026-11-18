import {
  ArrowRight,
  FileWarning,
  Gavel,
  Lock,
  Scale,
  SearchCheck,
  Siren,
  TriangleAlert,
  type LucideIcon,
} from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { AdcWhatsAppLink } from "@/components/advogado-defesa-criminal/AdcWhatsAppLink";
import { ADC_CONTAINER, ADC_EYEBROW, ADC_H2 } from "@/components/advogado-defesa-criminal/ui";
import { urgencyScenarios } from "@/lib/advogado-defesa-criminal";

const scenarioIcons: LucideIcon[] = [Siren, FileWarning, SearchCheck, Lock, Scale, Gavel];

/**
 * Triagem em 1 toque por cenário: cada cartão explica em linguagem direta
 * por que agir agora protege o cliente e abre o WhatsApp com contexto próprio.
 */
export function AdcUrgencyGrid() {
  return (
    <section
      id="cenarios"
      aria-labelledby="adc-urgency-heading"
      className="relative border-t border-brass/15 bg-ink-elevated"
    >
      <div className={`${ADC_CONTAINER} py-14 lg:py-24`}>
        <Reveal>
          <p className={`${ADC_EYEBROW} text-brass`}>Atendimento imediato por cenário</p>
          <h2 id="adc-urgency-heading" className={`${ADC_H2} mt-3 max-w-2xl text-paper`}>
            Qual é a sua situação neste momento?
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted sm:text-[17px] [text-wrap:pretty]">
            Toque no quadro correspondente ao seu caso para falar diretamente com o Dr. Rodrigo no
            WhatsApp. Em prisões e intimações,{" "}
            <strong className="font-semibold text-paper">as primeiras decisões definem o processo</strong>.
          </p>
        </Reveal>

        <ul className="mt-9 grid gap-3.5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-4">
          {urgencyScenarios.map(({ key, tag, title, impact, ctaLabel, href }, index) => {
            const Icon = scenarioIcons[index] ?? Scale;
            return (
              <li key={key}>
                <Reveal delay={Math.min(index * 45, 180)} className="h-full">
                  <AdcWhatsAppLink
                    section="triagem"
                    href={href}
                    topic={key}
                    className="adc-card group flex h-full flex-col justify-between rounded-xl border border-brass/20 bg-ink p-5 sm:p-6"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-3">
                        <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-brass/25 bg-brass/10 text-brass transition-colors duration-300 group-hover:bg-brass/20">
                          <Icon className="h-5 w-5" strokeWidth={1.6} aria-hidden="true" />
                        </span>
                        <span className="rounded-full border border-brass/25 bg-ink-elevated px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-brass">
                          {tag}
                        </span>
                      </div>

                      <h3 className="mt-4 font-display text-[1.18rem] font-semibold leading-snug text-paper">
                        {title}
                      </h3>
                      <p className="mt-2 text-[14px] leading-relaxed text-muted [text-wrap:pretty]">
                        {impact}
                      </p>
                    </div>

                    <span className="mt-5 inline-flex items-center gap-1.5 border-t border-white/10 pt-3.5 text-[13.5px] font-semibold text-whatsapp">
                      {ctaLabel}
                      <ArrowRight
                        className="h-4 w-4 shrink-0 transition-transform duration-300 group-hover:translate-x-1"
                        strokeWidth={2}
                        aria-hidden="true"
                      />
                    </span>
                  </AdcWhatsAppLink>
                </Reveal>
              </li>
            );
          })}
        </ul>

        <Reveal delay={100}>
          <div className="mt-8 flex flex-col gap-3 rounded-xl border border-brass/40 bg-ink p-5 sm:flex-row sm:items-start sm:gap-4 sm:p-6">
            <TriangleAlert
              className="mt-0.5 h-5 w-5 shrink-0 text-brass"
              strokeWidth={1.7}
              aria-hidden="true"
            />
            <div>
              <p className="font-semibold text-paper">
                Regra essencial da defesa: nunca preste depoimento sem orientação prévia.
              </p>
              <p className="mt-1 text-[14.5px] leading-relaxed text-muted [text-wrap:pretty]">
                Ir à delegacia “apenas para esclarecer” sem que um advogado examine o procedimento
                antes é um dos erros que mais prejudicam a defesa. O direito ao silêncio é garantia
                constitucional.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
