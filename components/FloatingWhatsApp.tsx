"use client";

import { useEffect, useRef, useState } from "react";
import { WA_STANDARD } from "@/lib/whatsapp";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import { openWhatsAppWithTracking } from "@/components/WhatsAppButton";
import { cn } from "@/lib/utils";

export function FloatingWhatsApp() {
  const [visible, setVisible] = useState(false);
  const visibleRef = useRef(false);
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    const updateVisibility = () => {
      const nextVisible = window.scrollY > 400;
      if (visibleRef.current !== nextVisible) {
        visibleRef.current = nextVisible;
        setVisible(nextVisible);
      }
    };

    const onScroll = () => {
      if (frameRef.current !== null) return;
      frameRef.current = window.requestAnimationFrame(() => {
        frameRef.current = null;
        updateVisibility();
      });
    };

    updateVisibility();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
      }
    };
  }, []);

  return (
    <a
      href={WA_STANDARD}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar agora no WhatsApp"
      onClick={(event) => openWhatsAppWithTracking(event, WA_STANDARD)}
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
