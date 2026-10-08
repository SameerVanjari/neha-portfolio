"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { EASE_OUT, REVEAL_VIEWPORT, useMotionPref } from "@/components/motion/reveal";

/**
 * Career timeline for the About page.
 *
 * A straight spine runs down the centre, "laid" as the section scrolls into
 * view. Each role is a station on the line: a checkpoint node, a curved branch
 * peeling off to a card, and the date range mirrored on the opposite side. On
 * small screens the spine docks to the left edge and the rows become a single
 * column with the date above each card.
 */

export type ExperienceEntry = {
  when: string;
  what: string;
  where: string;
  desc: string;
  url?: string;
};

const DISPLAY = { fontFamily: "var(--font-display)" } as const;
const BODY = { fontFamily: "var(--font-body)" } as const;

const INK = "#17161B";
const MUTED = "#5C5750";
const BODY_INK = "#2B2926";
const HAIRLINE = "#DAD3C8";
const SURFACE = "#FBF9F5";
const PAPER = "#F2EEE7";

/** Side-aware branch: leaves the spine tangentially, bows, and meets the card. */
const BRANCH: Record<"left" | "right", string> = {
  right: "M0 10 C12 10 10 4 24 4 C38 4 36 10 48 10",
  left: "M48 10 C36 10 38 4 24 4 C10 4 12 10 0 10",
};

function Checkpoint({ accent, latest, reduce }: { accent: string; latest: boolean; reduce: boolean }) {
  return (
    <motion.span
      aria-hidden
      className="absolute left-[13px] top-2 z-10 -translate-x-1/2 md:left-1/2 md:top-1/2 md:-translate-y-1/2"
      initial={reduce ? false : { opacity: 0, scale: 0.4 }}
      whileInView={reduce ? undefined : { opacity: 1, scale: 1 }}
      viewport={REVEAL_VIEWPORT}
      transition={{ duration: 0.45, ease: EASE_OUT }}
    >
      {latest ? (
        <span className="relative block h-[13px] w-[13px]">
          <span
            className="absolute left-1/2 top-1/2 h-[23px] w-[23px] -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{ background: accent, opacity: 0.16 }}
          />
          <span
            className="relative block h-[13px] w-[13px] rounded-full border"
            style={{ background: accent, borderColor: accent }}
          />
        </span>
      ) : (
        <span
          className="block h-[13px] w-[13px] rounded-full border"
          style={{ background: PAPER, borderColor: HAIRLINE }}
        />
      )}
    </motion.span>
  );
}

function Branch({ side, reduce }: { side: "left" | "right"; reduce: boolean }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 48 20"
      className="pointer-events-none absolute top-1/2 hidden h-5 w-12 -translate-y-1/2 md:block"
      style={side === "right" ? { left: "50%" } : { right: "50%" }}
    >
      <motion.path
        d={BRANCH[side]}
        fill="none"
        stroke={HAIRLINE}
        strokeWidth={1}
        vectorEffect="non-scaling-stroke"
        initial={reduce ? false : { pathLength: 0 }}
        whileInView={reduce ? undefined : { pathLength: 1 }}
        viewport={REVEAL_VIEWPORT}
        transition={{ duration: 0.6, ease: EASE_OUT }}
      />
    </svg>
  );
}

function Row({
  job,
  index,
  accent,
  reduce,
}: {
  job: ExperienceEntry;
  index: number;
  accent: string;
  reduce: boolean;
}) {
  const cardRight = index % 2 === 0;
  const dir = cardRight ? 28 : -28;

  const cardMotion = reduce
    ? {}
    : {
        initial: { opacity: 0, transform: `translateX(${dir}px)` },
        whileInView: { opacity: 1, transform: "translateX(0px)" },
      };

  const dateMotion = reduce
    ? {}
    : {
        initial: { opacity: 0 },
        whileInView: { opacity: 1 },
      };

  return (
    <li className="relative">
      <div className="pl-9 md:grid md:grid-cols-2 md:items-center md:gap-x-24 md:pl-0">
        {/* DATE — opposite the card, mirrored on desktop */}
        <motion.div
          {...dateMotion}
          viewport={REVEAL_VIEWPORT}
          transition={{ duration: 0.5, ease: EASE_OUT }}
          className={
            cardRight
              ? "md:col-start-1 md:row-start-1 md:justify-self-end md:text-right"
              : "md:col-start-2 md:row-start-1 md:justify-self-start md:text-left"
          }
        >
          <time className="text-[11px] tracking-[0.08em]" style={{ color: MUTED, ...BODY }}>
            {job.when}
          </time>
        </motion.div>

        {/* CARD */}
        <motion.div
          {...cardMotion}
          viewport={REVEAL_VIEWPORT}
          transition={{ duration: 0.5, ease: EASE_OUT, delay: 0.04 }}
          className={
            (cardRight
              ? "mt-2 md:col-start-2 md:row-start-1 md:justify-self-start md:mt-0"
              : "mt-2 md:col-start-1 md:row-start-1 md:justify-self-end md:mt-0") +
            " w-full max-w-[440px] rounded-[14px] border px-5 py-4"
          }
          style={{ background: SURFACE, borderColor: HAIRLINE }}
        >
          <p className="text-[15px] font-semibold tracking-[-0.02em]" style={{ color: INK, ...DISPLAY }}>
            {job.what}
          </p>
          {job.url ? (
            <a
              href={job.url}
              target="_blank"
              rel="noreferrer"
              className="mt-1 inline-block text-[11px] tracking-[0.08em] underline decoration-[#CFC7BA] underline-offset-[3px] transition-colors hover:text-[#17161B] hover:decoration-[#17161B]"
              style={{ color: MUTED, ...BODY }}
            >
              {job.where}
              <span aria-hidden className="ml-1 opacity-60">
                ↗
              </span>
            </a>
          ) : (
            <div className="mt-1 text-[11px] tracking-[0.08em]" style={{ color: MUTED, ...BODY }}>
              {job.where}
            </div>
          )}
          <p className="mt-2 text-[13px] leading-[1.6]" style={{ color: BODY_INK, ...BODY }}>
            {job.desc}
          </p>
        </motion.div>
      </div>

      <Checkpoint accent={accent} latest={index === 0} reduce={reduce} />
      <Branch side={cardRight ? "right" : "left"} reduce={reduce} />
    </li>
  );
}

export default function ExperienceTimeline({
  items,
  accent = "#06B6D4",
}: {
  items: ExperienceEntry[];
  accent?: string;
}) {
  const reduce = useMotionPref();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.8", "end 0.6"] });
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div ref={ref} className="relative mt-8">
      {/* Spine track */}
      <div
        aria-hidden
        className="absolute bottom-3 left-[13px] top-3 w-px md:left-1/2 md:-translate-x-1/2"
        style={{ background: HAIRLINE }}
      />
      {/* Spine progress — drawn as the section scrolls */}
      {reduce ? (
        <div
          aria-hidden
          className="absolute bottom-3 left-[13px] top-3 w-px md:left-1/2 md:-translate-x-1/2"
          style={{ background: INK }}
        />
      ) : (
        <motion.div
          aria-hidden
          className="absolute bottom-3 left-[13px] top-3 w-px md:left-1/2 md:-translate-x-1/2"
          style={{ background: INK, scaleY, transformOrigin: "top" }}
        />
      )}

      <ol className="relative flex flex-col gap-12 md:gap-16">
        {items.map((job, i) => (
          <Row key={`${job.where}-${job.when}`} job={job} index={i} accent={accent} reduce={reduce} />
        ))}
      </ol>
    </div>
  );
}
