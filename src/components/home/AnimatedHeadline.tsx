"use client";

import { useEffect, useRef } from "react";
import type { HomeLens } from "@/data/lenses";
import { LENS_ORDER, LENSES } from "@/data/lenses";
import { useMotionPref } from "@/components/motion/reveal";
import { useLoadStage } from "@/components/LoadStage";

/**
 * Hero headline with a per-letter rise + blur transition.
 *
 * The text is drawn as the real font (crisp glyphs), never dots.
 *   enter — each letter of the complete title rises from below (blur ~20px,
 *           opacity 30%) into place
 *           (blur 0, opacity 100%), one letter after another.
 *   exit  — each letter lifts upward, softening and fading away.
 * Both use cubic-bezier easings. Invisible DOM spans reserve the tallest
 * variant's height, so the canvas overlay never shifts the layout.
 */

interface Glyph {
  ch: string;
  x: number;
  y: number;
  ci: number;
  fs: number;
  color: string;
  mode: "in" | "out" | "idle";
  t0: number;
  dur: number;
}

const LEAD_COLOR = "#f3f1ff";

const ENTRY_BLUR = 20; // px at the start of the rise
const ENTRY_ALPHA = 0; // the title is fully hidden before each glyph enters
const ENTRY_RISE = 0.5; // × fontSize the letter starts below its slot
const EXIT_BLUR = 9; // px as the letter leaves
const EXIT_RISE = 0.5; // × fontSize the letter lifts on exit
const IN_DUR = 700;
const OUT_DUR = 520;
const PER_CHAR_OUT = 24;
// Extra pause after the outgoing phrase has fully cleared, before the incoming
// phrase starts rising — so the line empties, holds, then refills.
const EXIT_HOLD = 260;

function clamp(v: number, a: number, b: number) {
  return v < a ? a : v > b ? b : v;
}

/** CSS-style cubic-bezier → easing function (x, y are the two control points). */
function cubicBezier(x1: number, y1: number, x2: number, y2: number) {
  const cx = 3 * x1;
  const bx = 3 * (x2 - x1) - cx;
  const ax = 1 - cx - bx;
  const cy = 3 * y1;
  const by = 3 * (y2 - y1) - cy;
  const ay = 1 - cy - by;
  const sampleX = (t: number) => ((ax * t + bx) * t + cx) * t;
  const sampleY = (t: number) => ((ay * t + by) * t + cy) * t;
  const sampleDX = (t: number) => (3 * ax * t + 2 * bx) * t + cx;
  return (x: number) => {
    if (x <= 0) return 0;
    if (x >= 1) return 1;
    let t = x;
    for (let i = 0; i < 8; i++) {
      const dx = sampleX(t) - x;
      if (Math.abs(dx) < 1e-4) break;
      const d = sampleDX(t);
      if (Math.abs(d) < 1e-6) break;
      t -= dx / d;
    }
    return sampleY(clamp(t, 0, 1));
  };
}

const ENTRY_EASE = cubicBezier(0.22, 1, 0.36, 1); // ease-out: quick, then settle
const EXIT_EASE = cubicBezier(0.55, 0, 0.85, 0.25); // ease-in: accelerate away

