"use client";

import { motion } from "framer-motion";
import StatementIconsScene from "@/components/home/StatementIconsScene";
import { useMotionPref } from "@/components/motion/reveal";

const LINE_ONE = ["I", "design", "AI", "people", "can"] as const;
const LINE_TWO = ["understand,", "question,", "and", "overrule."] as const;

const WORD_SPRING = {
  hidden: { opacity: 0, transform: "translateY(0.35em)", filter: "blur(10px)" },
  visible: { opacity: 1, transform: "translateY(0em)", filter: "blur(0px)" },
};

/** Belief band (node 583:462) — light, centred statement with glass icons. */
export default function Statement() {
  const reduce = useMotionPref();

  return (
    <section
      id="belief"
      aria-label="What I believe"
      className="relative flex w-full flex-col items-center gap-[20px] overflow-hidden bg-[#eeebff] px-6 pb-[84px] pt-[64px] lg:pb-[130px] lg:pt-[110px]"
    >
      {/* Glass icons — compass leans to the cursor, cube turns, bubble lifts. */}
      <StatementIconsScene reduce={reduce} />

      <p className="relative z-10 home-body text-[12px] font-semibold uppercase tracking-[2.16px] text-[#5b3fd9]">
        What I believe
      </p>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={{
          hidden: {},
          visible: { transition: { delayChildren: 0.1, staggerChildren: 0.045 } },
        }}
        className="relative z-10 flex flex-col px-6 text-center home-display text-[clamp(34px,4.45vw,60px)] font-bold leading-[1.06] text-[#0a0918]"
      >
        <p className="flex flex-wrap justify-center gap-x-[0.24em]">
          {LINE_ONE.map((word) => (
            <motion.span
              key={word}
              variants={WORD_SPRING}
              transition={{ duration: 0.58, ease: [0.23, 1, 0.32, 1] }}
            >
              {word}
            </motion.span>
          ))}
        </p>
        <p className="mt-[0.14em] flex flex-wrap justify-center gap-x-[0.24em] text-[#5b3fd9]">
          {LINE_TWO.map((word) => (
            <motion.span
              key={word}
              variants={WORD_SPRING}
              transition={{ duration: 0.58, ease: [0.23, 1, 0.32, 1] }}
            >
              {word}
            </motion.span>
          ))}
        </p>
      </motion.div>

      <motion.a
        href="#about"
        onClick={(event) => {
          event.preventDefault();
          const target = document.getElementById("about");
          target?.scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
        }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={WORD_SPRING}
        transition={{ duration: 0.58, ease: [0.23, 1, 0.32, 1] }}
        className="relative z-10 home-body text-[16px] font-medium text-[#5b3fd9] transition-opacity hover:opacity-70"
      >
        Here&rsquo;s how I got here ↓
      </motion.a>
    </section>
  );
}
