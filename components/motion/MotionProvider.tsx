"use client";

import { useReducedMotion } from "@/hooks/useReducedMotion";
import { createContext, useContext, type ReactNode } from "react";

const ReducedMotionContext = createContext(false);

/**
 * Single place `prefers-reduced-motion` is distributed from. Reveal,
 * RevealLines, Counter, Marquee and ProcessLoop all consume this instead of
 * re-reading the media query themselves.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  const reducedMotion = useReducedMotion();
  return <ReducedMotionContext.Provider value={reducedMotion}>{children}</ReducedMotionContext.Provider>;
}

export function useIsReducedMotion() {
  return useContext(ReducedMotionContext);
}
