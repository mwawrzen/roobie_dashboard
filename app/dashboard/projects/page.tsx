import { Project, projectService } from "@/services/project.service";
import { ProjectsDataTable } from "@/components/projects/projects-data-table";
import { Button } from "@/components/ui/button";
import { IconPlus } from "@tabler/icons-react";

export default async function ProjectsPage() {

  const projects: Project[]= await projectService.getAll();

  return (
    <main>
      <ProjectsDataTable data={ projects } />
    </main>
  );
};
