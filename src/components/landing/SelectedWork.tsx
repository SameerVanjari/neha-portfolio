"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  caseStudiesForLens,
  HOME_ALL_LIMIT,
  HOME_LENS_LIMIT,
  type CaseLens,
  type CaseStudy,
} from "@/data/case-studies";
import { useStagger, EASE_OUT, useMotionPref } from "@/components/motion/reveal";

const DISPLAY = { fontFamily: "var(--font-display)" } as const;
const BODY = { fontFamily: "var(--font-body)" } as const;

const FILTERS: { id: CaseLens | "all"; label: string }[] = [
  { id: "all", label: "All" },
  { id: "xr", label: "XR" },
  { id: "ux", label: "UX" },
  { id: "ai", label: "AI" },
  { id: "product", label: "Product Design" },
];

function Placeholder({ card }: { card: CaseStudy }) {
  return (
    <div
      aria-hidden={!card.image}
      className="flex aspect-[3/2] w-full flex-col items-start justify-end rounded-[14px] border border-dashed border-[#B8AFA2] bg-[#E4DDD1] p-[20px]"
    >
      <p className="text-[13px] font-normal leading-[1.45] text-[#4A4640]" style={BODY}>
        [{card.imageAlt ?? card.title}]
      </p>
    </div>
  );
}

function WorkCard({
  card,
  animateIn,
  delay,
}: {
  card: CaseStudy;
  animateIn: boolean;
  delay: number;
}) {
  const reduce = useMotionPref();
  return (
    /* Self-contained on purpose. A child that declares its own `initial`
       becomes self-controlling: it stops inheriting the group's variant state
       and never receives "visible", so it sits at opacity 0 forever — present,
       hoverable, clickable, and invisible. Owning the trigger here removes
       that dependency entirely. `initial={false}` after the first filter use
       keeps a lens change from replaying the entrance. */
    <motion.li
      className="w-full"
      initial={animateIn ? (reduce ? { opacity: 0 } : { opacity: 0, transform: "translateY(16px)" }) : false}
      whileInView={{ opacity: 1, transform: "translateY(0px)" }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: reduce ? 0.3 : 0.45, delay, ease: EASE_OUT }}
    >
      <Link
        href={`/projects/${card.id}`}
        className="group flex w-full flex-col items-start gap-[18px]"
        aria-label={`${card.title}, ${card.meta}, ${card.year ?? ""}`}
      >
      <div className="relative aspect-[3/2] w-full overflow-hidden rounded-[14px]">
        {card.image ? (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={card.image}
              alt={card.imageAlt ?? card.title}
              loading="lazy"
              draggable={false}
              className="h-full w-full object-cover transition-transform duration-300 ease-out motion-safe:group-hover:scale-[1.03] motion-reduce:transition-none"
            />
          </>
        ) : (
          <Placeholder card={card} />
        )}
        {card.badge && (
          <span
            className="absolute left-[20px] top-[20px] inline-flex items-center rounded-[999px] bg-[#F2EEE7] px-[12px] py-[6px] text-[12px] font-semibold text-[#3B33B5]"
            style={BODY}
          >
            {card.badge}
          </span>
        )}
      </div>
      <div className="flex w-full items-start justify-between text-[13px] font-normal tracking-[0.52px] text-[#5C5750]" style={BODY}>
        <p>{card.meta}</p>
        {card.year ? <p>{card.year}</p> : null}
      </div>
      <h3
        className="-mt-[4px] text-[25px] font-semibold leading-[1.15] tracking-[-0.375px] text-[#17161B]"
        style={DISPLAY}
      >
        {card.title}
      </h3>
      <p className="-mt-[6px] text-[16px] font-normal leading-[1.55] text-[#2B2926]" style={BODY}>
        {card.description}
      </p>
      <div className="w-full border-t border-[#DAD3C8] pt-[12px]">
        <p className="text-[14px] font-normal text-[#5C5750]" style={BODY}>
          {card.role}
        </p>
      </div>
      </Link>
    </motion.li>
  );
}

