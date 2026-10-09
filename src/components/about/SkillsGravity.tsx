"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useMotionPref } from "@/components/motion/reveal";

/**
 * Gravity-skills playground, powered by a tiny hand-rolled 2D physics engine.
 *
 * Why not a physics library (matter.js / planck)? Those ship 40–90KB gzipped
 * for features we don't need, and we only ever simulate two dozen axis-aligned
 * bodies. This engine is ~120 lines, dependency-free, and does exactly one
 * job: gravity down, buoyancy up, inelastic stacking, drag. It renders with
 * `translate3d` on the DOM (crisp, selectable, accessible text — no canvas
 * raster) and pauses whenever the field is offscreen or the tab is hidden, so
 * it costs nothing until it's looked at.
 *
 * The field is deliberately mixed-shape: design/method skills are pills,
 * software and frameworks are rounded-square chips, and a handful of lead
 * skills are bigger still — so the toolkit reads at a glance, and bigger
 * bodies settle differently under gravity.
 *
 * Pick a discipline and the field re-gravitates: matching skills lose weight
 * and float to the ceiling, the rest are pulled to the floor. Drag any body
 * and it falls back into the stack when you let go.
 */

type DomainId = "ux" | "xr" | "product" | "ai";
type Kind = "skill" | "tool";

const DOMAINS: { id: DomainId | "all"; label: string }[] = [
  { id: "all", label: "All" },
  { id: "ux", label: "UX" },
  { id: "xr", label: "VR" },
  { id: "product", label: "Product" },
  { id: "ai", label: "AI" },
];

const SKILLS: { label: string; domains: DomainId[]; kind: Kind; big?: boolean }[] = [
  { label: "Interaction Design", domains: ["ux", "product"], kind: "skill", big: true },
  { label: "UX Design", domains: ["ux"], kind: "skill", big: true },
  { label: "Design Systems", domains: ["ux", "product"], kind: "skill" },
  { label: "WCAG Accessibility", domains: ["ux"], kind: "skill" },
  { label: "Usability Testing", domains: ["ux"], kind: "skill" },
  { label: "Journey Mapping", domains: ["ux"], kind: "skill" },
  { label: "Generative AI", domains: ["ai"], kind: "skill", big: true },
  { label: "Conversational Interfaces", domains: ["ai", "ux"], kind: "skill" },
  { label: "Adaptive UX", domains: ["ai", "ux"], kind: "skill" },
  { label: "Spatial UI", domains: ["xr", "ux"], kind: "skill" },
  { label: "NLP", domains: ["ai"], kind: "tool" },
  { label: "Figma", domains: ["ux", "product"], kind: "tool", big: true },
  { label: "Unity 3D", domains: ["xr"], kind: "tool", big: true },
  { label: "Unreal Engine", domains: ["xr"], kind: "tool" },
  { label: "Blender", domains: ["xr", "product"], kind: "tool" },
  { label: "8th Wall", domains: ["xr"], kind: "tool" },
  { label: "WebXR", domains: ["xr"], kind: "tool" },
  { label: "Three.js", domains: ["xr"], kind: "tool" },
  { label: "Python", domains: ["ai", "product"], kind: "tool" },
  { label: "React", domains: ["product"], kind: "tool", big: true },
  { label: "Microsoft Azure", domains: ["ai", "product"], kind: "tool" },
];

const BODY = { fontFamily: "var(--font-body)" } as const;

/* ------------------------------- engine tuning ------------------------------ */
const GRAVITY = 1500; // px/s² pulling grounded bodies down
const LIFT = 1450; // px/s² pushing matched bodies up
const AIR = 0.985; // per-step velocity retention (air drag)
const FLOOR_FRICTION = 0.84;
const MAX_V = 2400; // px/s speed clamp

type Body = {
  label: string;
  el: HTMLLIElement;
  w: number;
  h: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
};

