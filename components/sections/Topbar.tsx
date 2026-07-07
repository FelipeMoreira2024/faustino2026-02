import { WhatsAppButton } from "@/components/WhatsAppButton";
import { PHONE_DISPLAY, PHONE_TEL, WA_STANDARD } from "@/lib/whatsapp";

export function Topbar() {
  return (
    <div className="sticky top-0 z-50 h-11 border-b border-brass/20 bg-ink shadow-[0_10px_28px_-18px_rgba(0,0,0,0.7)]">
      <div className="mx-auto flex h-full max-w-6xl items-center justify-between gap-3 px-4 sm:px-8 lg:px-20">
        <p className="flex min-w-0 items-center gap-2 text-[11px] leading-tight text-paper sm:text-xs">
          <span
            aria-hidden="true"
            className="pulse-dot h-2 w-2 shrink-0 rounded-full bg-whatsapp"
          />
          <span className="truncate">
            <strong className="font-semibold tracking-wide">
              PLANTÃO CRIMINAL 24H
            </strong>
            <span className="hidden md:inline">
              {" "}
              — Acusado ou preso? Fale agora:
            </span>{" "}
            <a
              href={PHONE_TEL}
              className="inline-block whitespace-nowrap py-3 font-semibold underline-offset-2 hover:underline"
            >
              {PHONE_DISPLAY}
            </a>
          </span>
        </p>
        <WhatsAppButton
          section="topbar"
          href={WA_STANDARD}
          compact
          className="shrink-0"
        >
          <span className="sr-only sm:not-sr-only">WhatsApp</span>
        </WhatsAppButton>
      </div>
    </div>
  );
}
