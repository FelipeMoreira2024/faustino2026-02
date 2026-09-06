"use client";

import { cn } from "@/lib/utils";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import { useLeadTracking } from "@/components/LeadTrackingContext";
import { COOKIE_CONSENT_STORAGE_KEY } from "@/lib/consent";
import { trackExperimentConversion } from "@/components/ExperimentTracker";

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

const WHATSAPP_REDIRECT_DELAY_MS = 300;

const whatsappLeadEvent = {
  event: "lead_whatsapp_rodrigo_faustino_v2",
  conversion_type: "whatsapp_click",
  client_name: "rodrigo_faustino",
  niche: "advogado_criminalista",
  campaign_type: "rede_de_pesquisa",
  version: "v2_clean",
};

export type TrackingContext = {
  section: string;
  city?: string;
  topic?: string;
  pageSlug?: string;
  /** Variante do teste A/B; omitido = "a" (home original). */
  variant?: string;
};

function hasMetricsConsent() {
  try {
    return window.localStorage.getItem(COOKIE_CONSENT_STORAGE_KEY) === "accepted";
  } catch {
    return false;
  }
}

function pushLeadEvent(
  overrides: { event: string; conversion_type: string },
  context: TrackingContext
) {
  if (!hasMetricsConsent()) return;

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    ...whatsappLeadEvent,
    ...overrides,
    lead_section: context.section,
    lead_city: context.city || "goiania",
    lead_topic: context.topic || "defesa_criminal",
    page_slug: context.pageSlug || "home",
    ab_variant: context.variant || "a",
  });
}

export function trackWhatsAppLead(context: TrackingContext) {
  pushLeadEvent(
    { event: whatsappLeadEvent.event, conversion_type: "whatsapp_click" },
    context
  );
}

/** Clique em link `tel:` — evento separado para o GTM não misturar com WhatsApp. */
export function trackPhoneLead(context: TrackingContext) {
  pushLeadEvent(
    { event: "lead_phone_rodrigo_faustino_v2", conversion_type: "phone_click" },
    context
  );
}

export function openWhatsAppWithTracking(
  event: React.MouseEvent<HTMLAnchorElement>,
  href: string,
  context: TrackingContext = { section: "link" }
) {
  event.preventDefault();
  trackExperimentConversion();
  trackWhatsAppLead(context);

  window.setTimeout(() => {
    window.open(href, "_blank", "noopener,noreferrer");
  }, WHATSAPP_REDIRECT_DELAY_MS);
}

type WhatsAppButtonProps = {
  section: string;
  href: string;
  children: React.ReactNode;
  className?: string;
  city?: string;
  topic?: string;
  pageSlug?: string;
  /** Botões compactos (topbar) fogem do padrão 52px/full-width. */
  compact?: boolean;
};

export function WhatsAppButton({
  section,
  href,
  children,
  className,
  city,
  topic,
  pageSlug,
  compact = false,
}: WhatsAppButtonProps) {
  const defaults = useLeadTracking();

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={(event) =>
        openWhatsAppWithTracking(event, href, {
          section,
          city,
          topic,
          pageSlug: pageSlug ?? defaults.pageSlug,
          variant: defaults.variant,
        })
      }
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
