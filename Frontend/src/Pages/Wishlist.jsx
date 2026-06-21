import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiHeart, FiChevronRight } from "react-icons/fi";
import SectionHeading from "../components/Headings/SectionHeading";
import SubNavbar from "../components/Common/Navbars/SubNavbar";
import BookCard from "../components/Cards/BookCard";
import Banners from "../components/Banners/Banners";
import { useDispatch, useSelector } from "react-redux";
import { getAllWishlists } from "../store/Redux/Slices/wishlistSlice";
import NoData from "./../components/EmptyData/noData";
import AnimatedItemCount from "../components/UI/AnimatedItemCount";
import { GiBookPile } from "react-icons/gi";
import Breadcrumb from "../components/Common/Breadcrumb";
import { useComingSoon } from "../store/Context/ComingSoonContext";
import BookCardSkeleton from "../components/Loaders/Skeleton/BookCardSkeleton";

const Wishlist = () => {
  const dispatch = useDispatch();
  const { loading, wishlists } = useSelector((state) => state.wishlists);
  const [searchTerm, setSearchTerm] = useState("");
  const { openComingSoon } = useComingSoon();

  useEffect(() => {
    dispatch(getAllWishlists());
  }, [dispatch]);

  const filteredBooks = useMemo(() => {
    return (
      wishlists?.data?.filter(
        (book) =>
          book?.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          book?.author?.author_name
            ?.toLowerCase()
            .includes(searchTerm.toLowerCase()),
      ) || []
    );
  }, [wishlists?.data, searchTerm]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen "
    >
      {/* Header */}

      <Banners
        titleFirst={"My Reading"}
        titleSecond={"List"}
        description={"Your saved books for later"}
        items={[
          { label: "Home", path: "/nextChapter" },
          { label: "Profile", path: "/nextChapter/user/profile" },
          { label: "Wishlist", path: null },
        ]}
      />

      <div className="container px-4 pb-8 pt-0 mx-auto sm:px-6 lg:px-8">
        <SubNavbar
          backLabel="Back to Profile"
          backTo="/nextChapter/user/profile"
          registryLabel="Reading List"
          registryCount={loading ? "Loading..." : `${wishlists?.data?.length ?? 0} ${wishlists?.data?.length === 1 ? 'Book' : 'Books'} Saved`}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          searchPlaceholder="Search your wishlist..."
        />

        <SectionHeading
          align="left"
          className="!py-2 !mb-6"
          subtitle="Your handpicked collection of saved titles and future reads"
        >
          My Wishlist
        </SectionHeading>

        {/* Book List */}
        <div className="grid grid-cols-1 gap-6 pb-6 md:grid-cols-2 lg:grid-cols-4">
          {loading ? (
            [...Array(4)].map((_, i) => (
              <BookCardSkeleton key={i} />
            ))
          ) : (
            <AnimatePresence>
              {filteredBooks.map((book, i) => (
                <motion.div
                  key={book.book_id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                >
                  <BookCard book={book} index={i} onComingSoonClick={(url) => openComingSoon({ exploreLink: url })} />
                </motion.div>
              ))}
            </AnimatePresence>
          )}
        </div>

        {/* Empty State */}
        {!loading && (
          <>
            {/* Case 1: Wishlist is totally empty */}
            {(!wishlists?.data || wishlists?.data?.length === 0) && (
              <div className="flex items-center justify-center w-full min-h-[400px]">
                <NoData
                  title="Your wishlist is empty"
                  message="Start saving your favorite books to see them here."
                  icon="heart"
                  showAction={true}
                  actionText="Browse Books"
                  actionLink="/nextChapter/books"
                />
              </div>
            )}

            {/* Case 2: No search results */}
            {wishlists?.data?.length > 0 && filteredBooks.length === 0 && (
              <div className="flex items-center justify-center w-full min-h-[400px]">
                <NoData
                  title="No results found"
                  message={`No books in your wishlist match "${searchTerm}"`}
                  icon="search"
                  showAction={true}
                  actionText="Clear Search"
                  onActionClick={() => setSearchTerm("")}
                />
              </div>
            )}
          </>
        )}
      </div>
    </motion.div>
  );
};

export default Wishlist;
