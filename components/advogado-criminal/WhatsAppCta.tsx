"use client";

import { useLeadTracking } from "@/components/LeadTrackingContext";
import { trackWhatsAppInteraction } from "@/components/WhatsAppButton";
import { WA_HOME_STANDARD } from "@/lib/whatsapp";

type AcWhatsAppLinkProps = {
  section: string;
  /** Código neutro (ex.: `ac_triagem_1`); omitido = `"defesa_criminal"`. */
  topic?: string;
  className?: string;
  ariaLabel?: string;
  children: React.ReactNode;
};

/**
 * Dispara exatamente a mesma conversão da home (`lead_whatsapp_rodrigo_faustino_v2`
 * no dataLayer + `/api/ab/conversion` quando servida em `/`), abrindo a mensagem
 * padrão para comparação justa no teste A/B e no Google Ads.
 */
export function AcWhatsAppLink({
  section,
  topic,
  className,
  ariaLabel,
  children,
}: AcWhatsAppLinkProps) {
  const { pageSlug, variant } = useLeadTracking();

  return (
    <a
      href={WA_HOME_STANDARD}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={ariaLabel}
      className={className}
      onClick={() => trackWhatsAppInteraction({ section, topic, pageSlug, variant })}
    >
      {children}
    </a>
  );
}
