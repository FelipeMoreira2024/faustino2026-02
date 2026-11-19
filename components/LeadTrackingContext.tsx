"use client";

import { createContext, useContext } from "react";

export type LeadTrackingDefaults = {
  /** Identificador da página nos eventos de lead (ex.: "home", "home-b"). */
  pageSlug?: string;
  /** Rótulo legado da página fora de um teste ativo. */
  variant?: string;
};

const LeadTrackingContext = createContext<LeadTrackingDefaults>({});

/**
 * Fornece page_slug e o rótulo legado para os CTAs de WhatsApp e telefone.
 * Durante um experimento, o grupo sorteado substitui o rótulo no dataLayer.
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
