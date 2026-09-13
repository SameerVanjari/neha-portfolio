import { THEMES, type Theme } from "@/data/themes";

/**
 * Unified case-study theme for ALL project detail pages.
 * Sampled from the Millennium Figma case study
 * ("Final Refined Portfolio Ready Presentation"):
 * dark ink background + signal red accent.
 */
export const CASE_COLORS = {
  bg: "#19191B",
  surface: "#1F1F1F",
  deep: "#151516",
  text: "#FFFFFF",
  muted: "#B6B6BC",
  accent: "#FF1E1E",
  accentStrong: "#DC021D",
  border: "rgba(255,255,255,0.10)",
  accentBorder: "rgba(255,30,30,0.28)",
} as const;

export const CASE_THEME: Theme = {
  ...THEMES.xr,
  accent: CASE_COLORS.accent,
  accentStrong: CASE_COLORS.accentStrong,
  bg: CASE_COLORS.bg,
  wash: CASE_COLORS.bg,
  glow: "rgba(255,30,30,0.22)",
  text: CASE_COLORS.text,
  muted: CASE_COLORS.muted,
  faint: "#6E6E76",
  border: CASE_COLORS.border,
  surface: CASE_COLORS.surface,
  islandBg: "rgba(18,18,22,0.92)",
  islandBorder: "rgba(255,255,255,0.10)",
  islandIconIdle: "rgba(255,255,255,0.52)",
};
