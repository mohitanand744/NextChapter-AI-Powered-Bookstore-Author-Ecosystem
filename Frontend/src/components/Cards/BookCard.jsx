import React, { useState } from "react";
import { FaEye, FaHeart } from "react-icons/fa";
import { HiOutlineEye } from "react-icons/hi2";
import { MdOutlineAddShoppingCart } from "react-icons/md";
import Ratings from "../RatingsReviews/Ratings";
import { useLocation, useNavigate } from "react-router-dom";
import AppImage from "../Common/AppImage";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllWishlists,
  toggleWishlist,
} from "../../store/Redux/Slices/wishlistSlice";
import { useEffect } from "react";
import { useRef } from "react";
import useAuth from "../../Hooks/useAuth";
import FloatingReaction from "../UI/FloatingReaction";
import Button from "../Buttons/Button";

const BookCard = ({ book, index, onComingSoonClick }) => {
  const navigate = useNavigate();
  const path = useLocation().pathname.replaceAll("/", "");
  const dispatch = useDispatch();
  const [isLiked, setIsLiked] = useState(false);
  const [isReadMore, setIsReadMore] = useState(false);
  const { loading } = useSelector((state) => state.wishlists);
  const debounceRef = useRef(null);
  const { isAuthenticated, userData, getUserUpdatedDetails } = useAuth();
  const toastRef = useRef(null);

  const handleLike = (bookId) => {
    if (!isAuthenticated) {
      toast.error("Please login to add to wishlist");
      return;
    }

    const previousLikedState = isLiked;

    setIsLiked(!previousLikedState);

    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    if (!toastRef.current) {
      toastRef.current = toast.loading("Updating wishlist...");
    }

    console.log("toastContainer", toastRef);

    debounceRef.current = setTimeout(async () => {
      try {
        const res = await dispatch(toggleWishlist(bookId)).unwrap();

        setIsLiked(res?.message?.includes("removed") ? false : true);
        toast.success(res?.message, { id: toastRef.current });
        toastRef.current = null;

        if (path === "nextChapterwishlist") {
          dispatch(getAllWishlists());
        } else if (path === "nextChapteruserprofile") {
          await getUserUpdatedDetails();
        }
      } catch (err) {
        setIsLiked(previousLikedState);
        if (err?.status !== 401) {
          toast.error(err?.message || "Wishlist update failed", {
            id: toastRef.current,
          });
        } else {
          toast.dismiss(toastRef.current);
        }
        toastRef.current = null;
      }
    }, 600);
  };

  useEffect(() => {
    setIsLiked(book?.isLiked ? true : false);
  }, [book?.isLiked]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.25, ease: "easeInOut" }}
      whileHover={{
        scale: 1.01,
        transition: { duration: 0.25, ease: "easeInOut" },
        boxShadow: "0 15px 40px rgba(0,0,0,0.3)",
        y: -5,
      }}
      className="relative flex flex-col bg-coffee border border-tan/10 justify-between shadow-2xl
  md:h-[29rem] h-[26rem] z-10 hover:z-[99] card rounded-3xl"
    >
      <div className="absolute inset-0 bg-[url('/images/bgDesign.jpg')] bg-cover bg-center opacity-10 pointer-events-none" />
      <div className="absolute top-0 right-0 px-3 py-1 text-xs font-medium border-b border-l bg-tan/20 text-tan backdrop-blur-md rounded-bl-2xl rounded-tr-3xl border-tan/10">
        <p>{book?.category}</p>
      </div>
      <div className="absolute group top-0 left-0">
        <div className=" w-12 border-r border-b-2 rounded-br-2xl rounded-tl-3xl border-tan p-[0.1rem] h-12">
          <AppImage
            src={
              book?.author?.author_image ||
              "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
            }
            className="w-full h-full rounded-br-2xl rounded-tl-3xl cursor-pointer"
            imgClassName="object-cover w-full h-full rounded-br-2xl rounded-tl-2xl"
            alt=""
            fallbackType="author"
            name={book?.author?.author_name}
          />
        </div>

        <div className="absolute border-2 border-tan shadow-lg left-[1rem] w-[16rem] text-sm z-[11111] transition-all duration-300 scale-0 group-hover:translate-y-0 group-hover:scale-100 group-hover:translate-x-0 rotate-90 group-hover:rotate-0 translate-x-[-9.6rem] translate-y-[-13rem] font-medium bg-coffee/50 backdrop-blur-md p-4 rounded-3xl">
          <div className="relative mx-auto mb-2 border-[4px] border-tan h-44 w-44 rounded-3xl">
            <AppImage
              src={
                book?.author?.author_image
              }
              className="w-full h-full rounded-2xl"
              imgClassName="object-cover object-top w-full h-full rounded-2xl"
              alt=""
              fallbackType="author"
              name={book?.author?.author_name}
            />
          </div>
          <div className="flex flex-col items-center gap-3 mb-2">
            <h1 className="text-cream">
              {" "}
              <b className="text-[0.9rem] text-tan"> Name:</b>{" "}
              {book?.author?.author_name}
            </h1>
            <div className="flex items-center gap-1 p-1 px-3 border-2 border-tan rounded-t-2xl">
              <Ratings ratings={book?.author?.author_rating} textColor="text-orange" />
            </div>
          </div>
          <p className="text-center text-cream">
            <b className="text-[0.9rem]">Short Intro:</b>{" "}
            <motion.span
              key={isReadMore ? "more" : "less"}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
            >
              {isReadMore
                ? book?.author?.author_description
                : book?.author?.author_description?.length > 50
                  ? `${book?.author?.author_description?.slice(0, 50)}...`
                  : book?.author?.author_description}
            </motion.span>
            {book?.author?.author_description?.length > 50 && (
              <span
                onClick={(e) => {
                  e.stopPropagation();
                  setIsReadMore(!isReadMore);
                }}
                className="inline-block pl-1 text-xs cursor-pointer text-tan hover:underline"
              >
                {isReadMore ? "Show less" : "Read more"}
              </span>
            )}
          </p>

          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="mt-4"
          >
            <Button
              onClick={(e) => {
                e.stopPropagation();
                const url = `/nextChapter/author/${book?.author?.author_id}`;
                if (onComingSoonClick) {
                  onComingSoonClick(url);
                } else {
                  navigate(url);
                }
              }}
              className="flex items-center justify-center w-full gap-2 group"
            >
              <HiOutlineEye className="text-base transition-transform duration-300 group-hover:scale-110" />
              View Profile
            </Button>
          </motion.div>
        </div>
      </div>
      <div className="image w-[60%] md:w-[90%] mx-auto pt-[3.5rem] h-[15rem]">
        <AppImage
          onClick={() => {
            const url = `/nextChapter/book/${book?.book_id}`;
            if (onComingSoonClick) {
              onComingSoonClick(url);
            } else {
              navigate(url);
            }
          }}
          className="w-full h-full cursor-pointer"
          imgClassName="object-contain w-full h-full"
          src={book?.cover_image}
          alt=""
          fallbackType="book"
        />
      </div>
      <div className="px-4 text-xl">
        <div className="text-xl">
          <div className="flex items-center justify-between">
            <h2 className="mr-2 text-lg font-semibold truncate text-cream md:text-xl">
              {book?.title}
            </h2>
            <motion.div
              whileTap={{ scale: 0.8 }}
              whileHover={{ scale: 1.1 }}
              onClick={() => {
                if (!loading) handleLike(book?.book_id, userData?.userId);
              }}
              className="cursor-pointer"
            >
              <motion.div
                animate={{
                  scale: isLiked ? [1, 1.2, 1] : 1,
                  color: isLiked ? "#ef4444" : "#ffe6c1",
                }}
                transition={{ duration: 0.5 }}
              >
                <FaHeart
                  className={`${isLiked ? "text-red-500" : "text-cream"}`}
                />
              </motion.div>

              {isLiked && (
                <FloatingReaction Icon={FaHeart} activeText="text-red-400" />
              )}
            </motion.div>
          </div>
        </div>

        <p className="text-sm text-cream/80 md:text-[1.1rem]">
          {book?.description?.slice(0, 50)}...
        </p>

        <div className="flex gap-4 mt-3 text-sm md:text-lg">
          <p className="font-medium line-through text-cream/70">
            ₹ {Number(book?.book_price) * 2}
          </p>
          <p className="font-bold text-cream">₹ {Number(book?.book_price)}</p>
        </div>
      </div>
      <div className="flex items-center justify-between p-4 mt-2 border-t bottom rounded-b-2xl backdrop-blur-md bg-tan/10 border-tan/10">
        <button
          onClick={(e) => {
            e.stopPropagation();
            if (onComingSoonClick) {
              onComingSoonClick();
            }
          }}
          className="flex items-center gap-2 px-4 py-2 font-semibold transition border active:scale-75 text-cream bg-tan/20 rounded-xl group hover:bg-tan/30 border-tan/20"
        >
          <MdOutlineAddShoppingCart className="group-hover:-rotate-12 duration-300 text-[22px]" />
          <span className="text-sm">Add</span>
        </button>

        <div className="flex items-center">
          <Ratings ratings={book?.book_rating} textColor="text-orange" />
        </div>
      </div>
    </motion.div>
  );
};

export default BookCard;
