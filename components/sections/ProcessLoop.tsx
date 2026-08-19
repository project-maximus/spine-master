"use client";

import { useIsReducedMotion } from "@/components/motion/MotionProvider";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { processSteps } from "@/content/process";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

/** The connector SVG shares these divisions with the stepper's 4-column grid. */
const COLUMNS = processSteps.length;
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
 * S9. A pinned, scrubbed stepper: a tall spacer holds one sticky panel, and
 * scrolling through it advances the active step. The stepper rail fills, the
 * active circle and label light up, and the description below cross-fades.
 *
 * Everything is written straight to the DOM with gsap.set from a single
 * scrubbed ScrollTrigger — no React state per frame, so scrolling never
 * queues a re-render.
 *
 * The same layout runs at every width; only the connector curves and the dial
 * are desktop-only, since neither survives a narrow column. Under reduced
 * motion the whole thing degrades to a plain list with no pinning.
 */
export function ProcessLoop() {
  const rootRef = useRef<HTMLDivElement>(null);
  const circleRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const labelRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const descRefs = useRef<(HTMLDivElement | null)[]>([]);
  const curveRefs = useRef<(SVGPathElement | null)[]>([]);
  const numberRef = useRef<HTMLSpanElement>(null);
  const ringRef = useRef<SVGCircleElement>(null);
  const dialRef = useRef<SVGSVGElement>(null);
  const activeIndex = useRef(-1);
  const reducedMotion = useIsReducedMotion();

  useGSAP(
    () => {
      if (reducedMotion) return;

      const paint = (index: number) => {
        descRefs.current.forEach((el, i) => {
          if (el) gsap.set(el, { autoAlpha: i === index ? 1 : 0 });
        });
        circleRefs.current.forEach((el, i) => {
          if (!el) return;
          const on = i <= index;
          el.style.borderColor = on ? "var(--color-sm-red-600)" : "rgb(255 255 255 / 0.2)";
          const n = el.firstElementChild as HTMLElement | null;
          if (n) n.style.color = on ? "var(--color-sm-red-600)" : "var(--color-sm-text-inv-3)";
        });
        labelRefs.current.forEach((el, i) => {
          if (el) el.style.color = i === index ? "var(--color-sm-text-inv)" : "var(--color-sm-text-inv-3)";
        });
        // The line running down to the description is the "which step" cue:
        // the active one goes red, the rest stay as faint structure.
        //
        // No dash-draw here. getTotalLength() reports length in viewBox units,
        // but `vector-effect: non-scaling-stroke` makes the browser apply dash
        // patterns in SCREEN units — and with preserveAspectRatio="none" the x
        // and y scales differ, so the two never agree. The dash came out the
        // wrong length and the line rendered half-drawn. A colour transition
        // cannot desynchronise like that.
        curveRefs.current.forEach((el, i) => {
          if (!el) return;
          const on = i === index;
          el.style.stroke = on ? "var(--color-sm-red-600)" : "rgb(255 255 255 / 0.18)";
          el.style.strokeWidth = on ? "2" : "1.5";
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
          const index = Math.min(COLUMNS - 1, Math.floor(self.progress * COLUMNS));
          if (index !== activeIndex.current) {
            activeIndex.current = index;
            paint(index);
          }
          // the dial's arc tracks progress continuously
          if (ringRef.current) {
            gsap.set(ringRef.current, { strokeDashoffset: CIRCUMFERENCE * (1 - self.progress) });
          }
          if (dialRef.current) gsap.set(dialRef.current, { rotation: self.progress * 45 });
        },
      });

      return () => trigger.kill();
    },
    { scope: rootRef, dependencies: [reducedMotion] },
  );

  if (reducedMotion) {
    return (
      <div>
        <ProcessSteps circleRefs={circleRefs} labelRefs={labelRefs} />
        <ol className="mt-14 flex flex-col gap-8">
          {processSteps.map((step) => (
            <li key={step.number} className="border-t border-white/12 pt-6">
              <div className="flex items-baseline gap-4">
                <span className="tnum font-sm-mono text-sm-caption text-sm-red-600">{step.number}</span>
                <h3 className="font-sm-mono text-sm-eyebrow uppercase text-sm-text-inv">{step.title}</h3>
              </div>
              <p className="mt-3 text-sm-body text-sm-text-inv-2">{step.description}</p>
            </li>
          ))}
        </ol>
      </div>
    );
  }

  return (
    <div ref={rootRef} className="relative" style={{ height: `${COLUMNS * 130}vh` }}>
      <div className="sticky top-0 flex h-screen flex-col items-center justify-center gap-6 overflow-hidden lg:justify-start lg:gap-2 lg:pt-24">
        <div className="w-full max-w-4xl">
          <ProcessSteps circleRefs={circleRefs} labelRefs={labelRefs} />

          {/* Curves start at the centre of each grid column: x = (i + 0.5) ×
              columnWidth. preserveAspectRatio="none" keeps that mapping linear
              as the container resizes, so they stay under the circles. */}
          <svg
            className="mt-3 hidden h-20 w-full lg:block"
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
                  ref={(el) => {
                    curveRefs.current[i] = el;
                  }}
                  d={`M ${x} 0 C ${x} ${VIEW_H * 0.55}, ${VIEW_W / 2} ${VIEW_H * 0.45}, ${VIEW_W / 2} ${VIEW_H}`}
                  stroke="currentColor"
                  // non-scaling-stroke keeps this an honest 1.5px at every
                  // width; without it the "none" aspect ratio stretches the
                  // stroke horizontally along with the geometry.
                  strokeWidth="1.5"
                  vectorEffect="non-scaling-stroke"
                  className="text-white/30"
                  style={{ transition: "stroke 300ms ease, stroke-width 300ms ease" }}
                />
              );
            })}
            <path
              d={`M ${VIEW_W / 2} ${VIEW_H - 12} V ${VIEW_H}`}
              stroke="currentColor"
              strokeWidth="1.5"
              vectorEffect="non-scaling-stroke"
              className="text-sm-red-600"
            />
          </svg>
        </div>

        {/* Only the description sits here now — the step's name lives in its
            circle above, so repeating it was saying the same thing twice. */}
        <div className="relative mt-6 h-32 w-full max-w-xl text-center lg:mt-2 lg:h-28">
          {processSteps.map((step, index) => (
            <div
              key={step.number}
              ref={(el) => {
                descRefs.current[index] = el;
              }}
              className="absolute inset-0 px-2"
            >
              <p className="text-sm-body text-sm-text-inv-2 md:text-sm-body-lg">{step.description}</p>
            </div>
          ))}
        </div>

        {/* The dial, at every width. It is drawn once at full size and scaled
            down for narrow viewports rather than redrawn — one SVG, one set of
            refs, one source of truth for the geometry.

            Scale lives on this wrapper, not on the <svg>: GSAP writes the
            rotation into the element's `transform`, and putting a transform
            utility on the same node means whichever writes last wins.

            The scale is deliberately large enough that the circle exceeds the
            space left under the description and gets clipped by the panel —
            that crop is what makes it read as a horizon. Scaled to fit, it
            just looks like a ring. */}
        <div className="relative mt-2 flex w-full justify-center">
          <span className="relative z-10 flex size-12 items-center justify-center rounded-full border border-sm-red-600/50 bg-sm-ink-950 lg:size-14">
            <span ref={numberRef} className="tnum font-sm-mono text-sm-caption text-sm-red-600">
              {processSteps[0].number}
            </span>
          </span>

          <div className="pointer-events-none absolute -top-1 left-1/2 origin-top -translate-x-1/2 scale-100">
          <svg
            ref={dialRef}
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
                    falls away fast and ends fully transparent. */}
                <stop offset="0%" style={{ stopColor: "var(--color-sm-red-600)", stopOpacity: 0.5 }} />
                <stop offset="45%" style={{ stopColor: "var(--color-sm-red-600)", stopOpacity: 0.16 }} />
                <stop offset="100%" style={{ stopColor: "var(--color-sm-red-600)", stopOpacity: 0 }} />
              </linearGradient>
            </defs>

            {/* The band. Drawn as one circle with a very thick stroke — that is
                what makes an annulus in SVG; two concentric paths would leave a
                seam wherever the fill met itself. */}
            {/* On a phone the visible crop is mostly band, so the same fill
                that reads as a distant glow at 1440 reads as a solid donut at
                390. It is held back until there is enough dark around it. */}
            <circle
              cx={CENTER}
              cy={CENTER}
              r={BAND_R}
              stroke="url(#sm-dial-band)"
              strokeWidth={BAND_W}
              className="opacity-35 sm:opacity-50 md:opacity-75 lg:opacity-100"
            />
            <circle
              cx={CENTER}
              cy={CENTER}
              r={BAND_R - BAND_W / 2}
              stroke="currentColor"
              strokeWidth="1"
              className="text-sm-red-600/60 opacity-50 md:opacity-75 lg:opacity-100"
            />
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
    </div>
  );
}
