"use client";

import Link from "next/link";
import Nav from "@/components/Nav";
import type { Theme } from "@/data/themes";
import type { Project } from "@/types/portfolio";
import ContactCard from "@/components/ContactCard";
import { editorialContentFor, type EditorialContent, type EditorialVisual } from "@/data/editorial-content";

/**
 * Editorial case-study layout — shared skeleton for all projects.
 * Cream paper, serif display, mono eyebrows, numbered sections,
 * phases / THE TURN / statics + mobile / diamond outcomes / reflection.
 * Per-project copy and visuals come from editorial-content.ts.
 */

/* Editorial palette, sampled from the reference layout */
const P = {
  bg: "#F2EEE6",
  ink: "#16161E",
  muted: "#71716D",
  faint: "#A3A099",
  hairline: "#DDD6CA",
  accent: "#35339E",
} as const;

/* Light theme for the shared Nav */
const EDITORIAL_THEME: Theme = {
  id: "product",
  accent: P.accent,
  accentStrong: "#2A2878",
  bg: P.bg,
  bgGradient: P.bg,
  wash: P.bg,
  glow: "rgba(53,51,158,0.14)",
  text: P.ink,
  muted: P.muted,
  faint: P.hairline,
  border: "rgba(22,22,30,0.10)",
  surface: "#FFFFFF",
  islandBg: "rgba(18,18,22,0.92)",
  islandBorder: "rgba(255,255,255,0.10)",
  islandIconIdle: "rgba(255,255,255,0.52)",
};

const serif = { fontFamily: "var(--font-serif)" } as const;
const sans = { fontFamily: "var(--font-body)" } as const;

/**
 * Image in a white frame; the frame's height adapts to the image's natural
 * full length (no forced ratio). Captions sit OUTSIDE the white container,
 * on the page background.
 */
