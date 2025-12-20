"use client";

import { useActionState } from "react";
import { useParams } from "next/navigation";
import { IconPlus } from "@tabler/icons-react";
import { addVariableAction } from "@/app/dashboard/projects/[id]/actions";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";


export function VariablesDialog({
  title,
  open,
  closeAction
}: {
  title: string,
  open: boolean,
  closeAction: ()=> void
}) {

  const params= useParams();
  const projectId= Number( params.id );

  const [ state, formAction, isPending ]= useActionState(
    async ( prevState: any, formData: FormData )=> {
      return await addVariableAction( projectId, prevState, formData )
    }, null
  );

  return (
    <Dialog open={ open }>
      <DialogContent className="sm:max-w-[425px]">
        <form action={ formAction }>
          <DialogHeader>
            <DialogTitle>{ title }</DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 my-4">
            <Input id="key" name="key" placeholder="key" />
            <Textarea id="value" name="value" placeholder="value" />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={ closeAction }>Cancel</Button>
            <Button type="submit" onClick={ closeAction }>Add</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
