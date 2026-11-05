import type { Metadata, Viewport } from "next";
import { headers } from "next/headers";
import { LeadTrackingProvider } from "@/components/LeadTrackingContext";
import { C24Attorney } from "@/components/criminalista-24h/Attorney";
import { C24Faq } from "@/components/criminalista-24h/Faq";
import { C24FinalCta } from "@/components/criminalista-24h/FinalCta";
import { C24FirstHours } from "@/components/criminalista-24h/FirstHours";
import { C24Footer } from "@/components/criminalista-24h/Footer";
import { C24Hero } from "@/components/criminalista-24h/Hero";
import { C24Office } from "@/components/criminalista-24h/Office";
import { C24Practice } from "@/components/criminalista-24h/Practice";
import { C24Process } from "@/components/criminalista-24h/Process";
import { C24Reviews } from "@/components/criminalista-24h/Reviews";
import { C24Sensitive } from "@/components/criminalista-24h/Sensitive";
import { C24Situations } from "@/components/criminalista-24h/Situations";
import { C24StickyCta } from "@/components/criminalista-24h/StickyCta";
import { C24TopBar } from "@/components/criminalista-24h/TopBar";
import { C24_PATH, C24_SLUG, C24_VARIANT, faqs } from "@/lib/criminalista-24h";
import { HOME_URL, OFFICE_ADDRESS, PHONE_E164 } from "@/lib/site";
import "./c24.css";

/**
 * PÁGINA DESAFIANTE DA HOME — https://goiania.rodrigofaustinoadvocacia.com.br/criminalista-24h
 *
 * Feita para o painel A/B (`/admin/experimentos`): cadastre o caminho
 * `/criminalista-24h` e rode o teste contra "/". Enquanto o teste roda, o
 * middleware serve esta página no endereço "/" para metade dos visitantes.
 *
 * - Conversão igual à da home: `lead_whatsapp_rodrigo_faustino_v2` (e
 *   `lead_phone_..._v2` no telefone), com `page_slug: "criminalista-24h"` e
 *   `ab_variant: "c"`. O painel conta o clique de WhatsApp quando servida em "/".
 * - Mesma mensagem pré-preenchida da home em todos os botões (`WA_HOME_STANDARD`).
 * - Acesso direto: `noindex` e canonical "/" (não disputa a busca com a home).
 *   Servida na home pelo teste: indexável, com canonical "/".
 * - Copy em `lib/criminalista-24h.ts`; seções em `components/criminalista-24h/`.
 */

const title = "Advogado Criminalista em Goiânia 24h | Dr. Rodrigo Faustino";
const description =
  "Plantão criminal 24h em Goiânia: prisão em flagrante, audiência de custódia, intimação e investigação. Atendimento particular e direto com o advogado. OAB/GO 64.028.";
const ogImage = "/images/criminalista-24h/og-criminalista-24h.jpg";

const baseMetadata: Metadata = {
  metadataBase: new URL(HOME_URL),
  title,
  description,
  alternates: { canonical: "/" },
  robots: { index: false, follow: true, googleBot: { index: false, follow: true } },
  formatDetection: { telephone: false },
  authors: [{ name: "Dr. Rodrigo Faustino" }],
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: C24_PATH,
    siteName: "Dr. Rodrigo Faustino — Advogado Criminalista",
    title,
    description:
      "Plantão 24h para prisão em flagrante, intimação e investigação. Fale direto com o advogado, com sigilo.",
    images: [
      {
        url: ogImage,
        width: 1200,
        height: 630,
        alt: "Dr. Rodrigo Faustino, advogado criminalista em Goiânia — plantão 24h",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: "Plantão criminal 24h em Goiânia. Fale direto com o advogado.",
    images: [ogImage],
  },
};

export async function generateMetadata(): Promise<Metadata> {
  const shownAtHome = (await headers()).get("x-ab-home-rewrite") === "1";
  if (!shownAtHome) return baseMetadata;
  return {
    ...baseMetadata,
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
    },
    openGraph: { ...baseMetadata.openGraph, url: "/" },
  };
}

export const viewport: Viewport = {
  themeColor: "#101418",
};

/** Mesmas entidades da home (`app/page.tsx`), para o caso de esta página virar a home. */
const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": ["LegalService", "Attorney"],
    "@id": `${HOME_URL}/#legalservice`,
    name: "Dr. Rodrigo Faustino — Advogado Criminalista",
    url: HOME_URL,
    image: `${HOME_URL}/images/criminalista-24h/dr-rodrigo-retrato.webp`,
    logo: `${HOME_URL}/images/logo-faustino.webp`,
    description:
      "Defesa criminal em Goiânia e Aparecida de Goiânia. Plantão 24 horas para prisão em flagrante, audiência de custódia e casos urgentes.",
    telephone: PHONE_E164,
    address: { "@type": "PostalAddress", ...OFFICE_ADDRESS },
    areaServed: [
      { "@type": "City", name: "Goiânia" },
      { "@type": "City", name: "Aparecida de Goiânia" },
    ],
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      opens: "00:00",
      closes: "23:59",
    },
    priceRange: "Sob consulta",
    knowsAbout: [
      "Direito Penal",
      "Prisão em flagrante",
      "Audiência de custódia",
      "Habeas corpus",
      "Tribunal do Júri",
      "Defesa em crimes sexuais",
      "Defesa em crimes de drogas",
    ],
    founder: { "@id": `${HOME_URL}/#advogado` },
  },
  {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${HOME_URL}/#advogado`,
    name: "Rodrigo Faustino",
    honorificPrefix: "Dr.",
    jobTitle: "Advogado Criminalista",
    image: `${HOME_URL}/images/criminalista-24h/dr-rodrigo-retrato.webp`,
    telephone: PHONE_E164,
    url: HOME_URL,
    worksFor: { "@id": `${HOME_URL}/#legalservice` },
    memberOf: {
      "@type": "Organization",
      name: "ABRACRIM/GO — Associação Brasileira dos Advogados Criminalistas",
    },
    hasCredential: {
      "@type": "EducationalOccupationalCredential",
      credentialCategory: "Registro profissional",
      name: "OAB/GO 64.028",
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(({ question, answer }) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: { "@type": "Answer", text: answer },
    })),
  },
];

export default function Criminalista24hPage() {
  return (
    <LeadTrackingProvider pageSlug={C24_SLUG} variant={C24_VARIANT}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <C24TopBar />

      <main data-ab-variant={C24_VARIANT}>
        <C24Hero />
        <C24Situations />
        <C24FirstHours />
        <C24Attorney />
        <C24Reviews />
        <C24Process />
        <C24Practice />
        <C24Sensitive />
        <C24Faq />
        <C24Office />
        <C24FinalCta />
      </main>

      <C24Footer />
      <C24StickyCta />
    </LeadTrackingProvider>
  );
}