export default function SkillsGravity() {
  const reduce = useMotionPref();
  const [domain, setDomain] = useState<DomainId | "all">("all");
  const [ready, setReady] = useState(false);

  const fieldRef = useRef<HTMLUListElement | null>(null);
  const elsRef = useRef<Map<string, HTMLLIElement>>(new Map());
  const relatedRef = useRef<Set<string>>(new Set());
  const engineRef = useRef<((label: string, e: React.PointerEvent) => void) | null>(null);

  const relatedLabels = useMemo(
    () => new Set((domain === "all" ? [] : SKILLS.filter((s) => s.domains.includes(domain))).map((s) => s.label)),
    [domain]
  );
  const floating = domain !== "all";

  useEffect(() => {
    relatedRef.current = floating ? relatedLabels : new Set();
  }, [relatedLabels, floating]);

  const register = useCallback((label: string, el: HTMLLIElement | null) => {
    if (el) elsRef.current.set(label, el);
    else elsRef.current.delete(label);
  }, []);

  useEffect(() => {
    if (reduce) return;
    const field = fieldRef.current;
    if (!field) return;

    let W = field.clientWidth;
    let H = field.clientHeight;
    const MARGIN = 6;
    const minX = MARGIN;
    const minY = MARGIN;
    let maxX = W - MARGIN;
    let maxY = H - MARGIN;

    // Build bodies in a block at the top so they drop in and settle.
    const bodies: Body[] = [];
    const gapX = 10;
    const gapY = 10;
    let cx = MARGIN;
    let cy = MARGIN;
    for (const s of SKILLS) {
      const el = elsRef.current.get(s.label);
      if (!el) continue;
      const w = el.offsetWidth;
      const h = el.offsetHeight;
      if (cx + w > W - MARGIN) {
        cx = MARGIN;
        cy += h + gapY;
      }
      bodies.push({ label: s.label, el, w, h, x: cx, y: cy, vx: 0, vy: 0 });
      el.style.transform = `translate3d(${cx}px,${cy}px,0)`;
      cx += w + gapX;
    }
    if (!bodies.length) return;

    let dragging: Body | null = null;
    let dragOffX = 0;
    let dragOffY = 0;
    let dragT = 0;

    const clampV = (v: number) => (v > MAX_V ? MAX_V : v < -MAX_V ? -MAX_V : v);

    function integrate(dt: number) {
      const rel = relatedRef.current;
      for (const b of bodies) {
        if (b === dragging) continue;
        b.vy += (rel.has(b.label) ? -LIFT : GRAVITY) * dt;
        b.vx *= AIR;
        b.vy *= AIR;
        b.vx = clampV(b.vx);
        b.vy = clampV(b.vy);
        b.x += b.vx * dt;
        b.y += b.vy * dt;
      }
    }

    function collide() {
      const rel = relatedRef.current;
      for (let it = 0; it < 6; it++) {
        // Pairwise AABB separation. Floating and grounded bodies pass through
        // each other, so a domain change reads as lifting/sinking rather than
        // a shove. Incoming normal velocity is zeroed so stacks settle still.
        for (let i = 0; i < bodies.length; i++) {
          const a = bodies[i];
          const aFloat = rel.has(a.label);
          for (let j = i + 1; j < bodies.length; j++) {
            const b = bodies[j];
            if (aFloat !== rel.has(b.label)) continue;
            const ox = Math.min(a.x + a.w, b.x + b.w) - Math.max(a.x, b.x);
            if (ox <= 0) continue;
            const oy = Math.min(a.y + a.h, b.y + b.h) - Math.max(a.y, b.y);
            if (oy <= 0) continue;
            if (ox < oy) {
              const push = ox / 2;
              if (a.x < b.x) {
                a.x -= push;
                b.x += push;
                if (a.vx > 0) a.vx = 0;
                if (b.vx < 0) b.vx = 0;
              } else {
                a.x += push;
                b.x -= push;
                if (a.vx < 0) a.vx = 0;
                if (b.vx > 0) b.vx = 0;
              }
            } else {
              const push = oy / 2;
              if (a.y < b.y) {
                a.y -= push;
                b.y += push;
                if (a.vy > 0) a.vy = 0;
                if (b.vy < 0) b.vy = 0;
              } else {
                a.y += push;
                b.y -= push;
                if (a.vy < 0) a.vy = 0;
                if (b.vy > 0) b.vy = 0;
              }
            }
          }
        }
        for (const b of bodies) {
          if (b.x < minX) {
            b.x = minX;
            if (b.vx < 0) b.vx = 0;
          } else if (b.x + b.w > maxX) {
            b.x = maxX - b.w;
            if (b.vx > 0) b.vx = 0;
          }
          if (b.y < minY) {
            b.y = minY;
            if (b.vy < 0) b.vy = 0;
          } else if (b.y + b.h > maxY) {
            b.y = maxY - b.h;
            if (b.vy > 0) b.vy = 0;
            b.vx *= FLOOR_FRICTION;
          }
        }
      }
    }

    function render() {
      for (const b of bodies) {
        b.el.style.transform = `translate3d(${b.x.toFixed(2)}px,${b.y.toFixed(2)}px,0)`;
      }
    }

    const STEP = 1 / 120;
    let raf = 0;
    let last = performance.now();
    let acc = 0;
    let running = false;
    let onScreen = true;

    function frame(now: number) {
      if (!running) return;
      raf = requestAnimationFrame(frame);
      let elapsed = (now - last) / 1000;
      last = now;
      if (elapsed > 0.05) elapsed = 0.05;
      acc += elapsed;
      let steps = 0;
      while (acc >= STEP && steps < 8) {
        integrate(STEP);
        collide();
        acc -= STEP;
        steps++;
      }
      render();
    }

    function start() {
      if (running || !onScreen || document.hidden) return;
      running = true;
      last = performance.now();
      acc = 0;
      raf = requestAnimationFrame(frame);
    }
    function stop() {
      running = false;
      cancelAnimationFrame(raf);
    }

    // Reveal + go.
    const raf0 = requestAnimationFrame(() => {
      setReady(true);
      start();
    });

    /* ------------------------------- interaction ------------------------------ */
    const onMove = (e: PointerEvent) => {
      if (!dragging) return;
      const rect = field.getBoundingClientRect();
      const nx = e.clientX - rect.left - dragOffX;
      const ny = e.clientY - rect.top - dragOffY;
      const now = performance.now();
      const dtms = Math.max(4, now - dragT);
      dragging.vx = clampV(((nx - dragging.x) / dtms) * 1000);
      dragging.vy = clampV(((ny - dragging.y) / dtms) * 1000);
      dragging.x = nx;
      dragging.y = ny;
      dragT = now;
    };
    const onUp = () => {
      if (!dragging) return;
      dragging.el.style.zIndex = "";
      dragging.el.style.cursor = "grab";
      dragging = null;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointercancel", onUp);

    engineRef.current = (label, e) => {
      const b = bodies.find((x) => x.label === label);
      if (!b) return;
      const rect = field.getBoundingClientRect();
      dragOffX = e.clientX - rect.left - b.x;
      dragOffY = e.clientY - rect.top - b.y;
      dragT = performance.now();
      dragging = b;
      b.vx = 0;
      b.vy = 0;
      b.el.style.zIndex = "30";
      b.el.style.cursor = "grabbing";
      start();
    };

    /* ------------------------------ lifecycle --------------------------------- */
    const ro = new ResizeObserver(() => {
      W = field.clientWidth;
      H = field.clientHeight;
      maxX = W - MARGIN;
      maxY = H - MARGIN;
      for (const b of bodies) {
        if (b.x + b.w > maxX) b.x = maxX - b.w;
        if (b.y + b.h > maxY) b.y = maxY - b.h;
        if (b.x < minX) b.x = minX;
        if (b.y < minY) b.y = minY;
      }
      render();
    });
    ro.observe(field);

    const io = new IntersectionObserver(
      ([entry]) => {
        onScreen = entry.isIntersecting;
        if (onScreen) start();
        else stop();
      },
      { threshold: 0 }
    );
    io.observe(field);

    const onVisibility = () => {
      if (document.hidden) stop();
      else start();
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      stop();
      cancelAnimationFrame(raf0);
      ro.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);
      engineRef.current = null;
    };
  }, [reduce]);

  const pillClass = (kind: Kind, big: boolean, isRel: boolean, isSink: boolean) => {
    const shape = kind === "tool" ? "rounded-[16px]" : "rounded-full";
    const size =
      kind === "tool"
        ? big
          ? "px-5 py-3 text-[15px]"
          : "px-4 py-2.5 text-[13px]"
        : big
          ? "px-6 py-3.5 text-[16px]"
          : "px-5 py-3 text-[14px]";
    const tone = isRel
      ? "border-[#3B33B5] bg-[#3B33B5] text-white shadow-[0_10px_24px_rgba(59,51,181,0.30)]"
      : isSink
        ? "border-[#E4DDD2] bg-[#F1ECE4] text-[#9A948B]"
        : "border-[#CFC7BA] bg-[#F2EEE7] text-[#3A3833]";
    return `inline-flex items-center gap-2 border font-medium tracking-[0.05em] ${shape} ${size} ${tone} ${
      isRel ? "z-20" : "z-10"
    }`;
  };

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Highlight skills by discipline">
        {DOMAINS.map((d) => {
          const active = d.id === domain;
          return (
            <button
              key={d.id}
              type="button"
              aria-pressed={active}
              onClick={() => setDomain(d.id)}
              className={`inline-flex h-9 cursor-pointer items-center justify-center rounded-full px-4 text-[12px] font-medium tracking-[0.06em] transition-colors ${
                active ? "bg-[#17161B] text-[#F2EEE7]" : "border border-[#CFC7BA] text-[#3A3833] hover:border-[#17161B]"
              }`}
              style={BODY}
            >
              {d.label}
            </button>
          );
        })}
        <span className="ml-1 text-[12px] text-[#8A857D]" style={BODY}>
          Drag the pieces · pick a discipline to shift its gravity
        </span>
      </div>

      <div
        className="relative mt-5 overflow-hidden rounded-[18px] border border-[#DAD3C8] bg-[#FBF9F5] p-5"
        style={{
          backgroundImage:
            "radial-gradient(120% 80% at 50% 120%, rgba(59,51,181,0.06) 0%, rgba(59,51,181,0) 60%)",
        }}
      >
        {reduce ? (
          // Reduced motion: the same state, laid out statically.
          <ul className="flex flex-wrap gap-3">
            {SKILLS.map((s) => {
              const isRel = floating && relatedLabels.has(s.label);
              return (
                <li key={s.label} className={pillClass(s.kind, !!s.big, isRel, false)} style={BODY}>
                  {s.kind === "tool" ? <Dot /> : null}
                  {s.label}
                </li>
              );
            })}
          </ul>
        ) : (
          <ul
            ref={fieldRef}
            className="relative block h-[440px] select-none md:h-[500px]"
            style={{ touchAction: "none" }}
          >
            {SKILLS.map((s) => {
              const isRel = floating && relatedLabels.has(s.label);
              const isSink = floating && !relatedLabels.has(s.label);
              return (
                <li
                  key={s.label}
                  ref={(el) => register(s.label, el)}
                  onPointerDown={(e) => {
                    e.preventDefault();
                    engineRef.current?.(s.label, e);
                  }}
                  className={`absolute left-0 top-0 cursor-grab touch-none select-none will-change-transform ${pillClass(
                    s.kind,
                    !!s.big,
                    isRel,
                    isSink
                  )}`}
                  style={{
                    ...BODY,
                    opacity: ready ? 1 : 0,
                    transition:
                      "opacity 400ms ease, background-color 300ms ease, border-color 300ms ease, color 300ms ease",
                  }}
                >
                  {s.kind === "tool" ? <Dot /> : null}
                  {s.label}
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}

/** A small square marker distinguishing software / frameworks from skills. */
function Dot() {
  return <span aria-hidden className="inline-block size-1.5 shrink-0 rounded-[2px] bg-current opacity-50" />;
}
