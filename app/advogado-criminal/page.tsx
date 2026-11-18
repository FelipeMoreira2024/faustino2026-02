import { LandingMeasurement, landingMetadata } from "@/lib/ab/render";
import type { Metadata, Viewport } from "next";
import { LeadTrackingProvider } from "@/components/LeadTrackingContext";
import { AcAuthorityManifesto } from "@/components/advogado-criminal/AuthorityManifesto";
import { AcCriticalHours } from "@/components/advogado-criminal/CriticalHours";
import { AcFaqSection } from "@/components/advogado-criminal/FaqSection";
import { AcFinalCtaAndFooter } from "@/components/advogado-criminal/FinalCtaAndFooter";
import { AcHero } from "@/components/advogado-criminal/Hero";
import { AcHowContactWorks } from "@/components/advogado-criminal/HowContactWorks";
import { AcOfficeSection } from "@/components/advogado-criminal/OfficeSection";
import { AcPracticeAndConfidential } from "@/components/advogado-criminal/PracticeAndConfidential";
import { AcReviewsSection } from "@/components/advogado-criminal/ReviewsSection";
import { AcScopeQualification } from "@/components/advogado-criminal/ScopeQualification";
import { AcStickyDock } from "@/components/advogado-criminal/StickyDock";
import { AcTopBar } from "@/components/advogado-criminal/TopBar";
import { AcTriageSection } from "@/components/advogado-criminal/TriageSection";
import { AC_SLUG, AC_VARIANT, faqs } from "@/lib/advogado-criminal";
import { HOME_URL, OFFICE_ADDRESS, PHONE_E164 } from "@/lib/site";

/**
 * NOVA PÁGINA DESAFIANTE DA HOME — `/advogado-criminal`
 * URL: https://goiania.rodrigofaustinoadvocacia.com.br/advogado-criminal
 *
 * Pronta para uso imediato em duas frentes:
 * 1. Painel de testes A/B (`/admin/experimentos`): basta cadastrar `/advogado-criminal`
 *    como desafiante contra `/`.
 * 2. Destino direto de campanhas de Pesquisa no Google Ads.
 *
 * - Estática (CDN, sem `headers()`): acesso direto recebe `X-Robots-Tag: noindex`
 *   via `next.config.ts`; servida em `/` pelo middleware (`x-ab-home-rewrite`),
 *   permanece indexável com `canonical: "/"` e Schema.org completo.
 * - Eventos idênticos aos da home (`lead_whatsapp_rodrigo_faustino_v2` e
 *   `lead_phone_rodrigo_faustino_v2`), diferenciados por `page_slug: "advogado-criminal"`
 *   e `ab_variant: "d"`.
 */

const title = "Advogado Criminalista em Goiânia 24h | Dr. Rodrigo Faustino";
const description =
  "Advogado criminalista em Goiânia com plantão 24h. Defesa imediata em prisão em flagrante, audiência de custódia, intimação, inquérito e processo criminal. Atendimento particular e direto com o Dr. Rodrigo.";
const ogImage = "/images/advogado-criminal/og-advogado-criminal.jpg";

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
      "Plantão criminal 24h em Goiânia e região. Prisão em flagrante, intimação, investigação e casos sensíveis. Fale diretamente com o Dr. Rodrigo Faustino.",
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
    image: `${HOME_URL}/images/advogado-criminal/dr-rodrigo-hero.webp`,
    logo: `${HOME_URL}/images/logo-faustino.webp`,
    description:
      "Defesa criminal em Goiânia e Aparecida de Goiânia. Plantão 24 horas para prisão em flagrante, audiência de custódia, intimações, inquéritos e processos criminais.",
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
    image: `${HOME_URL}/images/advogado-criminal/dr-rodrigo-hero.webp`,
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

export default function AdvogadoCriminalPage() {
  return (
    <LeadTrackingProvider pageSlug={AC_SLUG} variant={AC_VARIANT}>
      <LandingMeasurement />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <AcTopBar />

      <main data-ab-variant={AC_VARIANT} className="ac-page">
        <AcHero />
        <AcTriageSection />
        <AcScopeQualification />
        <AcAuthorityManifesto />
        <AcCriticalHours />
        <AcReviewsSection />
        <AcHowContactWorks />
        <AcPracticeAndConfidential />
        <AcFaqSection />
        <AcOfficeSection />
      </main>

      <AcFinalCtaAndFooter />
      <AcStickyDock />
    </LeadTrackingProvider>
  );
}
