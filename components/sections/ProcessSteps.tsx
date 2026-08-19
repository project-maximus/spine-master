"use client";

import { processSteps } from "@/content/process";
import type { RefObject } from "react";

/**
 * The four steps as labelled circles.
 *
 * Deliberately unconnected: the cue for "which step am I on" is the curve
 * running from the active circle down to the description, not a rail between
 * the circles. A rail here competed with those curves for the same job.
 *
 * Refs are handed down so the scroll driver can write straight to the DOM;
 * nothing here holds state, so scrolling never queues a React render.
 */
export function ProcessSteps({
  circleRefs,
  labelRefs,
}: {
  circleRefs: RefObject<(HTMLSpanElement | null)[]>;
  labelRefs: RefObject<(HTMLSpanElement | null)[]>;
}) {
  return (
    <ol className="relative grid w-full grid-cols-4">
      {processSteps.map((step, index) => (
        <li key={step.number} className="flex flex-col items-center gap-3">
          <span
            ref={(el) => {
              labelRefs.current[index] = el;
            }}
            // 10px with no tracking below md: at 390px a quarter-column is
            // ~87px, and "REHABILITATE" in tracked 12px mono overruns it and
            // collides with its neighbour.
            className="px-1 text-center font-sm-mono text-[10px] uppercase leading-tight text-sm-text-inv-3 transition-colors md:text-sm-eyebrow md:tracking-[0.08em]"
          >
            {step.title}
          </span>
          <span
            ref={(el) => {
              circleRefs.current[index] = el;
            }}
            className="flex size-14 items-center justify-center rounded-full border border-white/20 bg-sm-ink-950 transition-colors md:size-[72px]"
          >
            <span className="tnum font-sm-mono text-sm-caption text-sm-text-inv-3">{step.number}</span>
          </span>
        </li>
      ))}
    </ol>
  );
}
