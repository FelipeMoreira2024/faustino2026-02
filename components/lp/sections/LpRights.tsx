import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { LpWhatsAppLink } from "@/components/lp/LpWhatsAppLink";
import { CONTAINER, SectionLabel } from "@/components/lp/ui";
import { DEPOSITION_MESSAGE } from "@/lib/lp-defesa-criminal";

export function LpRights() {
  return (
    <section id="antes-de-falar" className="section-paper bg-paper text-ink">
      <div className={`${CONTAINER} grid gap-12 py-16 lg:grid-cols-12 lg:gap-16 lg:py-28`}>
        <Reveal className="lg:col-span-5">
          <SectionLabel numeral="II" tone="paper">
            Antes de falar
          </SectionLabel>
          <h2 className="lp-serif mt-5 text-[2rem] font-medium leading-[1.1] tracking-[-0.02em] sm:text-[2.6rem]">
            Não preste depoimento sem um advogado.
          </h2>
          <p className="mt-5 leading-relaxed text-ink-soft">
            Uma declaração dada sem orientação, nas primeiras horas, pode definir o rumo de todo o
            processo. Ficar em silêncio é um direito, e ele existe para proteger você.
          </p>
          <p className="mt-8">
            <LpWhatsAppLink
              section="antes-de-falar"
              message={DEPOSITION_MESSAGE}
              className="group inline-block py-2.5 font-semibold text-ink"
            >
              <span className="link-underline">Falar com o advogado antes do depoimento</span>
              <ArrowRight
                className="ml-2 inline h-4 w-4 align-[-0.15em] text-brass-deep transition-transform duration-300 group-hover:translate-x-1"
                aria-hidden="true"
              />
            </LpWhatsAppLink>
          </p>
        </Reveal>

        <div className="lg:col-span-7">
          <Reveal delay={60}>
            <figure className="border-l-2 border-brass-deep/70 pl-6 sm:pl-8">
              <blockquote className="lp-serif lp-hang text-[1.45rem] italic leading-[1.35] tracking-[-0.01em] sm:text-[1.85rem]">
                “o preso será informado de seus direitos, entre os quais o de permanecer calado,
                sendo-lhe assegurada a assistência da família e de advogado”
              </blockquote>
              <figcaption className="mt-5 text-sm text-ink-soft">
                Constituição Federal, art. 5º, inciso LXIII
              </figcaption>
            </figure>
          </Reveal>

          <Reveal delay={120}>
            <div className="mt-12 grid gap-8 border-t border-ink/15 pt-8 sm:grid-cols-2">
              <div>
                <h3 className="lp-serif text-xl font-medium leading-snug">
                  Audiência de custódia em até 24 horas
                </h3>
                <p className="mt-3 text-[15px] leading-relaxed text-ink-soft">
                  Depois da prisão em flagrante, o juiz decide nessa audiência se relaxa a prisão,
                  concede liberdade provisória ou a converte em preventiva (CPP, art. 310).
                </p>
              </div>
              <div>
                <h3 className="lp-serif text-xl font-medium leading-snug">
                  Chegar preparado faz diferença
                </h3>
                <p className="mt-3 text-[15px] leading-relaxed text-ink-soft">
                  Com a defesa constituída desde a delegacia, o pedido de liberdade é levado à
                  audiência já fundamentado, com documentos e argumentos.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
