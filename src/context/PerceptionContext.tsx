"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import type { ThemeId } from "@/data/themes";

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
  // Legacy transition machinery — inert on the new landing (hero lens is
  // local state) but kept for the /projects lens flow.
  useEffect(() => {
    /* eslint-disable react-hooks/set-state-in-effect */
    if (activeId !== baseId && !overlayId) {
      setOverlayId(activeId);
    } else if (activeId !== baseId && overlayId && overlayId !== activeId) {
      setOverlayId(activeId);
    }
    /* eslint-enable react-hooks/set-state-in-effect */
  }, [activeId, baseId, overlayId]);

  const handleWaveDone = () => {
    if (overlayId) {
      setBaseId(overlayId);
      setOverlayId(null);
    }
  };

  return (
    <PerceptionContext.Provider value={{ activeId, baseId, overlayId, setActiveId, setBaseId, setOverlayId }}>
      {children}
      {/* ThemeWave rendered globally but only visible on home */}
      {/* We can render it here and let it handle overlayId */}
      {/* Import dynamically to avoid circular */}
      <PerceptionWaveHandler onDone={handleWaveDone} />
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
