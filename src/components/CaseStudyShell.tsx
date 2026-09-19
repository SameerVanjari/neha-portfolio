"use client";

import Link from "next/link";
import Nav from "@/components/Nav";
import CaseStudyToc, { type CaseStudyTocItem } from "@/components/CaseStudyToc";
import ContactCard from "@/components/ContactCard";
import { CASE_COLORS, CASE_THEME } from "@/data/case-theme";
import type { Project } from "@/types/portfolio";

export const C = CASE_COLORS;

/* ---------- Shared Figma-style primitives (same look on every case page) ---------- */

export function CaseEyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-mono text-[11px] tracking-[0.18em]" style={{ color: C.accent }}>
      {children}
    </p>
  );
}

export function CaseH2({ children }: { children: React.ReactNode }) {
  return (
    <h2
      className="mt-3 max-w-[22ch] font-display text-[26px] font-semibold leading-[1.1] tracking-[-0.03em] md:text-[34px]"
      style={{ fontFamily: "var(--font-display)", color: C.text }}
    >
      {children}
    </h2>
  );
}

export function CaseBody({ children }: { children: React.ReactNode }) {
  return (
    <p
      className="mt-4 max-w-[68ch] text-[15px] leading-[1.75] md:text-[16px]"
      style={{ fontFamily: "var(--font-body)", color: "rgba(255,255,255,0.82)" }}
    >
      {children}
    </p>
  );
}

export function CaseSection({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <section
      id={id}
      className="scroll-mt-[88px] border-t py-12 md:py-16"
      style={{ borderColor: "rgba(255,255,255,0.10)" }}
    >
      {children}
    </section>
  );
}

export function CaseLabel({ children }: { children: React.ReactNode }) {
  return (
    <h3
      className="font-display text-[17px] font-semibold tracking-[-0.02em] md:text-[19px]"
      style={{ fontFamily: "var(--font-display)", color: C.text }}
    >
      {children}
    </h3>
  );
}

export function CaseChip({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="rounded-full border px-3 py-1 font-mono text-[10px] tracking-[0.12em]"
      style={{ borderColor: "rgba(255,255,255,0.14)", color: "rgba(255,255,255,0.8)" }}
    >
      {children}
    </span>
  );
}

export function CaseCard({
  children,
  accent = false,
}: {
  children: React.ReactNode;
  accent?: boolean;
}) {
  return (
    <div
      className="rounded-[16px] border p-6"
      style={
        accent
          ? { borderColor: C.accentBorder, background: "rgba(255,30,30,0.06)" }
          : { borderColor: "rgba(255,255,255,0.10)", background: C.surface }
      }
    >
      {children}
    </div>
  );
}

export function CaseCardText({ children }: { children: React.ReactNode }) {
  return (
    <p className="mt-3 text-[14px] leading-[1.7]" style={{ color: "rgba(255,255,255,0.8)" }}>
      {children}
    </p>
  );
}

/* ---------- Shared page template: index nav + single-scroll article ---------- */

export default function CaseStudyShell({
  project,
  related,
  tocItems,
  children,
}: {
  project: Project;
  related: Project[];
  tocItems: readonly CaseStudyTocItem[];
  children: React.ReactNode;
}) {
  const items = tocItems.filter((t) => t.id !== "related" || related.length > 0);

  return (
    <>
      <Nav theme={CASE_THEME} activeSection="projects" />
      <main className="pt-[64px]" style={{ background: C.bg, color: C.text, overflowX: "clip" }}>
        <div className="mx-auto max-w-[1280px] px-6 md:px-8">
          <div className="h-px w-full" style={{ background: "rgba(255,255,255,0.10)" }} />
          <div className="py-6 md:py-8">
            <Link
              href="/projects"
              className="font-mono text-[11px] tracking-[0.14em] hover:text-white"
              style={{ color: C.muted }}
            >
              ← All work
            </Link>
          </div>

          <div className="lg:grid lg:grid-cols-[220px_minmax(0,1fr)] lg:items-start lg:gap-12 xl:grid-cols-[240px_minmax(0,1fr)] xl:gap-16">
            <div className="mb-10 lg:sticky lg:top-[88px] lg:mb-0 lg:self-start">
              <CaseStudyToc items={items} theme={CASE_THEME} />
            </div>

            <article>
              {children}

              {related.length > 0 ? (
                <CaseSection id="related">
                  <CaseH2>Related</CaseH2>
                  <p className="mt-3 max-w-[65ch] text-[15px] leading-[1.7]" style={{ color: C.muted }}>
                    More work in {project.dimension}, same lens as this case.
                  </p>
                  <div className="mt-8 grid gap-4 sm:grid-cols-3">
                    {related.map((p) => (
                      <Link
                        key={p.id}
                        href={`/projects/${p.id}`}
                        className="group overflow-hidden rounded-[16px] border"
                        style={{ borderColor: "rgba(255,255,255,0.10)", background: C.surface }}
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={p.image} alt={p.imageAlt} className="aspect-[16/10] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
                        <div className="px-4 py-3">
                          <div className="font-display text-[14px] font-semibold tracking-[-0.03em]" style={{ color: C.text }}>{p.title}</div>
                          <div className="mt-0.5 font-mono text-[10px] tracking-[0.12em]" style={{ color: C.muted }}>{p.year}</div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </CaseSection>
              ) : null}

              <CaseSection id="contact">
                <CaseH2>Contact</CaseH2>
                <div className="mt-8">
                  <ContactCard />
                </div>
              </CaseSection>

              <footer className="pb-10 pt-2">
                <div className="h-px w-full" style={{ background: "rgba(255,255,255,0.10)" }} />
                <div className="flex justify-start pt-6 font-mono text-[10px] tracking-[0.12em]" style={{ color: C.muted }}>
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
