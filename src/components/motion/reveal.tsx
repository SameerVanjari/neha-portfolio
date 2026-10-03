"use client";

import { useCallback, useEffect, useRef, useState, useSyncExternalStore, type CSSProperties, type ReactNode } from "react";
import { motion, useInView, type Easing, type Variants } from "framer-motion";

/**
 * The site's entrance dialect. Every section reveal on the site is built from
 * these four primitives so the motion can't drift from page to page:
 *
 *   Reveal     — one block rises into place (transform + opacity only)
 *   TextRow    — same, but a <span>, so it stays valid inside <p> / <h1>
 *   LineByLine — plain copy split at its real line breaks; each line is its own
 *                element and they arrive one after another
 *   LineReveal — for copy that can't be split (inline links, hover pop-ups):
 *                a clip window that uncovers one row at a time, in reading
 *                order, stepping on the measured row boundaries
 *   useStagger — a group that rises once, then hands off to its children in turn
 *
 * Two rules the whole site obeys:
 *   1. Full `transform` strings, not framer's `x` / `y` shorthands — the
 *      shorthands animate on the main thread and drop frames under load.
 *   2. Entrance is 500ms strong ease-out. Reduced motion keeps the opacity
 *      fade (it aids comprehension) and drops all movement.
 */

export const EASE_OUT: [number, number, number, number] = [0.23, 1, 0.32, 1];

/**
 * Reduced-motion preference, hydrate-safe.
 *
 * Framer's own `useReducedMotion` reads the media query during the first
 * client render, but the server can't know it — so a reduced-motion user
 * hydrates against HTML that was rendered with motion enabled. React logs the
 * mismatch and "won't patch it up", which leaves framer's variant state
 * holding the server's inline styles: in practice some groups then never
 * animate to visible, and content stays invisible for exactly the users who
 * asked for less motion.
 *
 * `useSyncExternalStore` is the tool for this: the server snapshot is `false`
 * (matching the SSR HTML), the client snapshot takes over after hydration,
 * and a mid-session OS preference change is picked up live. Every consumer
 * of the preference should use this hook, not framer's.
 */
const REDUCE_QUERY = "(prefers-reduced-motion: reduce)";

