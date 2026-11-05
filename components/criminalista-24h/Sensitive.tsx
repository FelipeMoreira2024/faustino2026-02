import Image from "next/image";
import { Check } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import { C24WhatsAppLink } from "@/components/criminalista-24h/WhatsAppLink";
import { BTN_WA, CONTAINER, EYEBROW, H2 } from "@/components/criminalista-24h/ui";
import { sensitivePoints } from "@/lib/criminalista-24h";

export function C24Sensitive() {
  return (
    <section id="defesa-sigilosa" className="cv-auto relative overflow-hidden bg-ink-elevated">
      <div className={`${CONTAINER} py-16 lg:py-28`}>
        <div className="grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-16">
          <Reveal className="lg:col-span-7">
            <p className={`${EYEBROW} text-brass`}>Defesa com sigilo absoluto</p>
            <h2 className={`${H2} mt-3 text-paper`}>
              Acusado de um crime sexual? Aja antes de falar.
            </h2>
            <p className="mt-6 max-w-2xl leading-relaxed text-muted">
              Acusações de crimes contra a dignidade sexual exigem defesa técnica, responsável e
              absolutamente sigilosa{" "}
              <strong className="font-semibold text-paper">desde o primeiro contato</strong> — muitas
              vezes, o que é dito antes da orientação jurídica define o rumo do caso.
            </p>
            <ul className="mt-8 space-y-3.5">
              {sensitivePoints.map((item) => (
                <li key={item} className="flex items-start gap-3 leading-snug text-paper">
                  <Check
                    className="mt-0.5 h-4 w-4 shrink-0 text-brass"
                    strokeWidth={2.2}
                    aria-hidden="true"
                  />
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-9">
              <C24WhatsAppLink section="defesa-sigilosa" topic="c24_situacao_5" className={BTN_WA}>
                <WhatsAppIcon className="h-5 w-5 shrink-0" />
                Falar em sigilo agora
              </C24WhatsAppLink>
            </div>
          </Reveal>

          <Reveal delay={100} className="hidden lg:col-span-5 lg:block">
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-ink">
              <Image
                src="/images/criminalista-24h/dr-rodrigo-estudo.webp"
                alt="Dr. Rodrigo Faustino lendo em um tablet, em frente a livros de Direito Criminal"
                fill
                quality={70}
                sizes="26rem"
                className="object-cover object-[center_30%]"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
