"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import type { ThemeId } from "@/data/themes";
import { THEMES } from "@/data/themes";
import type { Testimonial } from "@/types/portfolio";

export default function TestimonialsSection({
  activeId,
  testimonials,
}: {
  activeId: ThemeId;
  testimonials: Testimonial[];
}) {
  const theme = THEMES[activeId];
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const active = testimonials[index % Math.max(testimonials.length, 1)];

  useEffect(() => {
    if (paused || reduce || testimonials.length < 2) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % testimonials.length), 6000);
    return () => clearInterval(id);
  }, [paused, reduce, testimonials.length]);

  if (!active) return null;

  const go = (dir: 1 | -1) => setIndex((i) => (i + dir + testimonials.length) % testimonials.length);
  const initial = active.author.slice(0, 1).toUpperCase();

  return (
    <section id="testimonials" className="relative bg-[#f6f6f4]">
      <div className="mx-auto max-w-[1280px] px-6 py-14 md:px-8 md:py-18 lg:py-24">
        <h2
          className="font-display text-[22px] font-semibold tracking-[-0.03em] text-zinc-900 md:text-[26px]"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Testimonials
        </h2>

        <div
          className="relative mt-8 overflow-hidden rounded-[24px] border bg-white p-6 md:p-8 lg:p-10"
          style={{ borderColor: "rgba(0,0,0,0.06)", boxShadow: "0 16px 48px rgba(0,0,0,0.06)" }}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="grid gap-8 lg:grid-cols-[0.7fr_1.3fr] lg:items-center lg:gap-12">
            <div className="flex justify-center lg:justify-start">
              <div
                className="flex h-[160px] w-[160px] items-center justify-center rounded-[28px] font-display text-[56px] font-semibold text-white md:h-[200px] md:w-[200px]"
                style={{ background: theme.accentStrong }}
                aria-hidden
              >
                {initial}
              </div>
            </div>

            <div>
              <AnimatePresence mode="wait">
                <motion.div
                  key={index}
                  initial={reduce ? false : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
                  transition={{ duration: reduce ? 0.15 : 0.35, ease: [0.23, 1, 0.32, 1] }}
                >
                  <p className="max-w-[42ch] text-[18px] leading-[1.55] text-zinc-900 md:text-[20px]" style={{ fontFamily: "var(--font-body)" }}>
                    “{active.quote}”
                  </p>
                  <div className="mt-6 font-display text-[15px] font-semibold tracking-[-0.02em] text-zinc-900">
                    {active.author}
                  </div>
                  <div className="font-mono text-[11px] tracking-[0.06em] text-zinc-500">
                    {active.role} · {active.year}
                  </div>
                </motion.div>
              </AnimatePresence>

              {testimonials.length > 1 ? (
                <div className="mt-8 flex items-center gap-3">
                  <button
                    type="button"
                    aria-label="Previous testimonial"
                    onClick={() => go(-1)}
                    className="inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border bg-white text-zinc-700"
                    style={{ borderColor: "rgba(0,0,0,0.08)" }}
                  >
                    ←
                  </button>
                  <button
                    type="button"
                    aria-label="Next testimonial"
                    onClick={() => go(1)}
                    className="inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-zinc-900 text-white"
                  >
                    →
                  </button>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
