"use client";

import { sceneState } from "./sceneState";
import { gsap } from "./gsap";

export function hoverDimension(i: number) {
  sceneState.hovered = i;
  sceneState.birdLook = i;
}

export function clearDimensionHover() {
  sceneState.hovered = -1;
  if (sceneState.selected < 0) sceneState.birdLook = -1;
}

export function selectDimension(i: number) {
  if (sceneState.selected === i) return;
  sceneState.selected = i;
  sceneState.birdLook = i;
  sceneState.selectedAt = performance.now();
  gsap.to(sceneState, { selectedDeep: 1, duration: 1.8, ease: "power2.out" });
}

export function hoverMilestone(i: number) {
  sceneState.milestone = i;
  sceneState.birdLook = -1;
}

export function clearMilestone() {
  sceneState.milestone = -1;
}
