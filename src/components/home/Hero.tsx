"use client";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { gsap } from "gsap";
import type { HomeLens, HomeLensId } from "@/data/lenses";
import { HERO_EYEBROW, LENS_ORDER, LENSES } from "@/data/lenses";
import AnimatedHeadline from "@/components/home/AnimatedHeadline";
import HeroScene from "@/components/home/HeroScene";
import { useLoadStage } from "@/components/LoadStage";
import { useMotionPref } from "@/components/motion/reveal";
const TRACK_COLORS = ["#d9a066", "#c9d3e6", "#7fb2ff", "#b49cff"];
const INTRO_HOLD_SECONDS = 1.3;
/** Progress fill reads gold → … → the active lens colour, one stop per node passed. */
function progressGradient(index: number): string {
  if (index <= 0) return "none";
  const cols = TRACK_COLORS.slice(0, index + 1);
  const stops = cols.map(
    (c, i) => `${c} ${((i / (cols.length - 1)) * 100).toFixed(3)}%`,

  );
  return `linear-gradient(90deg, ${stops.join(", ")})`;

}
export default function Hero({
  lens,
  onSelect,

}: {
  lens: HomeLens;
  onSelect: (id: HomeLensId) => void;

}) {
  const activeIndex = LENS_ORDER.indexOf(lens.id);
  // Hold the entrance until the preloader hands over, so it plays in view.
  const { stage } = useLoadStage();
  const shown = stage !== "loading";
  const eyeRef = useRef<HTMLDivElement>(null);
  const [, setSceneReady] = useState(false);
  const [headlineEntryComplete, setHeadlineEntryComplete] = useState(false);
  const introTimelineRef = useRef<gsap.core.Timeline | null>(null);
  const onSelectRef = useRef(onSelect);
  const userInteractedRef = useRef(false);
  const reduce = useMotionPref();

  useEffect(() => {
    onSelectRef.current = onSelect;
  }, [onSelect]);

  const handleSelect = (id: HomeLensId) => {
    userInteractedRef.current = true;
    introTimelineRef.current?.kill();
    onSelect(id);
  };

  const handleTransitionComplete = () => {
    const timeline = introTimelineRef.current;
    if (!timeline || userInteractedRef.current || !timeline.paused()) return;
    timeline.play();
  };

  useEffect(() => {
    if (!shown || !headlineEntryComplete || reduce || userInteractedRef.current) return;

    const timeline = gsap.timeline({ paused: true });
    introTimelineRef.current = timeline;

    // Product is already selected on first paint. Each next step waits for the
    // current headline transition to finish, then holds the settled lens long
    // enough to read before advancing.
    timeline
      .call(() => onSelectRef.current("ux"), [], 0)
      .addPause()
      .to({}, { duration: INTRO_HOLD_SECONDS })
      .call(() => onSelectRef.current("xr"))
      .addPause()
      .to({}, { duration: INTRO_HOLD_SECONDS })
      .call(() => onSelectRef.current("ai"))
      .play();

    return () => {
      timeline.kill();
      if (introTimelineRef.current === timeline) introTimelineRef.current = null;
    };
  }, [headlineEntryComplete, reduce, shown]);

  return (
    <section
      aria-label="Introduction"
      className="relative flex flex-col items-center gap-[40px] px-6 pb-[64px] pt-[16px] lg:flex-row lg:gap-[48px] lg:px-[132px] lg:pb-[72px]"

    >
      {/* Full-hero WebGL: animated field + anchored interactive model. */}
      <HeroScene lens={lens} anchorRef={eyeRef} onReady={setSceneReady} />
      <div className="relative z-10 flex w-full min-w-0 flex-1 flex-col items-start gap-[20px]">
        <p
          data-shown={shown}
          className="rise home-body text-[13px] font-medium uppercase tracking-[2.34px] text-[#8e8bb3] [--rise-delay:80ms]"

        >
          {HERO_EYEBROW}

        </p>
        <AnimatedHeadline
          lens={lens}
          onEntryComplete={() => setHeadlineEntryComplete(true)}
          onTransitionComplete={handleTransitionComplete}
        />
        <AnimatePresence mode="wait" initial={false}>
          <motion.p
            key={lens.id}
            data-shown={shown}
            initial={{ opacity: 0, filter: reduce ? "none" : "blur(2px)" }}
            animate={{ opacity: shown ? 1 : 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, filter: reduce ? "none" : "blur(2px)" }}
            transition={{ duration: 0.22, ease: [0.23, 1, 0.32, 1] }}
            className="home-body text-[clamp(17px,1.4vw,20px)] leading-[1.5] text-[#aba8cc]"
          >
            {lens.subline}
          </motion.p>
        </AnimatePresence>
        {/* Journey timeline (node 628:583 — controls the orb) */}
        <div
          data-shown={shown}
          className="rise flex w-full flex-col gap-[12px] rounded-[16px] border border-[#1c1a45] bg-[#0e0d22] px-[20px] pb-[18px] pt-[16px] [--rise-delay:500ms]"

        >
          <div className="flex items-center gap-[8px]">
            <span aria-hidden className="size-[5px] rounded-full bg-[#8e8bb3]" />
            <p className="home-body text-[11px] font-semibold uppercase tracking-[1.76px] text-[#8e8bb3]">
              Explore my journey

            </p>

          </div>
          <div className="relative flex w-full items-start">
            {/* Track */}
            <div className="journey-track absolute left-[12.5%] right-[12.5%] top-[70.5px] h-[2px] rounded-[1px] lg:left-[47.5px] lg:right-auto lg:w-[483px]">
              <div
                aria-hidden
                className="size-full rounded-[1px] opacity-55"
                style={{
                  backgroundImage:
                    "linear-gradient(90deg, #d9a066 0%, #c9d3e6 33.333%, #7fb2ff 66.667%, #b49cff 100%)",
                }}
              />
              {activeIndex > 0 && (
                <div
                  aria-hidden
                  className="absolute left-0 top-0 h-full rounded-[1px]"
                  style={{
                    width: `${(activeIndex / 3) * 100}%`,
                    backgroundImage: progressGradient(activeIndex),
                    boxShadow: `0 0 14px 0 ${lens.accent}66`,
                  }}
                />
              )}
            </div>
            {LENS_ORDER.map((id) => {
              const node = LENSES[id];
              const active = id === lens.id;
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => handleSelect(id)}
                  aria-pressed={active}
                  className="group relative flex min-w-0 flex-1 flex-col items-center gap-[8px] px-[2px] text-center outline-none"

                >
                  <span
                    className={`home-body whitespace-nowrap text-[13px] ${
                      active ? "font-semibold text-[#f3f1ff]" : "font-medium text-[#aba8cc]"

                    }`}

                  >
                    {node.node}

                  </span>
                  <span className="flex h-[88px] w-full items-center justify-center">
                    <span
                      aria-hidden
                      className="pointer-events-none absolute size-[76px] rounded-full border border-transparent transition-colors duration-150 group-hover:border-white/30 group-focus-visible:border-white/45"
                    />
                    {active && (
                      // Shared layout element: glides from the old node to the
                      // node being clicked, carrying the lens glow with it.
                      <motion.img
                        layoutId="lens-selection-ring"
                        src={node.ring}
                        alt=""
                        aria-hidden
                        transition={{ type: "spring", stiffness: 320, damping: 30 }}
                        className="pointer-events-none absolute size-[76px] object-contain"
                      />

                    )}
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={node.nodeEye}
                      alt=""
                      aria-hidden
                      className="relative z-[1] size-[80px] object-contain opacity-90"

                    />

                  </span>
                  <span
                    className={`home-body text-[12px] font-medium ${
                      active ? "font-semibold text-[#b49cff]" : "text-[#8e8bb3]"

                    }`}

                  >
                    {node.year}

                  </span>
                  <span
                    className={`home-body text-[11px] font-medium ${
                      active ? "text-[#b49cff]" : "text-[#8e8bb3]"

                    }`}

                  >
                    {node.era}

                  </span>

                </button>

              );

            })}

          </div>

        </div>
        {/* Actions (node 525:144) */}
        <div
          data-shown={shown}
          className="rise flex flex-wrap items-start gap-[12px] [--rise-delay:640ms]"

        >
          <a
            href="#contact"
            className="home-body inline-flex items-center gap-[10px] rounded-full bg-[#f3f1ff] px-[26px] py-[15px] text-[16px] font-semibold text-[#0a0918] transition-opacity hover:opacity-90"

          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/figma/tools/status-dot.svg" alt="" aria-hidden className="size-[9px]" />
            Open to roles → Get in touch

          </a>

        </div>

      </div>
      {/* Invisible layout anchor for the active GLB. The canvas positions the
          model at this slot while the content column remains fully in flow. */}
      <div
        ref={eyeRef}
        data-shown={shown}
        aria-hidden
        className="rise-scale relative z-10 aspect-square w-[min(500px,86vw)] shrink-0 [--rise-delay:220ms]"
      />
      {/* Placeholder image + hover-tilt version, temporarily disabled while the
          supplied textured GLBs are being evaluated. */}
      {false && (
        <div
          data-shown={shown}
          aria-hidden
          className="rise-scale relative z-10 aspect-square w-[min(500px,86vw)] shrink-0 [--rise-delay:220ms]"
        >
          <img src={lens.particles} alt="" aria-hidden className="pointer-events-none absolute left-1/2 top-1/2 z-0 size-[140%] -translate-x-1/2 -translate-y-1/2 object-contain" />
          <motion.div className="relative z-[1] size-full">
            <img src={lens.eye} alt="" draggable={false} className="absolute left-[8%] top-[8%] size-[84%] object-contain" />
          </motion.div>
        </div>
      )}

    </section>

  );

}
