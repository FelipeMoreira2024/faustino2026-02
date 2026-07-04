import { Star } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { SectionMarker } from "@/components/SectionMarker";

const testimonials = [
  {
    name: "A. S.",
    text: "Liguei de madrugada quando meu irmão foi detido e fui atendido na hora. O Dr. Rodrigo acompanhou tudo na delegacia e conduziu o caso com muito profissionalismo.",
  },
  {
    name: "M. R.",
    text: "Atendimento rápido e direto com o advogado. Em um momento de desespero, ter orientação clara sobre cada etapa do processo fez toda a diferença para a família.",
  },
  {
    name: "J. C.",
    text: "Profissional extremamente técnico e atencioso. Conduziu o processo com seriedade, sempre explicando os próximos passos e mantendo total sigilo.",
  },
];

export function Testimonials() {
  return (
    <section className="cv-auto relative bg-ink" id="depoimentos">
      <SectionMarker number="09" tone="ink" />
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 lg:px-20 lg:py-28">
        <Reveal>
          <h2 className="font-display text-3xl font-semibold tracking-[-0.01em] text-paper sm:text-4xl">
            O que dizem os clientes
          </h2>
          <p className="mt-4 text-paper">
            <strong className="font-semibold">
              Avaliação média 5.0 no Google
            </strong>{" "}
            — por clientes reais
          </p>
        </Reveal>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {testimonials.map(({ name, text }, i) => (
            <Reveal key={name} delay={i * 70}>
              <figure className="flex h-full flex-col border border-brass/15 bg-ink-elevated p-6 sm:p-7">
                <div
                  className="flex gap-1"
                  role="img"
                  aria-label="Avaliação de 5 estrelas"
                >
                  {Array.from({ length: 5 }).map((_, s) => (
                    <Star
                      key={s}
                      className="h-3.5 w-3.5 fill-brass text-brass"
                      strokeWidth={1}
                      aria-hidden="true"
                    />
                  ))}
                </div>
                <blockquote className="mt-4 flex-1 text-[15px] leading-relaxed text-paper">
                  “{text}”
                </blockquote>
                <figcaption className="mt-5 text-xs font-medium uppercase tracking-[0.15em] text-muted">
                  {name} — Google
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>

        <Reveal delay={140}>
          <p className="mt-10">
            <a
              href="https://www.google.com/search?q=Rodrigo+Faustino+Advogado+Criminalista+Goi%C3%A2nia"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-brass underline decoration-brass/40 underline-offset-4 transition-colors hover:decoration-brass"
            >
              Ver avaliações no Google
            </a>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
