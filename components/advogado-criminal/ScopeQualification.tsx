import { Check, Info } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import { AcWhatsAppLink } from "@/components/advogado-criminal/WhatsAppCta";
import { AC_BTN_WA, AC_CONTAINER, AC_EYEBROW, AC_H2 } from "@/components/advogado-criminal/ui";
import { notServedProfiles, servedProfiles } from "@/lib/advogado-criminal";

/**
 * Qualificação antecipada posicionada logo após a triagem (como na home campeã),
 * mas com enquadramento de prestígio e botão de conversão direto para quem tem
 * aderência. Filtra curiosos/vítimas/Defensoria e aumenta a taxa de fechamento.
 */
export function AcScopeQualification() {
  return (
    <section
      id="escopo"
      aria-labelledby="ac-scope-heading"
      className="section-paper ac-defer relative bg-paper text-ink"
    >
      <div className={`${AC_CONTAINER} py-16 lg:py-26`}>
        <Reveal>
          <p className={`${AC_EYEBROW} text-brass-deep`}>Foco exclusivo e atendimento particular</p>
          <h2 id="ac-scope-heading" className={`${AC_H2} mt-3 max-w-3xl text-ink`}>
            Dedicação integral à defesa de quem é investigado, intimado ou acusado
          </h2>
          <p className="mt-4 max-w-2xl text-[16.5px] leading-relaxed text-ink-soft sm:text-[17px] [text-wrap:pretty]">
            Não dividimos atenção com outras áreas do Direito nem atuamos na acusação. Toda a
            estrutura do escritório existe para{" "}
            <strong className="font-semibold text-ink">proteger a liberdade, os direitos e a imagem</strong>{" "}
            de quem responde na esfera criminal.
          </p>
        </Reveal>

        <div className="mt-11 grid gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:gap-8">
          <Reveal className="h-full">
            <div className="flex h-full flex-col justify-between rounded-2xl border-2 border-ink/15 bg-white/70 p-6 shadow-[0_18px_40px_-28px_rgba(16,20,24,0.28)] sm:p-8">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full bg-brass-deep/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-brass-deep">
                  <Check className="h-3.5 w-3.5" strokeWidth={2.4} aria-hidden="true" />
                  Perfil atendido pelo escritório
                </div>

                <h3 className="mt-4 font-display text-2xl font-semibold text-ink">
                  Atendemos o seu caso se:
                </h3>

                <ul className="mt-5 space-y-3.5">
                  {servedProfiles.map((item) => (
                    <li key={item} className="flex items-start gap-3 leading-snug text-ink">
                      <Check
                        className="mt-0.5 h-4 w-4 shrink-0 text-brass-deep"
                        strokeWidth={2.3}
                        aria-hidden="true"
                      />
                      <span className="[text-wrap:pretty]">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8 border-t border-ink/10 pt-6">
                <AcWhatsAppLink
                  section="escopo"
                  topic="ac_qualificacao"
                  className={AC_BTN_WA}
                >
                  <WhatsAppIcon className="h-5 w-5 shrink-0" />
                  Meu caso é de defesa criminal — falar agora
                </AcWhatsAppLink>
                <p className="mt-2.5 text-xs leading-relaxed text-ink-soft">
                  Atendimento particular, com honorários informados com transparência após a análise
                  do caso.
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={80} className="h-full">
            <div className="flex h-full flex-col justify-between rounded-2xl border border-ink/15 bg-ink/[0.03] p-6 sm:p-8">
              <div>
                <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-ink-soft">
                  <Info className="h-4 w-4 shrink-0" strokeWidth={1.7} aria-hidden="true" />
                  Transparência antes do contato
                </p>

                <h3 className="mt-4 font-display text-xl font-semibold text-ink sm:text-2xl">
                  Quando não somos o canal indicado:
                </h3>

                <ul className="mt-5 space-y-4 text-[15px] leading-relaxed text-ink-soft">
                  {notServedProfiles.map(({ bold, rest }) => (
                    <li key={bold} className="flex items-start gap-3">
                      <Info
                        className="mt-1 h-4 w-4 shrink-0 text-ink-soft"
                        strokeWidth={1.6}
                        aria-hidden="true"
                      />
                      <span className="[text-wrap:pretty]">
                        <strong className="font-semibold text-ink">{bold}</strong> {rest}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <p className="mt-6 border-t border-ink/10 pt-4 text-[13.5px] leading-relaxed text-ink-soft">
                Essa exclusividade garante que cada cliente atendido tenha{" "}
                <strong className="font-semibold text-ink">
                  acesso ágil e atenção direta do advogado titular
                </strong>{" "}
                nos momentos mais críticos.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
