import Image from "next/image";
import { AgencyCredit } from "@/components/AgencyCredit";
import { CookieSettingsButton } from "@/components/CookieSettingsButton";

/** Mesmo rodapé da home, com folga embaixo para a barra fixa do celular. */
export function C24Footer() {
  return (
    <footer className="border-t border-brass/15 bg-ink pb-24 lg:pb-0">
      <div className="px-6 pt-6 text-center text-sm text-muted">
        <CookieSettingsButton />
      </div>
      <div className="mx-auto max-w-6xl px-5 py-8 text-center sm:px-8">
        <Image
          src="/images/logo-faustino.webp"
          alt="Faustino Advocacia Especializada"
          width={200}
          height={72}
          className="mx-auto mb-5 h-auto w-[150px] opacity-90 sm:w-[180px]"
        />
        <p className="text-xs leading-relaxed text-muted">
          Dr. Rodrigo Faustino — Advogado Criminalista em Goiânia • OAB/GO 64.028. Conteúdo meramente
          informativo, em conformidade com o Provimento 205/2021 da OAB.
        </p>
        <p className="mt-4 text-[11px] tracking-wide text-muted/50">
          <AgencyCredit />
        </p>
      </div>
    </footer>
  );
}
