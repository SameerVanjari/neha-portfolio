import ProjectsList from "@/components/ProjectsList";

// Read searchParams on the server and pass `lens` down as a prop.
// This avoids `useSearchParams()` (which suspends during client navigation
// and can leave the page stuck on its fallback until a reload).
export default async function ProjectsPage({
  searchParams,
}: {
  searchParams: Promise<{ lens?: string }>;
}) {
  const { lens } = await searchParams;
  return <ProjectsList lens={lens ?? null} />;
}
