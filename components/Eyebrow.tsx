import { cn } from "@/lib/utils";

type EyebrowProps = {
  children: React.ReactNode;
  tone?: "ink" | "paper";
  className?: string;
};

export function Eyebrow({ children, tone = "ink", className }: EyebrowProps) {
  return (
    <p
      className={cn(
        "text-xs font-medium uppercase tracking-[0.15em]",
        tone === "ink" ? "text-brass" : "text-brass-deep",
        className
      )}
    >
      {children}
    </p>
  );
}
