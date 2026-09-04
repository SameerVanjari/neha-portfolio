"use client";

import { useEffect, useState, useRef } from "react";
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
}: {
  activeId: ThemeId;
  onSelect: (id: ThemeId) => void;
  theme: Theme;
}) {
  const [failed, setFailed] = useState<Set<ThemeId>>(() => new Set());
  const [loaded, setLoaded] = useState<Set<ThemeId>>(() => new Set());
  const [expanded, setExpanded] = useState(true);
  const [heroInView, setHeroInView] = useState(true);
  const collapseTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const containerRef = useRef<HTMLElement | null>(null);

  // preload clay
  useEffect(() => {
    (Object.keys(CLAY_ASSET) as ThemeId[]).forEach((id) => {
      const { src, srcSet } = CLAY_ASSET[id];
      const img = new window.Image();
      img.decoding = "async";
      if (srcSet) img.srcset = srcSet;
      img.sizes = "84px";
      img.src = src;
      if (img.decode) {
        img.decode().then(() => setLoaded((p) => new Set(p).add(id))).catch(() => setLoaded((p) => new Set(p).add(id)));
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

  // hero in view → expanded (full size), smooth via CSS
  useEffect(() => {
    const hero = document.getElementById("hero");
    if (!hero) return;
    const obs = new IntersectionObserver(
      ([entry]) => setHeroInView(entry.isIntersecting),
      { threshold: 0.35, rootMargin: "-64px 0px 0px 0px" }
    );
    obs.observe(hero);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (heroInView) setExpanded(true);
    else setExpanded(false);
  }, [heroInView]);

  // auto collapse on scroll when not in hero
  useEffect(() => {
    if (!expanded || heroInView) return;
    const onScroll = () => setExpanded(false);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [expanded, heroInView]);

  // auto collapse after inactivity
  useEffect(() => {
    if (!expanded || heroInView) {
      if (collapseTimeout.current) {
        clearTimeout(collapseTimeout.current);
        collapseTimeout.current = null;
      }
      return;
    }
    if (collapseTimeout.current) clearTimeout(collapseTimeout.current);
    collapseTimeout.current = setTimeout(() => setExpanded(false), 3200);
    return () => {
      if (collapseTimeout.current) clearTimeout(collapseTimeout.current);
    };
  }, [expanded, heroInView]);

  // outside click
  useEffect(() => {
    if (!expanded || heroInView) return;
    const handler = (e: MouseEvent) => {
      const el = containerRef.current as HTMLElement | null;
      if (el && !el.contains(e.target as Node)) setExpanded(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [expanded, heroInView]);

  const activeItem = ITEMS.find((i) => i.id === activeId)!;

  const renderButton = (item: IslandItem, isActive: boolean) => {
    const hasFailed = failed.has(item.id);
    const isLoaded = loaded.has(item.id);
    const showClay = isActive && !hasFailed && isLoaded;
    const Icon = ICON_MAP[item.id];
    const asset = CLAY_ASSET[item.id];
    return (
      <button
        key={item.id}
        onClick={() => {
          if (!expanded) {
            setExpanded(true);
            return;
          }
          onSelect(item.id);
          if (collapseTimeout.current) clearTimeout(collapseTimeout.current);
          collapseTimeout.current = setTimeout(() => setExpanded(false), 2200);
        }}
        aria-label={item.label}
        aria-pressed={isActive}
        className="group relative flex items-center justify-center overflow-visible active:scale-[0.97] transition-transform duration-120 ease-[cubic-bezier(0.23,1,0.32,1)]"
        style={{ overflow: "visible" }}
      >
        {/* active highlight — CSS only */}
        {isActive && expanded && (
          <span
            className="absolute inset-0 rounded-full"
            style={{
              backgroundColor: `${item.color}14`,
              border: `1px solid ${item.color}28`,
              boxShadow: `0 1px 8px ${item.color}22`,
              transition: "background-color 200ms cubic-bezier(0.23,1,0.32,1), border-color 200ms cubic-bezier(0.23,1,0.32,1)",
            }}
          />
        )}

        <span className="island-btn relative flex h-[40px] w-[40px] items-center justify-center rounded-full md:h-[44px] md:w-[52px]" style={{ overflow: "visible" }}>
          {/* line icon — hidden when clay shows, CSS opacity/scale */}
          <span
            className="island-icon flex items-center justify-center"
            style={{
              color: isActive ? item.color : theme.islandIconIdle,
              opacity: showClay ? 0 : isActive ? 1 : 0.6,
              transform: showClay ? "scale(0.94)" : isActive ? "scale(1.06)" : "scale(1)",
              transition: "opacity 160ms cubic-bezier(0.23,1,0.32,1), transform 160ms cubic-bezier(0.23,1,0.32,1), color 160ms ease",
              willChange: "transform, opacity",
            }}
          >
            <span style={isActive ? undefined : { filter: "grayscale(1)" }}>
              <Icon active={isActive} color={item.color} />
            </span>
          </span>

          {/* clay — only when active, replaces line icon */}
          {showClay && (
            <span
              className="pointer-events-none absolute left-1/2 top-1/2 z-[2] h-[72px] w-[72px] md:h-[84px] md:w-[84px]"
              style={{
                transform: "translate(-50%, -58%) scale(1)",
                transformOrigin: "50% 72%",
                opacity: 1,
                filter: `drop-shadow(0 10px 14px rgba(0,0,0,0.28)) drop-shadow(0 0 10px ${item.color}22)`,
                transition: "opacity 280ms cubic-bezier(0.23,1,0.32,1), transform 280ms cubic-bezier(0.23,1,0.32,1)",
                willChange: "transform, opacity",
              }}
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
            </span>
          )}
        </span>

        <span className="pointer-events-none absolute -top-9 left-1/2 hidden -translate-x-1/2 whitespace-nowrap rounded-full bg-zinc-900 border border-white/10 px-2.5 py-1 font-mono text-[10px] tracking-[0.12em] text-white opacity-0 shadow-lg transition-[opacity,transform] duration-150 ease-out group-hover:opacity-100 group-hover:translate-y-0 md:block">
          {item.label}
        </span>
      </button>
    );
  };

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-6 z-50 flex justify-center overflow-visible px-4 md:bottom-8">
      <nav
        // @ts-ignore
        ref={containerRef}
        aria-label="Dimension navigation"
        aria-expanded={expanded}
        className="pointer-events-auto flex items-center overflow-visible rounded-full p-[4px] md:p-[5px]"
        style={{
          background: theme.islandBg,
          backdropFilter: "blur(22px) saturate(1.3)",
          WebkitBackdropFilter: "blur(22px) saturate(1.3)",
          border: `1px solid ${theme.islandBorder}`,
          boxShadow: `0 12px 36px rgba(0,0,0,0.24), 0 2px 10px rgba(0,0,0,0.14), inset 0 1px 0 rgba(255,255,255,0.06), inset 0 0 0 1px ${theme.accent}18`,
          overflow: "visible",
          maxWidth: expanded ? 240 : 68,
          width: expanded ? 240 : 68,
          transition: "max-width 340ms cubic-bezier(0.23,1,0.32,1), width 340ms cubic-bezier(0.23,1,0.32,1)",
          willChange: "width, max-width",
          justifyContent: expanded ? "flex-start" : "center",
          gap: expanded ? 4 : 0,
        }}
        onClick={() => {
          if (!expanded) setExpanded(true);
        }}
      >
        <div className="flex items-center gap-0.5 md:gap-1">
          {ITEMS.map((item) => {
            const isActive = item.id === activeId;
            const visible = expanded || isActive;
            return (
              <div
                key={item.id}
                className="shrink-0"
                style={{
                  maxWidth: visible ? 52 : 0,
                  opacity: visible ? 1 : 0,
                  flex: visible ? "0 0 52px" : "0 0 0px",
                  overflow: visible ? "visible" : "hidden",
                  transition: visible
                    ? "max-width 340ms cubic-bezier(0.23,1,0.32,1), flex-basis 340ms cubic-bezier(0.23,1,0.32,1), opacity 200ms cubic-bezier(0.23,1,0.32,1)"
                    : "max-width 300ms cubic-bezier(0.32,0.72,0,1), flex-basis 300ms cubic-bezier(0.32,0.72,0,1), opacity 140ms ease-out",
                  willChange: "max-width, opacity",
                }}
                aria-hidden={!visible}
              >
                {renderButton(item, isActive)}
              </div>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
