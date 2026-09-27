"use client";

import { DEFAULT_MESSAGE } from "@/lib/lp-defesa-criminal";
import { greetingNow, lpWhatsAppUrl, trackLpLead } from "@/components/lp/tracking";

type LpWhatsAppLinkProps = {
  section: string;
  topic?: string;
  message?: string;
  className?: string;
  ariaLabel?: string;
  children: React.ReactNode;
};

/**
 * Link de WhatsApp da landing. O HTML sai com "Olá" (funciona sem JS); no
 * clique a saudação vira "Bom dia/Boa tarde/Boa noite" e o lead é registrado.
 */
export function LpWhatsAppLink({
  section,
  topic,
  message = DEFAULT_MESSAGE,
  className,
  ariaLabel,
  children,
}: LpWhatsAppLinkProps) {
  return (
    <a
      href={lpWhatsAppUrl(message)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={ariaLabel}
      className={className}
      onClick={(event) => {
        event.currentTarget.href = lpWhatsAppUrl(message, greetingNow());
        trackLpLead("whatsapp", section, topic);
      }}
    >
      {children}
    </a>
  );
}
