import { Outlet } from "react-router";
import "./App.css";
import Navbar from "./components/layouts/Navbar";
import { Toaster } from "sonner";
import Footer from "./components/layouts/Footer";

function App() {
  return (
    <>
      <header className="z-50 px-5">
        <Navbar />
      </header>
      <main className="z-10 px-5">
        <Toaster richColors />
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default App;
