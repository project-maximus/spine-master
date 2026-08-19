import { ConditionScroller } from "@/components/sections/ConditionScroller";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { homeCopy } from "@/content/copy";

/**
 * S8. The scroller is full-bleed — its own gutters keep the first card on the
 * container edge while the next one stays partly visible.
 */
export function Conditions() {
  return (
    <section
      id="conditions"
      // No rounded top here — this panel follows another ink section, so a
      // radius would notch the bone page background between the two.
      className="on-ink scroll-mt-20 bg-sm-ink-950 py-24 text-sm-text-inv md:py-32 lg:py-40"
    >
      <Container>
        <SectionHeader
          eyebrow={homeCopy.conditions.eyebrow}
          heading={homeCopy.conditions.heading}
          body={homeCopy.conditions.body}
          linkLabel="Learn More"
          linkHref="#process"
          align="center"
          heading_tone="accent"
          onInk
        />
      </Container>

      <div className="mt-16 lg:mt-24">
        <ConditionScroller />
      </div>
    </section>
  );
}
