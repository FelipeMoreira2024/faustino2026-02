"use client";

import Link from "next/link";
import Script from "next/script";
import { useEffect, useState } from "react";
import {
  COOKIE_CONSENT_STORAGE_KEY as STORAGE_KEY,
  COOKIE_SETTINGS_EVENT as SETTINGS_EVENT,
} from "@/lib/consent";
import { absoluteUrl } from "@/lib/site";

type Consent = "accepted" | "rejected" | "pending" | null;

type ConsentWindow = Window & {
  gtag?: (...args: unknown[]) => void;
};

export function CookieConsent({ gtmId }: { gtmId?: string }) {
  const [consent, setConsent] = useState<Consent>(null);

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    setConsent(saved === "accepted" || saved === "rejected" ? saved : "pending");

    const reopen = () => setConsent("pending");
    window.addEventListener(SETTINGS_EVENT, reopen);
    return () => window.removeEventListener(SETTINGS_EVENT, reopen);
  }, []);

  function choose(value: Exclude<Consent, "pending" | null>) {
    window.localStorage.setItem(STORAGE_KEY, value);
    if (value === "rejected") {
      const runtimeWindow = window as ConsentWindow;
      runtimeWindow.gtag?.("consent", "update", {
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
    }
    setConsent(value);
  }

  return (
    <>
      {consent === "accepted" && gtmId ? (
        <Script id="gtm-consented" strategy="afterInteractive">
          {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('consent','default',{analytics_storage:'granted',ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied'});(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${gtmId}');`}
        </Script>
      ) : null}

      {consent === "pending" ? (
        <section
          aria-label="Preferências de privacidade e cookies"
          className="fixed inset-x-4 bottom-4 z-[100] mx-auto max-w-3xl border border-brass/30 bg-ink-elevated p-5 text-paper shadow-2xl sm:p-6"
        >
          <h2 className="font-display text-xl font-semibold">Privacidade e Cookies</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            Cookies de medição só serão ativados se você aceitar. O site funciona
            normalmente se você recusar. Consulte a{" "}
            <Link
              className="font-semibold text-paper underline underline-offset-4"
              href={absoluteUrl("/politica-de-privacidade")}
            >
              Política de Privacidade
            </Link>
            .
          </p>
          <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:justify-end">
            <button
              type="button"
              className="min-h-11 border border-paper/25 px-5 text-sm font-semibold transition-colors hover:bg-paper/10"
              onClick={() => choose("rejected")}
            >
              Recusar métricas
            </button>
            <button
              type="button"
              className="min-h-11 bg-brass px-5 text-sm font-semibold text-ink transition-colors hover:bg-brass-light"
              onClick={() => choose("accepted")}
            >
              Aceitar métricas
            </button>
          </div>
        </section>
      ) : null}
    </>
  );
}

export { SETTINGS_EVENT };
