"use client";

import { useIsReducedMotion } from "@/components/motion/MotionProvider";
import { ChannelRow } from "@/components/sections/ChannelRow";
import { intakeChannels, processSteps } from "@/content/process";
import { cn } from "@/lib/utils";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

/** The connector SVG shares these divisions with ChannelRow's 6-column grid. */
const COLUMNS = intakeChannels.length;
const VIEW_W = 1200;
const VIEW_H = 110;
const COLUMN_W = VIEW_W / COLUMNS;

/**
 * The dial. Proportions measured off the reference: the filled band sits at
 * 0.70 of the outer dotted radius and is 0.27 of it thick, which is what makes
 * it read as a horizon rather than a ring around a logo.
 */
const RADIUS = 320;
const CENTER = RADIUS + 2;
const BAND_R = Math.round(RADIUS * 0.7);
const BAND_W = Math.round(RADIUS * 0.27);
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

/**
 * The number badge is size-14 (56px) and sits in normal flow at the top of the
 * dial wrapper, so its centre is 28px down. `CENTER - RADIUS` is the stroke
 * padding above the arc's apex inside the viewBox — offsetting the SVG by the
 * difference puts the apex through the middle of the badge rather than along
 * its top edge.
 */
const BADGE_SIZE = 56;
const DIAL_TOP = BADGE_SIZE / 2 - (CENTER - RADIUS);

/**
 * S9. Desktop gets a pinned, scrubbed loop: a tall spacer (steps × 160vh) with
 * a sticky panel, the active step driven straight onto the DOM via gsap.set.
 * No getBoundingClientRect per scroll event and no React state per frame.
 *
 * Progress is shown by a plain numbered rule rather than the huge dotted dial
 * this used to draw — with no artwork inside it, that ring was a mostly-empty
 * circle running off the bottom of the screen.
 *
 * Below lg — and under reduced motion — the loop does not scale down; it is
 * replaced by a plain numbered list. That is the whole fallback.
 */
