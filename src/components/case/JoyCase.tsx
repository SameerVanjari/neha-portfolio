"use client";

import Link from "next/link";
import {
  APPROACH,
  BRIEF,
  COMMUNITY_ISLAND,
  CONTENT_ISLAND,
  FACTS,
  HERO,
  ISLANDS_HEAD,
  NEIGHBORS,
  OUTCOME,
  PERSONAL_ISLAND,
  PHILOSOPHY,
  ROLE,
  STARTING_ISLAND,
} from "@/data/joy";
import { FOOTER_LINKS } from "@/data/landing";

/* ---------------------------------- tokens --------------------------------- */

const DARK = "#0F2422";
const FAINT_DARK = "#0A1B19";
const TEAL = "#0E8C7E";
const MINT = "#7FD6C8";
const TILE_MINT = "#DDF1EC";
const PAPER = "#F3F6F5";
const HAIR_LIGHT = "#1F3835";
const DIVIDER = "#DFE6E3";

const DISPLAY = { fontFamily: "var(--font-display)" } as const;
const BODY = { fontFamily: "var(--font-body)" } as const;

/* ------------------------------ shared pieces ------------------------------ */

function SectionHead({ eyebrow, heading, note }: { eyebrow: string; heading: string; note?: string }) {
  return (
    <div className="flex flex-wrap items-start justify-between gap-6 pb-9">
      <div className="max-w-[620px]">
        <p className="text-[11px] font-bold uppercase tracking-[1.32px]" style={{ ...BODY, color: TEAL }}>
          {eyebrow}
        </p>
        <h2
          className="mt-[14px] text-[30px] md:text-[38px] leading-[1.15] tracking-[-0.38px] text-[#172422]"
          style={DISPLAY}
        >
          {heading}
        </h2>
      </div>
      {note && (
        <p className="max-w-[340px] pt-[24px] text-[14px] leading-[1.5] text-[#5A6866]" style={BODY}>
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
      src={`/case/joy/${name}.svg`}
      width={size}
      height={size}
      alt=""
      aria-hidden
      draggable={false}
      className={`select-none ${className}`}
    />
  );
}

function Check({ size = 16 }: { size?: number }) {
  return <Icon name="icon-check" size={size} className="shrink-0" />;
}

/* ---------------------------------- chrome ---------------------------------- */

function Nav() {
  return (
    <header style={{ background: PAPER }}>
      <div className="mx-auto flex h-[68px] w-full max-w-[1036px] items-center justify-between px-6 lg:px-0">
        <Link href="/" className="text-[16px] font-semibold text-[#172422]" style={DISPLAY}>
          Neha Mayacharya
        </Link>
        <nav aria-label="Primary" className="hidden items-center gap-[30px] md:flex" style={BODY}>
          <Link href="/projects" className="border-b border-[#172422] pb-[3px] text-[14px] text-[#172422]">
            Work
          </Link>
          <Link href="/about" className="text-[14px] text-[#172422] transition-opacity hover:opacity-70">
            About
          </Link>
          <a href="/resume.pdf" className="text-[14px] text-[#172422] transition-opacity hover:opacity-70">
            Résumé (PDF)
          </a>
          <Link
            href="/#contact"
            className="inline-flex h-[40px] items-center rounded-[999px] bg-[#172422] px-[20px] text-[14px] font-semibold text-white"
          >
            Contact
          </Link>
        </nav>
        <Link
          href="/#contact"
          className="inline-flex h-[40px] items-center rounded-[999px] bg-[#172422] px-[20px] text-[14px] font-semibold text-white md:hidden"
          style={BODY}
        >
          Contact
        </Link>
      </div>
    </header>
  );
}

/* --------------------------------- sections --------------------------------- */

function Hero() {
  return (
    <section className="relative overflow-hidden" style={{ background: DARK }}>
      {/* Background video: the Made for Joy world reel */}
      <video
        className="absolute inset-0 h-full w-full object-cover"
        src="/videos/made-for-joy.mp4"
        muted
        loop
        playsInline
        autoPlay
        preload="metadata"
        aria-hidden
      />
      {/* Readability scrim (design geometry, no image) */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{ background: "linear-gradient(90deg, rgba(15,36,34,0.92) 0%, rgba(15,36,34,0.55) 45%, rgba(15,36,34,0.05) 75%)" }}
      />
      <div className="relative mx-auto w-full max-w-[1036px] px-6 py-[70px] md:py-[110px] lg:px-0">
        <div className="max-w-[600px]">
          <p className="text-[13px] font-semibold" style={{ ...BODY, color: MINT }}>
            {HERO.eyebrow}
          </p>
          <h1
            className="mt-[18px] text-[clamp(40px,4.4vw,60px)] font-semibold leading-[1.04] tracking-[-1.2px] text-[#EEF4F3]"
            style={DISPLAY}
          >
            {HERO.title}
          </h1>
          <p className="mt-[24px] max-w-[560px] text-[19px] leading-[1.5] text-[#BFD0CD]" style={BODY}>
            {HERO.subtitle}
          </p>
          <div className="mt-[36px] border-l-2 pl-4" style={{ borderColor: MINT }}>
            <p className="text-[16px] text-[#BFD0CD]" style={BODY}>
              {HERO.role}
            </p>
            <p className="mt-[2px] text-[14px] text-[#8FA6A2]" style={BODY}>
              {HERO.roleNote}
            </p>
          </div>
          <span
            className="mt-[36px] inline-flex h-[46px] items-center rounded-[999px] px-[22px] text-[15px] font-semibold text-[#172422]"
            style={{ ...BODY, background: PAPER }}
          >
            {HERO.cta}
          </span>
        </div>
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
              style={{ borderLeft: i > 0 ? `1px solid ${HAIR_LIGHT}` : undefined }}
            >
              <Icon name={fact.icon} size={20} className="mt-[2px] shrink-0" />
              <div>
                <p className="text-[11px] tracking-[0.44px] text-[#8FA6A2]" style={BODY}>
                  {fact.label}
                </p>
                <p className="mt-[2px] text-[15px] font-semibold leading-[1.5] text-[#EEF4F3]" style={BODY}>
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

function BriefChallenge() {
  return (
    <section className="mx-auto w-full max-w-[1036px] px-6 pt-[90px] lg:px-0">
      <SectionHead eyebrow={BRIEF.eyebrow} heading={BRIEF.heading} note={BRIEF.note} />
      <div className="grid gap-[18px] lg:grid-cols-[400px_1fr]">
        <article className="rounded-[18px] p-[30px]" style={{ background: DARK }}>
          <p className="text-[11px] font-bold uppercase tracking-[1.32px]" style={{ ...BODY, color: MINT }}>
            {BRIEF.briefCard.eyebrow}
          </p>
          <p className="mt-[14px] max-w-[340px] text-[26px] font-medium leading-[1.3] text-[#EEF4F3]" style={DISPLAY}>
            {BRIEF.briefCard.statement}
          </p>
          <p className="mt-[14px] text-[13px] text-[#AFC2BF]" style={BODY}>
            {BRIEF.briefCard.collaborators}
          </p>
        </article>
        <ol className="flex flex-col gap-[10px]">
          {BRIEF.challenges.map((text, i) => (
            <li key={text} className="flex flex-1 items-center gap-[22px] rounded-[14px] bg-white px-[22px] py-[18px]">
              <span className="text-[22px] font-semibold leading-none" style={{ ...DISPLAY, color: TEAL }}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="text-[16px] font-medium leading-[1.5] text-[#172422]" style={BODY}>
                {text}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function MyRole() {
  return (
    <section className="mx-auto w-full max-w-[1036px] px-6 pt-[90px] lg:px-0">
      <SectionHead eyebrow={ROLE.eyebrow} heading={ROLE.heading} note={ROLE.note} />
      <div className="relative">
        <div aria-hidden className="absolute left-[86px] right-[86px] top-[28px] hidden h-px bg-[#7FD6C8] lg:block" />
        <ol className="relative grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4">
          {ROLE.steps.map((step) => (
            <li key={step.title} className="flex flex-col items-center gap-2 text-center">
              <span className="flex h-[56px] w-[56px] items-center justify-center rounded-[999px]" style={{ background: TEAL }}>
                <Icon name={step.icon} size={20} />
              </span>
              <div>
                <p className="text-[15px] font-semibold text-[#172422]" style={DISPLAY}>
                  {step.title}
                </p>
                <p className="mx-auto mt-[2px] max-w-[247px] text-[13px] leading-[1.4] text-[#5A6866]" style={BODY}>
                  {step.body}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
      <div className="mt-[46px] grid gap-4 md:grid-cols-3">
        {ROLE.tiles.map((tile) => (
          <div
            key={tile.num}
            className="rounded-[18px] p-[24px]"
            style={{ background: tile.tone === "teal" ? TEAL : DARK }}
          >
            <p className="text-[30px] font-semibold leading-none text-[#EEF4F3]" style={DISPLAY}>
              {tile.num}
            </p>
            <p className="mt-[12px] text-[14px] leading-[1.5] text-[#CFE0DD]" style={BODY}>
              {tile.body}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

function DesignApproach() {
  return (
    <section className="mx-auto w-full max-w-[1036px] px-6 pt-[90px] lg:px-0">
      <SectionHead eyebrow={APPROACH.eyebrow} heading={APPROACH.heading} note={APPROACH.note} />
      <div className="grid gap-4 md:grid-cols-3">
        {APPROACH.cards.map((card) => (
          <article key={card.title} className="rounded-[18px] bg-white p-6">
            <span className="flex h-[46px] w-[46px] items-center justify-center rounded-[12px]" style={{ background: TILE_MINT }}>
              <Icon name={card.icon} size={20} />
            </span>
            <h3 className="mt-[18px] text-[18px] font-semibold leading-[1.5] text-[#172422]" style={DISPLAY}>
              {card.title}
            </h3>
            <p className="text-[14px] leading-[1.5] text-[#5A6866]" style={BODY}>
              {card.body}
            </p>
          </article>
        ))}
      </div>
      <p className="mt-[28px] text-[11px] font-bold uppercase tracking-[1.32px]" style={{ ...BODY, color: TEAL }}>
        {APPROACH.storyboardEyebrow}
      </p>
      <div className="mt-[14px] grid gap-4 md:grid-cols-3">
        {APPROACH.boards.map((board) => (
          <div key={board.src} className="aspect-[112/100] w-full overflow-hidden rounded-[14px]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={board.src} alt={board.alt} className="h-full w-full object-cover" loading="lazy" draggable={false} />
          </div>
        ))}
      </div>
    </section>
  );
}

function Philosophy() {
  return (
    <section className="mx-auto w-full max-w-[1036px] px-6 pt-[90px] lg:px-0">
      <SectionHead eyebrow={PHILOSOPHY.eyebrow} heading={PHILOSOPHY.heading} />
      <div className="rounded-[18px] px-6 py-[28px] text-center md:py-[32px]" style={{ background: TEAL }}>
        <p className="mx-auto max-w-[454px] text-[26px] font-medium leading-[1.5] text-white md:text-[30px]" style={DISPLAY}>
          {PHILOSOPHY.principle}
        </p>
      </div>
      <div className="mt-[16px] grid gap-4 md:grid-cols-3">
        {PHILOSOPHY.values.map((value) => (
          <article key={value.title} className="rounded-[18px] bg-white p-6">
            <span className="flex h-[46px] w-[46px] items-center justify-center rounded-[12px]" style={{ background: value.tile }}>
              <Icon name={value.icon} size={20} />
            </span>
            <h3 className="mt-[18px] text-[18px] font-semibold leading-[1.5] text-[#172422]" style={DISPLAY}>
              {value.title}
            </h3>
            <p className="text-[14px] leading-[1.5] text-[#5A6866]" style={BODY}>
              {value.body}
            </p>
          </article>
        ))}
      </div>
      <p className="mt-[28px] text-[11px] font-bold uppercase tracking-[1.32px]" style={{ ...BODY, color: TEAL }}>
        {PHILOSOPHY.treeEyebrow}
      </p>
      <div className="mt-[14px] aspect-[1036/253] w-full overflow-hidden rounded-[16px]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={PHILOSOPHY.treeImage.src} alt={PHILOSOPHY.treeImage.alt} className="h-full w-full object-cover" loading="lazy" draggable={false} />
      </div>
    </section>
  );
}

function IslandBlock({
  eyebrow,
  title,
  desc,
  features,
  boards,
  bordered,
}: {
  eyebrow: string;
  title: string;
  desc: string;
  features: readonly string[];
  boards: readonly { src: string; alt: string }[];
  bordered?: boolean;
}) {
  return (
    <article
      className="grid gap-6 py-8 lg:grid-cols-[300px_1fr] lg:gap-[28px] lg:py-10"
      style={bordered ? { borderTop: `1px solid ${DIVIDER}` } : undefined}
    >
      <div>
        <p className="text-[11px] font-bold uppercase tracking-[1.32px]" style={{ ...BODY, color: TEAL }}>
          {eyebrow}
        </p>
        <h3 className="mt-[10px] text-[22px] font-semibold leading-[1.2] text-[#172422]" style={DISPLAY}>
          {title}
        </h3>
        <p className="mt-[10px] text-[14px] leading-[1.5] text-[#5A6866]" style={BODY}>
          {desc}
        </p>
        <ul className="mt-[26px] flex flex-col gap-[14px]">
          {features.map((f) => (
            <li key={f} className="flex items-start gap-[8px]">
              <Check />
              <p className="text-[13px] leading-[1.5] text-[#172422]" style={BODY}>
                {f}
              </p>
            </li>
          ))}
        </ul>
      </div>
      {boards.length === 1 ? (
        <div key={boards[0].src} className="aspect-[708/250] w-full overflow-hidden rounded-[12px]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={boards[0].src} alt={boards[0].alt} className="h-full w-full object-cover" loading="lazy" draggable={false} />
        </div>
      ) : (
        <div className={`grid gap-4 ${boards.length > 2 ? "sm:grid-cols-3" : "sm:grid-cols-2"}`}>
          {boards.map((board) => (
            <div key={board.src} className="aspect-[228/200] w-full overflow-hidden rounded-[12px]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={board.src} alt={board.alt} className="h-full w-full object-cover" loading="lazy" draggable={false} />
            </div>
          ))}
        </div>
      )}
    </article>
  );
}

function Islands() {
  return (
    <section className="mx-auto w-full max-w-[1036px] px-6 pt-[90px] lg:px-0">
      <SectionHead eyebrow={ISLANDS_HEAD.eyebrow} heading={ISLANDS_HEAD.heading} note={ISLANDS_HEAD.note} />
      <IslandBlock
        eyebrow={STARTING_ISLAND.eyebrow}
        title={STARTING_ISLAND.title}
        desc={STARTING_ISLAND.desc}
        features={STARTING_ISLAND.features}
        boards={STARTING_ISLAND.boards}
      />
      <IslandBlock
        eyebrow={CONTENT_ISLAND.eyebrow}
        title={CONTENT_ISLAND.title}
        desc={CONTENT_ISLAND.desc}
        features={CONTENT_ISLAND.features}
        boards={CONTENT_ISLAND.boards}
        bordered
      />
      <IslandBlock
        eyebrow={PERSONAL_ISLAND.eyebrow}
        title={PERSONAL_ISLAND.title}
        desc={PERSONAL_ISLAND.desc}
        features={PERSONAL_ISLAND.features}
        boards={PERSONAL_ISLAND.boards}
        bordered
      />
      <IslandBlock
        eyebrow={COMMUNITY_ISLAND.eyebrow}
        title={COMMUNITY_ISLAND.title}
        desc={COMMUNITY_ISLAND.desc}
        features={COMMUNITY_ISLAND.features}
        boards={COMMUNITY_ISLAND.boards}
        bordered
      />
    </section>
  );
}

function Outcome() {
  return (
    <section className="mx-auto w-full max-w-[1036px] px-6 pt-[90px] lg:px-0">
      <SectionHead eyebrow={OUTCOME.eyebrow} heading={OUTCOME.heading} />
      <div className="rounded-[18px] px-6 py-[30px] md:px-9" style={{ background: TEAL }}>
        <p className="mx-auto max-w-[964px] text-[19px] font-medium leading-[1.5] text-white" style={DISPLAY}>
          {OUTCOME.statement}
        </p>
      </div>
      <div className="mt-4 grid gap-4 md:grid-cols-3">
        {OUTCOME.tiles.map((tile) => (
          <div key={tile.num} className="rounded-[18px] p-6" style={{ background: DARK }}>
            <p className="text-[28px] font-semibold leading-none text-[#EEF4F3]" style={DISPLAY}>
              {tile.num}
            </p>
            <p className="mt-[12px] text-[14px] leading-[1.5] text-[#CFE0DD]" style={BODY}>
              {tile.body}
            </p>
          </div>
        ))}
      </div>
      <p className="mt-[28px] text-[11px] font-bold uppercase tracking-[1.32px]" style={{ ...BODY, color: TEAL }}>
        {OUTCOME.inEngineEyebrow}
      </p>
      <div className="mt-[14px] grid gap-4 md:grid-cols-2">
        {OUTCOME.inEngineBoards.map((board) => (
          <div key={board.src} className="aspect-[510/208] w-full overflow-hidden rounded-[14px]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={board.src} alt={board.alt} className="h-full w-full object-cover" loading="lazy" draggable={false} />
          </div>
        ))}
      </div>
      <p className="mt-6 max-w-[900px] text-[12px] leading-[1.5] text-[#5A6866]" style={BODY}>
        {OUTCOME.credit}
      </p>
    </section>
  );
}

function MoreProjects() {
  return (
    <section className="mx-auto w-full max-w-[1036px] px-6 pb-[90px] pt-[90px] lg:px-0">
      <div className="flex items-center justify-between">
        <p className="text-[12px] tracking-[1.2px] text-[#5A6866]" style={BODY}>
          MORE PROJECTS
        </p>
        <Link href="/projects" className="border-b border-[#172422] pb-[2px] text-[14px] font-semibold text-[#172422]" style={BODY}>
          All work
        </Link>
      </div>
      <div className="mt-[28px] grid gap-4 md:grid-cols-2">
        {NEIGHBORS.map((n) => (
          <Link
            key={n.title}
            href={n.href}
            className="group flex items-center gap-[20px] rounded-[18px] bg-white p-[14px] transition-transform motion-safe:group-hover:-translate-y-[2px]"
          >
            <span
              className="flex h-[110px] w-[150px] shrink-0 items-end rounded-[12px] p-[8px]"
              style={{ background: n.thumbBg }}
            >
              <span className="text-[11px]" style={{ ...BODY, color: n.thumbFg }}>
                [Thumbnail]
              </span>
            </span>
            <span className="min-w-0">
              <span className="block text-[12px] text-[#5A6866]" style={BODY}>
                {n.direction}
              </span>
              <span className="mt-[6px] block text-[22px] font-semibold leading-[1.2] text-[#172422]" style={DISPLAY}>
                {n.title}
              </span>
              <span className="mt-[6px] block truncate text-[14px] text-[#5A6866]" style={BODY}>
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
          <p className="text-[32px] font-semibold text-[#EEF4F3]" style={DISPLAY}>
            Let&apos;s talk.
          </p>
          <a
            href="mailto:nmayacharya@gmail.com"
            className="mt-[10px] inline-block border-b border-[#3A5552] pb-[2px] text-[16px] text-[#BFD0CD] transition-opacity hover:opacity-80"
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
              className="text-[14px] text-[#EEF4F3] transition-opacity hover:opacity-80"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
}

/* ---------------------------------- page ----------------------------------- */

export default function JoyCase() {
  return (
    <main style={{ background: PAPER }}>
      <Nav />
      <Hero />
      <Facts />
      <BriefChallenge />
      <MyRole />
      <DesignApproach />
      <Philosophy />
      <Islands />
      <Outcome />
      <MoreProjects />
      <Footer />
    </main>
  );
}
