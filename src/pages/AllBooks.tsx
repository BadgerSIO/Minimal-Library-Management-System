import BookList from "@/components/layouts/BookList";

const AllBooks = () => {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-xl md:text-4xl font-bold mb-5">All Books</h1>
      {/* Add your book listing component here */}
      <BookList />
    </div>
  );
};

export default AllBooks;
