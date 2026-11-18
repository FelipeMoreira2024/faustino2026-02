import Image from "next/image";
import { Clock, MapPin, Phone } from "lucide-react";
import { PhoneLink } from "@/components/PhoneLink";
import { Reveal } from "@/components/Reveal";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import { AcWhatsAppLink } from "@/components/advogado-criminal/WhatsAppCta";
import { AC_BTN_WA, AC_CONTAINER, AC_EYEBROW, AC_H2 } from "@/components/advogado-criminal/ui";
import { OFFICE_BUILDING } from "@/lib/advogado-criminal";
import { MAPS_LINK, PHONE_DISPLAY } from "@/lib/site";

/**
 * Presença física verificável no Setor Marista sem o peso de iframe do Google Maps:
 * carrega rápido no 4G e reforça solidez institucional para clientes pagantes.
 */
export function AcOfficeSection() {
  return (
    <section
      id="escritorio"
      aria-labelledby="ac-office-heading"
      className="ac-defer relative bg-ink-elevated"
    >
      <div className={`${AC_CONTAINER} py-16 lg:py-28`}>
        <div className="grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-16">
          <Reveal className="order-last lg:order-first lg:col-span-5">
            <div className="relative aspect-[4/5] overflow-clip rounded-2xl border border-brass/20 bg-ink shadow-[0_24px_56px_-24px_rgba(0,0,0,0.85)]">
              <Image
                src="/images/advogado-criminal/dr-rodrigo-escritorio.webp"
                alt="Dr. Rodrigo Faustino na biblioteca do escritório no Setor Marista, em Goiânia"
                fill
                loading="lazy"
                quality={75}
                sizes="(min-width: 1024px) 26rem, (min-width: 640px) 34rem, calc(100vw - 2.5rem)"
                className="object-cover object-top"
              />
            </div>
          </Reveal>

          <Reveal delay={70} className="lg:col-span-7">
            <p className={`${AC_EYEBROW} text-brass`}>Sede própria em Goiânia</p>
            <h2 id="ac-office-heading" className={`${AC_H2} mt-3 text-paper`}>
              Escritório físico no Setor Marista e plantão 24h na região
            </h2>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-muted [text-wrap:pretty]">
              Estrutura reservada para reuniões presenciais com clientes e familiares, aliada ao
              deslocamento imediato para delegacias, fóruns e unidades prisionais.
            </p>

            <ul className="mt-8 space-y-5 text-paper">
              <li className="flex items-start gap-3.5">
                <MapPin className="mt-1 h-5 w-5 shrink-0 text-brass" strokeWidth={1.6} aria-hidden="true" />
                <span className="leading-relaxed">
                  <strong className="font-semibold text-paper">
                    Rua 1.136, nº 246 — {OFFICE_BUILDING}
                  </strong>
                  <span className="block text-sm text-muted">
                    Setor Marista, Goiânia/GO — CEP 74180-150
                  </span>
                </span>
              </li>

              <li className="flex items-start gap-3.5">
                <Clock className="mt-1 h-5 w-5 shrink-0 text-brass" strokeWidth={1.6} aria-hidden="true" />
                <span className="leading-relaxed">
                  <strong className="font-semibold text-paper">
                    Plantão criminal 24 horas, todos os dias
                  </strong>
                  <span className="block text-sm text-muted">
                    Goiânia, Aparecida de Goiânia, Anápolis e todo o Estado de Goiás
                  </span>
                </span>
              </li>

              <li className="flex items-center gap-3.5">
                <Phone className="h-5 w-5 shrink-0 text-brass" strokeWidth={1.6} aria-hidden="true" />
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
              <AcWhatsAppLink section="escritorio" className={`${AC_BTN_WA} sm:whitespace-nowrap`}>
                <WhatsAppIcon className="h-5 w-5 shrink-0" />
                Chamar no WhatsApp
              </AcWhatsAppLink>

              <a
                href={MAPS_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[58px] w-full items-center justify-center gap-2.5 rounded-lg border border-brass/35 px-6 font-semibold text-paper transition-colors duration-200 hover:border-brass hover:bg-brass/10 sm:w-auto sm:whitespace-nowrap"
              >
                <MapPin className="h-4 w-4 shrink-0 text-brass" strokeWidth={1.7} aria-hidden="true" />
                Ver no Google Maps
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
