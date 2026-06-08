import React, { useMemo, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaStar, FaBookOpen, FaSearch, FaFilter, FaTrophy, FaChevronRight } from "react-icons/fa";
import { PremiumVerifiedBadge } from "../components/SVGs/SVGs";
import { GiFeather } from "react-icons/gi";
import Banners from "../components/Banners/Banners";
import Breadcrumb from "../components/Common/Breadcrumb";
import AuthorCard from "../components/Cards/AuthorCard";
import ComingSoonModal from "../components/Modal/ComingSoonModal";
import Search from "../components/SearchBars/Search";
import { fetchAllBooks } from "../store/Redux/Slices/BooksSlice";
import { categoryApis } from "../utils/apis/categoryApis";
import BooksLoader from "../components/Loaders/BooksLoader";
import NoData from "../components/EmptyData/noData";

import AuthorSlider from "../components/ScrollingContainer/AuthorSlider";
import SectionHeading from "../components/Headings/SectionHeading";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Autoplay } from "swiper/modules";
import CustomSelect from "../components/Inputs/CustomSelect";
import Button from "../components/Buttons/Button";
import AnimatedItemCount from "../components/UI/AnimatedItemCount";

import "swiper/css";
import "swiper/css/free-mode";

const AllAuthors = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isComingSoonOpen, setIsComingSoonOpen] = useState(false);
  const [exploreLink, setExploreLink] = useState("");
  const { books, loading } = useSelector((state) => state.books);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [minRating, setMinRating] = useState(0);
  const [categoriesList, setCategoriesList] = useState([]);

  useEffect(() => {
    if (books.length === 0) {
      dispatch(fetchAllBooks());
    }
  }, [dispatch, books.length]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await categoryApis.getAllCategories();
        if (response?.success) {
          setCategoriesList(response?.data?.categories);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  const { authorsList, allGenres } = useMemo(() => {
    const authorsMap = new Map();
    const systemGenres = categoriesList.map(c => c.name);
    const genresSet = new Set(["All", ...systemGenres]);

    books.forEach((book) => {
      const author = book.author;
      if (author && author.author_id) {
        if (!authorsMap.has(author.author_id)) {
          authorsMap.set(author.author_id, {
            ...author,
            bookCount: 1,
            genres: new Set([book.category]),
          });
        } else {
          const existing = authorsMap.get(author.author_id);
          existing.bookCount += 1;
          if (book.category) existing.genres.add(book.category);
        }
      }
    });

    let list = Array.from(authorsMap.values());

    // Filter by search
    if (searchTerm) {
      list = list.filter((a) =>
        a.author_name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by Genre
    if (selectedGenre !== "All") {
      list = list.filter((a) => a.genres.has(selectedGenre));
    }

    // Filter by Rating
    if (minRating > 0) {
      list = list.filter((a) => (a.author_rating || 5) >= minRating);
    }

    // Sort
    list.sort((a, b) => {
      if (sortBy === "name") return a.author_name.localeCompare(b.author_name);
      if (sortBy === "rating") return (b.author_rating || 0) - (a.author_rating || 0);
      if (sortBy === "books") return b.bookCount - a.bookCount;
      return 0;
    });

    return { authorsList: list, allGenres: Array.from(genresSet) };
  }, [books, searchTerm, sortBy, selectedGenre, minRating, categoriesList]);

  const authorOfTheMonth = useMemo(() => {
    if (books.length === 0) return null;
    const authorsMap = new Map();
    books.forEach((book) => {
      const author = book.author;
      if (author && author.author_id) {
        if (!authorsMap.has(author.author_id)) {
          authorsMap.set(author.author_id, {
            ...author,
            bookCount: 1,
            genres: new Set([book.category]),
          });
        } else {
          const existing = authorsMap.get(author.author_id);
          existing.bookCount += 1;
          if (book.category) existing.genres.add(book.category);
        }
      }
    });
    const list = Array.from(authorsMap.values());
    if (list.length === 0) return null;

    // Sort by highest rating then by book count
    list.sort((a, b) => {
      const ratingDiff = (b.author_rating || 0) - (a.author_rating || 0);
      if (ratingDiff !== 0) return ratingDiff;
      return b.bookCount - a.bookCount;
    });

    return list[0];
  }, [books]);

  const authorOfTheMonthBooks = useMemo(() => {
    if (!authorOfTheMonth) return [];
    return books
      .filter(b => b.author?.author_id === authorOfTheMonth.author_id)
      .slice(0, 3);
  }, [books, authorOfTheMonth]);


  console.log("author", authorOfTheMonth);


  return (
    <div className="min-h-screen bg-tan">
      <Banners
        titleFirst="Literary"
        titleSecond="Architects"
        description="Meet the brilliant minds behind your favorite stories."
        items={[
          { label: "Home", path: "/nextChapter" },
          { label: "Authors", path: null }
        ]}
      />

      <div className="container mx-auto px-4 py-8">
        {/* Author of the Month Section */}
        {authorOfTheMonth ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="mb-20 relative overflow-hidden rounded-[2.5rem] sm:rounded-[3rem] bg-gradient-to-br from-[#2D241E] to-[#1A1511] p-8 sm:p-12 border border-sepia/20 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] flex flex-col xl:flex-row items-center gap-12 group"
          >
            <div className="absolute inset-0 bg-[url('/images/bgDesign.jpg')] bg-cover bg-center opacity-20 pointer-events-none" />
            <div className="absolute -top-32 -right-32 w-[30rem] h-[30rem] bg-sepia/10 rounded-full blur-[100px] pointer-events-none group-hover:bg-sepia/20 transition-all duration-1000" />

            <div className="absolute top-0 right-0 p-8 opacity-5 hidden xl:block pointer-events-none transform group-hover:scale-110 group-hover:rotate-12 transition-all animate-pulse duration-700 ease-out">
              <FaTrophy className="text-[16rem] text-cream/50" />
            </div>

            {/* Avatar Area */}
            <div className="relative z-10 shrink-0 mt-4 xl:mt-0">
              <div className="absolute inset-0 rounded-full border-2 border-sepia/40 animate-[spin_15s_linear_infinite] scale-[1.15]" />
              <div className="absolute inset-0 rounded-full border-2 border-tan/30 border-dashed animate-[spin_20s_linear_infinite_reverse] scale-[1.3]" />
              <div className="relative w-56 h-56 sm:w-72 sm:h-72 rounded-full p-2 bg-gradient-to-br from-sepia via-tan to-coffee shadow-[0_0_50px_rgba(180,140,90,0.15)] group-hover:shadow-[0_0_70px_rgba(180,140,90,0.25)] transition-shadow duration-700">
                <div className="w-full h-full overflow-hidden rounded-full border-4 border-[#1A1511] bg-coffee">
                  <img
                    src={authorOfTheMonth.author_image || "https://cdn.vectorstock.com/i/500p/40/53/accurate-silhouette-of-a-man-for-profile-picture-vector-14714053.jpg"}
                    alt={authorOfTheMonth.author_name}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  />
                </div>
                {/* Verified Badge */}
                <div className="absolute bottom-5 right-5 sm:bottom-6 sm:right-6 z-20">
                  <PremiumVerifiedBadge className="w-10 h-10 sm:w-12 sm:h-12 drop-shadow-[0_0_10px_rgba(160,120,85,0.6)] bg-coffee rounded-full" title="Verified Author" />
                </div>
              </div>
            </div>

            {/* Content Area */}
            <div className="relative z-10 flex-1 flex flex-col items-center xl:items-start text-center xl:text-left w-full mt-6 xl:mt-0">
              <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-gradient-to-r from-sepia/20 to-transparent border border-sepia/30 text-tan/60 mb-6 shadow-inner backdrop-blur-sm">
                <FaTrophy className="text-base sm:text-lg animate-pulse" />
                <span className="text-xs sm:text-lg font-black tracking-[0.2em] uppercase">Author of the Month</span>
              </div>

              <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-tan via-cream to-sepia mb-4 drop-shadow-sm">
                {authorOfTheMonth.author_name}
              </h2>

              {/* Genre Tags */}
              {authorOfTheMonth.genres && authorOfTheMonth.genres.size > 0 && (
                <div className="flex flex-wrap justify-center xl:justify-start gap-2 mb-6">
                  {Array.from(authorOfTheMonth.genres).map(genre => (
                    <span key={genre} className="px-4 py-1.5 bg-black/20 backdrop-blur-md border border-tan/20 rounded-full text-[11px] sm:text-xs font-bold text-tan/90 tracking-widest uppercase shadow-inner">
                      {genre}
                    </span>
                  ))}
                </div>
              )}

              <div className="relative mb-8 pt-4">
                <svg className="absolute top-0 left-0 w-10 h-10 text-sepia/20 -translate-x-4 -translate-y-4" fill="currentColor" viewBox="0 0 24 24"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" /></svg>
                <p className="text-tan/80 text-base sm:text-lg leading-relaxed max-w-3xl font-medium italic pl-6 border-l-2 border-sepia/40">
                  "{authorOfTheMonth.author_description || "A brilliant visionary whose captivating stories transport readers to incredible new worlds. Their masterful storytelling and profound character development have captured the hearts of readers worldwide, making them a cornerstone of our literary community."}"
                </p>
              </div>

              <div className="w-full flex flex-col md:flex-row items-center justify-center xl:justify-start gap-4 mb-8">
                <span className="text-cream/50 text-lg uppercase tracking-widest font-bold">Accolades:</span>
                <div className="flex flex-wrap items-center justify-center gap-3">
                  <span className="px-3 py-1 bg-sepia/10 text-sepia border border-sepia/30 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-sm">Global Bestseller</span>
                  <span className="px-3 py-1 bg-sepia/10 text-sepia border border-sepia/30 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-sm">Editor's Choice</span>
                  <span className="px-3 py-1 bg-sepia/10 text-sepia border border-sepia/30 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-sm">Literary Award '24</span>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-center xl:justify-start gap-4 mb-8 w-full">
                <div className="flex items-center gap-4 bg-black/20 backdrop-blur-md px-6 py-3.5 rounded-2xl border border-tan/10 shadow-inner hover:border-sepia/40 transition-colors duration-300">
                  <FaBookOpen className="text-sepia text-2xl" />
                  <div className="flex flex-col items-start">
                    <span className="text-tan/50 text-[12px] uppercase font-bold tracking-widest">Published Works</span>
                    <span className="text-tan font-black text-2xl leading-none mt-1">{authorOfTheMonth.bookCount}</span>
                  </div>
                </div>
                <div className="flex items-center gap-4 bg-black/20 backdrop-blur-md px-6 py-3.5 rounded-2xl border border-tan/10 shadow-inner hover:border-sepia/40 transition-colors duration-300">
                  <FaStar className="text-sepia text-2xl" />
                  <div className="flex flex-col items-start">
                    <span className="text-tan/50 text-[12px] uppercase font-bold tracking-widest">Global Rating</span>
                    <span className="text-tan font-black text-2xl leading-none mt-1">{authorOfTheMonth.author_rating || 5} <span className="text-lg text-tan/50 font-medium">/ 5</span></span>
                  </div>
                </div>
              </div>

              {/* Top Books Showcase */}
              {authorOfTheMonthBooks && authorOfTheMonthBooks.length > 0 ? (
                <div className="w-full pt-8 border-t border-tan/10 flex flex-col sm:flex-row items-center justify-between gap-8 mt-2">
                  <div className="flex flex-col sm:flex-row items-center gap-4">
                    <span className="text-cream/50 text-[16px] font-bold uppercase tracking-widest whitespace-nowrap">Featured Works:</span>
                    <div className="flex space-x-4">
                      {authorOfTheMonthBooks.map((book, idx) => (
                        <div key={book.book_id} className="w-20 h-28  rounded-md overflow-hidden border-2 border-[#1A1511] shadow-[0_10px_20px_rgba(0,0,0,0.5)] hover:-translate-y-3 hover:scale-110 transition-all duration-300 z-10 hover:z-20 cursor-pointer" onClick={() => { setExploreLink(`/nextChapter/book/${book.book_id}`); setIsComingSoonOpen(true); }}>
                          <img src={book?.images[0]} alt={book.title} className="w-full h-full object-cover" />
                        </div>
                      ))}
                    </div>
                  </div>

                  <Button
                    onClick={() => { setExploreLink(`/nextChapter/author/${authorOfTheMonth.author_id}`); setIsComingSoonOpen(true); }}
                    variant="primary"
                    className="flex items-center gap-3 !bg-sepia hover:!bg-tan hover:!text-coffee !text-cream !rounded-xl !px-8 !py-4 shadow-[0_0_20px_rgba(180,140,90,0.2)] hover:shadow-[0_0_30px_rgba(180,140,90,0.4)] transition-all duration-300 shrink-0 group/btn"
                  >
                    <span className="font-bold tracking-wider text-sm">Explore Collection</span>
                    <FaChevronRight className="text-sm group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                </div>
              ) : (
                <div className="w-full pt-8 border-t border-tan/10 flex justify-center xl:justify-start">
                  <Button
                    onClick={() => { setExploreLink(`/nextChapter/author/${authorOfTheMonth.author_id}`); setIsComingSoonOpen(true); }}
                    variant="primary"
                    className="flex items-center gap-3 !bg-sepia hover:!bg-tan hover:!text-coffee !text-cream !rounded-xl !px-8 !py-4 shadow-[0_0_20px_rgba(180,140,90,0.2)] hover:shadow-[0_0_30px_rgba(180,140,90,0.4)] transition-all duration-300 group/btn"
                  >
                    <span className="font-bold tracking-wider text-sm">View Full Profile</span>
                    <FaChevronRight className="text-sm group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                </div>
              )}
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-20"
          >
            <SectionHeading subtitle="Literary Excellence">Author of the Month</SectionHeading>
            <div className="py-8 flex justify-center">
               <NoData title="No Author Selected" message="We're currently selecting this month's featured author. Check back soon!" icon="user" />
            </div>
          </motion.div>
        )}

        {/* Featured Section - Always Visible */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-20"
        >
          <SectionHeading subtitle="Curated Spotlight">Featured Authors</SectionHeading>
          {books.length === 0 ? (
             <div className="py-8 flex justify-center">
               <NoData title="No Featured Authors" message="We're currently curating a list of featured authors. Stay tuned!" icon="search" />
             </div>
          ) : (
             <AuthorSlider books={books} onComingSoonClick={(url) => { setExploreLink(url); setIsComingSoonOpen(true); }} />
          )}
        </motion.div>

        {/* Search and Filters Section */}
        <div className="relative z-10 -mt-16 mb-12">
          <div className="bg-coffee p-5 sm:p-8 rounded-[2rem] sm:rounded-[3rem] shadow-2xl border border-tan/20 relative overflow-hidden">
            <div
              className="absolute inset-0 bg-[url('/images/bgDesign.jpg')] bg-cover bg-center opacity-10 pointer-events-none"
            />
            <div className="relative z-10 flex flex-col lg:flex-row gap-6 sm:gap-8 items-center justify-between">
              {/* Search and Reset */}
              <div className="w-full lg:w-1/3 flex items-center gap-4">
                <Search
                  placeholder="Search authors..."
                  onChange={(val) => setSearchTerm(val)}
                  onSearch={(val) => setSearchTerm(val)}
                  styling="flex-1 bg-sepia rounded-full shadow-inner"
                />
                {(searchTerm || selectedGenre !== "All" || minRating > 0 || sortBy !== "name") && (
                  <Button
                    onClick={() => {
                      setSearchTerm("");
                      setSelectedGenre("All");
                      setMinRating(0);
                      setSortBy("name");
                    }}
                    variant="primary"
                    className="flex items-center gap-2 !bg-sepia !text-cream !rounded-full  group shrink-0"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 group-hover:rotate-180 transition-transform duration-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                      />
                    </svg>
                    <span className="text-[14px] font-bold uppercase tracking-widest">Reset</span>
                  </Button>
                )}
              </div>

              {/* Advanced Filters */}
              <div className="flex flex-wrap items-center gap-4 sm:gap-6 w-full lg:w-auto justify-center lg:justify-end">
                <div className="flex items-center gap-3 w-full sm:w-[14rem]">
                  <span className="text-[14px] sm:text-[16px] uppercase tracking-widest text-tan/50 font-bold shrink-0">Rating</span>
                  <CustomSelect
                    options={[
                      { value: 0, label: "All Ratings" },
                      { value: 4.5, label: "4.5+ Stars" },
                      { value: 4.0, label: "4.0+ Stars" },
                      { value: 3.5, label: "3.5+ Stars" },
                    ]}
                    value={minRating}
                    onChange={(val) => setMinRating(val)}
                    placeholder="Min Rating"
                    className="!bg-tan/10 !border-tan/20 !text-tan !rounded-xl !h-[42px]"
                  />
                </div>

                <div className="flex items-center gap-3 w-full sm:w-[14rem]">
                  <span className="text-[14px] sm:text-[16px] uppercase tracking-widest text-tan/50 font-bold shrink-0">Sort</span>
                  <CustomSelect
                    options={[
                      { value: "name", label: "Name (A-Z)" },
                      { value: "rating", label: "Top Rated" },
                      { value: "books", label: "Most Prolific" },
                    ]}
                    value={sortBy}
                    onChange={(val) => setSortBy(val)}
                    placeholder="Sort By"
                    className="!bg-tan/10 !border-tan/20 !text-tan !rounded-xl !h-[42px]"
                  />
                </div>
              </div>
            </div>

            {/* Genre Filter - Swiper Slider */}
            <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-tan/10">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
                <span className="text-[14px] sm:text-[16px] uppercase tracking-widest text-tan/50 font-bold shrink-0">Genres:</span>
                <div className="w-full overflow-hidden">
                  <Swiper
                    key={allGenres.length}
                    slidesPerView="auto"
                    spaceBetween={10}
                    loop={true}
                    speed={1500}
                    autoplay={{
                      delay: 0,
                      pauseOnMouseEnter: true,
                    }}

                    freeMode={true}
                    observer={true}
                    observeParents={true}
                    watchSlidesProgress={true}
                    modules={[FreeMode, Autoplay]}
                    className="genre-swiper"
                  >

                    {allGenres.map((genre) => (
                      <SwiperSlide key={genre} className="!w-auto">
                        <button
                          onClick={() => setSelectedGenre(genre)}
                          className={`px-4 sm:px-6 py-2 sm:py-2.5 rounded-full text-[13px] sm:text-[15px] font-bold transition-all duration-300 border ${selectedGenre === genre
                            ? "bg-tan text-coffee border-tan shadow-lg scale-105"
                            : "bg-transparent text-tan/70 border-tan/20 hover:border-tan hover:text-tan"
                            }`}
                        >
                          {genre}
                        </button>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Results Count Section */}
        <div className="mb-10 w-fit px-6">
          <AnimatedItemCount
            count={authorsList.length}
            label="Author"
            suffix="Found"
            Icon={GiFeather}
          />
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <BooksLoader />
          </div>
        ) : authorsList.length > 0 ? (
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
          >
            <AnimatePresence mode="popLayout">
              {authorsList.map((author, index) => (
                <motion.div
                  key={author.author_id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                >
                  <AuthorCard author={author} onComingSoonClick={(url) => { setExploreLink(url); setIsComingSoonOpen(true); }} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <NoData
            title="No Authors Found"
            message="We couldn't find any authors matching your current filters. Try broadening your criteria."
            icon="search"
          />
        )}
      </div>
      <ComingSoonModal
        isOpen={isComingSoonOpen}
        onClose={() => setIsComingSoonOpen(false)}
        exploreLink={exploreLink}
      />
    </div>
  );
};

export default AllAuthors;
