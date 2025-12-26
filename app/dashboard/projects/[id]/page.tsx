import { Button } from "@/components/ui/button";
import { Item, ItemActions, ItemContent, ItemDescription, ItemTitle } from "@/components/ui/item";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { VariablesDataTable } from "@/components/projects/variables-data-table";
import { projectService } from "@/services/project.service";
import { notFound } from "next/navigation";
import { ProjectDialog } from "@/components/projects/project-dialog";
import { ProjectHeader } from "@/components/projects/project-header";
import { UsersList } from "@/components/projects/users-list";

export default async function Page({
  params
}: {
  params: Promise<{ id: string }>
}) {

  const id= Number(( await params ).id );

  if( !Number.isInteger( id )|| id<= 0 )
    notFound();

  const [ project, variables ]= await Promise.all([
    projectService.getById( id ),
    projectService.getVariablesById( id )
  ]);

  return (
    <main>
      <ProjectHeader project={ project } />
      <Separator className="my-2" />
      <Tabs defaultValue="variables" className="m-4">
        <TabsList>
          <TabsTrigger value="variables">Variables</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
        </TabsList>
        <TabsContent value="variables">
          <VariablesDataTable projectId={ id } data={ variables } />
        </TabsContent>
        <TabsContent value="users">
          <UsersList projectId={ project.id } />
        </TabsContent>
      </Tabs>
    </main>
  );
};
