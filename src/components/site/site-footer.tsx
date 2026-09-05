import Link from "next/link";
import data from "@/data/portfolio.json";

export function SiteFooter() {
  return (
    <footer className="border-t">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="text-display text-sm font-bold tracking-tight">NEHA — {data.profile.tagline}</div>
            <p className="mt-2 max-w-xl text-sm text-muted-foreground">{data.profile.bio}</p>
          </div>
          <div className="flex flex-wrap gap-3 text-sm">
            {data.socials.map((s) => (
              <Link key={s.label} href={s.href} className="text-muted-foreground hover:text-foreground hover:underline">
                {s.label}
              </Link>
            ))}
          </div>
        </div>
        <div className="mt-8 flex flex-col gap-1 border-t pt-6 text-xs text-muted-foreground md:flex-row md:justify-between">
          <span>
            {data.profile.location} · {data.profile.availability}
          </span>
          <span>© {new Date().getFullYear()} Neha. All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
}
