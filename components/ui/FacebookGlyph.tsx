/**
 * A minimal outline Facebook mark, drawn to match the 1.5px monoline icon set.
 *
 * lucide dropped its brand icons, so there is nothing to import — and the
 * positional fallback that used to cover for that was silently rendering a
 * printer next to the Facebook label.
 */
export function FacebookGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.5" />
      {/* the "f": stem drops from a shoulder at the top right, one crossbar */}
      <path
        d="M14.9 8.3h-1.7c-1 0-1.7.7-1.7 1.7v10.6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M9.5 13.1h5.4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
