"use client";

import { User } from "@/services/user.service";
import { IconPlus } from "@tabler/icons-react";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemTitle
} from "@/components/ui/item";
import { Button } from "@/components/ui/button";
import { UserDialog } from "./user-dialog";
import { useCallback, useState } from "react";
import { removeUserAction } from "@/app/dashboard/users/actions";
import { toast } from "sonner";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "../ui/alert-dialog";

function UserItem({
  user,
  editAction,
  deleteAction
}: {
  user: User,
  editAction: ( id: number )=> void,
  deleteAction: ( id: number )=> void
}) {

  const { id, email, role, createdAt }= user;

  return (
    <Item variant="outline">
      <ItemContent>
        <ItemTitle className="text-lg">{ email }</ItemTitle>
        <ItemDescription className="text-xs">
          { role } | { createdAt }
        </ItemDescription>
      </ItemContent>
      <ItemActions>
        <Button
          variant="outline"
          size="sm"
          onClick={ ()=> editAction( user.id )}>
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
                This user will be permanently removed.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction onClick={ ()=> deleteAction( user.id )}>
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </ItemActions>
    </Item>
  );
}

export function UsersList({
  users
}: {
  users: User[]
}) {

  const [ isDialogOpen, setIsDialogOpen ]= useState<boolean>( false );
  const [ dialogType, setDialogType ]= useState<"Create"| "Edit">( "Create" );
  const [ currentUser, setCurrentUser ]= useState<User| undefined>();

  const openDialog= useCallback( ()=> setIsDialogOpen( true ), [] );
  const closeDialog= useCallback( ()=> setIsDialogOpen( false ), [] );

  function handleEdit( id: number ) {
    setCurrentUser( users.find( user=> user.id=== id ) );
    setDialogType( "Edit" );
    openDialog();
  }

  async function handleDelete( id: number) {
    const res= await removeUserAction( id );

    if( res.success )
      toast.success( res.message );
    else
      toast.error( res.message );
  }

  const userItems= users.map( user=> (
    <UserItem
      key={ user.id }
      user={ user }
      editAction={ handleEdit }
      deleteAction={ handleDelete }
    />
  ));

  return (
    <main className="flex flex-col gap-2">
      <header className="mb-4">
        <Button
          variant="secondary"
          size="default"
          onClick={ ()=> {
            setCurrentUser( undefined )
            setDialogType( "Create" )
            openDialog();
          }}
        >
          <IconPlus />
          Create
        </Button>
      </header>
      { userItems }
      <UserDialog
        type={ dialogType }
        user={ currentUser }
        isOpen={ isDialogOpen }
        close={ closeDialog }
      />
    </main>
  );
}
