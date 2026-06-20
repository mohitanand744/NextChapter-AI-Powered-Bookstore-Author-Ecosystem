import { useEffect } from "react";
import Navbar from "./components/Common/Navbars/Nav";
import DiscountHeader from "./components/Common/Navbars/DiscountHeader";
import { Outlet, useLocation } from "react-router-dom";
import Footer from "./components/Common/Footers/Footer";
import { useAxiosLoader } from "./services/api";
import FullScreenImageModal from "./components/Common/FullScreenImage";
import ShoppingCart from "./components/Common/Navbars/ShoppingCarts";
import { useState } from "react";
import NextChapterAIBtn from "./components/Buttons/NextChapterAIBtn";

const Layout = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const pathName = useLocation().pathname;
  useAxiosLoader();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathName]);

  return (
    <div className="flex flex-col min-h-screen bg-tan">

      <DiscountHeader />
      <Navbar isCartOpen={isCartOpen} setIsCartOpen={setIsCartOpen} />
      <div className="search md:hidden flex gap-2 items-center px-4 py-2 bg-coffee border-b border-tan/20 shadow-sm relative z-40">


        <NextChapterAIBtn className="w-full block" />
      </div>
      <div className="flex-1">
        <Outlet />
      </div>
      <ShoppingCart isCartOpen={isCartOpen} setIsCartOpen={setIsCartOpen} />
      <FullScreenImageModal />
      <Footer />
    </div>
  );
};

export default Layout;
