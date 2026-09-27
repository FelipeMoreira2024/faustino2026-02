import { trackExperimentConversion } from "@/components/ExperimentTracker";
import { LP_SLUG } from "@/lib/lp-defesa-criminal";
import { PHONE_E164 } from "@/lib/site";

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

/**
 * Eventos exclusivos da landing `/defesa-criminal`. A home continua com
 * `lead_whatsapp_rodrigo_faustino_v2` / `lead_phone_rodrigo_faustino_v2`,
 * então cada página alimenta a sua própria ação de conversão no Google Ads.
 */
export const LP_EVENTS = {
  whatsapp: "lead_whatsapp_rodrigo_faustino_v3",
  phone: "lead_phone_rodrigo_faustino_v3",
} as const;

const baseParams = {
  client_name: "rodrigo_faustino",
  niche: "advogado_criminalista",
  campaign_type: "rede_de_pesquisa",
  version: "v3_lp_defesa_criminal",
  page_slug: LP_SLUG,
  lead_city: "goiania",
};

export function trackLpLead(
  channel: keyof typeof LP_EVENTS,
  section: string,
  topic = "defesa_criminal"
) {
  // Só conta no A/B interno se a página estiver sendo servida em "/".
  if (channel === "whatsapp") trackExperimentConversion();

  // Esta página carrega o GTM sem aviso de cookies (ver AUTO_CONSENT_PATHS).
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: LP_EVENTS[channel],
    conversion_type: channel === "whatsapp" ? "whatsapp_click" : "phone_click",
    ...baseParams,
    lead_section: section,
    lead_topic: topic,
  });
}

/** Saudação pelo horário de quem escreve; também identifica leads desta página no WhatsApp. */
export function greetingNow(date = new Date()) {
  const hour = date.getHours();
  if (hour >= 5 && hour < 12) return "Bom dia";
  if (hour >= 12 && hour < 18) return "Boa tarde";
  return "Boa noite";
}

export function lpWhatsAppUrl(message: string, greeting = "Olá") {
  const text = `${greeting}, Dr. Rodrigo. ${message}`;
  return `https://wa.me/${PHONE_E164.replace("+", "")}?text=${encodeURIComponent(text)}`;
}
