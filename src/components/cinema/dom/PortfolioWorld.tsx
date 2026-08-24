import { projects, stats, capabilities, profile, socials } from "@/data/portfolio";
import Reveal from "@/components/ui/Reveal";
import HUDCard from "@/components/ui/HUDCard";
import TiltCard from "@/components/ui/TiltCard";

const DIM_STYLE: Record<string, { text: string; dot: string; glow: string }> = {
  PRODUCT: { text: "text-cyber", dot: "bg-cyber", glow: "group-hover:shadow-[0_0_46px_rgba(0,229,255,0.14)]" },
  UX: { text: "text-volt", dot: "bg-volt", glow: "group-hover:shadow-[0_0_46px_rgba(255,201,77,0.14)]" },
  XR: { text: "text-neon", dot: "bg-neon", glow: "group-hover:shadow-[0_0_46px_rgba(255,43,214,0.14)]" },
  AI: { text: "text-sigil", dot: "bg-sigil", glow: "group-hover:shadow-[0_0_46px_rgba(139,92,255,0.16)]" },
};

export default function PortfolioWorld() {
  return (
    <section id="world" data-scene={10} className="relative scroll-mt-20">
      <div className="mx-auto max-w-7xl px-6 pt-28 md:px-10 md:pt-40">
        <Reveal>
          <p className="mb-6 font-mono text-[11px] uppercase tracking-[0.5em] text-cyber">
            THE PORTFOLIO WORLD
          </p>
          <h2 className="serif max-w-4xl text-[clamp(2.6rem,7.5vw,6rem)] leading-[0.95] text-paper">
            Designing intelligent experiences{" "}
            <span className="serif-italic text-cyber text-glow-cyan">across realities.</span>
          </h2>
          <p className="mt-8 max-w-lg text-sm leading-7 text-ghost">
            {profile.bio}
          </p>
        </Reveal>

        {/* Stats */}
        <div className="mt-20 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08}>
              <HUDCard className="p-6">
                <p className="font-display text-5xl font-bold text-paper">
                  {s.value}
                  {s.suffix && <span className="text-cyber text-glow-cyan">{s.suffix}</span>}
                </p>
                <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.3em] text-ghost">
                  {s.label}
                </p>
              </HUDCard>
            </Reveal>
          ))}
        </div>

        {/* Projects */}
        <div className="mt-24 flex items-center gap-4 font-mono text-xs uppercase tracking-[0.4em] text-ghost">
          <span className="text-cyber">02</span>
          <span>selected work</span>
          <span className="h-px flex-1 bg-gradient-to-r from-cyber/40 to-transparent" />
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {projects.map((p, i) => {
            const ds = DIM_STYLE[p.dimension];
            return (
              <Reveal key={p.title} delay={(i % 2) * 0.1}>
                <TiltCard className="group h-full">
                  <HUDCard className={`h-full overflow-hidden transition-all duration-500 ${ds.glow}`}>
                    <div className="relative flex h-44 items-end justify-between overflow-hidden border-b border-cyber/10 bg-abyss/60 px-6 py-5">
                      <div className="bg-grid absolute inset-0 opacity-50" />
                      <span className="relative font-display text-7xl font-bold text-paper/10 transition-colors duration-500 group-hover:text-paper/20">
                        0{i + 1}
                      </span>
                      <div className="relative flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.3em]">
                        <span className={`h-1.5 w-1.5 rounded-full ${ds.dot}`} />
                        <span className={ds.text}>{p.dimension}</span>
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="flex items-baseline justify-between gap-4">
                        <h3 className="font-display text-2xl font-bold text-paper transition-colors duration-300 group-hover:text-cyber">
                          {p.title}
                        </h3>
                        <span className="font-mono text-[11px] tracking-[0.2em] text-faint">{p.year}</span>
                      </div>
                      <p className="mt-3 text-sm leading-7 text-ghost">{p.blurb}</p>
                      <div className="mt-5 flex flex-wrap gap-2">
                        {p.tags.map((t) => (
                          <span
                            key={t}
                            className="border border-paper/10 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-ghost"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </HUDCard>
                </TiltCard>
              </Reveal>
            );
          })}
        </div>

        {/* Capabilities */}
        <div className="mt-24 flex items-center gap-4 font-mono text-xs uppercase tracking-[0.4em] text-ghost">
          <span className="text-volt">03</span>
          <span>how I work</span>
          <span className="h-px flex-1 bg-gradient-to-r from-volt/40 to-transparent" />
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {capabilities.map((c, i) => (
            <Reveal key={c.id} delay={i * 0.1}>
              <HUDCard className="h-full p-7">
                <span className="font-display text-3xl font-bold text-cyber">{c.id}</span>
                <h3 className="mt-4 font-display text-xl font-bold text-paper">{c.title}</h3>
                <p className="mt-2 text-sm italic leading-6 text-ghost">{c.headline}</p>
                <ul className="mt-5 space-y-2 border-t border-cyber/10 pt-4">
                  {c.points.slice(0, 3).map((pt) => (
                    <li key={pt} className="flex items-start gap-2 font-mono text-xs text-ghost">
                      <span className="text-cyber">▸</span>
                      {pt}
                    </li>
                  ))}
                </ul>
              </HUDCard>
            </Reveal>
          ))}
        </div>

        {/* Contact */}
        <div className="mt-28 border-t border-cyber/10 pt-16">
          <Reveal>
            <p className="mb-6 font-mono text-[11px] uppercase tracking-[0.5em] text-cyber">
              04 — TRANSMISSION
            </p>
            <h2 className="serif text-[clamp(2.4rem,7vw,5.5rem)] leading-[0.95] text-paper">
              Let&apos;s design something that{" "}
              <span className="serif-italic text-neon text-glow-neon">feels alive.</span>
            </h2>
            <a
              href={`mailto:${profile.email}`}
              className="hover-line mt-8 inline-flex items-center gap-3 font-mono text-lg tracking-[0.1em] text-cyber text-glow-cyan md:text-2xl"
            >
              <span className="text-volt">$</span>
              {profile.email}
            </a>
            <p className="mt-4 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.25em] text-ghost">
              <span className="h-2 w-2 animate-pulse rounded-full bg-cyber" />
              {profile.availability} · {profile.location}
            </p>
          </Reveal>

          <div className="mt-16 grid gap-4 md:grid-cols-2">
            {socials.map((s, i) => (
              <Reveal key={s.label} delay={i * 0.05}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center justify-between border-b border-cyber/10 py-4 transition-colors duration-300 hover:border-cyber/40"
                >
                  <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-ghost transition-colors group-hover:text-cyber">
                    [{s.label}]
                  </span>
                  <span className="font-mono text-sm text-paper/70 transition-all duration-300 group-hover:translate-x-2 group-hover:text-paper">
                    {s.handle}
                  </span>
                </a>
              </Reveal>
            ))}
          </div>

          <footer className="mt-24 flex flex-col items-center justify-between gap-3 border-t border-cyber/10 pt-8 pb-12 font-mono text-[10px] uppercase tracking-[0.3em] text-faint md:flex-row">
            <p>© 2026 NEHA — designed in the future</p>
            <p className="flex items-center gap-2">
              <span className="text-cyber">▲</span> guided by a curious bird
            </p>
          </footer>
        </div>
      </div>
    </section>
  );
}
