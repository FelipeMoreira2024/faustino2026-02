import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Reveal } from "@/components/Reveal";
import { SectionMarker } from "@/components/SectionMarker";
import { faqItems } from "@/lib/faq";

/** Reaplica os negritos da copy sobre o texto plano usado no JSON-LD. */
function renderAnswer(answer: string, bold?: string) {
  if (!bold) return answer;
  const [before, after] = answer.split(bold);
  return (
    <>
      {before}
      <strong className="font-semibold text-ink">{bold}</strong>
      {after}
    </>
  );
}

export function Faq() {
  return (
    <section
      className="section-paper cv-auto relative bg-paper text-ink"
      id="perguntas-frequentes"
    >
      <SectionMarker number="10" tone="paper" />
      <div className="mx-auto max-w-3xl px-5 py-20 sm:px-8 lg:py-32">
        <Reveal>
          <h2 className="font-display text-3xl font-semibold tracking-[-0.01em] text-ink sm:text-4xl">
            Perguntas frequentes
          </h2>
        </Reveal>

        <Reveal delay={80}>
          <Accordion
            type="single"
            collapsible
            defaultValue="faq-0"
            className="mt-10"
          >
            {faqItems.map(({ question, answer, bold }, i) => (
              <AccordionItem
                key={question}
                value={`faq-${i}`}
                className="border-ink/15"
              >
                <AccordionTrigger className="font-display text-lg font-semibold text-ink transition-colors duration-300 hover:text-brass-deep [&>svg]:text-brass-deep">
                  {question}
                </AccordionTrigger>
                <AccordionContent className="leading-relaxed text-ink-soft">
                  {renderAnswer(answer, bold)}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </section>
  );
}
