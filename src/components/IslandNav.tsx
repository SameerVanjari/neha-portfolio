"use client";

import { motion, useReducedMotion } from "framer-motion";
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

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-6 z-50 flex justify-center px-4 md:bottom-8">
      <motion.nav
        initial={reduceMotion ? { opacity: 0 } : { opacity: 0, transform: "translateY(12px)" }}
        animate={reduceMotion ? { opacity: 1 } : { opacity: 1, transform: "translateY(0px)" }}
        transition={reduceMotion ? { duration: 0.2, ease: "easeOut" } : { duration: 0.5, ease: [0.23, 1, 0.32, 1], delay: 0.15 }}
        className="pointer-events-auto flex items-center gap-0.5 rounded-full p-[4px] md:gap-1 md:p-[5px]"
        aria-label="Dimension navigation"
        style={{
          background: theme.islandBg,
          backdropFilter: "blur(22px) saturate(1.3)",
          WebkitBackdropFilter: "blur(22px) saturate(1.3)",
          border: `1px solid ${theme.islandBorder}`,
          // craft-floor depth: offset + soft blur, accent inner ring proves source
          boxShadow: `0 12px 36px rgba(0,0,0,0.24), 0 2px 10px rgba(0,0,0,0.14), inset 0 1px 0 rgba(255,255,255,0.06), inset 0 0 0 1px ${theme.accent}18`,
        }}
      >
        {ITEMS.map((item) => {
          const isActive = activeId === item.id;
          const Icon = ICON_MAP[item.id];
          return (
            <button
              key={item.id}
              onClick={() => onSelect(item.id)}
              aria-label={item.label}
              aria-pressed={isActive}
              className="group relative flex items-center justify-center"
            >
              {isActive && (
                <motion.div
                  layoutId="island-active"
                  className="absolute inset-0 rounded-full"
                  style={{
                    background: `${item.color}1F`,
                    border: `1px solid ${item.color}36`,
                    boxShadow: `0 2px 14px ${item.color}30, inset 0 1px 0 rgba(255,255,255,0.08)`,
                  }}
                  transition={reduceMotion ? { duration: 0.15 } : { type: "spring", duration: 0.5, bounce: 0.2 }}
                />
              )}

              <span className="island-btn relative flex h-[40px] w-[40px] items-center justify-center rounded-full md:h-[44px] md:w-[52px]">
                <motion.span
                  className="island-icon flex items-center justify-center"
                  animate={
                    isActive
                      ? reduceMotion
                        ? { opacity: 1 }
                        : { transform: "scale(1.18)", opacity: 1 }
                      : reduceMotion
                        ? { opacity: 0.6 }
                        : { transform: "scale(1)", opacity: 1 }
                  }
                  transition={
                    isActive
                      ? reduceMotion
                        ? { duration: 0.15 }
                        : { type: "spring", duration: 0.45, bounce: 0.18 }
                      : { duration: 0.18, ease: [0.23, 1, 0.32, 1] }
                  }
                  style={
                    isActive
                      ? { color: item.color, filter: "none" }
                      : { color: theme.islandIconIdle, filter: "grayscale(1)" }
                  }
                >
                  <Icon active={isActive} color={item.color} />
                </motion.span>
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
