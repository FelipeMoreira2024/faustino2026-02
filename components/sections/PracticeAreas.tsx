import {
  Siren,
  Scale,
  ShieldCheck,
  FlaskConical,
  FileSearch,
  Gavel,
  Clock,
  type LucideIcon,
} from "lucide-react";
import { Eyebrow } from "@/components/Eyebrow";
import { Reveal } from "@/components/Reveal";
import { SectionMarker } from "@/components/SectionMarker";

type Area = {
  icon: LucideIcon;
  title: string;
  description: React.ReactNode;
};

const areas: Area[] = [
  {
    icon: Siren,
    title: "Prisão em Flagrante e Audiência de Custódia",
    description:
      "Atuação nas primeiras 24 horas: acompanhamento na delegacia, análise da legalidade da prisão e defesa na audiência de custódia.",
  },
  {
    icon: Scale,
    title: "Pedidos de Liberdade",
    description:
      "Habeas corpus, liberdade provisória, relaxamento de prisão e revogação de preventiva, com fundamentação técnica e agilidade.",
  },
  {
    icon: ShieldCheck,
    title: "Defesa em Crimes Sexuais",
    description: (
      <>
        Defesa técnica e sigilosa para quem é{" "}
        <strong className="font-semibold text-paper">acusado</strong> em casos
        de estupro, importunação, assédio ou crimes online. Estratégia definida
        antes de qualquer declaração.
      </>
    ),
  },
  {
    icon: FlaskConical,
    title: "Defesa em Crimes de Drogas",
    description:
      "Acusações de posse ou tráfico: análise do flagrante, tese de desclassificação e estratégia defensiva desde o início.",
  },
  {
    icon: FileSearch,
    title: "Defesa em Acusações de Estelionato e Crimes Patrimoniais",
    description: (
      <>
        Para quem está sendo{" "}
        <strong className="font-semibold text-paper">
          investigado ou acusado
        </strong>{" "}
        de estelionato, fraude ou crimes cibernéticos.
      </>
    ),
  },
  {
    icon: Gavel,
    title: "Defesa em Crimes Violentos e Tribunal do Júri",
    description:
      "Atuação em acusações graves, com preparação técnica para plenário e foco na preservação de direitos.",
  },
  {
    icon: Clock,
    title: "Acompanhamento em Delegacia 24h",
    description:
      "Presença do advogado em depoimentos, oitivas e ocorrências urgentes, a qualquer hora.",
  },
];

export function PracticeAreas() {
  return (
    <section className="cv-auto relative bg-ink" id="especialidades">
      <SectionMarker number="05" tone="ink" />
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 lg:px-20 lg:py-28">
        <Reveal>
          <Eyebrow>ESPECIALIDADES</Eyebrow>
          <h2 className="mt-4 font-display text-3xl font-semibold tracking-[-0.01em] text-paper sm:text-4xl">
            Defesa especializada em direito criminal
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {areas.map(({ icon: Icon, title, description }, i) => (
            <Reveal key={title} delay={Math.min(i * 50, 200)}>
              <article className="group hover-lift h-full border border-brass/15 bg-ink-elevated p-6 transition-colors duration-300 hover:border-brass sm:p-7">
                <Icon
                  className="icon-brass h-6 w-6 text-brass"
                  strokeWidth={1.25}
                  aria-hidden="true"
                />
                <h3 className="mt-5 font-display text-lg font-semibold leading-snug text-paper">
                  {title}
                </h3>
                <p className="mt-3 text-[15px] leading-relaxed text-muted">
                  {description}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
