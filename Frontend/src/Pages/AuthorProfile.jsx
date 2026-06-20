import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Navigation, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import SwiperNavButtons from "../components/Buttons/SwiperNavButtons";
import { motion, AnimatePresence } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllBooks } from "../store/Redux/Slices/BooksSlice";
import BookCard from "../components/Cards/BookCard";
import AnimatedItemCount from "../components/UI/AnimatedItemCount";
import FloatingReaction from "../components/UI/FloatingReaction";
import {
  BookSvg,
  DecorativeHeader,
} from "../components/SVGs/SVGs";
import { GiBookPile } from "react-icons/gi";
import {
  FaArrowLeft,
  FaBookOpen,
  FaStar,
  FaUsers,
  FaFeatherAlt,
  FaRegCalendarAlt,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaMapMarkerAlt,
  FaGlobe,
  FaSearch,
  FaTag,
  FaPaperPlane,
  FaTimes,
  FaQuoteRight,
} from "react-icons/fa";
import { HiOutlineBookOpen, HiOutlinePencilAlt } from "react-icons/hi";
import useAuth from "../Hooks/useAuth";
import PostCard from "../components/Cards/PostCard";
import Search from "../components/SearchBars/Search";
import NoData from "../components/EmptyData/noData";
import Button from "../components/Buttons/Button";
import { toast } from "sonner";
import Input from "../components/Inputs/Input";
import FollowersModal from "../components/Modal/FollowersModal";
import SubscribePromptModal from "../components/Modal/SubscribePromptModal";
import MobileSubscribeModal from "../components/Modal/MobileSubscribeModal";
import { UserGroupIcon } from "@heroicons/react/24/outline";
import { useImagePreview } from "../store/Context/ImagePreviewContext";
import { useComingSoon } from "../store/Context/ComingSoonContext";
import Ratings from "../components/RatingsReviews/Ratings";
import TestimonialCard from "../components/Cards/TestimonialCard";
import AppImage from "../components/Common/AppImage";
const initialPosts = [
  {
    id: 1,
    title: "The Art of World-Building in Modern Fiction",
    excerpt:
      "Creating a believable world from scratch is one of the most rewarding — and challenging — aspects of writing fiction. In this post, I explore the techniques I use to build settings that feel as real as the world outside your window.",
    date: "2024-03-15",
    readTime: "8 min read",
    tag: "Writing Tips",
    image:
      "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=600&auto=format&fit=crop",
    reactions: { love: 42, like: 5, hot: 18, insightful: 31 },
    comments: [
      {
        id: 1,
        user: "Rohan Gupta",
        avatar: "https://randomuser.me/api/portraits/men/68.jpg",
        text: "Absolutely loved this breakdown. World-building is always my weak point!",
        date: "2024-03-17",
      },
      {
        id: 2,
        user: "Priya Patel",
        avatar: "https://randomuser.me/api/portraits/women/32.jpg",
        text: "The point about internal logic really clicked for me. Thanks!",
        date: "2024-03-18",
      },
    ],
  },
  {
    id: 2,
    title: "Why I Believe Every Story Needs a Flawed Hero",
    excerpt:
      "Perfect heroes are boring. They have no room to grow, no internal conflict to resolve. The most memorable characters carry wounds that shape their every decision — and that's what keeps readers turning pages.",
    date: "2024-02-28",
    readTime: "6 min read",
    tag: "Storytelling",
    image:
      "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=600&auto=format&fit=crop",
    reactions: { love: 89, like: 3, hot: 12, insightful: 67 },
    comments: [
      {
        id: 1,
        user: "Alex Johnson",
        avatar: "https://randomuser.me/api/portraits/men/32.jpg",
        text: "This resonated so much. Flawed characters are so much more relatable.",
        date: "2024-03-01",
      },
    ],
  },
  {
    id: 3,
    title: "My Writing Routine: From Dawn to Deadline",
    excerpt:
      "People always ask me how I manage to write a book each year while also blogging, speaking, and raising kids. The answer is: ruthlessly structured mornings and the discipline to protect creative time at all costs.",
    date: "2024-01-10",
    readTime: "5 min read",
    tag: "Author Life",
    image:
      "https://images.unsplash.com/photo-1506880018603-83d5b814b5a6?w=600&auto=format&fit=crop",
    reactions: { love: 54, like: 22, hot: 8, insightful: 45 },
    comments: [],
  },
  {
    id: 4,
    title: "Research vs. Imagination: Where's the Balance?",
    excerpt:
      "One of the great debates among authors is how much research is too much. Should you spend years studying a period before writing about it, or let imagination lead and fact-check later? Here's my take after 10 years.",
    date: "2023-12-05",
    readTime: "7 min read",
    tag: "Process",
    image:
      "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=600&auto=format&fit=crop",
    reactions: { love: 37, like: 2, hot: 29, insightful: 41 },
    comments: [
      {
        id: 1,
        user: "Emma Wilson",
        avatar: "https://randomuser.me/api/portraits/women/28.jpg",
        text: "I always over-research and it kills my momentum. Great advice here!",
        date: "2023-12-10",
      },
      {
        id: 2,
        user: "David Chen",
        avatar: "https://randomuser.me/api/portraits/men/67.jpg",
        text: "Research is my excuse to procrastinate — working on fixing that.",
        date: "2023-12-12",
      },
    ],
  },
];



