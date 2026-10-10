"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { usePathname } from "next/navigation";
import { getLenis } from "@/lib/lenis";
import { useMotionPref } from "@/components/motion/reveal";

/**
 * Site-wide image lightbox for project case pages.
 *
 * Mounted once from `app/projects/layout.tsx`. It uses a single capture-phase
 * click listener (event delegation) instead of wrapping every image in a
 * component, so it works across all the different case templates without
 * touching them — and costs one listener for the whole page.
 *
 * Only active on `/projects/<id>` detail routes. Clicking any content image
 * opens a gallery of every content image in that page's `<main>`, with prev /
 * next, a thumbnail rail, and zoom (buttons, wheel, double-click). Closed with
 * Escape, the close button, or a click on the translucent backdrop.
 */

type Slide = { src: string; alt: string };

/** Ignore images narrower than this — icons, logos, avatars, thumbnails. */
const MIN_IMAGE_WIDTH = 180;
const MIN_SCALE = 1;
const MAX_SCALE = 4;
const ZOOM_STEP = 1.5;

const BTN =
  "inline-flex h-9 min-w-9 items-center justify-center gap-1 rounded-full border border-white/15 bg-white/10 px-2.5 text-[12px] font-medium text-white/90 backdrop-blur transition-colors hover:bg-white/20 disabled:cursor-not-allowed disabled:opacity-40 motion-safe:active:scale-95";
