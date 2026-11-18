import Image from "next/image";
import { Check, Lock } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import { AdcWhatsAppLink } from "@/components/advogado-defesa-criminal/AdcWhatsAppLink";
import { ADC_BTN_WA, ADC_CONTAINER } from "@/components/advogado-defesa-criminal/ui";
import { confidentialPillars } from "@/lib/advogado-defesa-criminal";
import { WA_SIGILO } from "@/lib/whatsapp";

/**
 * Bloco dedicado para casos de alta sensibilidade (crimes sexuais, investigações
 * digitais ou exposição familiar/empresarial), removendo a barreira de vergonha/receio.
 */
export function AdcConfidential() {
  return (
    <section
      id="sigilo-absoluto"
      aria-labelledby="adc-confidential-heading"
      className="adc-defer relative border-t border-brass/15 bg-ink-elevated"
    >
      <div className={`${ADC_CONTAINER} py-16 lg:py-24`}>
        <div className="overflow-clip rounded-2xl border border-brass/25 bg-ink lg:grid lg:grid-cols-12 lg:items-center">
          <Reveal className="p-6 sm:p-9 lg:col-span-7 lg:p-12">
            <p className="inline-flex items-center gap-2 rounded-full border border-brass/30 bg-brass/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.15em] text-brass">
              <Lock className="h-3.5 w-3.5" strokeWidth={1.8} aria-hidden="true" />
              Atendimento estritamente reservado
            </p>

            <h2
              id="adc-confidential-heading"
              className="mt-4 font-display text-[1.75rem] font-semibold leading-[1.12] tracking-[-0.015em] text-paper sm:text-[2.2rem]"
            >
              Acusado de crime sexual ou caso sensível? Aja antes de falar.
            </h2>

            <p className="mt-4 text-[15.5px] leading-relaxed text-muted sm:text-base [text-wrap:pretty]">
              Em acusações que envolvem dignidade sexual, vida familiar ou reputação profissional,
              uma declaração precipitada pode definir o rumo do procedimento. Atuamos com{" "}
              <strong className="font-semibold text-paper">
                discrição absoluta e estratégia técnica
              </strong>{" "}
              desde a primeira mensagem.
            </p>

            <ul className="mt-6 space-y-3">
              {confidentialPillars.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-[15px] leading-snug text-paper"
                >
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
              <AdcWhatsAppLink
                section="defesa-reservada"
                href={WA_SIGILO}
                topic="adc_cenario_4"
                className={ADC_BTN_WA}
              >
                <WhatsAppIcon className="h-5 w-5 shrink-0" />
                Falar com total sigilo no WhatsApp
              </AdcWhatsAppLink>
            </div>
          </Reveal>

          <Reveal delay={80} className="hidden h-full lg:col-span-5 lg:block">
            <div className="relative h-full min-h-[30rem] w-full">
              <Image
                src="/images/advogado-defesa-criminal/sigilo-leitura.webp"
                alt="Dr. Rodrigo Faustino revisando processo digital diante de livros de Direito Criminal"
                fill
                loading="lazy"
                quality={75}
                sizes="30rem"
                className="object-cover object-[center_20%]"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
