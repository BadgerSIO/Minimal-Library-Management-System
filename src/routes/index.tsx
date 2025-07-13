import { createBrowserRouter } from "react-router";
import App from "../App";
import Landing from "@/pages/Landing";
import AddBook from "@/pages/AddBook";
import BorrowSummary from "@/pages/BorrowSummary";
import AllBooks from "@/pages/AllBooks";

const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      { index: true, Component: Landing },
      { path: "books", Component: AllBooks },
      { path: "create-book", Component: AddBook },
      { path: "borrow-summary", Component: BorrowSummary },
    ],
  },
]);
export default router;