export default function SelectedWork() {
  const [filter, setFilter] = useState<CaseLens | "all">("all");
  /**
   * Two rows unfiltered, one row once a lens is picked — a filtered grid is
   * meant to be a taste of that discipline, not the whole archive. The full
   * lineup lives at /projects, which the "View all projects" link points to.
   *
   * The filter itself is a high-frequency control, so cards mount straight into
   * place after the first use instead of replaying a scroll entrance.
   */
  const [hasFiltered, setHasFiltered] = useState(false);
  const limit = filter === "all" ? HOME_ALL_LIMIT : HOME_LENS_LIMIT;
  const cards = caseStudiesForLens(filter).slice(0, limit);
  const filterLabel = FILTERS.find((f) => f.id === filter)?.label ?? filter;

  const { group, item, viewport } = useStagger({ step: 0.055, distance: 16 });

  return (
    <section id="work" aria-label="Selected work" className="bg-[#FBF9F5]">
      <motion.div
        variants={group}
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        className="mx-auto flex w-full max-w-[1200px] flex-col items-start gap-[44px] px-6 pb-[130px] pt-[80px] md:pt-[120px] lg:px-0"
      >
        <motion.div
          variants={item}
          className="flex w-full flex-wrap items-end justify-between gap-6"
        >
          <div className="flex flex-col items-start gap-[12px]">
            <h2
              className="text-[36px] font-semibold tracking-[-1.2px] text-[#17161B] md:text-[48px]"
              style={DISPLAY}
            >
              Selected work
            </h2>
            <p className="text-[17px] font-normal text-[#5C5750]" style={BODY}>
              Each case study covers the problem, my role, the key decisions, and the outcome.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-[8px]" role="group" aria-label="Filter by lens">
            {FILTERS.map((f) => {
              const active = f.id === filter;
              return (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => {
                    setHasFiltered(true);
                    setFilter(f.id);
                  }}
                  aria-pressed={active}
                  className={`inline-flex h-[44px] cursor-pointer items-center justify-center rounded-[999px] px-[20px] text-[14px] font-medium transition-colors ${
                    active
                      ? "bg-[#17161B] text-[#F2EEE7]"
                      : "border border-[#CFC7BA] text-[#17161B] hover:border-[#17161B]"
                  }`}
                  style={BODY}
                >
                  {f.label}
                </button>
              );
            })}
          </div>
        </motion.div>

        {cards.length > 0 ? (
          /* A 2-card row in a 3-up grid leaves a hole on the right, so the
             grid tightens to match the count — three or more stay 3-up, a
             short row becomes 2-up and reads as full.
             Deliberately a plain <ul>, not motion.ul: a motion element that
             declares no variants of its own breaks variant inheritance, so the
             cards would sit at their `hidden` state forever — invisible but
             still clickable. The plain element passes the group's variant
             state through, same as the <ol> in HowIWork. */
          <ul
            className={`grid w-full grid-cols-1 items-start gap-x-[33px] gap-y-12 md:grid-cols-2${
              cards.length > 2 ? " lg:grid-cols-3" : ""
            }`}
          >
            {cards.map((card, i) => (
              /* Key includes both the filter and hasFiltered on purpose. A
                 change to either must remount the cards so `initial` is read
                 fresh at mount — mutating it on live cards re-applies the
                 hidden state, which is what left a filtered grid stuck at
                 opacity 0. After the first filter use the mount lands straight
                 on the visible state, so switching lenses never replays an
                 entrance. `hasFiltered` is in the key because re-clicking the
                 active filter changes it without changing the filter. */
              <WorkCard
                key={`${filter}-${hasFiltered}-${card.id}`}
                card={card}
                animateIn={!hasFiltered}
                delay={i * 0.055}
              />
            ))}
          </ul>
        ) : (
          <div className="flex w-full flex-col items-start gap-3 rounded-[14px] border border-dashed border-[#B8AFA2] bg-[#F2EEE7] p-8" style={BODY}>
            <p className="text-[17px] font-medium text-[#17161B]">
              More {filterLabel} case studies live in the full archive.
            </p>
            <Link
              href="/projects"
              className="text-[15px] font-semibold text-[#17161B] underline underline-offset-4"
            >
              Browse all projects →
            </Link>
          </div>
        )}

        <motion.div variants={item}>
          <Link
            href="/projects"
            className="text-[15px] font-semibold text-[#17161B] underline underline-offset-4"
            style={BODY}
          >
            View all projects
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
