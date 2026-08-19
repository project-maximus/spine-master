import { Marquee } from "@/components/motion/Marquee";
import { Reveal } from "@/components/motion/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { homeCopy } from "@/content/copy";
import { site } from "@/content/site";

/** S12. The headline runs as a marquee, exactly as the reference does. */
export function FinalCTA() {
  return (
    <section aria-label="Book a consultation" className="on-ink bg-sm-ink-950 py-12 text-sm-text-inv md:py-16">
      {/* Sized down to h4: at h1 the scrolling line dominated the whole panel,
          where the reference keeps it close to body size. */}
      <Marquee label="Take back control of your spine" duration={40} tone="ink">
        <div className="flex items-center gap-10 pr-10">
          {Array.from({ length: 5 }).map((_, index) => (
            <span key={index} className="whitespace-nowrap font-sm-display text-sm-h4 text-sm-red-600">
              {homeCopy.finalCta.headline}
            </span>
          ))}
        </div>
      </Marquee>

      <Container className="mt-8">
        <div className="flex flex-col items-start gap-5 md:items-end">
          <Reveal>
            <p className="text-sm-body-lg text-sm-text-inv-2 md:text-right">{homeCopy.finalCta.support}</p>
          </Reveal>
          <Reveal delay={0.08}>
            <ButtonLink href={site.phone.href} variant="primaryInk" size="lg">
              {site.cta.primary}
            </ButtonLink>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
