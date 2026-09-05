"use client";

import Link from "next/link";
import Nav from "@/components/Nav";
import { THEMES } from "@/data/themes";
import type { Project } from "@/types/portfolio";
import { AceternityCTA, HoverBorderGradient } from "@/components/ui/hover-border-gradient";

export default function ProjectCaseStudy({ project, related }: { project: Project; related: Project[] }) {
  const theme = THEMES[project.perception];
  const steps = [
    { label: "Challenge", body: project.details.challenge },
    { label: "Approach", body: project.details.approach },
    { label: "Result", body: project.details.result },
  ];

  return (
    <>
      <Nav theme={theme} activeSection="projects" />
      <main className="pt-[64px]">
        <article className="mx-auto max-w-[1280px] px-6 md:px-8">
          <div className="h-px w-full bg-black/5" />

          <div className="py-8 md:py-12">
            <Link href="/projects" className="font-mono text-[11px] tracking-[0.14em] text-zinc-400 hover:text-zinc-700">
              ← All work
            </Link>

            <div className="mt-6 flex flex-wrap items-center gap-2">
              <span className="h-px w-8" style={{ background: theme.faint }} />
              <span className="font-mono text-[11px] tracking-[0.2em]" style={{ color: theme.muted }}>
                {project.year} · {project.subtitle ?? project.dimension}
                {project.client ? ` · ${project.client}` : ""}
              </span>
            </div>

            <h1
              className="mt-4 max-w-[18ch] font-display text-[32px] font-semibold leading-[0.95] tracking-[-0.04em] text-zinc-900 md:text-[48px]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {project.title}
            </h1>
            <p className="mt-4 max-w-[62ch] text-[16px] leading-[1.65] text-zinc-600 md:text-[17px]" style={{ fontFamily: "var(--font-body)" }}>
              {project.description}
            </p>

            <div className="mt-5 flex flex-wrap gap-1.5">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border bg-white px-3 py-1 font-mono text-[10px] tracking-[0.12em] text-zinc-600"
                  style={{ borderColor: "rgba(0,0,0,0.08)" }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div
            className="overflow-hidden rounded-[24px] border bg-zinc-100"
            style={{ borderColor: "rgba(0,0,0,0.06)", boxShadow: "0 16px 48px rgba(0,0,0,0.08)" }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={project.image} alt={project.imageAlt} className="aspect-[16/9] w-full object-cover" />
          </div>
          <p className="mt-3 font-mono text-[10px] tracking-[0.1em] text-zinc-400">
            Placeholder still — swap when client Behance / Figma captures land.
            {project.views != null || project.appreciations != null
              ? ` · Behance${project.views != null ? ` ${project.views} views` : ""}${project.appreciations != null ? ` · ${project.appreciations} appreciations` : ""}`
              : ""}
          </p>
          {project.images && project.images.length > 1 ? (
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {project.images.slice(1).map((src) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img key={src} src={src} alt="" className="aspect-[16/10] w-full rounded-[16px] object-cover" />
              ))}
            </div>
          ) : null}

          <div className="grid gap-6 py-12 md:grid-cols-3 md:gap-8 md:py-16">
            {steps.map((step, i) => (
              <div key={step.label} className="border-t pt-5" style={{ borderColor: "rgba(0,0,0,0.08)" }}>
                <div className="font-mono text-[10px] tracking-[0.18em] text-zinc-400">0{i + 1} — {step.label}</div>
                <p className="mt-3 text-[14px] leading-[1.65] text-zinc-600">{step.body}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-3 pb-12">
            {project.url ? (
              <AceternityCTA href={project.url}>View on Behance</AceternityCTA>
            ) : null}
            <HoverBorderGradient as="a" href="/projects">
              More projects
            </HoverBorderGradient>
          </div>

          {related.length > 0 ? (
            <section className="border-t py-10 md:py-14" style={{ borderColor: "rgba(0,0,0,0.06)" }}>
              <div className="font-mono text-[11px] tracking-[0.18em] text-zinc-400">Also in {project.dimension}</div>
              <div className="mt-6 grid gap-4 sm:grid-cols-3">
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
                      <div className="font-display text-[14px] font-semibold tracking-[-0.02em] text-zinc-900">{p.title}</div>
                      <div className="mt-0.5 font-mono text-[10px] tracking-[0.12em] text-zinc-400">{p.year}</div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          ) : null}

          <footer className="pb-10">
            <div className="h-px w-full bg-black/5" />
            <div className="flex justify-start pt-6 font-mono text-[10px] tracking-[0.12em] text-zinc-400">
              <span>© 2026 NEHA</span>
            </div>
          </footer>
        </article>
      </main>
    </>
  );
}
