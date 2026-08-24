"use client";

import { useState } from "react";
import { milestones } from "@/data/portfolio";
import { clearMilestone, hoverMilestone } from "@/lib/interactions";

export default function MilestoneBar() {
  const [active, setActive] = useState(-1);

  return (
    <div className="flex flex-col items-center">
      <p data-fade className="mb-10 font-mono text-[11px] uppercase tracking-[0.4em] text-ghost">
        a timeline lives inside the world — hover to make the bird perch
      </p>

      <div data-fade className="relative flex w-full max-w-2xl items-center justify-between">
        <span className="absolute left-0 right-0 top-1/2 h-px -translate-y-1/2 bg-gradient-to-r from-transparent via-cyber/40 to-transparent" />
        {milestones.map((m, i) => {
          const isActive = active === i;
          const accent = ["#00e5ff", "#8b5cff", "#ff2bd6", "#ffc94d"][i];
          return (
            <button
              key={m.year}
              type="button"
              onMouseEnter={() => {
                setActive(i);
                hoverMilestone(i);
              }}
              onMouseLeave={() => {
                setActive(-1);
                clearMilestone();
              }}
              className="group relative z-10 flex flex-col items-center gap-3 outline-none"
            >
              <span
                className="flex h-14 w-14 items-center justify-center rounded-full border font-mono text-sm font-bold transition-all duration-300"
                style={{
                  borderColor: isActive ? accent : "rgba(139,147,167,0.3)",
                  color: isActive ? accent : "#8b93a7",
                  boxShadow: isActive ? `0 0 24px ${accent}66` : "none",
                  transform: isActive ? "translateY(-4px)" : "none",
                }}
              >
                {m.year}
              </span>
              <span
                className="font-mono text-[10px] uppercase tracking-[0.25em] transition-colors duration-300"
                style={{ color: isActive ? accent : "#8b93a7" }}
              >
                {m.title}
              </span>
            </button>
          );
        })}
      </div>

      <div className="mt-12 flex min-h-[72px] items-center justify-center">
        <p
          data-fade
          className="max-w-md text-center text-sm leading-6 text-ghost transition-colors duration-300"
        >
          {active >= 0 ? (
            <span style={{ color: "#e9edf6" }}>{milestones[active].description}</span>
          ) : (
            <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-faint">
              each milestone is a door
            </span>
          )}
        </p>
      </div>
    </div>
  );
}
