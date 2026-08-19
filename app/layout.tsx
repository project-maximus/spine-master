import { MotionProvider } from "@/components/motion/MotionProvider";
import { site } from "@/content/site";
import { clinicSchema, websiteSchema } from "@/lib/schema";
import type { Metadata } from "next";
import { Azeret_Mono, Jost } from "next/font/google";
import type { ReactNode } from "react";
import "./globals.css";

/**
 * The logo wordmark is a Futura-style geometric sans. Jost is a Futura
 * revival, so headings set in it read as an extension of the mark rather than
 * a second typeface — it carries both the display and the body role.
 */
const jost = Jost({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jost",
  weight: ["300", "400", "500", "600"],
});

/**
 * The utility face, carrying every `//` eyebrow, `+` bullet and micro-label.
 *
 * Azeret Mono rather than a coding mono: JetBrains/Roboto Mono are editor
 * faces, and their terminal look is the single biggest tell that a layout came
 * out of a generator. Azeret is a contemporary editorial mono — squarer,
 * slightly wider, and it sits properly beside the geometric logo face.
 */
const azeretMono = Azeret_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-azeret-mono",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.descriptor} in Lahore`,
    template: `%s | ${site.name}`,
  },
  description: `${site.practitioner} treats back pain, sciatica, disc problems and joint injuries at ${site.clinic.building}, DHA Phase 5, Lahore — non-surgical, hands-on chiropractic care.`,
  icons: {
    icon: "/logo/icon.png",
    apple: "/logo/icon.png",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en-PK" className={`${jost.variable} ${azeretMono.variable}`}>
      <body>
        {/* Reveals hide themselves in CSS and are cleared by GSAP. If JS never
            runs, that would leave the page blank — so unhide everything. */}
        <noscript>
          <style>{".gsap-hidden{visibility:visible!important}[style*='visibility:hidden']{visibility:visible!important}"}</style>
        </noscript>
        <MotionProvider>{children}</MotionProvider>
        <script
          type="application/ld+json"
          // Static, build-time JSON from typed content — no user input reaches this.
          dangerouslySetInnerHTML={{ __html: JSON.stringify([clinicSchema(), websiteSchema()]) }}
        />
      </body>
    </html>
  );
}
