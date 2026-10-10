import ProjectLightbox from "@/components/ProjectLightbox";

/**
 * Wraps every `/projects` route. The lightbox it mounts is gated to detail
 * routes (`/projects/<id>`) inside the component, so the listing page is
 * unaffected.
 */
export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <ProjectLightbox />
    </>
  );
}
