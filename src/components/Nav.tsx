"use client";

import type { Theme } from "@/data/themes";

export default function Nav({ theme }: { theme: Theme }) {
  return (
    <header className="fixed inset-x-0 top-0 z-40">
      <div className="mx-auto flex h-[64px] max-w-[1280px] items-center justify-between px-6 md:px-8">
        {/* Logo */}
        <a href="#" className="group flex items-baseline gap-2">
          <span
            className="font-display text-[18px] font-bold tracking-[-0.025em]"
            style={{ color: theme.text, letterSpacing: "-0.03em" }}
          >
            NEHA
          </span>
          <span
            className="hidden sm:inline font-mono text-[9px] tracking-[0.24em] transition-colors"
            style={{ color: theme.muted }}
          >
            AI · XR · UX · PRODUCT
          </span>
        </a>

        {/* Right */}
        <div className="flex items-center gap-5">
          <span
            className="hidden md:inline font-mono text-[10px] tracking-[0.18em]"
            style={{ color: theme.muted }}
          >
            Bangalore · Remote
          </span>
          <a
            href="mailto:hello@neha.design"
            className="rounded-full border px-4 py-[7px] font-mono text-[11px] font-medium tracking-[0.14em] backdrop-blur transition-colors hover:opacity-90"
            style={{
              borderColor: theme.border,
              background: theme.surface,
              color: theme.text,
              boxShadow: "0 1px 8px rgba(0,0,0,0.06)",
            }}
          >
            Contact
          </a>
        </div>
      </div>
    </header>
  );
}
