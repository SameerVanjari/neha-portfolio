import * as THREE from "three";

export const sceneState = {
  /** Normalized 0→1 page scroll progress, driven by GSAP ScrollTrigger. */
  progress: 0,
};

export function damp(current: number, target: number, lambda: number, dt: number) {
  return THREE.MathUtils.damp(current, target, lambda, dt);
}

export function clamp01(v: number) {
  return Math.min(1, Math.max(0, v));
}

/**
 * Smooth 0→1 ramp over [start, end].
 */
export function remap(p: number, start: number, end: number) {
  return clamp01((p - start) / (end - start));
}

/**
 * Linear piecewise interpolation over keyframes [[progress, value], ...].
 * Assumes ascending progress keys.
 */
export function keyframes(keys: [number, number][], p: number) {
  const k = keys[keys.length - 1][0];
  const clamped = clamp01(p);
  if (clamped <= keys[0][0]) return keys[0][1];
  if (clamped >= k) return keys[keys.length - 1][1];
  for (let i = 1; i < keys.length; i++) {
    const [pa, va] = keys[i - 1];
    const [pb, vb] = keys[i];
    if (clamped <= pb) {
      const t = (clamped - pa) / (pb - pa);
      return va + (vb - va) * t;
    }
  }
  return keys[keys.length - 1][1];
}

export const clamp = (v: number, min: number, max: number) =>
  Math.min(max, Math.max(min, v));
