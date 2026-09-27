import { Reveal } from "@/components/Reveal";
import { CONTAINER, SectionLabel } from "@/components/lp/ui";
import { notServed, practiceAreas } from "@/lib/lp-defesa-criminal";

export function LpPractice() {
  return (
    <section id="atuacao" className="cv-auto relative bg-ink">
      <div className={`${CONTAINER} py-16 lg:py-28`}>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <SectionLabel numeral="V">Atuação</SectionLabel>
              <h2 className="lp-serif mt-5 text-[2rem] font-medium leading-[1.1] tracking-[-0.02em] text-paper sm:text-[2.6rem]">
                Exclusivamente defesa criminal.
              </h2>
              <p className="mt-5 leading-relaxed text-muted">
                O escritório defende pessoas presas, investigadas, intimadas ou acusadas, em
                qualquer fase: delegacia, inquérito, processo e recursos.{" "}
                <strong className="font-semibold text-paper">
                  O atendimento é particular e feito pelo próprio advogado.
                </strong>
              </p>

              <div className="mt-10 border border-brass/20 p-6">
                <p className="lp-serif text-lg italic text-paper">
                  Este não é o atendimento indicado se você:
                </p>
                <ul className="mt-4 space-y-2.5 text-[15px] leading-snug text-muted">
                  {notServed.map((item) => (
                    <li key={item} className="flex gap-3">
                      <span aria-hidden="true" className="mt-[0.6rem] h-px w-3 shrink-0 bg-muted/60" />
                      {item}
                    </li>
                  ))}
                </ul>
                <p className="mt-5 border-t border-brass/15 pt-4 text-sm leading-relaxed text-muted">
                  Nesses casos, procure a delegacia, a Defensoria Pública ou um advogado da área
                  cível.
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={80} className="lg:col-span-7">
            <ol className="border-t border-brass/20">
              {practiceAreas.map((area, index) => (
                <li
                  key={area.title}
                  className="grid grid-cols-[2.75rem_1fr] gap-2 border-b border-brass/20 py-6 sm:grid-cols-[3.5rem_1fr]"
                >
                  <span aria-hidden="true" className="lp-serif pt-0.5 text-lg italic text-brass">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="lp-serif text-[1.3rem] font-medium leading-snug tracking-[-0.01em] text-paper sm:text-[1.45rem]">
                      {area.title}
                    </h3>
                    <p className="mt-2 max-w-xl text-[15px] leading-relaxed text-muted">{area.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
