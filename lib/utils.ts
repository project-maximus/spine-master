import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

/**
 * tailwind-merge has to be taught this token namespace. Without it, it cannot
 * tell `text-sm-h2` (a size) from `text-sm-red-600` (a colour) — it assumes
 * both belong to the same group and silently drops the earlier one, which
 * quietly collapses headings to body size. Same story for `font-sm-display`
 * (a family) against `font-semibold` (a weight).
 */
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [
        {
          text: [
            "sm-display-xl",
            "sm-display",
            "sm-h1",
            "sm-h2",
            "sm-h3",
            "sm-h4",
            "sm-eyebrow",
            "sm-body-lg",
            "sm-body",
            "sm-small",
            "sm-caption",
            "sm-stat",
            "sm-button",
          ],
        },
      ],
      "font-family": [{ font: ["sm-sans", "sm-display", "sm-mono"] }],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
