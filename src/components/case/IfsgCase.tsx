"use client";

import Link from "next/link";
import {
  AR,
  CONTRIBUTIONS,
  DASHBOARD,
  FACTS,
  HERO,
  INTERACTIONS,
  NEIGHBORS,
  STORYBOARD,
  TOOLS,
} from "@/data/ifsg";
import { FOOTER_LINKS } from "@/data/landing";

const DARK = "#141210";
const FAINT_DARK = "#0E0C0A";
const GOLD = "#A8823A";
const PALE = "#E3C27A";
const TILE = "#F3EAD6";
const PAPER = "#F6F4EF";
const INK = "#1C1A17";
const MUTED = "#655F55";
const PANEL = "#2C2823";
const PHONE_PANEL = "#EAE5DB";
const HAIR = "#2A2620";
const INTERACT_CARD = "#1F1C18";
const DIVIDER = "#E4DED2";

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
          style={{ ...BODY, color: dark ? PALE : GOLD }}
        >
          {eyebrow}
        </p>
        <h2
          className="mt-[14px] text-[30px] leading-[1.15] tracking-[-0.38px] md:text-[38px]"
          style={{ ...DISPLAY, color: dark ? "#F5F1E8" : INK }}
        >
          {heading}
        </h2>
      </div>
      {note && (
        <p
          className="max-w-[340px] text-right text-[14px] leading-[1.5]"
          style={{ ...BODY, color: dark ? "#B9AF9D" : MUTED }}
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
      src={`/case/ifsg/${name}.svg`}
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
  label = "Drop image",
  className = "",
  tone = "dark",
}: {
  note: string;
  label?: string;
  className?: string;
  tone?: "dark" | "sand";
}) {
  const sand = tone === "sand";
  return (
    <div
      aria-label={`Media placeholder: ${note}`}
      className={`flex flex-col items-center justify-center overflow-hidden ${className}`}
      style={{ background: sand ? PHONE_PANEL : PANEL }}
    >
      <span
        className="px-2 text-center text-[9px] leading-[1.4]"
        style={{ ...BODY, color: sand ? MUTED : PALE }}
      >
        {label}
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
          <Link href="/projects" className="border-b border-[#1C1A17] pb-[3px] text-[14px]" style={{ color: INK }}>
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
      <video
        className="absolute inset-0 h-full w-full object-cover"
        src={HERO.video.src}
        poster={HERO.video.poster}
        muted
        loop
        playsInline
        autoPlay
        preload="metadata"
        aria-label="IFSG virtual store walkthrough"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(90deg, rgba(20,18,16,0.95) 0%, rgba(20,18,16,0.65) 55%, rgba(20,18,16,0.05) 100%)",
        }}
      />
      <div className="relative mx-auto w-full max-w-[1036px] px-6 py-[70px] md:py-[110px] lg:px-0">
        <div className="max-w-[580px]">
          <p className="text-[13px] font-semibold" style={{ ...BODY, color: PALE }}>
            <span className="text-white">{HERO.eyebrowLead}</span>
            {HERO.eyebrowRest}
          </p>
          <h1
            className="mt-[18px] text-[clamp(40px,5vw,62px)] font-semibold leading-[1.04] tracking-[-0.02em] text-[#F5F1E8]"
            style={DISPLAY}
          >
            {HERO.title}
          </h1>
          <p className="mt-[18px] max-w-[540px] text-[19px] leading-[1.5] text-[#CFC6B5]" style={BODY}>
            {HERO.subtitle}
          </p>
          <div className="mt-[36px] border-l-[3px] pl-4" style={{ borderColor: PALE }}>
            <p className="text-[16px] font-semibold text-[#F5F1E8]" style={BODY}>
              {HERO.role}
            </p>
            <p className="mt-[2px] text-[14px] text-[#9C9282]" style={BODY}>
              {HERO.roleNote}
            </p>
          </div>
          <a
            href="#storyboard"
            className="mt-[36px] inline-flex h-[46px] items-center rounded-[999px] px-[22px] text-[15px] font-semibold"
            style={{ ...BODY, background: PAPER, color: INK }}
          >
            {HERO.cta}
          </a>
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
                <p className="text-[11px] tracking-[0.44px] text-[#9C9282]" style={BODY}>
                  {fact.label}
                </p>
                <p className="mt-[2px] text-[15px] font-semibold leading-[1.5] text-[#F5F1E8]" style={BODY}>
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

