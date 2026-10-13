"use client";

import { useRef, useState } from "react";
import type { HomeLens, HomeLensId } from "@/data/lenses";
import { HERO_EYEBROW, LENS_ORDER, LENSES } from "@/data/lenses";
import AnimatedHeadline from "@/components/home/AnimatedHeadline";
import HeroScene from "@/components/home/HeroScene";
import { useLoadStage } from "@/components/LoadStage";

const TRACK_COLORS = ["#d9a066", "#c9d3e6", "#7fb2ff", "#b49cff"];

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
  const [sceneReady, setSceneReady] = useState(false);

  return (
    <section
      aria-label="Introduction"
      className="relative flex flex-col items-center gap-[40px] px-6 pb-[64px] pt-[16px] lg:flex-row lg:gap-[48px] lg:px-[132px] lg:pb-[72px]"
    >
      {/* Static field until the shader backdrop is live, then fades out. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={lens.particles}
        alt=""
        aria-hidden
        className="pointer-events-none absolute inset-0 size-full object-cover transition-opacity duration-700"
        style={{ opacity: sceneReady ? 0 : 1 }}
      />

      {/* Full-hero WebGL: animated backdrop + the anchored model. */}
      <HeroScene lens={lens} anchorRef={eyeRef} onReady={setSceneReady} />

      <div className="relative z-10 flex w-full min-w-0 flex-1 flex-col items-start gap-[20px]">
        <p
          data-shown={shown}
          className="rise home-body text-[13px] uppercase tracking-[4.16px] text-[#aba8cc] [--rise-delay:80ms]"
        >
          {HERO_EYEBROW}
        </p>

        <AnimatedHeadline lens={lens} />

        <p
          data-shown={shown}
          className="rise home-body text-[clamp(17px,1.4vw,20px)] leading-[1.5] text-[#aba8cc] [--rise-delay:380ms]"
        >
          {lens.subline}
        </p>

        {/* Journey timeline (node 525:113) */}
        <div
          data-shown={shown}
          className="rise flex w-full flex-col gap-[6px] rounded-[28px] border border-[#22204a] bg-[#0e0d22] px-[16px] pb-[18px] pt-[16px] [--rise-delay:500ms]"
        >
          <p className="home-body whitespace-pre text-[12px] uppercase tracking-[3.84px] text-[#aba8cc]">
            ↔&nbsp;&nbsp;Explore my journey
          </p>

          <div className="relative flex w-full items-start">
            {/* Track */}
            <div
              aria-hidden
              className="absolute left-[12.5%] right-[12.5%] top-[84px] h-[3px] rounded-[3px] opacity-25"
              style={{
                backgroundImage:
                  "linear-gradient(90deg, #d9a066 0%, #c9d3e6 33.333%, #7fb2ff 66.667%, #b49cff 100%)",
              }}
            />
            {/* Progress */}
            {activeIndex > 0 && (
              <div
                aria-hidden
                className="absolute left-[12.5%] top-[84px] h-[3px] rounded-[3px]"
                style={{
                  width: `${(activeIndex / 3) * 75}%`,
                  backgroundImage: progressGradient(activeIndex),
                  boxShadow: `0 0 14px 0 ${lens.accent}66`,
                }}
              />
            )}

            {LENS_ORDER.map((id) => {
              const node = LENSES[id];
              const active = id === lens.id;
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => onSelect(id)}
                  aria-pressed={active}
                  className="group relative flex min-w-0 flex-1 flex-col items-center gap-[10px] px-[2px] text-center outline-none"
                >
                  <span className="flex h-[40px] w-full items-end justify-center">
                    <span
                      className={`home-display break-words text-[13px] leading-[1.12] [word-break:break-word] lg:text-[15px] ${
                        active ? "font-bold text-[#f3f1ff]" : "font-medium text-[#8e8bb3]"
                      }`}
                    >
                      {node.node}
                    </span>
                  </span>

                  <span className="relative flex h-[72px] w-full items-center justify-center">
                    {active ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={node.nodeEye}
                        alt=""
                        aria-hidden
                        className="size-[64px] object-contain"
                      />
                    ) : (
                      <>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={node.nodeEyeSmall}
                          alt=""
                          aria-hidden
                          className="size-[32px] object-contain opacity-75"
                        />
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={node.ring}
                          alt=""
                          aria-hidden
                          className="absolute size-[46px] opacity-60"
                        />
                      </>
                    )}
                  </span>

                  <span
                    className="home-body text-[14px] tracking-[1.12px]"
                    style={{ color: active ? lens.accent : "#8e8bb3" }}
                  >
                    {node.year}
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
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noreferrer"
            className="home-body inline-flex items-center rounded-full border-[1.5px] border-[#4a4775] px-[26px] py-[14px] text-[16px] font-medium text-[#f3f1ff] transition-colors hover:bg-[#f3f1ff]/8"
          >
            Resume
          </a>
        </div>
      </div>

      {/* Model anchor — the 3D model is drawn here by HeroScene, tinted per lens. */}
      <div
        ref={eyeRef}
        data-shown={shown}
        aria-hidden
        className="rise-scale relative z-10 aspect-square w-[min(500px,86vw)] shrink-0 [--rise-delay:220ms]"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={lens.eye}
          alt=""
          className="absolute transition-opacity duration-700"
          style={{
            left: "19%",
            top: "19%",
            width: "62%",
            height: "62%",
            opacity: sceneReady ? 0 : 1,
          }}
        />
      </div>
    </section>
  );
}
