import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { forwardRef, type ComponentPropsWithoutRef } from "react";

type Variant = "primary" | "primaryInk" | "secondary" | "secondaryInk";
type Size = "md" | "lg";

/** Variants as lookup objects — never nested ternaries. */
const variants: Record<Variant, string> = {
  // Light surfaces: the logo red carries white text at 4.73:1 — AA.
  primary: "bg-sm-red-600 text-sm-white hover:bg-sm-red-700",
  // Ink surfaces: invert rather than tint, so the red stays a rare accent.
  primaryInk: "bg-sm-white text-sm-ink-950 hover:bg-sm-bone",
  secondary: "border border-sm-ink-950/20 text-sm-text hover:bg-sm-ink-950/[0.04]",
  secondaryInk: "border border-white/25 text-sm-text-inv hover:bg-white/10",
};

const sizes: Record<Size, string> = {
  md: "h-11 px-6",
  lg: "h-12 px-7",
};

const base =
  "group inline-flex shrink-0 items-center justify-center gap-2 rounded-full text-sm-button font-semibold transition-[background-color,border-color,transform,color] duration-150 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-px";

interface ButtonBaseProps {
  variant?: Variant;
  size?: Size;
  className?: string;
  /** The trailing ↗ that every CTA on the reference carries. */
  withArrow?: boolean;
}

export interface ButtonLinkProps extends ButtonBaseProps, Omit<ComponentPropsWithoutRef<"a">, "ref"> {
  href: string;
}

export const ButtonLink = forwardRef<HTMLAnchorElement, ButtonLinkProps>(function ButtonLink(
  { href, variant = "primary", size = "md", className, withArrow = true, children, ...rest },
  ref,
) {
  const external = href.startsWith("http") || href.startsWith("tel:") || href.startsWith("mailto:");
  const content = (
    <>
      {children}
      {withArrow && <Arrow />}
    </>
  );
  const classes = cn(base, variants[variant], sizes[size], className);

  if (external) {
    return (
      <a ref={ref} href={href} className={classes} {...rest}>
        {content}
      </a>
    );
  }

  return (
    <Link ref={ref} href={href} className={classes} {...rest}>
      {content}
    </Link>
  );
});

export interface ButtonProps extends ButtonBaseProps, ComponentPropsWithoutRef<"button"> {}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = "primary", size = "md", className, withArrow = false, children, type = "button", ...rest },
  ref,
) {
  return (
    <button ref={ref} type={type} className={cn(base, variants[variant], sizes[size], className)} {...rest}>
      {children}
      {withArrow && <Arrow />}
    </button>
  );
});

function Arrow() {
  return (
    <ArrowUpRight
      className="size-4 transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
      strokeWidth={1.5}
      aria-hidden="true"
    />
  );
}
