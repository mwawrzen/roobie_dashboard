"use client";

import { useActionState } from "react";
import { useParams } from "next/navigation";
import {
  addVariableAction,
  editVariableAction
} from "@/app/dashboard/projects/[id]/actions";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Project, Variable } from "@/services/project.service";
import { toast } from "sonner";
import { ActionResponse } from "@/app/interfaces";
import { createProjectAction, editProjectAction } from "@/app/dashboard/projects/actions";


export function ProjectDialog({
  type,
  project,
  isOpen,
  close
}: {
  type: "Create"| "Edit",
  project?: Project,
  isOpen: boolean,
  close: ()=> void
}) {

  const [ _state, formAction, isPending ]= useActionState(
    async ( _prevState: any, formData: FormData )=> {

      let res: ActionResponse| null= null;

      if( type=== "Create" ) {
        res= await createProjectAction( formData );
      } else {
        if( !project )
          return toast.error( "No project data given" );
        res= await editProjectAction( project.id, formData );
      }

      if( res.success )
        toast.success( res.message );
      else
        toast.error( res.message );
    },
    null
  );

  return (
    <Dialog open={ isOpen }>
      <DialogContent className="sm:max-w-[425px]" showCloseButton={ false }>
        <form action={ formAction }>
          <DialogHeader>
            <DialogTitle>{ type } Project</DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 my-4">
            <Input
              id="name"
              name="name"
              placeholder="name"
              defaultValue={ project?.name || "" }
            />
            <Textarea
              id="description"
              name="description"
              placeholder="description"
              defaultValue={ project?.description || "" }
            />
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" onClick={ close }>Cancel</Button>
            </DialogClose>
            <Button type="submit" onClick={ close } disabled={ isPending }>
              { type }
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