const testimonials = [
  {
    id: 1,
    user: "Sarah Jenkins",
    avatar: "https://randomuser.me/api/portraits/women/45.jpg",
    text: "Absolutely phenomenal writing! Every book by this author keeps me on the edge of my seat. Highly recommended for anyone who loves deep character development.",
    rating: 5,
    date: "2 months ago",
  },
  {
    id: 2,
    user: "Michael Chen",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    text: "I've read almost all of their work. The world-building is just breathtaking, though sometimes the pacing in the middle of the books can be a bit slow.",
    rating: 4,
    date: "3 months ago",
  },
  {
    id: 3,
    user: "Emily Carter",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    text: "A true master of storytelling. I find myself rereading their novels just to catch the subtle foreshadowing I missed the first time.",
    rating: 5,
    date: "4 months ago",
  },
];



const AuthorProfile = () => {
  const { authorId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState("books");
  const [postSearchTerm, setPostSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [isFollowing, setIsFollowing] = useState(false);
  const [showFollowersPopup, setShowFollowersPopup] = useState(false);
  const [showSubscribePrompt, setShowSubscribePrompt] = useState(false);
  const [isBlinkingTestimonials, setIsBlinkingTestimonials] = useState(false);
  const [hasScrolledForRating, setHasScrolledForRating] = useState(false);
  const [showMobileSubscribePopup, setShowMobileSubscribePopup] = useState(false);
  const [mockFollowers, setMockFollowers] = useState([
    { id: 101, name: "Alice Johnson", avatar: "https://randomuser.me/api/portraits/women/44.jpg", bio: "Hi I am Alice", role: "Patron" },
    { id: 102, name: "David Smith", avatar: "https://randomuser.me/api/portraits/men/32.jpg", bio: "Hi I am David", role: "Author", certified: true },
    { id: 103, name: "Emma Watson", avatar: "https://randomuser.me/api/portraits/women/68.jpg", bio: "Hi I am Emma", role: "Patron" },
    { id: 109, name: "emma", avatar: "https://randomuser.me/api/portraits/women/68.jpg", bio: "Hi I am Emma", role: "Patron" },
    { id: 110, name: "emma", avatar: "https://randomuser.me/api/portraits/women/68.jpg", bio: "Hi I am Emma", role: "Patron" },
    { id: 111, name: "emma", avatar: "https://randomuser.me/api/portraits/women/68.jpg", bio: "Hi I am Emma", role: "Patron" }
  ]);
  const { userData, isAuthenticated } = useAuth();
  const { books: allBooks, loading } = useSelector((state) => state.books);
  const [subscribeEmail, setSubscribeEmail] = useState("");
  const { openComingSoon } = useComingSoon();
  const testimonialsSwiperRef = useRef(null);

  const uniqueAuthors = React.useMemo(() => {
    const authors = [];
    const seen = new Set();
    allBooks.forEach((book) => {
      const id = book?.author?.author_id;
      if (id && id.toString() !== authorId.toString() && !seen.has(id)) {
        seen.add(id);
        authors.push(book.author);
      }
    });
    return authors;
  }, [allBooks, authorId]);
  const handleFollowToggle = () => {
    if (!isAuthenticated) {
      toast.error("Authentication Required", {
        description: "Please login to follow this author",
      });
      return;
    }
    setIsFollowing(!isFollowing);
    if (!isFollowing) {
      setMockFollowers(prev => [
        { id: userData?.userId || 999, name: userData?.name || "You (Visitor)", avatar: userData?.profilePic || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" },
        ...prev
      ]);
    } else {
      setMockFollowers(prev => prev.filter(f => f.id !== (userData?.userId || 999)));
    }
  };

  const handleSubscribe = () => {


    if (!subscribeEmail) {
      toast.error("Please enter your email address");
      return;
    }

    if (!isFollowing) {
      setShowSubscribePrompt(true);
    } else {
      toast.success("Subscribed successfully!");
      setSubscribeEmail("");
    }
  };

  const handleSubscribePromptFollow = () => {
    // Only toggling state manually here to prevent double toggling issues if they are not following.
    setIsFollowing(true);
    setMockFollowers(prev => [
      { id: userData?.userId || 999, name: userData?.name || "You (Visitor)", avatar: userData?.profilePic || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" },
      ...prev
    ]);
    setShowSubscribePrompt(false);
    toast.success("Subscribed and followed successfully!");
    setSubscribeEmail("");
  };

  useEffect(() => {
    if (!allBooks || allBooks.length === 0) {
      dispatch(fetchAllBooks());
    }
  }, [dispatch, allBooks]);

  const id = parseInt(authorId);
  const authorBooks = allBooks.filter((b) => b?.author?.author_id === id);
  const author = authorBooks.length > 0 ? authorBooks[0]?.author : null;
  const { openPreview } = useImagePreview();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-pulse text-2xl text-coffee">Loading...</div>
      </div>
    );
  }

  if (!loading && !author) {
    return (
      <div className="flex flex-col items-center justify-center h-screen gap-4">
        <NoData
          title="Author not found"
          message="The author you are looking for does not exist."
          showAction={true}
          actionText="Go Back"
          onActionClick={() => navigate(-1)}
          customIcon={<UserGroupIcon className="!w-12" />}
        />

      </div>
    );
  }

  const tabs = [
    { id: "books", label: "Books", icon: <HiOutlineBookOpen /> },
    { id: "posts", label: "Posts & Blogs", icon: <HiOutlinePencilAlt /> },
  ];

  const stats = [
    {
      icon: <FaBookOpen />,
      value: authorBooks.length,
      label: "Books Published",
      isClickable: true,
      onClick: () => {
        setActiveTab("books");
        document.getElementById("tabs-section")?.scrollIntoView({ behavior: "smooth", block: "start" });
      },
    },
    {
      icon: <FaStar />,
      value: author?.author_rating || "4.5",
      label: "Avg Rating",
      isClickable: true,
      onClick: () => {
        let count = 0;
        const interval = setInterval(() => {
          setIsBlinkingTestimonials((prev) => !prev);
          count++;
          if (count > 3) {
            clearInterval(interval);
            setIsBlinkingTestimonials(false);
          }
        }, 200);

        if (!hasScrolledForRating) {
          window.scrollBy({ top: 100, behavior: 'smooth' });
          setHasScrolledForRating(true);
        }
      },
    },
    {
      icon: <FaUsers />,
      value: (() => {
        const base = author?.followers_count || 12400;
        const total = base + (isFollowing ? 1 : 0);
        if (total < 1000) return total.toString();
        return (total / 1000).toFixed(1).replace(/\.0$/, "") + "K";
      })(),
      label: "Followers",
      isClickable: true,
      onClick: () => setShowFollowersPopup(true),
    },
    {
      icon: <FaFeatherAlt />,
      value: initialPosts.length,
      label: "Blog Posts",
      isClickable: true,
      onClick: () => {
        setActiveTab("posts");
        document.getElementById("tabs-section")?.scrollIntoView({ behavior: "smooth", block: "start" });
      },
    },
  ];

  const genres = ["Science Fiction", "Fantasy", "Tech Thriller"];
  const memberSince = "March 2021";
  const location = "New Delhi, India";
  const website = "www.authorpage.com";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-tan"
    >
      <div className="relative w-full p-2">
        <div className="w-full h-56 md:h-96 overflow-hidden rounded-3xl shadow-2xl relative">
          <AppImage
            src="/images/author_banner.png"
            className="w-full h-full"
            imgClassName="object-cover"
            alt="Author Banner"
            fallbackType="default"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-coffee/40 via-transparent to-coffee/40"></div>
        </div>

        {/* Back btn */}
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className="absolute z-10 flex bg-tan/30 backdrop-blur-sm items-center gap-2 text-sm transition-colors top-4 left-5 text-tan hover:!text-tan hover:!bg-tan/10 !p-2"
        >
          <FaArrowLeft />
          <span>Back</span>
        </Button>


      </div>

      <div className="container px-4 mx-auto">
        <div className="relative -mt-10 md:-mt-14">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.15 }}
            className="relative px-5 pt-16 pb-12 bg-coffee border border-tan/10 shadow-2xl rounded-3xl md:pt-6"
          >
            <div
              className="absolute inset-0 bg-[url('/images/bgDesign.jpg')] bg-cover bg-center opacity-10 pointer-events-none"
            />
            <div className="relative z-10">


              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 18 }}
                className="absolute left-0 right-0 z-10 mx-auto overflow-hidden border-4 border-tan shadow-2xl -top-28 md:-top-30 w-28 md:w-40 h-28 md:h-40 rounded-3xl cursor-zoom-in"
                onClick={() => openPreview(author?.author_image || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png", author?.author_name)}
              >
                <AppImage
                  src={
                    author?.author_image ||
                    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                  }
                  alt={author?.author_name}
                  imgClassName="object-cover"
                  className="object-cover object-top w-full h-full"
                  fallbackType="author"
                  name={author?.author_name}
                />
              </motion.div>



              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div className="text-center sm:text-left">
                  <h1 className="text-3xl md:text-4xl font-bold text-tan">
                    {author?.author_name}
                  </h1>
                  <p className="text-base text-tan/60 mt-0.5 font-medium">
                    Professional Author &amp; Storyteller
                  </p>

                  <div className="flex flex-wrap justify-center mt-2 sm:justify-start gap-x-4 gap-y-1">
                    <span className="flex items-center gap-1 text-sm text-tan">
                      <FaMapMarkerAlt className="text-tan" /> {location}
                    </span>
                    <span className="flex items-center gap-1 text-sm text-tan">
                      <FaGlobe className="text-tan" /> {website}
                    </span>
                    <span className="flex items-center gap-1 text-sm text-tan">
                      <FaRegCalendarAlt className="text-tan" /> Member since{" "}
                      {memberSince}
                    </span>
                  </div>

                  <div className="flex flex-wrap justify-center sm:justify-start gap-1.5 mt-3">
                    {genres.map((g) => (
                      <span
                        key={g}
                        className="text-xs px-2.5 py-0.5 rounded-full bg-tan/20 text-tan font-medium border border-tan/20"
                      >
                        {g}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Social links */}
                <div className=" md:py-0 sm:absolute flex justify-center z-10 flex gap-3 -top-3 -right-3">
                  {[FaTwitter, FaInstagram, FaLinkedin].map((Icon, i) => (
                    <Button
                      variant="ghost"
                      key={i}
                      className="flex bg-tan/30 backdrop-blur-sm items-center justify-center text-tan transition-all duration-200 rounded-full !w-10 !h-10 !p-0 bg-tan/25 hover:scale-110"
                    >
                      <Icon size={20} />
                    </Button>
                  ))}
                </div>

                <Button
                  onClick={handleFollowToggle}
                  variant={isFollowing ? "outline" : "primary"}
                  className={`self-center mt-5 sm:mt-10 sm:self-start tanspace-nowrap`}
                >
                  {isFollowing ? "Following" : "Follow"}
                </Button>
              </div>

              <p className="mt-4 text-wrap text-tan text-base leading-relaxed border-t-[3px] border-divider border-tan/50 pt-3 text-center  sm:text-left">
                {author?.author_description ||
                  "A passionate writer who breathes life into words and creates unforgettable stories that transcend time and culture."}{" "}
                With over a decade of experience, this author has captivated
                millions of readers worldwide and continues to push the boundaries
                of storytelling.
              </p>

              <div className="mt-5 pt-4 border-t border-tan/10">
                <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-y sm:divide-y-0 divide-tan/10 rounded-2xl overflow-hidden border border-tan/10 bg-tan/5 shadow-inner">
                  {stats.map((stat, i) => (
                    <motion.div
                      key={i}
                      onClick={stat.onClick ? stat.onClick : undefined}
                      whileHover={{
                        scale: 1.03,
                        backgroundColor: "rgba(255,255,255,0.05)",
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 100,
                      }}
                      className={`flex flex-col items-center justify-center gap-1.5 py-5 px-3 group ${stat.isClickable ? "cursor-pointer" : "cursor-default"}`}
                    >
                      <div className="w-16 h-16 mb-1 rounded-2xl bg-gradient-to-br from-coffee via-coffee/90 to-sepia/30 border border-tan/20 flex items-center justify-center text-tan text-3xl shadow-lg group-hover:shadow-[0_0_15px_rgba(210,180,140,0.3)] group-hover:scale-110 transition-all duration-300">
                        {stat.icon}
                      </div>
                      <span className="text-2xl font-black leading-none tracking-tight text-tan">
                        {stat.value}
                      </span>
                      <span className="text-[14px] font-semibold uppercase tracking-widest text-center leading-tight text-tan/50">
                        {stat.label}
                      </span>
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: "2rem" }}
                        transition={{ delay: i * 0.1 + 0.3, duration: 0.5 }}
                        className="h-0.5 rounded-full bg-gradient-to-r from-tan to-coffee"
                      />
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* ── Testimonials Section ── */}
        <motion.div
          id="testimonials-section"
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          className="mt-12 mb-4 bg-coffee p-6 rounded-3xl border border-tan/10 shadow-xl relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-[url('/images/bgDesign.jpg')] bg-cover bg-center opacity-5 pointer-events-none" />
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-6">
              <h2 className={`text-2xl font-bold text-tan flex items-center gap-2 transition-opacity duration-150 ${isBlinkingTestimonials ? "opacity-30" : "opacity-100"
                }`}>
                <FaStar className="text-tan/60" /> Reader <span className="text-tan/60">Testimonials</span>
              </h2>
              <div className="flex flex-col items-end">
                <div className="flex items-center gap-1 mb-1">
                  <Ratings ratings={parseFloat(author?.author_rating) || 4.5} textColor="text-orange" />
                </div>
                <span className="text-xs font-semibold text-tan/60 tracking-wider uppercase">{testimonials.length} reviews</span>
              </div>
            </div>

            <div className="relative w-full mt-4">
              <SwiperNavButtons
                swiperRef={testimonialsSwiperRef}
                position={{ top: "50%" }}
                prevButtonclassName="-left-2 md:-left-6 lg:-left-10"
                nextButtonclassName="-right-2 md:-right-6 lg:-right-10"
              />
              <Swiper
                modules={[Navigation, Autoplay]}
                autoplay={{
                  delay: 4000,
                  disableOnInteraction: false,
                }}
                spaceBetween={24}
                onSwiper={(swiper) => {
                  testimonialsSwiperRef.current = swiper;
                }}
                breakpoints={{
                  320: { slidesPerView: 1, spaceBetween: 16 },
                  640: { slidesPerView: 2, spaceBetween: 20 },
                  1024: { slidesPerView: 3, spaceBetween: 24 },
                }}
                className="!pb-8 !px-4"
              >
                {testimonials.map((review, i) => (
                  <SwiperSlide key={review.id} className="h-auto">
                    <div className="h-full flex">
                      <TestimonialCard
                        data={{
                          ...review,
                          name: review.user,
                          profile: review.avatar,
                          review: review.text,
                        }}
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </motion.div>

        {/* ── Tabs ── */}
        <motion.div
          id="tabs-section"
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex gap-2 mt-8 bg-coffee p-1.5 rounded-2xl shadow-sm w-fit border border-coffee/20 backdrop-blur-sm"
        >
          {tabs.map((tab) => (
            <Button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              variant={activeTab === tab.id ? "primary" : "ghost"}
              className={`relative flex items-center gap-2 !px-5 !py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 shadow-none hover:scale-100 ${activeTab === tab.id
                ? "bg-gradient-to-r from-sepia to-sepia/80 !text-tan shadow-md !scale-100 border border-tan/20"
                : "text-tan/50 hover:!text-tan bg-transparent border-2 border-tan/50 hover:!bg-tan/10"
                }`}
            >
              <span className="text-base">{tab.icon}</span>
              {tab.label}
            </Button>
          ))}
        </motion.div>

        {/* ── Tab Content ── */}
        <AnimatePresence mode="wait">
          {activeTab === "books" ? (
            <motion.div
              key="books"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="pb-16 mt-6"
            >
              {authorBooks.length > 0 ? (
                <>
                  <div className="flex items-center justify-between mb-5">
                    <h2 className="text-xl font-bold text-coffee">
                      All Books by{" "}
                      <span className="text-tan">
                        {author?.author_name}
                      </span>
                    </h2>
                    <AnimatedItemCount
                      count={authorBooks.length}
                      label="book"
                      suffix="published"
                      delay={0.2}
                      Icon={GiBookPile}
                    />
                  </div>
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {authorBooks.map((book, i) => (
                      <motion.div
                        key={book.book_id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.07 }}
                      >
                        <BookCard book={book} index={i} onComingSoonClick={(url) => openComingSoon({ exploreLink: url })} />
                      </motion.div>
                    ))}
                  </div>
                </>
              ) : (
                <div className="flex justify-center w-full py-16">
                  <NoData
                    title="No Books Found"
                    message="This author hasn't published any books yet."
                    icon="search"
                  />
                </div>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="posts"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="pb-16 mt-6"
            >
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-xl font-bold text-coffee">
                  Posts &amp;{" "}
                  <span className="text-sepia">Blog Articles</span>
                </h2>

                <AnimatedItemCount
                  count={initialPosts.length}
                  label="article"
                  suffix="published"
                  delay={0.2}
                  Icon={GiBookPile}
                />
              </div>

              <div className="flex flex-col lg:flex-row xl:flex-row gap-16 items-start">
                {/* Left Sidebar */}
                <div className="w-full flex-1 flex-shrink-0 flex flex-col gap-5 lg:sticky top-24">
                  {/* Mobile Subscribe Button */}
                  <Button
                    onClick={() => setShowMobileSubscribePopup(true)}
                    className="lg:hidden w-full flex items-center justify-center gap-3 bg-gradient-to-r from-coffee  !text-tan !font-bold !py-3 rounded-2xl shadow-md hover:opacity-90 transition-opacity"
                  >
                    <FaPaperPlane />
                    Subscribe to Blog
                  </Button>

                  {/* Search Box */}
                  <div className="bg-gradient-to-br from-coffee to-sepia/100 p-5 rounded-2xl shadow-lg relative overflow-hidden border border-tan/10">
                    <div
                      className="absolute inset-0 bg-[url('/images/bgDesign.jpg')] bg-cover bg-center opacity-10 pointer-events-none"
                    />
                    <div className="relative z-10">
                      <h3 className="text-tan font-bold mb-3 flex items-center gap-2">
                        <FaSearch className="text-tan" /> Search Articles
                      </h3>
                      <Search
                        styling="w-full"
                        placeholder="Search articles..."
                        onChange={(val) => setPostSearchTerm(val)}
                        onSearch={(val) => setPostSearchTerm(val)}
                      />
                    </div>
                  </div>

                  {/* Categories */}
                  <div className="bg-gradient-to-br from-coffee to-sepia/100 p-5 rounded-2xl shadow-sm relative overflow-hidden border border-tan/10">
                    <div
                      className="absolute inset-0 bg-[url('/images/bgDesign.jpg')] bg-cover bg-center opacity-10 pointer-events-none"
                    />
                    <div className="relative z-10">
                      <h3 className="text-tan font-bold mb-4 flex items-center gap-2">
                        <FaTag className="text-tan" /> Search by Categories
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {["Writing Tips", "Storytelling", "Author Life", "Process"].map(
                          (tag) => {
                            const isSelected = selectedCategories.includes(tag);
                            return (
                              <span
                                key={tag}
                                onClick={() => {
                                  setSelectedCategories((prev) =>
                                    prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
                                  );
                                }}
                                className={`px-3 py-1.5 text-xs font-semibold rounded-lg border border-tan/50 cursor-pointer transition-colors flex items-center gap-1.5 ${isSelected
                                  ? "bg-coffee text-tan font-semibold border-coffee"
                                  : "bg-cream-light text-tan border-divider hover:border-coffee hover:bg-coffee hover:text-tan"
                                  }`}
                              >
                                {tag}
                                {isSelected && <span className="text-[15px] leading-none">&times;</span>}
                              </span>
                            );
                          }
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Newsletter */}
                  <div className="hidden lg:block bg-gradient-to-br from-coffee to-sepia/100 p-6 rounded-2xl shadow-md text-tan text-center relative overflow-hidden border border-tan/10">
                    <div
                      className="absolute inset-0 bg-[url('/images/bgDesign.jpg')] bg-cover bg-center opacity-10 pointer-events-none"
                    />
                    <div className="relative z-10">
                      <FaPaperPlane
                        className="mx-auto mb-3 text-tan/80"
                        size={24}
                      />
                      <h3 className="font-bold text-lg mb-2">Subscribe to Blog</h3>
                      <p className="text-xs text-tan/70 mb-5 leading-relaxed">
                        Get notified from <b>{author?.author_name}</b>  when new articles are published!
                      </p>
                      <Input
                        type="email"
                        required
                        label="Email"
                        labelclassname="text-tan"
                        placeholder="Your email address"
                        value={subscribeEmail}
                        onChange={(e) => setSubscribeEmail(e.target.value)}
                        className="!rounded-full"

                      />
                      <Button
                        onClick={handleSubscribe}
                        variant="ghost"
                        className="w-full bg-coffee border-2 border-tan text-tan !font-bold !text-sm !py-2.5 !rounded-full flex gap-3 justify-center items-center  hover:!bg-cream-light transition-colors shadow-sm"
                      >
                        Subscribe <FaPaperPlane
                          className="text-tan/80"
                          size={16}
                        />
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Main Content (Posts) */}
                <div className="flex-1   w-full flex max-w-full mx-auto flex-col gap-6">
                  {(() => {
                    const filteredPosts = initialPosts.filter((post) => {
                      const matchesSearch =
                        post.title.toLowerCase().includes(postSearchTerm.toLowerCase()) ||
                        post.excerpt.toLowerCase().includes(postSearchTerm.toLowerCase()) ||
                        post.tag.toLowerCase().includes(postSearchTerm.toLowerCase());
                      const matchesCategory =
                        selectedCategories.length === 0 || selectedCategories.includes(post.tag);
                      return matchesSearch && matchesCategory;
                    });

                    return (
                      <>
                        {filteredPosts.map((post, i) => (
                          <PostCard key={post.id} post={post} index={i} author={author} />
                        ))}
                        {filteredPosts.length === 0 && (
                          <div className="text-center py-12 text-coffee/60">
                            <NoData
                              title={
                                selectedCategories.length > 0 && !postSearchTerm
                                  ? "No articles found in selected categories"
                                  : `No articles found matching "${postSearchTerm}"`
                              }
                              message="Try adjusting your search terms or selecting different categories."
                              icon={"search"}
                            />
                          </div>
                        )}
                      </>
                    );
                  })()}
                </div>

                {/* Right Sidebar: More profiles */}
                <div className="hidden xl:flex flex-1 flex-shrink-0 flex-col gap-6 sticky top-24">
                  <div className="bg-coffee border border-tan/10 p-6 rounded-3xl shadow-xl relative overflow-hidden">
                    <div
                      className="absolute inset-0 bg-[url('/images/bgDesign.jpg')] bg-cover bg-center opacity-10 pointer-events-none"
                    />
                    <div className="relative z-10">
                      <h3 className="text-tan font-bold mb-5 flex items-center gap-2 text-lg">
                        <FaUsers className="text-sepia text-3xl" /> Profiles for you
                      </h3>
                      <div className="flex flex-col gap-5">
                        {uniqueAuthors.slice(0, 3).map((uAuthor, idx) => (
                          <div
                            key={idx}
                            className="flex flex-col gap-3 p-4 rounded-2xl bg-tan/5 border border-tan/10 hover:bg-tan/10 transition-all duration-300 group cursor-pointer"
                            onClick={() => navigate(`/nextChapter/author/${uAuthor.author_id}`)}
                          >
                            <div className="flex items-center gap-3">
                              <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-tan/30 flex-shrink-0">
                                <AppImage
                                  src={uAuthor.author_image}
                                  alt={uAuthor.author_name}
                                  className="w-full h-full object-cover"
                                  fallbackType="author"
                                  name={uAuthor.author_name}
                                />
                              </div>
                              <div className="flex-1 min-w-0">
                                <h4 className="text-tan font-bold text-sm truncate group-hover:text-cream transition-colors">
                                  {uAuthor.author_name}
                                </h4>
                                <div className="flex items-center gap-1 text-tan/80 text-[10px]">
                                  <FaStar className="text-tan" /> {uAuthor.author_rating}
                                </div>
                              </div>
                            </div>
                            <p className="text-[11px] text-tan/90 line-clamp-2 leading-relaxed">
                              {uAuthor.author_description ||
                                "A talented writer exploring new horizons in contemporary literature."}
                            </p>
                            <div className="flex gap-4 items-center">
                              <Button
                                variant="primary"
                                className="!py-1.5 !text-[10px] !rounded-lg flex-1 !bg-tan/10 !border-tan/20 hover:!bg-sepia hover:!text-tan transition-all"
                              >
                                Follow
                              </Button>
                              <Button
                                variant="primary"
                                className="!py-1 !px-2 !text-[10px] !rounded-lg flex-1 hover:!bg-sepia/90 transition-all"
                              >
                                View Profile
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                      <Button
                        variant="ghost"
                        className="w-full mt-4 !text-tan/60 hover:!text-tan text-xs"
                        onClick={() => navigate("/nextChapter/authors")}
                      >
                        Show more authors
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Modals */}
      <FollowersModal
        isOpen={showFollowersPopup}
        onClose={() => setShowFollowersPopup(false)}
        followers={mockFollowers}
      />

      <SubscribePromptModal
        isOpen={showSubscribePrompt}
        onClose={() => {
          setShowSubscribePrompt(false);
          toast.success("Subscribed successfully!");
        }}
        onFollow={handleSubscribePromptFollow}
        author={author}
        followersCount={stats.find(s => s.label === "Followers")?.value}
      />

      <MobileSubscribeModal
        isOpen={showMobileSubscribePopup}
        onClose={() => setShowMobileSubscribePopup(false)}
        subscribeEmail={subscribeEmail}
        setSubscribeEmail={setSubscribeEmail}
        handleSubscribe={handleSubscribe}
      />
    </motion.div >
  );
};

export default AuthorProfile;


