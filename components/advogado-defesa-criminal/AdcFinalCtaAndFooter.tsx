import Image from "next/image";
import { Briefcase, Clock, Lock, User } from "lucide-react";
import { AgencyCredit } from "@/components/AgencyCredit";
import { CookieSettingsButton } from "@/components/CookieSettingsButton";
import { PhoneLink } from "@/components/PhoneLink";
import { Reveal } from "@/components/Reveal";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import { AdcWhatsAppLink } from "@/components/advogado-defesa-criminal/AdcWhatsAppLink";
import {
  ADC_AVATAR_SRC,
  ADC_BTN_WA,
  ADC_CONTAINER,
  ADC_FINAL_CTA_ID,
} from "@/components/advogado-defesa-criminal/ui";
import { PHONE_DISPLAY } from "@/lib/site";

const finalAssurances = [
  { icon: Clock, label: "Plantão 24h ativo" },
  { icon: User, label: "Direto com o Dr. Rodrigo" },
  { icon: Lock, label: "Sigilo profissional absoluto" },
  { icon: Briefcase, label: "Atendimento particular" },
];

export function AdcFinalCtaAndFooter() {
  return (
    <>
      <section
        id={ADC_FINAL_CTA_ID}
        aria-labelledby="adc-final-heading"
        className="relative overflow-clip border-t border-brass/20 bg-ink-elevated"
      >
        <div className="absolute inset-y-0 right-0 hidden w-[44%] lg:block">
          <div className="relative h-full w-full">
            <Image
              src="/images/advogado-defesa-criminal/escritorio-atendimento.webp"
              alt=""
              fill
              loading="lazy"
              quality={75}
              sizes="44vw"
              className="object-cover object-[center_20%]"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-[linear-gradient(90deg,var(--ink-elevated)_0%,rgba(26,32,40,0.68)_38%,rgba(26,32,40,0.1)_100%)]"
            />
          </div>
        </div>

        <div className={`${ADC_CONTAINER} relative`}>
          <Reveal className="py-20 lg:max-w-[39rem] lg:py-28">
            <div className="flex items-center gap-3.5">
              <Image
                src={ADC_AVATAR_SRC}
                alt=""
                width={52}
                height={52}
                loading="lazy"
                className="h-13 w-13 shrink-0 rounded-full border border-brass/50 object-cover"
              />
              <p className="font-display text-lg italic text-brass">
                Na defesa criminal, o silêncio protege e a rapidez decide.
              </p>
            </div>

            <h2
              id="adc-final-heading"
              className="mt-5 font-display text-[2.2rem] font-semibold leading-[1.06] tracking-[-0.02em] text-paper sm:text-[3.1rem]"
            >
              Precisa de defesa criminal agora?
            </h2>

            <p className="mt-4 max-w-xl text-[16.5px] leading-relaxed text-muted sm:text-[17.5px] [text-wrap:pretty]">
              Não tome decisões sem orientação nem compareça desacompanhado. Fale agora{" "}
              <strong className="font-semibold text-paper">diretamente com o Dr. Rodrigo Faustino</strong>{" "}
              e saiba qual é o próximo passo seguro para proteger seus direitos.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <AdcWhatsAppLink section="cta-final" className={ADC_BTN_WA}>
                <WhatsAppIcon className="h-5 w-5 shrink-0" />
                Falar agora no WhatsApp
              </AdcWhatsAppLink>

              <PhoneLink
                section="cta-final"
                className="min-h-[56px] rounded-lg border-brass/35 px-5 text-[15px] sm:w-auto"
              >
                Ligar: {PHONE_DISPLAY}
              </PhoneLink>
            </div>

            <ul className="mt-9 grid grid-cols-2 gap-x-5 gap-y-3 border-t border-brass/15 pt-6 text-sm text-muted sm:max-w-[30rem] sm:gap-x-8">
              {finalAssurances.map(({ icon: Icon, label }) => (
                <li key={label} className="inline-flex items-center gap-2">
                  <Icon className="h-4 w-4 shrink-0 text-brass" strokeWidth={1.6} aria-hidden="true" />
                  <span>{label}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <footer className="border-t border-brass/15 bg-ink pb-24 lg:pb-0">
        <div className="px-6 pt-6 text-center text-sm text-muted [&_button]:text-center">
          <CookieSettingsButton />
        </div>
        <div className="mx-auto max-w-6xl px-5 py-8 text-center sm:px-8">
          <Image
            src="/images/logo-faustino.webp"
            alt="Faustino Advocacia Especializada"
            width={200}
            height={72}
            loading="lazy"
            className="mx-auto mb-5 h-auto w-[150px] opacity-90 sm:w-[180px]"
          />
          <p className="text-xs leading-relaxed text-muted">
            Dr. Rodrigo Faustino — Advogado Criminalista em Goiânia • OAB/GO 64.028. Conteúdo
            meramente informativo, em conformidade com o Provimento 205/2021 da OAB.
          </p>
          <p className="mt-4 text-[11px] tracking-wide text-muted/50">
            <AgencyCredit />
          </p>
        </div>
      </footer>
    </>
  );
}
