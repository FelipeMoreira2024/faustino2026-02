"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const clock = new Intl.DateTimeFormat("pt-BR", {
  hour: "2-digit",
  minute: "2-digit",
  timeZone: "America/Sao_Paulo",
});

/**
 * "Plantão ativo agora", com a hora de Goiânia depois de montar. De madrugada,
 * ver "02:13" ao lado do botão confirma que o 24h é para valer.
 */
export function PlantaoStatus({ className }: { className?: string }) {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const tick = () => setTime(clock.format(new Date()));
    tick();
    const id = window.setInterval(tick, 30_000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <p className={cn("flex items-center gap-2 text-sm text-paper", className)}>
      <span
        aria-hidden="true"
        className="pulse-dot inline-block h-2 w-2 shrink-0 rounded-full bg-whatsapp"
      />
      <span>
        <strong className="font-semibold">Plantão ativo agora</strong>
        {time ? <span className="text-muted"> · {time} em Goiânia</span> : null}
      </span>
    </p>
  );
}
