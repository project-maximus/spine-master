import { Marquee } from "@/components/motion/Marquee";
import { Reveal } from "@/components/motion/Reveal";
import { Container } from "@/components/ui/Container";
import { homeCopy } from "@/content/copy";
import { site } from "@/content/site";
import { trustMarks } from "@/content/pillars";
import { Star } from "lucide-react";

/**
 * S3. The reference runs a client-logo marquee here. This practice has no
 * partner logos to show, so the same slot carries what it can actually
 * evidence: the Google rating and where/how it practises.
 */
export function TrustBar() {
  return (
    <section aria-label="Trust markers" className="bg-sm-bone py-16 md:py-20">
      <Container>
        <Reveal>
          <p className="text-center text-sm-body text-sm-text-2">{homeCopy.trustBar.intro}</p>
        </Reveal>

        <Reveal delay={0.06} className="mt-10 flex justify-center">
          <div className="flex items-center gap-2.5">
            <span className="flex items-center gap-0.5" aria-hidden="true">
              {Array.from({ length: 5 }).map((_, index) => (
                <Star key={index} className="size-4 fill-sm-red-600 text-sm-red-600" strokeWidth={0} />
              ))}
            </span>
            <p className="font-sm-mono text-sm-caption uppercase tracking-[0.1em] text-sm-text-2">
              <span className="tnum">{site.reviews.rating}</span> from{" "}
              <span className="tnum">{site.reviews.count}</span> Google reviews
            </p>
          </div>
        </Reveal>
      </Container>

      <Reveal delay={0.12} className="mt-12">
        <Marquee label="What the clinic is known for" duration={32} className="border-y border-sm-line py-5">
          <div className="flex items-center gap-10 pr-10 md:gap-14 md:pr-14">
            {trustMarks.map((mark) => (
              <span
                key={mark}
                className="whitespace-nowrap font-sm-mono text-sm-caption uppercase tracking-[0.12em] text-sm-text-3"
              >
                {mark}
              </span>
            ))}
          </div>
        </Marquee>
      </Reveal>
    </section>
  );
}
