# 001 — Add Lenis + GSAP ScrollTrigger smooth scrolling

- **Status**: DONE
- **Commit**: 014b630
- **Severity**: LOW
- **Category**: Missed opportunities (additive scroller layer only)
- **Estimated scope**: 6 files, small (new client provider + helper; layout/Barba/Nav/CSS glue)

## Problem

Wheel/trackpad scrolling is native-instant (plus CSS `scroll-behavior: smooth` on hash/programmatic jumps). Existing page animations (hero wave, manifesto `TextGenerateEffect`, carousel ribbon, island perception switch, Barba clip-path mask, word-stagger, process cards, `layoutId` project cards) already exist and must stay. They sit on a jittery native scroller, so scroll-linked *feel* is slightly harsher than the rest of the site.

There is **no licensed ScrollSmoother**. Evidence:

```json
/* package.json:11-24 — current */
"dependencies": {
  "@barba/core": "^2.10.3",
  "@gsap/react": "^2.1.2",
  "framer-motion": "^13.1.1",
  "gsap": "^3.15.0",
  ...
}
```

`node_modules/gsap` has **no** `ScrollSmoother` file. `gsap` is the Standard (no-charge) license. Do not import `gsap/ScrollSmoother`. No `lenis` / `@studio-freight/lenis` / `@gsap/shockingly` yet.

Native CSS smooth-scroll is already present and is **not** the requested layer:

```css
/* src/app/globals.css:31-33 — current */
html {
  scroll-behavior: smooth;
}
```

```css
/* src/app/globals.css:99-109 — current reduced-motion */
@media (prefers-reduced-motion: reduce) {
  ...
  html {
    scroll-behavior: auto;
  }
}
```

GSAP is installed but unused in `src/` (no `from "gsap"` / `ScrollTrigger` yet). Layout is a Server Component wrapping client providers:

```tsx
/* src/app/layout.tsx:37-45 — current */
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${bricolage.variable} ${sora.variable} antialiased`}>
      <body className="bg-white text-zinc-900">
        <PerceptionProvider>
          <BarbaProvider>{children}</BarbaProvider>
        </PerceptionProvider>
      </body>
    </html>
  );
}
```

Barba **always** resets scroll to top on route change (hash `/#contact` is already lost — do not make this worse):

```tsx
/* src/components/BarbaProvider.tsx:104-109 — current */
router.push(href);
window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
document.documentElement.scrollTop = 0;
document.body.scrollTop = 0;
```

Same instant reset on `pathname` effect (`BarbaProvider.tsx:206-211`) and in `PerceptionContext.tsx:87,103,109`.

Same-page Contact uses native `scrollIntoView`:

```ts
/* src/components/Nav.tsx:17-19 — current */
function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}
```

Island nav is `position: fixed` (`IslandNav.tsx:286`). Manifesto uses `IntersectionObserver` on the viewport (`text-generate-effect.tsx:24-33`). Hero uses `min-h-[100dvh]` (`HeroStage.tsx:80`). **Must use window-root Lenis**, not a transform/overflow wrapper (that would break fixed island, IO root, and dvh).

`node_modules/next/dist/docs/` is missing in this install; App Router still allows a Server `layout.tsx` to import a Client Component. Do not convert the whole layout to `'use client'`.

## Target

Honest stack: **`lenis` (npm `lenis`) + GSAP ticker + `ScrollTrigger.update`**. Duration from GSAP skill Lenis recipe: `duration: 1.2`, `smoothWheel: true`. No Club plugin. No CSS `scroll-behavior: smooth` as the implementation (keep it only as reduced-motion fallback / Lenis-off).

- Root Lenis (`<ReactLenis root>`) so `window` remains the scroller.
- `autoRaf: false`; drive `lenis.raf(time * 1000)` from `gsap.ticker`; `gsap.ticker.lagSmoothing(0)`; `lenis.on('scroll', ScrollTrigger.update)`.
- `prefers-reduced-motion`: do not construct Lenis; render `{children}` only; native scroll; `scroll-behavior: auto` already in CSS.
- Touch: **do not** enable Lenis touch smoothing (`syncTouch` / `smoothTouch` off / default false) so iOS rubber-banding stays native.
- After Barba/pathname/perception `window.scrollTo(0, { behavior: "instant" })`, also `lenis.scrollTo(0, { immediate: true })` so Lenis does not lerp back to the previous offset.
- After pathname change: `ScrollTrigger.refresh()` (no-op until ST instances exist; cheap insurance).
- Contact in-page: if Lenis exists, `lenis.scrollTo(el)` instead of `scrollIntoView({ behavior: "smooth" })` so CSS smooth + Lenis do not double-ease.
- New wrappers: no extra `transform`/`opacity` animation on page content. ReactLenis `root` is a provider, not a pin/smoother content transform.
- Do not restyle, retune, replace, or wrap hero wave / TextGenerateEffect / carousel / island CSS / Barba clip-path / word-stagger / process cards / layoutId cards.

When Lenis is active, CSS must not also smooth:

```css
/* target — only while html has .lenis */
html.lenis {
  scroll-behavior: auto;
}
```

Import `lenis/dist/lenis.css` from the SmoothScroll client module (Lenis ships this).

## Repo conventions to follow

- Client leaves: `'use client'` at the top of provider files (`src/components/BarbaProvider.tsx:1`, `src/context/PerceptionContext.tsx:1`).
- Root layout stays a Server Component and only *imports* client providers (`src/app/layout.tsx`).
- Reduced motion via Framer `useReducedMotion()` like Barba (`BarbaProvider.tsx:22`).
- Instant route scroll already uses `behavior: "instant"` — keep those calls; add Lenis sync beside them, do not change Barba clip-path durations (`BARBA_DUR = 0.9`, `BARBA_EASE = cubic-bezier(0.32, 0.72, 0, 1)`).
- Motion tokens already in `globals.css` (`--ease-out: cubic-bezier(0.23, 1, 0.32, 1)`). **Do not invent new easing tokens** for the scroller; Lenis `duration: 1.2` is the only new timing number.
- Shared helpers live in `src/lib/` (exemplar: `src/lib/utils.ts`).

