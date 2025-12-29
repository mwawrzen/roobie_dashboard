"use client";

import { useActionState } from "react";
import { toast } from "sonner";
import { ActionResponse } from "@/app/interfaces";
import { User } from "@/services/user.service";
import {
  createUserAction,
  editUserAction
} from "@/app/dashboard/users/actions";
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
import { Button } from "@/components/ui/button";

export function UserDialog({
  type,
  user,
  isOpen,
  close
}: {
  type: "Create"| "Edit",
  user?: User,
  isOpen: boolean,
  close: ()=> void
}) {

  const [ _state, formAction, isPending ]= useActionState(
    async ( _prevState: any, formData: FormData )=> {

      let res: ActionResponse| null= null;

      if( type=== "Create" ) {
        res= await createUserAction( formData );
      } else {
        if( !user )
          return toast.error( "No user data given" );
        res= await editUserAction( user.id, formData );
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
            <DialogTitle>{ type } User</DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 my-4">
            <Input
              id="email"
              name="email"
              placeholder="email"
              type="email"
              defaultValue={ user?.email || "" }
            />
            <Input
              id="password"
              name="password"
              placeholder="password"
              type="password"
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
