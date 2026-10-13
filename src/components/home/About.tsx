import { ABOUT_ROWS } from "@/data/lenses";

/** About band (node 525:308). */
export default function About() {
  return (
    <section
      aria-label="About Neha"
      className="flex flex-col items-center gap-[40px] px-6 pb-[64px] pt-[40px] lg:flex-row lg:gap-[56px] lg:px-[132px] lg:pb-[96px] lg:pt-[48px]"
    >
      <div className="h-[500px] w-full max-w-[400px] shrink-0 overflow-hidden rounded-[28px]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/figma/brand/neha-photo.jpg"
          alt="Neha Mayacharya"
          className="size-full object-cover"
        />
      </div>

      <div className="flex w-full flex-1 flex-col gap-[28px]">
        <h2 className="home-display text-[clamp(30px,3.05vw,44px)] font-bold leading-[1.08] tracking-[-0.44px] text-[#f3f1ff]">
          Designer, educator, and lifelong learner.
        </h2>

        <div className="home-body border-t border-[#2e2b5c] text-[17px]">
          {ABOUT_ROWS.map((row) => (
            <div
              key={row.label}
              className="flex flex-wrap items-center justify-between gap-2 border-b border-[#2e2b5c] py-[14px]"
            >
              <span className="text-[#aba8cc]">{row.label}</span>
              <span className="font-semibold text-[#f3f1ff]">{row.value}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
