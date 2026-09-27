"use client";

import { useEffect, useState } from "react";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import { LpWhatsAppLink } from "@/components/lp/LpWhatsAppLink";
import { cn } from "@/lib/utils";

/**
 * Botão flutuante: aparece depois da primeira dobra e some quando o CTA final
 * está na tela, para não duplicar o mesmo convite no mesmo lugar.
 */
export function LpFloatingWhatsApp() {
  const [pastHero, setPastHero] = useState(false);
  const [finalInView, setFinalInView] = useState(false);

  useEffect(() => {
    let frame: number | null = null;
    const update = () => {
      frame = null;
      setPastHero(window.scrollY > window.innerHeight * 0.75);
    };
    const onScroll = () => {
      if (frame === null) frame = window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });

    const target = document.getElementById("contato");
    const observer =
      target && "IntersectionObserver" in window
        ? new IntersectionObserver(([entry]) => setFinalInView(entry.isIntersecting), {
            threshold: 0.2,
          })
        : null;
    if (target) observer?.observe(target);

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame !== null) window.cancelAnimationFrame(frame);
      observer?.disconnect();
    };
  }, []);

  const visible = pastHero && !finalInView;

  return (
    <div
      inert={!visible}
      className={cn(
        "fixed bottom-[max(1.25rem,env(safe-area-inset-bottom))] right-4 z-40 transition-[opacity,transform] duration-300 sm:right-6",
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0"
      )}
    >
      <LpWhatsAppLink
        section="flutuante"
        ariaLabel="Falar com o Dr. Rodrigo no WhatsApp"
        className="pulse-ring flex h-14 w-14 items-center justify-center rounded-full bg-whatsapp text-[#0b1a10] shadow-[0_10px_28px_rgba(0,0,0,0.5)] transition-transform duration-200 hover:scale-105 active:scale-95"
      >
        <WhatsAppIcon className="h-7 w-7" />
      </LpWhatsAppLink>
    </div>
  );
}
