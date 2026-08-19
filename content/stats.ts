import { site } from "./site";

export interface CounterStat {
  label: string;
  value: number;
  decimals?: number;
  suffix?: string;
  caption: string;
  placeholder?: boolean;
}

/** S11 — the three tweened counters in the trust band. */
export const trustCounters: readonly CounterStat[] = [
  {
    label: "Google Rating",
    value: site.reviews.rating,
    decimals: 1,
    suffix: " / 5",
    caption: `From ${site.reviews.count} reviews`,
  },
  {
    label: "Patients Treated",
    value: 5000,
    suffix: "+",
    caption: "Since opening",
    placeholder: true,
  },
  {
    label: "Years in Practice",
    value: 10,
    suffix: "+",
    caption: "Spine and joints",
    placeholder: true,
  },
] as const;
