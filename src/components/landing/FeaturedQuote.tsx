"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FEATURED_QUOTES } from "@/data/landing";
import { EASE_OUT, LineByLine, REVEAL_VIEWPORT, useMotionPref } from "@/components/motion/reveal";

const DISPLAY = { fontFamily: "var(--font-display)" } as const;
const BODY = { fontFamily: "var(--font-body)" } as const;

/** How long each quote rests, fully visible, before the next one arrives. */
const HOLD_MS = 5200;

/**
 * In their words — the proof point before the footer, so it rotates rather
 * than sitting still. The rotation is a text change, not a carousel: the
 * quote arrives line by line out of a soft defocus, holds, then leaves the way
 * it came (rising, blurring), and the next one takes its place. No chrome, no
 * dots, no arrows — the words are the whole interface.
 *
 * The exit is the comment on the least-recently-read state, so it's quick: the
 * outgoing quote only needs to clear before the incoming one lands. Only the
 * quote and attribution cross; the label and band stay put.
 *
 * Reduced motion holds the first quote steady — the rotation is decorative and
 * the content is fully present without it.
 */
export default function FeaturedQuote() {
  const reduce = useMotionPref();
  const [index, setIndex] = useState(0);
  const active = FEATURED_QUOTES[index];

  // The rotation only ever runs forward in a loop. Every value it needs is
  // derived from `index`, so there's nothing else to keep in sync.
  useEffect(() => {
    if (reduce) return;
    const id = window.setInterval(
      () => setIndex((i) => (i + 1) % FEATURED_QUOTES.length),
      HOLD_MS
    );
    return () => window.clearInterval(id);
  }, [reduce]);

  // The outgoing quote only needs to clear, so it simply reverses its entrance.
  const quoteExit = reduce
    ? { opacity: 0 }
    : { opacity: 0, transform: "translateY(-10px)", filter: "blur(8px)" };

  return (
    <section aria-label="In their words" className="bg-[#E9E3D9]">
      <div className="mx-auto flex w-full max-w-[1200px] flex-col items-start gap-[24px] px-6 py-[70px] md:py-[110px] lg:flex-row lg:px-0">
        <motion.div
          initial={{ opacity: 0, transform: "translateY(16px)" }}
          whileInView={{ opacity: 1, transform: "translateY(0px)" }}
          viewport={REVEAL_VIEWPORT}
          transition={{ duration: 0.5, ease: EASE_OUT }}
          className="w-[180px] shrink-0 lg:pt-[16px]"
        >
          <p
            className="text-[13px] font-medium uppercase tracking-[1.82px] text-[#5C5750]"
            style={BODY}
          >
            In their words
          </p>
        </motion.div>

        {/* A fixed-height well so the band never jumps as quotes of different
            lengths swap. The min-height tracks the tallest quote; the block is
            measured in ch so it scales with the display type. */}
        <figure className="flex min-h-[240px] w-full max-w-[894px] flex-col items-start justify-center gap-[28px] md:min-h-[220px]">
          <AnimatePresence mode="wait">
            <motion.div key={index} className="flex flex-col items-start gap-[28px]">
              {/* The quote arrives line by line — the same dialect as every
                  other entrance on the site, reused rather than reinvented. */}
              <motion.blockquote
                exit={quoteExit}
                transition={{ duration: 0.28, ease: EASE_OUT }}
                className="text-[28px] font-medium leading-[1.22] tracking-[-1px] text-[#17161B] md:text-[40px]"
                style={DISPLAY}
              >
                <LineByLine
                  text={`“${active.quote}”`}
                  delay={0.12}
                  blur={reduce ? 0 : 8}
                />
              </motion.blockquote>
              <motion.figcaption
                initial={reduce ? { opacity: 0 } : { opacity: 0, transform: "translateY(12px)" }}
                animate={{ opacity: 1, transform: "translateY(0px)" }}
                exit={reduce ? { opacity: 0 } : { opacity: 0, transform: "translateY(-8px)" }}
                transition={{ duration: reduce ? 0.3 : 0.4, delay: reduce ? 0 : 0.28, ease: EASE_OUT }}
                className="text-[16px] font-normal text-[#3A3833]"
                style={BODY}
              >
                <span className="font-semibold text-[#17161B]">{active.name}</span>
                {" · "}
                {active.context}
              </motion.figcaption>
            </motion.div>
          </AnimatePresence>
        </figure>
      </div>
    </section>
  );
}
