import { Clock, MapPin, Phone } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { SectionMarker } from "@/components/SectionMarker";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { PHONE_DISPLAY, PHONE_TEL, WA_STANDARD } from "@/lib/whatsapp";

export const ADDRESS =
  "Rua 1.136, nº 246 — Setor Marista, Goiânia/GO — CEP 74180-150";

const MAPS_QUERY = encodeURIComponent(
  "Rua 1136, 246, Setor Marista, Goiânia - GO, 74180-150"
);
const MAPS_LINK = `https://www.google.com/maps/search/?api=1&query=${MAPS_QUERY}`;
const MAPS_EMBED = `https://www.google.com/maps?q=${MAPS_QUERY}&output=embed`;

export function Location() {
  return (
    <section
      className="section-paper cv-auto relative bg-paper text-ink"
      id="localizacao"
    >
      <SectionMarker number="11" tone="paper" />
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 lg:px-20 lg:py-32">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <h2 className="font-display text-3xl font-semibold tracking-[-0.01em] text-ink sm:text-4xl">
              Atendimento em Goiânia
            </h2>
            <p className="mt-6 font-display text-xl font-semibold text-ink">
              Dr. Rodrigo Faustino — OAB/GO 64.028
            </p>

            <ul className="mt-6 space-y-4 text-ink-soft">
              <li className="flex items-start gap-3">
                <MapPin
                  className="mt-1 h-4 w-4 shrink-0 text-brass-deep"
                  strokeWidth={1.5}
                  aria-hidden="true"
                />
                {ADDRESS}
              </li>
              <li className="flex items-start gap-3">
                <Phone
                  className="mt-1 h-4 w-4 shrink-0 text-brass-deep"
                  strokeWidth={1.5}
                  aria-hidden="true"
                />
                <a
                  href={PHONE_TEL}
                  className="underline-offset-4 hover:underline"
                >
                  {PHONE_DISPLAY}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Clock
                  className="mt-1 h-4 w-4 shrink-0 text-brass-deep"
                  strokeWidth={1.5}
                  aria-hidden="true"
                />
                Plantão 24 horas para urgências
              </li>
            </ul>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <WhatsAppButton section="localizacao" href={WA_STANDARD}>
                Falar no WhatsApp
              </WhatsAppButton>
              <a
                href={MAPS_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[52px] w-full items-center justify-center gap-2.5 rounded-md border border-ink/25 px-7 font-semibold text-ink transition-[border-color,background-color] duration-300 hover:border-ink hover:bg-ink/5 sm:w-auto"
              >
                <MapPin className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
                Ver no Google Maps
              </a>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div className="h-72 overflow-hidden border border-ink/15 lg:h-full lg:min-h-[380px]">
              <iframe
                src={MAPS_EMBED}
                title="Mapa do escritório — Setor Marista, Goiânia"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-full w-full border-0 grayscale"
                allowFullScreen
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
