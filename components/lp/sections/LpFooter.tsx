import Image from "next/image";
import { CookieSettingsButton } from "@/components/CookieSettingsButton";
import { CONTAINER } from "@/components/lp/ui";
import { absoluteUrl, OFFICE_ADDRESS_DISPLAY } from "@/lib/site";

export function LpFooter() {
  return (
    <footer className="border-t border-brass/10 bg-[var(--lp-ink-deep)]">
      <div className={`${CONTAINER} grid gap-8 py-12 md:grid-cols-[1fr_auto] md:items-end`}>
        <div>
          <Image
            src="/images/logo-faustino.webp"
            alt="Faustino Advocacia Especializada"
            width={400}
            height={137}
            sizes="150px"
            quality={75}
            className="h-auto w-[150px] opacity-90"
          />
          <p className="mt-6 text-sm leading-relaxed text-muted">
            Dr. Rodrigo Faustino — Advogado criminalista · OAB/GO 64.028
            <br />
            {OFFICE_ADDRESS_DISPLAY}
          </p>
          <p className="mt-4 max-w-2xl text-xs leading-relaxed text-muted/80">
            Conteúdo informativo, em conformidade com o Provimento 205/2021 do Conselho Federal da
            OAB. Nenhuma informação desta página substitui a análise individual do caso.
          </p>
        </div>
        <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs text-muted">
          <a className="link-underline py-2" href={absoluteUrl("/politica-de-privacidade")}>
            Política de privacidade
          </a>
          <span className="py-2">
            <CookieSettingsButton />
          </span>
        </div>
      </div>
      <p className="pb-8 text-center text-[11px] tracking-wide text-muted/45">
        <a
          href="https://maquinadeclientes.goexpert.com.br/"
          target="_blank"
          rel="noopener noreferrer"
          className="transition-colors hover:text-muted/80"
        >
          feito com máquina de clientes
        </a>
      </p>
    </footer>
  );
}
