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
import { IconArchive, IconCalendarTime, IconCircleCheckFilled } from "@tabler/icons-react";
import Link from "next/link";

export const columns: ColumnDef<Project>[] = [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => (
      <div className="capitalize">{ row.getValue( "id" )}</div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => (
      <div className="capitalize">{ row.getValue( "name" )}</div>
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
    cell: ({ row }) => {
      const project = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={
                () => navigator.clipboard.writeText( String( project.id ))
              }
            >
              Copy project ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuItem>Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]

export function ProjectsDataTable({ data }: { data: Project[] }) {

  const table = useReactTable({
    data,
    columns,
    // onSortingChange: setSorting,
    // onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    // onColumnVisibilityChange: setColumnVisibility,
    // onRowSelectionChange: setRowSelection,
    state: {
      // sorting,
      // columnFilters,
      // columnVisibility,
      // rowSelection,
    },
  });

  return (
    <div className="w-full">
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
                  <TableRow
                    key={ row.id }
                    // data-state={ row.getIsSelected() && "selected" }
                  >
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
