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
import { MILLENNIUM_TOC, MILLENNIUM_DECISIONS, MILLENNIUM_TOOLS } from "@/data/millennium-case";
import {
  MILLENNIUM_HERO,
  MILLENNIUM_PROBLEM,
  MILLENNIUM_ABOUT,
  MILLENNIUM_ROLE,
  MILLENNIUM_CONCEPT,
  MILLENNIUM_WORLD,
  MILLENNIUM_WIREFRAMES,
  MILLENNIUM_SOUND,
  MILLENNIUM_OUTCOMES,
  MILLENNIUM_CREDITS,
} from "@/data/millennium-content";
import type { Project } from "@/types/portfolio";
import { AceternityCTA, HoverBorderGradient } from "@/components/ui/hover-border-gradient";

/**
 * Millennium "A Broken Mile" — full Figma case content rendered through the
 * shared CaseStudyShell (same template + theme as every other project).
 */
export default function MillenniumCaseStudy({
  project,
  related,
}: {
  project: Project;
  related: Project[];
}) {
  const meta = [project.year, project.subtitle ?? project.dimension, project.client]
    .filter(Boolean)
    .join(" · ");

  return (
    <CaseStudyShell project={project} related={related} tocItems={MILLENNIUM_TOC}>
      {/* STORY / HERO */}
      <section id="overview" className="scroll-mt-[88px] pb-12 md:pb-16">
        <CaseEyebrow>{meta}</CaseEyebrow>
        <h1
          className="mt-4 max-w-[20ch] font-display text-[32px] font-semibold leading-[1.05] tracking-[-0.03em] md:text-[52px]"
          style={{ fontFamily: "var(--font-display)", color: C.text }}
        >
          {MILLENNIUM_HERO.kicker}
        </h1>
        <p
          className="mt-4 font-mono text-[12px] font-semibold tracking-[0.12em]"
          style={{ color: C.accent }}
        >
          {MILLENNIUM_HERO.award}
        </p>
        <p className="mt-2 text-[15px] leading-[1.7]" style={{ color: "rgba(255,255,255,0.75)" }}>
          {MILLENNIUM_HERO.platform}
        </p>
        <p className="mt-1 text-[15px] leading-[1.7]" style={{ color: "rgba(255,255,255,0.75)" }}>
          {MILLENNIUM_HERO.role}
        </p>
        <p className="mt-1 font-mono text-[12px] tracking-[0.06em]" style={{ color: C.muted }}>
          {MILLENNIUM_HERO.date}
        </p>

        <div className="mt-8 flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <CaseChip key={tag}>{tag}</CaseChip>
          ))}
        </div>

        <div
          className="mt-8 overflow-hidden rounded-[16px] border"
          style={{ borderColor: "rgba(255,255,255,0.10)", background: C.deep, boxShadow: "0 16px 40px rgba(0,0,0,0.45)" }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={project.image} alt={project.imageAlt} className="aspect-[16/9] w-full object-cover" />
        </div>
      </section>

      {/* PROBLEM */}
      <CaseSection id="problem">
        <CaseEyebrow>{MILLENNIUM_PROBLEM.eyebrow}</CaseEyebrow>
        <CaseH2>{MILLENNIUM_PROBLEM.hmw}</CaseH2>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <CaseCard>
            <CaseLabel>Problem Statement</CaseLabel>
            <CaseCardText>{MILLENNIUM_PROBLEM.problemStatement}</CaseCardText>
          </CaseCard>
          <CaseCard>
            <CaseLabel>Design Challenge</CaseLabel>
            <CaseCardText>{MILLENNIUM_PROBLEM.designChallenge}</CaseCardText>
          </CaseCard>
        </div>
        <div className="mt-6">
          <CaseCard accent>
            <CaseLabel>Scope of Work</CaseLabel>
            <CaseCardText>{MILLENNIUM_PROBLEM.scope}</CaseCardText>
          </CaseCard>
        </div>
        <div className="mt-6">
          <CaseLabel>Goals</CaseLabel>
          <p className="mt-3 max-w-[68ch] text-[17px] font-semibold leading-[1.6]" style={{ color: C.text }}>
            {MILLENNIUM_PROBLEM.goals}
          </p>
        </div>
        <p className="mt-6 max-w-[68ch] text-[12px] leading-[1.7]" style={{ color: C.muted }}>
          {MILLENNIUM_PROBLEM.disclaimer}
        </p>
      </CaseSection>

      {/* ABOUT */}
      <CaseSection id="about">
        <CaseEyebrow>{MILLENNIUM_ABOUT.eyebrow}</CaseEyebrow>
        <CaseH2>{MILLENNIUM_ABOUT.title}</CaseH2>
        <CaseBody>{MILLENNIUM_ABOUT.body}</CaseBody>
        <div className="mt-6 flex flex-wrap gap-1.5">
          {MILLENNIUM_ABOUT.divisions.map((d) => (
            <CaseChip key={d}>{d}</CaseChip>
          ))}
        </div>
        <div className="mt-8">
          <CaseLabel>Partners</CaseLabel>
          <div className="mt-4 grid gap-4 md:grid-cols-3">
            {MILLENNIUM_ABOUT.partners.map((p) => (
              <CaseCard key={p.name}>
                <div className="font-display text-[16px] font-semibold" style={{ color: C.text }}>{p.name}</div>
                <div className="mt-0.5 font-mono text-[10px] tracking-[0.12em]" style={{ color: C.accent }}>{p.note}</div>
                <CaseCardText>{p.body}</CaseCardText>
              </CaseCard>
            ))}
          </div>
        </div>
      </CaseSection>

      {/* ROLE */}
      <CaseSection id="role">
        <CaseEyebrow>{MILLENNIUM_ROLE.eyebrow}</CaseEyebrow>
        <CaseH2>{MILLENNIUM_ROLE.title}</CaseH2>
        <p className="mt-4 font-mono text-[12px] tracking-[0.06em]" style={{ color: C.muted }}>
          Team — {MILLENNIUM_ROLE.team}
        </p>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {MILLENNIUM_ROLE.streams.map((s) => (
            <CaseCard key={s.name}>
              <div className="font-mono text-[11px] font-semibold tracking-[0.14em]" style={{ color: C.accent }}>
                {s.name}
              </div>
              <CaseCardText>{s.body}</CaseCardText>
            </CaseCard>
          ))}
        </div>
        <div className="mt-8">
          <CaseLabel>My Toolkit</CaseLabel>
          <div className="mt-4 flex flex-wrap gap-1.5">
            {MILLENNIUM_TOOLS.map((t) => (
              <CaseChip key={t}>{t}</CaseChip>
            ))}
          </div>
        </div>
      </CaseSection>

      {/* CONCEPT */}
      <CaseSection id="concept">
        <CaseEyebrow>{MILLENNIUM_CONCEPT.eyebrow}</CaseEyebrow>
        <CaseH2>{MILLENNIUM_CONCEPT.title}</CaseH2>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <div>
            <CaseLabel>{MILLENNIUM_CONCEPT.asking.name}</CaseLabel>
            <CaseBody>{MILLENNIUM_CONCEPT.asking.body}</CaseBody>
          </div>
          <div>
            <CaseLabel>{MILLENNIUM_CONCEPT.storyboard.name}</CaseLabel>
            <CaseBody>{MILLENNIUM_CONCEPT.storyboard.body}</CaseBody>
            <p className="mt-4 border-l-2 pl-4 text-[13px] leading-[1.7]" style={{ borderColor: C.accent, color: C.muted }}>
              {MILLENNIUM_CONCEPT.storyboard.caption}
            </p>
          </div>
        </div>
      </CaseSection>

      {/* WORLD */}
      <CaseSection id="world">
        <CaseEyebrow>{MILLENNIUM_WORLD.eyebrow}</CaseEyebrow>
        <CaseH2>{MILLENNIUM_WORLD.title}</CaseH2>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {MILLENNIUM_WORLD.blocks.map((b) => (
            <CaseCard key={b.name}>
              <div className="font-mono text-[11px] font-semibold tracking-[0.14em]" style={{ color: C.accent }}>
                {b.name}
              </div>
              <CaseCardText>{b.body}</CaseCardText>
            </CaseCard>
          ))}
        </div>
        <ul className="mt-6 space-y-3">
          {MILLENNIUM_WORLD.captions.map((c) => (
            <li key={c} className="border-l-2 pl-4 text-[13px] leading-[1.7]" style={{ borderColor: C.accent, color: C.muted }}>
              {c}
            </li>
          ))}
        </ul>
      </CaseSection>

      {/* DECISIONS */}
      <CaseSection id="decisions">
        <CaseEyebrow>{MILLENNIUM_WIREFRAMES.eyebrow}</CaseEyebrow>
        <CaseH2>{MILLENNIUM_WIREFRAMES.title}</CaseH2>
        <CaseBody>{MILLENNIUM_WIREFRAMES.lede}</CaseBody>
        <ul className="mt-6 grid gap-2.5 md:grid-cols-2">
          {MILLENNIUM_WIREFRAMES.notes.map((n) => (
            <li
              key={n}
              className="rounded-[12px] border px-4 py-3 text-[13px] leading-[1.65]"
              style={{ borderColor: "rgba(255,255,255,0.10)", background: C.surface, color: "rgba(255,255,255,0.78)" }}
            >
              {n}
            </li>
          ))}
        </ul>

        <div className="mt-10">
          <CaseLabel>{MILLENNIUM_WIREFRAMES.shippedTitle}</CaseLabel>
          <p className="mt-2 max-w-[68ch] text-[14px] leading-[1.7]" style={{ color: C.muted }}>
            {MILLENNIUM_WIREFRAMES.shippedLede}
          </p>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {MILLENNIUM_WIREFRAMES.shippedGroups.map((g) => (
              <CaseCard key={g.name} accent>
                <div className="font-display text-[16px] font-semibold" style={{ color: C.text }}>{g.name}</div>
                <ul className="mt-3 space-y-2.5">
                  {g.decisions.map((d) => (
                    <li key={d} className="text-[13px] leading-[1.65]" style={{ color: "rgba(255,255,255,0.8)" }}>
                      {d}
                    </li>
                  ))}
                </ul>
              </CaseCard>
            ))}
          </div>
        </div>

        <div className="mt-10">
          <CaseLabel>All twelve decisions</CaseLabel>
          <div className="mt-4 grid gap-2.5 sm:grid-cols-2">
            {MILLENNIUM_DECISIONS.map((d) => (
              <div key={d.name} className="rounded-[12px] border px-4 py-3" style={{ borderColor: "rgba(255,255,255,0.10)", background: C.deep }}>
                <span className="font-mono text-[11px] font-semibold tracking-[0.12em]" style={{ color: C.accent }}>
                  {d.name}
                </span>
                <p className="mt-1.5 text-[13px] leading-[1.65]" style={{ color: "rgba(255,255,255,0.75)" }}>{d.body}</p>
              </div>
            ))}
          </div>
        </div>
      </CaseSection>

      {/* SOUND */}
      <CaseSection id="sound">
        <CaseEyebrow>{MILLENNIUM_SOUND.eyebrow}</CaseEyebrow>
        <CaseH2>{MILLENNIUM_SOUND.title}</CaseH2>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <div>
            <CaseLabel>Audio Hierarchy</CaseLabel>
            <CaseBody>{MILLENNIUM_SOUND.hierarchy}</CaseBody>
          </div>
          <div>
            <CaseLabel>My Role</CaseLabel>
            <CaseBody>{MILLENNIUM_SOUND.role}</CaseBody>
          </div>
        </div>
        <div className="mt-6 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
          {MILLENNIUM_SOUND.layers.map((l) => (
            <div key={l.name} className="rounded-[12px] border px-4 py-3" style={{ borderColor: "rgba(255,255,255,0.10)", background: C.surface }}>
              <div className="text-[14px] font-semibold" style={{ color: C.text }}>{l.name}</div>
              <div className="mt-1 text-[12px] leading-[1.6]" style={{ color: C.muted }}>{l.note}</div>
            </div>
          ))}
        </div>
      </CaseSection>

      {/* OUTCOMES */}
      <CaseSection id="outcomes">
        <CaseEyebrow>{MILLENNIUM_OUTCOMES.eyebrow}</CaseEyebrow>
        <CaseH2>{MILLENNIUM_OUTCOMES.title}</CaseH2>
        <blockquote
          className="mt-8 max-w-[40ch] border-l-2 pl-5 font-display text-[22px] font-medium leading-[1.4] md:text-[26px]"
          style={{ borderColor: C.accent, color: C.text }}
        >
          {MILLENNIUM_OUTCOMES.quote}
          <footer className="mt-3 font-mono text-[12px] tracking-[0.06em]" style={{ color: C.muted }}>
            {MILLENNIUM_OUTCOMES.quoteBy}
          </footer>
        </blockquote>
        <div className="mt-8">
          <CaseLabel>Outcomes</CaseLabel>
          <ul className="mt-4 grid gap-2.5 md:grid-cols-2">
            {MILLENNIUM_OUTCOMES.outcomes.map((o) => (
              <li
                key={o}
                className="rounded-[12px] border px-4 py-3 text-[14px] leading-[1.65]"
                style={{ borderColor: "rgba(255,255,255,0.10)", background: C.surface, color: "rgba(255,255,255,0.82)" }}
              >
                {o}
              </li>
            ))}
          </ul>
        </div>
        <p className="mt-6 text-[13px] leading-[1.7]" style={{ color: C.muted }}>
          Presented at — {MILLENNIUM_OUTCOMES.presented}
        </p>
      </CaseSection>

      {/* CREDITS */}
      <CaseSection id="credits">
        <CaseEyebrow>{MILLENNIUM_CREDITS.eyebrow}</CaseEyebrow>
        <CaseH2>{MILLENNIUM_CREDITS.title}</CaseH2>
        <CaseBody>{MILLENNIUM_CREDITS.thanks}</CaseBody>
        <CaseBody>{MILLENNIUM_CREDITS.published}</CaseBody>
        <p className="mt-4 max-w-[68ch] text-[14px] font-semibold leading-[1.7]" style={{ color: C.text }}>
          {MILLENNIUM_CREDITS.tryIt}
        </p>
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
