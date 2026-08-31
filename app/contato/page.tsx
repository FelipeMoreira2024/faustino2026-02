import type { Metadata } from "next";
import { Clock, MapPin, Phone } from "lucide-react";
import { TrustPageShell } from "@/components/TrustPageShell";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { WA_STANDARD } from "@/lib/whatsapp";
import {
  absoluteUrl,
  MAPS_EMBED,
  MAPS_LINK,
  OFFICE_ADDRESS_DISPLAY,
  PHONE_DISPLAY,
  PHONE_TEL,
} from "@/lib/site";

export const metadata: Metadata = {
  title: "Contato | Faustino Advocacia",
  description:
    "Contato do Dr. Rodrigo Faustino, advogado criminalista em Goiânia. Telefone, WhatsApp, endereço e orientação para o primeiro atendimento.",
  alternates: { canonical: "/contato" },
  openGraph: {
    title: "Contato | Faustino Advocacia",
    description: "Telefone, WhatsApp e endereço oficial do escritório em Goiânia.",
    url: absoluteUrl("/contato"),
    images: [absoluteUrl("/images/og-image.jpg")],
  },
};

export default function ContactPage() {
  return (
    <TrustPageShell
      eyebrow="CANAIS OFICIAIS"
      title="Contato com a defesa criminal"
      intro="Informe a cidade, a fase do caso e a data do próximo ato. Em urgências, inclua o nome da pessoa presa e o local informado."
    >
      <div className="grid gap-10 lg:grid-cols-2">
        <div>
          <h2 className="font-display text-3xl font-semibold">Escritório em Goiânia</h2>
          <ul className="mt-7 space-y-5 text-ink-soft">
            <li className="flex gap-3"><MapPin className="mt-1 h-4 w-4 shrink-0 text-brass-deep" aria-hidden="true" /><span>{OFFICE_ADDRESS_DISPLAY}</span></li>
            <li className="flex gap-3"><Phone className="mt-1 h-4 w-4 shrink-0 text-brass-deep" aria-hidden="true" /><a className="font-semibold text-ink underline-offset-4 hover:underline" href={PHONE_TEL}>{PHONE_DISPLAY}</a></li>
            <li className="flex gap-3"><Clock className="mt-1 h-4 w-4 shrink-0 text-brass-deep" aria-hidden="true" /><span>Triagem de situações criminais urgentes, conforme disponibilidade confirmada no contato</span></li>
          </ul>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <WhatsAppButton section="contato" href={WA_STANDARD}>Falar no WhatsApp</WhatsAppButton>
            <a className="inline-flex min-h-[52px] items-center justify-center rounded-md border border-ink/25 px-6 font-semibold hover:bg-ink/5" href={MAPS_LINK} target="_blank" rel="noopener noreferrer">Ver no Google Maps</a>
          </div>
          <div className="mt-10 border-l-2 border-brass-deep/50 pl-5 text-sm leading-relaxed text-ink-soft">
            <p>O escritório não anuncia sede física em Anápolis ou Aparecida de Goiânia. O atendimento nessas cidades depende de confirmação de disponibilidade, logística e natureza do ato.</p>
          </div>
        </div>
        <div className="h-96 overflow-hidden border border-ink/15">
          <iframe src={MAPS_EMBED} title="Mapa do escritório no Setor Marista, Goiânia" loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="h-full w-full border-0 grayscale" allowFullScreen />
        </div>
      </div>
    </TrustPageShell>
  );
}
