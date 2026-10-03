"use client";

import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import {
  AI_PROCESS,
  COMPETITIVE,
  FACTS,
  FEATURES,
  FIDELITY,
  HERO,
  MOMENT,
  MORE_PROJECTS,
  PERSONAS,
  PIVOT,
  PROBLEM,
  PROTOTYPE,
  REFLECTION,
} from "@/data/focus";
import { EASE_OUT, LineByLine, Reveal, useStagger, useMotionPref } from "@/components/motion/reveal";
import { useLoadStage } from "@/components/LoadStage";
import { caseStudyThumb } from "@/data/case-studies";

/* ---------------------------------- tokens ---------------------------------
   Sampled directly from the Figma frame (node 411:217). This case study has
   its own palette — amber and moss on a warm cream paper, over deep moss
   bands — so it does not use the shared case-theme tokens. */

const PAPER = "#f4f1e8";
const MUTED = "#65756a";
const AMBER = "#d9a441";
const FRAME = "#e6e2d6";
const ON_HERO_4 = "#aeb9ae";
const PHONE = "#263628";
const PHONE_BORDER = "#0a110d";

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
      src={`/case/focus/${name}.svg`}
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
 * The Focus case's Figma file exports every slot under the design's own
 * filename (fc-dark-4-lock-screen.png), so a figure resolves its asset by
 * name — a replacement export only has to keep the name.
 */
const asset = (file: string) => `/case/focus/${file}`;

/** The design's drop-frames, reproduced exactly: tone, caption, real export slot. */
function Figure({
  file,
  caption,
  height,
  tone = "light",
  src,
  variants,
  className,
}: {
  file: string;
  caption?: string;
  height: string;
  /** `light` sits on the paper sections, `dark` inside the prototype band. */
  tone?: "light" | "neutral" | "dark";
  src?: string;
  /** Set when the figure sits inside a staggered group, so it inherits timing. */
  variants?: Variants;
  className?: string;
}) {
  const frameBg =
    tone === "dark" ? PHONE : tone === "neutral" ? FRAME : "#e6e2d6";
  const frameRadius = tone === "dark" ? "rounded-[26px]" : "rounded-[14px]";

  const frame = (
    <div
      // The inner padding only exists to inset the drop-hint text; a real
      // export fills the frame edge to edge.
      className={`flex w-full flex-col items-center justify-center overflow-hidden ${src ? "" : "px-2"} ${height} ${frameRadius}`}
      style={{ background: frameBg }}
    >
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={caption ?? file}
          loading="lazy"
          draggable={false}
          className="h-full w-full object-cover"
        />
      ) : (
        <span
          aria-hidden
          className={`px-2 text-center text-[10px] leading-[1.4] ${tone === "dark" ? AMBER : MUTED}`}
          style={BODY}
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
      className={`text-[13px] leading-[1.5] ${tone === "dark" ? ON_HERO_4 : MUTED}`}
      style={BODY}
    >
      {caption}
    </figcaption>
  ) : null;

  // Standing alone, a figure reveals itself. Inside a staggered group it must
  // only carry `variants` — adding its own initial/animate would stop it
  // inheriting the group's state.
  if (variants) {
    return (
      <motion.figure variants={variants} className={`flex w-full flex-col gap-2 ${className ?? ""}`}>
        {frame}
        {label}
      </motion.figure>
    );
  }

  return (
    <Reveal distance={20}>
      <figure className={`flex w-full flex-col gap-2 ${className ?? ""}`}>
        {frame}
        {label}
      </figure>
    </Reveal>
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
      <Link href="/" className="shrink-0 text-[16px] font-semibold leading-[1.5] text-[#15201a]" style={BODY}>
        Neha Mayacharya
      </Link>
      {/* Desktop row + a mobile-only contact pill: the links row is over 300px
          wide by itself, so at phone widths it must not render at all. */}
      <div className="hidden items-center gap-[30px] md:flex">
        <Link
          href="/projects"
          aria-current="page"
          className="border-b-[1.5px] border-[#15201a] pb-[3px] text-[14px] font-normal leading-[1.5] text-[#15201a]"
          style={BODY}
        >
          Work
        </Link>
        <Link href="/about" className="case-link text-[14px] leading-[1.5] text-[#15201a]" style={BODY}>
          About
        </Link>
        <a target="_blank" rel="noreferrer" href="/resume.pdf" className="case-link text-[14px] leading-[1.5] text-[#15201a]" style={BODY}>
          Résumé (PDF)
        </a>
        <a
          href="#contact"
          className="case-cta flex h-10 items-center justify-center rounded-[999px] bg-[#15201a] px-5 text-[14px] font-semibold leading-[1.5] text-white"
          style={BODY}
        >
          Contact
        </a>
      </div>
      <a
        href="#contact"
        className="case-cta flex h-10 items-center justify-center rounded-[999px] bg-[#15201a] px-5 text-[14px] font-semibold leading-[1.5] text-white md:hidden"
        style={BODY}
      >
        Contact
      </a>
    </motion.header>
  );
}

