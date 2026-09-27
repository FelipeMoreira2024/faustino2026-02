import Image from "next/image";
import { Phone } from "lucide-react";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import { Reveal } from "@/components/Reveal";
import { LpPhoneLink } from "@/components/lp/LpPhoneLink";
import { LpWhatsAppLink } from "@/components/lp/LpWhatsAppLink";
import { CONTAINER } from "@/components/lp/ui";
import { PHONE_DISPLAY } from "@/lib/site";

const assurances = [
  "Plantão 24 horas",
  "Direto com o advogado",
  "Sigilo profissional",
  "Atendimento particular",
];

export function LpFinalCta() {
  return (
    <section id="contato" className="relative overflow-hidden border-t border-brass/15 bg-ink-elevated">
      <div className="absolute inset-y-0 right-0 hidden w-[40%] lg:block">
        <div className="lp-photo relative h-full w-full">
          <Image
            src="/images/lp/dr-rodrigo-faustino-biblioteca.webp"
            alt=""
            fill
            quality={65}
            sizes="40vw"
            className="object-cover object-[50%_20%]"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[linear-gradient(90deg,var(--ink-elevated)_0%,rgb(26_24_21/0.5)_28%,rgb(26_24_21/0)_60%)]"
          />
        </div>
      </div>

      <div className={`${CONTAINER} relative`}>
        <Reveal className="py-20 lg:max-w-[42rem] lg:py-32">
          <div className="flex items-center gap-4">
            <Image
              src="/images/lp/dr-rodrigo-faustino-biblioteca-avatar.webp"
              alt=""
              width={192}
              height={192}
              sizes="56px"
              quality={75}
              className="h-14 w-14 rounded-full border border-brass/40 object-cover lg:hidden"
            />
            <p className="lp-serif text-base italic text-brass">Se é urgente</p>
          </div>
          <h2 className="lp-serif mt-4 text-[2.5rem] font-medium leading-[1.04] tracking-[-0.025em] text-paper sm:text-[3.6rem]">
            Fale agora com o Dr.&nbsp;Rodrigo Faustino.
          </h2>
          <p className="mt-6 max-w-xl text-[1.0625rem] leading-relaxed text-muted">
            Conte o que aconteceu em poucas linhas. Nas primeiras horas, cada providência pesa: a
            orientação sobre o depoimento, o pedido de liberdade, a audiência de custódia.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            <LpWhatsAppLink section="cta-final" className="lp-btn lp-btn-wa w-full sm:w-auto">
              <WhatsAppIcon className="h-5 w-5 shrink-0" />
              <span className="sm:hidden">Falar com o Dr.&nbsp;Rodrigo agora</span>
              <span className="hidden sm:inline">Falar com o Dr.&nbsp;Rodrigo no WhatsApp</span>
            </LpWhatsAppLink>
            <LpPhoneLink
              section="cta-final"
              ariaLabel={`Ligar para ${PHONE_DISPLAY}`}
              className="lp-btn lp-btn-line w-full sm:w-auto"
            >
              <Phone className="h-4 w-4 shrink-0 text-brass" strokeWidth={1.6} aria-hidden="true" />
              {PHONE_DISPLAY}
            </LpPhoneLink>
          </div>

          <ul className="mt-10 grid grid-cols-2 gap-x-5 gap-y-3 border-t border-brass/15 pt-6 text-sm text-muted sm:flex sm:flex-wrap">
            {assurances.map((item) => (
              <li key={item} className="flex items-center gap-2.5">
                <span aria-hidden="true" className="h-1 w-1 rotate-45 bg-brass" />
                {item}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
