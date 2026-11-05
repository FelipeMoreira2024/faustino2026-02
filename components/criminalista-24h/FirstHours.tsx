import { Check } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import { C24WhatsAppLink } from "@/components/criminalista-24h/WhatsAppLink";
import { BTN_WA, CONTAINER, EYEBROW, H2 } from "@/components/criminalista-24h/ui";
import { familyChecklist, firstHours } from "@/lib/criminalista-24h";

/**
 * Para a família de quem foi preso (o lead mais urgente): explica, sem
 * prometer resultado, por que o advogado precisa entrar no caso agora.
 */
export function C24FirstHours() {
  return (
    <section id="primeiras-horas" className="section-paper cv-auto relative bg-paper text-ink">
      <div className={`${CONTAINER} py-16 lg:py-28`}>
        <Reveal>
          <p className={`${EYEBROW} text-brass-deep`}>Familiar preso</p>
          <h2 className={`${H2} mt-3 max-w-3xl text-ink`}>
            O que acontece nas primeiras 24 horas após a prisão
          </h2>
          <p className="mt-5 max-w-2xl text-[17px] leading-relaxed text-ink-soft">
            Nesse intervalo acontece a audiência de custódia, em que o juiz decide se a pessoa vai
            responder em liberdade. Quanto antes o advogado entra no caso, mais cedo a defesa começa
            a agir.
          </p>
        </Reveal>

        <div className="relative mt-12">
          <span
            aria-hidden="true"
            className="absolute bottom-8 left-[1.125rem] top-8 w-px bg-brass-deep/30 lg:hidden"
          />
          <ol className="grid gap-9 lg:grid-cols-3 lg:gap-10">
            {firstHours.map(({ when, title, text }, i) => (
              <li key={title} className="relative pl-14 lg:pl-0">
                <span
                  aria-hidden="true"
                  className="absolute left-0 top-0 flex h-9 w-9 items-center justify-center rounded-full border border-brass-deep/40 bg-paper font-display text-base font-semibold text-brass-deep lg:static lg:mb-5"
                >
                  {i + 1}
                </span>
                <Reveal delay={i * 80}>
                  <p className={`${EYEBROW} text-brass-deep`}>{when}</p>
                  <h3 className="mt-2 font-display text-xl font-semibold text-ink">{title}</h3>
                  <p className="mt-2 leading-relaxed text-ink-soft">{text}</p>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>

        <Reveal delay={100}>
          <div className="mt-14 rounded-2xl bg-ink p-6 text-paper sm:p-8 lg:grid lg:grid-cols-[1.2fr_0.8fr] lg:items-center lg:gap-12 lg:p-10">
            <div>
              <h3 className="font-display text-2xl font-semibold">O que a família pode fazer agora</h3>
              <ul className="mt-5 space-y-3.5">
                {familyChecklist.map((item) => (
                  <li key={item} className="flex items-start gap-3 leading-relaxed">
                    <Check
                      className="mt-1 h-4 w-4 shrink-0 text-brass"
                      strokeWidth={2.2}
                      aria-hidden="true"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-8 lg:mt-0">
              <C24WhatsAppLink section="primeiras-horas" topic="c24_situacao_1" className={`${BTN_WA} lg:w-full`}>
                <WhatsAppIcon className="h-5 w-5 shrink-0" />
                Falar com o advogado
              </C24WhatsAppLink>
              <p className="mt-3 text-sm leading-snug text-muted">
                Plantão 24 horas, inclusive à noite, fins de semana e feriados.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
