import { Project, projectService } from "@/services/project.service";
import { ProjectsDataTable } from "@/components/projects-data-table";
import { Button } from "@/components/ui/button";
import { IconPlus } from "@tabler/icons-react";

export default async function ProjectsPage() {
  const projects: Project[]= await projectService.getAll();

  return (
    <main>
      <header className="mb-6">
        <Button variant="secondary" size="default">
          <IconPlus />
          Create
        </Button>
      </header>
      <ProjectsDataTable data={ projects } />
    </main>
  );
};
