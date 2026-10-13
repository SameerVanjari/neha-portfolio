import Link from "next/link";
import type { HomeLens } from "@/data/lenses";

/** Work row (node 525:178) — title, "All projects", three cards. */
export default function Work({ lens }: { lens: HomeLens }) {
  return (
    <section
      aria-label={lens.workTitle}
      className="flex flex-col gap-[32px] px-6 pb-[64px] pt-[40px] lg:px-[132px] lg:pb-[96px] lg:pt-[48px]"
    >
      <div className="flex items-end justify-between gap-4">
        <h2 className="home-display text-[clamp(34px,3.6vw,52px)] font-bold leading-none tracking-[-1.04px] text-[#f3f1ff]">
          {lens.workTitle}
        </h2>
        <Link
          href="/projects"
          className="home-body whitespace-nowrap text-[17px] font-medium text-[#f3f1ff] transition-opacity hover:opacity-60"
        >
          All projects →
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-[24px] md:grid-cols-3">
        {lens.projects.map((p) => (
          <Link
            key={p.title}
            href={p.href}
            className="group flex flex-col gap-[16px] rounded-[22px] border border-[#22204a] bg-[#121130] p-[14px] transition-transform duration-200 ease-out hover:-translate-y-[2px]"
          >
            <div className="relative h-[261px] overflow-hidden rounded-[14px] bg-[#1c1a45]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={p.image}
                alt={p.imageAlt}
                loading="lazy"
                className="size-full object-cover"
              />
            </div>

            <div className="flex items-center justify-between gap-[12px] px-[6px] pb-[8px]">
              <div className="flex min-w-0 flex-col gap-[2px]">
                <h3 className="home-display text-[26px] font-bold leading-[1.08] text-[#f3f1ff]">
                  {p.title}
                </h3>
                <p className="home-body text-[15px] text-[#aba8cc]">{p.meta}</p>
              </div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={lens.badge} alt="" aria-hidden className="size-[40px] shrink-0" />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
