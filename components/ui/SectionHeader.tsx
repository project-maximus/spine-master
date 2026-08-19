import { Reveal } from "@/components/motion/Reveal";
import { RevealLines } from "@/components/motion/RevealLines";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { TextLink } from "@/components/ui/TextLink";
import { cn } from "@/lib/utils";

type Align = "split" | "center" | "stacked";
type Heading = "ink" | "accent";

const headingTone: Record<Heading, string> = {
  ink: "text-sm-text",
  // One accent for headings on either surface — the logo red, same value as
  // the buttons. H2 sits at 28–38px, so it clears the 3:1 large-text bar on
  // both bone and ink.
  accent: "text-sm-red-600",
};

export interface SectionHeaderProps {
  eyebrow: string;
  heading: string;
  body: string;
  /** Optional single text link — the only one a section header may carry. */
  linkLabel?: string;
  linkHref?: string;
  align?: Align;
  heading_tone?: Heading;
  onInk?: boolean;
  className?: string;
}

/**
 * The rigid section grammar the whole page obeys: `//` eyebrow → H2 → exactly
 * one paragraph → at most one text link. Every content section uses this; no
 * section invents its own arrangement.
 */
export function SectionHeader({
  eyebrow,
  heading,
  body,
  linkLabel,
  linkHref,
  align = "split",
  heading_tone = "ink",
  onInk = false,
  className,
}: SectionHeaderProps) {
  const centered = align === "center";
  const stacked = align === "stacked";
  /** Both non-split variants render as one flow rather than two grid columns. */
  const single = centered || stacked;

  return (
    <div
      className={cn(
        centered && "mx-auto flex max-w-3xl flex-col items-center text-center",
        // Below lg every header centres: on a narrow column a left-ragged
        // eyebrow/heading/body/link stack reads as debris down one edge, and
        // the copy here is short enough that centring stays comfortable.
        stacked && "flex flex-col items-center text-center lg:items-start lg:text-left",
        !single && "grid gap-8 text-center lg:grid-cols-12 lg:gap-16 lg:text-left",
        className,
      )}
    >
      <div className={cn(single ? "contents" : "lg:col-span-7")}>
        <Reveal>
          <Eyebrow className={onInk ? "text-sm-text-inv-2" : undefined}>{eyebrow}</Eyebrow>
        </Reveal>
        <RevealLines
          as="h2"
          className={cn(
            "mt-5 font-sm-display text-sm-h2 text-balance",
            headingTone[heading_tone],
            centered && "mx-auto max-w-[20ch]",
          )}
        >
          {heading}
        </RevealLines>
      </div>

      <div className={cn(single ? "contents" : "lg:col-span-5 lg:pt-3")}>
        <Reveal delay={0.06}>
          <p
            className={cn(
              // mx-auto below lg keeps the measure centred under the heading;
              // lg:mx-0 returns it to the column edge in the two-column layout.
              "mx-auto mt-6 max-w-[52ch] text-sm-body-lg lg:mx-0",
              onInk ? "text-sm-text-inv-2" : "text-sm-text-2",
              centered && "lg:mx-auto",
            )}
          >
            {body}
          </p>
        </Reveal>
        {linkLabel && linkHref && (
          <Reveal delay={0.12} className={cn("mt-7", centered && "mx-auto")}>
            <TextLink href={linkHref} onInk={onInk}>
              {linkLabel}
            </TextLink>
          </Reveal>
        )}
      </div>
    </div>
  );
}
