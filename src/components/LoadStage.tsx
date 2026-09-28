"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

/**
 * Load staging — the order things are allowed to appear in.
 *
 *   loading → the preloader holds the screen
 *   text    → above-the-fold media is on screen, hero copy animates in
 *   nav     → copy has landed, the header slides down
 *
 * The gate is real load events on the critical media, not a fixed timer, so a
 * slow connection holds the preloader instead of letting the hero animation
 * play out unseen behind it. A hard timeout backstops it: a stalled or 404ing
 * asset must never keep the page behind an overlay.
 */

const CRITICAL_ASSETS = [
  "/loader/robo.png",
  "/loader/stylus.png",
  "/loader/lamp.png",
  "/loader/goggle.png",
  "/hero-wireframe.svg",
] as const;

/** Backstop: reveal regardless if the assets haven't reported back. */
const ASSET_TIMEOUT_MS = 2500;
/** How long after the copy starts before the nav follows it in. */
const NAV_DELAY_MS = 620;

export type LoadStage = "loading" | "text" | "nav";

type LoadStageValue = {
  stage: LoadStage;
  assetsReady: boolean;
  /** Called by the preloader once it has finished fading out. */
  revealText: () => void;
};

const LoadStageContext = createContext<LoadStageValue>({
  stage: "text",
  assetsReady: true,
  revealText: () => {},
});

export function LoadStageProvider({ children }: { children: ReactNode }) {
  const [assetsReady, setAssetsReady] = useState(false);
  const [stage, setStage] = useState<LoadStage>("loading");

  useEffect(() => {
    let settled = false;
    const done = () => {
      if (settled) return;
      settled = true;
      setAssetsReady(true);
    };

    if (typeof window === "undefined" || typeof window.Image === "undefined") {
      done();
      return;
    }

    let pending = CRITICAL_ASSETS.length;
    for (const src of CRITICAL_ASSETS) {
      const img = new window.Image();
      // Guard per image: a cached image can fire onload and report complete
      // in the same tick, and double-counting would cut the wait short.
      let counted = false;
      const settle = () => {
        if (counted) return;
        counted = true;
        pending -= 1;
        if (pending <= 0) done();
      };
      img.onload = settle;
      img.onerror = settle;
      img.src = src;
      if (img.complete) settle();
    }

    const t = window.setTimeout(done, ASSET_TIMEOUT_MS);
    return () => window.clearTimeout(t);
  }, []);

  const revealText = useCallback(() => setStage("text"), []);

  useEffect(() => {
    if (stage !== "text") return;
    const t = window.setTimeout(() => setStage("nav"), NAV_DELAY_MS);
    return () => window.clearTimeout(t);
  }, [stage]);

  const value = useMemo(
    () => ({ stage, assetsReady, revealText }),
    [stage, assetsReady, revealText]
  );

  return <LoadStageContext.Provider value={value}>{children}</LoadStageContext.Provider>;
}

export function useLoadStage(): LoadStageValue {
  return useContext(LoadStageContext);
}
