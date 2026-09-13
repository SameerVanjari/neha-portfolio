"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { useLenis } from "lenis/react";
import type { ThemeId } from "@/data/themes";
import { THEMES } from "@/data/themes";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type IslandId = ThemeId;

interface IslandData {
  id: IslandId;
  label: string;
  title: string;
  subtitle: string;
  color: string;
  description: string;
  image: string;
  imageAlt: string;
  stat: string;
}

function CardImage({ island }: { island: IslandData }) {
  return (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={island.image}
        alt={island.imageAlt}
        className="h-full w-full object-cover hero-image"
        draggable={false}
        loading="eager"
      />
      {/* MINIMAL overlay - only for text legibility */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/15 via-transparent to-transparent" />
    </>
  );
}

// Row offsets + per-char stagger + the wait for the image zoom to settle.
const ROW_BASE = [0, 150, 440];
const CHAR_STAGGER = 7;
const ZOOM_WAIT = 850;

function Chars({ text, row }: { text: string; row: number }) {
  const words = text.split(" ");
  let charIndex = 0;
  return (
    <>
      {words.map((word, wi) => (
        <span key={wi}>
          <span className="hero-word">
            {Array.from(word).map((ch, ci) => {
              const delay = ZOOM_WAIT + ROW_BASE[row] + charIndex * CHAR_STAGGER;
              charIndex += 1;
              return (
                <span
                  key={ci}
                  aria-hidden
                  className="hero-char"
                  style={{ ["--char-delay" as string]: `${delay}ms` } as React.CSSProperties}
                >
                  {ch}
                </span>
              );
            })}
          </span>
          {wi < words.length - 1 ? " " : null}
        </span>
      ))}
    </>
  );
}

function HeroText({ island }: { island: IslandData }) {
  return (
    <div className="hero-text hero-text--visible max-w-[640px] px-6 md:px-10 lg:px-14">
      <p className="hero-row font-mono text-[12px] tracking-[0.22em] text-white/95 mb-4">
        <Chars text={island.label} row={0} />
        {island.stat ? (
          <span
            aria-hidden
            className="hero-stat"
            style={{
              color: "rgba(255,255,255,0.65)",
              ["--char-delay" as string]: `${ZOOM_WAIT + ROW_BASE[0] + island.label.length * CHAR_STAGGER}ms`,
            } as React.CSSProperties}
          >
            · {island.stat}
          </span>
        ) : null}
      </p>

      <h1
        className="hero-row font-display text-[36px] font-bold leading-[1.05] tracking-[-0.03em] text-white md:text-[52px] lg:text-[64px] xl:text-[72px]"
        style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.03em" }}
      >
        <Chars text={island.title} row={1} />
      </h1>

      <p className="hero-row mt-6 text-[18px] leading-[1.6] text-white/95 max-w-[540px]" style={{ fontFamily: "var(--font-body)" }}>
        <Chars text={island.subtitle} row={2} />
      </p>
    </div>
  );
}

function OverlayHero({ island }: { island: IslandData }) {
  const frameRef = useRef<HTMLDivElement>(null);
  return (
    <div
      ref={frameRef}
      className="relative hero-frame hero-frame--base"
      style={{ height: "100dvh", width: "100%" }}
      aria-hidden
    >
      <div className="absolute inset-0 hero-image-wrapper" style={{ zIndex: 0, transformOrigin: "center center", overflow: "hidden" }}>
        <CardImage island={island} />
      </div>
      <div className="absolute inset-0 flex items-center pointer-events-none" style={{ zIndex: 10 }}>
        <div className="w-full pointer-events-auto pt-20 md:pt-0">
          <HeroText island={island} />
        </div>
      </div>
    </div>
  );
}

export default function HeroStage({
  baseId,
  overlayId,
  islands,
}: {
  baseId: ThemeId;
  overlayId: ThemeId | null;
  islands: IslandData[];
}) {
  const [reduced, setReduced] = useState(() => {
    if (typeof window !== "undefined") {
      return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    }
    return false;
  });
  const lenis = useLenis();
  const baseFrameRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const m = window.matchMedia("(prefers-reduced-motion: reduce)");
    const h = () => setReduced(m.matches);
    m.addEventListener("change", h);
    return () => m.removeEventListener("change", h);
  }, []);

  const baseIsland = islands.find((i) => i.id === baseId)!;
  const overlayIsland = overlayId ? islands.find((i) => i.id === overlayId)! : null;
  const isWaving = !!overlayId && !!overlayIsland;

  // Simple parallax: image moves slightly slower than scroll
  useEffect(() => {
    if (reduced || !lenis) return;

    const frames = document.querySelectorAll<HTMLElement>(".hero-frame");
    frames.forEach((frame) => {
      const image = frame.querySelector<HTMLElement>(".hero-image");
      if (!image) return;
      ScrollTrigger.create({
        trigger: frame,
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          // Parallax: image moves at ~30% of scroll speed
          const yOffset = gsap.utils.interpolate(-60, 60, progress);
          image.style.transform = `translateY(${yOffset}px)`;
        },
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, [lenis, reduced]);

  const renderFrame = useCallback((
    island: IslandData,
    _theme: typeof THEMES[keyof typeof THEMES],
    frameRef: React.RefObject<HTMLDivElement | null>
  ) => (
    <div
      ref={frameRef}
      className="relative hero-frame hero-frame--base"
      style={{
        height: "100dvh",
        width: "100%",
      }}
      aria-hidden
    >
      {/* Image wrapper — zooms out via CSS animation */}
      <div className="absolute inset-0 hero-image-wrapper" style={{ zIndex: 0, transformOrigin: "center center", overflow: "hidden" }}>
        <CardImage island={island} />
      </div>

      {/* Text layer — top */}
      <div className="absolute inset-0 flex items-center pointer-events-none" style={{ zIndex: 10 }}>
        <div className="w-full pointer-events-auto pt-20 md:pt-0">
          <HeroText island={island} />
        </div>
      </div>
    </div>
  ), []);

  return (
    <>
      <style jsx global>{`
        .hero-row{
          will-change: transform, opacity;
        }
        /* Entrance — image zooms out first (pure CSS, robust to client nav) */
        .hero-frame--base .hero-image-wrapper{
          animation: heroZoom 1s var(--ease-out, cubic-bezier(0.23,1,0.32,1)) forwards;
        }
        @keyframes heroZoom{
          from{ transform: scale(2); }
          to{ transform: scale(1); }
        }

        .hero-wave{
          clip-path: circle(0% at 50% 92%);
          transition: clip-path 2050ms cubic-bezier(0.32,0.72,0,1);
          will-change: clip-path;
        }
        .hero-wave--expanded{
          clip-path: circle(150% at 50% 92%);
        }

        /* Character-level blur fade in from the right */
        .hero-word{
          display: inline-block;
          white-space: nowrap;
        }
        .hero-char,
        .hero-stat{
          display: inline-block;
          opacity: 0;
          filter: blur(8px);
          transform: translateX(24px);
          will-change: transform, opacity, filter;
        }
        .hero-text--visible .hero-char,
        .hero-text--visible .hero-stat{
          animation: heroCharIn 520ms var(--ease-out, cubic-bezier(0.23,1,0.32,1)) forwards;
          animation-delay: var(--char-delay, 0ms);
        }
        @keyframes heroCharIn{
          to{
            opacity: 1;
            filter: blur(0);
            transform: translateX(0);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .hero-frame--base .hero-image-wrapper{
            animation: none !important;
            transform: none !important;
          }
          .hero-wave{
            transition: opacity 250ms ease-out;
            clip-path: none;
            opacity: 0;
          }
          .hero-wave--expanded{ opacity: 1; }
          .hero-char,
          .hero-stat{
            animation: none !important;
            opacity: 1;
            filter: none;
            transform: none;
          }
        }
      `}</style>

      <div className="relative min-h-[100dvh] overflow-hidden">
        <div style={{ height: "100dvh", width: "100%" }}>
          {renderFrame(baseIsland, THEMES[baseId], baseFrameRef)}
        </div>

        {isWaving && overlayIsland && (
          <div
            className={`fixed inset-0 z-10 pointer-events-none hero-wave ${isWaving ? "hero-wave--expanded" : ""}`}
            aria-hidden
          >
            <div className="absolute inset-0 pointer-events-auto" style={{ height: "100dvh", width: "100%" }}>
              <OverlayHero key={overlayId} island={overlayIsland} />
            </div>
          </div>
        )}
      </div>
    </>
  );
}
