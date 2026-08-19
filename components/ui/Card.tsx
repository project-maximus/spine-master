import { cn } from "@/lib/utils";
import type { ElementType, ReactNode } from "react";

/**
 * The one card treatment: 12px radius, hairline border, hairline shadow on
 * light. On ink it becomes a white/10 border over a white/[0.06] wash — the
 * only two card surfaces that exist.
 */
export function Card({
  children,
  className,
  tone = "light",
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  tone?: "light" | "ink";
  as?: ElementType;
}) {
  const Component = Tag as ElementType;
  return (
    <Component
      className={cn(
        "rounded-sm-card",
        tone === "ink"
          ? "border border-white/10 bg-white/[0.06]"
          : "border border-sm-line bg-sm-white shadow-sm-card",
        className,
      )}
    >
      {children}
    </Component>
  );
}
