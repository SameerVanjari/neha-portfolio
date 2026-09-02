"use client";

import { useEffect, useRef } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
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

const EASE_OUT: [number, number, number, number] = [0.23, 1, 0.32, 1];
const EASE_WAVE: [number, number, number, number] = [0.32, 0.72, 0, 1];
const DURATION_WAVE = 2.05; // shared token with ThemeWave — cohesion

const rowStagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.06 } },
  exit: { transition: { staggerChildren: 0.04, staggerDirection: -1 } },
};

const rowStaggerOverlay = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.52 } },
  exit: { transition: { staggerChildren: 0.04, staggerDirection: -1 } },
};

const rowVariant = {
  hidden: { opacity: 0, transform: "translateY(14px)" },
  visible: { opacity: 1, transform: "translateY(0px)", transition: { duration: 0.42, ease: EASE_OUT } },
  exit: { opacity: 0, transform: "translateY(-8px)", transition: { duration: 0.22, ease: EASE_OUT } },
};

const rowVariantReduced = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.18, ease: "easeOut" as const } },
  exit: { opacity: 0, transition: { duration: 0.12, ease: "easeOut" as const } },
};

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

function TextStack({ island, reduceMotion, isOverlay }: { island: IslandData; reduceMotion: boolean | null; isOverlay?: boolean }) {
  const stagger = isOverlay ? rowStaggerOverlay : rowStagger;
  return (
    <motion.div
      key={`${island.id}-text`}
      variants={reduceMotion ? rowVariantReduced : stagger}
      initial="hidden"
      animate="visible"
      exit="hidden"
      className="max-w-[560px] will-change-transform"
    >
      <motion.div variants={reduceMotion ? rowVariantReduced : rowVariant} className="mb-3 flex items-center gap-2">
        <span className="h-2 w-2 rounded-full" style={{ background: island.color, boxShadow: `0 0 10px ${island.color}` }} />
        <span className="font-mono text-[10px] tracking-[0.2em]" style={{ color: island.color }}>
          {island.subtitle}
        </span>
        <span className="font-mono text-[10px] tracking-[0.14em] text-white/60">· {island.stat}</span>
      </motion.div>

      <motion.h1
        variants={reduceMotion ? rowVariantReduced : rowVariant}
        className="font-display text-[30px] font-bold leading-[0.95] tracking-[-0.03em] text-white md:text-[44px] lg:text-[48px]"
        style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.03em" }}
      >
        {island.title}
      </motion.h1>

      <motion.p
        variants={reduceMotion ? rowVariantReduced : rowVariant}
        className="mt-3 max-w-[520px] text-[14px] leading-[1.6] text-white/75 md:mt-4 md:text-[15px]"
        style={{ fontFamily: "var(--font-body)", fontWeight: 400 }}
      >
        {island.description}
      </motion.p>
    </motion.div>
  );
}

