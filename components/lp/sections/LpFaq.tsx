import { Plus } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { LpWhatsAppLink } from "@/components/lp/LpWhatsAppLink";
import { CONTAINER, SectionLabel } from "@/components/lp/ui";
import { faqs } from "@/lib/lp-defesa-criminal";

export function LpFaq() {
  return (
    <section id="perguntas" className="section-paper cv-auto bg-paper text-ink">
      <div className={`${CONTAINER} grid gap-10 py-16 lg:grid-cols-12 lg:gap-16 lg:py-28`}>
        <Reveal className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <SectionLabel numeral="VIII" tone="paper">
              Perguntas frequentes
            </SectionLabel>
            <h2 className="lp-serif mt-5 text-[2rem] font-medium leading-[1.1] tracking-[-0.02em] sm:text-[2.6rem] lg:text-[2.25rem]">
              O que perguntam no primeiro contato.
            </h2>
            <p className="mt-5 leading-relaxed text-ink-soft">
              Não encontrou a sua dúvida?{" "}
              <LpWhatsAppLink section="perguntas" topic="duvida" className="link-underline font-semibold text-ink">
                Pergunte diretamente ao advogado
              </LpWhatsAppLink>
              .
            </p>
          </div>
        </Reveal>

        <Reveal delay={80} className="lg:col-span-8">
          <div className="lp-faq border-t border-ink/15">
            {faqs.map((faq, index) => (
              <details key={faq.question} className="group border-b border-ink/15" open={index === 0}>
                <summary className="flex min-h-[4.25rem] items-center justify-between gap-6 py-5">
                  <span className="lp-serif text-[1.2rem] font-medium leading-snug sm:text-[1.3rem]">
                    {faq.question}
                  </span>
                  <span
                    aria-hidden="true"
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-ink/20 text-brass-deep transition-colors group-hover:border-ink/50"
                  >
                    <Plus className="lp-faq-icon h-4 w-4" strokeWidth={1.6} />
                  </span>
                </summary>
                <p className="max-w-2xl pb-6 leading-relaxed text-ink-soft sm:pr-14">{faq.answer}</p>
              </details>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
