import data from "@/data/portfolio.json";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/site/reveal";

export const metadata = { title: "Projects" };

export default function ProjectsPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-12 md:py-16">
      <Reveal>
        <p className="text-sm font-medium uppercase tracking-widest text-muted-foreground">Projects</p>
        <h1 className="text-display mt-3 text-3xl font-bold tracking-[-0.03em] md:text-5xl">Selected work</h1>
        <p className="mt-4 max-w-2xl text-muted-foreground">
          A foundation populated directly from <code className="rounded bg-muted px-1 py-0.5 text-xs">portfolio.json</code>. Replace each
          island with a real case study as you ship. The routing is already wired:{" "}
          <code className="rounded bg-muted px-1 py-0.5 text-xs">/projects/[id]</code>.
        </p>
      </Reveal>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {data.islands.map((project, idx) => (
          <Reveal key={project.id} delay={idx * 0.06}>
            <Card className="group flex flex-col overflow-hidden">
              <div className="overflow-hidden border-b">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={project.image}
                  alt={project.imageAlt}
                  className="aspect-[16/10] w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  loading="lazy"
                />
              </div>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Badge variant="outline" style={{ borderColor: project.color, color: project.color }}>
                    {project.subtitle}
                  </Badge>
                  <span className="text-xs text-muted-foreground">{project.stat}</span>
                </div>
                <CardTitle>{project.title}</CardTitle>
                <CardDescription>{project.description}</CardDescription>
              </CardHeader>
              <CardContent className="mt-auto flex items-center justify-between pt-0">
                <span className="text-xs font-medium tracking-widest text-muted-foreground">{project.label}</span>
                {/* Placeholder for future detail page */}
                <span className="text-sm font-medium text-foreground">Soon →</span>
              </CardContent>
            </Card>
          </Reveal>
        ))}
      </div>

      {/* Dimensions as filter hint */}
      <Reveal delay={0.2}>
        <div className="mt-12 rounded-xl border border-dashed bg-muted/20 p-6">
          <h2 className="text-display text-sm font-semibold tracking-tight">Data-driven</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            This page reads from <code className="rounded bg-muted px-1 py-0.5 text-xs">src/data/portfolio.json</code> so you can keep a single
            source of truth. Extend the JSON with case studies, then map them here.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {data.dimensions.map((d) => (
              <span key={d.id} className="inline-flex items-center gap-2 rounded-full border bg-background px-3 py-1 text-xs">
                <span className="h-2 w-2 rounded-full" style={{ background: d.color }} />
                {d.id}
              </span>
            ))}
          </div>
        </div>
      </Reveal>
    </div>
  );
}
