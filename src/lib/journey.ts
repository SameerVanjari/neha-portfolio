/**
 * Storyboard scene index + approximate global-progress boundaries.
 * The real bounds are recomputed from DOM layout at runtime (ScrollSync),
 * but these approximate values keep 3D keyframes aligned with the layout.
 */
export const S = {
  INTRO: 0,
  IDENTITY: 1,
  TUNNEL: 2,
  DEEPER: 3,
  ARRIVAL: 4,
  TIMELINE: 5,
  DIMENSIONS: 6,
  EYE: 7,
  SENTIENT: 8,
  LOGO: 9,
  WORLD: 10,
} as const;

export const BOUNDS: [number, number][] = [
  [0.0, 0.065], // INTRO
  [0.065, 0.13], // IDENTITY
  [0.13, 0.26], // TUNNEL
  [0.26, 0.33], // DEEPER
  [0.33, 0.4], // ARRIVAL
  [0.4, 0.52], // TIMELINE
  [0.52, 0.64], // DIMENSIONS
  [0.64, 0.71], // EYE
  [0.71, 0.78], // SENTIENT
  [0.78, 0.84], // LOGO
  [0.84, 1.0], // WORLD
];
