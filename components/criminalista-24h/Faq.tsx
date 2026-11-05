import { Plus } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import { C24WhatsAppLink } from "@/components/criminalista-24h/WhatsAppLink";
import { CONTAINER, EYEBROW, H2 } from "@/components/criminalista-24h/ui";
import { faqs } from "@/lib/criminalista-24h";

/** `<details>` nativo: acessível e sem JavaScript. A primeira pergunta já vem aberta. */
export function C24Faq() {
  return (
    <section id="perguntas-frequentes" className="section-paper cv-auto relative bg-paper text-ink">
      <div className={`${CONTAINER} grid gap-10 py-16 lg:grid-cols-12 lg:gap-16 lg:py-28`}>
        <Reveal className="lg:col-span-4">
          <p className={`${EYEBROW} text-brass-deep`}>Dúvidas comuns</p>
          <h2 className={`${H2} mt-3 text-ink`}>Perguntas frequentes</h2>
          <p className="mt-5 leading-relaxed text-ink-soft">
            Não encontrou a sua dúvida? Pergunte direto ao advogado, a qualquer hora.
          </p>
          <C24WhatsAppLink
            section="faq"
            topic="duvida"
            className="mt-6 inline-flex min-h-12 items-center gap-2 rounded-lg border border-ink/20 px-5 font-semibold text-ink transition-colors hover:border-ink hover:bg-ink/5"
          >
            <WhatsAppIcon className="h-5 w-5 shrink-0 text-[#128c4a]" />
            Perguntar no WhatsApp
          </C24WhatsAppLink>
        </Reveal>

        <Reveal delay={80} className="c24-faq lg:col-span-8">
          <div className="border-t border-ink/15">
            {faqs.map(({ question, answer }, i) => (
              <details key={question} open={i === 0} className="group border-b border-ink/15">
                <summary className="flex min-h-[60px] cursor-pointer items-center justify-between gap-6 py-4 font-display text-lg font-semibold text-ink transition-colors hover:text-brass-deep">
                  {question}
                  <Plus
                    className="c24-faq-icon h-5 w-5 shrink-0 text-brass-deep transition-transform duration-300"
                    strokeWidth={1.8}
                    aria-hidden="true"
                  />
                </summary>
                <p className="pb-6 pr-10 leading-relaxed text-ink-soft">{answer}</p>
              </details>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
