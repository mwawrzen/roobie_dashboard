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
import { authService } from "@/services/auth.service";

export default async function Page({
  params
}: {
  params: Promise<{ id: string }>
}) {

  const id= Number(( await params ).id );

  if( !Number.isInteger( id )|| id<= 0 )
    notFound();

  const [ me, project, variables ]= await Promise.all([
    authService.getMe(),
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
          {
            me.role=== "ADMIN"&&
            <TabsTrigger value="users">Users</TabsTrigger>
          }
        </TabsList>
        <TabsContent value="variables">
          <VariablesDataTable projectId={ id } data={ variables } />
        </TabsContent>
        {
          me.role=== "ADMIN"&&
          <TabsContent value="users">
            <UsersList projectId={ project.id } />
          </TabsContent>
        }
      </Tabs>
    </main>
  );
};
