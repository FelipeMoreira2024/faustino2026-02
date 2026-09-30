import { LockKeyhole } from "lucide-react";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import { Reveal } from "@/components/Reveal";
import { LpWhatsAppLink } from "@/components/lp/LpWhatsAppLink";
import { SectionLabel } from "@/components/lp/ui";

const scope = [
  "Acusações de estupro, importunação e assédio",
  "Acusações de crimes sexuais pela internet",
  "Acompanhamento desde a investigação",
  "Sigilo absoluto em todo o atendimento",
];

export function LpSensitive() {
  return (
    <section id="acusacoes-sensiveis" className="cv-auto relative bg-ink">
      <div className="mx-auto max-w-3xl px-5 py-20 text-center sm:px-8 lg:py-32">
        <Reveal>
          <SectionLabel numeral="VII" className="justify-center">
            Acusações sensíveis
          </SectionLabel>
          <h2 className="lp-serif mt-6 text-[2.1rem] font-medium leading-[1.1] tracking-[-0.02em] text-paper sm:text-[2.9rem]">
            Acusado de crime sexual? Fale com a defesa antes de falar com qualquer pessoa.
          </h2>
          <p className="mx-auto mt-6 max-w-2xl leading-relaxed text-muted">
            Nesses casos, o que se diz antes da orientação jurídica, a amigos, à família, nas redes
            ou na delegacia, costuma pesar no processo. A defesa é técnica, discreta e começa pela
            estratégia.
          </p>
        </Reveal>

        <Reveal delay={80}>
          <ul className="mx-auto mt-10 grid max-w-2xl gap-x-10 border-y border-brass/15 py-6 text-left sm:grid-cols-2">
            {scope.map((item) => (
              <li key={item} className="flex gap-3 py-2 text-[15px] leading-snug text-paper">
                <span aria-hidden="true" className="mt-[0.6rem] h-px w-3 shrink-0 bg-brass" />
                {item}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={140}>
          <div className="mt-10 flex flex-col items-center gap-3">
            <LpWhatsAppLink
              section="acusacoes-sensiveis"
              topic="situacao_4"
              className="lp-btn lp-btn-wa w-full sm:w-auto"
            >
              <WhatsAppIcon className="h-5 w-5 shrink-0" />
              <span className="sm:hidden">Conversar com sigilo</span>
              <span className="hidden sm:inline">Conversar com sigilo pelo WhatsApp</span>
            </LpWhatsAppLink>
            <p className="flex items-center gap-2 text-xs text-muted">
              <LockKeyhole className="h-3.5 w-3.5 shrink-0 text-brass" strokeWidth={1.6} aria-hidden="true" />
              A mensagem inicial não menciona o tipo de acusação.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
