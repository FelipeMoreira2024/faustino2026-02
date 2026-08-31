import type { Metadata } from "next";
import Image from "next/image";
import { Check, Scale } from "lucide-react";
import { JsonLd } from "@/components/JsonLd";
import { TrustPageShell } from "@/components/TrustPageShell";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { WA_STANDARD } from "@/lib/whatsapp";
import {
  absoluteUrl,
  ATTORNEY_NAME,
  ATTORNEY_OAB,
  personJsonLd,
} from "@/lib/site";

export const metadata: Metadata = {
  title: "Dr. Rodrigo Faustino | Advogado Criminalista em Goiás",
  description:
    "Conheça a atuação profissional do Dr. Rodrigo Faustino, advogado criminalista inscrito na OAB/GO 64.028, com sede em Goiânia.",
  alternates: { canonical: "/sobre-rodrigo-faustino" },
  openGraph: {
    title: "Dr. Rodrigo Faustino | Advogado Criminalista em Goiás",
    description: "Formação, atuação profissional e informações verificáveis do advogado responsável pelo conteúdo.",
    url: absoluteUrl("/sobre-rodrigo-faustino"),
    images: [absoluteUrl("/images/og-image.jpg")],
  },
};

export default function AboutPage() {
  return (
    <>
      <JsonLd data={personJsonLd} />
      <TrustPageShell
        eyebrow="RESPONSÁVEL PELO CONTEÚDO"
        title={ATTORNEY_NAME}
        intro="Advogado criminalista com atuação em prisões, investigações e processos criminais, responsável pela revisão jurídica das páginas deste site."
      >
        <div className="grid gap-12 lg:grid-cols-[0.65fr_1.35fr] lg:items-start">
          <div className="tone-warm relative aspect-[4/5] w-full max-w-sm overflow-hidden">
            <Image src="/images/dr-rodrigo-hero.webp" alt={ATTORNEY_NAME} fill priority sizes="24rem" className="object-cover object-[center_22%]" />
          </div>
          <div>
            <Scale className="h-6 w-6 text-brass-deep" aria-hidden="true" />
            <h2 className="mt-5 font-display text-3xl font-semibold">Atuação em defesa criminal</h2>
            <p className="mt-3 font-semibold text-brass-deep">{ATTORNEY_OAB}</p>
            <div className="mt-6 space-y-4 leading-relaxed text-ink-soft">
              <p>
                Rodrigo Faustino atua na defesa de pessoas presas, investigadas ou acusadas, desde a fase policial até processos e recursos. O atendimento é particular e realizado com orientação direta sobre a fase, os riscos e os próximos passos possíveis.
              </p>
              <p>
                É inscrito na Ordem dos Advogados do Brasil, Seção Goiás, sob o número 64.028. As informações profissionais publicadas no site devem permanecer objetivas e passíveis de comprovação.
              </p>
              <p>
                Conteúdos jurídicos são revisados antes da publicação e utilizam legislação e atos oficiais como referência. As informações são gerais e não substituem a análise individual de documentos e decisões.
              </p>
            </div>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {[
                "Atendimento direto com o advogado",
                "Atuação na fase policial e judicial",
                "Plantão para situações urgentes",
                "Sigilo e responsabilidade profissional",
              ].map((item) => (
                <li key={item} className="flex gap-3 text-sm">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-brass-deep" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-9">
              <WhatsAppButton section="sobre" href={WA_STANDARD}>Falar com o advogado</WhatsAppButton>
            </div>
          </div>
        </div>
      </TrustPageShell>
    </>
  );
}
