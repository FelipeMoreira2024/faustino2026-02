import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import { Reveal } from "@/components/Reveal";
import { LpWhatsAppLink } from "@/components/lp/LpWhatsAppLink";
import { CONTAINER, SectionLabel } from "@/components/lp/ui";
import { situations } from "@/lib/lp-defesa-criminal";

export function LpTriage() {
  return (
    <section id="situacao" className="relative bg-ink">
      <div className={`${CONTAINER} grid gap-10 border-t border-brass/15 py-16 lg:grid-cols-12 lg:gap-12 lg:py-28`}>
        <Reveal className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <SectionLabel numeral="I">O que aconteceu</SectionLabel>
            <h2 className="lp-serif mt-5 text-[2rem] font-medium leading-[1.1] tracking-[-0.02em] text-paper sm:text-[2.6rem]">
              Escolha a situação mais próxima da sua.
            </h2>
            <p className="mt-5 max-w-md leading-relaxed text-muted">
              A mensagem para o Dr.&nbsp;Rodrigo já vai escrita. Você só confere e envia pelo
              WhatsApp. Se preferir, complete com os detalhes que quiser.
            </p>
          </div>
        </Reveal>

        <div className="lg:col-span-7">
          <Reveal delay={80}>
            <ul className="border-t border-brass/20">
              {situations.map((situation, index) => (
                <li key={situation.key} className="border-b border-brass/20">
                  <LpWhatsAppLink
                    section="triagem"
                    topic={situation.key}
                    message={situation.message}
                    className="lp-triage-row group -mx-3 flex min-h-[4.75rem] items-center gap-4 px-3 py-4 sm:gap-6"
                  >
                    <span aria-hidden="true" className="lp-serif w-6 shrink-0 text-lg italic text-brass">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-[1.0625rem] font-semibold leading-snug text-paper">
                        {situation.title}
                      </span>
                      <span className="mt-1 block text-sm leading-snug text-muted">{situation.detail}</span>
                    </span>
                    <span
                      aria-hidden="true"
                      className="lp-triage-go flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-whatsapp/40 text-whatsapp"
                    >
                      <WhatsAppIcon className="h-[1.1rem] w-[1.1rem]" />
                    </span>
                  </LpWhatsAppLink>
                </li>
              ))}
            </ul>
          </Reveal>

          <p className="mt-6 text-[15px] text-muted">
            Outra situação?{" "}
            <LpWhatsAppLink
              section="triagem"
              topic="outra_situacao"
              className="link-underline relative font-semibold text-paper after:absolute after:inset-x-0 after:-inset-y-3"
            >
              Escreva com as suas palavras
            </LpWhatsAppLink>
            .
          </p>
        </div>
      </div>
    </section>
  );
}
