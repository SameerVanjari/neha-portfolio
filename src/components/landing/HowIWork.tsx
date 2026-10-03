"use client";

import { motion, type Variants } from "framer-motion";
import { WORK_STEPS } from "@/data/landing";
import { EASE_OUT, REVEAL_VIEWPORT, useMotionPref } from "@/components/motion/reveal";

const DISPLAY = { fontFamily: "var(--font-display)" } as const;
const BODY = { fontFamily: "var(--font-body)" } as const;

/**
 * How I work — a numbered sequence, so the cards landing in order *is* the
 * explanation. Two things carry that idea further than a plain stagger:
 *
 *   1. A connector rule draws left→right across the row, in step with the
 *      cards, so 01→05 reads as one flow rather than five loose tiles.
 *   2. Each card is built, not just faded: its number rolls up, a short rule
 *      draws under the title, then the body copy settles. That interior
 *      sequence repeats per card, offset by the card's own stagger, so the
 *      eye is led down each card as it arrives.
 *
 * All motion is transform/clip-path + opacity, on the house ease-out. Reduced
 * motion keeps the opacity fades and drops every movement and draw.
 */
export default function HowIWork() {
  const reduce = useMotionPref();

  const group: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.4, ease: EASE_OUT, delayChildren: 0.08, staggerChildren: 0.09 },
    },
  };

  const card: Variants = {
    hidden: { opacity: 0, transform: reduce ? "translateY(0px)" : "translateY(24px)" },
    visible: {
      opacity: 1,
      transform: "translateY(0px)",
      transition: {
        duration: 0.5,
        ease: EASE_OUT,
        delayChildren: reduce ? 0 : 0.12,
        staggerChildren: reduce ? 0 : 0.07,
      },
    },
  };

  const roll: Variants = {
    hidden: { opacity: 0, transform: reduce ? "translateY(0px)" : "translateY(12px)" },
    visible: { opacity: 1, transform: "translateY(0px)", transition: { duration: 0.4, ease: EASE_OUT } },
  };

  const rule: Variants = {
    hidden: { scaleX: reduce ? 1 : 0, opacity: reduce ? 0 : 1 },
    visible: {
      scaleX: 1,
      opacity: 1,
      transition: { duration: 0.45, ease: EASE_OUT },
    },
  };

  const line: Variants = {
    hidden: { scaleX: reduce ? 1 : 0, opacity: reduce ? 0 : 1 },
    visible: {
      scaleX: 1,
      opacity: 1,
      transition: { duration: 0.9, ease: EASE_OUT },
    },
  };

  return (
    <section aria-label="How I work" className="bg-[#F2EEE7]">
      <motion.div
        variants={group}
        initial="hidden"
        whileInView="visible"
        viewport={REVEAL_VIEWPORT}
        className="mx-auto flex w-full max-w-[1200px] flex-col items-start gap-[44px] px-6 py-[80px] md:py-[120px] lg:px-0"
      >
        <motion.h2
          variants={roll}
          className="text-[36px] font-semibold tracking-[-1.2px] text-[#17161B] md:text-[48px]"
          style={DISPLAY}
        >
          How I work
        </motion.h2>

        {/* The connector sits above the cards and draws as they arrive — the
            process reads as one continuous line even though the cards wrap. */}
        <motion.span
          aria-hidden
          variants={line}
          style={{ transformOrigin: "left center" }}
          className="block h-px w-full bg-[#DAD3C8]"
        />

        <ol className="grid w-full grid-cols-1 items-stretch gap-[20px] sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {WORK_STEPS.map((step) => (
            <motion.li
              key={step.num}
              variants={card}
              className="work-card flex flex-col items-start gap-[14px] rounded-[14px] bg-[#FBF9F5] px-[24px] py-[28px] xl:h-[250px]"
            >
              <motion.span
                variants={roll}
                className="work-card__num text-[13px] font-semibold tracking-[1.04px] text-[#3B33B5]"
                style={BODY}
              >
                {step.num}
              </motion.span>
              <motion.h3
                variants={roll}
                className="text-[20px] font-semibold text-[#17161B]"
                style={DISPLAY}
              >
                {step.title}
              </motion.h3>
              {/* Short rule under the title, drawn on the card's own beat. On
                  hover its ::after draws out to the card edge (see globals.css). */}
              <motion.span
                aria-hidden
                variants={rule}
                style={{ transformOrigin: "left center" }}
                className="work-card__rule block h-px w-full max-w-[120px] bg-[#CFC7BA]"
              />
              <motion.p
                variants={roll}
                className="text-[15px] font-normal leading-[1.55] text-[#3A3833]"
                style={BODY}
              >
                {step.body}
              </motion.p>
            </motion.li>
          ))}
        </ol>
      </motion.div>
    </section>
  );
}
