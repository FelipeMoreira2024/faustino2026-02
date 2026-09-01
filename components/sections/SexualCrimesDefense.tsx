import { Check } from "lucide-react";
import { Eyebrow } from "@/components/Eyebrow";
import { Reveal } from "@/components/Reveal";
import { SectionMarker } from "@/components/SectionMarker";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { WA_SIGILO } from "@/lib/whatsapp";

const items = [
  "Defesa em acusações de estupro, importunação e assédio",
  "Defesa em acusações de crimes sexuais online",
  "Acompanhamento desde o início da investigação",
  "Atuação ética, técnica e com sigilo absoluto",
];

export function SexualCrimesDefense() {
  return (
    <section className="cv-auto relative bg-ink" id="defesa-crimes-sexuais">
      <SectionMarker number="08" tone="ink" />
      <div className="mx-auto max-w-3xl px-5 py-24 text-center sm:px-8 lg:py-36">
        <Reveal>
          <Eyebrow className="text-center">DEFESA ESPECIALIZADA</Eyebrow>
          <h2 className="mt-5 font-display text-3xl font-semibold tracking-[-0.01em] text-paper sm:text-4xl">
            Acusado de um crime sexual? Aja antes de falar.
          </h2>
          <p className="mx-auto mt-7 max-w-2xl leading-relaxed text-muted">
            Acusações de crimes contra a dignidade sexual exigem defesa
            técnica, responsável e absolutamente sigilosa{" "}
            <strong className="font-semibold text-paper">
              desde o primeiro contato
            </strong>{" "}
            — muitas vezes, o que é dito antes da orientação jurídica define o
            rumo do caso.
          </p>
        </Reveal>

        <Reveal delay={100}>
          <ul className="mx-auto mt-12 max-w-md space-y-4 text-left">
            {items.map((item) => (
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

        <Reveal delay={160}>
          <div className="mt-12 flex justify-center">
            <WhatsAppButton section="defesa-crimes-sexuais" href={WA_SIGILO}>
              Falar com o advogado com total sigilo
            </WhatsAppButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
