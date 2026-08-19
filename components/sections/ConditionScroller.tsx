"use client";

import { conditions } from "@/content/conditions";
import { homeCopy } from "@/content/copy";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

/**
 * S8. Native horizontal scroll with x-mandatory snap — no scroll hijacking.
 * The arrows are a convenience on top of a region that is already fully
 * keyboard operable: every card is a link and the track is a labelled,
 * tabbable scroll container.
 *
 * Each card is a full-bleed photograph with the condition named at the foot.
 * Pointing at it swaps that for the two timings set large, plus the link.
 *
 * The timings are NOT hover-only. They sit in the resting state as a mono
 * line as well, because `hover` never fires on a touch screen — a card whose
 * only numbers appear on hover is a card whose numbers a phone user never
 * sees. Hover just promotes what is already there.
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
          <Link
            key={condition.slug}
            href="#contact"
            data-condition-card
            className="sm-snap-item group relative aspect-[3/4] w-[76vw] shrink-0 overflow-hidden rounded-sm-media sm:w-[330px] lg:w-[360px]"
          >
            <Image
              src={`/images/condition-${condition.slug}.jpg`}
              alt={condition.imageCaption}
              fill
              sizes="(min-width: 1024px) 360px, (min-width: 640px) 330px, 76vw"
              className="object-cover transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
              style={{ filter: "grayscale(1) contrast(1.05) brightness(0.62)" }}
            />

            {/* base wash, deepening as the stats come up */}
            <div
              className="absolute inset-0 bg-gradient-to-t from-sm-ink-950 via-sm-ink-950/45 to-sm-ink-950/20 transition-colors duration-300 group-hover:bg-sm-ink-950/80 group-focus-visible:bg-sm-ink-950/80"
              aria-hidden="true"
            />

            {/* resting: name + timings */}
            <div className="absolute inset-x-0 bottom-0 p-6 transition-opacity duration-300 group-hover:opacity-0 group-focus-visible:opacity-0">
              <h3 className="font-sm-display text-sm-h3 text-sm-text-inv">{condition.name}</h3>
              <p className="mt-2 font-sm-mono text-sm-caption uppercase tracking-[0.1em] text-sm-text-inv-2">
                <span className="tnum">{condition.firstRelief}</span>
                <span className="mx-2 text-sm-text-inv-3" aria-hidden="true">
                  ·
                </span>
                <span className="tnum">{condition.fullPlan}</span>
              </p>
            </div>

            {/* on point: the same numbers, set large */}
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-7 p-6 text-center opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
              <div>
                <p className="tnum font-sm-display text-sm-h2 text-sm-red-600">{condition.firstRelief}</p>
                <p className="mt-2 font-sm-mono text-sm-caption uppercase tracking-[0.12em] text-sm-text-inv-2">
                  {homeCopy.conditions.withLabel}
                </p>
              </div>
              <div>
                <p className="tnum font-sm-display text-sm-h2 text-sm-text-inv">{condition.fullPlan}</p>
                <p className="mt-2 font-sm-mono text-sm-caption uppercase tracking-[0.12em] text-sm-text-inv-2">
                  {homeCopy.conditions.withoutLabel}
                </p>
              </div>
              <span className="mt-2 border-b border-sm-text-inv pb-1 font-sm-mono text-sm-caption uppercase tracking-[0.12em] text-sm-text-inv">
                Learn More
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
