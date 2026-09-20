import type { Project } from "@/types/portfolio";

/**
 * Tiering for the project lineup.
 *  A — showcase: real content + real assets rendered in the editorial layout.
 *  B — copy complete, imagery lives on a specific Behance gallery; pages get a
 *      prominent Behance CTA instead of pretending to have visuals.
 *  C — thin copy + no dedicated gallery: hidden from all listings for now.
 */
export const TIER_A_IDS = [
  "feed-the-children-truesense",
  "hbo-charm-city-kings",
  "ascension-realty",
  "made-for-joy",
  "vr-training-fiber",
] as const;

export const TIER_B_IDS = [
  "visagenie",
  "research-recommender",
  "ar-real-estate",
  "virtual-retail",
  "meditation-universe",
  "interactive-3d",
  "vr-stem-inspirit",
] as const;

export const TIER_C_IDS = [
  "vr-3d-modelling",
  "physics-vr",
  "iot-vr-game",
  "chatoor-dashboards",
  "modelo-kraken",
  "education-vr",
] as const;

/** Intended public sequence: showcase first, then gallery-linked B tier. */
const PUBLIC_ORDER = [...TIER_A_IDS, ...TIER_B_IDS];

export function isHiddenProject(id: string): boolean {
  return (TIER_C_IDS as readonly string[]).includes(id);
}

/** Behance case-gallery link, suitable for opening in a new tab (not bare profiles). */
export function behanceUrlOf(project: Project): string | null {
  const url = project.url ?? "";
  return url.startsWith("https://www.behance.net/") && url.includes("/gallery/") ? url : null;
}

/** Projects in curated order, Tier C removed. */
export function visibleProjects(projects: Project[], activeId?: string): Project[] {
  const shown = projects.filter((p) => !isHiddenProject(p.id));
  if (activeId) return shown; // lens-filtered views keep the caller's order
  const rank = (p: Project) => {
    const i = (PUBLIC_ORDER as string[]).indexOf(p.id);
    return i === -1 ? 500 : i;
  };
  return [...shown].sort((a, b) => rank(a) - rank(b));
}
