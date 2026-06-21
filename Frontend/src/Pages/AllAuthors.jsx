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
import AuthorOfTheMonthCard from "../components/Cards/AuthorOfTheMonthCard";
import AuthorCardSkeleton from "../components/Loaders/Skeleton/AuthorCardSkeleton";
import { useComingSoon } from "../store/Context/ComingSoonContext";
import Search from "../components/SearchBars/Search";
import { fetchAllBooks } from "../store/Redux/Slices/BooksSlice";
import { categoryApis } from "../utils/apis/categoryApis";
import BooksLoader from "../components/Loaders/BooksLoader";
import NoData from "../components/EmptyData/noData";
import AppImage from "../components/Common/AppImage";

import AuthorSlider from "../components/ScrollingContainer/AuthorSlider";
import SectionHeading from "../components/Headings/SectionHeading";
import CustomSelect from "../components/Inputs/CustomSelect";
import Button from "../components/Buttons/Button";
import AnimatedItemCount from "../components/UI/AnimatedItemCount";
import CategorySlider from "../components/ScrollingContainer/CategorySlider";

import "swiper/css";
import "swiper/css/free-mode";
import Badge from "../components/Common/Badge";

const AllAuthors = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { openComingSoon } = useComingSoon();
  const { books, loading } = useSelector((state) => state.books);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [filters, setFilters] = useState({
    categories: []
  });
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
    if (filters.categories && filters.categories.length > 0) {
      list = list.filter((a) =>
        filters.categories.some((cat) => a.genres.has(cat))
      );
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
  }, [books, searchTerm, sortBy, filters.categories, minRating, categoriesList]);

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

      <div className="container mx-auto p-4">
        {/* Author of the Month Section */}
        {loading ? (
          <div className="mb-20 relative overflow-hidden rounded-[2.5rem] sm:rounded-[3rem] bg-coffee p-8 sm:p-12 border border-tan/20 flex flex-col xl:flex-row items-center gap-12 animate-pulse">
            <div className="absolute inset-0 bg-[url('/images/bgDesign.jpg')] bg-cover bg-center opacity-5 pointer-events-none" />
            <div className="relative shrink-0 w-56 h-56 sm:w-72 sm:h-72 rounded-full bg-tan/10 border-4 border-[#1A1511]" />
            <div className="flex-1 w-full space-y-5">
              <div className="h-9 w-44 bg-tan/15 rounded-full" />
              <div className="h-12 w-64 md:w-80 bg-tan/20 rounded" />
              <div className="flex gap-2">
                <div className="h-6 w-20 bg-tan/10 rounded-full" />
                <div className="h-6 w-24 bg-tan/10 rounded-full" />
              </div>
              <div className="space-y-2 border-l-2 border-tan/20 pl-6">
                <div className="h-4 w-full bg-tan/5 rounded" />
                <div className="h-4 w-5/6 bg-tan/5 rounded" />
                <div className="h-4 w-2/3 bg-tan/5 rounded" />
              </div>
              <div className="flex flex-wrap gap-4">
                <div className="h-16 w-36 bg-tan/10 rounded-2xl" />
                <div className="h-16 w-36 bg-tan/10 rounded-2xl" />
              </div>
            </div>
          </div>
        ) : authorOfTheMonth ? (
          <AuthorOfTheMonthCard
            authorOfTheMonth={authorOfTheMonth}
            authorOfTheMonthBooks={authorOfTheMonthBooks}
            openComingSoon={openComingSoon}
          />
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
          className="mb-24"
        >
          <SectionHeading subtitle="Curated Spotlight">Featured Authors</SectionHeading>
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 animate-pulse">
              {[...Array(4)].map((_, i) => (
                <AuthorCardSkeleton key={i} />
              ))}
            </div>
          ) : books.length === 0 ? (
            <div className="py-8 flex justify-center">
              <NoData title="No Featured Authors" message="We're currently curating a list of featured authors. Stay tuned!" icon="search" />
            </div>
          ) : (
            <AuthorSlider books={books} onComingSoonClick={(url) => openComingSoon({ exploreLink: url })} />
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
                {(searchTerm || (filters.categories && filters.categories.length > 0) || minRating > 0 || sortBy !== "name") && (
                  <Button
                    onClick={() => {
                      setSearchTerm("");
                      setFilters({ categories: [] });
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

            {/* Category Slider for Genres */}
            <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-tan/10">
              <CategorySlider filters={filters} setFilters={setFilters} />
            </div>
          </div>
        </div>

        {/* Results Count Section */}
        <div className="mb-10 w-fit px-6">
          <AnimatedItemCount
            count={loading ? 0 : authorsList.length}
            label="Author"
            suffix={loading ? "Loading..." : "Found"}
            Icon={GiFeather}
          />
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {[...Array(8)].map((_, i) => (
              <AuthorCardSkeleton key={i} />
            ))}
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
                  <AuthorCard author={author} onComingSoonClick={(url) => openComingSoon({ exploreLink: url })} />
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
    </div>
  );
};

export default AllAuthors;
