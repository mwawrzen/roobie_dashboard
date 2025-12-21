"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
  type ColumnDef,
  type ColumnFiltersState
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
import { IconEdit, IconPlus, IconTrash } from "@tabler/icons-react";
import { Variable } from "@/services/project.service";
import { VariablesDialog } from "@/components/projects/variables-dialog";
import { removeVariableAction } from "@/app/dashboard/projects/[id]/actions";
import { toast } from "sonner";

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
    )
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
    cell: ({ row, table }) => {
      const { key } = row.original;
      const {
        handleDelete,
        openDialog,
        setDialogType,
        setCurrentVariable
      }= table.options.meta as {
        projectId: number,
        handleDelete: ( key: string )=> void;
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
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive">
                <IconTrash />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This variable will be permanently removed.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={ ()=> handleDelete( key )}>
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </ButtonGroup>
      )
    }
  }
];

export function VariablesDataTable({
  projectId,
  data
}: {
  projectId: number,
  data: Variable[]
}) {

  const [ rows, setRows ]= useState<Variable[]>( ()=> data );

  useEffect( ()=> {
    if( data!== rows )
      setRows( data );
  }, [ data, rows ])

  const handleDelete= async ( key: string )=> {
    const prevRows= rows;

    setRows( prev=> prev.filter( row=> row.key!== key ));

    const res= await removeVariableAction( projectId, key );

    if( res.success ) {
      toast( res.message );
    } else {
      setRows( prevRows );
      toast.error( res.message );
    }
  };

  const [ columnFilters, setColumnFilters ]= useState<ColumnFiltersState>( [] );
  const [ rowSelection, setRowSelection ]= useState( {} );
  const [ dialogOpen, setDialogOpen ]= useState<boolean>( false );
  const [ dialogType, setDialogType ]= useState<"Add"| "Edit">( "Add" );
  const [ currentVariable, setCurrentVariable ]= useState<Variable| undefined>();

  const openDialog= useCallback( ()=> setDialogOpen( true ), [] );
  const closeDialog= useCallback( ()=> setDialogOpen( false ), [] );

  const memoizedColumns= useMemo( ()=> columns, [] );

  const table= useReactTable({
    data,
    columns: memoizedColumns,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onRowSelectionChange: setRowSelection,
    state: {
      columnFilters,
      rowSelection
    },
    meta: {
      handleDelete,
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
    </div>
  )
}
