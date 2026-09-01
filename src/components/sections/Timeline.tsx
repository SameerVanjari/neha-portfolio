"use client";

import { useEffect, useRef, useState } from "react";
import { milestones } from "@/data/portfolio";
import { useTimelineReveal } from "@/hooks/useTimelineReveal";

const WAVE_POINTS = [
  { x: 0.125, y: 80 },
  { x: 0.375, y: 320 },
  { x: 0.625, y: 80 },
  { x: 0.875, y: 320 },
];

const WAVE_PATH = "M 0,200 C 100,80 200,80 300,200 C 400,320 500,320 600,200 C 700,80 800,80 900,200 C 1000,320 1100,320 1200,200 C 1300,80 1400,80 1500,200";

export default function Timeline() {
  const containerRef = useTimelineReveal(0.15);
  const svgRef = useRef<SVGSVGElement>(null);
  const [points, setPoints] = useState<{ cx: number; cy: number }[]>([]);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;
    const path = svg.querySelector<SVGPathElement>("#wave-path");
    if (!path) return;

    const totalLength = path.getTotalLength();
    path.style.strokeDasharray = `${totalLength}`;
    path.style.strokeDashoffset = `${totalLength}`;

    const computedPoints = WAVE_POINTS.map((wp) => {
      const pt = path.getPointAtLength(wp.x * totalLength);
      return { cx: pt.x, cy: pt.y };
    });
    setPoints(computedPoints);
  }, []);

  return (
    <section id="timeline" className="section timeline-section">
      <div ref={containerRef} className="timeline-wave-wrapper">
        <div className="section-inner" style={{ maxWidth: "900px" }}>
          <p className="mb-6 font-mono text-[11px] uppercase tracking-[0.5em] text-cyber">
            THE JOURNEY
          </p>
          <h2 className="mb-16 font-display text-[clamp(2rem,6vw,3.5rem)] leading-[1.05] tracking-tight text-paper">
            Seven years, four mindsets.
          </h2>
        </div>

        <div className="timeline-wave-container">
          <svg
            ref={svgRef}
            viewBox="0 0 1500 400"
            className="timeline-wave-svg"
            preserveAspectRatio="xMidYMid meet"
          >
            <path
              id="wave-path"
              d={WAVE_PATH}
              fill="none"
              stroke="var(--color-faint)"
              strokeWidth="2"
              className="timeline-wave-line"
            />
            {points.map((pt, i) => (
              <circle
                key={milestones[i].year}
                cx={pt.cx}
                cy={pt.cy}
                r="8"
                fill="var(--color-void)"
                stroke="var(--color-cyber)"
                strokeWidth="2"
                className="timeline-wave-point"
                style={{ transitionDelay: `${0.3 + i * 0.2}s` }}
              />
            ))}
          </svg>

          <div className="timeline-wave-cards">
            {milestones.map((m, i) => (
              <div
                key={m.year}
                className="timeline-wave-card"
                style={{ transitionDelay: `${0.5 + i * 0.2}s` }}
              >
                <p className="mb-1 font-mono text-[10px] uppercase tracking-[0.3em] text-cyber">
                  {m.year}
                </p>
                <h3 className="font-display text-xl font-bold text-paper">
                  {m.title}
                </h3>
                <p className="mt-3 max-w-md text-sm leading-7 text-ghost">
                  {m.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
