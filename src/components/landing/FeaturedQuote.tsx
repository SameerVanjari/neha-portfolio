"use client";

import { FEATURED_QUOTE } from "@/data/landing";

const DISPLAY = { fontFamily: "var(--font-display)" } as const;
const BODY = { fontFamily: "var(--font-body)" } as const;

export default function FeaturedQuote() {
  return (
    <section aria-label="In their words" className="bg-[#E9E3D9]">
      <div className="mx-auto flex w-full max-w-[1200px] flex-col items-start gap-[24px] px-6 py-[70px] md:py-[110px] lg:flex-row lg:px-0">
        <div className="w-[180px] shrink-0 lg:pt-[16px]">
          <p
            className="text-[13px] font-medium uppercase tracking-[1.82px] text-[#5C5750]"
            style={BODY}
          >
            In their words
          </p>
        </div>
        <figure className="flex max-w-[894px] flex-col items-start gap-[28px]">
          <blockquote
            className="text-[28px] font-medium leading-[1.22] tracking-[-1px] text-[#17161B] md:text-[40px]"
            style={DISPLAY}
          >
            “{FEATURED_QUOTE.quote}”
          </blockquote>
          <figcaption className="text-[16px] font-normal text-[#3A3833]" style={BODY}>
            <span className="font-semibold text-[#17161B]">{FEATURED_QUOTE.name}</span>
            {" · "}
            {FEATURED_QUOTE.context}
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
