/** Full-bleed statement band (node 525:207). */
export default function Statement() {
  return (
    <section
      aria-label="Design statement"
      className="relative h-[420px] w-full overflow-hidden bg-[#f3f1ff] md:h-[480px]"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/figma/icons/icon-overrule.png"
        alt=""
        aria-hidden
        className="absolute left-[4%] top-[10%] w-[clamp(72px,9vw,132px)] md:left-[137px] md:top-[48px]"
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/figma/icons/icon-understand.png"
        alt=""
        aria-hidden
        className="absolute right-[4%] top-[15%] w-[clamp(68px,8.6vw,124px)] md:right-[150px] md:top-[72px]"
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/figma/icons/icon-question.png"
        alt=""
        aria-hidden
        className="absolute left-[6%] bottom-[8%] w-[clamp(62px,7.8vw,112px)] md:left-[298px] md:bottom-[40px]"
      />

      <p className="home-display absolute left-1/2 top-[110px] w-[min(880px,88vw)] -translate-x-1/2 text-center text-[clamp(34px,5.28vw,76px)] font-bold leading-[1.02] tracking-[-1.9px] text-[#0a0918] md:top-[123px]">
        I design AI people can{" "}
        <span className="text-[#5b3fd9]">understand, question, and overrule.</span>
      </p>
    </section>
  );
}
