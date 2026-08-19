"use client";

import { AssetSlot } from "@/components/motion/AssetSlot";
import { useIsReducedMotion } from "@/components/motion/MotionProvider";
import { PlusItem } from "@/components/ui/PlusItem";
import { capabilities } from "@/content/capabilities";
import { cn } from "@/lib/utils";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

/** Scroll distance per capability. 3 × 150vh ≈ the reference's 550vh for 3 tabs. */
const VH_PER_STEP = 150;

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

      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px)", () => {
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
      });

      return () => mm.revert();
    },
    { scope: rootRef, dependencies: [reducedMotion] },
  );

  return (
    <>
      {/* ---- lg and up: tall spacer + sticky panel ---- */}
      {!reducedMotion && (
        <div
          ref={rootRef}
          className="relative hidden lg:block"
          style={{ height: `${capabilities.length * VH_PER_STEP}vh` }}
        >
          <div className="sticky top-[5vh] h-[90vh]">
            <div className="grid h-full grid-cols-[0.4fr_1fr] gap-6">
              {/* left: cross-fading copy */}
              <div className="relative flex flex-col justify-end rounded-sm-media bg-sm-ink-800 p-8">
                {capabilities.map((capability, index) => (
                  <div
                    key={capability.id}
                    ref={(el) => {
                      copyRefs.current[index] = el;
                    }}
                    className="absolute inset-0 flex flex-col justify-between p-8"
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

              {/* right: media rising into place */}
              <div className="relative overflow-hidden rounded-sm-media border border-white/10">
                {capabilities.map((capability, index) => (
                  <div
                    key={capability.id}
                    ref={(el) => {
                      mediaRefs.current[index] = el;
                    }}
                    className="absolute inset-0"
                  >
                    <AssetSlot
                      kind="image"
                      id={capability.asset.id}
                      alt={`${capability.label} at the clinic`}
                      caption={capability.asset.caption}
                      aspectRatio="4 / 3"
                      sizes="60vw"
                      tone="ink"
                      className="h-full w-full"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ---- below lg / reduced motion: plain stacked list ---- */}
      {/* Centred to match the section header above it — a left-ragged stack
          under a centred header reads as two different layouts. */}
      <div className={cn("flex flex-col gap-14 text-center", !reducedMotion && "lg:hidden")}>
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
            <AssetSlot
              kind="image"
              id={capability.asset.id}
              alt={`${capability.label} at the clinic`}
              caption={capability.asset.caption}
              aspectRatio="4 / 3"
              sizes="90vw"
              tone="ink"
              className="mt-6 w-full rounded-sm-media border border-white/10"
            />
          </article>
        ))}
      </div>
    </>
  );
}
