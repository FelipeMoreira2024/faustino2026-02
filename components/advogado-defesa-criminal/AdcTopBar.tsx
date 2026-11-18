import { PhoneLink } from "@/components/PhoneLink";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import { AdcWhatsAppLink } from "@/components/advogado-defesa-criminal/AdcWhatsAppLink";
import { ADC_CONTAINER } from "@/components/advogado-defesa-criminal/ui";
import { PHONE_DISPLAY } from "@/lib/whatsapp";

/**
 * Barra superior enxuta (44px) segura até 320px:
 * - No celular, garante ligação imediata com área de toque de 44px sem disputar
 *   espaço com o CTA principal do Hero logo abaixo;
 * - Em telas maiores, oferece o atalho direto de WhatsApp e fio de progresso CSS.
 */
export function AdcTopBar() {
  return (
    <header className="sticky top-0 z-50 h-11 border-b border-brass/20 bg-ink/95 shadow-[0_10px_28px_-18px_rgba(0,0,0,0.75)] backdrop-blur-md">
      <div className={`${ADC_CONTAINER} flex h-full items-center justify-between gap-3`}>
        <p className="flex min-w-0 items-center gap-2 text-xs leading-none text-paper max-sm:flex-1">
          <span
            aria-hidden="true"
            className="h-2 w-2 shrink-0 rounded-full bg-whatsapp sm:pulse-dot"
          />
          <strong className="shrink-0 font-semibold tracking-[0.08em]">
            PLANTÃO<span className="hidden sm:inline"> CRIMINAL</span> 24H
          </strong>
          <span className="hidden text-muted md:inline">
            — Prisão ou intimação urgente? Ligue:
          </span>
          <PhoneLink
            section="topbar"
            variant="text"
            className="min-h-11 gap-1.5 text-[13px] font-semibold max-sm:ml-auto sm:text-xs [&>svg]:h-3.5 [&>svg]:w-3.5"
          >
            {PHONE_DISPLAY}
          </PhoneLink>
        </p>

        <AdcWhatsAppLink
          section="topbar"
          className="hidden h-8 shrink-0 items-center gap-1.5 rounded-md bg-whatsapp px-3.5 text-xs font-semibold text-ink transition-colors hover:bg-[#20c65c] sm:inline-flex"
        >
          <WhatsAppIcon className="h-3.5 w-3.5 shrink-0" />
          WhatsApp direto
        </AdcWhatsAppLink>
      </div>

      <span
        aria-hidden="true"
        className="adc-scroll-line pointer-events-none absolute inset-x-0 -bottom-px h-px bg-brass"
      />
    </header>
  );
}
