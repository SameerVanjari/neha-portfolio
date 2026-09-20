"use client";

import Link from "next/link";
import type { ThemeId } from "@/data/themes";
import { THEMES } from "@/data/themes";
import type { Recognition } from "@/types/portfolio";
import ClientLogoLoop from "@/components/ClientLogoLoop";

type Props = {
  activeId: ThemeId;
  clients: string[];
  recognition: Recognition[];
};

export default function ProofSection({ activeId, clients, recognition }: Props) {
  const theme = THEMES[activeId];
  const multiTint = `linear-gradient(135deg, ${THEMES.ux.wash}12 0%, ${THEMES.xr.wash}10 40%, ${THEMES.ai.wash}10 80%)`;

  return (
    <section id="proof" className="relative bg-[#F2EEE6]">
      <div aria-hidden className="pointer-events-none absolute inset-0" style={{ background: multiTint }} />
      <div className="mx-auto max-w-[1280px] px-6 md:px-8">
        <div className="py-14 md:py-18 lg:py-24">
          <div className="flex items-baseline justify-between gap-4">
            <h2
              className="font-display text-[22px] font-semibold tracking-[-0.03em] md:text-[26px]"
              style={{ fontFamily: "var(--font-display)", color: "#111827" }}
            >
              Selected for
            </h2>
            <span className="font-mono text-[11px] tracking-[0.16em]" style={{ color: theme.muted }}>
              Clients · Faculty
            </span>
          </div>

          <div className="mt-8 border-y py-8" style={{ borderColor: "rgba(0,0,0,0.06)" }}>
            <ClientLogoLoop clientNames={clients} bare />
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {recognition.map((r) => (
              <article
                key={`${r.kind}-${r.place}`}
                className="rounded-[20px] border bg-white p-5 md:p-6"
                style={{ borderColor: "rgba(0,0,0,0.06)", boxShadow: "0 8px 32px rgba(0,0,0,0.04)" }}
              >
                <div className="font-mono text-[10px] tracking-[0.16em] text-zinc-400">{r.kind}</div>
                <h3 className="mt-2 font-display text-[15px] font-semibold tracking-[-0.02em] text-zinc-900">{r.place}</h3>
                <div className="mt-1 font-mono text-[10px] tracking-[0.08em] text-zinc-500">{r.meta}</div>
                <p className="mt-3 text-[13px] leading-[1.6] text-zinc-500">{r.body}</p>
              </article>
            ))}
          </div>

          <div className="mt-8">
            <Link href="/about" className="font-mono text-[11px] tracking-[0.14em] text-zinc-500 underline decoration-zinc-300 underline-offset-4 hover:text-zinc-800">
              Full experience & education →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
