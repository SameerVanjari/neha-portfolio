"use client";

import Link from "next/link";
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
const FINISH_PANEL = "#E9E4DC";

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
      </div>
      {note && (
        <p
          className="max-w-[340px] text-right text-[14px] leading-[1.5]"
          style={{ ...BODY, color: dark ? "#AFC3C2" : MUTED }}
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

function DropZone({
  note,
  className = "",
  play,
  tone = "dark",
}: {
  note: string;
  className?: string;
  play?: boolean;
  tone?: "dark" | "sand";
}) {
  const sand = tone === "sand";
  return (
    <div
      aria-label={`Media placeholder: ${note}`}
      className={`relative flex flex-col items-center justify-center overflow-hidden ${className}`}
      style={{ background: sand ? FINISH_PANEL : PANEL }}
    >
      {play && <Icon name="icon-play-sm" size={22} />}
      <span
        className="mt-1 px-2 text-center text-[9px] leading-[1.4]"
        style={{ ...BODY, color: sand ? MUTED : PALE }}
      >
        {play ? "Drop video" : "Drop image"}
        <br />
        {note}
      </span>
    </div>
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
      <div
        aria-hidden
        className="pointer-events-none absolute right-[-60px] top-[10px] size-[700px] rounded-full opacity-70"
        style={{
          background:
            "radial-gradient(circle, rgba(217,119,74,0.5) 0%, rgba(217,119,74,0.16) 38%, rgba(16,39,43,0) 70%)",
        }}
      />
      <div className="relative mx-auto grid w-full max-w-[1036px] items-center gap-10 px-6 py-[70px] lg:grid-cols-[1fr_450px] lg:px-0 lg:py-[88px]">
        <div className="max-w-[560px]">
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
        </div>
        <div className="relative mx-auto hidden h-[600px] w-full max-w-[450px] sm:block lg:mx-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={HERO.shells.src}
            alt={HERO.shells.alt}
            draggable={false}
            className="absolute left-[165px] top-[62px] h-[489px] w-[220px] max-w-none select-none"
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={HERO.video.src}
            alt={HERO.video.alt}
            draggable={false}
            className="absolute left-0 top-0 z-10 h-[556px] w-[260px] max-w-none select-none"
          />
        </div>
        <div className="mx-auto w-[250px] sm:hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={HERO.video.src} alt={HERO.video.alt} draggable={false} className="h-auto w-full select-none" />
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
      <SectionHead eyebrow={BRIEF.eyebrow} heading={BRIEF.heading} note={BRIEF.note} />
      <div className="grid gap-4 md:grid-cols-3">
        {BRIEF.cards.map((card) => (
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
    </section>
  );
}

function Journey() {
  return (
    <section id="journey" className="mx-auto w-full max-w-[1036px] scroll-mt-6 px-6 pt-[96px] lg:px-0">
      <SectionHead eyebrow={JOURNEY.eyebrow} heading={JOURNEY.heading} />
      <ol className="grid grid-cols-2 gap-x-3 gap-y-8 sm:grid-cols-3 lg:grid-cols-6">
        {JOURNEY.steps.map((step, i) => (
          <li key={step.note}>
            <DropZone note={step.note} className="aspect-[163/361] rounded-[18px]" />
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
          </li>
        ))}
      </ol>
    </section>
  );
}

function Testing() {
  return (
    <section className="mx-auto w-full max-w-[1036px] px-6 pt-[96px] lg:px-0">
      <SectionHead eyebrow={TESTING.eyebrow} heading={TESTING.heading} note={TESTING.note} />
      <div className="flex flex-col gap-3 pt-2">
        <GroupHead title={TESTING.scale.title} sub={TESTING.scale.sub} />
        <div className="grid grid-cols-2 gap-[14px] lg:grid-cols-4">
          {TESTING.scale.captures.map((cap) => (
            <figure key={cap.note}>
              <DropZone note={cap.note} className="aspect-[248.5/552] rounded-[16px]" />
              <figcaption className="mt-[6px] text-[14px] font-semibold" style={{ ...BODY, color: INK }}>
                {cap.title}
              </figcaption>
              <p className="text-[12px] leading-[1.4]" style={{ ...BODY, color: MUTED }}>
                {cap.body}
              </p>
            </figure>
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-3 pt-9">
        <GroupHead title={TESTING.integrity.title} sub={TESTING.integrity.sub} />
        <div className="grid grid-cols-2 gap-[14px] sm:grid-cols-3 lg:grid-cols-5">
          {TESTING.integrity.captures.map((cap) => (
            <figure key={cap.note}>
              <DropZone note={cap.note} play={cap.video} className="aspect-[196/435] rounded-[16px]" />
              <figcaption className="mt-[6px] text-[14px] font-semibold" style={{ ...BODY, color: INK }}>
                {cap.title}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-3 pt-9">
        <GroupHead title={TESTING.sound.title} sub={TESTING.sound.sub} />
        <div className="grid gap-[14px] md:grid-cols-3">
          {TESTING.sound.captures.map((cap) => (
            <figure key={cap.note}>
              <DropZone note={cap.note} play className="aspect-[336/300] rounded-[16px]" />
              <figcaption className="mt-[6px] text-[14px] font-semibold" style={{ ...BODY, color: INK }}>
                {cap.title}
              </figcaption>
              {cap.body && (
                <p className="text-[12px] leading-[1.4]" style={{ ...BODY, color: MUTED }}>
                  {cap.body}
                </p>
              )}
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function Builds() {
  return (
    <section className="mx-auto w-full max-w-[1036px] px-6 pt-[96px] lg:px-0">
      <SectionHead eyebrow={BUILDS.eyebrow} heading={BUILDS.heading} note={BUILDS.note} />
      <div className="grid gap-6 md:grid-cols-3">
        {BUILDS.cards.map((card) => (
          <article key={card.note} className="flex items-start gap-4 rounded-[18px] bg-white p-4">
            <DropZone note={card.note} className="h-[267px] w-[120px] shrink-0 rounded-[14px]" />
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
          </article>
        ))}
      </div>
    </section>
  );
}

function Craft() {
  return (
    <section className="mt-[96px]" style={{ background: DARK }}>
      <div className="mx-auto w-full max-w-[1036px] px-6 py-[96px] lg:px-0">
        <SectionHead eyebrow={CRAFT.eyebrow} heading={CRAFT.heading} dark />
        <div className="grid gap-4 md:grid-cols-2">
          {CRAFT.cards.map((card) => (
            <article key={card.title} className="rounded-[20px] px-7 pb-[30px] pt-7" style={{ background: CRAFT_CARD }}>
              <span className="flex h-[72px] w-[72px] items-center justify-center rounded-[16px]" style={{ background: PANEL }}>
                <Icon name={card.icon} size={32} />
              </span>
              <h3 className="mt-3 text-[22px] font-semibold leading-[1.5] text-[#F2F6F5]" style={DISPLAY}>
                {card.title}
              </h3>
              <p className="mt-2 text-[15px] leading-[1.55] text-[#AFC3C2]" style={BODY}>
                {card.body}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Finished() {
  return (
    <section className="mx-auto w-full max-w-[1036px] px-6 pt-[96px] lg:px-0">
      <SectionHead eyebrow={FINISHED.eyebrow} heading={FINISHED.heading} note={FINISHED.note} />
      <div className="grid items-start gap-4 lg:grid-cols-[1fr_320px]">
        <figure>
          <DropZone note={FINISHED.wide.note} tone="sand" className="aspect-[700/566] rounded-[18px]" />
          <figcaption className="mt-[10px] text-[13px] leading-[1.5]" style={{ ...BODY, color: MUTED }}>
            {FINISHED.wide.caption}
          </figcaption>
        </figure>
        <figure>
          <DropZone note={FINISHED.walkthrough.note} play className="aspect-[320/566] rounded-[28px]" />
          <figcaption className="mt-[10px] text-[13px] leading-[1.5]" style={{ ...BODY, color: MUTED }}>
            {FINISHED.walkthrough.caption}
          </figcaption>
        </figure>
      </div>
    </section>
  );
}

function Contributions() {
  return (
    <section className="mx-auto w-full max-w-[1036px] px-6 pt-[96px] lg:px-0">
      <SectionHead eyebrow={CONTRIBUTIONS.eyebrow} heading={CONTRIBUTIONS.heading} />
      <div className="flex flex-col gap-[14px]">
        {CONTRIBUTIONS.rows.map((row, r) => (
          <div key={r} className="grid gap-[14px] md:grid-cols-3">
            {row.map((item) => (
              <div
                key={item.title}
                className="flex items-center gap-[14px] rounded-[16px] px-5 py-[18px]"
                style={{ background: item.lead ? ACCENT : "#FFFFFF" }}
              >
                <span
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[12px]"
                  style={{ background: item.lead ? "rgba(255,255,255,0.2)" : TILE }}
                >
                  <Icon name={item.icon} size={20} />
                </span>
                <p
                  className="text-[15px] font-semibold leading-[1.5]"
                  style={{ ...BODY, color: item.lead ? "#FFFFFF" : INK }}
                >
                  {item.title}
                </p>
              </div>
            ))}
          </div>
        ))}
      </div>
      <p className="mt-[22px] text-[12px] leading-[1.5]" style={{ ...BODY, color: MUTED }}>
        {CONTRIBUTIONS.credit}
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
