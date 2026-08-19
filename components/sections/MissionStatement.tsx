import { Reveal } from "@/components/motion/Reveal";
import { ScrubText } from "@/components/motion/ScrubText";
import { ButtonLink } from "@/components/ui/Button";
import { Container, Section } from "@/components/ui/Container";
import { homeCopy } from "@/content/copy";
import { site } from "@/content/site";

/**
 * S4. The emotional centre of the page: one display-scale sentence, centred on
 * the light surface, with no heading and no supporting UI. Deliberately spare.
 */
export function MissionStatement() {
  return (
    <Section
      tone="bone"
      aria-label="Our mission"
      // Holds at the top of the viewport while the dark card below rides up
      // over it. h-screen so the panel is exactly one screen — a taller sticky
      // panel gets its bottom cropped rather than covered cleanly.
      className="lg:sticky lg:top-0 lg:flex lg:h-screen lg:items-center lg:py-0"
    >
      <Container>
        {/* The page's signature motion — the statement fills in word by word
            against scroll, so reading it and scrolling are the same gesture.
            `from` is lifted for the light surface: 0.16 of near-black on bone
            reads as almost nothing, where on ink it was a legible grey. */}
        <ScrubText
          as="p"
          from={0.22}
          className="mx-auto max-w-[26ch] text-center font-sm-display text-sm-display text-sm-text"
        >
          {homeCopy.mission.statement}
        </ScrubText>

        <Reveal delay={0.12} className="mt-12 flex justify-center">
          <ButtonLink href="#contact" size="lg">
            {site.cta.primary}
          </ButtonLink>
        </Reveal>
      </Container>
    </Section>
  );
}
