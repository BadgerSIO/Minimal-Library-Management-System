import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "./button";
import { Link, useLocation } from "react-router";
import { useEffect, useState } from "react";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const location = useLocation();
  const isAllBooksPage = location.pathname === "/books";
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    initialState: {
      pagination: {
        pageSize: isAllBooksPage ? 15 : 5,
      },
    },
  });
  const availabilityColumn = table
    .getAllColumns()
    .find((col) => col.id === "Availability");

  const [availabilityFilter, setAvailabilityFilter] = useState(
    location.pathname === "/" ? "true" : "all"
  );
  useEffect(() => {
    availabilityColumn?.setFilterValue(
      availabilityFilter === "all" ? undefined : availabilityFilter === "true"
    );
  }, [availabilityColumn, availabilityFilter]);

  return (
    <>
      {availabilityColumn && (
        <div className="flex items-center justify-between py-4">
          <Select
            value={availabilityFilter}
            onValueChange={(value) => setAvailabilityFilter(value)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by Availability" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="true">Available</SelectItem>
              <SelectItem value="false">Not Available</SelectItem>
            </SelectContent>
          </Select>
        </div>
      )}

      <div className="rounded-md border ">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
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
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {(isAllBooksPage ? data.length > 15 : data.length > 5) && (
        <div className="flex items-center justify-end space-x-2 py-4 px-2">
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
          {availabilityColumn && !isAllBooksPage && (
            <Button size="sm" asChild variant="link">
              <Link to="/books">View All Books</Link>
            </Button>
          )}
        </div>
      )}
    </>
  );
}
