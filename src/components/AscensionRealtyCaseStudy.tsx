"use client";

import CaseStudyShell, {
  C,
  CaseCard,
  CaseCardText,
  CaseChip,
  CaseEyebrow,
  CaseH2,
  CaseLabel,
  CaseSection,
} from "@/components/CaseStudyShell";
import { HeroMedia, MediaGallery } from "@/components/CaseMedia";
import type { Project } from "@/types/portfolio";
import content from "../../content/ascension/index.json";

/* Minimal types for the extracted Figma content. */
type Block = { type: string; text: string };
type ImageRef = { file: string; alt: string; role?: string };
type TeamEntry = { role: string; count?: number; value?: string; detail?: string };
type Section = {
  index: number;
  slug: string;
  label: string;
  heading?: string;
  eyebrow?: string;
  blocks?: Block[];
  images?: ImageRef[];
  team?: TeamEntry[];
  contributions?: { name: string; body: string }[];
  goals?: { number: string; name: string; body: string }[];
  moments?: { number: string; name: string; body: string }[];
  frames?: string[];
  stages?: { number: string; name: string; body: string }[];
  triggers?: string[];
  challenges?: { name: string; body: string; solution: string }[];
  features?: { number: string; name: string; body: string }[];
  apartmentDetails?: Record<string, unknown>;
  results?: { name: string; body: string }[];
  contact?: Record<string, string>;
};

const data = content as unknown as {
  project: Record<string, string>;
  tags: string[];
  toolkit: string[];
  sections: Section[];
};

const tocItems = data.sections.map((s) => ({
  id: s.slug,
  label: s.label.replace(/^\d+\s*\/\s*/, ""),
}));

function Blocks({ blocks }: { blocks?: Block[] }) {
  if (!blocks) return null;
  return (
    <>
      {blocks.map((b, i) => {
        if (b.type === "heading") {
          return (
            <h3
              key={i}
              className="mt-6 font-display text-[17px] font-semibold tracking-[-0.02em] md:text-[19px]"
              style={{ fontFamily: "var(--font-display)", color: C.text }}
            >
              {b.text}
            </h3>
          );
        }
        if (b.type === "kicker") {
          return (
            <p key={i} className="font-mono text-[11px] tracking-[0.18em]" style={{ color: C.accent }}>
              {b.text}
            </p>
          );
        }
        if (b.type === "meta" || b.type === "byline") {
          return (
            <p key={i} className="mt-1 font-mono text-[12px] tracking-[0.06em]" style={{ color: C.muted }}>
              {b.text}
            </p>
          );
        }
        if (b.type === "quote") {
          return (
            <blockquote
              key={i}
              className="mt-6 max-w-[42ch] border-l-2 pl-5 font-display text-[20px] font-medium leading-[1.4]"
              style={{ borderColor: C.accent, color: C.text }}
            >
              {b.text}
            </blockquote>
          );
        }
        // paragraph / subtitle / default
        return (
          <p
            key={i}
            className="mt-4 max-w-[68ch] text-[15px] leading-[1.75]"
            style={{ fontFamily: "var(--font-body)", color: "rgba(255,255,255,0.82)" }}
          >
            {b.text}
          </p>
        );
      })}
    </>
  );
}

