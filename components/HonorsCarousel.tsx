"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export type HonorsSlide = {
  src: string;
  caption: string;
};

type HonorsCarouselProps = {
  slides: HonorsSlide[];
};

export function HonorsCarousel({ slides }: HonorsCarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const updateArrows = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const maxScroll = el.scrollWidth - el.clientWidth;
    setCanPrev(el.scrollLeft > 8);
    setCanNext(el.scrollLeft < maxScroll - 8);
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    updateArrows();
    el.addEventListener("scroll", updateArrows, { passive: true });
    window.addEventListener("resize", updateArrows);
    return () => {
      el.removeEventListener("scroll", updateArrows);
      window.removeEventListener("resize", updateArrows);
    };
  }, [updateArrows]);

  const scrollByPage = (direction: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: direction * el.clientWidth, behavior: "smooth" });
  };

  return (
    <div className="relative">
      <div
        ref={trackRef}
        className="no-scrollbar -mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth px-5 scroll-pl-5 sm:mx-0 sm:gap-5 sm:px-0 sm:scroll-pl-0"
        role="region"
        aria-label="Galeria de reconhecimentos"
      >
        {slides.map(({ src, caption }) => (
          <figure
            key={src}
            className="w-[78%] shrink-0 snap-start sm:w-[calc((100%-1.25rem)/2)] lg:w-[calc((100%-2.5rem)/3)]"
          >
            <div className="relative aspect-[3/4] overflow-hidden border border-brass/15 bg-ink-elevated transition-colors duration-300 hover:border-brass/50">
              <Image
                src={src}
                alt={caption}
                fill
                loading="lazy"
                quality={65}
                sizes="(max-width: 640px) 78vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover object-top transition-transform duration-500 hover:scale-[1.03]"
              />
            </div>
            <figcaption className="mt-3 text-xs font-medium uppercase tracking-[0.15em] leading-relaxed text-muted">
              {caption}
            </figcaption>
          </figure>
        ))}
      </div>

      <div className="mt-7 flex items-center gap-3">
        <button
          type="button"
          onClick={() => scrollByPage(-1)}
          disabled={!canPrev}
          aria-label="Fotos anteriores"
          className={cn(
            "flex h-11 w-11 items-center justify-center border border-brass/30 text-brass transition-colors duration-300",
            canPrev
              ? "hover:border-brass hover:bg-brass/10"
              : "cursor-default opacity-30"
          )}
        >
          <ChevronLeft className="h-5 w-5" strokeWidth={1.5} aria-hidden="true" />
        </button>
        <button
          type="button"
          onClick={() => scrollByPage(1)}
          disabled={!canNext}
          aria-label="Próximas fotos"
          className={cn(
            "flex h-11 w-11 items-center justify-center border border-brass/30 text-brass transition-colors duration-300",
            canNext
              ? "hover:border-brass hover:bg-brass/10"
              : "cursor-default opacity-30"
          )}
        >
          <ChevronRight className="h-5 w-5" strokeWidth={1.5} aria-hidden="true" />
        </button>
        <span className="ml-1 hidden text-xs font-medium uppercase tracking-[0.15em] text-muted sm:inline">
          Arraste para ver mais
        </span>
      </div>
    </div>
  );
}
