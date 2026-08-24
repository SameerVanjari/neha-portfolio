import { profile, socials } from "@/data/portfolio";
import Reveal from "@/components/ui/Reveal";
import SectionLabel from "@/components/ui/SectionLabel";

export default function Contact() {
  return (
    <section id="contact" className="relative z-10 scroll-mt-24 px-6 pb-16 pt-28 md:px-10 md:pt-40">
      <div className="mx-auto max-w-7xl">
        <SectionLabel index="04" label="transmission" />

        <Reveal>
          <h2 className="font-display text-[clamp(2.5rem,8vw,6rem)] font-bold leading-[0.95] tracking-tight text-paper">
            Let&apos;s build the{" "}
            <span className="glitch text-cyber text-glow-cyan" data-glitch="future.">
              future.
            </span>
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="mt-8 max-w-xl text-base leading-8 text-ghost">
            Have a product that deserves an intelligent, immersive interface? Open a channel — I
            reply within 48 hours.
          </p>
        </Reveal>

        <Reveal delay={0.2}>
          <a
            href={`mailto:${profile.email}`}
            className="hover-line mt-10 inline-flex items-center gap-3 font-mono text-lg tracking-[0.1em] text-cyber text-glow-cyan md:text-2xl"
          >
            <span className="text-volt">$</span>
            {profile.email}
          </a>
        </Reveal>

        <Reveal delay={0.28}>
          <div className="mt-6 flex flex-wrap items-center gap-4 font-mono text-[11px] uppercase tracking-[0.25em] text-ghost">
            <span className="flex items-center gap-2 border border-cyber/30 bg-cyber/5 px-4 py-2">
              <span className="h-2 w-2 animate-pulse rounded-full bg-cyber" />
              {profile.availability}
            </span>
          </div>
        </Reveal>

        <div className="mt-20 grid gap-4 border-t border-cyber/10 pt-8 md:grid-cols-2">
          {socials.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.06} from="left">
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

        <footer className="mt-24 flex flex-col items-center justify-between gap-3 border-t border-cyber/10 pt-8 font-mono text-[10px] uppercase tracking-[0.3em] text-faint md:flex-row">
          <p>© 2026 NEHA — designed in the future</p>
          <p className="flex items-center gap-2">
            <span className="text-cyber">▲</span> rendered by neural core v3.0
          </p>
        </footer>
      </div>
    </section>
  );
}
