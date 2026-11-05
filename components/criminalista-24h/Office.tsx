import Image from "next/image";
import { Clock, MapPin, Phone } from "lucide-react";
import { PhoneLink } from "@/components/PhoneLink";
import { Reveal } from "@/components/Reveal";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import { C24WhatsAppLink } from "@/components/criminalista-24h/WhatsAppLink";
import { BTN_WA, CONTAINER, EYEBROW, H2 } from "@/components/criminalista-24h/ui";
import { OFFICE_BUILDING } from "@/lib/criminalista-24h";
import { MAPS_LINK, PHONE_DISPLAY } from "@/lib/site";

/** Endereço real e foto do escritório no lugar do mapa embutido: mesma prova de presença local, sem iframe pesado. */
export function C24Office() {
  return (
    <section id="escritorio" className="cv-auto relative bg-ink">
      <div className={`${CONTAINER} py-16 lg:py-28`}>
        <div className="grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-16">
          <Reveal className="order-last lg:order-first lg:col-span-5">
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-ink-elevated">
              <Image
                src="/images/criminalista-24h/dr-rodrigo-janela.webp"
                alt="Dr. Rodrigo Faustino no escritório do Setor Marista, em Goiânia"
                fill
                quality={70}
                sizes="(min-width: 1024px) 26rem, (min-width: 640px) 34rem, calc(100vw - 2.5rem)"
                className="object-cover object-[center_25%]"
              />
            </div>
          </Reveal>

          <Reveal delay={80} className="lg:col-span-7">
            <p className={`${EYEBROW} text-brass`}>Escritório</p>
            <h2 className={`${H2} mt-3 text-paper`}>Atendimento em Goiânia, no Setor Marista</h2>

            <ul className="mt-8 space-y-5 text-paper">
              <li className="flex items-start gap-3.5">
                <MapPin className="mt-1 h-5 w-5 shrink-0 text-brass" strokeWidth={1.6} aria-hidden="true" />
                <span className="leading-relaxed">
                  Rua 1.136, nº 246 — {OFFICE_BUILDING}
                  <span className="block text-muted">Setor Marista, Goiânia/GO — CEP 74180-150</span>
                </span>
              </li>
              <li className="flex items-start gap-3.5">
                <Clock className="mt-1 h-5 w-5 shrink-0 text-brass" strokeWidth={1.6} aria-hidden="true" />
                <span className="leading-relaxed">
                  Plantão 24 horas, todos os dias
                  <span className="block text-muted">
                    Goiânia, Aparecida de Goiânia e região metropolitana
                  </span>
                </span>
              </li>
              <li className="flex items-start gap-3.5">
                <Phone className="mt-3 h-5 w-5 shrink-0 text-brass" strokeWidth={1.6} aria-hidden="true" />
                <PhoneLink
                  section="escritorio"
                  variant="text"
                  className="text-base font-semibold [&>svg]:hidden"
                >
                  {PHONE_DISPLAY}
                </PhoneLink>
              </li>
            </ul>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <C24WhatsAppLink section="escritorio" className={BTN_WA}>
                <WhatsAppIcon className="h-5 w-5 shrink-0" />
                Falar no WhatsApp
              </C24WhatsAppLink>
              <a
                href={MAPS_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[56px] w-full items-center justify-center gap-2.5 rounded-lg border border-brass/35 px-7 font-semibold text-paper transition-[border-color,background-color] duration-300 hover:border-brass hover:bg-brass/10 sm:w-auto"
              >
                <MapPin className="h-4 w-4 text-brass" strokeWidth={1.6} aria-hidden="true" />
                Como chegar
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
