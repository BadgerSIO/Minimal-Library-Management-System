import { columns } from "@/components/module/Borrow/columns";
import { DataTable } from "@/components/ui/data-table";
import { useGetBorrowSummaryQuery } from "@/redux/api/baseApi";

const BorrowSummary = () => {
  const { isLoading, data: borrowData } = useGetBorrowSummaryQuery(undefined, {
    refetchOnFocus: true,
  });
  return (
    <section className="min-h-[calc(100vh-165px)] md:min-h-[calc(100vh-205px)] pt-10 pb-5">
      <div className="container mx-auto">
        <h1 className="text-center text-xl md:text-4xl font-semibold ">
          Borrow Summary
        </h1>
        <div className="mt-8">
          {!isLoading && borrowData?.data?.length ? (
            <DataTable columns={columns} data={borrowData.data} />
          ) : (
            <div className="text-center text-gray-500">
              No borrow records found.
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default BorrowSummary;
