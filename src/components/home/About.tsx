import { ABOUT_ROWS } from "@/data/lenses";
import { Reveal } from "@/components/motion/reveal";

/** About band (node 525:308). */
export default function About() {
  return (
    <section
      aria-label="About Neha"
      className="flex flex-col items-center gap-[40px] px-6 pb-[64px] pt-[40px] lg:flex-row lg:gap-[56px] lg:px-[132px] lg:pb-[96px] lg:pt-[48px]"
    >
      <Reveal className="h-[500px] w-full max-w-[400px] shrink-0 overflow-hidden rounded-[28px]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/figma/brand/neha-photo.jpg"
          alt="Neha Mayacharya"
          className="size-full object-cover"
        />
      </Reveal>

      <div className="flex w-full flex-1 flex-col gap-[28px]">
        <Reveal delay={0.08}>
          <h2 className="home-display text-[clamp(30px,3.05vw,44px)] font-bold leading-[1.08] tracking-[-0.44px] text-[#f3f1ff]">
            Designer, educator, and lifelong learner.
          </h2>
        </Reveal>

        <div className="home-body border-t border-[#2e2b5c] text-[17px]">
          {ABOUT_ROWS.map((row, i) => (
            <Reveal key={row.label} delay={0.14 + i * 0.07}>
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#2e2b5c] py-[14px]">
                <span className="text-[#aba8cc]">{row.label}</span>
                <span className="font-semibold text-[#f3f1ff]">{row.value}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
