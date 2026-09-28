"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import {
  BREATH,
  BRIEF,
  CHALLENGE,
  DOCS,
  FACTS,
  HERO,
  NEIGHBORS,
  OUTCOME,
  SOLUTION,
  STAGES,
  STORYBOARDS,
  TEAMWORK,
  UI3D,
  WORLDS,
} from "@/data/harvard";
import { FOOTER_LINKS } from "@/data/landing";
import { EASE_OUT, Reveal, useMotionPref, useStagger } from "@/components/motion/reveal";
import { useLoadStage } from "@/components/LoadStage";
import { caseStudyThumb } from "@/data/case-studies";

const DARK = "#141C17";
const FAINT_DARK = "#0E1510";
const SAGE = "#4E7D5B";
const PALE = "#A9D4B3";
const TILE = "#E4F0E6";
const PAPER = "#F4F6F2";
const INK = "#18201A";
const MUTED = "#5C6A5F";
const PANEL = "#2A3A2F";
const DOC_PANEL = "#E3E9E3";
const HAIR = "#223027";
const MOVE_CARD = "#1E2A22";
const LESSON_PANEL = "#E6EDE6";

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
      <motion.div variants={item} className="max-w-[760px]">
        <p
          className="text-[11px] font-bold uppercase tracking-[1.32px]"
          style={{ ...BODY, color: dark ? PALE : SAGE }}
        >
          {eyebrow}
        </p>
        <h2
          className="mt-[14px] text-[30px] leading-[1.15] tracking-[-0.38px] md:text-[38px]"
          style={{ ...DISPLAY, color: dark ? "#EFF5F0" : INK }}
        >
          {heading}
        </h2>
      </motion.div>
      {note && (
        <motion.p
          variants={item}
          className="max-w-[340px] text-right text-[14px] leading-[1.5]"
          style={{ ...BODY, color: dark ? "#B0C3CC" : MUTED }}
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
    <img
      src={`/case/harvard/${name}.svg`}
      width={size}
      height={size}
      alt=""
      aria-hidden
      draggable={false}
      className={`select-none ${className}`}
    />
  );
}

type MediaItem = {
  /** Omitted while a slot is still unfilled — it falls back to the drop-zone. */
  src?: string;
  poster?: string;
  alt?: string;
  /** Original Drive filename, shown in the drop-zone and kept for provenance. */
  note?: string;
  className?: string;
  /** Render a <video> instead of an <img>. */
  video?: boolean;
  /** Native controls, unmuted — used where the audio is the point. */
  controls?: boolean;
  tone?: "light" | "dark";
};

/**
 * Renders a still or a clip; clips autoplay muted on a loop. Slots with no `src`
 * yet keep rendering their labelled drop-zone, so they fill in the moment real
 * media is added to the data file.
 *
 * Chrome defers autoplay for offscreen media, so looping clips are additionally
 * driven by an IntersectionObserver: they start when scrolled into view and pause
 * when they leave, which also keeps off-screen clips from burning decode.
 */
