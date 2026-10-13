import { CLIENTS, RECOGNITION } from "@/data/lenses";

/** Clients row + recognition chips (node 525:153). */
export default function Proof() {
  return (
    <section
      aria-label="Clients and recognition"
      className="flex flex-col gap-[28px] px-6 py-[40px] lg:px-[132px] lg:py-[56px]"
    >
      <div className="home-body flex flex-wrap items-center justify-between gap-x-[24px] gap-y-[12px] text-[14px] font-semibold tracking-[3.08px] text-[#8e8bb3]">
        {CLIENTS.map((c) => (
          <span key={c}>{c}</span>
        ))}
      </div>

      <div className="flex flex-wrap items-start gap-[12px]">
        {RECOGNITION.map((r) => (
          <span
            key={r}
            className="home-body inline-flex items-center gap-[10px] rounded-full border border-[#2e2b5c] px-[18px] py-[10px] text-[15px] font-medium text-[#f3f1ff]"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/figma/tools/dot-mark.svg" alt="" aria-hidden className="size-[6px]" />
            {r}
          </span>
        ))}
      </div>
    </section>
  );
}
