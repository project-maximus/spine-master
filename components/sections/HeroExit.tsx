"use client";

import { useIsReducedMotion } from "@/components/motion/MotionProvider";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef, type ReactNode } from "react";

gsap.registerPlugin(ScrollTrigger);

/**
 * The hero's exit: it leaves upward, faster than the page scrolls.
 *
 * The frame is pulled up ~160px across its own scroll span while the text
 * column is pulled up further still. Both are moving in the same direction as
 * the scroll, so the hero reads as travelling up and off — never held in place,
 * never faded or shrunk out. The difference in rate between the frame and the
 * text is what gives the exit depth.
 *
 * The gap the frame leaves behind is bone-on-bone against the section that
 * follows, so the faster travel is invisible as a seam.
 */
export function HeroExit({ children }: { children: ReactNode }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useIsReducedMotion();

  useGSAP(
    () => {
      if (reducedMotion) return;

      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: rootRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 0.6,
          },
        });

        timeline
          .to("[data-hero-frame]", { y: -160, ease: "none" }, 0)
          .to("[data-hero-content]", { y: -90, ease: "none" }, 0);

        return () => timeline.kill();
      });

      return () => mm.revert();
    },
    { scope: rootRef, dependencies: [reducedMotion] },
  );

  return <div ref={rootRef}>{children}</div>;
}
