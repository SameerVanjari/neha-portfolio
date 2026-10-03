"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import {
  CLOSING,
  FACTS,
  FLOW,
  GOALS,
  HERO,
  HOOD,
  IA,
  ITERATIONS,
  NEIGHBORS,
  NOTES,
  PROBLEM,
  SYSTEM,
} from "@/data/research";
import { FOOTER_LINKS } from "@/data/landing";
import { EASE_OUT, LineByLine, Reveal, useStagger, useMotionPref } from "@/components/motion/reveal";
import { useLoadStage } from "@/components/LoadStage";
import { caseStudyThumb } from "@/data/case-studies";

const DARK = "#0B1733";
const FAINT_DARK = "#071128";
const BLUE = "#0055FF";
const PALE = "#82B9FF";
const TILE = "#E6EFFF";
const PAPER = "#F4F7FC";
const INK = "#14203A";
const MUTED = "#5A6780";
const HAIR = "#1A2A52";
const PIPE = "#13234A";
const SUN = "#FFD233";

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
          style={{ ...BODY, color: dark ? PALE : BLUE }}
        >
          {eyebrow}
        </p>
        <h2
          className="mt-[14px] text-[30px] leading-[1.15] tracking-[-0.38px] md:text-[38px]"
          style={{ ...DISPLAY, color: dark ? "#F1F7FF" : INK }}
        >
          {heading}
        </h2>
      </motion.div>
      {note && (
        <motion.p
          variants={item}
          className="max-w-[340px] text-right text-[14px] leading-[1.5]"
          style={{ ...BODY, color: dark ? "#AFBDD6" : MUTED }}
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
      src={`/case/research/${name}.svg`}
      width={size}
      height={size}
      alt=""
      aria-hidden
      draggable={false}
      className={`select-none ${className}`}
    />
  );
}

