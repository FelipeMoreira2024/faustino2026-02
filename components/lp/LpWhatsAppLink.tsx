"use client";

import { WA_HOME_STANDARD } from "@/lib/whatsapp";
import { trackLpLead } from "@/components/lp/tracking";

type LpWhatsAppLinkProps = {
  section: string;
  topic?: string;
  className?: string;
  ariaLabel?: string;
  children: React.ReactNode;
};

/**
 * Todos os links da landing usam a mesma mensagem da home, inclusive sem JS.
 * O clique mantém o evento de conversão próprio da landing.
 */
export function LpWhatsAppLink({
  section,
  topic,
  className,
  ariaLabel,
  children,
}: LpWhatsAppLinkProps) {
  return (
    <a
      href={WA_HOME_STANDARD}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={ariaLabel}
      className={className}
      onClick={() => {
        trackLpLead("whatsapp", section, topic);
      }}
    >
      {children}
    </a>
  );
}
