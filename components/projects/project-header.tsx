"use client";

import { useCallback, useState } from "react";
import { Project } from "@/services/project.service";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemTitle
} from "@/components/ui/item";
import { Button } from "@/components/ui/button";
import { ProjectDialog } from "@/components/projects/project-dialog";
import { removeProjectAction } from "@/app/dashboard/projects/actions";
import { toast } from "sonner";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "../ui/alert-dialog";
import { useRouter } from "next/navigation";

export function ProjectHeader({
  project
}: {
  project: Project
}) {

  const router= useRouter();

  const [ isDialogOpen, setIsDialogOpen ]= useState<boolean>( false );

  const openDialog= useCallback( ()=> setIsDialogOpen( true ), [] );
  const closeDialog= useCallback( ()=> setIsDialogOpen( false ), [] );

  const handleDelete= async ()=> {

    const res= await removeProjectAction( project.id );

    if( res.success ) {
      toast.success( res.message );
      router.push( "/dashboard/projects" );
    } else {
      toast.error( res.message );
    }
  };

  return (
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
        <Button
          variant="outline"
          size="sm"
          onClick={ openDialog }
        >
          Edit
        </Button>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive" size="sm">
              Delete
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This project will be permanently removed.
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
        <ProjectDialog
          type={ "Edit" }
          project={ project }
          isOpen={ isDialogOpen }
          close={ closeDialog }
        />
      </ItemActions>
    </Item>
  );
}
