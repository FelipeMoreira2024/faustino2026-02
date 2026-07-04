import { cn } from "@/lib/utils";

type SectionMarkerProps = {
  number: string;
  /** Fundo da seção onde o losango vive, para "interromper" a hairline. */
  tone: "ink" | "paper";
  /** No mobile os losangos são divisores ENTRE seções — a primeira seção não exibe. */
  hideOnMobile?: boolean;
};

/**
 * Losango da hairline assinatura. No desktop senta sobre a linha vertical
 * à esquerda; no mobile vira divisor centralizado entre seções.
 */
export function SectionMarker({ number, tone, hideOnMobile }: SectionMarkerProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "relative z-20 justify-center pt-10 lg:absolute lg:left-8 lg:top-16 lg:flex lg:-translate-x-1/2 lg:justify-start lg:pt-0",
        hideOnMobile ? "hidden" : "flex"
      )}
    >
      <span
        className={cn(
          "flex h-8 w-8 rotate-45 items-center justify-center border border-brass/60",
          tone === "ink" ? "bg-ink" : "bg-paper"
        )}
      >
        <span
          className={cn(
            "-rotate-45 font-display text-[11px] font-semibold leading-none",
            tone === "ink" ? "text-brass" : "text-brass-deep"
          )}
        >
          {number}
        </span>
      </span>
    </div>
  );
}
