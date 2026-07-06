import { Check, Info } from "lucide-react";
import { Eyebrow } from "@/components/Eyebrow";
import { Reveal } from "@/components/Reveal";
import { SectionMarker } from "@/components/SectionMarker";

const attend = [
  "Você ou um familiar foi preso ou detido",
  "Você está sendo investigado ou foi indiciado",
  "Você recebeu intimação para depor",
  "Você responde a um processo criminal",
  "Você foi acusado de um crime (mesmo que ainda sem processo)",
];

export function QualificationFilter() {
  return (
    <section
      className="section-paper cv-auto relative bg-paper text-ink"
      id="como-atuamos"
    >
      <SectionMarker number="04" tone="paper" />
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 lg:px-20 lg:py-32">
        <Reveal>
          <Eyebrow tone="paper">COMO ATUAMOS</Eyebrow>
          <h2 className="mt-4 max-w-2xl font-display text-3xl font-semibold tracking-[-0.01em] text-ink sm:text-4xl">
            Atuação exclusiva em Defesa Criminal
          </h2>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-soft">
            O escritório atua{" "}
            <strong className="font-semibold text-ink">
              exclusivamente na defesa
            </strong>{" "}
            de pessoas presas, investigadas, intimadas ou acusadas em processos
            criminais — em qualquer fase: delegacia, inquérito, processo ou
            recurso.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-8 lg:grid-cols-2 lg:gap-12">
          <Reveal delay={60}>
            <div className="h-full border-t-2 border-brass-deep pt-8">
              <h3 className="flex items-center gap-2.5 font-display text-xl font-semibold text-ink">
                <Check
                  className="h-5 w-5 shrink-0 text-brass-deep"
                  strokeWidth={2}
                  aria-hidden="true"
                />
                Atendemos você se:
              </h3>
              <ul className="mt-6 space-y-4">
                {attend.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <Check
                      className="mt-1.5 h-4 w-4 shrink-0 text-brass-deep"
                      strokeWidth={2}
                      aria-hidden="true"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="h-full border border-ink/15 p-7 sm:p-8">
              <h3 className="flex items-center gap-2.5 font-display text-xl font-semibold text-ink-soft">
                <Info
                  className="h-5 w-5 shrink-0 text-ink-soft"
                  strokeWidth={1.5}
                  aria-hidden="true"
                />
                Este não é o serviço adequado se:
              </h3>
              <ul className="mt-6 space-y-4 text-ink-soft">
                <li className="flex items-start gap-3">
                  <Info
                    className="mt-1.5 h-4 w-4 shrink-0"
                    strokeWidth={1.5}
                    aria-hidden="true"
                  />
                  <span>
                    Você busca{" "}
                    <strong className="font-semibold">
                      registrar denúncia ou medida protetiva
                    </strong>{" "}
                    como vítima
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <Info
                    className="mt-1.5 h-4 w-4 shrink-0"
                    strokeWidth={1.5}
                    aria-hidden="true"
                  />
                  <span>
                    Você procura a{" "}
                    <strong className="font-semibold">
                      Defensoria Pública
                    </strong>{" "}
                    (atendimento gratuito do Estado)
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <Info
                    className="mt-1.5 h-4 w-4 shrink-0"
                    strokeWidth={1.5}
                    aria-hidden="true"
                  />
                  <span>
                    Você foi vítima de golpe online e busca recuperar valores.
                  </span>
                </li>
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
