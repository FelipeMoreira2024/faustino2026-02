import { Check, Info } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { CONTAINER, EYEBROW, H2 } from "@/components/criminalista-24h/ui";
import { notServed, practiceAreas, servedProfiles } from "@/lib/criminalista-24h";

/** Áreas + filtro de perfil: quem é atendido entra no WhatsApp já sabendo que o atendimento é particular. */
export function C24Practice() {
  return (
    <section id="atuacao" className="cv-auto relative bg-ink">
      <div className={`${CONTAINER} py-16 lg:py-28`}>
        <Reveal>
          <p className={`${EYEBROW} text-brass`}>Atuação exclusiva em defesa criminal</p>
          <h2 className={`${H2} mt-3 max-w-3xl text-paper`}>
            Da delegacia ao tribunal, em qualquer fase do caso
          </h2>
          <p className="mt-5 max-w-2xl leading-relaxed text-muted">
            O escritório atua{" "}
            <strong className="font-semibold text-paper">exclusivamente na defesa</strong> de
            pessoas presas, investigadas, intimadas ou acusadas — no inquérito, no processo ou em
            recurso.
          </p>
        </Reveal>

        <ul className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-brass/15 bg-brass/15 sm:grid-cols-2 lg:grid-cols-4">
          {practiceAreas.map(({ title, text }, i) => (
            <li key={title} className="bg-ink-elevated p-5 sm:p-6">
              <Reveal delay={Math.min(i * 40, 200)}>
                <h3 className="font-display text-[1.07rem] font-semibold leading-snug text-paper [text-wrap:pretty]">
                  {title}
                </h3>
                <p className="mt-2 text-[14px] leading-relaxed text-muted">{text}</p>
              </Reveal>
            </li>
          ))}
        </ul>

        <div className="mt-12 grid gap-5 lg:grid-cols-2 lg:gap-6">
          <Reveal className="h-full">
            <div className="h-full rounded-2xl border border-brass/30 p-6 sm:p-8">
              <h3 className="flex items-center gap-2.5 font-display text-xl font-semibold text-paper">
                <Check className="h-5 w-5 shrink-0 text-brass" strokeWidth={2.2} aria-hidden="true" />
                Atendemos você se:
              </h3>
              <ul className="mt-5 space-y-3.5">
                {servedProfiles.map((item) => (
                  <li key={item} className="flex items-start gap-3 leading-snug text-paper">
                    <Check
                      className="mt-0.5 h-4 w-4 shrink-0 text-brass"
                      strokeWidth={2.2}
                      aria-hidden="true"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={80} className="h-full">
            <div className="h-full rounded-2xl border border-white/10 bg-white/[0.02] p-6 sm:p-8">
              <h3 className="flex items-center gap-2.5 font-display text-xl font-semibold text-muted">
                <Info className="h-5 w-5 shrink-0" strokeWidth={1.6} aria-hidden="true" />
                Este não é o serviço adequado se:
              </h3>
              <ul className="mt-5 space-y-3.5 text-muted">
                {notServed.map((item) => (
                  <li key={item} className="flex items-start gap-3 leading-snug">
                    <Info className="mt-0.5 h-4 w-4 shrink-0" strokeWidth={1.6} aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-6 border-t border-white/10 pt-5 text-sm leading-relaxed text-muted">
                O atendimento é <strong className="font-semibold text-paper">particular</strong>: os
                honorários são apresentados depois da análise do caso, antes de qualquer contratação.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
