"use client";

import { useLeadTracking } from "@/components/LeadTrackingContext";
import { trackWhatsAppInteraction } from "@/components/WhatsAppButton";
import { defaultWhatsAppHref } from "@/lib/advogado-defesa-criminal";

type AdcWhatsAppLinkProps = {
  section: string;
  href?: string;
  /** Código neutro (ex.: `adc_cenario_1`); omitido = `"defesa_criminal"`. */
  topic?: string;
  className?: string;
  ariaLabel?: string;
  children: React.ReactNode;
};

/**
 * Link de conversão WhatsApp com disparo do evento padrão `lead_whatsapp_rodrigo_faustino_v2`
 * no dataLayer e registro em `/api/ab/conversion` quando servido em `/` pelo A/B.
 */
export function AdcWhatsAppLink({
  section,
  href = defaultWhatsAppHref,
  topic,
  className,
  ariaLabel,
  children,
}: AdcWhatsAppLinkProps) {
  const { pageSlug, variant } = useLeadTracking();

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={ariaLabel}
      className={className}
      onClick={(event) => trackWhatsAppInteraction(event, { section, topic, pageSlug, variant })}
    >
      {children}
    </a>
  );
}
