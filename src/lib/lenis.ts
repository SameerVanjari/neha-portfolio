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

export function lenisScrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  if (instance) instance.scrollTo(el, { offset: 0 });
  else el.scrollIntoView({ behavior: "smooth", block: "start" });
}
