import { notFound } from "next/navigation";
import data from "@/data/portfolio.json";
import type { Project } from "@/types/portfolio";
import { PROJECT_MEDIA } from "@/data/projects-media";
import EditorialCaseStudy from "@/components/EditorialCaseStudy";

const projects = data.projects as Project[];

const CUSTOM_CASE_IDS = new Set([
  "hbo-charm-city-kings",
  "td-bank-one-vanderbilt",
  "modelo-seattle-kraken",
  "harvard-medtech",
  "turtle-bay-resort",
  "ifsg-virtual-retail",
  "research-recommender",
  "vantage-ai",
]);

export function generateStaticParams() {
  return projects.filter((p) => !CUSTOM_CASE_IDS.has(p.id)).map((p) => ({ id: p.id }));
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

  const media = PROJECT_MEDIA[project.id];
  const enriched = media ? { ...project, media } : project;

  const sameLens = projects.filter((p) => p.id !== project.id && p.perception === project.perception);
  const related = (sameLens.length ? sameLens : projects.filter((p) => p.id !== project.id)).slice(0, 3);

  return <EditorialCaseStudy project={enriched} related={related} />;
}
