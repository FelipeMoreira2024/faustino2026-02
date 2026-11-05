import Image from "next/image";
import { Star } from "lucide-react";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import { PlantaoStatus } from "@/components/criminalista-24h/PlantaoStatus";
import { C24WhatsAppLink } from "@/components/criminalista-24h/WhatsAppLink";
import { AVATAR_SRC, BTN_WA, CONTAINER, HERO_CTA_ID } from "@/components/criminalista-24h/ui";
import { GOOGLE_RATING, GOOGLE_REVIEWS_COUNT } from "@/lib/criminalista-24h";

/**
 * Mesmo título da home (casa com a busca e já provou que converte). O que muda:
 * o rosto e o nome do advogado aparecem antes do título, sem empurrar o botão;
 * o botão sobe e cabe em uma linha; a prova social fica completa e legível.
 */
export function C24Hero() {
  return (
    <section id="inicio" className="relative overflow-hidden bg-ink">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 top-0 hidden h-[44rem] w-[44rem] rounded-full bg-[radial-gradient(closest-side,rgba(201,169,97,0.13),transparent)] lg:block"
      />

      <div
        className={`${CONTAINER} relative grid gap-9 pb-12 pt-5 sm:pt-9 lg:grid-cols-[1.12fr_0.88fr] lg:items-center lg:gap-14 lg:pb-20 lg:pt-12`}
      >
        <div>
          <div className="flex items-center gap-3">
            <span className="relative shrink-0">
              <Image
                src={AVATAR_SRC}
                alt=""
                width={48}
                height={48}
                priority
                className="h-12 w-12 rounded-full border border-brass/50 object-cover"
              />
              <span
                aria-hidden="true"
                className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-ink bg-whatsapp"
              />
            </span>
            <p className="leading-tight">
              <span className="block text-[15px] font-semibold text-paper">Dr. Rodrigo Faustino</span>
              <span className="mt-0.5 block text-[13px] text-muted">
                Advogado criminalista · OAB/GO 64.028
              </span>
            </p>
          </div>

          <h1 className="mt-5 font-display text-[clamp(2.15rem,8.9vw,4.2rem)] font-semibold leading-[1.03] tracking-[-0.022em] text-paper">
            Advogado Criminalista em Goiânia
            <span className="mt-2 block text-[0.74em] italic leading-[1.1] tracking-[-0.012em] text-brass lg:text-[0.7em]">
              Defesa imediata, 24 horas
            </span>
          </h1>

          <p className="mt-4 max-w-[34rem] text-[17px] leading-relaxed text-muted sm:text-lg">
            Familiar preso, intimação ou investigação? Fale agora{" "}
            <strong className="font-semibold text-paper">direto com o advogado</strong> e saiba
            o próximo passo.
          </p>

          <div id={HERO_CTA_ID} className="mt-5">
            <PlantaoStatus className="mb-3" />
            <C24WhatsAppLink section="hero" className={BTN_WA}>
              <WhatsAppIcon className="h-5 w-5 shrink-0" />
              Falar com o advogado agora
            </C24WhatsAppLink>
            <p className="mt-3 text-sm text-muted">
              Atendimento particular, direto com o advogado. Sigilo absoluto.
            </p>
          </div>

          <ul className="mt-8 grid max-w-[34rem] grid-cols-3 divide-x divide-brass/15 border-y border-brass/15 py-4 text-center sm:text-left">
            <li className="px-2 first:pl-0 sm:px-5">
              <span className="flex items-center justify-center gap-1 font-display text-[1.6rem] font-semibold leading-none text-paper sm:justify-start">
                {GOOGLE_RATING}
                <Star className="h-4 w-4 fill-brass text-brass" strokeWidth={1} aria-hidden="true" />
              </span>
              <span className="mt-1.5 block text-[12px] leading-snug text-muted sm:text-[13px]">
                {GOOGLE_REVIEWS_COUNT} avaliações no Google
              </span>
            </li>
            <li className="px-2 sm:px-5">
              <span className="block font-display text-[1.6rem] font-semibold leading-none text-paper">
                +950
              </span>
              <span className="mt-1.5 block text-[12px] leading-snug text-muted sm:text-[13px]">
                casos de defesa criminal
              </span>
            </li>
            <li className="px-2 last:pr-0 sm:px-5">
              <span className="block font-display text-[1.6rem] font-semibold leading-none text-paper">
                24h
              </span>
              <span className="mt-1.5 block text-[12px] leading-snug text-muted sm:text-[13px]">
                plantão, todos os dias
              </span>
            </li>
          </ul>
        </div>

        <figure className="relative mx-auto w-full max-w-[34rem] lg:mr-0">
          <div className="c24-shade relative aspect-[4/5] overflow-hidden rounded-2xl bg-ink-elevated">
            <Image
              src="/images/criminalista-24h/dr-rodrigo-retrato.webp"
              alt="Dr. Rodrigo Faustino, advogado criminalista em Goiânia, em seu escritório"
              fill
              priority
              fetchPriority="high"
              quality={75}
              sizes="(min-width: 1024px) 34rem, (min-width: 640px) 34rem, calc(100vw - 2.5rem)"
              className="object-cover object-[center_14%]"
            />
          </div>
          <figcaption className="absolute inset-x-3 bottom-3 rounded-xl border border-brass/25 bg-ink/85 px-4 py-3 backdrop-blur-md sm:inset-x-auto sm:-left-6 sm:bottom-8 sm:max-w-[19rem] sm:p-4">
            <span className="block text-[11px] font-semibold uppercase tracking-[0.14em] text-brass">
              ABRACRIM/GO
            </span>
            <span className="mt-1 block text-[13px] font-semibold leading-snug text-paper sm:text-sm">
              Secretário-Geral da Comissão de Direitos e Prerrogativas
            </span>
            <span className="mt-1 hidden text-xs leading-snug text-muted sm:block">
              Associação Brasileira dos Advogados Criminalistas
            </span>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
