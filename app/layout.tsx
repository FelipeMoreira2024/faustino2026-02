import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import { CookieConsent } from "@/components/CookieConsent";
import {
  absoluteUrl,
  HOME_URL,
  isVercelPreview,
  SITE_NAME,
  SITE_URL,
} from "@/lib/site";
import "./globals.css";

const gtmId = process.env.NEXT_PUBLIC_GTM_ID || "GTM-KXMJTXP";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
  axes: ["opsz"],
  style: ["normal", "italic"],
  weight: "variable",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Advogado Criminalista em Goiânia | Dr. Rodrigo Faustino",
  description:
    "Advogado criminalista em Goiânia. Defesa em prisão em flagrante, audiência de custódia, inquéritos e processos criminais, com atendimento direto.",
  alternates: { canonical: HOME_URL },
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
  authors: [{ name: "Dr. Rodrigo Faustino" }],
  creator: "Dr. Rodrigo Faustino — Advogado Criminalista",
  publisher: SITE_NAME,
  formatDetection: { telephone: true },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: HOME_URL,
    siteName: SITE_NAME,
    title: "Advogado Criminalista em Goiânia | Dr. Rodrigo Faustino",
    description:
      "Defesa criminal em Goiânia e região para prisões, intimações, investigações e processos. Atendimento direto com o advogado.",
    images: [
      {
        url: absoluteUrl("/images/og-image.jpg"),
        width: 1200,
        height: 630,
        alt: `${SITE_NAME} — Advogado Criminalista em Goiânia`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Advogado Criminalista em Goiânia | Dr. Rodrigo Faustino",
    description:
      "Defesa criminal em Goiânia e região, com atendimento direto e orientação responsável.",
    images: [absoluteUrl("/images/og-image.jpg")],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="js">
      <head>
        <noscript>
          <style>{`.reveal { opacity: 1 !important; transform: none !important; }`}</style>
        </noscript>
      </head>
      <body className={`${inter.variable} ${fraunces.variable} font-sans antialiased`}>
        {children}
        <CookieConsent gtmId={gtmId} />
      </body>
    </html>
  );
}
