import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import { Reveal } from "@/components/Reveal";
import { LpWhatsAppLink } from "@/components/lp/LpWhatsAppLink";
import { CONTAINER, SectionLabel } from "@/components/lp/ui";
import { steps } from "@/lib/lp-defesa-criminal";

export function LpProcess() {
  return (
    <section id="como-funciona" className="section-paper cv-auto bg-paper text-ink">
      <div className={`${CONTAINER} py-16 lg:py-28`}>
        <Reveal>
          <div className="grid gap-5 lg:grid-cols-12 lg:items-end lg:gap-16">
            <div className="lg:col-span-6">
              <SectionLabel numeral="VI" tone="paper">
                Como funciona
              </SectionLabel>
              <h2 className="lp-serif mt-5 text-[2rem] font-medium leading-[1.1] tracking-[-0.02em] sm:text-[2.6rem]">
                Do primeiro contato à defesa constituída.
              </h2>
            </div>
            <p className="max-w-lg leading-relaxed text-ink-soft lg:col-span-6">
              Sem formulário e sem cadastro. Você explica a situação, e o advogado avalia o que
              precisa ser feito primeiro.
            </p>
          </div>
        </Reveal>

        <ol className="mt-14 grid gap-10 lg:mt-16 lg:grid-cols-3 lg:gap-12">
          {steps.map((step, index) => (
            <li key={step.title}>
              <Reveal delay={index * 80}>
                <div className="border-t border-ink/20 pt-6">
                  <span
                    aria-hidden="true"
                    className="lp-serif block text-[3.5rem] font-light leading-none tracking-[-0.03em] text-brass-deep"
                  >
                    {index + 1}
                  </span>
                  <h3 className="lp-serif mt-5 text-[1.35rem] font-medium leading-snug">{step.title}</h3>
                  <p className="mt-3 leading-relaxed text-ink-soft">{step.text}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>

        <Reveal delay={120}>
          <div className="mt-14 flex flex-col gap-4 border-t border-ink/15 pt-10 sm:flex-row sm:items-center sm:justify-between">
            <p className="lp-serif max-w-md text-xl italic leading-snug">
              Quanto antes a defesa começa, mais caminhos ela tem.
            </p>
            <LpWhatsAppLink section="como-funciona" className="lp-btn lp-btn-wa w-full sm:w-auto">
              <WhatsAppIcon className="h-5 w-5 shrink-0" />
              Contar o que aconteceu
            </LpWhatsAppLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
