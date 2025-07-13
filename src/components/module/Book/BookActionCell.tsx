import type { IBook } from "@/types";
import { useState } from "react";
import BorrowBookModal from "./BorrowBookModal";
import EditBookModal from "./EditBookModal";
import DeleteBookModal from "./DeleteBookModal";

export const BookActionsCell = ({ book }: { book: IBook }) => {
  const [editFormRefreshKey, setEditFormRefreshKey] = useState(0);

  const handleBorrowSuccess = () => {
    setEditFormRefreshKey((prev) => prev + 1); // trigger form reset
  };

  return (
    <div className="flex items-center space-x-2">
      <BorrowBookModal book={book} onBorrowSuccess={handleBorrowSuccess} />
      <EditBookModal book={book} refreshTrigger={editFormRefreshKey} />
      <DeleteBookModal bookId={book._id || ""} />
    </div>
  );
};
