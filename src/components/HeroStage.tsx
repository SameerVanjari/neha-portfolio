"use client";

import { useEffect, useState } from "react";
import type { ThemeId } from "@/data/themes";
import { THEMES } from "@/data/themes";
import GradientOrbs from "./background/GradientOrbs";

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
      <img src={island.image} alt={island.imageAlt} className="h-full w-full object-cover" draggable={false} />
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-black/10" />
      <div className="absolute inset-0 opacity-40 mix-blend-overlay" style={{ background: `linear-gradient(100deg, transparent 40%, ${island.color}18 100%)` }} />
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />
    </>
  );
}

function TextStack({ island }: { island: IslandData }) {
  return (
    <div className="max-w-[560px] hero-text">
      <div className="hero-row mb-3 flex items-center gap-2" style={{ ["--delay" as string]: "60ms" } as React.CSSProperties}>
        <span className="h-2 w-2 rounded-full" style={{ background: island.color, boxShadow: `0 0 10px ${island.color}` }} />
        <span className="font-mono text-[10px] tracking-[0.2em]" style={{ color: island.color }}>
          {island.subtitle}
        </span>
        <span className="font-mono text-[10px] tracking-[0.14em] text-white/60">· {island.stat}</span>
      </div>

      <h1
        className="hero-row font-display text-[30px] font-bold leading-[0.95] tracking-[-0.03em] text-white md:text-[44px] lg:text-[48px]"
        style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.03em", ["--delay" as string]: "130ms" } as React.CSSProperties}
      >
        {island.title}
      </h1>

      <p
        className="hero-row mt-3 max-w-[520px] text-[14px] leading-[1.6] text-white/75 md:mt-4 md:text-[15px]"
        style={{ fontFamily: "var(--font-body)", fontWeight: 400, ["--delay" as string]: "200ms" } as React.CSSProperties}
      >
        {island.description}
      </p>
    </div>
  );
}

function getTheme(id: ThemeId) {
  return THEMES[id];
}

