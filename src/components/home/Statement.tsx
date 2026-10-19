import { Reveal } from "@/components/motion/reveal";

/** Full-bleed statement band (node 525:207). */
export default function Statement() {
  return (
    <section
      aria-label="Design statement"
      className="relative h-[420px] w-full overflow-hidden bg-[#f3f1ff] md:h-[480px]"
    >
      <Reveal className="absolute left-[4%] top-[10%] md:left-[137px] md:top-[48px]" delay={0.05}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/figma/icons/icon-overrule.png"
          alt=""
          aria-hidden
          className="w-[clamp(72px,9vw,132px)]"
        />
      </Reveal>
      <Reveal className="absolute right-[4%] top-[15%] md:right-[150px] md:top-[72px]" delay={0.15}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/figma/icons/icon-understand.png"
          alt=""
          aria-hidden
          className="w-[clamp(68px,8.6vw,124px)]"
        />
      </Reveal>
      <Reveal className="absolute left-[6%] bottom-[8%] md:left-[298px] md:bottom-[40px]" delay={0.25}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/figma/icons/icon-question.png"
          alt=""
          aria-hidden
          className="w-[clamp(62px,7.8vw,112px)]"
        />
      </Reveal>

      <Reveal
        className="absolute left-1/2 top-[110px] w-full -translate-x-1/2 px-6 md:top-[123px]"
        delay={0.1}
      >
        <p className="home-display mx-auto w-[min(880px,88vw)] text-center text-[clamp(34px,5.28vw,76px)] font-bold leading-[1.02] tracking-[-1.9px] text-[#0a0918]">
          I design AI people can{" "}
          <span className="text-[#5b3fd9]">understand, question, and overrule.</span>
        </p>
      </Reveal>
    </section>
  );
}
