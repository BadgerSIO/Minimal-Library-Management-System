import { z } from "zod";
export interface IBook {
  _id?: string; // Optional for new books
  title: string;
  author: string;
  genre:
    | "FICTION"
    | "NON_FICTION"
    | "SCIENCE"
    | "HISTORY"
    | "BIOGRAPHY"
    | "FANTASY";
  isbn: string;
  description?: string;
  copies: number;
  available: boolean;
}
export interface IBorrow {
  book: string;
  quantity: number;
  dueDate: string; // ISO date string
}

export const bookSchema = z.object({
  title: z.string().min(1, "Title is required"),
  author: z.string().min(1, "Author is required"),
  genre: z.enum([
    "FICTION",
    "NON_FICTION",
    "SCIENCE",
    "HISTORY",
    "BIOGRAPHY",
    "FANTASY",
  ]),
  isbn: z.string().min(1, "ISBN is required"),
  description: z.string().optional(),
  copies: z.number().int().min(0, "Copies must be a non-negative integer"),
  available: z.boolean(),
});

export interface IBookList {
  books: IBook[];
}
export const borrowSchema = z.object({
  book: z.string(),
  quantity: z.number().min(1),
  dueDate: z.coerce.date().refine((date) => date > new Date(), {
    message: "Due date must be in the future",
  }),
});
export interface IBookBorrowSummary {
  totalQuantity: number;
  book: {
    title: string;
    isbn: string;
  };
}
