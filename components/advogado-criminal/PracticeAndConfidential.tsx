import Image from "next/image";
import { Check, Lock } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import { AcWhatsAppLink } from "@/components/advogado-criminal/WhatsAppCta";
import { AC_BTN_WA, AC_CONTAINER, AC_EYEBROW, AC_H2 } from "@/components/advogado-criminal/ui";
import { practiceAreas, sensitiveHighlights } from "@/lib/advogado-criminal";

/**
 * Une o repertório completo de especialidades criminais com um bloco dedicado de
 * alta discrição para acusações delicadas e crimes contra a dignidade sexual
 * (ilustrado com a foto de novembro examinando autos diante da biblioteca).
 */
export function AcPracticeAndConfidential() {
  return (
    <section
      id="especialidades"
      aria-labelledby="ac-practice-heading"
      className="ac-defer relative bg-ink"
    >
      <div className={`${AC_CONTAINER} py-16 lg:py-28`}>
        <Reveal>
          <p className={`${AC_EYEBROW} text-brass`}>Áreas de atuação criminal</p>
          <h2 id="ac-practice-heading" className={`${AC_H2} mt-3 max-w-3xl text-paper`}>
            Defesa técnica em qualquer fase — da delegacia aos tribunais superiores
          </h2>
        </Reveal>

        <ul className="mt-10 grid gap-px overflow-clip rounded-2xl border border-brass/15 bg-brass/15 sm:grid-cols-2 lg:grid-cols-4">
          {practiceAreas.map(({ title, text }, index) => (
            <li
              key={title}
              className="bg-ink-elevated p-5 transition-colors duration-300 hover:bg-[#1e252f] sm:p-6"
            >
              <Reveal delay={Math.min(index * 40, 200)}>
                <h3 className="font-display text-[1.08rem] font-semibold leading-snug text-paper [text-wrap:pretty]">
                  {title}
                </h3>
                <p className="mt-2 text-[14px] leading-relaxed text-muted [text-wrap:pretty]">
                  {text}
                </p>
              </Reveal>
            </li>
          ))}
        </ul>

        {/* Destaque dedicado para casos sensíveis / crimes sexuais */}
        <div
          id="defesa-reservada"
          className="mt-14 overflow-clip rounded-2xl border border-brass/25 bg-ink-elevated lg:mt-20 lg:grid lg:grid-cols-12 lg:items-center"
        >
          <Reveal className="p-6 sm:p-9 lg:col-span-7 lg:p-12">
            <p className="inline-flex items-center gap-2 rounded-full border border-brass/30 bg-brass/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.15em] text-brass">
              <Lock className="h-3.5 w-3.5" strokeWidth={1.8} aria-hidden="true" />
              Atendimento estritamente reservado
            </p>

            <h3 className="mt-4 font-display text-[1.75rem] font-semibold leading-[1.12] tracking-[-0.015em] text-paper sm:text-[2.15rem]">
              Acusado de crime sexual ou caso sensível? Aja antes de falar.
            </h3>

            <p className="mt-4 text-[15.5px] leading-relaxed text-muted sm:text-base [text-wrap:pretty]">
              Em acusações que envolvem dignidade sexual, família ou exposição pública, uma única
              declaração precipitada pode comprometer todo o processo. Atuamos com{" "}
              <strong className="font-semibold text-paper">discrição total e estratégia técnica</strong>{" "}
              desde o primeiro minuto.
            </p>

            <ul className="mt-6 space-y-3">
              {sensitiveHighlights.map((item) => (
                <li key={item} className="flex items-start gap-3 text-[15px] leading-snug text-paper">
                  <Check
                    className="mt-0.5 h-4 w-4 shrink-0 text-brass"
                    strokeWidth={2.3}
                    aria-hidden="true"
                  />
                  <span className="[text-wrap:pretty]">{item}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8">
              <AcWhatsAppLink
                section="defesa-reservada"
                topic="ac_triagem_4"
                className={AC_BTN_WA}
              >
                <WhatsAppIcon className="h-5 w-5 shrink-0" />
                Falar com total sigilo agora
              </AcWhatsAppLink>
            </div>
          </Reveal>

          <Reveal delay={80} className="hidden h-full lg:col-span-5 lg:block">
            <div className="relative h-full min-h-[30rem] w-full">
              <Image
                src="/images/advogado-criminal/dr-rodrigo-sigilo.webp"
                alt="Dr. Rodrigo Faustino examinando processo digital diante de obras de Direito Criminal"
                fill
                loading="lazy"
                quality={75}
                sizes="30rem"
                className="object-cover object-[center_24%]"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
