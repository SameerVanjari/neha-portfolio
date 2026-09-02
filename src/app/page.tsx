"use client";

import { useEffect, useState } from "react";
import Nav from "@/components/Nav";
import IslandNav from "@/components/IslandNav";
import HeroStage from "@/components/HeroStage";
import ThemeWave from "@/components/ThemeWave";
import data from "@/data/portfolio.json";
import { THEMES, type ThemeId } from "@/data/themes";

type IslandId = ThemeId;

const ORDER: IslandId[] = ["xr", "ux", "ai", "product"];

export default function Home() {
  const [activeId, setActiveId] = useState<IslandId>("xr");
  const [baseId, setBaseId] = useState<IslandId>("xr");
  const [overlayId, setOverlayId] = useState<IslandId | null>(null);

  const islands = data.islands as unknown as Array<{
    id: IslandId;
    label: string;
    title: string;
    subtitle: string;
    color: string;
    description: string;
    image: string;
    imageAlt: string;
    stat: string;
  }>;

  const activeIsland = islands.find((i) => i.id === activeId) ?? islands[0];
  const theme = THEMES[activeId];

  // trigger wave on change
  useEffect(() => {
    if (activeId !== baseId && !overlayId) {
      setOverlayId(activeId);
    } else if (activeId !== baseId && overlayId && overlayId !== activeId) {
      // interrupt: directly swap overlay to new target
      setOverlayId(activeId);
    }
  }, [activeId, baseId, overlayId]);

  const handleWaveDone = () => {
    if (overlayId) {
      setBaseId(overlayId);
      setOverlayId(null);
    }
  };

  // keyboard arrows
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const idx = ORDER.indexOf(activeId);
      if (e.key === "ArrowRight") setActiveId(ORDER[(idx + 1) % ORDER.length]);
      if (e.key === "ArrowLeft") setActiveId(ORDER[(idx - 1 + ORDER.length) % ORDER.length]);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [activeId]);

  return (
    <>
      <ThemeWave baseId={baseId} overlayId={overlayId} onOverlayDone={handleWaveDone} />

      <Nav theme={theme} />

      <main className="h-[100dvh] max-h-[100dvh] overflow-hidden">
        <HeroStage activeId={activeId} baseId={baseId} overlayId={overlayId} islands={islands} />
      </main>

      <IslandNav activeId={activeId} onSelect={setActiveId} theme={theme} />
    </>
  );
}
