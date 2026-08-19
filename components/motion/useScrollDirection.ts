"use client";

import { useEffect, useRef, useState } from "react";
import { useLenis } from "./SmoothScrollProvider";

/** Travel in one direction required before the bar commits to hiding/showing. */
const COMMIT_DISTANCE = 24;
/** Below this the reader has barely left the top; keep the bar put. */
const HIDE_AFTER = 150;

/**
 * The header's scroll state.
 *
 * Direction is measured by ACCUMULATED travel, not per-frame delta. Lenis
 * emits at frame rate, so an unhurried scroll arrives as a stream of 1–3px
 * steps: a per-frame threshold never trips on them (the bar would refuse to
 * hide until you flicked), and no threshold at all means the settle frames at
 * the end of a glide report ~0 and pop the bar straight back.
 *
 * Accumulating until the reader has actually travelled `COMMIT_DISTANCE` in one
 * direction — and resetting the moment they turn around — handles both.
 *
 * Reads through the shared Lenis subscription; the native listener is a
 * fallback for the reduced-motion path where Lenis never runs. This is the only
 * scroll listener in the app.
 */
export function useScrollDirection(threshold = 24) {
  const lenis = useLenis();
  const [hidden, setHidden] = useState(false);
  const [pastThreshold, setPastThreshold] = useState(false);
  const lastY = useRef(0);
  const travelled = useRef(0);

  useEffect(() => {
    const evaluate = (y: number) => {
      setPastThreshold(y > threshold);

      const delta = y - lastY.current;
      lastY.current = y;
      if (delta === 0) return;

      // Turned around? Start counting this direction from scratch.
      if (delta > 0 !== travelled.current > 0) travelled.current = 0;
      travelled.current += delta;

      if (travelled.current > COMMIT_DISTANCE && y > HIDE_AFTER) {
        setHidden(true);
      } else if (travelled.current < -COMMIT_DISTANCE || y <= HIDE_AFTER) {
        setHidden(false);
      }
    };

    if (lenis) {
      const onScroll = () => evaluate(window.scrollY);
      lenis.on("scroll", onScroll);
      return () => {
        lenis.off("scroll", onScroll);
      };
    }

    const onNativeScroll = () => evaluate(window.scrollY);
    onNativeScroll();
    window.addEventListener("scroll", onNativeScroll, { passive: true });
    return () => window.removeEventListener("scroll", onNativeScroll);
  }, [lenis, threshold]);

  return { hidden, pastThreshold };
}
