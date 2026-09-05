import Image from "next/image";
import { Star, Scale, Award } from "lucide-react";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { PhoneLink } from "@/components/PhoneLink";
import { PHONE_DISPLAY, WA_HOME_B } from "@/lib/whatsapp";
import { SectionMarker } from "@/components/SectionMarker";

/**
 * Variante B do Hero (teste A/B da home).
 * Diferenças em relação ao Hero original:
 * - Linha 2 do H1 qualifica o público ("preso, intimado ou acusado") em vez de só "24 horas".
 * - Subheadline nomeia o advogado e antecipa "atendimento particular" (filtro de pagante).
 * - CTA nomeia pessoa + canal; CTA secundário de ligação para o público de flagrante.
 * - Micro-provas trocam o superlativo comparativo por dados factuais (nota 5,0; credencial ABRACRIM/OAB).
 */
const proofs = [
  { icon: Star, label: "Avaliação 5,0 no Google" },
  { icon: Scale, label: "+950 defesas criminais conduzidas" },
  { icon: Award, label: "ABRACRIM/GO • OAB/GO 64.028" },
];

export function HeroB() {
  return (
    <section className="relative bg-ink" id="hero">
      <SectionMarker number="02" tone="ink" hideOnMobile />
      <div className="mx-auto grid max-w-6xl gap-10 px-5 pb-14 pt-10 sm:px-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:gap-16 lg:px-20 lg:pb-20 lg:pt-10">
        <div>
          <span className="inline-flex items-center rounded-full border border-brass/40 px-3.5 py-1.5 text-[11px] font-medium uppercase tracking-[0.13em] text-brass sm:text-xs sm:tracking-[0.15em]">
            DEFESA CRIMINAL • PLANTÃO 24 HORAS
          </span>

          <h1 className="mt-6 font-display text-[clamp(2.2rem,6vw,4rem)] font-semibold leading-[1.08] tracking-[-0.015em] text-paper">
            Advogado Criminalista em Goiânia
            <span className="mt-3 block text-[0.62em] italic leading-[1.15] text-brass">
              Defesa imediata para quem foi preso, intimado ou acusado
            </span>
          </h1>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
            Você ou um familiar foi preso, recebeu intimação, está sendo
            investigado ou responde a um processo?{" "}
            <strong className="font-semibold text-paper">
              Atendimento particular e direto com o Dr. Rodrigo Faustino
            </strong>
            , a qualquer hora, em Goiânia e região.
          </p>

          <div className="mt-8">
            <WhatsAppButton section="hero" href={WA_HOME_B} className="sm:whitespace-nowrap">
              Falar agora com o Dr. Rodrigo no WhatsApp
            </WhatsAppButton>
            <div className="mt-2">
              <PhoneLink section="hero" variant="text">
                Ou ligue agora: {PHONE_DISPLAY}
              </PhoneLink>
            </div>
            <p className="mt-1 text-sm text-muted">
              Sigilo absoluto desde a primeira mensagem. Retorno rápido, inclusive
              à noite e nos fins de semana.
            </p>
          </div>

          <ul className="mt-8 flex flex-wrap gap-2.5">
            {proofs.map(({ icon: Icon, label }) => (
              <li
                key={label}
                className="inline-flex items-center gap-2 rounded-full border border-brass/30 px-3.5 py-2 text-[13px] font-medium text-paper transition-colors duration-300 hover:border-brass/70"
              >
                <Icon
                  className="h-3.5 w-3.5 shrink-0 text-brass"
                  strokeWidth={1.5}
                  aria-hidden="true"
                />
                {label}
              </li>
            ))}
          </ul>
        </div>

        <div className="tone-warm relative -mt-[2cm] aspect-[4/5] w-full max-w-[32rem] overflow-hidden justify-self-center lg:justify-self-end">
          <Image
            src="/images/dr-rodrigo-hero.webp"
            alt="Dr. Rodrigo Faustino, advogado criminalista em Goiânia"
            fill
            priority
            fetchPriority="high"
            quality={70}
            sizes="(max-width: 640px) calc(100vw - 2.5rem), (max-width: 1024px) 32rem, 45vw"
            className="object-cover object-[center_22%]"
          />
        </div>
      </div>
    </section>
  );
}
