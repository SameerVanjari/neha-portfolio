"use client";

import Link from "next/link";
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
      <div className="max-w-[620px]">
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
}: {
  src: string;
  alt: string;
  className?: string;
  imgClass?: string;
}) {
  return (
    <div className={`overflow-hidden ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt} className={`h-full w-full ${imgClass}`} loading="lazy" draggable={false} />
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
  return (
    <div className="flex flex-col gap-3">
      {notes.map((item) => (
        <article
          key={item.title}
          className="flex items-start gap-[14px] rounded-[14px] px-[18px] py-4"
          style={{ background: dark ? NOTE_CARD : "#FFFFFF" }}
        >
          <span
            className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[13px] font-bold text-white"
            style={{ ...BODY, background: TEAL }}
          >
            {item.num}
          </span>
          <div>
            <p className="text-[16px] font-semibold" style={{ ...BODY, color: dark ? "#EEF6F7" : INK }}>
              {item.title}
            </p>
            <p
              className="mt-[2px] text-[14px] leading-[1.5]"
              style={{ ...BODY, color: dark ? "#B0C3CC" : MUTED }}
            >
              {item.body}
            </p>
          </div>
        </article>
      ))}
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
          <Link href="/projects" className="border-b border-[#0F1B26] pb-[3px] text-[14px]" style={{ color: INK }}>
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
        className="pointer-events-none absolute right-[-60px] top-[10px] size-[680px] rounded-full opacity-70"
        style={{
          background:
            "radial-gradient(circle, rgba(30,107,135,0.6) 0%, rgba(30,107,135,0.2) 38%, rgba(13,27,42,0) 70%)",
        }}
      />
      <div className="relative mx-auto grid w-full max-w-[1036px] items-center gap-10 px-6 py-[70px] lg:grid-cols-[1fr_520px] lg:px-0 lg:py-[105px]">
        <div className="max-w-[560px]">
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
          <div className="mt-[36px] border-l-[3px] pl-4" style={{ borderColor: ICE }}>
            <p className="text-[16px] text-[#C2D3DA]" style={BODY}>
              <span className="font-semibold text-[#EEF6F7]">{HERO.role}</span>
              {HERO.roleAgency}
            </p>
            <p className="mt-[2px] text-[14px] text-[#8FA5B1]" style={BODY}>
              {HERO.roleNote}
            </p>
          </div>
          <a
            href="#sweepstakes"
            className="mt-[36px] inline-flex h-[46px] items-center rounded-[999px] bg-[#F4F6F4] px-[22px] text-[15px] font-semibold text-[#18201B]"
            style={BODY}
          >
            {HERO.cta}
          </a>
        </div>
        <Shot
          src={HERO.image.src}
          alt={HERO.image.alt}
          className="mx-auto aspect-square w-full max-w-[520px] rounded-[24px] bg-white shadow-[0px_24px_50px_0px_rgba(0,0,0,0.35)]"
        />
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
                <p className="text-[11px] tracking-[0.44px] text-[#8FA5B1]" style={BODY}>
                  {fact.label}
                </p>
                <p className="mt-[2px] text-[15px] font-semibold leading-[1.5] text-[#EEF6F7]" style={BODY}>
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

function Background() {
  return (
    <section className="mx-auto w-full max-w-[1036px] px-6 pt-[96px] lg:px-0">
      <SectionHead eyebrow={BACKGROUND.eyebrow} heading={BACKGROUND.heading} note={BACKGROUND.note} />
      <div className="grid items-start gap-6 lg:grid-cols-[1fr_272px]">
        <div className="flex flex-col gap-4">
          <div className="grid gap-[14px] sm:grid-cols-3">
            {BACKGROUND.stats.map((stat) => (
              <div
                key={stat.num}
                className="rounded-[18px] px-[22px] pb-6 pt-[22px]"
                style={{ background: stat.tone === "teal" ? TEAL : DARK }}
              >
                <p className="text-[36px] font-bold leading-none text-[#EEF6F7]" style={DISPLAY}>
                  {stat.num}
                </p>
                <p className="mt-3 text-[14px] leading-[1.5] text-[#D3E6EB]" style={BODY}>
                  {stat.body}
                </p>
              </div>
            ))}
          </div>
          {BACKGROUND.cards.map((card) => (
            <article key={card.title} className="flex items-start gap-4 rounded-[18px] bg-white px-[22px] pb-[22px] pt-5">
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
  return (
    <section className="mx-auto w-full max-w-[1036px] px-6 pt-[96px] lg:px-0">
      <SectionHead eyebrow={ROLE.eyebrow} heading={ROLE.heading} note={ROLE.note} />
      <div className="relative">
        <div aria-hidden className="absolute left-[10%] right-[10%] top-[28px] hidden h-px lg:block" style={{ background: ICE }} />
        <ol className="relative grid grid-cols-2 gap-x-4 gap-y-10 lg:grid-cols-5">
          {ROLE.steps.map((step) => (
            <li key={step.title} className="flex flex-col items-center gap-1 text-center">
              <span className="flex h-[56px] w-[56px] items-center justify-center rounded-[999px]" style={{ background: TEAL }}>
                <Icon name={step.icon} size={20} />
              </span>
              <p className="mt-[10px] text-[15px] font-semibold" style={{ ...DISPLAY, color: INK }}>
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
        {ROLE.tiles.map((tile) => (
          <div
            key={tile.num}
            className="rounded-[18px] px-[22px] pb-6 pt-[22px]"
            style={{ background: tile.tone === "teal" ? TEAL : DARK }}
          >
            <p className="text-[30px] font-semibold leading-[1.1] text-[#EEF6F7]" style={DISPLAY}>
              {tile.num}
            </p>
            <p className="mt-3 text-[14px] leading-[1.5] text-[#D3E6EB]" style={BODY}>
              {tile.body}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

function PixelArt() {
  return (
    <section className="mx-auto w-full max-w-[1036px] px-6 pt-[96px] lg:px-0">
      <SectionHead eyebrow={PIXEL.eyebrow} heading={PIXEL.heading} note={PIXEL.note} />
      <div className="grid items-center gap-6 lg:grid-cols-[1fr_352px]">
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
      </div>
    </section>
  );
}

function Depth() {
  return (
    <section className="mx-auto w-full max-w-[1036px] px-6 pt-[96px] lg:px-0">
      <SectionHead eyebrow={DEPTH.eyebrow} heading={DEPTH.heading} note={DEPTH.note} />
      <div className="grid items-start gap-4 lg:grid-cols-[1fr_320px]">
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
      </div>
      <p className="mt-7 text-[11px] font-bold uppercase tracking-[1.32px]" style={{ ...BODY, color: TEAL }}>
        {DEPTH.coinEyebrow}
      </p>
      <div className="mt-[14px] grid grid-cols-3 gap-3 sm:grid-cols-6">
        {DEPTH.coins.map((coin) => (
          <Shot
            key={coin.src}
            src={coin.src}
            alt={coin.alt}
            className="aspect-[162/332] w-full rounded-[14px] border border-[#DCE6E8] bg-white"
            imgClass="object-cover"
          />
        ))}
      </div>
    </section>
  );
}

function Gameplay() {
  return (
    <section className="mx-auto w-full max-w-[1036px] px-6 pt-[96px] lg:px-0">
      <SectionHead eyebrow={GAMEPLAY.eyebrow} heading={GAMEPLAY.heading} note={GAMEPLAY.note} />
      <div className="grid items-center gap-6 lg:grid-cols-[260px_200px_1fr]">
        {GAMEPLAY.phones.map((phone) => (
          <figure key={phone.note}>
            <Shot
              src={phone.src}
              alt={phone.alt}
              className="aspect-[260/398] w-full rounded-[16px] bg-white"
              imgClass="object-cover"
            />
            <figcaption className="mt-[10px] text-[13px] leading-[1.5]" style={{ ...BODY, color: MUTED }}>
              {phone.caption}
            </figcaption>
          </figure>
        ))}
        <NumNotes notes={GAMEPLAY.notes} />
      </div>
    </section>
  );
}

function Sweepstakes() {
  return (
    <section id="sweepstakes" className="mt-[96px]" style={{ background: DARK }}>
      <div className="mx-auto w-full max-w-[1036px] px-6 py-[96px] lg:px-0">
        <SectionHead eyebrow={SWEEPSTAKES.eyebrow} heading={SWEEPSTAKES.heading} note={SWEEPSTAKES.note} dark />
        <div className="grid items-center gap-8 lg:grid-cols-[420px_1fr]">
          <Shot
            src={SWEEPSTAKES.image.src}
            alt={SWEEPSTAKES.image.alt}
            className="mx-auto aspect-[420/642] w-full max-w-[420px] rounded-[20px] bg-white"
            imgClass="object-cover"
          />
          <NumNotes notes={SWEEPSTAKES.notes} dark />
        </div>
      </div>
    </section>
  );
}

function Results() {
  return (
    <section className="mx-auto w-full max-w-[1036px] px-6 pt-[96px] lg:px-0">
      <SectionHead eyebrow={RESULTS.eyebrow} heading={RESULTS.heading} note={RESULTS.note} />
      <div className="grid gap-4 md:grid-cols-2">
        {RESULTS.wins.map((win) => (
          <Shot
            key={win.src}
            src={win.src}
            alt={win.alt}
            className="aspect-[510/400] w-full rounded-[16px] bg-white"
            imgClass="object-cover"
          />
        ))}
      </div>
      <p className="mt-[10px] text-[13px] leading-[1.5]" style={{ ...BODY, color: MUTED }}>
        {RESULTS.caption}
      </p>
      <div className="mt-6 grid gap-[14px] md:grid-cols-3">
        {RESULTS.impact.map((card) => (
          <div
            key={card.num}
            className="rounded-[18px] px-6 pb-[26px] pt-6"
            style={{ background: card.tone === "teal" ? TEAL : DARK }}
          >
            <p className="text-[34px] font-semibold leading-[1.05] text-[#EEF6F7]" style={DISPLAY}>
              {card.num}
            </p>
            <p className="mt-3 text-[14px] leading-[1.5] text-[#D3E6EB]" style={BODY}>
              {card.body}
            </p>
          </div>
        ))}
      </div>
      <p className="mt-[22px] text-[12px] leading-[1.5]" style={{ ...BODY, color: MUTED }}>
        {RESULTS.credit}
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
          <p className="text-[32px] font-semibold text-[#EEF6F7]" style={DISPLAY}>
            Let&apos;s talk.
          </p>
          <a
            href="mailto:nmayacharya@gmail.com"
            className="mt-[10px] inline-block border-b border-[#3A5552] pb-[2px] text-[16px] text-[#C2D3DA] transition-opacity hover:opacity-80"
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
              className="text-[14px] text-[#EEF6F7] transition-opacity hover:opacity-80"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
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
