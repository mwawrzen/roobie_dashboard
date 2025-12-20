import { Button } from "@/components/ui/button";
import { Item, ItemActions, ItemContent, ItemDescription, ItemTitle } from "@/components/ui/item";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { VariablesDataTable } from "@/components/projects/variables-data-table";
import { projectService } from "@/services/project.service";

export default async function Page({
  params
}: {
  params: Promise<{ id: string }>
}) {
  const { id }= await params;
  const project= await projectService.getById( +id );
  const variables= await projectService.getVariablesById( +id );

  return (
    <main>
      <Item>
        <ItemContent>
          <ItemTitle className="text-lg">{ project.name }</ItemTitle>
          {
            project.description?
              <ItemDescription className="text-xs">
                { project.description }
              </ItemDescription>:
              null
          }
        </ItemContent>
        <ItemActions>
          <Button variant="outline" size="sm">Edit</Button>
          <Button variant="destructive" size="sm">Delete</Button>
        </ItemActions>
      </Item>
      <Separator className="my-2" />
      <Tabs defaultValue="variables" className="m-4">
        <TabsList>
          <TabsTrigger value="variables">Variables</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
        </TabsList>
        <TabsContent value="variables">
          <VariablesDataTable projectId={ id } data={ variables } />
        </TabsContent>
      </Tabs>
    </main>
  );
};