function Contributions() {
  const { lead } = CONTRIBUTIONS;
  return (
    <section className="mx-auto w-full max-w-[1036px] px-6 pt-[96px] lg:px-0">
      <SectionHead
        eyebrow={CONTRIBUTIONS.eyebrow}
        heading={CONTRIBUTIONS.heading}
        note={CONTRIBUTIONS.note}
      />
      <div className="grid gap-4 md:grid-cols-3">
        <article className="rounded-[18px] px-6 pb-[26px] pt-6" style={{ background: DARK }}>
          <span className="flex h-[46px] w-[46px] items-center justify-center rounded-[12px]" style={{ background: PANEL }}>
            <Icon name={lead.icon} size={20} />
          </span>
          <h3 className="mt-[18px] text-[18px] font-semibold leading-[1.5] text-[#F5F1E8]" style={DISPLAY}>
            {lead.title}
          </h3>
          <p className="mt-2 text-[14px] leading-[1.5] text-[#B9AF9D]" style={BODY}>
            {lead.body}
          </p>
        </article>
        {CONTRIBUTIONS.cards.slice(0, 2).map((card) => (
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
      <div className="mt-4 grid gap-4 md:grid-cols-3">
        {CONTRIBUTIONS.cards.slice(2).map((card) => (
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

function Dashboard() {
  return (
    <section className="mx-auto w-full max-w-[1036px] px-6 pt-[96px] lg:px-0">
      <SectionHead eyebrow={DASHBOARD.eyebrow} heading={DASHBOARD.heading} note={DASHBOARD.note} />
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {DASHBOARD.items.map((item) => (
          <div key={item.note} className="flex flex-col items-center gap-2 rounded-[18px] px-[14px] py-[18px] text-center" style={{ background: DARK }}>
            <div className="size-[100px] shrink-0 overflow-hidden rounded-full" style={{ background: PANEL }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={item.img} alt={item.title} className="h-full w-full object-cover" loading="lazy" draggable={false} />
            </div>
            <p className="mt-1 text-[15px] font-semibold text-[#F5F1E8]" style={BODY}>
              {item.title}
            </p>
            <p className="text-[12px] leading-[1.4] text-[#B9AF9D]" style={BODY}>
              {item.body}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Storyboard() {
  return (
    <section id="storyboard" className="mx-auto w-full max-w-[1036px] scroll-mt-6 px-6 pt-[96px] lg:px-0">
      <SectionHead eyebrow={STORYBOARD.eyebrow} heading={STORYBOARD.heading} note={STORYBOARD.note} />
      <div>
        {STORYBOARD.scenes.map((scene, i) => (
          <article
            key={scene.num}
            className="grid items-center gap-6 py-6"
            style={i > 0 ? { borderTop: `1px solid ${DIVIDER}` } : undefined}
            aria-label={`Scene ${scene.num}: ${scene.title}`}
          >
            <div className="grid gap-6 lg:grid-cols-[300px_1fr]">
              <div>
                <p className="text-[40px] font-bold leading-none" style={{ ...DISPLAY, color: GOLD }}>
                  {scene.num}
                </p>
                <h3 className="mt-[10px] text-[22px] font-semibold leading-[1.2]" style={{ ...DISPLAY, color: INK }}>
                  {scene.title}
                </h3>
                <p className="mt-2 text-[14px] leading-[1.5]" style={{ ...BODY, color: MUTED }}>
                  {scene.body}
                </p>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {scene.frames.map((frame) =>
                  "video" in frame ? (
                    <video
                      key={frame.note}
                      className="aspect-[350/220] w-full rounded-[14px] bg-black object-cover"
                      src={frame.video}
                      poster={frame.poster}
                      muted
                      loop
                      playsInline
                      controls
                      preload="metadata"
                      aria-label={frame.note}
                    />
                  ) : "src" in frame ? (
                    <div key={frame.note} className="aspect-[350/220] w-full overflow-hidden rounded-[14px]">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={frame.src} alt={frame.alt} className="h-full w-full object-cover" loading="lazy" draggable={false} />
                    </div>
                  ) : (
                    <DropZone key={frame.note} note={frame.note} className="aspect-[350/220] rounded-[14px]" />
                  ),
                )}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function Interactions() {
  return (
    <section className="mt-[96px]" style={{ background: DARK }}>
      <div className="mx-auto w-full max-w-[1036px] px-6 py-[96px] lg:px-0">
        <SectionHead eyebrow={INTERACTIONS.eyebrow} heading={INTERACTIONS.heading} dark />
        <div className="grid gap-[14px] sm:grid-cols-2 lg:grid-cols-4">
          {INTERACTIONS.cards.map((card) => (
            <article key={card.title} className="rounded-[20px] px-[22px] pb-[26px] pt-6" style={{ background: INTERACT_CARD }}>
              <span className="flex h-16 w-16 items-center justify-center rounded-[16px]" style={{ background: PANEL }}>
                <Icon name={card.icon} size={30} />
              </span>
              <h3 className="mt-3 text-[18px] font-semibold leading-[1.5] text-[#F5F1E8]" style={DISPLAY}>
                {card.title}
              </h3>
              <p className="mt-2 text-[14px] leading-[1.5] text-[#B9AF9D]" style={BODY}>
                {card.body}
              </p>
            </article>
          ))}
        </div>
        <div className="mt-4 grid gap-4 pt-4 md:grid-cols-2">
          {INTERACTIONS.wide.map((shot) => (
            <div key={shot.note} className="aspect-[510/300] w-full overflow-hidden rounded-[16px]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={shot.src} alt={shot.alt} className="h-full w-full object-cover" loading="lazy" draggable={false} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ARPrototype() {
  return (
    <section className="mx-auto w-full max-w-[1036px] px-6 pt-[96px] lg:px-0">
      <SectionHead eyebrow={AR.eyebrow} heading={AR.heading} note={AR.note} />
      <ol className="grid grid-cols-2 gap-x-[14px] gap-y-5 lg:grid-cols-4">
        {AR.screens.map((screen, i) => (
          <li key={screen.note}>
            <div className="aspect-[248.5/164] w-full overflow-hidden rounded-[12px]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={screen.src} alt={screen.caption} className="h-full w-full object-cover" loading="lazy" draggable={false} />
            </div>
            <p className="mt-2 flex items-start gap-2">
              <span className="text-[11px] font-bold" style={{ ...BODY, color: GOLD }}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="text-[13px] font-medium leading-[1.5]" style={{ ...BODY, color: INK }}>
                {screen.caption}
              </span>
            </p>
          </li>
        ))}
      </ol>
      <div className="mt-6 grid gap-4 pt-6 md:grid-cols-2">
        {AR.phones.map((phone) => (
          <div key={phone.note} className="aspect-[510/520] w-full overflow-hidden rounded-[18px]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={phone.src} alt={phone.alt} className="h-full w-full object-cover" loading="lazy" draggable={false} />
          </div>
        ))}
      </div>
    </section>
  );
}

function Tools() {
  return (
    <section className="mx-auto w-full max-w-[1036px] px-6 pt-[96px] lg:px-0">
      <p className="text-[11px] font-bold uppercase tracking-[1.32px]" style={{ ...BODY, color: GOLD }}>
        {TOOLS.eyebrow}
      </p>
      <h2 className="mt-[14px] text-[28px] font-semibold leading-[1.2] md:text-[35px]" style={{ ...DISPLAY, color: INK }}>
        {TOOLS.heading}
      </h2>
      <div className="mt-7 grid gap-[14px] sm:grid-cols-2 lg:grid-cols-4">
        {TOOLS.items.map((tool) => (
          <div key={tool.title} className="rounded-[18px] bg-white p-[22px]">
            <Icon name="icon-tools" size={22} />
            <p className="mt-3 text-[18px] font-semibold" style={{ ...DISPLAY, color: INK }}>
              {tool.title}
            </p>
            <p className="mt-1 text-[14px]" style={{ ...BODY, color: MUTED }}>
              {tool.body}
            </p>
          </div>
        ))}
      </div>
      <p className="mt-[22px] text-[12px] leading-[1.5]" style={{ ...BODY, color: MUTED }}>
        {TOOLS.credit}
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
          <p className="text-[32px] font-semibold text-[#F5F1E8]" style={DISPLAY}>
            Let&apos;s talk.
          </p>
          <a
            href="mailto:nmayacharya@gmail.com"
            className="mt-[10px] inline-block border-b border-[#3A5552] pb-[2px] text-[16px] text-[#CFC6B5] transition-opacity hover:opacity-80"
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
              className="text-[14px] text-[#F5F1E8] transition-opacity hover:opacity-80"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
}

export default function IfsgCase() {
  return (
    <main style={{ background: PAPER }}>
      <Nav />
      <Hero />
      <Facts />
      <Contributions />
      <Dashboard />
      <Storyboard />
      <Interactions />
      <ARPrototype />
      <Tools />
      <MoreProjects />
      <Footer />
    </main>
  );
}
