"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, type Variants } from "framer-motion";
import {
  BRIEF,
  CURRICULUM,
  FACTS,
  HERO,
  MARKERS,
  MORE_PROJECTS,
  SHIP,
  STORYBOARDING,
  TOPICS,
} from "@/data/inspirit-biology";
import { EASE_OUT, Reveal, useStagger, useMotionPref } from "@/components/motion/reveal";
import { useLoadStage } from "@/components/LoadStage";
import { caseStudyThumb } from "@/data/case-studies";
import { ProjectRuler } from "@/components/ProjectRuler";

/* ---------------------------------- tokens ---------------------------------
   Sampled directly from the Figma frame (node 427:217). This case study has
   its own palette — curriculum purple and a wristband red on cool paper, over
   night-navy bands — so it does not use the shared case-theme tokens. */

const PAPER = "#f1f2f7";
const INK = "#1c1a2e";
const NIGHT = "#1e1b33";
const BAND = "#15132a";
const PURPLE = "#5b4ba8";
const DARK_SLOT = "#36315a";
const DARK_NOTE = "#2a2645";
const LIGHT_SLOT = "#e2e1ec";
const MUTED = "#5d5b70";

const DISPLAY = { fontFamily: "var(--font-display)" } as const;
const BODY = { fontFamily: "var(--font-body)" } as const;

/** 1440 frame with 202px gutters → a 1036px content column. */
const GUTTER = "px-6 md:px-10 lg:px-[202px]";
const CONTENT = "mx-auto w-full max-w-[1440px]";

/* --------------------------------- motion ---------------------------------- */

/**
 * The hero plays on load rather than on scroll, so it can't use the shared
 * `useStagger` (that one is viewport-triggered and would never fire above the
 * fold). Same easing and the same 500ms-class timing, so the two dialects are
 * indistinguishable on screen. Reduced motion keeps the opacity fade and drops
 * every bit of movement.
 */
function heroMotion(reduce: boolean): { group: Variants; item: Variants } {
  if (reduce) {
    return {
      group: {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.3 } },
      },
      item: {
        // Both states restate the resting transform on purpose.
        // `useMotionPref` resolves only after mount, so an
        // early render can already have set translateY(20px). Framer interpolates
        // only declared keys, so without this the hero would stay 20px low for
        // reduced-motion visitors. Naming the key animates the stale value away.
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

/* ------------------------------ shared pieces ------------------------------ */

function Icon({ name, size = 20 }: { name: string; size?: number }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img loading="lazy" decoding="async"
      src={`/case/inspirit-biology/${name}.svg`}
      width={size}
      height={size}
      alt=""
      aria-hidden
      draggable={false}
      className="select-none"
    />
  );
}

/**
 * The Drive exports ship under the design's own filenames (bv-05-…jpg), so a
 * slot resolves its asset by name — replacing an export only has to keep the
 * name. See the data module header.
 */
const asset = (file: string) => `/case/inspirit-biology/${file}`;

/**
 * The design's drop-frame, reproduced exactly: tone, hint text, video slot and
 * caption. Once an export ships the frame renders it; light figures
 * (#e2e1ec) sit on paper sections, dark ones (#36315a) inside the night ones.
 */
function FigSlot({
  file,
  height,
  tone = "light",
  video = false,
  src,
  videoSrc,
  poster,
  className,
  variants,
}: {
  file: string;
  height: string;
  tone?: "light" | "dark";
  video?: boolean;
  src?: string;
  videoSrc?: string;
  poster?: string;
  className?: string;
  variants?: Variants;
}) {
  const dark = tone === "dark";
  const hintColor = dark ? "text-[#a99bf0]" : "text-[#5d5b70]";

  const frame = (
    <div
      className={`flex w-full flex-col items-center justify-center gap-2 overflow-hidden px-2 ${height} ${className ?? ""}`}
      style={{ background: dark ? DARK_SLOT : LIGHT_SLOT, borderRadius: dark ? 16 : 14 }}
    >
      {videoSrc ? (
        <video
          src={videoSrc}
          poster={poster}
          controls
          playsInline
          preload="metadata"
          className="h-full w-full object-cover"
        >
          Your browser does not support the video tag.
        </video>
      ) : src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt={file} loading="lazy" draggable={false} className="h-full w-full object-cover" />
      ) : (
        <>
          {video ? <Icon name="icon-play" size={30} /> : null}
          <span aria-hidden className={`px-2 text-center text-[10px] leading-[1.4] ${hintColor}`} style={BODY}>
            {video ? "Drop video" : "Drop image"}
            <br />
            {file}
          </span>
        </>
      )}
    </div>
  );

  if (variants) return <motion.figure variants={variants}>{frame}</motion.figure>;
  return <Reveal distance={20}>{frame}</Reveal>;
}

