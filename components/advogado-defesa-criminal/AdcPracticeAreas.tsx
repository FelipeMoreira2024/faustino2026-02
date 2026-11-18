import { Reveal } from "@/components/Reveal";
import { ADC_CONTAINER, ADC_EYEBROW, ADC_H2 } from "@/components/advogado-defesa-criminal/ui";
import { practiceAreas } from "@/lib/advogado-defesa-criminal";

/**
 * Repertório completo de atuação na defesa criminal (todas as áreas formuladas
 * sob a perspectiva de quem é investigado ou acusado).
 */
export function AdcPracticeAreas() {
  return (
    <section
      id="especialidades"
      aria-labelledby="adc-practice-heading"
      className="section-paper adc-defer relative bg-paper text-ink"
    >
      <div className={`${ADC_CONTAINER} py-16 lg:py-26`}>
        <Reveal>
          <p className={`${ADC_EYEBROW} text-brass-deep`}>Áreas de atuação criminal</p>
          <h2 id="adc-practice-heading" className={`${ADC_H2} mt-3 max-w-3xl text-ink`}>
            Defesa técnica em qualquer fase — da delegacia aos tribunais
          </h2>
        </Reveal>

        <ul className="mt-10 grid gap-px overflow-clip rounded-2xl border border-ink/15 bg-ink/15 sm:grid-cols-2 lg:grid-cols-4">
          {practiceAreas.map(({ title, text }, index) => (
            <li
              key={title}
              className="bg-white/75 p-5 transition-colors duration-300 hover:bg-white sm:p-6"
            >
              <Reveal delay={Math.min(index * 40, 200)}>
                <h3 className="font-display text-[1.08rem] font-semibold leading-snug text-ink [text-wrap:pretty]">
                  {title}
                </h3>
                <p className="mt-2 text-[14px] leading-relaxed text-ink-soft [text-wrap:pretty]">
                  {text}
                </p>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
