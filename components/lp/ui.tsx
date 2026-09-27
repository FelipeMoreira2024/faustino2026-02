import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

export const CONTAINER = "mx-auto w-full max-w-[76rem] px-5 sm:px-8 lg:px-12";

type SectionLabelProps = {
  numeral: string;
  children: React.ReactNode;
  tone?: "ink" | "paper";
  className?: string;
};

/** Rótulo de seção à maneira de peça jurídica: numeral romano, fio e título. */
export function SectionLabel({ numeral, children, tone = "ink", className }: SectionLabelProps) {
  return (
    <p
      className={cn(
        "lp-serif flex items-center gap-3 text-[15px] italic",
        tone === "ink" ? "text-brass" : "text-brass-deep",
        className
      )}
    >
      <span className="not-italic tracking-[0.06em]">{numeral}</span>
      <span aria-hidden="true" className="lp-rule" />
      <span>{children}</span>
    </p>
  );
}

export function Stars({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex gap-0.5", className)} role="img" aria-label="5 de 5 estrelas">
      {Array.from({ length: 5 }).map((_, index) => (
        <Star key={index} className="h-3.5 w-3.5 fill-current" strokeWidth={0} aria-hidden="true" />
      ))}
    </span>
  );
}
