"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import Nav from "@/components/Nav";
import { THEMES, type ThemeId } from "@/data/themes";
import data from "@/data/portfolio.json";
import Link from "next/link";

type Project = {
  id: string;
  title: string;
  perception: ThemeId;
  subtitle?: string;
  dimension: string;
  year: string;
  color: string;
  image: string;
  imageAlt: string;
  blurb: string;
};

const FILTERS: (ThemeId | "all")[] = ["all", "ai", "xr", "ux", "product"];

export default function ProjectsPage() {
  const [filter, setFilter] = useState<ThemeId | "all">("all");
  const reduceMotion = useReducedMotion();
  const themeForFilter: ThemeId = filter === "all" ? "product" : filter;
  const theme = THEMES[themeForFilter];

  const projects = (data as unknown as { projects: Project[] }).projects;
  // sort — matching perception first, stable sort keeps original order otherwise
  const sorted = useMemo(() => {
    if (filter === "all") return projects;
    return [...projects].sort((a, b) => {
      const aMatch = a.perception === filter ? 0 : 1;
      const bMatch = b.perception === filter ? 0 : 1;
      return aMatch - bMatch;
    });
  }, [filter, projects]);

  return (
    <>
      <Nav theme={theme} activeSection="projects" />
      <main className="pt-[64px]">
        <section className="mx-auto max-w-[1280px] px-6 md:px-8">
          <div className="h-px w-full bg-black/5" />

          <div className="py-10 md:py-14">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <div className="mb-4 flex items-center gap-3">
                  <span className="h-px w-10" style={{ background: theme.faint }} />
                  <span className="font-mono text-[11px] tracking-[0.22em]" style={{ color: theme.muted }}>
                    PROJECTS · {projects.length.toString().padStart(2, "0")}
                  </span>
                </div>
                <h1 className="font-display text-[32px] font-semibold leading-[0.9] tracking-[-0.04em] text-zinc-900 md:text-[44px] lg:text-[52px]" style={{ fontFamily: "var(--font-display)" }}>
                  Selected work
                  <span className="font-light text-zinc-400">.</span>
                </h1>
                <p className="mt-3 max-w-[520px] text-[14px] leading-[1.6] text-zinc-500">Minimal cards — image, title, subtitle. Filter by perception to see the work through that lens.</p>
              </div>

              <div className="flex flex-wrap gap-1.5">
                {FILTERS.map((f) => {
                  const isActive = filter === f;
                  const t = f === "all" ? { accent: "#111827", border: "rgba(0,0,0,0.12)", text: "#111827" } : THEMES[f as ThemeId];
                  return (
                    <button
                      key={f}
                      onClick={() => setFilter(f)}
                      aria-pressed={isActive}
                      className="rounded-full border px-3.5 py-1.5 font-mono text-[11px] tracking-[0.12em] transition-colors"
                      style={{
                        background: isActive ? "#111827" : "#fff",
                        color: isActive ? "#fff" : "#52525b",
                        borderColor: isActive ? "#111827" : "rgba(0,0,0,0.08)",
                      }}
                    >
                      {f === "all" ? "All" : f.toUpperCase()}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* grid — layoutIds for sort motion */}
            <motion.div layout className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 md:gap-6">
              <AnimatePresence initial={false}>
                {sorted.map((p) => {
                  const cardTheme = THEMES[p.perception];
                  const isActive = filter === "all" || p.perception === filter;
                  return (
                    <motion.div
                      key={p.id}
                      layout={!reduceMotion}
                      layoutId={`card-${p.id}`}
                      initial={reduceMotion ? undefined : { opacity: 0, scale: 0.97 }}
                      animate={{
                        opacity: 1,
                        scale: 1,
                      }}
                      exit={reduceMotion ? undefined : { opacity: 0, scale: 0.97 }}
                      transition={
                        reduceMotion
                          ? { duration: 0.15 }
                          : {
                              layout: { type: "spring", stiffness: 380, damping: 32 },
                              opacity: { duration: 0.22, ease: [0.23, 1, 0.32, 1] },
                              scale: { duration: 0.22, ease: [0.23, 1, 0.32, 1] },
                            }
                      }
                      style={{ opacity: isActive ? 1 : 0.38 }}
                      className="will-change-transform"
                    >
                      <article
                        className="group overflow-hidden rounded-[20px] bg-white transition-all"
                        style={{
                          border: `1px solid ${isActive ? cardTheme.border : "rgba(0,0,0,0.06)"}`,
                          boxShadow: isActive ? "0 8px 32px rgba(0,0,0,0.06)" : "0 4px 16px rgba(0,0,0,0.04)",
                        }}
                      >
                        <div className="relative aspect-[4/3] overflow-hidden bg-zinc-100">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={p.image} alt={p.imageAlt} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]" loading="lazy" />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
                          <div
                            className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 font-mono text-[10px] tracking-[0.12em] backdrop-blur"
                            style={{ color: cardTheme.text, border: `1px solid ${cardTheme.border}` }}
                          >
                            {p.year} · {p.dimension}
                          </div>
                        </div>
                        <div className="px-4 py-4 md:px-5 md:py-5">
                          <h3 className="font-display text-[16px] font-semibold leading-[1.15] tracking-[-0.02em] text-zinc-900" style={{ fontFamily: "var(--font-display)" }}>
                            {p.title}
                          </h3>
                          <p className="mt-1 font-mono text-[10px] tracking-[0.14em] text-zinc-500">{p.subtitle ?? p.dimension}</p>
                          <p className="mt-3 line-clamp-2 text-[13px] leading-[1.55] text-zinc-500">{p.blurb}</p>
                        </div>
                      </article>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </motion.div>
          </div>

          <div className="h-px w-full bg-black/5" />
        </section>

        <div className="mx-auto max-w-[1280px] px-6 py-8 md:px-8">
          <div className="flex flex-wrap gap-3">
            <Link href="/" className="rounded-full border bg-white px-6 py-3 font-mono text-[12px] tracking-[0.12em] text-zinc-700" style={{ borderColor: "rgba(0,0,0,0.08)" }}>
              ← Back home
            </Link>
            <Link href="/about" className="rounded-full bg-zinc-900 px-6 py-3 font-mono text-[12px] tracking-[0.12em] text-white">About Neha →</Link>
          </div>
        </div>

        <footer className="mx-auto max-w-[1280px] px-6 pb-10 md:px-8">
          <div className="h-px w-full bg-black/5" />
          <div className="flex justify-start pt-6 font-mono text-[10px] tracking-[0.12em] text-zinc-400">
            <span>© 2026 NEHA</span>
          </div>
        </footer>
      </main>
    </>
  );
}
