"use client";

import { useEffect, useState } from "react";
import { WA_STANDARD } from "@/lib/whatsapp";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import { trackWhatsAppClick } from "@/components/WhatsAppButton";
import { cn } from "@/lib/utils";

export function FloatingWhatsApp() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <a
      href={WA_STANDARD}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar agora no WhatsApp"
      onClick={() => trackWhatsAppClick("botao-flutuante")}
      className={cn(
        "pulse-ring fixed bottom-[max(1.25rem,env(safe-area-inset-bottom))] right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full",
        "bg-whatsapp text-ink shadow-[0_8px_24px_rgba(0,0,0,0.45)]",
        "transition-[opacity,transform,scale] duration-300 hover:scale-105 active:scale-95",
        visible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-4 opacity-0"
      )}
    >
      <WhatsAppIcon className="h-7 w-7" />
    </a>
  );
}
