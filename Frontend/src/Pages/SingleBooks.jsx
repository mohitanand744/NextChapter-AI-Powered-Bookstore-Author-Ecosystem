import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllBooks } from "../store/Redux/Slices/BooksSlice";
import ScrollBooks from "./../components/ScrollingContainer/ScrollBooks";
import AuthorSlider from "../components/ScrollingContainer/AuthorSlider";
import QuantitySelector from "../components/QuantitySelector";
import Button from "../components/Buttons/Button";
import SectionHeading from "../components/Headings/SectionHeading";
import Breadcrumb from "../components/Common/Breadcrumb";
import Ratings from "../components/RatingsReviews/Ratings";
import Input from "../components/Inputs/Input";
import TestimonialCard from "../components/Cards/TestimonialCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import SwiperNavButtons from "../components/Buttons/SwiperNavButtons";
import AppImage from "../components/Common/AppImage";
import { useComingSoon } from "../store/Context/ComingSoonContext";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// Mock book data for static display
const mockBook = {
  book_id: 1,
  title: "The Whispering Shadows",
  book_price: 1499.00,
  category: "Classic Gothic",
  description: "A masterfully crafted gothic tale that delves into the hidden corridors of an ancestral estate. As the winter fog settles over the valley, young Clara discovers that the house she call home has been keeping secrets far older than its foundations. A haunting exploration of legacy, mystery, and the power of the past.",
  book_description: "A masterfully crafted gothic tale that delves into the hidden corridors of an ancestral estate. As the winter fog settles over the valley, young Clara discovers that the house she call home has been keeping secrets far older than its foundations. A haunting exploration of legacy, mystery, and the power of the past.",
  author: {
    author_id: 101,
    author_name: "Isabella Thorne",
    author_rating: 4.9,
    author_image_url: "https://randomuser.me/api/portraits/women/68.jpg"
  },
  images: ["https://m.media-amazon.com/images/I/81Y4Pte2a-L._SY425_.jpg"]
};

