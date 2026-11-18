import { LandingMeasurement, landingMetadata } from "@/lib/ab/render";
import type { Metadata, Viewport } from "next";
import { LeadTrackingProvider } from "@/components/LeadTrackingContext";
import { AdcAuthority } from "@/components/advogado-defesa-criminal/AdcAuthority";
import { AdcConfidential } from "@/components/advogado-defesa-criminal/AdcConfidential";
import { AdcFaq } from "@/components/advogado-defesa-criminal/AdcFaq";
import { AdcFinalCtaAndFooter } from "@/components/advogado-defesa-criminal/AdcFinalCtaAndFooter";
import { AdcFirstHours } from "@/components/advogado-defesa-criminal/AdcFirstHours";
import { AdcHero } from "@/components/advogado-defesa-criminal/AdcHero";
import { AdcOffice } from "@/components/advogado-defesa-criminal/AdcOffice";
import { AdcOnboardingPreview } from "@/components/advogado-defesa-criminal/AdcOnboardingPreview";
import { AdcPracticeAreas } from "@/components/advogado-defesa-criminal/AdcPracticeAreas";
import { AdcQualification } from "@/components/advogado-defesa-criminal/AdcQualification";
import { AdcReviews } from "@/components/advogado-defesa-criminal/AdcReviews";
import { AdcStickyDock } from "@/components/advogado-defesa-criminal/AdcStickyDock";
import { AdcTopBar } from "@/components/advogado-defesa-criminal/AdcTopBar";
import { AdcUrgencyGrid } from "@/components/advogado-defesa-criminal/AdcUrgencyGrid";
import { ADC_SLUG, ADC_VARIANT, faqs } from "@/lib/advogado-defesa-criminal";
import { HOME_URL, OFFICE_ADDRESS, PHONE_E164 } from "@/lib/site";

/**
 * NOVA PÁGINA DESAFIANTE — `/advogado-defesa-criminal`
 * URL: https://goiania.rodrigofaustinoadvocacia.com.br/advogado-defesa-criminal
 *
 * Pronta para tráfego direto do Google Ads e para disputa A/B contra `/`
 * em `/admin/experimentos`:
 * - Estática e indexável quando servida em `/` pelo middleware (`x-ab-home-rewrite`);
 *   no acesso direto recebe `X-Robots-Tag: noindex` via `next.config.ts`.
 * - Dispara os mesmos eventos de conversão da home (`lead_whatsapp_rodrigo_faustino_v2`
 *   e `lead_phone_rodrigo_faustino_v2`), diferenciados por `page_slug: "advogado-defesa-criminal"`
 *   e `ab_variant: "e"`.
 */

const title = "Advogado Criminalista em Goiânia 24h | Dr. Rodrigo Faustino";
const description =
  "Advogado de defesa criminal em Goiânia com plantão 24h. Atuação imediata em prisão em flagrante, audiência de custódia, intimação, inquérito e processo criminal. Atendimento particular e direto.";
const ogImage = "/images/advogado-defesa-criminal/og-advogado-defesa-criminal.jpg";

const metadata: Metadata = {
  metadataBase: new URL(HOME_URL),
  title,
  description,
  alternates: { canonical: "/" },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  formatDetection: { telephone: false },
  authors: [{ name: "Dr. Rodrigo Faustino" }],
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: "Dr. Rodrigo Faustino — Advogado Criminalista",
    title,
    description:
      "Plantão criminal 24h em Goiânia e região. Prisão em flagrante, intimação, investigação e casos sigilosos. Fale diretamente com o Dr. Rodrigo Faustino.",
    images: [
      {
        url: ogImage,
        width: 1200,
        height: 630,
        alt: "Dr. Rodrigo Faustino — Advogado Criminalista em Goiânia 24h",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description:
      "Defesa criminal imediata 24h em Goiânia. Atendimento particular, sigiloso e direto com o advogado.",
    images: [ogImage],
  },
};

export const viewport: Viewport = {
  themeColor: "#101418",
};

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": ["LegalService", "Attorney"],
    "@id": `${HOME_URL}/#legalservice`,
    name: "Dr. Rodrigo Faustino — Advogado Criminalista",
    url: HOME_URL,
    image: `${HOME_URL}/images/advogado-defesa-criminal/hero-rodrigo.webp`,
    logo: `${HOME_URL}/images/logo-faustino.webp`,
    description:
      "Defesa criminal particular em Goiânia e Aparecida de Goiânia. Plantão 24 horas para prisão em flagrante, audiência de custódia, intimações, inquéritos e processos criminais.",
    telephone: PHONE_E164,
    address: { "@type": "PostalAddress", ...OFFICE_ADDRESS },
    areaServed: [
      { "@type": "City", name: "Goiânia" },
      { "@type": "City", name: "Aparecida de Goiânia" },
      { "@type": "City", name: "Anápolis" },
    ],
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "00:00",
      closes: "23:59",
    },
    priceRange: "Sob consulta",
    knowsAbout: [
      "Direito Penal",
      "Prisão em flagrante",
      "Audiência de custódia",
      "Habeas corpus",
      "Inquérito policial",
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
    image: `${HOME_URL}/images/advogado-defesa-criminal/hero-rodrigo.webp`,
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

export function generateMetadata() {
  return landingMetadata(metadata);
}

export default function AdvogadoDefesaCriminalPage() {
  return (
    <LeadTrackingProvider pageSlug={ADC_SLUG} variant={ADC_VARIANT}>
      <LandingMeasurement />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <AdcTopBar />

      <main data-ab-variant={ADC_VARIANT} className="adc-page">
        <AdcHero />
        <AdcUrgencyGrid />
        <AdcQualification />
        <AdcFirstHours />
        <AdcConfidential />
        <AdcPracticeAreas />
        <AdcAuthority />
        <AdcOnboardingPreview />
        <AdcReviews />
        <AdcFaq />
        <AdcOffice />
      </main>

      <AdcFinalCtaAndFooter />
      <AdcStickyDock />
    </LeadTrackingProvider>
  );
}