function Media({
  src,
  poster,
  alt,
  note,
  video,
  controls,
  tone = "light",
  className = "",
}: MediaItem) {
  const ref = useRef<HTMLVideoElement>(null);
  // Looping clips collapse to their poster under reduced motion: a silent
  // ambient loop is perpetual movement, not information.
  const reduce = useMotionPref();
  const loop = Boolean(video) && !controls;

  useEffect(() => {
    const el = ref.current;
    if (!el || !loop) return;
    if (reduce) {
      el.pause();
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) void el.play().catch(() => {});
        else el.pause();
      },
      { threshold: 0.2 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [loop, src, reduce]);

  if (!src) {
    return (
      <div
        aria-label={`Image placeholder: ${note}`}
        className={`flex flex-col items-center justify-center overflow-hidden ${className}`}
        style={{ background: tone === "dark" ? PANEL : DOC_PANEL }}
      >
        <span
          className="px-2 text-center text-[10px] leading-[1.4]"
          style={{ ...BODY, color: tone === "dark" ? PALE : MUTED }}
        >
          Drop image
          <br />
          {note}
        </span>
      </div>
    );
  }
  if (video) {
    return (
      <video
        ref={ref}
        src={src}
        poster={poster}
        aria-label={alt ?? ""}
        muted={!controls}
        loop={!controls}
        autoPlay={!controls && !reduce}
        playsInline
        controls={controls}
        preload={controls ? "none" : "metadata"}
        style={{ background: PANEL }}
        className={`block object-cover ${className}`}
      />
    );
  }
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt ?? ""}
      loading="lazy"
      draggable={false}
      onError={(e) => {
        e.currentTarget.src = "/placeholder.svg";
      }}
      className={`block object-cover ${className}`}
    />
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
          <Link href="/projects" className="border-b border-[#18201A] pb-[3px] text-[14px]" style={{ color: INK }}>
            Work
          </Link>
          <Link href="/about" className="text-[14px] transition-opacity duration-200 hover:opacity-70" style={{ color: INK }}>
            About
          </Link>
          <a href="/resume.pdf" className="text-[14px] transition-opacity duration-200 hover:opacity-70" style={{ color: INK }}>
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
      <Media {...HERO.cover} className="absolute inset-0 h-full w-full" />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(90deg, #141C17 0%, rgba(20,28,23,0.94) 30%, rgba(20,28,23,0.66) 55%, rgba(20,28,23,0.34) 100%), linear-gradient(180deg, rgba(20,28,23,0.42) 0%, rgba(20,28,23,0.12) 38%, rgba(20,28,23,0.6) 100%)",
        }}
      />
      <div className="relative mx-auto w-full max-w-[1036px] px-6 py-[70px] lg:px-0 lg:py-[110px]">
        <motion.div
          variants={group}
          initial="hidden"
          animate={stage === "loading" ? "hidden" : "visible"}
          className="max-w-[560px]"
        >
          <motion.div variants={item}>
          <p className="text-[13px] font-semibold" style={{ ...BODY, color: PALE }}>
            <span className="text-white">{HERO.eyebrowLead}</span>
            {HERO.eyebrowRest}
          </p>
          <h1
            className="mt-[18px] text-[clamp(40px,5vw,64px)] font-semibold leading-[1.04] tracking-[-0.02em] text-[#EFF5F0]"
            style={DISPLAY}
          >
            {HERO.title}
          </h1>
          <p className="mt-[18px] max-w-[520px] text-[19px] leading-[1.5] text-[#C4D2C7]" style={BODY}>
            {HERO.subtitle}
          </p>
          </motion.div>
          <motion.div variants={item} className="mt-[36px] border-l-[3px] pl-4" style={{ borderColor: PALE }}>
            <p className="text-[16px] text-[#C4D2C7]" style={BODY}>
              <span className="font-semibold text-[#EFF5F0]">{HERO.role}</span>
              {HERO.roleAgency}
            </p>
            <p className="mt-[2px] text-[14px] text-[#93A597]" style={BODY}>
              {HERO.roleNote}
            </p>
          </motion.div>
          <motion.a
            variants={item}
            href="#solution"
            className="mt-[36px] inline-flex h-[46px] items-center rounded-[999px] px-[22px] text-[15px] font-semibold transition-[transform,opacity] duration-150 motion-safe:hover:-translate-y-[1px] motion-safe:active:scale-[0.98] motion-safe:hover:opacity-90"
            style={{ ...BODY, background: PAPER, color: INK }}
          >
            {HERO.cta}
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}

