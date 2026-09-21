"use client";

import { useEffect, useRef, useState } from "react";
import type { BioAnnotation } from "@/data/bio-annotations";

/**
 * BioLens — hover pop-ups on phrases in the About-page bio.
 *
 * Motion rules (emil-design-eng / animate):
 * - Gate: tens-per-day hover → near-imperceptible. 180ms open, 140ms close.
 * - Purpose: state indication. Curve: strong ease-out, ease-out on both ends.
 * - Transform + opacity only; origin at the anchor (bottom center).
 * - Interruptible by design: open/close run on cancelable timers, so sweeping
 *   the pointer across capsules never flickers, and crossing into the tooltip
 *   itself keeps it alive (retargeting, not restart).
 * - Reduced motion: opacity-only, no position/scale change.
 */
export type LensPopup = Pick<BioAnnotation, "title" | "rows" | "items" | "note"> & {
  link?: { href: string; label: string };
};

const OPEN_DELAY = 80;
const CLOSE_DELAY = 90;

export function BioLens({
  children,
  popup,
}: {
  children: React.ReactNode;
  popup: LensPopup;
}) {
  const [open, setOpen] = useState(false);
  const openTimer = useRef<number | null>(null);
  const closeTimer = useRef<number | null>(null);
  const wrapRef = useRef<HTMLSpanElement>(null);

  const clearTimers = () => {
    if (openTimer.current !== null) {
      window.clearTimeout(openTimer.current);
      openTimer.current = null;
    }
    if (closeTimer.current !== null) {
      window.clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };

  const requestOpen = () => {
    if (closeTimer.current !== null) {
      window.clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
    if (open || openTimer.current !== null) return;
    openTimer.current = window.setTimeout(() => {
      openTimer.current = null;
      setOpen(true);
    }, OPEN_DELAY);
  };

  const requestClose = () => {
    if (openTimer.current !== null) {
      window.clearTimeout(openTimer.current);
      openTimer.current = null;
    }
    if (!open || closeTimer.current !== null) return;
    closeTimer.current = window.setTimeout(() => {
      closeTimer.current = null;
      setOpen(false);
    }, CLOSE_DELAY);
  };

  // Close when clicking/tapping anywhere outside (tap-to-toggle on touch).
  useEffect(() => {
    if (!open) return;
    const onDocPointer = (e: PointerEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        clearTimers();
        setOpen(false);
      }
    };
    document.addEventListener("pointerdown", onDocPointer);
    return () => document.removeEventListener("pointerdown", onDocPointer);
     
  }, [open]);

  useEffect(() => clearTimers, []);

  return (
    <span ref={wrapRef} className="relative inline">
      <button
        type="button"
        aria-expanded={open}
        onMouseEnter={requestOpen}
        onMouseLeave={requestClose}
        onFocus={requestOpen}
        onBlur={requestClose}
        onClick={() => {
          clearTimers();
          setOpen((v) => !v);
        }}
        className="bio-lens relative cursor-help whitespace-normal text-left align-baseline"
      >
        {children}
      </button>

      <span
        role="tooltip"
        onMouseEnter={requestOpen}
        onMouseLeave={requestClose}
        className={`bio-lens-pop-anchor absolute bottom-full left-1/2 z-30 mb-2 w-[300px] max-w-[calc(100vw-48px)] -translate-x-1/2 ${
          open ? "pointer-events-auto" : "pointer-events-none"
        }`}
        style={{
          visibility: open ? "visible" : "hidden",
          transition: `visibility 0s linear ${open ? "0s" : "140ms"}`,
        }}
        aria-hidden={!open}
      >
      <span
        className={`block rounded-[12px] border bg-white p-4 text-left shadow-[0_16px_48px_rgba(22,22,30,0.14)] ${open ? "bio-lens-pop is-open" : "bio-lens-pop"}`}
        style={{ borderColor: "rgba(22,22,30,0.10)" }}
      >
        <span className="block font-display text-[13px] font-semibold tracking-[-0.01em] text-zinc-900" style={{ fontFamily: "var(--font-display)" }}>
          {popup.title}
        </span>
        {popup.rows?.length ? (
          <span className="mt-2.5 block space-y-1.5">
            {popup.rows.map((r) => (
              <span key={r.label} className="grid grid-cols-[92px_1fr] gap-2">
                <span className="font-mono text-[9.5px] leading-[1.5] tracking-[0.1em] text-zinc-400">{r.label}</span>
                <span className="text-[11.5px] leading-[1.55] text-zinc-600">{r.value}</span>
              </span>
            ))}
          </span>
        ) : null}
        {popup.items?.length ? (
          <span className="mt-2.5 block space-y-1">
            {popup.items.map((it) => (
              <span key={it} className="flex items-start gap-1.5">
                <span className="mt-[5px] h-1 w-1 shrink-0 rounded-full bg-zinc-800" aria-hidden />
                <span className="text-[11.5px] leading-[1.55] text-zinc-600">{it}</span>
              </span>
            ))}
          </span>
        ) : null}
        {popup.note ? (
          <span className="mt-2.5 block border-l-2 pl-2.5 text-[11px] leading-[1.55] text-zinc-500" style={{ borderColor: "rgba(53,51,158,0.4)" }}>
            {popup.note}
          </span>
        ) : null}
        {popup.link ? (
          <>
            <span className="mt-3 block h-px w-full bg-black/5" aria-hidden />
            <a
              href={popup.link.href}
              className="mt-2.5 inline-block font-mono text-[10px] tracking-[0.1em] transition-colors hover:opacity-70"
              style={{ color: "#35339E" }}
            >
              {popup.link.label}
            </a>
          </>
        ) : null}
      </span>
      </span>
    </span>
  );
}

/** Splits the bio into annotated + plain segments (first occurrence of each phrase), rendered as one paragraph. */
export function AnnotatedBio({
  bio,
  annotations,
  popupFor,
}: {
  bio: string;
  annotations: BioAnnotation[];
  popupFor: (a: BioAnnotation) => LensPopup;
}) {
  const parts: React.ReactNode[] = [];
  let cursor = 0;

  const hits = annotations
    .map((a) => ({ a, idx: bio.indexOf(a.phrase) }))
    .filter((h) => h.idx !== -1)
    .sort((x, y) => x.idx - y.idx);

  hits.forEach(({ a, idx }, i) => {
    if (idx < cursor) return;
    if (idx > cursor) parts.push(<span key={`t${i}`}>{bio.slice(cursor, idx)}</span>);
    parts.push(
      <BioLens key={a.phrase} popup={popupFor(a)}>
        <span className="bio-lens-phrase">{a.phrase}</span>
      </BioLens>
    );
    cursor = idx + a.phrase.length;
  });
  if (cursor < bio.length) parts.push(<span key="rest">{bio.slice(cursor)}</span>);

  return <>{parts}</>;
}
