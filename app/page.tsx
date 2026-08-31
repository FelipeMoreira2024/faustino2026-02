import { Topbar } from "@/components/sections/Topbar";
import { Hero } from "@/components/sections/Hero";
import { UrgentSituations } from "@/components/sections/UrgentSituations";
import { QualificationFilter } from "@/components/sections/QualificationFilter";
import { PracticeAreas } from "@/components/sections/PracticeAreas";
import { ServiceHub } from "@/components/sections/ServiceHub";
import { Authority } from "@/components/sections/Authority";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { SexualCrimesDefense } from "@/components/sections/SexualCrimesDefense";
import { Testimonials } from "@/components/sections/Testimonials";
import { Faq } from "@/components/sections/Faq";
import { Location } from "@/components/sections/Location";
import { FinalCta } from "@/components/sections/FinalCta";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { SiteFooter } from "@/components/SiteFooter";
import { JsonLd } from "@/components/JsonLd";
import { faqItems } from "@/lib/faq";
import {
  legalServiceJsonLd,
  personJsonLd,
  HOME_URL,
  SITE_NAME,
} from "@/lib/site";

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${HOME_URL}/#website`,
  url: HOME_URL,
  name: SITE_NAME,
  inLanguage: "pt-BR",
  publisher: { "@id": `${HOME_URL}/#legalservice` },
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
      <JsonLd data={[websiteJsonLd, legalServiceJsonLd, personJsonLd, faqJsonLd]} />

      <Topbar />

      <main className="relative">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-0 left-8 top-0 z-10 hidden w-px bg-brass/25 lg:block"
        />

        <Hero />
        <UrgentSituations />
        <QualificationFilter />
        <PracticeAreas />
        <ServiceHub />
        <Authority />
        <HowItWorks />
        <SexualCrimesDefense />
        <Testimonials />
        <Faq />
        <Location />
        <FinalCta />
      </main>

      <SiteFooter />
      <FloatingWhatsApp />
    </>
  );
}
