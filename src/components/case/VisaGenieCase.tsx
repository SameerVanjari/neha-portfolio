"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, type Variants } from "framer-motion";
import {
  COMPETITIVE,
  FACTS,
  HERO,
  HIFI,
  HOW_MIGHT_WE,
  IA_FLOW,
  MORE_PROJECTS,
  PERSONAS,
  PRIORITIZATION,
  PROBLEM,
  RESEARCH,
  RESULTS,
  RESULTS_NOTE,
  TESTING,
  THEMES,
  VISUAL,
} from "@/data/visagenie";
import { EASE_OUT, LineByLine, Reveal, useStagger, useMotionPref } from "@/components/motion/reveal";
import { useLoadStage } from "@/components/LoadStage";
import { caseStudyThumb } from "@/data/case-studies";
import VisaGenieChatPreview from "@/components/case/VisaGenieChatPreview";

/* ---------------------------------- tokens ---------------------------------
   Sampled directly from the Figma frame (node 291:217). This case study has
   its own palette — lavender and mint on a cool off-white, over deep navy
   bands — so it does not use the shared case-theme tokens. */

const PAPER = "#f5f4f8";
const INK = "#1c2230";
const MUTED = "#5b6272";
const LAVENDER = "#6e5a92";
const LAVENDER_LIGHT = "#b9a8db";
const LAVENDER_TINT = "#ece7f5";
const NAVY = "#1d2a38";
const FRAME = "#e6e3ee";
const FRAME_ON_DARK = "#31465c";
const WHITE = "#ffffff";
const ON_DARK = "#f2f4f8";
const ON_DARK_4 = "#b3becb";
const TRACK = "#eeebf4";
const BAR = "#c9c2d9";

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
    <img
      src={`/case/visagenie/${name}.svg`}
      width={size}
      height={size}
      alt=""
      aria-hidden
      draggable={false}
      className="select-none"
    />
  );
}

/** The design's drop-frames, reproduced exactly: tone, caption, real export slot. */
function Figure({
  file,
  caption,
  height,
  onDark = false,
  src,
  variants,
}: {
  file: string;
  caption?: string;
  height: string;
  onDark?: boolean;
  src?: string;
  /** Set when the figure sits inside a staggered group, so it inherits timing. */
  variants?: Variants;
}) {
  // Exports resolve by convention at /case/visagenie/<file> unless an
  // explicit src is given; a missing asset falls back to the labelled frame
  // rather than a broken image.
  const [failed, setFailed] = useState(false);
  const resolved = !failed ? (src ?? `/case/visagenie/${file}`) : undefined;

  const frame = (
    <div
      className={`flex w-full flex-col items-center justify-center overflow-hidden rounded-[14px] px-2 ${height}`}
      style={{ background: onDark ? FRAME_ON_DARK : FRAME }}
    >
      {resolved ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={resolved}
          alt={caption ?? file}
          loading="lazy"
          draggable={false}
          onError={() => setFailed(true)}
          className="h-full w-full object-cover"
        />
      ) : (
        <span
          aria-hidden
          className="px-2 text-center text-[10px] leading-[1.4]"
          style={{ ...BODY, color: onDark ? LAVENDER_LIGHT : MUTED }}
        >
          Drop image
          <br />
          {file}
        </span>
      )}
    </div>
  );

  const label = caption ? (
    <figcaption
      className="text-[13px] leading-[1.5]"
      style={{ ...BODY, color: onDark ? ON_DARK_4 : MUTED }}
    >
      {caption}
    </figcaption>
  ) : null;

  // Standing alone, a figure reveals itself. Inside a staggered group it must
  // only carry `variants` — adding its own initial/animate would stop it
  // inheriting the group's state.
  if (variants) {
    return (
      <motion.figure variants={variants} className="flex w-full flex-col gap-2">
        {frame}
        {label}
      </motion.figure>
    );
  }

  return (
    <Reveal distance={20}>
      <figure className="flex w-full flex-col gap-2">
        {frame}
        {label}
      </figure>
    </Reveal>
  );
}

