"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import { C24WhatsAppLink } from "@/components/criminalista-24h/WhatsAppLink";
import { AVATAR_SRC, FINAL_CTA_ID, HERO_CTA_ID } from "@/components/criminalista-24h/ui";

/**
 * Celular: barra fixa com o rosto do advogado e o botão de WhatsApp (com texto,
 * não só o ícone). Desktop: pílula flutuante. Aparece depois que o botão do
 * topo sai da tela e some enquanto o CTA final está visível, para nunca
 * mostrar dois botões iguais ao mesmo tempo.
 */
export function C24StickyCta() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const heroCta = document.getElementById(HERO_CTA_ID);
    const finalCta = document.getElementById(FINAL_CTA_ID);
    if (!heroCta || !("IntersectionObserver" in window)) {
      setVisible(true);
      return;
    }

    let heroPassed = false;
    let finalInView = false;
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.target === heroCta) {
          heroPassed = !entry.isIntersecting && entry.boundingClientRect.top < 0;
        } else if (entry.target === finalCta) {
          finalInView = entry.isIntersecting;
        }
      }
      setVisible(heroPassed && !finalInView);
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
        className="c24-dock fixed inset-x-0 bottom-0 z-50 border-t border-brass/20 bg-ink/95 backdrop-blur-md lg:hidden"
      >
        <div className="mx-auto flex max-w-xl items-center gap-3 px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3">
          <span className="relative shrink-0">
            <Image
              src={AVATAR_SRC}
              alt=""
              width={44}
              height={44}
              className="h-11 w-11 rounded-full border border-brass/40 object-cover"
            />
            <span
              aria-hidden="true"
              className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-ink bg-whatsapp"
            />
          </span>
          <p className="min-w-0 flex-1 leading-tight">
            <span className="block truncate text-sm font-semibold text-paper">Plantão 24h</span>
            <span className="block truncate text-xs text-muted">Dr. Rodrigo Faustino</span>
          </p>
          <C24WhatsAppLink
            section="barra-fixa"
            className="c24-btn-wa inline-flex min-h-12 shrink-0 items-center gap-2 rounded-lg bg-whatsapp px-4 text-[15px] font-semibold text-ink"
          >
            <WhatsAppIcon className="h-5 w-5 shrink-0" />
            Falar agora
          </C24WhatsAppLink>
        </div>
      </div>

      <div
        data-visible={visible}
        inert={!visible}
        className="c24-dock fixed bottom-6 right-6 z-50 hidden lg:block"
      >
        <C24WhatsAppLink
          section="flutuante"
          className="c24-btn-wa pulse-ring inline-flex min-h-14 items-center gap-2.5 rounded-full bg-whatsapp px-6 text-[15px] font-semibold text-ink"
        >
          <WhatsAppIcon className="h-5 w-5 shrink-0" />
          Falar com o advogado
        </C24WhatsAppLink>
      </div>
    </>
  );
}
