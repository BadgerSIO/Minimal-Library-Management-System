import BookList from "@/components/layouts/BookList";

const Landing = () => {
  return (
    <section className="flex flex-col items-center justify-center min-h-[calc(100vh-165px)] md:min-h-[calc(100vh-205px)] pt-10 pb-5">
      <h1 className="text-xl md:text-4xl font-bold text-center">
        Welcome to the Library
      </h1>
      <p className="mt-4 text-sm md:text-lg text-center">
        Discover a world of knowledge at your fingertips.
      </p>
      <p className="mt-2 text-xs md:text-sm text-gray-600 text-center">
        Explore our collection of books, manage your account, and more.
      </p>
      <div className="mt-8 self-stretch container mx-auto">
        <BookList />
      </div>
    </section>
  );
};

export default Landing;
