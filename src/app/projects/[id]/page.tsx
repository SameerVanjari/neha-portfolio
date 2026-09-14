import { notFound } from "next/navigation";
import data from "@/data/portfolio.json";
import type { Project } from "@/types/portfolio";
import { PROJECT_MEDIA } from "@/data/projects-media";
import GenericCaseStudy from "@/components/GenericCaseStudy";
import MillenniumCaseStudy from "@/components/MillenniumCaseStudy";
import AscensionRealtyCaseStudy from "@/components/AscensionRealtyCaseStudy";
import MadeForJoyCaseStudy from "@/components/MadeForJoyCaseStudy";

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

  const media = PROJECT_MEDIA[project.id];
  const enriched = media ? { ...project, media } : project;

  const sameLens = projects.filter((p) => p.id !== project.id && p.perception === project.perception);
  const related = (sameLens.length ? sameLens : projects.filter((p) => p.id !== project.id)).slice(0, 3);

  if (project.id === "vr-training-fiber") {
    return <MillenniumCaseStudy project={enriched} related={related} />;
  }

  if (project.id === "ascension-realty") {
    return <AscensionRealtyCaseStudy project={enriched} related={related} />;
  }

  if (project.id === "made-for-joy") {
    return <MadeForJoyCaseStudy project={enriched} related={related} />;
  }

  return <GenericCaseStudy project={enriched} related={related} />;
}
