"use client";

import { LogoLockup } from "@/components/layout/Logo";
import { useLenis } from "@/components/motion/SmoothScrollProvider";
import { ButtonLink } from "@/components/ui/Button";
import { navItems } from "@/content/nav";
import { site } from "@/content/site";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef } from "react";

const EASE = [0.22, 1, 0.36, 1] as const;

export function MobileDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const panelRef = useRef<HTMLDivElement>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);
  const lenis = useLenis();

  // Scroll lock: stop Lenis and add a body class. Never mutate
  // document.body.style.overflow directly.
  useEffect(() => {
    if (!open) return;
    document.body.classList.add("sm-scroll-locked");
    lenis?.stop();
    return () => {
      document.body.classList.remove("sm-scroll-locked");
      lenis?.start();
    };
  }, [open, lenis]);

  // Move focus in on open, trap it while open, return it to the trigger on close.
  useEffect(() => {
    if (!open) {
      previouslyFocused.current?.focus();
      return;
    }

    previouslyFocused.current = document.activeElement as HTMLElement | null;

    const panel = panelRef.current;
    if (!panel) return;

    const selector =
      'a[href], button:not([disabled]), input, [tabindex]:not([tabindex="-1"])';
    const focusables = () => Array.from(panel.querySelectorAll<HTMLElement>(selector));

    focusables()[0]?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }
      if (event.key !== "Tab") return;

      const items = focusables();
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="on-ink fixed inset-0 z-[60] flex flex-col bg-sm-ink-950"
        >
          <div className="flex h-[72px] items-center justify-between px-5">
            <LogoLockup onInk className="h-7" />
            <button
              type="button"
              onClick={onClose}
              aria-label="Close menu"
              className="flex size-10 items-center justify-center rounded-full text-sm-text-inv"
            >
              <X className="size-6" strokeWidth={1.5} aria-hidden="true" />
            </button>
          </div>

          <nav aria-label="Primary" className="flex flex-1 flex-col justify-center gap-1 px-5">
            {navItems.map((item, index) => (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: index * 0.06, ease: EASE }}
              >
                <Link
                  href={item.href}
                  onClick={onClose}
                  className="block py-3 font-sm-display text-[34px] leading-tight text-sm-text-inv"
                >
                  {item.label}
                </Link>
              </motion.div>
            ))}
          </nav>

          <div className="flex flex-col gap-3 px-5 pb-10">
            <ButtonLink href="#contact" size="lg" onClick={onClose} className="w-full">
              {site.cta.primary}
            </ButtonLink>
            <ButtonLink
              href={site.phone.href}
              variant="secondaryInk"
              size="lg"
              withArrow={false}
              className="w-full"
            >
              {site.phone.display}
            </ButtonLink>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
