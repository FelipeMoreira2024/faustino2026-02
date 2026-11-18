import { Plus } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import { AcWhatsAppLink } from "@/components/advogado-criminal/WhatsAppCta";
import { AC_CONTAINER, AC_EYEBROW, AC_H2 } from "@/components/advogado-criminal/ui";
import { faqs } from "@/lib/advogado-criminal";

/**
 * FAQ construído com `<details>` nativos (sem headings dentro de `<summary>`,
 * não-exclusivo para permitir leitura comparativa e sem custo de JS).
 */
export function AcFaqSection() {
  return (
    <section
      id="perguntas-frequentes"
      aria-labelledby="ac-faq-heading"
      className="section-paper ac-defer relative bg-paper text-ink"
    >
      <div className={`${AC_CONTAINER} grid gap-10 py-16 lg:grid-cols-12 lg:gap-16 lg:py-28`}>
        <Reveal className="lg:col-span-4">
          <p className={`${AC_EYEBROW} text-brass-deep`}>Dúvidas frequentes</p>
          <h2 id="ac-faq-heading" className={`${AC_H2} mt-3 text-ink`}>
            Perguntas antes de falar com o advogado
          </h2>
          <p className="mt-4 leading-relaxed text-ink-soft [text-wrap:pretty]">
            Se a sua dúvida for específica sobre prazos, intimação ou situação de um familiar, fale
            diretamente pelo WhatsApp.
          </p>
          <AcWhatsAppLink
            section="faq"
            topic="ac_duvida"
            className="mt-6 inline-flex min-h-12 items-center gap-2 rounded-lg border border-ink/25 bg-white/70 px-5 text-[15px] font-semibold text-ink transition-colors hover:border-ink hover:bg-white"
          >
            <WhatsAppIcon className="h-5 w-5 shrink-0 text-[#128c4a]" />
            Tirar dúvida no WhatsApp
          </AcWhatsAppLink>
        </Reveal>

        <Reveal delay={70} className="ac-faq lg:col-span-8">
          <div className="border-t border-ink/15">
            {faqs.map(({ question, answer }, index) => (
              <details key={question} open={index === 0} className="border-b border-ink/15">
                <summary className="flex min-h-[60px] cursor-pointer items-center justify-between gap-5 py-4 font-display text-[1.1rem] font-semibold leading-snug text-ink transition-colors hover:text-brass-deep sm:text-lg">
                  <span>{question}</span>
                  <Plus
                    className="ac-faq-icon h-5 w-5 shrink-0 text-brass-deep transition-transform duration-300"
                    strokeWidth={1.8}
                    aria-hidden="true"
                  />
                </summary>
                <p className="pb-5 pr-8 text-[15.5px] leading-relaxed text-ink-soft [text-wrap:pretty]">
                  {answer}
                </p>
              </details>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
