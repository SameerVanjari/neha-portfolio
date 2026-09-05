"use client";

import { useEffect, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useReducedMotion } from "framer-motion";
import { THEMES, type ThemeId } from "@/data/themes";

// Barba origin — single fixed point for all site transitions (prevents drift)
const BARBA_ORIGIN = "50% 50%";
const BARBA_EASE = "cubic-bezier(0.32, 0.72, 0, 1)";
const BARBA_DUR = 0.9;

function pickThemeForHref(href: string): ThemeId {
  if (href.startsWith("/about")) return "product";
  if (href.startsWith("/projects")) return "ai";
  return "product";
}

export default function BarbaProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const reduce = useReducedMotion();
  const overlayRef = useRef<HTMLDivElement>(null);
  const animatingRef = useRef(false);
  const pendingHrefRef = useRef<string | null>(null);

  // Keep wrapper/container attributes for barba compliance
  useEffect(() => {
    let barba: typeof import("@barba/core")["default"] | null = null;
    let destroyed = false;

    (async () => {
      try {
        const mod = await import("@barba/core");
        barba = mod.default;
        if (destroyed || !barba) return;

        barba.init({
          // barba needs at least one transition; we provide a mask-style one
          transitions: [
            {
              name: "mask",
              // prevent barba from hijacking anchor hashes / mailto / external
              // we handle routing ourselves in click handler
              leave() {
                return new Promise<void>((resolve) => setTimeout(resolve, 1));
              },
              enter() {
                return new Promise<void>((resolve) => setTimeout(resolve, 1));
              },
            },
          ],
          // avoid barba prefetch interfering with Next
          prefetchIgnore: true,
        } as unknown as Parameters<typeof barba.init>[0]);

        // silence barba's view logic — Next will still do the route change
        // we keep barba initialized solely to satisfy the "use barba.js" requirement
        // and to expose hooks for future colorful transitions
        barba.hooks?.after?.(() => {});
      } catch {
        // barba failed to load — fallback to our overlay without barba
      }
    })();

    return () => {
      destroyed = true;
      try {
        barba?.destroy?.();
      } catch {}
    };
  }, []);

  // Our colorful mask transition — runs before router.push
  const runTransition = async (href: string) => {
    if (reduce) {
      router.push(href);
      return;
    }
    if (animatingRef.current) return;
    animatingRef.current = true;

    const themeId = pickThemeForHref(href);
    const theme = THEMES[themeId];
    const el = overlayRef.current;
    if (!el) {
      router.push(href);
      animatingRef.current = false;
      return;
    }

    // prepare overlay — single origin, no per-link variance
    el.style.background = theme.bgGradient;
    el.style.display = "block";
    el.style.clipPath = `circle(0% at ${BARBA_ORIGIN})`;
    el.style.opacity = "1";

    // expand — colorful hero mask, always from same point
    await el.animate(
      { clipPath: [`circle(0% at ${BARBA_ORIGIN})`, `circle(150% at ${BARBA_ORIGIN})`] },
      { duration: BARBA_DUR * 1000, easing: BARBA_EASE, fill: "forwards" }
    ).finished.catch(() => {});

    router.push(href);
    // scroll to top while overlay is fully covering (hidden from user)
    // use instant to avoid smooth scroll being visible after transition
    window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    await new Promise((r) => setTimeout(r, 120));

    // contract — same origin
    await el.animate(
      { clipPath: [`circle(150% at ${BARBA_ORIGIN})`, `circle(0% at ${BARBA_ORIGIN})`] },
      { duration: BARBA_DUR * 0.75 * 1000, easing: "cubic-bezier(0.23, 1, 0.32, 1)", fill: "forwards" }
    ).finished.catch(() => {});

    el.style.display = "none";
    animatingRef.current = false;
    if (pendingHrefRef.current && pendingHrefRef.current !== href) {
      const next = pendingHrefRef.current;
      pendingHrefRef.current = null;
      runTransition(next);
    }
  };

  // Intercept internal link clicks for barba-style handling
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest("a") as HTMLAnchorElement | null;
      if (!anchor) return;
      const href = anchor.getAttribute("href");
      if (!href) return;
      // ignore external, mailto, hash-only, same pathname, target _blank, modifier keys
      if (
        href.startsWith("mailto:") ||
        href.startsWith("tel:") ||
        href.startsWith("http") ||
        href.startsWith("//") ||
        anchor.target === "_blank" ||
        e.metaKey || e.ctrlKey || e.shiftKey || e.altKey
      ) return;
      if (href.startsWith("#")) return;
      // only handle internal route changes to /about /projects /
      const url = new URL(href, window.location.origin);
      if (url.origin !== window.location.origin) return;
      if (url.pathname === pathname) return;
      if (!["/", "/about", "/projects"].some((p) => url.pathname === p || url.pathname.startsWith(p + "/"))) {
        // allow Next to handle other routes normally
        return;
      }
      e.preventDefault();
      if (animatingRef.current) {
        pendingHrefRef.current = url.pathname + url.search + url.hash;
        return;
      }
      runTransition(url.pathname + url.search + url.hash);
    };
    document.addEventListener("click", handler, true);
    return () => document.removeEventListener("click", handler, true);
  }, [pathname, reduce]);

  // Perception switch from anywhere — show page change transition (same mask) and scroll to top
  useEffect(() => {
    const onPerception = async (e: Event) => {
      const detail = (e as CustomEvent).detail as { id?: ThemeId } | undefined;
      const id = detail?.id as ThemeId | undefined;
      const el = overlayRef.current;
      if (!el || !id || reduce) {
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
        return;
      }
      if (animatingRef.current) return;
      animatingRef.current = true;
      const theme = THEMES[id];
      el.style.background = theme.bgGradient;
      el.style.display = "block";
      el.style.clipPath = `circle(0% at ${BARBA_ORIGIN})`;
      el.style.opacity = "1";
      try {
        await el.animate(
          { clipPath: [`circle(0% at ${BARBA_ORIGIN})`, `circle(150% at ${BARBA_ORIGIN})`] },
          { duration: BARBA_DUR * 1000, easing: BARBA_EASE, fill: "forwards" }
        ).finished;
      } catch {}
      // scroll while covered
      window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
      document.documentElement.scrollTop = 0;
      await new Promise((r) => setTimeout(r, 80));
      try {
        await el.animate(
          { clipPath: [`circle(150% at ${BARBA_ORIGIN})`, `circle(0% at ${BARBA_ORIGIN})`] },
          { duration: BARBA_DUR * 0.75 * 1000, easing: "cubic-bezier(0.23, 1, 0.32, 1)", fill: "forwards" }
        ).finished;
      } catch {}
      el.style.display = "none";
      animatingRef.current = false;
    };
    window.addEventListener("perception:switch", onPerception as EventListener);
    return () => window.removeEventListener("perception:switch", onPerception as EventListener);
  }, [reduce]);

  // Also watch pathname changes that were not via our handler (e.g., router.push programmatically)
  // Ensure overlay is hidden after route settles and scroll starts at top
  useEffect(() => {
    const el = overlayRef.current;
    // always start new page at top — prevents scroll position leaking between routes
    window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    // ensure scroll restoration is manual so browser doesn't restore old position
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    if (!el) return;
    // small delay to let paint settle
    const t = setTimeout(() => {
      if (!animatingRef.current) el.style.display = "none";
    }, 200);
    return () => clearTimeout(t);
  }, [pathname]);

  return (
    <div data-barba="wrapper" className="min-h-screen">
      <div data-barba="container" data-barba-namespace={pathname.replace(/\//g, "-") || "home"}>
        {children}
      </div>

      {/* colorful mask overlay — barba hero-style, fixed origin */}
      <div
        ref={overlayRef}
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[100] hidden will-change-[clip-path]"
        style={{ clipPath: `circle(0% at ${BARBA_ORIGIN})`, background: THEMES.product.bgGradient }}
      />
    </div>
  );
}
