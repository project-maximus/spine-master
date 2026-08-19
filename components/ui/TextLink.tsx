import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

/**
 * The secondary-CTA text link. Underline wipes in from origin-left on hover —
 * the same 200ms gesture the nav links use.
 */
export function TextLink({
  href,
  children,
  onInk = false,
  className,
}: {
  href: string;
  children: string;
  onInk?: boolean;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "group relative inline-flex items-center gap-1.5 pb-1 text-sm-button font-semibold",
        onInk ? "text-sm-text-inv" : "text-sm-text",
        className,
      )}
    >
      {children}
      <ArrowUpRight
        className="size-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        strokeWidth={1.5}
        aria-hidden="true"
      />
      <span
        className={cn(
          "absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 transition-transform duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100",
          onInk ? "bg-sm-white" : "bg-sm-ink-950",
        )}
        aria-hidden="true"
      />
    </Link>
  );
}
