"use client";

import { useState } from "react";
import { dimensions } from "@/data/portfolio";
import {
  clearDimensionHover,
  hoverDimension,
  selectDimension,
} from "@/lib/interactions";

export default function DimensionSelect() {
  const [hovered, setHovered] = useState(-1);
  const [selected, setSelected] = useState(-1);

  const pick = (i: number) => {
    if (selected === i) return;
    setSelected(i);
    selectDimension(i);
  };

  return (
    <div className="flex flex-col items-center">
      <p data-fade className="mb-10 text-center font-mono text-[11px] uppercase tracking-[0.4em] text-ghost">
        {selected >= 0 ? "the bird is taking you inside — keep scrolling" : "choose a world to enter"}
      </p>

      <div className="grid w-full max-w-4xl grid-cols-2 gap-4 md:grid-cols-4">
        {dimensions.map((d, i) => {
          const isHover = hovered === i;
          const isSel = selected === i;
          return (
            <button
              key={d.id}
              type="button"
              onMouseEnter={() => {
                setHovered(i);
                hoverDimension(i);
              }}
              onMouseLeave={() => {
                setHovered(-1);
                clearDimensionHover();
              }}
              onClick={() => pick(i)}
              className="group relative flex aspect-square flex-col items-center justify-center rounded-full border font-mono outline-none transition-all duration-500"
              style={{
                borderColor: isSel || isHover ? d.color : "rgba(139,147,167,0.25)",
                boxShadow: isSel
                  ? `0 0 0 1px ${d.color}, 0 0 60px ${d.glow}`
                  : isHover
                    ? `0 0 0 1px ${d.color}, 0 0 34px ${d.glow}`
                    : "0 0 0 1px rgba(139,147,167,0.1)",
                background: isSel
                  ? `radial-gradient(circle, ${d.glow}22, transparent 70%)`
                  : isHover
                    ? `radial-gradient(circle, ${d.glow}11, transparent 70%)`
                    : "transparent",
              }}
            >
              <span
                className="font-display text-lg font-bold tracking-widest transition-colors duration-300 md:text-xl"
                style={{ color: isHover || isSel ? d.color : "#e9edf6" }}
              >
                {d.id}
              </span>
              <span className="mt-2 px-4 text-center text-[10px] uppercase tracking-[0.2em] text-ghost">
                {isSel ? "entering…" : "design"}
              </span>
              <span
                className="pointer-events-none absolute -bottom-8 left-1/2 w-40 -translate-x-1/2 text-center text-[11px] leading-4 text-ghost opacity-0 transition-opacity duration-300"
                style={{ opacity: isHover && !isSel ? 1 : 0 }}
              >
                {d.headline}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
