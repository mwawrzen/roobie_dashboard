"use client";

import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef
} from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Project } from "@/services/project.service";
import { IconArchive, IconCalendarTime, IconCircleCheckFilled, IconPlus, IconTrash } from "@tabler/icons-react";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { ProjectDialog } from "./project-dialog";
import { removeProjectAction } from "@/app/dashboard/projects/actions";
import { toast } from "sonner";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "../ui/alert-dialog";

export const columns: ColumnDef<Project>[] = [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => (
      <div>{ row.getValue( "id" )}</div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => (
      <div>{ row.getValue( "name" )}</div>
    ),
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => (
      <div>{ row.getValue( "description" )}</div>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <Badge variant="outline">
        {
          row.original.status=== "PLANNED"?
            <><IconCalendarTime /> Planned</>:
              row.original.status=== "ARCHIVED"?
                <><IconArchive /> Archived</>:
                <>
                  <IconCircleCheckFilled
                    className="fill-green-500 dark:fill-green-400"
                  />
                  Active
                </>
        }
      </Badge>
    ),
  },
  {
    accessorKey: "createdAt",
    header: "Created",
    cell: ({ row }) => (
      <div className="lowercase">{ row.getValue( "createdAt" )}</div>
    )
  },
  {
    id: "manage",
    enableHiding: false,
    cell: ({ row })=> {
      return (
        <Button variant="outline" size="sm" asChild>
          <Link href={ `/dashboard/projects/${ row.original.id }` }>Manage</Link>
        </Button>
      );
    }
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row, table }) => {
      const project = row.original;
      const {
        handleDelete,
        openDialog,
        setDialogType,
        setCurrentProject
      }= table.options.meta as {
        handleDelete: ( id: number )=> void;
        openDialog: ()=> void,
        setDialogType: ( type: "Create"| "Edit" )=> void,
        setCurrentProject: ( project: Project )=> void;
      };

      const [ isDialogOpen, setIsDialogOpen ]= useState<boolean>( false );

      return (
        <>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                onClick={ ()=> {
                  setDialogType( "Edit" );
                  setCurrentProject( project );
                  openDialog();
                }}
              >
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                className="text-destructive"
                onClick={ ()=> setIsDialogOpen( true )}
              >
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <AlertDialog open={ isDialogOpen }>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This project will be permanently removed.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel
                  onClick={ ()=> setIsDialogOpen( false )}
                >
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction
                  onClick={ ()=> {
                    handleDelete( project.id );
                    setIsDialogOpen( false );
                  }}
                >
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </>
      )
    },
  },
]

export function ProjectsDataTable({ data }: { data: Project[] }) {

  const [ rows, setRows ]= useState<Project[]>( ()=> data );

  useEffect( ()=> {
    if( data!== rows )
      setRows( data );
  }, [ data, rows ])

  const handleDelete= async ( id: number )=> {
    const prevRows= rows;

    setRows( prev=> prev.filter( row=> row.id!== id ));

    const res= await removeProjectAction( id );

    if( res.success ) {
      toast.success( res.message );
    } else {
      setRows( prevRows );
      toast.error( res.message );
    }
  };

  const [ dialogOpen, setDialogOpen ]= useState<boolean>( false );
  const [ dialogType, setDialogType ]= useState<"Create"| "Edit">( "Create" );
  const [ currentProject, setCurrentProject ]= useState<Project| undefined>();

  const openDialog= useCallback( ()=> setDialogOpen( true ), [] );
  const closeDialog= useCallback( ()=> setDialogOpen( false ), [] );

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    meta: {
      handleDelete,
      openDialog,
      setDialogType,
      setCurrentProject
    }
  });

  return (
    <div className="w-full">
      <header className="mb-4">
        <Button
          variant="secondary"
          size="default"
          onClick={ ()=> {
            setCurrentProject( undefined )
            setDialogType( "Create" )
            openDialog();
          }}
        >
          <IconPlus />
          Create
        </Button>
        <ProjectDialog
          type={ dialogType }
          project={ currentProject }
          isOpen={ dialogOpen }
          close={ closeDialog }
        />
      </header>
      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            { table.getHeaderGroups().map( headerGroup=> (
              <TableRow key={ headerGroup.id }>
                { headerGroup.headers.map( header=> {
                  return (
                    <TableHead key={ header.id }>
                      {
                        header.isPlaceholder ? null: flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )
                      }
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {
              table.getRowModel().rows?.length? (
                table.getRowModel().rows.map( row=> (
                  <TableRow key={ row.id }>
                    {
                      row.getVisibleCells().map( cell=> (
                        <TableCell key={ cell.id }>
                          {
                            flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )
                          }
                        </TableCell>
                      ))
                    }
                  </TableRow>
                ))
              ): (
                <TableRow>
                  <TableCell
                    colSpan={ columns.length }
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )
            }
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
