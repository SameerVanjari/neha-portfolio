"use client";

import { motion } from "framer-motion";
import { CLIENT_NOTE } from "@/data/landing";
import { useStagger } from "@/components/motion/reveal";
import ClientLogoLoop from "@/components/ClientLogoLoop";

const BODY = { fontFamily: "var(--font-body)" } as const;

export default function ClientsRow() {
  // One reveal for the whole strip — the marquee supplies the motion from here,
  // so staggering individual logos would fight the loop.
  const { group, item, viewport } = useStagger({ distance: 14 });

  return (
    <section aria-label="Clients and collaborators" className="bg-[#F2EEE7]">
      <div className="mx-auto w-full max-w-[1200px] px-6 pb-[120px] lg:px-0">
        <motion.div
          variants={group}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="flex flex-col items-start gap-[22px]"
        >
          <motion.div
            variants={item}
            className="flex w-full flex-wrap items-baseline justify-between gap-2 text-[13px] text-[#5C5750]"
            style={BODY}
          >
            <p className="font-medium uppercase tracking-[1.82px]">Clients &amp; collaborators</p>
            <p className="font-normal">{CLIENT_NOTE}</p>
          </motion.div>
          <motion.div
            variants={item}
            className="w-full border-y border-[#DAD3C8] py-[26px]"
          >
            <ClientLogoLoop />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
