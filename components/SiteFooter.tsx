import Image from "next/image";
import Link from "next/link";
import { CookieSettingsButton } from "@/components/CookieSettingsButton";
import { landingPath } from "@/lib/landing-pages";
import { absoluteUrl, ATTORNEY_NAME, ATTORNEY_OAB, HOME_URL, SITE_NAME } from "@/lib/site";

const urgentLinks = [
  ["Flagrante em Goiânia", "advogado-flagrante-goiania"],
  ["Audiência de custódia", "advogado-audiencia-de-custodia-goiania"],
  ["Liberdade provisória", "pedido-liberdade-provisoria-goiania"],
  ["Prisão temporária", "advogado-prisao-temporaria-goiania"],
];

const defenseLinks = [
  ["Inquérito policial", "advogado-inquerito-policial-goiania"],
  ["Crimes sexuais em Goiânia", "advogado-crimes-sexuais-goiania"],
  ["Crimes sexuais em Aparecida", "advogado-crimes-sexuais-aparecida-de-goiania"],
  ["Crimes sexuais em Anápolis", "advogado-crimes-sexuais-anapolis"],
  ["Criminalista em Anápolis", "advogado-criminalista-anapolis"],
];

export function SiteFooter() {
  return (
    <footer className="border-t border-brass/15 bg-ink">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-12 sm:px-8 md:grid-cols-[1.1fr_1fr_1fr] lg:px-20">
        <div>
          <Link href={HOME_URL} aria-label={`${SITE_NAME} — página inicial`}>
            <Image
              src="/images/logo-faustino.webp"
              alt={SITE_NAME}
              width={200}
              height={72}
              className="h-auto w-[170px] opacity-95"
            />
          </Link>
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted">
            {ATTORNEY_NAME} — Advogado Criminalista • {ATTORNEY_OAB}. Atendimento
            particular e conteúdo jurídico informativo.
          </p>
          <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-xs text-muted">
            <Link className="link-underline" href={absoluteUrl("/sobre-rodrigo-faustino")}>
              Sobre o advogado
            </Link>
            <Link className="link-underline" href={absoluteUrl("/contato")}>
              Contato
            </Link>
            <Link className="link-underline" href={absoluteUrl("/politica-de-privacidade")}>
              Privacidade
            </Link>
            <CookieSettingsButton />
          </div>
        </div>

        <nav aria-label="Prisões e liberdade">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brass">
            Prisões e liberdade
          </p>
          <ul className="mt-4 space-y-2.5 text-sm text-muted">
            {urgentLinks.map(([label, slug]) => (
              <li key={slug}>
                <Link className="link-underline hover:text-paper" href={absoluteUrl(landingPath(slug))}>
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Defesa criminal">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brass">
            Defesa criminal
          </p>
          <ul className="mt-4 space-y-2.5 text-sm text-muted">
            {defenseLinks.map(([label, slug]) => (
              <li key={slug}>
                <Link className="link-underline hover:text-paper" href={absoluteUrl(landingPath(slug))}>
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="border-t border-brass/10 px-5 py-5 text-center text-[11px] leading-relaxed text-muted/70">
        Publicidade informativa em conformidade com o Provimento 205/2021 da OAB.
        Nenhum conteúdo representa promessa de resultado.
      </div>
    </footer>
  );
}
