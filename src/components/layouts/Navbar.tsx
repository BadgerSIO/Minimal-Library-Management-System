import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link } from "react-router";
import Logo from "../Logo";
import { MenuIcon } from "lucide-react";

const Navbar = () => {
  const [open, setOpen] = useState(false); // ⬅️ control open state

  const links = [
    { to: "/", label: "Home" },
    { to: "/books", label: "All Books" },
    { to: "/create-book", label: "Add Book" },
    { to: "/borrow-summary", label: "Borrow Summary" },
  ];

  return (
    <section className="pt-5">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mx-auto bg-orange-50 rounded-lg px-5 min-h-16 md:min-h-24">
          <div>
            <Logo />
          </div>
          <nav>
            <ul className="hidden md:flex gap-5 items-center ">
              {links.map((link) => (
                <li
                  key={link.to}
                  className="capitalize text-sm md:text-base lg:text-lg font-medium hover:text-orange-500 hover:underline underline-offset-4"
                >
                  <Link to={link.to}>{link.label}</Link>
                </li>
              ))}
            </ul>
            <div className="md:hidden">
              <DropdownMenu open={open} onOpenChange={setOpen}>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">
                    <MenuIcon />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="start">
                  <DropdownMenuLabel className="sr-only">
                    Navigations
                  </DropdownMenuLabel>
                  {links.map((link) => (
                    <DropdownMenuItem
                      key={link.to}
                      onSelect={() => setOpen(false)} // ⬅️ close menu on click
                      className="capitalize text-sm md:text-base lg:text-lg font-medium hover:text-orange-500 hover:underline underline-offset-4"
                    >
                      <Link to={link.to}>{link.label}</Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </nav>
        </div>
      </div>
    </section>
  );
};

export default Navbar;
