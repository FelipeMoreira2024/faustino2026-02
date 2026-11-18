import Image from "next/image";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import { Reveal } from "@/components/Reveal";
import { LpWhatsAppLink } from "@/components/lp/LpWhatsAppLink";
import { CONTAINER } from "@/components/lp/ui";

const assurances = [
  "Disponível 24h",
  "Atendimento direto com o advogado",
  "Sigilo absoluto",
  "Atendimento particular",
];

export function LpFinalCta() {
  return (
    <section id="contato" className="relative overflow-hidden border-t border-brass/15 bg-ink-elevated">
      <div className="absolute inset-y-0 right-0 hidden w-[40%] lg:block">
        <div className="lp-photo relative h-full w-full">
          <Image
            src="/images/lp/dr-rodrigo-faustino-escritorio-azul.webp"
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
              src="/images/lp/dr-rodrigo-faustino-escritorio-azul-avatar.webp"
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
            Precisa de defesa criminal agora?
          </h2>
          <p className="mt-6 max-w-xl text-[1.0625rem] leading-relaxed text-muted">
            Na defesa criminal, <strong className="font-semibold text-paper">cada hora conta</strong>.
            Fale diretamente com o advogado e entenda o próximo passo do seu caso.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            <LpWhatsAppLink section="cta-final" className="lp-btn lp-btn-wa w-full sm:w-auto">
              <WhatsAppIcon className="h-5 w-5 shrink-0" />
              Atendimento imediato no WhatsApp
            </LpWhatsAppLink>
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
