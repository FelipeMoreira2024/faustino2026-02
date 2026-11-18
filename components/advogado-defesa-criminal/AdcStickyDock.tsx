"use client";

import Image from "next/image";
import { Phone } from "lucide-react";
import { useEffect, useState } from "react";
import { trackPhoneLead } from "@/components/WhatsAppButton";
import { useLeadTracking } from "@/components/LeadTrackingContext";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import { AdcWhatsAppLink } from "@/components/advogado-defesa-criminal/AdcWhatsAppLink";
import {
  ADC_AVATAR_SRC,
  ADC_FINAL_CTA_ID,
  ADC_HERO_CTA_ID,
} from "@/components/advogado-defesa-criminal/ui";
import { PHONE_TEL } from "@/lib/site";

/**
 * Barra inferior responsiva (mobile) com duplo atalho (Ligar + WhatsApp)
 * e pílula flutuante (desktop). Entra após o CTA do Hero sair da tela e se
 * oculta (`inert`) quando o CTA final aparece.
 */
export function AdcStickyDock() {
  const [visible, setVisible] = useState(false);
  const { pageSlug, variant } = useLeadTracking();

  useEffect(() => {
    const heroCta = document.getElementById(ADC_HERO_CTA_ID);
    const finalCta = document.getElementById(ADC_FINAL_CTA_ID);
    if (!heroCta || !("IntersectionObserver" in window)) {
      setVisible(true);
      return;
    }

    let heroScrolledPast = false;
    let finalVisible = false;

    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.target === heroCta) {
          heroScrolledPast = !entry.isIntersecting && entry.boundingClientRect.top < 0;
        } else if (entry.target === finalCta) {
          finalVisible = entry.isIntersecting;
        }
      }
      setVisible(heroScrolledPast && !finalVisible);
    });

    observer.observe(heroCta);
    if (finalCta) observer.observe(finalCta);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <div
        data-visible={visible}
        inert={!visible}
        className="adc-dock fixed inset-x-0 bottom-0 z-50 border-t border-brass/25 bg-ink/95 shadow-[0_-14px_34px_-18px_rgba(0,0,0,0.85)] backdrop-blur-md lg:hidden"
      >
        <div className="mx-auto flex max-w-xl items-center gap-2 px-3.5 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3">
          <span className="relative shrink-0 max-[359px]:hidden">
            <Image
              src={ADC_AVATAR_SRC}
              alt=""
              width={40}
              height={40}
              className="h-10 w-10 rounded-full border border-brass/45 object-cover"
            />
            <span
              aria-hidden="true"
              className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-ink bg-whatsapp"
            />
          </span>

          <p className="min-w-0 flex-1 leading-tight">
            <span className="block truncate text-[14px] font-semibold text-paper">
              Dr. Rodrigo
            </span>
            <span className="block truncate text-[12px] text-brass">
              Plantão 24h · Sigilo
            </span>
          </p>

          <a
            href={PHONE_TEL}
            aria-label="Ligar para o plantão 24h"
            onClick={() =>
              trackPhoneLead({
                section: "barra-fixa",
                pageSlug,
                variant,
              })
            }
            className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-brass/40 bg-ink-elevated text-brass transition-colors hover:border-brass hover:bg-brass/10"
          >
            <Phone className="h-4.5 w-4.5" strokeWidth={1.8} aria-hidden="true" />
          </a>

          <AdcWhatsAppLink
            section="barra-fixa"
            className="adc-btn-wa inline-flex min-h-11 shrink-0 items-center gap-1.5 rounded-lg bg-whatsapp px-3.5 text-[14.5px] font-semibold text-ink"
          >
            <WhatsAppIcon className="h-4.5 w-4.5 shrink-0" />
            WhatsApp
          </AdcWhatsAppLink>
        </div>
      </div>

      <div
        data-visible={visible}
        inert={!visible}
        className="adc-dock fixed bottom-6 right-6 z-50 hidden lg:block"
      >
        <AdcWhatsAppLink
          section="flutuante"
          className="adc-btn-wa pulse-ring inline-flex min-h-14 items-center gap-2.5 rounded-full bg-whatsapp px-6 text-[15px] font-semibold text-ink"
        >
          <WhatsAppIcon className="h-5 w-5 shrink-0" />
          Falar com o Dr. Rodrigo
        </AdcWhatsAppLink>
      </div>
    </>
  );
}