function subscribeReduce(onChange: () => void) {
  const mq = window.matchMedia(REDUCE_QUERY);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

function getReduceSnapshot() {
  return window.matchMedia(REDUCE_QUERY).matches;
}

function getReduceServerSnapshot(): boolean {
  return false;
}

export function useMotionPref(): boolean {
  return useSyncExternalStore(subscribeReduce, getReduceSnapshot, getReduceServerSnapshot);
}

/** One shared trigger: fire once, a little before the element is fully in view. */
export const REVEAL_VIEWPORT = { once: true, margin: "-80px" } as const;

export function Reveal({
  children,
  delay = 0,
  className,
  style,
  distance = 24,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  style?: CSSProperties;
  distance?: number;
}) {
  return (
    <motion.div
      className={className}
      style={style}
      initial={{ opacity: 0, transform: `translateY(${distance}px)` }}
      whileInView={{ opacity: 1, transform: "translateY(0px)" }}
      viewport={REVEAL_VIEWPORT}
      transition={{ duration: 0.5, delay, ease: EASE_OUT }}
    >
      {children}
    </motion.div>
  );
}

/**
 * A single visual row of text rising from below its own position. A <span>,
 * not a <div> — a div inside phrasing content breaks hydration.
 */
export function TextRow({
  children,
  delay = 0,
  distance = 18,
}: {
  children: ReactNode;
  delay?: number;
  distance?: number;
}) {
  return (
    <motion.span
      className="block"
      initial={{ opacity: 0, transform: `translateY(${distance}px)` }}
      whileInView={{ opacity: 1, transform: "translateY(0px)" }}
      viewport={REVEAL_VIEWPORT}
      transition={{ duration: 0.5, delay, ease: EASE_OUT }}
    >
      {children}
    </motion.span>
  );
}

/**
 * Plain copy revealed one line at a time.
 *
 * The lines are real elements, each with its own fade-and-rise, staggered in
 * order. A clip window can't do this: however finely it is stepped, a
 * partially-revealed line still reads as part of one continuous wipe, and the
 * eye integrates the whole thing into a single event. Here every line arrives
 * as a whole unit, so the sequence is unmistakable.
 *
 * The breaks are measured, not hard-coded, because the number of lines changes
 * with the viewport (three at desktop, five or six on a phone). An offscreen
 * copy of the same text at the same width is measured for the real break
 * offsets, and a ResizeObserver re-measures on width change. Copy carrying
 * inline elements can't be split this way — use LineReveal for that.
 */
export function LineByLine({
  text,
  delay = 0,
  step = 0.11,
  duration = 0.5,
  distance = 14,
  blur = 0,
  paused = false,
  className,
  style,
}: {
  text: string;
  delay?: number;
  step?: number;
  duration?: number;
  distance?: number;
  /** Entering lines also defocus from this blur radius to sharp. */
  blur?: number;
  /** Holds every line at its hidden state until explicitly released — used by
      copy that must wait for the preloader rather than its own viewport entry. */
  paused?: boolean;
  className?: string;
  style?: CSSProperties;
}) {
  // Starts as one unsplit block so the space is reserved from the first paint;
  // the measured version replaces it before anything becomes visible.
  const [lines, setLines] = useState<string[]>([text]);
  const measureRef = useRef<HTMLSpanElement | null>(null);
  const reduce = useMotionPref();
  const blurPx = reduce || !blur ? 0 : blur;

  const measure = useCallback(() => {
    const host = measureRef.current;
    const node = host?.firstChild;
    if (!host || !node || node.nodeType !== Node.TEXT_NODE) return;

    const data = (node as Text).data;
    const range = document.createRange();
    const breaks: number[] = [];
    let prevTop: number | null = null;

    for (let i = 0; i < data.length; i++) {
      range.setStart(node, i);
      range.setEnd(node, i + 1);
      const rects = range.getClientRects();
      const rect = rects[rects.length - 1];
      if (!rect) continue;
      const top = Math.round(rect.top);
      if (prevTop !== null && top > prevTop) breaks.push(i);
      prevTop = top;
    }

    const next: string[] = [];
    let from = 0;
    for (const at of breaks) {
      next.push(data.slice(from, at));
      from = at;
    }
    next.push(data.slice(from));

    setLines((prev) =>
      prev.length === next.length && prev.every((l, i) => l === next[i]) ? prev : next
    );
  }, []);

  useEffect(() => {
    const host = measureRef.current;
    if (!host || typeof ResizeObserver === "undefined") {
      const id = requestAnimationFrame(measure);
      return () => cancelAnimationFrame(id);
    }
    // ResizeObserver fires once on observe, which covers the initial measure.
    const ro = new ResizeObserver(() => measure());
    ro.observe(host);
    return () => ro.disconnect();
  }, [measure]);

  return (
    <span className={`relative block${className ? ` ${className}` : ""}`} style={style}>
      {/* Measures the unsplit text at the same width; never read aloud, never painted. */}
      <span
        ref={measureRef}
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 opacity-0"
      >
        {text}
      </span>
      {lines.map((line, i) => (
        <motion.span
          key={`${i}:${line}`}
          className="block"
          initial={{
            opacity: 0,
            transform: `translateY(${distance}px)`,
            filter: blurPx ? `blur(${blurPx}px)` : undefined,
          }}
          whileInView={
            paused
              ? undefined
              : {
                  opacity: 1,
                  transform: "translateY(0px)",
                  filter: blurPx ? "blur(0px)" : undefined,
                }
          }
          viewport={REVEAL_VIEWPORT}
          transition={{ duration, delay: delay + i * step, ease: EASE_OUT }}
        >
          {line}
        </motion.span>
      ))}
    </span>
  );
}

/**
 * Multi-line copy that can't be split into line elements — it carries inline
 * links or hover pop-ups. A clip window uncovers one row at a time, top to
 * bottom in reading order, stepping on the measured row boundaries.
 *
 * The clip is dropped once the sweep finishes. That matters wherever the copy
 * contains hover pop-ups (the About bio): they're absolutely positioned inside
 * the text, so a permanent clip — or a permanent overflow:hidden — would cut
 * them off. Pointer events stay off during the sweep so a blind hover can't
 * open a card that's still masked.
 */
export function LineReveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const reduce = useMotionPref();
  const [settled, setSettled] = useState(false);
  const [rows, setRows] = useState(1);
  const outerRef = useRef<HTMLSpanElement | null>(null);
  const inView = useInView(outerRef, { once: true, margin: "-80px" });

  // Both paths must lay out identically, or the copy jumps on the frame the
  // clip is dropped. The span stays block-level in either case.
  const cls = className ? `block ${className}` : "block";

  // Count the real visual rows, so the reveal can step once per row instead of
  // wiping. Measured in a ref callback rather than an effect: this is layout
  // measurement, and the value only shapes the keyframe track, so updating it
  // after commit is harmless.
  //
  // A Range over the subtree returns the block's own box as well as one rect
  // per line box, so a 3-row paragraph measures as 4 and the steps land off the
  // text. Keep only rects the height of a line, using the inner block's own
  // line-height (the wrapper inherits a different one).
  const measure = useCallback((el: HTMLSpanElement | null) => {
    outerRef.current = el;
    if (!el) return;
    const inner = el.firstElementChild as HTMLElement | null;
    if (!inner) return;
    const cs = getComputedStyle(inner);
    const lineHeight = parseFloat(cs.lineHeight) || parseFloat(cs.fontSize) * 1.2;
    const range = document.createRange();
    range.selectNodeContents(el);
    const tops = new Set<number>();
    for (const r of Array.from(range.getClientRects())) {
      if (r.height > 4 && r.height <= lineHeight * 1.6) tops.add(Math.round(r.top));
    }
    if (tops.size) setRows(tops.size);
  }, []);

  if (reduce) return <TextRow delay={delay}>{children}</TextRow>;
  if (settled) return <span className={cls}>{children}</span>;

  const { keyframes, times, ease, duration } = rowSteps(rows);

  return (
    <motion.span
      ref={measure}
      className={cls}
      /* The hidden start state lives in `style`, not `initial`: it has to be in
         the server HTML so the copy is never briefly visible before hydration,
         while `animate` carries the complete keyframe track. Splitting the
         start between `initial` and the array makes framer mis-pair the
         `times` array and the clip plays out of order. */
      style={{ clipPath: keyframes[0], pointerEvents: "none" }}
      animate={inView ? { clipPath: keyframes } : undefined}
      transition={{ duration, delay, times, ease }}
      onAnimationComplete={() => setSettled(true)}
    >
      {children}
    </motion.span>
  );
}

