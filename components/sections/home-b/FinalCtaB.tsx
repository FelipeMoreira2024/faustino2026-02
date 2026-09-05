import { Clock, User, Lock, Briefcase } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { SectionMarker } from "@/components/SectionMarker";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { PhoneLink } from "@/components/PhoneLink";
import { PHONE_DISPLAY, WA_HOME_B } from "@/lib/whatsapp";

/**
 * Variante B do CTA final.
 * Diferenças em relação ao FinalCta original:
 * - Headline repete o gatilho de qualificação do hero (preso / intimado / acusado).
 * - Texto fala em "riscos imediatos" e "próximo passo da sua defesa" (posse do problema).
 * - CTA nomeia pessoa + canal; CTA secundário de ligação.
 * - "Atendimento particular" sobe para o primeiro badge.
 */
const badges = [
  { icon: Briefcase, label: "Atendimento particular" },
  { icon: User, label: "Direto com o advogado" },
  { icon: Clock, label: "Plantão 24 horas" },
  { icon: Lock, label: "Sigilo absoluto" },
];

export function FinalCtaB() {
  return (
    <section className="cv-auto relative bg-ink" id="cta-final">
      <SectionMarker number="12" tone="ink" />
      <div className="mx-auto max-w-3xl px-5 py-24 text-center sm:px-8 lg:py-36">
        <Reveal>
          <h2 className="font-display text-3xl font-semibold tracking-[-0.01em] text-paper sm:text-5xl">
            Foi preso, intimado ou está sendo acusado?
          </h2>
          <p className="mx-auto mt-6 max-w-xl leading-relaxed text-muted">
            Não espere a situação avançar sem defesa. Fale diretamente com o{" "}
            <strong className="font-semibold text-paper">
              Dr. Rodrigo Faustino
            </strong>
            , entenda os riscos imediatos e o próximo passo da sua defesa.
          </p>
        </Reveal>

        <Reveal delay={80}>
          <div className="mt-10 flex flex-col items-center gap-2">
            <WhatsAppButton
              section="cta-final"
              href={WA_HOME_B}
              className="sm:whitespace-nowrap"
            >
              Falar agora com o Dr. Rodrigo no WhatsApp
            </WhatsAppButton>
            <PhoneLink section="cta-final" variant="text">
              Ou ligue agora: {PHONE_DISPLAY}
            </PhoneLink>
          </div>
        </Reveal>

        <Reveal delay={140}>
          <ul className="mt-12 flex flex-wrap justify-center gap-x-8 gap-y-4">
            {badges.map(({ icon: Icon, label }) => (
              <li
                key={label}
                className="inline-flex items-center gap-2 text-sm text-muted"
              >
                <Icon
                  className="h-4 w-4 shrink-0 text-brass"
                  strokeWidth={1.5}
                  aria-hidden="true"
                />
                {label}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
