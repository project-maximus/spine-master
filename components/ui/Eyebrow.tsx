import { cn } from "@/lib/utils";

/**
 * The brand's signature device. The `//` prefix is rendered here and never
 * typed into a content string, so it can never be dropped or varied.
 * Eyebrows are <p> — they are labels and must not enter the document outline.
 */
export function Eyebrow({ children, className }: { children: string; className?: string }) {
  return (
    <p
      className={cn(
        "font-sm-mono text-sm-eyebrow uppercase text-sm-text-2",
        className,
      )}
    >
      <span aria-hidden="true">{"// "}</span>
      {children}
    </p>
  );
}
