"use client";

import { useIsReducedMotion } from "@/components/motion/MotionProvider";
import { cn } from "@/lib/utils";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef, useState } from "react";

gsap.registerPlugin(ScrollTrigger);

export interface CounterProps {
  value: number;
  decimals?: number;
  /** Static sibling — never tweened. */
  suffix?: string;
  className?: string;
}

/**
 * GSAP tween of a `{ val }` proxy, 900ms quint.out, fires once at top 85%.
 * The animating span is aria-hidden; the final value is exposed once in
 * visually-hidden text so screen readers never hear a counting number.
 */
export function Counter({ value, decimals = 0, suffix, className }: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const reducedMotion = useIsReducedMotion();
  const [display, setDisplay] = useState(0);

  const format = (n: number) =>
    n.toLocaleString("en-US", {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    });

  useGSAP(
    () => {
      if (!ref.current) return;
      if (reducedMotion) {
        setDisplay(value);
        return;
      }
      const proxy = { val: 0 };
      gsap.to(proxy, {
        val: value,
        duration: 0.9,
        ease: "quint.out",
        scrollTrigger: { trigger: ref.current, start: "top 85%", once: true },
        onUpdate: () => setDisplay(proxy.val),
      });
    },
    { scope: ref, dependencies: [reducedMotion, value] },
  );

  return (
    <span ref={ref} className={cn("tnum", className)}>
      <span aria-hidden="true">
        {format(display)}
        {suffix}
      </span>
      <span className="sr-only">
        {format(value)}
        {suffix}
      </span>
    </span>
  );
}
