import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";

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
  title: "Advogado Criminalista em Goiânia — Defesa imediata, 24 horas | Dr. Rodrigo Faustino",
  description:
    "Você foi preso, intimado, está sendo investigado ou acusado de um crime? Atuação imediata na defesa criminal em Goiânia, Aparecida de Goiânia e região. Plantão 24h.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: "document.documentElement.classList.add('js')",
          }}
        />
      </head>
      <body className={`${inter.variable} ${fraunces.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
