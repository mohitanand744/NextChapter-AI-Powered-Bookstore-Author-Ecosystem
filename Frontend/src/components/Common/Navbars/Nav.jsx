import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import MegaMenu from "./MegaMenu";
import { HiOutlineShoppingCart } from "react-icons/hi2";
import { IoIosArrowDown } from "react-icons/io";
import NextChapterAIBtn from "../../Buttons/NextChapterAIBtn";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Button from "../../Buttons/Button";
import MobileMenu from "./MobileMenu";
import useAuth from "../../../Hooks/useAuth";
import { useProfileImage } from "../../../store/Context/ProfileImageContext";
import { useImagePreview } from "../../../store/Context/ImagePreviewContext";
import { NAV_LINKS } from "./NavLinksData";
import BooksLoader from "../../Loaders/BooksLoader";
import { useSelector } from "react-redux";
import AppImage from "../../Common/AppImage";
import { useComingSoon } from "../../../store/Context/ComingSoonContext";

const Navbar = ({ isCartOpen, setIsCartOpen }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isFixed, setIsFixed] = useState(false);
  const pathName = useLocation().pathname.replaceAll("/", "");
  const [animation, setAnimation] = useState(false);
  const { isAuthenticated, userData } = useAuth();
  const { preview, isUploading, setPreview } = useProfileImage();
  const { openPreview } = useImagePreview();
  const { books } = useSelector((state) => state.books);
  const navigate = useNavigate();
  const { openComingSoon } = useComingSoon();
  console.log(isAuthenticated);

  console.log("pathName", pathName);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40 && !isFixed) {
        setIsFixed(true);
        setAnimation(true);
        setTimeout(() => setAnimation(false), 300);
      } else if (window.scrollY <= 40 && isFixed) {
        setIsFixed(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isFixed]);

  useEffect(() => {
    if (userData) {
      if (userData.profilePic) {
        setPreview(userData.profilePic);
      }
    }
  }, [userData]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.2,
      },
    },
  };
  const itemVariants = {
    hidden: { y: -20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 10,
      },
    },
  };

  return (
    <nav
      className={`transition-all z-[999] duration-300 ${isFixed
        ? animation
          ? "sticky top-[-8rem] left-0 w-full opacity-0 shadow-xl"
          : "sticky top-0 left-0 w-full bg-coffee backdrop-blur-xl shadow-[0_10px_30px_-10px_rgba(0,0,0,0.15)] opacity-100 border-b border-tan/20 animate-slideDown"
        : "relative bg-coffee shadow-lg"
        }`}
    >
      <div className="absolute inset-0 bg-[url('/images/bgDesign.jpg')] bg-cover bg-center opacity-10 pointer-events-none" />
      <div className="container relative z-10 px-4 py-1 mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex items-center justify-between"
        >
          {/* Logo */}
          <motion.div variants={itemVariants} className="flex-shrink-0 w-28">
            <Link to="/nextChapter">
              <AppImage
                className="object-cover w-full h-full rounded-lg"
                src="/images/logo-transperant-light.png"
                alt=""
                fallbackType="default"
              />
            </Link>
          </motion.div>

          {/* Desktop Menu */}
          <motion.ul
            variants={containerVariants}
            className="items-center hidden space-x-2 xl:flex"
          >
            {NAV_LINKS.map((link) => {
              if (link.type === "dropdown") {
                return (
                  <motion.ul
                    key={link.key}
                    variants={itemVariants}
                    className="group"
                  >
                    <li
                      className={`px-5 py-2 flex gap-1 items-center text-[1.02rem] font-bold text-tan transition-all cursor-pointer hover:bg-tan/20 hover:text-cream duration-300 rounded-full `}
                    >
                      {link.name}
                      <span>
                        <IoIosArrowDown className="transition-transform duration-300 group-hover:rotate-180" />
                      </span>
                    </li>
                    {/* Mega Menu */}
                    <div className="absolute z-[999999] hidden lg:block opacity-0 scale-95 pointer-events-none origin-top transition-all duration-300 group-hover:opacity-100 group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:scale-100 top-[3.7rem] inset-x-0 w-[80%] mx-auto drop-shadow-2xl">
                      <MegaMenu />
                    </div>
                  </motion.ul>
                );
              }

              return (
                <motion.ul
                  key={link.key}
                  variants={itemVariants}
                  className="relative"
                >
                  {link.hasTag && (
                    <span className="absolute z-10 transition-transform duration-300 pointer-events-none -top-[14px] -right-2 drop-shadow-md h-5 w-20 group-hover:rotate-12">
                      <AppImage
                        src="/images/tag.avif"
                        alt="New"
                        className="w-full h-full "
                        fallbackType="default"
                      />
                    </span>
                  )}
                  <li className="px-1 py-1">
                    <Link
                      to={link.path}
                      className={`px-5 py-2 text-[1.02rem] font-bold transition-all duration-300 rounded-full ${pathName === link.key
                        ? "bg-tan/20 text-cream shadow-sm"
                        : "text-tan bg-transparent shadow-none hover:bg-tan/10 hover:text-cream"
                        }`}
                    >
                      {link.name}
                    </Link>
                  </li>
                </motion.ul>
              );
            })}
          </motion.ul>

          <div className="flex items-center gap-4">
            <motion.div variants={itemVariants} className="hidden md:block">
              <NextChapterAIBtn className="w-[18.2rem]" />
            </motion.div>

            <motion.div
              variants={itemVariants}
              onClick={() =>
                openComingSoon({ onExplore: () => setIsCartOpen(true) })
              }
              className="relative flex items-center justify-center border shadow-sm cursor-pointer bg-tan/20 hover:bg-tan/30 backdrop-blur-md w-11 h-11 rounded-full active:scale-95 border-tan/20 text-tan"
            >
              <div className="absolute flex items-center justify-center w-6 h-6 text-[12px] font-bold text-coffee bg-tan rounded-full -top-1 -right-1 shadow-md border-2 border-coffee">
                0
              </div>
              <HiOutlineShoppingCart className="text-[1.4rem]" />
            </motion.div>
            {isAuthenticated ? (
              <motion.div variants={itemVariants} className="">
                <Link to="/nextChapter/user/profile">
                  <div className="w-12 h-12 relative cursor-pointer active:scale-95 bg-coffee transition-all duration-300  border-[2px] border-tan shadow-lg shadow-tan/30 rounded-full overflow-hidden">
                    <AppImage
                      src={preview || "/images/loading.gif"}
                      alt="Profile"
                      className="object-cover w-full h-full rounded-full text-sepia"
                      onClick={() => {
                        if (pathName === "nextChapteruserprofile") {
                          openPreview(preview, "Profile Image");
                        }
                      }}
                      fallbackType="avatar"
                      name={userData?.name}
                    />

                    {isUploading && (
                      <div className="absolute inset-0 flex items-center justify-center rounded-full bg-coffee/70 ">
                        <BooksLoader imgHeight="8" imgWidth="8" marginTop="0" />
                      </div>
                    )}
                  </div>
                </Link>
              </motion.div>
            ) : (
              <motion.div variants={itemVariants} className="flex items-center gap-2">
                <Button
                  variant="primary"
                  onClick={() => navigate("/")}
                  className="!border-tan border-2"
                >
                  Login
                </Button>
                <Button
                  variant="primary"
                  onClick={() => navigate("/signup")}
                  className="hidden !border-tan border-2 lg:flex"
                >
                  Signup
                </Button>
              </motion.div>
            )}

            {/* Mobile Hamburger */}
            <motion.div
              variants={itemVariants}
              className="xl:hidden"
            >
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center justify-center transition-all duration-300 border shadow-sm bg-tan/20 hover:bg-tan/30 w-11 h-11 rounded-full text-tan focus:outline-none border-tan/20 active:scale-95"
              >
                <svg
                  className="w-6 h-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  {isOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16m-7 6h7"
                    />
                  )}
                </svg>
              </button>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Mobile Menu */}
      <MobileMenu isOpen={isOpen} setIsOpen={setIsOpen} />
    </nav>
  );
};

export default Navbar;
