"use client";

import { LogoLockup } from "@/components/layout/Logo";
import { MobileDrawer } from "@/components/layout/MobileDrawer";
import { useScrollDirection } from "@/components/motion/useScrollDirection";
import { ButtonLink } from "@/components/ui/Button";
import { navItems } from "@/content/nav";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { ArrowUpRight, Menu } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

/**
 * Transparent, and it gets out of the way: scrolling down slides the bar up
 * out of view, scrolling back up brings it straight back.
 *
 * At the very top the bar is fully transparent over the hero. Once the page has
 * moved it picks up a frosted bone wash — still see-through, but enough of one
 * that dark nav text stays legible when the bar is revealed over an ink
 * section. Fully transparent at every scroll position would make the nav
 * disappear against the dark panels.
 *
 * Only `transform`, `height`, `background-color` and `backdrop-filter` are
 * transitioned — never `all`.
 */
export function Header() {
  const { hidden, pastThreshold: scrolled } = useScrollDirection(80);
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
      <motion.header
        // The drawer owns the viewport while open — never slide the bar away
        // underneath it, or the close button leaves with it.
        animate={{
          y: hidden && !drawerOpen ? -140 : 0,
          opacity: hidden && !drawerOpen ? 0 : 1,
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className={cn(
          // Motion owns y/opacity here; CSS only transitions the properties it
          // does not touch. Driving the slide through a Tailwind class instead
          // was fragile — v4 sets the standalone `translate` property, not
          // `transform`, so the transition list silently missed it.
          "fixed inset-x-0 top-0 z-50 transition-[height,background-color,backdrop-filter] duration-[420ms] ease-[cubic-bezier(0.22,1,0.36,1)]",
          scrolled
            ? "h-[72px] border-b border-sm-line/60 bg-sm-bone/75 backdrop-blur-xl"
            : "h-[92px] border-b border-transparent bg-transparent",
        )}
      >
        <div className="mx-auto flex h-full w-full max-w-[1600px] items-center px-5 md:px-10 lg:px-12">
          <div className="grid w-full grid-cols-[auto_1fr_auto] items-center gap-4">
            <Link href="/" aria-label={`${site.name} — home`} className="flex items-center">
              <LogoLockup className={cn("transition-[height] duration-300", scrolled ? "h-7" : "h-8 md:h-9")} />
            </Link>

            <nav aria-label="Primary" className="hidden items-center justify-center gap-7 lg:flex">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group relative inline-flex items-center gap-1 py-2 text-[15px] text-sm-text-2 transition-colors duration-150 hover:text-sm-text"
                >
                  {item.label}
                  <ArrowUpRight
                    className="size-3.5 text-sm-red-600 transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    strokeWidth={1.5}
                    aria-hidden="true"
                  />
                  <span
                    className="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-sm-ink-950 transition-transform duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100"
                    aria-hidden="true"
                  />
                </Link>
              ))}
            </nav>

            <div className="flex items-center justify-end gap-3">
              <ButtonLink href="#contact" className={cn("hidden sm:inline-flex", scrolled && "h-10 px-5")}>
                {site.cta.primary}
              </ButtonLink>
              <button
                type="button"
                onClick={() => setDrawerOpen(true)}
                aria-label="Open menu"
                aria-expanded={drawerOpen}
                className="flex size-11 items-center justify-center rounded-full border border-sm-ink-950/15 text-sm-text transition-colors duration-150 hover:bg-sm-ink-950/[0.04] lg:hidden"
              >
                <Menu className="size-5" strokeWidth={1.5} aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      <MobileDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </>
  );
}
