import { skills } from "@/data/portfolio";

export default function Ticker() {
  const items = [...skills, ...skills];
  return (
    <div className="relative z-10 overflow-hidden border-y border-cyber/15 bg-abyss/70 py-3.5 backdrop-blur">
      <div className="ticker-track flex w-max items-center font-mono text-[11px] uppercase tracking-[0.32em] text-ghost">
        {items.map((s, i) => (
          <span key={i} className="flex items-center whitespace-nowrap">
            <span className="mx-6 text-cyber/80">◆</span>
            {s}
          </span>
        ))}
      </div>
    </div>
  );
}
