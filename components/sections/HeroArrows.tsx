/**
 * The reference's corner motif: four thin up-right arrows in a 2×2 block,
 * sitting in the top-right of the hero frame. Purely decorative — it exists to
 * stop the frame's empty upper corner reading as an accident.
 */
export function HeroArrows() {
  return (
    <div
      className="pointer-events-none absolute right-10 top-10 hidden grid-cols-2 gap-3 lg:grid xl:right-14 xl:top-14"
      aria-hidden="true"
    >
      {Array.from({ length: 4 }).map((_, index) => (
        <svg
          key={index}
          width="52"
          height="52"
          viewBox="0 0 52 52"
          fill="none"
          // Held back to a watermark: unlike the reference, this frame's
          // top-right corner is occupied by the portrait, so a full-strength
          // motif here would fight the face rather than fill dead space.
          className="text-sm-red-600/45"
        >
          <path
            d="M6 46 L44 8"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="square"
          />
          <path
            d="M20 8 H44 V32"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="square"
            strokeLinejoin="miter"
          />
        </svg>
      ))}
    </div>
  );
}
