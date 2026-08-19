import { Reveal } from "@/components/motion/Reveal";
import { Container, Section } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { homeCopy } from "@/content/copy";

/**
 * S6. The keyword-dense paragraph that restates, as crawlable prose, every
 * number used as UI elsewhere on the page. Visually de-emphasised but always
 * real DOM text — never display:none, never an image.
 */
export function SeoProse() {
  return (
    <Section tone="bone" aria-label="About the practice" className="py-20 md:py-24 lg:py-28">
      <Container>
        <div className="mx-auto max-w-3xl">
          <Reveal>
            <Eyebrow className="text-center text-sm-text-3">{homeCopy.seoProse.eyebrow}</Eyebrow>
          </Reveal>
          <Reveal delay={0.06}>
            <p className="mt-8 text-sm-small text-sm-text-2">{homeCopy.seoProse.body}</p>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
