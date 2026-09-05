"use client";

import { createContext, useContext } from "react";

export type LeadTrackingDefaults = {
  /** Identificador da página nos eventos de lead (ex.: "home", "home-b"). */
  pageSlug?: string;
  /** Variante do teste A/B (ex.: "a", "b"). */
  variant?: string;
};

const LeadTrackingContext = createContext<LeadTrackingDefaults>({});

/**
 * Fornece page_slug / ab_variant padrão para todos os CTAs de WhatsApp e
 * telefone abaixo dele, sem precisar alterar cada seção. Quando ausente, os
 * botões mantêm o comportamento original (page_slug "home", variante "a").
 */
export function LeadTrackingProvider({
  pageSlug,
  variant,
  children,
}: LeadTrackingDefaults & { children: React.ReactNode }) {
  return (
    <LeadTrackingContext.Provider value={{ pageSlug, variant }}>
      {children}
    </LeadTrackingContext.Provider>
  );
}

export function useLeadTracking() {
  return useContext(LeadTrackingContext);
}
