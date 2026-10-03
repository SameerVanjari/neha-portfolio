import { notFound } from "next/navigation";
import { LEGACY_PROJECTS, PROJECT_MEDIA } from "@/data/legacy-projects";
import type { Project } from "@/types/portfolio";
import EditorialCaseStudy from "@/components/EditorialCaseStudy";

/**
 * Dormant archive route. Still generates pages for the 15 legacy projects so
 * old links keep resolving, but nothing in the UI links here any more — the
 * listings read the `case-studies` registry instead.
 */
const projects: Project[] = LEGACY_PROJECTS;

const CUSTOM_CASE_IDS = new Set([
  "hbo-charm-city-kings",
  "td-bank-one-vanderbilt",
  "modelo-seattle-kraken",
  "harvard-medtech",
  "turtle-bay-resort",
  "ifsg-virtual-retail",
  "research-recommender",
  "vantage-ai",
  "visagenie",
  "budgai",
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
