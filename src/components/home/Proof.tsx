import { CLIENTS, RECOGNITION } from "@/data/lenses";
import { Reveal } from "@/components/motion/reveal";

/** Proof band (node 583:343) — clients row + recognition chips. */
export default function Proof() {
  return (
    <section
      aria-label="Clients and recognition"
      className="flex flex-col gap-[18px] px-6 pb-[28px] pt-[8px] lg:px-[132px]"
    >
      <Reveal className="home-body text-[12px] font-medium uppercase tracking-[2.16px] text-[#8e8bb3]">
        Clients &amp; collaborators
      </Reveal>

      <Reveal delay={0.04} className="home-body flex flex-wrap items-center justify-between gap-x-[24px] gap-y-[12px] text-[14px] font-semibold uppercase tracking-[1.68px] text-[#aba8cc]">
        {CLIENTS.map((c) => (
          <span key={c}>{c}</span>
        ))}
      </Reveal>

      <Reveal delay={0.08}>
        <div className="flex flex-wrap items-start gap-[12px]">
          {RECOGNITION.map((r) => (
            <span
              key={r}
              className="home-body inline-flex items-center gap-[8px] rounded-full border border-[#1c1a45] bg-[#0e0d22] px-[16px] py-[9px] text-[14px] font-medium text-[#f3f1ff]"
            >
              <span aria-hidden className="size-[6px] rounded-full bg-[#b49cff]" />
              {r}
            </span>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