const NAV_BTN =
  "absolute top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white/90 backdrop-blur transition-colors hover:bg-white/20 md:h-12 md:w-12";

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function isExcludedSrc(src: string) {
  if (!src) return true;
  if (/\.svg(\?|#|$)/i.test(src)) return true;
  if (src.includes("placeholder")) return true;
  return false;
}

/** The page's content root — the case templates always render inside `<main>`. */
function contentRoot(from: Element | null): Element {
  return from?.closest("main") ?? document.querySelector("main") ?? document.body;
}

/**
 * Every image in the project worth showing: images inside a link or button are
 * skipped (they navigate), as are SVG/placeholder files and anything marked
 * `data-no-lightbox`. Rendered width separates content images from icons.
 */
function collectEligibleImages(root: Element): HTMLImageElement[] {
  return Array.from(root.querySelectorAll<HTMLImageElement>("img")).filter((img) => {
    if (img.hasAttribute("data-no-lightbox")) return false;
    if (img.closest("a, button, nav, header, footer")) return false;
    if (isExcludedSrc(img.currentSrc || img.src)) return false;
    const rect = img.getBoundingClientRect();
    return rect.width >= MIN_IMAGE_WIDTH;
  });
}

export default function ProjectLightbox() {
  const pathname = usePathname();
  const enabled = pathname?.startsWith("/projects/") ?? false;
  const reduce = useMotionPref();

  const [slides, setSlides] = useState<Slide[]>([]);
  const [index, setIndex] = useState(-1);
  const open = index >= 0 && slides.length > 0;

  const [scale, setScale] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);

  const scaleRef = useRef(1);
  const dragRef = useRef<{ px: number; py: number; ox: number; oy: number } | null>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  /**
   * Single place that changes zoom. Reads the live scale from a ref so it can
   * stay a stable callback (safe for the native wheel listener), resets the
   * pan when fully zoomed out, and keeps the pan inside the image otherwise.
   */
  const applyScale = useCallback((factor: number, absolute = false) => {
    const next = clamp(absolute ? factor : scaleRef.current * factor, MIN_SCALE, MAX_SCALE);
    scaleRef.current = next;
    setScale(next);

    if (next <= MIN_SCALE) {
      setOffset({ x: 0, y: 0 });
      return;
    }
    const frame = frameRef.current;
    const maxX = frame ? ((next - 1) * frame.clientWidth) / 2 : Number.POSITIVE_INFINITY;
    const maxY = frame ? ((next - 1) * frame.clientHeight) / 2 : Number.POSITIVE_INFINITY;
    setOffset((o) => ({ x: clamp(o.x, -maxX, maxX), y: clamp(o.y, -maxY, maxY) }));
  }, []);

  const resetZoom = useCallback(() => applyScale(MIN_SCALE, true), [applyScale]);
  const zoomIn = useCallback(() => applyScale(ZOOM_STEP), [applyScale]);
  const zoomOut = useCallback(() => applyScale(1 / ZOOM_STEP), [applyScale]);
  const close = useCallback(() => setIndex(-1), []);

  /** Show a slide and drop any zoom the previous one carried. */
  const goTo = useCallback(
    (i: number) => {
      setIndex(i);
      applyScale(MIN_SCALE, true);
    },
    [applyScale]
  );
  const next = useCallback(() => {
    if (slides.length) goTo((index + 1) % slides.length);
  }, [goTo, index, slides.length]);
  const prev = useCallback(() => {
    if (slides.length) goTo((index - 1 + slides.length) % slides.length);
  }, [goTo, index, slides.length]);

  /* --- Delegate clicks on content images to the viewer --- */
  useEffect(() => {
    if (!enabled) return;

    const onClick = (e: MouseEvent) => {
      const target = e.target;
      if (!(target instanceof Element)) return;
      // Clicks inside the open viewer are handled by React, not here.
      if (target.closest("[data-lightbox-root]")) return;
      const img = target.closest("img") as HTMLImageElement | null;
      if (!img) return;

      const els = collectEligibleImages(contentRoot(img));
      const at = els.indexOf(img);
      if (at < 0) return;

      scaleRef.current = MIN_SCALE;
      setScale(MIN_SCALE);
      setOffset({ x: 0, y: 0 });
      setSlides(els.map((el) => ({ src: el.currentSrc || el.src, alt: el.alt })));
      setIndex(at);
    };

    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [enabled]);

  /* Hint that content images are clickable. Runs per route, cheap and DOM-only. */
  useEffect(() => {
    if (!enabled) return;
    const id = window.setTimeout(() => {
      collectEligibleImages(document.querySelector("main") ?? document.body).forEach((img) => {
        img.style.cursor = "zoom-in";
      });
    }, 400);
    return () => window.clearTimeout(id);
  }, [enabled, pathname]);

  /* --- Open / close side-effects: freeze scroll and Lenis --- */
  useEffect(() => {
    if (!open) return;
    const lenis = getLenis();
    lenis?.stop();
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      lenis?.start();
      document.body.style.overflow = prev;
    };
  }, [open]);

  useEffect(() => {
    if (open) closeRef.current?.focus();
  }, [open]);

  /* Wheel zoom (native listener so preventDefault works). */
  useEffect(() => {
    if (!open) return;
    const frame = frameRef.current;
    if (!frame) return;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      applyScale(e.deltaY < 0 ? 1.15 : 1 / 1.15);
    };
    frame.addEventListener("wheel", onWheel, { passive: false });
    return () => frame.removeEventListener("wheel", onWheel);
  }, [open, applyScale]);

  /* Keyboard: escape / arrows / zoom / reset. */
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      switch (e.key) {
        case "Escape":
          e.preventDefault();
          close();
          break;
        case "ArrowRight":
        case "ArrowDown":
          e.preventDefault();
          next();
          break;
        case "ArrowLeft":
        case "ArrowUp":
          e.preventDefault();
          prev();
          break;
        case "+":
        case "=":
          e.preventDefault();
          zoomIn();
          break;
        case "-":
        case "_":
          e.preventDefault();
          zoomOut();
          break;
        case "0":
          e.preventDefault();
          resetZoom();
          break;
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, close, next, prev, zoomIn, zoomOut, resetZoom]);

  /* Minimal focus trap while the dialog is open. */
  const onDialogKeyDown = (e: React.KeyboardEvent) => {
    if (e.key !== "Tab") return;
    const root = dialogRef.current;
    if (!root) return;
    const focusables = Array.from(
      root.querySelectorAll<HTMLElement>('button:not([disabled]), [href], [tabindex]:not([tabindex="-1"])')
    );
    if (focusables.length < 2) return;
    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    const active = document.activeElement;
    if (e.shiftKey && active === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && active === last) {
      e.preventDefault();
      first.focus();
    }
  };

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (scale <= MIN_SCALE) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    dragRef.current = { px: e.clientX, py: e.clientY, ox: offset.x, oy: offset.y };
    setDragging(true);
  };
  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const d = dragRef.current;
    if (!d) return;
    const frame = frameRef.current;
    const maxX = frame ? ((scale - 1) * frame.clientWidth) / 2 : Number.POSITIVE_INFINITY;
    const maxY = frame ? ((scale - 1) * frame.clientHeight) / 2 : Number.POSITIVE_INFINITY;
    setOffset({
      x: clamp(d.ox + (e.clientX - d.px), -maxX, maxX),
      y: clamp(d.oy + (e.clientY - d.py), -maxY, maxY),
    });
  };
  const endDrag = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragRef.current) return;
    dragRef.current = null;
    setDragging(false);
    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
  };
  const onDoubleClick = () => applyScale(scale > MIN_SCALE ? MIN_SCALE : 2.2, true);

  const active = open ? slides[index] : null;
  const transition = reduce || dragging ? "none" : "transform 200ms cubic-bezier(0.23, 1, 0.32, 1)";

  const counter = useMemo(
    () => `${String(index + 1).padStart(2, "0")} / ${String(slides.length).padStart(2, "0")}`,
    [index, slides.length]
  );

  if (typeof document === "undefined") return null;

  return createPortal(
    open && active ? (
      <div
        ref={dialogRef}
        data-lightbox-root
        role="dialog"
        aria-modal="true"
        aria-label="Image viewer"
        className="fixed inset-0 z-[200]"
        onKeyDown={onDialogKeyDown}
      >
        {/* Translucent backdrop — clicking it closes the viewer. */}
        <div
          aria-hidden
          onClick={close}
          className="lightbox-backdrop absolute inset-0"
          style={{
            background: "rgba(10, 10, 12, 0.88)",
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
          }}
        />

        {/* Top bar: counter + zoom controls + close */}
        <div className="absolute inset-x-0 top-0 z-20 flex items-center justify-between gap-3 p-4 md:p-6">
          <span
            className="rounded-full border border-white/10 px-3 py-1 font-mono text-[11px] tracking-[0.14em] text-white/80"
            style={{ background: "rgba(255,255,255,0.06)" }}
          >
            {counter}
          </span>
          <div className="flex items-center gap-1.5">
            <button type="button" onClick={zoomOut} disabled={scale <= MIN_SCALE} aria-label="Zoom out" className={BTN}>
              <svg width="15" height="15" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
                <path d="M3 8h10" strokeLinecap="round" />
              </svg>
            </button>
            <button type="button" onClick={resetZoom} aria-label="Reset zoom" className={`${BTN} tabular-nums`}>
              {Math.round(scale * 100)}%
            </button>
            <button type="button" onClick={zoomIn} disabled={scale >= MAX_SCALE} aria-label="Zoom in" className={BTN}>
              <svg width="15" height="15" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
                <path d="M8 3v10M3 8h10" strokeLinecap="round" />
              </svg>
            </button>
            <button ref={closeRef} type="button" onClick={close} aria-label="Close viewer" className={BTN}>
              <svg width="15" height="15" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
                <path d="M4 4l8 8M12 4l-8 8" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        </div>

        {/* Prev / next */}
        {slides.length > 1 ? (
          <>
            <button type="button" onClick={prev} aria-label="Previous image" className={`${NAV_BTN} left-2 md:left-6`}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
                <path d="M15 5l-7 7 7 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button type="button" onClick={next} aria-label="Next image" className={`${NAV_BTN} right-2 md:right-6`}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
                <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </>
        ) : null}

        {/* Stage — pointer-events-none so empty space falls through to the backdrop */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center p-4 pb-28 pt-20 md:p-16 md:pb-32">
          <div
            ref={frameRef}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={endDrag}
            onPointerCancel={endDrag}
            onDoubleClick={onDoubleClick}
            className="lightbox-stage pointer-events-auto relative flex items-center justify-center"
            style={{
              cursor: scale > MIN_SCALE ? (dragging ? "grabbing" : "grab") : "default",
              touchAction: scale > MIN_SCALE ? "none" : "auto",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              key={active.src}
              src={active.src}
              alt={active.alt}
              draggable={false}
              className="max-h-[72vh] max-w-[92vw] select-none rounded-[6px] object-contain shadow-[0_24px_70px_rgba(0,0,0,0.55)] md:max-h-[80vh]"
              style={{
                transform: `translate3d(${offset.x}px, ${offset.y}px, 0) scale(${scale})`,
                transition,
              }}
            />
          </div>
        </div>

        {/* Thumbnail rail — every image in the project, one click away */}
        {slides.length > 1 ? (
          <div className="absolute inset-x-0 bottom-0 z-20 px-3 pb-4 md:px-6 md:pb-6">
            <div
              className="mx-auto flex max-w-[1000px] gap-2 overflow-x-auto pb-1"
              style={{ scrollbarWidth: "thin" }}
            >
              {slides.map((s, i) => (
                <button
                  key={`${s.src}-${i}`}
                  type="button"
                  onClick={() => goTo(i)}
                  aria-label={`View image ${i + 1}`}
                  aria-current={i === index}
                  className="shrink-0 overflow-hidden rounded-[6px] border transition-[opacity,border-color]"
                  style={{
                    borderColor: i === index ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.18)",
                    opacity: i === index ? 1 : 0.5,
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={s.src}
                    alt=""
                    loading="lazy"
                    draggable={false}
                    className="h-12 w-16 object-cover md:h-14 md:w-20"
                  />
                </button>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    ) : null,
    document.body
  );
}
