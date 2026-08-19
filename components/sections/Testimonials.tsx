import { Marquee } from "@/components/motion/Marquee";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { homeCopy } from "@/content/copy";
import { testimonials } from "@/content/testimonials";

/** S10. Four quotes on a slow 60s marquee — the page's only long-cycle track. */
export function Testimonials() {
  return (
    <section id="reviews" className="scroll-mt-20 bg-sm-bone py-24 md:py-32 lg:py-40">
      <Container>
        <SectionHeader
          eyebrow={homeCopy.testimonials.eyebrow}
          heading={homeCopy.testimonials.heading}
          body={homeCopy.testimonials.body}
          heading_tone="accent"
        />
      </Container>

      <div className="mt-16 lg:mt-24">
        <Marquee label="Patient reviews" duration={60}>
          <div className="flex gap-5 pr-5">
            {testimonials.map((testimonial) => (
              <figure
                key={testimonial.quote}
                className="flex w-[85vw] shrink-0 flex-col justify-between gap-12 rounded-sm-card border border-sm-red-600/35 p-7 sm:w-[420px] md:p-8"
              >
                <blockquote className="text-sm-body text-sm-text">
                  <p>&ldquo;{testimonial.quote}&rdquo;</p>
                </blockquote>
                <figcaption>
                  <p className="text-sm-body text-sm-text">{testimonial.name}</p>
                  <p className="mt-1 font-sm-mono text-sm-caption uppercase tracking-[0.1em] text-sm-text-2">
                    {testimonial.detail}
                  </p>
                </figcaption>
              </figure>
            ))}
          </div>
        </Marquee>
      </div>
    </section>
  );
}
