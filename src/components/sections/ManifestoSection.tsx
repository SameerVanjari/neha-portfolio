"use client";

import type { ThemeId } from "@/data/themes";
import { THEMES } from "@/data/themes";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";

const WORDS =
  "I design experiences at the intersection of intelligent systems and spatial computing. Intuitive, empathetic, and technically grounded across XR, UX, AI, and product.";

export default function ManifestoSection({ activeId }: { activeId: ThemeId }) {
  const theme = THEMES[activeId];

  return (
    <section id="manifesto" className="relative bg-[#fafaf9]">
      <div className="mx-auto max-w-[1280px] px-6 py-16 md:px-8 md:py-20 lg:py-24">
        <h2
          className="w-full font-display text-[28px] font-semibold leading-[1.15] tracking-[-0.035em] text-zinc-900 md:w-3/4 md:text-[40px] lg:text-[44px]"
          style={{ fontFamily: "var(--font-display)" }}
        >
          <TextGenerateEffect words={WORDS} className="font-semibold" />
        </h2>
        <div className="mt-8 h-px w-16" style={{ background: theme.accent }} />
      </div>
    </section>
  );
}
