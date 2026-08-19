import { CapabilityScroll } from "@/components/sections/CapabilityScroll";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { homeCopy } from "@/content/copy";

/**
 * S7. The header sits in normal flow, then the sticky-tabs scroll runs beneath
 * it: a tall spacer holding one sticky panel whose contents advance with the
 * scroll.
 *
 * Nothing on the way down to that panel may clip — a single `overflow-hidden`
 * ancestor silently kills `position: sticky`.
 */
export function Capabilities() {
  return (
    <section
      id="treatments"
      className="on-ink scroll-mt-20 rounded-t-sm-frame bg-sm-ink-950 pb-24 text-sm-text-inv md:pb-32"
    >
      <Container className="py-24 md:py-32 lg:py-40">
        <SectionHeader
          eyebrow={homeCopy.capabilities.eyebrow}
          heading={homeCopy.capabilities.heading}
          body={homeCopy.capabilities.body}
          linkLabel="Learn More"
          linkHref="#conditions"
          heading_tone="accent"
          onInk
        />
      </Container>

      <Container>
        <CapabilityScroll />
      </Container>
    </section>
  );
}
