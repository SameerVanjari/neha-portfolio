"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, type Variants } from "framer-motion";
import {
  BRIEF,
  CLOSING_NOTE,
  FACTS,
  HERO,
  HOW,
  MORE_PROJECTS,
  PROTOTYPE,
} from "@/data/interactive-learning-aid";
import { EASE_OUT, Reveal, useStagger, useMotionPref } from "@/components/motion/reveal";
import { useLoadStage } from "@/components/LoadStage";
import { caseStudyThumb } from "@/data/case-studies";

/* ---------------------------------- tokens ---------------------------------
   Sampled directly from the Figma frame (node 458:305). This case study has
   its own palette — signal green and two shades of night indigo on cool
   paper — so it does not use the shared case-theme tokens. */

const PAPER = "#f4f5f4";
const INK = "#1b1a33";
const NIGHT = "#0e0940";
const DEEP = "#07052b";
const PANEL = "#26215f";
const NOTE_CARD = "#332d78";
const DARK_SLOT = "#3a3484";
const LIGHT_SLOT = "#e3e3ea";
const GREEN = "#39b54a";
const GREEN_INK = "#1e8f3a";
const GREEN_PILL = "#dff2e2";
const MUTED = "#5c5b70";

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
      src={`/case/interactive-learning-aid/${name}.svg`}
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
 * The Drive exports ship under the design's own filenames (ila-01-cover.jpg),
 * so a slot resolves its asset by name — replacing an export only has to keep
 * the name.
 */
const asset = (file: string) => `/case/interactive-learning-aid/${file}`;

/**
 * The design's drop-frame, reproduced exactly: tone, hint text and caption.
 * Light figures (#e3e3ea) sit on paper sections; dark ones (#3a3484) inside
 * the night band. A real export drops in by passing `src`.
 */
function FigSlot({
  file,
  height,
  tone = "light",
  caption,
  src,
  className,
  variants,
}: {
  file: string;
  height: string;
  tone?: "light" | "dark";
  caption?: string;
  src?: string;
  className?: string;
  variants?: Variants;
}) {
  const dark = tone === "dark";

  const frame = (
    <div
      className={`flex w-full flex-col items-center justify-center overflow-hidden px-2 ${height} ${className ?? ""}`}
      style={{ background: dark ? DARK_SLOT : LIGHT_SLOT, borderRadius: 14 }}
    >
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt={caption ?? file} loading="lazy" draggable={false} className="h-full w-full object-cover" />
      ) : (
        <span
          aria-hidden
          className={`px-2 text-center text-[10px] leading-[1.4] ${dark ? "text-[#b3aedb]" : "text-[#5c5b70]"}`}
          style={BODY}
        >
          Drop image
          <br />
          {file}
        </span>
      )}
    </div>
  );

  const body = caption ? (
    <figure className="flex w-full flex-col gap-2">
      {frame}
      <figcaption className={`text-[13px] leading-[1.5] ${dark ? "text-[#b3aedb]" : MUTED}`} style={BODY}>
        {caption}
      </figcaption>
    </figure>
  ) : (
    frame
  );

  if (variants) return <motion.div variants={variants}>{body}</motion.div>;
  return <Reveal distance={20}>{body}</Reveal>;
}

