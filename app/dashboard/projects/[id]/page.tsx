import { Button } from "@/components/ui/button";
import { Item, ItemActions, ItemContent, ItemDescription, ItemTitle } from "@/components/ui/item";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { projectService } from "@/services/project.service";

export default async function Page({
  params
}: {
  params: Promise<{ id: string }>
}) {
  const { id }= await params;
  const project= await projectService.getById( +id );
  const variables= projectService.getVariablesById( +id );

  return (
    <main>
      <Item variant="outline">
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
      <Tabs defaultValue="variables">
        <TabsList>
          <TabsTrigger value="variables">Variables</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
        </TabsList>
        <TabsContent value="variables">

        </TabsContent>
      </Tabs>
      {/* <h2>Project</h2>
      <p>ID: { id }</p>
      <p>Name: { name }</p>
      <p>Description: { description|| "---" }</p>
      <p>Status: { status }</p>
      <p>Created: { createdAt }</p> */}
    </main>
  );
};
