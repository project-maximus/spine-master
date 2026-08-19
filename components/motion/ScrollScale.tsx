"use client";

import { useIsReducedMotion } from "@/components/motion/MotionProvider";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef, type ReactNode } from "react";

gsap.registerPlugin(ScrollTrigger);

/**
 * Media that settles as it enters: scrubbed scale from `from` down to 1 while
 * the element crosses the viewport. The reference uses this on its product
 * renders so the media appears to come to rest rather than simply appear.
 *
 * Wrapped in an overflow-hidden host so the oversized start state cannot widen
 * the layout or produce a horizontal scrollbar.
 */
export function ScrollScale({
  children,
  from = 1.12,
  className,
}: {
  children: ReactNode;
  from?: number;
  className?: string;
}) {
  const hostRef = useRef<HTMLDivElement>(null);
  const targetRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useIsReducedMotion();

  useGSAP(
    () => {
      if (!targetRef.current || reducedMotion) return;

      gsap.fromTo(
        targetRef.current,
        { scale: from },
        {
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: hostRef.current,
            start: "top bottom",
            end: "bottom 60%",
            scrub: true,
          },
        },
      );
    },
    { scope: hostRef, dependencies: [reducedMotion] },
  );

  return (
    <div ref={hostRef} className={className} style={{ overflow: "hidden" }}>
      <div ref={targetRef} className="h-full w-full">
        {children}
      </div>
    </div>
  );
}