/* ---------------------------------- hero ----------------------------------- */

/** Phone drop-frame used twice in the hero at different sizes. */
function HeroPhone({
  file,
  width,
  height,
  top,
  right,
}: {
  file: string;
  width: string;
  height: string;
  top: string;
  right: string;
}) {
  return (
    <div
      className={`absolute flex items-center justify-center overflow-hidden ${width} ${height}`}
      style={{
        top,
        right,
        background: PHONE,
        border: `7px solid ${PHONE_BORDER}`,
        borderRadius: 32,
        boxShadow: "0px 24px 50px rgba(0,0,0,0.5)",
      }}
    >
      {/* Real screen export, inside the design's own bezel. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={asset(file)}
        alt=""
        aria-hidden
        draggable={false}
        className="h-full w-full object-cover"
      />
    </div>
  );
}

function Hero() {
  const reduce = useMotionPref();
  const { stage } = useLoadStage();
  const { group, item } = heroMotion(!!reduce);

  return (
    <section className="relative overflow-hidden bg-[#15201a]">
      {/* Amber glow — a Figma asset, right-bleed behind the copy. Anchored to
          the right edge so the 1440 design's phone cluster survives narrower
          viewports: at 1440 this lands at left 760, exactly where the design
          puts it. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/case/focus/glow.svg"
        alt=""
        aria-hidden
        draggable={false}
        className="pointer-events-none absolute top-[10px] right-[-40px] hidden h-[720px] w-[720px] select-none lg:block"
      />

      {/* The hero's two phone slots — the design places them as absolute
          frames; they drop out below `lg` where the copy takes the full
          width instead. Offsets are the design's own right-edges. */}
      <div className="hidden lg:block" aria-hidden>
        <HeroPhone file="fc-dark-4-lock-screen.png" width="w-[260px]" height="h-[555.89px]" top="100px" right="320px" />
        <HeroPhone file="fc-dark-5-calm-prompt.png" width="w-[240px]" height="h-[513.13px]" top="140px" right="90px" />
      </div>

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
            <p className="text-[13px] font-semibold leading-[1.5] text-[#9daa9b]" style={BODY}>
              <span className="text-white">{HERO.eyebrowLead}</span>
              {HERO.eyebrowRest}
            </p>
            <h1 className="text-[38px] font-semibold leading-[1.06] tracking-[-1.12px] text-[#f1ecdd] md:text-[56px]">
              {HERO.headlinePlain}
              <span className="text-[#d9a441]">{HERO.headlineAmber}</span>
            </h1>
            <p className="w-full max-w-[510px] text-[18px] leading-[1.5] text-[#c4ccc1]" style={BODY}>
              {HERO.support}
            </p>
          </motion.div>

          <motion.div variants={item} className="flex flex-col gap-[2px] border-l-[3px] border-[#d9a441] pl-4">
            <p className="text-[16px] leading-[1.5] text-[#c4ccc1]" style={BODY}>
              <span className="font-semibold text-[#f1ecdd]">{HERO.role}</span>
              {HERO.roleRest}
            </p>
            <p className="text-[14px] leading-[1.5] text-[#8e9c90]" style={BODY}>
              {HERO.roleNote}
            </p>
          </motion.div>

          <motion.a
            variants={item}
            href="#prototype"
            className="case-cta flex h-[46px] w-fit items-center justify-center rounded-[999px] bg-[#d9a441] px-[22px] text-[15px] font-semibold leading-[1.5] text-[#15201a]"
            style={BODY}
          >
            {HERO.cta}
          </motion.a>
        </div>
      </motion.div>
    </section>
  );
}

