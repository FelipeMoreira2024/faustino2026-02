import Image from "next/image";
import { Check } from "lucide-react";
import { Eyebrow } from "@/components/Eyebrow";
import { Reveal } from "@/components/Reveal";
import { SectionMarker } from "@/components/SectionMarker";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { WA_STANDARD } from "@/lib/whatsapp";

const highlights = [
  "Atendimento direto com o advogado",
  "Atuação na fase policial e judicial",
  "Orientação sem promessa de resultado",
];

export function Authority() {
  return (
    <section className="cv-auto relative bg-ink" id="dr-rodrigo-faustino">
      <SectionMarker number="06" tone="ink" />
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 lg:px-20 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <Reveal>
            <div className="duotone relative aspect-[4/5] w-full max-w-sm overflow-hidden">
              <Image
                src="/images/dr-rodrigo-hero.webp"
                alt="Dr. Rodrigo Faustino"
                fill
                quality={65}
                sizes="(max-width: 640px) calc(100vw - 2.5rem), (max-width: 1024px) 24rem, 33vw"
                className="object-cover object-[center_22%]"
              />
            </div>
          </Reveal>

          <Reveal delay={80}>
            <Eyebrow>ATUAÇÃO PROFISSIONAL</Eyebrow>
            <h2 className="mt-4 font-display text-3xl font-semibold tracking-[-0.01em] text-paper sm:text-4xl">
              Dr. Rodrigo Faustino
            </h2>
            <p className="mt-2 font-medium text-brass">
              Advogado Criminalista • OAB/GO 64.028
            </p>

            <p className="mt-6 leading-relaxed text-paper">
              Atua na defesa de pessoas presas, investigadas ou acusadas, com
              orientação sobre a fase do procedimento, os documentos necessários
              e as medidas juridicamente cabíveis.
            </p>

            <p className="mt-4 leading-relaxed text-muted">
              Cada atendimento depende da análise individual dos documentos e
              decisões disponíveis. Nenhuma informação publicada no site representa
              garantia de resultado ou substitui a avaliação do caso concreto.
            </p>

            <ul className="mt-8 space-y-3.5">
              {highlights.map((item) => (
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

            <div className="mt-9">
              <WhatsAppButton section="autoridade" href={WA_STANDARD}>
                Entrar em contato com o advogado
              </WhatsAppButton>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
