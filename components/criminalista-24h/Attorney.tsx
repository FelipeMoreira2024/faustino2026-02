import Image from "next/image";
import { Check } from "lucide-react";
import { HonorsCarousel } from "@/components/HonorsCarousel";
import { Reveal } from "@/components/Reveal";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import { C24WhatsAppLink } from "@/components/criminalista-24h/WhatsAppLink";
import { BTN_WA, CONTAINER, EYEBROW, H2 } from "@/components/criminalista-24h/ui";
import { attorneyHighlights, honors } from "@/lib/criminalista-24h";

export function C24Attorney() {
  return (
    <section id="dr-rodrigo-faustino" className="cv-auto relative bg-ink">
      <div className={`${CONTAINER} py-16 lg:py-28`}>
        <div className="grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-16">
          <Reveal className="c24-reveal-photo lg:col-span-5">
            <figure>
              <div className="c24-photo relative aspect-[4/5] w-full overflow-clip rounded-2xl bg-ink-elevated">
                <Image
                  src="/images/criminalista-24h/dr-rodrigo-escritorio.webp"
                  alt="Dr. Rodrigo Faustino em pé, atrás da mesa do escritório"
                  fill
                  quality={70}
                  sizes="(min-width: 1024px) 26rem, (min-width: 640px) 34rem, calc(100vw - 2.5rem)"
                  className="c24-photo-img object-cover object-[center_32%]"
                />
              </div>
              <figcaption className="mt-3 text-xs text-muted">
                No escritório do Setor Marista, em Goiânia.
              </figcaption>
            </figure>
          </Reveal>

          <Reveal delay={80} className="lg:col-span-7">
            <p className={`${EYEBROW} text-brass`}>Quem vai cuidar do seu caso</p>
            <h2 className={`${H2} mt-3 text-paper`}>Dr. Rodrigo Faustino</h2>
            <p className="mt-2 font-medium text-brass">Advogado criminalista · OAB/GO 64.028</p>

            <p className="mt-6 text-[17px] leading-relaxed text-paper">
              <strong className="font-semibold">
                Secretário-Geral da Comissão de Direitos e Prerrogativas da ABRACRIM/GO
              </strong>{" "}
              (Associação Brasileira dos Advogados Criminalistas), com mais de{" "}
              <strong className="font-semibold">950 casos de defesa criminal</strong> conduzidos em
              Goiânia e em todo o Estado de Goiás.
            </p>
            <p className="mt-4 leading-relaxed text-muted">
              Atua em casos urgentes e sensíveis com postura técnica, linguagem clara e sigilo. Desde
              a primeira conversa, você entende o que está em jogo e qual é o próximo passo.
            </p>

            <ul className="mt-8 grid gap-x-8 gap-y-3.5 sm:grid-cols-2">
              {attorneyHighlights.map((item) => (
                <li key={item} className="flex items-start gap-3 leading-snug text-paper">
                  <Check
                    className="mt-0.5 h-4 w-4 shrink-0 text-brass"
                    strokeWidth={2.2}
                    aria-hidden="true"
                  />
                  {item}
                </li>
              ))}
            </ul>

            <div className="mt-9">
              <C24WhatsAppLink section="advogado" className={BTN_WA}>
                <WhatsAppIcon className="h-5 w-5 shrink-0" />
                Falar com o Dr. Rodrigo
              </C24WhatsAppLink>
            </div>
          </Reveal>
        </div>

        <Reveal delay={60}>
          <div className="mt-16 border-t border-brass/15 pt-12 lg:mt-24 lg:pt-16">
            <p className={`${EYEBROW} text-brass`}>Reconhecimento</p>
            <h3 className="mt-3 max-w-2xl font-display text-2xl font-semibold tracking-[-0.01em] text-paper sm:text-3xl">
              Homenagens públicas e diálogo com o sistema de Justiça
            </h3>
            <div className="mt-9">
              <HonorsCarousel slides={honors} />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
