"use client";

import { useEffect, useRef } from "react";

type C24CountUpProps = {
  to: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  /** Duração em ms. */
  duration?: number;
};

function format(value: number, decimals: number) {
  return value.toLocaleString("pt-BR", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

/**
 * Número que conta de zero até o valor quando entra na tela. O HTML já sai com
 * o valor final (leitor de tela e quem não tem JavaScript leem o número certo);
 * a largura é travada antes de contar, para nada ao redor se mexer.
 */
export function C24CountUp({
  to,
  decimals = 0,
  prefix = "",
  suffix = "",
  duration = 1600,
}: C24CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const final = `${prefix}${format(to, decimals)}${suffix}`;

  useEffect(() => {
    const el = ref.current;
    if (
      !el ||
      !("IntersectionObserver" in window) ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const render = (value: number) => {
      el.textContent = `${prefix}${format(value, decimals)}${suffix}`;
    };

    el.style.minWidth = `${el.getBoundingClientRect().width}px`;
    render(0);

    let frame = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        const start = performance.now();
        const step = (now: number) => {
          const t = Math.min((now - start) / duration, 1);
          render(t === 1 ? to : to * (1 - Math.pow(1 - t, 4)));
          if (t < 1) frame = requestAnimationFrame(step);
        };
        frame = requestAnimationFrame(step);
      },
      { threshold: 0.6 }
    );
    observer.observe(el);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      el.textContent = final;
      el.style.minWidth = "";
    };
  }, [to, decimals, prefix, suffix, duration, final]);

  return (
    <>
      <span className="sr-only">{final}</span>
      <span ref={ref} aria-hidden="true" className="inline-block text-left tabular-nums">
        {final}
      </span>
    </>
  );
}
