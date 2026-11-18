"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import { AcWhatsAppLink } from "@/components/advogado-criminal/WhatsAppCta";
import {
  AC_AVATAR_SRC,
  AC_FINAL_CTA_ID,
  AC_HERO_CTA_ID,
} from "@/components/advogado-criminal/ui";

/**
 * Barra inferior responsiva (mobile) e pílula flutuante (desktop):
 * entra somente quando o CTA principal do Hero sai da tela e se oculta (`inert`)
 * ao alcançar o CTA final, evitando duplicidade visual e preservando foco de teclado.
 */
export function AcStickyDock() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const heroCta = document.getElementById(AC_HERO_CTA_ID);
    const finalCta = document.getElementById(AC_FINAL_CTA_ID);
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
        className="ac-dock fixed inset-x-0 bottom-0 z-50 border-t border-brass/25 bg-ink/95 shadow-[0_-14px_34px_-18px_rgba(0,0,0,0.85)] backdrop-blur-md lg:hidden"
      >
        <div className="mx-auto flex max-w-xl items-center gap-3 px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3">
          <span className="relative shrink-0 max-[359px]:hidden">
            <Image
              src={AC_AVATAR_SRC}
              alt=""
              width={44}
              height={44}
              className="h-11 w-11 rounded-full border border-brass/45 object-cover"
            />
            <span
              aria-hidden="true"
              className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-ink bg-whatsapp"
            />
          </span>

          <p className="min-w-0 flex-1 leading-tight">
            <span className="block truncate text-sm font-semibold text-paper">
              Dr. Rodrigo Faustino
            </span>
            <span className="block truncate text-xs text-brass">
              Plantão 24h · Sigilo total
            </span>
          </p>

          <AcWhatsAppLink
            section="barra-fixa"
            className="ac-btn-wa inline-flex min-h-12 shrink-0 items-center gap-2 rounded-lg bg-whatsapp px-4 text-[15px] font-semibold text-ink"
          >
            <WhatsAppIcon className="h-5 w-5 shrink-0" />
            Falar agora
          </AcWhatsAppLink>
        </div>
      </div>

      <div
        data-visible={visible}
        inert={!visible}
        className="ac-dock fixed bottom-6 right-6 z-50 hidden lg:block"
      >
        <AcWhatsAppLink
          section="flutuante"
          className="ac-btn-wa pulse-ring inline-flex min-h-14 items-center gap-2.5 rounded-full bg-whatsapp px-6 text-[15px] font-semibold text-ink"
        >
          <WhatsAppIcon className="h-5 w-5 shrink-0" />
          Falar com o Dr. Rodrigo
        </AcWhatsAppLink>
      </div>
    </>
  );
}
