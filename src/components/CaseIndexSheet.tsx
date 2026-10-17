"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { EASE_OUT, useMotionPref } from "@/components/motion/reveal";
import { getLenis } from "@/lib/lenis";

/**
 * Mobile index for project case pages.
 *
 * On wide screens every case page already carries its own index — the ruler
 * pinned to an edge, or the sidebar "on this page" list. Below that breakpoint
 * there is nowhere for it to live, so the section index is folded into a sheet:
 * a floating button with an index glyph opens a bottom sheet (a centred dialog
 * on tablets and up) listing every section, the current one marked. Choosing a
 * section scrolls to it through Lenis, the same scroller every other link uses.
 *
 * The desktop indexes pass their already-discovered sections straight in, so
 * the sheet can never drift from what the page actually renders.
 */

export type CaseIndexEntry = {
  label: string;
  /** Anchor id, when the section carries one. */
  id?: string;
  /** Direct element reference, for indexes that discover headings without ids. */
  el?: HTMLElement;
};

const OFFSET = 96;

function targetOf(entry: CaseIndexEntry): HTMLElement | null {
  if (entry.el && entry.el.isConnected) return entry.el;
  if (entry.id) return document.getElementById(entry.id);
  return null;
}

/** Index glyph — a list with leading marks, the universal "contents" mark. */
function IndexGlyph({ className = "" }: { className?: string }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      aria-hidden
      className={className}
    >
      <path d="M8.5 6.5h12M8.5 12h12M8.5 17.5h12" />
      <circle cx="3.6" cy="6.5" r="1.05" fill="currentColor" stroke="none" />
      <circle cx="3.6" cy="12" r="1.05" fill="currentColor" stroke="none" />
      <circle cx="3.6" cy="17.5" r="1.05" fill="currentColor" stroke="none" />
    </svg>
  );
}

