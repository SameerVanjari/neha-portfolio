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
import { CaseFigure, CaseFullBleed, CaseImageText, HeroMedia } from "@/components/CaseMedia";
import { MILLENNIUM_TOC, MILLENNIUM_TOOLS } from "@/data/millennium-case";
import {
  MILLENNIUM_HERO,
  MILLENNIUM_IMAGES,
  MILLENNIUM_OVERVIEW,
  MILLENNIUM_CHALLENGE,
  MILLENNIUM_APPROACH,
  MILLENNIUM_OUTCOME,
  MILLENNIUM_CREDITS,
} from "@/data/millennium-content";
import type { Project } from "@/types/portfolio";
import { AceternityCTA, HoverBorderGradient } from "@/components/ui/hover-border-gradient";

/**
 * Millennium "A Broken Mile" — summary-format case study (Loop-style):
 * hero media, four narrative blocks each anchored by ONE message-carrying
 * image, quote, trailer payoff, credits. Short, sharp, skimmable.
 */
export default function MillenniumCaseStudy({
  project,
  related,
}: {
  project: Project;
  related: Project[];
}) {
  const trailerVideo = project.media?.videos?.[0];

  return (
    <CaseStudyShell project={project} related={related} tocItems={MILLENNIUM_TOC}>
      {/* HERO */}
      <section id="story" className="scroll-mt-[88px] pb-8 md:pb-12">
        <CaseEyebrow>{`${project.year} · ${project.subtitle ?? project.dimension} · ${project.client ?? ""}`}</CaseEyebrow>
        <h1
          className="mt-4 max-w-[18ch] font-display text-[34px] font-semibold leading-[1.05] tracking-[-0.03em] md:text-[56px]"
          style={{ fontFamily: "var(--font-display)", color: C.text }}
        >
          The day a squirrel took down a whole street
        </h1>
        <p className="mt-4 max-w-[56ch] text-[16px] leading-[1.7]" style={{ color: "rgba(255,255,255,0.75)" }}>
          {MILLENNIUM_HERO.blurb}
        </p>
        <div className="mt-6 flex flex-wrap gap-1.5">
          <CaseChip>{MILLENNIUM_HERO.award}</CaseChip>
          {project.tags.map((tag) => (
            <CaseChip key={tag}>{tag}</CaseChip>
          ))}
        </div>

        <div className="mt-10">
          <HeroMedia project={project} />
        </div>
      </section>

      {/* OVERVIEW */}
      <CaseSection id="overview">
        <div className="grid gap-8 md:grid-cols-[minmax(0,12ch)_minmax(0,1fr)] md:gap-12">
          <CaseEyebrow>{MILLENNIUM_OVERVIEW.eyebrow}</CaseEyebrow>
          <div>
            <CaseBody>{MILLENNIUM_OVERVIEW.body}</CaseBody>
            <div className="mt-10">
              <CaseImageText
                src={MILLENNIUM_IMAGES.wantedPoster}
                alt="In-headset briefing room wall with a wanted poster for the squirrel, reward $70,158"
                caption={MILLENNIUM_OVERVIEW.figCaption}
              >
                <CaseLabel>Lead Immersive Experience Designer</CaseLabel>
                <p className="mt-3 max-w-[60ch] text-[14px] leading-[1.7]" style={{ color: "rgba(255,255,255,0.7)" }}>
                  {[
                    "CXR Agency (now Kinemeric)",
                    MILLENNIUM_OUTCOME.presented,
                  ].join(" · ")}
                </p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {MILLENNIUM_TOOLS.map((t) => (
                    <CaseChip key={t}>{t}</CaseChip>
                  ))}
                </div>
              </CaseImageText>
            </div>
          </div>
        </div>
      </CaseSection>

      {/* CHALLENGE */}
      <CaseSection id="challenge">
        <div className="grid gap-8 md:grid-cols-[minmax(0,12ch)_minmax(0,1fr)] md:gap-12">
          <CaseEyebrow>{MILLENNIUM_CHALLENGE.eyebrow}</CaseEyebrow>
          <div>
            <CaseBody>{MILLENNIUM_CHALLENGE.body}</CaseBody>
          </div>
        </div>
      </CaseSection>

      <CaseFullBleed
        src={MILLENNIUM_IMAGES.problemStreet}
        alt="ShapesXR street view with utility poles, cables, and the simulated neighborhood"
        caption={MILLENNIUM_CHALLENGE.figCaption}
      />

      {/* APPROACH — three steps, three images */}
      <CaseSection id="approach">
        <div className="grid gap-8 md:grid-cols-[minmax(0,12ch)_minmax(0,1fr)] md:gap-12">
          <CaseEyebrow>{MILLENNIUM_APPROACH.eyebrow}</CaseEyebrow>
          <div>
            <CaseBody>{MILLENNIUM_APPROACH.lede}</CaseBody>
            <div className="mt-10 grid gap-10 md:grid-cols-3 md:gap-6">
              {MILLENNIUM_APPROACH.steps.map((s, i) => (
                <div key={s.title}>
                  <span className="font-mono text-[11px] font-semibold tracking-[0.14em]" style={{ color: C.accent }}>
                    {`0${i + 1} — ${s.title.toUpperCase()}`}
                  </span>
                  <p className="mt-2 text-[14px] leading-[1.7]" style={{ color: "rgba(255,255,255,0.8)" }}>
                    {s.body}
                  </p>
                  <div className="mt-4">
                    <CaseFigure src={s.src} alt={s.alt} caption={s.caption} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CaseSection>

      {/* OUTCOME */}
      <CaseSection id="outcome">
        <div className="grid gap-8 md:grid-cols-[minmax(0,12ch)_minmax(0,1fr)] md:gap-12">
          <CaseEyebrow>{MILLENNIUM_OUTCOME.eyebrow}</CaseEyebrow>
          <div>
            <blockquote
              className="max-w-[36ch] border-l-2 pl-5 font-display text-[22px] font-medium leading-[1.4] md:text-[28px]"
              style={{ borderColor: C.accent, color: C.text }}
            >
              {MILLENNIUM_OUTCOME.quote}
              <footer className="mt-3 font-mono text-[12px] tracking-[0.06em]" style={{ color: C.muted }}>
                {`— ${MILLENNIUM_OUTCOME.quoteBy}`}
              </footer>
            </blockquote>

            <div className="mt-10 grid gap-4 md:grid-cols-3">
              {MILLENNIUM_OUTCOME.points.map((p) => (
                <CaseCard key={p.stat}>
                  <CaseLabel>{p.stat}</CaseLabel>
                  <CaseCardText>{p.body}</CaseCardText>
                </CaseCard>
              ))}
            </div>

            <div className="mt-10">
              <CaseImageText
                src={MILLENNIUM_IMAGES.finalScore10}
                alt="Final score panel showing a completed 10 out of 10 run"
                caption={MILLENNIUM_OUTCOME.figCaption}
                reverse
              >
                <CaseLabel>{MILLENNIUM_OUTCOME.trailerTitle}</CaseLabel>
              </CaseImageText>
            </div>

            {trailerVideo ? (
              <div
                className="mt-5 overflow-hidden rounded-[16px] border"
                style={{ borderColor: "rgba(255,255,255,0.10)", background: C.deep, boxShadow: "0 16px 40px rgba(0,0,0,0.45)" }}
              >
                <video
                  className="aspect-video w-full"
                  src={trailerVideo.src}
                  poster={trailerVideo.poster}
                  controls
                  preload="none"
                  playsInline
                />
              </div>
            ) : null}

            <p className="mt-6 max-w-[68ch] text-[14px] font-semibold leading-[1.7]" style={{ color: C.text }}>
              {MILLENNIUM_OUTCOME.tryIt}
            </p>
          </div>
        </div>
      </CaseSection>

      {/* CREDITS */}
      <CaseSection id="credits">
        <CaseEyebrow>{MILLENNIUM_CREDITS.eyebrow}</CaseEyebrow>
        <CaseH2>{MILLENNIUM_CREDITS.title}</CaseH2>
        <CaseBody>{MILLENNIUM_CREDITS.body}</CaseBody>
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
