import { useEffect } from "react";
import Navbar from "./components/Common/Navbars/Nav";
import DiscountHeader from "./components/Common/Navbars/DiscountHeader";
import { Outlet, useLocation } from "react-router-dom";
import Footer from "./components/Common/Footers/Footer";
import { useAxiosLoader } from "./services/api";
import FullScreenImageModal from "./components/Common/FullScreenImage";
import ShoppingCart from "./components/Common/Navbars/ShoppingCarts";
import { useState } from "react";
import Search from "./components/SearchBars/Search";

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
      <div className="search">
        <Search
          styling="w-full block md:hidden bg-sepia"
          inputStyles="py-3 !text-tan bg-sepia"
          iconStyles="top-3 right-3 bg-sepia"
          suggestionsStyles={"mt-0"}
          enableSuggestions={true}
          nav={true}
        />
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
