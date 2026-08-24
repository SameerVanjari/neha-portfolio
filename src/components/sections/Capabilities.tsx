import { capabilities } from "@/data/portfolio";
import Reveal from "@/components/ui/Reveal";
import HUDCard from "@/components/ui/HUDCard";
import SectionLabel from "@/components/ui/SectionLabel";

const ID_STYLE: Record<string, string> = {
  AI: "text-cyber text-glow-cyan",
  XR: "text-neon text-glow-neon",
  UX: "text-volt",
};

const BORDER: Record<string, string> = {
  AI: "hover:border-cyber/50",
  XR: "hover:border-neon/50",
  UX: "hover:border-volt/50",
};

export default function Capabilities() {
  return (
    <section
      id="capabilities"
      className="relative z-10 mx-auto max-w-7xl scroll-mt-24 px-6 py-28 md:px-10 md:py-40"
    >
      <SectionLabel index="03" label="capabilities" />

      <div className="grid gap-6 md:grid-cols-3">
        {capabilities.map((c, i) => (
          <Reveal key={c.id} delay={i * 0.12} from="up">
            <HUDCard
              className={`group h-full p-8 transition-colors duration-500 hover:border-cyber/40 ${BORDER[c.id]}`}
            >
              <div className="flex items-center justify-between">
                <span className={`font-display text-5xl font-bold ${ID_STYLE[c.id]}`}>{c.id}</span>
                <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-faint">
                  0{i + 1} / MODULE
                </span>
              </div>
              <h3 className="mt-8 font-display text-2xl font-bold text-paper">{c.title}</h3>
              <p className="mt-3 text-sm italic leading-6 text-ghost">{c.headline}</p>
              <ul className="mt-8 space-y-3 border-t border-cyber/10 pt-6">
                {c.points.map((pt) => (
                  <li key={pt} className="flex items-start gap-3 font-mono text-xs tracking-wide text-ghost">
                    <span className="mt-0.5 text-cyber">▸</span>
                    {pt}
                  </li>
                ))}
              </ul>
            </HUDCard>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
