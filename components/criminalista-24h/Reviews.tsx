import { ArrowUpRight, Star } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { CONTAINER, EYEBROW, H2 } from "@/components/criminalista-24h/ui";
import {
  GOOGLE_RATING,
  GOOGLE_REVIEWS_COUNT,
  GOOGLE_REVIEWS_URL,
  reviews,
} from "@/lib/criminalista-24h";

function Stars({ size = "h-3.5 w-3.5" }: { size?: string }) {
  return (
    <span className="flex gap-0.5" role="img" aria-label="5 de 5 estrelas">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className={`${size} fill-brass text-brass`} strokeWidth={1} aria-hidden="true" />
      ))}
    </span>
  );
}

/** A nota com o número de avaliações convence mais que um superlativo — e é verificável. */
export function C24Reviews() {
  return (
    <section id="avaliacoes" className="cv-auto relative bg-ink-elevated">
      <div className={`${CONTAINER} py-16 lg:py-24`}>
        <Reveal>
          <div className="lg:flex lg:items-end lg:justify-between lg:gap-12">
            <div>
              <p className={`${EYEBROW} text-brass`}>Avaliações no Google</p>
              <h2 className={`${H2} mt-3 max-w-2xl text-paper`}>
                Nota <span className="text-brass">{GOOGLE_RATING}</span> com {GOOGLE_REVIEWS_COUNT}{" "}
                avaliações de clientes
              </h2>
            </div>
            <a
              href={GOOGLE_REVIEWS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-5 inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-brass underline-offset-4 hover:underline lg:mt-0 lg:shrink-0"
            >
              Ver todas no Google
              <ArrowUpRight
                className="h-4 w-4 transition-transform duration-300 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5 motion-reduce:transform-none"
                strokeWidth={1.8}
                aria-hidden="true"
              />
            </a>
          </div>
        </Reveal>

        <div className="mt-10 grid gap-4 md:grid-cols-3 lg:gap-5">
          {reviews.map(({ name, text }, i) => (
            <Reveal key={name} delay={i * 70} className="h-full">
              <figure className="c24-spot flex h-full flex-col rounded-xl border border-brass/15 bg-ink p-6 transition-colors duration-300 hover:border-brass/40 sm:p-7">
                <Stars />
                <blockquote className="mt-4 flex-1 text-[15px] leading-relaxed text-paper">
                  “{text}”
                </blockquote>
                <figcaption className="mt-5 flex items-center gap-3">
                  <span
                    aria-hidden="true"
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-brass/15 font-display text-sm font-semibold text-brass"
                  >
                    {name.charAt(0)}
                  </span>
                  <span className="text-sm leading-tight">
                    <span className="block font-semibold text-paper">{name}</span>
                    <span className="block text-xs text-muted">Avaliação no Google</span>
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
