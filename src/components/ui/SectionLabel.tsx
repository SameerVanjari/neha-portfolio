import Reveal from "./Reveal";

interface SectionLabelProps {
  index: string;
  label: string;
}

export default function SectionLabel({ index, label }: SectionLabelProps) {
  return (
    <Reveal>
      <div className="mb-10 flex items-center gap-4 font-mono text-xs uppercase tracking-[0.4em] text-ghost">
        <span className="text-cyber text-glow-cyan">{index}</span>
        <span className="text-neon">{"//"}</span>
        <span>{label}</span>
        <span className="h-px flex-1 bg-gradient-to-r from-cyber/40 to-transparent" />
      </div>
    </Reveal>
  );
}
