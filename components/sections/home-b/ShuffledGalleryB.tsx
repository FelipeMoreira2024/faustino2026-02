"use client";

import { useEffect, useState } from "react";
import { HonorsCarousel, type HonorsSlide } from "@/components/HonorsCarousel";
import { shuffle } from "@/lib/shuffle";

export function ShuffledGalleryB({ slides }: { slides: HonorsSlide[] }) {
  const [orderedSlides, setOrderedSlides] = useState(slides);

  useEffect(() => {
    setOrderedSlides(shuffle(slides));
  }, [slides]);

  return <HonorsCarousel slides={orderedSlides} />;
}
