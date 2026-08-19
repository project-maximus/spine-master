import { Capabilities } from "@/components/sections/Capabilities";
import { Conditions } from "@/components/sections/Conditions";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { Hero } from "@/components/sections/Hero";
import { HeroExit } from "@/components/sections/HeroExit";
import { MissionStatement } from "@/components/sections/MissionStatement";
import { Process } from "@/components/sections/Process";
import { Testimonials } from "@/components/sections/Testimonials";
import { TrustBand } from "@/components/sections/TrustBand";
import { TrustBar } from "@/components/sections/TrustBar";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/seo";
import type { Metadata } from "next";

export const metadata: Metadata = pageMetadata({
  title: `${site.descriptor} & Chiropractor in Lahore`,
  description: `${site.practitioner} treats back pain, sciatica, slipped discs and joint pain at ${site.clinic.building}, DHA Phase 5, Lahore. Non-surgical, hands-on care. Call ${site.phone.display}.`,
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <HeroExit>
        <Hero />
      </HeroExit>

      {/* Sits above the hero's transformed frame as it travels up and out. */}
      <div className="relative z-10">
        <TrustBar />

        {/* The mission pins and the capabilities card rides up over it. The
            wrapper bounds the sticky so it releases here rather than staying
            latched behind every section below.

            Capabilities took over the covering role when the value section was
            removed — a sticky panel with nothing to cover it just pins and
            then jumps. */}
        <div>
          <MissionStatement />
          <Capabilities />
        </div>

        <Conditions />
        <Process />
        <Testimonials />
        <TrustBand />
        <FinalCTA />
      </div>
    </>
  );
}
