import type { Metadata, Viewport } from "next";
import { Newsreader } from "next/font/google";
import { LpFloatingWhatsApp } from "@/components/lp/LpFloatingWhatsApp";
import { LpAttorney } from "@/components/lp/sections/LpAttorney";
import { LpFaq } from "@/components/lp/sections/LpFaq";
import { LpFinalCta } from "@/components/lp/sections/LpFinalCta";
import { LpFooter } from "@/components/lp/sections/LpFooter";
import { LpHero } from "@/components/lp/sections/LpHero";
import { LpOffice } from "@/components/lp/sections/LpOffice";
import { LpPractice } from "@/components/lp/sections/LpPractice";
import { LpProcess } from "@/components/lp/sections/LpProcess";
import { LpReviews } from "@/components/lp/sections/LpReviews";
import { LpRights } from "@/components/lp/sections/LpRights";
import { LpSensitive } from "@/components/lp/sections/LpSensitive";
import { LpTopbar } from "@/components/lp/sections/LpTopbar";
import { LpTriage } from "@/components/lp/sections/LpTriage";
import { LP_PATH } from "@/lib/lp-defesa-criminal";
import { HOME_URL } from "@/lib/site";
import "./lp.css";

/**
 * LANDING DE ANÚNCIOS — https://goiania.rodrigofaustinoadvocacia.com.br/defesa-criminal
 *
 * Página própria para o Google Ads, independente da home (`app/page.tsx`):
 * - Conversão nova: `lead_whatsapp_rodrigo_faustino_v3` e `lead_phone_rodrigo_faustino_v3`
 *   (a home segue com `_v2`). Mesma regra de consentimento de cookies da home.
 * - `noindex`: existe para tráfego pago e não disputa a busca orgânica com a home.
 * - Conteúdo em `lib/lp-defesa-criminal.ts`; seções em `components/lp/sections/`.
 */

// Só o eixo de peso (122 KB). O eixo de tamanho óptico (opsz) deixava os títulos
// mais finos, mas levava a fonte a 279 KB e derrubava o LCP no PageSpeed mobile.
// Com preload, a fonte baixa em paralelo ao CSS em vez de encadeada atrás dele.
const serif = Newsreader({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-lp-serif",
  display: "swap",
});

const title = "Advogado Criminalista em Goiânia | Plantão 24h | Dr. Rodrigo Faustino";
const description =
  "Defesa criminal em Goiânia com plantão 24 horas: prisão em flagrante, intimação, inquérito e processo. Atendimento particular e direto com o Dr. Rodrigo Faustino, OAB/GO 64.028.";

export const metadata: Metadata = {
  metadataBase: new URL(HOME_URL),
  title,
  description,
  alternates: { canonical: LP_PATH },
  robots: {
    index: false,
    follow: true,
    googleBot: { index: false, follow: true },
  },
  formatDetection: { telephone: true },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: LP_PATH,
    siteName: "Dr. Rodrigo Faustino — Advogado Criminalista",
    title: "Advogado criminalista em Goiânia — Dr. Rodrigo Faustino",
    description:
      "Plantão 24 horas para prisão em flagrante, intimação e casos urgentes. Fale direto com o advogado.",
    images: [
      {
        url: "/images/lp/og-defesa-criminal.jpg",
        width: 1200,
        height: 630,
        alt: "Dr. Rodrigo Faustino, advogado criminalista em Goiânia",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Advogado criminalista em Goiânia — Dr. Rodrigo Faustino",
    description: "Plantão 24 horas. Fale direto com o advogado.",
    images: ["/images/lp/og-defesa-criminal.jpg"],
  },
};

export const viewport: Viewport = {
  themeColor: "#11100e",
};

export default function DefesaCriminalPage() {
  return (
    <div className={`${serif.variable} lp`}>
      <LpTopbar />
      <main>
        <LpHero />
        <LpTriage />
        <LpRights />
        <LpAttorney />
        <LpReviews />
        <LpPractice />
        <LpProcess />
        <LpSensitive />
        <LpFaq />
        <LpOffice />
        <LpFinalCta />
      </main>
      <LpFooter />
      <LpFloatingWhatsApp />
    </div>
  );
}
