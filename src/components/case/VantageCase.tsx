"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import {
  BETTER,
  FACTS,
  HERO,
  HIFI,
  HMWS,
  IDEATION,
  JOURNEY,
  NEIGHBORS,
  PROBLEM,
  PROTOTYPING,
  RESEARCH,
  SOLVES,
  WIREFRAMES,
} from "@/data/vantage";
import { FOOTER_LINKS } from "@/data/landing";
import { vantageFigure } from "@/data/vantage-media";
import { EASE_OUT, Reveal, useStagger, useMotionPref } from "@/components/motion/reveal";
import { useLoadStage } from "@/components/LoadStage";
import { caseStudyThumb } from "@/data/case-studies";
import { ProjectRuler } from "@/components/ProjectRuler";

const DARK = "#16171C";
const FAINT_DARK = "#0E0F13";
const BLUE = "#2340C9";
const PALE = "#7C9CFF";
const GOLD = "#F2B872";
const PAPER = "#F3F0E9";
const INK = "#17181C";
const MUTED = "#5C5F66";
const PANEL = "#2A2D36";
const HAIR = "#262832";
const CARD_BORDER = "#E2DDD2";
const RUST = "#8A5313";

const DISPLAY = { fontFamily: "var(--font-display)" } as const;
const BODY = { fontFamily: "var(--font-body)" } as const;

/* ---------------------------------- motion --------------------------------- */

/**
 * Above the fold, the hero plays on load rather than on scroll, so it can't
 * use the shared `useStagger` (viewport-triggered, never fires above the
 * fold). Same easing and 500ms-class timing as the other case studies.
 * Opacity lives on the items, never the container, so no branch can trap the
 * hero at zero; reduced motion keeps the fade and drops all movement.
 */
function heroMotion(mode: "pending" | boolean): { group: Variants; item: Variants } {
  if (mode === "pending") {
    return {
      group: { hidden: {}, visible: {} },
      item: { hidden: { opacity: 0 }, visible: { opacity: 1 } },
    };
  }
  if (mode) {
    return {
      group: { hidden: {}, visible: { transition: { duration: 0.3 } } },
      item: {
        hidden: { opacity: 0, transform: "translateY(0px)" },
        visible: { opacity: 1, transform: "translateY(0px)", transition: { duration: 0.3 } },
      },
    };
  }
  return {
    group: {
      hidden: {},
      visible: { transition: { delayChildren: 0.05, staggerChildren: 0.09 } },
    },
    item: {
      hidden: { opacity: 0, transform: "translateY(20px)" },
      visible: {
        opacity: 1,
        transform: "translateY(0px)",
        transition: { duration: 0.55, ease: EASE_OUT },
      },
    },
  };
}

/**
 * The media query is unavailable during SSR, so the preference is read only
 * after mount. Server markup and the first client frame therefore match, and
 * the reduced-motion variant applies as a normal update.
 */
function useMotionReady(): boolean {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      setReady(true);
    });
    return () => cancelAnimationFrame(frame);
  }, []);
  return ready;
}

function SectionHead({
  eyebrow,
  heading,
  note,
  dark,
}: {
  eyebrow: string;
  heading: string;
  note?: string;
  dark?: boolean;
}) {
  // Every section announces itself identically: heading block lands, note
  // follows a beat behind. Uniform arrival lets a long scroll read as one
  // document rather than a dozen separate screens.
  const { group, item, viewport } = useStagger({ distance: 16, step: 0.07 });

  return (
    <motion.div
      variants={group}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      className="flex flex-wrap items-end justify-between gap-6 pb-9"
    >
      <motion.div variants={item} className="max-w-[900px]">
        <p
          className="text-[11px] font-bold uppercase tracking-[1.32px]"
          style={{ ...BODY, color: dark ? PALE : BLUE }}
        >
          {eyebrow}
        </p>
        <h2
          className="mt-[14px] text-[30px] leading-[1.15] tracking-[-0.38px] md:text-[38px]"
          style={{ ...DISPLAY, color: dark ? "#F2F0EB" : INK }}
        >
          {heading}
        </h2>
      </motion.div>
      {note && (
        <motion.p
          variants={item}
          className="max-w-[340px] text-right text-[14px] leading-[1.5]"
          style={{ ...BODY, color: dark ? "#B6BAC4" : MUTED }}
        >
          {note}
        </motion.p>
      )}
    </motion.div>
  );
}

function Icon({ name, size = 20, className = "" }: { name: string; size?: number; className?: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img loading="lazy" decoding="async"
      src={`/case/vantage/${name}.svg`}
      width={size}
      height={size}
      alt=""
      aria-hidden
      draggable={false}
      className={`select-none ${className}`}
    />
  );
}

