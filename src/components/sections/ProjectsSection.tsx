"use client";

import type { ThemeId } from "@/data/themes";
import { THEMES } from "@/data/themes";
import ProjectsCarousel from "../ProjectsCarousel";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";

type Project = {
  id: string;
  title: string;
  perception: ThemeId;
  dimension: string;
  subtitle?: string;
  year: string;
  color: string;
  image: string;
  imageAlt: string;
};

export default function ProjectsSection({ activeId, projects }: { activeId: ThemeId; projects: Project[] }) {
  const theme = THEMES[activeId];
  const count = projects.filter((p) => p.perception === activeId).length;

  // multi-perception tint — subtle blend of all washes
  const multiWash = `linear-gradient(135deg, ${THEMES.xr.wash}14 0%, ${THEMES.ux.wash}14 28%, ${THEMES.ai.wash}14 56%, ${THEMES.product.wash}14 84%, transparent 100%)`;

  return (
    <section id="projects" className="relative bg-[#fafaf9]">
      <div aria-hidden className="pointer-events-none absolute inset-0" style={{ background: multiWash, opacity: 0.7 }} />
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-[96px]" style={{ background: `linear-gradient(to bottom, ${theme.wash}10 0%, transparent 100%)` }} />

      {/* <div className="relative mx-auto max-w-[1280px] px-6 md:px-8">
        <div className="py-12 md:py-16 lg:py-20">
          <div className="flex items-baseline justify-between gap-4">
            <h2
              className="font-display text-[24px] font-semibold leading-[0.95] tracking-[-0.03em] md:text-[28px]"
              style={{ fontFamily: "var(--font-display)", color: "#111827" }}
            >
              Projects
            </h2>
            <HoverBorderGradient as="a" href="/projects" className="text-[11px]">
              View all →
            </HoverBorderGradient>
          </div>
          <p className="mt-3 max-w-[520px] text-[13px] leading-[1.6] text-zinc-500">Featured work for {activeId.toUpperCase()} — curated, not exhaustive.</p>
        </div>
      </div> */}

      {/* featured — full viewport */}
      <div className="relative w-screen max-w-[2440px] mx-auto pb-8 md:pb-12">
        <ProjectsCarousel activeId={activeId} projects={projects} />
      </div>


    </section>
  );
}
