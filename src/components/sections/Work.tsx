import { projects, type Project } from "@/data/portfolio";
import Reveal from "@/components/ui/Reveal";
import HUDCard from "@/components/ui/HUDCard";
import TiltCard from "@/components/ui/TiltCard";
import SectionLabel from "@/components/ui/SectionLabel";

const ACCENT: Record<Project["accent"], { text: string; dot: string; glow: string }> = {
  cyan: { text: "text-cyber", dot: "bg-cyber", glow: "group-hover:shadow-[0_0_40px_rgba(0,240,255,0.12)]" },
  neon: { text: "text-neon", dot: "bg-neon", glow: "group-hover:shadow-[0_0_40px_rgba(255,43,214,0.12)]" },
  volt: { text: "text-volt", dot: "bg-volt", glow: "group-hover:shadow-[0_0_40px_rgba(255,201,77,0.12)]" },
  sigil: { text: "text-sigil", dot: "bg-sigil", glow: "group-hover:shadow-[0_0_40px_rgba(124,92,255,0.12)]" },
};

export default function Work() {
  return (
    <section id="work" className="relative z-10 mx-auto max-w-7xl scroll-mt-24 px-6 py-28 md:px-10 md:py-40">
      <SectionLabel index="02" label="selected work" />

      <div className="grid gap-6 md:grid-cols-2">
        {projects.map((p, i) => {
          const accent = ACCENT[p.accent];
          return (
            <Reveal key={p.title} delay={(i % 2) * 0.1} from="up">
              <TiltCard className="group h-full">
                <HUDCard className={`h-full overflow-hidden transition-all duration-500 ${accent.glow}`}>
                  <div className="relative flex h-44 items-end justify-between overflow-hidden border-b border-cyber/10 bg-abyss/60 px-6 py-5">
                    <div className="bg-grid absolute inset-0 opacity-50" />
                    <span className="relative font-display text-7xl font-bold text-paper/10 transition-colors duration-500 group-hover:text-paper/20">
                      0{i + 1}
                    </span>
                    <div className="relative flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.3em]">
                      <span className={`h-1.5 w-1.5 rounded-full ${accent.dot}`} />
                      <span className={accent.text}>{p.category}</span>
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
    </section>
  );
}
