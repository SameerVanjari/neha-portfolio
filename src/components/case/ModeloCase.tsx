"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import {
  BACKGROUND,
  DEPTH,
  FACTS,
  GAMEPLAY,
  HERO,
  NEIGHBORS,
  PIXEL,
  RESULTS,
  ROLE,
  SWEEPSTAKES,
} from "@/data/modelo";
import { FOOTER_LINKS } from "@/data/landing";
import { EASE_OUT, Reveal, useMotionPref, useStagger } from "@/components/motion/reveal";
import { useLoadStage } from "@/components/LoadStage";
import { caseStudyThumb } from "@/data/case-studies";

const DARK = "#0D1B2A";
const FAINT_DARK = "#08131E";
const TEAL = "#1E6B87";
const ICE = "#99D9D9";
const TILE = "#E0F2F2";
const PAPER = "#F3F7F7";
const INK = "#0F1B26";
const MUTED = "#566874";
const HAIR = "#1B2D40";
const NOTE_CARD = "#16283A";

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
      <motion.div variants={item} className="max-w-[620px]">
        <p
          className="text-[11px] font-bold uppercase tracking-[1.32px]"
          style={{ ...BODY, color: dark ? ICE : TEAL }}
        >
          {eyebrow}
        </p>
        <h2
          className="mt-[14px] text-[30px] leading-[1.15] tracking-[-0.38px] md:text-[38px]"
          style={{ ...DISPLAY, color: dark ? "#EEF6F7" : INK }}
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
      src={`/case/modelo/${name}.svg`}
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
  imgClass = "object-cover",
  loading = "lazy",
}: {
  src: string;
  alt: string;
  className?: string;
  imgClass?: string;
  /** Above-the-fold media opts out of lazy loading so it can be the LCP. */
  loading?: "eager" | "lazy";
}) {
  return (
    <div className={`overflow-hidden ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt} className={`h-full w-full ${imgClass}`} loading={loading} draggable={false} />
    </div>
  );
}

function NumNotes({
  notes,
  dark,
}: {
  notes: readonly { num: string; title: string; body: string }[];
  dark?: boolean;
}) {
  // Shared by the gameplay and sweepstakes sections: the numbered notes arrive
  // in order wherever the helper is used.
  const { group, item, viewport } = useStagger({ distance: 14, step: 0.06 });

  return (
    <motion.div
      variants={group}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      className="flex flex-col gap-3"
    >
      {notes.map((note) => (
        <motion.article
          key={note.title}
          variants={item}
          className="flex items-start gap-[14px] rounded-[14px] px-[18px] py-4"
          style={{ background: dark ? NOTE_CARD : "#FFFFFF" }}
        >
          <span
            className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[13px] font-bold text-white"
            style={{ ...BODY, background: TEAL }}
          >
            {note.num}
          </span>
          <div>
            <p className="text-[16px] font-semibold" style={{ ...BODY, color: dark ? "#EEF6F7" : INK }}>
              {note.title}
            </p>
            <p
              className="mt-[2px] text-[14px] leading-[1.5]"
              style={{ ...BODY, color: dark ? "#B0C3CC" : MUTED }}
            >
              {note.body}
            </p>
          </div>
        </motion.article>
      ))}
    </motion.div>
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
          <Link href="/projects" className="border-b border-[#0F1B26] pb-[3px] text-[14px]" style={{ color: INK }}>
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
        className="pointer-events-none absolute right-[-60px] top-[10px] size-[680px] rounded-full opacity-70"
        style={{
          background:
            "radial-gradient(circle, rgba(30,107,135,0.6) 0%, rgba(30,107,135,0.2) 38%, rgba(13,27,42,0) 70%)",
        }}
      />
      <motion.div
        variants={group}
        initial="hidden"
        animate={stage === "loading" ? "hidden" : "visible"}
        className="relative mx-auto grid w-full max-w-[1036px] items-center gap-10 px-6 py-[70px] lg:grid-cols-[1fr_520px] lg:px-0 lg:py-[105px]"
      >
        <div className="max-w-[560px]">
          <motion.div variants={item}>
          <p className="text-[13px] font-semibold" style={{ ...BODY, color: ICE }}>
            <span className="text-white">{HERO.eyebrowLead}</span>
            {HERO.eyebrowRest}
          </p>
          <h1
            className="mt-[18px] text-[clamp(44px,6vw,72px)] font-bold leading-none tracking-[-0.025em] text-[#EEF6F7]"
            style={DISPLAY}
          >
            {HERO.title}
          </h1>
          <p className="mt-[18px] max-w-[530px] text-[19px] leading-[1.5] text-[#C2D3DA]" style={BODY}>
            {HERO.subtitle}
          </p>
          </motion.div>
          <motion.div variants={item} className="mt-[36px] border-l-[3px] pl-4" style={{ borderColor: ICE }}>
            <p className="text-[16px] text-[#C2D3DA]" style={BODY}>
              <span className="font-semibold text-[#EEF6F7]">{HERO.role}</span>
              {HERO.roleAgency}
            </p>
            <p className="mt-[2px] text-[14px] text-[#8FA5B1]" style={BODY}>
              {HERO.roleNote}
            </p>
          </motion.div>
          <motion.a
            variants={item}
            href="#sweepstakes"
            className="mt-[36px] inline-flex h-[46px] items-center rounded-[999px] bg-[#F4F6F4] px-[22px] text-[15px] font-semibold text-[#18201B] transition-[transform,opacity] duration-150 motion-safe:hover:-translate-y-[1px] motion-safe:active:scale-[0.98] motion-safe:hover:opacity-90"
            style={BODY}
          >
            {HERO.cta}
          </motion.a>
        </div>
        <motion.div variants={item}>
          <Shot
            src={HERO.image.src}
            alt={HERO.image.alt}
            className="mx-auto aspect-square w-full max-w-[520px] rounded-[24px] bg-white shadow-[0px_24px_50px_0px_rgba(0,0,0,0.35)]"
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
                <p className="text-[11px] tracking-[0.44px] text-[#8FA5B1]" style={BODY}>
                  {fact.label}
                </p>
                <p className="mt-[2px] text-[15px] font-semibold leading-[1.5] text-[#EEF6F7]" style={BODY}>
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

function Background() {
  const { group, item, viewport } = useStagger({ distance: 16, step: 0.07 });

  return (
    <section className="mx-auto w-full max-w-[1036px] px-6 pt-[96px] lg:px-0">
      <SectionHead eyebrow={BACKGROUND.eyebrow} heading={BACKGROUND.heading} note={BACKGROUND.note} />
      <div className="grid items-start gap-6 lg:grid-cols-[1fr_272px]">
        <div className="flex flex-col gap-4">
          <motion.div
            variants={group}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="grid gap-[14px] sm:grid-cols-3"
          >
            {BACKGROUND.stats.map((stat) => (
              <motion.div
                key={stat.num}
                variants={item}
                className="rounded-[18px] px-[22px] pb-6 pt-[22px]"
                style={{ background: stat.tone === "teal" ? TEAL : DARK }}
              >
                <p className="text-[36px] font-bold leading-none text-[#EEF6F7]" style={DISPLAY}>
                  {stat.num}
                </p>
                <p className="mt-3 text-[14px] leading-[1.5] text-[#D3E6EB]" style={BODY}>
                  {stat.body}
                </p>
              </motion.div>
            ))}
          </motion.div>
          {BACKGROUND.cards.map((card) => (
            <Reveal key={card.title} distance={18}>
              <article className="flex items-start gap-4 rounded-[18px] bg-white px-[22px] pb-[22px] pt-5">
                <span className="flex h-[46px] w-[46px] shrink-0 items-center justify-center rounded-[12px]" style={{ background: TILE }}>
                  <Icon name={card.icon} size={20} />
                </span>
                <div>
                  <h3 className="text-[18px] font-semibold" style={{ ...BODY, color: INK }}>
                    {card.title}
                  </h3>
                  <p className="mt-1 text-[14px] leading-[1.5]" style={{ ...BODY, color: MUTED }}>
                    {card.body}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
        <Shot
          src={BACKGROUND.phone.src}
          alt={BACKGROUND.phone.alt}
          className="mx-auto aspect-[272/551] w-full max-w-[272px] rounded-[28px]"
          imgClass="object-cover"
        />
      </div>
    </section>
  );
}

function WhatIDid() {
  // The five steps are a sequence, so they arrive in order — the argument is
  // chronological and the motion says so before the copy does.
  const { group, item, viewport } = useStagger({ distance: 16, step: 0.06 });
  const tiles = useStagger({ distance: 14, step: 0.05 });

  return (
    <section className="mx-auto w-full max-w-[1036px] px-6 pt-[96px] lg:px-0">
      <SectionHead eyebrow={ROLE.eyebrow} heading={ROLE.heading} note={ROLE.note} />
      <div className="relative">
        {/* The connector draws itself in, so the row reads as one linked
            process rather than five separate badges. Under MotionConfig a
            reduced-motion visitor gets the drawn state instantly: scaleX is a
            transform, and MotionConfig disables transform motion. */}
        <motion.div
          aria-hidden
          className="absolute left-[10%] right-[10%] top-[28px] hidden h-px lg:block"
          style={{ background: ICE, transformOrigin: "left" }}
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
          {ROLE.steps.map((step) => (
            <motion.li key={step.title} variants={item} className="flex flex-col items-center gap-1 text-center">
              <span className="flex h-[56px] w-[56px] items-center justify-center rounded-[999px]" style={{ background: TEAL }}>
                <Icon name={step.icon} size={20} />
              </span>
              <p className="mt-[10px] text-[15px] font-semibold" style={{ ...DISPLAY, color: INK }}>
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
        {ROLE.tiles.map((tile) => (
          <motion.div
            key={tile.num}
            variants={tiles.item}
            className="rounded-[18px] px-[22px] pb-6 pt-[22px]"
            style={{ background: tile.tone === "teal" ? TEAL : DARK }}
          >
            <p className="text-[30px] font-semibold leading-[1.1] text-[#EEF6F7]" style={DISPLAY}>
              {tile.num}
            </p>
            <p className="mt-3 text-[14px] leading-[1.5] text-[#D3E6EB]" style={BODY}>
              {tile.body}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

function PixelArt() {
  return (
    <section className="mx-auto w-full max-w-[1036px] px-6 pt-[96px] lg:px-0">
      <SectionHead eyebrow={PIXEL.eyebrow} heading={PIXEL.heading} note={PIXEL.note} />
      <div className="grid items-center gap-6 lg:grid-cols-[1fr_352px]">
        <Reveal distance={22}>
          <div>
            <Shot
              src={PIXEL.sheet.src}
              alt={PIXEL.sheet.alt}
              className="aspect-[660/473] w-full rounded-[16px] bg-white"
              imgClass="object-cover"
            />
            <p className="mt-[10px] text-[13px] leading-[1.5]" style={{ ...BODY, color: MUTED }}>
              {PIXEL.sheet.caption}
            </p>
          </div>
        </Reveal>
        <Reveal delay={0.08} distance={22}>
          <aside className="rounded-[20px] px-7 pb-[30px] pt-7" style={{ background: TEAL }}>
          <p className="text-[11px] font-bold tracking-[1.1px]" style={{ ...BODY, color: ICE }}>
            {PIXEL.callout.label}
          </p>
          <p className="mt-3 text-[26px] font-semibold leading-[1.2] text-white" style={DISPLAY}>
            {PIXEL.callout.title}
          </p>
          <p className="mt-3 text-[15px] leading-[1.5] text-[#DDF1F3]" style={BODY}>
            {PIXEL.callout.body}
          </p>
        </aside>
        </Reveal>
      </div>
    </section>
  );
}

function Depth() {
  const coins = useStagger({ distance: 14, step: 0.05 });

  return (
    <section className="mx-auto w-full max-w-[1036px] px-6 pt-[96px] lg:px-0">
      <SectionHead eyebrow={DEPTH.eyebrow} heading={DEPTH.heading} note={DEPTH.note} />
      <div className="grid items-start gap-4 lg:grid-cols-[1fr_320px]">
        <Reveal distance={22}>
          <div>
            <Shot
              src={DEPTH.rink.src}
              alt={DEPTH.rink.alt}
              className="aspect-[700/394] w-full rounded-[16px]"
              imgClass="object-cover"
            />
            <p className="mt-[10px] text-[13px] leading-[1.5]" style={{ ...BODY, color: MUTED }}>
              {DEPTH.rink.caption}
            </p>
          </div>
        </Reveal>
        <Reveal delay={0.08} distance={22}>
          <div>
            <Shot
              src={DEPTH.cap.src}
              alt={DEPTH.cap.alt}
              className="aspect-[320/394] w-full rounded-[16px] bg-black"
              imgClass="object-cover"
            />
            <p className="mt-[10px] text-[13px] leading-[1.5]" style={{ ...BODY, color: MUTED }}>
              {DEPTH.cap.caption}
            </p>
          </div>
        </Reveal>
      </div>
      <p className="mt-7 text-[11px] font-bold uppercase tracking-[1.32px]" style={{ ...BODY, color: TEAL }}>
        {DEPTH.coinEyebrow}
      </p>
      <motion.div
        variants={coins.group}
        initial="hidden"
        whileInView="visible"
        viewport={coins.viewport}
        className="mt-[14px] grid grid-cols-3 gap-3 sm:grid-cols-6"
      >
        {DEPTH.coins.map((coin) => (
          <motion.div key={coin.src} variants={coins.item}>
            <Shot
              src={coin.src}
              alt={coin.alt}
              className="aspect-[162/332] w-full rounded-[14px] border border-[#DCE6E8] bg-white"
              imgClass="object-cover"
            />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

function Gameplay() {
  // Each phone-plus-caption arrives as one unit, so frame and label never
  // separate mid-entrance.
  const phones = useStagger({ distance: 20, step: 0.09 });

  return (
    <section className="mx-auto w-full max-w-[1036px] px-6 pt-[96px] lg:px-0">
      <SectionHead eyebrow={GAMEPLAY.eyebrow} heading={GAMEPLAY.heading} note={GAMEPLAY.note} />
      <motion.div
        variants={phones.group}
        initial="hidden"
        whileInView="visible"
        viewport={phones.viewport}
        className="grid items-center gap-6 lg:grid-cols-[260px_200px_1fr]"
      >
        {GAMEPLAY.phones.map((phone) => (
          <motion.figure key={phone.note} variants={phones.item}>
            <Shot
              src={phone.src}
              alt={phone.alt}
              className="aspect-[260/398] w-full rounded-[16px] bg-white"
              imgClass="object-cover"
            />
            <figcaption className="mt-[10px] text-[13px] leading-[1.5]" style={{ ...BODY, color: MUTED }}>
              {phone.caption}
            </figcaption>
          </motion.figure>
        ))}
        <NumNotes notes={GAMEPLAY.notes} />
      </motion.div>
    </section>
  );
}

function Sweepstakes() {
  return (
    <section id="sweepstakes" className="mt-[96px]" style={{ background: DARK }}>
      <div className="mx-auto w-full max-w-[1036px] px-6 py-[96px] lg:px-0">
        <SectionHead eyebrow={SWEEPSTAKES.eyebrow} heading={SWEEPSTAKES.heading} note={SWEEPSTAKES.note} dark />
        <div className="grid items-center gap-8 lg:grid-cols-[420px_1fr]">
          <Reveal distance={22}>
            <Shot
              src={SWEEPSTAKES.image.src}
              alt={SWEEPSTAKES.image.alt}
              className="mx-auto aspect-[420/642] w-full max-w-[420px] rounded-[20px] bg-white"
              imgClass="object-cover"
            />
          </Reveal>
          <NumNotes notes={SWEEPSTAKES.notes} dark />
        </div>
      </div>
    </section>
  );
}

function Results() {
  const { group, item, viewport } = useStagger({ distance: 18, step: 0.07 });
  const impact = useStagger({ distance: 16, step: 0.06 });

  return (
    <section className="mx-auto w-full max-w-[1036px] px-6 pt-[96px] lg:px-0">
      <SectionHead eyebrow={RESULTS.eyebrow} heading={RESULTS.heading} note={RESULTS.note} />
      <motion.div
        variants={group}
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        className="grid gap-4 md:grid-cols-2"
      >
        {RESULTS.wins.map((win) => (
          <motion.div key={win.src} variants={item}>
            <Shot
              src={win.src}
              alt={win.alt}
              className="aspect-[510/400] w-full rounded-[16px] bg-white"
              imgClass="object-cover"
            />
          </motion.div>
        ))}
      </motion.div>
      <p className="mt-[10px] text-[13px] leading-[1.5]" style={{ ...BODY, color: MUTED }}>
        {RESULTS.caption}
      </p>
      <motion.div
        variants={impact.group}
        initial="hidden"
        whileInView="visible"
        viewport={impact.viewport}
        className="mt-6 grid gap-[14px] md:grid-cols-3"
      >
        {RESULTS.impact.map((card) => (
          <motion.div
            key={card.num}
            variants={impact.item}
            className="rounded-[18px] px-6 pb-[26px] pt-6"
            style={{ background: card.tone === "teal" ? TEAL : DARK }}
          >
            <p className="text-[34px] font-semibold leading-[1.05] text-[#EEF6F7]" style={DISPLAY}>
              {card.num}
            </p>
            <p className="mt-3 text-[14px] leading-[1.5] text-[#D3E6EB]" style={BODY}>
              {card.body}
            </p>
          </motion.div>
        ))}
      </motion.div>
      <p className="mt-[22px] text-[12px] leading-[1.5]" style={{ ...BODY, color: MUTED }}>
        {RESULTS.credit}
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
            <p className="text-[32px] font-semibold text-[#EEF6F7]" style={DISPLAY}>
              Let&apos;s talk.
            </p>
            <a
              href="mailto:nmayacharya@gmail.com"
              className="mt-[10px] inline-block border-b border-[#3A5552] pb-[2px] text-[16px] text-[#C2D3DA] transition-opacity duration-200 hover:opacity-80"
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
                className="text-[14px] text-[#EEF6F7] transition-opacity duration-200 hover:opacity-80"
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

export default function ModeloCase() {
  return (
    <main style={{ background: PAPER }}>
      <Nav />
      <Hero />
      <Facts />
      <Background />
      <WhatIDid />
      <PixelArt />
      <Depth />
      <Gameplay />
      <Sweepstakes />
      <Results />
      <MoreProjects />
      <Footer />
    </main>
  );
}