export function ProcessLoop() {
  const rootRef = useRef<HTMLDivElement>(null);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);
  const numberRef = useRef<HTMLSpanElement>(null);
  const ringRef = useRef<SVGCircleElement>(null);
  const dialRef = useRef<SVGSVGElement>(null);
  const activeIndex = useRef(0);
  const reducedMotion = useIsReducedMotion();

  useGSAP(
    () => {
      if (reducedMotion) return;

      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px)", () => {
        const paint = (index: number) => {
          stepRefs.current.forEach((el, i) => {
            if (el) gsap.set(el, { autoAlpha: i === index ? 1 : 0 });
          });
          if (numberRef.current) numberRef.current.textContent = processSteps[index].number;
        };

        paint(0);

        const trigger = ScrollTrigger.create({
          trigger: rootRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
          onUpdate: (self) => {
            const index = Math.min(
              processSteps.length - 1,
              Math.floor(self.progress * processSteps.length),
            );
            if (index !== activeIndex.current) {
              activeIndex.current = index;
              paint(index);
            }
            if (ringRef.current) {
              gsap.set(ringRef.current, {
                strokeDashoffset: CIRCUMFERENCE * (1 - self.progress),
              });
            }
            // The dial turns with the scroll so the four steps read as one
            // continuous rotation rather than four separate slides.
            if (dialRef.current) {
              gsap.set(dialRef.current, { rotation: self.progress * 45 });
            }
          },
        });

        return () => trigger.kill();
      });

      return () => mm.revert();
    },
    { scope: rootRef, dependencies: [reducedMotion] },
  );

  return (
    <>
      {/* ---- lg and up: pinned scrub. Not rendered at all under reduced
           motion, so the steps exist exactly once in the DOM. ---- */}
      {!reducedMotion && (
        <div
          ref={rootRef}
          className="relative hidden lg:block"
          style={{ height: `${processSteps.length * 160}vh` }}
        >
          <div className="sticky top-0 flex h-screen flex-col items-center justify-start gap-2 overflow-hidden pt-24">
            <div className="w-full max-w-4xl">
              <ChannelRow />

              {/* Curves start at the centre of each grid column: x = (i + 0.5)
                  × columnWidth. preserveAspectRatio="none" keeps that mapping
                  linear as the container resizes, so they stay under the icons. */}
              <svg
                className="mt-3 h-24 w-full"
                viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
                fill="none"
                aria-hidden="true"
                preserveAspectRatio="none"
              >
                {Array.from({ length: COLUMNS }).map((_, i) => {
                  const x = (i + 0.5) * COLUMN_W;
                  return (
                    <path
                      key={i}
                      d={`M ${x} 0 C ${x} ${VIEW_H * 0.55}, ${VIEW_W / 2} ${VIEW_H * 0.45}, ${VIEW_W / 2} ${VIEW_H}`}
                      stroke="currentColor"
                      // non-scaling-stroke keeps this an honest 1.5px at every
                      // width; without it the "none" aspect ratio stretches the
                      // stroke horizontally along with the geometry.
                      strokeWidth="1.5"
                      vectorEffect="non-scaling-stroke"
                      className="text-white/30"
                    />
                  );
                })}
                {/* the short accent tick the curves resolve into */}
                <path
                  d={`M ${VIEW_W / 2} ${VIEW_H - 12} V ${VIEW_H}`}
                  stroke="currentColor"
                  strokeWidth="1.5"
                  vectorEffect="non-scaling-stroke"
                  className="text-sm-red-600"
                />
              </svg>
            </div>

            <div className="relative h-40 w-full max-w-xl text-center">
              {processSteps.map((step, index) => (
                <div
                  key={step.number}
                  ref={(el) => {
                    stepRefs.current[index] = el;
                  }}
                  className="absolute inset-0"
                >
                  <h3 className="font-sm-mono text-sm-eyebrow uppercase text-sm-red-600">{step.title}</h3>
                  <p className="mx-auto mt-4 max-w-[42ch] text-sm-body text-sm-text-inv-2">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>

            {/* The dial: the step number rides the top of a large arc whose
                red stroke draws itself as the section scrubs. */}
            <div className="relative mt-2 flex w-full justify-center">
              <span className="relative z-10 flex size-14 items-center justify-center rounded-full border border-sm-red-600/50 bg-sm-ink-950">
                <span ref={numberRef} className="tnum font-sm-mono text-sm-caption text-sm-red-600">
                  {processSteps[0].number}
                </span>
              </span>

              <svg
                ref={dialRef}
                className="pointer-events-none absolute left-1/2 -translate-x-1/2"
                style={{ top: DIAL_TOP }}
                width={RADIUS * 2 + 4}
                height={RADIUS * 2 + 4}
                viewBox={`0 0 ${RADIUS * 2 + 4} ${RADIUS * 2 + 4}`}
                fill="none"
                aria-hidden="true"
              >
                <defs>
                  <linearGradient id="sm-dial-band" x1="0" y1="0" x2="0" y2="1">
                    {/* The reference fills this band with a photograph of sky,
                        which is light and atmospheric. A flat brand red at full
                        strength turns the same shape into a solid donut, so it
                        falls away fast and ends fully transparent — read as a
                        horizon glow, not a ring. */}
                    <stop offset="0%" style={{ stopColor: "var(--color-sm-red-600)", stopOpacity: 0.5 }} />
                    <stop offset="45%" style={{ stopColor: "var(--color-sm-red-600)", stopOpacity: 0.16 }} />
                    <stop offset="100%" style={{ stopColor: "var(--color-sm-red-600)", stopOpacity: 0 }} />
                  </linearGradient>
                </defs>

                {/* The band. Drawn as one circle with a very thick stroke —
                    that is what makes an annulus in SVG; two concentric paths
                    would leave a seam wherever the fill met itself. */}
                <circle
                  cx={CENTER}
                  cy={CENTER}
                  r={BAND_R}
                  stroke="url(#sm-dial-band)"
                  strokeWidth={BAND_W}
                />
                {/* hairline along the band's inner edge */}
                <circle
                  cx={CENTER}
                  cy={CENTER}
                  r={BAND_R - BAND_W / 2}
                  stroke="currentColor"
                  strokeWidth="1"
                  className="text-sm-red-600/60"
                />

                {/* outer dotted circle the number badge rides on */}
                <circle
                  cx={CENTER}
                  cy={CENTER}
                  r={RADIUS}
                  stroke="currentColor"
                  strokeWidth="1"
                  strokeDasharray="2 6"
                  className="text-white/15"
                />
                <circle
                  ref={ringRef}
                  cx={CENTER}
                  cy={CENTER}
                  r={RADIUS}
                  stroke="currentColor"
                  strokeWidth="1.5"
                  className="text-sm-red-600"
                  strokeDasharray={CIRCUMFERENCE}
                  strokeDashoffset={CIRCUMFERENCE}
                  transform={`rotate(-90 ${CENTER} ${CENTER})`}
                />
              </svg>
            </div>
          </div>
        </div>
      )}

      {/* ---- below lg (and every reduced-motion user): a stacking deck ----
           Each card pins a little lower than the one before, so they gather
           into a stack as you scroll with every step's header still peeking
           out. Pure CSS sticky — the offset per card is the only mechanism.

           Rules between plain paragraphs read as flat debris at this width;
           cards give each step an edge and let the deck do the sequencing. */}
      <div className={cn(!reducedMotion && "lg:hidden")}>
        <ChannelRow variant="chips" />
        <ol className="mt-12 flex flex-col gap-4 pb-16">
          {processSteps.map((step, index) => (
            <li
              key={step.number}
              className="sticky"
              // 96px clears the condensed header. 52px per card is deliberate:
              // it is the card's top padding plus its title line, so a covered
              // card shows its number and title whole. A thinner sliver sliced
              // the body copy mid-line, which reads as broken rather than
              // stacked.
              style={{ top: `${96 + index * 52}px` }}
            >
              <div className="rounded-sm-card border border-white/12 bg-sm-ink-900 p-6 shadow-sm-float">
                <div className="flex items-baseline gap-4">
                  <span className="tnum font-sm-mono text-sm-caption text-sm-red-600">{step.number}</span>
                  <h3 className="font-sm-mono text-sm-eyebrow uppercase text-sm-text-inv">{step.title}</h3>
                </div>
                <p className="mt-3 text-sm-body text-sm-text-inv-2">{step.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </>
  );
}
