import { NewsletterForm } from "@/components/forms/NewsletterForm";
import { Container } from "@/components/ui/Container";
import { FacebookGlyph } from "@/components/ui/FacebookGlyph";
import { homeCopy } from "@/content/copy";
import { footerNav } from "@/content/nav";
import { site } from "@/content/site";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

/**
 * One bordered card, four stacked bands: an accent block carrying the logo
 * across half the width, a divided row of links, a split newsletter/contact
 * band, and the legal rule — the reference's exact structure.
 *
 * The accent block is the logo's own red rather than the reference's lime, and
 * it uses an all-white lockup: on a red field the mark's red line-work would
 * simply disappear.
 */
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer id="contact" className="on-ink scroll-mt-24 bg-sm-ink-950 pb-10 pt-24 text-sm-text-inv md:pt-32">
      <Container>
        <div className="overflow-hidden rounded-sm-media border border-white/12 bg-white/[0.03] backdrop-blur-md">
          {/* ---- accent block: half width, its own rounded outer corner ---- */}
          <div className="grid lg:grid-cols-2">
            <div className="rounded-tr-sm-media bg-sm-red-600 px-6 py-6 md:px-8">
              <Image
                src="/logo/spinemaster-lockup-h-solid.png"
                alt={`${site.name} — ${site.practitioner}`}
                width={2091}
                height={400}
                className="h-8 w-auto md:h-9"
              />
            </div>
          </div>

          {/* ---- link row ---- */}
          <div className="grid grid-cols-1 border-t border-white/12 sm:grid-cols-2 lg:grid-cols-4">
            {footerNav.map((item, index) => (
              <Link
                key={item.href}
                href={item.href}
                className={`group flex items-center justify-between px-6 py-5 text-sm-body transition-colors duration-150 hover:bg-white/[0.04] md:px-8 ${
                  index < footerNav.length - 1 ? "border-b border-white/12 sm:border-r lg:border-b-0" : ""
                } ${index === 1 ? "sm:border-r-0 lg:border-r" : ""}`}
              >
                {item.label}
                <ArrowUpRight
                  className="size-4 text-sm-red-600 transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  strokeWidth={1.5}
                  aria-hidden="true"
                />
              </Link>
            ))}
          </div>

          {/* ---- newsletter | contact ---- */}
          <div className="grid border-t border-white/12 lg:grid-cols-2">
            <div className="border-b border-white/12 px-6 py-6 md:px-8 lg:border-b-0 lg:border-r">
              <h2 className="text-sm-body text-sm-text-inv-2">{homeCopy.footer.newsletterHeading}</h2>
              <div className="mt-4">
                <NewsletterForm />
              </div>
            </div>

            <div className="flex items-start justify-between gap-6 px-6 py-6 md:px-8">
              <address className="flex flex-col gap-2 not-italic text-sm-body text-sm-text-inv-2">
                <a href={site.phone.href} className="transition-colors hover:text-sm-text-inv">
                  {site.phone.display}
                </a>
                <span>{site.clinic.building}</span>
                <span>{site.clinic.full}</span>
              </address>

              <a
                href={site.facebook}
                target="_blank"
                rel="noreferrer"
                aria-label={`${site.name} on Facebook`}
                className="shrink-0 text-sm-text-inv-2 transition-colors duration-150 hover:text-sm-text-inv"
              >
                <FacebookGlyph className="size-7" />
              </a>
            </div>
          </div>

          {/* ---- legal ---- */}
          <div className="flex flex-col gap-3 border-t border-white/12 px-6 py-5 font-sm-mono text-sm-caption uppercase tracking-[0.08em] text-sm-text-inv-3 sm:flex-row sm:items-center sm:justify-between md:px-8">
            {/* wraps rather than breaking a label across two lines at 390px */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
              <Link href="#" className="transition-colors hover:text-sm-text-inv-2">
                Privacy Policy
              </Link>
              <span aria-hidden="true">|</span>
              <Link href="#" className="transition-colors hover:text-sm-text-inv-2">
                Terms of Service
              </Link>
            </div>
            <p>
              © {year} {site.name}. All rights reserved.
            </p>
          </div>
        </div>
      </Container>
    </footer>
  );
}
