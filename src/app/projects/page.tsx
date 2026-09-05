import { Suspense } from "react";
import ProjectsList from "@/components/ProjectsList";

export default function ProjectsPage() {
  return (
    <Suspense fallback={<div className="min-h-dvh bg-white" />}>
      <ProjectsList />
    </Suspense>
  );
}
