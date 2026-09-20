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
import { PROJECT_MEDIA } from "@/data/projects-media";
import { visibleProjects } from "@/data/project-tiers";
import type { Island, Project, Recognition, Testimonial } from "@/types/portfolio";

const ORDER: ThemeId[] = ["xr", "ux", "ai", "product"];

export default function Home() {
  const { activeId, baseId, overlayId, setActiveId } = usePerception();

  const projects = visibleProjects(data.projects as Project[]);
  const islands = (data.islands as Island[]).map((island) => {
    const featured = projects.find((p) => p.perception === island.id);
    if (!featured) return island;

    const heroContent: Record<string, { title: string; subtitle: string; stat: string }> = {
      xr: {
        title: "Spatial worlds that feel inevitable",
        subtitle: "I design XR experiences — hand-tracked flows, spatial interfaces, immersive environments — that vanish into the task. 20+ products shipped across healthcare, enterprise, and education.",
        stat: "05 Immersive builds",
      },
      ux: {
        title: "Human flows that just work",
        subtitle: "Research-driven UX for complex systems — AI dashboards, conversational interfaces, VR training. I turn fragmented workflows into coherent experiences people trust.",
        stat: "05 Research-led ships",
      },
      ai: {
        title: "Intelligence made kind",
        subtitle: "Conversational agents, generative systems, adaptive UX — I design AI that explains itself, earns trust, and amplifies human judgment instead of replacing it.",
        stat: "02 Intelligent systems",
      },
      product: {
        title: "Products people trust",
        subtitle: "End-to-end product design — strategy, systems, shipping. From fintech dashboards to mobile games, I own the full lifecycle from insight to launch.",
        stat: "02 Shipped products",
      },
    };

    const content = heroContent[island.id] ?? {
      title: island.title,
      subtitle: island.description,
      stat: island.stat,
    };

    const media = PROJECT_MEDIA[featured.id];

    return {
      ...island,
      image: featured.image,
      imageAlt: featured.imageAlt,
      // Stand-in: always play the Ascension Realty reel as the homepage hero
      // background, regardless of the active perception. Replace per-island later.
      video: "/videos/ascension-realty.mp4",
      videoPoster: media?.heroVideoPoster ?? media?.images?.[0]?.src ?? undefined,
      title: content.title,
      subtitle: content.subtitle,
      description: "",
      stat: content.stat,
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
      }
      if (e.key === "ArrowLeft") {
        const next = ORDER[(idx - 1 + ORDER.length) % ORDER.length];
        window.dispatchEvent(new CustomEvent("perception:switch", { detail: { id: next } }));
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [activeId, setActiveId]);

  return (
    <>
      <Nav theme={theme} activeSection={activeSection} revealDelay={2400} />

      <main>
        <section id="hero" className="relative">
          <HeroStage
            baseId={baseId}
            overlayId={overlayId}
            islands={islands}
          />
        </section>

        <ManifestoSection activeId={activeId} />

        <ProjectsSection activeId={activeId} projects={projects} />

        <AboutSection activeId={activeId} />

        <TestimonialsSection activeId={activeId} testimonials={data.testimonials as Testimonial[]} />

        <ProofSection
          activeId={activeId}
          clients={data.clients}
          recognition={data.about.recognition as Recognition[]}
        />

        <ContactSection activeId={activeId} />
      </main>

      <BottomNav theme={theme} />
    </>
  );
}
