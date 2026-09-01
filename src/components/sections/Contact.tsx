import { profile, socials } from "@/data/portfolio";

export default function Contact() {
  return (
    <section id="contact" className="section">
      <div className="section-inner">
        <p className="mb-6 font-mono text-[11px] uppercase tracking-[0.5em] text-cyber">
          TRANSMISSION
        </p>
        <h2 className="mb-16 font-display text-[clamp(2rem,6vw,3.5rem)] leading-[1.05] tracking-tight text-paper">
          Let&apos;s design something that feels alive.
        </h2>

        <a
          href={`mailto:${profile.email}`}
          className="group inline-flex items-center gap-3 font-mono text-lg tracking-[0.1em] text-cyber transition-colors duration-300 hover:text-paper md:text-2xl"
        >
          {profile.email}
          <span className="text-faint transition-transform duration-300 group-hover:translate-x-1">→</span>
        </a>

        <div className="mt-16 grid gap-4">
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-between border-b border-white/5 py-4 transition-colors duration-300 hover:border-cyber/30"
            >
              <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-ghost transition-colors group-hover:text-cyber">
                [{s.label}]
              </span>
              <span className="font-mono text-sm text-ghost transition-all duration-300 group-hover:text-paper">
                {s.handle}
              </span>
            </a>
          ))}
        </div>

        <footer className="mt-24 flex flex-col items-center justify-between gap-3 border-t border-white/5 pt-8 pb-12 font-mono text-[10px] uppercase tracking-[0.3em] text-faint md:flex-row">
          <p>© 2026 NEHA</p>
          <p>guided by a curious bird</p>
        </footer>
      </div>
    </section>
  );
}