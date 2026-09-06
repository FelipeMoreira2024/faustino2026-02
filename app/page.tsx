import type { Metadata } from "next";
import Image from "next/image";
import { Topbar } from "@/components/sections/Topbar";
import { Hero } from "@/components/sections/Hero";
import { UrgentSituations } from "@/components/sections/UrgentSituations";
import { QualificationFilter } from "@/components/sections/QualificationFilter";
import { PracticeAreas } from "@/components/sections/PracticeAreas";
import { Authority } from "@/components/sections/Authority";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { SexualCrimesDefense } from "@/components/sections/SexualCrimesDefense";
import { Testimonials } from "@/components/sections/Testimonials";
import { Faq } from "@/components/sections/Faq";
import { Location } from "@/components/sections/Location";
import { FinalCta } from "@/components/sections/FinalCta";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { faqItems } from "@/lib/faq";
import { WA_HOME_STANDARD } from "@/lib/whatsapp";
import { LeadTrackingProvider } from "@/components/LeadTrackingContext";

const SITE_URL = "https://goiania.rodrigofaustinoadvocacia.com.br";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Advogado Criminalista em Goiânia 24h | Dr. Rodrigo Faustino",
  description:
    "Advogado criminalista em Goiânia com plantão 24h. Defesa imediata em prisão em flagrante, audiência de custódia, inquéritos e processos criminais. Atendimento direto com o advogado.",
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
  authors: [{ name: "Dr. Rodrigo Faustino" }],
  creator: "Dr. Rodrigo Faustino — Advogado Criminalista",
  publisher: "Faustino Advocacia Especializada",
  formatDetection: { telephone: true },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: SITE_URL,
    siteName: "Dr. Rodrigo Faustino — Advogado Criminalista",
    title: "Advogado Criminalista em Goiânia 24h | Dr. Rodrigo Faustino",
    description:
      "Defesa criminal imediata em Goiânia e região. Plantão 24h para prisão em flagrante, intimação e casos urgentes. Fale direto com o advogado.",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Faustino Advocacia Especializada — Advogado Criminalista em Goiânia",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Advogado Criminalista em Goiânia 24h | Dr. Rodrigo Faustino",
    description:
      "Defesa criminal imediata em Goiânia e região. Plantão 24h. Fale direto com o advogado.",
    images: ["/images/og-image.jpg"],
  },
};

const legalServiceJsonLd = {
  "@context": "https://schema.org",
  "@type": ["LegalService", "Attorney"],
  "@id": `${SITE_URL}/#legalservice`,
  name: "Dr. Rodrigo Faustino — Advogado Criminalista",
  url: SITE_URL,
  image: `${SITE_URL}/images/dr-rodrigo-hero.webp`,
  logo: `${SITE_URL}/images/logo-faustino.webp`,
  description:
    "Defesa criminal em Goiânia e Aparecida de Goiânia. Plantão 24 horas para prisão em flagrante, audiência de custódia e casos urgentes.",
  telephone: "+5562994442343",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Rua 1.136, nº 246 — Setor Marista",
    addressLocality: "Goiânia",
    addressRegion: "GO",
    postalCode: "74180-150",
    addressCountry: "BR",
  },
  areaServed: [
    { "@type": "City", name: "Goiânia" },
    { "@type": "City", name: "Aparecida de Goiânia" },
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
    "Tribunal do Júri",
    "Defesa em crimes sexuais",
    "Defesa em crimes de drogas",
  ],
  founder: { "@id": `${SITE_URL}/#advogado` },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${SITE_URL}/#advogado`,
  name: "Rodrigo Faustino",
  honorificPrefix: "Dr.",
  jobTitle: "Advogado Criminalista",
  image: `${SITE_URL}/images/dr-rodrigo-hero.webp`,
  telephone: "+5562994442343",
  url: SITE_URL,
  worksFor: { "@id": `${SITE_URL}/#legalservice` },
  memberOf: {
    "@type": "Organization",
    name: "ABRACRIM/GO — Associação Brasileira dos Advogados Criminalistas",
  },
  hasCredential: {
    "@type": "EducationalOccupationalCredential",
    credentialCategory: "Registro profissional",
    name: "OAB/GO 64.028",
  },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map(({ question, answer }) => ({
    "@type": "Question",
    name: question,
    acceptedAnswer: { "@type": "Answer", text: answer },
  })),
};

export default function Page() {
  return (
    <LeadTrackingProvider pageSlug="home" variant="a">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(legalServiceJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <Topbar home href={WA_HOME_STANDARD} />

      <main className="relative">
        {/* Hairline assinatura: lombada do dossiê, só desktop */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-0 left-8 top-0 z-10 hidden w-px bg-brass/25 lg:block"
        />

        <Hero />
        <UrgentSituations />
        <QualificationFilter />
        <PracticeAreas />
        <Authority />
        <HowItWorks />
        <SexualCrimesDefense />
        <Testimonials />
        <Faq />
        <Location />
        <FinalCta />
      </main>

      <footer className="border-t border-brass/15 bg-ink">
        <div className="mx-auto max-w-6xl px-5 py-8 text-center sm:px-8 lg:px-20">
          <Image
            src="/images/logo-faustino.webp"
            alt="Faustino Advocacia Especializada"
            width={200}
            height={72}
            className="mx-auto mb-5 h-auto w-[150px] opacity-90 sm:w-[180px]"
          />
          <p className="text-xs leading-relaxed text-muted">
            Dr. Rodrigo Faustino — Advogado Criminalista em Goiânia • OAB/GO
            64.028. Conteúdo meramente informativo, em conformidade com o
            Provimento 205/2021 da OAB.
          </p>
          <p className="mt-4 text-[11px] tracking-wide text-muted/50">
            <a
              href="https://maquinadeclientes.goexpert.com.br/"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-muted/80"
            >
              feito com máquina de clientes
            </a>
          </p>
        </div>
      </footer>

      <FloatingWhatsApp home href={WA_HOME_STANDARD} />
    </LeadTrackingProvider>
  );
}
