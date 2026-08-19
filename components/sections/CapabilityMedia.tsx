import { capabilities } from "@/content/capabilities";
import Image from "next/image";

/**
 * The photograph for one capability panel, graded into the brand.
 *
 * These are licensed stock, NOT this clinic — so the alt text describes what
 * the picture literally shows and never claims it is Dr. Ahmad or his rooms.
 * Getting that wrong is how the hero ended up telling screen readers a stock
 * portrait was the practitioner.
 *
 * The grade is what makes a stock photo sit in an ink panel instead of
 * floating on top of it: desaturate hard, drop the brightness, then lay a
 * brand-red wash over the result so the greys pick up the accent rather than
 * reading as a neutral photo pasted into a red-and-black page.
 */
export function CapabilityMedia({ id, sizes }: { id: string; sizes: string }) {
  const capability = capabilities.find((c) => c.id === id);
  if (!capability) return null;

  return (
    <div className="relative h-full w-full overflow-hidden">
      <Image
        src={`/images/${capability.asset.id}.jpg`}
        alt={capability.asset.caption}
        fill
        sizes={sizes}
        className="object-cover opacity-80"
        style={{ filter: "grayscale(1) contrast(1.05) brightness(0.5)" }}
      />
      {/* No red wash. Both a flat red fill and an `overlay` blend pushed the
          bright areas of these photos — white coats, lit walls — to pink. Dark
          neutral monochrome sits in the panel cleanly and lets the red stay
          where it belongs: the type and the rules. */}
      {/* sinks the photo into the panel so it has no hard photographic edge */}
      <div className="absolute inset-0 bg-gradient-to-t from-sm-ink-950 via-sm-ink-950/45 to-sm-ink-950/25" aria-hidden="true" />
    </div>
  );
}
