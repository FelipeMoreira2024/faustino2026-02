import type { Metadata } from "next";
import Image from "next/image";
import { LeadTrackingProvider } from "@/components/LeadTrackingContext";
import { Topbar } from "@/components/sections/Topbar";
import { HeroB } from "@/components/sections/home-b/HeroB";
import { UrgentSituations } from "@/components/sections/UrgentSituations";
import { QualificationFilterB } from "@/components/sections/home-b/QualificationFilterB";
import { PracticeAreas } from "@/components/sections/PracticeAreas";
import { Authority } from "@/components/sections/Authority";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { SexualCrimesDefense } from "@/components/sections/SexualCrimesDefense";
import { Testimonials } from "@/components/sections/Testimonials";
import { Faq } from "@/components/sections/Faq";
import { Location } from "@/components/sections/Location";
import { FinalCtaB } from "@/components/sections/home-b/FinalCtaB";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { WA_HOME_B } from "@/lib/whatsapp";

/**
 * HOME — VARIANTE B (teste A/B).
 *
 * Duplicata da home (`app/page.tsx`) com ajustes de copy e CTA focados em
 * lead qualificado (acusado / familiar de preso, pagante). Seções sem
 * alteração são reaproveitadas dos componentes originais; as alteradas vivem
 * em `components/sections/home-b/`.
 *
 * - URL de destino para o anúncio: https://goiania.rodrigofaustinoadvocacia.com.br/b
 * - `noindex` + canonical para "/" — a página existe só para o teste, não para SEO.
 * - Eventos de lead saem com `page_slug: "home-b"` e `ab_variant: "b"` (a home
 *   original sai como "home" / "a"), para comparação no GTM/GA4.
 */

const SITE_URL = "https://goiania.rodrigofaustinoadvocacia.com.br";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Advogado Criminalista em Goiânia 24h | Dr. Rodrigo Faustino",
  description:
    "Advogado criminalista em Goiânia com plantão 24h. Defesa imediata para quem foi preso, intimado, investigado ou acusado. Atendimento particular, direto com o advogado.",
  alternates: { canonical: "/" },
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false },
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: `${SITE_URL}/b`,
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
};

export default function PageB() {
  return (
    <LeadTrackingProvider pageSlug="home-b" variant="b">
      <Topbar
        home
        href={WA_HOME_B}
        message="— Preso, intimado ou investigado? Fale agora:"
      />

      <main className="relative" data-ab-variant="b">
        {/* Hairline assinatura: lombada do dossiê, só desktop */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-0 left-8 top-0 z-10 hidden w-px bg-brass/25 lg:block"
        />

        <HeroB />
        <UrgentSituations />
        <QualificationFilterB />
        <PracticeAreas />
        <Authority />
        <HowItWorks />
        <SexualCrimesDefense />
        <Testimonials />
        <Faq />
        <Location />
        <FinalCtaB />
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

      <FloatingWhatsApp home href={WA_HOME_B} />
    </LeadTrackingProvider>
  );
}
