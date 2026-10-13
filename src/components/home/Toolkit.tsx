"use client";

import { useState } from "react";
import type { HomeLens } from "@/data/lenses";
import {
  TOOLS,
  TOOL_GROUPS,
  TOOL_USED_IN,
  TOOL_USED_IN_FALLBACK,
} from "@/data/lenses";

const GROUP_STYLE: Record<
  string,
  { color: string; bg: string; border: string }
> = {
  make: { color: "#d9a066", bg: "rgba(217,160,102,0.14)", border: "#d9a066" },
  design: { color: "#c9d3e6", bg: "rgba(201,211,230,0.12)", border: "rgba(201,211,230,0.33)" },
  worlds: { color: "#7fb2ff", bg: "rgba(127,178,255,0.14)", border: "rgba(127,178,255,0.33)" },
  intel: { color: "#b49cff", bg: "rgba(180,156,255,0.16)", border: "rgba(180,156,255,0.33)" },
};

const GROUP_SPAN: Record<string, { start: number; span: number }> = {
  make: { start: 1, span: 1 },
  design: { start: 2, span: 2 },
  worlds: { start: 4, span: 3 },
  intel: { start: 7, span: 2 },
};

export default function Toolkit({ lens }: { lens: HomeLens }) {
  const [hovered, setHovered] = useState<string | null>(null);
  const featuredId = hovered ?? lens.featuredTool;
  const featured = TOOLS.find((t) => t.id === featuredId) ?? TOOLS[0];
  const featuredStyle = GROUP_STYLE[featured.group];
  const featuredGroup = TOOL_GROUPS.find((g) => g.id === featured.group);

  return (
    <section
      aria-label="Toolkit"
      className="flex flex-col gap-[14px] px-6 pb-[48px] pt-[64px] lg:px-[132px] lg:pt-[96px]"
    >
      <h2 className="home-display text-[clamp(34px,3.6vw,52px)] font-bold leading-none tracking-[-1.04px] text-[#f3f1ff]">
        Toolkit
      </h2>

      <div className="scrollbar-none w-full min-w-0 overflow-x-auto pb-[8px]">
        <div className="min-w-[1176px]">
          {/* Group labels (node 525:214) */}
          <div className="grid grid-cols-8 gap-[10px]">
            {TOOL_GROUPS.map((g) => {
              const { start, span } = GROUP_SPAN[g.id];
              return (
                <div
                  key={g.id}
                  className="flex items-center gap-[8px] border-b-2 pb-[16px]"
                  style={{ gridColumn: `${start} / span ${span}`, borderColor: g.color }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={g.dot} alt="" aria-hidden className="size-[8px]" />
                  <span className="home-body text-[12px] uppercase tracking-[2.4px] text-[#aba8cc]">
                    {g.label}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Periodic grid (node 525:231) */}
          <div className="mt-[16px] grid auto-rows-[127px] grid-cols-8 gap-[10px]">
            {TOOLS.map((t) => {
              const s = GROUP_STYLE[t.group];
              const isFeatured = t.id === featuredId;
              return (
                <button
                  key={t.id}
                  type="button"
                  onMouseEnter={() => setHovered(t.id)}
                  onMouseLeave={() => setHovered(null)}
                  onFocus={() => setHovered(t.id)}
                  onBlur={() => setHovered(null)}
                  className="flex flex-col items-start justify-between rounded-[14px] px-[12px] py-[10px] text-left outline-none transition-[border-width] duration-150"
                  style={{
                    gridColumn: t.col + 1,
                    gridRow: t.row + 1,
                    background: s.bg,
                    border: `${isFeatured ? 2 : 1}px solid ${s.border}`,
                    boxShadow: isFeatured
                      ? `0 0 14px 0 ${s.color}73`
                      : "0 8px 8px rgba(0,0,0,0.35)",
                  }}
                >
                  <span className="home-display text-[15px] font-bold" style={{ color: s.color }}>
                    {t.symbol}
                  </span>
                  <span className="home-display text-[16px] font-semibold leading-[1.15] text-[#f3f1ff]">
                    {t.name}
                  </span>
                </button>
              );
            })}

            {/* Featured tool (node 525:295) */}
            <div
              className="flex items-center gap-[28px]"
              style={{ gridColumn: "3 / span 5", gridRow: "1 / span 2" }}
            >
              <div
                className="flex size-[196px] shrink-0 flex-col items-start justify-between rounded-[20px] px-[18px] py-[16px]"
                style={{
                  background: featuredStyle.bg,
                  border: `2px solid ${featuredStyle.border}`,
                  boxShadow: `0 0 48px 0 ${featuredStyle.color}66`,
                }}
              >
                <span className="flex w-full justify-end">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={featuredGroup?.dot} alt="" aria-hidden className="size-[10px]" />
                </span>
                <span className="home-display text-[76px] font-bold leading-none tracking-[-2.28px] text-[#f3f1ff]">
                  {featured.symbol}
                </span>
                <span className="home-body text-[15px] font-semibold text-[#f3f1ff]">
                  {featured.name}
                </span>
              </div>

              <div className="flex min-w-0 flex-col gap-[10px]">
                <span className="flex items-center gap-[10px]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={featuredGroup?.dot}
                    alt=""
                    aria-hidden
                    className="size-[8px]"
                  />
                  <span
                    className="home-body text-[12px] uppercase tracking-[3.36px]"
                    style={{ color: featuredStyle.color }}
                  >
                    {featuredGroup?.label}
                  </span>
                </span>
                <span className="home-display text-[30px] font-bold leading-[1.1] text-[#f3f1ff]">
                  {featured.name}
                </span>
                <span className="home-body text-[16px] text-[#aba8cc]">
                  {TOOL_USED_IN[featured.id] ?? TOOL_USED_IN_FALLBACK}
                </span>
                <span className="home-body text-[12px] uppercase tracking-[3.36px] text-[#8e8bb3]">
                  Hover any tool
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
