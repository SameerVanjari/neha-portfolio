"use client";

import type { ThemeId } from "@/data/themes";
import { THEMES } from "@/data/themes";
import ContactCard from "@/components/ContactCard";

export default function ContactSection({ activeId }: { activeId: ThemeId }) {
  const theme = THEMES[activeId];

  return (
    <section id="contact" className="relative bg-zinc-900 text-white">
      <div className="absolute left-0 right-0 top-0 h-px" style={{ background: theme.accent, opacity: 0.35 }} aria-hidden />
      <div className="mx-auto max-w-[1280px] px-6 py-14 md:px-8 md:py-18 lg:py-20">
        <h2 className="font-display text-[24px] font-semibold tracking-[-0.03em] md:text-[28px]" style={{ fontFamily: "var(--font-display)" }}>
          Let&apos;s talk<span className="font-light text-white/50">.</span>
        </h2>

        <div className="mt-8">
          <ContactCard />
        </div>

        <div className="mt-12 flex justify-start border-t border-white/10 pt-6 font-mono text-[10px] tracking-[0.12em] text-white/30">
          <span>© 2026 NEHA</span>
        </div>
      </div>
    </section>
  );
}
