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

const SITE_URL = "https://goiania.rodrigofaustinoadvocacia.com.br";

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
    <>
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

      <Topbar />

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
        </div>
      </footer>

      <FloatingWhatsApp />
    </>
  );
}
