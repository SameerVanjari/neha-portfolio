"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";
import type { Theme } from "@/data/themes";
import { getLenis } from "@/lib/lenis";

export type CaseStudyTocItem = { id: string; label: string };

export const CASE_STUDY_SECTIONS: CaseStudyTocItem[] = [
  { id: "overview", label: "Overview" },
  { id: "challenge", label: "Challenge" },
  { id: "approach", label: "Approach" },
  { id: "result", label: "Result" },
  { id: "related", label: "Related" },
  { id: "contact", label: "Contact" },
];

const OFFSET = 88;

export default function CaseStudyToc({
  ids,
  items,
  theme,
}: {
  ids?: readonly string[];
  items?: readonly CaseStudyTocItem[];
  theme: Theme;
}) {
  const resolved =
    items ?? CASE_STUDY_SECTIONS.filter((s) => !ids || ids.includes(s.id));
  const [active, setActive] = useState(resolved[0]?.id ?? "overview");
  const idKey = resolved.map((s) => s.id).join(",");
  const reduce = useReducedMotion();

  useEffect(() => {
    const list = idKey.split(",").filter(Boolean);
    if (!list.length) return;

    // Nearest section at/above 40% viewport height — runs on every scroll
    // frame regardless of which scroller (Lenis / native) drives it.
    const pick = () => {
      let current = list[0];
      for (const id of list) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= window.innerHeight * 0.4) {
          current = id;
        }
      }
      setActive((prev) => (prev === current ? prev : current));
    };

    // IntersectionObserver is the primary sync — it fires even when scroll
    // events are coalesced or driven by a virtual scroller.
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-20% 0px -65% 0px", threshold: 0 }
    );
    for (const id of list) {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    }

    pick();
    window.addEventListener("scroll", pick, { passive: true });
    const scroller = getLenis();
    scroller?.on("scroll", pick);
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", pick);
      getLenis()?.off("scroll", pick);
    };
  }, [idKey]);

  const goTo = (id: string) => {
    setActive(id);
    const el = document.getElementById(id);
    if (!el) return;
    if (reduce) {
      window.scrollTo(
        0,
        Math.max(0, window.scrollY + el.getBoundingClientRect().top - OFFSET)
      );
      return;
    }
    const scroller = getLenis();
    if (scroller) {
      scroller.scrollTo(el, { offset: -OFFSET, duration: 1.0 });
      return;
    }
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <nav
      aria-label="On this page"
      className="case-toc"
      style={{ ["--toc-accent" as string]: theme.accent }}
    >
      <ul className="flex flex-col gap-2.5">
          {resolved.map((item) => {
          const isActive = active === item.id;
          return (
            <li key={item.id}>
              <button
                type="button"
                aria-current={isActive ? "true" : undefined}
                className="case-toc__link text-left"
                style={{
                  fontFamily: "var(--font-body)",
                  color: isActive ? theme.text : theme.muted,
                  fontWeight: isActive ? 600 : 400,
                }}
                onClick={() => goTo(item.id)}
              >
                <span
                  aria-hidden
                  className="case-toc__mark"
                  style={isActive ? { background: theme.accent } : undefined}
                />
                {item.label}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
