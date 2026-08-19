import { site } from "@/content/site";
import { cn } from "@/lib/utils";
import Image from "next/image";

/**
 * The supplied logo, composed once into a horizontal lockup (mark + the
 * logo's own wordmark) and a standalone mark, each in a light-surface and an
 * ink-surface variant. The red line-work is identical across all four; only
 * the black line-work flips to white.
 */

export function LogoLockup({ onInk = false, className }: { onInk?: boolean; className?: string }) {
  return (
    <Image
      src={onInk ? "/logo/spinemaster-lockup-h-white.png" : "/logo/spinemaster-lockup-h.png"}
      alt={`${site.name} — ${site.practitioner}`}
      width={2091}
      height={400}
      priority
      className={cn("w-auto", className)}
    />
  );
}

export function LogoMark({ onInk = false, className }: { onInk?: boolean; className?: string }) {
  return (
    <Image
      src={onInk ? "/logo/spinemaster-mark-white.png" : "/logo/spinemaster-mark.png"}
      alt=""
      width={512}
      height={304}
      className={cn("w-auto", className)}
    />
  );
}
