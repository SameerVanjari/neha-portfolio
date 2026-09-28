/**
 * Vantage AI figure manifest.
 *
 * The case study's data names every figure by filename (e.g.
 * `va-hifi-01-portal.png`), so this maps those names to real files. A name
 * that is absent here falls back to the drop-frame treatment rather than
 * requesting a missing file — no 404s, and an unfilled slot still reads as
 * "artwork pending" instead of a broken image.
 *
 * Source: the project's own Drive export folder. The hi-fi frames were
 * captured from the React prototypes in `Hi-fi · <screen>-html.zip`, rendered
 * at 2560×1600 (2× of the largest 1036px slot). The lo-fi and mid-fi frames
 * are the exported @2x PNGs, downscaled to 1280 for the smaller slots.
 *
 * Known gap: the wireframe progression asks for a lo-fi pass of the Reveal
 * screen (`va-lofi-03-reveal.png`) and the export has no such file — the lo-fi
 * set covers six screens and Reveal is not among them. That one slot keeps its
 * drop-frame until the frame is supplied.
 */

const BASE = "/case/vantage";

export const VANTAGE_FIGURES: Record<string, string> = {
  // hi-fi — captured from the prototypes
  "va-hifi-01-portal.png": `${BASE}/va-hifi-01-portal.png`,
  "va-hifi-02-identity-quest.png": `${BASE}/va-hifi-02-identity-quest.png`,
  "va-hifi-03-reveal.png": `${BASE}/va-hifi-03-reveal.png`,
  "va-hifi-04-the-forge.png": `${BASE}/va-hifi-04-the-forge.png`,
  "va-hifi-05-preview.png": `${BASE}/va-hifi-05-preview.png`,
  "va-hifi-06-vault.png": `${BASE}/va-hifi-06-vault.png`,
  "va-hifi-07-job-tracker.png": `${BASE}/va-hifi-07-job-tracker.png`,

  // lo-fi / mid-fi passes for the three-pass wireframe groups
  "va-lofi-01-portal.png": `${BASE}/va-lofi-01-portal.png`,
  "va-midfi-01-portal.png": `${BASE}/va-midfi-01-portal.png`,
  "va-midfi-03-reveal.png": `${BASE}/va-midfi-03-reveal.png`,
  "va-lofi-05-preview.png": `${BASE}/va-lofi-05-preview.png`,
  "va-midfi-05-preview.png": `${BASE}/va-midfi-05-preview.png`,

  // project card thumbnail
  thumbnail: `${BASE}/thumbnail.png`,
};

/** Resolves a figure name to a real asset, or undefined if still a drop-frame. */
export function vantageFigure(name: string): string | undefined {
  return VANTAGE_FIGURES[name];
}