function FigCaption({
  children,
  onDark = false,
}: {
  children: React.ReactNode;
  onDark?: boolean;
}) {
  return (
    <figcaption className={`text-[13px] leading-[1.5] ${onDark ? "text-[#b6b1cf]" : MUTED}`} style={BODY}>
      {children}
    </figcaption>
  );
}

function SectionHead({
  eyebrow,
  heading,
  note,
  onDark = false,
  headingWidth = "max-w-[820px]",
}: {
  eyebrow: string;
  heading: string;
  note?: string;
  onDark?: boolean;
  headingWidth?: string;
}) {
  const { group, item, viewport } = useStagger({ distance: 16, step: 0.08 });

  return (
    <motion.div
      variants={group}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      className="flex flex-wrap items-end justify-between gap-6 pb-9"
    >
      <motion.div variants={item} className={headingWidth}>
        <p
          className={`text-[11px] font-bold uppercase tracking-[1.32px] ${onDark ? "text-[#a99bf0]" : PURPLE}`}
          style={BODY}
        >
          {eyebrow}
        </p>
        <h2
          className={`mt-[14px] text-[26px] font-semibold leading-[1.15] tracking-[-0.38px] md:text-[38px] ${onDark ? "text-[#f2f0fa]" : INK}`}
          style={DISPLAY}
        >
          {heading}
        </h2>
      </motion.div>
      {note && (
        <motion.p
          variants={item}
          className={`max-w-[340px] text-right text-[14px] leading-[1.5] ${onDark ? "text-[#b6b1cf]" : MUTED}`}
          style={BODY}
        >
          {note}
        </motion.p>
      )}
    </motion.div>
  );
}

/* ---------------------------------- chrome ---------------------------------- */

function Nav() {
  const reduce = useMotionPref();
  const { stage } = useLoadStage();

  return (
    <motion.header
      initial={{ transform: "translateY(-100%)" }}
      animate={{ transform: stage === "nav" ? "translateY(0%)" : "translateY(-100%)" }}
      transition={{ duration: reduce ? 0.2 : 0.65, ease: EASE_OUT }}
      className={`${CONTENT} ${GUTTER} flex items-center justify-between py-[14px]`}
    >
      <Link href="/" className="shrink-0 text-[16px] font-semibold leading-[1.5] text-[#1c1a2e]" style={BODY}>
        Neha Mayacharya
      </Link>
      {/* Desktop row + a mobile-only contact pill: the links row is 300px
          wide by itself, so at phone widths it must not render at all. */}
      <div className="hidden items-center gap-[30px] md:flex">
        <Link
          href="/projects"
          aria-current="page"
          className="border-b-[1.5px] border-[#1c1a2e] pb-[3px] text-[14px] font-normal leading-[1.5] text-[#1c1a2e]"
          style={BODY}
        >
          Work
        </Link>
        <Link href="/about" className="case-link text-[14px] leading-[1.5] text-[#1c1a2e]" style={BODY}>
          About
        </Link>
        <a href="/resume.pdf" className="case-link text-[14px] leading-[1.5] text-[#1c1a2e]" style={BODY}>
          Résumé (PDF)
        </a>
        <a
          href="#contact"
          className="case-cta flex h-10 items-center justify-center rounded-[999px] bg-[#1c1a2e] px-5 text-[14px] font-semibold leading-[1.5] text-white"
          style={BODY}
        >
          Contact
        </a>
      </div>
      <a
        href="#contact"
        className="case-cta flex h-10 items-center justify-center rounded-[999px] bg-[#1c1a2e] px-5 text-[14px] font-semibold leading-[1.5] text-white md:hidden"
        style={BODY}
      >
        Contact
      </a>
    </motion.header>
  );
}

/* ---------------------------------- hero ----------------------------------- */

