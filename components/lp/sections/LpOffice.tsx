import Image from "next/image";
import { Clock, MapPin } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { CONTAINER, SectionLabel } from "@/components/lp/ui";
import { MAPS_LINK } from "@/lib/site";

export function LpOffice() {
  return (
    <section id="escritorio" className="cv-auto relative bg-ink">
      <div className={`${CONTAINER} grid gap-10 py-16 lg:grid-cols-12 lg:items-center lg:gap-16 lg:py-28`}>
        <Reveal className="lg:col-span-7">
          <figure>
            <div className="lp-photo relative -mx-5 aspect-[16/10] overflow-hidden bg-ink-elevated sm:mx-0">
              <Image
                src="/images/lp/escritorio-setor-marista.webp"
                alt="Sala do escritório, com estantes de livros jurídicos e o Dr. Rodrigo Faustino ao fundo"
                fill
                quality={65}
                sizes="(min-width: 1024px) 55vw, 100vw"
                className="object-cover object-[50%_40%]"
              />
            </div>
            <figcaption className="lp-caption mt-3">O escritório, no Setor Marista.</figcaption>
          </figure>
        </Reveal>

        <Reveal delay={80} className="lg:col-span-5">
          <SectionLabel numeral="IX">O escritório</SectionLabel>
          <h2 className="lp-serif mt-5 text-[2rem] font-medium leading-[1.1] tracking-[-0.02em] text-paper sm:text-[2.6rem]">
            Atendimento presencial em Goiânia.
          </h2>
          <ul className="mt-7 space-y-4 text-[15px] leading-relaxed text-muted">
            <li className="flex gap-3">
              <MapPin className="mt-1 h-4 w-4 shrink-0 text-brass" strokeWidth={1.5} aria-hidden="true" />
              <span>
                <span className="text-paper">Rua 1.136, nº 246 — Setor Marista</span>
                <br />
                Goiânia/GO · CEP 74180-150
              </span>
            </li>
            <li className="flex gap-3">
              <Clock className="mt-1 h-4 w-4 shrink-0 text-brass" strokeWidth={1.5} aria-hidden="true" />
              <span>
                Plantão 24 horas para prisões e urgências. Atende Goiânia, Aparecida de Goiânia e
                região metropolitana.
              </span>
            </li>
          </ul>
          <a
            href={MAPS_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="lp-btn lp-btn-line mt-8 w-full sm:w-auto"
          >
            <MapPin className="h-4 w-4 shrink-0 text-brass" strokeWidth={1.5} aria-hidden="true" />
            Abrir no Google Maps
          </a>
        </Reveal>
      </div>
    </section>
  );
}
