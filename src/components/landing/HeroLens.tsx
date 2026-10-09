"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { THEMES, type ThemeId } from "@/data/themes";
import { HERO_LENSES } from "@/data/landing";
import { EASE_OUT, LineByLine, useMotionPref } from "@/components/motion/reveal";
import { useLoadStage } from "@/components/LoadStage";
import IslandNav from "@/components/IslandNav";

const DISPLAY = { fontFamily: "var(--font-display)" } as const;
const BODY = { fontFamily: "var(--font-body)" } as const;

/* Hero copy entrance — a soft defocus, not a hard fade: each line arrives
   rising 16–22px while its blur dissolves from 10px to sharp. The staged
   delays (eyebrow → headline lines → support lines → CTA) keep the reading
   order intact so the entrance feels like one gesture, not four. */

export default function HeroLens() {
  const [lens, setLens] = useState<ThemeId>("xr");
  /** Set while a lens change is mid-swap; cleared once the new copy is in. */
  const [pending, setPending] = useState<ThemeId | null>(null);
  const reduce = useMotionPref();
  // The copy is held back until the preloader has cleared, so it animates in
  // front of the viewer instead of playing out unseen behind the overlay.
  const { stage } = useLoadStage();

  const hold = stage === "loading";
  const content = HERO_LENSES[pending ?? lens];
  const blur = reduce ? 0 : 10;
  const hide = reduce ? { opacity: 0 } : { opacity: 0, transform: "translateY(16px)", filter: "blur(10px)" };
  const shown = { opacity: 1, transform: "translateY(0px)", filter: "blur(0px)" };
  const paused = hold || !!pending;

  // The switcher itself stays instant — a control the user just pressed must
  // answer immediately. Only the copy it changes gets a 160ms dip (blury, not
  // flat) so the change reads as deliberate rather than as a flicker; the new
  // copy then arrives line by line out of the dip.
  const choose = (id: ThemeId) => {
    if (id === (pending ?? lens)) return;
    if (reduce) {
      setLens(id);
      return;
    }
    setPending(id);
  };

  return (
    <section id="hero" aria-label="Introduction" className="relative overflow-hidden bg-[#140066]">
      {/* Ambient background video — atmosphere, not content. On desktop it is
          a right panel, where the wireframe skyline sat in the original
          composition (it replaces that asset here); on smaller screens it
          runs full-bleed behind the copy. Autoplay muted + loop for a quiet
          ambient loop; the solid section color underneath covers the first
          paint and serves as the fallback if the video is missing. Hidden
          entirely under reduced motion: it is looped motion, and the solid
          color carries the hero on its own. */}
      <video
        src="/bg-video-hero-home.mp4"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 h-full w-full object-cover object-center motion-reduce:hidden lg:w-[47%] lg:object-[16%_50%]"
      />
      {/* Partial overlay, not a full cover: on mobile a scrim protects the
          copy; on desktop the solid color holds behind the copy and dissolves
          slowly across the panel's first third, so the footage — dark navy
          near its own edge — arrives inside the section color rather than as
          a cut, and the buildings still read clearly at full brightness. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#070218]/70 via-[#0B0330]/40 to-[#140066]/15 lg:from-[#140066] lg:from-46% lg:via-[#140066] lg:via-53% lg:to-[#0B0330]/20 lg:to-82%"
      />

      {/* The section starts at the very top of the viewport (the shared header
          is a fixed overlay now); the copy clears it with its own top padding,
          and the whole hero fits the viewport with scroll at the top. */}
      <div className="relative mx-auto w-full max-w-[1200px] px-6 pb-[96px] pt-[96px] md:pb-[120px] md:pt-[148px] lg:h-[100svh] lg:min-h-[720px] lg:px-0 lg:pb-[64px]">
        <div className="flex max-w-[660px] flex-col items-start gap-[26px] md:gap-[36px]">
            {/* Lens copy — dipped out while a lens change is mid-swap, then
                remounted line by line (keyed by the incoming eyebrow) */}
            <motion.div
              animate={
                pending
                  ? { opacity: 0, transform: "translateY(-8px)", filter: "blur(8px)" }
                  : hold
                    ? { opacity: 0, transform: "translateY(16px)", filter: "blur(10px)" }
                    : { opacity: 1, transform: "translateY(0px)", filter: "blur(0px)" }
              }
              transition={{ duration: pending ? 0.16 : reduce ? 0.3 : 0.6, ease: EASE_OUT }}
              onAnimationComplete={() => {
                if (pending) {
                  setLens(pending);
                  setPending(null);
                }
              }}
              className="flex flex-col items-start gap-[24px] md:gap-[34px]"
            >
              {/* keyed by the eyebrow so each swap re-runs the defocus entrance */}
              <motion.p
                key={content.eyebrow}
                initial={reduce ? { opacity: 0 } : hide}
                animate={hold ? (reduce ? { opacity: 0 } : hide) : reduce ? { opacity: 1 } : shown}
                transition={{ duration: reduce ? 0.3 : 0.6, delay: 0.04, ease: EASE_OUT }}
                className="text-[13px] font-medium uppercase tracking-[1.82px] text-[#CFC8BD]"
                style={BODY}
              >
                {content.eyebrow}
              </motion.p>
              <h1
                className="text-[clamp(42px,5.2vw,68px)] font-semibold leading-[1.04] tracking-[-1.7px] text-[#F2EEE7]"
                style={DISPLAY}
              >
                <LineByLine
                  key={content.headline}
                  text={content.headline}
                  delay={0.12}
                  step={0.08}
                  distance={22}
                  blur={blur}
                  paused={paused}
                />
              </h1>
              <p className="max-w-[580px] text-[19px] font-normal leading-[1.6] text-[#E4DED4]" style={BODY}>
                <LineByLine
                  key={content.support}
                  text={content.support}
                  delay={0.26}
                  step={0.06}
                  distance={16}
                  blur={blur}
                  paused={paused}
                />
              </p>
            </motion.div>

            <motion.div
              initial={reduce ? { opacity: 0 } : hide}
              animate={hold ? hide : shown}
              transition={{ duration: reduce ? 0.3 : 0.6, delay: 0.46, ease: EASE_OUT }}
              className="flex flex-wrap items-center gap-[14px] pt-[8px]"
            >
              <a
                href="#work"
                className="inline-flex h-[52px] items-center justify-center rounded-[999px] bg-[#F2EEE7] px-[28px] text-[15px] font-semibold text-[#17161B] transition-opacity hover:opacity-90"
                style={BODY}
              >
                View selected work
              </a>
              <a target="_blank" rel="noreferrer"
                href="/resume.pdf"
                className="inline-flex h-[52px] items-center justify-center rounded-[999px] border border-[rgba(242,238,231,0.45)] px-[27px] text-[15px] font-medium text-[#F2EEE7] transition-colors hover:bg-[rgba(242,238,231,0.08)]"
                style={BODY}
              >
                Download résumé
              </a>
            </motion.div>
          </div>

          {/* The island's home: the hero's "Explore by lens" spot — in flow on
              phones, and centered 2rem from the hero's bottom on desktop. */}
          <div
            id="lens-anchor"
            className="mt-[88px] lg:absolute lg:bottom-8 lg:left-1/2 lg:mt-0 lg:-translate-x-1/2"
          >
            <IslandNav
              activeId={pending ?? lens}
              onSelect={choose}
              theme={THEMES[pending ?? lens]}
              shown={stage !== "loading"}
            />
          </div>
      </div>
    </section>
  );
}
