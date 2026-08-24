import * as THREE from "three";

/**
 * Shared mutable state bridging the DOM scroll world and the R3F canvas.
 * Written by GSAP ScrollTrigger on each update; read in useFrame loops —
 * deliberately not React state to avoid re-renders.
 */
export const sceneState = {
  /** Normalized 0→1 page scroll progress. */
  progress: 0,

  /** Scene-local progress 0→1 for each storyboard scene. */
  scenes: [] as number[],

  /** Scene bounds [start,end) computed from actual DOM layout. */
  bounds: [] as [number, number][],

  /** Currently hovered dimension index (-1 = none). */
  hovered: -1,

  /** Selected dimension index (-1 = none). */
  selected: -1,

  /** Progressive "deep" selection animation 0→1 once a dimension is chosen. */
  selectedDeep: 0,

  /** Hovered milestone index (-1 = none). */
  milestone: -1,

  /** Bird look target: 0=none, 1..4 = dimension index+1. */
  birdLook: -1,

  /** Time since selection (for camera detour timing). */
  selectedAt: 0,

  /** Whether the journey has completed (entered the portfolio world). */
  journeyComplete: false,
};

export const SCENE_COUNT = 11;

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
  const clamped = clamp01(p);
  if (clamped <= keys[0][0]) return keys[0][1];
  if (clamped >= keys[keys.length - 1][0]) return keys[keys.length - 1][1];
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

/**
 * Convenience accessor: local progress (0→1) of scene `i`.
 */
export function scene(i: number) {
  const b = sceneState.bounds[i];
  if (!b) return 0;
  return clamp01((sceneState.progress - b[0]) / (b[1] - b[0]));
}

export const clamp = (v: number, min: number, max: number) =>
  Math.min(max, Math.max(min, v));
