"use client";

import { useIsReducedMotion } from "@/components/motion/MotionProvider";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

gsap.registerPlugin(ScrollTrigger);

const LenisContext = createContext<Lenis | null>(null);

/** The shared Lenis instance — null under reduced motion, where it never mounts. */
export function useLenis() {
  return useContext(LenisContext);
}

/**
 * The canonical Lenis↔ScrollTrigger sync: one instance, one RAF loop, mounted
 * once at the route root. Reduced-motion users get native scrolling — Lenis is
 * never instantiated for them, rather than instantiated and slowed down.
 */
export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null);
  const reducedMotion = useIsReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;

    const instance = new Lenis({
      duration: 1.1,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.2,
      syncTouch: false,
    });

    instance.on("scroll", ScrollTrigger.update);

    const tick = (time: number) => instance.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    setLenis(instance);

    document.fonts.ready.then(() => ScrollTrigger.refresh());

    return () => {
      gsap.ticker.remove(tick);
      instance.destroy();
      setLenis(null);
    };
  }, [reducedMotion]);

  return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>;
}
