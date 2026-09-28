import legacyProjects from "./projects.json";
import type { Project } from "@/types/portfolio";

/**
 * Dormant project archive.
 *
 * These 15 projects predate the current case-study pages. They are no longer
 * listed anywhere in the UI — the homepage and /projects both read the
 * `case-studies` registry instead — but their pages are still built and still
 * reachable by direct URL, so nothing here is dead code yet.
 *
 * Contents:
 *   projects.json        — the 15 legacy project records (was portfolio.json's
 *                          `projects` key, removed from there)
 *   projects-media.ts    — per-project hero videos and image sets
 *   project-tiers.ts     — the old showcase / gallery / hidden tiering
 *   *.json               — per-project media manifests, one per project
 *
 * To retire a project for real: delete its record from projects.json, its
 * media manifest, and its entry in projects-media.ts / project-tiers.ts. The
 * dynamic route at app/projects/[id] stops generating a page for it, and the
 * three About bio annotations that deep-link into this set (visagenie,
 * meditation-universe, virtual-retail) need repointing or dropping — see
 * data/bio-annotations.ts.
 */

export const LEGACY_PROJECTS = legacyProjects as Project[];

export { PROJECT_MEDIA } from "./projects-media";
export type { ProjectMedia } from "./projects-media";
export {
  TIER_A_IDS,
  TIER_B_IDS,
  TIER_C_IDS,
  isHiddenProject,
  behanceUrlOf,
  visibleProjects,
} from "./project-tiers";
