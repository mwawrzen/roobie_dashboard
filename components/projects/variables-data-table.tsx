"use client";

import { useState } from "react";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  type VisibilityState,
} from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { IconEdit, IconPlus, IconTrash } from "@tabler/icons-react";
import { Variable } from "@/services/project.service";
import { VariablesDialog } from "./variables-dialog";
import { removeVariableAction } from "@/app/dashboard/projects/[id]/actions";

export const columns: ColumnDef<Variable>[]= [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "key",
    header: "Key",
    cell: ({ row }) => (
      <div>{ row.getValue( "key" )}</div>
    )
  },
  {
    accessorKey: "value",
    header: "Value",
    cell: ({ row }) => (
      <div>{ row.getValue( "value" )}</div>
    )
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row, table }) => {
      const { key } = row.original;
      const {
        projectId,
        openDialog,
        setDialogType,
        setCurrentVariable
      }= table.options.meta as {
        projectId: number,
        openDialog: ()=> void,
        setDialogType: ( type: "Add"| "Edit" )=> void,
        setCurrentVariable: ( {}: Variable )=> void
      };

      return (
        <ButtonGroup>
          <Button
            variant="outline"
            onClick={ ()=> {
              setCurrentVariable( row.original );
              setDialogType( "Edit" );
              openDialog()
            }}
          >
            <IconEdit />
          </Button>
          <Button
            variant="destructive"
            onClick={ async ()=> {
              await removeVariableAction( projectId, key );
            }}
          >
            <IconTrash />
          </Button>
        </ButtonGroup>
      )
    },
  }
];

export function VariablesDataTable({
  projectId,
  data
}: {
  projectId: string,
  data: Variable[]
}) {

  const [ sorting, setSorting ]= useState<SortingState>( [] );
  const [ columnFilters, setColumnFilters ]= useState<ColumnFiltersState>( [] );
  const [ columnVisibility, setColumnVisibility ]= useState<VisibilityState>( {} );
  const [ rowSelection, setRowSelection ]= useState( {} );
  const [ dialogOpen, setDialogOpen ]= useState<boolean>( false );
  const [ dialogType, setDialogType ]= useState<"Add"| "Edit">( "Add" );
  const [ currentVariable, setCurrentVariable ]= useState<Variable| undefined>();

  const openDialog= ()=> setDialogOpen( true );
  const closeDialog= ()=> setDialogOpen( false );

  const table= useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
    meta: {
      projectId,
      openDialog,
      setDialogType,
      setCurrentVariable
    }
  });

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter keys..."
          value={( table.getColumn( "key" )?.getFilterValue() as string )?? "" }
          onChange={ event=>
            table.getColumn( "key" )?.setFilterValue( event.target.value )
          }
          className="max-w-sm"
        />
        <Button
          className="ml-2"
          variant="secondary"
          onClick={ ()=> {
            setCurrentVariable( undefined );
            setDialogType( "Add" );
            openDialog();
          }}
        >
          <IconPlus />
        </Button>
        <VariablesDialog
          type={ dialogType }
          variable={ currentVariable }
          isOpen={ dialogOpen }
          close={ closeDialog }
        />
      </div>
      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map( headerGroup=> (
              <TableRow key={ headerGroup.id }>
                {headerGroup.headers.map(header=> {
                  return (
                    <TableHead key={ header.id }>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length? (
              table.getRowModel().rows.map( row=> (
                <TableRow
                  key={ row.id }
                  data-state={ row.getIsSelected()&& "selected" }
                >
                  {row.getVisibleCells().map( cell=> (
                    <TableCell key={ cell.id }>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={ columns.length }
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="text-muted-foreground flex-1 text-sm">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}
