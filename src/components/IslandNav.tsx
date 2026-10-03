"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import type { Theme, ThemeId } from "@/data/themes";
import { useMotionPref } from "@/components/motion/reveal";

/*
 * The perception island. It lives in the hero at the "Explore by lens" spot
 * and stays there — no sticky docking. Icons carry the lenses; the words
 * live in a hover tooltip.
 *
 * Motion rules this component follows:
 *
 *   - Entrance is a strong ease-out on transform and opacity only.
 *   - Reduced motion keeps the opacity crossfade and drops the movement.
 *   - Press is acknowledged with a small scale, and only on hover-capable
 *     pointers does the tile lift and the tooltip appear.
 */

const ITEMS: { id: ThemeId; label: string; color: string }[] = [
  { id: "xr", label: "XR", color: "#FF2BD6" },
  { id: "ux", label: "UX", color: "#FFC94D" },
  { id: "ai", label: "AI", color: "#8B5CF6" },
  { id: "product", label: "Product", color: "#06B6D4" },
];

/* ---------------------------------- metrics --------------------------------
   One source of truth for the pill's arithmetic, so the collapsed and
   expanded states are exact at every viewport instead of two hardcoded
   widths that only line up by luck. */
const ITEM = 44; // icon tile, also the tap target
const GAP = 4; // space between tiles
const PAD = 5; // pill inset
const BORDER = 1; // pill border
const ROW_STEP = ITEM + GAP;

const CONTENT_COLLAPSED = ITEM;
const CONTENT_EXPANDED = ITEMS.length * ITEM + (ITEMS.length - 1) * GAP;
const PILL_COLLAPSED = CONTENT_COLLAPSED + (PAD + BORDER) * 2;
const PILL_EXPANDED = CONTENT_EXPANDED + (PAD + BORDER) * 2;

const EASE_OUT = "cubic-bezier(0.23, 1, 0.32, 1)";
const EASE_DRAWER = "cubic-bezier(0.32, 0.72, 0, 1)";

/** True on pointers that can genuinely hover, so a tap can't strand a tooltip. */
function useHoverCapable() {
  const [canHover, setCanHover] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const sync = () => setCanHover(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);
  return canHover;
}

function VRIcon({ active, color }: { active?: boolean; color: string }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M3.5 10.5 C3.5 7 6 6 12 6 C18 6 20.5 7 20.5 10.5 L20.5 14.5 C20.5 16.5 19 18 12 18 C5 18 3.5 16.5 3.5 14.5 Z" stroke={active ? color : "currentColor"} strokeWidth="2" strokeLinejoin="round" />
      <rect x="6.5" y="10" width="5" height="4.5" rx="1.6" stroke={active ? color : "currentColor"} strokeWidth="1.85" />
      <rect x="12.5" y="10" width="5" height="4.5" rx="1.6" stroke={active ? color : "currentColor"} strokeWidth="1.85" />
      <path d="M7 6.5 C9 4.5 15 4.5 17 6.5" stroke={active ? color : "currentColor"} strokeWidth="1.85" strokeLinecap="round" />
      <path d="M12 11.5 L12 13.5" stroke={active ? color : "currentColor"} strokeWidth="1.6" strokeLinecap="round" opacity={0.6} />
    </svg>
  );
}

