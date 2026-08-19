import { ProcessLoop } from "@/components/sections/ProcessLoop";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { homeCopy } from "@/content/copy";

/** S9. */
export function Process() {
  return (
    <section id="process" className="on-ink scroll-mt-20 bg-sm-ink-950 pt-24 text-sm-text-inv md:pt-32 lg:pt-40">
      <Container>
        <SectionHeader
          eyebrow={homeCopy.process.eyebrow}
          heading={homeCopy.process.heading}
          body={homeCopy.process.body}
          align="center"
          heading_tone="accent"
          onInk
        />
      </Container>

      <Container className="mt-16 lg:mt-0">
        <ProcessLoop />
      </Container>
    </section>
  );
}
