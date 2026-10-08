"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { getLenis } from "@/lib/lenis";

/**
 * Ruler-style index for the bespoke case-study pages.
 *
 * A vertical ruler is pinned to the left edge; one tick per section. The tick
 * of the section currently in view expands, and hovering (or keyboard-focusing)
 * any tick reveals the section name. Clicking a tick scrolls smoothly to it.
 *
 * Sections are discovered from the DOM at mount: every `h2` in `<main>` becomes
 * a tick (labelled by the eyebrow above it when one is present, else by the
 * heading itself), and any element carrying `data-index` — for sections with no
 * heading, like the contact footer — is added too. Because the ticks are the
 * real section elements, the index can never point at the wrong place; if a
 * section isn't rendered, its tick isn't either.
 *
 * The ruler stays hidden while the hero is on screen, and its tick colour is
 * sampled from whatever background is actually behind it at the left edge, so
 * it stays legible over both cream and dark bands.
 */

type Tone = "light" | "dark";
type RulerItem = { el: HTMLElement; label: string };

const OFFSET = 96;

const INK = "#16161E";
const PAPER = "#F2EEE6";

const COLORS: Record<Tone, { idle: string; hover: string; active: string }> = {
  light: { idle: "rgba(22,22,30,0.42)", hover: INK, active: "#35339E" },
  dark: { idle: "rgba(255,255,255,0.45)", hover: PAPER, active: "#8f8ce8" },
};

/** Read a tone from an opaque CSS colour, or null if it is transparent. */
function bgTone(bg: string): Tone | null {
  const m = bg.match(/rgba?\(([^)]+)\)/);
  if (!m) return null;
  const p = m[1].split(",").map((s) => parseFloat(s.trim()));
  const [r, g, b] = p;
  const a = p[3] ?? 1;
  if (a <= 0.5 || !Number.isFinite(r) || !Number.isFinite(g) || !Number.isFinite(b)) return null;
  const lum = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
  return lum < 0.45 ? "dark" : "light";
}

/** Prefer the short eyebrow sitting directly above a heading; else the heading. */
function labelForHeading(el: HTMLElement): string {
  const prev = el.previousElementSibling as HTMLElement | null;
  const prevText = prev?.textContent?.replace(/\s+/g, " ").trim() ?? "";
  if (prevText && prevText.length <= 48) return prevText;
  return el.textContent?.replace(/\s+/g, " ").trim() ?? "";
}

function discover(): RulerItem[] {
  const main = document.querySelector("main") ?? document.body;

  const marks = Array.from(main.querySelectorAll<HTMLElement>("[data-index]"))
    .map((el) => ({ el, label: el.dataset.index ?? "" }));

  const headings = Array.from(main.querySelectorAll<HTMLElement>("h2"))
    .filter((h) => !h.closest("[data-index]") && !h.closest("nav") && !h.closest("[aria-hidden='true']"))
    .map((h) => ({ el: h, label: labelForHeading(h) }));

  return [...marks, ...headings]
    .filter((i) => i.label)
    .sort((a, b) =>
      a.el.compareDocumentPosition(b.el) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1
    );
}

