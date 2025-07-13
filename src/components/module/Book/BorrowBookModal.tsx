import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useBorrowBookMutation } from "@/redux/api/baseApi";
import { type IBook, type IBorrow } from "@/types";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useState } from "react";
import { CalendarIcon } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { useNavigate } from "react-router";

const BorrowBookModal = ({
  book,
  onBorrowSuccess,
}: {
  book: IBook;
  onBorrowSuccess?: () => void;
}) => {
  const navigate = useNavigate();
  const [borrowBook, { isLoading }] = useBorrowBookMutation();
  const [open, setOpen] = useState(false); // Control Dialog open state
  const [openCalendar, setOpenCalendar] = useState(false); // Control Calendar open state

  const form = useForm<IBorrow>({
    defaultValues: {
      book: book._id,
      quantity: 1,
      dueDate: undefined,
    },
  });

  const onSubmit = async (values: IBorrow) => {
    try {
      await borrowBook({
        ...values,
        dueDate: new Date(values.dueDate).toISOString(), // Ensure ISO string for API
      }).unwrap();
      toast.success("Book borrowed successfully!");
      onBorrowSuccess?.();
      setOpen(false); // Close the dialog on success
      form.reset(); // Reset form with current values
      navigate("/borrow-summary"); // Redirect to borrow summary page
    } catch (err: unknown) {
      const error = err as { data?: { message: string } };
      toast.error(
        `Failed to borrow book. ${error?.data?.message || "An error occurred"}`
      );
      console.error(err);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button disabled={!book?.available} size="sm" className="bg-sky-500">
          Borrow Book
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Borrow Book</DialogTitle>
          <div className="text-xs py-2 text-gray-500 border-y border-gray-200 space-y-1">
            <h3 className="text-slate-800 font-semibold text-sm">
              {book.title}
            </h3>
            <p>by {book.author}</p>
            <p>Genre: {book.genre}</p>
          </div>
          <DialogDescription>
            Fill in the details to borrow the book.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="quantity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Quantity</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="1"
                      min="1"
                      max={book.copies}
                      {...field}
                      onChange={(e) => field.onChange(e.target.valueAsNumber)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="dueDate"
              rules={{ required: "Due date is required" }}
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Due Date</FormLabel>
                  <Popover open={openCalendar} onOpenChange={setOpenCalendar}>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={
                          field.value ? new Date(field.value) : undefined
                        }
                        onSelect={(date) => {
                          field.onChange(date);
                          setOpenCalendar(false);
                        }}
                        disabled={(date) => date < new Date()}
                        captionLayout="dropdown"
                        fromYear={new Date().getFullYear()}
                        toYear={new Date().getFullYear() + 10}
                      />
                    </PopoverContent>
                  </Popover>

                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Borrowing..." : "Borrow Book"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default BorrowBookModal;
