"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { ThemeId } from "@/data/themes";
import { THEMES } from "@/data/themes";

type Testimonial = { quote: string; author: string; role: string; year: string };

const AVATARS = [
  "https://i.pravatar.cc/150?img=5",
  "https://i.pravatar.cc/150?img=8",
  "https://i.pravatar.cc/150?img=12",
  "https://i.pravatar.cc/150?img=16",
  "https://i.pravatar.cc/150?img=32",
];

// Aceternity — Animated Testimonials: stacked cards, autoplay, arrows
export default function TestimonialsSection({ activeId, testimonials }: { activeId: ThemeId; testimonials: Testimonial[] }) {
  const theme = THEMES[activeId];
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const active = testimonials[index % testimonials.length];

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % testimonials.length), 5000);
    return () => clearInterval(id);
  }, [paused, testimonials.length]);

  const go = (dir: 1 | -1) => setIndex((i) => (i + dir + testimonials.length) % testimonials.length);

  const multiTint = `linear-gradient(135deg, ${THEMES.ux.wash}12 0%, ${THEMES.xr.wash}10 40%, ${THEMES.ai.wash}10 80%)`;
  return (
    <section id="testimonials" className="relative bg-[#f6f6f4]">
      <div aria-hidden className="pointer-events-none absolute inset-0" style={{ background: multiTint }} />
      <div className="mx-auto max-w-[1280px] px-6 md:px-8">
        <div className="py-8 md:py-10 lg:py-12">
          <div className="mb-6">
            <h2 className="font-display text-[22px] font-semibold tracking-[-0.03em] md:text-[26px]" style={{ fontFamily: "var(--font-display)", color: "#111827" }}>
              Testimonials
            </h2>
          </div>

          <div
            className="relative overflow-hidden rounded-[28px] border bg-white p-6 md:p-8 lg:p-10"
            style={{ borderColor: "rgba(0,0,0,0.06)", boxShadow: "0 16px 48px rgba(0,0,0,0.06)" }}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            {/* subtle aceternity grid */}
            <div
              className="pointer-events-none absolute inset-0 opacity-[0.03]"
              style={{
                backgroundImage: `linear-gradient(rgba(0,0,0,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.08) 1px, transparent 1px)`,
                backgroundSize: "24px 24px",
              }}
              aria-hidden
            />

            <div className="relative grid gap-8 lg:grid-cols-[1.05fr_1.45fr] lg:gap-10">
              {/* stacked image cards — aceternity style */}
              <div className="relative flex items-center justify-center">
                <div className="relative h-[280px] w-[300px] md:h-[320px] md:w-[340px]">
                  {testimonials.map((_, i) => {
                    const offset = (i - index + testimonials.length) % testimonials.length;
                    // show 3 stacked
                    if (offset > 2) return null;
                    return (
                      <motion.div
                        key={i}
                        className="absolute inset-0 overflow-hidden rounded-[20px] border bg-white"
                        style={{
                          borderColor: "rgba(0,0,0,0.08)",
                          boxShadow: "0 10px 32px rgba(0,0,0,0.12)",
                          zIndex: 3 - offset,
                        }}
                        animate={{
                          x: offset * 10,
                          y: offset * 8,
                          rotate: offset * 1.2 - 1,
                          scale: 1 - offset * 0.04,
                          opacity: 1 - offset * 0.18,
                        }}
                        transition={{ duration: 0.45, ease: [0.23, 1, 0.32, 1] }}
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={AVATARS[i % AVATARS.length]} alt="" className="h-full w-full object-cover" draggable={false} />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              {/* quote */}
              <div className="flex flex-col justify-center">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
                  >
                    <div className="flex items-center gap-2">
                      <span className="h-px w-6" style={{ background: theme.faint }} />
                      <span className="font-mono text-[11px] tracking-[0.16em]" style={{ color: theme.muted }}>
                        {active.year} · 0{index + 1} / 0{testimonials.length}
                      </span>
                    </div>

                    <p className="mt-4 max-w-[56ch] text-[18px] leading-[1.6] text-zinc-900 md:text-[20px]" style={{ fontFamily: "var(--font-body)" }}>
                      “{active.quote}”
                    </p>

                    <div className="mt-6">
                      <div className="font-display text-[15px] font-semibold tracking-[-0.02em] text-zinc-900" style={{ fontFamily: "var(--font-display)" }}>
                        {active.author}
                      </div>
                      <div className="font-mono text-[11px] tracking-[0.08em] text-zinc-500">{active.role}</div>
                    </div>
                  </motion.div>
                </AnimatePresence>

                <div className="mt-8 flex items-center gap-3">
                  <button
                    aria-label="Previous testimonial"
                    onClick={() => go(-1)}
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full border bg-white text-zinc-700 hover:bg-zinc-50"
                    style={{ borderColor: "rgba(0,0,0,0.08)" }}
                  >
                    ←
                  </button>
                  <button
                    aria-label="Next testimonial"
                    onClick={() => go(1)}
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-zinc-900 text-white hover:bg-zinc-800"
                  >
                    →
                  </button>
                  <div className="ml-2 flex gap-1.5">
                    {testimonials.map((_, i) => (
                      <button
                        key={i}
                        aria-label={`Go to testimonial ${i + 1}`}
                        onClick={() => setIndex(i)}
                        className="h-1.5 rounded-full transition-all"
                        style={{
                          width: i === index ? 22 : 8,
                          background: i === index ? theme.accent : "rgba(0,0,0,0.14)",
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>


        </div>
      </div>
    </section>
  );
}