function UXIcon({ active, color }: { active?: boolean; color: string }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M4.5 18.5 L13.5 6.5 L19.5 9.5 L10.5 21.5 Z" stroke={active ? color : "currentColor"} strokeWidth="2" strokeLinejoin="round" />
      <path d="M13.8 3.2 L20.2 5.2 L14.2 14.8 L10.2 16.2 L11.2 12.2 Z" stroke={active ? color : "currentColor"} strokeWidth="1.9" strokeLinejoin="round" />
      <path d="M12.5 5.5 L18.5 7.2" stroke={active ? color : "currentColor"} strokeWidth="1.5" opacity={0.6} />
      <path d="M7 16 L8.2 14.2 M9 13.5 L10.2 11.7 M11 11 L12.2 9.2" stroke={active ? color : "currentColor"} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function RobotIcon({ active, color }: { active?: boolean; color: string }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="5" y="7" width="14" height="11" rx="3" stroke={active ? color : "currentColor"} strokeWidth="2.05" />
      <circle cx="9.2" cy="12.2" r="1.45" fill={active ? color : "currentColor"} />
      <circle cx="14.8" cy="12.2" r="1.45" fill={active ? color : "currentColor"} />
      <path d="M9.5 15.2 H14.5" stroke={active ? color : "currentColor"} strokeWidth="1.7" strokeLinecap="round" opacity={0.9} />
      <path d="M12 7 L12 4.5" stroke={active ? color : "currentColor"} strokeWidth="1.9" strokeLinecap="round" />
      <circle cx="12" cy="3.6" r="1.3" stroke={active ? color : "currentColor"} strokeWidth="1.9" />
      <path d="M5 10.2 L3.4 9.2 L3.4 14.8 L5 13.8 M19 10.2 L20.6 9.2 L20.6 14.8 L19 13.8" stroke={active ? color : "currentColor"} strokeWidth="1.8" strokeLinejoin="round" />
    </svg>
  );
}

function ProductIcon({ active, color }: { active?: boolean; color: string }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M12 3.5 L19.5 7.8 L12 12 L4.5 7.8 Z" stroke={active ? color : "currentColor"} strokeWidth="2" strokeLinejoin="round" />
      <path d="M4.5 7.8 L4.5 16.2 L12 20.5 L19.5 16.2 L19.5 7.8" stroke={active ? color : "currentColor"} strokeWidth="2" strokeLinejoin="round" />
      <path d="M12 12 L12 20.5 M19.5 7.8 L12 12 L4.5 7.8" stroke={active ? color : "currentColor"} strokeWidth="1.8" strokeLinejoin="round" opacity={0.7} />
      <path d="M8 10.2 L8 14 M12 12.8 L12 17 M16 10.2 L16 14" stroke={active ? color : "currentColor"} strokeWidth="1.4" strokeLinecap="round" opacity={0.55} />
    </svg>
  );
}

const ICON_MAP: Record<ThemeId, typeof VRIcon> = {
  xr: VRIcon,
  ux: UXIcon,
  ai: RobotIcon,
  product: ProductIcon,
};

const CLAY_ASSET: Record<ThemeId, { src: string; srcSet: string; fallback: string }> = {
  xr: { src: "/clay/xr-256.webp", srcSet: "/clay/xr-256.webp 256w, /clay/xr-512.webp 512w", fallback: "/clay/xr.png" },
  ux: { src: "/clay/ux-256.webp", srcSet: "/clay/ux-256.webp 256w, /clay/ux-512.webp 512w", fallback: "/clay/ux.png" },
  ai: { src: "/clay/ai-256.webp", srcSet: "/clay/ai-256.webp 256w, /clay/ai-512.webp 512w", fallback: "/clay/ai.png" },
  product: { src: "/clay/product-256.webp", srcSet: "/clay/product-256.webp 256w, /clay/product-512.webp 512w", fallback: "/clay/product.png" },
};

