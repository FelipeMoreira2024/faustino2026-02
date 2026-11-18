import { Plus } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import { AdcWhatsAppLink } from "@/components/advogado-defesa-criminal/AdcWhatsAppLink";
import { ADC_CONTAINER, ADC_EYEBROW, ADC_H2 } from "@/components/advogado-defesa-criminal/ui";
import { faqs } from "@/lib/advogado-defesa-criminal";

/**
 * FAQ nativo em `<details>` com animação CSS progressiva e sem custo de JS,
 * alinhado 1:1 ao JSON-LD FAQPage.
 */
export function AdcFaq() {
  return (
    <section
      id="perguntas-frequentes"
      aria-labelledby="adc-faq-heading"
      className="section-paper adc-defer relative bg-paper text-ink"
    >
      <div className={`${ADC_CONTAINER} grid gap-10 py-16 lg:grid-cols-12 lg:gap-16 lg:py-28`}>
        <Reveal className="lg:col-span-4">
          <p className={`${ADC_EYEBROW} text-brass-deep`}>Dúvidas frequentes</p>
          <h2 id="adc-faq-heading" className={`${ADC_H2} mt-3 text-ink`}>
            Perguntas antes de falar com o advogado
          </h2>
          <p className="mt-4 leading-relaxed text-ink-soft [text-wrap:pretty]">
            Precisa confirmar um prazo, intimação ou situação de um familiar? Fale diretamente pelo
            WhatsApp.
          </p>
          <AdcWhatsAppLink
            section="faq"
            topic="adc_duvida"
            className="mt-6 inline-flex min-h-12 items-center gap-2 rounded-lg border border-ink/25 bg-white/75 px-5 text-[15px] font-semibold text-ink transition-colors hover:border-ink hover:bg-white"
          >
            <WhatsAppIcon className="h-5 w-5 shrink-0 text-[#128c4a]" />
            Tirar dúvida no WhatsApp
          </AdcWhatsAppLink>
        </Reveal>

        <Reveal delay={70} className="adc-faq lg:col-span-8">
          <div className="border-t border-ink/15">
            {faqs.map(({ question, answer }, index) => (
              <details key={question} open={index === 0} className="border-b border-ink/15">
                <summary className="flex min-h-[60px] cursor-pointer items-center justify-between gap-5 py-4 font-display text-[1.1rem] font-semibold leading-snug text-ink transition-colors hover:text-brass-deep sm:text-lg">
                  <span>{question}</span>
                  <Plus
                    className="adc-faq-icon h-5 w-5 shrink-0 text-brass-deep transition-transform duration-300"
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
