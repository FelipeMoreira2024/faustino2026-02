import Image from "next/image";
import { Check } from "lucide-react";
import { HonorsCarousel } from "@/components/HonorsCarousel";
import { Reveal } from "@/components/Reveal";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import { AdcWhatsAppLink } from "@/components/advogado-defesa-criminal/AdcWhatsAppLink";
import {
  ADC_BTN_WA,
  ADC_CONTAINER,
  ADC_EYEBROW,
  ADC_H2,
} from "@/components/advogado-defesa-criminal/ui";
import { attorneyPoints, honors } from "@/lib/advogado-defesa-criminal";

/**
 * Seção de autoridade pessoal e institucional do Dr. Rodrigo Faustino:
 * retrato de novembro em terno preto na biblioteca, postura de defesa sem
 * julgamento moral, liderança na ABRACRIM/GO e galeria de honrarias oficiais.
 */
export function AdcAuthority() {
  return (
    <section
      id="dr-rodrigo-faustino"
      aria-labelledby="adc-authority-heading"
      className="adc-defer relative bg-ink"
    >
      <div className={`${ADC_CONTAINER} py-16 lg:py-28`}>
        <div className="grid gap-10 lg:grid-cols-12 lg:items-start lg:gap-14">
          <Reveal className="lg:col-span-5">
            <figure>
              <div className="relative aspect-[4/5] w-full overflow-clip rounded-2xl border border-brass/20 bg-ink-elevated shadow-[0_24px_56px_-24px_rgba(0,0,0,0.85)]">
                <Image
                  src="/images/advogado-defesa-criminal/autoridade-estudio.webp"
                  alt="Dr. Rodrigo Faustino em pé na biblioteca de seu escritório no Setor Marista, Goiânia"
                  fill
                  loading="lazy"
                  quality={75}
                  sizes="(min-width: 1024px) 26rem, (min-width: 640px) 34rem, calc(100vw - 2.5rem)"
                  className="object-cover object-top"
                />
              </div>
              <figcaption className="mt-3 text-xs leading-relaxed text-muted">
                Dr. Rodrigo Faustino — sede do escritório no Setor Marista, Goiânia/GO.
              </figcaption>
            </figure>
          </Reveal>

          <Reveal delay={70} className="lg:col-span-7">
            <p className={`${ADC_EYEBROW} text-brass`}>Quem assume a sua defesa</p>
            <h2 id="adc-authority-heading" className={`${ADC_H2} mt-3 text-paper`}>
              Dr. Rodrigo Faustino
            </h2>
            <p className="mt-2 text-base font-medium text-brass">
              Advogado Criminalista · Presidente da Comissão de Direitos e Prerrogativas da
              ABRACRIM/GO
            </p>

            <blockquote className="mt-6 rounded-xl border-l-2 border-brass bg-ink-elevated p-5 sm:p-6">
              <p className="font-display text-[1.15rem] italic leading-relaxed text-paper sm:text-[1.28rem] [text-wrap:pretty]">
                “Eu não sou contratado para fazer julgamento moral. Minha função é examinar os
                fatos, questionar a prova, apontar ilegalidades e exigir o cumprimento da lei.”
              </p>
              <footer className="mt-3 text-xs font-semibold uppercase tracking-[0.15em] text-brass">
                Compromisso de defesa · Dr. Rodrigo Faustino
              </footer>
            </blockquote>

            <ul className="mt-7 space-y-4">
              {attorneyPoints.map(({ title, detail }) => (
                <li key={title} className="flex items-start gap-3.5">
                  <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brass/15 text-brass">
                    <Check className="h-3.5 w-3.5" strokeWidth={2.5} aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="text-[15.5px] font-semibold leading-snug text-paper">{title}</h3>
                    <p className="mt-1 text-[14.5px] leading-relaxed text-muted [text-wrap:pretty]">
                      {detail}
                    </p>
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-9">
              <AdcWhatsAppLink section="autoridade" className={ADC_BTN_WA}>
                <WhatsAppIcon className="h-5 w-5 shrink-0" />
                Conversar diretamente com o Dr. Rodrigo
              </AdcWhatsAppLink>
            </div>
          </Reveal>
        </div>

        <Reveal delay={90}>
          <div className="mt-16 border-t border-brass/15 pt-12 lg:mt-24 lg:pt-16">
            <p className={`${ADC_EYEBROW} text-brass`}>Trajetória e reconhecimento público</p>
            <h3 className="mt-3 max-w-2xl font-display text-2xl font-semibold tracking-[-0.012em] text-paper sm:text-3xl">
              Homenagens oficiais e atuação junto às instituições de Justiça
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
