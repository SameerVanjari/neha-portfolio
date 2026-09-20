// Impeccable — light studio, tonal washes (matching, not complementary)
// Each perception owns a restrained tonal sweep — calm authority, one accent family per page.
export type ThemeId = "xr" | "ux" | "ai" | "product";

export interface Theme {
  id: ThemeId;
  accent: string;
  accentStrong: string;
  bg: string;
  bgGradient: string;
  wash: string; // matching tonal wash — not complement
  glow: string;
  text: string;
  muted: string;
  faint: string;
  border: string;
  surface: string;
  islandBg: string;
  islandBorder: string;
  islandIconIdle: string;
}

const ISLAND_BG = "rgba(18,18,22,0.92)";
const ISLAND_IDLE = "rgba(255,255,255,0.52)";

// Site-wide cream (editorial paper) — one background across all perceptions.
// Subtle tonal gradient keeps transitions visible while staying cream-family.
const CREAM_BG = "#F2EEE6";
const CREAM_GRADIENT =
  "linear-gradient(175deg, #F6F1E9 0%, #F2EEE6 45%, #ECE6DA 100%)";

export const THEMES: Record<ThemeId, Theme> = {
  xr: {
    id: "xr",
    accent: "#FF2BD6",
    accentStrong: "#D60AA8",
    bg: CREAM_BG,
    wash: "#E9E2D4", // cream-tonal shadow for transitions
    bgGradient: CREAM_GRADIENT,
    glow: "rgba(53,51,158,0.10)",
    text: "#16161E",
    muted: "#71716D",
    faint: "#DDD6CA",
    border: "rgba(22,22,30,0.10)",
    surface: "#FFFFFF",
    islandBg: ISLAND_BG,
    islandBorder: "rgba(255,255,255,0.10)",
    islandIconIdle: ISLAND_IDLE,
  },
  ux: {
    id: "ux",
    accent: "#FFC94D",
    accentStrong: "#B77900",
    bg: CREAM_BG,
    wash: "#E9E2D4",
    bgGradient: CREAM_GRADIENT,
    glow: "rgba(53,51,158,0.10)",
    text: "#16161E",
    muted: "#71716D",
    faint: "#DDD6CA",
    border: "rgba(22,22,30,0.10)",
    surface: "#FFFFFF",
    islandBg: ISLAND_BG,
    islandBorder: "rgba(255,255,255,0.10)",
    islandIconIdle: ISLAND_IDLE,
  },
  ai: {
    id: "ai",
    accent: "#8B5CF6",
    accentStrong: "#6D28D9",
    bg: CREAM_BG,
    wash: "#E9E2D4",
    bgGradient: CREAM_GRADIENT,
    glow: "rgba(53,51,158,0.10)",
    text: "#16161E",
    muted: "#71716D",
    faint: "#DDD6CA",
    border: "rgba(22,22,30,0.10)",
    surface: "#FFFFFF",
    islandBg: ISLAND_BG,
    islandBorder: "rgba(255,255,255,0.10)",
    islandIconIdle: ISLAND_IDLE,
  },
  product: {
    id: "product",
    accent: "#06B6D4",
    accentStrong: "#0E7490",
    bg: CREAM_BG,
    wash: "#E9E2D4",
    bgGradient: CREAM_GRADIENT,
    glow: "rgba(53,51,158,0.10)",
    text: "#16161E",
    muted: "#71716D",
    faint: "#DDD6CA",
    border: "rgba(22,22,30,0.10)",
    surface: "#FFFFFF",
    islandBg: ISLAND_BG,
    islandBorder: "rgba(255,255,255,0.10)",
    islandIconIdle: ISLAND_IDLE,
  },
};