/** The section eyebrow: a green accent bar beside a small bold label. */
function AccentEyebrow({ children, onDark = false }: { children: React.ReactNode; onDark?: boolean }) {
  return (
    <div className="flex items-center gap-[10px]">
      <span className="h-4 w-1 shrink-0" style={{ background: GREEN }} aria-hidden />
      <p
        className={`text-[11px] font-bold leading-[1.5] ${onDark ? "text-[#39b54a]" : "text-[#1e8f3a]"}`}
        style={BODY}
      >
        {children}
      </p>
    </div>
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
        <div className="flex flex-col gap-[14px]">
          <AccentEyebrow onDark={onDark}>{eyebrow}</AccentEyebrow>
          <h2
            className={`text-[26px] font-semibold leading-[1.16] md:text-[38px] ${onDark ? "text-[#f1f0fa]" : INK}`}
            style={DISPLAY}
          >
            {heading}
          </h2>
        </div>
      </motion.div>
      {note && (
        <motion.p
          variants={item}
          className={`max-w-[400px] text-right text-[14px] leading-[1.5] ${onDark ? "text-[#b3aedb]" : MUTED}`}
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
      <Link href="/" className="shrink-0 text-[16px] font-semibold leading-[1.5] text-[#1b1a33]" style={BODY}>
        Neha Mayacharya
      </Link>
      {/* Desktop row + a mobile-only contact pill: the links row is 300px
          wide by itself, so at phone widths it must not render at all. */}
      <div className="hidden items-center gap-[30px] md:flex">
        <Link
          href="/projects"
          aria-current="page"
          className="border-b-[1.5px] border-[#1b1a33] pb-[3px] text-[14px] font-normal leading-[1.5] text-[#1b1a33]"
          style={BODY}
        >
          Work
        </Link>
        <Link href="/about" className="case-link text-[14px] leading-[1.5] text-[#1b1a33]" style={BODY}>
          About
        </Link>
        <a href="/resume.pdf" className="case-link text-[14px] leading-[1.5] text-[#1b1a33]" style={BODY}>
          Résumé (PDF)
        </a>
        <a
          href="#contact"
          className="case-cta flex h-10 items-center justify-center rounded-[999px] bg-[#1b1a33] px-5 text-[14px] font-semibold leading-[1.5] text-white"
          style={BODY}
        >
          Contact
        </a>
      </div>
      <a
        href="#contact"
        className="case-cta flex h-10 items-center justify-center rounded-[999px] bg-[#1b1a33] px-5 text-[14px] font-semibold leading-[1.5] text-white md:hidden"
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
        <div className="flex w-full max-w-[520px] flex-col gap-[30px] lg:pt-[96px]">
          <motion.div variants={item} className="flex flex-col gap-[18px]">
            <p className="text-[13px] font-semibold leading-[1.5] text-[#39b54a]" style={BODY}>
              {HERO.eyebrow}
            </p>
            <h1
              className="text-[34px] font-semibold leading-[1.16] text-[#f1f0fa] md:text-[54px]"
              style={DISPLAY}
            >
              {HERO.headline}
            </h1>
            <p className="max-w-[500px] text-[18px] leading-[1.5] text-[#c7c3ea]" style={BODY}>
              {HERO.support}
            </p>
          </motion.div>

          <motion.div variants={item} className="relative flex w-full flex-col gap-[2px] pl-4">
            <span className="absolute left-0 top-[2px] h-[56px] w-[3px]" style={{ background: GREEN }} aria-hidden />
            <p className="text-[16px] font-semibold leading-[1.5] text-[#f1f0fa]" style={BODY}>
              {HERO.role}
            </p>
            <p className="max-w-[500px] text-[14px] leading-[1.5] text-[#9893c8]" style={BODY}>
              {HERO.roleNote}
            </p>
          </motion.div>

          <motion.a
            variants={item}
            href="#how-it-works"
            className="case-cta flex items-start rounded-[999px] px-[22px] py-3 text-[15px] font-semibold leading-[1.5]"
            style={{ ...BODY, background: GREEN, color: NIGHT }}
          >
            {HERO.cta}
          </motion.a>
        </div>

        {/* Cover — the real hero export. */}
        <motion.div variants={item} className="w-full max-w-[600px] lg:mt-20 lg:-mr-[80px]">
          <FigSlot file={HERO.cover.file} src={asset(HERO.cover.file)} height="h-[300px] lg:h-[450px]" tone="dark" />
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ---------------------------------- facts ---------------------------------- */

function Facts() {
  const { group, item, viewport } = useStagger({ distance: 14, step: 0.06 });
  return (
    <section className="w-full" style={{ background: DEEP }}>
      <motion.div
        variants={group}
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        className={`${CONTENT} ${GUTTER} grid gap-6 py-[26px] sm:grid-cols-2 lg:grid-cols-4 lg:gap-x-1`}
      >
        {FACTS.map((f) => (
          <motion.div variants={item} key={f.label} className="flex items-start gap-3">
            <Icon name={f.icon} size={20} />
            <div className="flex flex-col gap-[3px]">
              <p className="text-[11px] font-bold leading-[1.5] text-[#39b54a]" style={BODY}>
                {f.label}
              </p>
              <p className="text-[15px] font-semibold leading-[1.5] text-[#f1f0fa]" style={BODY}>
                {f.value}
              </p>
              <p className="max-w-[220px] text-[13px] leading-[1.5] text-[#9893c8]" style={BODY}>
                {f.sub}
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
  const { group, item, viewport } = useStagger({ distance: 14, step: 0.06 });
  return (
    <section className={`${CONTENT} ${GUTTER} pt-24`}>
      <SectionHead eyebrow={BRIEF.eyebrow} heading={BRIEF.heading} />

      <motion.div
        variants={group}
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        className="grid gap-4 lg:grid-cols-[560px_1fr]"
      >
        <motion.div variants={item} className="flex flex-col gap-[14px] rounded-[20px] px-[30px] pb-[30px] pt-7" style={{ background: PANEL }}>
          <p className="text-[11px] font-bold leading-[1.5] text-[#39b54a]" style={BODY}>
            {BRIEF.cardEyebrow}
          </p>
          <p className="max-w-[500px] text-[19px] font-medium leading-[1.5] text-[#f1f0fa]" style={BODY}>
            {BRIEF.cardLead}
          </p>
          <p className="max-w-[500px] text-[15px] leading-[1.5] text-[#c7c3ea]" style={BODY}>
            {BRIEF.cardBody}
          </p>
        </motion.div>

        <FigSlot
          file={BRIEF.figure.file}
          src={asset(BRIEF.figure.file)}
          caption={BRIEF.figureCaption}
          height="h-[260px] lg:h-[345px]"
          variants={item}
        />
      </motion.div>

      <div className="mt-6 flex flex-wrap items-center gap-[10px]">
        <p className="text-[11px] font-bold leading-[1.5] text-[#5c5b70]" style={BODY}>
          {BRIEF.essentialLabel}
        </p>
        {BRIEF.essentials.map((tag) => (
          <span
            key={tag}
            className="rounded-[999px] px-4 py-[9px] text-[13px] font-semibold leading-[1.5]"
            style={{ ...BODY, background: GREEN_PILL, color: GREEN_INK }}
          >
            {tag}
          </span>
        ))}
        <span className="h-[100px] w-[24px]" aria-hidden />
        <p className="text-[11px] font-bold leading-[1.5] text-[#5c5b70]" style={BODY}>
          {BRIEF.desiredLabel}
        </p>
        {BRIEF.desired.map((tag) => (
          <span
            key={tag}
            className="rounded-[999px] px-4 py-[9px] text-[13px] font-semibold leading-[1.5]"
            style={{ ...BODY, color: GREEN_INK, border: `1px solid ${GREEN}` }}
          >
            {tag}
          </span>
        ))}
      </div>
    </section>
  );
}

/* ------------------------------- how it works ------------------------------- */

function How() {
  const { group, item, viewport } = useStagger({ distance: 14, step: 0.06 });
  return (
    <section id="how-it-works" className={`${CONTENT} ${GUTTER} pt-24`}>
      <SectionHead eyebrow={HOW.eyebrow} heading={HOW.heading} note={HOW.note} headingWidth="max-w-[600px]" />

      <motion.div variants={group} initial="hidden" whileInView="visible" viewport={viewport} className="grid gap-[14px] sm:grid-cols-2 lg:grid-cols-4">
        {HOW.steps.map((s) => (
          <motion.div
            variants={item}
            key={s.n}
            className="flex flex-col gap-[6px] rounded-[14px] bg-white px-5 pb-5 pt-[18px]"
          >
            <p className="text-[11px] font-bold leading-[1.5] text-[#1e8f3a]" style={BODY}>
              {s.n}
            </p>
            <p className="max-w-[208px] text-[16px] font-semibold leading-[1.5] text-[#1b1a33]" style={BODY}>
              {s.title}
            </p>
            <p className="max-w-[208px] text-[13px] leading-[1.5] text-[#5c5b70]" style={BODY}>
              {s.body}
            </p>
          </motion.div>
        ))}
      </motion.div>

      <div className="mt-6">
        <FigSlot file={HOW.figure.file} src={asset(HOW.figure.file)} caption={HOW.figureCaption} height="h-[420px] lg:h-[777px]" />
      </div>

      <motion.div
        variants={group}
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
      >
        {HOW.hardware.map((h) => (
          <motion.div
            variants={item}
            key={h.title}
            className="flex flex-col gap-[6px] rounded-[14px] bg-white px-5 pb-5 pt-[18px]"
          >
            <p className="max-w-[295px] text-[16px] font-semibold leading-[1.5] text-[#1b1a33]" style={BODY}>
              {h.title}
            </p>
            <p className="max-w-[295px] text-[13px] leading-[1.5] text-[#5c5b70]" style={BODY}>
              {h.body}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

/* ----------------------------- working prototype ----------------------------- */

function Prototype() {
  const { group, item, viewport } = useStagger({ distance: 14, step: 0.06 });
  return (
    <section className="w-full pt-24" style={{ background: PANEL }}>
      <div className={`${CONTENT} ${GUTTER} py-24`}>
        <SectionHead
          eyebrow={PROTOTYPE.eyebrow}
          heading={PROTOTYPE.heading}
          note={PROTOTYPE.note}
          onDark
          headingWidth="max-w-[600px]"
        />

        <FigSlot
          file={PROTOTYPE.figure.file}
          src={asset(PROTOTYPE.figure.file)}
          caption={PROTOTYPE.figureCaption}
          height="h-[420px] lg:h-[777px]"
          tone="dark"
        />

        <motion.div
          variants={group}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {PROTOTYPE.notes.map((n) => (
            <motion.div
              variants={item}
              key={n.label}
              className="flex flex-col gap-[6px] rounded-[14px] px-5 pb-5 pt-[18px]"
              style={{ background: NOTE_CARD }}
            >
              <p className="text-[11px] font-bold leading-[1.5] text-[#39b54a]" style={BODY}>
                {n.label}
              </p>
              <p className="max-w-[295px] text-[18px] font-semibold leading-[1.5] text-[#f1f0fa]" style={BODY}>
                {n.title}
              </p>
              <p className="max-w-[295px] text-[13px] leading-[1.5] text-[#b3aedb]" style={BODY}>
                {n.body}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ---------------------------------- footer ---------------------------------- */

function ClosingNote() {
  return (
    <section className={`${CONTENT} ${GUTTER} pt-7`}>
      <p className="max-w-[1036px] text-[12px] leading-[1.5] text-[#5c5b70]" style={BODY}>
        {CLOSING_NOTE}
      </p>
    </section>
  );
}

/* ------------------------------ more projects ------------------------------- */

function MoreProjects() {
  const { group, item, viewport } = useStagger({ distance: 18, step: 0.08 });
  // Some neighbor cases have no exported cover yet (or no page at all); a
  // missing bitmap falls back to the labelled tile rather than a broken image.
  const [brokenThumbs, setBrokenThumbs] = useState<Set<string>>(new Set());
  return (
    <section className={`${CONTENT} ${GUTTER} flex flex-col gap-[18px] pb-[90px] pt-[110px]`}>
      <div className="flex w-full items-center justify-between">
        <p className="text-[12px] tracking-[1.2px] text-[#5c5b70]" style={BODY}>
          {MORE_PROJECTS.label}
        </p>
        <Link
          href="/projects"
          className="case-link border-b-[1.5px] border-[#1b1a33] pb-[2px] text-[14px] font-semibold leading-[1.5] text-[#1b1a33]"
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
                    onError={() => setBrokenThumbs((prev) => new Set(prev).add(c.href))}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                ) : (
                  <span aria-hidden className="absolute bottom-2 left-2 text-[11px] leading-[1.5]" style={{ ...BODY, color: c.thumbLabel }}>
                    [Thumbnail]
                  </span>
                )}
              </div>
              <div className="flex flex-col gap-1">
                <p className="text-[12px] leading-[1.5] text-[#5c5b70]" style={BODY}>
                  {c.kicker}
                </p>
                <p className="text-[22px] font-semibold leading-[1.2] text-[#1b1a33]" style={DISPLAY}>
                  {c.title}
                </p>
                <p className="max-w-[300px] text-[14px] leading-[1.5] text-[#5c5b70]" style={BODY}>
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
    <footer id="contact" className="w-full" style={{ background: NIGHT }}>
      <div className={`${CONTENT} ${GUTTER} flex flex-col gap-8 pb-16 pt-14 md:flex-row md:items-center md:justify-between`}>
        <div className="flex flex-col gap-2">
          <p className="text-[32px] font-semibold leading-[1.15] text-[#f1f0fa]" style={DISPLAY}>
            Let&apos;s talk.
          </p>
          <a
            href="mailto:nmayacharya@gmail.com"
            className="case-link pb-[2px] text-[16px] leading-[1.5] text-[#c7c5e2]"
            style={{ ...BODY, borderBottom: "1px solid #3a3970" }}
          >
            nmayacharya@gmail.com
          </a>
        </div>
        <nav aria-label="Footer" className="flex flex-wrap gap-[26px] text-[14px] leading-[1.5] text-[#f1f0fa]" style={BODY}>
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

export default function InteractiveLearningAidCase() {
  return (
    <main style={{ background: PAPER }}>
      <Nav />
      <Hero />
      <Facts />
      <Brief />
      <How />
      <Prototype />
      <ClosingNote />
      <MoreProjects />
      <Footer />
    </main>
  );
}
