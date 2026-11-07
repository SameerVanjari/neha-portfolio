"use client";

import { useState } from "react";
import Link from "next/link";
import type { HomeLens, HomeLensId, HomeProject } from "@/data/lenses";
import { LENS_ORDER, LENSES } from "@/data/lenses";
import { Reveal } from "@/components/motion/reveal";

type Rank = {
  lens: HomeLens;
  project: HomeProject;
  slot: "featured" | "standard" | "compact";
};

const FILTER_LABELS: Record<HomeLensId, string> = {
  product: "Product",
  ux: "UX",
  xr: "XR",
  ai: "AI",
};

/** Top-5 pool (design note 583:513): #1 featured, 2–3 standard, 4–5 compact.
    Product leads the ranking; then the remaining lenses in journey order. */
function poolFor(filter: "all" | HomeLensId): Rank[] {
  if (filter === "all") {
    return [
      { lens: LENSES.product, project: LENSES.product.projects[0], slot: "featured" },
      { lens: LENSES.ai, project: LENSES.ai.projects[0], slot: "standard" },
      { lens: LENSES.xr, project: LENSES.xr.projects[0], slot: "standard" },
      { lens: LENSES.ux, project: LENSES.ux.projects[0], slot: "compact" },
      { lens: LENSES.ai, project: LENSES.ai.projects[1], slot: "compact" },
    ];
  }
  const lens = LENSES[filter];
  return lens.projects.map((project, i) => ({
    lens,
    project,
    slot: i === 0 ? "featured" : "standard",
  }));
}

function rankLabel(slot: Rank["slot"], index: number) {
  if (slot === "featured") return "01 · Featured";
  if (slot === "compact") return `0${4 + index} · optional`;
  return `0${2 + index}`;
}

const CARD_LINK_BASE =
  "group transition-transform duration-200 ease-out hover:-translate-y-[2px]";
const THUMB_FRAME = "rounded-[14px] border-[1.5px] border-dashed border-[rgba(180,156,255,0.35)] bg-[#1c1a45] overflow-hidden";

