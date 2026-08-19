"use client";

import { useIsReducedMotion } from "@/components/motion/MotionProvider";
import { cn } from "@/lib/utils";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef, type ElementType, type ReactNode } from "react";

gsap.registerPlugin(ScrollTrigger);

export interface RevealProps {
  children: ReactNode;
  className?: string;
  as?: ElementType;
  /** Stagger offset in seconds for grouped reveals (spec: 60–100ms). */
  delay?: number;
}

/**
 * The standard scroll reveal: autoAlpha + 24px rise, 600ms quint.out, once.
 * The hidden state is a CSS class rather than an inline style, so the content
 * is in the DOM for non-JS and assistive tech and never flashes.
 */
export function Reveal({ children, className, as: Tag = "div", delay = 0 }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = useIsReducedMotion();

  useGSAP(
    () => {
      if (!ref.current) return;
      if (reducedMotion) {
        gsap.set(ref.current, { autoAlpha: 1, y: 0 });
        return;
      }
      gsap.from(ref.current, {
        autoAlpha: 0,
        y: 24,
        duration: 0.6,
        delay,
        ease: "quint.out",
        scrollTrigger: { trigger: ref.current, start: "top 85%", once: true },
      });
    },
    { scope: ref, dependencies: [reducedMotion] },
  );

  const Component = Tag as ElementType;
  return (
    <Component ref={ref} className={cn("gsap-hidden", className)}>
      {children}
    </Component>
  );
}
