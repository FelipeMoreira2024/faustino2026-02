import { Clock, User, Lock, Briefcase } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { SectionMarker } from "@/components/SectionMarker";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { WA_STANDARD } from "@/lib/whatsapp";

const badges = [
  { icon: Clock, label: "Disponível 24h" },
  { icon: User, label: "Atendimento direto com o advogado" },
  { icon: Lock, label: "Sigilo absoluto" },
  { icon: Briefcase, label: "Atendimento particular" },
];

export function FinalCta() {
  return (
    <section className="cv-auto relative bg-ink" id="cta-final">
      <SectionMarker number="12" tone="ink" />
      <div className="mx-auto max-w-3xl px-5 py-24 text-center sm:px-8 lg:py-36">
        <Reveal>
          <h2 className="font-display text-3xl font-semibold tracking-[-0.01em] text-paper sm:text-5xl">
            Precisa de defesa criminal agora?
          </h2>
          <p className="mx-auto mt-6 max-w-xl leading-relaxed text-muted">
            Na defesa criminal,{" "}
            <strong className="font-semibold text-paper">
              cada hora conta
            </strong>
            . Fale diretamente com o advogado e entenda o próximo passo do seu
            caso.
          </p>
        </Reveal>

        <Reveal delay={80}>
          <div className="mt-10 flex justify-center">
            <WhatsAppButton section="cta-final" href={WA_STANDARD}>
              Atendimento imediato no WhatsApp
            </WhatsAppButton>
          </div>
        </Reveal>

        <Reveal delay={140}>
          <ul className="mt-12 flex flex-wrap justify-center gap-x-8 gap-y-4">
            {badges.map(({ icon: Icon, label }) => (
              <li
                key={label}
                className="inline-flex items-center gap-2 text-sm text-muted"
              >
                <Icon
                  className="h-4 w-4 shrink-0 text-brass"
                  strokeWidth={1.5}
                  aria-hidden="true"
                />
                {label}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
