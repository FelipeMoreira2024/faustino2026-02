import { Check, Info } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { CONTAINER, SectionLabel } from "@/components/lp/ui";
import { notServed } from "@/lib/lp-defesa-criminal";

const attend = [
  "Você ou um familiar foi preso ou detido",
  "Você está sendo investigado ou foi indiciado",
  "Você recebeu intimação para depor",
  "Você responde a um processo criminal",
  "Você foi acusado de um crime (mesmo que ainda sem processo)",
];

export function LpQualification() {
  return (
    <section id="como-atuamos" className="section-paper bg-paper text-ink">
      <div className={`${CONTAINER} py-16 lg:py-28`}>
        <Reveal>
          <SectionLabel numeral="II" tone="paper">Como atuamos</SectionLabel>
          <h2 className="lp-serif mt-5 max-w-2xl text-[2rem] font-medium leading-[1.1] tracking-[-0.02em] sm:text-[2.6rem]">
            Atuação exclusiva em Defesa Criminal
          </h2>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-soft">
            O escritório atua <strong className="font-semibold text-ink">exclusivamente na defesa</strong>
            {" "}de pessoas presas, investigadas, intimadas ou acusadas em processos criminais —
            em qualquer fase: delegacia, inquérito, processo ou recurso.
          </p>
          <p className="mt-4 font-semibold text-ink">Atendimento particular, direto com o advogado.</p>
        </Reveal>
        <div className="mt-12 grid gap-8 lg:grid-cols-2 lg:gap-12">
          <Reveal delay={60}>
            <div className="h-full border-t-2 border-brass-deep pt-8">
              <h3 className="lp-serif flex items-center gap-2.5 text-xl font-medium">
                <Check className="h-5 w-5 shrink-0 text-brass-deep" aria-hidden="true" />
                Atendemos você se:
              </h3>
              <ul className="mt-6 space-y-4">
                {attend.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <Check className="mt-1 h-4 w-4 shrink-0 text-brass-deep" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div className="h-full border border-ink/15 p-7 sm:p-8">
              <h3 className="lp-serif flex items-center gap-2.5 text-xl font-medium text-ink-soft">
                <Info className="h-5 w-5 shrink-0" aria-hidden="true" />
                Este não é o serviço adequado se:
              </h3>
              <ul className="mt-6 space-y-4 text-ink-soft">
                {notServed.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <Info className="mt-1 h-4 w-4 shrink-0" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
