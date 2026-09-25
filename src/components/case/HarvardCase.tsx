"use client";

import Link from "next/link";
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
  return (
    <div className="flex flex-wrap items-end justify-between gap-6 pb-9">
      <div className="max-w-[760px]">
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
      </div>
      {note && (
        <p
          className="max-w-[340px] text-right text-[14px] leading-[1.5]"
          style={{ ...BODY, color: dark ? "#B0C3CC" : MUTED }}
        >
          {note}
        </p>
      )}
    </div>
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

function DropZone({
  note,
  className = "",
  tone = "light",
}: {
  note: string;
  className?: string;
  tone?: "light" | "dark";
}) {
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

function Nav() {
  return (
    <header style={{ background: PAPER }}>
      <div className="mx-auto flex h-[68px] w-full max-w-[1036px] items-center justify-between px-6 lg:px-0">
        <Link href="/" className="text-[16px] font-semibold" style={{ ...DISPLAY, color: INK }}>
          Neha Mayacharya
        </Link>
        <nav aria-label="Primary" className="hidden items-center gap-[30px] md:flex" style={BODY}>
          <Link href="/projects" className="border-b border-[#18201A] pb-[3px] text-[14px]" style={{ color: INK }}>
            Work
          </Link>
          <Link href="/about" className="text-[14px] transition-opacity hover:opacity-70" style={{ color: INK }}>
            About
          </Link>
          <a href="/resume.pdf" className="text-[14px] transition-opacity hover:opacity-70" style={{ color: INK }}>
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
  return (
    <section className="relative overflow-hidden" style={{ background: DARK }}>
      <DropZone
        note={HERO.coverNote}
        tone="dark"
        className="absolute bottom-0 right-0 top-0 hidden w-[57%] lg:block"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(90deg, #141C17 40%, rgba(20,28,23,0.5) 62%, rgba(20,28,23,0) 100%)",
        }}
      />
      <div className="relative mx-auto w-full max-w-[1036px] px-6 py-[70px] lg:px-0 lg:py-[110px]">
        <div className="max-w-[560px]">
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
          <div className="mt-[36px] border-l-[3px] pl-4" style={{ borderColor: PALE }}>
            <p className="text-[16px] text-[#C4D2C7]" style={BODY}>
              <span className="font-semibold text-[#EFF5F0]">{HERO.role}</span>
              {HERO.roleAgency}
            </p>
            <p className="mt-[2px] text-[14px] text-[#93A597]" style={BODY}>
              {HERO.roleNote}
            </p>
          </div>
          <a
            href="#solution"
            className="mt-[36px] inline-flex h-[46px] items-center rounded-[999px] px-[22px] text-[15px] font-semibold"
            style={{ ...BODY, background: PAPER, color: INK }}
          >
            {HERO.cta}
          </a>
        </div>
        <DropZone note={HERO.coverNote} tone="dark" className="mt-10 aspect-[820/731] w-full rounded-[16px] lg:hidden" />
      </div>
    </section>
  );
}

function Facts() {
  return (
    <section aria-label="At a glance" style={{ background: FAINT_DARK }}>
      <div className="mx-auto w-full max-w-[1036px] px-6 lg:px-0">
        <ul className="grid grid-cols-2 lg:grid-cols-4">
          {FACTS.map((fact, i) => (
            <li
              key={fact.label}
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
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Brief() {
  return (
    <section className="mx-auto w-full max-w-[1036px] px-6 pt-[96px] lg:px-0">
      <SectionHead eyebrow={BRIEF.eyebrow} heading={BRIEF.heading} />
      <div className="grid gap-4 lg:grid-cols-[560px_1fr]">
        <article className="rounded-[18px] bg-white px-7 pb-7 pt-[26px]">
          <p className="text-[16px] leading-[1.6]" style={{ ...BODY, color: INK }}>
            {BRIEF.context}
          </p>
        </article>
        <article className="rounded-[18px] px-7 pb-7 pt-[26px]" style={{ background: SAGE }}>
          <p className="text-[11px] font-bold tracking-[1.1px]" style={{ ...BODY, color: PALE }}>
            {BRIEF.roleLabel}
          </p>
          <p className="mt-3 text-[17px] font-medium leading-[1.5] text-white" style={BODY}>
            {BRIEF.roleBody}
          </p>
        </article>
      </div>
    </section>
  );
}

function Challenge() {
  return (
    <section className="mx-auto w-full max-w-[1036px] px-6 pt-[96px] lg:px-0">
      <SectionHead eyebrow={CHALLENGE.eyebrow} heading={CHALLENGE.heading} />
      <div className="grid gap-4 md:grid-cols-3">
        {CHALLENGE.cards.map((card) => (
          <article key={card.title} className="rounded-[18px] bg-white px-6 pb-[26px] pt-6">
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
          </article>
        ))}
      </div>
      <div className="mt-4 rounded-[22px] px-11 py-10" style={{ background: DARK }}>
        <p className="text-[11px] font-bold uppercase tracking-[1.32px]" style={{ ...BODY, color: PALE }}>
          {CHALLENGE.questionLabel}
        </p>
        <p className="mt-[14px] text-[26px] font-medium leading-[1.3] text-[#EFF5F0] md:text-[34px]" style={DISPLAY}>
          {CHALLENGE.questionLead}
          <span style={{ color: PALE }}>{CHALLENGE.questionAccent}</span>?
        </p>
      </div>
    </section>
  );
}

function Teamwork() {
  return (
    <section className="mx-auto w-full max-w-[1036px] px-6 pt-[96px] lg:px-0">
      <SectionHead eyebrow={TEAMWORK.eyebrow} heading={TEAMWORK.heading} note={TEAMWORK.note} />
      <div className="flex flex-col gap-4">
        {TEAMWORK.rows.map((row, r) => (
          <div key={r} className="grid gap-4 md:grid-cols-3">
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
          </div>
        ))}
      </div>
    </section>
  );
}

function Stages() {
  return (
    <section className="mx-auto w-full max-w-[1036px] px-6 pt-[96px] lg:px-0">
      <SectionHead eyebrow={STAGES.eyebrow} heading={STAGES.heading} />
      <div className="relative">
        <div aria-hidden className="absolute left-[10%] right-[10%] top-[28px] hidden h-px lg:block" style={{ background: PALE }} />
        <ol className="relative grid grid-cols-2 gap-x-4 gap-y-10 lg:grid-cols-5">
          {STAGES.steps.map((step) => (
            <li key={step.title} className="flex flex-col items-center gap-1 text-center">
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
            </li>
          ))}
        </ol>
      </div>
      <div className="mt-7 grid gap-[14px] md:grid-cols-3">
        {STAGES.tiles.map((tile) => (
          <div
            key={tile.num}
            className="rounded-[18px] px-[22px] pb-6 pt-[22px]"
            style={{ background: tile.tone === "sage" ? SAGE : DARK }}
          >
            <p className="text-[30px] font-semibold leading-[1.1] text-[#EFF5F0]" style={DISPLAY}>
              {tile.num}
            </p>
            <p className="mt-3 text-[14px] leading-[1.5] text-[#D4E6D8]" style={BODY}>
              {tile.body}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Docs() {
  return (
    <section className="mx-auto w-full max-w-[1036px] px-6 pt-[96px] lg:px-0">
      <SectionHead eyebrow={DOCS.eyebrow} heading={DOCS.heading} />
      <div className="grid gap-4 md:grid-cols-2">
        {DOCS.panels.map((panel) => (
          <figure key={panel.note}>
            <DropZone note={panel.note} className="aspect-[510/287] rounded-[16px]" />
            <figcaption className="mt-[10px] text-[13px] leading-[1.5]" style={{ ...BODY, color: MUTED }}>
              {panel.caption}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

function Storyboards() {
  return (
    <section className="mx-auto w-full max-w-[1036px] px-6 pt-[96px] lg:px-0">
      <SectionHead eyebrow={STORYBOARDS.eyebrow} heading={STORYBOARDS.heading} note={STORYBOARDS.note} />
      <div className="flex flex-col gap-5">
        {STORYBOARDS.rows.map((row, r) => (
          <div key={r} className="grid gap-4 sm:grid-cols-3">
            {row.map((board) => (
              <figure key={board.note}>
                <DropZone note={board.note} className="aspect-[335/188] rounded-[16px]" />
                <figcaption className="mt-[10px] text-[13px] leading-[1.5]" style={{ ...BODY, color: MUTED }}>
                  {board.caption}
                </figcaption>
              </figure>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}

function Solution() {
  return (
    <section id="solution" className="mt-[96px]" style={{ background: DARK }}>
      <div className="mx-auto w-full max-w-[1036px] px-6 py-[96px] lg:px-0">
        <SectionHead eyebrow={SOLUTION.eyebrow} heading={SOLUTION.heading} dark />
        <div className="grid gap-4 md:grid-cols-3">
          {SOLUTION.moves.map((move) => (
            <article key={move.title} className="rounded-[18px] p-[26px]" style={{ background: MOVE_CARD }}>
              <span className="flex h-20 w-20 items-center justify-center rounded-[16px]" style={{ background: PANEL }}>
                <Icon name={move.icon} size={34} />
              </span>
              <h3 className="mt-[18px] text-[20px] font-semibold leading-[1.5] text-[#EFF5F0]" style={DISPLAY}>
                {move.title}
              </h3>
              <p className="mt-2 text-[14px] leading-[1.5] text-[#B0C3CC]" style={BODY}>
                {move.body}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Interface3D() {
  return (
    <section className="mx-auto w-full max-w-[1036px] px-6 pt-[96px] lg:px-0">
      <SectionHead eyebrow={UI3D.eyebrow} heading={UI3D.heading} note={UI3D.note} />
      <div className="grid items-start gap-4 lg:grid-cols-[620px_1fr]">
        {UI3D.panels.map((panel) => (
          <figure key={panel.note}>
            <DropZone note={panel.note} className="aspect-[620/349] w-full rounded-[16px]" />
            <figcaption className="mt-[10px] text-[13px] leading-[1.5]" style={{ ...BODY, color: MUTED }}>
              {panel.caption}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

function Worlds() {
  return (
    <section className="mx-auto w-full max-w-[1036px] px-6 pt-[96px] lg:px-0">
      <SectionHead eyebrow={WORLDS.eyebrow} heading={WORLDS.heading} note={WORLDS.note} />
      <div className="grid items-start gap-4 lg:grid-cols-[620px_1fr_1fr]">
        {WORLDS.panels.map((panel) => (
          <figure key={panel.note}>
            <DropZone
              note={panel.note}
              className={`w-full rounded-[16px] ${panel.span === "wide" ? "aspect-[620/420]" : "aspect-[192/420]"}`}
            />
            <figcaption className="mt-[10px] text-[13px] leading-[1.5]" style={{ ...BODY, color: MUTED }}>
              {panel.caption}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

function Breath() {
  return (
    <section className="mx-auto w-full max-w-[1036px] px-6 pt-[96px] lg:px-0">
      <SectionHead eyebrow={BREATH.eyebrow} heading={BREATH.heading} />
      <div className="grid items-center gap-6 lg:grid-cols-[640px_1fr]">
        <DropZone note={BREATH.imageNote} tone="dark" className="aspect-[640/360] rounded-[16px]" />
        <div className="flex flex-col gap-4">
          {BREATH.notes.map((item) => (
            <article key={item.title} className="flex items-start gap-4 rounded-[16px] bg-white px-5 py-[18px]">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[12px]" style={{ background: TILE }}>
                <Icon name={item.icon} size={20} />
              </span>
              <div>
                <p className="text-[17px] font-semibold" style={{ ...BODY, color: INK }}>
                  {item.title}
                </p>
                <p className="mt-1 text-[14px] leading-[1.5]" style={{ ...BODY, color: MUTED }}>
                  {item.body}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Outcome() {
  return (
    <section className="mx-auto w-full max-w-[1036px] px-6 pt-[96px] lg:px-0">
      <SectionHead eyebrow={OUTCOME.eyebrow} heading={OUTCOME.heading} />
      <div className="grid gap-[14px] md:grid-cols-3">
        {OUTCOME.impact.map((card) => (
          <div
            key={card.num}
            className="rounded-[18px] px-6 pb-6 pt-6"
            style={{ background: card.tone === "sage" ? SAGE : DARK }}
          >
            <p className="text-[34px] font-semibold leading-[1.1] text-[#EFF5F0]" style={DISPLAY}>
              {card.num}
            </p>
            <p className="mt-3 text-[14px] leading-[1.5] text-[#D4E6D8]" style={BODY}>
              {card.body}
            </p>
          </div>
        ))}
      </div>
      <div className="mt-4 rounded-[18px] px-9 py-[30px]" style={{ background: LESSON_PANEL }}>
        <p className="text-[11px] font-bold uppercase tracking-[1.32px]" style={{ ...BODY, color: SAGE }}>
          {OUTCOME.lessonsLabel}
        </p>
        <ul className="mt-4 flex flex-col gap-[14px]">
          {OUTCOME.lessons.map((lesson) => (
            <li key={lesson} className="flex items-start gap-3">
              <Icon name="icon-lesson-check" size={20} className="mt-[2px] shrink-0" />
              <p className="text-[16px] font-medium leading-[1.5]" style={{ ...BODY, color: INK }}>
                {lesson}
              </p>
            </li>
          ))}
        </ul>
      </div>
      <p className="mt-[22px] text-[12px] leading-[1.5]" style={{ ...BODY, color: MUTED }}>
        {OUTCOME.credit}
      </p>
    </section>
  );
}

function MoreProjects() {
  return (
    <section className="mx-auto w-full max-w-[1036px] px-6 pb-[90px] pt-[110px] lg:px-0">
      <div className="flex items-center justify-between">
        <p className="text-[12px] tracking-[1.2px]" style={{ ...BODY, color: MUTED }}>
          MORE PROJECTS
        </p>
        <Link href="/projects" className="border-b pb-[2px] text-[14px] font-semibold" style={{ ...BODY, color: INK, borderColor: INK }}>
          All work
        </Link>
      </div>
      <div className="mt-7 grid gap-4 md:grid-cols-2">
        {NEIGHBORS.map((n) => (
          <Link
            key={n.title}
            href={n.href}
            className="group flex items-center gap-5 rounded-[18px] bg-white p-[14px] transition-transform motion-safe:hover:-translate-y-[2px]"
          >
            <span
              className="flex h-[110px] w-[150px] shrink-0 items-end rounded-[12px] p-2"
              style={{ background: n.thumbBg }}
            >
              <span className="text-[11px]" style={{ ...BODY, color: n.thumbFg }}>
                [Thumbnail]
              </span>
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
        ))}
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer style={{ background: DARK }}>
      <div className="mx-auto flex w-full max-w-[1036px] flex-wrap items-center justify-between gap-6 px-6 py-14 lg:px-0">
        <div>
          <p className="text-[32px] font-semibold text-[#EFF5F0]" style={DISPLAY}>
            Let&apos;s talk.
          </p>
          <a
            href="mailto:nmayacharya@gmail.com"
            className="mt-[10px] inline-block border-b border-[#3A5552] pb-[2px] text-[16px] text-[#C4D2C7] transition-opacity hover:opacity-80"
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
              className="text-[14px] text-[#EFF5F0] transition-opacity hover:opacity-80"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
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
