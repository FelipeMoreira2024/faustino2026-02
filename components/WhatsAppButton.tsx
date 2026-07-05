"use client";

import { cn } from "@/lib/utils";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

export function trackWhatsAppClick(section: string) {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event: "whatsapp_click", cta_section: section });
}

type WhatsAppButtonProps = {
  section: string;
  href: string;
  children: React.ReactNode;
  className?: string;
  /** Botões compactos (topbar) fogem do padrão 52px/full-width. */
  compact?: boolean;
};

export function WhatsAppButton({
  section,
  href,
  children,
  className,
  compact = false,
}: WhatsAppButtonProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackWhatsAppClick(section)}
      className={cn(
        "inline-flex items-center justify-center gap-2.5 rounded-md bg-whatsapp text-ink",
        "font-semibold transition-[background-color,transform] duration-200 hover:bg-[#1fc35c] active:scale-[0.99]",
        compact
          ? "gap-1.5 px-2.5 py-1.5 text-xs"
          : "cta-lift min-h-[52px] w-full px-7 text-base sm:w-auto",
        className
      )}
    >
      <WhatsAppIcon className={compact ? "h-3.5 w-3.5 shrink-0" : "h-5 w-5 shrink-0"} />
      {children}
    </a>
  );
}
