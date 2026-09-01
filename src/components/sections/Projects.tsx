"use client";

import { useRef, useState } from "react";
import { projects } from "@/data/portfolio";
import ProjectDialog from "./ProjectDialog";

const DIM_LABEL: Record<string, string> = {
  PRODUCT: "Product",
  UX: "UX",
  XR: "XR",
  AI: "AI",
};

export default function Projects() {
  const [selected, setSelected] = useState<{ index: number; rect: DOMRect } | null>(null);
  const cardRefs = useRef<(HTMLButtonElement | null)[]>([]);

  function handleClick(index: number) {
    const el = cardRefs.current[index];
    if (!el) return;
    const rect = el.getBoundingClientRect();
    setSelected({ index, rect });
  }

  return (
    <section id="world" className="section">
      <div className="section-inner">
        <p className="mb-6 font-mono text-[11px] uppercase tracking-[0.5em] text-cyber">
          SELECTED WORK
        </p>
        <h2 className="mb-16 font-display text-[clamp(2rem,6vw,3.5rem)] leading-[1.05] tracking-tight text-paper">
          Recent projects.
        </h2>
        <div className="grid-2">
          {projects.map((p, i) => (
            <button
              key={p.title}
              ref={(el) => { cardRefs.current[i] = el; }}
              type="button"
              onClick={() => handleClick(i)}
              className="project-card reveal text-left"
              data-reveal-delay={i}
            >
              <div className="mb-4 flex items-center justify-between">
                <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-cyber">
                  {DIM_LABEL[p.dimension]}
                </span>
                <span className="font-mono text-[11px] text-faint">{p.year}</span>
              </div>
              <h3 className="font-display text-xl font-bold text-paper transition-colors duration-300 group-hover:text-cyber">
                {p.title}
              </h3>
              <p className="mt-3 text-sm leading-7 text-ghost">{p.blurb}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {p.tags.map((t) => (
                  <span
                    key={t}
                    className="border border-white/10 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-ghost"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </button>
          ))}
        </div>
      </div>

      {selected !== null && (
        <ProjectDialog
          project={projects[selected.index]}
          sourceRect={selected.rect}
          onClose={() => setSelected(null)}
        />
      )}
    </section>
  );
}
