import { dimensions } from "@/data/portfolio";

export default function Dimensions() {
  return (
    <section id="dimensions" className="section">
      <div className="section-inner">
        <p className="mb-6 font-mono text-[11px] uppercase tracking-[0.5em] text-cyber">
          FOUR WORLDS
        </p>
        <h2 className="mb-16 font-display text-[clamp(2rem,6vw,3.5rem)] leading-[1.05] tracking-tight text-paper">
          Every discipline is a dimension you can enter.
        </h2>
        <div className="grid-3">
          {dimensions.map((d, i) => (
            <a
              key={d.id}
              href={`#world`}
              className="dimension-card group reveal"
              data-reveal-delay={i}
            >
              <span className="font-display text-5xl font-bold tracking-wide text-ghost transition-colors duration-300 group-hover:text-cyber">
                {d.id}
              </span>
              <h3 className="mt-4 font-display text-lg font-bold text-paper">
                {d.headline}
              </h3>
              <p className="mt-3 text-sm leading-6 text-ghost">
                {d.description}
              </p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}