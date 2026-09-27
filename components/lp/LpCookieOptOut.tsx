"use client";

import { useEffect, useState } from "react";
import { COOKIE_CONSENT_STORAGE_KEY } from "@/lib/consent";
import { isMeasurementOptedOut } from "@/components/lp/tracking";

type ConsentWindow = Window & { gtag?: (...args: unknown[]) => void };

/**
 * Opt-out sem pop-up: a landing carrega as métricas por padrão, e este link
 * permite recusar (ou voltar a permitir) direto no rodapé.
 */
export function LpCookieOptOut() {
  const [optedOut, setOptedOut] = useState<boolean | null>(null);

  useEffect(() => setOptedOut(isMeasurementOptedOut()), []);

  function optOut() {
    try {
      window.localStorage.setItem(COOKIE_CONSENT_STORAGE_KEY, "rejected");
    } catch {}
    // Desliga o GTM já carregado nesta visita; nas próximas ele nem carrega.
    (window as ConsentWindow).gtag?.("consent", "update", {
      analytics_storage: "denied",
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied",
    });
    for (const cookie of document.cookie.split(";")) {
      const name = cookie.split("=")[0]?.trim();
      if (name && /^(_ga|_gid|_gat|_gcl_)/.test(name)) {
        document.cookie = `${name}=; Max-Age=0; path=/; SameSite=Lax`;
        document.cookie = `${name}=; Max-Age=0; path=/; domain=.rodrigofaustinoadvocacia.com.br; SameSite=Lax`;
      }
    }
    setOptedOut(true);
  }

  function optIn() {
    try {
      window.localStorage.setItem(COOKIE_CONSENT_STORAGE_KEY, "accepted");
    } catch {}
    window.location.reload();
  }

  if (optedOut === null) return null;

  return (
    <button
      type="button"
      onClick={optedOut ? optIn : optOut}
      aria-live="polite"
      className="inline-flex min-h-11 items-center text-left hover:text-paper"
    >
      <span className="link-underline">
        {optedOut
          ? "Cookies de métricas desativados · permitir novamente"
          : "Não permitir cookies de métricas e anúncios"}
      </span>
    </button>
  );
}
