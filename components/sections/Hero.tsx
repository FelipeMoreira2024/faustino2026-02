import Image from "next/image";
import { Star, Scale, Lock } from "lucide-react";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { WA_STANDARD } from "@/lib/whatsapp";
import { SectionMarker } from "@/components/SectionMarker";

const proofs = [
  { icon: Star, label: "Melhor avaliação de Goiânia no Google" },
  { icon: Scale, label: "+950 defesas realizadas" },
  { icon: Lock, label: "Sigilo total" },
];

export function Hero() {
  return (
    <section className="relative bg-ink" id="hero">
      <SectionMarker number="02" tone="ink" hideOnMobile />
      <div className="mx-auto grid max-w-6xl gap-10 px-5 pb-20 pt-10 sm:px-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:gap-16 lg:px-20 lg:pb-28 lg:pt-10">
        <div>
          <span className="inline-flex items-center rounded-full border border-brass/40 px-3.5 py-1.5 text-[11px] font-medium uppercase tracking-[0.13em] text-brass sm:text-xs sm:tracking-[0.15em]">
            DEFESA CRIMINAL • ATENDIMENTO 24 HORAS
          </span>

          <h1 className="mt-6 font-display text-[clamp(2.2rem,6vw,4rem)] font-semibold leading-[1.08] tracking-[-0.015em] text-paper">
            Advogado Criminalista em Goiânia
            <span className="mt-2 block italic text-brass">
              Defesa imediata, 24 horas
            </span>
          </h1>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
            Você foi intimado ou acusado de um crime? Ou um familiar acaba de
            ser preso? Atuação imediata na defesa criminal em Goiânia e região.
          </p>

          <div className="mt-8">
            <WhatsAppButton section="hero" href={WA_STANDARD}>
              Falar agora com o advogado de defesa
            </WhatsAppButton>
            <p className="mt-3 text-sm text-muted">
              Atendimento particular, direto com o advogado. Sigilo absoluto.
            </p>
          </div>

          <ul className="mt-8 flex flex-wrap gap-2.5">
            {proofs.map(({ icon: Icon, label }) => (
              <li
                key={label}
                className="inline-flex items-center gap-2 rounded-full border border-brass/30 px-3.5 py-2 text-[13px] font-medium text-paper transition-colors duration-300 hover:border-brass/70"
              >
                <Icon
                  className="h-3.5 w-3.5 shrink-0 text-brass"
                  strokeWidth={1.5}
                  aria-hidden="true"
                />
                {label}
              </li>
            ))}
          </ul>
        </div>

        <div className="duotone relative -mt-[2cm] aspect-[4/5] w-full max-w-[32rem] overflow-hidden justify-self-center lg:justify-self-end">
          <Image
            src="/images/dr-rodrigo-hero.png"
            alt="Dr. Rodrigo Faustino, advogado criminalista em Goiânia"
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 45vw"
            className="object-cover object-[center_22%]"
          />
        </div>
      </div>
    </section>
  );
}