export function ProjectRuler({ accent = "#35339E" }: { accent?: string }) {
  const [items, setItems] = useState<RulerItem[]>([]);
  const [active, setActive] = useState(0);
  const [hover, setHover] = useState<number | null>(null);
  const [tone, setTone] = useState<Tone>("light");
  const [visible, setVisible] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    let io: IntersectionObserver | undefined;
    let detach = () => {};

    // Deferred a frame so every section has mounted (case pages stage their own
    // entrance, and some sections are conditional).
    const timer = window.setTimeout(() => {
      const main = document.querySelector("main") ?? document.body;
      const found = discover();
      setItems(found);
      setActive(0);

      const visibleSet = new Set<Element>();
      io = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) visibleSet.add(e.target);
            else visibleSet.delete(e.target);
          });
          for (let i = 0; i < found.length; i++) {
            if (visibleSet.has(found[i].el)) {
              setActive(i);
              return;
            }
          }
        },
        { rootMargin: "-25% 0px -60% 0px", threshold: 0 }
      );
      found.forEach((item) => io!.observe(item.el));

      // Sample the true background behind the ruler (left edge, mid-screen).
      const sampleTone = () => {
        const stack = document.elementsFromPoint(8, window.innerHeight / 2) as HTMLElement[];
        for (const el of stack) {
          const t = bgTone(getComputedStyle(el).backgroundColor);
          if (t) {
            setTone(t);
            return;
          }
        }
      };

      // Hide the ruler until the hero has scrolled past.
      const h1 = main.querySelector("h1") as HTMLElement | null;
      const hero =
        (h1?.closest("header, section") as HTMLElement | null) ??
        h1 ??
        (found[0]?.el.closest("section") as HTMLElement | null) ??
        found[0]?.el ??
        null;

      const update = () => {
        setVisible(!hero || hero.getBoundingClientRect().bottom <= window.innerHeight * 0.5);
        sampleTone();
      };
      update();

      window.addEventListener("scroll", update, { passive: true });
      window.addEventListener("resize", update);
      const scroller = getLenis();
      scroller?.on("scroll", update);
      detach = () => {
        window.removeEventListener("scroll", update);
        window.removeEventListener("resize", update);
        getLenis()?.off("scroll", update);
      };
    }, 0);

    return () => {
      window.clearTimeout(timer);
      io?.disconnect();
      detach();
    };
  }, []);

  if (!items.length) return null;

  const c = tone === "dark" ? COLORS.dark : { ...COLORS.light, active: accent };

  const goTo = (i: number) => {
    const el = items[i]?.el;
    if (!el) return;
    setActive(i);
    if (reduce) {
      window.scrollTo(0, Math.max(0, window.scrollY + el.getBoundingClientRect().top - OFFSET));
      return;
    }
    const scroller = getLenis();
    if (scroller) scroller.scrollTo(el, { offset: -OFFSET, duration: 1.1 });
    else el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <nav
      aria-label="On this page"
      onMouseLeave={() => setHover(null)}
      className={`fixed left-4 top-1/2 z-30 hidden -translate-y-1/2 flex-col items-start gap-[7px] transition-opacity duration-300 xl:flex ${
        visible ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
    >
      {items.map((item, i) => {
        const isActive = active === i;
        const isHover = hover === i;
        const on = isActive || isHover;
        const color = isActive ? c.active : isHover ? c.hover : c.idle;
        return (
          <button
            key={`${i}-${item.label}`}
            type="button"
            aria-label={item.label}
            aria-current={isActive ? "true" : undefined}
            onMouseEnter={() => setHover(i)}
            onFocus={() => setHover(i)}
            onBlur={() => setHover((h) => (h === i ? null : h))}
            onClick={() => goTo(i)}
            className="relative flex h-4 cursor-pointer items-center outline-none focus-visible:outline-2 focus-visible:outline-offset-2"
          >
            <span className="relative flex items-center">
              <span
                aria-hidden
                className="project-ruler__line block h-[2px] rounded-full transition-all duration-200"
                style={{ width: isActive ? 18 : on ? 14 : 9, background: color }}
              />
              {isActive ? (
                <span
                  aria-hidden
                  className="absolute left-full ml-[4px] block h-[5px] w-[5px] -translate-y-1/2 rounded-full transition-colors duration-200"
                  style={{ top: "50%", background: color }}
                />
              ) : null}
            </span>
            {isHover ? (
              <span
                className="pointer-events-none absolute left-[32px] max-w-[240px] overflow-hidden text-ellipsis whitespace-nowrap rounded-[3px] px-2 py-1 text-[10px] uppercase tracking-[0.14em]"
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

export default ProjectRuler;
