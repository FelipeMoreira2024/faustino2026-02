import Link from "next/link";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { SiteFooter } from "@/components/SiteFooter";
import { Topbar } from "@/components/sections/Topbar";
import { HOME_URL } from "@/lib/site";

type TrustPageShellProps = {
  eyebrow: string;
  title: string;
  intro: string;
  children: React.ReactNode;
};

export function TrustPageShell({ eyebrow, title, intro, children }: TrustPageShellProps) {
  return (
    <>
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[110] focus:bg-paper focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-ink"
      >
        Pular para o conteúdo
      </a>
      <Topbar />
      <main id="conteudo">
        <section className="bg-ink">
          <div className="mx-auto max-w-5xl px-5 pb-16 pt-8 sm:px-8 lg:px-20 lg:pb-24">
            <nav aria-label="Breadcrumb" className="text-xs text-muted">
              <Link className="link-underline" href={HOME_URL}>Início</Link>
              <span className="mx-2" aria-hidden="true">/</span>
              <span className="text-paper" aria-current="page">{title}</span>
            </nav>
            <p className="mt-12 text-xs font-semibold uppercase tracking-[0.16em] text-brass">{eyebrow}</p>
            <h1 className="mt-4 max-w-4xl font-display text-[clamp(2.4rem,6vw,4.5rem)] font-semibold leading-[1.06] tracking-[-0.02em] text-paper">{title}</h1>
            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-muted">{intro}</p>
          </div>
        </section>
        <div className="section-paper bg-paper text-ink">
          <div className="mx-auto max-w-5xl px-5 py-16 sm:px-8 lg:px-20 lg:py-24">
            {children}
          </div>
        </div>
      </main>
      <SiteFooter />
      <FloatingWhatsApp ariaLabel="Falar com o advogado no WhatsApp" />
    </>
  );
}
