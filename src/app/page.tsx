"use client";

import { useEffect, useState } from "react";
import Nav from "@/components/Nav";
import BottomNav from "@/components/BottomNav";
import IslandNav from "@/components/IslandNav";
import HeroStage from "@/components/HeroStage";
import ThemeWave from "@/components/ThemeWave";
import ProjectsSection from "@/components/sections/ProjectsSection";
import AboutSection from "@/components/sections/AboutSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import ContactSection from "@/components/sections/ContactSection";
import data from "@/data/portfolio.json";
import { THEMES, type ThemeId } from "@/data/themes";
import { useActiveSection } from "@/hooks/useActiveSection";

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

  const projects = (data as unknown as {
    projects: Array<{
      id: string;
      title: string;
      perception: ThemeId;
      dimension: string;
      subtitle?: string;
      year: string;
      color: string;
      image: string;
      imageAlt: string;
    }>
  }).projects ?? [];

  const testimonials = (data as unknown as { testimonials: Array<{ quote: string; author: string; role: string; year: string }> }).testimonials ?? [];

  const theme = THEMES[activeId];
  const activeSection = useActiveSection(["hero", "projects", "testimonials", "about", "contact"]);

  // trigger wave on change
  useEffect(() => {
    if (activeId !== baseId && !overlayId) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setOverlayId(activeId);
    } else if (activeId !== baseId && overlayId && overlayId !== activeId) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setOverlayId(activeId);
    }
  }, [activeId, baseId, overlayId]);

  const handleWaveDone = () => {
    if (overlayId) {
      setBaseId(overlayId);
      setOverlayId(null);
    }
  };

  // keyboard arrows for perception
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;
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

      <Nav theme={theme} activeSection={activeSection} />

      <main>
        <section id="hero" className="relative">
          <HeroStage activeId={activeId} baseId={baseId} overlayId={overlayId} islands={islands} />
        </section>

        <ProjectsSection activeId={activeId} projects={projects} />

        <AboutSection activeId={activeId} profile={data.profile} />

        <TestimonialsSection activeId={activeId} testimonials={testimonials} />

        <ContactSection
          activeId={activeId}
          email={data.profile.email}
          location={data.profile.location}
          availability={data.profile.availability}
          socials={data.socials}
        />
      </main>

      <BottomNav theme={theme} activeSection={activeSection} />
      <IslandNav activeId={activeId} onSelect={setActiveId} theme={theme} />
    </>
  );
}
