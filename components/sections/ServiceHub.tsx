import Link from "next/link";
import { ArrowRight, FileSearch, LockKeyhole, MapPinned, Siren } from "lucide-react";
import { landingPages, landingPath } from "@/lib/landing-pages";
import { Eyebrow } from "@/components/Eyebrow";
import { absoluteUrl } from "@/lib/site";

const iconByKind = {
  urgent: Siren,
  investigation: FileSearch,
  local: MapPinned,
  sensitive: LockKeyhole,
};

export function ServiceHub() {
  return (
    <section className="section-paper cv-auto bg-paper text-ink" id="guias-de-defesa">
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 lg:px-20 lg:py-32">
        <Eyebrow tone="paper">ORIENTAÇÃO POR SITUAÇÃO</Eyebrow>
        <div className="mt-4 grid gap-6 lg:grid-cols-[1fr_0.7fr] lg:items-end">
          <h2 className="font-display text-3xl font-semibold tracking-[-0.01em] sm:text-4xl">
            Encontre a orientação adequada ao momento do caso
          </h2>
          <p className="leading-relaxed text-ink-soft">
            Cada guia explica uma etapa específica da defesa, os documentos úteis e os limites do que pode ser avaliado antes do acesso aos autos.
          </p>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {landingPages.map((page) => {
            const Icon = iconByKind[page.kind];
            return (
              <Link
                key={page.slug}
                href={absoluteUrl(landingPath(page.slug))}
                className="group flex min-h-64 flex-col border border-ink/15 bg-white/25 p-6 transition-[border-color,transform] duration-300 hover:-translate-y-1 hover:border-brass-deep/60"
              >
                <Icon className="h-5 w-5 text-brass-deep" strokeWidth={1.5} aria-hidden="true" />
                <p className="mt-5 text-[11px] font-semibold uppercase tracking-[0.13em] text-brass-deep">
                  {page.city} · {page.topic}
                </p>
                <h3 className="mt-2 font-display text-xl font-semibold leading-snug">{page.h1}</h3>
                <p className="mt-4 line-clamp-3 text-sm leading-relaxed text-ink-soft">{page.quickAnswer}</p>
                <span className="mt-auto inline-flex items-center gap-2 pt-5 text-sm font-semibold">
                  Ver orientação
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
