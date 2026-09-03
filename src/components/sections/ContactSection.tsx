"use client";

import type { ThemeId } from "@/data/themes";
import { THEMES } from "@/data/themes";

type Social = { label: string; handle: string; href: string };

export default function ContactSection({
  activeId,
  email,
  socials,
}: {
  activeId: ThemeId;
  email: string;
  location: string;
  availability: string;
  socials: Social[];
}) {
  const theme = THEMES[activeId];

  return (
    <section id="contact" className="relative bg-zinc-900 text-white">
      <div className="absolute left-0 right-0 top-0 h-px" style={{ background: theme.accent, opacity: 0.35 }} aria-hidden />
      <div className="mx-auto max-w-[1280px] px-6 py-8 md:px-8 md:py-10">
        <h2 className="font-display text-[24px] font-semibold tracking-[-0.03em] md:text-[28px]" style={{ fontFamily: "var(--font-display)" }}>
          Let&apos;s talk<span className="font-light text-white/50">.</span>
        </h2>

        <div className="mt-4 flex flex-col gap-4 md:flex-row md:items-baseline md:justify-between">
          <a href={`mailto:${email}`} className="font-mono text-[16px] tracking-[-0.02em] text-white hover:text-white/80 md:text-[18px]">
            {email}
          </a>
          <div className="flex gap-4 font-mono text-[11px] tracking-[0.12em] text-white/50">
            {socials
              .filter((s) => s.label !== "mail")
              .map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noreferrer" className="hover:text-white">
                  {s.label}
                </a>
              ))}
          </div>
        </div>

        <div className="mt-8 flex justify-start border-t border-white/10 pt-4 font-mono text-[10px] tracking-[0.12em] text-white/30">
          <span>© 2026 NEHA</span>
        </div>
      </div>
    </section>
  );
}