export default function CaseIndexSheet({
  items,
  accent = "#35339E",
  buttonClassName = "",
}: {
  items: readonly CaseIndexEntry[];
  accent?: string;
  /** Responsive visibility for the floating button (e.g. "xl:hidden"). */
  buttonClassName?: string;
}) {
  const reduce = useMotionPref();
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);

  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const entries = items.filter((i) => i.label);

  /* Keep the current section marked while the sheet is closed, so it opens
     already pointing at the right row. */
  const key = entries.map((e) => e.id ?? e.label).join("|");
  useEffect(() => {
    const list = entries.filter((e) => targetOf(e));
    if (!list.length) return;

    const visible = new Set<Element>();
    const io = new IntersectionObserver(
      (records) => {
        for (const r of records) {
          if (r.isIntersecting) visible.add(r.target);
          else visible.delete(r.target);
        }
        for (let i = 0; i < list.length; i++) {
          const el = targetOf(list[i]);
          if (el && visible.has(el)) {
            setActive(i);
            return;
          }
        }
      },
      { rootMargin: "-25% 0px -60% 0px", threshold: 0 }
    );
    for (const e of list) {
      const el = targetOf(e);
      if (el) io.observe(el);
    }
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  /* Freeze the page (and Lenis) behind the sheet. */
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
    if (!open) return;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const goTo = useCallback((entry: CaseIndexEntry) => {
    const el = targetOf(entry);
    setOpen(false);
    if (!el) return;
    if (reduce) {
      window.scrollTo(0, Math.max(0, window.scrollY + el.getBoundingClientRect().top - OFFSET));
      return;
    }
    const lenis = getLenis();
    if (lenis) {
      // The sheet held the scroller; release it before asking it to move, and
      // force the scroll so a stopped instance still obeys.
      lenis.start();
      lenis.scrollTo(el, { offset: -OFFSET, duration: 1.1, force: true });
      return;
    }
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [reduce]);

  /* Minimal focus trap while the sheet is open. */
  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key !== "Tab") return;
    const root = panelRef.current;
    if (!root) return;
    const focusables = Array.from(
      root.querySelectorAll<HTMLElement>('button:not([disabled]), [href], [tabindex]:not([tabindex="-1"])')
    );
    if (focusables.length < 2) return;
    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    const el = document.activeElement;
    if (e.shiftKey && el === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && el === last) {
      e.preventDefault();
      first.focus();
    }
  };

  if (!entries.length) return null;

  const panelTransition = reduce
    ? { duration: 0.2 }
    : { duration: 0.42, ease: EASE_OUT };

  return (
    <>
      <motion.button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open project index"
        aria-haspopup="dialog"
        aria-expanded={open}
        initial={reduce ? { opacity: 0 } : { opacity: 0, transform: "translateY(10px)" }}
        animate={{ opacity: 1, transform: "translateY(0px)" }}
        transition={{ duration: 0.4, delay: 0.2, ease: EASE_OUT }}
        whileTap={{ scale: 0.94 }}
        className={`group fixed right-4 z-40 inline-flex h-[54px] w-[54px] items-center justify-center rounded-full border bg-[#FBF9F5] text-[#17161B] shadow-[0_10px_30px_rgba(20,20,30,0.18)] transition-colors hover:bg-white motion-safe:active:scale-95 ${buttonClassName}`}
        style={{
          bottom: "calc(1.25rem + env(safe-area-inset-bottom))",
          borderColor: "rgba(22,22,30,0.12)",
        }}
      >
        <IndexGlyph />
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-full opacity-0 transition-opacity group-hover:opacity-100"
          style={{ boxShadow: `0 0 0 3px ${accent}22` }}
        />
      </motion.button>

      {typeof document !== "undefined"
        ? createPortal(
            <AnimatePresence>
              {open ? (
                <motion.div
                  key="case-index"
                  className="fixed inset-0 z-[160]"
                  onKeyDown={onKeyDown}
                >
                  <motion.div
                    aria-hidden
                    onClick={() => setOpen(false)}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: reduce ? 0.15 : 0.24 }}
                    className="absolute inset-0 bg-[#0B0B10]/45 backdrop-blur-[3px]"
                  />

                  <div className="pointer-events-none absolute inset-0 flex items-end justify-center sm:items-center">
                    <motion.div
                      ref={panelRef}
                      role="dialog"
                      aria-modal="true"
                      aria-label="Project index"
                      initial={reduce ? { opacity: 0 } : { opacity: 0, transform: "translateY(48px)" }}
                      animate={{ opacity: 1, transform: "translateY(0px)" }}
                      exit={reduce ? { opacity: 0 } : { opacity: 0, transform: "translateY(48px)" }}
                      transition={panelTransition}
                      className="pointer-events-auto flex max-h-[84svh] w-full flex-col overflow-hidden rounded-t-[26px] border bg-[#FBF9F5] shadow-[0_-20px_60px_rgba(20,20,30,0.22)] sm:max-h-[76svh] sm:w-[440px] sm:rounded-[26px] sm:shadow-[0_30px_80px_rgba(20,20,30,0.28)]"
                      style={{ borderColor: "rgba(22,22,30,0.10)" }}
                    >
                      {/* Grab handle — the sheet is dismissible by the backdrop,
                          so this is a cue, not a control. */}
                      <div className="flex justify-center pt-3 sm:hidden" aria-hidden>
                        <span className="h-1 w-10 rounded-full bg-[rgba(22,22,30,0.16)]" />
                      </div>

                      <div className="flex items-center justify-between gap-4 px-5 pb-4 pt-4 sm:px-6 sm:pt-6">
                        <div className="flex items-center gap-3">
                          <span
                            className="h-px w-7"
                            style={{ background: "rgba(22,22,30,0.28)" }}
                          />
                          <span
                            className="text-[11px] font-medium uppercase tracking-[0.22em] text-[#5C5750]"
                            style={{ fontFamily: "var(--font-body)" }}
                          >
                            Index
                          </span>
                        </div>
                        <button
                          ref={closeRef}
                          type="button"
                          onClick={() => setOpen(false)}
                          aria-label="Close index"
                          className="inline-flex h-9 w-9 items-center justify-center rounded-full border text-[#17161B] transition-colors hover:bg-[rgba(22,22,30,0.05)]"
                          style={{ borderColor: "rgba(22,22,30,0.12)" }}
                        >
                          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" aria-hidden>
                            <path d="M4 4l8 8M12 4l-8 8" />
                          </svg>
                        </button>
                      </div>

                      <div className="h-px w-full" style={{ background: "rgba(22,22,30,0.08)" }} />

                      <nav
                        aria-label="Sections"
                        className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-2 py-2 sm:px-3"
                        style={{ scrollbarWidth: "thin" }}
                      >
                        <ol className="flex flex-col">
                          {entries.map((entry, i) => {
                            const isActive = active === i;
                            return (
                              <li key={entry.id ?? `${i}-${entry.label}`}>
                                <button
                                  type="button"
                                  onClick={() => goTo(entry)}
                                  aria-current={isActive ? "true" : undefined}
                                  className="group flex w-full items-center gap-4 rounded-[12px] px-3 py-[14px] text-left transition-colors hover:bg-[rgba(22,22,30,0.04)]"
                                >
                                  <span
                                    className="w-6 shrink-0 text-[11px] tabular-nums tracking-[0.1em] transition-colors"
                                    style={{
                                      fontFamily: "var(--font-body)",
                                      color: isActive ? accent : "rgba(22,22,30,0.34)",
                                    }}
                                  >
                                    {String(i + 1).padStart(2, "0")}
                                  </span>
                                  <span
                                    className="flex-1 text-[17px] font-medium leading-[1.25] tracking-[-0.01em] transition-colors"
                                    style={{
                                      fontFamily: "var(--font-display)",
                                      color: isActive ? "#17161B" : "#4A4640",
                                    }}
                                  >
                                    {entry.label}
                                  </span>
                                  <span
                                    aria-hidden
                                    className="h-[6px] w-[6px] shrink-0 rounded-full transition-colors"
                                    style={{
                                      background: isActive ? accent : "rgba(22,22,30,0.16)",
                                    }}
                                  />
                                </button>
                              </li>
                            );
                          })}
                        </ol>
                      </nav>

                      <div
                        className="flex items-center justify-between px-5 py-3 text-[10px] uppercase tracking-[0.18em] text-[#8A857C] sm:px-6"
                        style={{
                          fontFamily: "var(--font-body)",
                          borderTop: "1px solid rgba(22,22,30,0.08)",
                          paddingBottom: "calc(0.75rem + env(safe-area-inset-bottom))",
                        }}
                      >
                        <span>{entries.length} sections</span>
                        <span>Tap to jump</span>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>,
            document.body
          )
        : null}
    </>
  );
}