## Steps

1. `npm install lenis` only. Do **not** install `@gsap/shockingly` or copy ScrollSmoother. `gsap` and `@gsap/react` are already in package.json.

2. Create `src/lib/lenis.ts`:

```ts
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
```

3. Create `src/components/SmoothScroll.tsx` as a `'use client'` leaf:

```tsx
"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { useReducedMotion } from "framer-motion";
import { ReactLenis, type LenisRef } from "lenis/react";
import "lenis/dist/lenis.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { setLenisInstance, syncLenisToTop } from "@/lib/lenis";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion();
  const pathname = usePathname();
  const lenisRef = useRef<LenisRef>(null);

  useEffect(() => {
    if (reduce) {
      setLenisInstance(null);
      return;
    }
    const lenis = lenisRef.current?.lenis;
    if (!lenis) return;
    setLenisInstance(lenis);
    const onScroll = () => ScrollTrigger.update();
    lenis.on("scroll", onScroll);
    const onTick = (time: number) => {
      lenisRef.current?.lenis?.raf(time * 1000);
    };
    gsap.ticker.add(onTick);
    gsap.ticker.lagSmoothing(0);
    return () => {
      lenis.off("scroll", onScroll);
      gsap.ticker.remove(onTick);
      setLenisInstance(null);
    };
  }, [reduce]);

  useEffect(() => {
    syncLenisToTop();
    const id = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => cancelAnimationFrame(id);
  }, [pathname]);

  if (reduce) return <>{children}</>;

  return (
    <ReactLenis
      root
      ref={lenisRef}
      options={{
        autoRaf: false,
        duration: 1.2,
        smoothWheel: true,
      }}
    >
      {children}
    </ReactLenis>
  );
}
```

If `lenis/react` exports differ after install (named `ReactLenis` vs default), match the installed package — do not invent a custom overflow wrapper.

4. `src/app/layout.tsx` — import SmoothScroll (client) into the existing Server layout. Nest **inside** `PerceptionProvider` so IslandNav stays a sibling of the scroller provider (fixed positioning unchanged). Wrap `BarbaProvider`:

```tsx
<PerceptionProvider>
  <SmoothScroll>
    <BarbaProvider>{children}</BarbaProvider>
  </SmoothScroll>
</PerceptionProvider>
```

Do **not** add `'use client'` to `layout.tsx`. Do **not** wrap `html`/`body` in extra transform divs.

5. `src/app/globals.css` — add after the existing `html { scroll-behavior: smooth; }` block:

```css
html.lenis,
html.lenis-smooth {
  scroll-behavior: auto;
}
```

Do not remove the reduced-motion `scroll-behavior: auto` rule.

6. `src/components/BarbaProvider.tsx` — after each existing instant `window.scrollTo({ top: 0 ...})` (currently ~107, ~188, ~209), call `syncLenisToTop()` from `@/lib/lenis`. Do not change clip-path, durations, or click interception. Do **not** add hash scrolling for `/#contact` (Barba already forces top; leave that behavior).

7. `src/context/PerceptionContext.tsx` — after the three instant `window.scrollTo` calls in `handleSelect`, call `syncLenisToTop()`. Do not change perception switch / ThemeWave.

8. `src/components/Nav.tsx` — **only** change `scrollToId` to `lenisScrollToId` import. Do not touch glass/nav markup (another agent may be editing Nav).

## Boundaries

- Do NOT touch HeroStage, ThemeWave, ManifestoSection, text-generate-effect, ProjectsCarousel, IslandNav (except via layout sibling), Barba clip-path / overlay markup, word-stagger, process cards, ProjectCaseStudy `layoutId`, PRODUCT.md, SEO/copy.
- Do NOT restyle, retune, or wrap those animations in GSAP/Framer.
- Do NOT add ScrollSmoother, pirate Club files, or CSS-only `scroll-behavior` as the feature.
- Do NOT invent `--ease-*` tokens.
- Do NOT convert `layout.tsx` to a client component.
- Do NOT use a `#smooth-wrapper` / `#smooth-content` transform scroller.
- If `lenis/react` API drift vs this stamp, adapt imports only; stop if smooth scroll would require rewriting Barba transitions.

## Verification

- **Mechanical**: `npm run lint` (eslint). Typecheck if cheap (`npx tsc --noEmit` if configured). Expected: no new errors in SmoothScroll / layout / Barba / Nav.
- **Feel check**:
  - Home at `/`: wheel/trackpad should interpolate (~1.2s settle), not native 1:1; hero wave, manifesto generate, carousel ribbon unchanged.
  - `/about` and `/projects`: same scroller; Barba mask still covers, then page starts at top (no leftover Lenis lerp from previous page).
  - Island stays `fixed` at the bottom while content scrolls (not scrolling away with a transform wrapper).
  - Home Contact in-page: one smooth glide, not double-smooth.
  - DevTools Rendering → `prefers-reduced-motion: reduce`: native scroll, instant; no Lenis class driving lerp.
  - Do not expect `/#contact` from another route to land on Contact (Barba `scrollTo(0)` is settled).
- **Done when**: Lenis is the only new motion layer; existing animation code paths unmodified except the four glue call sites above; reduced motion disables Lenis; IslandNav still fixed.
