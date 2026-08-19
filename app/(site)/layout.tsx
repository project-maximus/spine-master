import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { SkipLink } from "@/components/layout/SkipLink";
import { SmoothScrollProvider } from "@/components/motion/SmoothScrollProvider";
import type { ReactNode } from "react";

export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <SmoothScrollProvider>
      <SkipLink />
      <Header />
      <main id="main">{children}</main>
      <Footer />
    </SmoothScrollProvider>
  );
}