function SectionHead({
  eyebrow,
  heading,
  note,
  onDark = false,
}: {
  eyebrow: string;
  heading: string;
  note?: string;
  onDark?: boolean;
}) {
  // Every section announces itself identically: the heading block lands, the
  // supporting note follows a beat behind. Uniform arrival is what lets a long
  // scroll read as one document rather than a dozen separate screens.
  const { group, item, viewport } = useStagger({ distance: 16, step: 0.08 });

  return (
    <motion.div
      variants={group}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      className="flex flex-wrap items-end justify-between gap-6 pb-9"
    >
      <motion.div variants={item} className="max-w-[820px]">
        <p
          className="text-[11px] font-bold uppercase tracking-[1.32px]"
          style={{ ...BODY, color: onDark ? LAVENDER_LIGHT : LAVENDER }}
        >
          {eyebrow}
        </p>
        <h2
          className="mt-[14px] text-[26px] font-semibold leading-[1.15] tracking-[-0.38px] md:text-[38px]"
          style={{ ...DISPLAY, color: onDark ? ON_DARK : INK }}
        >
          {heading}
        </h2>
      </motion.div>
      {note && (
        <motion.p
          variants={item}
          className="max-w-[340px] text-right text-[14px] leading-[1.5]"
          style={{ ...BODY, color: onDark ? ON_DARK_4 : MUTED }}
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
      <Link href="/" className="shrink-0 text-[16px] font-semibold leading-[1.5] text-[#1c2230]" style={BODY}>
        Neha Mayacharya
      </Link>
      {/* Desktop row + a mobile-only contact pill: the links row is 300px
          wide by itself, so at phone widths it must not render at all. */}
      <div className="hidden items-center gap-[30px] md:flex">
        <Link
          href="/projects"
          aria-current="page"
          className="border-b-[1.5px] border-[#1c2230] pb-[3px] text-[14px] font-normal leading-[1.5] text-[#1c2230]"
          style={BODY}
        >
          Work
        </Link>
        <Link
          href="/about"
          className="case-link text-[14px] leading-[1.5] text-[#1c2230]"
          style={BODY}
        >
          About
        </Link>
        <a target="_blank" rel="noreferrer"
          href="/resume.pdf"
          className="case-link text-[14px] leading-[1.5] text-[#1c2230]"
          style={BODY}
        >
          Résumé (PDF)
        </a>
        <a
          href="#contact"
          className="case-cta flex h-10 items-center justify-center rounded-[999px] bg-[#1c2230] px-5 text-[14px] font-semibold leading-[1.5] text-white"
          style={BODY}
        >
          Contact
        </a>
      </div>
      <a
        href="#contact"
        className="case-cta flex h-10 items-center justify-center rounded-[999px] bg-[#1c2230] px-5 text-[14px] font-semibold leading-[1.5] text-white md:hidden"
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
    <section className="relative overflow-hidden bg-[#1d2a38]">
      {/* Lavender glow — a Figma asset, right-bleed behind the copy. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/case/visagenie/glow.svg"
        alt=""
        aria-hidden
        draggable={false}
        className="pointer-events-none absolute -top-5 right-[-220px] hidden h-[760px] w-[760px] select-none lg:block"
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
        <div className="flex w-full max-w-[510px] flex-col gap-[34px] lg:pt-[104px]">
          <motion.div variants={item} className="flex flex-col gap-[18px]">
            <p className="text-[13px] font-semibold leading-[1.5] text-[#b9a8db]" style={BODY}>
              <span className="text-white">{HERO.eyebrowLead}</span>
              {HERO.eyebrowRest}
            </p>
            <h1
              className="text-[38px] font-semibold leading-[1.04] tracking-[-1.2px] text-[#f2f4f8] md:text-[60px]"
              style={DISPLAY}
            >
              {HERO.headline}
            </h1>
            <p className="max-w-[490px] text-[18px] leading-[1.5] text-[#c5cdd8]" style={BODY}>
              {HERO.support}
            </p>
          </motion.div>

          <motion.div variants={item} className="flex flex-col gap-[2px] border-l-[3px] border-[#a9dfbf] pl-4">
            <p className="text-[16px] font-semibold leading-[1.5] text-[#f2f4f8]" style={BODY}>
              {HERO.role}
            </p>
            <p className="max-w-[480px] text-[14px] leading-[1.5] text-[#93a0b0]" style={BODY}>
              {HERO.roleNote}
            </p>
          </motion.div>

          <motion.a
            variants={item}
            href="#contact"
            className="case-cta flex h-[46px] items-center justify-center rounded-[999px] bg-[#a9dfbf] px-[22px] text-[15px] font-semibold leading-[1.5] text-[#1c2230]"
            style={BODY}
          >
            {HERO.cta}
          </motion.a>
        </div>

        {/* Browser window */}
        <motion.div
          variants={item}
          className="w-full max-w-[660px] overflow-hidden rounded-[14px] bg-white shadow-[0_24px_50px_rgba(0,0,0,0.45)] lg:mt-[130px]"
        >
          <div className="flex items-start gap-[7px] bg-[#e9ecf2] px-[14px] py-[11px]">
            <Icon name="dot-1" size={11} />
            <Icon name="dot-2" size={11} />
            <Icon name="dot-3" size={11} />
          </div>
          {/* The design's hero slot ("Drop image vg-28-final-screen.png")
              has no exported bitmap behind it — the sanctioned preview is the
              real component, rendered live inside the browser window. */}
          <div className="h-[300px] w-full overflow-hidden lg:h-[469px]">
            <VisaGenieChatPreview />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ---------------------------------- facts ---------------------------------- */

function Facts() {
  const { group, item, viewport } = useStagger({ distance: 14, step: 0.06 });
  return (
    <section className="w-full bg-[#15202c]">
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
            className={`flex flex-1 items-start gap-3 pb-6 pt-[22px] md:px-5 ${i > 0 ? "border-t border-[#26374a] md:border-l md:border-t-0" : "pr-5"}`}
          >
            <Icon name={f.icon} size={20} />
            <div className="flex flex-col gap-[2px]">
              <p className="text-[11px] tracking-[0.44px] text-[#93a0b0]" style={BODY}>
                {f.label.toUpperCase()}
              </p>
              <p className="text-[15px] font-semibold leading-[1.5] text-[#f2f4f8]" style={BODY}>
                {f.value}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

/* --------------------------------- results --------------------------------- */

function Results() {
  const { group, item, viewport } = useStagger({ distance: 14, step: 0.07 });
  return (
    <section className={`${CONTENT} ${GUTTER} pt-16`}>
          <motion.div
            variants={group}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4"
          >
            {RESULTS.map((r) => (
              <motion.div
                variants={item}
                key={r.value}
                className="flex flex-col gap-[10px] rounded-[18px] px-[22px] pb-6 pt-[22px]"
                style={{ background: r.lead ? LAVENDER : NAVY }}
              >
                <p className="text-[38px] font-semibold leading-none text-white" style={DISPLAY}>
                  {r.value}
                </p>
                <p className="text-[14px] leading-[1.5] text-[#d9dee8]" style={BODY}>
                  {r.body}
                </p>
              </motion.div>
            ))}
          </motion.div>
      <p className="mt-4 text-[12px] leading-[1.5] text-[#5b6272]" style={BODY}>
        {RESULTS_NOTE}
      </p>
    </section>
  );
}

/* --------------------------------- problem --------------------------------- */

function Problem() {
  const { group, item, viewport } = useStagger({ distance: 16, step: 0.06 });
  return (
    <section className={`${CONTENT} ${GUTTER} pt-24`}>
      <SectionHead eyebrow={PROBLEM.eyebrow} heading={PROBLEM.heading} note={PROBLEM.note} />

          <motion.div
            variants={group}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="grid gap-4 md:grid-cols-2 lg:grid-cols-3"
          >
            {THEMES.map((t) => (
              <motion.div
                variants={item}
                key={t.title}
                className="flex flex-col gap-[14px] rounded-[18px] bg-white px-6 pb-[26px] pt-6"
              >
                <div className="flex items-center gap-3">
                  <div
                    className="flex size-11 shrink-0 items-center justify-center rounded-[12px]"
                    style={{ background: LAVENDER_TINT }}
                  >
                    <Icon name={t.icon} size={20} />
                  </div>
                  <p className="text-[18px] font-semibold leading-[1.5] text-[#1c2230]" style={DISPLAY}>
                    {t.title}
                  </p>
                </div>
                {t.stats.map((s) => (
                  <div
                    key={s.value}
                    className="flex items-center gap-3 border-t border-[#e2e0ea] pt-[10px]"
                  >
                    <p className="w-[92px] shrink-0 text-[22px] font-bold leading-[1.5] text-[#6e5a92]" style={BODY}>
                      {s.value}
                    </p>
                    <p className="text-[13px] leading-[1.5] text-[#5b6272]" style={BODY}>
                      {s.body}
                    </p>
                  </div>
                ))}
              </motion.div>
            ))}
          </motion.div>

      {/* The pull-quote is the one place type itself moves: it breaks by its
          own rendered lines, so the reveal follows the actual wrap points at
          every width instead of a guessed break. */}
      <Reveal distance={24} className="mt-4 flex flex-col gap-[10px] rounded-[20px] bg-[#1d2a38] px-8 py-7 md:px-9">
        <LineByLine
          text={PROBLEM.quote}
          className="max-w-[964px] text-[20px] font-medium leading-[1.4] text-[#f2f4f8] md:text-[24px]"
          style={DISPLAY}
        />
        <p className="text-[14px] leading-[1.5] text-[#a9dfbf]" style={BODY}>
          {PROBLEM.quoteBy}
        </p>
      </Reveal>
    </section>
  );
}

/* --------------------------------- research -------------------------------- */

function Research() {
  const { group, item, viewport } = useStagger({ distance: 16, step: 0.06 });
  return (
    <section className={`${CONTENT} ${GUTTER} pt-24`}>
      <SectionHead eyebrow={RESEARCH.eyebrow} heading={RESEARCH.heading} note={RESEARCH.note} />

          <motion.div
            variants={group}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="grid gap-4 md:grid-cols-2 lg:grid-cols-3"
          >
            {RESEARCH.methods.map((m) => (
              <motion.div
                variants={item}
                key={m.title}
                className="flex flex-col gap-2 rounded-[18px] px-[26px] pb-[26px] pt-6"
                style={{ background: m.lead ? LAVENDER : WHITE }}
              >
                <p
                  className="text-[38px] font-bold leading-none md:text-[48px]"
                  style={{ ...DISPLAY, color: m.lead ? WHITE : LAVENDER }}
                >
                  {m.value}
                </p>
                <p
                  className="text-[18px] font-semibold leading-[1.5]"
                  style={{ ...DISPLAY, color: m.lead ? WHITE : INK }}
                >
                  {m.title}
                </p>
                <p
                  className="text-[14px] leading-[1.5]"
                  style={{ ...BODY, color: m.lead ? "#e4ddf0" : MUTED }}
                >
                  {m.body}
                </p>
              </motion.div>
            ))}
          </motion.div>

      <div className="mt-5">
        <Figure file={RESEARCH.figure} height="h-[280px] lg:h-[520px]" />
      </div>
    </section>
  );
}

/* --------------------------------- personas -------------------------------- */

function Personas() {
  const { group, item, viewport } = useStagger({ distance: 18, step: 0.07 });
  return (
    <section className={`${CONTENT} ${GUTTER} pt-24`}>
      <SectionHead eyebrow={PERSONAS.eyebrow} heading={PERSONAS.heading} />

          <motion.div
            variants={group}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="grid gap-4 md:grid-cols-2 lg:grid-cols-3"
          >
            {PERSONAS.people.map((p) => (
              <motion.div
                variants={item}
                key={p.name}
                className="flex flex-col gap-3 rounded-[18px] bg-white px-[22px] pb-6 pt-[22px]"
              >
                <Figure file={p.figure} height="h-[260px] lg:h-[340px]" variants={item} />
                <p className="text-[19px] font-semibold leading-[1.5] text-[#1c2230]" style={DISPLAY}>
                  {p.name}
                </p>
                <p className="text-[12px] font-semibold tracking-[0.48px] text-[#6e5a92]" style={BODY}>
                  {p.meta}
                </p>
                <p className="text-[15px] font-medium leading-[1.45] text-[#1c2230]" style={BODY}>
                  {p.quote}
                </p>
                <div className="flex flex-col gap-1 border-t border-[#e2e0ea] pt-[10px]">
                  <p className="text-[10px] font-bold tracking-[1px] text-[#5b6272]" style={BODY}>
                    PRIMARY PAIN
                  </p>
                  <p className="text-[13px] leading-[1.5] text-[#5b6272]" style={BODY}>
                    {p.pain}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
    </section>
  );
}

/* ------------------------------ how might we ------------------------------- */

function HowMightWe() {
  const { group, item, viewport } = useStagger({ distance: 14, step: 0.05 });
  return (
    <section className={`${CONTENT} ${GUTTER} pt-24`}>
      <SectionHead eyebrow={HOW_MIGHT_WE.eyebrow} heading={HOW_MIGHT_WE.heading} note={HOW_MIGHT_WE.note} />

          <motion.div
            variants={group}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="grid gap-3 md:grid-cols-2"
          >
            {HOW_MIGHT_WE.statements.map((s) => (
              <motion.div
                variants={item}
                key={s.body}
                className="flex flex-col gap-2 rounded-[16px] border-l-[3px] border-[#6e5a92] bg-white px-[22px] pb-[22px] pt-5"
              >
                <p className="text-[10px] font-bold leading-[1.5] tracking-[1px] text-[#6e5a92]" style={BODY}>
                  {s.theme.toUpperCase()}
                </p>
                <p className="text-[17px] font-medium leading-[1.4] text-[#1c2230]" style={BODY}>
                  {s.body}
                </p>
              </motion.div>
            ))}
          </motion.div>
    </section>
  );
}

/* ------------------------------ prioritization ----------------------------- */

function Prioritization() {
  const { group, item, viewport } = useStagger({ distance: 14, step: 0.06 });
  return (
    <section className={`${CONTENT} ${GUTTER} pt-24`}>
      <SectionHead eyebrow={PRIORITIZATION.eyebrow} heading={PRIORITIZATION.heading} note={PRIORITIZATION.note} />

      <Figure file={PRIORITIZATION.figure} caption={PRIORITIZATION.figureCaption} height="h-[300px] lg:h-[560px]" />

      <div className="mt-4 grid gap-4 lg:grid-cols-[600px_1fr]">
        {/* min-w-0 lets the grid track shrink; the bar flexes inside the row
            instead of pushing the card wider than its column. Fills are a
            percentage of the 300px design track, so the proportion survives
            the narrower mobile bar. */}
        <div className="flex min-w-0 flex-col gap-3 rounded-[18px] bg-white px-[26px] pb-[26px] pt-6">
          <p className="text-[11px] font-bold leading-[1.5] tracking-[1.1px] text-[#5b6272]" style={BODY}>
            SOLUTION SCORES · OUT OF 50
          </p>
          {PRIORITIZATION.scores.map((s) => (
            <div key={s.name} className="flex items-center gap-3">
              <p
                className="w-[120px] shrink-0 text-[14px] leading-[1.5] sm:w-[160px]"
                style={{ ...BODY, fontWeight: s.lead ? 700 : 400, color: INK }}
              >
                {s.name}
              </p>
              <div className="h-[14px] min-w-0 max-w-[300px] flex-1 overflow-hidden rounded-[6px]" style={{ background: TRACK }}>
                <div
                  className="h-[14px] rounded-[6px]"
                  style={{ width: `${(s.fill / 300) * 100}%`, background: s.lead ? LAVENDER : BAR }}
                />
              </div>
              <p
                className="shrink-0 text-[14px] font-bold leading-[1.5]"
                style={{ ...BODY, color: s.lead ? LAVENDER : MUTED }}
              >
                {s.score}
              </p>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-3 rounded-[18px] bg-[#1d2a38] px-[26px] pb-[26px] pt-6">
          <p className="text-[11px] font-bold uppercase leading-[1.5] tracking-[1.32px] text-[#a9dfbf]" style={BODY}>
            {PRIORITIZATION.whyTitle}
          </p>
          <p className="text-[17px] font-medium leading-[1.45] text-[#f2f4f8]" style={BODY}>
            {PRIORITIZATION.whyLead}
          </p>
          <p className="text-[14px] leading-[1.5] text-[#b3becb]" style={BODY}>
            {PRIORITIZATION.whyBody}
          </p>
        </div>
      </div>

          <motion.div
            variants={group}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="mt-4 grid gap-3 md:grid-cols-3"
          >
            {PRIORITIZATION.phases.map((p) => (
              <motion.div
                variants={item}
                key={p.label}
                className="flex flex-col gap-2 rounded-[16px] px-[22px] pb-[22px] pt-5"
                style={{ background: p.lead ? LAVENDER : NAVY }}
              >
                <p className="text-[11px] font-bold leading-[1.5] tracking-[1.1px] text-[#a9dfbf]" style={BODY}>
                  {p.label}
                </p>
                <p className="text-[15px] leading-[1.5] text-[#e6eaf0]" style={BODY}>
                  {p.body}
                </p>
              </motion.div>
            ))}
          </motion.div>
    </section>
  );
}

/* ------------------------------- competitive ------------------------------- */

function Competitive() {
  const { group, item, viewport } = useStagger({ distance: 20, step: 0.09 });
  return (
    <section className={`${CONTENT} ${GUTTER} pt-24`}>
      <SectionHead eyebrow={COMPETITIVE.eyebrow} heading={COMPETITIVE.heading} note={COMPETITIVE.note} />
          <motion.div
            variants={group}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="grid gap-4 md:grid-cols-2"
          >
            {COMPETITIVE.figures.map((f) => (
              <Figure
                key={f.file}
                file={f.file}
                caption={f.caption}
                height="h-[220px] lg:h-[356px]"
                variants={item}
              />
            ))}
          </motion.div>
    </section>
  );
}

/* --------------------------------- IA & flow -------------------------------- */

function IaFlow() {
  const { group, item, viewport } = useStagger({ distance: 16, step: 0.07 });
  return (
    <section className={`${CONTENT} ${GUTTER} pt-24`}>
      <SectionHead eyebrow={IA_FLOW.eyebrow} heading={IA_FLOW.heading} note={IA_FLOW.note} />

          <motion.div
            variants={group}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="grid gap-4 md:grid-cols-2 lg:grid-cols-3"
          >
            {IA_FLOW.decisions.map((d) => (
              <motion.div
                variants={item}
                key={d.title}
                className="flex flex-col gap-2 rounded-[18px] bg-white px-6 pb-6 pt-[22px]"
              >
                <p className="text-[11px] font-bold leading-[1.5] tracking-[1.1px] text-[#6e5a92]" style={BODY}>
                  {d.label}
                </p>
                <p className="text-[20px] font-semibold leading-[1.5] text-[#1c2230]" style={DISPLAY}>
                  {d.title}
                </p>
                <p className="text-[14px] leading-[1.5] text-[#5b6272]" style={BODY}>
                  {d.body}
                </p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            variants={group}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="mt-5 grid gap-4 md:grid-cols-2"
          >
            {IA_FLOW.figures.map((f) => (
              <Figure
                key={f.file}
                file={f.file}
                caption={f.caption}
                height="h-[320px] lg:h-[600px]"
                variants={item}
              />
            ))}
          </motion.div>

      <div className="mt-5">
        <Figure file={IA_FLOW.journeys.file} caption={IA_FLOW.journeys.caption} height="h-[340px] lg:h-[640px]" />
      </div>
    </section>
  );
}

/* --------------------------------- hi-fi UI --------------------------------- */

function Hifi() {
  const { group, item, viewport } = useStagger({ distance: 20, step: 0.09 });
  return (
    <section className="w-full pt-24">
      <div className="w-full bg-[#1d2a38] py-24">
        <div className={`${CONTENT} ${GUTTER}`}>
          <SectionHead eyebrow={HIFI.eyebrow} heading={HIFI.heading} note={HIFI.note} onDark />

          {HIFI.figures.map((f) => (
            <div key={f.file} className="mb-5 last:mb-0">
              <Figure
                file={f.file}
                caption={f.caption}
                height={f.wide ? "h-[380px] lg:h-[749px]" : "h-[320px] lg:h-[600px]"}
                onDark
              />
            </div>
          ))}

          <motion.div
            variants={group}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="grid gap-4 md:grid-cols-2"
          >
            {HIFI.entry.map((f) => (
              <Figure
                key={f.file}
                file={f.file}
                caption={f.caption}
                height="h-[240px] lg:h-[400px]"
                onDark
                variants={item}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------ visual design ------------------------------ */

function Visual() {
  const { group, item, viewport } = useStagger({ distance: 14, step: 0.05 });
  return (
    <section className={`${CONTENT} ${GUTTER} pt-24`}>
      <SectionHead eyebrow={VISUAL.eyebrow} heading={VISUAL.heading} note={VISUAL.note} />

          <motion.div
            variants={group}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="grid grid-cols-2 gap-[10px] sm:grid-cols-4 lg:flex lg:flex-wrap"
          >
            {VISUAL.palette.map((c) => (
              <motion.div variants={item} key={c.name} className="flex flex-col gap-1.5">
                <div
                  className="h-[90px] w-full rounded-[12px] border border-[#e2e0ea] lg:w-[120.75px]"
                  style={{ background: c.value }}
                />
                <p className="text-[12px] font-semibold leading-[1.5] text-[#1c2230]" style={BODY}>
                  {c.name}
                </p>
                <p className="text-[11px] leading-[1.5] text-[#5b6272]" style={BODY}>
                  {c.hex}
                </p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            variants={group}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="mt-5 grid gap-4 md:grid-cols-2"
          >
            {VISUAL.brand.map((f) => (
              <Figure
                key={f.file}
                file={f.file}
                caption={f.caption}
                height="h-[240px] lg:h-[400px]"
                variants={item}
              />
            ))}
          </motion.div>

          <motion.div
            variants={group}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="mt-4 grid gap-4 md:grid-cols-2"
          >
            {VISUAL.typeIcons.map((f) => (
              <Figure
                key={f.file}
                file={f.file}
                caption={f.caption}
                height="h-[210px] lg:h-[350px]"
                variants={item}
              />
            ))}
          </motion.div>
    </section>
  );
}

/* ------------------------------ what testing ------------------------------- */

function Testing() {
  const { group, item, viewport } = useStagger({ distance: 14, step: 0.05 });
  return (
    <section className={`${CONTENT} ${GUTTER} pt-24`}>
      <SectionHead eyebrow={TESTING.eyebrow} heading={TESTING.heading} />

          <motion.div
            variants={group}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="grid gap-4 lg:grid-cols-[600px_1fr]"
          >
            <motion.div
              variants={item}
              className="flex flex-col gap-3 rounded-[20px] bg-[#6e5a92] px-7 pb-7 pt-7 md:px-[30px]"
            >
              <p className="text-[11px] font-bold leading-[1.5] tracking-[1.1px] text-[#a9dfbf]" style={BODY}>
                KEY INSIGHT
              </p>
              <p className="max-w-[540px] text-[19px] leading-[1.45] text-white" style={BODY}>
                {TESTING.insight}
              </p>
            </motion.div>

            <motion.div
              variants={item}
              className="flex flex-col gap-[10px] rounded-[20px] bg-white px-[26px] pb-[26px] pt-6"
            >
              <p className="text-[11px] font-bold leading-[1.5] tracking-[1.1px] text-[#6e5a92]" style={BODY}>
                EDGE CASES DESIGNED
              </p>
              {TESTING.edgeCases.map((e) => (
                <div key={e} className="border-t border-[#e2e0ea] pt-2">
                  <p className="text-[14px] leading-[1.5] text-[#5b6272]" style={BODY}>
                    {e}
                  </p>
                </div>
              ))}
            </motion.div>
          </motion.div>

      <div className="mt-5 flex flex-wrap items-center gap-2">
        <p className="text-[11px] font-bold leading-[1.5] tracking-[1.1px] text-[#5b6272]" style={BODY}>
          BUILT WITH
        </p>
        {TESTING.stack.map((s) => (
          <span
            key={s}
            className="rounded-[999px] bg-[#ece7f5] px-3 py-1.5 text-[12px] font-semibold leading-[1.3] text-[#6e5a92]"
            style={BODY}
          >
            {s}
          </span>
        ))}
      </div>

      <p className="mt-[22px] max-w-[1036px] text-[12px] leading-[1.5] text-[#5b6272]" style={BODY}>
        {TESTING.note}
      </p>
    </section>
  );
}

/* ------------------------------ more projects ------------------------------- */

function MoreProjects() {
  const { group, item, viewport } = useStagger({ distance: 18, step: 0.08 });
  return (
    <section className={`${CONTENT} ${GUTTER} flex flex-col gap-[18px] pb-[90px] pt-[110px]`}>
      <div className="flex w-full items-center justify-between">
        <p className="text-[12px] tracking-[1.2px] text-[#5b6272]" style={BODY}>
          {MORE_PROJECTS.label}
        </p>
        <Link
          href="/projects"
          className="case-link border-b-[1.5px] border-[#1c2230] pb-[2px] text-[14px] font-semibold leading-[1.5] text-[#1c2230]"
          style={BODY}
        >
          {MORE_PROJECTS.allWork}
        </Link>
      </div>

          <motion.div
            variants={group}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="grid gap-[18px] md:grid-cols-2"
          >
            {MORE_PROJECTS.cards.map((c) => (
              <motion.div variants={item} key={c.href} className="h-full">
                <Link
                  href={c.href}
                  className="case-card group flex h-full w-full items-center gap-5 rounded-[18px] bg-white p-[14px]"
                >
                  <div
                    className="relative h-[110px] w-[150px] shrink-0 overflow-hidden rounded-[12px]"
                    style={{ background: c.thumbBg }}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={caseStudyThumb(c.href)}
                      alt={c.title}
                      loading="lazy"
                      draggable={false}
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <p className="text-[12px] leading-[1.5] text-[#5b6272]" style={BODY}>
                      {c.kicker}
                    </p>
                    <p className="text-[22px] font-semibold leading-[1.2] text-[#1c2230]" style={DISPLAY}>
                      {c.title}
                    </p>
                    <p className="max-w-[300px] text-[14px] leading-[1.5] text-[#5b6272]" style={BODY}>
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
    <footer id="contact" className="w-full bg-[#1d2a38]">
      <div className={`${CONTENT} ${GUTTER} flex flex-col gap-8 pb-16 pt-14 md:flex-row md:items-center md:justify-between`}>
        <div className="flex flex-col gap-2">
          <p className="text-[32px] font-semibold leading-[1.15] text-[#f2f4f8]" style={DISPLAY}>
            Let&apos;s talk.
          </p>
          <a
            href="mailto:nmayacharya@gmail.com"
            className="case-link border-b border-[#3a4e63] pb-[2px] text-[16px] leading-[1.5] text-[#c5cdd8]"
            style={BODY}
          >
            nmayacharya@gmail.com
          </a>
        </div>
        <nav aria-label="Footer" className="flex flex-wrap gap-[26px] text-[14px] leading-[1.5] text-[#f2f4f8]" style={BODY}>
          <a href="https://www.linkedin.com" target="_blank" rel="noreferrer" className="case-link">
            LinkedIn
          </a>
          <a href="https://www.behance.net" target="_blank" rel="noreferrer" className="case-link">
            Behance
          </a>
          <a target="_blank" rel="noreferrer" href="/resume.pdf" className="case-link">
            Résumé (PDF)
          </a>
        </nav>
      </div>
    </footer>
  );
}

/* ----------------------------------- page ----------------------------------- */

export default function VisaGenieCase() {
  return (
    <main style={{ background: PAPER }}>
      <Nav />
      <Hero />
      <Facts />
      <Results />
      <Problem />
      <Research />
      <Personas />
      <HowMightWe />
      <Prioritization />
      <Competitive />
      <IaFlow />
      <Hifi />
      <Visual />
      <Testing />
      <MoreProjects />
      <Footer />
    </main>
  );
}