function EditorialImg({ src, alt, caption, className = "" }: { src: string; alt: string; caption?: string; className?: string }) {
  return (
    <figure className={className}>
      <div className="overflow-hidden bg-white" style={{ background: "#FFFFFF" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={alt}
          loading="lazy"
          className="block h-auto w-full"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = "/placeholder.svg";
          }}
        />
      </div>
      {caption ? (
        <figcaption className="mt-3 text-[11px] leading-[1.5]" style={{ color: P.muted, background: "transparent" }}>
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}

function SectionHead({ n, label }: { n: string; label: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-[11px] font-semibold tracking-[0.14em]" style={{ color: P.ink, ...sans }}>
        {n}
      </span>
      <span className="h-px w-10" style={{ background: P.hairline }} />
      <span className="text-[11px] font-semibold uppercase tracking-[0.22em]" style={{ color: P.muted, ...sans }}>
        {label}
      </span>
    </div>
  );
}

function MetaChip({ label, value }: { label: string; value: string }) {
  return (
    <span
      className="inline-flex items-baseline gap-2 rounded-[3px] border px-3 py-[7px] text-[10.5px]"
      style={{ borderColor: P.hairline, background: "#FBF8F2", ...sans }}
    >
      <span className="font-semibold tracking-[0.06em]" style={{ color: P.ink }}>
        {label}
      </span>
      <span style={{ color: P.muted }}>{value}</span>
    </span>
  );
}

/** Fallback so ANY project renders into the template from its existing fields. */
function defaultContentFor(project: Project): EditorialContent {
  const gallery = project.images ?? [];
  const firstVisual: EditorialVisual | undefined = gallery[0]
    ? { src: gallery[0], alt: project.imageAlt }
    : project.image
      ? { src: project.image, alt: project.imageAlt }
      : undefined;
  return {
    category: project.subtitle || project.dimension,
    title: project.title.split(" — ")[0],
    description: project.blurb,
    meta: {
      role: "Design & Experience",
      client: project.client ?? undefined,
      timeline: project.year,
      tools: project.tags,
    },
    overview: project.description || project.blurb,
    problem: {
      quote: "The problem worth solving",
      body: project.details?.challenge ?? "",
      visual: firstVisual,
    },
    phases: [],
    turn: { left: "ACT I — THE PROBLEM", right: "ACT II — THE SOLUTION" },
    finalDesign: {
      statics: gallery.slice(1, 3).map((src) => ({ src, alt: project.imageAlt })),
      mobile: gallery[3] ? { src: gallery[3], alt: project.imageAlt } : undefined,
    },
    outcomes: project.details?.result ? [project.details.result] : [],
    reflection: project.blurb,
  };
}

export default function EditorialCaseStudy({ project }: { project: Project }) {
  const content =
    editorialContentFor(project) ?? defaultContentFor(project);

  const images = content.finalDesign;

  return (
    <>
      <Nav theme={EDITORIAL_THEME} activeSection="projects" />
      <main className="min-h-screen" style={{ background: P.bg, color: P.ink }}>
        <div className="mx-auto max-w-[880px] px-6 pb-28 md:px-8">
          {/* Back link */}
          <div className="pt-[92px]">
            <Link
              href="/projects"
              className="text-[11px] tracking-[0.14em] hover:opacity-70"
              style={{ color: P.muted, ...sans }}
            >
              ← All work
            </Link>
          </div>

          {/* Header */}
          <header className="pt-8">
            <p className="text-[11px] uppercase tracking-[0.22em]" style={{ color: P.muted, ...sans }}>
              {content.category}
            </p>
            <h1
              className="mt-3 max-w-[16ch] text-[40px] font-medium leading-[1.05] tracking-[-0.01em] md:text-[56px]"
              style={{ ...serif, color: P.ink }}
            >
              {content.title ?? project.title.split(" — ")[0]}
            </h1>
            <p className="mt-4 max-w-[58ch] text-[17px] leading-[1.65]" style={{ color: P.muted, ...sans }}>
              {content.description || project.blurb}
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {content.meta.role ? <MetaChip label="Role" value={content.meta.role} /> : null}
              {content.meta.timeline ? <MetaChip label="Timeline" value={content.meta.timeline} /> : null}
              {content.meta.tools?.length ? <MetaChip label="Tools" value={content.meta.tools.join(", ")} /> : null}
            </div>
          </header>

          {/* Hero visual */}
          <div className="mt-10">
            <EditorialImg src={project.image} alt={project.imageAlt} />
          </div>

          {/* 01 — OVERVIEW */}
          <section className="mt-16 md:mt-20">
            <SectionHead n="01" label="Overview" />
            <p className="mt-5 max-w-[66ch] text-[16px] leading-[1.75]" style={{ color: P.ink, ...sans }}>
              {content.overview || project.description}
            </p>
          </section>

          {/* 02 — THE PROBLEM */}
          <section className="mt-16 md:mt-20">
            <SectionHead n="02" label="The Problem" />
            <h2
              className="mt-6 max-w-[28ch] text-[30px] font-medium italic leading-[1.15] md:text-[40px]"
              style={{ ...serif, color: P.ink }}
            >
              “{content.problem.quote}”
            </h2>
            <p className="mt-5 max-w-[66ch] text-[16px] leading-[1.75]" style={{ color: P.ink, ...sans }}>
              {content.problem.body}
            </p>
            {content.problem.visual ? (
              <div className="mt-8">
                <EditorialImg
                  src={content.problem.visual.src}
                  alt={content.problem.visual.alt}
                  caption={content.problem.visual.caption}
                />
              </div>
            ) : null}
          </section>

          {/* 03 — SCOPE & ROLE */}
          <section className="mt-16 md:mt-20">
            <SectionHead n="03" label="Scope & Role" />
            <dl className="mt-6 max-w-[560px]">
              {(
                [
                  ["Role", content.scope?.role ?? content.meta.role],
                  ["Client", content.scope?.client ?? content.meta.client],
                  ["Team", content.scope?.team ?? content.meta.team],
                  ["Timeline", content.scope?.timeline ?? content.meta.timeline],
                ] as const
              )
                .filter(([, v]) => Boolean(v))
                .map(([label, value]) => (
                  <div
                    key={label}
                    className="grid grid-cols-[110px_1fr] items-baseline gap-4 border-t py-3 last:border-b"
                    style={{ borderColor: P.hairline }}
                  >
                    <dt className="text-[10.5px] font-semibold uppercase tracking-[0.18em]" style={{ color: P.muted, ...sans }}>
                      {label}
                    </dt>
                    <dd className="text-[13.5px]" style={{ color: P.ink, ...sans }}>
                      {value}
                    </dd>
                  </div>
                ))}
            </dl>
          </section>

          {/* 04 — DESIGN PROCESS */}
          {content.phases.length > 0 ? (
          <section className="mt-16 md:mt-20">
            <SectionHead n="04" label="Design Process" />
            <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {content.phases.map((phase, i) => (
                <div key={phase.title}>
                  <p className="text-[10.5px] font-semibold uppercase tracking-[0.18em]" style={{ color: P.accent, ...sans }}>
                    {`Phase ${i + 1}`}
                  </p>
                  <div className="mt-2 flex items-center gap-2 leading-none">
                    <span className="text-[12px]" style={{ color: P.accent }}>◆</span>
                    <h3 className="text-[20px] font-medium tracking-[-0.01em]" style={{ ...serif, color: P.ink }}>
                      {phase.title}
                    </h3>
                  </div>
                  <p className="mt-2 text-[13px] leading-[1.6]" style={{ color: P.muted, ...sans }}>
                    {phase.body}
                  </p>
                  {phase.visual ? (
                    <EditorialImg
                      src={phase.visual.src}
                      alt={phase.visual.alt}
                      caption={phase.visual.caption}
                      className="mt-3"
                    />
                  ) : null}
                </div>
              ))}
            </div>
          </section>
          ) : null}

          {/* THE TURN */}
          <div className="mt-16 md:mt-20">
            <div className="flex items-start justify-between gap-4">
              <p className="pt-3 text-[10.5px] uppercase tracking-[0.18em]" style={{ color: P.faint, ...sans }}>
                {content.turn.left}
              </p>
              <div className="flex flex-col items-center">
                <span
                  className="flex h-12 w-12 items-center justify-center rounded-full border"
                  style={{ borderColor: P.hairline, background: "#FFFFFF", color: P.accent }}
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden>
                    <path d="M8 1l7 7-7 7L1 8z" />
                  </svg>
                </span>
                <span className="mt-2 text-[10px] font-semibold uppercase tracking-[0.22em]" style={{ color: P.muted, ...sans }}>
                  The Turn
                </span>
              </div>
              <p className="pt-3 text-right text-[10.5px] uppercase tracking-[0.18em]" style={{ color: P.faint, ...sans }}>
                {content.turn.right}
              </p>
            </div>
          </div>

          {/* 05 — FINAL DESIGN */}
          <section className="mt-16 md:mt-20">
            <SectionHead n="05" label="Final Design" />
            <div className="mt-8 grid gap-6 md:grid-cols-2 md:gap-8">
              {images.statics?.map((v) => (
                <EditorialImg key={v.src} src={v.src} alt={v.alt} caption={v.caption} />
              ))}
            </div>
            {images.mobile ? (
              <div className="mt-6 w-full md:mt-8 md:w-1/2">
                <EditorialImg
                  src={images.mobile.src}
                  alt={images.mobile.alt}
                  caption={images.mobile.caption}
                  className="max-w-[320px]"
                />
              </div>
            ) : null}
          </section>

          {/* 06 — OUTCOMES */}
          <section className="mt-16 md:mt-20">
            <SectionHead n="06" label="Outcomes" />
            <ul className="mt-6 max-w-[640px]">
              {(content.outcomes.length ? content.outcomes : [project.details?.result]).filter(Boolean).map((o) => (
                <li
                  key={o}
                  className="flex items-start gap-3 border-t py-3.5 text-[14px] leading-[1.65] last:border-b"
                  style={{ borderColor: P.hairline, color: P.ink, ...sans }}
                >
                  <span className="mt-[3px] text-[11px]" style={{ color: P.accent }} aria-hidden>
                    ◆
                  </span>
                  {o}
                </li>
              ))}
            </ul>
          </section>

          {/* 07 — REFLECTION */}
          <section className="mt-16 md:mt-20">
            <SectionHead n="07" label="Reflection" />
            <p
              className="mt-6 max-w-[60ch] border-l-2 pl-5 text-[16px] italic leading-[1.7]"
              style={{ borderColor: P.accent, color: P.ink, ...serif }}
            >
              {content.reflection}
            </p>
          </section>

          {/* Next project */}
          <section className="mt-24 border-t pt-10" style={{ borderColor: P.hairline }}>
            <p className="text-[10.5px] uppercase tracking-[0.22em]" style={{ color: P.muted, ...sans }}>
              Next project
            </p>
            <Link
              href="/projects"
              className="group mt-3 flex items-baseline justify-between gap-6"
            >
              <span
                className="text-[24px] font-medium tracking-[-0.01em] group-hover:opacity-70"
                style={{ ...serif, color: P.ink }}
              >
                View all projects
              </span>
              <span className="text-[11px] tracking-[0.14em]" style={{ color: P.muted, ...sans }}>
                ← back
              </span>
            </Link>
          </section>

          {/* Contact */}
          <section className="mt-16">
            <ContactCard />
          </section>
        </div>
      </main>
    </>
  );
}
