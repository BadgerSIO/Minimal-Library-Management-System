# 📚 Minimal Library Management System

A minimal, modern **Library Management System** built with **React**, **TypeScript**, **Redux Toolkit Query**, and **Tailwind CSS + shadcn/ui**. This project focuses on **core functionality** with clean UI and smooth UX — no authentication, no categories, no payments — just books and borrowing, done right.

🚀 **Live Demo**  
👉 [minimal-library-management-system-c-omega.vercel.app](https://minimal-library-management-system-c-omega.vercel.app/)

---

## ✨ Features

### 📖 Book Management

- **Book List Table**  
  Displays all books with:

  - Title
  - Author
  - Genre
  - ISBN
  - Copies
  - Availability
  - Actions (Edit, Delete, Borrow)

- **Edit Book**

  - Opens a form pre-filled with existing book info
  - Supports full update with optimistic UI

- **Delete Book**

  - Prompts confirmation before deletion
  - Uses optimistic update for instant UI response

- **Add New Book**

  - Form to add a new book with:
    - Title, Author, Genre, ISBN, Description, Copies
  - Defaults to available = true
  - Redirects to book list after creation

- **Availability Logic**
  - A book becomes **unavailable** if copies reach 0

---

### 📦 Borrowing

- **Borrow Book**

  - Opens from each book's action menu
  - Fields: Quantity, Due Date (calendar)
  - Quantity cannot exceed available copies
  - Updates availability instantly
  - Redirects to borrow summary after success

- **Borrow Summary**
  - Shows aggregate data of borrowed books:
    - Title, ISBN, Total Quantity Borrowed
  - Pulled via aggregation API

---

### 🧭 Navigation

- Simple navbar with links to:

  - 📚 All Books
  - ➕ Add Book
  - 📈 Borrow Summary

- Responsive design with dropdown for mobile

---

### 🦶 Footer

- Clean footer with copyright
- Built with ❤️ by the developer

---

## 🛠 Tech Stack

- **Frontend:** React, TypeScript
- **Styling:** Tailwind CSS, [shadcn/ui](https://ui.shadcn.com/)
- **State Management:** Redux Toolkit Query
- **Form Handling:** React Hook Form + Zod
- **Date UI:** date-fns + calendar component
- **Notifications:** sonner
- **Backend:** RESTful API (external, not included here)
- **Deployment:** [Vercel](https://vercel.com)

---

## 🧪 Optimistic Updates

- ⚡ Instant UI feedback on delete/edit
- 🌀 Rollback handled automatically on failure
- Clean cache management using `updateQueryData` from RTK Query

---

## 📂 Folder Structure (Simplified)
