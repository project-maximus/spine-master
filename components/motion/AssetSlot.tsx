import { cn } from "@/lib/utils";
import { ImageIcon } from "lucide-react";
import Image from "next/image";

interface BaseProps {
  /** Stable key so the real asset drops in later without touching layout. */
  id: string;
  aspectRatio: string;
  /** Describes the intended shot until real media exists. */
  caption: string;
  className?: string;
  tone?: "mist" | "ink";
}

interface ImageSlotProps extends BaseProps {
  kind: "image";
  src?: string;
  alt: string;
  /** Accurate per-breakpoint sizes — never "100vw" on a constrained image. */
  sizes: string;
  priority?: boolean;
}

interface VideoSlotProps extends BaseProps {
  kind: "video";
  src?: string;
  poster?: string;
}

export type AssetSlotProps = ImageSlotProps | VideoSlotProps;

/**
 * Fixed aspect-ratio media box. Until a real `src` is supplied it renders a
 * monoline glyph plus a caption describing the shot, so final photography
 * drops in with zero layout shift. Photography is desaturated on the way in
 * (saturate .85 / contrast 1.04) — clinical, not warm.
 */
export function AssetSlot(props: AssetSlotProps) {
  const { id, aspectRatio, caption, className, tone = "mist" } = props;

  if (props.kind === "image" && props.src) {
    return (
      <div className={cn("relative overflow-hidden", className)} style={{ aspectRatio }} data-asset-slot={id}>
        <Image
          src={props.src}
          alt={props.alt}
          fill
          sizes={props.sizes}
          priority={props.priority}
          className="object-cover"
          style={{ filter: "saturate(0.85) contrast(1.04)" }}
        />
      </div>
    );
  }

  if (props.kind === "video" && props.src) {
    return (
      <div className={cn("relative overflow-hidden", className)} style={{ aspectRatio }} data-asset-slot={id}>
        <video
          className="h-full w-full object-cover"
          style={{ filter: "saturate(0.85) contrast(1.04)" }}
          src={props.src}
          poster={props.poster}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
        />
      </div>
    );
  }

  return (
    <div
      className={cn(
        "relative flex flex-col items-center justify-center gap-3 overflow-hidden",
        tone === "ink" ? "bg-sm-ink-800" : "bg-sm-mist",
        className,
      )}
      style={{ aspectRatio }}
      data-asset-slot={id}
    >
      <ImageIcon
        className={cn("size-8", tone === "ink" ? "text-sm-text-inv-3" : "text-sm-text-3")}
        strokeWidth={1.5}
        aria-hidden="true"
      />
      <p
        className={cn(
          "max-w-[32ch] px-6 text-center font-sm-mono text-[11px] font-medium uppercase tracking-[0.1em]",
          tone === "ink" ? "text-sm-text-inv-3" : "text-sm-text-3",
        )}
      >
        {caption}
      </p>
    </div>
  );
}
