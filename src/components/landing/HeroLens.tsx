"use client";

import { useState } from "react";
import type { ThemeId } from "@/data/themes";
import { HERO_LENSES } from "@/data/landing";

const LENSES: { id: ThemeId; label: string }[] = [
  { id: "xr", label: "XR" },
  { id: "ux", label: "UX" },
  { id: "ai", label: "AI" },
  { id: "product", label: "Product" },
];

const DISPLAY = { fontFamily: "var(--font-display)" } as const;
const BODY = { fontFamily: "var(--font-body)" } as const;

export default function HeroLens() {
  const [lens, setLens] = useState<ThemeId>("xr");
  const content = HERO_LENSES[lens];

  return (
    <section id="hero" aria-label="Introduction" className="relative overflow-hidden bg-[#140066]">
      {/* Wireframe skyline — Figma asset, right-bleed on desktop */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/hero-wireframe.svg"
        alt=""
        aria-hidden
        draggable={false}
        className="pointer-events-none absolute -right-[120px] top-0 hidden h-[760px] w-[760px] max-w-none select-none lg:block"
      />

      <div className="relative mx-auto w-full max-w-[1200px] px-6 pb-[120px] pt-[72px] md:pt-[120px] lg:min-h-[760px] lg:px-0 lg:pb-[64px]">
        <div className="flex max-w-[660px] flex-col items-start gap-[28px]">
          <p
            className="text-[13px] font-medium uppercase tracking-[1.82px] text-[#CFC8BD]"
            style={BODY}
          >
            {content.eyebrow}
          </p>
          <h1
            className="text-[clamp(42px,5.2vw,68px)] font-semibold leading-[1.04] tracking-[-1.7px] text-[#F2EEE7]"
            style={DISPLAY}
          >
            {content.headline}
          </h1>
          <p className="max-w-[580px] text-[19px] font-normal leading-[1.6] text-[#E4DED4]" style={BODY}>
            {content.support}
          </p>
          <div className="flex flex-wrap items-center gap-[14px] pt-[8px]">
            <a
              href="#work"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("work")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="inline-flex h-[52px] items-center justify-center rounded-[999px] bg-[#F2EEE7] px-[28px] text-[15px] font-semibold text-[#17161B] transition-opacity hover:opacity-90"
              style={BODY}
            >
              View selected work
            </a>
            <a
              href="/resume.pdf"
              className="inline-flex h-[52px] items-center justify-center rounded-[999px] border border-[rgba(242,238,231,0.45)] px-[27px] text-[15px] font-medium text-[#F2EEE7] transition-colors hover:bg-[rgba(242,238,231,0.08)]"
              style={BODY}
            >
              Download résumé
            </a>
          </div>
        </div>

        {/* Lens switcher */}
        <div className="mt-[72px] flex flex-wrap items-center gap-[16px] lg:absolute lg:bottom-[64px] lg:left-0 lg:mt-0 lg:px-0">
          <span className="text-[13px] font-normal text-[#B9B2A8]" style={BODY}>
            Explore by lens
          </span>
          <div className="flex flex-wrap items-center gap-[8px]" role="group" aria-label="Explore by lens">
            {LENSES.map((l) => {
              const active = l.id === lens;
              return (
                <button
                  key={l.id}
                  type="button"
                  onClick={() => setLens(l.id)}
                  aria-pressed={active}
                  className={`inline-flex h-[44px] cursor-pointer items-center justify-center rounded-[999px] px-[22px] text-[14px] font-medium transition-colors ${
                    active
                      ? "bg-[#F2EEE7] text-[#17161B]"
                      : "border border-[rgba(242,238,231,0.4)] text-[#F2EEE7] hover:bg-[rgba(242,238,231,0.08)]"
                  }`}
                  style={BODY}
                >
                  {l.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