function Hero() {
  const reduce = useMotionPref();
  const { stage } = useLoadStage();
  const { group, item } = heroMotion(!!reduce);

  return (
    <section className="relative overflow-hidden" style={{ background: NIGHT }}>
      {/* Cell orb — a Figma asset, right-bleed behind the copy. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img loading="lazy" decoding="async"
        src="/case/inspirit-biology/cell-orb.svg"
        alt=""
        aria-hidden
        draggable={false}
        className="pointer-events-none absolute top-[-180px] hidden h-[820px] w-[820px] select-none lg:left-[820px] lg:block"
      />

      <motion.div
        variants={group}
        initial="hidden"
        // The hero is above the fold, so it animates on load rather than on
        // scroll. It stays hidden until the preloader releases, otherwise it
        // would play out unseen behind the gate.
        animate={stage === "loading" ? "hidden" : "visible"}
        className={`${CONTENT} ${GUTTER} relative flex flex-col items-start gap-12 pb-[72px] pt-[72px] lg:h-[731px] lg:flex-row lg:items-start lg:justify-between lg:pb-0`}
      >
        {/* Hero copy */}
        <div className="flex w-full max-w-[540px] flex-col gap-[34px] lg:pt-[104px]">
          <motion.div variants={item} className="flex flex-col gap-[18px]">
            <p className="text-[13px] font-semibold leading-[1.5] text-[#a99bf0]" style={BODY}>
              <span className="text-white">{HERO.eyebrowLead}</span>
              {HERO.eyebrowRest}
            </p>
            <h1
              className="text-[34px] font-semibold leading-[1.06] tracking-[-1.08px] text-[#f2f0fa] md:text-[54px]"
              style={DISPLAY}
            >
              {HERO.headline}
            </h1>
            <p className="max-w-[520px] text-[18px] leading-[1.5] text-[#c9c5de]" style={BODY}>
              {HERO.support}
            </p>
          </motion.div>

          <motion.div variants={item} className="flex flex-col gap-[2px] border-l-[3px] border-[#e8343e] pl-4">
            <p className="text-[16px] font-semibold leading-[1.5] text-[#f2f0fa]" style={BODY}>
              {HERO.role}
              <span className="font-normal">{HERO.roleRest}</span>
            </p>
            <p className="max-w-[520px] text-[14px] leading-[1.5] text-[#9893b3]" style={BODY}>
              {HERO.roleNote}
            </p>
          </motion.div>

          <motion.a
            variants={item}
            href="#contact"
            className="case-cta flex h-[46px] items-center justify-center rounded-[999px] bg-white px-[22px] text-[15px] font-semibold leading-[1.5] text-[#1c1a2e]"
            style={BODY}
          >
            {HERO.cta}
          </motion.a>
        </div>

        {/* Spaceship slot — the design's hero figure, filled with the real
            export from the Drive set. */}
        <motion.figure variants={item} className="w-full max-w-[560px] lg:mt-[150px] lg:-mr-[80px]">
          <FigSlot file={HERO.shipShot.file} src={asset(HERO.shipShot.file)} height="h-[300px] lg:h-[441px]" tone="dark" />
        </motion.figure>
      </motion.div>
    </section>
  );
}

/* ---------------------------------- facts ---------------------------------- */

