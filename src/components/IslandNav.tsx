"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import type { Theme, ThemeId } from "@/data/themes";

interface IslandItem {
  id: ThemeId;
  label: string;
  color: string;
}

const ITEMS: IslandItem[] = [
  { id: "xr", label: "XR", color: "#FF2BD6" },
  { id: "ux", label: "UX", color: "#FFC94D" },
  { id: "ai", label: "AI", color: "#8B5CF6" },
  { id: "product", label: "PRODUCT", color: "#06B6D4" },
];

// ——— Icons (thicker strokes) ———
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

// Clay 3D objects — line icon becomes real on select.
// Optimized WebP (256: 6-9KB, 512: 14-28KB) generated from trimmed 512 PNG.
// Preloaded eagerly on mount so first tap is instant.
const CLAY_ASSET: Record<ThemeId, { src: string; srcSet: string; fallback: string }> = {
  xr: {
    src: "/clay/xr-256.webp",
    srcSet: "/clay/xr-256.webp 256w, /clay/xr-512.webp 512w",
    fallback: "/clay/xr.png",
  },
  ux: {
    src: "/clay/ux-256.webp",
    srcSet: "/clay/ux-256.webp 256w, /clay/ux-512.webp 512w",
    fallback: "/clay/ux.png",
  },
  ai: {
    src: "/clay/ai-256.webp",
    srcSet: "/clay/ai-256.webp 256w, /clay/ai-512.webp 512w",
    fallback: "/clay/ai.png",
  },
  product: {
    src: "/clay/product-256.webp",
    srcSet: "/clay/product-256.webp 256w, /clay/product-512.webp 512w",
    fallback: "/clay/product.png",
  },
};
// Keep string map for preload loops + legacy (used via CLAY_ASSET)
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const CLAY_SRC: Record<ThemeId, string> = {
  xr: CLAY_ASSET.xr.src,
  ux: CLAY_ASSET.ux.src,
  ai: CLAY_ASSET.ai.src,
  product: CLAY_ASSET.product.src,
};

