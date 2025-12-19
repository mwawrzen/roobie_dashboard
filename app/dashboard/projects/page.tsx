import { DataTable } from "@/components/data-table";

import data from "../data.json";
import { Project, projectService } from "@/services/project.service";
import { ProjectsDataTable } from "@/components/projects-data-table";

export default async function ProjectsPage() {
  const projects: Project[]= await projectService.getAll();

  return (
    <ProjectsDataTable data={ projects } />
  );

  // return (
  //   <main>
  //     <h1>Your projects</h1>
  //     <ul>
  //       { projects.map(( p: any )=> <li key={p.id}>{p.name}</li> )}
  //     </ul>
  //   </main>
  // );
};
