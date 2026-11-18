import { LockKeyhole } from "lucide-react";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import { Reveal } from "@/components/Reveal";
import { LpWhatsAppLink } from "@/components/lp/LpWhatsAppLink";
import { SectionLabel } from "@/components/lp/ui";

const scope = [
  "Defesa em acusações de estupro, importunação e assédio",
  "Defesa em acusações de crimes sexuais online",
  "Acompanhamento desde o início da investigação",
  "Atuação ética, técnica e com sigilo absoluto",
];

export function LpSensitive() {
  return (
    <section id="acusacoes-sensiveis" className="cv-auto relative bg-ink">
      <div className="mx-auto max-w-3xl px-5 py-20 text-center sm:px-8 lg:py-32">
        <Reveal>
          <SectionLabel numeral="VII" className="justify-center">
            Defesa especializada
          </SectionLabel>
          <h2 className="lp-serif mt-6 text-[2.1rem] font-medium leading-[1.1] tracking-[-0.02em] text-paper sm:text-[2.9rem]">
            Acusado de um crime sexual? Aja antes de falar.
          </h2>
          <p className="mx-auto mt-6 max-w-2xl leading-relaxed text-muted">
            Acusações de crimes contra a dignidade sexual exigem defesa técnica, responsável e
            absolutamente sigilosa <strong className="font-semibold text-paper">desde o primeiro contato</strong>
            {" "}— muitas vezes, o que é dito antes da orientação jurídica define o rumo do caso.
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
              Falar com o advogado com total sigilo
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
