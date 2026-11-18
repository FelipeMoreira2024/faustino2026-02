"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const goianiaClock = new Intl.DateTimeFormat("pt-BR", {
  hour: "2-digit",
  minute: "2-digit",
  timeZone: "America/Sao_Paulo",
});

/**
 * Indicador de plantão em tempo real no fuso de Goiânia.
 * Especialmente persuasivo à noite, de madrugada e aos fins de semana.
 */
export function LivePlantaoBadge({ className }: { className?: string }) {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const update = () => setTime(goianiaClock.format(new Date()));
    update();
    const timer = window.setInterval(update, 30_000);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <p className={cn("flex items-center gap-2 text-[13.5px] leading-snug text-paper", className)}>
      <span
        aria-hidden="true"
        className="pulse-dot inline-block h-2 w-2 shrink-0 rounded-full bg-whatsapp"
      />
      <span>
        <strong className="font-semibold text-paper">Plantão 24h em atividade</strong>
        {time ? <span className="text-muted"> · {time} em Goiânia</span> : null}
      </span>
    </p>
  );
}
