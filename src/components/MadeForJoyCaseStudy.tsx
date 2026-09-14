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
import content from "../../content/made-for-joy/index.json";

type Block = { type: string; text: string };
type ImageRef = { file: string; alt: string; role?: string };
type TeamEntry = { role: string; value?: string; detail?: string };
type Section = {
  index: number;
  slug: string;
  label: string;
  heading?: string;
  eyebrow?: string;
  blocks?: Block[];
  images?: ImageRef[];
  client?: { goal: string; collaborators: string; tools: string };
  challenges?: string[];
  contributions?: { name: string; body: string }[];
  principles?: string[];
  statement?: { heading: string; items: string[] };
  moments?: { number: string; name: string; body: string; image?: string }[];
  team?: TeamEntry[];
};

const data = content as unknown as {
  project: Record<string, string>;
  tags: string[];
  toolkit: string[];
  sections: Section[];
};

const tocItems = data.sections.map((s) => ({
  id: s.slug,
  label: s.label,
}));

function Blocks({ blocks }: { blocks?: Block[] }) {
  if (!blocks) return null;
  return (
    <>
      {blocks.map((b, i) => {
        if (b.type === "kicker") {
          return (
            <p key={i} className="font-mono text-[11px] tracking-[0.18em]" style={{ color: C.accent }}>
              {b.text}
            </p>
          );
        }
        if (b.type === "subtitle") {
          return (
            <p key={i} className="mt-4 max-w-[62ch] text-[18px] leading-[1.6]" style={{ fontFamily: "var(--font-body)", color: "rgba(255,255,255,0.85)" }}>
              {b.text}
            </p>
          );
        }
        return (
          <p key={i} className="mt-4 max-w-[68ch] text-[15px] leading-[1.75]" style={{ fontFamily: "var(--font-body)", color: "rgba(255,255,255,0.82)" }}>
            {b.text}
          </p>
        );
      })}
    </>
  );
}

function SectionImages({ images }: { images?: ImageRef[] }) {
  if (!images || !images.length) return null;
  return (
    <div className="mt-8 grid gap-3">
      {images.map((img) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={img.file}
          src={img.file}
          alt={img.alt}
          className="w-full rounded-[16px] border"
          style={{ borderColor: "rgba(255,255,255,0.10)", background: C.deep }}
        />
      ))}
    </div>
  );
}

