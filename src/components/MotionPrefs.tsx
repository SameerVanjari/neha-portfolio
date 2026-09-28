"use client";

import { MotionConfig } from "framer-motion";
import type { ReactNode } from "react";

/**
 * Site-wide reduced-motion handling for framer.
 *
 * The reveal primitives used to branch their variants on `useReducedMotion`,
 * but that value can't be known during SSR — the variants swapped one render
 * after hydration, and framer's variant controller kept the server's inline
 * state for any group already in view at hydration (its own children updated,
 * the group itself froze partway, permanently invisible for reduced-motion
 * users on short-hero pages).
 *
 * `MotionConfig reducedMotion="user"` moves the switch inside framer: variant
 * definitions stay identical between server and client — no swap, no
 * hydration mismatch — and framer itself disables transform/layout animations
 * while keeping opacity fades, which is exactly the house reduced-motion
 * behavior. The `useMotionPref` hook remains for non-variant logic (timings,
 * clip fallbacks) that resolves after mount.
 */
export default function MotionPrefs({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
