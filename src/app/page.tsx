"use client";

import { useEffect } from "react";
import Nav from "@/components/Nav";
import BottomNav from "@/components/BottomNav";
import HeroStage from "@/components/HeroStage";
import ProjectsSection from "@/components/sections/ProjectsSection";
import AboutSection from "@/components/sections/AboutSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import ContactSection from "@/components/sections/ContactSection";
import data from "@/data/portfolio.json";
import { THEMES, type ThemeId } from "@/data/themes";
import { useActiveSection } from "@/hooks/useActiveSection";
import { usePerception } from "@/context/PerceptionContext";

type IslandId = ThemeId;

const ORDER: IslandId[] = ["xr", "ux", "ai", "product"];

export default function Home() {
  const { activeId, baseId, overlayId, setActiveId } = usePerception();

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

  // keyboard arrows for perception — also triggers global wave + scroll
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;
      const idx = ORDER.indexOf(activeId);
      if (e.key === "ArrowRight") {
        const next = ORDER[(idx + 1) % ORDER.length];
        window.dispatchEvent(new CustomEvent("perception:switch", { detail: { id: next } }));
        setActiveId(next);
      }
      if (e.key === "ArrowLeft") {
        const next = ORDER[(idx - 1 + ORDER.length) % ORDER.length];
        window.dispatchEvent(new CustomEvent("perception:switch", { detail: { id: next } }));
        setActiveId(next);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [activeId, setActiveId]);

  return (
    <>
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

      <BottomNav theme={theme} />
    </>
  );
}
