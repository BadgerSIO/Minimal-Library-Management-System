import type { IBookBorrowSummary } from "@/types";
import type { ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<IBookBorrowSummary>[] = [
  {
    accessorKey: "book.title",
    header: "Book Title",
  },
  {
    accessorKey: "book.isbn",
    header: "Book ISBN",
  },
  {
    accessorKey: "totalQuantity",
    header: "Total Quantity",
  },
];
