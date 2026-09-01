export default function Hero() {
  return (
    <section id="top" className="relative flex min-h-screen flex-col justify-center">
      <div className="mx-auto max-w-5xl px-6 md:px-10 md:max-w-4xl">
        <p
          className="mb-8 font-mono text-[11px] uppercase tracking-[0.5em] text-cyber animate-fade"
        >
          AI Experience Designer
        </p>
        <h1
          className="font-display text-[clamp(3rem,10vw,7rem)] leading-[0.92] tracking-tight text-paper animate-fade"
        >
          NEHA
        </h1>
        <p
          className="mt-8 max-w-xl text-lg leading-relaxed text-ghost md:text-xl animate-fade"
        >
          I design the interfaces where intelligent systems and human needs meet —
          across every reality.
        </p>
        <div className="mt-12 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.35em] text-faint animate-fade">
          <span className="scroll-hint-line w-16" />
          <span>scroll to explore</span>
        </div>
      </div>
    </section>
  );
}