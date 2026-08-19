import { PlusPill } from "@/components/ui/PlusItem";
import { homeCopy } from "@/content/copy";

/**
 * The benefit row, threaded onto the hero frame's inner glass rectangle: the
 * pills sit centred on the rectangle's bottom rule so the line runs between
 * them and continues out to the right, disappearing behind the portrait.
 *
 * Deliberately draws NO rule of its own — the rectangle's border is the line.
 * Drawing one here as well put two rules a pixel apart.
 */
export function BenefitTicker() {
  return (
    // Centred below md, where the row sits in flow under the hero copy; from md
    // it is threaded onto the glass rule and starts at the left.
    <ul className="flex flex-wrap items-center justify-center gap-2.5 md:justify-start md:gap-3">
      {homeCopy.hero.benefits.map((benefit) => (
        <li key={benefit} className="flex">
          <PlusPill tone="ink">{benefit}</PlusPill>
        </li>
      ))}
    </ul>
  );
}
