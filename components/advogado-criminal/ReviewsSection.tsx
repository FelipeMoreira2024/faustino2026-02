import { ArrowUpRight, Star } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { AC_CONTAINER, AC_EYEBROW, AC_H2 } from "@/components/advogado-criminal/ui";
import {
  GOOGLE_RATING,
  GOOGLE_REVIEWS_COUNT,
  GOOGLE_REVIEWS_URL,
  reviews,
} from "@/lib/advogado-criminal";

function FiveStars() {
  return (
    <span className="inline-flex gap-0.5" role="img" aria-label="Avaliação de 5 estrelas">
      {Array.from({ length: 5 }).map((_, index) => (
        <Star
          key={index}
          className="h-3.5 w-3.5 fill-brass text-brass"
          strokeWidth={1}
          aria-hidden="true"
        />
      ))}
    </span>
  );
}

/**
 * Prova social verificável direto na aba de avaliações do Google Maps:
 * usa a nota pública real (4,9 em 249 avaliações) e depoimentos sem frases comparativas.
 */
export function AcReviewsSection() {
  return (
    <section
      id="avaliacoes"
      aria-labelledby="ac-reviews-heading"
      className="ac-defer relative bg-ink-elevated"
    >
      <div className={`${AC_CONTAINER} py-16 lg:py-26`}>
        <Reveal>
          <div className="flex flex-col gap-6 border-b border-brass/15 pb-8 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className={`${AC_EYEBROW} text-brass`}>Confiança comprovada em Goiânia</p>
              <h2 id="ac-reviews-heading" className={`${AC_H2} mt-3 max-w-2xl text-paper`}>
                Nota <span className="text-brass">{GOOGLE_RATING}</span> em {GOOGLE_REVIEWS_COUNT}{" "}
                avaliações públicas no Google
              </h2>
              <p className="mt-3 max-w-xl text-base leading-relaxed text-muted [text-wrap:pretty]">
                Relatos reais sobre tranquilidade, postura técnica e acompanhamento em momentos
                delicados.
              </p>
            </div>

            <a
              href={GOOGLE_REVIEWS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex min-h-11 w-fit items-center gap-2 rounded-lg border border-brass/30 bg-ink px-4 py-2.5 text-sm font-semibold text-brass transition-colors duration-200 hover:border-brass hover:bg-brass/10"
            >
              Conferir avaliações no Google Maps
              <ArrowUpRight
                className="h-4 w-4 shrink-0 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 motion-reduce:transform-none"
                strokeWidth={1.8}
                aria-hidden="true"
              />
            </a>
          </div>
        </Reveal>

        <div className="mt-9 grid gap-4 md:grid-cols-3 lg:gap-5">
          {reviews.map(({ name, context, text }, index) => (
            <Reveal key={name} delay={index * 70} className="h-full">
              <figure className="flex h-full flex-col justify-between rounded-2xl border border-brass/15 bg-ink p-6 transition-colors duration-300 hover:border-brass/45 sm:p-7">
                <div>
                  <FiveStars />
                  <blockquote className="mt-4 text-[15.5px] leading-relaxed text-paper [text-wrap:pretty]">
                    “{text}”
                  </blockquote>
                </div>

                <figcaption className="mt-6 flex items-center gap-3 border-t border-white/10 pt-4">
                  <span
                    aria-hidden="true"
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-brass/30 bg-brass/10 font-display text-sm font-semibold text-brass"
                  >
                    {name.charAt(0)}
                  </span>
                  <div className="min-w-0 leading-tight">
                    <span className="block truncate text-sm font-semibold text-paper">{name}</span>
                    <span className="mt-0.5 block truncate text-xs text-muted">{context}</span>
                  </div>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
