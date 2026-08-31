import { Check } from "lucide-react";
import Link from "next/link";
import { Eyebrow } from "@/components/Eyebrow";
import { Reveal } from "@/components/Reveal";
import { SectionMarker } from "@/components/SectionMarker";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { WA_SIGILO } from "@/lib/whatsapp";
import { absoluteUrl } from "@/lib/site";

const items = [
  "Defesa em acusações de estupro, importunação e assédio",
  "Defesa em acusações de crimes sexuais online",
  "Acompanhamento desde o início da investigação",
  "Atuação ética, técnica e sob sigilo profissional",
];

export function SexualCrimesDefense() {
  return (
    <section className="cv-auto relative bg-ink" id="defesa-crimes-sexuais">
      <SectionMarker number="08" tone="ink" />
      <div className="mx-auto max-w-3xl px-5 py-24 text-center sm:px-8 lg:py-36">
        <Reveal>
          <Eyebrow className="text-center">DEFESA ESPECIALIZADA</Eyebrow>
          <h2 className="mt-5 font-display text-3xl font-semibold tracking-[-0.01em] text-paper sm:text-4xl">
            Orientação antes de declarações em acusações de natureza sexual
          </h2>
          <p className="mx-auto mt-7 max-w-2xl leading-relaxed text-muted">
            Acusações de crimes contra a dignidade sexual exigem defesa
            técnica, responsável e protegida pelo sigilo profissional{" "}
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
          <div className="mt-12 flex flex-col items-center justify-center gap-4">
            <WhatsAppButton section="defesa-crimes-sexuais" href={WA_SIGILO}>
              Falar com o advogado sob sigilo profissional
            </WhatsAppButton>
            <Link
              href={absoluteUrl("/advogado-crimes-sexuais-goiania")}
              className="link-underline text-sm font-semibold text-paper"
            >
              Entender como funciona a defesa em Goiânia
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
