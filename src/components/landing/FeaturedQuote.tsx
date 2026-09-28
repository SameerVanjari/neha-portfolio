"use client";

import { motion } from "framer-motion";
import { FEATURED_QUOTE } from "@/data/landing";
import { useStagger, LineByLine } from "@/components/motion/reveal";

const DISPLAY = { fontFamily: "var(--font-display)" } as const;
const BODY = { fontFamily: "var(--font-body)" } as const;

export default function FeaturedQuote() {
  const { group, item, viewport } = useStagger({ distance: 16, step: 0.08 });

  return (
    <section aria-label="In their words" className="bg-[#E9E3D9]">
      <motion.div
        variants={group}
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        className="mx-auto flex w-full max-w-[1200px] flex-col items-start gap-[24px] px-6 py-[70px] md:py-[110px] lg:flex-row lg:px-0"
      >
        <motion.div variants={item} className="w-[180px] shrink-0 lg:pt-[16px]">
          <p
            className="text-[13px] font-medium uppercase tracking-[1.82px] text-[#5C5750]"
            style={BODY}
          >
            In their words
          </p>
        </motion.div>
        <figure className="flex max-w-[894px] flex-col items-start gap-[28px]">
          {/* The proof point of the page, and the last thing read before the
              footer — so each line of it arrives on its own. */}
          <LineByLine
            text={`“${FEATURED_QUOTE.quote}”`}
            delay={0.12}
            className="text-[28px] font-medium leading-[1.22] tracking-[-1px] text-[#17161B] md:text-[40px]"
            style={DISPLAY}
          />
          <motion.figcaption variants={item} className="text-[16px] font-normal text-[#3A3833]" style={BODY}>
            <span className="font-semibold text-[#17161B]">{FEATURED_QUOTE.name}</span>
            {" · "}
            {FEATURED_QUOTE.context}
          </motion.figcaption>
        </figure>
      </motion.div>
    </section>
  );
}
