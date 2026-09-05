"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { THEMES, type ThemeId } from "@/data/themes";

type PerceptionContextType = {
  activeId: ThemeId;
  baseId: ThemeId;
  overlayId: ThemeId | null;
  setActiveId: (id: ThemeId) => void;
  setBaseId: (id: ThemeId) => void;
  setOverlayId: (id: ThemeId | null) => void;
};

const PerceptionContext = createContext<PerceptionContextType | null>(null);

export function usePerception() {
  const ctx = useContext(PerceptionContext);
  if (!ctx) throw new Error("usePerception must be used within PerceptionProvider");
  return ctx;
}

export function PerceptionProvider({ children }: { children: React.ReactNode }) {
  const [activeId, setActiveId] = useState<ThemeId>("xr");
  const [baseId, setBaseId] = useState<ThemeId>("xr");
  const [overlayId, setOverlayId] = useState<ThemeId | null>(null);

  // trigger wave when activeId changes (mimic home logic)
  useEffect(() => {
    if (activeId !== baseId && !overlayId) {
      setOverlayId(activeId);
    } else if (activeId !== baseId && overlayId && overlayId !== activeId) {
      setOverlayId(activeId);
    }
  }, [activeId, baseId, overlayId]);

  const handleWaveDone = () => {
    if (overlayId) {
      setBaseId(overlayId);
      setOverlayId(null);
    }
  };

  // expose for IslandNav to use via context
  // we also need a method for switching perception from anywhere with transition
  // This will be used by GlobalIslandNav
  return (
    <PerceptionContext.Provider value={{ activeId, baseId, overlayId, setActiveId, setBaseId, setOverlayId }}>
      {children}
      {/* ThemeWave rendered globally but only visible on home */}
      {/* We can render it here and let it handle overlayId */}
      {/* Import dynamically to avoid circular */}
      <PerceptionWaveHandler onDone={handleWaveDone} />
      <GlobalIslandNav />
    </PerceptionContext.Provider>
  );
}

function PerceptionWaveHandler({ onDone }: { onDone: () => void }) {
  const { baseId, overlayId } = usePerception();
  const pathname = usePathname();
  // Only show wave on home
  if (pathname !== "/") return null;
  // lazy import ThemeWave to avoid extra bundle on other pages
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const ThemeWave = require("@/components/ThemeWave").default as typeof import("@/components/ThemeWave").default;
  return <ThemeWave baseId={baseId} overlayId={overlayId} onOverlayDone={onDone} />;
}

function GlobalIslandNav() {
  const { activeId, setActiveId } = usePerception();
  const router = useRouter();
  const pathname = usePathname();
  const theme = THEMES[activeId];

  const handleSelect = (id: ThemeId) => {
    if (id === activeId) {
      // same perception — just scroll to top with transition if needed
      window.dispatchEvent(new CustomEvent("perception:switch", { detail: { id } }));
      window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
      if (pathname !== "/") {
        setActiveId(id);
        router.push("/");
      }
      return;
    }

    // Trigger page-change transition (Barba mask) for all switches — works from anywhere
    window.dispatchEvent(new CustomEvent("perception:switch", { detail: { id } }));
    setActiveId(id);

    if (pathname !== "/") {
      // navigate home — BarbaProvider will also scroll to top, but we ensure it while overlay covers
      router.push("/");
      setTimeout(() => {
        window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
      }, 60);
    } else {
      // on home, scroll to top (Barba handler already does instant scroll while overlay covers)
      // fallback ensure
      setTimeout(() => {
        window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
      }, 80);
    }
  };

  const IslandNav = require("@/components/IslandNav").default as typeof import("@/components/IslandNav").default;
  return <IslandNav activeId={activeId} onSelect={handleSelect} theme={theme} />;
}
