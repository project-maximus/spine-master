export interface NavItem {
  label: string;
  href: string;
}

/**
 * Only the homepage exists in this build, so every destination is an in-page
 * anchor. When the inner routes land, swap the hrefs here — nothing else in
 * the app hard-codes a nav destination.
 */
export const navItems: readonly NavItem[] = [
  { label: "Treatments", href: "#treatments" },
  { label: "Conditions", href: "#conditions" },
  { label: "Process", href: "#process" },
  { label: "Reviews", href: "#reviews" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
] as const;

/** Footer link column — deliberately shorter than the header nav. */
export const footerNav: readonly NavItem[] = [
  { label: "Treatments", href: "#treatments" },
  { label: "Conditions", href: "#conditions" },
  { label: "Reviews", href: "#reviews" },
  { label: "Contact", href: "#contact" },
] as const;
