import { cn } from "@/lib/utils";
import type { ElementType, ReactNode } from "react";

/** 1600px max width, gutters 20 / 40 / 48. Every section's content sits in one. */
export function Container({
  children,
  className,
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: ElementType;
}) {
  const Component = Tag as ElementType;
  return (
    <Component className={cn("mx-auto w-full max-w-[1600px] px-5 md:px-10 lg:px-12", className)}>
      {children}
    </Component>
  );
}

/**
 * Vertical section rhythm: 96 / 128 / 160. Padding lives on the <section>
 * itself, never on its first child — no margin-collapsing between sections.
 */
export function Section({
  children,
  className,
  id,
  tone = "bone",
  ...rest
}: {
  children: ReactNode;
  className?: string;
  id?: string;
  tone?: "bone" | "mist" | "ink" | "white";
  "aria-label"?: string;
}) {
  const tones = {
    bone: "bg-sm-bone text-sm-text",
    mist: "bg-sm-mist text-sm-text",
    white: "bg-sm-white text-sm-text",
    // Ink panels carry a rounded top edge so they read as a card rising over
    // the light surface above them, matching the hero frame's radius.
    ink: "on-ink rounded-t-sm-frame bg-sm-ink-950 text-sm-text-inv",
  } as const;

  return (
    <section id={id} className={cn("py-24 md:py-32 lg:py-40", tones[tone], className)} {...rest}>
      {children}
    </section>
  );
}
