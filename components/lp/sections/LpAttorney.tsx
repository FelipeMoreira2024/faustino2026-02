import Image from "next/image";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import { Reveal } from "@/components/Reveal";
import { LpWhatsAppLink } from "@/components/lp/LpWhatsAppLink";
import { CONTAINER, SectionLabel } from "@/components/lp/ui";
import { honors } from "@/lib/lp-defesa-criminal";

const credentials = [
  "Atendimento direto com o advogado, sem intermediários no primeiro contato",
  "Atuação em todas as fases: delegacia, inquérito, processo e recursos",
  "Plantão 24 horas para prisões e casos urgentes",
];

export function LpAttorney() {
  return (
    <section id="advogado" className="cv-auto relative bg-ink">
      <div className={`${CONTAINER} py-16 lg:py-28`}>
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-5">
            <figure>
              <div className="lp-photo relative aspect-[4/5] w-full max-w-md overflow-hidden bg-ink-elevated lg:max-w-none">
                <Image
                  src="/images/lp/dr-rodrigo-faustino-biblioteca.webp"
                  alt="Dr. Rodrigo Faustino de braços cruzados, em frente à biblioteca jurídica"
                  fill
                  quality={70}
                  sizes="(min-width: 1024px) 40vw, (min-width: 640px) 28rem, 100vw"
                  className="object-cover object-[50%_20%]"
                />
              </div>
              <figcaption className="lp-caption mt-3">Dr. Rodrigo Faustino, advogado criminalista.</figcaption>
            </figure>
          </Reveal>

          <Reveal delay={80} className="lg:col-span-7 lg:pt-4">
            <SectionLabel numeral="III">O advogado</SectionLabel>
            <h2 className="lp-serif mt-5 text-[2.3rem] font-medium leading-[1.05] tracking-[-0.025em] text-paper sm:text-[3.1rem]">
              Dr.&nbsp;Rodrigo Faustino
            </h2>
            <p className="mt-3 text-[15px] font-medium tracking-[0.02em] text-brass">
              Advogado criminalista · OAB/GO 64.028
            </p>

            <p className="mt-7 text-[1.0625rem] leading-relaxed text-paper">
              Secretário-geral da Comissão de Direitos e Prerrogativas da ABRACRIM/GO, a Associação
              Brasileira dos Advogados Criminalistas. São mais de{" "}
              <strong className="font-semibold">950 casos de defesa criminal</strong> conduzidos em
              Goiânia e em todo o Estado de Goiás.
            </p>
            <p className="mt-4 leading-relaxed text-muted">
              Atua em casos urgentes e sensíveis com postura técnica, linguagem clara e sigilo. Quem
              procura o escritório sabe, desde a primeira conversa, o que está em jogo e qual é o
              próximo passo.
            </p>

            <ul className="mt-8 divide-y divide-brass/15 border-y border-brass/15">
              {credentials.map((item) => (
                <li key={item} className="flex gap-4 py-3.5 text-[15px] leading-snug text-paper">
                  <span aria-hidden="true" className="mt-[0.55rem] h-px w-4 shrink-0 bg-brass" />
                  {item}
                </li>
              ))}
            </ul>

            <div className="mt-9">
              <LpWhatsAppLink section="advogado" className="lp-btn lp-btn-wa w-full sm:w-auto">
                <WhatsAppIcon className="h-5 w-5 shrink-0" />
                Falar com o Dr.&nbsp;Rodrigo
              </LpWhatsAppLink>
            </div>
          </Reveal>
        </div>

        <div className="mt-20 border-t border-brass/15 pt-12 lg:mt-28 lg:pt-16">
          <Reveal>
            <div className="grid gap-4 lg:grid-cols-12 lg:items-end lg:gap-16">
              <h3 className="lp-serif text-[1.65rem] font-medium leading-tight tracking-[-0.015em] text-paper sm:text-[2rem] lg:col-span-5">
                Reconhecimento público e diálogo institucional
              </h3>
              <p className="max-w-xl leading-relaxed text-muted lg:col-span-7">
                Homenagens recebidas do Legislativo goiano e encontros com autoridades do sistema de
                Justiça.
              </p>
            </div>
          </Reveal>

          <Reveal delay={80}>
            <ul
              className="no-scrollbar -mx-5 mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 scroll-pl-5 sm:-mx-8 sm:px-8 sm:scroll-pl-8 lg:mx-0 lg:grid lg:grid-cols-5 lg:gap-5 lg:overflow-visible lg:px-0"
              aria-label="Homenagens e encontros institucionais"
            >
              {honors.map((honor) => (
                <li key={honor.src} className="w-[68%] shrink-0 snap-start sm:w-[40%] lg:w-auto">
                  <figure>
                    <div className="lp-photo relative aspect-[3/4] overflow-hidden bg-ink-elevated">
                      <Image
                        src={honor.src}
                        alt={`${honor.title} — ${honor.source}`}
                        fill
                        quality={65}
                        sizes="(min-width: 1024px) 18vw, (min-width: 640px) 40vw, 68vw"
                        className="object-cover object-top"
                      />
                    </div>
                    <figcaption className="mt-4">
                      <span className="lp-serif block text-[1.02rem] leading-snug text-paper">
                        {honor.title}
                      </span>
                      <span className="mt-1 block text-xs leading-snug text-muted">{honor.source}</span>
                    </figcaption>
                  </figure>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
