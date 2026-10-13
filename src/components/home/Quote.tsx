import { QUOTE } from "@/data/lenses";

/** Featured quote (node 525:319). */
export default function Quote() {
  return (
    <section
      aria-label="Testimonial"
      className="flex flex-col gap-[20px] px-6 pb-[64px] lg:px-[132px] lg:pb-[96px]"
    >
      <blockquote className="home-display max-w-[900px] text-[clamp(26px,2.78vw,40px)] font-bold leading-[1.2] text-[#f3f1ff]">
        “{QUOTE.text}”
      </blockquote>
      <p className="home-body text-[15px] text-[#aba8cc]">{QUOTE.attribution}</p>
    </section>
  );
}
