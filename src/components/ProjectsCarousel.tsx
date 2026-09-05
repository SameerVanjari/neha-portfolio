"use client";

import { useEffect, useMemo } from "react";
import Link from "next/link";
import { useReducedMotion } from "framer-motion";
import type { ThemeId } from "@/data/themes";
import type { Project } from "@/types/portfolio";

// Featured card — 4:3 landscape; ribbon peaks at center (image zoom parallax: image stays full-cover while card height tapers)
function FullImageCard({ p }: { p: Project }) {
  return (
    <article
      className="relative flex w-[300px] shrink-0 flex-col justify-end overflow-hidden ribbon-card will-change-transform aspect-[4/3] md:w-[380px]"
      style={{
        boxShadow: "0 16px 48px rgba(0,0,0,0.12), 0 1px 0 rgba(255,255,255,0.6) inset",
        transformOrigin: "center center",
      }}
    >
      {/* media layer — inverse-scaled to stay full-cover (no stretch), creates zoom parallax when card tapers */}
      <div className="ribbon-media absolute inset-0 will-change-transform" style={{ transformOrigin: "center center" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={p.image}
          alt={p.imageAlt}
          loading="lazy"
          draggable={false}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
        <div
          className="absolute inset-0 opacity-30 mix-blend-overlay"
          style={{ background: `linear-gradient(110deg, transparent 42%, ${p.color}26 100%)` }}
        />
      </div>

      <div className="absolute left-4 top-4">
        <span className="rounded-full bg-white/92 px-3 py-1.5 font-mono text-[10px] tracking-[0.14em] text-zinc-900 backdrop-blur">
          {p.year} · {p.dimension}
        </span>
      </div>

      <div className="relative p-5 md:p-6">
        <h3
          className="font-display text-[16px] font-semibold leading-[1.05] tracking-[-0.02em] text-white md:text-[18px]"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {p.title}
        </h3>
        <p className="mt-1.5 font-mono text-[10px] tracking-[0.16em] text-white/70">{p.subtitle ?? p.dimension}</p>
        <div className="mt-4 h-px w-8 bg-white/30" aria-hidden />
      </div>
    </article>
  );
}

export default function ProjectsCarousel({ activeId, projects }: { activeId: ThemeId; projects: Project[] }) {
  const reduce = useReducedMotion();

  const filtered = useMemo(() => projects.filter((p) => p.perception === activeId), [projects, activeId]);
  const items = filtered.length ? filtered : projects;
  const needsLoop = items.length > 1;

  const track = useMemo(() => {
    if (items.length === 1) return [...items, ...items, ...items, ...items, ...items, ...items];
    if (items.length === 2) return [...items, ...items, ...items, ...items];
    if (items.length === 3) return [...items, ...items, ...items];
    return [...items, ...items];
  }, [items]);

  // ---- Ribbon effect: center cards full height, edges shorter ----
  // Uses transform scaleY (compositor-friendly) so carousel stays smooth.
  // Range: center 1.0 -> edge ~0.74, arch via smoothstep.
  useEffect(() => {
    const isReduced = !!reduce;
    // ribbon applies to both animated and static, but only when we have enough cards
    if (items.length <= 1) return;

    let raf = 0;
    let ticking = false;

    const applyRibbon = () => {
      const cards = document.querySelectorAll<HTMLElement>(".ribbon-card");
      if (!cards.length) return;
      const vw = window.innerWidth;
      const center = vw / 2;
      // falloff: 50% viewport — peak at center, valley at edges
      const maxDist = vw * 0.5;
      cards.forEach((el) => {
        const rect = el.getBoundingClientRect();
        const cardCenter = rect.left + rect.width / 2;
        const dist = Math.abs(cardCenter - center);
        const t = Math.min(dist / maxDist, 1);
        // smooth arch curve — gentle peak, faster drop at extremes
        const eased = 1 - Math.pow(1 - t, 1.8);
        // height taper: center 1 -> edge ~0.68 (4:3 keeps width constant)
        const scale = 1 - eased * 0.32;
        const clamped = Math.max(0.66, Math.min(1, scale));
        // subtle arch: edges dip down to read as hanging ribbon
        const archY = eased * 18;
        el.style.transform = `translateY(${archY}px) scaleY(${clamped})`;
        // keep image full-cover (no stretch) — inverse scale creates zoom parallax: edge cards crop/zoom, center shows full
        const media = el.querySelector<HTMLElement>(".ribbon-media");
        if (media) media.style.transform = `scaleY(${1 / clamped})`;
      });
    };

    const loop = () => {
      applyRibbon();
      raf = requestAnimationFrame(loop);
    };

    const onScrollOrResize = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(() => {
          applyRibbon();
          ticking = false;
        });
      }
    };

    if (!isReduced && needsLoop) {
      // animated marquee: continuous rAF so ribbon follows translateX
      raf = requestAnimationFrame(loop);
      window.addEventListener("resize", onScrollOrResize);
      return () => {
        cancelAnimationFrame(raf);
        window.removeEventListener("resize", onScrollOrResize);
      };
    } else {
      // static scrollable: update on scroll/resize + initial
      applyRibbon();
      window.addEventListener("resize", onScrollOrResize);
      window.addEventListener("scroll", onScrollOrResize, { passive: true });
      // also listen to the scroll container itself
      const scrollers = document.querySelectorAll<HTMLElement>(".ribbon-scroller");
      scrollers.forEach((s) => s.addEventListener("scroll", onScrollOrResize, { passive: true }));
      // observe for a couple frames to catch snap positions
      raf = requestAnimationFrame(() => {
        applyRibbon();
        raf = requestAnimationFrame(applyRibbon as FrameRequestCallback);
      });
      return () => {
        cancelAnimationFrame(raf);
        window.removeEventListener("resize", onScrollOrResize);
        window.removeEventListener("scroll", onScrollOrResize);
        scrollers.forEach((s) => s.removeEventListener("scroll", onScrollOrResize));
      };
    }
  }, [reduce, needsLoop, items.length, filtered, track]);

  if (reduce || !needsLoop) {
    return (
      <div className="px-6 md:px-8">
        <div className="ribbon-scroller flex items-center gap-2 overflow-x-auto scrollbar-none snap-x snap-mandatory py-8 md:gap-3 md:py-10">
          {items.map((p) => (
            <Link key={p.id} href={`/projects/${p.id}`} className="snap-start shrink-0 select-none">
              <FullImageCard p={p} />
            </Link>
          ))}
        </div>
      </div>
    );
  }

  // Full viewport bleed — ribbon arch centered in viewport
  // Continuous infinite loop — no hover pause/slow
  return (
    <>
      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .marquee-track {
          animation: marquee 30s linear infinite;
          will-change: transform;
        }
        @media (prefers-reduced-motion: reduce) {
          .marquee-track { animation: none !important; }
        }
      `}</style>
      <div className="relative overflow-hidden">
        <div className="overflow-hidden py-8 md:py-10" aria-roledescription="carousel" aria-label="Projects — infinite loop">
          <div className="flex w-max items-center gap-2 md:gap-3 will-change-transform marquee-track">
            {track.map((p, i) => (
              <Link key={`${p.id}-${i}`} href={`/projects/${p.id}`} className="shrink-0 select-none">
                <FullImageCard p={p} />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
