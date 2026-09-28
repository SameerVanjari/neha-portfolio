"use client";

import { motion } from "framer-motion";
import { WORK_STEPS } from "@/data/landing";
import { useStagger } from "@/components/motion/reveal";

const DISPLAY = { fontFamily: "var(--font-display)" } as const;
const BODY = { fontFamily: "var(--font-body)" } as const;

export default function HowIWork() {
  // A numbered sequence — the cards landing in order is the whole point. The
  // <ol> is deliberately plain so the cards inherit the group's stagger
  // instead of becoming a nested block that all fades in at once.
  const { group, item, viewport } = useStagger({ step: 0.06, distance: 20 });

  return (
    <section aria-label="How I work" className="bg-[#F2EEE7]">
      <motion.div
        variants={group}
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        className="mx-auto flex w-full max-w-[1200px] flex-col items-start gap-[44px] px-6 py-[80px] md:py-[120px] lg:px-0"
      >
        <motion.h2
          variants={item}
          className="text-[36px] font-semibold tracking-[-1.2px] text-[#17161B] md:text-[48px]"
          style={DISPLAY}
        >
          How I work
        </motion.h2>
        <ol className="grid w-full grid-cols-1 items-stretch gap-[20px] sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {WORK_STEPS.map((step) => (
            <motion.li
              key={step.num}
              variants={item}
              className="flex flex-col items-start gap-[14px] rounded-[14px] bg-[#FBF9F5] px-[24px] py-[28px] xl:h-[250px]"
            >
              <span
                className="text-[13px] font-semibold tracking-[1.04px] text-[#3B33B5]"
                style={BODY}
              >
                {step.num}
              </span>
              <h3 className="text-[20px] font-semibold text-[#17161B]" style={DISPLAY}>
                {step.title}
              </h3>
              <p className="text-[15px] font-normal leading-[1.55] text-[#3A3833]" style={BODY}>
                {step.body}
              </p>
            </motion.li>
          ))}
        </ol>
      </motion.div>
    </section>
  );
}
