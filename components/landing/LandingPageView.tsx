import Image from "next/image";
import Link from "next/link";
import {
  AlertTriangle,
  ArrowRight,
  Check,
  Clock,
  FileCheck2,
  LockKeyhole,
  MapPin,
  Scale,
  ShieldCheck,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { SiteFooter } from "@/components/SiteFooter";
import { Topbar } from "@/components/sections/Topbar";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import type { LandingPage } from "@/lib/landing-pages";
import {
  landingPagesBySlug,
  landingPath,
} from "@/lib/landing-pages";
import { createWhatsAppLink, PHONE_DISPLAY, PHONE_TEL } from "@/lib/whatsapp";
import {
  ATTORNEY_NAME,
  ATTORNEY_OAB,
  absoluteUrl,
  HOME_URL,
  MAPS_LINK,
  OFFICE_ADDRESS_DISPLAY,
} from "@/lib/site";

const kindLabels = {
  urgent: "ATENDIMENTO URGENTE",
  investigation: "ORIENTAÇÃO NA INVESTIGAÇÃO",
  local: "ATENDIMENTO CRIMINAL",
  sensitive: "ATENDIMENTO RESERVADO",
};

function TrackingButton({
  page,
  href,
  section,
  children,
}: {
  page: LandingPage;
  href: string;
  section: string;
  children: React.ReactNode;
}) {
  return (
    <WhatsAppButton
      href={href}
      section={section}
      city={page.city.toLowerCase()}
      topic={page.topic.toLowerCase()}
      pageSlug={page.slug}
    >
      {children}
    </WhatsAppButton>
  );
}

export function LandingPageView({ page }: { page: LandingPage }) {
  const whatsappHref = createWhatsAppLink(page.whatsappMessage);
  const relatedPages = page.relatedSlugs
    .map((slug) => landingPagesBySlug.get(slug))
    .filter((item): item is LandingPage => Boolean(item));
  const isGoiânia = page.city === "Goiânia";

  return (
    <>
      <Topbar
        href={whatsappHref}
        label={page.kind === "sensitive" ? "ATENDIMENTO CRIMINAL" : "ATENDIMENTO URGENTE"}
        city={page.city.toLowerCase()}
        topic={page.topic.toLowerCase()}
        pageSlug={page.slug}
      />

      <main>
        <section className="relative overflow-hidden bg-ink">
          <div aria-hidden="true" className="absolute inset-y-0 left-8 hidden w-px bg-brass/25 lg:block" />
          <div className="mx-auto max-w-6xl px-5 pb-16 pt-8 sm:px-8 lg:px-20 lg:pb-24">
            <nav aria-label="Breadcrumb" className="text-xs text-muted">
              <ol className="flex flex-wrap items-center gap-2">
                <li><Link className="link-underline" href={HOME_URL}>Início</Link></li>
                <li aria-hidden="true">/</li>
                <li>Defesa criminal</li>
                <li aria-hidden="true">/</li>
                <li aria-current="page" className="text-paper">{page.topic} em {page.city}</li>
              </ol>
            </nav>

            <div className="mt-8 grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:gap-16">
              <div>
                <span className="inline-flex rounded-full border border-brass/40 px-3.5 py-1.5 text-[11px] font-medium uppercase tracking-[0.14em] text-brass">
                  {page.badge}
                </span>
                <h1 className="mt-6 font-display text-[clamp(2.35rem,6vw,4.2rem)] font-semibold leading-[1.05] tracking-[-0.02em] text-paper">
                  {page.h1}
                  <span className="mt-2 block italic text-brass">{page.accent}</span>
                </h1>
                <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
                  {page.lead}
                </p>
                <div className="mt-8">
                  <TrackingButton page={page} href={whatsappHref} section="hero">
                    {page.kind === "sensitive" ? "Solicitar contato reservado" : "Solicitar atendimento jurídico"}
                  </TrackingButton>
                  <p className="mt-3 text-sm text-muted">
                    Atendimento particular, direto com o advogado e protegido pelo sigilo profissional.
                  </p>
                </div>
                <ul className="mt-8 flex flex-wrap gap-2.5">
                  <li className="inline-flex items-center gap-2 rounded-full border border-brass/30 px-3.5 py-2 text-[13px] text-paper">
                    <Scale className="h-3.5 w-3.5 text-brass" aria-hidden="true" /> {ATTORNEY_OAB}
                  </li>
                  <li className="inline-flex items-center gap-2 rounded-full border border-brass/30 px-3.5 py-2 text-[13px] text-paper">
                    <LockKeyhole className="h-3.5 w-3.5 text-brass" aria-hidden="true" /> Sigilo profissional
                  </li>
                  <li className="inline-flex items-center gap-2 rounded-full border border-brass/30 px-3.5 py-2 text-[13px] text-paper">
                    <Clock className="h-3.5 w-3.5 text-brass" aria-hidden="true" /> Plantão para urgências
                  </li>
                </ul>
              </div>

              <div className="tone-warm relative aspect-[4/5] w-full max-w-md overflow-hidden justify-self-center lg:justify-self-end">
                <Image
                  src="/images/dr-rodrigo-hero.webp"
                  alt={`${ATTORNEY_NAME}, advogado criminalista com atendimento em ${page.city}`}
                  fill
                  priority
                  fetchPriority="high"
                  quality={70}
                  sizes="(max-width: 1024px) 28rem, 40vw"
                  className="object-cover object-[center_22%]"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="section-paper bg-paper text-ink">
          <div className="mx-auto grid max-w-6xl gap-8 px-5 py-16 sm:px-8 lg:grid-cols-[1.25fr_0.75fr] lg:px-20 lg:py-20">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brass-deep">RESPOSTA DIRETA</p>
              <h2 className="mt-3 font-display text-3xl font-semibold sm:text-4xl">O papel da defesa neste momento</h2>
              <p className="mt-5 text-lg leading-relaxed text-ink-soft">{page.quickAnswer}</p>
            </div>
            <aside className="border-l-2 border-brass-deep/50 bg-white/30 p-6" aria-label="Orientação importante">
              <AlertTriangle className="h-5 w-5 text-brass-deep" aria-hidden="true" />
              <p className="mt-3 font-semibold text-ink">Orientação importante</p>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">{page.notice}</p>
            </aside>
          </div>
        </section>

        <section className="bg-ink-elevated">
          <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 lg:px-20 lg:py-28">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brass">{kindLabels[page.kind]}</p>
            <h2 className="mt-4 max-w-3xl font-display text-3xl font-semibold text-paper sm:text-4xl">{page.situationsTitle}</h2>
            <p className="mt-5 max-w-3xl leading-relaxed text-muted">{page.situationsIntro}</p>
            <ul className="mt-10 grid gap-4 md:grid-cols-2">
              {page.situations.map((item) => (
                <li key={item} className="flex gap-3 border border-brass/15 bg-ink p-5 text-sm leading-relaxed text-paper">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-brass" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="section-paper bg-paper text-ink">
          <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 lg:px-20 lg:py-28">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brass-deep">COMO ATUAMOS</p>
            <h2 className="mt-4 font-display text-3xl font-semibold sm:text-4xl">{page.stepsTitle}</h2>
            <ol className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              {page.steps.map((step, index) => (
                <li key={step.title} className="border-t border-ink/20 pt-5">
                  <span className="font-display text-2xl italic text-brass-deep">{String(index + 1).padStart(2, "0")}</span>
                  <h3 className="mt-3 font-display text-xl font-semibold">{step.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-ink-soft">{step.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {page.sections.map((section, index) => {
          const dark = index % 2 === 0;
          return (
            <section key={section.title} className={dark ? "cv-auto bg-ink" : "section-paper cv-auto bg-paper text-ink"}>
              <div className="mx-auto grid max-w-6xl gap-10 px-5 py-20 sm:px-8 lg:grid-cols-[0.62fr_1.38fr] lg:px-20 lg:py-28">
                <div>
                  <p className={`text-xs font-semibold uppercase tracking-[0.16em] ${dark ? "text-brass" : "text-brass-deep"}`}>{section.eyebrow}</p>
                  <div className={`mt-5 h-px w-20 ${dark ? "bg-brass/40" : "bg-brass-deep/40"}`} />
                </div>
                <div>
                  <h2 className={`font-display text-3xl font-semibold sm:text-4xl ${dark ? "text-paper" : "text-ink"}`}>{section.title}</h2>
                  <div className={`mt-6 space-y-4 leading-relaxed ${dark ? "text-muted" : "text-ink-soft"}`}>
                    {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                  </div>
                  {section.bullets ? (
                    <ul className="mt-7 grid gap-3 sm:grid-cols-2">
                      {section.bullets.map((item) => (
                        <li key={item} className={`flex gap-3 text-sm ${dark ? "text-paper" : "text-ink"}`}>
                          <Check className={`mt-0.5 h-4 w-4 shrink-0 ${dark ? "text-brass" : "text-brass-deep"}`} aria-hidden="true" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              </div>
            </section>
          );
        })}

        <section className="section-paper bg-paper text-ink">
          <div className="mx-auto grid max-w-6xl gap-12 px-5 py-20 sm:px-8 lg:grid-cols-[1fr_0.8fr] lg:px-20 lg:py-28">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brass-deep">ATENDIMENTO LOCAL</p>
              <h2 className="mt-4 font-display text-3xl font-semibold sm:text-4xl">{page.localTitle}</h2>
              <div className="mt-6 space-y-4 leading-relaxed text-ink-soft">
                {page.localParagraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              </div>
              <ul className="mt-7 space-y-3">
                {page.localPoints.map((point) => (
                  <li key={point} className="flex gap-3 text-sm">
                    <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brass-deep" aria-hidden="true" />
                    {point}
                  </li>
                ))}
              </ul>
              {isGoiânia ? (
                <div className="mt-7 text-sm text-ink-soft">
                  <p>{OFFICE_ADDRESS_DISPLAY}</p>
                  <a className="mt-2 inline-block font-semibold text-ink underline-offset-4 hover:underline" href={MAPS_LINK} target="_blank" rel="noopener noreferrer">Ver no Google Maps</a>
                </div>
              ) : null}
            </div>
            <aside className="border border-ink/15 bg-white/35 p-7">
              <ShieldCheck className="h-7 w-7 text-brass-deep" aria-hidden="true" />
              <h3 className="mt-5 font-display text-2xl font-semibold">Contato com informações mínimas</h3>
              <p className="mt-4 text-sm leading-relaxed text-ink-soft">
                Envie fase do caso, cidade, data do próximo ato e número do processo ou intimação, quando disponível. Documentos sensíveis serão solicitados apenas se necessários.
              </p>
              <div className="mt-6">
                <TrackingButton page={page} href={whatsappHref} section="local">
                  Iniciar contato reservado
                </TrackingButton>
              </div>
              <a className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-ink underline-offset-4 hover:underline" href={PHONE_TEL}>
                {PHONE_DISPLAY}
              </a>
            </aside>
          </div>
        </section>

        <section className="bg-ink">
          <div className="mx-auto grid max-w-6xl gap-10 px-5 py-20 sm:px-8 lg:grid-cols-[0.55fr_1.45fr] lg:px-20 lg:py-28">
            <div className="duotone relative aspect-[4/5] w-full max-w-xs overflow-hidden">
              <Image src="/images/dr-rodrigo-hero.webp" alt={ATTORNEY_NAME} fill sizes="20rem" className="object-cover object-[center_22%]" />
            </div>
            <div className="self-center">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brass">RESPONSÁVEL PELO CONTEÚDO</p>
              <h2 className="mt-4 font-display text-3xl font-semibold text-paper sm:text-4xl">{ATTORNEY_NAME}</h2>
              <p className="mt-2 font-medium text-brass">Advogado Criminalista • {ATTORNEY_OAB}</p>
              <p className="mt-6 max-w-2xl leading-relaxed text-muted">
                Atua em defesa criminal em casos urgentes e sensíveis, com atendimento direto, orientação clara e responsabilidade profissional. Conteúdo informativo atualizado em {page.lastUpdated}; a análise jurídica depende dos documentos de cada caso.
              </p>
              <Link href={absoluteUrl("/sobre-rodrigo-faustino")} className="mt-6 inline-flex items-center gap-2 font-semibold text-paper underline-offset-4 hover:underline">
                Conhecer formação e atuação <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </section>

        <section className="section-paper bg-paper text-ink">
          <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 lg:px-20 lg:py-28">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brass-deep">PRÓXIMAS LEITURAS</p>
            <h2 className="mt-4 font-display text-3xl font-semibold sm:text-4xl">Serviços relacionados ao seu momento</h2>
            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {relatedPages.map((related) => (
                <Link key={related.slug} href={landingPath(related.slug)} className="group border border-ink/15 bg-white/25 p-6 transition-colors hover:border-brass-deep/60">
                  <FileCheck2 className="h-5 w-5 text-brass-deep" aria-hidden="true" />
                  <h3 className="mt-4 font-display text-xl font-semibold">{related.h1}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-ink-soft">{related.quickAnswer}</p>
                  <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold">Ver orientação <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" /></span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="section-paper bg-paper text-ink" id="perguntas-frequentes">
          <div className="mx-auto max-w-3xl px-5 pb-20 sm:px-8 lg:pb-28">
            <h2 className="font-display text-3xl font-semibold sm:text-4xl">Perguntas frequentes</h2>
            <Accordion type="single" collapsible defaultValue="faq-0" className="mt-10">
              {page.faqs.map((faq, index) => (
                <AccordionItem key={faq.question} value={`faq-${index}`} className="border-ink/15">
                  <AccordionTrigger className="font-display text-lg font-semibold text-ink hover:text-brass-deep [&>svg]:text-brass-deep">{faq.question}</AccordionTrigger>
                  <AccordionContent className="leading-relaxed text-ink-soft">{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        <section className="border-t border-brass/15 bg-ink">
          <div className="mx-auto max-w-3xl px-5 py-20 text-center sm:px-8 lg:py-28">
            <h2 className="font-display text-3xl font-semibold text-paper sm:text-5xl">Precisa avaliar o seu caso?</h2>
            <p className="mx-auto mt-5 max-w-xl leading-relaxed text-muted">
              Fale diretamente com o advogado, informe apenas o essencial e entenda qual é o próximo passo possível.
            </p>
            <div className="mt-9 flex justify-center">
              <TrackingButton page={page} href={whatsappHref} section="cta-final">
                Falar com o advogado no WhatsApp
              </TrackingButton>
            </div>
            <p className="mt-4 text-xs text-muted">Atendimento particular. Nenhum contato representa promessa de resultado.</p>
          </div>
        </section>

        <section className="bg-ink-elevated" aria-label="Fontes jurídicas">
          <div className="mx-auto max-w-6xl px-5 py-8 sm:px-8 lg:px-20">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brass">Fontes públicas consultadas</p>
            <ul className="mt-3 flex flex-wrap gap-x-6 gap-y-2 text-xs text-muted">
              {page.sources.map((source) => (
                <li key={source.href}><a className="link-underline hover:text-paper" href={source.href} target="_blank" rel="noopener noreferrer">{source.label}</a></li>
              ))}
            </ul>
          </div>
        </section>
      </main>

      <SiteFooter />
      <FloatingWhatsApp href={whatsappHref} city={page.city.toLowerCase()} topic={page.topic.toLowerCase()} pageSlug={page.slug} />
    </>
  );
}
