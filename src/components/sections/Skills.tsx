import { skills } from "@/data/portfolio";

export default function Skills() {
  return (
    <section id="skills" className="section">
      <div className="section-inner">
        <p className="mb-6 font-mono text-[11px] uppercase tracking-[0.5em] text-cyber">
          TOOLKIT
        </p>
        <h2 className="mb-16 font-display text-[clamp(2rem,6vw,3.5rem)] leading-[1.05] tracking-tight text-paper">
          Crafted with precision.
        </h2>
        <div className="flex flex-wrap gap-3">
          {skills.map((s) => (
            <span
              key={s}
              className="rounded-full border border-white/10 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.2em] text-ghost transition-all duration-300 hover:border-cyber/30 hover:text-cyber"
            >
              {s}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}