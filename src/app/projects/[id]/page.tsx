import { notFound } from "next/navigation";
import data from "@/data/portfolio.json";
import type { Project } from "@/types/portfolio";
import ProjectCaseStudy from "@/components/ProjectCaseStudy";

const projects = data.projects as Project[];

export function generateStaticParams() {
  return projects.map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const project = projects.find((p) => p.id === id);
  if (!project) return { title: "Project — NEHA" };
  return {
    title: `${project.title} — NEHA`,
    description: project.blurb,
  };
}

export default async function ProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const project = projects.find((p) => p.id === id);
  if (!project) notFound();

  const sameLens = projects.filter((p) => p.id !== project.id && p.perception === project.perception);
  const related = (sameLens.length ? sameLens : projects.filter((p) => p.id !== project.id)).slice(0, 3);

  return <ProjectCaseStudy project={project} related={related} />;
}
