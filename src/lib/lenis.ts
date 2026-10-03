import type Lenis from "lenis";

let instance: Lenis | null = null;

export function setLenisInstance(lenis: Lenis | null) {
  instance = lenis;
}

export function getLenis() {
  return instance;
}

/** Keep in lockstep with window.scrollTo(..., { behavior: "instant" }). */
export function syncLenisToTop() {
  instance?.scrollTo(0, { immediate: true, force: true });
}

/** Matches the Lenis `anchors.offset` so JS-driven and anchor-driven scrolls
    land identically. */
export const ANCHOR_OFFSET = -24;

export function lenisScrollToId(id: string, offset = ANCHOR_OFFSET) {
  const el = document.getElementById(id);
  if (!el) return;
  if (instance) {
    instance.scrollTo(el, { offset, duration: 1.1 });
    return;
  }
  el.scrollIntoView({ behavior: "smooth", block: "start" });
}
