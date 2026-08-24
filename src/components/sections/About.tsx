import { profile, stats } from "@/data/portfolio";
import Reveal from "@/components/ui/Reveal";
import HUDCard from "@/components/ui/HUDCard";
import SectionLabel from "@/components/ui/SectionLabel";

export default function About() {
  return (
    <section id="about" className="relative z-10 mx-auto max-w-7xl scroll-mt-24 px-6 py-28 md:px-10 md:py-40">
      <SectionLabel index="01" label="about" />

      <div className="grid gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20">
        <div>
          <Reveal>
            <h2 className="font-display text-4xl font-bold leading-tight tracking-tight text-paper md:text-6xl">
              I design at the seam where{" "}
              <span className="text-cyber text-glow-soft">machine</span> and{" "}
              <span className="text-neon text-glow-neon">human</span> intelligence meet.
            </h2>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mt-8 max-w-2xl text-base leading-8 text-ghost">{profile.bio}</p>
          </Reveal>
          <Reveal delay={0.25}>
            <p className="mt-8 font-mono text-xs uppercase tracking-[0.3em] text-ghost">
              <span className="text-volt">▸</span> {profile.location}
            </p>
          </Reveal>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.1} from="right">
              <HUDCard className="h-full p-6 transition-colors duration-300 hover:border-cyber/40">
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
      </div>
    </section>
  );
}