export default function MadeForJoyCaseStudy({
  project,
  related,
}: {
  project: Project;
  related: Project[];
}) {
  const meta = [project.year, project.subtitle ?? project.dimension, project.client]
    .filter(Boolean)
    .join(" · ");

  const title = data.sections.find((s) => s.slug === "title");
  const overview = data.sections.find((s) => s.slug === "overview");
  const challenge = data.sections.find((s) => s.slug === "challenge");
  const approach = data.sections.find((s) => s.slug === "approach");
  const principles = data.sections.find((s) => s.slug === "principles");
  const journey = data.sections.find((s) => s.slug === "journey");
  const credits = data.sections.find((s) => s.slug === "credits");

  return (
    <CaseStudyShell project={project} related={related} tocItems={tocItems}>
      {/* TITLE / HERO */}
      <section id="title" className="scroll-mt-[88px] pb-12 md:pb-16">
        <CaseEyebrow>{meta}</CaseEyebrow>
        <h1
          className="mt-4 max-w-[20ch] font-display text-[32px] font-semibold leading-[1.05] tracking-[-0.03em] md:text-[52px]"
          style={{ fontFamily: "var(--font-display)", color: C.text }}
        >
          {title?.heading || project.title}
        </h1>
        <Blocks blocks={title?.blocks} />
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

      {/* OVERVIEW */}
      {overview ? (
        <CaseSection id="overview">
          <CaseEyebrow>{overview.eyebrow}</CaseEyebrow>
          <Blocks blocks={overview.blocks} />
          {overview.client ? (
            <div className="mt-6 grid gap-3 md:grid-cols-3">
              <CaseCard>
                <CaseLabel>Goal</CaseLabel>
                <CaseCardText>{overview.client.goal}</CaseCardText>
              </CaseCard>
              <CaseCard>
                <CaseLabel>Collaborators</CaseLabel>
                <CaseCardText>{overview.client.collaborators}</CaseCardText>
              </CaseCard>
              <CaseCard>
                <CaseLabel>Tools</CaseLabel>
                <CaseCardText>{overview.client.tools}</CaseCardText>
              </CaseCard>
            </div>
          ) : null}
          <SectionImages images={overview.images} />
        </CaseSection>
      ) : null}

      {/* CHALLENGE */}
      {challenge ? (
        <CaseSection id="challenge">
          <CaseEyebrow>{challenge.eyebrow}</CaseEyebrow>
          <CaseH2>The Challenge</CaseH2>
          <Blocks blocks={challenge.blocks} />
          {challenge.challenges ? (
            <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
              {challenge.challenges.map((c) => (
                <li
                  key={c}
                  className="rounded-[12px] border px-4 py-3 text-[14px] leading-[1.65]"
                  style={{ borderColor: "rgba(255,255,255,0.10)", background: C.surface, color: "rgba(255,255,255,0.82)" }}
                >
                  {c}
                </li>
              ))}
            </ul>
          ) : null}
          <SectionImages images={challenge.images} />
        </CaseSection>
      ) : null}

      {/* APPROACH */}
      {approach ? (
        <CaseSection id="approach">
          <CaseEyebrow>{approach.eyebrow}</CaseEyebrow>
          <CaseH2>Approach</CaseH2>
          <Blocks blocks={approach.blocks} />
          {approach.contributions ? (
            <div className="mt-6 grid gap-2.5 md:grid-cols-3">
              {approach.contributions.map((c) => (
                <CaseCard key={c.name}>
                  <div className="font-mono text-[11px] font-semibold tracking-[0.12em]" style={{ color: C.accent }}>{c.name}</div>
                  <CaseCardText>{c.body}</CaseCardText>
                </CaseCard>
              ))}
            </div>
          ) : null}
          <SectionImages images={approach.images} />
        </CaseSection>
      ) : null}

      {/* PRINCIPLES */}
      {principles ? (
        <CaseSection id="principles">
          <CaseEyebrow>{principles.eyebrow}</CaseEyebrow>
          <CaseH2>Embodied Interaction Principles</CaseH2>
          <Blocks blocks={principles.blocks} />
          {principles.principles ? (
            <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
              {principles.principles.map((p) => (
                <li key={p} className="border-l-2 pl-4 text-[14px] leading-[1.65]" style={{ borderColor: C.accent, color: "rgba(255,255,255,0.85)" }}>
                  {p}
                </li>
              ))}
            </ul>
          ) : null}
          {principles.statement ? (
            <CaseCard accent>
              <CaseLabel>{principles.statement.heading}</CaseLabel>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {principles.statement.items.map((it) => (
                  <CaseChip key={it}>{it}</CaseChip>
                ))}
              </div>
            </CaseCard>
          ) : null}
          <SectionImages images={principles.images} />
        </CaseSection>
      ) : null}

      {/* JOURNEY */}
      {journey ? (
        <CaseSection id="journey">
          <CaseEyebrow>{journey.eyebrow}</CaseEyebrow>
          <CaseH2>Interaction Journey</CaseH2>
          <Blocks blocks={journey.blocks} />
          {journey.moments ? (
            <div className="mt-8 grid gap-6 md:grid-cols-2">
              {journey.moments.map((m) => (
                <div key={m.number} className="overflow-hidden rounded-[16px] border" style={{ borderColor: "rgba(255,255,255,0.10)", background: C.surface }}>
                  {m.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={m.image} alt={m.name} className="w-full border-b" style={{ borderColor: "rgba(255,255,255,0.10)" }} />
                  ) : null}
                  <div className="p-5">
                    <div className="font-mono text-[11px] tracking-[0.14em]" style={{ color: C.accent }}>{m.number}</div>
                    <div className="mt-1 font-display text-[16px] font-semibold" style={{ color: C.text }}>{m.name}</div>
                    <p className="mt-2 text-[13px] leading-[1.7]" style={{ color: "rgba(255,255,255,0.78)" }}>{m.body}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : null}
        </CaseSection>
      ) : null}

      {/* CREDITS */}
      {credits ? (
        <CaseSection id="credits">
          <CaseEyebrow>{credits.eyebrow}</CaseEyebrow>
          <CaseH2>Credits</CaseH2>
          <Blocks blocks={credits.blocks} />
          {credits.team ? (
            <div className="mt-6 grid gap-2.5 sm:grid-cols-2">
              {credits.team.map((t) => (
                <div key={t.role} className="rounded-[12px] border px-4 py-3" style={{ borderColor: "rgba(255,255,255,0.10)", background: C.surface }}>
                  <div className="text-[14px] font-semibold" style={{ color: C.text }}>{t.role}</div>
                  {t.value ? <div className="mt-1 text-[13px]" style={{ color: "rgba(255,255,255,0.78)" }}>{t.value}</div> : null}
                  {t.detail ? <div className="mt-1 text-[12px]" style={{ color: C.muted }}>{t.detail}</div> : null}
                </div>
              ))}
            </div>
          ) : null}
        </CaseSection>
      ) : null}
    </CaseStudyShell>
  );
}
