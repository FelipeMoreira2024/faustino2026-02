import Image from "next/image";
import { Briefcase, Clock, Lock, User } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import { PlantaoStatus } from "@/components/criminalista-24h/PlantaoStatus";
import { C24WhatsAppLink } from "@/components/criminalista-24h/WhatsAppLink";
import { AVATAR_SRC, BTN_WA, CONTAINER, FINAL_CTA_ID } from "@/components/criminalista-24h/ui";

const assurances = [
  { icon: Clock, label: "Disponível 24h" },
  { icon: User, label: "Direto com o advogado" },
  { icon: Lock, label: "Sigilo absoluto" },
  { icon: Briefcase, label: "Atendimento particular" },
];

export function C24FinalCta() {
  return (
    <section id={FINAL_CTA_ID} className="relative overflow-hidden border-t border-brass/15 bg-ink">
      <div className="absolute inset-y-0 right-0 hidden w-[42%] lg:block">
        <div className="relative h-full w-full">
          <Image
            src="/images/criminalista-24h/dr-rodrigo-analise.webp"
            alt=""
            fill
            quality={65}
            sizes="42vw"
            className="object-cover object-[center_35%]"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[linear-gradient(90deg,var(--ink)_0%,rgba(16,20,24,0.55)_38%,rgba(16,20,24,0.1)_100%)]"
          />
        </div>
      </div>

      <div className={`${CONTAINER} relative`}>
        <Reveal className="py-20 lg:max-w-[38rem] lg:py-32">
          <div className="flex items-center gap-3">
            <Image
              src={AVATAR_SRC}
              alt=""
              width={56}
              height={56}
              className="h-14 w-14 rounded-full border border-brass/50 object-cover"
            />
            <p className="font-display text-lg italic text-brass">Se é urgente, não espere.</p>
          </div>

          <h2 className="mt-5 font-display text-[2.4rem] font-semibold leading-[1.05] tracking-[-0.02em] text-paper sm:text-[3.3rem]">
            Precisa de defesa criminal agora?
          </h2>
          <p className="mt-5 max-w-xl text-[17px] leading-relaxed text-muted">
            Na defesa criminal,{" "}
            <strong className="font-semibold text-paper">cada hora conta</strong>. Fale diretamente
            com o advogado e entenda o próximo passo do seu caso.
          </p>

          <div className="mt-8">
            <PlantaoStatus className="mb-3" />
            <C24WhatsAppLink section="cta-final" className={BTN_WA}>
              <WhatsAppIcon className="h-5 w-5 shrink-0" />
              Falar com o advogado agora
            </C24WhatsAppLink>
          </div>

          <ul className="mt-10 grid grid-cols-2 gap-x-5 gap-y-3 border-t border-brass/15 pt-6 text-sm text-muted sm:max-w-[28rem] sm:gap-x-8">
            {assurances.map(({ icon: Icon, label }) => (
              <li key={label} className="inline-flex items-center gap-2">
                <Icon className="h-4 w-4 shrink-0 text-brass" strokeWidth={1.6} aria-hidden="true" />
                {label}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
