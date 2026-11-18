import { landingPages } from "@/lib/landing-pages";
import { HOME_HOST, LANDING_HOST } from "@/lib/ab/urls";

export const landingCatalog = [
  { name: "Home original", path: "/", host: HOME_HOST },
  { name: "Home B (alias de Criminalista 24h)", path: "/b", host: HOME_HOST },
  { name: "Home B original", path: "/home-b", host: HOME_HOST },
  { name: "Criminalista 24h", path: "/criminalista-24h", host: HOME_HOST },
  { name: "Defesa Criminal", path: "/defesa-criminal", host: HOME_HOST },
  { name: "Advogado Criminal", path: "/advogado-criminal", host: HOME_HOST },
  { name: "Advogado de Defesa Criminal", path: "/advogado-defesa-criminal", host: HOME_HOST },
  ...landingPages.map(({ slug, h1 }) => ({ name: h1, path: `/${slug}`, host: LANDING_HOST })),
];
