import { Counter } from "@/components/motion/Counter";
import { Marquee } from "@/components/motion/Marquee";
import { Reveal } from "@/components/motion/Reveal";
import { RevealLines } from "@/components/motion/RevealLines";
import { Container } from "@/components/ui/Container";
import { PlusItem } from "@/components/ui/PlusItem";
import { TextLink } from "@/components/ui/TextLink";
import { homeCopy } from "@/content/copy";
import { credentials, pillars, trustKeywords } from "@/content/pillars";
import { trustCounters } from "@/content/stats";

/**
 * S11. An escalating proof sequence on one ink surface, in this order:
 * keywords → credentials → metrics → pillars. The order is the argument.
 */
export function TrustBand() {
  return (
    <section aria-label="Why patients choose Spine Master" className="on-ink rounded-t-sm-frame bg-sm-ink-950 py-24 text-sm-text-inv md:py-32 lg:py-40">
      <Container>
        <RevealLines as="h2" className="max-w-[30ch] font-sm-display text-sm-h1 text-sm-red-600">
          {homeCopy.trustBand.heading.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </RevealLines>

        <Reveal delay={0.08} className="mt-8">
          <TextLink href="#contact" onInk>
            {homeCopy.trustBand.link}
          </TextLink>
        </Reveal>
      </Container>

      {/* (a) keyword marquee */}
      <div className="mt-16 lg:mt-20">
        <Marquee label="What the practice stands for" duration={28} tone="ink" className="py-2">
          <div className="flex items-center gap-3 pr-3">
            {trustKeywords.map((keyword) => (
              <span
                key={keyword}
                className="inline-flex h-10 items-center whitespace-nowrap rounded-full border border-white/20 px-5 font-sm-mono text-sm-caption uppercase tracking-[0.1em] text-sm-text-inv-2"
              >
                {keyword}
              </span>
            ))}
          </div>
        </Marquee>
      </div>

      <Container className="mt-14">
        {/* (b) credentials */}
        <Reveal>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-3 rounded-sm-card border border-white/12 px-6 py-5">
            <span className="font-sm-mono text-sm-caption uppercase tracking-[0.1em] text-sm-text-inv-3">
              {homeCopy.trustBand.securityLabel}
            </span>
            <ul className="flex flex-wrap items-center gap-x-3 gap-y-3">
              {credentials.map((credential) => (
                <PlusItem
                  key={credential}
                  className="rounded-full border border-white/20 px-4 py-2 text-sm-text-inv-2"
                >
                  {credential}
                </PlusItem>
              ))}
            </ul>
          </div>
        </Reveal>

        {/* (c) counters */}
        <div className="mt-5 grid gap-5 md:grid-cols-3">
          {trustCounters.map((stat, index) => (
            <Reveal key={stat.label} delay={index * 0.08}>
              <div className="flex h-full flex-col justify-between gap-10 rounded-sm-card border border-white/12 p-7 text-center md:p-8">
                <h3 className="font-sm-mono text-sm-caption uppercase tracking-[0.1em] text-sm-text-inv-2">
                  {stat.label}
                </h3>
                <p className="font-sm-display text-sm-stat text-sm-text-inv">
                  <Counter value={stat.value} decimals={stat.decimals} suffix={stat.suffix} />
                </p>
                <p className="font-sm-mono text-sm-caption uppercase tracking-[0.1em] text-sm-text-inv-3">
                  {stat.caption}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* (d) pillars */}
        <ol className="mt-5 grid gap-x-16 gap-y-8 rounded-sm-card border border-white/12 p-7 md:grid-cols-2 md:p-10">
          {pillars.map((pillar, index) => (
            <Reveal key={pillar.number} as="li" delay={index * 0.06}>
              <div className="flex items-baseline gap-5 border-t border-white/12 pt-5">
                <span className="tnum font-sm-mono text-sm-caption text-sm-red-600">{pillar.number}</span>
                <h3 className="font-sm-display text-sm-h4 text-sm-text-inv">{pillar.title}</h3>
              </div>
            </Reveal>
          ))}
        </ol>
      </Container>
    </section>
  );
}
