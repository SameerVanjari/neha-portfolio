"use client";

import type { ThemeId } from "@/data/themes";
import { THEMES } from "@/data/themes";
import Link from "next/link";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";

type Props = {
  activeId: ThemeId;
  profile: { name: string; tagline: string; roles: string[]; bio: string; location: string; email: string; availability: string };
};

function HeaderVisual({ accent, children }: { accent: string; children: React.ReactNode }) {
  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-[14px] bg-gradient-to-br from-white to-zinc-50">
      <div className="absolute inset-0 opacity-20" style={{ background: `radial-gradient(300px circle at 50% 30%, ${accent}22, transparent 60%)` }} />
      {children}
    </div>
  );
}

export default function AboutSection({ activeId, profile }: Props) {
  const theme = THEMES[activeId];

  const process = [
    {
      title: "01 — Discover",
      description: "Research, interviews, market signals. We map what people do and why it matters.",
      header: (
        <HeaderVisual accent={theme.accent}>
          <div className="flex gap-2">
            <span className="h-10 w-14 rounded-lg border bg-white" style={{ borderColor: theme.border }} />
            <span className="h-10 w-10 rounded-full" style={{ background: theme.accent, opacity: 0.85 }} />
            <span className="h-10 w-6 rounded-lg bg-zinc-900" />
          </div>
        </HeaderVisual>
      ),
      className: "md:col-span-1",
    },
    {
      title: "02 — Define",
      description: "Synthesis into intent trees, jobs-to-be-done and system constraints.",
      header: (
        <HeaderVisual accent={THEMES.ux.accent}>
          <div className="grid w-[70%] grid-cols-3 gap-1.5">
            {Array.from({ length: 6 }).map((_, i) => (
              <span key={i} className="h-6 rounded-md" style={{ background: i < 2 ? THEMES.ux.accent : "rgba(0,0,0,0.06)" }} />
            ))}
          </div>
        </HeaderVisual>
      ),
      className: "md:col-span-1",
    },
    {
      title: "03 — Envision",
      description: "Flows, tokens, spatial maps. The system takes shape before pixels.",
      header: (
        <HeaderVisual accent={THEMES.xr.accent}>
          <div className="relative h-16 w-24 rounded-xl border bg-white" style={{ borderColor: "rgba(0,0,0,0.08)" }}>
            <span className="absolute -right-2 top-3 h-8 w-8 rounded-lg border bg-white" style={{ borderColor: theme.border }} />
            <span className="absolute left-3 top-3 h-2 w-10 rounded-full bg-zinc-900" />
            <span className="absolute bottom-3 left-3 h-2 w-14 rounded-full" style={{ background: THEMES.xr.accent }} />
          </div>
        </HeaderVisual>
      ),
      className: "md:col-span-1",
    },
    {
      title: "04 — Prototype",
      description: "Hand-tracked, voice-first, token-powered prototypes tested in context.",
      header: (
        <HeaderVisual accent={THEMES.ai.accent}>
          <div className="flex items-center gap-2">
            <span className="h-14 w-14 rounded-2xl bg-zinc-900" />
            <span className="h-10 w-10 rounded-xl border-2 bg-white" style={{ borderColor: THEMES.ai.accent }} />
            <span className="h-6 w-6 rounded-full" style={{ background: THEMES.ai.accent }} />
          </div>
        </HeaderVisual>
      ),
      className: "md:col-span-2",
    },
    {
      title: "05 — Ship & learn",
      description: "Measure, iterate, harden. Real usage shapes the next loop.",
      header: (
        <HeaderVisual accent={theme.accent}>
          <div className="flex items-end gap-1">
            <span className="h-6 w-4 rounded-full bg-zinc-300" />
            <span className="h-9 w-4 rounded-full" style={{ background: theme.accent }} />
            <span className="h-12 w-4 rounded-full bg-zinc-900" />
            <span className="h-7 w-4 rounded-full bg-zinc-300" />
          </div>
        </HeaderVisual>
      ),
      className: "md:col-span-1",
    },
  ];

  const multiTint = `linear-gradient(135deg, ${THEMES.xr.wash}10 0%, ${THEMES.ai.wash}10 50%, ${THEMES.product.wash}10 100%)`;
  return (
    <section id="about" className="relative bg-[#fafaf9]">
      <div aria-hidden className="pointer-events-none absolute inset-0" style={{ background: multiTint, opacity: 0.6 }} />
      <div className="mx-auto max-w-[1280px] px-6 md:px-8">
        <div className="py-8 md:py-10 lg:py-12">
          <div className="flex items-baseline justify-between gap-4">
            <h2
              className="font-display text-[22px] font-semibold tracking-[-0.03em] md:text-[26px]"
              style={{ fontFamily: "var(--font-display)", color: "#111827" }}
            >
              Process
            </h2>
            <Link href="/about" className="font-mono text-[11px] tracking-[0.14em] text-zinc-500 hover:text-zinc-900">
              About →
            </Link>
          </div>

          <div className="mt-6">
            <BentoGrid>
              {process.map((item) => (
                <BentoGridItem key={item.title} title={item.title} description={item.description} header={item.header} className={item.className} />
              ))}
            </BentoGrid>
          </div>
        </div>
      </div>
    </section>
  );
}
