"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { Project } from "@/services/project.service";
import { ProjectDialog } from "@/components/projects/project-dialog";
import { removeProjectAction } from "@/app/dashboard/projects/actions";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  IconArchive,
  IconCalendarTime,
  IconCircleCheckFilled,
  IconDots,
  IconMistOff,
  IconPlus
} from "@tabler/icons-react";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef
} from "@tanstack/react-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle
} from "@/components/ui/empty";

export const columns: ColumnDef<Project>[]= [
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
    )
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => (
      <div>{ row.getValue( "description" )}</div>
    )
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {

      const badgeData= {
        PLANNED: { text: "Planned", icon: <IconCalendarTime /> },
        ARCHIVED: { text: "Archived", icon: <IconArchive /> },
        ACTIVE: { text: "Active", icon: <IconCircleCheckFilled /> }
      }[ row.original.status ];

      return (
        <Badge variant="outline">
          { badgeData.icon } { badgeData.text }
        </Badge>
      );
    }
  },
  {
    id: "manage",
    enableHiding: false,
    cell: ({ row })=> {
      return (
        <Button variant="outline" size="sm" asChild>
          <Link href={ `/dashboard/projects/${ row.original.id }` }>
            Manage
          </Link>
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
                <IconDots />
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
    }
  }
];

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
      { !rows.length? (
        <Empty>
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <IconMistOff />
            </EmptyMedia>
            <EmptyTitle>No projects</EmptyTitle>
            <EmptyDescription>
              There are no project. You can create a project by clicking button
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <Button
              onClick={ ()=> {
                setDialogType( "Create" );
                openDialog();
              }}
            >
              Create project
            </Button>
          </EmptyContent>
        </Empty>
      ): (
        <>
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
          </header>
          <div className="overflow-hidden rounded-md border">
            <Table>
              <TableHeader>
                { table.getHeaderGroups().map( headerGroup=> (
                  <TableRow key={ headerGroup.id }>
                    { headerGroup.headers.map( header=> (
                        <TableHead key={ header.id }>
                          { header.isPlaceholder? null: flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )
                          }
                        </TableHead>
                      )
                    )}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                { table.getRowModel().rows?.length? (
                    table.getRowModel().rows.map( row=> (
                      <TableRow key={ row.id }>
                        { row.getVisibleCells().map( cell=> (
                            <TableCell key={ cell.id }>
                              {
                                flexRender(
                                  cell.column.columnDef.cell,
                                  cell.getContext()
                                )
                              }
                            </TableCell>
                        ))}
                      </TableRow>
                    ))
                  ): null
                }
              </TableBody>
            </Table>
          </div>
        </>
      )}
      <ProjectDialog
        type={ dialogType }
        project={ currentProject }
        isOpen={ dialogOpen }
        close={ closeDialog }
      />
    </div>
  );
};
