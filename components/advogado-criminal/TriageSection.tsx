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
import { AcWhatsAppLink } from "@/components/advogado-criminal/WhatsAppCta";
import { AC_CONTAINER, AC_EYEBROW, AC_H2 } from "@/components/advogado-criminal/ui";
import { triageItems } from "@/lib/advogado-criminal";

const triageIcons: LucideIcon[] = [Siren, FileWarning, SearchCheck, Lock, Gavel, Scale];

/**
 * Triagem ativa por cenário: em vez de apenas listar problemas, mostra em cada
 * cartão por que agir agora protege o cliente e abre o WhatsApp em 1 toque.
 */
export function AcTriageSection() {
  return (
    <section
      id="triagem"
      aria-labelledby="ac-triage-heading"
      className="relative border-t border-brass/15 bg-ink"
    >
      <div className={`${AC_CONTAINER} py-14 lg:py-24`}>
        <Reveal>
          <p className={`${AC_EYEBROW} text-brass`}>Diagnóstico rápido</p>
          <h2 id="ac-triage-heading" className={`${AC_H2} mt-3 max-w-2xl text-paper`}>
            Qual é a sua situação neste momento?
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted sm:text-[17px] [text-wrap:pretty]">
            Selecione o cenário mais próximo do seu caso para iniciar o atendimento direto com o
            Dr. Rodrigo no WhatsApp. Em prisões e intimações,{" "}
            <strong className="font-semibold text-paper">o tempo define a defesa</strong>.
          </p>
        </Reveal>

        <ul className="mt-9 grid gap-3.5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-4">
          {triageItems.map(({ key, tag, title, impact, ctaLabel }, index) => {
            const Icon = triageIcons[index] ?? Scale;
            return (
              <li key={key}>
                <Reveal delay={Math.min(index * 45, 180)} className="h-full">
                  <AcWhatsAppLink
                    section="triagem"
                    topic={key}
                    className="ac-triage-card group flex h-full flex-col justify-between rounded-xl border border-brass/20 bg-ink-elevated p-5 sm:p-6"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-3">
                        <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-brass/25 bg-brass/10 text-brass transition-colors duration-300 group-hover:bg-brass/20">
                          <Icon className="h-5 w-5" strokeWidth={1.6} aria-hidden="true" />
                        </span>
                        <span className="rounded-full border border-brass/25 bg-ink/60 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-brass">
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
                  </AcWhatsAppLink>
                </Reveal>
              </li>
            );
          })}
        </ul>

        <Reveal delay={100}>
          <div className="mt-8 flex flex-col gap-3 rounded-xl border border-brass/40 bg-brass/[0.07] p-5 sm:flex-row sm:items-start sm:gap-4 sm:p-6">
            <TriangleAlert
              className="mt-0.5 h-5 w-5 shrink-0 text-brass"
              strokeWidth={1.7}
              aria-hidden="true"
            />
            <div>
              <p className="font-semibold text-paper">
                Regra nº 1 da defesa criminal: nunca preste depoimento sem orientação prévia.
              </p>
              <p className="mt-1 text-[14.5px] leading-relaxed text-muted [text-wrap:pretty]">
                Ir à delegacia “apenas para esclarecer” sem consultar os autos antes é o erro que
                mais transforma investigados em réus. O direito ao silêncio orientado é garantido
                pela Constituição.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