/**
 * A figure slot. Renders the real export when one exists for this name, and
 * otherwise keeps the Figma drop-frame treatment — so a slot still awaiting
 * artwork reads as pending rather than as a broken image.
 */
function DropZone({
  note,
  className = "",
  alt,
  loading = "lazy",
}: {
  note: string;
  className?: string;
  alt?: string;
  /** Above-the-fold media opts out of lazy loading so it can be the LCP. */
  loading?: "eager" | "lazy";
}) {
  const src = vantageFigure(note);

  if (src) {
    return (
      <div className={`overflow-hidden ${className}`} style={{ background: PANEL }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={alt ?? note.replace(/\.png$/, "")}
          loading={loading}
          draggable={false}
          className="h-full w-full object-cover"
        />
      </div>
    );
  }

  return (
    <div
      aria-label={`Image placeholder: ${note}`}
      className={`flex flex-col items-center justify-center overflow-hidden ${className}`}
      style={{ background: PANEL }}
    >
      <span className="px-2 text-center text-[10px] leading-[1.4]" style={{ ...BODY, color: PALE }}>
        Drop image
        <br />
        {note}
      </span>
    </div>
  );
}

function Nav() {
  const reduce = useMotionPref();
  // Same load choreography as the site header: the bar drops in last, once the
  // hero copy has landed, so the two never arrive on top of each other.
  const { stage } = useLoadStage();

  return (
    <motion.header
      initial={{ transform: "translateY(-100%)" }}
      animate={{ transform: stage === "nav" ? "translateY(0%)" : "translateY(-100%)" }}
      transition={{ duration: reduce ? 0.2 : 0.65, ease: EASE_OUT }}
      style={{ background: PAPER }}
    >
      <div className="mx-auto flex h-[68px] w-full max-w-[1036px] items-center justify-between px-6 lg:px-0">
        <Link href="/" className="text-[16px] font-semibold" style={{ ...DISPLAY, color: INK }}>
          Neha Mayacharya
        </Link>
        <nav aria-label="Primary" className="hidden items-center gap-[30px] md:flex" style={BODY}>
          <Link href="/projects" className="border-b border-[#17181C] pb-[3px] text-[14px]" style={{ color: INK }}>
            Work
          </Link>
          <Link href="/about" className="text-[14px] transition-opacity duration-200 hover:opacity-70" style={{ color: INK }}>
            About
          </Link>
          <a target="_blank" rel="noreferrer" href="/resume.pdf" className="text-[14px] transition-opacity duration-200 hover:opacity-70" style={{ color: INK }}>
            Résumé (PDF)
          </a>
          <Link
            href="/#contact"
            className="inline-flex h-[40px] items-center rounded-[999px] px-[20px] text-[14px] font-semibold text-white transition-[transform,opacity] duration-150 motion-safe:hover:-translate-y-[1px] motion-safe:active:scale-[0.98]"
            style={{ background: INK }}
          >
            Contact
          </Link>
        </nav>
        <Link
          href="/#contact"
          className="inline-flex h-[40px] items-center rounded-[999px] px-[20px] text-[14px] font-semibold text-white transition-[transform,opacity] duration-150 motion-safe:hover:-translate-y-[1px] motion-safe:active:scale-[0.98] md:hidden"
          style={{ ...BODY, background: INK }}
        >
          Contact
        </Link>
      </div>
    </motion.header>
  );
}

function Hero() {
  const reduce = useMotionPref();
  const ready = useMotionReady();
  // The hero is above the fold, so it animates on load rather than on scroll.
  // It stays hidden until the preloader releases, otherwise it would play out
  // unseen behind the gate.
  const { stage } = useLoadStage();
  const { group, item } = heroMotion(!ready ? "pending" : !!reduce);

  return (
    <section className="relative overflow-hidden" style={{ background: DARK }}>
      <div
        aria-hidden
        className="pointer-events-none absolute right-[-60px] top-[-20px] size-[760px] rounded-full opacity-70"
        style={{
          background:
            "radial-gradient(circle, rgba(124,156,255,0.4) 0%, rgba(124,156,255,0.12) 38%, rgba(22,23,28,0) 70%)",
        }}
      />
      <motion.div
        variants={group}
        initial="hidden"
        animate={stage === "loading" ? "hidden" : "visible"}
        className="relative mx-auto grid w-full max-w-[1036px] items-center gap-10 px-6 py-[70px] lg:grid-cols-[500px_1fr] lg:px-0 lg:py-[104px]"
      >
        <div className="max-w-[500px]">
          <motion.div variants={item}>
          <p className="text-[13px] font-semibold" style={{ ...BODY, color: PALE }}>
            <span className="text-white">{HERO.eyebrowLead}</span>
            {HERO.eyebrowRest}
          </p>
          <h1
            className="mt-[18px] text-[clamp(40px,5vw,60px)] font-semibold leading-[1.04] tracking-[-0.02em] text-[#F2F0EB]"
            style={DISPLAY}
          >
            {HERO.titleLead}
            <span style={{ color: GOLD }}>{HERO.titleAccent}</span>
          </h1>
          <p className="mt-[18px] max-w-[490px] text-[18px] leading-[1.5] text-[#C9CCD4]" style={BODY}>
            {HERO.subtitle}
          </p>
          </motion.div>
          <motion.div variants={item} className="mt-[34px] border-l-[3px] pl-4" style={{ borderColor: PALE }}>
            <p className="text-[16px] font-semibold text-[#F2F0EB]" style={BODY}>
              {HERO.role}
            </p>
            <p className="mt-[2px] text-[14px] text-[#9398A3]" style={BODY}>
              {HERO.roleNote}
            </p>
          </motion.div>
          <motion.a
            variants={item}
            href="#hifi"
            className="mt-[34px] inline-flex h-[46px] items-center rounded-[999px] px-[22px] text-[15px] font-semibold transition-[transform,opacity] duration-150 motion-safe:hover:-translate-y-[1px] motion-safe:active:scale-[0.98] motion-safe:hover:opacity-90"
            style={{ ...BODY, background: PALE, color: INK }}
          >
            {HERO.cta}
          </motion.a>
        </div>
        <motion.div
          variants={item}
          className="overflow-hidden rounded-[14px] border border-[#2C3342] bg-[#0F1216] shadow-[0px_24px_50px_0px_rgba(0,0,0,0.5)]"
        >
          <div className="flex items-center gap-[7px] bg-[#1B1F26] py-[11px] pl-[14px]" aria-hidden>
            <span className="size-[11px] rounded-full bg-[#FF5F57]" />
            <span className="size-[11px] rounded-full bg-[#FEBC2E]" />
            <span className="size-[11px] rounded-full bg-[#28C840]" />
          </div>
          <DropZone
                    note={HERO.browserNote}
                    className="aspect-[680/425] w-full"
                    alt="Vantage AI Preview: role-fit score, skills gap and the bullet improver"
                    loading="eager"
                  />
        </motion.div>
      </motion.div>
    </section>
  );
}

function Facts() {
  // A tight band of metadata: the four facts assemble in one beat rather than
  // each getting its own moment.
  const { group, item, viewport } = useStagger({ distance: 12, step: 0.05 });

  return (
    <section data-index="At a glance" data-tone="dark" aria-label="At a glance" style={{ background: FAINT_DARK }}>
      <div className="mx-auto w-full max-w-[1036px] px-6 lg:px-0">
        <motion.ul
          variants={group}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="grid grid-cols-2 lg:grid-cols-4"
        >
          {FACTS.map((fact, i) => (
            <motion.li
              key={fact.label}
              variants={item}
              className="flex items-start gap-3 py-[22px] lg:px-5 lg:first:pl-0"
              style={{ borderLeft: i > 0 ? `1px solid ${HAIR}` : undefined }}
            >
              <Icon name={fact.icon} size={20} className="mt-[2px] shrink-0" />
              <div>
                <p className="text-[11px] tracking-[0.44px] text-[#9398A3]" style={BODY}>
                  {fact.label}
                </p>
                <p className="mt-[2px] text-[15px] font-semibold leading-[1.5] text-[#F2F0EB]" style={BODY}>
                  {fact.value}
                </p>
              </div>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}

function Problem() {
  const { group, item, viewport } = useStagger({ distance: 16, step: 0.07 });
  const audiences = useStagger({ distance: 12, step: 0.05 });

  return (
    <section className="mx-auto w-full max-w-[1036px] px-6 pt-[96px] lg:px-0">
      <SectionHead eyebrow={PROBLEM.eyebrow} heading={PROBLEM.heading} />
      <motion.div
        variants={group}
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        className="grid gap-4 md:grid-cols-3"
      >
        {PROBLEM.pains.map((pain) => (
          <motion.article
            key={pain.num}
            variants={item}
            className="rounded-[18px] border bg-white px-[26px] pb-[26px] pt-6"
            style={{ borderColor: CARD_BORDER }}
          >
            <p className="text-[11px] font-semibold tracking-[1.32px]" style={{ ...BODY, color: RUST }}>
              {pain.num}
            </p>
            <h3 className="mt-2 text-[21px] font-semibold leading-[1.25]" style={{ ...DISPLAY, color: INK }}>
              {pain.title}
            </h3>
            <p className="mt-2 text-[14px] leading-[1.5]" style={{ ...BODY, color: MUTED }}>
              {pain.body}
            </p>
          </motion.article>
        ))}
      </motion.div>
      <Reveal distance={20}>
        <div className="mt-4 rounded-[20px] px-9 pb-8 pt-[30px]" style={{ background: DARK }}>
        <p className="text-[11px] font-bold uppercase tracking-[1.32px]" style={{ ...BODY, color: PALE }}>
          {PROBLEM.statementLabel}
        </p>
        <p className="mt-3 text-[19px] font-medium leading-[1.45] text-[#F2F0EB] md:text-[21px]" style={BODY}>
          {PROBLEM.statementLead}
          <strong style={{ color: GOLD }}>{PROBLEM.statementA}</strong>
          {PROBLEM.statementMid}
          <strong style={{ color: GOLD }}>{PROBLEM.statementB}</strong>.
        </p>
        </div>
      </Reveal>
      <motion.div
        variants={audiences.group}
        initial="hidden"
        whileInView="visible"
        viewport={audiences.viewport}
        className="mt-4 flex flex-wrap items-center gap-[10px]"
      >
        <p className="text-[11px] font-semibold tracking-[1.32px]" style={{ ...BODY, color: MUTED }}>
          {PROBLEM.audiencesLabel}
        </p>
        {PROBLEM.audiences.map((a) => (
          <motion.span
            key={a}
            variants={audiences.item}
            className="rounded-full border bg-white px-4 py-2 text-[14px]"
            style={{ ...BODY, borderColor: CARD_BORDER, color: INK }}
          >
            {a}
          </motion.span>
        ))}
      </motion.div>
    </section>
  );
}

function Hmws() {
  // One row per question, arriving in order — the list is the argument.
  const { group, item, viewport } = useStagger({ distance: 14, step: 0.06 });

  return (
    <section className="mx-auto w-full max-w-[1036px] px-6 pt-[96px] lg:px-0">
      <SectionHead eyebrow={HMWS.eyebrow} heading={HMWS.heading} />
      <motion.div
        variants={group}
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
      >
        {HMWS.items.map((hmw) => (
          <motion.div
            key={hmw.num}
            variants={item}
            className="grid gap-2 border-t py-5 md:grid-cols-[340px_1fr]"
            style={{ borderColor: CARD_BORDER }}
          >
            <p className="flex items-start gap-0 text-[12px]">
              <span className="w-[110px] shrink-0" style={{ ...BODY, color: BLUE }}>
                {hmw.num}
              </span>
              <span className="font-bold tracking-[0.96px]" style={{ ...BODY, color: RUST }}>
                {hmw.tag}
              </span>
            </p>
            <p className="text-[19px] font-medium leading-[1.35] md:text-[22px]" style={{ ...BODY, color: INK }}>
              {hmw.body}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

function Research() {
  // The comparison table stays static — it is data to read. The takeaway
  // cards below it arrive in order.
  const { group, item, viewport } = useStagger({ distance: 16, step: 0.06 });

  return (
    <section className="mx-auto w-full max-w-[1036px] px-6 pt-[96px] lg:px-0">
      <SectionHead eyebrow={RESEARCH.eyebrow} heading={RESEARCH.heading} />
      <div className="overflow-x-auto rounded-[20px] border bg-white" style={{ borderColor: CARD_BORDER }}>
        <table className="w-full min-w-[860px] border-collapse text-left text-[14px]" style={BODY}>
          <thead>
            <tr style={{ borderBottom: `1px solid ${CARD_BORDER}` }}>
              <th className="w-[280px] p-[14px] pl-[14px]" aria-label="Capability" />
              {RESEARCH.cols.map((col, i) => (
                <th
                  key={col}
                  className={`p-[14px] font-semibold ${i === RESEARCH.cols.length - 1 ? "text-white" : ""}`}
                  style={i === RESEARCH.cols.length - 1 ? { background: DARK } : { color: MUTED }}
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {RESEARCH.rows.map((row, r) => (
              <tr key={row.label} style={r < RESEARCH.rows.length - 1 ? { borderBottom: `1px solid ${CARD_BORDER}` } : undefined}>
                <th className="p-[14px] font-semibold" style={{ color: INK }}>
                  {row.label}
                </th>
                {row.cells.map((cell, i) => (
                  <td
                    key={i}
                    className={i === row.cells.length - 1 ? "p-[14px] font-semibold" : "p-[14px]"}
                    style={
                      i === row.cells.length - 1
                        ? { background: "#F5E4C4", color: INK }
                        : { color: MUTED }
                    }
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <motion.div
        variants={group}
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        className="mt-4 grid gap-4 md:grid-cols-3"
      >
        {RESEARCH.insights.map((insight) => (
          <motion.article
            key={insight.num}
            variants={item}
            className="rounded-[18px] border bg-white px-6 pb-6 pt-[22px]"
            style={{ borderColor: CARD_BORDER }}
          >
            <p className="text-[11px] font-semibold tracking-[1.32px]" style={{ ...BODY, color: MUTED }}>
              {insight.num}
            </p>
            <p className="mt-[10px] text-[16px] leading-[1.45]" style={{ ...BODY, color: INK }}>
              {insight.body}
            </p>
          </motion.article>
        ))}
      </motion.div>
    </section>
  );
}

function Ideation() {
  const { group, item, viewport } = useStagger({ distance: 16, step: 0.06 });

  return (
    <section className="mx-auto w-full max-w-[1036px] px-6 pt-[96px] lg:px-0">
      <SectionHead eyebrow={IDEATION.eyebrow} heading={IDEATION.heading} note={IDEATION.note} />
      <motion.div
        variants={group}
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
      >
        {IDEATION.pillars.map((pillar) => (
          <motion.article
            key={pillar.num}
            variants={item}
            className="rounded-[18px] border bg-white px-[23px] pb-6 pt-[23px]"
            style={{ borderColor: CARD_BORDER }}
          >
            <p className="text-[11px] font-semibold tracking-[1.32px]" style={{ ...BODY, color: MUTED }}>
              {pillar.num}
            </p>
            <h3 className="mt-2 text-[22px] font-semibold" style={{ ...DISPLAY, color: INK }}>
              {pillar.title}
            </h3>
            <p className="mt-2 text-[14px] leading-[1.5]" style={{ ...BODY, color: MUTED }}>
              {pillar.body}
            </p>
          </motion.article>
        ))}
      </motion.div>
      <div className="mt-4 grid gap-4 lg:grid-cols-[560px_1fr]">
        <div className="rounded-[18px] border bg-white p-[27px]" style={{ borderColor: CARD_BORDER }}>
          <p className="text-[11px] font-bold tracking-[1.32px]" style={{ ...BODY, color: MUTED }}>
            {IDEATION.flowLabel}
          </p>
          <div className="mt-[14px] flex flex-wrap items-center gap-2">
            {IDEATION.flow.map((step, i) => (
              <span key={step} className="flex items-center gap-2">
                {i > 0 && (
                  <span aria-hidden style={{ color: MUTED }}>
                    →
                  </span>
                )}
                <span
                  className="rounded-full border px-[15px] py-[10px] text-[14px]"
                  style={{ ...BODY, borderColor: CARD_BORDER, color: INK }}
                >
                  {step}
                </span>
              </span>
            ))}
          </div>
        </div>
        <div className="rounded-[18px] border bg-white p-[27px]" style={{ borderColor: CARD_BORDER }}>
          <p className="text-[11px] font-bold tracking-[1.32px]" style={{ ...BODY, color: MUTED }}>
            {IDEATION.archetypesLabel}
          </p>
          <div className="mt-[14px] grid gap-x-6 gap-y-4 sm:grid-cols-2">
            {IDEATION.archetypes.map((a) => (
              <div key={a.name}>
                <p className="text-[18px] font-semibold" style={{ ...DISPLAY, color: INK }}>
                  {a.name}
                </p>
                <p className="text-[13px]" style={{ ...BODY, color: MUTED }}>
                  {a.style}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Journey() {
  const cols = JOURNEY.stages.map((num, i) => ({
    num,
    name: JOURNEY.stageNames[i],
    doing: JOURNEY.doing[i],
    thinking: JOURNEY.thinking[i],
    withVantage: JOURNEY.withVantage[i],
  }));
  return (
    <section className="mx-auto w-full max-w-[1036px] px-6 pt-[96px] lg:px-0">
      <SectionHead eyebrow={JOURNEY.eyebrow} heading={JOURNEY.heading} note={JOURNEY.note} />
      <div className="overflow-x-auto rounded-[20px] border bg-white" style={{ borderColor: CARD_BORDER }}>
        <div className="min-w-[880px] p-[25px]">
          <div className="grid grid-cols-[128px_repeat(5,1fr)] gap-0">
            <div />
            {cols.map((c) => (
              <div key={c.num} className="px-2 pb-[14px]">
                <p className="text-[12px]" style={{ ...BODY, color: BLUE }}>
                  {c.num}
                </p>
                <p className="text-[15px] font-semibold" style={{ ...BODY, color: INK }}>
                  {c.name}
                </p>
              </div>
            ))}
            <p className="py-[14px] text-[11px] font-bold tracking-[1.32px]" style={{ ...BODY, color: MUTED }}>
              DOING
            </p>
            {cols.map((c) => (
              <p key={c.num} className="px-2 py-[14px] text-[13px] leading-[1.5]" style={{ ...BODY, color: MUTED }}>
                {c.doing}
              </p>
            ))}
            <p className="py-[14px] text-[11px] font-bold tracking-[1.32px]" style={{ ...BODY, color: MUTED }}>
              THINKING
            </p>
            {cols.map((c) => (
              <p key={c.num} className="px-2 py-[14px] text-[13px] italic leading-[1.5]" style={{ ...BODY, color: INK }}>
                {c.thinking}
              </p>
            ))}
            <p className="py-[14px] text-[11px] font-bold tracking-[1.32px]" style={{ ...BODY, color: BLUE }}>
              WITH VANTAGE
            </p>
            {cols.map((c) => (
              <p key={c.num} className="px-2 py-[14px] text-[13px] font-medium leading-[1.5]" style={{ ...BODY, color: INK }}>
                {c.withVantage}
              </p>
            ))}
          </div>
          <svg viewBox="0 0 988 190" className="mt-4 w-full" role="img" aria-label="Confidence over the journey: frustrated today, confident with Vantage">
            <line x1="128" y1="95" x2="988" y2="95" stroke="#E2DDD2" strokeWidth="1" />
            <polyline
              points="214,88 386,132 558,144 730,120 902,150"
              fill="none"
              stroke="#9AA0AE"
              strokeWidth="2"
              strokeDasharray="6 5"
            />
            <polyline
              points="214,82 386,60 558,50 730,56 902,44"
              fill="none"
              stroke={BLUE}
              strokeWidth="2.5"
            />
            {[[214, 88], [386, 132], [558, 144], [730, 120], [902, 150]].map(([x, y]) => (
              <circle key={`t${x}`} cx={x} cy={y} r="7" fill="#9AA0AE" />
            ))}
            {[[214, 82], [386, 60], [558, 50], [730, 56], [902, 44]].map(([x, y]) => (
              <circle key={`v${x}`} cx={x} cy={y} r="7" fill={BLUE} />
            ))}
            <text x="0" y="36" fontSize="13" fontWeight="700" fill={INK} letterSpacing="1">
              CONFIDENT
            </text>
            <text x="0" y="156" fontSize="13" fontWeight="700" fill={INK} letterSpacing="1">
              FRUSTRATED
            </text>
          </svg>
        </div>
      </div>
    </section>
  );
}

function Wireframes() {
  // Each fidelity pass arrives in order — the progression is the point.
  const passes = useStagger({ distance: 18, step: 0.09 });

  return (
    <section className="mx-auto w-full max-w-[1036px] px-6 pt-[96px] lg:px-0">
      <SectionHead eyebrow={WIREFRAMES.eyebrow} heading={WIREFRAMES.heading} note={WIREFRAMES.note} />
      <div className="flex flex-col gap-8">
        {WIREFRAMES.groups.map((group) => (
          <div key={group.title}>
            <p className="text-[16px] font-semibold" style={{ ...BODY, color: INK }}>
              {group.title}
            </p>
            <motion.div
              variants={passes.group}
              initial="hidden"
              whileInView="visible"
              viewport={passes.viewport}
              className="mt-[14px] flex flex-col items-stretch gap-3 sm:flex-row sm:items-center"
            >
              {group.passes.map((note, i) => (
                <motion.div key={note} variants={passes.item} className="flex min-w-0 flex-1 items-center gap-3">
                  {i > 0 && (
                    <span className="hidden shrink-0 sm:block" aria-hidden>
                      <Icon name="icon-arrow" size={28} />
                    </span>
                  )}
                  <div className="min-w-0 flex-1">
                    <DropZone
                      note={note}
                      className="aspect-[316/197] w-full rounded-[14px]"
                      alt={`${group.title} — ${WIREFRAMES.passLabels[i].toLowerCase()} pass`}
                    />
                    <p className="mt-2 text-[11px] font-bold tracking-[1.32px]" style={{ ...BODY, color: MUTED }}>
                      {WIREFRAMES.passLabels[i]}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Hifi() {
  // Each screen-plus-caption arrives as one unit, so frame and label never
  // separate mid-entrance.
  const rows = useStagger({ distance: 20, step: 0.08 });

  return (
    <section id="hifi" className="mt-[96px] scroll-mt-6" style={{ background: DARK }}>
      <div className="mx-auto w-full max-w-[1036px] px-6 py-[96px] lg:px-0">
        <SectionHead eyebrow={HIFI.eyebrow} heading={HIFI.heading} note={HIFI.note} dark />
        <div className="flex flex-col gap-4">
          {HIFI.rows.map((row, r) => (
            <motion.div
              key={r}
              variants={rows.group}
              initial="hidden"
              whileInView="visible"
              viewport={rows.viewport}
              className="grid gap-4 md:grid-cols-2"
            >
              {row.map((shot) => (
                <motion.figure key={shot.note} variants={rows.item}>
                  <DropZone note={shot.note} className="aspect-[510/319] w-full rounded-[16px]" alt={shot.caption} />
                  <figcaption className="mt-[10px] text-[13px] leading-[1.5] text-[#B6BAC4]" style={BODY}>
                    {shot.caption}
                  </figcaption>
                </motion.figure>
              ))}
            </motion.div>
          ))}
        </div>
        <Reveal className="mt-4" distance={20}>
          <figure>
            <DropZone
              note={HIFI.tracker.note}
              className="aspect-[1036/648] w-full rounded-[16px]"
              alt={HIFI.tracker.caption}
            />
            <figcaption className="mt-[10px] text-[13px] leading-[1.5] text-[#B6BAC4]" style={BODY}>
              {HIFI.tracker.caption}
            </figcaption>
          </figure>
        </Reveal>
      </div>
    </section>
  );
}

function Prototyping() {
  const { group, item, viewport } = useStagger({ distance: 16, step: 0.06 });

  return (
    <section className="mx-auto w-full max-w-[1036px] px-6 pt-[96px] lg:px-0">
      <SectionHead
        eyebrow={PROTOTYPING.eyebrow}
        heading={PROTOTYPING.heading}
        note={PROTOTYPING.note}
      />
      <motion.ol
        variants={group}
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        className="grid gap-[14px] sm:grid-cols-2 lg:grid-cols-4"
      >
        {PROTOTYPING.steps.map((step) => (
          <motion.li
            key={step.num}
            variants={item}
            className="rounded-[18px] border bg-white px-[23px] pb-6 pt-[23px]"
            style={{ borderColor: CARD_BORDER }}
          >
            <p className="text-[28px] font-bold leading-none" style={{ ...DISPLAY, color: INK }}>
              {step.num}
            </p>
            <p className="mt-2 text-[18px] font-semibold" style={{ ...DISPLAY, color: INK }}>
              {step.title}
            </p>
            <p className="mt-2 text-[13px] leading-[1.5]" style={{ ...BODY, color: MUTED }}>
              {step.body}
            </p>
          </motion.li>
        ))}
      </motion.ol>
      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <div className="rounded-[18px] border bg-white p-[27px]" style={{ borderColor: CARD_BORDER }}>
          <p className="text-[11px] font-bold tracking-[1.32px]" style={{ ...BODY, color: BLUE }}>
            {PROTOTYPING.workedLabel}
          </p>
          <p className="mt-2 text-[15px] leading-[1.5]" style={{ ...BODY, color: INK }}>
            {PROTOTYPING.worked}
          </p>
        </div>
        <div className="rounded-[18px] border bg-white p-[27px]" style={{ borderColor: CARD_BORDER }}>
          <p className="text-[11px] font-bold tracking-[1.32px]" style={{ ...BODY, color: RUST }}>
            {PROTOTYPING.challengeLabel}
          </p>
          <p className="mt-2 text-[15px] leading-[1.5]" style={{ ...BODY, color: INK }}>
            {PROTOTYPING.challenge}
          </p>
        </div>
      </div>
    </section>
  );
}

function Solves() {
  // Before → after, row by row: the comparison is the argument, so the rows
  // arrive in reading order.
  const { group, item, viewport } = useStagger({ distance: 14, step: 0.06 });

  return (
    <section className="mx-auto w-full max-w-[1036px] px-6 pt-[96px] lg:px-0">
      <SectionHead eyebrow={SOLVES.eyebrow} heading={SOLVES.heading} />
      <p className="grid grid-cols-[1fr_40px_1fr] gap-0 pb-2 text-[11px] font-bold tracking-[1.32px]" style={{ ...BODY, color: MUTED }}>
        <span>BEFORE</span>
        <span />
        <span>WITH VANTAGE AI</span>
      </p>
      <motion.div
        variants={group}
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        className="flex flex-col"
      >
        {SOLVES.rows.map((row) => (
          <motion.div
            key={row.before}
            variants={item}
            className="grid grid-cols-[1fr_40px_1fr] items-stretch gap-0"
          >
            <p className="border-t py-5 pr-6 text-[17px] font-medium leading-[1.4]" style={{ ...BODY, borderColor: CARD_BORDER, color: MUTED }}>
              {row.before}
            </p>
            <span className="flex items-start justify-center border-t pt-5" style={{ borderColor: CARD_BORDER }} aria-hidden>
              <Icon name="icon-arrow-sm" size={20} />
            </span>
            <p className="border-t py-5 pl-2 text-[17px] font-semibold leading-[1.4]" style={{ ...BODY, borderColor: CARD_BORDER, color: INK }}>
              {row.after}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

function Better() {
  const { group, item, viewport } = useStagger({ distance: 16, step: 0.05 });

  return (
    <section className="mx-auto w-full max-w-[1036px] px-6 pt-[96px] lg:px-0">
      <SectionHead eyebrow={BETTER.eyebrow} heading={BETTER.heading} />
      <motion.ol
        variants={group}
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        className="grid gap-[14px] sm:grid-cols-2 lg:grid-cols-5"
      >
        {BETTER.cards.map((card, i) => (
          <motion.li
            key={card.num}
            variants={item}
            className="rounded-[18px] border bg-white px-5 pb-6 pt-5"
            style={{ borderColor: CARD_BORDER }}
          >
            <p className="text-[12px] font-bold" style={{ ...BODY, color: BLUE }}>
              {String(i + 1).padStart(2, "0")}
            </p>
            <p className="mt-2 text-[16px] font-semibold leading-[1.35]" style={{ ...BODY, color: INK }}>
              {card.title}
            </p>
            <p className="mt-2 text-[13px] leading-[1.5]" style={{ ...BODY, color: MUTED }}>
              {card.body}
            </p>
          </motion.li>
        ))}
      </motion.ol>
      <p className="mt-6 text-[12px] leading-[1.5]" style={{ ...BODY, color: MUTED }}>
        {BETTER.credit}
      </p>
      <p className="mt-1 text-[14px] font-semibold" style={{ ...BODY, color: INK }}>
        {BETTER.signature}
      </p>
    </section>
  );
}

function MoreProjects() {
  const { group, item, viewport } = useStagger({ distance: 18, step: 0.08 });

  return (
    <section data-index="More projects" data-tone="light" className="mx-auto w-full max-w-[1036px] px-6 pb-[90px] pt-[110px] lg:px-0">
      <div className="flex items-center justify-between">
        <p className="text-[12px] tracking-[1.2px]" style={{ ...BODY, color: MUTED }}>
          MORE PROJECTS
        </p>
        <Link href="/projects" className="border-b pb-[2px] text-[14px] font-semibold transition-opacity duration-200 hover:opacity-70" style={{ ...BODY, color: INK, borderColor: INK }}>
          All work
        </Link>
      </div>
      <motion.div
        variants={group}
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        className="mt-7 grid gap-4 md:grid-cols-2"
      >
        {NEIGHBORS.map((n) => (
          /* The motion wrapper only carries the entrance, so the CSS hover
             lift on the card never fights it for `transform`. */
          <motion.div key={n.title} variants={item}>
            <Link
              href={n.href}
              className="group flex items-center gap-5 rounded-[18px] bg-white p-[14px] transition-transform duration-200 motion-safe:hover:-translate-y-[2px] motion-safe:active:scale-[0.99] motion-reduce:transition-none motion-reduce:transform-none"
            >
                              <span
                  className="relative h-[110px] w-[150px] shrink-0 overflow-hidden rounded-[12px]"
                  style={{ background: n.thumbBg }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={caseStudyThumb(n.href)}
                    alt={n.title}
                    loading="lazy"
                    draggable={false}
                    className="absolute inset-0 h-full w-full object-cover motion-safe:group-hover:scale-[1.04] motion-reduce:transition-none motion-reduce:transform-none"
                  />
                </span>
            <span className="min-w-0">
              <span className="block text-[12px]" style={{ ...BODY, color: MUTED }}>
                {n.direction}
              </span>
              <span className="mt-[6px] block text-[22px] font-semibold leading-[1.2]" style={{ ...DISPLAY, color: INK }}>
                {n.title}
              </span>
              <span className="mt-[6px] block truncate text-[14px]" style={{ ...BODY, color: MUTED }}>
                {n.highlight}
              </span>
            </span>
          </Link>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

function Footer() {
  return (
    <footer data-index="Contact" data-tone="dark" style={{ background: DARK }}>
      {/* One quiet rise for the whole row — a footer is a sign-off, not a
          section, and per-link entrances would overplay it. */}
      <Reveal distance={16}>
        <div className="mx-auto flex w-full max-w-[1036px] flex-wrap items-center justify-between gap-6 px-6 py-14 lg:px-0">
          <div>
            <p className="text-[32px] font-semibold text-[#F2F0EB]" style={DISPLAY}>
              Let&apos;s talk.
            </p>
            <a
              href="mailto:nmayacharya@gmail.com"
              className="mt-[10px] inline-block border-b border-[#3A5552] pb-[2px] text-[16px] text-[#C9CCD4] transition-opacity duration-200 hover:opacity-80"
              style={BODY}
            >
              nmayacharya@gmail.com
            </a>
          </div>
          <nav aria-label="Footer links" className="flex items-center gap-8" style={BODY}>
            {FOOTER_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel={link.href.startsWith("http") ? "noreferrer" : undefined}
                className="text-[14px] text-[#F2F0EB] transition-opacity duration-200 hover:opacity-80"
                style={BODY}
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      </Reveal>
    </footer>
  );
}

export default function VantageCase() {
  return (
    <main style={{ background: PAPER }}>
      <ProjectRuler />
      <Nav />
      <Hero />
      <Facts />
      <Problem />
      <Hmws />
      <Research />
      <Ideation />
      <Journey />
      <Wireframes />
      <Hifi />
      <Prototyping />
      <Solves />
      <Better />
      <MoreProjects />
      <Footer />
    </main>
  );
}
