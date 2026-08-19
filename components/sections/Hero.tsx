import { RevealLines } from "@/components/motion/RevealLines";
import { BenefitTicker } from "@/components/sections/BenefitTicker";
import { HeroArrows } from "@/components/sections/HeroArrows";
import { HeroLoad } from "@/components/sections/HeroLoad";
import { ButtonLink } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { homeCopy } from "@/content/copy";
import { site } from "@/content/site";
import Image from "next/image";

/**
 * S1. A server component: only the leaves that own motion state are clients.
 *
 * The framed-media treatment — a full-bleed block inset from the viewport at a
 * 32px radius, with the header sitting transparent above it — is the hero's
 * whole structure. The portrait bleeds to the frame's right and bottom edges
 * and is dissolved into the ink surface by a gradient rather than being boxed,
 * so there is no hard photo rectangle anywhere in the composition.
 */
export function Hero() {
  const { eyebrow, headline, body } = homeCopy.hero;

  return (
    <section className="bg-sm-bone pt-[92px]">
      <div className="px-3 pb-3 md:px-5 md:pb-5">
        {/* The frame fills the viewport at lg. 104px = the 92px header + the
            12px bottom inset. */}
        <div
          data-hero-frame
          className="on-ink relative overflow-hidden rounded-sm-frame bg-sm-ink-900 will-change-transform lg:flex lg:min-h-[calc(100svh-104px)] lg:flex-col"
        >
          {/* ---- Portrait of Dr. Ahmad ----
              z-10 puts the figure IN FRONT of the glass rectangle, so the
              rectangle's right and bottom rules run behind it exactly as they
              do in the reference. Behind the glass it read as recessed.

              The box hangs well below the frame so the contained full-length
              figure scales up and the frame crops it mid-leg rather than
              floating a whole standing person inside the panel.

              The source PNG is already a clean cut-out, so there is no
              gradient or scrim over it — anything painted here would sit on
              top of the glass and put a black backdrop back. */}
          {/* The figure is bottom-anchored and width-constrained, so only the
              bottom offset moves it: raising it from -100 to -76 lifts him
              ~96px without changing his size. */}
          <div className="absolute right-0 top-16 -bottom-76 z-10 hidden w-[44%] lg:block xl:w-[40%]">
            <Image
              src="/images/hero-img.png"
              alt={`${site.practitioner}, ${site.descriptor.toLowerCase()} in Lahore`}
              fill
              priority
              sizes="(min-width: 1280px) 40vw, 44vw"
              // `contain`, anchored bottom-right, so the figure sits on the
              // frame's bottom edge and the frame does the cropping.
              // Held back a little so it sits into the panel rather than
              // punching out of it at full strength.
              className="object-contain object-[right_bottom] opacity-85"
              style={{ filter: "saturate(0.85) contrast(1.04)" }}
            />
          </div>

          {/* The reference's drawn inner rectangle, taken a step further into
              glass: a faint white tint plus a light backdrop blur, so the
              portrait reads as sitting *behind* a pane rather than being
              pasted onto the panel. The blur is deliberately small — anything
              heavier softens the face, which is the one thing that has to
              stay sharp. */}
          <div
            // inset-10 all round: the gap between the glass and the frame's
            // black edge reads the same above and below.
            className="pointer-events-none absolute inset-10 hidden rounded-[20px] border border-white/20 bg-white/[0.03] backdrop-blur-[3px] md:block"
            aria-hidden="true"
          />

          <HeroArrows />

          {/* Below lg there is no portrait at all — the hero is a centred text
              block. The figure only exists in the lg layout, where it has a
              column to bleed into. */}
          <div className="relative grid items-end gap-10 lg:grid-cols-2 lg:gap-0 lg:flex-1">
            <div
              data-hero-content
              className="px-5 py-16 text-center md:px-10 md:py-20 lg:px-12 lg:py-24 lg:pb-36 lg:text-left xl:px-20"
            >
              <HeroLoad delay={0.3}>
                <Eyebrow className="text-sm-text-inv-2">{eyebrow}</Eyebrow>
              </HeroLoad>

              <RevealLines
                as="h1"
                onLoad
                delay={0.3}
                // No text-balance here: the headline is two authored lines, and
                // balancing re-breaks each one against itself ("Move" / "Without Pain,").
                className="mt-5 font-sm-display text-sm-display-xl text-sm-red-600"
              >
                {headline.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </RevealLines>

              <HeroLoad delay={0.55}>
                <p className="mx-auto mt-6 max-w-[42ch] text-sm-body-lg text-sm-text-inv-2 lg:mx-0">
                  {body}
                </p>
              </HeroLoad>

              <HeroLoad delay={0.65} className="mt-8 flex justify-center lg:justify-start">
                <ButtonLink href="#contact" variant="primaryInk" size="lg">
                  {site.cta.primary}
                </ButtonLink>
              </HeroLoad>
            </div>
          </div>

          {/* Centred on the inner rectangle's bottom rule (bottom-16), so the
              pills sit on the line rather than under it. */}
          {/* Positioning lives on this wrapper, NOT on <HeroLoad>: GSAP writes
              an inline `transform` onto the element it animates, which would
              silently drop a Tailwind `translate-y-1/2` and leave the pills
              floating above the rule instead of centred on it.

              inset-x-14 leaves a short run of the rectangle's rule visible
              before the first pill, the way the reference threads them on. */}
          <div className="relative px-6 pb-8 md:absolute md:inset-x-[72px] md:bottom-10 md:z-20 md:translate-y-1/2 md:px-0 md:pb-0">
            <HeroLoad delay={0.95}>
              <BenefitTicker />
            </HeroLoad>
          </div>
        </div>
      </div>
    </section>
  );
}
