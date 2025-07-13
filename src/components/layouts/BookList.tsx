import { useGetBooksQuery } from "@/redux/api/baseApi";
import type { IBook } from "@/types";
import { DataTable } from "../ui/data-table";
import { columns } from "../module/Book/columns";

const BookList = () => {
  const { data: bookdata, isLoading } = useGetBooksQuery(undefined, {
    refetchOnFocus: true,
  });
  const books: IBook[] = bookdata?.data;

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (!books || books.length === 0) {
    return <div>No books available.</div>;
  }

  return (
    <>
      {books.length > 0 && (
        <p className="text-sm text-gray-600 mb-1">
          Total books: {books.length}
        </p>
      )}
      <DataTable columns={columns} data={books} />
    </>
  );
};

export default BookList;
