import {
  ChevronRight,
  FileText,
  Gavel,
  Lock,
  MessageCircle,
  Search,
  Siren,
  TriangleAlert,
  type LucideIcon,
} from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { C24WhatsAppLink } from "@/components/criminalista-24h/WhatsAppLink";
import { CONTAINER, EYEBROW, H2 } from "@/components/criminalista-24h/ui";
import { situations } from "@/lib/criminalista-24h";

const icons: LucideIcon[] = [Siren, FileText, Search, Gavel, Lock, MessageCircle];

/** A lista de situações da home, agora clicável: cada opção já é um atalho para o WhatsApp. */
export function C24Situations() {
  return (
    <section id="situacoes" className="relative border-t border-brass/10 bg-ink">
      <div className={`${CONTAINER} py-14 lg:py-24`}>
        <Reveal>
          <p className={`${EYEBROW} text-brass`}>Atendimento imediato</p>
          <h2 className={`${H2} mt-3 max-w-2xl text-paper`}>Qual é a sua situação agora?</h2>
          <p className="mt-4 max-w-2xl leading-relaxed text-muted">
            Toque na opção mais próxima do seu caso e fale com o advogado pelo WhatsApp. Em caso de
            prisão, <strong className="font-semibold text-paper">cada hora conta</strong>.
          </p>
        </Reveal>

        <ul className="mt-9 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 lg:gap-4">
          {situations.map(({ key, title, detail }, i) => {
            const Icon = icons[i] ?? MessageCircle;
            return (
              <li key={key}>
                <Reveal delay={Math.min(i * 40, 160)} className="h-full">
                  <C24WhatsAppLink
                    section="situacoes"
                    topic={key}
                    className="group flex h-full min-h-[76px] items-center gap-4 rounded-xl border border-brass/20 bg-ink-elevated px-4 py-3.5 transition-[border-color,background-color] duration-300 hover:border-brass/60 hover:bg-[#1e252e] sm:px-5"
                  >
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-brass/10 text-brass">
                      <Icon className="h-5 w-5" strokeWidth={1.6} aria-hidden="true" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block font-semibold leading-snug text-paper">{title}</span>
                      <span className="mt-0.5 block text-[13px] leading-snug text-muted">{detail}</span>
                    </span>
                    <ChevronRight
                      className="h-5 w-5 shrink-0 text-whatsapp transition-transform duration-300 group-hover:translate-x-0.5"
                      strokeWidth={2}
                      aria-hidden="true"
                    />
                  </C24WhatsAppLink>
                </Reveal>
              </li>
            );
          })}
        </ul>

        <Reveal delay={120}>
          <div className="mt-8 flex gap-4 rounded-xl border border-brass/35 bg-brass/[0.06] p-5 sm:p-6">
            <TriangleAlert
              className="mt-0.5 h-5 w-5 shrink-0 text-brass"
              strokeWidth={1.6}
              aria-hidden="true"
            />
            <div>
              <p className="font-semibold text-paper">
                Não preste depoimento sem um advogado criminalista.
              </p>
              <p className="mt-1 leading-relaxed text-muted">
                Uma declaração equivocada nas primeiras horas pode definir o rumo de todo o processo.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
