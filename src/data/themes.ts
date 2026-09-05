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

export const THEMES: Record<ThemeId, Theme> = {
  xr: {
    id: "xr",
    accent: "#FF2BD6",
    accentStrong: "#D60AA8",
    bg: "#FFF0F7",
    wash: "#FFC2DD", // rose — tonal to magenta
    bgGradient:
      "radial-gradient(130% 100% at 50% 108%, #FF9AD0 0%, #FFB5DD 22%, #FFD0E8 36%, #FFE0F0 54%, #FFF0F7 72%, #FFD6E8 88%, #FFC2DD 100%)",
    glow: "rgba(255,43,214,0.22)",
    text: "#2A1020",
    muted: "#7A4A62",
    faint: "#E8A8C8",
    border: "rgba(255,43,214,0.16)",
    surface: "#FFFFFF",
    islandBg: ISLAND_BG,
    islandBorder: "rgba(255,255,255,0.10)",
    islandIconIdle: ISLAND_IDLE,
  },
  ux: {
    id: "ux",
    accent: "#FFC94D",
    accentStrong: "#B77900",
    bg: "#FFF4CC",
    wash: "#FFE7A3", // warm gold — tonal
    bgGradient:
      "radial-gradient(130% 100% at 50% 108%, #FFD84D 0%, #FFE27A 24%, #FFE9A3 40%, #FFF0C2 58%, #FFF4CC 74%, #FFEEC2 88%, #FFE7A3 100%)",
    glow: "rgba(255,201,77,0.26)",
    text: "#231C0A",
    muted: "#7A652F",
    faint: "#E8D090",
    border: "rgba(214,162,0,0.20)",
    surface: "#FFFFFF",
    islandBg: ISLAND_BG,
    islandBorder: "rgba(255,255,255,0.10)",
    islandIconIdle: ISLAND_IDLE,
  },
  ai: {
    id: "ai",
    accent: "#8B5CF6",
    accentStrong: "#6D28D9",
    bg: "#EDE8FF",
    wash: "#D8D0FF", // lavender — tonal to violet
    bgGradient:
      "radial-gradient(130% 100% at 50% 108%, #B8A6FF 0%, #C7B8FF 24%, #DDD6FE 40%, #E9E2FF 58%, #EDE8FF 74%, #E6E0FF 88%, #D8D0FF 100%)",
    glow: "rgba(139,92,246,0.22)",
    text: "#1A1630",
    muted: "#5E5878",
    faint: "#C8C2E0",
    border: "rgba(139,92,246,0.16)",
    surface: "#FFFFFF",
    islandBg: ISLAND_BG,
    islandBorder: "rgba(255,255,255,0.10)",
    islandIconIdle: ISLAND_IDLE,
  },
  product: {
    id: "product",
    accent: "#06B6D4",
    accentStrong: "#0E7490",
    bg: "#CFF5FA",
    wash: "#A5F3FC", // sky — tonal to cyan
    bgGradient:
      "radial-gradient(130% 100% at 50% 108%, #67E8F9 0%, #8EF0FB 24%, #A5F3FC 40%, #BEF8FE 56%, #CFF5FA 72%, #D1F2FA 88%, #A5F3FC 100%)",
    glow: "rgba(6,182,214,0.22)",
    text: "#0F1F25",
    muted: "#4A6570",
    faint: "#8EC8D1",
    border: "rgba(6,182,214,0.16)",
    surface: "#FFFFFF",
    islandBg: ISLAND_BG,
    islandBorder: "rgba(255,255,255,0.10)",
    islandIconIdle: ISLAND_IDLE,
  },
};
