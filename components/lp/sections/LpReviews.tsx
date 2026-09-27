import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { CONTAINER, SectionLabel, Stars } from "@/components/lp/ui";
import { GOOGLE_REVIEWS_URL, reviews } from "@/lib/lp-defesa-criminal";

export function LpReviews() {
  return (
    <section id="avaliacoes" className="section-paper cv-auto bg-paper text-ink">
      <div className={`${CONTAINER} grid gap-12 py-16 lg:grid-cols-12 lg:gap-16 lg:py-28`}>
        <Reveal className="lg:col-span-4">
          <SectionLabel numeral="IV" tone="paper">
            Avaliações
          </SectionLabel>
          <p className="lp-serif mt-6 text-[5.5rem] font-light leading-[0.85] tracking-[-0.04em] sm:text-[6.5rem]">
            5,0
          </p>
          <Stars className="mt-4 text-brass-deep" />
          <p className="mt-4 max-w-xs leading-relaxed text-ink-soft">
            Nota média no Google, em avaliações públicas deixadas por clientes.
          </p>
          <a
            href={GOOGLE_REVIEWS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-6 inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold"
          >
            <span className="link-underline">Ver as avaliações no Google</span>
            <ArrowUpRight
              className="h-4 w-4 text-brass-deep transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </a>
        </Reveal>

        <div className="grid gap-x-12 gap-y-10 sm:grid-cols-2 lg:col-span-8">
          {reviews.map((review, index) => {
            const featured = index === 0;
            return (
              <Reveal key={review.name} delay={index * 60} className={featured ? "sm:col-span-2" : undefined}>
                <figure className="border-t border-ink/15 pt-6">
                  <blockquote
                    className={
                      featured
                        ? "lp-serif lp-hang text-[1.55rem] italic leading-[1.35] tracking-[-0.01em] sm:text-[2rem]"
                        : "lp-serif lp-hang text-[1.3rem] italic leading-[1.45] tracking-[-0.005em]"
                    }
                  >
                    “{review.text}”
                  </blockquote>
                  <figcaption className="mt-4 text-xs font-medium uppercase tracking-[0.14em] text-ink-soft">
                    {review.name} · Google
                  </figcaption>
                </figure>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
