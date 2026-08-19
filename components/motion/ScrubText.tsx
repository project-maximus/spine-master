"use client";

import { useIsReducedMotion } from "@/components/motion/MotionProvider";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useRef, type ElementType, type ReactNode } from "react";

gsap.registerPlugin(ScrollTrigger, SplitText);

export interface ScrubTextProps {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  /** Resting opacity of not-yet-read words. */
  from?: number;
}

/**
 * The reference site's signature motion: a paragraph sits at low opacity and
 * fills in word by word, tied directly to scroll position rather than played
 * on a trigger. Reading the page *is* the animation.
 *
 * Split by WORDS, never characters — per-character fills read as a template
 * effect and are miserable for screen readers. Words stay selectable and are
 * announced normally.
 *
 * The tween is scrubbed (`scrub: 1`, one second of catch-up) across the span
 * where the block crosses the middle of the viewport, so it reverses cleanly
 * when the user scrolls back up.
 */
export function ScrubText({ children, as: Tag = "p", className, from = 0.16 }: ScrubTextProps) {
  const ref = useRef<HTMLElement>(null);
  const reducedMotion = useIsReducedMotion();

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;

      if (reducedMotion) {
        gsap.set(el, { autoAlpha: 1 });
        return;
      }

      const run = () => {
        const split = SplitText.create(el, { type: "words" });
        gsap.set(el, { autoAlpha: 1 });
        gsap.set(split.words, { opacity: from });

        gsap.to(split.words, {
          opacity: 1,
          ease: "none",
          stagger: 0.5,
          scrollTrigger: {
            trigger: el,
            start: "top 75%",
            end: "bottom 55%",
            scrub: 1,
          },
        });
      };

      // Word boxes are measured at split time — wait for the real face.
      document.fonts.ready.then(run);
    },
    { scope: ref, dependencies: [reducedMotion] },
  );

  const Component = Tag as ElementType;
  return (
    <Component ref={ref} className={className} style={{ visibility: "hidden" }}>
      {children}
    </Component>
  );
}
