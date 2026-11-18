import Image from "next/image";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import { LpWhatsAppLink } from "@/components/lp/LpWhatsAppLink";
import { CONTAINER, Stars } from "@/components/lp/ui";

export function LpHero() {
  return (
    <section id="inicio" className="relative isolate overflow-hidden bg-ink">
      {/* Retrato: faixa no topo no celular; metade direita, de ponta a ponta, no desktop */}
      <div className="lp-hero-photo relative lg:absolute lg:inset-y-0 lg:right-0 lg:w-[44%] xl:w-[47%]">
        <Image
          src="/images/lp/dr-rodrigo-faustino-escritorio-azul.webp"
          alt="Dr. Rodrigo Faustino, advogado criminalista em Goiânia"
          fill
          priority
          fetchPriority="high"
          quality={70}
          sizes="(min-width: 1280px) 47vw, (min-width: 1024px) 44vw, 100vw"
          className="object-cover object-[50%_12%] sm:object-[50%_8%] lg:object-[50%_28%]"
        />
        <p className="lp-caption absolute bottom-8 right-8 z-10 hidden text-paper/75 lg:block">
          Dr. Rodrigo Faustino
        </p>
      </div>

      <div className={`${CONTAINER} relative`}>
        <div className="-mt-24 pb-14 sm:-mt-32 lg:mt-0 lg:flex lg:min-h-[min(calc(100svh-3.5rem),56rem)] lg:max-w-[30rem] lg:flex-col lg:justify-center lg:py-20 xl:max-w-[38.5rem]">
          <p className="lp-serif text-[15px] italic text-brass sm:text-base">
            DEFESA CRIMINAL • ATENDIMENTO 24 HORAS
          </p>

          <h1 className="lp-serif mt-3 text-[clamp(1.85rem,8.1vw,4.75rem)] font-medium leading-[1.04] tracking-[-0.03em] text-paper lg:text-[4.1rem] xl:text-[4.75rem]">
            Advogado Criminalista <span className="whitespace-nowrap">em Goiânia</span>
            <em className="mt-3 block text-[0.62em] font-normal leading-[1.1] tracking-[-0.012em] text-brass">
              Defesa imediata, 24 horas
            </em>
          </h1>

          <p className="mt-6 max-w-[34rem] text-base leading-relaxed text-muted sm:text-lg">
            Foi intimado ou acusado de crime? Ou teve um familiar preso agora?
            Atuação imediata na defesa criminal em Goiânia e região.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            <LpWhatsAppLink section="hero" className="lp-btn lp-btn-wa w-full sm:w-auto">
              <WhatsAppIcon className="h-5 w-5 shrink-0" />
              Falar agora com o advogado de defesa
            </LpWhatsAppLink>
          </div>
          <p className="mt-4 text-sm text-muted">
            Atendimento particular, direto com o advogado. Sigilo absoluto.
          </p>

          <dl className="mt-10 grid max-w-[34rem] grid-cols-3 border-t border-brass/15 pt-6">
            <div className="pr-3">
              <dt className="sr-only">Avaliação no Google</dt>
              <dd className="lp-serif text-[1.9rem] leading-none text-paper sm:text-[2.15rem]">5,0</dd>
              <dd className="mt-2 flex flex-col gap-1 text-xs leading-snug text-muted">
                <Stars className="text-brass" />
                no Google
              </dd>
            </div>
            <div className="border-l border-brass/15 px-3 sm:px-5">
              <dt className="sr-only">Defesas conduzidas</dt>
              <dd className="lp-serif text-[1.9rem] leading-none text-paper sm:text-[2.15rem]">950+</dd>
              <dd className="mt-2 text-xs leading-snug text-muted">defesas criminais</dd>
            </div>
            <div className="border-l border-brass/15 pl-3 sm:pl-5">
              <dt className="sr-only">Plantão</dt>
              <dd className="lp-serif text-[1.9rem] leading-none text-paper sm:text-[2.15rem]">24h</dd>
              <dd className="mt-2 text-xs leading-snug text-muted">plantão, todos os dias</dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  );
}
