import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useCreateBookMutation } from "@/redux/api/baseApi";
import { bookSchema } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2Icon } from "lucide-react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { z } from "zod";
type ErrorResponse = {
  status: number;
  data: {
    success: boolean;
    message: string;
    error?: unknown;
  };
};

const AddBook = () => {
  const navigate = useNavigate();
  const [createBook, { isLoading }] = useCreateBookMutation();
  const form = useForm<z.infer<typeof bookSchema>>({
    resolver: zodResolver(bookSchema),

    defaultValues: {
      title: "",
      author: "",
      genre: "NON_FICTION",
      isbn: "",
      description: "",
      copies: 1,
      available: true,
    },
  });
  const { reset } = form;
  async function onSubmit(values: z.infer<typeof bookSchema>) {
    try {
      await createBook(values).unwrap();

      toast.success("Book added successfully!");
      reset();
      navigate("/");
    } catch (err: ErrorResponse | unknown) {
      toast.error(
        `Failed to add book: ${
          typeof err === "object" && err !== null && "data" in err
            ? (err as ErrorResponse).data.message
            : String(err)
        } `
      );
    }
  }

  return (
    <div className="container min-h-[calc(100vh-165px)] md:min-h-[calc(100vh-205px)] pt-10 pb-5 mx-auto">
      <div className="max-w-2xl mx-auto p-4 sm:p-6 bg-white border rounded-lg">
        <h1 className="text-xl md:text-4xl font-semibold mb-4">Add New Book</h1>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Book Title" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="author"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Author</FormLabel>
                  <FormControl>
                    <Input placeholder="Book Author" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="genre"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Genre</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a genre" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="FICTION">Fiction</SelectItem>
                      <SelectItem value="NON_FICTION">Non-Fiction</SelectItem>
                      <SelectItem value="SCIENCE">Science</SelectItem>
                      <SelectItem value="HISTORY">History</SelectItem>
                      <SelectItem value="BIOGRAPHY">Biography</SelectItem>
                      <SelectItem value="FANTASY">Fantasy</SelectItem>
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="isbn"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>ISBN</FormLabel>
                  <FormControl>
                    <Input placeholder="Book ISBN" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      className="placeholder:text-xs sm:placeholder:text-sm resize-none"
                      placeholder="Tell us a little bit about the book"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="copies"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Copies</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min={0}
                      placeholder="Number of copies"
                      {...field}
                      onChange={(e) => field.onChange(e.target.valueAsNumber)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {isLoading ? (
              <Button className="bg-orange-500 " disabled>
                <Loader2Icon className="animate-spin" />
                Submitting...
              </Button>
            ) : (
              <Button
                type="submit"
                className="bg-orange-500 hover:bg-orange-600"
              >
                Submit
              </Button>
            )}
          </form>
        </Form>
      </div>
    </div>
  );
};

export default AddBook;
