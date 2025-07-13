import { toast } from "sonner";
import type { IBook } from "@/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_BASE_URL }),
  tagTypes: ["Books", "BorrowSummary"],
  endpoints: (builder) => ({
    getBooks: builder.query({
      query: () => "/books",
      providesTags: ["Books"],
    }),
    createBook: builder.mutation({
      query: (bookData) => ({
        url: "/books",
        method: "POST",
        body: bookData,
      }),
      invalidatesTags: ["Books"],
    }),
    editBook: builder.mutation({
      query(data) {
        const { id, ...body } = data;
        return {
          url: `/books/${id}`,
          method: "PUT",
          body,
        };
      },
      invalidatesTags: ["Books"],
    }),
    deleteBook: builder.mutation<IBook, string>({
      query: (bookId) => ({
        url: `/books/${bookId}`,
        method: "DELETE",
      }),
      async onQueryStarted(bookId, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          baseApi.util.updateQueryData(
            "getBooks",
            undefined,
            (draft: { data: IBook[] }) => {
              draft.data = draft.data.filter((book) => book._id !== bookId);
            }
          )
        );

        try {
          await queryFulfilled;
          toast.success("Book deleted successfully.");
        } catch (err) {
          patchResult.undo();
          toast.error("Failed to delete book.");
          console.error("Delete error:", err);
        }
      },
    }),

    borrowBook: builder.mutation({
      query: (bookData) => ({
        url: "/borrow",
        method: "POST",
        body: bookData,
      }),
      invalidatesTags: ["Books", "BorrowSummary"],
    }),
    getBorrowSummary: builder.query({
      query: () => "/borrow",
      providesTags: ["BorrowSummary"],
    }),
  }),
});

export const {
  useGetBooksQuery,
  useCreateBookMutation,
  useEditBookMutation,
  useDeleteBookMutation,
  useBorrowBookMutation,
  useGetBorrowSummaryQuery,
} = baseApi;
