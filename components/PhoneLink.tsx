"use client";

import { Phone } from "lucide-react";
import { cn } from "@/lib/utils";
import { trackPhoneLead } from "@/components/WhatsAppButton";
import { useLeadTracking } from "@/components/LeadTrackingContext";
import { PHONE_TEL } from "@/lib/whatsapp";

type PhoneLinkProps = {
  section: string;
  children: React.ReactNode;
  className?: string;
  city?: string;
  topic?: string;
  pageSlug?: string;
  /** "outline" = botão com borda (padrão); "text" = link discreto com área de toque de 44px. */
  variant?: "outline" | "text";
};

/**
 * CTA secundário de ligação (`tel:`). Dispara `lead_phone_rodrigo_faustino_v2`
 * no dataLayer (após consentimento) e deixa o navegador abrir o discador.
 */
export function PhoneLink({
  section,
  children,
  className,
  city,
  topic,
  pageSlug,
  variant = "outline",
}: PhoneLinkProps) {
  const defaults = useLeadTracking();

  return (
    <a
      href={PHONE_TEL}
      onClick={() =>
        trackPhoneLead({
          section,
          city,
          topic,
          pageSlug: pageSlug ?? defaults.pageSlug,
          variant: defaults.variant,
        })
      }
      className={cn(
        "inline-flex items-center gap-2.5 whitespace-nowrap font-semibold text-paper",
        variant === "outline"
          ? "min-h-[52px] w-full justify-center rounded-md border border-brass/40 px-6 transition-[border-color,background-color] duration-300 hover:border-brass hover:bg-brass/10 sm:w-auto"
          : "min-h-[44px] text-[15px] underline-offset-4 hover:underline",
        className
      )}
    >
      <Phone className="h-4 w-4 shrink-0 text-brass" strokeWidth={1.5} aria-hidden="true" />
      {children}
    </a>
  );
}
