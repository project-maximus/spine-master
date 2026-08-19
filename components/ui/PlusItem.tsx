import { cn } from "@/lib/utils";
import type { ElementType } from "react";

/**
 * The `+` device, used in three places — benefit ticker, capability bullets
 * and the credentials row. Like `//`, the glyph is baked in here and never
 * typed into content.
 */
export function PlusItem({
  children,
  className,
  as: Tag = "li",
}: {
  children: string;
  className?: string;
  as?: ElementType;
}) {
  const Component = Tag as ElementType;
  return (
    <Component className={cn("font-sm-mono text-sm-caption uppercase tracking-[0.08em]", className)}>
      <span aria-hidden="true">+</span>
      {children}
    </Component>
  );
}

/** Pill-shaped variant used in the hero and the benefit marquee. */
export function PlusPill({
  children,
  className,
  tone = "ink",
}: {
  children: string;
  className?: string;
  tone?: "ink" | "light";
}) {
  return (
    <span
      className={cn(
        "inline-flex h-10 items-center rounded-full border px-5 font-sm-mono text-sm-caption uppercase tracking-[0.08em] whitespace-nowrap",
        // On ink these straddle the hero's glass rule, so they carry just
        // enough frosted fill to interrupt the line they sit on — the line has
        // to stop at each pill and pick up again in the gap.
        tone === "ink"
          ? "border-white/30 bg-sm-ink-900/75 text-sm-text-inv backdrop-blur-md"
          : "border-sm-line text-sm-text-2",
        className,
      )}
    >
      <span aria-hidden="true">+</span>
      {children}
    </span>
  );
}
