import Image from "next/image";
import { Check, User } from "lucide-react";
import { Eyebrow } from "@/components/Eyebrow";
import { Reveal } from "@/components/Reveal";
import { SectionMarker } from "@/components/SectionMarker";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { WA_STANDARD } from "@/lib/whatsapp";

const highlights = [
  "Atendimento direto com o advogado",
  "Referência em defesa criminal em Goiás",
  "Plantão 24 horas para emergências",
];

const credentialSlots = [
  "Congresso ABRACRIM",
  "Comissão de Prerrogativas",
  "Tribunal do Júri",
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
                src="/images/dr-rodrigo-hero.jpg"
                alt="Dr. Rodrigo Faustino"
                fill
                sizes="(max-width: 1024px) 100vw, 33vw"
                className="object-cover object-top"
              />
            </div>
          </Reveal>

          <Reveal delay={80}>
            <Eyebrow>REFERÊNCIA EM DIREITO CRIMINAL</Eyebrow>
            <h2 className="mt-4 font-display text-3xl font-semibold tracking-[-0.01em] text-paper sm:text-4xl">
              Dr. Rodrigo Faustino
            </h2>
            <p className="mt-2 font-medium text-brass">
              Advogado Criminalista • OAB/GO 64.028
            </p>

            <p className="mt-6 leading-relaxed text-paper">
              <strong className="font-semibold">
                Secretário-Geral da Comissão de Direitos e Prerrogativas da
                ABRACRIM/GO
              </strong>{" "}
              (Associação Brasileira dos Advogados Criminalistas), com mais de{" "}
              <strong className="font-semibold">
                950 casos de defesa criminal
              </strong>{" "}
              conduzidos em Goiânia e em todo o Estado de Goiás.
            </p>

            <p className="mt-4 leading-relaxed text-muted">
              Atua com defesa criminal estratégica em casos urgentes e
              delicados, com atendimento direto, postura técnica e orientação
              clara desde o primeiro contato — sempre com sigilo e
              responsabilidade profissional.
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
                Falar com o Dr. Rodrigo no WhatsApp
              </WhatsAppButton>
            </div>
          </Reveal>
        </div>

        <Reveal delay={120}>
          <div className="mt-16 border-t border-brass/15 pt-10">
            <p className="text-xs font-medium uppercase tracking-[0.15em] text-brass">
              Atuação junto a referências do direito criminal
            </p>
            <div className="mt-6 grid grid-cols-3 gap-3 sm:gap-5">
              {credentialSlots.map((caption) => (
                <figure key={caption}>
                  <div className="flex aspect-[4/3] items-center justify-center border border-brass/15 bg-ink-elevated">
                    <User
                      className="h-6 w-6 text-brass/40"
                      strokeWidth={1}
                      aria-hidden="true"
                    />
                  </div>
                  <figcaption className="mt-2.5 text-[11px] font-medium uppercase tracking-[0.15em] text-muted">
                    {caption}
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
