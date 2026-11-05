import { Reveal } from "@/components/Reveal";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import { C24ChatPreview } from "@/components/criminalista-24h/ChatPreview";
import { C24WhatsAppLink } from "@/components/criminalista-24h/WhatsAppLink";
import { BTN_WA, CONTAINER, EYEBROW, H2 } from "@/components/criminalista-24h/ui";
import { processSteps } from "@/lib/criminalista-24h";

export function C24Process() {
  return (
    <section id="como-funciona" className="section-paper cv-auto relative bg-paper text-ink">
      <div className={`${CONTAINER} py-16 lg:py-28`}>
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-16">
          <div className="lg:col-span-7">
            <Reveal>
              <p className={`${EYEBROW} text-brass-deep`}>Como funciona</p>
              <h2 className={`${H2} mt-3 text-ink`}>Do primeiro contato à defesa, em três passos</h2>
            </Reveal>

            <ol className="mt-10 space-y-8">
              {processSteps.map(({ title, text }, i) => (
                <li key={title} className="flex gap-5">
                  <span
                    aria-hidden="true"
                    className="font-display text-4xl font-semibold leading-none text-brass-deep"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <Reveal delay={i * 70}>
                    <h3 className="font-display text-xl font-semibold text-ink">{title}</h3>
                    <p className="mt-2 leading-relaxed text-ink-soft">{text}</p>
                  </Reveal>
                </li>
              ))}
            </ol>

            <Reveal delay={120}>
              <div className="mt-10">
                <C24WhatsAppLink section="como-funciona" className={BTN_WA}>
                  <WhatsAppIcon className="h-5 w-5 shrink-0" />
                  Começar pelo WhatsApp
                </C24WhatsAppLink>
              </div>
            </Reveal>
          </div>

          <Reveal delay={100} className="lg:col-span-5">
            <C24ChatPreview className="mx-auto max-w-md" />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
