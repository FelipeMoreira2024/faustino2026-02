"use client";

import { useLeadTracking } from "@/components/LeadTrackingContext";
import { trackWhatsAppInteraction } from "@/components/WhatsAppButton";
import { WA_HOME_STANDARD } from "@/lib/whatsapp";

type C24WhatsAppLinkProps = {
  section: string;
  /** Código neutro (ex.: `c24_situacao_1`); omitido = "defesa_criminal". */
  topic?: string;
  className?: string;
  ariaLabel?: string;
  children: React.ReactNode;
};

/**
 * Link de WhatsApp com o mesmo rastreamento da home: conta a conversão no
 * painel A/B (quando a página é servida em "/") e envia
 * `lead_whatsapp_rodrigo_faustino_v2` ao dataLayer, com a mensagem padrão.
 */
export function C24WhatsAppLink({
  section,
  topic,
  className,
  ariaLabel,
  children,
}: C24WhatsAppLinkProps) {
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
