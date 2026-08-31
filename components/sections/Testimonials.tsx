import { FileSearch, LockKeyhole, MessageSquareText, Scale } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { SectionMarker } from "@/components/SectionMarker";

const principles = [
  {
    icon: MessageSquareText,
    title: "Comunicação objetiva",
    text: "Explicação da fase do procedimento, dos documentos necessários e dos próximos atos conhecidos.",
  },
  {
    icon: LockKeyhole,
    title: "Sigilo profissional",
    text: "Solicitação responsável de informações e cuidado com a circulação de documentos sensíveis.",
  },
  {
    icon: FileSearch,
    title: "Análise individual",
    text: "A orientação considera os autos e as decisões existentes, sem respostas genéricas para situações diferentes.",
  },
  {
    icon: Scale,
    title: "Expectativas responsáveis",
    text: "Apresentação das medidas juridicamente possíveis sem promessa de prazo, decisão ou resultado.",
  },
];

export function Testimonials() {
  return (
    <section className="cv-auto relative bg-ink" id="principios-do-atendimento">
      <SectionMarker number="09" tone="ink" />
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 lg:px-20 lg:py-28">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brass">
            RELAÇÃO PROFISSIONAL
          </p>
          <h2 className="mt-4 font-display text-3xl font-semibold tracking-[-0.01em] text-paper sm:text-4xl">
            Princípios do atendimento
          </h2>
          <p className="mt-4 max-w-2xl leading-relaxed text-muted">
            O atendimento jurídico exige informação clara, discrição e análise
            compatível com a fase concreta do procedimento.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {principles.map(({ icon: Icon, title, text }, index) => (
            <Reveal key={title} delay={index * 70}>
              <article className="flex h-full flex-col border border-brass/15 bg-ink-elevated p-6 sm:p-7">
                <Icon className="h-5 w-5 text-brass" strokeWidth={1.5} aria-hidden="true" />
                <h3 className="mt-5 font-display text-xl font-semibold text-paper">{title}</h3>
                <p className="mt-4 text-sm leading-relaxed text-muted">{text}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