function Shot({
  src,
  alt,
  className = "",
  loading = "lazy",
}: {
  src: string;
  alt: string;
  className?: string;
  /** Above-the-fold media opts out of lazy loading so it can be the LCP. */
  loading?: "eager" | "lazy";
}) {
  return (
    <div className={`overflow-hidden ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt} className="h-full w-full object-cover" loading={loading} draggable={false} />
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
          <Link href="/projects" className="border-b border-[#14203A] pb-[3px] text-[14px]" style={{ color: INK }}>
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
        className="pointer-events-none absolute right-[-60px] top-[-30px] size-[760px] rounded-full opacity-70"
        style={{
          background:
            "radial-gradient(circle, rgba(0,85,255,0.5) 0%, rgba(0,85,255,0.16) 38%, rgba(11,23,51,0) 70%)",
        }}
      />
      <motion.div
        variants={group}
        initial="hidden"
        animate={stage === "loading" ? "hidden" : "visible"}
        className="relative mx-auto grid w-full max-w-[1036px] items-center gap-10 px-6 py-[70px] lg:grid-cols-[520px_1fr] lg:px-0 lg:py-[120px]"
      >
        <div className="max-w-[520px]">
          <motion.div variants={item}>
          <p className="text-[13px] font-semibold" style={{ ...BODY, color: PALE }}>
            <span className="text-white">{HERO.eyebrowLead}</span>
            {HERO.eyebrowRest}
          </p>
          <h1
            className="mt-[18px] text-[clamp(40px,5vw,58px)] font-semibold leading-[1.04] tracking-[-0.02em] text-[#F1F7FF]"
            style={DISPLAY}
          >
            {HERO.title}
          </h1>
          <p className="mt-[18px] max-w-[500px] text-[19px] leading-[1.5] text-[#C3D2EC]" style={BODY}>
            {HERO.subtitle}
          </p>
          </motion.div>
          <motion.div variants={item} className="mt-[36px] border-l-[3px] pl-4" style={{ borderColor: SUN }}>
            <p className="text-[16px] text-[#C3D2EC]" style={BODY}>
              <span className="font-semibold text-[#F1F7FF]">{HERO.role}</span>
              {HERO.roleOrg}
            </p>
            <p className="mt-[2px] text-[14px] text-[#8C9BB8]" style={BODY}>
              {HERO.roleNote}
            </p>
          </motion.div>
          <motion.a
            variants={item}
            href="#final"
            className="mt-[36px] inline-flex h-[46px] items-center rounded-[999px] px-[22px] text-[15px] font-semibold transition-[transform,opacity] duration-150 motion-safe:hover:-translate-y-[1px] motion-safe:active:scale-[0.98] motion-safe:hover:opacity-90"
            style={{ ...BODY, background: SUN, color: INK }}
          >
            {HERO.cta}
          </motion.a>
        </div>
        <motion.div
          variants={item}
          className="overflow-hidden rounded-[14px] bg-white shadow-[0px_24px_50px_0px_rgba(0,0,0,0.45)]"
        >
          <div className="flex items-center gap-[7px] bg-[#E9EEF6] py-[11px] pl-[14px]" aria-hidden>
            <span className="size-[11px] rounded-full bg-[#FF5F57]" />
            <span className="size-[11px] rounded-full bg-[#FEBC2E]" />
            <span className="size-[11px] rounded-full bg-[#28C840]" />
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={HERO.browser.src} alt={HERO.browser.alt} className="aspect-[640/306] w-full object-cover object-top" loading="eager" draggable={false} />
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
                <p className="text-[11px] tracking-[0.44px] text-[#8C9BB8]" style={BODY}>
                  {fact.label}
                </p>
                <p className="mt-[2px] text-[15px] font-semibold leading-[1.5] text-[#F1F7FF]" style={BODY}>
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

  return (
    <section className="mx-auto w-full max-w-[1036px] px-6 pt-[96px] lg:px-0">
      <SectionHead eyebrow={PROBLEM.eyebrow} heading={PROBLEM.heading} />
      <div className="grid items-start gap-4 lg:grid-cols-[420px_1fr]">
        <Reveal distance={20}>
          <article className="rounded-[18px] p-[30px]" style={{ background: BLUE }}>
          <p className="text-[11px] font-bold tracking-[1.1px]" style={{ ...BODY, color: SUN }}>
            {PROBLEM.quoteLabel}
          </p>
            <p className="mt-[14px] text-[22px] font-medium leading-[1.4] text-white" style={BODY}>
              {PROBLEM.quote}
            </p>
          </article>
        </Reveal>
        <motion.div
          variants={group}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="flex flex-col gap-3"
        >
          {PROBLEM.pains.map((pain) => (
            <motion.article
              key={pain.title}
              variants={item}
              className="flex items-center gap-4 rounded-[16px] bg-white px-5 py-[18px]"
            >
              <span className="flex h-[46px] w-[46px] shrink-0 items-center justify-center rounded-[12px]" style={{ background: TILE }}>
                <Icon name={pain.icon} size={20} />
              </span>
              <div>
                <p className="text-[17px] font-semibold" style={{ ...BODY, color: INK }}>
                  {pain.title}
                </p>
                <p className="mt-[2px] text-[14px] leading-[1.5]" style={{ ...BODY, color: MUTED }}>
                  {pain.body}
                </p>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function Goals() {
  const { group, item, viewport } = useStagger({ distance: 16, step: 0.05 });
  const users = useStagger({ distance: 12, step: 0.04 });

  return (
    <section className="mx-auto w-full max-w-[1036px] px-6 pt-[96px] lg:px-0">
      <SectionHead eyebrow={GOALS.eyebrow} heading={GOALS.heading} />
      <motion.div
        variants={group}
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5"
      >
        {GOALS.cards.map((card) => (
          <motion.article
            key={card.title}
            variants={item}
            className="rounded-[16px] px-[18px] pb-[22px] pt-5"
            style={{ background: card.hot ? SUN : "#FFFFFF" }}
          >
            <Icon name={card.icon} size={24} />
            <p className="mt-2 text-[17px] font-semibold" style={{ ...BODY, color: INK }}>
              {card.title}
            </p>
            <p className="mt-1 text-[13px] leading-[1.5]" style={{ ...BODY, color: card.hot ? INK : MUTED }}>
              {card.body}
            </p>
          </motion.article>
        ))}
      </motion.div>
      <p className="mt-5 text-[11px] font-bold uppercase tracking-[1.32px]" style={{ ...BODY, color: BLUE }}>
        {GOALS.usersLabel}
      </p>
      <motion.div
        variants={users.group}
        initial="hidden"
        whileInView="visible"
        viewport={users.viewport}
        className="mt-3 flex flex-wrap gap-3"
      >
        {GOALS.users.map((user) => (
          <motion.span
            key={user}
            variants={users.item}
            className="inline-flex items-center gap-[10px] rounded-full py-[10px] pl-4 pr-[18px] text-[14px] font-semibold"
            style={{ ...BODY, background: TILE, color: BLUE }}
          >
            <Icon name="icon-users-sm" size={18} />
            {user}
          </motion.span>
        ))}
      </motion.div>
    </section>
  );
}

function Flow() {
  // One step per beat, in order — the flow is a sequence, so the motion says
  // so before the copy does.
  const { group, item, viewport } = useStagger({ distance: 16, step: 0.07 });

  return (
    <section className="mx-auto w-full max-w-[1036px] px-6 pt-[96px] lg:px-0">
      <SectionHead eyebrow={FLOW.eyebrow} heading={FLOW.heading} />
      <motion.ol
        variants={group}
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4"
      >
        {FLOW.steps.map((step, i) => (
          <motion.li
            key={step.num}
            variants={item}
            className="rounded-[14px] bg-white px-[18px] pb-[18px] pt-4"
            style={{ borderTop: `3px solid ${"last" in step ? SUN : BLUE}` }}
          >
            <p className="text-[20px] font-bold leading-[1.1]" style={{ ...DISPLAY, color: BLUE }}>
              {String(i + 1).padStart(2, "0")}
            </p>
            <p className="mt-1 text-[15px] font-semibold" style={{ ...BODY, color: INK }}>
              {step.title}
            </p>
            <p className="mt-1 text-[13px] leading-[1.5]" style={{ ...BODY, color: MUTED }}>
              {step.body}
            </p>
          </motion.li>
        ))}
      </motion.ol>
    </section>
  );
}

function IAFrames() {
  // Each frame-plus-caption arrives as one unit, so the shot and its label
  // never separate mid-entrance.
  const { group, item, viewport } = useStagger({ distance: 20, step: 0.08 });

  return (
    <section className="mx-auto w-full max-w-[1036px] px-6 pt-[96px] lg:px-0">
      <SectionHead eyebrow={IA.eyebrow} heading={IA.heading} note={IA.note} />
      <motion.div
        variants={group}
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        className="grid gap-4 md:grid-cols-2"
      >
        {IA.frames.map((frame) => (
          <motion.figure key={frame.note} variants={item}>
            <Shot src={frame.src} alt={frame.alt} className="aspect-[510/550] rounded-[14px]" />
            <figcaption className="mt-[10px] text-[13px] leading-[1.5]" style={{ ...BODY, color: MUTED }}>
              {frame.caption}
            </figcaption>
          </motion.figure>
        ))}
      </motion.div>
    </section>
  );
}

function DesignSystem() {
  const palette = useStagger({ distance: 14, step: 0.04 });
  const type = useStagger({ distance: 16, step: 0.07 });

  return (
    <section className="mx-auto w-full max-w-[1036px] px-6 pt-[96px] lg:px-0">
      <SectionHead eyebrow={SYSTEM.eyebrow} heading={SYSTEM.heading} />
      <motion.div
        variants={palette.group}
        initial="hidden"
        whileInView="visible"
        viewport={palette.viewport}
        className="grid grid-cols-4 gap-[10px] sm:grid-cols-8"
      >
        {SYSTEM.palette.map((swatch) => (
          <motion.div key={swatch.hex} variants={palette.item}>
            <div
              className="h-[96px] w-full rounded-[12px] border border-[#DDE5F2]"
              style={{ background: swatch.hex }}
            />
            <p className="mt-[6px] text-[12px] font-semibold" style={{ ...BODY, color: INK }}>
              {swatch.name}
            </p>
            <p className="text-[11px]" style={{ ...BODY, color: MUTED }}>
              {swatch.hex}
            </p>
          </motion.div>
        ))}
      </motion.div>
      <motion.div
        variants={type.group}
        initial="hidden"
        whileInView="visible"
        viewport={type.viewport}
        className="mt-5 grid gap-4 md:grid-cols-2"
      >
        {SYSTEM.type.map((face) => (
          <motion.div
            key={face.face}
            variants={type.item}
            className="rounded-[18px] bg-white p-[26px]"
          >
            <p className="text-[56px] font-semibold leading-none" style={{ ...DISPLAY, color: INK }} aria-hidden>
              Aa
            </p>
            <p className="mt-3 text-[22px] font-semibold" style={{ ...DISPLAY, color: INK }}>
              {face.face}
            </p>
            <p className="mt-1 text-[13px]" style={{ ...BODY, color: MUTED }}>
              {face.weights}
            </p>
            <p className="mt-2 text-[14px] leading-[1.5]" style={{ ...BODY, color: MUTED }}>
              {face.body}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

function UnderHood() {
  // The pipeline reads left to right, so the stages arrive in order with the
  // arrows between them.
  const pipeline = useStagger({ distance: 14, step: 0.06 });
  const models = useStagger({ distance: 20, step: 0.08 });
  const data = useStagger({ distance: 18, step: 0.06 });

  return (
    <section className="mt-[96px]" style={{ background: DARK }}>
      <div className="mx-auto w-full max-w-[1036px] px-6 py-[96px] lg:px-0">
        <SectionHead eyebrow={HOOD.eyebrow} heading={HOOD.heading} note={HOOD.note} dark />
        <motion.div
          variants={pipeline.group}
          initial="hidden"
          whileInView="visible"
          viewport={pipeline.viewport}
          className="flex flex-col items-stretch gap-[6px] lg:flex-row lg:items-center"
        >
          {HOOD.pipeline.map((item, i) =>
            "arrow" in item ? (
              <Reveal
                key={`arrow-${i}`}
                distance={10}
                className="hidden h-6 w-6 shrink-0 items-center justify-center lg:flex"
              >
                <Icon name="icon-arrow" size={18} />
              </Reveal>
            ) : (
              <motion.article
                key={item.num}
                variants={pipeline.item}
                className="min-w-0 rounded-[14px] px-[14px] py-4 lg:flex-1"
                style={{ background: "hot" in item && item.hot ? BLUE : PIPE }}
              >
                <p className="text-[12px] font-bold" style={{ ...BODY, color: SUN }}>
                  {item.num}
                </p>
                <p className="mt-1 text-[14px] font-semibold leading-[1.4] text-[#F1F7FF]" style={BODY}>
                  {item.title}
                </p>
              </motion.article>
            ),
          )}
        </motion.div>
        <motion.div
          variants={models.group}
          initial="hidden"
          whileInView="visible"
          viewport={models.viewport}
          className="mt-7 grid gap-4 md:grid-cols-2"
        >
          {HOOD.models.map((model) => (
            <motion.figure key={model.note} variants={models.item}>
              <Shot src={model.src} alt={model.alt} className="aspect-[510/290] rounded-[14px]" />
            <figcaption className="mt-[10px] text-[13px] leading-[1.5] text-[#AFBDD6]" style={BODY}>
              {model.caption}
            </figcaption>
          </motion.figure>
        ))}
        </motion.div>
        <motion.div
          variants={data.group}
          initial="hidden"
          whileInView="visible"
          viewport={data.viewport}
          className="mt-5 grid gap-4 sm:grid-cols-3"
        >
          {HOOD.data.map((shot) => (
            <motion.figure key={shot.note} variants={data.item}>
              <Shot src={shot.src} alt={shot.alt} className="aspect-[335/220] rounded-[14px]" />
            <figcaption className="mt-[10px] text-[13px] leading-[1.5] text-[#AFBDD6]" style={BODY}>
              {shot.caption}
            </figcaption>
          </motion.figure>
        ))}
        </motion.div>
      </div>
    </section>
  );
}

function Notes() {
  const { group, item, viewport } = useStagger({ distance: 18, step: 0.07 });

  return (
    <section className="mx-auto w-full max-w-[1036px] px-6 pt-[96px] lg:px-0">
      <SectionHead eyebrow={NOTES.eyebrow} heading={NOTES.heading} note={NOTES.note} />
      <motion.div
        variants={group}
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        className="grid gap-4 md:grid-cols-3"
      >
        {NOTES.frames.map((frame) => (
          <motion.figure key={frame.note} variants={item}>
            <Shot src={frame.src} alt={frame.alt} className="aspect-[335/200] rounded-[14px]" />
            <figcaption className="mt-[10px] text-[13px] leading-[1.5]" style={{ ...BODY, color: MUTED }}>
              {frame.caption}
            </figcaption>
          </motion.figure>
        ))}
      </motion.div>
    </section>
  );
}

function Iterations() {
  // Five passes in order, then the final screen on its own — the progression
  // is the point of the section.
  const steps = useStagger({ distance: 16, step: 0.05 });

  return (
    <section id="final" className="mx-auto w-full max-w-[1036px] scroll-mt-6 px-6 pt-[96px] lg:px-0">
      <SectionHead eyebrow={ITERATIONS.eyebrow} heading={ITERATIONS.heading} />
      <motion.ol
        variants={steps.group}
        initial="hidden"
        whileInView="visible"
        viewport={steps.viewport}
        className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5"
      >
        {ITERATIONS.steps.map((step, i) => (
          <motion.li key={step.note} variants={steps.item}>
            <Shot src={step.src} alt={step.alt} className="aspect-[198/95] rounded-[10px] border border-[#DDE5F2]" />
            <p className="mt-2 flex items-start gap-[6px]">
              <span className="text-[12px] font-bold" style={{ ...BODY, color: BLUE }}>
                {i + 1}
              </span>
              <span className="text-[13px] font-medium leading-[1.5]" style={{ ...BODY, color: INK }}>
                {step.caption}
              </span>
            </p>
          </motion.li>
        ))}
      </motion.ol>
      <Reveal className="mt-6 pt-6" distance={22}>
        <figure>
          <Shot
            src={ITERATIONS.final.src}
            alt={ITERATIONS.final.alt}
            className="aspect-[1036/491] w-full rounded-[16px] border border-[#DDE5F2]"
          />
          <figcaption className="mt-[10px] text-[13px] leading-[1.5]" style={{ ...BODY, color: MUTED }}>
            {ITERATIONS.final.caption}
          </figcaption>
        </figure>
      </Reveal>
    </section>
  );
}

function Closing() {
  return (
    <section className="mx-auto w-full max-w-[1036px] px-6 pt-[96px] lg:px-0">
      <Reveal distance={20}>
        <blockquote className="rounded-[18px] bg-white px-10 py-9">
          {/* LineByLine renders spans, so the blockquote stays as the
              semantic wrapper around it. */}
          <div className="max-w-[956px] text-[24px] font-medium leading-[1.4] md:text-[28px]" style={{ ...DISPLAY, color: INK }}>
            <LineByLine text={`“${CLOSING.statement}”`} delay={0.1} />
          </div>
          <div className="mt-6 flex flex-wrap gap-2">
            {CLOSING.stack.map((tool) => (
              <span
                key={tool}
                className="inline-flex h-7 items-center rounded-full bg-[#E9EEF6] px-3 text-[12px] font-medium"
                style={{ ...BODY, color: INK }}
              >
                {tool}
              </span>
            ))}
          </div>
        </blockquote>
      </Reveal>
      <p className="mt-[22px] text-[12px] leading-[1.5]" style={{ ...BODY, color: MUTED }}>
        {CLOSING.credit}
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
    <footer style={{ background: DARK }}>
      {/* One quiet rise for the whole row — a footer is a sign-off, not a
          section, and per-link entrances would overplay it. */}
      <Reveal distance={16}>
        <div className="mx-auto flex w-full max-w-[1036px] flex-wrap items-center justify-between gap-6 px-6 py-14 lg:px-0">
          <div>
            <p className="text-[32px] font-semibold text-[#F1F7FF]" style={DISPLAY}>
              Let&apos;s talk.
            </p>
            <a
              href="mailto:nmayacharya@gmail.com"
              className="mt-[10px] inline-block border-b border-[#3A5552] pb-[2px] text-[16px] text-[#C3D2EC] transition-opacity duration-200 hover:opacity-80"
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
                className="text-[14px] text-[#F1F7FF] transition-opacity duration-200 hover:opacity-80"
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

export default function ResearchCase() {
  return (
    <main style={{ background: PAPER }}>
      <Nav />
      <Hero />
      <Facts />
      <Problem />
      <Goals />
      <Flow />
      <IAFrames />
      <DesignSystem />
      <UnderHood />
      <Notes />
      <Iterations />
      <Closing />
      <MoreProjects />
      <Footer />
    </main>
  );
}
