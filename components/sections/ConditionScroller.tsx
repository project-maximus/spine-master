"use client";

import { TextLink } from "@/components/ui/TextLink";
import { conditions } from "@/content/conditions";
import { homeCopy } from "@/content/copy";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useRef } from "react";

/**
 * S8. Native horizontal scroll with x-mandatory snap — no scroll hijacking.
 * The arrows are a convenience on top of a region that is already fully
 * keyboard operable: every card is focusable and the track is a labelled,
 * tabbable scroll container.
 */
export function ConditionScroller() {
  const trackRef = useRef<HTMLDivElement>(null);

  const scrollByCard = (direction: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector<HTMLElement>("[data-condition-card]");
    const amount = card ? card.offsetWidth + 20 : track.clientWidth * 0.8;
    track.scrollBy({ left: amount * direction, behavior: "smooth" });
  };

  return (
    <div>
      <div className="mb-8 flex justify-end gap-3 px-5 md:px-10 lg:px-12">
        <button
          type="button"
          onClick={() => scrollByCard(-1)}
          aria-label="Previous conditions"
          className="flex size-11 items-center justify-center rounded-full border border-white/20 text-sm-text-inv transition-colors duration-150 hover:bg-white/10"
        >
          <ArrowLeft className="size-4" strokeWidth={1.5} aria-hidden="true" />
        </button>
        <button
          type="button"
          onClick={() => scrollByCard(1)}
          aria-label="Next conditions"
          className="flex size-11 items-center justify-center rounded-full border border-white/20 text-sm-text-inv transition-colors duration-150 hover:bg-white/10"
        >
          <ArrowRight className="size-4" strokeWidth={1.5} aria-hidden="true" />
        </button>
      </div>

      <div
        ref={trackRef}
        role="region"
        aria-label="Conditions treated, scrollable"
        tabIndex={0}
        // scroll-pl must match the gutter: without it, snapping the first card
        // to the scrollport start eats the left padding and clips card one.
        className="sm-snap-x flex gap-5 overflow-x-auto px-5 pb-2 scroll-pl-5 md:px-10 md:scroll-pl-10 lg:px-12 lg:scroll-pl-12"
      >
        {conditions.map((condition) => (
          <article
            key={condition.name}
            data-condition-card
            tabIndex={0}
            className="sm-snap-item flex w-[85vw] shrink-0 flex-col justify-between gap-10 rounded-sm-card border border-sm-red-600/35 p-7 sm:w-[380px] md:p-8"
          >
            <div>
              <h3 className="font-sm-display text-sm-h3 text-sm-text-inv">{condition.name}</h3>
              <p className="mt-3 text-sm-small text-sm-text-inv-2">{condition.description}</p>
            </div>

            <div>
              <div className="flex flex-wrap items-baseline gap-x-8 gap-y-4">
                <div>
                  <p className="tnum font-sm-display text-sm-h2 text-sm-red-600">{condition.firstRelief}</p>
                  <p className="mt-1.5 font-sm-mono text-sm-caption uppercase tracking-[0.1em] text-sm-red-600">
                    {homeCopy.conditions.withLabel}
                  </p>
                </div>
                <div>
                  <p className="tnum font-sm-display text-sm-h2 text-sm-text-inv">{condition.fullPlan}</p>
                  <p className="mt-1.5 font-sm-mono text-sm-caption uppercase tracking-[0.1em] text-sm-text-inv-3">
                    {homeCopy.conditions.withoutLabel}
                  </p>
                </div>
              </div>

              <div className="mt-7">
                <TextLink href="#contact" onInk>
                  Learn More
                </TextLink>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