export default function AnimatedHeadline({ lens }: { lens: HomeLens }) {
  const reduce = useMotionPref();
  const { stage } = useLoadStage();
  const h1Ref = useRef<HTMLHeadingElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const glyphsRef = useRef<Glyph[]>([]);
  const nowRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const lensRef = useRef(lens);
  const readyRef = useRef(false);
  const reduceRef = useRef(reduce);
  const stageRef = useRef(stage);
  const startedRef = useRef(false);
  const metricsRef = useRef({ w: 0, h: 0, dpr: 1 });

  /* ---- layout helpers ------------------------------------------------ */

  function fontOf(ctx: CanvasRenderingContext2D, h1: HTMLElement) {
    const cs = getComputedStyle(h1);
    const fontSize = parseFloat(cs.fontSize) || 64;
    const lineHeight = parseFloat(cs.lineHeight) || fontSize * 1.02;
    ctx.font = `${cs.fontWeight} ${fontSize}px ${cs.fontFamily}`;
    if ("letterSpacing" in ctx) ctx.letterSpacing = cs.letterSpacing;
    return { fontSize, lineHeight };
  }

  function wrap(ctx: CanvasRenderingContext2D, text: string, maxWidth: number) {
    const words = text.split(" ");
    const lines: { text: string; start: number }[] = [];
    let cur = "";
    let curStart = 0;
    let pos = 0;
    for (let i = 0; i < words.length; i++) {
      const w = words[i];
      const test = cur ? `${cur} ${w}` : w;
      if (!cur || ctx.measureText(test).width <= maxWidth) {
        if (!cur) curStart = pos;
        cur = test;
      } else {
        lines.push({ text: cur, start: curStart });
        cur = w;
        curStart = pos;
      }
      pos += w.length + 1;
    }
    if (cur) lines.push({ text: cur, start: curStart });
    return lines;
  }

  /** Every glyph of the current phrase with its pen position + order. */
  function buildGlyphs(): Glyph[] {
    const canvas = canvasRef.current;
    const h1 = h1Ref.current;
    if (!canvas || !h1) return [];
    const ctx = canvas.getContext("2d");
    if (!ctx) return [];
    const { fontSize, lineHeight } = fontOf(ctx, h1);

    const { w } = metricsRef.current;
    const lead = lensRef.current.headlineLead;
    const phrase = lensRef.current.headlineAccent;
    const fullText = lead + phrase;
    const lines = wrap(ctx, fullText, w);
    const firstBaseline = fontSize * 0.82;
    const color = lensRef.current.accent;

    const glyphs: Glyph[] = [];
    let ci = 0;
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const y = firstBaseline + i * lineHeight;
      for (let p = 0; p < line.text.length; p++) {
        const ch = line.text[p];
        if (ch !== " ") {
          const absoluteIndex = line.start + p;
          const x = ctx.measureText(line.text.slice(0, p)).width;
          glyphs.push({
            ch,
            x,
            y,
            ci,
            fs: fontSize,
            color: absoluteIndex < lead.length ? LEAD_COLOR : color,
            mode: "idle",
            t0: 0,
            dur: 0,
          });
        }
        ci++;
      }
    }
    return glyphs;
  }

  function spawnIn(now: number, delayBase: number): Glyph[] {
    const gs = buildGlyphs();
    const count = gs.length ? gs[gs.length - 1].ci + 1 : 1;
    const perChar = Math.min(60, Math.max(28, 900 / Math.max(1, count)));
    for (const g of gs) {
      g.mode = "in";
      g.t0 = now + delayBase + g.ci * perChar;
      g.dur = IN_DUR;
    }
    return gs;
  }

  /* ---- frame loop ---------------------------------------------------- */

  function renderFrame(now: number): boolean {
    const canvas = canvasRef.current;
    const h1 = h1Ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !h1 || !ctx) return false;
    const { w, h } = metricsRef.current;

    ctx.filter = "none";
    ctx.globalAlpha = 1;
    ctx.clearRect(0, 0, w, h);

    fontOf(ctx, h1);
    ctx.textBaseline = "alphabetic";
    let active = false;
    const gs = glyphsRef.current;
    for (let i = gs.length - 1; i >= 0; i--) {
      const g = gs[i];
      let blur = 0;
      let alpha = 1;
      let dy = 0;
      let visible = true;

      if (g.mode === "in") {
        if (now < g.t0) {
          visible = false; // letters arrive one at a time
          active = true;
        } else {
          const t = clamp((now - g.t0) / g.dur, 0, 1);
          const e = ENTRY_EASE(t);
          dy = g.fs * ENTRY_RISE * (1 - e);
          blur = ENTRY_BLUR * (1 - e);
          alpha = ENTRY_ALPHA + (1 - ENTRY_ALPHA) * e;
          if (t >= 1) g.mode = "idle";
          else active = true;
        }
      } else if (g.mode === "out") {
        if (now < g.t0) {
          active = true; // hold in place until its turn to leave
        } else {
          const t = clamp((now - g.t0) / g.dur, 0, 1);
          const e = EXIT_EASE(t);
          dy = -g.fs * EXIT_RISE * e;
          blur = EXIT_BLUR * e;
          alpha = 1 - e;
          if (t >= 1) {
            gs.splice(i, 1);
            continue;
          }
          active = true;
        }
      }

      if (!visible || alpha <= 0.01) continue;
      ctx.globalAlpha = alpha;
      ctx.fillStyle = g.color;
      ctx.filter = blur > 0.3 && "filter" in ctx ? `blur(${blur.toFixed(2)}px)` : "none";
      ctx.fillText(g.ch, g.x, g.y + dy);
    }
    ctx.filter = "none";
    ctx.globalAlpha = 1;
    return active;
  }

  function loop(now: number) {
    nowRef.current = now;
    rafRef.current = renderFrame(now) ? requestAnimationFrame(loop) : null;
  }
  function ensureLoop() {
    if (rafRef.current == null) rafRef.current = requestAnimationFrame(loop);
  }

  function drawStatic() {
    const canvas = canvasRef.current;
    const h1 = h1Ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !h1 || !ctx) return;
    const { fontSize, lineHeight } = fontOf(ctx, h1);
    const { w, h } = metricsRef.current;
    ctx.filter = "none";
    ctx.clearRect(0, 0, w, h);
    ctx.textBaseline = "alphabetic";
    const lead = lensRef.current.headlineLead;
    const lines = wrap(ctx, lead + lensRef.current.headlineAccent, w);
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const y = fontSize * 0.82 + i * lineHeight;
      const pStart = Math.max(0, lead.length - line.start);
      const leadText = line.text.slice(0, pStart);
      const phraseText = line.text.slice(pStart);
      ctx.fillStyle = LEAD_COLOR;
      if (leadText) ctx.fillText(leadText, 0, y);
      ctx.fillStyle = lensRef.current.accent;
      if (phraseText) {
        const xOff = leadText ? ctx.measureText(leadText).width : 0;
        ctx.fillText(phraseText, xOff, y);
      }
    }
  }

  function settleInstant(now: number) {
    glyphsRef.current = spawnIn(now, 0).map((g) => {
      g.mode = "idle";
      return g;
    });
    renderFrame(now);
  }

  function resize() {
    const canvas = canvasRef.current;
    const h1 = h1Ref.current;
    if (!canvas || !h1) return;
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    const w = h1.clientWidth;
    const h = h1.clientHeight;
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;
    const ctx = canvas.getContext("2d");
    if (ctx) ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    metricsRef.current = { w, h, dpr };

    // Do not paint a settled title while the loader owns the screen. That
    // frame would be visible first, then the real entrance would replay after
    // the stage changes to text.
    if (stageRef.current === "loading" || !startedRef.current) {
      ctx?.clearRect(0, 0, w, h);
      return;
    }

    if (reduceRef.current) {
      drawStatic();
      return;
    }

    // A font swap or responsive breakpoint can fire ResizeObserver during the
    // entrance. Update the existing glyph positions only. Creating a fresh
    // glyph array here can make unmatched glyphs look like a second entrance.
    const animating = glyphsRef.current.some((g) => g.mode !== "idle");
    if (animating) {
      const fresh = new Map(buildGlyphs().map((g) => [g.ci, g]));
      for (const g of glyphsRef.current) {
        const next = fresh.get(g.ci);
        if (next) {
          g.x = next.x;
          g.y = next.y;
          g.fs = next.fs;
          g.color = next.color;
        }
      }
      nowRef.current = performance.now();
      renderFrame(nowRef.current);
      ensureLoop();
    } else {
      settleInstant(nowRef.current);
    }
  }

  function begin() {
    if (!readyRef.current) return;
    if (metricsRef.current.w <= 0 || metricsRef.current.h <= 0) {
      window.requestAnimationFrame(begin);
      return;
    }
    if (startedRef.current) {
      // A failed first paint must not permanently block the entrance.
      if (glyphsRef.current.length === 0) startedRef.current = false;
      else {
        ensureLoop();
        return;
      }
    }
    startedRef.current = true;
    const now = performance.now();
    nowRef.current = now;
    if (reduceRef.current) {
      glyphsRef.current = [];
      drawStatic();
      return;
    }
    glyphsRef.current = spawnIn(now, 0);
    renderFrame(now);
    ensureLoop();
  }

  function applyLens(animate: boolean) {
    const now = performance.now();
    nowRef.current = now;
    if (reduceRef.current || !animate) {
      settleInstant(now);
      return;
    }
    // Letters lift away (staggered) and fully clear, then — after a beat —
    // the new phrase rises in, so the exit and the entry never overlap.
    const old = glyphsRef.current;
    let maxCi = 0;
    for (const g of old) {
      if (g.mode === "out") continue;
      g.mode = "out";
      g.t0 = now + g.ci * PER_CHAR_OUT;
      g.dur = OUT_DUR;
      maxCi = Math.max(maxCi, g.ci);
    }
    const outSpan = maxCi * PER_CHAR_OUT + OUT_DUR;
    const incoming = spawnIn(now, outSpan + EXIT_HOLD);
    glyphsRef.current = [...old, ...incoming];
    ensureLoop();
  }

  /* ---- lifecycle ----------------------------------------------------- */

  useEffect(() => {
    reduceRef.current = reduce;
    if (!readyRef.current) return;
    if (stageRef.current === "loading") {
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext("2d");
      if (canvas && ctx) ctx.clearRect(0, 0, canvas.width, canvas.height);
      return;
    }
    if (reduce) drawStatic();
    else applyLens(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduce]);

  useEffect(() => {
    const h1 = h1Ref.current;
    if (!h1) return;
    const ro = new ResizeObserver(() => resize());
    ro.observe(h1);

    let cancelled = false;
    const start = () => {
      if (cancelled) return;
      readyRef.current = true;
      resize();
      if (stageRef.current === "loading") {
        // Wait for the loader to release the text stage before painting.
        return;
      } else {
        begin();
      }
    };
    if (document.fonts && document.fonts.status !== "loaded") {
      document.fonts.ready.then(start);
    } else {
      start();
    }
    return () => {
      cancelled = true;
      startedRef.current = false;
      ro.disconnect();
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    };
    // Engine helpers are ref-based and stable; run once on mount.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    stageRef.current = stage;
    if (stage === "text") begin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stage]);

  const firstLens = useRef(true);
  useEffect(() => {
    lensRef.current = lens;
    if (firstLens.current) {
      firstLens.current = false;
      return;
    }
    if (readyRef.current) applyLens(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lens]);

  return (
    <h1
      ref={h1Ref}
      aria-label={`${lens.headlineLead}${lens.headlineAccent}`}
      className="home-display relative grid w-full text-[clamp(40px,4.45vw,64px)] font-bold leading-[1.02] tracking-[-1.28px] text-[#f3f1ff]"
    >
      {/* Height reservation — every variant, invisible, in one grid cell. */}
      {LENS_ORDER.map((id) => (
        <span key={id} aria-hidden className="invisible" style={{ gridArea: "1 / 1" }}>
          {LENSES[id].headlineLead}
          <span>{LENSES[id].headlineAccent}</span>
        </span>
      ))}
      <canvas
        ref={canvasRef}
        aria-hidden
        className="pointer-events-none absolute left-0 top-0"
      />
    </h1>
  );
}