function Facts() {
  const { group, item, viewport } = useStagger({ distance: 14, step: 0.06 });
  return (
    <section className="w-full" style={{ background: BAND }}>
      <motion.div
        variants={group}
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        className={`${CONTENT} ${GUTTER} flex flex-col md:flex-row`}
      >
        {FACTS.map((f, i) => (
          <motion.div
            variants={item}
            key={f.label}
            className={`flex flex-1 items-start gap-3 pb-6 pt-[22px] md:px-5 ${i > 0 ? "border-t border-[#2c2848] md:border-l md:border-t-0" : "pr-5"}`}
          >
            <Icon name={f.icon} size={20} />
            <div className="flex flex-col gap-[2px]">
              <p className="text-[11px] tracking-[0.44px] text-[#9893b3]" style={BODY}>
                {f.label.toUpperCase()}
              </p>
              <p className="max-w-[207px] text-[15px] font-semibold leading-[1.5] text-[#f2f0fa]" style={BODY}>
                {f.value}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

/* -------------------------------- curriculum -------------------------------- */

function Curriculum() {
  const { group, item, viewport } = useStagger({ distance: 14, step: 0.06 });
  return (
    <section className={`${CONTENT} ${GUTTER} pt-24`}>
      <SectionHead
        eyebrow={CURRICULUM.eyebrow}
        heading={CURRICULUM.heading}
        note={CURRICULUM.note}
        headingWidth="max-w-[580px]"
      />

      <motion.div variants={group} initial="hidden" whileInView="visible" viewport={viewport} className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {CURRICULUM.categories.map((c) => (
          <motion.div variants={item} key={c.title} className="flex flex-col gap-[10px] rounded-[18px] bg-white px-[22px] pb-6 pt-[22px] lg:h-[210px]">
            <div
              className="flex size-[52px] shrink-0 items-center justify-center rounded-[999px]"
              style={{ background: c.tile }}
            >
              <Icon name={c.icon} size={22} />
            </div>
            <p className="text-[19px] font-semibold leading-[1.5] text-[#1c1a2e]" style={BODY}>
              {c.title}
            </p>
            <p className="max-w-[206px] text-[14px] leading-[1.5] text-[#5d5b70]" style={BODY}>
              {c.body}
            </p>
          </motion.div>
        ))}
      </motion.div>

      <div className="mt-4 flex flex-col gap-2">
        <Reveal distance={20}>
          <figure className="flex w-full flex-col gap-2">
            <FigSlot file={CURRICULUM.figure.file} src={asset(CURRICULUM.figure.file)} height="h-[160px] lg:h-[200px]" />
            <FigCaption>{CURRICULUM.figure.caption}</FigCaption>
          </figure>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------------------------- brief ----------------------------------- */

function Brief() {
  const { group, item, viewport } = useStagger({ distance: 14, step: 0.05 });
  return (
    <section className={`${CONTENT} ${GUTTER} pt-24`}>
      <SectionHead eyebrow={BRIEF.eyebrow} heading={BRIEF.heading} />

      <Reveal distance={20} className="lg:w-[1036px]">
        <div className="flex flex-col gap-3 rounded-[20px] px-9 pb-8 pt-[30px]" style={{ background: PURPLE }}>
          <p className="text-[11px] font-bold uppercase tracking-[1.32px] text-[#ffd2d5]" style={BODY}>
            {BRIEF.cardEyebrow}
          </p>
          <p className="max-w-[964px] text-[19px] font-medium leading-[1.4] text-white md:text-[23px]" style={BODY}>
            {BRIEF.card}
          </p>
        </div>
      </Reveal>

      <div className="mt-5 flex flex-col gap-3">
        <p className="text-[11px] font-bold uppercase leading-[1.5] tracking-[1.32px] text-[#5d5b70]" style={BODY}>
          {BRIEF.rolesEyebrow}
        </p>
        <motion.div
          variants={group}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="grid gap-3 md:grid-cols-2 lg:grid-cols-3"
        >
          {BRIEF.roles.filter((r) => !r.wide).map((r) => (
            <motion.div variants={item} key={r.title} className="flex flex-col gap-2 rounded-[18px] bg-white px-[22px] pb-[22px] pt-5">
              <div className="flex items-center gap-3">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-[999px]" style={{ background: PURPLE }}>
                  <Icon name={r.icon} size={18} />
                </div>
                <p className="text-[18px] font-semibold leading-[1.5] text-[#1c1a2e]" style={BODY}>
                  {r.title}
                </p>
              </div>
              <p className="text-[14px] leading-[1.5] text-[#5d5b70]" style={BODY}>
                {r.body}
              </p>
            </motion.div>
          ))}
        </motion.div>
        <motion.div
          variants={group}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="grid gap-3 md:grid-cols-2"
        >
          {BRIEF.roles.filter((r) => r.wide).map((r) => (
            <motion.div variants={item} key={r.title} className="flex flex-col gap-2 rounded-[18px] bg-white px-[22px] pb-[22px] pt-5">
              <div className="flex items-center gap-3">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-[999px]" style={{ background: PURPLE }}>
                  <Icon name={r.icon} size={18} />
                </div>
                <p className="text-[18px] font-semibold leading-[1.5] text-[#1c1a2e]" style={BODY}>
                  {r.title}
                </p>
              </div>
              <p className="max-w-[468px] text-[14px] leading-[1.5] text-[#5d5b70]" style={BODY}>
                {r.body}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ---------------------------------- topics ---------------------------------- */

function Topics() {
  const { group, item, viewport } = useStagger({ distance: 18, step: 0.07 });
  return (
    <section className={`${CONTENT} ${GUTTER} pt-24`}>
      <SectionHead eyebrow={TOPICS.eyebrow} heading={TOPICS.heading} />

      <motion.div variants={group} initial="hidden" whileInView="visible" viewport={viewport} className="grid gap-4 md:grid-cols-2 lg:w-[1036px]">
        {TOPICS.modules.map((m) => (
          <motion.figure variants={item} key={m.title} className="flex w-full flex-col gap-[10px]">
            <FigSlot file={m.file} src={asset(m.file)} height="h-[220px] lg:h-[290px]" />
            <figcaption className="text-[16px] font-semibold leading-[1.5] text-[#1c1a2e]" style={BODY}>
              {m.title}
            </figcaption>
          </motion.figure>
        ))}
      </motion.div>
    </section>
  );
}

/* ------------------------------- storyboarding ------------------------------- */

function Storyboarding() {
  const { group, item, viewport } = useStagger({ distance: 18, step: 0.08 });
  return (
    <section className={`${CONTENT} ${GUTTER} pt-24`}>
      <SectionHead eyebrow={STORYBOARDING.eyebrow} heading={STORYBOARDING.heading} note={STORYBOARDING.note} headingWidth="max-w-[600px]" />

      <motion.div variants={group} initial="hidden" whileInView="visible" viewport={viewport} className="flex flex-col gap-6">
        <div className="grid gap-4 lg:grid-cols-2">
          {STORYBOARDING.row1.map((f) => (
            <motion.figure variants={item} key={f.file} className="flex w-full flex-col gap-2">
              <FigSlot file={f.file} src={asset(f.file)} height="h-[400px] lg:h-[660px]" />
              <FigCaption>{f.caption}</FigCaption>
            </motion.figure>
          ))}
        </div>

        <motion.figure variants={item} className="flex w-full flex-col gap-2">
          <FigSlot file={STORYBOARDING.big.file} src={asset(STORYBOARDING.big.file)} height="h-[440px] lg:h-[1176px]" />
          <FigCaption>{STORYBOARDING.big.caption}</FigCaption>
        </motion.figure>

        <div className="grid gap-4 sm:grid-cols-3">
          {STORYBOARDING.row2.map((f) => (
            <motion.figure variants={item} key={f.file} className="flex w-full flex-col gap-2">
              <FigSlot file={f.file} src={asset(f.file)} height="h-[380px] lg:h-[625px]" />
              <FigCaption>{f.caption}</FigCaption>
            </motion.figure>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

/* ---------------------------------- ship ------------------------------------ */

function Ship() {
  const { group, item, viewport } = useStagger({ distance: 16, step: 0.07 });
  return (
    <section className="w-full pt-24" style={{ background: NIGHT }}>
      <div className={`${CONTENT} ${GUTTER} py-24`}>
        <SectionHead eyebrow={SHIP.eyebrow} heading={SHIP.heading} note={SHIP.note} onDark headingWidth="max-w-[580px]" />

        <motion.div variants={group} initial="hidden" whileInView="visible" viewport={viewport} className="flex flex-col gap-6">
          <div className="grid gap-4 lg:grid-cols-2">
            {SHIP.row1.map((f, i) => (
              <motion.figure variants={item} key={f.file} className="flex w-full flex-col gap-2">
                <FigSlot file={f.file} src={asset(f.file)} height={i === 0 ? "h-[300px] lg:h-[402px]" : "h-[240px] lg:h-[326px]"} tone="dark" />
                <FigCaption onDark>{f.caption}</FigCaption>
              </motion.figure>
            ))}
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            {SHIP.row2.map((f) => (
              <motion.figure variants={item} key={f.file} className="flex w-full flex-col gap-2">
                <FigSlot file={f.file} src={asset(f.file)} height="h-[220px] lg:h-[222px]" tone="dark" />
                <FigCaption onDark>{f.caption}</FigCaption>
              </motion.figure>
            ))}
          </div>
        </motion.div>

        <div className="mt-5 flex flex-col gap-4 lg:flex-row lg:items-center">
          <motion.figure variants={item} className="flex w-full flex-col gap-2 lg:w-[520px]">
            <FigSlot file={SHIP.gloveFigure.file} src={asset(SHIP.gloveFigure.file)} height="h-[380px] lg:h-[580px]" tone="dark" />
          </motion.figure>
          <motion.div variants={item} className="flex flex-col gap-3 rounded-[20px] lg:w-[492px]" style={{ background: DARK_NOTE }}>
            <p className="text-[11px] font-bold uppercase tracking-[1.32px] text-[#a99bf0] lg:px-7 lg:pt-[26px]" style={BODY}>
              {SHIP.gloveNote.eyebrow}
            </p>
            <p className="text-[24px] font-semibold leading-[1.5] text-[#f2f0fa] lg:px-7" style={BODY}>
              {SHIP.gloveNote.title}
            </p>
            <p className="w-full max-w-[436px] text-[15px] leading-[1.55] text-[#b6b1cf] lg:px-7 lg:pb-7" style={BODY}>
              {SHIP.gloveNote.body}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* --------------------------------- markers ---------------------------------- */

function Markers() {
  const { group, item, viewport } = useStagger({ distance: 16, step: 0.07 });
  return (
    <section className={`${CONTENT} ${GUTTER} pt-24`}>
      <SectionHead eyebrow={MARKERS.eyebrow} heading={MARKERS.heading} note={MARKERS.note} headingWidth="max-w-[580px]" />

      <motion.div variants={group} initial="hidden" whileInView="visible" viewport={viewport} className="flex flex-col gap-6">
        <div className="flex flex-col gap-4 lg:flex-row">
          <motion.figure variants={item} className="flex w-full flex-col gap-2 lg:w-[400px]">
            <FigSlot file={MARKERS.figures[0].file} src={asset(MARKERS.figures[0].file)} height="h-[231px]" />
            <FigCaption>{MARKERS.figures[0].caption}</FigCaption>
          </motion.figure>
          <motion.figure variants={item} className="flex w-full flex-col gap-2 lg:w-[620px]">
            <FigSlot file={MARKERS.figures[1].file} src={asset(MARKERS.figures[1].file)} height="h-[380px] lg:h-[474px]" />
            <FigCaption>{MARKERS.figures[1].caption}</FigCaption>
          </motion.figure>
        </div>

        <Reveal distance={0} className="pt-4">
          <p className="text-[11px] font-bold uppercase leading-[1.5] tracking-[1.32px] text-[#5b4ba8]" style={BODY}>
            {MARKERS.subEyebrow}
          </p>
        </Reveal>

        <div className="grid gap-4 sm:grid-cols-2">
          {MARKERS.app.map((f, i) => (
            <motion.figure variants={item} key={f.file} className="flex w-full flex-col gap-2">
              <FigSlot file={f.file} src={asset(f.file)} height={i === 0 ? "h-[263px]" : "h-[324px]"} />
              <FigCaption>{f.caption}</FigCaption>
            </motion.figure>
          ))}
        </div>

        <motion.figure variants={item} className="flex w-full flex-col gap-2">
          <FigSlot
            file={MARKERS.video.file}
            height="h-[440px] lg:h-[1001px]"
            video={true}
            videoSrc={MARKERS.video.videoSrc}
            poster={asset(MARKERS.video.poster)}
          />
          <FigCaption>{MARKERS.video.caption}</FigCaption>
        </motion.figure>

        <motion.div variants={group} initial="hidden" whileInView="visible" viewport={viewport} className="flex flex-col gap-10 pt-7 sm:flex-row sm:gap-[40px]">
          {MARKERS.mentors.map((m) => (
            <motion.div variants={item} key={m.label} className="flex flex-col gap-1">
              <p className="text-[11px] font-bold tracking-[1.1px] text-[#5d5b70]" style={BODY}>
                {m.label}
              </p>
              <p className="text-[15px] font-medium leading-[1.5] text-[#1c1a2e]" style={BODY}>
                {m.value}
              </p>
            </motion.div>
          ))}
        </motion.div>

        <Reveal distance={0} className="pt-[22px]">
          <p className="w-full max-w-[1036px] text-[12px] leading-[1.5] text-[#5d5b70]" style={BODY}>
            {MARKERS.note}
          </p>
        </Reveal>
      </motion.div>
    </section>
  );
}

/* ------------------------------ more projects ------------------------------- */

function MoreProjects() {
  const { group, item, viewport } = useStagger({ distance: 18, step: 0.08 });
  // Some neighbor cases have no exported cover yet; a missing bitmap falls
  // back to the labelled tile rather than a broken image.
  const [brokenThumbs, setBrokenThumbs] = useState<Set<string>>(new Set());
  return (
    <section data-index="More projects" data-tone="light" className={`${CONTENT} ${GUTTER} flex flex-col gap-[18px] pb-[90px] pt-[110px]`}>
      <div className="flex w-full items-center justify-between">
        <p className="text-[12px] tracking-[1.2px] text-[#5d5b70]" style={BODY}>
          {MORE_PROJECTS.label}
        </p>
        <Link
          href="/projects"
          className="case-link border-b-[1.5px] border-[#1c1a2e] pb-[2px] text-[14px] font-semibold leading-[1.5] text-[#1c1a2e]"
          style={BODY}
        >
          {MORE_PROJECTS.allWork}
        </Link>
      </div>

      <motion.div variants={group} initial="hidden" whileInView="visible" viewport={viewport} className="grid gap-[18px] md:grid-cols-2">
        {MORE_PROJECTS.cards.map((c) => (
          <motion.div variants={item} key={c.title} className="h-full">
            <Link href={c.href} className="case-card group flex h-full w-full items-center gap-5 rounded-[18px] bg-white p-[14px]">
              <div
                className="relative h-[110px] w-[150px] shrink-0 overflow-hidden rounded-[12px]"
                style={{ background: c.thumbBg }}
              >
                {caseStudyThumb(c.href) && !brokenThumbs.has(c.href) ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={caseStudyThumb(c.href)}
                    alt={c.title}
                    loading="lazy"
                    draggable={false}
                    onError={() =>
                      setBrokenThumbs((prev) => new Set(prev).add(c.href))
                    }
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                ) : (
                  <span aria-hidden className="absolute bottom-2 left-2 text-[11px] leading-[1.5]" style={{ ...BODY, color: c.thumbLabel }}>
                    [Thumbnail]
                  </span>
                )}
              </div>
              <div className="flex flex-col gap-1">
                <p className="text-[12px] leading-[1.5] text-[#5d5b70]" style={BODY}>
                  {c.kicker}
                </p>
                <p className="text-[22px] font-semibold leading-[1.2] text-[#1c1a2e]" style={DISPLAY}>
                  {c.title}
                </p>
                <p className="max-w-[300px] text-[14px] leading-[1.5] text-[#5d5b70]" style={BODY}>
                  {c.body}
                </p>
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

/* ---------------------------------- footer ---------------------------------- */

function Footer() {
  return (
    <footer data-index="Contact" data-tone="dark" id="contact" className="w-full" style={{ background: NIGHT }}>
      <div className={`${CONTENT} ${GUTTER} flex flex-col gap-8 pb-16 pt-14 md:flex-row md:items-center md:justify-between`}>
        <div className="flex flex-col gap-2">
          <p className="text-[32px] font-semibold leading-[1.15] text-[#f2f0fa]" style={DISPLAY}>
            Let&apos;s talk.
          </p>
          <a
            href="mailto:nmayacharya@gmail.com"
            className="case-link pb-[2px] text-[16px] leading-[1.5] text-[#c9c5de]"
            style={{ ...BODY, borderBottom: "1px solid #3a3560" }}
          >
            nmayacharya@gmail.com
          </a>
        </div>
        <nav aria-label="Footer" className="flex flex-wrap gap-[26px] text-[14px] leading-[1.5] text-[#f2f0fa]" style={BODY}>
          <a href="https://www.linkedin.com" target="_blank" rel="noreferrer" className="case-link">
            LinkedIn
          </a>
          <a href="https://www.behance.net" target="_blank" rel="noreferrer" className="case-link">
            Behance
          </a>
          <a href="/resume.pdf" className="case-link">
            Résumé (PDF)
          </a>
        </nav>
      </div>
    </footer>
  );
}

/* ----------------------------------- page ----------------------------------- */

export default function InspiritBiologyCase() {
  return (
    <main style={{ background: PAPER }}>
      <ProjectRuler />
      <Nav />
      <Hero />
      <Facts />
      <Curriculum />
      <Brief />
      <Topics />
      <Storyboarding />
      <Ship />
      <Markers />
      <MoreProjects />
      <Footer />
    </main>
  );
}
