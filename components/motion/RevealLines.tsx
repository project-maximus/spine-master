"use client";

import { useIsReducedMotion } from "@/components/motion/MotionProvider";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useRef, type ElementType, type ReactNode } from "react";

gsap.registerPlugin(ScrollTrigger, SplitText);

export interface RevealLinesProps {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  /** Hero mode — runs after fonts.ready instead of on scroll. */
  onLoad?: boolean;
  delay?: number;
}

/**
 * Headline line-mask reveal: SplitText by lines only (chars/words read as
 * template), each line rising 110% → 0 on an 80ms stagger. The split is
 * reverted onComplete so selection and screen readers get normal text.
 */
export function RevealLines({
  children,
  as: Tag = "h2",
  className,
  onLoad = false,
  delay = 0,
}: RevealLinesProps) {
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
        const split = SplitText.create(el, { type: "lines", mask: "lines" });
        gsap.from(split.lines, {
          yPercent: 110,
          duration: 0.9,
          ease: "quint.out",
          stagger: 0.08,
          delay,
          ...(onLoad ? {} : { scrollTrigger: { trigger: el, start: "top 85%", once: true } }),
          onComplete: () => split.revert(),
        });
        // Lines already carry their "from" transform — safe to unhide now.
        gsap.set(el, { autoAlpha: 1 });
      };

      if (onLoad) {
        document.fonts.ready.then(run);
      } else {
        run();
      }
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
