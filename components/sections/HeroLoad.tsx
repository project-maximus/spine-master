"use client";

import { useIsReducedMotion } from "@/components/motion/MotionProvider";
import { cn } from "@/lib/utils";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef, type ReactNode } from "react";

/**
 * One step of the hero load sequence. Delays are set by the caller so the
 * steps overlap exactly as specified: media (900ms) → headline at 0.30s →
 * CTA at 0.65s → benefit row at 0.95s. Everything waits on fonts.ready so
 * the sequence never races the webfont swap.
 */
export function HeroLoad({
  children,
  delay = 0,
  scale = false,
  className,
}: {
  children: ReactNode;
  delay?: number;
  /** Media-only: 1.06 → 1 alongside the fade. */
  scale?: boolean;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = useIsReducedMotion();

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;

      if (reducedMotion) {
        gsap.set(el, { autoAlpha: 1, y: 0, scale: 1 });
        return;
      }

      document.fonts.ready.then(() => {
        gsap.to(el, {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration: scale ? 0.9 : 0.6,
          delay,
          ease: "quint.out",
        });
      });
    },
    { scope: ref, dependencies: [reducedMotion] },
  );

  return (
    <div
      ref={ref}
      className={cn("gsap-hidden", className)}
      style={scale ? { transform: "scale(1.06)" } : { transform: "translateY(16px)" }}
    >
      {children}
    </div>
  );
}
