"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  OnChangeFn,
  PaginationState,
  RowSelectionState,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { ChevronDown, ChevronsUpDown, ChevronUp, PenLine, Trash2 } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Skeleton } from "../skeleton";

interface DataTableProps<TData, TValue> {
  isError?: boolean;
  isLoading?: boolean;
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  title?: string;
  searchPlaceholder?: string;
  searchColumn?: string;
  onEdit?: (row: TData) => void;
  onDelete?: (row: TData) => void;
  onRowSelectionChange?: (rows: TData[]) => void;
  pageSize?: number;
  showToolbar?: boolean;
  showPagination?: boolean;
  showSearch?: boolean;
  totalRows?: number;
  pagination?: PaginationState;
  onPaginationChange?: OnChangeFn<PaginationState>;
  showRowSelection?: boolean;
  sorting?: SortingState;
  onSortingChange?: OnChangeFn<SortingState>;
  headerBg?: string;
  tableCellClass?: string;
  onClick?: (row: TData) => void;
}

export function DataTable<TData, TValue>({
  isLoading = false,
  columns,
  data,
  title = "Data Table",
  searchPlaceholder = "Search...",
  pagination,
  onEdit,
  onDelete,
  totalRows,
  onRowSelectionChange,
  sorting,
  onPaginationChange,
  onSortingChange,
  pageSize = 10,
  showToolbar = true,
  showPagination = true,
  showSearch = true,
  showRowSelection = true,
  headerBg,
  tableCellClass,
  onClick,
}: DataTableProps<TData, TValue>) {
  const tableData = useMemo(() => (isLoading ? (Array(pageSize).fill({}) as TData[]) : data || []), [isLoading, data]);

  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState("");

  const tableColumns = useMemo(() => {
    const baseColumns = isLoading
      ? columns.map((column) => ({
          ...column,
          cell: () => <Skeleton className="h-4" />,
        }))
      : columns;

    const selectionColumn: ColumnDef<TData, any>[] = [];

    if (showRowSelection) {
      selectionColumn.push({
        id: "select",
        header: ({ table }) => (
          <Checkbox
            checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
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
      });
    }

    const actionColumn =
      onEdit || onDelete
        ? [
            {
              id: "actions",
              header: "Actions",
              cell: ({ row }: { row: any }) => (
                <div className="flex space-x-2">
                  {onEdit && (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onEdit(row.original)}
                      className="text-primary h-8 w-8"
                    >
                      <PenLine className="h-4 w-4" />
                    </Button>
                  )}
                  {onDelete && (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onDelete(row.original)}
                      className="h-8 w-8 text-red-500"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ),
            },
          ]
        : [];

    return [...selectionColumn, ...baseColumns, ...actionColumn];
  }, [columns, isLoading, onEdit, onDelete, showRowSelection]);

  const table = useReactTable({
    data: tableData,
    columns: tableColumns,
    rowCount: totalRows,

    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: onSortingChange,
    onRowSelectionChange: setRowSelection,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    onPaginationChange: onPaginationChange,
    manualPagination: true,
    manualSorting: true,

    state: {
      sorting,
      rowSelection,
      columnFilters,
      pagination,
      globalFilter,
    },
    initialState: {
      pagination: {
        pageSize,
      },
    },
  });

  useEffect(() => {
    if (onRowSelectionChange) {
      const selectedRows = table.getSelectedRowModel().rows.map((row) => row.original);
      onRowSelectionChange(selectedRows);
    }
  }, [rowSelection, onRowSelectionChange, table]);

  return (
    <div className="space-y-4">
      {showToolbar && (
        <div className="flex items-center justify-between">
          <div className="text-primary text-xl font-medium">{title}</div>
          <div className="flex items-center space-x-2">
            {showSearch && (
              <Input
                placeholder={searchPlaceholder}
                value={globalFilter ?? ""}
                onChange={(e) => setGlobalFilter(e.target.value)}
                className="max-w-sm"
              />
            )}
            <Select
              value={table.getState().pagination.pageSize.toString()}
              onValueChange={(value) => {
                table.setPageSize(Number(value));
              }}
            >
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="Rows per page" />
              </SelectTrigger>
              <SelectContent>
                {[5, 10, 20, 30, 40, 50].map((pageSize) => (
                  <SelectItem key={pageSize} value={pageSize.toString()}>
                    {pageSize} rows
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      )}

      <div className="rounded-md border">
        <Table>
          <TableHeader className={`bg-[${headerBg}]`}>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder ? null : (
                      <div
                        className={header.column.getCanSort() ? "flex cursor-pointer items-center select-none" : ""}
                        onClick={header.column.getToggleSortingHandler()}
                      >
                        {flexRender(header.column.columnDef.header, header.getContext())}
                        {{
                          asc: <ChevronUp className="ml-2 h-4 w-4" />,
                          desc: <ChevronDown className="ml-2 h-4 w-4" />,
                        }[header.column.getIsSorted() as string] ??
                          (header.column.getCanSort() ? <ChevronsUpDown className="ml-2 h-4 w-4" /> : null)}
                      </div>
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  onClick={() => onClick?.(row.original)}
                  className={onClick ? "hover:bg-muted cursor-pointer" : ""}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className={tableCellClass ?? ""}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={tableColumns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {showPagination && (
        <div className="flex items-center justify-between">
          <div className="text-muted-foreground text-sm">
            Showing {table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1} to{" "}
            {Math.min(
              (table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize,
              table.getFilteredRowModel().rows.length,
            )}{" "}
            of {table.getFilteredRowModel().rows.length} entries
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              className="text-primary border-primary hover:bg-primary/10"
            >
              Previous
            </Button>
            <div className="flex items-center gap-1">
              {Array.from({ length: Math.min(5, table.getPageCount()) }, (_, i) => i + 1).map((page) => (
                <Button
                  key={page}
                  variant={table.getState().pagination.pageIndex === page - 1 ? "default" : "outline"}
                  size="icon"
                  className={`h-8 w-8 ${
                    table.getState().pagination.pageIndex === page - 1
                      ? "bg-primary hover:bg-primary/90"
                      : "border-primary text-primary hover:bg-primary/10"
                  }`}
                  onClick={() => table.setPageIndex(page - 1)}
                >
                  {page}
                </Button>
              ))}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              className="text-primary border-primary hover:bg-primary/10"
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
