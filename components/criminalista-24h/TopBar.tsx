import { PhoneLink } from "@/components/PhoneLink";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import { C24WhatsAppLink } from "@/components/criminalista-24h/WhatsAppLink";
import { CONTAINER } from "@/components/criminalista-24h/ui";
import { PHONE_DISPLAY } from "@/lib/whatsapp";

/**
 * Igual em função à topbar da home (plantão + telefone + WhatsApp) a partir de
 * 640px. No celular a barra tem uma função só: ligar. Lá o WhatsApp já está
 * sempre à mão (botão do topo da página e, depois dele, a barra fixa de baixo),
 * então um terceiro botão verde aqui só disputava atenção — e em telas de
 * 360px ele cobria o fim do telefone.
 */
export function C24TopBar() {
  return (
    <header className="sticky top-0 z-50 h-11 border-b border-brass/20 bg-ink/95 shadow-[0_10px_28px_-18px_rgba(0,0,0,0.7)] backdrop-blur-md">
      <div className={`${CONTAINER} flex h-full items-center justify-between gap-3`}>
        <p className="flex min-w-0 items-center gap-2 text-xs leading-none text-paper max-sm:flex-1">
          <span
            aria-hidden="true"
            className="c24-pulse-sm h-2 w-2 shrink-0 rounded-full bg-whatsapp"
          />
          <strong className="shrink-0 font-semibold tracking-[0.08em]">
            PLANTÃO<span className="hidden sm:inline"> CRIMINAL</span> 24H
          </strong>
          <span className="hidden text-muted md:inline">— Preso, intimado ou investigado? Ligue:</span>
          <PhoneLink
            section="topbar"
            variant="text"
            className="min-h-11 gap-1.5 text-[13px] font-semibold max-sm:ml-auto sm:text-xs [&>svg]:h-3.5 [&>svg]:w-3.5"
          >
            {PHONE_DISPLAY}
          </PhoneLink>
        </p>
        <C24WhatsAppLink
          section="topbar"
          className="hidden h-8 shrink-0 items-center gap-1.5 rounded-md bg-whatsapp px-3 text-xs font-semibold text-ink transition-colors hover:bg-[#1fc35c] sm:inline-flex"
        >
          <WhatsAppIcon className="h-3.5 w-3.5 shrink-0" />
          WhatsApp
        </C24WhatsAppLink>
      </div>
      {/* Fio de progresso de leitura: cresce com o scroll, só por CSS (c24.css). */}
      <span
        aria-hidden="true"
        className="c24-progress pointer-events-none absolute inset-x-0 -bottom-px h-px bg-brass"
      />
    </header>
  );
}
