import { profile } from "@/data/portfolio";

export default function About() {
  return (
    <section id="about" className="section">
      <div className="section-inner">
        <p className="mb-6 font-mono text-[11px] uppercase tracking-[0.5em] text-cyber">
          WHO I AM
        </p>
        <h2 className="font-display text-[clamp(2rem,6vw,3.5rem)] leading-[1.05] tracking-tight text-paper">
          {profile.bio}
        </h2>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <div className="font-mono text-sm text-ghost">
            <p>
              <span className="text-faint">Location</span>
              <br />
              {profile.location}
            </p>
            <p className="mt-4">
              <span className="text-faint">Email</span>
              <br />
              <a href={`mailto:${profile.email}`} className="transition-colors hover:text-cyber">
                {profile.email}
              </a>
            </p>
          </div>
          <div className="font-mono text-sm text-ghost">
            <p>
              <span className="text-faint">Availability</span>
              <br />
              {profile.availability}
            </p>
            <p className="mt-4">
              <span className="text-faint">Roles</span>
              <br />
              {profile.roles.join(" · ")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}