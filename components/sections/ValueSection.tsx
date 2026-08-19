import { Reveal } from "@/components/motion/Reveal";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { homeCopy } from "@/content/copy";
import { valueStats } from "@/content/stats";

/**
 * S5. A dark card that rides up over the mission statement behind it: eyebrow
 * and heading left, body and link right, then the three stat cards centred
 * beneath as one row.
 *
 * `relative z-10` is load-bearing. The section above is `position: sticky`,
 * which makes it a POSITIONED element, and positioned elements paint over
 * static siblings — without its own stacking position this card would render
 * interleaved with the text it is supposed to be covering.
 */
export function ValueSection() {
  return (
    <section
      id="about"
      className="on-ink relative z-10 scroll-mt-20 rounded-t-sm-frame bg-sm-ink-950 py-24 text-sm-text-inv md:py-32 lg:py-40"
    >
      <Container>
        <SectionHeader
          eyebrow={homeCopy.value.eyebrow}
          heading={homeCopy.value.heading}
          body={homeCopy.value.body}
          linkLabel="Learn More"
          linkHref="#treatments"
          heading_tone="accent"
          onInk
        />

        <div className="mx-auto mt-20 grid max-w-5xl gap-5 md:grid-cols-3 lg:mt-28">
          {valueStats.map((stat, index) => (
            <Reveal key={stat.label} delay={index * 0.08}>
              <div className="flex h-full flex-col justify-between gap-10 rounded-sm-card border border-sm-red-600/40 bg-white/[0.04] p-7 md:p-8">
                <h3 className="font-sm-display text-sm-h4 text-sm-text-inv">{stat.label}</h3>
                <p className="tnum font-sm-display text-sm-h2 text-sm-red-600">{stat.value}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
