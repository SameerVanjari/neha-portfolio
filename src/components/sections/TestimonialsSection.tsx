"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { FEATURED_TESTIMONIALS } from "@/data/testimonials-data";

/**
 * Editorial testimonial section — "In their words".
 * One lead quote carries the section; the six featured voices sit in a
 * navigable index beside it. Auto-advances gently, pauses on intent,
 * and stays quiet under reduced motion.
 */
export default function TestimonialsSection() {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const active = FEATURED_TESTIMONIALS[index];

  useEffect(() => {
    if (paused || reduce || FEATURED_TESTIMONIALS.length < 2) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % FEATURED_TESTIMONIALS.length), 7000);
    return () => clearInterval(id);
  }, [paused, reduce]);

  const go = (dir: 1 | -1) =>
    setIndex((i) => (i + dir + FEATURED_TESTIMONIALS.length) % FEATURED_TESTIMONIALS.length);

  return (
    <section id="testimonials" className="relative bg-[#F2EEE6]">
      <div className="mx-auto max-w-[1280px] px-6 py-14 md:px-8 md:py-18 lg:py-24">
        {/* header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-baseline md:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <span className="h-px w-10 bg-black/10" />
              <span
                className="text-[10.5px] font-semibold uppercase tracking-[0.22em] text-zinc-500"
                style={{ fontFamily: "var(--font-body)" }}
              >
                Testimonials
              </span>
            </div>
            <h2
              className="mt-3 text-[30px] font-medium leading-[1.05] tracking-[-0.01em] text-zinc-900 md:text-[40px]"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              In their words
              <span className="font-light text-zinc-400">.</span>
            </h2>
          </div>
          <p
            className="text-[11px] tracking-[0.14em] text-zinc-400"
            style={{ fontFamily: "var(--font-body)" }}
          >
            12 RECOMMENDATIONS · COLLEAGUES, MENTORS &amp; LEADERS
          </p>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1.35fr_0.65fr] lg:gap-10">
          {/* lead quote */}
          <div
            className="relative flex min-w-0 flex-col justify-between overflow-hidden rounded-[24px] border bg-white p-7 md:p-10 lg:p-12"
            style={{ borderColor: "rgba(0,0,0,0.06)", boxShadow: "0 16px 48px rgba(22,22,30,0.06)" }}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onFocus={() => setPaused(true)}
            onBlur={() => setPaused(false)}
          >
            <span
              aria-hidden
              className="pointer-events-none absolute -top-5 left-3 select-none font-display text-[100px] font-semibold leading-none text-[#35339E]/10 md:-top-8 md:left-5 md:text-[140px]"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              “
            </span>
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                initial={reduce ? false : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
                transition={{ duration: reduce ? 0.12 : 0.32, ease: [0.23, 1, 0.32, 1] }}
                aria-live="polite"
              >
                <blockquote
                  className="relative max-w-[46ch] text-[19px] font-medium italic leading-[1.5] text-zinc-900 md:text-[24px]"
                  style={{ fontFamily: "var(--font-serif)" }}
                >
                  “{active.quote}”
                </blockquote>
                <div className="mt-7 flex items-center gap-4">
                  <span
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[10px] font-display text-[15px] font-semibold text-white"
                    style={{ background: "#35339E", fontFamily: "var(--font-display)" }}
                    aria-hidden
                  >
                    {active.name
                      .replace(/^(Prof\.?|Dr\.?)\s+/i, "")
                      .split(/\s+/)
                      .slice(0, 2)
                      .map((p) => p[0])
                      .join("")
                      .toUpperCase()}
                  </span>
                  <span className="min-w-0">
                    <span className="block font-display text-[15px] font-semibold tracking-[-0.02em] text-zinc-900" style={{ fontFamily: "var(--font-display)" }}>
                      {active.name}
                    </span>
                    <span className="block text-[12px] leading-[1.4] text-zinc-500" style={{ fontFamily: "var(--font-body)" }}>
                      {active.title}
                    </span>
                  </span>
                  <span
                    className="ml-auto hidden shrink-0 rounded-full border px-3 py-1 font-mono text-[9.5px] tracking-[0.12em] text-zinc-500 sm:block"
                    style={{ borderColor: "rgba(22,22,30,0.10)" }}
                  >
                    {active.relation.toUpperCase()}
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* controls */}
            <div className="mt-8 flex items-center justify-between border-t pt-5" style={{ borderColor: "rgba(0,0,0,0.05)" }}>
              <span className="font-mono text-[10.5px] tracking-[0.16em] text-zinc-400" style={{ fontFamily: "var(--font-body)" }}>
                {`${String(index + 1).padStart(2, "0")} — ${String(FEATURED_TESTIMONIALS.length).padStart(2, "0")}`}
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  aria-label="Previous testimonial"
                  onClick={() => go(-1)}
                  className="inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border bg-white text-zinc-700 transition-colors hover:border-zinc-900 hover:text-zinc-900"
                  style={{ borderColor: "rgba(0,0,0,0.08)" }}
                >
                  ←
                </button>
                <button
                  type="button"
                  aria-label="Next testimonial"
                  onClick={() => go(1)}
                  className="inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-zinc-900 text-white transition-opacity hover:opacity-80"
                >
                  →
                </button>
              </div>
            </div>
          </div>

          {/* index rail */}
          <div className="min-w-0 rounded-[24px] border p-2" style={{ borderColor: "rgba(0,0,0,0.06)", background: "rgba(255,255,255,0.5)" }}>
            <p
              className="px-4 pt-4 font-mono text-[9.5px] uppercase tracking-[0.2em] text-zinc-400"
              style={{ fontFamily: "var(--font-body)" }}
            >
              The recommenders
            </p>
            <ul className="mt-2 flex gap-2 overflow-x-auto p-3 lg:max-h-[420px] lg:flex-col lg:overflow-visible">
              {FEATURED_TESTIMONIALS.map((t, i) => {
                const isActive = i === index;
                return (
                  <li key={t.id} className="shrink-0 lg:shrink">
                    <button
                      type="button"
                      onClick={() => setIndex(i)}
                      aria-current={isActive}
                      className={`group flex w-full cursor-pointer items-center gap-3 rounded-[14px] border px-3 py-2.5 text-left transition-colors ${
                        isActive ? "bg-white" : "border-transparent hover:bg-white/80"
                      }`}
                      style={isActive ? { borderColor: "rgba(0,0,0,0.08)", boxShadow: "0 8px 24px rgba(22,22,30,0.06)" } : undefined}
                    >
                      <span
                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[8px] font-display text-[12px] font-semibold transition-colors"
                        style={{
                          background: isActive ? "#35339E" : "rgba(22,22,30,0.05)",
                          color: isActive ? "#F2EEE6" : "#71716D",
                          fontFamily: "var(--font-display)",
                        }}
                        aria-hidden
                      >
                        {t.name
                          .replace(/^(Prof\.?|Dr\.?)\s+/i, "")
                          .split(/\s+/)
                          .slice(0, 2)
                          .map((p) => p[0])
                          .join("")
                          .toUpperCase()}
                      </span>
                      <span className="min-w-0">
                        <span
                          className={`block truncate font-display text-[12.5px] font-semibold tracking-[-0.01em] transition-colors ${isActive ? "text-zinc-900" : "text-zinc-600 group-hover:text-zinc-900"}`}
                          style={{ fontFamily: "var(--font-display)" }}
                        >
                          {t.name}
                        </span>
                        <span className="block truncate font-mono text-[9.5px] tracking-[0.08em] text-zinc-400" style={{ fontFamily: "var(--font-body)" }}>
                          {t.title.split(",")[0]}
                        </span>
                      </span>
                      <span
                        className="ml-auto h-px w-5 shrink-0 transition-all"
                        style={{ background: isActive ? "#35339E" : "transparent" }}
                        aria-hidden
                      />
                    </button>
                  </li>
                );
              })}
            </ul>
            <p
              className="border-t px-4 py-4 font-mono text-[9.5px] leading-[1.6] tracking-[0.08em] text-zinc-400"
              style={{ fontFamily: "var(--font-body)", borderColor: "rgba(0,0,0,0.05)" }}
            >
              + 6 more recommendations in the full library — mentors, teammates, senior colleagues.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
