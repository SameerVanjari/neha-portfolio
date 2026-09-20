"use client";

import { useEffect, useState } from "react";

export type RulerItem = { id: string; label: string };

const INK = "#16161E";
const PAPER = "#F2EEE6";
const ACCENT = "#35339E";
const TICK = "rgba(22,22,30,0.22)";

/**
 * Minimal ruler-style index for the case-study layout: a vertical scale fixed
 * to the viewport edge with tick lines for each section. Hovering (or
 * keyboard-focusing) a tick reveals the section name; the tick of the section
 * currently in view stays lit. Ticks for sections not present on the page
 * (config-driven) are hidden automatically.
 */
export default function EditorialRuler({ items }: { items: RulerItem[] }) {
  const [present, setPresent] = useState<RulerItem[]>([]);
  const [active, setActive] = useState<string | null>(null);
  const [hover, setHover] = useState<string | null>(null);

  useEffect(() => {
    let io: IntersectionObserver | undefined;
    const t = window.setTimeout(() => {
      const shown = items.filter((i) => document.getElementById(i.id));
      setPresent(shown);

      const visible = new Set<Element>();
      io = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) visible.add(e.target);
            else visible.delete(e.target);
          });
          for (const item of shown) {
            const el = document.getElementById(item.id);
            if (el && visible.has(el)) {
              setActive(item.id);
              return;
            }
          }
        },
        { rootMargin: "-25% 0px -60% 0px", threshold: 0 }
      );
      shown.forEach((item) => {
        const el = document.getElementById(item.id);
        if (el) io!.observe(el);
      });
    }, 0);

    return () => {
      window.clearTimeout(t);
      io?.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!present.length) return null;
  const label = hover ?? active;

  return (
    <nav
      aria-label="Sections"
      className="fixed right-4 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-end gap-[7px] md:flex"
      onMouseLeave={() => setHover(null)}
    >
      {present.map((item) => {
        const isActive = active === item.id;
        const isHover = hover === item.id;
        const on = isActive || isHover;
        return (
          <button
            key={item.id}
            aria-label={item.label}
            onMouseEnter={() => setHover(item.id)}
            onFocus={() => setHover(item.id)}
            onClick={() => {
              document.getElementById(item.id)?.scrollIntoView({ behavior: "smooth", block: "start" });
              setActive(item.id);
            }}
            className="relative flex h-4 cursor-pointer items-center justify-end outline-none"
          >
            <span
              aria-hidden
              className="block h-[2px] transition-all duration-200"
              style={{
                width: on ? 18 : 9,
                background: isActive ? ACCENT : isHover ? INK : TICK,
              }}
            />
            {label === item.id ? (
              <span
                className="pointer-events-none absolute right-[26px] whitespace-nowrap rounded-[3px] px-2 py-1 text-[10px] uppercase tracking-[0.14em]"
                style={{ background: INK, color: PAPER, fontFamily: "var(--font-body)" }}
              >
                {isActive ? "● " : ""}
                {item.label}
              </span>
            ) : null}
          </button>
        );
      })}
    </nav>
  );
}
