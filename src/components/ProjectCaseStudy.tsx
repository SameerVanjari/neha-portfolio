"use client";

import Link from "next/link";
import Nav from "@/components/Nav";
import CaseStudyToc, { CASE_STUDY_SECTIONS } from "@/components/CaseStudyToc";
import { THEMES } from "@/data/themes";
import type { Project } from "@/types/portfolio";
import { AceternityCTA, HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import data from "@/data/portfolio.json";

export default function ProjectCaseStudy({ project, related }: { project: Project; related: Project[] }) {
  const theme = THEMES[project.perception];
  const tocIds = CASE_STUDY_SECTIONS.map((s) => s.id).filter((id) => id !== "related" || related.length > 0);
  const meta = [project.year, project.subtitle ?? project.dimension, project.client].filter(Boolean).join(" · ");

  return (
    <>
      <Nav theme={theme} activeSection="projects" />
      <main className="pt-[64px]" style={{ background: `linear-gradient(180deg, ${theme.wash}22 0%, transparent 28%)` }}>
        <div className="mx-auto max-w-[1280px] px-6 md:px-8">
          <div className="h-px w-full" style={{ background: theme.border }} />
          <div className="py-6 md:py-8">
            <Link href="/projects" className="font-mono text-[11px] tracking-[0.14em] text-zinc-500 hover:text-zinc-800">
              ← All work
            </Link>
          </div>

          <div className="lg:grid lg:grid-cols-[220px_minmax(0,1fr)] lg:items-start lg:gap-12 xl:grid-cols-[240px_minmax(0,1fr)] xl:gap-16">
            <div className="mb-10 lg:sticky lg:top-[88px] lg:mb-0 lg:self-start">
              <CaseStudyToc ids={tocIds} theme={theme} />
            </div>

            <article>
              <section id="overview" className="scroll-mt-[88px] pb-12 md:pb-16">
                <h2
                  className="font-display text-[22px] font-semibold tracking-[-0.03em] text-zinc-900 md:text-[26px]"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  Overview
                </h2>
                <p className="mt-3 font-mono text-[11px] tracking-[0.14em]" style={{ color: theme.muted }}>
                  {meta}
                </p>
                <h1
                  className="mt-4 max-w-[18ch] font-display text-[32px] font-semibold leading-[1.05] tracking-[-0.03em] text-zinc-900 md:text-[48px]"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {project.title}
                </h1>
                <p className="mt-5 max-w-[65ch] text-[16px] leading-[1.7] text-zinc-600 md:text-[17px]" style={{ fontFamily: "var(--font-body)" }}>
                  {project.description}
                </p>
                {project.blurb && project.blurb !== project.description ? (
                  <p className="mt-3 max-w-[65ch] text-[15px] leading-[1.7] text-zinc-500">{project.blurb}</p>
                ) : null}

                <div className="mt-6 flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border bg-white px-3 py-1 font-mono text-[10px] tracking-[0.12em] text-zinc-600"
                      style={{ borderColor: theme.border }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div
                  className="mt-8 overflow-hidden rounded-[16px] border bg-zinc-100"
                  style={{ borderColor: "rgba(0,0,0,0.06)", boxShadow: "0 16px 40px rgba(17,24,39,0.08)" }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={project.image} alt={project.imageAlt} className="aspect-[16/9] w-full object-cover" />
                </div>
                {project.images && project.images.length > 1 ? (
                  <div className="mt-6 grid gap-3 sm:grid-cols-2">
                    {project.images.slice(1).map((src) => (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img key={src} src={src} alt="" className="aspect-[16/10] w-full rounded-[16px] object-cover" />
                    ))}
                  </div>
                ) : null}
              </section>

              <section id="challenge" className="scroll-mt-[88px] max-w-[65ch] border-t py-12 md:py-16" style={{ borderColor: "rgba(0,0,0,0.08)" }}>
                <h2
                  className="font-display text-[22px] font-semibold tracking-[-0.03em] text-zinc-900 md:text-[26px]"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  Challenge
                </h2>
                <p className="mt-4 text-[16px] leading-[1.7] text-zinc-600" style={{ fontFamily: "var(--font-body)" }}>
                  {project.details.challenge}
                </p>
              </section>

              <section id="approach" className="scroll-mt-[88px] max-w-[65ch] py-4 md:py-6">
                <h2
                  className="font-display text-[22px] font-semibold tracking-[-0.03em] text-zinc-900 md:text-[26px]"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  Approach
                </h2>
                <p className="mt-4 text-[16px] leading-[1.7] text-zinc-600" style={{ fontFamily: "var(--font-body)" }}>
                  {project.details.approach}
                </p>
              </section>

              <section id="result" className="scroll-mt-[88px] max-w-[65ch] pb-12 pt-4 md:pb-16 md:pt-6">
                <h2
                  className="font-display text-[22px] font-semibold tracking-[-0.03em] text-zinc-900 md:text-[26px]"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  Result
                </h2>
                <p className="mt-4 text-[16px] leading-[1.7] text-zinc-600" style={{ fontFamily: "var(--font-body)" }}>
                  {project.details.result}
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  {project.url ? <AceternityCTA href={project.url}>View on Behance</AceternityCTA> : null}
                  <HoverBorderGradient as="a" href="/projects">
                    More projects
                  </HoverBorderGradient>
                </div>
              </section>

              {related.length > 0 ? (
                <section id="related" className="scroll-mt-[88px] border-t py-12 md:py-16" style={{ borderColor: "rgba(0,0,0,0.06)" }}>
                  <h2
                    className="font-display text-[22px] font-semibold tracking-[-0.03em] text-zinc-900 md:text-[26px]"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    Related
                  </h2>
                  <p className="mt-3 max-w-[65ch] text-[15px] leading-[1.7] text-zinc-500">
                    More work in {project.dimension}, same lens as this case.
                  </p>
                  <div className="mt-8 grid gap-4 sm:grid-cols-3">
                    {related.map((p) => (
                      <Link
                        key={p.id}
                        href={`/projects/${p.id}`}
                        className="group overflow-hidden rounded-[16px] border bg-white"
                        style={{ borderColor: "rgba(0,0,0,0.06)" }}
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={p.image} alt={p.imageAlt} className="aspect-[16/10] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
                        <div className="px-4 py-3">
                          <div className="font-display text-[14px] font-semibold tracking-[-0.03em] text-zinc-900">{p.title}</div>
                          <div className="mt-0.5 font-mono text-[10px] tracking-[0.12em] text-zinc-500">{p.year}</div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </section>
              ) : null}

              <section id="contact" className="scroll-mt-[88px] border-t py-12 md:py-16" style={{ borderColor: "rgba(0,0,0,0.06)" }}>
                <h2
                  className="font-display text-[22px] font-semibold tracking-[-0.03em] text-zinc-900 md:text-[26px]"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  Contact
                </h2>
                <p className="mt-4 max-w-[65ch] text-[16px] leading-[1.7] text-zinc-600" style={{ fontFamily: "var(--font-body)" }}>
                  {data.profile.availability}
                </p>
                <a
                  href={`mailto:${data.profile.email}`}
                  className="mt-5 inline-block font-mono text-[13px] tracking-[0.04em] underline decoration-zinc-300 underline-offset-4 hover:decoration-zinc-900"
                  style={{ color: theme.text }}
                >
                  {data.profile.email}
                </a>
              </section>

              <footer className="pb-10 pt-2">
                <div className="h-px w-full bg-black/5" />
                <div className="flex justify-start pt-6 font-mono text-[10px] tracking-[0.12em] text-zinc-400">
                  <span>© 2026 NEHA</span>
                </div>
              </footer>
            </article>
          </div>
        </div>
      </main>
    </>
  );
}
