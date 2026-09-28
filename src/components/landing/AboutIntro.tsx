"use client";

import { Reveal, LineByLine } from "@/components/motion/reveal";

const DISPLAY = { fontFamily: "var(--font-display)" } as const;
const BODY = { fontFamily: "var(--font-body)" } as const;

const ABOUT_STATEMENT =
  "Product & Experience Designer working at the intersection of AI, XR, and emerging technology.";

export default function AboutIntro() {
  return (
    <section aria-label="About" className="bg-[#F2EEE7]">
      <div className="mx-auto w-full max-w-[1200px] px-6 pb-[120px] pt-[80px] md:pt-[140px] lg:px-0">
        <div className="flex max-w-[792px] flex-col items-start gap-[36px]">
          <Reveal>
            <p
              className="text-[13px] font-medium uppercase tracking-[1.82px] text-[#5C5750]"
              style={BODY}
            >
              About
            </p>
          </Reveal>

          {/* The statement is the section's one authored moment. Plain text, so
              it can be split at its real line breaks and each line arrive on
              its own — a clip sweep reads as one wipe at this size. */}
          <LineByLine
            text={ABOUT_STATEMENT}
            delay={0.08}
            className="text-[30px] font-medium leading-[1.18] tracking-[-1.025px] text-[#17161B] md:text-[41px]"
            style={DISPLAY}
          />

          {/* An escalation, so it gets a wider beat than a default stagger. */}
          <div className="flex flex-col items-start gap-[10px] text-[20px] font-normal leading-[1.3] md:text-[26px]" style={BODY}>
            <Reveal delay={0.16}>
              <p className="text-[#5C5750]">First, I sculpted objects.</p>
            </Reveal>
            <Reveal delay={0.25}>
              <p className="text-[#3A3833]">Then, I shaped experiences.</p>
            </Reveal>
            <Reveal delay={0.34}>
              <p className="font-medium text-[#3B33B5]">Now, I orchestrate intelligence itself.</p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
