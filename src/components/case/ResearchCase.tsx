"use client";

import Link from "next/link";
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
      </div>
      {note && (
        <p
          className="max-w-[340px] text-right text-[14px] leading-[1.5]"
          style={{ ...BODY, color: dark ? "#AFBDD6" : MUTED }}
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
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  return (
    <div className={`overflow-hidden ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt} className="h-full w-full object-cover" loading="lazy" draggable={false} />
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
          <Link href="/projects" className="border-b border-[#14203A] pb-[3px] text-[14px]" style={{ color: INK }}>
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
        className="pointer-events-none absolute right-[-60px] top-[-30px] size-[760px] rounded-full opacity-70"
        style={{
          background:
            "radial-gradient(circle, rgba(0,85,255,0.5) 0%, rgba(0,85,255,0.16) 38%, rgba(11,23,51,0) 70%)",
        }}
      />
      <div className="relative mx-auto grid w-full max-w-[1036px] items-center gap-10 px-6 py-[70px] lg:grid-cols-[520px_1fr] lg:px-0 lg:py-[120px]">
        <div className="max-w-[520px]">
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
          <div className="mt-[36px] border-l-[3px] pl-4" style={{ borderColor: SUN }}>
            <p className="text-[16px] text-[#C3D2EC]" style={BODY}>
              <span className="font-semibold text-[#F1F7FF]">{HERO.role}</span>
              {HERO.roleOrg}
            </p>
            <p className="mt-[2px] text-[14px] text-[#8C9BB8]" style={BODY}>
              {HERO.roleNote}
            </p>
          </div>
          <a
            href="#final"
            className="mt-[36px] inline-flex h-[46px] items-center rounded-[999px] px-[22px] text-[15px] font-semibold"
            style={{ ...BODY, background: SUN, color: INK }}
          >
            {HERO.cta}
          </a>
        </div>
        <div className="overflow-hidden rounded-[14px] bg-white shadow-[0px_24px_50px_0px_rgba(0,0,0,0.45)]">
          <div className="flex items-center gap-[7px] bg-[#E9EEF6] py-[11px] pl-[14px]" aria-hidden>
            <span className="size-[11px] rounded-full bg-[#FF5F57]" />
            <span className="size-[11px] rounded-full bg-[#FEBC2E]" />
            <span className="size-[11px] rounded-full bg-[#28C840]" />
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={HERO.browser.src} alt={HERO.browser.alt} className="aspect-[640/306] w-full object-cover object-top" draggable={false} />
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
                <p className="text-[11px] tracking-[0.44px] text-[#8C9BB8]" style={BODY}>
                  {fact.label}
                </p>
                <p className="mt-[2px] text-[15px] font-semibold leading-[1.5] text-[#F1F7FF]" style={BODY}>
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

function Problem() {
  return (
    <section className="mx-auto w-full max-w-[1036px] px-6 pt-[96px] lg:px-0">
      <SectionHead eyebrow={PROBLEM.eyebrow} heading={PROBLEM.heading} />
      <div className="grid items-start gap-4 lg:grid-cols-[420px_1fr]">
        <article className="rounded-[18px] p-[30px]" style={{ background: BLUE }}>
          <p className="text-[11px] font-bold tracking-[1.1px]" style={{ ...BODY, color: SUN }}>
            {PROBLEM.quoteLabel}
          </p>
          <p className="mt-[14px] text-[22px] font-medium leading-[1.4] text-white" style={BODY}>
            {PROBLEM.quote}
          </p>
        </article>
        <div className="flex flex-col gap-3">
          {PROBLEM.pains.map((pain) => (
            <article key={pain.title} className="flex items-center gap-4 rounded-[16px] bg-white px-5 py-[18px]">
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
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Goals() {
  return (
    <section className="mx-auto w-full max-w-[1036px] px-6 pt-[96px] lg:px-0">
      <SectionHead eyebrow={GOALS.eyebrow} heading={GOALS.heading} />
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {GOALS.cards.map((card) => (
          <article
            key={card.title}
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
          </article>
        ))}
      </div>
      <p className="mt-5 text-[11px] font-bold uppercase tracking-[1.32px]" style={{ ...BODY, color: BLUE }}>
        {GOALS.usersLabel}
      </p>
      <div className="mt-3 flex flex-wrap gap-3">
        {GOALS.users.map((user) => (
          <span
            key={user}
            className="inline-flex items-center gap-[10px] rounded-full py-[10px] pl-4 pr-[18px] text-[14px] font-semibold"
            style={{ ...BODY, background: TILE, color: BLUE }}
          >
            <Icon name="icon-users-sm" size={18} />
            {user}
          </span>
        ))}
      </div>
    </section>
  );
}

function Flow() {
  return (
    <section className="mx-auto w-full max-w-[1036px] px-6 pt-[96px] lg:px-0">
      <SectionHead eyebrow={FLOW.eyebrow} heading={FLOW.heading} />
      <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {FLOW.steps.map((step, i) => (
          <li
            key={step.num}
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
          </li>
        ))}
      </ol>
    </section>
  );
}

function IAFrames() {
  return (
    <section className="mx-auto w-full max-w-[1036px] px-6 pt-[96px] lg:px-0">
      <SectionHead eyebrow={IA.eyebrow} heading={IA.heading} note={IA.note} />
      <div className="grid gap-4 md:grid-cols-2">
        {IA.frames.map((frame) => (
          <figure key={frame.note}>
            <Shot src={frame.src} alt={frame.alt} className="aspect-[510/550] rounded-[14px]" />
            <figcaption className="mt-[10px] text-[13px] leading-[1.5]" style={{ ...BODY, color: MUTED }}>
              {frame.caption}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

function DesignSystem() {
  return (
    <section className="mx-auto w-full max-w-[1036px] px-6 pt-[96px] lg:px-0">
      <SectionHead eyebrow={SYSTEM.eyebrow} heading={SYSTEM.heading} />
      <div className="grid grid-cols-4 gap-[10px] sm:grid-cols-8">
        {SYSTEM.palette.map((swatch) => (
          <div key={swatch.hex}>
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
          </div>
        ))}
      </div>
      <div className="mt-5 grid gap-4 md:grid-cols-2">
        {SYSTEM.type.map((face) => (
          <div key={face.face} className="rounded-[18px] bg-white p-[26px]">
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
          </div>
        ))}
      </div>
    </section>
  );
}

function UnderHood() {
  return (
    <section className="mt-[96px]" style={{ background: DARK }}>
      <div className="mx-auto w-full max-w-[1036px] px-6 py-[96px] lg:px-0">
        <SectionHead eyebrow={HOOD.eyebrow} heading={HOOD.heading} note={HOOD.note} dark />
        <div className="flex flex-col items-stretch gap-[6px] lg:flex-row lg:items-center">
          {HOOD.pipeline.map((item, i) =>
            "arrow" in item ? (
              <span key={`arrow-${i}`} className="hidden h-6 w-6 shrink-0 items-center justify-center lg:flex">
                <Icon name="icon-arrow" size={18} />
              </span>
            ) : (
              <article
                key={item.num}
                className="min-w-0 rounded-[14px] px-[14px] py-4 lg:flex-1"
                style={{ background: "hot" in item && item.hot ? BLUE : PIPE }}
              >
                <p className="text-[12px] font-bold" style={{ ...BODY, color: SUN }}>
                  {item.num}
                </p>
                <p className="mt-1 text-[14px] font-semibold leading-[1.4] text-[#F1F7FF]" style={BODY}>
                  {item.title}
                </p>
              </article>
            ),
          )}
        </div>
        <div className="mt-7 grid gap-4 md:grid-cols-2">
          {HOOD.models.map((model) => (
            <figure key={model.note}>
              <Shot src={model.src} alt={model.alt} className="aspect-[510/290] rounded-[14px]" />
              <figcaption className="mt-[10px] text-[13px] leading-[1.5] text-[#AFBDD6]" style={BODY}>
                {model.caption}
              </figcaption>
            </figure>
          ))}
        </div>
        <div className="mt-5 grid gap-4 sm:grid-cols-3">
          {HOOD.data.map((shot) => (
            <figure key={shot.note}>
              <Shot src={shot.src} alt={shot.alt} className="aspect-[335/220] rounded-[14px]" />
              <figcaption className="mt-[10px] text-[13px] leading-[1.5] text-[#AFBDD6]" style={BODY}>
                {shot.caption}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function Notes() {
  return (
    <section className="mx-auto w-full max-w-[1036px] px-6 pt-[96px] lg:px-0">
      <SectionHead eyebrow={NOTES.eyebrow} heading={NOTES.heading} note={NOTES.note} />
      <div className="grid gap-4 md:grid-cols-3">
        {NOTES.frames.map((frame) => (
          <figure key={frame.note}>
            <Shot src={frame.src} alt={frame.alt} className="aspect-[335/200] rounded-[14px]" />
            <figcaption className="mt-[10px] text-[13px] leading-[1.5]" style={{ ...BODY, color: MUTED }}>
              {frame.caption}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

function Iterations() {
  return (
    <section id="final" className="mx-auto w-full max-w-[1036px] scroll-mt-6 px-6 pt-[96px] lg:px-0">
      <SectionHead eyebrow={ITERATIONS.eyebrow} heading={ITERATIONS.heading} />
      <ol className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {ITERATIONS.steps.map((step, i) => (
          <li key={step.note}>
            <Shot src={step.src} alt={step.alt} className="aspect-[198/95] rounded-[10px] border border-[#DDE5F2]" />
            <p className="mt-2 flex items-start gap-[6px]">
              <span className="text-[12px] font-bold" style={{ ...BODY, color: BLUE }}>
                {i + 1}
              </span>
              <span className="text-[13px] font-medium leading-[1.5]" style={{ ...BODY, color: INK }}>
                {step.caption}
              </span>
            </p>
          </li>
        ))}
      </ol>
      <figure className="mt-6 pt-6">
        <Shot
          src={ITERATIONS.final.src}
          alt={ITERATIONS.final.alt}
          className="aspect-[1036/491] w-full rounded-[16px] border border-[#DDE5F2]"
        />
        <figcaption className="mt-[10px] text-[13px] leading-[1.5]" style={{ ...BODY, color: MUTED }}>
          {ITERATIONS.final.caption}
        </figcaption>
      </figure>
    </section>
  );
}

function Closing() {
  return (
    <section className="mx-auto w-full max-w-[1036px] px-6 pt-[96px] lg:px-0">
      <blockquote className="rounded-[18px] bg-white px-10 py-9">
        <p className="max-w-[956px] text-[24px] font-medium leading-[1.4] md:text-[28px]" style={{ ...DISPLAY, color: INK }}>
          {CLOSING.statement}
        </p>
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
      <p className="mt-[22px] text-[12px] leading-[1.5]" style={{ ...BODY, color: MUTED }}>
        {CLOSING.credit}
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
          <p className="text-[32px] font-semibold text-[#F1F7FF]" style={DISPLAY}>
            Let&apos;s talk.
          </p>
          <a
            href="mailto:nmayacharya@gmail.com"
            className="mt-[10px] inline-block border-b border-[#3A5552] pb-[2px] text-[16px] text-[#C3D2EC] transition-opacity hover:opacity-80"
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
              className="text-[14px] text-[#F1F7FF] transition-opacity hover:opacity-80"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
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
