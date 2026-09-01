import { Check, TriangleAlert } from "lucide-react";
import { Eyebrow } from "@/components/Eyebrow";
import { Reveal } from "@/components/Reveal";
import { SectionMarker } from "@/components/SectionMarker";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { WA_FLAGRANTE } from "@/lib/whatsapp";

const situations = [
  "Prisão em flagrante (sua ou de um familiar)",
  "Intimação policial ou judicial",
  "Mandado de prisão ou de busca e apreensão",
  "Acusação de crime sexual",
  "Investigação ou inquérito em andamento",
  "Audiência de custódia nas próximas horas",
];

export function UrgentSituations() {
  return (
    <section className="cv-auto relative bg-ink" id="situacoes-urgentes">
      <SectionMarker number="03" tone="ink" />
      <div className="mx-auto max-w-6xl px-5 pb-16 pt-12 sm:px-8 lg:px-20 lg:pb-28 lg:pt-20">
        <Reveal>
          <Eyebrow>ATENÇÃO IMEDIATA</Eyebrow>
          <h2 className="mt-4 font-display text-3xl font-semibold tracking-[-0.01em] text-paper sm:text-4xl">
            Situação urgente? Cada hora conta.
          </h2>
        </Reveal>

        <Reveal delay={80}>
          <ul className="mt-10 grid gap-x-8 gap-y-4 sm:grid-cols-2">
            {situations.map((item) => (
              <li key={item} className="flex items-start gap-3 text-paper">
                <Check
                  className="mt-1 h-4 w-4 shrink-0 text-brass"
                  strokeWidth={2}
                  aria-hidden="true"
                />
                {item}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={120}>
          <div className="mt-10 flex gap-4 border border-brass/35 bg-ink-elevated p-5 sm:p-6">
            <TriangleAlert
              className="mt-0.5 h-5 w-5 shrink-0 text-brass"
              strokeWidth={1.5}
              aria-hidden="true"
            />
            <div>
              <p className="font-semibold text-paper">
                Não preste depoimento sem um advogado criminalista.
              </p>
              <p className="mt-1 text-muted">
                Uma declaração equivocada nas primeiras horas pode definir o
                rumo de todo o processo.
              </p>
            </div>
          </div>
        </Reveal>

        <Reveal delay={160}>
          <div className="mt-10">
            <WhatsAppButton section="situacoes-urgentes" href={WA_FLAGRANTE}>
              Falar com o advogado agora
            </WhatsAppButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
