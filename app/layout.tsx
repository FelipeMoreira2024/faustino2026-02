import type { Metadata } from "next";
import Script from "next/script";
import { Fraunces, Inter } from "next/font/google";
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="js">
      <head>
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        {gtmId ? (
          <Script id="gtm-base" strategy="afterInteractive">
            {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${gtmId}');`}
          </Script>
        ) : null}
        <noscript>
          <style>{`.reveal { opacity: 1 !important; transform: none !important; }`}</style>
        </noscript>
      </head>
      <body className={`${inter.variable} ${fraunces.variable} font-sans antialiased`}>
        {gtmId ? (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
            />
          </noscript>
        ) : null}
        {children}
      </body>
    </html>
  );
}