// Mock reviews data
const mockReviews = [
  {
    id: 1,
    user: {
      name: "Alex Johnson",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    rating: 5,
    date: "2023-10-15",
    title: "Absolutely loved it!",
    comment:
      "This book exceeded all my expectations. The storytelling is captivating and the characters are well-developed.",
  },
  {
    id: 2,
    user: {
      name: "Sarah Miller",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    rating: 4,
    date: "2023-09-28",
    title: "Great read",
    comment:
      "Really enjoyed this book. The plot twists kept me engaged throughout. Only reason for 4 stars is the slow start.",
  },
  {
    id: 3,
    user: {
      name: "David Chen",
      avatar: "https://randomuser.me/api/portraits/men/67.jpg",
    },
    rating: 5,
    date: "2023-08-10",
    title: "Masterpiece",
    comment:
      "One of the best books I've read this year. The author's writing style is impeccable and the themes are thought-provoking.",
  },
];

const additionalProductImages = [
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0Lt3gcicBU20IL3BWPC6rH47mB-9pN9puvp2DjGpRkVjiByVki3z9oadl&s=10",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKy4d-f_lspLsPBoxOWHrkluzAGIYBuspEJrd-JG76kuh45j66NqV9QqKo&s=10",
  "https://dbz-images.dubizzle.com/images/2026/06/08/dbe30e952eb94a059a83477d113d28f0-.jpeg?impolicy=dpc",
];

const SingleBooks = () => {
  const { id } = useParams();
  const reviewsSwiperRef = useRef(null);
  const imageSwiperRef = useRef(null);
  const { openComingSoon } = useComingSoon();

  const [book] = useState(mockBook);
  const [activeIndex, setActiveIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [allImages] = useState([
    ...mockBook.images,
    ...additionalProductImages
  ]);
  const [activeTab, setActiveTab] = useState("description");
  const [reviews] = useState(mockReviews);

  const dispatch = useDispatch();
  const { books } = useSelector((state) => state.books);

  useEffect(() => {
    dispatch(fetchAllBooks());
  }, [dispatch]);

  const [newReview, setNewReview] = useState({
    rating: 5,
    title: "",
    comment: "",
  });

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    console.log("Review submitted:", newReview);
    openComingSoon();
  };

  if (!book) {
    return (
      <div className="flex items-center justify-center h-screen bg-tan">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 border-4 border-coffee border-t-transparent rounded-full"
        />
      </div>
    );
  }


  const tabs = [
    { id: "description", label: "Overview" },
    { id: "details", label: "Specification" },
    { id: "reviews", label: `Reviews (${reviews.length})` },
  ];

  return (
    <div className="min-h-screen bg-tan text-coffee selection:bg-coffee selection:text-tan">
      <div className="container mx-auto px-4 pt-10 max-w-7xl">
        <Breadcrumb
          items={[
            { label: "Home", path: "/nextChapter" },
            { label: "Books", path: "/nextChapter/books" },
            { label: book.category, path: null }
          ]}
        />
      </div>

      <div className="container mx-auto px-4 py-12 lg:py-10 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 xl:gap-28 items-start">

          {/* Left Column: Elegant Image Display */}
          <div className="w-full lg:sticky lg:top-28 lg:h-[calc(100vh-17rem)] flex flex-col justify-between">
            <div className="relative w-full h-full flex flex-col justify-between gap-4">

              <motion.div
                layoutId={`book-image-${book.book_id}`}
                className="relative z-10 bookDetailsPage w-full rounded-[2rem] overflow-hidden bg-coffee text-tan border border-tan/20 shadow-2xl flex items-center justify-center group/slider aspect-[3/3.5] lg:aspect-auto lg:flex-1 lg:min-h-0"
              >
                {/* Background design overlay */}
                <div className="absolute inset-0 bg-[url('/images/bgDesign.jpg')] bg-cover bg-center opacity-10 pointer-events-none z-0" />

                <Swiper
                  modules={[Navigation]}
                  onSwiper={(swiper) => {
                    imageSwiperRef.current = swiper;
                  }}
                  onSlideChange={(swiper) => {
                    setActiveIndex(swiper.activeIndex);
                  }}
                  className="w-full h-full z-10"
                >
                  {allImages.map((img, idx) => (
                    <SwiperSlide key={idx} className="w-full h-full flex items-center justify-center p-5">
                      <AppImage
                        src={img}
                        alt={book.title}
                        className="w-full h-full drop-shadow-[0_30px_60px_rgba(0,0,0,0.3)] select-none"
                        imgClassName="object-contain"
                        fallbackType="book"
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>

                {/* Navigation Buttons Overlay */}
                {allImages.length > 1 && (
                  <SwiperNavButtons
                    swiperRef={imageSwiperRef}
                    className="justify-between px-6 opacity-0 group-hover/slider:opacity-100 transition-opacity duration-300 absolute left-0 right-0 z-20 pointer-events-none"
                    prevButtonClass="w-12 h-12 !bg-tan/20 hover:!bg-tan/40 text-tan border border-tan/30 pointer-events-auto flex items-center justify-center backdrop-blur-sm"
                    nextButtonClass="w-12 h-12 !bg-tan/20 hover:!bg-tan/40 text-tan border border-tan/30 pointer-events-auto flex items-center justify-center backdrop-blur-sm"
                    position={{ top: "50%", transform: "translateY(-50%)" }}
                  />
                )}
              </motion.div>

              {/* Minimalist Thumbnails */}
              <div className="flex justify-center gap-5 flex-shrink-0 mt-2 lg:mt-0">
                {allImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setActiveIndex(idx);
                      imageSwiperRef.current?.slideTo(idx);
                    }}
                    className={`relative w-20 aspect-square rounded-xl overflow-hidden transition-all duration-500 ${activeIndex === idx
                      ? "ring-2 ring-coffee ring-offset-4 ring-offset-tan scale-110"
                      : "opacity-40 hover:opacity-100  hover:scale-105"
                      }`}
                  >
                    <AppImage src={img} className="w-full h-full " imgClassName="object-cover" fallbackType="book" alt="" />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Content & Commerce */}
          <div className="w-full relative !p-4 rounded-3xl flex flex-col pt-2 min-w-0">
            <div className="absolute inset-0 rounded-3xl bg-[url('/images/bgDesign.jpg')] bg-cover bg-center opacity-10 pointer-events-none z-0" />
            <div className="mb-12">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center space-x-2 px-3 py-1 bg-coffee/10 border border-coffee/20 rounded-full mb-8"
              >
                <span className="w-1.5 h-1.5 bg-coffee rounded-full animate-pulse" />
                <span className="text-[14px] uppercase tracking-[0.2em] text-coffee font-bold">
                  {book.category} Edition
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-5xl lg:text-7xl  leading-[1.1] text-coffee mb-8"
              >
                {book.title}
              </motion.h1>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="flex items-center space-x-6 pb-10 border-b border-coffee/10"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-14 h-14 rounded-full border-2 border-coffee/20 p-0.5 overflow-hidden">
                    <AppImage src={book.author?.author_image_url || 'https://img.freepik.com/premium-vector/human-icon_970584-3.jpg?semt=ais_hybrid&w=740&q=80'} className="w-full h-full object-cover rounded-full" fallbackType="author" alt="" />
                  </div>
                  <div>
                    <p className="text-[14px] uppercase tracking-widest text-coffee/60 mb-0.5">Author</p>
                    <p className="text-xl  italic text-coffee">{book.author?.author_name}</p>
                  </div>
                </div>
                <div className="h-10 w-px bg-coffee/10" />
                <div>
                  <div className="mb-1 flex items-center gap-2">
                    <Ratings textColor="text-coffee" ratings={book.author?.author_rating || 5} />
                  </div>
                  <p className="text-[14px] uppercase tracking-widest text-coffee/60">Reader's Choice</p>
                </div>
              </motion.div>
            </div>

            {/* Pricing Section */}
            <div className="mb-16">
              <div className="flex items-baseline space-x-5 mb-10">
                <span className="text-5xl  text-coffee">₹{Number(book.book_price).toFixed(2)}</span>
                <span className="text-xl text-coffee/70 line-through">₹{(Number(book.book_price) * 1.5).toFixed(0)}</span>
                <div className="flex-1" />
                <span className="text-[14px] uppercase tracking-widest text-coffee/60 text-right">
                  Free Premium <br /> Express Delivery
                </span>
              </div>

              <div className="flex flex-col xl:flex-row gap-4">
                <div className="bg-coffee rounded-full  flex justify-center w-[10rem] xl:w-auto p-1 xl:p-0 items-center flex-shrink-0">
                  <QuantitySelector
                    initialQuantity={quantity}
                    onChange={setQuantity}
                    className="h-16 xl:h-20 w-full !bg-white/40 !border-coffee/20 !rounded-2xl"
                  />
                </div>
                <div className="flex flex-1 gap-4">
                  <Button
                    variant="primary"
                    className="flex-1  flex items-center justify-center gap-2"
                    onClick={() => openComingSoon()}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    <span className="whitespace-nowrap">Add to Cart</span>
                  </Button>
                  <Button
                    variant="outline"
                    className="flex-1 flex items-center justify-center gap-2 hover:bg-sepia !bg-coffee"
                    onClick={() => openComingSoon()}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                    <span className="whitespace-nowrap">Buy Now</span>
                  </Button>
                </div>
              </div>
            </div>

            {/* Content Tabs */}
            <div className="mb-16">
              <div className="flex space-x-10 border-b-2 border-coffee/30 mb-10">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`pb-5 text-[14px] uppercase tracking-[0.3em] transition-all relative ${activeTab === tab.id ? "text-coffee font-bold" : "text-coffee/70 hover:scale-110"
                      }`}
                  >
                    {tab.label}
                    {activeTab === tab.id && (
                      <motion.div
                        layoutId="tab-indicator"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-coffee"
                      />
                    )}
                  </button>
                ))}
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4 }}
                  className="min-h-[250px]"
                >
                  {activeTab === "description" && (
                    <div className="space-y-8">
                      <p className="text-2xl text-coffee/90 leading-relaxed first-letter:text-5xl first-letter:float-left first-letter:mr-3 first-letter:mt-2 first-letter:font-bold first-letter:text-coffee">
                        {book.book_description || book.description}
                      </p>

                      {/* Video Trailer Section */}
                      <div
                        className="relative group/video overflow-hidden rounded-[2rem] border border-coffee/20 bg-coffee shadow-2xl aspect-video flex items-center justify-center cursor-pointer"
                        onClick={() => openComingSoon()}
                      >
                        {/* Thumbnail Image */}
                        <img
                          src="/images/thumbnail.png"
                          alt="Book Trailer Thumbnail"
                          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover/video:scale-105"
                        />

                        {/* Dark Overlay with background design pattern */}
                        <div className="absolute inset-0 bg-coffee/40 backdrop-blur-[1px] group-hover/video:bg-coffee/30 transition-colors duration-500 z-10" />
                        <div className="absolute inset-0 bg-[url('/images/bgDesign.jpg')] bg-cover bg-center opacity-10 pointer-events-none z-10" />

                        {/* Play Button Icon */}
                        <motion.div
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          className="relative z-20 w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-coffee text-tan flex items-center justify-center shadow-2xl border-4 border-coffee/30 transition-colors "
                        >
                          {/* Inner pulse effect */}
                          <div className="absolute inset-0 rounded-full bg-tan/40 animate-ping opacity-25 group-hover/video:animate-none" />
                          <svg className="w-8 h-8 sm:w-12 sm:h-12 ml-1 fill-current" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </motion.div>

                        {/* Badge Overlay */}
                        <div className="absolute bottom-6 left-6 z-20 px-4 py-1.5 bg-coffee/80 backdrop-blur-md border border-tan/20 rounded-full text-[12px] uppercase tracking-widest text-tan font-bold">
                          Watch Trailer
                        </div>
                      </div>

                      <div className="p-8 bg-coffee text-tan rounded-[2rem] border border-tan/20 relative overflow-hidden group shadow-xl">
                        {/* Background design overlay */}
                        <div className="absolute inset-0 bg-[url('/images/bgDesign.jpg')] bg-cover bg-center opacity-10 pointer-events-none" />

                        <div className="absolute -top-10 -right-10 p-4 opacity-10 group-hover:opacity-20 transition-opacity z-10">
                          <svg className="w-24 h-24 text-tan" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M7.127 22.562l-7.127 1.438 1.438-7.128 5.689 5.69zm1.414-1.414l12.586-12.586-5.657-5.657-12.586 12.586 5.657 5.657zm14.594-13.177l-4.242-4.242c-.781-.781-2.047-.781-2.828 0l-1.414 1.414 7.071 7.071 1.414-1.414c.781-.781.781-2.047 0-2.829z" />
                          </svg>
                        </div>
                        <h4 className="text-[14px] uppercase tracking-[0.4em] text-tan/60 mb-4 font-black relative z-10 font-serif">Collector's Insight</h4>
                        <p className="text-[15px] text-cream leading-relaxed relative z-10">
                          "An unparalleled journey into the human psyche. This edition captures the very essence of literary craftsmanship that our house stands for."
                        </p>
                      </div>
                    </div>
                  )}

                  {activeTab === "details" && (
                    <div className="relative bg-coffee text-tan rounded-[2.5rem] border border-tan/20 overflow-hidden shadow-2xl">
                      {/* Background design overlay */}
                      <div className="absolute inset-0 bg-[url('/images/bgDesign.jpg')] bg-cover bg-center opacity-10 pointer-events-none" />
                      <div className="grid grid-cols-1 md:grid-cols-2">
                        {[
                          { label: "Publishing House", value: "Vintage International", icon: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5s3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" },
                          { label: "Binding Style", value: "Premium Hardcover", icon: "M5 19a2 2 0 01-2-2V7a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1m-6 10a2 2 0 002 2h4a2 2 0 002-2v-4a2 2 0 00-2-2h-4a2 2 0 00-2 2v4z" },
                          { label: "Leaf Count", value: "352 Cream Wove", icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" },
                          { label: "Edition", value: "First Print, 2024", icon: "M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.921-.755 1.688-1.54 1.118l-3.976-2.888a1 1 0 00-1.175 0l-3.976 2.888c-.784.57-1.838-.197-1.539-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.783-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" },
                          { label: "Standard ID", value: "978-0-307-27767-1", icon: "M7 7h.01M7 11h.01M7 15h.01M11 7h.01M11 11h.01M11 15h.01M15 7h.01M15 11h.01M15 15h.01M19 7h.01M19 11h.01M19 15h.01M7 3h10a2 2 0 012 2v14a2 2 0 01-2 2H7a2 2 0 01-2-2V5a2 2 0 012-2z" },
                          { label: "Dimensions", value: "162 x 241 x 32 mm", icon: "M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" }
                        ].map((item, i) => (
                          <div key={i} className={`p-10 flex items-start gap-6 group hover:bg-white/[0.03] transition-all duration-500 ${i % 2 === 0 ? "border-r border-tan/10" : ""} ${i < 4 ? "border-b border-tan/10" : ""}`}>
                            <div className="w-12 h-12 rounded-2xl bg-tan/10 flex items-center justify-center text-tan shrink-0 group-hover:scale-110 group-hover:bg-tan/20 transition-all duration-500">
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d={item.icon} />
                              </svg>
                            </div>
                            <div>
                              <p className="text-[14px] uppercase tracking-[0.2em] text-tan/70 mb-1.5 font-bold">{item.label}</p>
                              <p className="text-xl  text-cream leading-tight">{item.value}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {activeTab === "reviews" && (
                    <div className="space-y-16">
                      {/* Reviews Summary Dashboard */}
                      <div className="relative overflow-hidden grid grid-cols-1 lg:grid-cols-3 gap-8 sm:gap-12 p-6 sm:p-10 bg-coffee rounded-[2rem] sm:rounded-[3rem] border border-tan/20 shadow-2xl">
                        {/* Background design overlay */}
                        <div className="absolute inset-0 bg-[url('/images/bgDesign.jpg')] bg-cover bg-center opacity-10 pointer-events-none" />
                        <div className="flex flex-col items-center justify-center border-b lg:border-b-0 lg:border-r border-tan/10 pb-6 lg:pb-0 lg:pr-6">
                          <h3 className="text-7xl  text-tan mb-4">4.9</h3>
                          <div className="mb-3">
                            <Ratings ratings={4.9} textColor="text-tan" />
                          </div>
                          <p className="text-[12px] uppercase tracking-widest text-cream/70 font-bold">Based on 128 reviews</p>
                        </div>

                        <div className="lg:col-span-2 flex flex-col justify-center space-y-4 pt-6 lg:pt-0">
                          {[
                            { stars: 5, percent: 88 },
                            { stars: 4, percent: 9 },
                            { stars: 3, percent: 2 },
                            { stars: 2, percent: 1 },
                            { stars: 1, percent: 0 }
                          ].map((row, i) => (
                            <div key={i} className="flex items-center gap-4">
                              <span className="text-[12px] font-bold text-cream/60 w-12">{row.stars} Stars</span>
                              <div className="flex-1 h-1.5 bg-white/5 rounded-full overflow-hidden">
                                <motion.div
                                  initial={{ width: 0 }}
                                  animate={{ width: `${row.percent}%` }}
                                  transition={{ duration: 1, delay: i * 0.1 }}
                                  className="h-full bg-tan rounded-full"
                                />
                              </div>
                              <span className="text-[12px] font-bold text-cream/70 w-10 text-right">{row.percent}%</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Review List Slider */}
                      <div className="relative w-full overflow-hidden">
                        <SwiperNavButtons
                          swiperRef={reviewsSwiperRef}
                          position={{ top: "45%" }}
                          prevButtonClass="w-10 h-10 sm:w-12 sm:h-12 !bg-tan/15 hover:!bg-tan/30 text-tan border border-tan/20 flex items-center justify-center backdrop-blur-sm pointer-events-auto"
                          nextButtonClass="w-10 h-10 sm:w-12 sm:h-12 !bg-tan/15 hover:!bg-tan/30 text-tan border border-tan/20 flex items-center justify-center backdrop-blur-sm pointer-events-auto"
                          className="justify-between px-2 sm:px-4 md:px-6 absolute left-0 right-0 z-20 pointer-events-none"
                        />
                        <Swiper
                          modules={[Navigation, Autoplay]}
                          onSwiper={(swiper) => {
                            reviewsSwiperRef.current = swiper;
                          }}
                          autoplay={{
                            delay: 4000,
                            disableOnInteraction: false,
                          }}
                          spaceBetween={30}
                          breakpoints={{
                            320: { slidesPerView: 1, spaceBetween: 20 },
                            1024: { slidesPerView: 1, spaceBetween: 25 },
                            1440: { slidesPerView: 2, spaceBetween: 30 },
                          }}
                          className="!pb-12"
                        >
                          {reviews.map((review, i) => (
                            <SwiperSlide key={i} className="h-auto">
                              <TestimonialCard
                                data={{
                                  ...review,
                                  name: review.user.name,
                                  profile: review.user.avatar,
                                  review: review.comment
                                }}
                              />
                            </SwiperSlide>
                          ))}
                        </Swiper>
                      </div>

                      {/* Add Review Form */}
                      <div className="p-6 sm:p-10 md:p-12 bg-coffee rounded-[2rem] sm:rounded-[3rem] border border-tan/20 relative overflow-hidden group shadow-2xl">
                        {/* Background design overlay */}
                        <div className="absolute inset-0 bg-[url('/images/bgDesign.jpg')] bg-cover bg-center opacity-10 pointer-events-none" />

                        {/* Decorative Background Icon */}
                        <div className="absolute -top-10 -right-10 opacity-10 group-hover:opacity-20 transition-opacity pointer-events-none z-10">
                          <svg className="w-64 h-64 text-tan" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M7.127 22.562l-7.127 1.438 1.438-7.128 5.689 5.69zm1.414-1.414l12.586-12.586-5.657-5.657-12.586 12.586 5.657 5.657zm14.594-13.177l-4.242-4.242c-.781-.781-2.047-.781-2.828 0l-1.414 1.414 7.071 7.071 1.414-1.414c.781-.781.781-2.047 0-2.829z" />
                          </svg>
                        </div>

                        <div className="relative z-10">
                          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                            <div>
                              <h4 className="text-3xl sm:text-4xl  text-tan mb-3">Leave a Legacy</h4>
                              <p className="text-tan/50 max-w-md text-sm sm:text-base">Your thoughts shape the journey of future readers. Share your experience with this curation.</p>
                            </div>
                            <div className="flex gap-1 items-center pb-2">
                              <Ratings
                                ratings={newReview.rating}
                                textColor="text-tan"
                                isClickable={true}
                                onChange={(star) => setNewReview({ ...newReview, rating: star })}
                              />
                            </div>
                          </div>

                          <form onSubmit={handleReviewSubmit} className="space-y-8">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
                              <Input
                                label="Review Title"
                                labelclassname="text-tan/70"
                                placeholder="E.g., A journey beyond words..."
                                value={newReview.title}
                                onChange={(e) => setNewReview({ ...newReview, title: e.target.value })}
                                className="!bg-white/5 !border-tan/20 !text-cream !rounded-[1.5rem] sm:!rounded-[2rem] h-14 sm:h-16 focus:!border-tan"
                              />
                              <Input
                                label="Numerical Grade"
                                labelclassname="text-tan/70"
                                type="number"
                                min="1"
                                max="5"
                                step="0.5"
                                value={newReview.rating}
                                onChange={(e) => {
                                  const val = parseFloat(e.target.value);
                                  setNewReview({ ...newReview, rating: isNaN(val) ? "" : val });
                                }}
                                className="!bg-white/5 !border-tan/20 !text-cream !rounded-[1.5rem] sm:!rounded-[2rem] h-14 sm:h-16 focus:!border-tan"
                              />
                            </div>
                            <Input
                              label="Your Literary Critique"
                              labelclassname="text-tan/70"
                              as="textarea"
                              rows={5}
                              placeholder="Describe your emotional voyage through these pages..."
                              value={newReview.comment}
                              onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                              className="!bg-white/5 !border-tan/20 !text-cream !rounded-[1.2rem] sm:!rounded-[1.5rem] p-5 sm:p-8 resize-none focus:!border-tan"
                            />
                            <Button
                              type="submit"
                              variant="outline"
                              className="w-full h-16 sm:h-20 !rounded-[1.5rem] sm:!rounded-[2rem] !text-lg sm:!text-xl !uppercase !tracking-[0.3em] sm:!tracking-[0.4em] shadow-2xl shadow-tan/10 border border-tan/30 text-tan transition-all duration-300 font-serif"
                              onClick={() => openComingSoon()}
                            >
                              Publish Your Review
                            </Button>
                          </form>
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Quality Seals */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 border-t border-coffee/10 pt-12">
              <div className="flex items-start space-x-5">
                <div className="w-12 h-12 flex-shrink-0 bg-coffee/5 rounded-2xl border border-coffee/10 flex items-center justify-center">
                  <svg className="w-6 h-6 text-coffee" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5s3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <div>
                  <h5 className="text-[14px] font-black text-coffee uppercase tracking-[0.2em] mb-2">Heritage Binding</h5>
                  <p className="text-md text-coffee/70 leading-relaxed">Crafted with archival-grade materials for timeless endurance across generations.</p>
                </div>
              </div>
              <div className="flex items-start space-x-5">
                <div className="w-12 h-12 flex-shrink-0 bg-coffee/5 rounded-2xl border border-coffee/10 flex items-center justify-center">
                  <svg className="w-6 h-6 text-coffee" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <div>
                  <h5 className="text-[14px] font-black text-coffee uppercase tracking-[0.2em] mb-2">Authentic Seal</h5>
                  <p className="text-md text-coffee/70 leading-relaxed">Each copy is verified by our master curators for impeccable production quality.</p>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Recommended for You Section */}
        <div className=" pt-24 border-t border-coffee/10">
          <div className="flex items-end justify-between">
            <SectionHeading
              align="left"
              subtitle="Handpicked Selection"
            >
              Recommended for You
            </SectionHeading>
          </div>
          <div className="relative group/curations">
            <div className="absolute -top-10 -bottom-10 left-0 right-0 bg-coffee/5 blur-3xl opacity-0 group-hover/curations:opacity-100 transition-opacity pointer-events-none" />
            <ScrollBooks autoScroll={false} books={books} onComingSoonClick={(url) => openComingSoon({ exploreLink: url })} />
          </div>
        </div>

        {/* Favorite Authors Section */}
        <div className="">
          <div className="flex items-end justify-between ">
            <SectionHeading
              align="left"
              subtitle="Discover Great Minds"
            >
              Find Your Favorite Author
            </SectionHeading>
          </div>
          <div className="relative group/authors">
            <div className="absolute -top-10 -bottom-10 left-0 right-0 bg-coffee/5 blur-3xl opacity-0 group-hover/authors:opacity-100 transition-opacity pointer-events-none" />
            <AuthorSlider books={books} onComingSoonClick={(url) => openComingSoon({ exploreLink: url })} />
          </div>
        </div>

      </div>
    </div>
  );
};

export default SingleBooks;