export default function AscensionRealtyCaseStudy({
  project,
  related,
}: {
  project: Project;
  related: Project[];
}) {
  const meta = [project.year, project.subtitle ?? project.dimension, project.client]
    .filter(Boolean)
    .join(" · ");

  const titleSection = data.sections.find((s) => s.slug === "title");

  return (
    <CaseStudyShell project={project} related={related} tocItems={tocItems}>
      {/* TITLE / HERO */}
      <section id="title" className="scroll-mt-[88px] pb-12 md:pb-16">
        <CaseEyebrow>{meta}</CaseEyebrow>
        <h1
          className="mt-4 max-w-[20ch] font-display text-[32px] font-semibold leading-[1.05] tracking-[-0.03em] md:text-[52px]"
          style={{ fontFamily: "var(--font-display)", color: C.text }}
        >
          {titleSection?.heading || project.title}
        </h1>
        <Blocks blocks={titleSection?.blocks} />
        <div className="mt-6 flex flex-wrap gap-1.5">
          {data.tags.map((tag) => (
            <CaseChip key={tag}>{tag}</CaseChip>
          ))}
        </div>
        <div className="mt-8">
          <HeroMedia project={project} />
        </div>
        {project.media ? <MediaGallery media={project.media} /> : null}
      </section>

      {data.sections
        .filter((s) => s.slug !== "title")
        .map((s) => {
          return (
            <CaseSection key={s.slug} id={s.slug}>
              {s.eyebrow ? <CaseEyebrow>{s.eyebrow.replace(/^\d+\s*/, "")}</CaseEyebrow> : null}
              {s.heading ? <CaseH2>{s.heading}</CaseH2> : null}
              <Blocks blocks={s.blocks} />

              {s.team ? (
                <div className="mt-6 grid gap-2.5 sm:grid-cols-2">
                  {s.team.map((t) => (
                    <div
                      key={t.role}
                      className="rounded-[12px] border px-4 py-3"
                      style={{ borderColor: "rgba(255,255,255,0.10)", background: C.surface }}
                    >
                      <div className="text-[14px] font-semibold" style={{ color: C.text }}>
                        {t.role}
                        {t.count ? <span className="ml-1 font-mono text-[11px]" style={{ color: C.muted }}>× {t.count}</span> : null}
                      </div>
                      {t.value ? (
                        <div className="mt-1 text-[13px]" style={{ color: "rgba(255,255,255,0.78)" }}>{t.value}</div>
                      ) : null}
                      {t.detail ? (
                        <div className="mt-1 text-[12px]" style={{ color: C.muted }}>{t.detail}</div>
                      ) : null}
                    </div>
                  ))}
                </div>
              ) : null}

              {s.contributions ? (
                <div className="mt-6 grid gap-2.5 sm:grid-cols-2">
                  {s.contributions.map((c) => (
                    <div key={c.name} className="rounded-[12px] border px-4 py-3" style={{ borderColor: "rgba(255,255,255,0.10)", background: C.surface }}>
                      <div className="font-mono text-[11px] font-semibold tracking-[0.12em]" style={{ color: C.accent }}>{c.name}</div>
                      <p className="mt-1.5 text-[13px] leading-[1.65]" style={{ color: "rgba(255,255,255,0.78)" }}>{c.body}</p>
                    </div>
                  ))}
                </div>
              ) : null}

              {s.goals ? (
                <div className="mt-6 grid gap-3 md:grid-cols-2">
                  {s.goals.map((g) => (
                    <CaseCard key={g.number}>
                      <div className="font-mono text-[11px] tracking-[0.12em]" style={{ color: C.accent }}>{g.number}</div>
                      <div className="mt-1 text-[15px] font-semibold" style={{ color: C.text }}>{g.name}</div>
                      <CaseCardText>{g.body}</CaseCardText>
                    </CaseCard>
                  ))}
                </div>
              ) : null}

              {s.moments ? (
                <div className="mt-6 grid gap-3 md:grid-cols-3">
                  {s.moments.map((m) => (
                    <CaseCard key={m.number}>
                      <div className="font-mono text-[11px] tracking-[0.12em]" style={{ color: C.accent }}>{m.number}</div>
                      <div className="mt-1 text-[14px] font-semibold" style={{ color: C.text }}>{m.name}</div>
                      <CaseCardText>{m.body}</CaseCardText>
                    </CaseCard>
                  ))}
                </div>
              ) : null}

              {s.frames ? (
                <ol className="mt-6 grid gap-2 sm:grid-cols-2">
                  {s.frames.map((f) => (
                    <li
                      key={f}
                      className="rounded-[12px] border px-4 py-2.5 text-[13px] leading-[1.6]"
                      style={{ borderColor: "rgba(255,255,255,0.10)", background: C.deep, color: "rgba(255,255,255,0.8)" }}
                    >
                      {f}
                    </li>
                  ))}
                </ol>
              ) : null}

              {s.stages ? (
                <div className="mt-6 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
                  {s.stages.map((st) => (
                    <div key={st.number} className="rounded-[12px] border px-4 py-3" style={{ borderColor: "rgba(255,255,255,0.10)", background: C.surface }}>
                      <div className="font-mono text-[11px] tracking-[0.12em]" style={{ color: C.accent }}>{st.number}</div>
                      <div className="mt-1 text-[14px] font-semibold" style={{ color: C.text }}>{st.name}</div>
                      <p className="mt-1 text-[13px] leading-[1.6]" style={{ color: "rgba(255,255,255,0.78)" }}>{st.body}</p>
                    </div>
                  ))}
                </div>
              ) : null}

              {s.triggers ? (
                <ul className="mt-6 space-y-2">
                  {s.triggers.map((t) => (
                    <li key={t} className="border-l-2 pl-4 text-[13px] leading-[1.65]" style={{ borderColor: C.accent, color: "rgba(255,255,255,0.8)" }}>
                      {t}
                    </li>
                  ))}
                </ul>
              ) : null}

              {s.challenges ? (
                <div className="mt-6 space-y-4">
                  {s.challenges.map((c) => (
                    <CaseCard key={c.name}>
                      <CaseLabel>{c.name}</CaseLabel>
                      <CaseCardText>{c.body}</CaseCardText>
                      <div className="mt-3 text-[13px] leading-[1.65]" style={{ color: "rgba(255,255,255,0.78)" }}>
                        <span className="font-semibold" style={{ color: C.accent }}>Solution · </span>
                        {c.solution}
                      </div>
                    </CaseCard>
                  ))}
                </div>
              ) : null}

              {s.features ? (
                <div className="mt-6 grid gap-3 md:grid-cols-3">
                  {s.features.map((f) => (
                    <CaseCard key={f.number}>
                      <div className="font-mono text-[11px] tracking-[0.12em]" style={{ color: C.accent }}>{f.number}</div>
                      <div className="mt-1 text-[15px] font-semibold" style={{ color: C.text }}>{f.name}</div>
                      <CaseCardText>{f.body}</CaseCardText>
                    </CaseCard>
                  ))}
                </div>
              ) : null}

              {s.apartmentDetails ? (
                <CaseCard>
                  <CaseLabel>{(s.apartmentDetails as Record<string, string>).title ?? "Apartment Details"}</CaseLabel>
                  <div className="mt-3 grid gap-1.5 sm:grid-cols-3">
                    {Object.entries(s.apartmentDetails as Record<string, string>)
                      .filter(([k]) => k !== "title")
                      .map(([k, v]) => (
                        <div key={k} className="font-mono text-[12px] tracking-[0.04em]" style={{ color: C.muted }}>
                          <span className="uppercase" style={{ color: C.accent }}>{k}</span> · {v}
                        </div>
                      ))}
                  </div>
                </CaseCard>
              ) : null}

              {s.results ? (
                <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
                  {s.results.map((r) => (
                    <li key={r.name} className="rounded-[12px] border px-4 py-3 text-[13px] leading-[1.65]" style={{ borderColor: "rgba(255,255,255,0.10)", background: C.surface, color: "rgba(255,255,255,0.82)" }}>
                      <span className="font-semibold" style={{ color: C.text }}>{r.name}</span> — {r.body}
                    </li>
                  ))}
                </ul>
              ) : null}

              {s.contact ? (
                <div className="mt-6 flex flex-wrap gap-1.5">
                  <CaseChip>{(s.contact as Record<string, string>).role}</CaseChip>
                  <CaseChip>{(s.contact as Record<string, string>).email}</CaseChip>
                  <CaseChip>{(s.contact as Record<string, string>).links}</CaseChip>
                </div>
              ) : null}
            </CaseSection>
          );
        })}
    </CaseStudyShell>
  );
}
