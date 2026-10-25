import { ProjectsSection } from "../components/ProjectsSection";

import { projects } from "../data/projects";

export function ProjectsPage() {
  return (
    <div className="py-12 min-h-screen">
        <ProjectsSection projects={projects} />
    </div>
  );
}
