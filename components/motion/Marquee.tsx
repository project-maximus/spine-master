"use client";

import { useIsReducedMotion } from "@/components/motion/MotionProvider";
import { cn } from "@/lib/utils";
import { Pause, Play } from "lucide-react";
import { useState, type ReactNode } from "react";

export interface MarqueeProps {
  children: ReactNode;
  /** Seconds for one full pass. Benefit/logo/keyword 28s, testimonials 60s. */
  duration?: number;
  className?: string;
  trackClassName?: string;
  /** Accessible name for the region and its pause control. */
  label: string;
  tone?: "light" | "ink";
}

/**
 * CSS-only marquee: doubled track translated -50%, linear infinite.
 *
 * Hover-pause alone fails WCAG 2.2.2 for touch and keyboard users, so there is
 * always a real pause button as well. Under reduced motion the animation is
 * off in CSS and the control is not rendered at all.
 */
export function Marquee({
  children,
  duration = 28,
  className,
  trackClassName,
  label,
  tone = "light",
}: MarqueeProps) {
  const reducedMotion = useIsReducedMotion();
  const [paused, setPaused] = useState(false);

  return (
    <div
      className={cn("sm-marquee-root relative flex items-center overflow-hidden", className)}
      role="region"
      aria-label={label}
    >
      <div
        className={cn("sm-marquee-track", trackClassName)}
        style={
          {
            "--sm-marquee-duration": `${duration}s`,
            "--sm-marquee-state": paused ? "paused" : "running",
          } as React.CSSProperties
        }
      >
        {/* The track is duplicated so the -50% translate loops seamlessly. The
            copy is hidden from assistive tech to avoid reading it twice. */}
        {children}
        <div aria-hidden="true" className="flex">
          {children}
        </div>
      </div>

      {!reducedMotion && (
        <button
          type="button"
          onClick={() => setPaused((value) => !value)}
          aria-label={paused ? `Play ${label}` : `Pause ${label}`}
          className={cn(
            "absolute right-3 z-10 flex size-8 items-center justify-center rounded-full border transition-colors duration-150",
            tone === "ink"
              ? "border-white/20 bg-sm-ink-900/80 text-sm-text-inv-2 hover:text-sm-text-inv"
              : "border-sm-line bg-sm-bone/85 text-sm-text-2 hover:text-sm-text",
          )}
        >
          {paused ? (
            <Play className="size-3.5" strokeWidth={1.5} aria-hidden="true" />
          ) : (
            <Pause className="size-3.5" strokeWidth={1.5} aria-hidden="true" />
          )}
        </button>
      )}
    </div>
  );
}
