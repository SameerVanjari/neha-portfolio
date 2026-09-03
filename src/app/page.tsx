import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/site/reveal";
import data from "@/data/portfolio.json";

export default function Home() {
  return (
    <div className="mx-auto max-w-6xl px-6">
      {/* Hero */}
      <section className="py-16 md:py-24">
        <Reveal>
          <div className="max-w-3xl">
            <Badge variant="secondary" className="mb-4">
              {data.profile.availability} • {data.profile.location}
            </Badge>
            <h1 className="text-display text-4xl font-bold leading-[0.95] tracking-[-0.04em] md:text-6xl">
              {data.profile.name} <span className="text-muted-foreground font-light">—</span>
              <br />
              <span className="font-light text-muted-foreground">Designing where</span> intelligence
              <br />
              meets human needs.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">{data.profile.tagline}</p>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">{data.profile.bio}</p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <div className="flex flex-wrap gap-2">
                {data.profile.roles.map((role) => (
                  <Badge key={role} variant="outline" className="rounded-full">
                    {role}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="mt-8 flex gap-3">
              <Link
                href="/projects"
                className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-6 text-sm font-medium text-primary-foreground hover:bg-primary/90"
              >
                View projects
              </Link>
              <Link
                href="/about"
                className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-6 text-sm font-medium hover:bg-accent"
              >
                About Neha
              </Link>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Dimensions */}
      <section className="border-t py-12">
        <Reveal>
          <div className="mb-8 flex items-baseline justify-between">
            <h2 className="text-display text-2xl font-semibold tracking-tight">Dimensions</h2>
            <Link href="/projects" className="text-sm text-muted-foreground hover:text-foreground hover:underline">
              Explore all →
            </Link>
          </div>
        </Reveal>
        <div className="grid gap-6 md:grid-cols-2">
          {data.islands.map((island, idx) => (
            <Reveal key={island.id} delay={idx * 0.06}>
              <Card className="group overflow-hidden transition-colors hover:bg-accent/40">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <Badge
                      variant="outline"
                      style={{ borderColor: island.color, color: island.color }}
                      className="rounded-full bg-transparent"
                    >
                      {island.label}
                    </Badge>
                    <span className="text-xs text-muted-foreground">{island.stat}</span>
                  </div>
                  <CardTitle className="pt-3 text-xl">{island.title}</CardTitle>
                  <CardDescription>{island.subtitle}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm leading-relaxed text-muted-foreground">{island.description}</p>
                  <div className="overflow-hidden rounded-lg border">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={island.image}
                      alt={island.imageAlt}
                      className="aspect-[16/9] w-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                      loading="lazy"
                    />
                  </div>
                </CardContent>
              </Card>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Approach */}
      <section className="border-t py-12">
        <Reveal>
          <h2 className="text-display text-2xl font-semibold tracking-tight">How I work</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-4">
            {data.dimensions.map((d, idx) => (
              <Reveal key={d.id} delay={idx * 0.05}>
                <div className="rounded-xl border bg-card p-6">
                  <div className="mb-3 h-1 w-8 rounded-full" style={{ background: d.color }} />
                  <h3 className="text-sm font-semibold tracking-tight">{d.headline}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{d.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Reveal>
      </section>

      {/* Contact teaser */}
      <section className="border-t py-12 pb-16">
        <Reveal>
          <Card className="border-dashed">
            <CardContent className="flex flex-col gap-4 p-6 md:flex-row md:items-center md:justify-between md:p-8">
              <div>
                <h3 className="text-display text-lg font-semibold">Let&apos;s build something kind and intelligent.</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {data.profile.email} — I reply within 24 hours.
                </p>
              </div>
              <a
                href={`mailto:${data.profile.email}`}
                className="inline-flex h-10 shrink-0 items-center justify-center rounded-md bg-primary px-6 text-sm font-medium text-primary-foreground hover:bg-primary/90"
              >
                Start a conversation
              </a>
            </CardContent>
          </Card>
        </Reveal>
      </section>
    </div>
  );
}
