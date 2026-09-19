"use client";

import CaseStudyShell, {
  C,
  CaseBody,
  CaseCard,
  CaseCardText,
  CaseChip,
  CaseEyebrow,
  CaseH2,
  CaseLabel,
  CaseSection,
} from "@/components/CaseStudyShell";
import type { CaseStudyTocItem } from "@/components/CaseStudyToc";
import type { Project } from "@/types/portfolio";
import { AceternityCTA, HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import { HeroMedia, MediaGallery } from "@/components/CaseMedia";

const GENERIC_TOC: CaseStudyTocItem[] = [
  { id: "overview", label: "Story" },
  { id: "problem", label: "Problem" },
  { id: "approach", label: "Approach" },
  { id: "outcomes", label: "Outcomes" },
  { id: "toolkit", label: "Toolkit" },
  { id: "credits", label: "Credits" },
  { id: "related", label: "Related" },
  { id: "contact", label: "Contact" },
];

/**
 * Figma-style case template for every project: single scroll, index nav,
 * same dark theme as the Millennium flagship — content from portfolio.json.
 */
export default function GenericCaseStudy({
  project,
  related,
}: {
  project: Project;
  related: Project[];
}) {
  const meta = [project.year, project.subtitle ?? project.dimension, project.client]
    .filter(Boolean)
    .join(" · ");
  const stats: string[] = [];
  if (project.views != null) stats.push(`${project.views} views`);
  if (project.appreciations != null) stats.push(`${project.appreciations} appreciations`);

  const toc = [
    ...GENERIC_TOC.slice(0, GENERIC_TOC.findIndex((t) => t.id === "toolkit")),
    ...(project.process?.length ? [{ id: "process", label: "Process" }] : []),
    { id: "toolkit", label: "Toolkit" },
    ...(project.quote ? [{ id: "reflection", label: "Reflection" }] : []),
    ...GENERIC_TOC.slice(GENERIC_TOC.findIndex((t) => t.id === "credits")),
  ];

  return (
    <CaseStudyShell project={project} related={related} tocItems={toc}>
      {/* STORY / HERO */}
      <section id="overview" className="scroll-mt-[88px] pb-12 md:pb-16">
        <CaseEyebrow>{meta}</CaseEyebrow>
        <h1
          className="mt-4 max-w-[20ch] font-display text-[32px] font-semibold leading-[1.05] tracking-[-0.03em] md:text-[52px]"
          style={{ fontFamily: "var(--font-display)", color: C.text }}
        >
          {project.title}
        </h1>
        <p className="mt-5 max-w-[65ch] text-[16px] leading-[1.7] md:text-[17px]" style={{ fontFamily: "var(--font-body)", color: "rgba(255,255,255,0.82)" }}>
          {project.description}
        </p>
        {project.blurb && project.blurb !== project.description ? (
          <p className="mt-3 max-w-[65ch] text-[15px] leading-[1.7]" style={{ color: C.muted }}>{project.blurb}</p>
        ) : null}

        <div className="mt-6 flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <CaseChip key={tag}>{tag}</CaseChip>
          ))}
        </div>

        <div className="mt-8">
          <HeroMedia project={project} />
        </div>
        {project.media ? <MediaGallery media={project.media} /> : null}
      </section>

      {/* PROBLEM */}
      <CaseSection id="problem">
        <CaseEyebrow>01 / PROBLEM & SCOPE</CaseEyebrow>
        <CaseH2>Why this needed to exist</CaseH2>
        <div className="mt-8">
          <CaseCard>
            <CaseLabel>Problem Statement</CaseLabel>
            <CaseCardText>{project.details.challenge}</CaseCardText>
          </CaseCard>
        </div>
      </CaseSection>

      {/* APPROACH */}
      <CaseSection id="approach">
        <CaseEyebrow>02 / APPROACH</CaseEyebrow>
        <CaseH2>How the work got done</CaseH2>
        <div className="mt-8">
          <CaseCard accent>
            <CaseLabel>Design Approach</CaseLabel>
            <CaseCardText>{project.details.approach}</CaseCardText>
          </CaseCard>
        </div>
      </CaseSection>

      {/* OUTCOMES */}
      <CaseSection id="outcomes">
        <CaseEyebrow>03 / OUTCOMES</CaseEyebrow>
        <CaseH2>What changed once it shipped</CaseH2>
        <div className="mt-8">
          <CaseCard>
            <CaseLabel>Result</CaseLabel>
            <CaseCardText>{project.details.result}</CaseCardText>
          </CaseCard>
        </div>
      </CaseSection>

      {/* PROCESS */}
      {project.process?.length ? (
        <CaseSection id="process">
          <CaseEyebrow>04 / DESIGN PROCESS</CaseEyebrow>
          <CaseH2>How the work got done</CaseH2>
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {project.process.map((phase) => (
              <CaseCard key={phase.phase}>
                <CaseLabel>{phase.phase}</CaseLabel>
                <p
                  className="mb-2 font-display text-[17px] font-semibold"
                  style={{ fontFamily: "var(--font-display)", color: C.text }}
                >
                  {phase.name}
                </p>
                <CaseCardText>{phase.body}</CaseCardText>
              </CaseCard>
            ))}
          </div>
        </CaseSection>
      ) : null}

      {/* TOOLKIT */}
      <CaseSection id="toolkit">
        <CaseEyebrow>{project.process?.length ? "05" : "04"} / TOOLKIT</CaseEyebrow>
        <CaseH2>What it was made with</CaseH2>
        <div className="mt-6 flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <CaseChip key={tag}>{tag}</CaseChip>
          ))}
        </div>
        <CaseBody>
          {project.year} · {project.dimension}{project.client ? ` · Built for ${project.client}` : ""}
          {stats.length ? ` · ${stats.join(" · ")}` : ""}.
        </CaseBody>
      </CaseSection>

      {/* REFLECTION */}
      {project.quote ? (
        <CaseSection id="reflection">
          <CaseEyebrow>{project.process?.length ? "06" : "05"} / REFLECTION</CaseEyebrow>
          <CaseH2>Looking back</CaseH2>
          <blockquote
            className="mt-6 max-w-[52ch] font-display text-[20px] font-medium leading-[1.5] md:text-[22px]"
            style={{ fontFamily: "var(--font-display)", color: C.text }}
          >
            {project.quote}
          </blockquote>
          <div className="mt-8 flex flex-wrap gap-3">
            {project.url ? <AceternityCTA href={project.url}>View on Behance</AceternityCTA> : null}
            <HoverBorderGradient as="a" href="/projects">
              More projects
            </HoverBorderGradient>
          </div>
        </CaseSection>
      ) : null}

      {/* CREDITS */}
      <CaseSection id="credits">
        <CaseEyebrow>
          {project.process?.length && project.quote ? "07" : project.process || project.quote ? "06" : "05"} / CREDITS
        </CaseEyebrow>
        <CaseH2>One last thing</CaseH2>
        <CaseBody>
          {project.client
            ? `Designed for ${project.client} — ${project.blurb}`
            : project.blurb}
        </CaseBody>
        <div className="mt-8 flex flex-wrap gap-3">
          {project.url ? <AceternityCTA href={project.url}>View on Behance</AceternityCTA> : null}
          <HoverBorderGradient as="a" href="/projects">
            More projects
          </HoverBorderGradient>
        </div>
      </CaseSection>
    </CaseStudyShell>
  );
}
