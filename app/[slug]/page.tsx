import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/JsonLd";
import { LandingPageView } from "@/components/landing/LandingPageView";
import {
  getLandingPage,
  landingPages,
  landingPath,
} from "@/lib/landing-pages";
import {
  absoluteUrl,
  HOME_URL,
  isVercelPreview,
  SITE_NAME,
} from "@/lib/site";

type RouteProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return landingPages.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({ params }: RouteProps): Promise<Metadata> {
  const { slug } = await params;
  const page = getLandingPage(slug);
  if (!page) return {};

  const canonical = landingPath(page.slug);

  return {
    title: page.seoTitle,
    description: page.description,
    keywords: [page.primaryKeyword, ...page.secondaryKeywords],
    alternates: { canonical },
    robots: isVercelPreview
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
          },
        },
    authors: [{ name: "Dr. Rodrigo Faustino", url: "/sobre-rodrigo-faustino" }],
    openGraph: {
      type: "website",
      locale: "pt_BR",
      url: absoluteUrl(canonical),
      siteName: SITE_NAME,
      title: page.seoTitle,
      description: page.description,
      images: [
        {
          url: absoluteUrl("/images/og-image.jpg"),
          width: 1200,
          height: 630,
          alt: `${page.h1} — ${SITE_NAME}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: page.seoTitle,
      description: page.description,
      images: [absoluteUrl("/images/og-image.jpg")],
    },
  };
}

export default async function LandingRoute({ params }: RouteProps) {
  const { slug } = await params;
  const page = getLandingPage(slug);
  if (!page) notFound();

  const pageUrl = absoluteUrl(landingPath(page.slug));
  const webPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${pageUrl}#webpage`,
    url: pageUrl,
    name: page.h1,
    description: page.description,
    inLanguage: "pt-BR",
    dateModified: "2026-08-31",
    author: { "@id": `${HOME_URL}/#advogado` },
    publisher: { "@id": `${HOME_URL}/#legalservice` },
    isPartOf: { "@id": `${HOME_URL}/#website` },
  };

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${pageUrl}#service`,
    name: page.h1,
    description: page.description,
    url: pageUrl,
    serviceType: page.topic,
    provider: { "@id": `${HOME_URL}/#legalservice` },
    areaServed: { "@type": "City", name: page.city },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Início",
        item: HOME_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Defesa criminal",
        item: HOME_URL,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: `${page.topic} em ${page.city}`,
        item: pageUrl,
      },
    ],
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: page.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };

  return (
    <>
      <JsonLd data={[webPageJsonLd, serviceJsonLd, breadcrumbJsonLd, faqJsonLd]} />
      <LandingPageView page={page} />
    </>
  );
}
