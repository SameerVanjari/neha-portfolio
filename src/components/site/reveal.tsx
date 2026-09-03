"use client";

import { motion } from "framer-motion";
import { PropsWithChildren } from "react";

export function Reveal({ children, delay = 0, y = 16 }: PropsWithChildren<{ delay?: number; y?: number }>) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </motion.div>
  );
}