/**
 * Clip track that uncovers one row at a time, top to bottom.
 *
 * A single inset sweep reads as a wipe, not as rows arriving: the house easing
 * is a strong ease-OUT, so most of the travel happens in the first third of the
 * duration and the opening row snaps into place while the rest trails after.
 * Here each row boundary is a keyframe followed by a short hold, so a row
 * finishes landing before the next one starts.
 *
 * The boundary percentages move oppositely to the inset they clip: after step
 * i the top i rows are uncovered, so the hidden remainder — the row inset
 * measured from that edge — is (100 / rows) * (rows - i). Writing
 * (100 / rows) * i instead reverses the track: the first step uncovers nearly
 * the whole paragraph at once, later steps re-mask it, and the eye reads the
 * whole thing as one event.
 */
function rowSteps(n: number) {
  const rows = Math.max(1, Math.round(n));
  if (rows === 1) {
    return {
      keyframes: ["inset(0% 0% 100% 0%)", "inset(0% 0% 0% 0%)"],
      times: [0, 1],
      ease: [EASE_OUT] as Easing[],
      duration: 0.5,
    };
  }

  // Share of the total spent resting on a row boundary.
  const hold = Math.min(0.1, 0.3 / rows);
  const move = (1 - (rows - 1) * hold) / rows;

  const keyframes: string[] = ["inset(0% 0% 100% 0%)"];
  const times: number[] = [0];
  const ease: Easing[] = [];

  for (let i = 1; i <= rows; i++) {
    // The last boundary is the finished state: fully visible, i.e. no inset.
    // (100 / rows) * rows would be 100% — the hidden start.
    const hide = i === rows ? 0 : (100 / rows) * (rows - i);
    keyframes.push(`inset(0% 0% ${hide}% 0%)`);
    times.push(times[times.length - 1] + move);
    ease.push(EASE_OUT);
    if (i < rows) {
      // Duplicate the value: the extra segment is the rest between rows.
      keyframes.push(keyframes[keyframes.length - 1]);
      times.push(times[times.length - 1] + hold);
      ease.push("linear");
    }
  }

  return {
    keyframes,
    times,
    ease,
    duration: Math.min(0.95, 0.42 + rows * 0.1),
  };
}

/**
 * Group orchestration: the container rises once, then its `motion` children
 * follow in turn. Used wherever a list or grid enters together, so the items
 * land in reading order instead of all at once.
 *
 * Children should only carry `variants={item}` — no `initial`/`animate` of
 * their own, or they'd stop inheriting the group's state.
 */
export function useStagger({
  axis = "y",
  distance = 18,
  step = 0.06,
  hold = 0.08,
}: { axis?: "x" | "y"; distance?: number; step?: number; hold?: number } = {}) {
  const shift = axis === "x" ? "translateX" : "translateY";

  /* Constant variant definitions — reduced motion is handled globally by
     MotionConfig (`reducedMotion="user"`), which disables transform animations
     and jumps values to their targets. Branching here would swap the variants
     object one render after hydration, and framer's controller can leave a
     group that's already in view frozen partway through its entrance. */
  const group: Variants = {
    hidden: { opacity: 0, transform: `translateY(${distance}px)` },
    visible: {
      opacity: 1,
      transform: "translateY(0px)",
      transition: { duration: 0.5, ease: EASE_OUT, delayChildren: hold, staggerChildren: step },
    },
  };

  const item: Variants = {
    hidden: { opacity: 0, transform: `${shift}(${distance}px)` },
    visible: {
      opacity: 1,
      transform: `${shift}(0px)`,
      transition: { duration: 0.45, ease: EASE_OUT },
    },
  };

  return { group, item, viewport: REVEAL_VIEWPORT };
}
