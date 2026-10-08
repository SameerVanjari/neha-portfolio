"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import {
  BRIEF,
  BUILDS,
  CONTRIBUTIONS,
  CRAFT,
  FACTS,
  FINISHED,
  HERO,
  JOURNEY,
  NEIGHBORS,
  TESTING,
} from "@/data/turtle";
import { FOOTER_LINKS } from "@/data/landing";
import { caseStudyThumb } from "@/data/case-studies";
import { EASE_OUT, Reveal, useMotionPref, useStagger } from "@/components/motion/reveal";
import { ProjectRuler } from "@/components/ProjectRuler";

const DARK = "#10272B";
const FAINT_DARK = "#0B1D20";
const ACCENT = "#D9774A";
const PALE = "#FFB997";
const TILE = "#FBE8DD";
const PAPER = "#F7F4EF";
const INK = "#1A2326";
const MUTED = "#5E6A6C";
const PANEL = "#234549";
const HAIR = "#1D3A3E";
const CRAFT_CARD = "#183539";

const DISPLAY = { fontFamily: "var(--font-display)" } as const;
const BODY = { fontFamily: "var(--font-body)" } as const;

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
  // Every section announces itself identically: the heading block lands, the
  // note follows a beat behind. Uniform arrival is what lets a long scroll
  // read as one document rather than a dozen separate screens.
  const { group, item, viewport } = useStagger({ distance: 16, step: 0.08 });

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
          style={{ ...BODY, color: dark ? PALE : ACCENT }}
        >
          {eyebrow}
        </p>
        <h2
          className="mt-[14px] text-[30px] leading-[1.15] tracking-[-0.38px] md:text-[38px]"
          style={{ ...DISPLAY, color: dark ? "#F2F6F5" : INK }}
        >
          {heading}
        </h2>
      </motion.div>
      {note && (
        <motion.p
          variants={item}
          className="max-w-[340px] text-right text-[14px] leading-[1.5]"
          style={{ ...BODY, color: dark ? "#AFC3C2" : MUTED }}
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
      src={`/case/turtle/${name}.svg`}
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
  src: string;
  poster?: string;
  alt: string;
  className?: string;
  /** Render a <video> instead of an <img>. */
  video?: boolean;
  /** Native controls, unmuted — used where the audio is the point. */
  controls?: boolean;
};

/**
 * Renders a still or a clip. Clips without `controls` autoplay muted on a loop
 * (the visual tests and the hero); clips with `controls` stay unmuted and
 * load on demand, because the sound comparison is the whole point of them.
 *
 * Chrome defers autoplay for offscreen media, so looping clips are additionally
 * driven by an IntersectionObserver: they start when scrolled into view and pause
 * when they leave, which also keeps off-screen clips from burning decode.
 */
function Media({ src, poster, alt, video, controls, className = "" }: MediaItem) {
  const ref = useRef<HTMLVideoElement>(null);
  const loop = Boolean(video) && !controls;

  useEffect(() => {
    const el = ref.current;
    if (!el || !loop) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) void el.play().catch(() => {});
        else el.pause();
      },
      { threshold: 0.2 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [loop, src]);

  if (video) {
    return (
      <video
        ref={ref}
        src={src}
        poster={poster}
        aria-label={alt}
        muted={!controls}
        loop={!controls}
        autoPlay={!controls}
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
      alt={alt}
      loading="lazy"
      draggable={false}
      onError={(e) => {
        e.currentTarget.src = "/placeholder.svg";
      }}
      className={`block object-cover ${className}`}
    />
  );
}

function GroupHead({ title, sub }: { title: string; sub: string }) {
  return (
    <div className="flex flex-wrap items-end gap-x-[14px] gap-y-1">
      <p className="text-[20px] font-semibold" style={{ ...DISPLAY, color: INK }}>
        {title}
      </p>
      <p className="pb-[2px] text-[13px]" style={{ ...BODY, color: MUTED }}>
        {sub}
      </p>
    </div>
  );
}

function Nav() {
  return (
    <header style={{ background: PAPER }}>
      <div className="mx-auto flex h-[68px] w-full max-w-[1036px] items-center justify-between px-6 lg:px-0">
        <Link href="/" className="text-[16px] font-semibold" style={{ ...DISPLAY, color: INK }}>
          Neha Mayacharya
        </Link>
        <nav aria-label="Primary" className="hidden items-center gap-[30px] md:flex" style={BODY}>
          <Link href="/projects" className="border-b border-[#1A2326] pb-[3px] text-[14px]" style={{ color: INK }}>
            Work
          </Link>
          <Link href="/about" className="text-[14px] transition-opacity hover:opacity-70" style={{ color: INK }}>
            About
          </Link>
          <a target="_blank" rel="noreferrer" href="/resume.pdf" className="text-[14px] transition-opacity hover:opacity-70" style={{ color: INK }}>
            Résumé (PDF)
          </a>
          <Link
            href="/#contact"
            className="inline-flex h-[40px] items-center rounded-[999px] px-[20px] text-[14px] font-semibold text-white"
            style={{ background: INK }}
          >
            Contact
          </Link>
        </nav>
        <Link
          href="/#contact"
          className="inline-flex h-[40px] items-center rounded-[999px] px-[20px] text-[14px] font-semibold text-white md:hidden"
          style={{ ...BODY, background: INK }}
        >
          Contact
        </Link>
      </div>
    </header>
  );
}

function Hero() {
  const reduce = useMotionPref();
  // The hero sits above the fold, so it plays on load rather than on scroll —
  // the same dialect as the other case studies (opacity + a short rise, one
  // strong ease-out). Reduced motion keeps the fade and drops the movement.
  const group: Variants = {
    hidden: {},
    visible: { transition: { delayChildren: 0.05, staggerChildren: reduce ? 0 : 0.09 } },
  };
  const item: Variants = {
    hidden: { opacity: 0, transform: reduce ? "translateY(0px)" : "translateY(20px)" },
    visible: {
      opacity: 1,
      transform: "translateY(0px)",
      transition: { duration: reduce ? 0.3 : 0.55, ease: EASE_OUT },
    },
  };
  return (
    <section className="relative overflow-hidden" style={{ background: DARK }}>
      <div
        aria-hidden
        className="pointer-events-none absolute right-[-60px] top-[10px] size-[700px] rounded-full opacity-70"
        style={{
          background:
            "radial-gradient(circle, rgba(217,119,74,0.5) 0%, rgba(217,119,74,0.16) 38%, rgba(16,39,43,0) 70%)",
        }}
      />
      <motion.div
        variants={group}
        initial="hidden"
        animate="visible"
        className="relative mx-auto grid w-full max-w-[1036px] items-center gap-10 px-6 py-[70px] lg:grid-cols-[1fr_450px] lg:px-0 lg:py-[88px]"
      >
        <motion.div variants={item} className="max-w-[560px]">
          <p className="text-[13px] font-semibold" style={{ ...BODY, color: PALE }}>
            <span className="text-white">{HERO.eyebrowLead}</span>
            {HERO.eyebrowRest}
          </p>
          <h1
            className="mt-[18px] text-[clamp(40px,5vw,64px)] font-semibold leading-[1.04] tracking-[-0.02em] text-[#F2F6F5]"
            style={DISPLAY}
          >
            {HERO.title}
          </h1>
          <p className="mt-[18px] max-w-[540px] text-[19px] leading-[1.5] text-[#C4D3D2]" style={BODY}>
            {HERO.subtitle}
          </p>
          <div className="mt-[36px] border-l-[3px] pl-4" style={{ borderColor: PALE }}>
            <p className="text-[16px] text-[#C4D3D2]" style={BODY}>
              <span className="font-semibold text-[#F2F6F5]">{HERO.role}</span>
              {HERO.roleAgency}
            </p>
            <p className="mt-[2px] text-[14px] text-[#8FA7A6]" style={BODY}>
              {HERO.roleNote}
            </p>
          </div>
          <a
            href="#journey"
            className="mt-[36px] inline-flex h-[46px] items-center rounded-[999px] px-[22px] text-[15px] font-semibold"
            style={{ ...BODY, background: PAPER, color: INK }}
          >
            {HERO.cta}
          </a>
        </motion.div>
        <motion.div
          variants={item}
          className="relative mx-auto hidden h-[600px] w-full max-w-[450px] sm:block lg:mx-0"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={HERO.shells.src}
            alt={HERO.shells.alt}
            loading="lazy"
            draggable={false}
            className="absolute left-[165px] top-[62px] h-[489px] w-[220px] max-w-none rounded-[20px] object-cover select-none"
          />
          <Media
            {...HERO.video}
            className="absolute left-0 top-0 z-10 h-[556px] w-[260px] max-w-none rounded-[24px]"
          />
        </motion.div>
        <motion.div variants={item} className="mx-auto w-[250px] sm:hidden">
          <Media {...HERO.video} className="h-auto w-full max-w-none rounded-[20px]" />
        </motion.div>
      </motion.div>
    </section>
  );
}

function Facts() {
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
                <p className="text-[11px] tracking-[0.44px] text-[#8FA7A6]" style={BODY}>
                  {fact.label}
                </p>
                <p className="mt-[2px] text-[15px] font-semibold leading-[1.5] text-[#F2F6F5]" style={BODY}>
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
      <SectionHead eyebrow={BRIEF.eyebrow} heading={BRIEF.heading} note={BRIEF.note} />
      <motion.div
        variants={group}
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        className="grid gap-4 md:grid-cols-3"
      >
        {BRIEF.cards.map((card) => (
          <motion.article
            key={card.title}
            variants={item}
            className="rounded-[18px] bg-white px-6 pb-[26px] pt-6"
          >
            <span className="flex h-[46px] w-[46px] items-center justify-center rounded-[12px]" style={{ background: TILE }}>
              <Icon name={card.icon} size={20} />
            </span>
            <h3 className="mt-[18px] text-[18px] font-semibold leading-[1.5]" style={{ ...DISPLAY, color: INK }}>
              {card.title}
            </h3>
            <p className="mt-2 text-[14px] leading-[1.5]" style={{ ...BODY, color: MUTED }}>
              {card.body}
            </p>
          </motion.article>
        ))}
      </motion.div>
    </section>
  );
}

function Journey() {
  const { group, item, viewport } = useStagger({ distance: 16, step: 0.06 });
  return (
    <section id="journey" className="mx-auto w-full max-w-[1036px] scroll-mt-6 px-6 pt-[96px] lg:px-0">
      <SectionHead eyebrow={JOURNEY.eyebrow} heading={JOURNEY.heading} />
      <motion.ol
        variants={group}
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        className="grid grid-cols-2 gap-x-3 gap-y-8 sm:grid-cols-3 lg:grid-cols-6"
      >
        {JOURNEY.steps.map((step, i) => (
          <motion.li key={step.note} variants={item}>
            <Media {...step} className="aspect-[163/361] rounded-[18px]" />
            <p className="mt-2 flex items-center gap-2">
              <span
                className="flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-full text-[11px] font-bold text-white"
                style={{ ...BODY, background: ACCENT }}
              >
                {i + 1}
              </span>
              <span className="text-[14px] font-semibold" style={{ ...BODY, color: INK }}>
                {step.title}
              </span>
            </p>
            <p className="mt-1 text-[12px] leading-[1.4]" style={{ ...BODY, color: MUTED }}>
              {step.body}
            </p>
          </motion.li>
        ))}
      </motion.ol>
    </section>
  );
}

function Testing() {
  const scale = useStagger({ distance: 16, step: 0.06 });
  const integrity = useStagger({ distance: 16, step: 0.05 });
  const sound = useStagger({ distance: 16, step: 0.07 });
  return (
    <section className="mx-auto w-full max-w-[1036px] px-6 pt-[96px] lg:px-0">
      <SectionHead eyebrow={TESTING.eyebrow} heading={TESTING.heading} note={TESTING.note} />
      <div className="flex flex-col gap-3 pt-2">
        <GroupHead title={TESTING.scale.title} sub={TESTING.scale.sub} />
        <motion.div
          variants={scale.group}
          initial="hidden"
          whileInView="visible"
          viewport={scale.viewport}
          className="grid grid-cols-2 gap-[14px] lg:grid-cols-4"
        >
          {TESTING.scale.captures.map((cap) => (
            <motion.figure key={cap.note} variants={scale.item}>
              <Media {...cap} className="aspect-[248.5/552] rounded-[16px]" />
              <figcaption className="mt-[6px] text-[14px] font-semibold" style={{ ...BODY, color: INK }}>
                {cap.title}
              </figcaption>
              <p className="text-[12px] leading-[1.4]" style={{ ...BODY, color: MUTED }}>
                {cap.body}
              </p>
            </motion.figure>
          ))}
        </motion.div>
      </div>
      <div className="flex flex-col gap-3 pt-9">
        <GroupHead title={TESTING.integrity.title} sub={TESTING.integrity.sub} />
        <motion.div
          variants={integrity.group}
          initial="hidden"
          whileInView="visible"
          viewport={integrity.viewport}
          className="grid grid-cols-2 gap-[14px] sm:grid-cols-3 lg:grid-cols-5"
        >
          {TESTING.integrity.captures.map((cap) => (
            <motion.figure key={cap.note} variants={integrity.item}>
              <Media {...cap} className="aspect-[196/435] rounded-[16px]" />
              <figcaption className="mt-[6px] text-[14px] font-semibold" style={{ ...BODY, color: INK }}>
                {cap.title}
              </figcaption>
            </motion.figure>
          ))}
        </motion.div>
      </div>
      <div className="flex flex-col gap-3 pt-9">
        <GroupHead title={TESTING.sound.title} sub={TESTING.sound.sub} />
        <motion.div
          variants={sound.group}
          initial="hidden"
          whileInView="visible"
          viewport={sound.viewport}
          className="grid gap-[14px] md:grid-cols-3"
        >
          {TESTING.sound.captures.map((cap) => (
            <motion.figure key={cap.note} variants={sound.item}>
              <Media {...cap} className="aspect-[9/16] rounded-[16px]" />
              <figcaption className="mt-[6px] text-[14px] font-semibold" style={{ ...BODY, color: INK }}>
                {cap.title}
              </figcaption>
              {cap.body && (
                <p className="text-[12px] leading-[1.4]" style={{ ...BODY, color: MUTED }}>
                  {cap.body}
                </p>
              )}
            </motion.figure>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function Builds() {
  const { group, item, viewport } = useStagger({ distance: 16, step: 0.08 });
  return (
    <section className="mx-auto w-full max-w-[1036px] px-6 pt-[96px] lg:px-0">
      <SectionHead eyebrow={BUILDS.eyebrow} heading={BUILDS.heading} note={BUILDS.note} />
      <motion.div
        variants={group}
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        className="grid gap-6 md:grid-cols-3"
      >
        {BUILDS.cards.map((card) => (
          <motion.article
            key={card.note}
            variants={item}
            className="flex items-start gap-4 rounded-[18px] bg-white p-4"
          >
            <Media {...card} className="h-[267px] w-[120px] shrink-0 rounded-[14px]" />
            <div className="min-w-0 py-[2px]">
              <p className="text-[10px] font-bold tracking-[1px]" style={{ ...BODY, color: ACCENT }}>
                {card.build}
              </p>
              <p className="mt-1 text-[22px] font-semibold" style={{ ...DISPLAY, color: INK }}>
                {card.date}
              </p>
              <p className="mt-2 text-[13px] leading-[1.45]" style={{ ...BODY, color: MUTED }}>
                {card.body}
              </p>
            </div>
          </motion.article>
        ))}
      </motion.div>
    </section>
  );
}

function Craft() {
  const { group, item, viewport } = useStagger({ distance: 18, step: 0.08 });
  return (
    <section className="mt-[96px]" style={{ background: DARK }}>
      <div className="mx-auto w-full max-w-[1036px] px-6 py-[96px] lg:px-0">
        <SectionHead eyebrow={CRAFT.eyebrow} heading={CRAFT.heading} dark />
        <motion.div
          variants={group}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="grid gap-4 md:grid-cols-2"
        >
          {CRAFT.cards.map((card) => (
            <motion.article
              key={card.title}
              variants={item}
              className="rounded-[20px] px-7 pb-[30px] pt-7"
              style={{ background: CRAFT_CARD }}
            >
              <span className="flex h-[72px] w-[72px] items-center justify-center rounded-[16px]" style={{ background: PANEL }}>
                <Icon name={card.icon} size={32} />
              </span>
              <h3 className="mt-3 text-[22px] font-semibold leading-[1.5] text-[#F2F6F5]" style={DISPLAY}>
                {card.title}
              </h3>
              <p className="mt-2 text-[15px] leading-[1.55] text-[#AFC3C2]" style={BODY}>
                {card.body}
              </p>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function Finished() {
  const { group, item, viewport } = useStagger({ distance: 18, step: 0.09 });
  return (
    <section className="mx-auto w-full max-w-[1036px] px-6 pt-[96px] lg:px-0">
      <SectionHead eyebrow={FINISHED.eyebrow} heading={FINISHED.heading} note={FINISHED.note} />
      <motion.div
        variants={group}
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        className="grid items-start gap-4 lg:grid-cols-[1fr_320px]"
      >
        <motion.figure variants={item}>
          <Media {...FINISHED.wide} className="aspect-[700/566] rounded-[18px]" />
          <figcaption className="mt-[10px] text-[13px] leading-[1.5]" style={{ ...BODY, color: MUTED }}>
            {FINISHED.wide.caption}
          </figcaption>
        </motion.figure>
        <motion.figure variants={item}>
          <Media {...FINISHED.walkthrough} className="aspect-[320/457] rounded-[24px]" />
          <figcaption className="mt-[10px] text-[13px] leading-[1.5]" style={{ ...BODY, color: MUTED }}>
            {FINISHED.walkthrough.caption}
          </figcaption>
        </motion.figure>
      </motion.div>
    </section>
  );
}

function Contributions() {
  const { group, item, viewport } = useStagger({ distance: 14, step: 0.05 });
  return (
    <section className="mx-auto w-full max-w-[1036px] px-6 pt-[96px] lg:px-0">
      <SectionHead eyebrow={CONTRIBUTIONS.eyebrow} heading={CONTRIBUTIONS.heading} />
      <motion.div
        variants={group}
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        className="flex flex-col gap-[14px]"
      >
        {CONTRIBUTIONS.rows.map((row, r) => (
          <div key={r} className="grid gap-[14px] md:grid-cols-3">
            {row.map((entry) => (
              <motion.div
                key={entry.title}
                variants={item}
                className="flex items-center gap-[14px] rounded-[16px] px-5 py-[18px]"
                style={{ background: entry.lead ? ACCENT : "#FFFFFF" }}
              >
                <span
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[12px]"
                  style={{ background: entry.lead ? "rgba(255,255,255,0.2)" : TILE }}
                >
                  <Icon name={entry.icon} size={20} />
                </span>
                <p
                  className="text-[15px] font-semibold leading-[1.5]"
                  style={{ ...BODY, color: entry.lead ? "#FFFFFF" : INK }}
                >
                  {entry.title}
                </p>
              </motion.div>
            ))}
          </div>
        ))}
      </motion.div>
      <Reveal delay={0.1} distance={14}>
        <p className="mt-[22px] text-[12px] leading-[1.5]" style={{ ...BODY, color: MUTED }}>
          {CONTRIBUTIONS.credit}
        </p>
      </Reveal>
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
        <Link href="/projects" className="border-b pb-[2px] text-[14px] font-semibold" style={{ ...BODY, color: INK, borderColor: INK }}>
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
          <motion.div key={n.title} variants={item}>
            <Link
              href={n.href}
              className="group flex items-center gap-5 rounded-[18px] bg-white p-[14px] transition-transform motion-safe:hover:-translate-y-[2px]"
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
    <footer data-index="Contact" data-tone="dark" style={{ background: DARK }}>
      <div className="mx-auto flex w-full max-w-[1036px] flex-wrap items-center justify-between gap-6 px-6 py-14 lg:px-0">
        <div>
          <p className="text-[32px] font-semibold text-[#F2F6F5]" style={DISPLAY}>
            Let&apos;s talk.
          </p>
          <a
            href="mailto:nmayacharya@gmail.com"
            className="mt-[10px] inline-block border-b border-[#3A5552] pb-[2px] text-[16px] text-[#C4D3D2] transition-opacity hover:opacity-80"
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
              className="text-[14px] text-[#F2F6F5] transition-opacity hover:opacity-80"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
}

export default function TurtleCase() {
  return (
    <main style={{ background: PAPER }}>
      <ProjectRuler />
      <Nav />
      <Hero />
      <Facts />
      <Brief />
      <Journey />
      <Testing />
      <Builds />
      <Craft />
      <Finished />
      <Contributions />
      <MoreProjects />
      <Footer />
    </main>
  );
}
