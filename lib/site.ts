export const SITE_URL = "https://adv.rodrigofaustinoadvocacia.com.br";
export const HOME_URL = "https://goiania.rodrigofaustinoadvocacia.com.br";

export const SITE_NAME = "Faustino Advocacia";
export const ATTORNEY_NAME = "Dr. Rodrigo Faustino";
export const ATTORNEY_OAB = "OAB/GO 64.028";
export const PHONE_E164 = "+5562994442343";
export const PHONE_DISPLAY = "(62) 9 9444-2343";
export const PHONE_TEL = `tel:${PHONE_E164}`;

export const OFFICE_ADDRESS = {
  streetAddress: "Rua 1.136, nº 246 — Setor Marista",
  addressLocality: "Goiânia",
  addressRegion: "GO",
  postalCode: "74180-150",
  addressCountry: "BR",
};

export const OFFICE_ADDRESS_DISPLAY =
  "Rua 1.136, nº 246 — Setor Marista, Goiânia/GO — CEP 74180-150";

export const MAPS_QUERY = encodeURIComponent(
  "Rua 1136, 246, Setor Marista, Goiânia - GO, 74180-150"
);

export const MAPS_LINK = `https://www.google.com/maps/search/?api=1&query=${MAPS_QUERY}`;
export const MAPS_EMBED = `https://www.google.com/maps?q=${MAPS_QUERY}&output=embed`;

export const isVercelPreview = process.env.VERCEL_ENV === "preview";

export function absoluteUrl(path = "/") {
  return new URL(path, SITE_URL).toString();
}

export function homeUrl(path = "/") {
  return new URL(path, HOME_URL).toString();
}

export const legalServiceJsonLd = {
  "@context": "https://schema.org",
  "@type": ["LegalService", "Attorney"],
  "@id": `${HOME_URL}/#legalservice`,
  name: `${ATTORNEY_NAME} — Advogado Criminalista`,
  url: HOME_URL,
  image: absoluteUrl("/images/dr-rodrigo-hero.webp"),
  logo: absoluteUrl("/images/logo-faustino.webp"),
  description:
    "Defesa criminal em Goiânia e atendimento de casos em outras cidades de Goiás, com atuação em prisões, investigações e processos criminais.",
  telephone: PHONE_E164,
  address: {
    "@type": "PostalAddress",
    ...OFFICE_ADDRESS,
  },
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
    "Liberdade provisória",
    "Inquérito policial",
    "Prisão temporária",
    "Defesa em crimes sexuais",
  ],
  founder: { "@id": `${HOME_URL}/#advogado` },
};

export const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${HOME_URL}/#advogado`,
  name: "Rodrigo Faustino",
  honorificPrefix: "Dr.",
  jobTitle: "Advogado Criminalista",
  image: absoluteUrl("/images/dr-rodrigo-hero.webp"),
  telephone: PHONE_E164,
  url: absoluteUrl("/sobre-rodrigo-faustino/"),
  worksFor: { "@id": `${HOME_URL}/#legalservice` },
  hasCredential: {
    "@type": "EducationalOccupationalCredential",
    credentialCategory: "Registro profissional",
    name: ATTORNEY_OAB,
  },
};
