import { Reveal } from "@/components/Reveal";
import { SectionMarker } from "@/components/SectionMarker";

const steps: { number: string; title: string; description: React.ReactNode }[] = [
  {
    number: "01",
    title: "Contato imediato",
    description:
      "Você chama no WhatsApp, descreve a situação em poucas linhas e recebe retorno rápido — 24 horas para casos urgentes.",
  },
  {
    number: "02",
    title: "Análise do caso",
    description:
      "O advogado avalia o momento do processo, os riscos imediatos e o que precisa ser feito primeiro.",
  },
  {
    number: "03",
    title: "Proposta de atuação e honorários",
    description: (
      <>
        Após a análise, você recebe a{" "}
        <strong className="font-semibold text-ink">
          proposta de honorários com total transparência
        </strong>
        , de acordo com a complexidade do caso, e as formas de pagamento. A
        defesa começa assim que formalizada.
      </>
    ),
  },
];

export function HowItWorks() {
  return (
    <section
      className="section-paper cv-auto relative bg-paper text-ink"
      id="como-funciona"
    >
      <SectionMarker number="07" tone="paper" />
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 lg:px-20 lg:py-32">
        <Reveal>
          <h2 className="font-display text-3xl font-semibold tracking-[-0.01em] text-ink sm:text-4xl">
            Como funciona o atendimento
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-12 lg:grid-cols-3 lg:gap-10">
          {steps.map(({ number, title, description }, i) => (
            <Reveal key={number} delay={i * 80}>
              <div className="border-t border-ink/15 pt-6">
                <span
                  aria-hidden="true"
                  className="font-display text-6xl font-semibold leading-none text-brass-deep"
                >
                  {number}
                </span>
                <h3 className="mt-5 font-display text-xl font-semibold text-ink">
                  {title}
                </h3>
                <p className="mt-3 leading-relaxed text-ink-soft">
                  {description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