/* ---------------------------------- facts ---------------------------------- */

function Facts() {
  const { group, item, viewport } = useStagger({ distance: 14, step: 0.06 });
  return (
    <section className="w-full bg-[#0f1812]">
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
            className={`flex flex-1 items-start gap-3 pb-6 pt-[22px] md:px-5 ${i > 0 ? "border-t border-[#233128] md:border-l md:border-t-0" : "pr-5"}`}
          >
            <Icon name={f.icon} size={20} />
            <div className="flex flex-col gap-[2px]">
              <p className="text-[11px] tracking-[0.44px] text-[#8e9c90]" style={BODY}>
                {f.label.toUpperCase()}
              </p>
              <p className="max-w-[207px] text-[15px] font-semibold leading-[1.5] text-[#f1ecdd]" style={BODY}>
                {f.value}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

/* --------------------------------- moment ---------------------------------- */

function Moment() {
  return (
    <section className={`${CONTENT} ${GUTTER} pt-24`}>
      <Reveal distance={16} className="pb-9">
        <p className="text-[11px] font-bold uppercase leading-[1.5] tracking-[1.32px] text-[#56705c]" style={BODY}>
          {MOMENT.eyebrow}
        </p>
        <h2 className="mt-[14px] max-w-[880px] text-[26px] font-semibold leading-[1.15] tracking-[-0.38px] text-[#15201a] md:text-[38px]" style={DISPLAY}>
          {MOMENT.heading}
        </h2>
      </Reveal>

      <Reveal distance={18}>
        <div className="flex flex-col gap-4 lg:flex-row">
          <div className="flex w-full flex-col gap-[14px] rounded-[20px] bg-white px-[30px] pb-[30px] pt-[28px] text-[17px] leading-[1.55] text-[#15201a] lg:w-[560px]">
            <p style={BODY}>{MOMENT.story[0]}</p>
            <p className="font-semibold" style={BODY}>
              {MOMENT.story[1]}
            </p>
          </div>
          <div className="flex w-full flex-col gap-3 rounded-[20px] bg-[#15201a] px-[30px] pb-[30px] pt-[28px] lg:w-[460px]">
            <p className="text-[11px] font-bold uppercase leading-[1.5] tracking-[1.32px] text-[#d9a441]" style={BODY}>
              {MOMENT.windowLabel}
            </p>
            <p className="text-[19px] font-medium leading-[1.45] text-[#f1ecdd] md:text-[21px]" style={BODY}>
              {MOMENT.window}
            </p>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

/* --------------------------------- problem --------------------------------- */

function Problem() {
  const { group, item, viewport } = useStagger({ distance: 18, step: 0.07 });
  return (
    <section className={`${CONTENT} ${GUTTER} pt-24`}>
      <Reveal distance={16} className="pb-9">
        <p className="text-[11px] font-bold uppercase leading-[1.5] tracking-[1.32px] text-[#56705c]" style={BODY}>
          {PROBLEM.eyebrow}
        </p>
        <h2 className="mt-[14px] max-w-[820px] text-[26px] font-semibold leading-[1.15] tracking-[-0.38px] text-[#15201a] md:text-[38px]" style={DISPLAY}>
          {PROBLEM.heading}
        </h2>
      </Reveal>

      <motion.div variants={group} initial="hidden" whileInView="visible" viewport={viewport} className="grid gap-4 md:grid-cols-3">
        {PROBLEM.issues.map((issue) => (
          <motion.div variants={item} key={issue.num} className="flex flex-col gap-[10px] rounded-[18px] bg-white px-6 pb-6 pt-[22px]">
            <p className="text-[28px] font-semibold leading-none text-[#a8741f]" style={DISPLAY}>
              {issue.num}
            </p>
            <p className="text-[19px] font-semibold leading-[1.5] text-[#15201a]" style={DISPLAY}>
              {issue.title}
            </p>
            <p className="text-[14px] leading-[1.5] text-[#65756a]" style={BODY}>
              {issue.body}
            </p>
          </motion.div>
        ))}
      </motion.div>

      {/* The design question is the one place type itself moves: it breaks by
          its own rendered lines, so the reveal follows the actual wrap points
          at every width instead of a guessed break. */}
      <Reveal distance={24} className="mt-4 flex flex-col gap-[14px] rounded-[22px] bg-[#15201a] px-[30px] py-10 md:px-[44px]">
        <p className="text-[11px] font-bold uppercase leading-[1.5] tracking-[1.32px] text-[#d9a441]" style={BODY}>
          {PROBLEM.questionLabel}
        </p>
        <p className="text-[24px] font-medium leading-[1.3] text-[#f1ecdd] md:text-[34px]" style={BODY}>
          <LineByLine text={PROBLEM.questionPlain} />
          <LineByLine text={PROBLEM.questionAmber} className="text-[#d9a441]" delay={0.15} />
        </p>
      </Reveal>
    </section>
  );
}

/* ---------------------------------- pivot ---------------------------------- */

function Pivot() {
  const { group, item, viewport } = useStagger({ distance: 20, step: 0.09 });
  return (
    <section className={`${CONTENT} ${GUTTER} pt-24`}>
      <Reveal distance={16} className="pb-9">
        <p className="text-[11px] font-bold uppercase leading-[1.5] tracking-[1.32px] text-[#56705c]" style={BODY}>
          {PIVOT.eyebrow}
        </p>
        <h2 className="mt-[14px] max-w-[820px] text-[26px] font-semibold leading-[1.15] tracking-[-0.38px] text-[#15201a] md:text-[38px]" style={DISPLAY}>
          {PIVOT.heading}
        </h2>
      </Reveal>

      <motion.div variants={group} initial="hidden" whileInView="visible" viewport={viewport} className="grid gap-4 lg:grid-cols-2">
        {PIVOT.cards.map((card) =>
          card.rejected ? (
            <motion.div
              variants={item}
              key={card.title}
              className="flex flex-col gap-3 rounded-[20px] bg-white px-[30px] pb-[30px] pt-[28px]"
            >
              <p className="text-[11px] font-bold leading-[1.5] tracking-[1.1px] text-[#c77c6c]" style={BODY}>
                {card.label}
              </p>
              <p className="text-[22px] font-semibold leading-[1.5] text-[#15201a] line-through decoration-solid md:text-[26px]" style={DISPLAY}>
                {card.title}
              </p>
              <p className="text-[15px] leading-[1.55] text-[#65756a]" style={BODY}>
                {card.body}
              </p>
              <div className="w-full border-t border-[#e0dccf] pt-3">
                <p className="text-[15px] font-semibold leading-[1.5] text-[#15201a]" style={BODY}>
                  {card.note}
                </p>
              </div>
            </motion.div>
          ) : (
            <motion.div
              variants={item}
              key={card.title}
              className="flex flex-col gap-3 rounded-[20px] bg-[#56705c] px-[30px] pb-[30px] pt-[28px]"
            >
              <p className="text-[11px] font-bold leading-[1.5] tracking-[1.1px] text-[#d9a441]" style={BODY}>
                {card.label}
              </p>
              <p className="text-[22px] font-semibold leading-[1.5] text-white md:text-[26px]" style={DISPLAY}>
                {card.title}
              </p>
              <p className="text-[15px] leading-[1.55] text-[#e3e9e0]" style={BODY}>
                {card.body}
              </p>
              <div className="w-full border-t border-[#7a9180] pt-3">
                <p className="text-[15px] font-semibold leading-[1.5] text-white" style={BODY}>
                  {card.note}
                </p>
              </div>
            </motion.div>
          )
        )}
      </motion.div>
    </section>
  );
}

/* --------------------------------- personas -------------------------------- */

function Personas() {
  const { group, item, viewport } = useStagger({ distance: 18, step: 0.07 });
  return (
    <section className={`${CONTENT} ${GUTTER} pt-24`}>
      <Reveal distance={16} className="pb-9">
        <p className="text-[11px] font-bold uppercase leading-[1.5] tracking-[1.32px] text-[#56705c]" style={BODY}>
          {PERSONAS.eyebrow}
        </p>
        <h2 className="mt-[14px] max-w-[760px] text-[26px] font-semibold leading-[1.15] tracking-[-0.38px] text-[#15201a] md:text-[38px]" style={DISPLAY}>
          {PERSONAS.heading}
        </h2>
      </Reveal>

      <motion.div variants={group} initial="hidden" whileInView="visible" viewport={viewport} className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {PERSONAS.people.map((p) => (
          <motion.div
            variants={item}
            key={p.name}
            className={`flex flex-col gap-[10px] rounded-[18px] px-6 pb-6 pt-[22px] ${p.dark ? "bg-[#15201a]" : "bg-white"}`}
          >
            <div>
              <span
                className={`inline-flex items-start rounded-[999px] px-[10px] py-1 text-[10px] font-bold leading-[1.3] tracking-[0.8px] ${
                  p.dark ? "bg-[#d9a441] text-[#15201a]" : "bg-[#e7ece3] text-[#56705c]"
                }`}
                style={BODY}
              >
                {p.tag}
              </span>
            </div>
            <p className={`text-[26px] font-semibold leading-[1.5] ${p.dark ? "text-[#f1ecdd]" : "text-[#15201a]"}`} style={DISPLAY}>
              {p.name}
            </p>
            <p className={`text-[13px] leading-[1.5] ${p.dark ? "text-[#aeb9ae]" : "text-[#65756a]"}`} style={BODY}>
              {p.meta}
            </p>
            <p className={`text-[15px] font-medium leading-[1.5] ${p.dark ? "text-[#f1ecdd]" : "text-[#15201a]"}`} style={BODY}>
              {p.body}
            </p>
            <div className={`w-full border-t pt-[10px] ${p.dark ? "border-[#33443a]" : "border-[#e0dccf]"}`}>
              <p className={`text-[12px] leading-[1.5] ${p.dark ? "text-[#d9a441]" : "text-[#56705c]"}`} style={BODY}>
                {p.reliesOn}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <div className="mt-5 grid gap-4 md:grid-cols-3">
        {PERSONAS.people.map((p) => (
          <Figure key={p.figure} file={p.figure} src={asset(p.figure)} height="h-[160px] lg:h-[188px]" />
        ))}
      </div>
    </section>
  );
}

/* ------------------------------- competitive ------------------------------- */

function Competitive() {
  const { group, item, viewport } = useStagger({ distance: 18, step: 0.07 });
  return (
    <section className={`${CONTENT} ${GUTTER} pt-24`}>
      <Reveal distance={16} className="pb-9">
        <p className="text-[11px] font-bold uppercase leading-[1.5] tracking-[1.32px] text-[#56705c]" style={BODY}>
          {COMPETITIVE.eyebrow}
        </p>
        <h2 className="mt-[14px] max-w-[820px] text-[26px] font-semibold leading-[1.15] tracking-[-0.38px] text-[#15201a] md:text-[38px]" style={DISPLAY}>
          {COMPETITIVE.heading}
        </h2>
      </Reveal>

      <motion.div variants={group} initial="hidden" whileInView="visible" viewport={viewport} className="grid gap-4 md:grid-cols-3">
        {COMPETITIVE.categories.map((c) => (
          <motion.div variants={item} key={c.title} className="flex flex-col gap-2 rounded-[18px] bg-white px-6 pb-6 pt-[22px]">
            <p className="text-[19px] font-semibold leading-[1.5] text-[#15201a]" style={DISPLAY}>
              {c.title}
            </p>
            <p className="text-[12px] font-semibold leading-[1.5] text-[#56705c]" style={BODY}>
              {c.apps}
            </p>
            <p className="text-[14px] leading-[1.5] text-[#65756a]" style={BODY}>
              {c.body}
            </p>
          </motion.div>
        ))}
      </motion.div>

      <div className="mt-4 flex flex-col gap-3 rounded-[18px] border-l-4 border-[#d9a441] bg-[#fbf1dc] px-[30px] pb-[26px] pt-6 md:flex-row md:items-center md:gap-5">
        <p className="shrink-0 text-[11px] font-bold uppercase leading-[1.5] tracking-[1.32px] text-[#a8741f]" style={BODY}>
          {COMPETITIVE.gapLabel}
        </p>
        <p className="text-[17px] font-medium leading-[1.45] text-[#15201a] md:text-[19px]" style={BODY}>
          {COMPETITIVE.gap}
        </p>
      </div>
    </section>
  );
}

/* -------------------------------- features --------------------------------- */

function Features() {
  const { group, item, viewport } = useStagger({ distance: 14, step: 0.05 });
  return (
    <section className={`${CONTENT} ${GUTTER} pt-24`}>
      <Reveal distance={16} className="pb-9">
        <p className="text-[11px] font-bold uppercase leading-[1.5] tracking-[1.32px] text-[#56705c]" style={BODY}>
          {FEATURES.eyebrow}
        </p>
        <h2 className="mt-[14px] max-w-[760px] text-[26px] font-semibold leading-[1.15] tracking-[-0.38px] text-[#15201a] md:text-[38px]" style={DISPLAY}>
          {FEATURES.heading}
        </h2>
      </Reveal>

      <motion.div variants={group} initial="hidden" whileInView="visible" viewport={viewport} className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
        {FEATURES.items.map((f) => (
          <motion.div
            variants={item}
            key={f.num}
            className={`flex flex-col gap-2 rounded-[16px] px-5 pb-[22px] pt-5 ${f.lead ? "bg-[#15201a]" : "bg-white"}`}
          >
            <p className={`text-[13px] font-bold leading-[1.5] ${f.lead ? "text-[#d9a441]" : "text-[#56705c]"}`} style={BODY}>
              {f.num}
            </p>
            <p className={`text-[17px] font-semibold leading-[1.25] ${f.lead ? "text-[#f1ecdd]" : "text-[#15201a]"}`} style={DISPLAY}>
              {f.title}
            </p>
            <p className={`text-[13px] leading-[1.5] ${f.lead ? "text-[#aeb9ae]" : "text-[#65756a]"}`} style={BODY}>
              {f.body}
            </p>
          </motion.div>
        ))}
      </motion.div>

      <p className="mt-3 text-[13px] leading-[1.5] text-[#65756a]" style={BODY}>
        {FEATURES.note}
      </p>
    </section>
  );
}

/* --------------------------------- fidelity --------------------------------- */

function Fidelity() {
  return (
    <section className={`${CONTENT} ${GUTTER} pt-24`}>
      <Reveal distance={16} className="flex flex-wrap items-end justify-between gap-6 pb-9">
        <div className="max-w-[620px]">
          <p className="text-[11px] font-bold uppercase leading-[1.5] tracking-[1.32px] text-[#56705c]" style={BODY}>
            {FIDELITY.eyebrow}
          </p>
          <h2 className="mt-[14px] text-[26px] font-semibold leading-[1.15] tracking-[-0.38px] text-[#15201a] md:text-[38px]" style={DISPLAY}>
            {FIDELITY.heading}
          </h2>
        </div>
        <p className="max-w-[340px] text-right text-[14px] leading-[1.5] text-[#65756a]" style={BODY}>
          {FIDELITY.note}
        </p>
      </Reveal>

      {FIDELITY.passes.map((pass, index) => (
        <div key={pass.figure} className={index > 0 ? "mt-5" : undefined}>
          <Reveal distance={20}>
            <figure className="flex w-full flex-col gap-2">
              <div className="flex h-[220px] w-full items-center justify-center overflow-hidden rounded-[14px] bg-[#e6e2d6] lg:h-[280px]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={asset(pass.figure)}
                  alt={pass.caption}
                  loading="lazy"
                  draggable={false}
                  className="h-full w-full object-cover"
                />
              </div>
              <figcaption className="text-[13px] leading-[1.5] text-[#65756a]" style={BODY}>
                {pass.caption}
              </figcaption>
            </figure>
          </Reveal>
        </div>
      ))}
    </section>
  );
}

/* -------------------------------- prototype --------------------------------- */

function Prototype() {
  const { group, item, viewport } = useStagger({ distance: 18, step: 0.06 });
  return (
    <section id="prototype" className="w-full pt-[76px]">
      <div className="w-full bg-[#15201a]">
        <div className={`${CONTENT} ${GUTTER} py-24`}>
          <div className="flex flex-wrap items-end justify-between gap-6 pb-9">
            <div className="max-w-[600px]">
              <p className="text-[11px] font-bold uppercase leading-[1.5] tracking-[1.32px] text-[#d9a441]" style={BODY}>
                {PROTOTYPE.eyebrow}
              </p>
              <h2 className="mt-[14px] text-[26px] font-semibold leading-[1.15] tracking-[-0.38px] text-[#f1ecdd] md:text-[38px]" style={DISPLAY}>
                {PROTOTYPE.heading}
              </h2>
            </div>
            <p className="max-w-[340px] text-right text-[14px] leading-[1.5] text-[#aeb9ae]" style={BODY}>
              {PROTOTYPE.note}
            </p>
          </div>

          <motion.div variants={group} initial="hidden" whileInView="visible" viewport={viewport} className="grid grid-cols-2 gap-x-4 gap-y-[24px] pb-6 md:grid-cols-4">
            {PROTOTYPE.screens.map((screen) => (
              <Figure
                key={screen.figure}
                file={screen.figure}
                src={asset(screen.figure)}
                caption={screen.caption}
                height="h-[280px] sm:h-[380px] lg:h-[528px]"
                tone="dark"
                variants={item}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------- AI in my process --------------------------- */

function AiProcess() {
  const { group, item, viewport } = useStagger({ distance: 18, step: 0.09 });
  return (
    <section className={`${CONTENT} ${GUTTER} pt-24`}>
      <Reveal distance={16} className="pb-9">
        <p className="text-[11px] font-bold uppercase leading-[1.5] tracking-[1.32px] text-[#56705c]" style={BODY}>
          {AI_PROCESS.eyebrow}
        </p>
        <h2 className="mt-[14px] max-w-[820px] text-[26px] font-semibold leading-[1.15] tracking-[-0.38px] text-[#15201a] md:text-[38px]" style={DISPLAY}>
          {AI_PROCESS.heading}
        </h2>
      </Reveal>

      <motion.div variants={group} initial="hidden" whileInView="visible" viewport={viewport} className="grid gap-4 lg:grid-cols-2">
        <motion.div variants={item} className="flex flex-col gap-[10px] rounded-[18px] bg-white px-[28px] pb-[26px] pt-6">
          <p className="text-[11px] font-bold leading-[1.5] tracking-[1.1px] text-[#65756a]" style={BODY}>
            {AI_PROCESS.gaveMe.label}
          </p>
          <p className="text-[16px] leading-[1.55] text-[#15201a]" style={BODY}>
            {AI_PROCESS.gaveMe.body}
          </p>
        </motion.div>
        <motion.div variants={item} className="flex flex-col gap-[10px] rounded-[18px] bg-[#56705c] px-[28px] pb-[26px] pt-[24px]">
          <p className="text-[11px] font-bold leading-[1.5] tracking-[1.1px] text-[#d9a441]" style={BODY}>
            {AI_PROCESS.filledIn.label}
          </p>
          <p className="text-[16px] leading-[1.55] text-white" style={BODY}>
            {AI_PROCESS.filledIn.body}
          </p>
        </motion.div>
      </motion.div>

      <Reveal distance={14} className="mt-[14px]">
        {/* Styled on a wrapper so the JSX stays valid while LineByLine does
            the line-splitting inside its own block elements. */}
        <p className="max-w-[1036px] text-[18px] font-medium leading-[1.4] text-[#56705c] md:text-[20px]">
          <LineByLine text={AI_PROCESS.quote} />
        </p>
      </Reveal>
    </section>
  );
}

/* -------------------------------- reflection -------------------------------- */

function Reflection() {
  const { group, item, viewport } = useStagger({ distance: 18, step: 0.07 });
  return (
    <section className={`${CONTENT} ${GUTTER} pt-24`}>
      <Reveal distance={16} className="pb-9">
        <p className="text-[11px] font-bold uppercase leading-[1.5] tracking-[1.32px] text-[#56705c]" style={BODY}>
          {REFLECTION.eyebrow}
        </p>
        <h2 className="mt-[14px] max-w-[760px] text-[26px] font-semibold leading-[1.15] tracking-[-0.38px] text-[#15201a] md:text-[38px]" style={DISPLAY}>
          {REFLECTION.heading}
        </h2>
      </Reveal>

      <motion.div variants={group} initial="hidden" whileInView="visible" viewport={viewport} className="grid gap-4 lg:grid-cols-2">
        <motion.div variants={item} className="flex flex-col gap-3 rounded-[18px] bg-white px-[26px] pb-[26px] pt-6">
          <p className="text-[11px] font-bold leading-[1.5] tracking-[1.1px] text-[#56705c]" style={BODY}>
            WHAT I CARRY FORWARD
          </p>
          {REFLECTION.carryForward.map((item_) => (
            <div key={item_.slice(0, 24)} className="flex items-start gap-[10px]">
              <Icon name="icon-check" size={18} />
              <p className="text-[14px] leading-[1.5] text-[#15201a]" style={BODY}>
                {item_}
              </p>
            </div>
          ))}
        </motion.div>

        <motion.div variants={item} className="flex flex-col gap-3 rounded-[18px] bg-white px-[26px] pb-[26px] pt-6">
          <p className="text-[11px] font-bold leading-[1.5] tracking-[1.1px] text-[#a8741f]" style={BODY}>
            WHAT I’D VALIDATE NEXT
          </p>
          {REFLECTION.validateNext.map((v) => (
            <div key={v.slice(0, 24)} className="flex items-start gap-[10px]">
              <Icon name="icon-q" size={18} />
              <p className="text-[14px] leading-[1.5] text-[#15201a]" style={BODY}>
                {v}
              </p>
            </div>
          ))}
        </motion.div>
      </motion.div>

      <Reveal distance={0} className="pt-[22px]">
        <p className="max-w-[1036px] text-[12px] leading-[1.5] text-[#65756a]" style={BODY}>
          {REFLECTION.note}
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
        <p className="text-[12px] tracking-[1.2px] text-[#65756a]" style={BODY}>
          {MORE_PROJECTS.label}
        </p>
        <Link
          href="/projects"
          className="case-link border-b-[1.5px] border-[#15201a] pb-[2px] text-[14px] font-semibold leading-[1.5] text-[#15201a]"
          style={BODY}
        >
          {MORE_PROJECTS.allWork}
        </Link>
      </div>

      <motion.div variants={group} initial="hidden" whileInView="visible" viewport={viewport} className="grid gap-[18px] md:grid-cols-2">
        {MORE_PROJECTS.cards.map((c) => (
          <motion.div variants={item} key={c.href} className="h-full">
            <Link href={c.href} className="case-card group flex h-full w-full items-center gap-5 rounded-[18px] bg-white p-[14px]">
              <div
                className="relative flex h-[110px] w-[150px] shrink-0 items-end overflow-hidden rounded-[12px] pb-[8px] pl-[8px]"
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
                  // The Figma's placeholder frame: amber label on the tint.
                  <span
                    aria-hidden
                    className="text-[11px] leading-[1.5] text-[#e3a13a]"
                    style={BODY}
                  >
                    [Thumbnail]
                  </span>
                )}
              </div>
              <div className="flex flex-col gap-1">
                <p className="text-[12px] leading-[1.5] text-[#65756a]" style={BODY}>
                  {c.kicker}
                </p>
                <p className="text-[22px] font-semibold leading-[1.2] text-[#15201a]" style={DISPLAY}>
                  {c.title}
                </p>
                <p className="max-w-[300px] text-[14px] leading-[1.5] text-[#65756a]" style={BODY}>
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
    <footer id="contact" className="w-full bg-[#15201a]">
      <div className={`${CONTENT} ${GUTTER} flex flex-col gap-8 pb-16 pt-14 md:flex-row md:items-center md:justify-between`}>
        <div className="flex flex-col gap-2">
          <p className="text-[32px] font-semibold leading-[1.15] text-[#f1ecdd]" style={DISPLAY}>
            Let&apos;s talk.
</p>
          <a
            href="mailto:nmayacharya@gmail.com"
            className="case-link border-b border-[#33443a] pb-[2px] text-[16px] leading-[1.5] text-[#c4ccc1]"
            style={BODY}
          >
            nmayacharya@gmail.com
          </a>
        </div>
        <nav aria-label="Footer" className="flex flex-wrap gap-[26px] text-[14px] leading-[1.5] text-[#f1ecdd]" style={BODY}>
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

export default function FocusCase() {
  return (
    <main style={{ background: PAPER }}>
      <Nav />
      <Hero />
      <Facts />
      <Moment />
      <Problem />
      <Pivot />
      <Personas />
      <Competitive />
      <Features />
      <Fidelity />
      <Prototype />
      <AiProcess />
      <Reflection />
      <MoreProjects />
      <Footer />
    </main>
  );
}
