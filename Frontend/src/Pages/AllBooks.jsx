import { useEffect, useRef, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

import BookCard from "../components/Cards/BookCard";
import { fetchAllBooks } from "../store/Redux/Slices/BooksSlice";
import BooksLoader from "../components/Loaders/BooksLoader";
import BookListingFilter from "../components/BookListingFilter";
import CategorySlider from "../components/ScrollingContainer/CategorySlider";
import NoData from "../components/EmptyData/noData";
import Banners from "../components/Banners/Banners";
import { useComingSoon } from "../store/Context/ComingSoonContext";
import SectionHeading from "../components/Headings/SectionHeading";
import SubNavbar from "../components/Common/Navbars/SubNavbar";
import useDebounce from "../Hooks/useDebounce";

export const defaultFilters = {
  limit: 8,
  cursor: "",
  categories: [],
  minPrice: 0,
  maxPrice: 10000,
  discount: "",
  language: "",
  search: "",
  rating: 0,
  binding: "",
};

const AllBooks = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const { books, loading, fetchingMore, hasMore, nextCursor } = useSelector(
    (state) => state.books,
  );

  const sentinelRef = useRef();

  const [showFilters, setShowFilters] = useState(false);
  const { openComingSoon } = useComingSoon();

  const [filters, setFilters] = useState({
    ...defaultFilters,
    search: "",
  });

  const [openCategory, setOpenCategory] = useState({
    PriceFilter: false,
    CategoryFilter: false,
    LanguageFilter: false,
    DiscountFilter: false,
    RatingFilter: false,
    BindingFilter: false,
  });

  useEffect(() => {
    const urlSearch = new URLSearchParams(location.search).get("search") || "";

    setFilters((prev) => ({
      ...prev,
      search: urlSearch,
      cursor: "",
    }));
  }, [location.search]);

  const {
    categories,
    minPrice,
    maxPrice,
    discount,
    language,
    search,
    rating,
    binding,
  } = filters;

  useEffect(() => {
    setFilters((prev) => ({
      ...prev,
      cursor: "",
    }));
  }, [
    categories,
    minPrice,
    maxPrice,
    discount,
    language,
    search,
    rating,
    binding,
  ]);

  const debouncedSearch = useDebounce(filters.search, 500);
  const debouncedMinPrice = useDebounce(filters.minPrice, 500);
  const debouncedMaxPrice = useDebounce(filters.maxPrice, 500);

  useEffect(() => {
    dispatch(
      fetchAllBooks({
        ...filters,
        search: debouncedSearch,
        minPrice: debouncedMinPrice,
        maxPrice: debouncedMaxPrice,
      }),
    );
  }, [
    dispatch,
    debouncedSearch,
    debouncedMinPrice,
    debouncedMaxPrice,
    filters.categories,
    filters.discount,
    filters.language,
    filters.rating,
    filters.binding,
    filters.limit,
    filters.cursor,
  ]);

  useEffect(() => {
    if (!sentinelRef.current) return;

    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading && !fetchingMore) {
          setFilters((prev) => ({
            ...prev,
            cursor: nextCursor,
          }));
        }
      },
      { threshold: 0.1 },
    );

    obs.observe(sentinelRef.current);

    return () => obs.disconnect();
  }, [hasMore, nextCursor, loading, fetchingMore]);

  const appliedFiltersCount = useMemo(() => {
    const ignoreKeys = ["limit", "cursor"];

    const isFilterValueEqual = (userValue, defaultValue) => {
      if (Array.isArray(userValue)) {
        return userValue.length === 0;
      }

      if (typeof userValue === "object" && userValue !== null) {
        return Object.keys(userValue).length === 0;
      }

      return userValue === defaultValue;
    };

    return Object.keys(filters).filter(
      (key) =>
        !ignoreKeys.includes(key) &&
        !isFilterValueEqual(filters[key], defaultFilters[key]),
    ).length;
  }, [filters]);

  return (
    <div
      className="relative"
      onClick={(e) => {
        e.stopPropagation();
        setShowFilters(false);
      }}
    >
      <Banners
        titleFirst="Explore"
        titleSecond="Our Books"
        description="Find your next favorite read among our extensive collection."
        items={[
          { label: "Home", path: "/nextChapter" },
          { label: "Books", path: null },
        ]}
      />

      <div className="container px-4 pb-8 pt-0 mx-auto sm:px-6 lg:px-8">
        <SubNavbar
          showBackButton={false}
          registryLabel="Library Catalog"
          registryCount={`${books?.length ?? 0} ${books?.length === 1 ? "Book" : "Books"} Loaded`}
          searchTerm={filters.search}
          setSearchTerm={(val) =>
            setFilters((prev) => ({
              ...prev,
              search: val,
              cursor: "",
            }))
          }
          searchPlaceholder="Search by title, author, or genre..."
          enableSuggestions={true}
          suggestions={books}
          extraActions={
            <div className="flex items-center gap-2">
              <motion.button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowFilters(!showFilters);
                }}
                whileTap={{ scale: 0.9 }}
                className="relative flex items-center justify-center transition-all duration-300 border shadow-sm w-11 h-11 rounded-2xl bg-tan/10 border-tan/20 text-cream hover:bg-tan/20"
              >
                {appliedFiltersCount > 0 && (
                  <span className="px-2 absolute -top-1 -right-1 bg-opacity-50 backdrop-blur-sm py-0.5 text-sm font-semibold rounded-full bg-sepia text-tan">
                    {appliedFiltersCount}
                  </span>
                )}

                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <AnimatePresence mode="wait">
                    {showFilters ? (
                      <motion.path
                        key="close"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 1 }}
                        exit={{ pathLength: 0, opacity: 0 }}
                        d="M6 18L18 6M6 6l12 12"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    ) : (
                      <motion.path
                        key="filter"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 1 }}
                        exit={{ pathLength: 0, opacity: 0 }}
                        d="M3 6H21M6 12H18M10 18H14"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    )}
                  </AnimatePresence>
                </svg>
              </motion.button>
            </div>
          }
        />

        <CategorySlider filters={filters} setFilters={setFilters} />

        <SectionHeading
          align="left"
          className="!py-2 !pt-5 !mb-6"
          subtitle="Explore our curated collection of masterfully crafted novels and anthologies"
        >
          The Book Gallery
        </SectionHeading>

        {loading ? (
          <div className="flex items-center justify-center min-h-[40vh] py-20">
            <BooksLoader />
          </div>
        ) : books?.length === 0 ? (
          <div className="my-20">
            <NoData
              title="No Books Found"
              message="We couldn't find any books matching your current filters. Try adjusting your search or filters."
              icon="search"
              showAction={true}
              actionText="Clear All Filters"
              onActionClick={() => {
                navigate("/nextChapter/books");
                setFilters(defaultFilters);
              }}
            />
          </div>
        ) : (
          <div>
            <div className="grid grid-cols-12 gap-3 my-10">
              {books?.map((book) => (
                <motion.div
                  key={book.book_id}
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.3 }}
                  className="col-span-12 sm:col-span-6 lg:col-span-4 xl:col-span-3"
                >
                  <BookCard
                    book={book}
                    onComingSoonClick={(url) => openComingSoon({ exploreLink: url })}
                  />
                </motion.div>
              ))}
            </div>

            <div
              ref={sentinelRef}
              className="flex items-center justify-center w-full h-10 my-14"
            >
              {fetchingMore && (
                <div className="flex items-center justify-center">
                  <BooksLoader />
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed bg-black/70 md:bg-transparent flex justify-end  inset-0 md:inset-auto -top-[5rem] md:top-[10rem] right-0 md:right-[1.5rem] z-[9999]"
          >
            <BookListingFilter
              filters={filters}
              setFilters={setFilters}
              appliedFiltersCount={appliedFiltersCount}
              setShowFilters={setShowFilters}
              openCategory={openCategory}
              setOpenCategory={setOpenCategory}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AllBooks;
