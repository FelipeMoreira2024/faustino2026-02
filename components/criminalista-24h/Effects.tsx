"use client";

import { useEffect } from "react";

/**
 * Luz que acompanha o cursor nos elementos `.c24-spot` (cartões de situação e
 * de avaliação). Um único ouvinte para a página inteira, só em telas com mouse:
 * ele grava a posição do cursor em `--c24-mx` / `--c24-my` e o CSS desenha a luz.
 */
export function C24Effects() {
  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    const onMove = (event: PointerEvent) => {
      const target = event.target instanceof Element ? event.target : null;
      const spot = target?.closest<HTMLElement>(".c24-spot");
      if (!spot) return;
      const rect = spot.getBoundingClientRect();
      spot.style.setProperty("--c24-mx", `${event.clientX - rect.left}px`);
      spot.style.setProperty("--c24-my", `${event.clientY - rect.top}px`);
    };

    document.addEventListener("pointermove", onMove, { passive: true });
    return () => document.removeEventListener("pointermove", onMove);
  }, []);

  return null;
}
