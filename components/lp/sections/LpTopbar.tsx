import Image from "next/image";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import { LpPhoneLink } from "@/components/lp/LpPhoneLink";
import { LpWhatsAppLink } from "@/components/lp/LpWhatsAppLink";
import { CONTAINER } from "@/components/lp/ui";
import { PHONE_DISPLAY } from "@/lib/site";

export function LpTopbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-brass/15 bg-ink shadow-[0_12px_30px_-22px_rgba(0,0,0,0.9)]">
      <div className={`${CONTAINER} flex h-12 items-center justify-between gap-3 lg:h-14`}>
        <div className="flex min-w-0 items-center gap-5">
          <Image
            src="/images/logo-faustino.webp"
            alt="Faustino Advocacia Especializada"
            width={400}
            height={137}
            sizes="124px"
            quality={75}
            className="hidden h-auto w-[124px] lg:block"
          />
          <span aria-hidden="true" className="hidden h-5 w-px bg-brass/25 lg:block" />
          <p className="flex min-w-0 items-center gap-2 text-[11px] leading-none text-paper sm:text-xs">
            <span aria-hidden="true" className="pulse-dot h-2 w-2 shrink-0 rounded-full bg-whatsapp" />
            <span className="truncate">
              <strong className="font-semibold tracking-[0.08em]">PLANTÃO CRIMINAL 24H</strong>
              <span className="hidden text-muted md:inline"> · ligue ou chame no WhatsApp:</span>{" "}
              <LpPhoneLink
                section="topbar"
                className="inline-block whitespace-nowrap py-3 font-semibold underline-offset-4 hover:underline"
              >
                {PHONE_DISPLAY}
              </LpPhoneLink>
            </span>
          </p>
        </div>
        <LpWhatsAppLink
          section="topbar"
          ariaLabel="Falar no WhatsApp"
          className="inline-flex shrink-0 items-center gap-1.5 rounded-[5px] bg-whatsapp px-3 py-2 text-xs font-semibold text-[#0b1a10] transition-colors hover:bg-[#2fdc72]"
        >
          <WhatsAppIcon className="h-3.5 w-3.5 shrink-0" />
          <span className="hidden sm:inline">WhatsApp</span>
        </LpWhatsAppLink>
      </div>
    </header>
  );
}