function HeroPanel({ island, theme }: { island: IslandData; theme: ReturnType<typeof getTheme> }) {
  return (
    <>
      <div
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
        aria-hidden
      >
        <div
          className="h-[520px] w-[720px] max-w-[90vw] rounded-[40px] blur-[80px] opacity-40"
          style={{ background: `radial-gradient(ellipse at center, ${theme.glow} 0%, transparent 72%)` }}
        />
      </div>

      <div className="relative w-full max-w-[1040px]">
        <div className="mb-4 flex items-center justify-center gap-3">
          <span className="h-px w-8" style={{ background: theme.faint }} />
          <span className="font-mono text-[11px] tracking-[0.24em]" style={{ color: theme.muted }}>
            PERCEPTION · {island.label}
          </span>
          <span className="h-px w-8" style={{ background: theme.faint }} />
        </div>

        <div
          className="relative overflow-hidden rounded-[28px] bg-white shadow-[0_16px_48px_rgba(0,0,0,0.08),0_1px_0_rgba(255,255,255,0.8)_inset] md:rounded-[32px]"
          style={{ border: `1px solid ${theme.border}` }}
        >
          <div className="relative aspect-[4/3] w-full overflow-hidden md:aspect-[16/10] lg:aspect-[16/9]">
            <div className="absolute inset-0">
              <CardImage island={island} />
            </div>
            <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-10">
              <TextStack island={island} reduceMotion={null} />
              <div className="mt-6 flex items-center justify-end border-t border-white/15 pt-4">
                <span className="h-1.5 w-8 rounded-full opacity-70" style={{ background: island.color }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
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
  const reduceMotion = useReducedMotion();

  const activeIsland = islands.find((i) => i.id === activeId)!;
  const baseIsland = islands.find((i) => i.id === baseId)!;
  const overlayIsland = overlayId ? islands.find((i) => i.id === overlayId)! : null;

  const isWaving = !!overlayId && !!overlayIsland;
  const hasWavedRef = useRef(false);
  useEffect(() => {
    if (isWaving) hasWavedRef.current = true;
  }, [isWaving]);
  const showBaseStagger = !isWaving && !hasWavedRef.current;

  if (reduceMotion) {
    // Reduced: no wave, simple crossfade — keeps comprehension, drops position
    return (
      <div className="relative flex h-[100dvh] max-h-[100dvh] flex-col items-center justify-center overflow-hidden px-4 pt-[64px] pb-[88px] md:px-6 md:pb-[96px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeId}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.28, ease: EASE_OUT }}
            className="relative flex w-full flex-col items-center justify-center"
          >
            <HeroPanel island={activeIsland} theme={getTheme(activeId)} />
          </motion.div>
        </AnimatePresence>
      </div>
    );
  }

  return (
    <>
      {/* Base — always underneath, static */}
      <div className="relative flex h-[100dvh] max-h-[100dvh] flex-col items-center justify-center overflow-hidden px-4 pt-[64px] pb-[88px] md:px-6 md:pb-[96px]">
        <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden>
          <GradientOrbs theme={THEMES[baseId]} />
        </div>
        {!isWaving && (
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-0" aria-hidden>
            <div
              className="h-[520px] w-[720px] max-w-[90vw] rounded-[40px] blur-[80px] opacity-40"
              style={{ background: `radial-gradient(ellipse at center, ${THEMES[baseId].glow} 0%, transparent 72%)` }}
            />
          </div>
        )}
        <div className="relative w-full max-w-[1040px]">
          {!isWaving && (
            <div className="mb-4 flex items-center justify-center gap-3">
              <span className="h-px w-8" style={{ background: THEMES[baseId].faint }} />
              <span className="font-mono text-[11px] tracking-[0.24em]" style={{ color: THEMES[baseId].muted }}>
                PERCEPTION · {baseIsland.label}
              </span>
              <span className="h-px w-8" style={{ background: THEMES[baseId].faint }} />
            </div>
          )}
          {isWaving && <div className="mb-4 h-[17px]" aria-hidden />}
          <div
            className="relative overflow-hidden rounded-[28px] bg-white shadow-[0_16px_48px_rgba(0,0,0,0.08),0_1px_0_rgba(255,255,255,0.8)_inset] md:rounded-[32px]"
            style={{ border: `1px solid ${THEMES[baseId].border}` }}
          >
            <div className="relative aspect-[4/3] w-full overflow-hidden md:aspect-[16/10] lg:aspect-[16/9]">
              <div className="absolute inset-0">
                <CardImage island={baseIsland} />
              </div>
              <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-10">
                {isWaving ? (
                  <>
                    <div className="max-w-[560px] opacity-90">
                      <div className="mb-3 flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full" style={{ background: baseIsland.color }} />
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
                    <div className="mt-6 flex items-center justify-end border-t border-white/15 pt-4">
                      <span className="h-1.5 w-8 rounded-full opacity-70" style={{ background: baseIsland.color }} />
                    </div>
                  </>
                ) : showBaseStagger ? (
                  <>
                    <AnimatePresence mode="wait">
                      <TextStack key={`${baseIsland.id}-text`} island={baseIsland} reduceMotion={false} />
                    </AnimatePresence>
                    <div className="mt-6 flex items-center justify-end border-t border-white/15 pt-4">
                      <span className="h-1.5 w-8 rounded-full opacity-70" style={{ background: baseIsland.color }} />
                    </div>
                  </>
                ) : (
                  <>
                    <div className="max-w-[560px]">
                      <div className="mb-3 flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full" style={{ background: baseIsland.color }} />
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
                    <div className="mt-6 flex items-center justify-end border-t border-white/15 pt-4">
                      <span className="h-1.5 w-8 rounded-full opacity-70" style={{ background: baseIsland.color }} />
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Overlay — synced wave, same viewport mask as ThemeWave */}
      <AnimatePresence>
        {isWaving && (
          <motion.div
            key={`hero-wave-${overlayId}`}
            initial={{ clipPath: "circle(0% at 50% 92%)" }}
            animate={{ clipPath: "circle(150% at 50% 92%)" }}
            exit={{ clipPath: "circle(150% at 50% 92%)" }}
            transition={{ duration: DURATION_WAVE, ease: EASE_WAVE }}
            className="pointer-events-none fixed inset-0 z-10 flex h-[100dvh] max-h-[100dvh] flex-col items-center justify-center overflow-hidden px-4 pt-[64px] pb-[88px] md:px-6 md:pb-[96px] will-change-[clip-path]"
            aria-hidden
          >
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              <GradientOrbs theme={THEMES[overlayId!]} />
            </div>

            <div className="relative w-full max-w-[1040px]">
              <div className="mb-4 flex items-center justify-center gap-3">
                <span className="h-px w-8" style={{ background: THEMES[overlayId!].faint }} />
                <span className="font-mono text-[11px] tracking-[0.24em]" style={{ color: THEMES[overlayId!].muted }}>
                  PERCEPTION · {overlayIsland!.label}
                </span>
                <span className="h-px w-8" style={{ background: THEMES[overlayId!].faint }} />
              </div>

              <div
                className="relative overflow-hidden rounded-[28px] bg-white shadow-[0_16px_48px_rgba(0,0,0,0.08),0_1px_0_rgba(255,255,255,0.8)_inset] md:rounded-[32px]"
                style={{ border: `1px solid ${THEMES[overlayId!].border}` }}
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden md:aspect-[16/10] lg:aspect-[16/9]">
                  <div className="absolute inset-0">
                    <CardImage island={overlayIsland!} />
                  </div>
                  <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-10">
                    <TextStack island={overlayIsland!} reduceMotion={false} isOverlay />
                    <div className="mt-6 flex items-center justify-end border-t border-white/15 pt-4">
                      <span className="h-1.5 w-8 rounded-full opacity-70" style={{ background: overlayIsland!.color }} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
