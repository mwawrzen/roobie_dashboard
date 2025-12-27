"use client";

import { User } from "@/services/user.service";
import { IconX } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from "@/components/ui/alert-dialog";
import { removeProjectUserAction } from "@/app/dashboard/projects/[id]/actions";
import { toast } from "sonner";

export default function UserRow({
  user,
  projectId
}: {
  user: User,
  projectId: number
}) {

  const handleDelete= async ()=> {
    const res= await removeProjectUserAction( user.id, projectId );

    if( res.success )
      toast.success( res.message );
    else
      toast.error( res.message );
  }

  return (
    <TableRow>
      <TableCell>
        { user.id }
      </TableCell>
      <TableCell>
        { user.email }
      </TableCell>
      <TableCell>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="ghost" size="icon" onClick={()=> {}}>
              <IconX className="text-destructive" />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                User will be removed from the project.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction onClick={ handleDelete }>
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </TableCell>
    </TableRow>
  );
}
