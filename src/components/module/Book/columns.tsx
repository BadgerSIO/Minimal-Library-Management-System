import type { IBook } from "@/types";
import type { ColumnDef } from "@tanstack/react-table";
import { BookActionsCell } from "./BookActionCell";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<IBook>[] = [
  {
    accessorKey: "title",
    header: "Book Title",
  },
  {
    accessorKey: "author",
    header: "Author",
  },
  {
    accessorKey: "genre",
    header: "Genre",
  },
  {
    accessorKey: "isbn",
    header: "Book ISBN",
  },
  {
    accessorKey: "copies",
    header: "Copies",
  },
  {
    id: "Availability",
    header: "Availability",
    accessorFn: (row) => row.copies > 0, // true/false
    enableColumnFilter: true,
    cell: ({ row }) => {
      const book = row.original;
      return book.copies > 0 ? (
        <span className="text-green-500 bg-green-50">Available</span>
      ) : (
        <span className="text-red-500 bg-red-50">Not Available</span>
      );
    },
  },
  {
    id: "actions",
    enableHiding: false,
    header: "Actions",
    cell: ({ row }) => <BookActionsCell book={row.original} />,
  },
];
