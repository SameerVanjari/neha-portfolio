"use client";

import { useRef, useState } from "react";
import { THEMES, type ThemeId } from "@/data/themes";
import { HERO_LENSES } from "@/data/landing";
import { useMotionPref } from "@/components/motion/reveal";
import { gsap, useGSAP } from "@/hooks/use-gsap";
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
  const rootRef = useRef<HTMLElement>(null);
  const eyebrowRef = useRef<HTMLParagraphElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const supportRef = useRef<HTMLParagraphElement>(null);
  const actionsRef = useRef<HTMLDivElement>(null);
  const islandRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const introDoneRef = useRef(false);
  const reduce = useMotionPref();
  // The copy is held back until the preloader has cleared, so it animates in
  // front of the viewer instead of playing out unseen behind the overlay.
  const { stage } = useLoadStage();

  const hold = stage === "loading";
  const content = HERO_LENSES[lens];
  const ready = !hold;

  const startVideo = () => {
    const video = videoRef.current;
    if (!video) return;
    video.playbackRate = 0.75;
    void video.play().catch(() => {
      // Autoplay is muted, but keep the hero usable if a browser still blocks it.
    });
  };

  const revealVideo = () => {
    const video = videoRef.current;
    if (!video) return;
    gsap.to(video, { autoAlpha: 1, duration: 0.85, ease: "power2.out" });
  };

  useGSAP(() => {
    const steps = [eyebrowRef.current, headlineRef.current, supportRef.current, actionsRef.current, islandRef.current].filter(
      Boolean,
    ) as HTMLElement[];
    if (!steps.length) return;

    gsap.set(steps, { autoAlpha: 0, y: 24, filter: "blur(10px)" });
    if (!ready) return;

    if (reduce) {
      gsap.set(steps, { autoAlpha: 1, y: 0, filter: "blur(0px)" });
      introDoneRef.current = true;
      startVideo();
      return;
    }

    const timeline = gsap.timeline({ defaults: { ease: "power3.out" } });
    timeline
      .to(eyebrowRef.current, { autoAlpha: 1, y: 0, filter: "blur(0px)", duration: 0.48 }, 0.08)
      .to(headlineRef.current, { autoAlpha: 1, y: 0, filter: "blur(0px)", duration: 0.64 }, 0.18)
      .to(supportRef.current, { autoAlpha: 1, y: 0, filter: "blur(0px)", duration: 0.52 }, 0.38)
      .to(actionsRef.current, { autoAlpha: 1, y: 0, filter: "blur(0px)", duration: 0.52 }, 0.58)
      .to(islandRef.current, { autoAlpha: 1, y: 0, filter: "blur(0px)", duration: 0.52 }, 0.82)
      .call(() => {
        introDoneRef.current = true;
        startVideo();
      });
  }, { scope: rootRef, dependencies: [ready, reduce], revertOnUpdate: true });

  useGSAP(() => {
    if (!ready || !introDoneRef.current || reduce) return;
    const copy = [eyebrowRef.current, headlineRef.current, supportRef.current, actionsRef.current].filter(
      Boolean,
    ) as HTMLElement[];
    gsap.set(copy, { autoAlpha: 0, y: 16, filter: "blur(8px)" });
    gsap.to(copy, {
      autoAlpha: 1,
      y: 0,
      filter: "blur(0px)",
      duration: 0.48,
      stagger: 0.08,
      ease: "power3.out",
    });
  }, { scope: rootRef, dependencies: [lens], revertOnUpdate: true });

  // The switcher itself stays instant — a control the user just pressed must
  // answer immediately. Only the copy it changes gets a 160ms dip (blury, not
  // flat) so the change reads as deliberate rather than as a flicker; the new
  // copy then arrives line by line out of the dip.
  const choose = (id: ThemeId) => {
    if (id === lens) return;
    setLens(id);
  };

  return (
    <section ref={rootRef} id="hero" aria-label="Introduction" className="relative overflow-hidden bg-[#140066]">
      {/* The video is deliberately constrained to the right panel. It starts
          hidden and reveals its first playable frame after the copy timeline. */}
      <video
        ref={videoRef}
        src="/hero-video-home.mp4"
        onPlaying={revealVideo}
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 h-full w-[48%] object-cover object-center opacity-0"
      />
      {/* Copy protection over the placeholder field. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#070218]/70 via-[#0B0330]/40 to-[#140066]/15 lg:from-[#140066] lg:from-46% lg:via-[#140066] lg:via-53% lg:to-[#0B0330]/20 lg:to-82%"
      />

      {/* The section starts at the very top of the viewport (the shared header
          is a fixed overlay now); the copy clears it with its own top padding,
          and the whole hero fits the viewport with scroll at the top. */}
      <div className="relative mx-auto flex min-h-[100svh] w-full max-w-[1200px] flex-col px-6 pb-[64px] pt-[104px] md:pb-[120px] md:pt-[148px] lg:h-[100svh] lg:min-h-[720px] lg:px-0 lg:pb-[64px]">
        <div className="flex max-w-[660px] flex-col items-start gap-[26px] md:gap-[36px] lg:my-auto">
              <p ref={eyebrowRef} className="text-[13px] font-medium uppercase tracking-[1.82px] text-[#CFC8BD]" style={BODY}>
                {content.eyebrow}
              </p>
              <h1 ref={headlineRef} className="text-[clamp(38px,10.8vw,68px)] font-semibold leading-[1.04] tracking-[-1.5px] text-[#F2EEE7] sm:tracking-[-1.7px]" style={DISPLAY}>
                {content.headline}
              </h1>
              <p ref={supportRef} className="max-w-[580px] text-[16px] font-normal leading-[1.6] text-[#E4DED4] sm:text-[19px]" style={BODY}>
                {content.support}
              </p>

            <div ref={actionsRef} className="flex flex-wrap items-center gap-[14px] pt-[8px]">
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
                Download Resume
              </a>
            </div>
          </div>

          {/* The island's home: the hero's "Explore by lens" spot — in flow on
              phones, and centered 2rem from the hero's bottom on desktop. */}
          <div
            id="lens-anchor"
            ref={islandRef}
            className="mt-auto pt-[56px] md:pt-[88px] lg:absolute lg:bottom-8 lg:left-1/2 lg:mt-0 lg:pt-0 lg:-translate-x-1/2"
          >
            <IslandNav
              activeId={lens}
              onSelect={choose}
              theme={THEMES[lens]}
              shown={ready}
            />
          </div>
      </div>
    </section>
  );
}
