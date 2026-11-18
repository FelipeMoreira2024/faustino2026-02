import Image from "next/image";
import { CheckCheck, Lock } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import { AdcWhatsAppLink } from "@/components/advogado-defesa-criminal/AdcWhatsAppLink";
import {
  ADC_AVATAR_SRC,
  ADC_BTN_WA,
  ADC_CONTAINER,
  ADC_EYEBROW,
  ADC_H2,
} from "@/components/advogado-defesa-criminal/ui";
import { onboardingSteps } from "@/lib/advogado-defesa-criminal";
import { WA_HOME_MESSAGE } from "@/lib/whatsapp";

function VerifiedAccountIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" role="img" aria-label="Conta verificada" className={className}>
      <title>Conta verificada</title>
      <polygon
        points="22.2,12 20.31,14.23 20.83,17.1 18.08,18.08 17.1,20.83 14.23,20.31 12,22.2 9.77,20.31 6.9,20.83 5.92,18.08 3.17,17.1 3.69,14.23 1.8,12 3.69,9.77 3.17,6.9 5.92,5.92 6.9,3.17 9.77,3.69 12,1.8 14.23,3.69 17.1,3.17 18.08,5.92 20.83,6.9 20.31,9.77"
        fill="#0095F6"
        stroke="#0095F6"
        strokeWidth={1.6}
        strokeLinejoin="round"
      />
      <path
        d="M7.9 12.4l2.8 2.8 5.5-5.9"
        fill="none"
        stroke="#fff"
        strokeWidth={2.1}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * Reduz a fricção do primeiro clique mostrando como a conversa abre no WhatsApp,
 * deixando explícito o atendimento particular com proposta transparente.
 */
export function AdcOnboardingPreview() {
  return (
    <section
      id="como-funciona"
      aria-labelledby="adc-how-heading"
      className="section-paper adc-defer relative bg-paper text-ink"
    >
      <div className={`${ADC_CONTAINER} py-16 lg:py-28`}>
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-16">
          <div className="lg:col-span-7">
            <Reveal>
              <p className={`${ADC_EYEBROW} text-brass-deep`}>Sem burocracia</p>
              <h2 id="adc-how-heading" className={`${ADC_H2} mt-3 text-ink`}>
                O que acontece assim que você chama no WhatsApp
              </h2>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-ink-soft sm:text-[17px] [text-wrap:pretty]">
                Você não precisa conhecer termos jurídicos nem reunir documentos antes do primeiro
                contato:
              </p>
            </Reveal>

            <ol className="mt-9 space-y-7">
              {onboardingSteps.map(({ title, text }, index) => (
                <li key={title} className="flex gap-4 sm:gap-5">
                  <span
                    aria-hidden="true"
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-brass-deep/35 bg-brass-deep/10 font-display text-lg font-semibold text-brass-deep"
                  >
                    0{index + 1}
                  </span>
                  <Reveal delay={index * 65}>
                    <h3 className="font-display text-xl font-semibold text-ink">{title}</h3>
                    <p className="mt-1.5 text-[15px] leading-relaxed text-ink-soft [text-wrap:pretty]">
                      {text}
                    </p>
                  </Reveal>
                </li>
              ))}
            </ol>

            <Reveal delay={110}>
              <div className="mt-9">
                <AdcWhatsAppLink section="como-funciona" className={ADC_BTN_WA}>
                  <WhatsAppIcon className="h-5 w-5 shrink-0" />
                  Iniciar conversa no WhatsApp
                </AdcWhatsAppLink>
              </div>
            </Reveal>
          </div>

          <Reveal delay={90} className="lg:col-span-5">
            <div className="mx-auto max-w-md">
              <figure className="overflow-clip rounded-2xl border border-ink/15 bg-[#0b141a] shadow-[0_32px_68px_-32px_rgba(16,20,24,0.75)]">
                <div className="flex items-center gap-3 bg-[#1f2c34] px-4 py-3.5">
                  <Image
                    src={ADC_AVATAR_SRC}
                    alt=""
                    width={42}
                    height={42}
                    loading="lazy"
                    className="h-10.5 w-10.5 shrink-0 rounded-full object-cover"
                  />
                  <div className="min-w-0 leading-tight">
                    <p className="flex items-center gap-1.5 text-[15px] font-semibold text-[#e9edef]">
                      <span className="truncate">Dr. Rodrigo Faustino</span>
                      <VerifiedAccountIcon className="h-4 w-4 shrink-0" />
                    </p>
                    <p className="mt-0.5 truncate text-xs text-[#8696a0]">
                      Advogado criminalista · plantão 24h
                    </p>
                  </div>
                </div>

                <div className="adc-wa-surface px-4 pb-7 pt-5">
                  <p className="mx-auto mb-5 w-fit rounded-md bg-[#182229] px-3 py-1 text-[11px] font-medium uppercase tracking-wide text-[#8696a0]">
                    Conversa protegida
                  </p>

                  <div className="ml-auto w-fit max-w-[90%] rounded-xl rounded-tr-none bg-[#005c4b] px-3.5 pb-2 pt-2.5 text-[15px] leading-snug text-[#e9edef] shadow-md">
                    {WA_HOME_MESSAGE}
                    <span className="mt-1.5 flex items-center justify-end gap-1 text-[11px] text-[#9fc3ba]">
                      agora
                      <CheckCheck className="h-3.5 w-3.5" strokeWidth={2} aria-hidden="true" />
                    </span>
                  </div>
                </div>

                <figcaption className="border-t border-white/10 bg-[#111b21] px-4 py-3.5 text-[13px] leading-relaxed text-[#9aa7b0]">
                  A conversa abre pronta no WhatsApp — basta tocar em enviar.
                </figcaption>
              </figure>

              <div className="mt-4 flex items-start gap-2.5 rounded-xl border border-ink/15 bg-white/80 p-4 text-[13.5px] leading-relaxed text-ink-soft">
                <Lock
                  className="mt-0.5 h-4 w-4 shrink-0 text-brass-deep"
                  strokeWidth={1.8}
                  aria-hidden="true"
                />
                <p className="[text-wrap:pretty]">
                  <strong className="font-semibold text-ink">Sigilo garantido por lei:</strong>{" "}
                  tudo o que você relatar na conversa inicial está protegido pelo dever de sigilo
                  profissional, mesmo antes da contratação.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