export default function HeroStage({
  activeId,
  baseId,
  overlayId,
  islands,
}: {
  activeId: ThemeId;
  baseId: ThemeId;
  overlayId: ThemeId | null;
  islands: IslandData[];
}) {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const m = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(m.matches);
    const h = () => setReduced(m.matches);
    m.addEventListener("change", h);
    return () => m.removeEventListener("change", h);
  }, []);

  const activeIsland = islands.find((i) => i.id === activeId)!;
  const baseIsland = islands.find((i) => i.id === baseId)!;
  const overlayIsland = overlayId ? islands.find((i) => i.id === overlayId)! : null;
  const isWaving = !!overlayId && !!overlayIsland;

  // stable hero card height — prevents layout shift on perception change
  const cardHeight = "clamp(480px, 62vh, 640px)";

  if (reduced) {
    return (
      <div className="relative flex min-h-[100dvh] flex-col items-center justify-start overflow-hidden pt-[80px]">
        <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden>
          <GradientOrbs theme={THEMES[activeId]} />
          {/* fade hero into next section — uses below-section color #fafaf9, no layout gap (absolute) */}
          <div
            className="absolute inset-x-0 bottom-0 h-[160px] md:h-[220px]"
            style={{ background: `linear-gradient(to bottom, rgba(255,255,255,0) 0%, ${THEMES[activeId].wash}14 38%, #fafaf9 88%)` }}
          />
        </div>
        <div className="relative w-full max-w-[1280px] px-6 md:px-8">
          <div
            className="relative overflow-hidden rounded-[24px] bg-white"
            style={{ border: `1px solid ${THEMES[activeId].border}`, height: cardHeight }}
          >
            <div className="absolute inset-0">
              <CardImage island={activeIsland} />
            </div>
            <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8 lg:p-10">
              <TextStack island={activeIsland} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <style>{`
        .hero-row{
          opacity: 0;
          transform: translateY(14px);
          transition: opacity 420ms var(--ease-out, cubic-bezier(0.23,1,0.32,1)), transform 420ms var(--ease-out, cubic-bezier(0.23,1,0.32,1));
          transition-delay: var(--delay, 0ms);
          will-change: transform, opacity;
        }
        .hero-card--visible .hero-row{
          opacity: 1;
          transform: translateY(0);
        }
        .hero-wave{
          clip-path: circle(0% at 50% 92%);
          transition: clip-path 2050ms cubic-bezier(0.32,0.72,0,1);
          will-change: clip-path;
        }
        .hero-wave--expanded{
          clip-path: circle(150% at 50% 92%);
        }
        @media (prefers-reduced-motion: reduce){
          .hero-row{ transition: opacity 180ms ease-out; transform: none; }
          .hero-wave{ transition: opacity 250ms ease-out; clip-path: none; opacity: 0; }
          .hero-wave--expanded{ opacity: 1; }
        }
      `}</style>

      {/* Base — static, stable height */}
      <div className="relative flex min-h-[100dvh] flex-col items-center justify-start overflow-hidden pt-[76px]">
        <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden>
          <GradientOrbs theme={THEMES[baseId]} />
          {/* fade hero into next section — absolute, no extra layout height, matches #fafaf9 below */}
          <div
            className="absolute inset-x-0 bottom-0 h-[160px] md:h-[220px]"
            style={{ background: `linear-gradient(to bottom, rgba(255,255,255,0) 0%, ${THEMES[baseId].wash}14 38%, #fafaf9 88%)` }}
          />
        </div>
        <div className="relative w-full max-w-[1280px] px-6 md:px-8">
          <div
            className={`relative overflow-hidden rounded-[24px] bg-white hero-card ${!isWaving ? "hero-card--visible" : ""}`}
            style={{ border: `1px solid ${THEMES[baseId].border}`, height: cardHeight }}
          >
            <div className="absolute inset-0">
              <CardImage island={baseIsland} />
            </div>
            <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8 lg:p-10">
              <div className="max-w-[560px]" style={{ opacity: isWaving ? 0.9 : 1, transition: "opacity 180ms cubic-bezier(0.23,1,0.32,1)" }}>
                <div className="mb-3 flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full" style={{ background: baseIsland.color, boxShadow: `0 0 10px ${baseIsland.color}` }} />
                  <span className="font-mono text-[10px] tracking-[0.2em]" style={{ color: baseIsland.color }}>
                    {baseIsland.subtitle}
                  </span>
                  <span className="font-mono text-[10px] tracking-[0.14em] text-white/60">· {baseIsland.stat}</span>
                </div>
                <h1 className="font-display text-[30px] font-bold leading-[0.95] tracking-[-0.03em] text-white md:text-[44px] lg:text-[48px]" style={{ fontFamily: "var(--font-display)" }}>
                  {baseIsland.title}
                </h1>
                <p className="mt-3 max-w-[520px] text-[14px] leading-[1.6] text-white/75 md:text-[15px]" style={{ fontFamily: "var(--font-body)" }}>
                  {baseIsland.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Overlay — CSS clip-path wave, stable size */}
      {isWaving && overlayIsland && (
        <div
          className={`pointer-events-none fixed inset-0 z-10 flex min-h-[100dvh] flex-col items-center justify-start overflow-hidden pt-[76px] pb-8 hero-wave ${isWaving ? "hero-wave--expanded" : ""}`}
          aria-hidden
        >
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <GradientOrbs theme={THEMES[overlayId!]} />
            <div
              className="absolute inset-x-0 bottom-0 h-[160px] md:h-[220px]"
              style={{ background: `linear-gradient(to bottom, rgba(255,255,255,0) 0%, ${THEMES[overlayId!].wash}14 38%, #fafaf9 102%)` }}
            />
          </div>

          <div className="relative w-full max-w-[1280px] px-6 md:px-8">
            <div
              className="relative overflow-hidden rounded-[24px] bg-white hero-card hero-card--visible"
              style={{ border: `1px solid ${THEMES[overlayId!].border}`, height: cardHeight }}
            >
              <div className="absolute inset-0">
                <CardImage island={overlayIsland!} />
              </div>
              <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8 lg:p-10">
                <TextStack island={overlayIsland!} />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
