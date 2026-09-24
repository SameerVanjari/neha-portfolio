"use client";

import { useState } from "react";
import Link from "next/link";
import { SELECTED_WORK, type SelectedWorkCard, type WorkLens } from "@/data/landing";

const DISPLAY = { fontFamily: "var(--font-display)" } as const;
const BODY = { fontFamily: "var(--font-body)" } as const;

const FILTERS: { id: WorkLens; label: string }[] = [
  { id: "all", label: "All" },
  { id: "xr", label: "XR" },
  { id: "ux", label: "UX" },
  { id: "ai", label: "AI" },
  { id: "product", label: "Product" },
];

function Placeholder({ card, dark }: { card: SelectedWorkCard; dark: boolean }) {
  return (
    <div
      aria-hidden={!card.image}
      className={`flex h-[250px] w-full flex-col items-start justify-end rounded-[14px] border border-dashed p-[20px] ${
        dark ? "border-[#5C5866] bg-[#2A2830]" : "border-[#B8AFA2] bg-[#E4DDD1]"
      }`}
    >
      <p
        className={`text-[13px] font-normal leading-[1.45] ${dark ? "text-[#D8D2C8]" : "text-[#4A4640]"}`}
        style={BODY}
      >
        [{card.imageAlt ?? card.title}]
      </p>
    </div>
  );
}

function WorkCard({ card }: { card: SelectedWorkCard }) {
  return (
    <Link
      href={card.href}
      className="group flex w-full flex-col items-start gap-[18px]"
      aria-label={`${card.title} — ${card.meta}, ${card.year}`}
    >
      <div className="relative h-[250px] w-full overflow-hidden rounded-[14px]">
        {card.image ? (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={card.image}
              alt={card.imageAlt ?? card.title}
              loading="lazy"
              draggable={false}
              className="h-full w-full object-cover transition-transform duration-300 ease-out motion-safe:group-hover:scale-[1.03] motion-reduce:transition-none"
            />
          </>
        ) : (
          <Placeholder card={card} dark={false} />
        )}
        {card.badge && (
          <span
            className="absolute left-[20px] top-[20px] inline-flex items-center rounded-[999px] bg-[#F2EEE7] px-[12px] py-[6px] text-[12px] font-semibold text-[#3B33B5]"
            style={BODY}
          >
            {card.badge}
          </span>
        )}
      </div>
      <div className="flex w-full items-start justify-between text-[13px] font-normal tracking-[0.52px] text-[#5C5750]" style={BODY}>
        <p>{card.meta}</p>
        <p>{card.year}</p>
      </div>
      <h3
        className="-mt-[4px] text-[25px] font-semibold leading-[1.15] tracking-[-0.375px] text-[#17161B]"
        style={DISPLAY}
      >
        {card.title}
      </h3>
      <p className="-mt-[6px] text-[16px] font-normal leading-[1.55] text-[#2B2926]" style={BODY}>
        {card.description}
      </p>
      <div className="w-full border-t border-[#DAD3C8] pt-[12px]">
        <p className="text-[14px] font-normal text-[#5C5750]" style={BODY}>
          {card.role}
        </p>
      </div>
    </Link>
  );
}

export default function SelectedWork() {
  const [filter, setFilter] = useState<WorkLens>("all");
  const cards =
    filter === "all" ? SELECTED_WORK : SELECTED_WORK.filter((c) => c.lens === filter);

  return (
    <section id="work" aria-label="Selected work" className="bg-[#FBF9F5]">
      <div className="mx-auto flex w-full max-w-[1200px] flex-col items-start gap-[44px] px-6 pb-[130px] pt-[80px] md:pt-[120px] lg:px-0">
        <div className="flex w-full flex-wrap items-end justify-between gap-6">
          <div className="flex flex-col items-start gap-[12px]">
            <h2
              className="text-[36px] font-semibold tracking-[-1.2px] text-[#17161B] md:text-[48px]"
              style={DISPLAY}
            >
              Selected work
            </h2>
            <p className="text-[17px] font-normal text-[#5C5750]" style={BODY}>
              Each case study covers the problem, my role, the key decisions, and the outcome.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-[8px]" role="group" aria-label="Filter by lens">
            {FILTERS.map((f) => {
              const active = f.id === filter;
              return (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => setFilter(f.id)}
                  aria-pressed={active}
                  className={`inline-flex h-[44px] cursor-pointer items-center justify-center rounded-[999px] px-[20px] text-[14px] font-medium transition-colors ${
                    active
                      ? "bg-[#17161B] text-[#F2EEE7]"
                      : "border border-[#CFC7BA] text-[#17161B] hover:border-[#17161B]"
                  }`}
                  style={BODY}
                >
                  {f.label}
                </button>
              );
            })}
          </div>
        </div>

        {cards.length > 0 ? (
          <div className="grid w-full grid-cols-1 items-start gap-x-[33px] gap-y-12 md:grid-cols-2 lg:grid-cols-3">
            {cards.map((card) => (
              <WorkCard key={card.id} card={card} />
            ))}
          </div>
        ) : (
          <div className="flex w-full flex-col items-start gap-3 rounded-[14px] border border-dashed border-[#B8AFA2] bg-[#F2EEE7] p-8" style={BODY}>
            <p className="text-[17px] font-medium text-[#17161B]">
              More {filter.toUpperCase()} case studies live in the full archive.
            </p>
            <Link
              href="/projects"
              className="text-[15px] font-semibold text-[#17161B] underline underline-offset-4"
            >
              Browse all projects →
            </Link>
          </div>
        )}

        <Link
          href="/projects"
          className="text-[15px] font-semibold text-[#17161B] underline underline-offset-4"
          style={BODY}
        >
          View all projects
        </Link>
      </div>
    </section>
  );
}