export default function IslandNav({
  activeId,
  onSelect,
  theme,
  shown,
}: {
  activeId: ThemeId;
  onSelect: (id: ThemeId) => void;
  theme: Theme;
  /** True once the preloader has released — the island only docks into view
      from the moment it appears, never before. */
  shown?: boolean;
}) {
  const reduce = useMotionPref();
  const canHover = useHoverCapable();
  const [failed, setFailed] = useState<Set<ThemeId>>(() => new Set());
  const [loaded, setLoaded] = useState<Set<ThemeId>>(() => new Set());
  const [expanded, setExpanded] = useState(true);
  const [hovered, setHovered] = useState<ThemeId | null>(null);
  const containerRef = useRef<HTMLElement | null>(null);

  const activeIndex = Math.max(0, ITEMS.findIndex((i) => i.id === activeId));

  // Preload the clay figures that take over the icon on activation — the swap
  // only happens once a figure is ready, never as a pop-in.
  useEffect(() => {
    (Object.keys(CLAY_ASSET) as ThemeId[]).forEach((id) => {
      const { src, srcSet } = CLAY_ASSET[id];
      const img = new Image();
      img.decoding = "async";
      if (srcSet) img.srcset = srcSet;
      img.sizes = "72px";
      img.src = src;
      img.decode?.().then(() => setLoaded((p) => new Set(p).add(id))).catch(() => setLoaded((p) => new Set(p).add(id)));
      const fb = new Image();
      fb.onerror = () => setFailed((p) => new Set(p).add(id));
    });
  }, []);

  // The island stays where it is placed — no docking, so no
  // outside-click or Escape handling is needed.

  const rowShift = expanded ? 0 : activeIndex * ROW_STEP;
  const width = expanded ? PILL_EXPANDED : PILL_COLLAPSED;
  const clipWidth = expanded ? CONTENT_EXPANDED : CONTENT_COLLAPSED;

  /* On-screen x of tile `index`, measured from the pill's left edge. Expanded,
     every tile is at its own slot; collapsed, the row slides left by rowShift,
     so the active tile lands at 0 and any other tile sits relative to it. The
     clay figure and tooltip ride this so each sits over its own tile — not at
     the pill's start, which is where the active tile only lands when collapsed. */
  const tileX = (index: number) => PAD + BORDER + index * ROW_STEP - rowShift;

  return (
    <div className="pointer-events-none relative z-30 flex justify-start">
      <div className="relative mx-auto w-full max-w-[1200px]">
        <motion.nav
          ref={containerRef as unknown as React.RefObject<HTMLElement>}
          aria-label="Explore by lens"
          initial={{ opacity: 0, transform: "translateY(18px)" }}
          animate={shown === false ? { opacity: 0, transform: "translateY(18px)" } : { opacity: 1, transform: "translateY(0px)" }}
          transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
          aria-hidden={shown === false ? true : undefined}
          onClick={() => {
            if (!expanded) setExpanded(true);
          }}
          className="pointer-events-auto relative flex items-center rounded-full"
          style={{
            width,
            padding: PAD,
            background: theme.islandBg,
            backdropFilter: "blur(18px) saturate(1.15)",
            WebkitBackdropFilter: "blur(18px) saturate(1.15)",
            border: `${BORDER}px solid ${theme.islandBorder}`,
            boxShadow: `0 12px 32px rgba(22,22,30,0.10), 0 2px 8px rgba(22,22,30,0.05), inset 0 1px 0 rgba(255,255,255,0.7), inset 0 0 0 1px ${theme.accent}0F`,
            // Size change is the one layout property this component animates;
            // enter is the strong ease-out, exit is faster and drawer-curved.
            transition: reduce
              ? "none"
              : `width ${expanded ? 380 : 260}ms ${expanded ? EASE_OUT : EASE_DRAWER}`,
          }}
        >
          {/* Clip window: shrinks with the pill and slides the row, so only the
              active lens survives the collapse. Overflow lives here, never on
              the pill, so the clay figure and tooltip above it are not cut. */}
          <div
            className="relative overflow-hidden"
            style={{
              width: clipWidth,
              height: ITEM,
              transition: reduce
                ? "none"
                : `width ${expanded ? 380 : 260}ms ${expanded ? EASE_OUT : EASE_DRAWER}`,
            }}
          >
            <div
              className="flex items-center"
              style={{
                gap: GAP,
                transform: `translateX(${-rowShift}px)`,
                transition: reduce
                  ? "none"
                  : `transform ${expanded ? 420 : 320}ms ${expanded ? EASE_DRAWER : EASE_OUT}`,
              }}
            >
              {ITEMS.map((item) => {
                const isActive = item.id === activeId;
                const visible = expanded || isActive;
                const hasFailed = failed.has(item.id);
                // The icon only stands down once the clay figure is decoded and
                // ready to take its place, so the hand-off is atomic — never a
                // frame where the tile is empty.
                const showClay = isActive && !hasFailed && loaded.has(item.id);
                const Icon = ICON_MAP[item.id];
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (!expanded) {
                        setExpanded(true);
                        return;
                      }
                      onSelect(item.id);
                    }}
                    onMouseEnter={canHover ? () => setHovered(item.id) : undefined}
                    onMouseLeave={canHover ? () => setHovered((h) => (h === item.id ? null : h)) : undefined}
                    onFocus={canHover ? () => setHovered(item.id) : undefined}
                    onBlur={canHover ? () => setHovered((h) => (h === item.id ? null : h)) : undefined}
                    aria-label={item.label}
                    aria-pressed={isActive}
                    // Hidden lenses leave the tab order and stop intercepting
                    // clicks; the clip window hides them visually, not for AT.
                    tabIndex={visible ? 0 : -1}
                    className="group relative flex shrink-0 items-center justify-center rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 motion-safe:active:scale-[0.94]"
                    style={{
                      width: ITEM,
                      height: ITEM,
                      pointerEvents: visible ? "auto" : "none",
                      opacity: visible ? 1 : 0,
                      // Hover lift only on hover-capable pointers, and never on
                      // the active tile (its own ring already reads as current).
                      backgroundColor: canHover && hovered === item.id && !isActive ? "rgba(23,22,27,0.05)" : "transparent",
                      transition: reduce
                        ? "opacity 120ms linear"
                        : `opacity ${visible ? 220 : 140}ms ${visible ? EASE_OUT : "ease-out"}, transform 140ms ${EASE_OUT}, background-color 160ms ease`,
                      outlineColor: item.color,
                    }}
                  >
                    {isActive && (
                      <span
                        className="absolute inset-0 rounded-full"
                        style={{
                          backgroundColor: `${item.color}12`,
                          border: `1px solid ${item.color}1F`,
                          boxShadow: `0 1px 6px ${item.color}14`,
                        }}
                      />
                    )}

                    {/* Line icon; it hands off to the clay figure once that's ready */}
                    <span
                      className="island-icon relative flex items-center justify-center"
                      style={{
                        color: isActive ? item.color : theme.islandIconIdle,
                        opacity: showClay ? 0 : isActive ? 1 : 0.6,
                        transform: showClay ? "scale(0.94)" : "scale(1)",
                      }}
                    >
                      <Icon active={isActive} color={item.color} />
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Clay figure for the active lens — outside the clip window, moved
              with the same shift as the row so it tracks its tile exactly. */}
          {!failed.has(activeId) && loaded.has(activeId) && (
            <span
              aria-hidden
              className="pointer-events-none absolute left-0 top-0"
              style={{
                width: ITEM,
                height: ITEM,
                transform: `translateX(${tileX(activeIndex)}px)`,
                transition: reduce
                  ? "none"
                  : `transform ${expanded ? 420 : 320}ms ${expanded ? EASE_DRAWER : EASE_OUT}`,
              }}
            >
              <span
                className="absolute left-1/2 top-1/2 z-[2] block h-[64px] w-[64px]"
                style={{
                  transform: "translate(-50%, -64%)",
                  transformOrigin: "50% 72%",
                  filter: "drop-shadow(0 8px 12px rgba(22,22,30,0.16))",
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={CLAY_ASSET[activeId].src}
                  srcSet={CLAY_ASSET[activeId].srcSet}
                  sizes="64px"
                  width={64}
                  height={64}
                  loading="eager"
                  decoding="async"
                  alt=""
                  draggable={false}
                  onError={() => setFailed((prev) => new Set(prev).add(activeId))}
                  className="h-full w-full select-none object-contain"
                />
              </span>
            </span>
          )}

          {/* One tooltip for the hovered lens, riding the row's shift so it
              sits over its own tile whether expanded or collapsed. */}
          {canHover && hovered && (
            <span
              aria-hidden
              className="pointer-events-none absolute left-0 top-0 z-[3]"
              style={{
                width: ITEM,
                height: ITEM,
                transform: `translateX(${tileX(ITEMS.findIndex((i) => i.id === hovered))}px)`,
                transition: reduce
                  ? "none"
                  : `transform ${expanded ? 420 : 320}ms ${expanded ? EASE_DRAWER : EASE_OUT}`,
              }}
            >
              <span
                className="island-tooltip absolute left-1/2 top-[-6px] -translate-x-1/2 -translate-y-full whitespace-nowrap rounded-full border border-white/10 bg-zinc-900 px-[10px] py-[3px] font-mono text-[10px] tracking-[0.12em] text-white/90 shadow-lg"
              >
                {ITEMS.find((i) => i.id === hovered)?.label}
              </span>
            </span>
          )}
        </motion.nav>
      </div>
    </div>
  );
}
