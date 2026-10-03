"use client";

import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import {
  ASSETS,
  BRIEF,
  ENVIRONMENT,
  FACTS,
  HERO,
  METHODOLOGY,
  MODULES,
  MORE_PROJECTS,
  THEME,
  VALIDATION,
} from "@/data/inspirit-physics";
import { EASE_OUT, Reveal, useStagger, useMotionPref } from "@/components/motion/reveal";
import { useLoadStage } from "@/components/LoadStage";
import { caseStudyThumb } from "@/data/case-studies";

/* ---------------------------------- tokens ---------------------------------
   Sampled directly from the Figma frame (node 423:217). This case study has
   its own palette — carnival amber and curriculum blue on a warm paper — so
   it does not use the shared case-theme tokens. */

const PAPER = "#f4f3ef";
const MUTED = "#5d5d63";
const ON_DARK_2 = "#b4b4ba";
const DARK_SLOT = "#3a3a3d";
const LIGHT_SLOT = "#e5e3dc";

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
    <img
      src={`/case/inspirit/${name}.svg`}
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
 * The design's drop-frame, reproduced exactly: tone, hint text, play slot and
 * caption — with a real export slot. Light figures (#e5e3dc) sit on paper
 * sections; dark ones (#3a3a3d) inside charcoal sections.
 */
function FigSlot({
  file,
  height,
  tone = "light",
  className,
  variants,
}: {
  file: string;
  height: string;
  tone?: "light" | "dark";
  className?: string;
  variants?: Variants;
}) {
  const dark = tone === "dark";

  const frame = (
    <div
      className={`flex w-full flex-col items-center justify-center gap-2 overflow-hidden px-2 ${height} ${className ?? ""}`}
      style={{ background: dark ? DARK_SLOT : LIGHT_SLOT, borderRadius: dark ? 16 : 14 }}
    >
      {/* Exports resolve by convention — every drop-frame's file lives at
          /case/inspirit/<file>. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`/case/inspirit/${file}`}
        alt={file}
        loading="lazy"
        draggable={false}
        className="h-full w-full object-cover"
        onError={(e) => {
          const el = e.currentTarget;
          if (el.dataset.fallback) return;
          el.dataset.fallback = "1";
          el.removeAttribute("src");
          el.style.opacity = "0";
        }}
      />
    </div>
  );

  if (variants) return <motion.figure variants={variants}>{frame}</motion.figure>;
  return <Reveal distance={20}>{frame}</Reveal>;
}

function FigCaption({
  children,
  className,
  onDark = false,
}: {
  children: React.ReactNode;
  className?: string;
  onDark?: boolean;
}) {
  return (
    <figcaption className={`text-[13px] leading-[1.5] ${onDark ? ON_DARK_2 : MUTED} ${className ?? ""}`} style={BODY}>
      {children}
    </figcaption>
  );
}

/* ---------------------------------- chrome ---------------------------------- */

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
      className={`${CONTENT} ${GUTTER} flex items-center justify-between py-[14px]`}
    >
      <Link href="/" className="shrink-0 text-[16px] font-semibold leading-[1.5] text-[#1e1e20]" style={BODY}>
        Neha Mayacharya
      </Link>
      {/* Desktop row + a mobile-only contact pill: the links row is over 300px
          wide by itself, so at phone widths it must not render at all. */}
      <div className="hidden items-center gap-[30px] md:flex">
        <Link
          href="/projects"
          aria-current="page"
          className="border-b-[1.5px] border-[#1e1e20] pb-[3px] text-[14px] font-normal leading-[1.5] text-[#1e1e20]"
          style={BODY}
        >
          Work
        </Link>
        <Link href="/about" className="case-link text-[14px] leading-[1.5] text-[#1e1e20]" style={BODY}>
          About
        </Link>
        <a href="/resume.pdf" className="case-link text-[14px] leading-[1.5] text-[#1e1e20]" style={BODY}>
          Résumé (PDF)
        </a>
        <a
          href="#contact"
          className="case-cta flex h-10 items-center justify-center rounded-[999px] bg-[#1e1e20] px-5 text-[14px] font-semibold leading-[1.5] text-white"
          style={BODY}
        >
          Contact
        </a>
      </div>
      <a
        href="#contact"
        className="case-cta flex h-10 items-center justify-center rounded-[999px] bg-[#1e1e20] px-5 text-[14px] font-semibold leading-[1.5] text-white md:hidden"
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
    <section className="relative h-[560px] overflow-hidden bg-[#232325] md:h-[640px] lg:h-[731px]">
      {/* The hero backdrop frame: sky glow + two in-engine shots, positioned
          inside a centred 1440 frame so they land exactly where the design
          puts them on any screen. Slots show from 1440 up, where they clear
          the copy column; below that the copy takes the full width. */}
      <div aria-hidden className="absolute inset-0">
        <div className="relative mx-auto h-full max-w-[1440px]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/case/inspirit/iv-sky-glow.svg"
            alt=""
            draggable={false}
            className="pointer-events-none absolute left-[740px] top-0 hidden h-[760px] w-[760px] select-none lg:block"
          />
          <div
            className="absolute right-20 top-[130px] hidden h-[366px] w-[600px] overflow-hidden rounded-[18px] shadow-[0_24px_50px_rgba(0,0,0,0.5)] min-[1440px]:block"
            style={{ background: DARK_SLOT }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/case/inspirit/iv-c1-dome-cannon-hud.jpg"
              alt=""
              draggable={false}
              className="h-full w-full object-cover"
            />
          </div>
          <div
            className="absolute right-20 top-[470px] hidden h-[172px] w-[360px] overflow-hidden rounded-[16px] shadow-[0_24px_50px_rgba(0,0,0,0.5)] min-[1440px]:block"
            style={{ background: DARK_SLOT }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/case/inspirit/iv-c2-ferris-wheel-domes.jpg"
              alt=""
              draggable={false}
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>

      <motion.div
        variants={group}
        initial="hidden"
        // The hero is above the fold, so it animates on load rather than on
        // scroll. It stays hidden until the preloader releases, otherwise it
        // would play out unseen behind the gate.
        animate={stage === "loading" ? "hidden" : "visible"}
        className={`${CONTENT} ${GUTTER} relative flex flex-col items-start gap-[34px] pb-[72px] pt-[72px] lg:pb-0 lg:pt-[104px]`}
      >
        <div className="flex w-full max-w-[520px] flex-col gap-[18px]">
          <motion.p variants={item} className="text-[13px] font-semibold leading-[1.5] text-[#f5b21b]" style={BODY}>
            <span className="text-white">{HERO.eyebrowLead}</span>
            {HERO.eyebrowRest}
          </motion.p>
          <motion.h1
            variants={item}
            className="text-[38px] font-semibold leading-[1.06] tracking-[-1.12px] text-[#f2f2ef] md:text-[56px]"
            style={DISPLAY}
          >
            {HERO.headline}
          </motion.h1>
          <motion.p variants={item} className="w-full max-w-[500px] text-[18px] leading-[1.5] text-[#c9c9ce]" style={BODY}>
            {HERO.support}
          </motion.p>
        </div>

        <motion.div variants={item} className="flex flex-col gap-[2px] border-l-[3px] border-[#f5b21b] pl-4">
          <p className="text-[16px] leading-[1.5] text-[#c9c9ce]" style={BODY}>
            <span className="font-semibold text-[#f2f2ef]">{HERO.role}</span>
            {HERO.roleRest}
          </p>
          <p className="text-[14px] leading-[1.5] text-[#96969d]" style={BODY}>
            {HERO.roleNote}
          </p>
        </motion.div>

        <motion.a
          variants={item}
          href="#validation"
          className="case-cta flex h-[46px] w-fit items-center justify-center rounded-[999px] bg-[#f5b21b] px-[22px] text-[15px] font-semibold leading-[1.5] text-[#1e1e20]"
          style={BODY}
        >
          {HERO.cta}
        </motion.a>
      </motion.div>
    </section>
  );
}

/* ---------------------------------- facts ---------------------------------- */

function Facts() {
  const { group, item, viewport } = useStagger({ distance: 14, step: 0.06 });
  return (
    <section className="w-full bg-[#1a1a1c]">
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
            className={`flex flex-1 items-start gap-3 pb-6 pt-[22px] md:px-5 ${i > 0 ? "border-t border-[#333336] md:border-l md:border-t-0" : "pr-5"}`}
          >
            <Icon name={f.icon} size={20} />
            <div className="flex flex-col gap-[2px]">
              <p className="text-[11px] tracking-[0.44px] text-[#96969d]" style={BODY}>
                {f.label.toUpperCase()}
              </p>
              <p className="w-[207px] text-[15px] font-semibold leading-[1.5] text-[#f2f2ef]" style={BODY}>
                {f.value}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

/* ---------------------------------- brief ---------------------------------- */

function Brief() {
  const { group, item, viewport } = useStagger({ distance: 18, step: 0.07 });
  return (
    <section className={`${CONTENT} ${GUTTER} pt-24`}>
      <Reveal distance={16} className="pb-9">
        <p className="text-[11px] font-bold uppercase leading-[1.5] tracking-[1.32px] text-[#2e7db8]" style={BODY}>
          {BRIEF.eyebrow}
        </p>
        <h2 className="mt-[14px] max-w-[820px] text-[26px] font-semibold leading-[1.15] tracking-[-0.38px] text-[#1e1e20] md:text-[38px]" style={DISPLAY}>
          {BRIEF.heading}
        </h2>
      </Reveal>

      <motion.div variants={group} initial="hidden" whileInView="visible" viewport={viewport} className="flex flex-col gap-4 lg:flex-row">
        <motion.div variants={item} className="flex w-full flex-col gap-[14px] rounded-[20px] bg-[#232325] px-[30px] pb-[30px] pt-[28px] lg:w-[400px]">
          <p className="text-[11px] font-bold uppercase leading-[1.5] tracking-[1.32px] text-[#f5b21b]" style={BODY}>
            {BRIEF.cardLabel}
          </p>
          <p className="text-[19px] font-medium leading-[1.45] text-[#f2f2ef] md:text-[21px]" style={BODY}>
            {BRIEF.cardLead}
          </p>
          <p className="text-[15px] leading-[1.5] text-[#b4b4ba]" style={BODY}>
            {BRIEF.cardBody}
          </p>
        </motion.div>

        <motion.figure variants={item} className="flex w-full flex-col gap-2 lg:w-[620px]">
          <FigSlot file={BRIEF.layoutFigure} height="h-[240px] lg:h-[341px]" />
          <FigCaption>{BRIEF.layoutCaption}</FigCaption>
        </motion.figure>
      </motion.div>
    </section>
  );
}

/* ------------------------------- methodology -------------------------------- */

function Methodology() {
  const { group, item, viewport } = useStagger({ distance: 16, step: 0.05 });
  return (
    <section className={`${CONTENT} ${GUTTER} pt-24`}>
      <Reveal distance={16} className="pb-9">
        <p className="text-[11px] font-bold uppercase leading-[1.5] tracking-[1.32px] text-[#2e7db8]" style={BODY}>
          {METHODOLOGY.eyebrow}
        </p>
        <h2 className="mt-[14px] max-w-[760px] text-[26px] font-semibold leading-[1.15] tracking-[-0.38px] text-[#1e1e20] md:text-[38px]" style={DISPLAY}>
          {METHODOLOGY.heading}
        </h2>
      </Reveal>

      <motion.div variants={group} initial="hidden" whileInView="visible" viewport={viewport} className="grid gap-[14px] md:grid-cols-2 lg:grid-cols-3">
        {METHODOLOGY.steps.map((step) => (
          <motion.div variants={item} key={step.num} className="flex flex-col gap-2 rounded-[18px] bg-white px-[22px] pb-6 pt-[22px]">
            <div className="flex items-center gap-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/case/inspirit/iv-triangle.svg" width={18} height={16} alt="" aria-hidden className="select-none" />
              <p className="text-[13px] font-bold leading-[1.5] text-[#5d5d63]" style={BODY}>
                {step.num}
              </p>
            </div>
            <p className="text-[19px] font-semibold leading-[1.5] text-[#1e1e20]" style={DISPLAY}>
              {step.title}
            </p>
            <p className="text-[14px] leading-[1.5] text-[#5d5d63]" style={BODY}>
              {step.body}
            </p>
          </motion.div>
        ))}
      </motion.div>

      <Reveal distance={20} className="mt-4">
        <figure className="flex w-full flex-col gap-2">
          <FigSlot file={METHODOLOGY.diagramFigure} height="h-[420px] lg:h-[901px]" />
          <FigCaption>{METHODOLOGY.diagramCaption}</FigCaption>
        </figure>
      </Reveal>
    </section>
  );
}

/* ---------------------------------- theme ---------------------------------- */

function Theme() {
  return (
    <section className={`${CONTENT} ${GUTTER} pt-24`}>
      <Reveal distance={16} className="flex flex-wrap items-end justify-between gap-6 pb-9">
        <div className="max-w-[580px]">
          <p className="text-[11px] font-bold uppercase leading-[1.5] tracking-[1.32px] text-[#2e7db8]" style={BODY}>
            {THEME.eyebrow}
          </p>
          <h2 className="mt-[14px] text-[26px] font-semibold leading-[1.15] tracking-[-0.38px] text-[#1e1e20] md:text-[38px]" style={DISPLAY}>
            {THEME.heading}
          </h2>
        </div>
        <p className="max-w-[340px] text-right text-[14px] leading-[1.5] text-[#5d5d63]" style={BODY}>
          {THEME.note}
        </p>
      </Reveal>

      <Reveal distance={20}>
        <figure className="flex w-full flex-col gap-2">
          <FigSlot file={THEME.themeFigure} height="h-[300px] lg:h-[569px]" />
          <FigCaption>{THEME.themeCaption}</FigCaption>
        </figure>
      </Reveal>

      <div className="mt-5 flex flex-col gap-4 lg:flex-row lg:gap-4">
        <Reveal distance={20} className="lg:w-[400px]">
          <figure className="flex w-full flex-col gap-2">
            <FigSlot file={THEME.ideasFigure} height="h-[420px] lg:h-[797px]" />
            <FigCaption>{THEME.ideasCaption}</FigCaption>
          </figure>
        </Reveal>
        <div className="flex flex-col gap-4 lg:w-[620px]">
          <Reveal distance={20}>
            <figure className="flex w-full flex-col gap-2">
              <FigSlot file={THEME.tentDesignFigure} height="h-[300px] lg:h-[539px]" />
              <FigCaption>{THEME.tentDesignCaption}</FigCaption>
            </figure>
          </Reveal>
          <Reveal distance={20}>
            <figure className="flex w-full flex-col gap-2">
              <FigSlot file={THEME.tentStudiesFigure} height="h-[300px] lg:h-[539px]" />
              <FigCaption>{THEME.tentStudiesCaption}</FigCaption>
            </figure>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------- assets ---------------------------------- */

function Assets() {
  return (
    <section className={`${CONTENT} ${GUTTER} pt-24`}>
      <Reveal distance={16} className="flex flex-wrap items-end justify-between gap-6 pb-9">
        <div className="max-w-[600px]">
          <p className="text-[11px] font-bold uppercase leading-[1.5] tracking-[1.32px] text-[#2e7db8]" style={BODY}>
            {ASSETS.eyebrow}
          </p>
          <h2 className="mt-[14px] text-[26px] font-semibold leading-[1.15] tracking-[-0.38px] text-[#1e1e20] md:text-[38px]" style={DISPLAY}>
            {ASSETS.heading}
          </h2>
        </div>
        <p className="max-w-[340px] text-right text-[14px] leading-[1.5] text-[#5d5d63]" style={BODY}>
          {ASSETS.note}
        </p>
      </Reveal>

      <Reveal distance={20}>
        <figure className="flex w-full flex-col gap-2">
          <FigSlot file={ASSETS.figure} height="h-[460px] lg:h-[989px]" />
          <FigCaption>{ASSETS.caption}</FigCaption>
        </figure>
      </Reveal>
    </section>
  );
}

/* ------------------------------- environment -------------------------------- */

function Environment() {
  const { group, item, viewport } = useStagger({ distance: 20, step: 0.09 });
  return (
    <section className="w-full pt-24">
      <div className="w-full bg-[#232325]">
        <div className={`${CONTENT} ${GUTTER} py-24`}>
          <Reveal distance={16} className="pb-9">
            <p className="text-[11px] font-bold uppercase leading-[1.5] tracking-[1.32px] text-[#f5b21b]" style={BODY}>
              {ENVIRONMENT.eyebrow}
            </p>
            <h2 className="mt-[14px] max-w-[820px] text-[26px] font-semibold leading-[1.15] tracking-[-0.38px] text-[#f2f2ef] md:text-[38px]" style={DISPLAY}>
              {ENVIRONMENT.heading}
            </h2>
          </Reveal>

          {/* Exterior row: arch and domes. */}
          <motion.div variants={group} initial="hidden" whileInView="visible" viewport={viewport} className="grid gap-4 lg:grid-cols-2">
            <motion.figure variants={item} className="flex w-full flex-col gap-2">
              <FigSlot file={ENVIRONMENT.archFigure} height="h-[220px] lg:h-[238px]" tone="dark" />
              <FigCaption onDark>{ENVIRONMENT.archCaption}</FigCaption>
            </motion.figure>
            <motion.figure variants={item} className="flex w-full flex-col gap-2">
              <FigSlot file={ENVIRONMENT.domesFigure} height="h-[220px] lg:h-[244px]" tone="dark" />
              <FigCaption onDark>{ENVIRONMENT.domesCaption}</FigCaption>
            </motion.figure>
          </motion.div>

          {/* Detailing: tall strip left, art direction right. */}
          <div className="mt-5 flex flex-col gap-4 lg:flex-row">
            <Reveal distance={20} className="lg:w-[440px]">
              <figure className="flex w-full flex-col gap-2">
                <FigSlot file={ENVIRONMENT.detailingFigure} height="h-[380px] sm:h-[460px] lg:h-[1084px]" tone="dark" />
                <FigCaption onDark>{ENVIRONMENT.detailingCaption}</FigCaption>
              </figure>
            </Reveal>
            <motion.div variants={group} initial="hidden" whileInView="visible" viewport={viewport} className="flex flex-col gap-4 lg:w-[580px]">
              <motion.div variants={item} className="flex flex-col gap-[10px] rounded-[18px] bg-[#2e2e31] px-6 pb-6 pt-[22px]">
                <p className="text-[11px] font-bold uppercase leading-[1.5] tracking-[1.32px] text-[#f5b21b]" style={BODY}>
                  {ENVIRONMENT.artDirection.label}
                </p>
                <p className="text-[16px] leading-[1.55] text-[#f2f2ef]" style={BODY}>
                  {ENVIRONMENT.artDirection.body}
                </p>
              </motion.div>
              <motion.figure variants={item} className="flex w-full flex-col gap-2">
                <FigSlot file={ENVIRONMENT.notesFigure} height="h-[300px] lg:h-[554px]" tone="dark" />
                <FigCaption onDark>{ENVIRONMENT.notesCaption}</FigCaption>
              </motion.figure>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------- modules --------------------------------- */

function Objective({ text }: { text: string }) {
  return (
    <div className="flex w-full flex-col gap-[6px] rounded-[14px] border-l-[3px] border-[#f5b21b] bg-[#fdf3d8] px-[18px] pb-4 pt-[14px]">
      <p className="text-[10px] font-bold leading-[1.5] tracking-[1px] text-[#9a6b00]" style={BODY}>
        OBJECTIVE
      </p>
      <p className="text-[15px] font-medium leading-[1.5] text-[#1e1e20]" style={BODY}>
        {text}
      </p>
    </div>
  );
}

function ModuleBlock({ module: m }: { module: (typeof MODULES.items)[number] }) {
  const { group, item, viewport } = useStagger({ distance: 18, step: 0.07 });
  return (
    <div className="flex flex-col gap-5 pb-12">
      <motion.div variants={group} initial="hidden" whileInView="visible" viewport={viewport} className="flex flex-col gap-6 lg:flex-row lg:gap-6">
        <motion.div variants={item} className="flex w-full flex-col gap-3 lg:w-[480px]">
          <p className="text-[11px] font-bold uppercase leading-[1.5] tracking-[1.32px] text-[#2e7db8]" style={BODY}>
            {m.eyebrow}
          </p>
          <p className="text-[24px] font-semibold leading-[1.15] text-[#1e1e20] md:text-[30px]" style={DISPLAY}>
            {m.title}
          </p>
          <p className="text-[15px] leading-[1.6] text-[#5d5d63]" style={BODY}>
            {m.body}
          </p>
          <Objective text={m.objective} />
        </motion.div>
        <motion.figure variants={item} className="w-full lg:w-[532px]">
          <FigSlot file={m.heroFigure} height="h-[220px] lg:h-[324px]" tone="dark" className="lg:rounded-[16px]" />
        </motion.figure>
      </motion.div>

      <motion.div variants={group} initial="hidden" whileInView="visible" viewport={viewport} className="flex flex-col gap-6 lg:flex-row lg:gap-6">
        <motion.div variants={item} className="flex w-full flex-col gap-3 lg:w-[480px]">
          {m.outcomes.map((outcome) => (
            <div key={outcome.slice(0, 24)} className="flex items-start gap-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/case/inspirit/iv-bullet.svg" width={16} height={19} alt="" aria-hidden className="mt-[2px] shrink-0 select-none" />
              <p className="max-w-[450px] text-[15px] leading-[1.5] text-[#1e1e20]" style={BODY}>
                {outcome}
              </p>
            </div>
          ))}
        </motion.div>
        <motion.div variants={item} className="grid w-full grid-cols-2 gap-3 lg:w-[532px]">
          {m.shots.map((shot) => (
            <figure key={shot.file} className="flex w-full flex-col gap-2">
              <FigSlot file={shot.file} height="h-[110px] lg:h-[158px]" />
              <FigCaption>{shot.caption}</FigCaption>
            </figure>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}

function Modules() {
  return (
    <section className={`${CONTENT} ${GUTTER} pt-24`}>
      <Reveal distance={16} className="pb-9">
        <p className="text-[11px] font-bold uppercase leading-[1.5] tracking-[1.32px] text-[#2e7db8]" style={BODY}>
          {MODULES.eyebrow}
        </p>
        <h2 className="mt-[14px] max-w-[820px] text-[26px] font-semibold leading-[1.15] tracking-[-0.38px] text-[#1e1e20] md:text-[38px]" style={DISPLAY}>
          {MODULES.heading}
        </h2>
      </Reveal>

      {MODULES.items.map((m) => (
        <ModuleBlock key={m.eyebrow} module={m} />
      ))}

      <Reveal distance={20}>
        <figure className="flex w-full flex-col gap-2">
          <FigSlot file={MODULES.controllerFigure} height="h-[280px] lg:h-[585px]" />
          <FigCaption>{MODULES.controllerCaption}</FigCaption>
        </figure>
      </Reveal>
    </section>
  );
}

/* ------------------------------ user validation ------------------------------ */

function Validation() {
  const { group, item, viewport } = useStagger({ distance: 18, step: 0.07 });
  return (
    <section id="validation" className={`${CONTENT} ${GUTTER} pt-24`}>
      <Reveal distance={16} className="flex flex-wrap items-end justify-between gap-6 pb-9">
        <div className="max-w-[580px]">
          <p className="text-[11px] font-bold uppercase leading-[1.5] tracking-[1.32px] text-[#2e7db8]" style={BODY}>
            {VALIDATION.eyebrow}
          </p>
          <h2 className="mt-[14px] text-[26px] font-semibold leading-[1.15] tracking-[-0.38px] text-[#1e1e20] md:text-[38px]" style={DISPLAY}>
            {VALIDATION.heading}
          </h2>
        </div>
        <p className="max-w-[340px] text-right text-[14px] leading-[1.5] text-[#5d5d63]" style={BODY}>
          {VALIDATION.note}
        </p>
      </Reveal>

      <motion.div variants={group} initial="hidden" whileInView="visible" viewport={viewport} className="flex flex-col gap-4 lg:w-[1036px] lg:flex-row">
        <motion.figure variants={item} className="flex w-full flex-col gap-2 lg:w-[620px]">
          <FigSlot file={VALIDATION.testingFigure} height="h-[380px] lg:h-[698px]" />
          <FigCaption>{VALIDATION.testingCaption}</FigCaption>
        </motion.figure>
        <motion.figure variants={item} className="flex w-full flex-col gap-2 lg:w-[400px]">
          <FigSlot file={VALIDATION.classroomFigure} height="h-[300px] lg:h-[484px]" />
          <FigCaption>{VALIDATION.classroomCaption}</FigCaption>
        </motion.figure>
      </motion.div>

      <Reveal distance={14} className="mt-7">
        <p className="text-[11px] font-bold uppercase leading-[1.5] tracking-[1.32px] text-[#2e7db8]" style={BODY}>
          {VALIDATION.quotesLabel}
        </p>
      </Reveal>

      <motion.div variants={group} initial="hidden" whileInView="visible" viewport={viewport} className="mt-[14px] grid gap-4 md:grid-cols-2 lg:w-[1036px] lg:grid-cols-3">
        {VALIDATION.quotes.map((q) => (
          <motion.div
            variants={item}
            key={q.by}
            className={`flex flex-col gap-[14px] rounded-[18px] p-[26px] ${q.dark ? "bg-[#232325]" : "bg-white"}`}
          >
            <p
              className={`text-[48px] font-bold leading-[0.6] ${q.dark ? "text-[#f5b21b]" : "text-[#f5b21b]"}`}
              style={DISPLAY}
              aria-hidden
            >
              &ldquo;
            </p>
            <p className={`w-full max-w-[282px] text-[16px] font-medium leading-[1.5] ${q.dark ? "text-[#f2f2ef]" : "text-[#1e1e20]"}`} style={BODY}>
              {q.quote}
            </p>
            <p className={`text-[13px] font-semibold leading-[1.5] ${q.dark ? "text-[#f5b21b]" : "text-[#2e7db8]"}`} style={BODY}>
              {q.by}
            </p>
          </motion.div>
        ))}
      </motion.div>

      <Reveal distance={20} className="mt-7 lg:w-[1036px]">
        <figure className="flex w-full flex-col gap-2">
          {/* The design's video slot: in-headset walkthrough, poster until play. */}
          <video
            controls
            preload="metadata"
            poster="/case/inspirit/iv-video-poster.jpg"
            src="/case/inspirit/iv-video-walkthrough.mp4"
            className="h-[420px] w-full rounded-[14px] bg-[#e5e3dc] object-cover lg:h-[988px]"
          />
          <FigCaption>{VALIDATION.video.caption}</FigCaption>
        </figure>
      </Reveal>

      <Reveal distance={0} className="pt-[22px]">
        <p className="w-full max-w-[1036px] text-[12px] leading-[1.5] text-[#5d5d63]" style={BODY}>
          {VALIDATION.footnote}
        </p>
      </Reveal>
    </section>
  );
}

/* ------------------------------ more projects ------------------------------- */

function MoreProjects() {
  const { group, item, viewport } = useStagger({ distance: 18, step: 0.08 });
  return (
    <section className={`${CONTENT} ${GUTTER} flex flex-col gap-[18px] pb-[90px] pt-[110px]`}>
      <div className="flex w-full items-center justify-between">
        <p className="text-[12px] tracking-[1.2px] text-[#5d5d63]" style={BODY}>
          {MORE_PROJECTS.label}
        </p>
        <Link
          href="/projects"
          className="case-link border-b-[1.5px] border-[#1e1e20] pb-[2px] text-[14px] font-semibold leading-[1.5] text-[#1e1e20]"
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
                className="relative flex h-[110px] w-[150px] shrink-0 items-end overflow-hidden rounded-[12px] pb-2 pl-2"
                style={{ background: c.thumbBg }}
              >
                {caseStudyThumb(c.href) ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={caseStudyThumb(c.href)}
                    alt={c.title}
                    loading="lazy"
                    draggable={false}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                ) : (
                  // The Figma's placeholder frame: label on the tint.
                  <span aria-hidden className="text-[11px] leading-[1.5]" style={{ ...BODY, color: c.thumbLabel }}>
                    [Thumbnail]
                  </span>
                )}
              </div>
              <div className="flex flex-col gap-1">
                <p className="text-[12px] leading-[1.5] text-[#5d5d63]" style={BODY}>
                  {c.kicker}
                </p>
                <p className="text-[22px] font-semibold leading-[1.2] text-[#1e1e20]" style={DISPLAY}>
                  {c.title}
                </p>
                <p className="max-w-[300px] text-[14px] leading-[1.5] text-[#5d5d63]" style={BODY}>
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
    <footer id="contact" className="w-full bg-[#232325]">
      <div className={`${CONTENT} ${GUTTER} flex flex-col gap-8 pb-16 pt-14 md:flex-row md:items-center md:justify-between`}>
        <div className="flex flex-col gap-2">
          <p className="text-[32px] font-semibold leading-[1.15] text-[#f2f2ef]" style={DISPLAY}>
            Let&apos;s talk.
          </p>
          <a
            href="mailto:nmayacharya@gmail.com"
            className="case-link border-b border-[#444448] pb-[2px] text-[16px] leading-[1.5] text-[#c9c9ce]"
            style={BODY}
          >
            nmayacharya@gmail.com
          </a>
        </div>
        <nav aria-label="Footer" className="flex flex-wrap gap-[26px] text-[14px] leading-[1.5] text-[#f2f2ef]" style={BODY}>
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

export default function InspiritPhysicsCase() {
  return (
    <main style={{ background: PAPER }}>
      <Nav />
      <Hero />
      <Facts />
      <Brief />
      <Methodology />
      <Theme />
      <Assets />
      <Environment />
      <Modules />
      <Validation />
      <MoreProjects />
      <Footer />
    </main>
  );
}
