"use client";

import data from "@/data/portfolio.json";
import { WordStagger } from "@/components/ui/word-stagger";

/**
 * Reusable contact card — all contact options in one place.
 * Used by the home ContactSection and every case-study Contact section.
 * The email CTA animates with the same WordStagger roll as the site's other
 * CTA buttons (two-layer letter roll on hover).
 */
export default function ContactCard() {
  const { email, location, availability } = data.profile;
  const socials = data.socials.filter((s) => s.label !== "mail");

  return (
    <div className="relative overflow-hidden rounded-[24px] border border-white/10 bg-[#141417] p-6 md:p-8">
      <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
        <div className="min-w-0">
          <div className="font-mono text-[11px] tracking-[0.18em] text-white/40">CONTACT</div>
          <a
            href={`mailto:${email}`}
            className="group mt-4 inline-block font-display text-[24px] font-semibold tracking-[-0.03em] text-white transition-colors hover:text-white/80 md:text-[30px]"
            style={{ fontFamily: "var(--font-display)", overflowWrap: "anywhere" }}
            aria-label={`Email Neha at ${email}`}
          >
            <WordStagger text={email} stagger={22} />
          </a>
          <div className="mt-4 flex flex-col gap-1 font-mono text-[11px] tracking-[0.1em] text-white/45">
            <span>{location}</span>
            <span>{availability}</span>
          </div>
        </div>

        <div className="flex shrink-0 flex-col gap-2">
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noreferrer"
              className="group flex items-center justify-between gap-8 rounded-[14px] border border-white/10 px-4 py-3 transition-colors hover:bg-white/[0.06]"
            >
              <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/50">{s.label}</span>
              <span className="font-mono text-[13px] text-white/85 transition-colors group-hover:text-white">{s.handle}</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
