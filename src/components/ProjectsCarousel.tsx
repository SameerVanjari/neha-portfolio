"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, useAnimationControls, useReducedMotion } from "framer-motion";
import type { ThemeId } from "@/data/themes";
import { THEMES } from "@/data/themes";
import Link from "next/link";

type Project = {
  id: string;
  title: string;
  perception: ThemeId;
  dimension: string;
  subtitle?: string;
  year: string;
  color: string;
  image: string;
  imageAlt: string;
};

// Full-bleed image card — text over image
function FullImageCard({ p }: { p: Project }) {
  return (
    <article
      className="group relative flex h-[420px] w-[320px] shrink-0 flex-col justify-end overflow-hidden rounded-[24px] md:h-[460px] md:w-[380px] md:rounded-[28px]"
      style={{
        boxShadow: "0 16px 48px rgba(0,0,0,0.12), 0 1px 0 rgba(255,255,255,0.6) inset",
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={p.image}
        alt={p.imageAlt}
        loading="lazy"
        draggable={false}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-[1.04]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
      <div
        className="absolute inset-0 opacity-30 mix-blend-overlay"
        style={{ background: `linear-gradient(110deg, transparent 42%, ${p.color}26 100%)` }}
      />

      <div className="absolute left-4 top-4">
        <span className="rounded-full bg-white/92 px-3 py-1.5 font-mono text-[10px] tracking-[0.14em] text-zinc-900 backdrop-blur">
          {p.year} · {p.dimension}
        </span>
      </div>

      <div className="relative p-6 md:p-7">
        <h3
          className="font-display text-[20px] font-semibold leading-[1.05] tracking-[-0.02em] text-white md:text-[22px]"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {p.title}
        </h3>
        <p className="mt-1.5 font-mono text-[10px] tracking-[0.16em] text-white/70">{p.subtitle ?? p.dimension}</p>
        <div className="mt-4 h-px w-8 bg-white/30 group-hover:w-12 transition-all" aria-hidden />
      </div>
    </article>
  );
}

export default function ProjectsCarousel({ activeId, projects }: { activeId: ThemeId; projects: Project[] }) {
  const reduce = useReducedMotion();
  const controls = useAnimationControls();
  const [paused, setPaused] = useState(false);
  const [userPaused, setUserPaused] = useState(false);

  const filtered = useMemo(() => projects.filter((p) => p.perception === activeId), [projects, activeId]);
  const items = filtered.length ? filtered : projects;
  const needsLoop = items.length > 1;

  const track = useMemo(() => {
    if (items.length === 1) return [...items, ...items, ...items, ...items, ...items, ...items];
    if (items.length === 2) return [...items, ...items, ...items, ...items];
    if (items.length === 3) return [...items, ...items, ...items];
    return [...items, ...items];
  }, [items]);

  useEffect(() => {
    if (reduce || !needsLoop) return;
    if (paused || userPaused) {
      controls.stop();
    } else {
      controls.start({
        x: ["0%", "-50%"],
        transition: { duration: 30, ease: "linear", repeat: Infinity, repeatType: "loop" },
      });
    }
  }, [controls, paused, userPaused, reduce, needsLoop, filtered]);

  if (reduce || !needsLoop) {
    return (
      <div className="px-6 md:px-8">
        <div className="flex gap-4 overflow-x-auto scrollbar-none snap-x snap-mandatory pb-2">
          {items.map((p) => (
            <Link key={p.id} href="/projects" className="snap-start shrink-0">
              <FullImageCard p={p} />
            </Link>
          ))}
        </div>
      </div>
    );
  }

  // Full viewport bleed
  return (
    <div
      className="relative overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div className="overflow-hidden" aria-roledescription="carousel" aria-label="Projects — infinite loop">
        <motion.div className="flex w-max gap-4 py-2 md:gap-5 will-change-transform" animate={controls} style={{ willChange: "transform" }}>
          {track.map((p, i) => (
            <Link key={`${p.id}-${i}`} href="/projects" className="shrink-0">
              <FullImageCard p={p} />
            </Link>
          ))}
        </motion.div>
      </div>

      <div className="mx-auto flex max-w-[1280px] items-center justify-between gap-3 px-6 py-4 md:px-8">
        <button
          onClick={() => setUserPaused((v) => !v)}
          aria-pressed={userPaused}
          className="rounded-full border bg-white px-3.5 py-2 font-mono text-[11px] tracking-[0.14em] text-zinc-700"
          style={{ borderColor: "rgba(0,0,0,0.08)", boxShadow: "0 1px 8px rgba(0,0,0,0.06)" }}
        >
          {userPaused ? "Resume" : "Pause"} motion
        </button>
        <span className="font-mono text-[10px] tracking-[0.14em] text-zinc-500">
          {items.length} in {activeId.toUpperCase()} · <Link href="/projects" className="underline underline-offset-4 decoration-zinc-300 hover:decoration-zinc-600">View all →</Link>
        </span>
      </div>
    </div>
  );
}