function Facts() {
  // A tight band of metadata: the four facts assemble in one beat rather than
  // each getting its own moment.
  const { group, item, viewport } = useStagger({ distance: 12, step: 0.05 });

  return (
    <section aria-label="At a glance" style={{ background: FAINT_DARK }}>
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
                <p className="text-[11px] tracking-[0.44px] text-[#93A597]" style={BODY}>
                  {fact.label}
                </p>
                <p className="mt-[2px] text-[15px] font-semibold leading-[1.5] text-[#EFF5F0]" style={BODY}>
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

function Brief() {
  const { group, item, viewport } = useStagger({ distance: 16, step: 0.07 });

  return (
    <section className="mx-auto w-full max-w-[1036px] px-6 pt-[96px] lg:px-0">
      <SectionHead eyebrow={BRIEF.eyebrow} heading={BRIEF.heading} />
      <motion.div
        variants={group}
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        className="grid gap-4 lg:grid-cols-[560px_1fr]"
      >
        <motion.article variants={item} className="rounded-[18px] bg-white px-7 pb-7 pt-[26px]">
          <p className="text-[16px] leading-[1.6]" style={{ ...BODY, color: INK }}>
            {BRIEF.context}
          </p>
        </motion.article>
        <motion.article variants={item} className="rounded-[18px] px-7 pb-7 pt-[26px]" style={{ background: SAGE }}>
          <p className="text-[11px] font-bold tracking-[1.1px]" style={{ ...BODY, color: PALE }}>
            {BRIEF.roleLabel}
          </p>
          <p className="mt-3 text-[17px] font-medium leading-[1.5] text-white" style={BODY}>
            {BRIEF.roleBody}
          </p>
        </motion.article>
      </motion.div>
    </section>
  );
}

function Challenge() {
  const { group, item, viewport } = useStagger({ distance: 16, step: 0.07 });

  return (
    <section className="mx-auto w-full max-w-[1036px] px-6 pt-[96px] lg:px-0">
      <SectionHead eyebrow={CHALLENGE.eyebrow} heading={CHALLENGE.heading} />
      <motion.div
        variants={group}
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        className="grid gap-4 md:grid-cols-3"
      >
        {CHALLENGE.cards.map((card) => (
          <motion.article
            key={card.title}
            variants={item}
            className="rounded-[18px] bg-white px-6 pb-[26px] pt-6"
          >
            <span className="flex h-[46px] w-[46px] items-center justify-center rounded-[12px]" style={{ background: TILE }}>
              <Icon name={card.icon} size={20} />
            </span>
            <p className="mt-[18px] text-[11px] font-bold tracking-[1.1px]" style={{ ...BODY, color: SAGE }}>
              {card.num}
            </p>
            <h3 className="mt-2 text-[18px] font-semibold leading-[1.5]" style={{ ...DISPLAY, color: INK }}>
              {card.title}
            </h3>
            <p className="mt-2 text-[14px] leading-[1.5]" style={{ ...BODY, color: MUTED }}>
              {card.body}
            </p>
          </motion.article>
        ))}
      </motion.div>
      <Reveal distance={20}>
        <div className="mt-4 rounded-[22px] px-11 py-10" style={{ background: DARK }}>
        <p className="text-[11px] font-bold uppercase tracking-[1.32px]" style={{ ...BODY, color: PALE }}>
          {CHALLENGE.questionLabel}
        </p>
        <p className="mt-[14px] text-[26px] font-medium leading-[1.3] text-[#EFF5F0] md:text-[34px]" style={DISPLAY}>
          {CHALLENGE.questionLead}
          <span style={{ color: PALE }}>{CHALLENGE.questionAccent}</span>?
        </p>
        </div>
      </Reveal>
    </section>
  );
}

function Teamwork() {
  // Each row of three arrives as one unit — the row is the reading beat, and
  // per-card entrances inside a 3-up row would triple the motion for no reason.
  const { group, item, viewport } = useStagger({ distance: 16, step: 0.08 });

  return (
    <section className="mx-auto w-full max-w-[1036px] px-6 pt-[96px] lg:px-0">
      <SectionHead eyebrow={TEAMWORK.eyebrow} heading={TEAMWORK.heading} note={TEAMWORK.note} />
      <motion.div
        variants={group}
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        className="flex flex-col gap-4"
      >
        {TEAMWORK.rows.map((row, r) => (
          <motion.div key={r} variants={item} className="grid gap-4 md:grid-cols-3">
            {row.map((card) => (
              <article key={card.title} className="rounded-[18px] bg-white px-6 pb-[26px] pt-6">
                <span className="flex h-[46px] w-[46px] items-center justify-center rounded-[12px]" style={{ background: TILE }}>
                  <Icon name={card.icon} size={20} />
                </span>
                <h3 className="mt-[18px] text-[18px] font-semibold leading-[1.5]" style={{ ...DISPLAY, color: INK }}>
                  {card.title}
                </h3>
                <p className="mt-2 text-[14px] leading-[1.5]" style={{ ...BODY, color: MUTED }}>
                  {card.body}
                </p>
              </article>
            ))}
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

function Stages() {
  // The five stages are a sequence, so they arrive in order — the argument is
  // chronological and the motion says so before the copy does.
  const { group, item, viewport } = useStagger({ distance: 16, step: 0.06 });
  const tiles = useStagger({ distance: 14, step: 0.05 });

  return (
    <section className="mx-auto w-full max-w-[1036px] px-6 pt-[96px] lg:px-0">
      <SectionHead eyebrow={STAGES.eyebrow} heading={STAGES.heading} />
      <div className="relative">
        {/* The connector draws itself in, so the row reads as one linked
            process rather than five separate badges. Under MotionConfig a
            reduced-motion visitor gets the drawn state instantly: scaleX is a
            transform, and MotionConfig disables transform motion. */}
        <motion.div
          aria-hidden
          className="absolute left-[10%] right-[10%] top-[28px] hidden h-px lg:block"
          style={{ background: PALE, transformOrigin: "left" }}
          initial={{ transform: "scaleX(0)" }}
          whileInView={{ transform: "scaleX(1)" }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: EASE_OUT }}
        />
        <motion.ol
          variants={group}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="relative grid grid-cols-2 gap-x-4 gap-y-10 lg:grid-cols-5"
        >
          {STAGES.steps.map((step) => (
            <motion.li key={step.title} variants={item} className="flex flex-col items-center gap-1 text-center">
              <span className="flex h-[56px] w-[56px] items-center justify-center rounded-[999px]" style={{ background: SAGE }}>
                <Icon name={step.icon} size={20} />
              </span>
              <p className="mt-[10px] text-[10px] font-bold tracking-[1px]" style={{ ...BODY, color: SAGE }}>
                {step.stage}
              </p>
              <p className="text-[15px] font-semibold" style={{ ...DISPLAY, color: INK }}>
                {step.title}
              </p>
              <p className="max-w-[195px] text-[13px] leading-[1.4]" style={{ ...BODY, color: MUTED }}>
                {step.body}
              </p>
            </motion.li>
          ))}
        </motion.ol>
      </div>
      <motion.div
        variants={tiles.group}
        initial="hidden"
        whileInView="visible"
        viewport={tiles.viewport}
        className="mt-7 grid gap-[14px] md:grid-cols-3"
      >
        {STAGES.tiles.map((tile) => (
          <motion.div
            key={tile.num}
            variants={tiles.item}
            className="rounded-[18px] px-[22px] pb-6 pt-[22px]"
            style={{ background: tile.tone === "sage" ? SAGE : DARK }}
          >
            <p className="text-[30px] font-semibold leading-[1.1] text-[#EFF5F0]" style={DISPLAY}>
              {tile.num}
            </p>
            <p className="mt-3 text-[14px] leading-[1.5] text-[#D4E6D8]" style={BODY}>
              {tile.body}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

function Docs() {
  // Each panel-plus-caption arrives as one unit, so the shot and its label
  // never separate mid-entrance.
  const { group, item, viewport } = useStagger({ distance: 20, step: 0.08 });

  return (
    <section className="mx-auto w-full max-w-[1036px] px-6 pt-[96px] lg:px-0">
      <SectionHead eyebrow={DOCS.eyebrow} heading={DOCS.heading} />
      <motion.div
        variants={group}
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        className="grid gap-4 md:grid-cols-2"
      >
        {DOCS.panels.map((panel) => (
          <motion.figure key={panel.note} variants={item}>
            <Media {...panel} className="aspect-[510/287] rounded-[16px]" />
            <figcaption className="mt-[10px] text-[13px] leading-[1.5]" style={{ ...BODY, color: MUTED }}>
              {panel.caption}
            </figcaption>
          </motion.figure>
        ))}
      </motion.div>
    </section>
  );
}

function Storyboards() {
  const rows = useStagger({ distance: 20, step: 0.08 });

  return (
    <section className="mx-auto w-full max-w-[1036px] px-6 pt-[96px] lg:px-0">
      <SectionHead eyebrow={STORYBOARDS.eyebrow} heading={STORYBOARDS.heading} note={STORYBOARDS.note} />
      <div className="flex flex-col gap-5">
        {STORYBOARDS.rows.map((row, r) => (
          <motion.div
            key={r}
            variants={rows.group}
            initial="hidden"
            whileInView="visible"
            viewport={rows.viewport}
            className="grid gap-4 sm:grid-cols-3"
          >
            {row.map((board) => (
              <motion.figure key={board.note} variants={rows.item}>
                <Media {...board} className="aspect-[335/188] rounded-[16px]" />
                <figcaption className="mt-[10px] text-[13px] leading-[1.5]" style={{ ...BODY, color: MUTED }}>
                  {board.caption}
                </figcaption>
              </motion.figure>
            ))}
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function Solution() {
  const { group, item, viewport } = useStagger({ distance: 18, step: 0.08 });

  return (
    <section id="solution" className="mt-[96px]" style={{ background: DARK }}>
      <div className="mx-auto w-full max-w-[1036px] px-6 py-[96px] lg:px-0">
        <SectionHead eyebrow={SOLUTION.eyebrow} heading={SOLUTION.heading} dark />
        <motion.div
          variants={group}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="grid gap-4 md:grid-cols-3"
        >
          {SOLUTION.moves.map((move) => (
            <motion.article
              key={move.title}
              variants={item}
              className="rounded-[18px] p-[26px]"
              style={{ background: MOVE_CARD }}
            >
              <span className="flex h-20 w-20 items-center justify-center rounded-[16px]" style={{ background: PANEL }}>
                <Icon name={move.icon} size={34} />
              </span>
              <h3 className="mt-[18px] text-[20px] font-semibold leading-[1.5] text-[#EFF5F0]" style={DISPLAY}>
                {move.title}
              </h3>
              <p className="mt-2 text-[14px] leading-[1.5] text-[#B0C3CC]" style={BODY}>
                {move.body}
              </p>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function Interface3D() {
  const { group, item, viewport } = useStagger({ distance: 20, step: 0.08 });

  return (
    <section className="mx-auto w-full max-w-[1036px] px-6 pt-[96px] lg:px-0">
      <SectionHead eyebrow={UI3D.eyebrow} heading={UI3D.heading} note={UI3D.note} />
      <motion.div
        variants={group}
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        className="grid items-start gap-4 lg:grid-cols-[620px_1fr]"
      >
        {UI3D.panels.map((panel) => (
          <motion.figure key={panel.note} variants={item}>
            <Media {...panel} className="aspect-[620/349] w-full rounded-[16px]" />
            <figcaption className="mt-[10px] text-[13px] leading-[1.5]" style={{ ...BODY, color: MUTED }}>
              {panel.caption}
            </figcaption>
          </motion.figure>
        ))}
      </motion.div>
    </section>
  );
}

function Worlds() {
  const { group, item, viewport } = useStagger({ distance: 20, step: 0.08 });

  return (
    <section className="mx-auto w-full max-w-[1036px] px-6 pt-[96px] lg:px-0">
      <SectionHead eyebrow={WORLDS.eyebrow} heading={WORLDS.heading} note={WORLDS.note} />
      <motion.div
        variants={group}
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        className="grid items-start gap-4 lg:grid-cols-[620px_1fr_1fr]"
      >
        {WORLDS.panels.map((panel) => (
          <motion.figure key={panel.note} variants={item}>
            <Media
              {...panel}
              className={`w-full rounded-[16px] ${panel.span === "wide" ? "aspect-[620/420]" : "aspect-[192/420]"}`}
            />
            <figcaption className="mt-[10px] text-[13px] leading-[1.5]" style={{ ...BODY, color: MUTED }}>
              {panel.caption}
            </figcaption>
          </motion.figure>
        ))}
      </motion.div>
    </section>
  );
}

function Breath() {
  const { group, item, viewport } = useStagger({ distance: 16, step: 0.06 });

  return (
    <section className="mx-auto w-full max-w-[1036px] px-6 pt-[96px] lg:px-0">
      <SectionHead eyebrow={BREATH.eyebrow} heading={BREATH.heading} />
      <div className="grid items-center gap-6 lg:grid-cols-[640px_1fr]">
        <Reveal distance={24}>
          <Media {...BREATH.image} className="aspect-[640/360] rounded-[16px]" />
        </Reveal>
        <motion.div
          variants={group}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="flex flex-col gap-4"
        >
          {BREATH.notes.map((note) => (
            <motion.article
              key={note.title}
              variants={item}
              className="flex items-start gap-4 rounded-[16px] bg-white px-5 py-[18px]"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[12px]" style={{ background: TILE }}>
                <Icon name={note.icon} size={20} />
              </span>
              <div>
                <p className="text-[17px] font-semibold" style={{ ...BODY, color: INK }}>
                  {note.title}
                </p>
                <p className="mt-1 text-[14px] leading-[1.5]" style={{ ...BODY, color: MUTED }}>
                  {note.body}
                </p>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function Outcome() {
  const { group, item, viewport } = useStagger({ distance: 16, step: 0.07 });
  const lessons = useStagger({ distance: 12, step: 0.05 });

  return (
    <section className="mx-auto w-full max-w-[1036px] px-6 pt-[96px] lg:px-0">
      <SectionHead eyebrow={OUTCOME.eyebrow} heading={OUTCOME.heading} />
      <motion.div
        variants={group}
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        className="grid gap-[14px] md:grid-cols-3"
      >
        {OUTCOME.impact.map((card) => (
          <motion.div
            key={card.num}
            variants={item}
            className="rounded-[18px] px-6 pb-6 pt-6"
            style={{ background: card.tone === "sage" ? SAGE : DARK }}
          >
            <p className="text-[34px] font-semibold leading-[1.1] text-[#EFF5F0]" style={DISPLAY}>
              {card.num}
            </p>
            <p className="mt-3 text-[14px] leading-[1.5] text-[#D4E6D8]" style={BODY}>
              {card.body}
            </p>
          </motion.div>
        ))}
      </motion.div>
      <div className="mt-4 rounded-[18px] px-9 py-[30px]" style={{ background: LESSON_PANEL }}>
        <p className="text-[11px] font-bold uppercase tracking-[1.32px]" style={{ ...BODY, color: SAGE }}>
          {OUTCOME.lessonsLabel}
        </p>
        <motion.ul
          variants={lessons.group}
          initial="hidden"
          whileInView="visible"
          viewport={lessons.viewport}
          className="mt-4 flex flex-col gap-[14px]"
        >
          {OUTCOME.lessons.map((lesson) => (
            <motion.li key={lesson} variants={lessons.item} className="flex items-start gap-3">
              <Icon name="icon-lesson-check" size={20} className="mt-[2px] shrink-0" />
              <p className="text-[16px] font-medium leading-[1.5]" style={{ ...BODY, color: INK }}>
                {lesson}
              </p>
            </motion.li>
          ))}
        </motion.ul>
      </div>
      <p className="mt-[22px] text-[12px] leading-[1.5]" style={{ ...BODY, color: MUTED }}>
        {OUTCOME.credit}
      </p>
    </section>
  );
}

function MoreProjects() {
  const { group, item, viewport } = useStagger({ distance: 18, step: 0.08 });

  return (
    <section className="mx-auto w-full max-w-[1036px] px-6 pb-[90px] pt-[110px] lg:px-0">
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
              className="group flex items-center gap-5 rounded-[18px] bg-white p-[14px] transition-transform duration-200 motion-safe:group-hover:-translate-y-[2px] motion-safe:active:scale-[0.99] motion-reduce:transition-none motion-reduce:transform-none"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
<img
  src={caseStudyThumb(n.href)}
  alt={n.title}
  loading="lazy"
  draggable={false}
  className="h-[110px] w-[150px] shrink-0 rounded-[12px] object-cover motion-safe:group-hover:scale-[1.04] motion-reduce:transition-none motion-reduce:transform-none"
/>
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
    <footer style={{ background: DARK }}>
      {/* One quiet rise for the whole row — a footer is a sign-off, not a
          section, and per-link entrances would overplay it. */}
      <Reveal distance={16}>
        <div className="mx-auto flex w-full max-w-[1036px] flex-wrap items-center justify-between gap-6 px-6 py-14 lg:px-0">
          <div>
            <p className="text-[32px] font-semibold text-[#EFF5F0]" style={DISPLAY}>
              Let&apos;s talk.
            </p>
            <a
              href="mailto:nmayacharya@gmail.com"
              className="mt-[10px] inline-block border-b border-[#3A5552] pb-[2px] text-[16px] text-[#C4D2C7] transition-opacity duration-200 hover:opacity-80"
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
                className="text-[14px] text-[#EFF5F0] transition-opacity duration-200 hover:opacity-80"
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

export default function HarvardCase() {
  return (
    <main style={{ background: PAPER }}>
      <Nav />
      <Hero />
      <Facts />
      <Brief />
      <Challenge />
      <Teamwork />
      <Stages />
      <Docs />
      <Storyboards />
      <Solution />
      <Interface3D />
      <Worlds />
      <Breath />
      <Outcome />
      <MoreProjects />
      <Footer />
    </main>
  );
}
