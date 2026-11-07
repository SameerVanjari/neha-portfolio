import Link from "next/link";
import type { HomeLens } from "@/data/lenses";
import { ABOUT_ROWS } from "@/data/lenses";
import LensPortrait from "@/components/home/LensPortrait";
import { Reveal } from "@/components/motion/reveal";

/** About band (node 583:466) — photo, heading, intro, "Now" rows, link. */
export default function About({ lens }: { lens: HomeLens }) {
  return (
    <section
      id="about"
      aria-label="About Neha"
      className="flex flex-col items-center gap-[40px] px-6 pb-[72px] pt-[64px] lg:flex-row lg:items-start lg:gap-[64px] lg:px-[132px] lg:pb-[72px] lg:pt-[96px]"
    >
      <Reveal className="relative h-[480px] w-full max-w-[400px] shrink-0 overflow-hidden rounded-[24px]">
        <LensPortrait lensId={lens.id} />
      </Reveal>

      <div className="flex w-full flex-1 flex-col gap-[22px]">
        <Reveal delay={0.08}>
          <h2 className="home-display text-[clamp(30px,3.05vw,44px)] font-bold leading-[1.1] text-[#f3f1ff]">
            Designer, educator, and lifelong learner.
          </h2>
        </Reveal>

        <Reveal delay={0.12}>
          <p className="home-body max-w-[620px] text-[18px] leading-[1.45] text-[#aba8cc]">
            Six years designing across physical products, immersive media, and
            conversational AI.
          </p>
        </Reveal>

        <div className="home-body text-[17px]">
          {ABOUT_ROWS.map((row, i) => (
            <Reveal key={row.label} delay={0.16 + i * 0.06}>
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#1c1a45] py-[15px]">
                <span className="text-[#8e8bb3]">{row.label}</span>
                <span
                  className={`font-semibold ${
                    row.accent ? "text-[#b49cff]" : "text-[#f3f1ff]"
                  }`}
                >
                  {row.value}
                </span>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.32}>
          <Link
            href="/about"
            className="home-body inline-block text-[16px] font-semibold text-[#b49cff] transition-opacity hover:opacity-70"
          >
            More about me →
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
