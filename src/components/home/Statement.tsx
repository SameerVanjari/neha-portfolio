import { motion } from "framer-motion";
import StatementIconsScene from "@/components/home/StatementIconsScene";

const STATEMENT_WORDS = [
  { text: "I", accent: false },
  { text: "design", accent: false },
  { text: "AI", accent: false },
  { text: "people", accent: false },
  { text: "can", accent: false },
  { text: "understand,", accent: true },
  { text: "question,", accent: true },
  { text: "and", accent: true },
  { text: "overrule.", accent: true },
] as const;

/** Full-bleed statement band (node 525:207). */
export default function Statement() {
  return (
    <section
      aria-label="Design statement"
      className="relative h-[420px] w-full overflow-hidden bg-[#f3f1ff] md:h-[480px]"
    >
      <StatementIconsScene />

      <motion.p
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={{
          hidden: {},
          visible: { transition: { delayChildren: 0.1, staggerChildren: 0.045 } },
        }}
        className="absolute left-1/2 top-[110px] z-10 flex w-[min(880px,88vw)] -translate-x-1/2 flex-wrap justify-center gap-x-[0.24em] px-6 text-center home-display text-[clamp(34px,5.28vw,76px)] font-bold leading-[1.02] tracking-[-1.9px] text-[#0a0918] md:top-[123px]"
      >
        {STATEMENT_WORDS.map((word) => (
          <motion.span
            key={word.text}
            variants={{
              hidden: { opacity: 0, transform: "translateY(0.35em)", filter: "blur(10px)" },
              visible: { opacity: 1, transform: "translateY(0em)", filter: "blur(0px)" },
            }}
            transition={{ duration: 0.58, ease: [0.23, 1, 0.32, 1] }}
            className={word.accent ? "text-[#5b3fd9]" : undefined}
          >
            {word.text}
          </motion.span>
        ))}
      </motion.p>
    </section>
  );
}
