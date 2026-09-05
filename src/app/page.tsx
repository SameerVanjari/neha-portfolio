"use client";

import { useEffect } from "react";
import Nav from "@/components/Nav";
import BottomNav from "@/components/BottomNav";
import HeroStage from "@/components/HeroStage";
import ManifestoSection from "@/components/sections/ManifestoSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import AboutSection from "@/components/sections/AboutSection";
import ProofSection from "@/components/sections/ProofSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import ContactSection from "@/components/sections/ContactSection";
import data from "@/data/portfolio.json";
import { THEMES, type ThemeId } from "@/data/themes";
import { useActiveSection } from "@/hooks/useActiveSection";
import { usePerception } from "@/context/PerceptionContext";
import type { Island, Project, Recognition, Testimonial } from "@/types/portfolio";

const ORDER: ThemeId[] = ["xr", "ux", "ai", "product"];

export default function Home() {
  const { activeId, baseId, overlayId, setActiveId } = usePerception();

  const projects = data.projects as Project[];
  const islands = (data.islands as Island[]).map((island) => {
    const featured = projects.find((p) => p.perception === island.id);
    if (!featured) return island;
    const overlayTitle: Record<string, string> = {
      visagenie: "VisaGenie",
      "ar-real-estate": "AR Real Estate",
      "interactive-3d": "Interactive 3D",
      "iot-vr-game": "IoT VR Game",
    };
    return {
      ...island,
      image: featured.image,
      imageAlt: featured.imageAlt,
      title: overlayTitle[featured.id] ?? featured.title.split(":")[0],
      subtitle: island.label,
      description: "",
      stat: featured.client ? `${featured.client}, ${featured.year}` : featured.year,
    };
  });

  const theme = THEMES[activeId];
  const activeSection = useActiveSection(["hero", "manifesto", "projects", "about", "testimonials", "proof", "contact"]);

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
          <HeroStage
            activeId={activeId}
            baseId={baseId}
            overlayId={overlayId}
            islands={islands}
          />
        </section>

        <ManifestoSection activeId={activeId} />

        <ProjectsSection activeId={activeId} projects={projects} />

        <AboutSection activeId={activeId} profile={data.profile} />

        <TestimonialsSection activeId={activeId} testimonials={data.testimonials as Testimonial[]} />

        <ProofSection
          activeId={activeId}
          clients={data.clients}
          recognition={data.about.recognition as Recognition[]}
        />

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
