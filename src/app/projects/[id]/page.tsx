import { notFound } from "next/navigation";
import Link from "next/link";
import data from "@/data/portfolio.json";

export function generateStaticParams() {
  return data.islands.map((i) => ({ id: i.id }));
}

export function generateMetadata({ params }: { params: { id: string } }) {
  const project = data.islands.find((p) => p.id === params.id);
  return { title: project ? project.title : "Project" };
}

export default function ProjectDetail({ params }: { params: { id: string } }) {
  const project = data.islands.find((p) => p.id === params.id);
  if (!project) return notFound();

  return (
    <div className="mx-auto max-w-3xl px-6 py-12 md:py-16">
      <Link href="/projects" className="text-sm text-muted-foreground hover:text-foreground hover:underline">
        ← Back to projects
      </Link>
      <div className="mt-6 overflow-hidden rounded-xl border">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={project.image} alt={project.imageAlt} className="aspect-[16/9] w-full object-cover" />
      </div>
      <div className="mt-8 flex flex-wrap items-center gap-2">
        <span
          className="rounded-full border px-2.5 py-1 text-xs font-semibold"
          style={{ borderColor: project.color, color: project.color }}
        >
          {project.label}
        </span>
        <span className="text-xs text-muted-foreground">{project.subtitle}</span>
        <span className="ml-auto text-xs text-muted-foreground">{project.stat}</span>
      </div>
      <h1 className="text-display mt-4 text-3xl font-bold tracking-[-0.03em] md:text-4xl">{project.title}</h1>
      <p className="mt-4 text-muted-foreground">{project.description}</p>

      <div className="mt-8 rounded-xl border bg-muted/20 p-6">
        <h2 className="text-display text-sm font-semibold">Case study template</h2>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          This is a placeholder detail page wired to <code className="rounded bg-muted px-1 py-0.5 text-xs">portfolio.json</code>. Replace with
          real content: problem → approach → outcome, with motion and GSAP flourishes.
        </p>
        <ul className="mt-4 list-disc space-y-1 pl-5 text-sm text-muted-foreground">
          <li>Use Motion for entrance + scroll reveals.</li>
          <li>Use GSAP + ScrollTrigger for pinned or scrubbed sections.</li>
          <li>Pull real project media into <code className="rounded bg-muted px-1 py-0.5 text-xs">public/</code> and extend the JSON.</li>
        </ul>
      </div>
    </div>
  );
}