/** Selected work (nodes 583:369–583:458) — filter, featured, cards, bridge. */
export default function Work({
  filter,
  onFilter,
}: {
  filter: "all" | HomeLensId;
  onFilter: (filter: "all" | HomeLensId) => void;
}) {
  const [spinning, setSpinning] = useState<HomeLensId | null>(null);
  const ranks = poolFor(filter);
  const featured = ranks.filter((r) => r.slot === "featured");
  const standard = ranks.filter((r) => r.slot === "standard");
  const compact = ranks.filter((r) => r.slot === "compact");

  const chipBase =
    "home-body flex items-center rounded-full text-[14px] transition-colors";
  const idleChip = "border border-[#1c1a45] font-medium text-[#aba8cc]";

  return (
    <section
      aria-label="Selected work"
      className="flex flex-col gap-[28px] px-6 pb-[80px] pt-[32px] lg:px-[132px]"
    >
      <Reveal>
        <div className="flex items-end justify-between gap-4">
          <h2 className="home-display text-[clamp(34px,3.6vw,52px)] font-bold leading-none text-[#f3f1ff]">
            Selected work
          </h2>
          <Link
            href="/projects"
            className="home-body whitespace-nowrap text-[17px] font-medium text-[#b49cff] transition-opacity hover:opacity-60"
          >
            All projects →
          </Link>
        </div>
      </Reveal>

      {/* Lens filter — mini orbs match the hero Journey nodes (583:519). */}
      <Reveal delay={0.06}>
        <div className="flex flex-wrap gap-[10px]">
          <button
            type="button"
            onClick={() => onFilter("all")}
            aria-pressed={filter === "all"}
            className={`${chipBase} px-[16px] py-[9px] ${
              filter === "all"
                ? "bg-[#f3f1ff] font-semibold text-[#0a0918]"
                : idleChip
            }`}
          >
            All
          </button>
          {LENS_ORDER.map((id) => {
            const node = LENSES[id];
            const active = filter === id;
            return (
              <button
                key={id}
                type="button"
                aria-pressed={active}
                onClick={() => {
                  onFilter(id);
                  setSpinning(id);
                }}
                onAnimationEnd={() => setSpinning(null)}
                className={`${chipBase} gap-[8px] border py-[9px] pl-[6px] pr-[16px] ${
                  active
                    ? "border-[rgba(180,156,255,0.6)] text-[#f3f1ff]"
                    : idleChip
                }`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={node.nodeEyeSmall}
                  alt=""
                  aria-hidden
                  className={`size-[24px] rounded-full object-cover ${
                    spinning === id ? "animate-work-orb" : ""
                  }`}
                />
                {FILTER_LABELS[id]}
              </button>
            );
          })}
        </div>
      </Reveal>

      {/* Featured — Top project 1 (583:388) */}
      {featured.map((rank) => (
        <Reveal key={rank.project.title} delay={0.1}>
          <Link
            href={rank.project.href}
            className="group flex flex-col gap-[24px] rounded-[24px] bg-[#121130] pb-[28px] pl-[20px] pt-[20px] md:flex-row md:items-center md:gap-[40px] md:pb-[20px] md:pr-[40px]"
          >
            <div
              className={`h-[420px] shrink-0 md:w-[680px] ${THUMB_FRAME}`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={rank.project.image}
                alt={rank.project.imageAlt}
                loading="lazy"
                className="size-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
              />
            </div>
            <div className="flex min-w-0 flex-col items-start gap-[14px] px-1">
              <p className="home-body text-[13px] font-semibold uppercase tracking-[1.56px] text-[#b49cff]">
                {rankLabel(rank.slot, 0)}
              </p>
              <h3 className="home-display text-[clamp(30px,2.8vw,40px)] font-bold leading-[1.1] text-[#f3f1ff]">
                {rank.project.title}
              </h3>
              <p className="home-body text-[18px] leading-[1.4] text-[#aba8cc]">
                {rank.project.meta}
              </p>
              <div className="flex flex-wrap items-start gap-[8px] py-[4px]">
                <span
                  className={`${chipBase} gap-[8px] border border-[#1c1a45] px-[16px] py-[9px] font-medium text-[#aba8cc]`}
                >
                  <span aria-hidden className="size-[7px] rounded-full bg-[#b49cff]" />
                  {rank.lens.node}
                </span>
                <span
                  className={`${chipBase} border border-[#1c1a45] px-[16px] py-[9px] font-medium text-[#aba8cc]`}
                >
                  {rank.lens.role}
                </span>
              </div>
              <span className="home-body block whitespace-nowrap text-[16px] font-semibold text-[#b49cff]">
                View case study →
              </span>
            </div>
          </Link>
        </Reveal>
      ))}

      {/* Top projects 2–3 (583:406) */}
      <div className="grid grid-cols-1 gap-[24px] lg:grid-cols-2">
        {standard.map((rank, i) => (
          <Reveal key={rank.project.title} delay={0.14 + i * 0.08}>
            <Link
              href={rank.project.href}
              className={`${CARD_LINK_BASE} flex h-full flex-col gap-[14px] rounded-[20px] bg-[#121130] px-[16px] pb-[24px] pt-[16px]`}
            >
              <div className={`h-[306px] ${THUMB_FRAME}`}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={rank.project.image}
                  alt={rank.project.imageAlt}
                  loading="lazy"
                  className="size-full object-cover"
                />
              </div>
              <div className="flex flex-col items-start gap-[8px] px-[8px] pt-[4px]">
                <p className="home-body text-[13px] font-semibold tracking-[1.3px] text-[#b49cff]">
                  {rankLabel(rank.slot, i)}
                </p>
                <h3 className="home-display text-[26px] font-semibold leading-[1.08] text-[#f3f1ff]">
                  {rank.project.title}
                </h3>
                <p className="home-body text-[16px] text-[#aba8cc]">{rank.project.meta}</p>
                <div className="flex items-center gap-[8px] pt-[6px]">
                  <span aria-hidden className="size-[7px] rounded-full bg-[#b49cff]" />
                  <p className="home-body text-[13px] font-medium text-[#8e8bb3]">
                    {`${rank.lens.node} · ${rank.lens.role}`}
                  </p>
                </div>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>

      {/* Top projects 4–5, optional compact slots (583:407) */}
      {compact.length > 0 && (
        <div className="grid grid-cols-1 gap-[24px] lg:grid-cols-2">
          {compact.map((rank, i) => (
            <Reveal key={rank.project.title} delay={0.2 + i * 0.08}>
              <Link
                href={rank.project.href}
                className={`${CARD_LINK_BASE} flex items-center gap-[20px] rounded-[16px] bg-[#121130] py-[12px] pl-[12px] pr-[20px]`}
              >
                <div className={`h-[124px] w-[208px] shrink-0 ${THUMB_FRAME}`}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={rank.project.image}
                    alt={rank.project.imageAlt}
                    loading="lazy"
                    className="size-full object-cover"
                  />
                </div>
                <div className="flex min-w-0 flex-col items-start gap-[6px]">
                  <p className="home-body whitespace-nowrap text-[13px] font-semibold tracking-[1.3px] text-[#b49cff]">
                    {rankLabel(rank.slot, i)}
                  </p>
                  <h3 className="home-display whitespace-nowrap text-[22px] font-semibold text-[#f3f1ff]">
                    {rank.project.title}
                  </h3>
                  <p className="home-body w-full text-[15px] text-[#aba8cc]">{rank.project.meta}</p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      )}

      {/* Bridge → All work (583:458) */}
      <Reveal delay={0.2}>
        <div className="flex flex-wrap items-center justify-between gap-[20px] border-t border-[#1c1a45] pt-[24px]">
          <p className="home-body text-[18px] text-[#aba8cc]">
            From sculpted objects to AI copilots, every project is on the Work page.
          </p>
          <Link
            href="/projects"
            className="home-body inline-flex items-center rounded-full border border-[rgba(180,156,255,0.6)] px-[22px] py-[12px] text-[15px] font-semibold text-[#b49cff] transition-colors hover:bg-[rgba(180,156,255,0.12)]"
          >
            See all projects →
          </Link>
        </div>
      </Reveal>
    </section>
  );
}