export default function IslandNav({
  activeId,
  onSelect,
  theme,
}: {
  activeId: ThemeId;
  onSelect: (id: ThemeId) => void;
  theme: Theme;
}) {
  const reduceMotion = useReducedMotion();
  const [failed, setFailed] = useState<Set<ThemeId>>(() => new Set());
  const [loaded, setLoaded] = useState<Set<ThemeId>>(() => new Set());

  // Eagerly preload all clay assets + inject <link rel="preload"> for high priority fetch.
  useEffect(() => {
    (Object.keys(CLAY_ASSET) as ThemeId[]).forEach((id) => {
      const { src, srcSet } = CLAY_ASSET[id];
      const img = new window.Image();
      img.decoding = "async";
      if (srcSet) img.srcset = srcSet;
      img.sizes = "84px";
      img.src = src;
      if (img.decode) {
        img
          .decode()
          .then(() => setLoaded((p) => new Set(p).add(id)))
          .catch(() => setLoaded((p) => new Set(p).add(id)));
      } else {
        img.onload = () => setLoaded((p) => new Set(p).add(id));
      }
      const fb = new window.Image();
      fb.src = CLAY_ASSET[id].fallback;
    });
    (Object.keys(CLAY_ASSET) as ThemeId[]).forEach((id) => {
      const { src, srcSet } = CLAY_ASSET[id];
      if (document.querySelector(`link[href="${src}"]`)) return;
      const link = document.createElement("link");
      link.rel = "preload";
      link.as = "image";
      link.href = src;
      if (srcSet) link.setAttribute("imagesrcset", srcSet);
      link.setAttribute("imagesizes", "84px");
      link.type = "image/webp";
      (link as HTMLLinkElement & { fetchPriority: string }).fetchPriority = "high";
      document.head.appendChild(link);
    });
  }, []);

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-6 z-50 flex justify-center overflow-visible px-4 md:bottom-8">
      <motion.nav
        initial={reduceMotion ? { opacity: 0 } : { opacity: 0, transform: "translateY(12px)" }}
        animate={reduceMotion ? { opacity: 1 } : { opacity: 1, transform: "translateY(0px)" }}
        transition={reduceMotion ? { duration: 0.2, ease: "easeOut" } : { duration: 0.5, ease: [0.23, 1, 0.32, 1], delay: 0.15 }}
        className="pointer-events-auto flex items-center gap-0.5 overflow-visible rounded-full p-[4px] md:gap-1 md:p-[5px]"
        aria-label="Dimension navigation"
        style={{
          background: theme.islandBg,
          backdropFilter: "blur(22px) saturate(1.3)",
          WebkitBackdropFilter: "blur(22px) saturate(1.3)",
          border: `1px solid ${theme.islandBorder}`,
          // craft-floor depth: offset + soft blur, accent inner ring proves source
          boxShadow: `0 12px 36px rgba(0,0,0,0.24), 0 2px 10px rgba(0,0,0,0.14), inset 0 1px 0 rgba(255,255,255,0.06), inset 0 0 0 1px ${theme.accent}18`,
          overflow: "visible",
        }}
      >
        {ITEMS.map((item) => {
          const isActive = activeId === item.id;
          const hasFailed = failed.has(item.id);
          const isLoaded = loaded.has(item.id);
          const showClay = isActive && !hasFailed;
          // Keep line visible until clay is decoded — prevents empty island flicker
          const isClayReady = showClay && isLoaded;
          const Icon = ICON_MAP[item.id];
          const asset = CLAY_ASSET[item.id];
          return (
            <button
              key={item.id}
              onClick={() => onSelect(item.id)}
              aria-label={item.label}
              aria-pressed={isActive}
              className="group relative flex items-center justify-center overflow-visible active:scale-[0.97] transition-transform duration-120 ease-[cubic-bezier(0.23,1,0.32,1)] motion-reduce:transition-none"
              style={{ overflow: "visible" }}
            >
              {isActive && (
                <motion.div
                  layout
                  layoutId="island-active"
                  className="absolute inset-0 rounded-full"
                  initial={false}
                  animate={{
                    backgroundColor: `${item.color}14`,
                    borderColor: `${item.color}28`,
                  }}
                  style={{
                    borderWidth: "1px",
                    borderStyle: "solid",
                    boxShadow: `0 1px 8px ${item.color}22`,
                  }}
                  transition={
                    reduceMotion
                      ? { duration: 0.15, ease: "easeOut" }
                      : {
                          layout: { type: "spring", duration: 0.30, bounce: 0.08 },
                          backgroundColor: { duration: 0.20, ease: [0.23, 1, 0.32, 1] as const },
                          borderColor: { duration: 0.20, ease: [0.23, 1, 0.32, 1] as const },
                        }
                  }
                />
              )}

              <span
                className="island-btn relative flex h-[40px] w-[40px] items-center justify-center rounded-full md:h-[44px] md:w-[52px]"
                style={{ overflow: "visible" }}
              >
                {/* Line icon — only transform+opacity (no filter) → compositor only, prevents grayscale/blur conflict flicker */}
                <motion.span
                  className="island-icon flex items-center justify-center"
                  animate={
                    isClayReady
                      ? { opacity: 0, transform: "scale(0.94)" }
                      : isActive
                        ? reduceMotion
                          ? { opacity: 1, transform: "scale(1.04)" }
                          : { opacity: 1, transform: "scale(1.06)" }
                        : reduceMotion
                          ? { opacity: 0.6, transform: "scale(1)" }
                          : { opacity: 1, transform: "scale(1)" }
                  }
                  transition={
                    isClayReady
                      ? { duration: 0.16, ease: [0.23, 1, 0.32, 1] as const }
                      : isActive
                        ? { type: "spring", duration: 0.26, bounce: 0.10 }
                        : { duration: 0.16, ease: [0.23, 1, 0.32, 1] as const }
                  }
                  style={
                    isActive
                      ? { color: item.color, willChange: "transform, opacity" }
                      : { color: theme.islandIconIdle, willChange: "transform, opacity" }
                  }
                >
                  <span style={isActive ? undefined : { filter: "grayscale(1)" }}>
                    <Icon active={isActive} color={item.color} />
                  </span>
                </motion.span>

                {/* Clay 3D — compositor-only (transform+opacity). Shadow is static wrapper, no filter animation → no paint flicker */}
                <AnimatePresence initial={false}>
                  {showClay && (
                    <motion.div
                      key={`${item.id}-clay-wrap`}
                      className="pointer-events-none absolute left-1/2 top-1/2 z-[2] h-[72px] w-[72px] md:h-[84px] md:w-[84px]"
                      style={{
                        transformOrigin: "50% 72%",
                        willChange: "transform, opacity",
                        // static lift shadow — not animated → compositor only for inner
                        filter: `drop-shadow(0 10px 14px rgba(0,0,0,0.28)) drop-shadow(0 0 10px ${item.color}22)`,
                      }}
                      initial={
                        reduceMotion
                          ? { opacity: 0, transform: "translate(-50%, -52%) scale(0.96)" }
                          : { opacity: 0, transform: "translate(-50%, -48%) scale(0.94)" }
                      }
                      animate={{ opacity: 1, transform: "translate(-50%, -58%) scale(1)" }}
                      exit={
                        reduceMotion
                          ? { opacity: 0, transform: "translate(-50%, -52%) scale(0.96)" }
                          : { opacity: 0, transform: "translate(-50%, -52%) scale(0.94)" }
                      }
                      transition={
                        reduceMotion
                          ? { duration: 0.14, ease: "easeOut" }
                          : {
                              type: "spring",
                              duration: 0.28,
                              bounce: 0.08,
                              opacity: { duration: 0.16, ease: [0.23, 1, 0.32, 1] as const },
                            }
                      }
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={asset.src}
                        srcSet={asset.srcSet}
                        sizes="84px"
                        width={84}
                        height={84}
                        loading="eager"
                        decoding="async"
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        // @ts-ignore — fetchPriority types vary across React versions
                        fetchPriority="high"
                        alt=""
                        aria-hidden
                        draggable={false}
                        onLoad={() => setLoaded((p) => new Set(p).add(item.id))}
                        onError={(e) => {
                          const img = e.currentTarget as HTMLImageElement;
                          const pathname = new URL(img.src, window.location.href).pathname;
                          if (pathname !== asset.fallback) {
                            img.src = asset.fallback;
                            img.srcset = "";
                            return;
                          }
                          setFailed((prev) => new Set(prev).add(item.id));
                        }}
                        className="h-full w-full select-none object-contain"
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </span>

              <span className="pointer-events-none absolute -top-9 left-1/2 hidden -translate-x-1/2 whitespace-nowrap rounded-full bg-zinc-900 border border-white/10 px-2.5 py-1 font-mono text-[10px] tracking-[0.12em] text-white opacity-0 shadow-lg transition-[opacity,transform] duration-150 ease-out group-hover:opacity-100 group-hover:translate-y-0 md:block motion-reduce:transition-none">
                {item.label}
              </span>
            </button>
          );
        })}
      </motion.nav>
    </div>
  );
}
