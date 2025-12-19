import { Project, projectService } from "@/services/project.service";
import { ProjectsDataTable } from "@/components/projects-data-table";

export default async function ProjectsPage() {
  const projects: Project[]= await projectService.getAll();

  return (
    <ProjectsDataTable data={ projects } />
  );
};
