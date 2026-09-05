"use client";

import type { ThemeId } from "@/data/themes";
import { THEMES } from "@/data/themes";
import ProjectsCarousel from "../ProjectsCarousel";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import type { Project } from "@/types/portfolio";

export default function ProjectsSection({ activeId, projects }: { activeId: ThemeId; projects: Project[] }) {
  const theme = THEMES[activeId];
  const count = projects.filter((p) => p.perception === activeId).length;
  const multiWash = `linear-gradient(135deg, ${THEMES.xr.wash}14 0%, ${THEMES.ux.wash}14 28%, ${THEMES.ai.wash}14 56%, ${THEMES.product.wash}14 84%, transparent 100%)`;

  return (
    <section id="projects" className="relative bg-[#fafaf9]">
      <div aria-hidden className="pointer-events-none absolute inset-0" style={{ background: multiWash, opacity: 0.7 }} />
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-[96px]" style={{ background: `linear-gradient(to bottom, ${theme.wash}10 0%, transparent 100%)` }} />

      <div className="relative mx-auto max-w-[1280px] px-6 md:px-8">
        <div className="flex items-end justify-between gap-4 pt-10 md:pt-14">
          <div>
            <h2
              className="font-display text-[22px] font-semibold leading-[0.95] tracking-[-0.03em] md:text-[26px]"
              style={{ fontFamily: "var(--font-display)", color: "#111827" }}
            >
              Work
            </h2>
            <p className="mt-2 max-w-[480px] text-[13px] leading-[1.6] text-zinc-500">
              {count.toString().padStart(2, "0")} {activeId.toUpperCase()} {count === 1 ? "project" : "projects"} — open a case for challenge, approach, result.
            </p>
          </div>
          <HoverBorderGradient as="a" href="/projects" className="text-[11px] shrink-0">
            View all
          </HoverBorderGradient>
        </div>
      </div>

      <div className="relative mx-auto w-screen max-w-[2440px] pb-8 pt-4 md:pb-12">
        <ProjectsCarousel activeId={activeId} projects={projects} />
      </div>
    </section>
  );
}
