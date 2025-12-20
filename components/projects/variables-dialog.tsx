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
import { Variable } from "@/services/project.service";


export function VariablesDialog({
  type,
  variable,
  isOpen,
  close
}: {
  type: "Edit"| "Add",
  variable?: Variable,
  isOpen: boolean,
  close: ()=> void
}) {

  const params= useParams();
  const projectId= Number( params.id );

  const [ state, formAction, isPending ]= useActionState(
    async ( prevState: any, formData: FormData )=> {
      if( type=== "Add")
        return await addVariableAction( projectId, prevState, formData );
      return await editVariableAction( projectId, prevState, formData );
    }, null
  );

  return (
    <Dialog open={ isOpen }>
      <DialogContent className="sm:max-w-[425px]" showCloseButton={ false }>
        <form action={ formAction }>
          <DialogHeader>
            <DialogTitle>{ type } Variable</DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 my-4">
            <Input
              id="key"
              name="key"
              placeholder="key"
              defaultValue={ variable?.key || "" }
            />
            <Textarea
              id="value"
              name="value"
              placeholder="value"
              defaultValue={ variable?.value || "" }
            />
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" onClick={ close }>Cancel</Button>
            </DialogClose>
            <Button type="submit" onClick={ close }>
              { type }
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
