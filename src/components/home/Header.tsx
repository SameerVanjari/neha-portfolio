"use client";

import Link from "next/link";
import { useLoadStage } from "@/components/LoadStage";

/** Homepage header — dark, in-flow (node 525:101). */
export default function Header() {
  const { stage } = useLoadStage();
  return (
    <header
      data-shown={stage !== "loading"}
      className="fade flex items-center justify-between px-6 py-4 lg:px-[132px] lg:py-[22px]"
    >
      <Link href="/" className="flex shrink-0 items-center gap-[12px]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/figma/brand/logo.png"
          alt=""
          aria-hidden
          className="h-[32px] w-[44px] rounded-[6px] object-cover"
        />
        <span className="home-display text-[18px] font-bold text-[#f3f1ff]">Neha Mayacharya</span>
      </Link>

      <nav aria-label="Primary" className="flex items-center gap-[28px]">
        <Link
          href="/projects"
          className="home-body text-[15px] text-[#f3f1ff] transition-opacity hover:opacity-60"
        >
          Work
        </Link>
        <Link
          href="/about"
          className="home-body text-[15px] text-[#f3f1ff] transition-opacity hover:opacity-60"
        >
          About
        </Link>
      </nav>
    </header>
  );
}
