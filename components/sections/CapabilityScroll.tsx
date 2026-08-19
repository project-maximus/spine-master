"use client";

import { CapabilityMedia } from "@/components/sections/CapabilityMedia";
import { useIsReducedMotion } from "@/components/motion/MotionProvider";
import { PlusItem } from "@/components/ui/PlusItem";
import { capabilities } from "@/content/capabilities";
import { cn } from "@/lib/utils";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

/**
 * Scroll distance the pinned panel holds for.
 *
 * Deliberately shorter on small screens. 150vh per step is ~3800px of pinned
 * scrolling on a phone, and a panel that will not move for that long reads as
 * a broken page rather than an effect — 90vh per step keeps the same sequence
 * without the dead travel.
 *
 * The values assume three capabilities; they are written as static classes
 * because Tailwind cannot see a computed string.
 */
const SPACER_HEIGHT = "h-[270vh] lg:h-[450vh]";

/**
 * S7. The sticky-tabs scroll: a tall spacer holds a `position: sticky` panel at
 * the top of the viewport, and scrolling through that spacer advances the
 * active capability. The left card cross-fades its copy; the right card's
 * media rises from translateY(100%) and fades in.
 *
 * The progression is driven by ONE scrubbed ScrollTrigger writing straight to
 * the DOM with gsap.set — no React state per frame, so scrolling never queues
 * a re-render.
 *
 * Below lg, and under reduced motion, the whole conceit is dropped for a plain
 * stacked list. A 450vh sticky region on a phone is a scroll trap, and under
 * reduced motion the cross-fade is the only thing communicating the change.
 */
export function CapabilityScroll() {
  const rootRef = useRef<HTMLDivElement>(null);
  const copyRefs = useRef<(HTMLDivElement | null)[]>([]);
  const mediaRefs = useRef<(HTMLDivElement | null)[]>([]);
  const activeIndex = useRef(0);
  const reducedMotion = useIsReducedMotion();

  useGSAP(
    () => {
      if (reducedMotion) return;

      // No matchMedia gate: the scrub now drives every width. It used to be
      // lg-only, which is why widening the markup alone left the panel pinned
      // but frozen on step one.
      const paint = (index: number) => {
        copyRefs.current.forEach((el, i) => {
          if (el) gsap.set(el, { autoAlpha: i === index ? 1 : 0 });
        });
        mediaRefs.current.forEach((el, i) => {
          if (el) gsap.set(el, { autoAlpha: i === index ? 1 : 0, yPercent: i === index ? 0 : 100 });
        });
      };

      paint(0);

      const trigger = ScrollTrigger.create({
        trigger: rootRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
        onUpdate: (self) => {
          const index = Math.min(
            capabilities.length - 1,
            Math.floor(self.progress * capabilities.length),
          );
          if (index === activeIndex.current) return;
          activeIndex.current = index;
          paint(index);
        },
      });

      return () => trigger.kill();
    },
    { scope: rootRef, dependencies: [reducedMotion] },
  );

  return (
    <>
      {/* ---- lg and up: tall spacer + sticky panel ---- */}
      {!reducedMotion && (
        <div ref={rootRef} className={cn("relative", SPACER_HEIGHT)}>
          <div className="sticky top-[5vh] h-[90vh]">
            {/* Media above, copy below on a phone; side by side from lg. The
                scrub itself is identical at every width — only the arrangement
                inside the pinned panel changes. */}
            <div className="flex h-full flex-col gap-4 lg:grid lg:grid-cols-[0.4fr_1fr] lg:gap-6">
              {/* copy */}
              <div className="relative order-2 h-52 shrink-0 rounded-sm-media bg-sm-ink-800 lg:order-1 lg:h-auto lg:flex lg:flex-col lg:justify-end lg:p-8">
                {capabilities.map((capability, index) => (
                  <div
                    key={capability.id}
                    ref={(el) => {
                      copyRefs.current[index] = el;
                    }}
                    className="absolute inset-0 flex flex-col justify-between p-6 lg:p-8"
                  >
                    <p className="font-sm-mono text-sm-caption uppercase tracking-[0.1em] text-sm-red-600">
                      <span className="tnum">{String(index + 1).padStart(2, "0")}</span>
                      <span className="mx-2 text-sm-text-inv-3" aria-hidden="true">
                        /
                      </span>
                      <span className="tnum text-sm-text-inv-2">
                        {String(capabilities.length).padStart(2, "0")}
                      </span>
                    </p>

                    <div>
                      <h3 className="font-sm-display text-sm-h3 text-sm-text-inv">{capability.label}</h3>
                      <div className="mt-6 h-px w-full bg-white/15" aria-hidden="true" />
                      <ul className="mt-6 flex flex-col gap-2.5">
                        {capability.bullets.map((bullet) => (
                          <PlusItem key={bullet} className="text-sm-text-inv-2">
                            {bullet}
                          </PlusItem>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>

              {/* media rising into place */}
              <div className="relative order-1 min-h-0 flex-1 overflow-hidden rounded-sm-media border border-white/10 lg:order-2">
                {capabilities.map((capability, index) => (
                  <div
                    key={capability.id}
                    ref={(el) => {
                      mediaRefs.current[index] = el;
                    }}
                    className="absolute inset-0"
                  >
                    <CapabilityMedia id={capability.id} sizes="(min-width: 1024px) 60vw, 90vw" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ---- reduced motion: plain stacked list, no pinning ---- */}
      {/* Centred to match the section header above it — a left-ragged stack
          under a centred header reads as two different layouts. */}
      <div className={cn("flex flex-col gap-14 text-center", !reducedMotion && "hidden")}>
        {capabilities.map((capability, index) => (
          <article key={capability.id}>
            <p className="font-sm-mono text-sm-caption uppercase tracking-[0.1em] text-sm-red-600">
              <span className="tnum">{String(index + 1).padStart(2, "0")}</span>
              <span className="mx-2 text-sm-text-inv-3" aria-hidden="true">
                /
              </span>
              <span className="tnum text-sm-text-inv-2">
                {String(capabilities.length).padStart(2, "0")}
              </span>
            </p>
            <h3 className="mt-4 font-sm-display text-sm-h3 text-sm-text-inv">{capability.label}</h3>
            <ul className="mt-5 flex flex-col gap-2.5">
              {capability.bullets.map((bullet) => (
                <PlusItem key={bullet} className="text-sm-text-inv-2">
                  {bullet}
                </PlusItem>
              ))}
            </ul>
            <div className="mt-8 aspect-[4/3] w-full overflow-hidden rounded-sm-media border border-white/10">
              <CapabilityMedia id={capability.id} sizes="90vw" />
            </div>
          </article>
        ))}
      </div>
    </>
  );
}
