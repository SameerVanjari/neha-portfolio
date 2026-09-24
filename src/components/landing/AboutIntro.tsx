"use client";

const DISPLAY = { fontFamily: "var(--font-display)" } as const;
const BODY = { fontFamily: "var(--font-body)" } as const;

export default function AboutIntro() {
  return (
    <section aria-label="About" className="bg-[#F2EEE7]">
      <div className="mx-auto w-full max-w-[1200px] px-6 pb-[120px] pt-[80px] md:pt-[140px] lg:px-0">
        <div className="flex max-w-[792px] flex-col items-start gap-[36px]">
          <p
            className="text-[13px] font-medium uppercase tracking-[1.82px] text-[#5C5750]"
            style={BODY}
          >
            About
          </p>
          <p
            className="text-[30px] font-medium leading-[1.18] tracking-[-1.025px] text-[#17161B] md:text-[41px]"
            style={DISPLAY}
          >
            Product &amp; Experience Designer working at the intersection of AI, XR, and emerging
            technology.
          </p>
          <div className="flex flex-col items-start gap-[10px] text-[20px] font-normal leading-[1.3] md:text-[26px]" style={BODY}>
            <p className="text-[#5C5750]">First, I sculpted objects.</p>
            <p className="text-[#3A3833]">Then, I shaped experiences.</p>
            <p className="font-medium text-[#3B33B5]">Now, I orchestrate intelligence itself.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
