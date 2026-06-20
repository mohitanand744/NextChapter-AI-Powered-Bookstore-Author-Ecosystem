import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllBooks } from "../store/Redux/Slices/BooksSlice";
import { useNavigate } from "react-router-dom";
import { MdOutlineMail } from "react-icons/md";
import { RiLogoutCircleLine } from "react-icons/ri";
import {
  FaHeart,
  FaHistory,
  FaRegAddressCard,
  FaRegHeart,
  FaShoppingBag,
} from "react-icons/fa";
import { FiPhone } from "react-icons/fi";

import ScrollBooks from "../components/ScrollingContainer/ScrollBooks";
import { toast } from "sonner";
import Button from "../components/Buttons/Button";
import {
  BagSvg,
  CalendarSvg,
  CopyIcon,
  DecorativeHeader,
  EyesSvg,
  HearthSvg,
} from "../components/SVGs/SVGs";
import useAuth from "../Hooks/useAuth";
import NoData from "../components/EmptyData/noData";
import AddressModal from "../components/Modal/AddressModal";
import UserProfileSkeleton from "../components/Loaders/Skeleton/UserProfileSkeleton";
import { userApis } from "../utils/apis/userApis";
import { useProfileImage } from "../store/Context/ProfileImageContext";
import BooksLoader from "../components/Loaders/BooksLoader";
import { useImagePreview } from "../store/Context/ImagePreviewContext";
import ProfileUpdateModal from "../components/Modal/ProfileUpdateModal";
import Modal from "../components/Modal/ModalContainer";
import { useComingSoon } from "../store/Context/ComingSoonContext";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, FreeMode } from "swiper/modules";
import "swiper/css";
import SwiperNavButtons from "../components/Buttons/SwiperNavButtons";
import { EllipsisHorizontalIcon } from "@heroicons/react/24/outline";
import SectionHeading from "../components/Headings/SectionHeading";
import AppImage from "../components/Common/AppImage";
import Badge from "../components/Common/Badge";
const UserProfile = () => {
  const [activeTab, setActiveTab] = useState("activity");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { openComingSoon } = useComingSoon();
  const { books } = useSelector((state) => state.books);

  useEffect(() => {
    if (books?.length === 0) {
      dispatch(fetchAllBooks());
    }
  }, [dispatch, books]);

  const removeDuplicates = (booksArray) => {
    const uniqueBooks = [];
    const seen = new Set();
    for (const book of booksArray) {
      const uniqueKey = book.title;
      if (!seen.has(uniqueKey)) {
        seen.add(uniqueKey);
        uniqueBooks.push(book);
      }
    }
    return uniqueBooks;
  };

  const uniqueBooks = books ? removeDuplicates(books) : [];

  const [dbStates, setDbStates] = useState([]);
  const {
    logoutStatusSuccess,
    userData,
    setUpdateUserData,
    getUserUpdatedDetails,
    loading,
  } = useAuth();
  const [user, setUser] = useState(userData);
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [showProfileUpdateModal, setShowProfileUpdateModal] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const { openPreview } = useImagePreview();
  const fileInputRef = useRef(null);
  const { preview, setPreview, isUploading, setIsUploading } = useProfileImage();
  const [defaultAddress, setDefaultAddress] = useState("No Address Selected");

  const uploadProfilePic = async (file) => {
    setIsUploading(true);
    const formData = new FormData();
    formData.append("profilePic", file);
    try {
      const response = await userApis.uploadProfilePic(formData);
      if (response.success) {
        toast.success(response.message || "Profile picture uploaded");
        setUser((prev) => ({ ...prev, profilePic: response.profilePic }));
        setUpdateUserData({ ...userData, profilePic: response.profilePic });
        setPreview(response.data.profilePic);
        setIsUploading(false);
      }
    } catch (error) {
      console.error("Upload error:", error);
      if (error.response?.status !== 401) {
        toast.error(
          error.response?.data?.message || "Failed to upload profile picture",
        );
      }
      setPreview(user.profilePic);
      setIsUploading(false);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please upload a valid image file");
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      toast.error("Image size must be under 2MB");
      return;
    }

    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);

    uploadProfilePic(file);
  };

  console.log(userData);

  useEffect(() => {
    if (userData) {
      setUser(userData);

      if (userData.profilePic) {
        setPreview(userData.profilePic);
      }
    }
  }, [userData]);

  useEffect(() => {
    if (showAddressModal === false) {
      getUserUpdatedDetails();
    }
  }, [showAddressModal, showProfileUpdateModal]);

  useEffect(() => {
    setDefaultAddress(
      userData?.default_address?.address
        ? `${userData?.default_address?.address?.slice(0, 60)}..., ${userData?.default_address?.city}, ${userData?.default_address?.state}, ${userData?.default_address?.pinCode}`
        : "No Address Selected",
    );
  }, [userData?.default_address?.address]);

  const navigateToOrders = () => {
    openComingSoon({ exploreLink: "/nextChapter/orders" });
  };

  const navigateToWishlist = () => {
    navigate("/nextChapter/wishlist");
  };

  const handleLogout = () => {
    setShowLogoutModal(true);
  };

  const handleConfirmLogout = async () => {
    setShowLogoutModal(false);
    navigate("/nextChapter");

    setTimeout(() => {
      logoutStatusSuccess();
    }, 400);
  };

  console.log("UserData", loading, userData);

  if (loading || !userData) {
    return <UserProfileSkeleton />;
  }

  return (
    <div className="relative min-h-screen px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        className="container mx-auto"
      >
        {/* Header */}
        <div className="flex flex-col items-start justify-between mb-8 md:flex-row md:items-center">
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="flex-1 w-full max-w-[400px] mb-4 md:mb-0"
          >
            <SectionHeading align="left" className="!py-0 ">
              My Profile
            </SectionHeading>
          </motion.div>
          <div className="flex flex-wrap justify-center gap-3 sm:justify-start">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={navigateToOrders}
            >
              <Button className="flex !border-none items-center gap-1 px-4 py-2 rounded-lg shadow-md text-nowrap bg-coffee">
                <BagSvg />
                My Orders
              </Button>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={navigateToWishlist}
            >
              <Button className="flex !border-none items-center gap-1 px-4 py-2 rounded-lg shadow-md text-nowrap bg-coffee text-tan">
                <HearthSvg />
                My Wishlist
              </Button>
            </motion.div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex flex-col gap-6 lg:flex-row">
          {/* Profile Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="relative w-full overflow-hidden border shadow-xl lg:w-1/3 bg-coffee text-tan rounded-2xl h-fit border-tan/20"
          >
            <div className="absolute inset-0 bg-[url('/images/bgDesign.jpg')] bg-cover bg-center opacity-10 pointer-events-none" />
            {/* Profile Header with Decorative Elements */}
            <div className="relative z-10">
              <DecorativeHeader />
            </div>

            <div className="flex relative z-10 justify-center mt-[-4.8rem] ">
              <motion.div
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 100 }}
                className="relative w-32 h-32 rounded-full bg-coffee"
              >
                <AppImage
                  src={preview || "/images/loading.gif"}
                  alt="Profile"
                  className="object-cover w-full h-full border-4 rounded-full shadow-lg cursor-pointer border-tan"
                  onClick={() => openPreview(preview, "Profile Image")}
                  fallbackType="avatar"
                  name={user?.name}
                />

                <img
                  onClick={() => fileInputRef.current.click()}
                  className="absolute bottom-0 bg-coffee border-2 border-coffee p-[0.7px] z-30 w-8 h-8 rounded-full cursor-pointer duration-200 active:scale-75 bottom-3 right-0"
                  src="/images/camera.png"
                  alt="Upload"
                />

                {isUploading ? (
                  <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black/40">
                    <BooksLoader imgHeight="16" imgWidth="16" marginTop="0" />
                  </div>
                ) : (
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    hidden
                    onChange={(e) => handleFileChange(e)}
                  />
                )}
              </motion.div>
            </div>
            {/* Profile Content */}
            <div className="relative z-10 px-6 pt-2 pb-6">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="mb-6 text-center"
              >
                <h2 className="text-2xl font-bold capitalize text-cream">
                  {user?.name}
                </h2>
                <p className="flex items-center justify-center gap-1 mt-1 text-cream/90">
                  <CalendarSvg />
                  <b>Member since</b> {user?.joinDate}
                </p>
              </motion.div>

              {/* Profile Details */}
              <div className="space-y-5">
                <ModernProfileDetail
                  icon={<MdOutlineMail className="text-xl text-tan" />}
                  label="Email"
                  value={user?.email}
                  delay={0.4}
                  isCopyable
                />
                <ModernProfileDetail
                  icon={<FiPhone className="text-lg text-tan" />}
                  label="Phone"
                  value={user?.phone || "Not provided"}
                  notProvided={!user?.phone}
                  delay={0.5}
                  isCopyable
                />
                <ModernProfileDetail
                  icon={<FaRegAddressCard className="text-lg text-tan" />}
                  label="Address"
                  value={defaultAddress}
                  notProvided={!user?.default_address?.address}
                  setShowAddressModal={setShowAddressModal}
                  delay={0.6}
                />
                <ModernProfileDetail
                  icon={<FaRegHeart className="text-lg text-tan" />}
                  label="Favorite Genres"
                  value={
                    user?.favoriteGenres?.map((genre) => genre?.name) ||
                    "Select your favorite genres"
                  }
                  notProvided={!user?.favoriteGenres?.length}
                  delay={0.7}
                  setShowProfileUpdateModal={setShowProfileUpdateModal}
                />
              </div>

              <div className="flex items-center w-full gap-4 mt-4">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="flex-1"
                >
                  {/* Edit Button */}
                  <Button
                    className="relative flex items-center justify-center w-full px-4 py-2 rounded-lg shadow-md text-nowrap bg-coffee"
                    type="button"
                    onClick={() => setShowProfileUpdateModal(true)}
                  >
                    {user?.isComplete
                      ? "Update Profile"
                      : "Complete Your Profile"}
                    {!user?.isComplete && (
                      <span className="absolute font-sans top-[-10px] left-[-10px] w-8 h-8 bg-coffee border-2 border-tan rounded-full flex items-center justify-center text-xs">
                        {user?.percentage}%
                      </span>
                    )}
                  </Button>
                </motion.div>

                {/* Logout Button */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="flex-1"
                >
                  <Button
                    onClick={handleLogout}
                    className="flex items-center justify-center w-full gap-1 px-4 py-2 rounded-lg shadow-md text-nowrap bg-red-error/15 hover:bg-red-error/20"
                    type="button"
                  >
                    <RiLogoutCircleLine />
                    Logout
                  </Button>
                </motion.div>
              </div>
            </div>
          </motion.div>
          {/* Right Column */}
          <div className="flex-1 h-full space-y-6">
            {/* Stats Cards */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="grid grid-cols-1 gap-6 md:grid-cols-2"
            >
              <StatCard
                title="Orders"
                value={user?.orders}
                color="bg-coffee"
                text=""
                delay={0.2}
                icon={<BagSvg className="" />}
                onClick={navigateToOrders}
              />
              <StatCard
                title="Wishlist"
                value={user?.wishlist}
                color="bg-coffee"
                text=""
                delay={0.2}
                icon={<HearthSvg className="" />}
                onClick={navigateToWishlist}
              />
            </motion.div>

            {/* Desktop Tabs Navigation */}
            <div className="hidden md:flex border-b-[3px] border-sepia/20">
              <motion.button
                onClick={() => setActiveTab("activity")}
                className={`px-4 py-2 text-nowrap text-[16px] relative ${activeTab === "activity"
                  ? "text-coffee opacity-100 font-bold"
                  : "text-coffee opacity-70 font-medium"
                  }`}
              >
                Recent Activity
                {activeTab === "activity" && (
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-1 rounded-t-full bg-coffee"
                    layoutId="underline"
                  />
                )}
              </motion.button>

              <motion.button
                onClick={() => setActiveTab("orders")}
                className={`px-4 py-2 text-nowrap text-[16px] relative ${activeTab === "orders"
                  ? "text-coffee opacity-100 font-bold"
                  : "text-coffee opacity-70 font-medium"
                  }`}
              >
                Recent Orders
                {activeTab === "orders" && (
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-1 rounded-t-full bg-coffee"
                    layoutId="underline"
                  />
                )}
              </motion.button>

              <motion.button
                onClick={() => setActiveTab("wishlist")}
                className={`px-4 py-2 text-nowrap text-[16px] relative ${activeTab === "wishlist"
                  ? "text-coffee opacity-100 font-bold"
                  : "text-coffee opacity-70 font-medium"
                  }`}
              >
                Wishlist Preview
                {activeTab === "wishlist" && (
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-1 rounded-t-full bg-coffee"
                    layoutId="underline"
                  />
                )}
              </motion.button>
            </div>

            {/* Mobile Bottom Navigation */}
            <div className="relative z-50 flex justify-around py-2 overflow-hidden border bg-coffee text-tan rounded-3xl border-tan/20 md:hidden">
              <div className="absolute inset-0 bg-[url('/images/bgDesign.jpg')] bg-cover bg-center opacity-10 pointer-events-none" />
              <div className="relative z-10 flex justify-around w-full">
                <motion.button
                  onClick={() => setActiveTab("activity")}
                  className={`flex flex-col items-center p-2 w-full relative ${activeTab === "activity"
                    ? "text-tan"
                    : "text-tan opacity-70"
                    }`}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaHistory className="w-5 h-5" />
                  <span className="mt-1 text-xs">Activity</span>
                  {activeTab === "activity" && (
                    <motion.div
                      className="absolute top-0 left-6 right-6 h-0.5 bg-tan"
                      layoutId="mobileUnderline"
                    />
                  )}
                </motion.button>

                <motion.button
                  onClick={() => setActiveTab("orders")}
                  className={`flex flex-col items-center p-2 w-full relative ${activeTab === "orders" ? "text-tan" : "text-tan opacity-70"
                    }`}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaShoppingBag className="w-5 h-5" />
                  <span className="mt-1 text-xs">Orders</span>
                  {activeTab === "orders" && (
                    <motion.div
                      className="absolute top-0 left-0 right-0 h-0.5 bg-tan"
                      layoutId="mobileUnderline"
                    />
                  )}
                </motion.button>

                <motion.button
                  onClick={() => setActiveTab("wishlist")}
                  className={`flex flex-col items-center p-2 w-full relative ${activeTab === "wishlist"
                    ? "text-tan"
                    : "text-tan opacity-70"
                    }`}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaHeart className="w-5 h-5" />
                  <span className="mt-1 text-xs">Wishlist</span>
                  {activeTab === "wishlist" && (
                    <motion.div
                      className="absolute top-0 left-6 right-6 h-0.5 bg-tan"
                      layoutId="mobileUnderline"
                    />
                  )}
                </motion.button>
              </div>
            </div>

            {/* Tab Content */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="relative h-full p-6 overflow-hidden border bg-coffee text-tan rounded-2xl border-tan/10"
            >
              <div className="absolute inset-0 bg-[url('/images/bgDesign.jpg')] bg-cover bg-center opacity-10 pointer-events-none" />
              <div className="relative z-10 h-full">
                {activeTab === "activity" && (
                  <>
                    {user?.recentActivity?.length > 0 ? (
                      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        {user?.recentActivity
                          ?.slice(0, 3)
                          .map((item, index) => (
                            <ActivityItem
                              key={item.id}
                              title={item.title}
                              date={item.date}
                              description={item.description}
                              status={item.status}
                              delay={0.1 * index}
                              imageUrl={item.imageUrl}
                            />
                          ))}
                      </div>
                    ) : (
                      <NoData
                        title="No Activity"
                        message="You have not made any recent activity."
                        icon="search"
                        showAction={true}
                        actionText="Browse Books"
                        actionLink="/nextChapter/books"
                      />
                    )}
                  </>
                )}

                {activeTab === "orders" && (
                  <>
                    {user?.recentOrders?.length > 0 ? (
                      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        {user?.recentOrders?.map((order, index) => (
                          <ActivityItem
                            key={order.id}
                            title={`Order ${order.status}`}
                            date={order.date}
                            description={`${order.title} by ${order.author}`}
                            status={order.status}
                            delay={0.1 * index}
                            imageUrl={order.imageUrl}
                          />
                        ))}
                      </div>
                    ) : (
                      <NoData
                        title="No Orders Found"
                        message="You have not placed any orders yet."
                        icon="cart"
                        showAction={true}
                        actionText="Explore More"
                        actionLink="/nextChapter/books"
                      />
                    )}
                  </>
                )}

                {activeTab === "wishlist" && (
                  <>
                    {user?.wishlistItems?.length > 0 ? (
                      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        {user?.wishlistItems?.map((item, index) => (
                          <ActivityItem
                            key={item.id}
                            title={item.title}
                            date={""}
                            description={`${item.title} by ${item.author}`}
                            status={""}
                            delay={0.1 * index}
                            imageUrl={item.image}
                          />
                        ))}
                      </div>
                    ) : (
                      <div className="flex items-center justify-center">
                        <NoData
                          title="No favorites yet"
                          message="Start adding books to your favorites collection"
                          icon="heart"
                          showAction={true}
                          actionText="Browse Books"
                          actionLink="/nextChapter/books"
                        />
                      </div>
                    )}
                  </>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.1 }}
        className="container pt-4 mt-10 border-t border-tan/10"
      >
        <div className="mb-2">
          <SectionHeading
            align="left"
            subtitle="Handpicked titles based on your recent activity"
          >
            Recommended for You
          </SectionHeading>
        </div>
        <div className="">
          <ScrollBooks autoScroll={false} books={uniqueBooks?.slice(0, 10)} onComingSoonClick={(url) => openComingSoon({ exploreLink: url })} />
        </div>
      </motion.div>

      <AddressModal
        showAddress={showAddressModal}
        setShowAddress={setShowAddressModal}
        setShowProfileUpdateModal={setShowProfileUpdateModal}
        dbStates={dbStates}
        setDbStates={setDbStates}
      />

      <ProfileUpdateModal
        setShowProfileUpdateModal={setShowProfileUpdateModal}
        showProfileUpdateModal={showProfileUpdateModal}
        user={user}
        setShowAddressModal={setShowAddressModal}
        type={user?.isComplete ? "update" : "complete"}
      />

      {/* Logout Confirmation Modal */}
      <Modal isOpen={showLogoutModal} onClose={() => setShowLogoutModal(false)}>
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <div className="p-4 rounded-full ">
              <RiLogoutCircleLine className="text-4xl " />
            </div>
          </div>
          <h2 className="mb-2 text-2xl font-bold text-tan">Confirm Logout</h2>
          <p className="mb-8 text-tan/80">
            Are you sure you want to log out of your account?
          </p>
          <div className="flex gap-4">
            <Button
              onClick={() => setShowLogoutModal(false)}
              variant="outline"
              className="flex-1"
              type="button"
            >
              Back
            </Button>
            <Button
              onClick={handleConfirmLogout}
              className="flex-1 px-4 py-2 bg-red-error/15 hover:!bg-red-error/20 rounded-lg font-medium  transition-colors shadow-md"
              type="button"
            >
              Logout
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

const StatCard = ({ title, value, color, delay, icon, text, onClick }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay }}
    onClick={onClick}
    className={`${color} text-tan rounded-xl shadow-md p-6 cursor-pointer transition-all duration-200 hover:shadow-lg relative overflow-hidden`}
  >
    <div className="absolute inset-0 bg-[url('/images/bgDesign.jpg')] bg-cover bg-center opacity-10 pointer-events-none" />
    <div className="relative z-10 flex items-start justify-between">
      <div>
        <p className="text-lg font-medium">{title}</p>
        <p className="text-3xl font-bold">{value}</p>
      </div>
      <div className="flex items-center justify-center w-10 h-10 rounded-full text-tan bg-tan/10">
        {icon}
      </div>
    </div>
  </motion.div>
);

const ActivityItem = ({
  title,
  date,
  description,
  status,
  delay,
  imageUrl,
}) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, type: "spring", stiffness: 300 }}
    whileHover={{ y: -3, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
    className="relative overflow-hidden transition-all duration-200 border shadow-md bg-coffee text-tan rounded-xl border-tan/20 hover:shadow-lg"
  >
    <div className="absolute inset-0 bg-[url('/images/bgDesign.jpg')] bg-cover bg-center opacity-10 pointer-events-none" />
    <div className="relative z-10 flex flex-col sm:flex-row">
      {/* Product Image */}
      <div className="relative flex items-center justify-center h-40 border-r rounded-r-2xl sm:w-1/4 sm:h-auto">
        <AppImage
          src={
            imageUrl ||
            "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcQwm3sKSSsqSSqtZNE_Funcouaw8XHA885zkmvnK3MUH8RxvbPpyN72hQuAMbkzP-0Dm9xpJu9JVODLh4I8p9bWbAYlDoZZWscNXeRf58yOO0jV6qffaEtq8g"
          }
          alt={title}
          className="object-contain w-full h-[9rem] p-4"
          fallbackType="book"
        />
        {status && (
          <span
            className={`absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-medium ${status === "Delivered"
              ? "bg-green-100 text-green-800"
              : status === "Shipped"
                ? "bg-blue-100 text-blue-800"
                : "bg-yellow-100 text-yellow-800"
              }`}
          >
            {status}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col p-4 sm:w-3/4">
        <div className="flex items-start justify-between mb-2">
          <h4 className="text-lg font-semibold text-tan">{title}</h4>
          <span className="text-sm text-tan opacity-70">{date}</span>
        </div>

        <p className="mb-4 text-tan opacity-90 line-clamp-2">{description}</p>

        <div className="flex items-center justify-end mt-auto">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className=""
          >
            <div
              type="button"
              className=" bg-coffee w-10 h-10  rounded-[4rem] font-medium flex justify-center items-center"
            >
              <EyesSvg />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  </motion.div>
);
export default UserProfile;

const ModernProfileDetail = ({
  icon,
  label,
  value,
  setShowAddressModal,
  delay,
  isCopyable,
  notProvided, setShowProfileUpdateModal
}) => {
  const swiperRef = useRef(null);

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay }}
      className="flex items-start gap-3 p-3 border rounded-lg bg-tan/10 backdrop-blur-sm border-tan/20"
    >
      <span className="flex-shrink-0 text-xl text-tan">{icon}</span>

      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between w-full">
          <p className="text-xs font-medium tracking-wider uppercase text-cream/90">
            {label}
          </p>
          {Array.isArray(value) && value.length > 3 && (
            <SwiperNavButtons
              swiperRef={swiperRef}
              className="!relative !w-auto !h-auto justify-end gap-2"
              position={{}}
              prevButtonClass="!w-7 !h-7 pr-0.5 shadow-sm flex items-center justify-center scale-90"
              nextButtonClass="!w-7 !h-7 pl-0.5 shadow-sm flex items-center justify-center scale-90"
            />
          )}
        </div>

        <div className="flex items-center flex-1 min-w-0 gap-2 mt-1">
          {/* VALUE */}
          <div className="flex-1 min-w-0">
            {Array.isArray(value) ? (
              <div className="relative w-full ml-[-10px] my-[-10px]">
                {value.length > 0 ? (
                  <Swiper
                    modules={[Navigation, FreeMode, Autoplay]}
                    slidesPerView="auto"
                    spaceBetween={11}
                    autoplay={{ delay: 1000, disableOnInteraction: false }}
                    freeMode={true}
                    onSwiper={(swiper) => {
                      swiperRef.current = swiper;
                    }}
                    className="w-full"
                  >
                    {value.map((item, index) => (
                      <SwiperSlide key={index} className="!w-auto">
                        <Badge text={item} textFontSize="text-[11px] p-1" className="" />
                      </SwiperSlide>
                    ))}
                  </Swiper>
                ) : (
                  <p className={`text-sm font-semibold`}>
                    Select Your Favorite Genres
                  </p>
                )}
              </div>
            ) : (
              <p
                className={`${notProvided ? "" : "text-cream"} text-sm font-semibold`}
              >
                {value}
              </p>
            )}
          </div>

          {/* COPY */}
          {isCopyable && (
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => {
                if (notProvided) {
                  toast.error("Please Update Your Profile");
                  return;
                }
                navigator.clipboard.writeText(value);
                toast.success("Copied");
              }}
              className=" w-[32px] h-[32px] flex items-center justify-center rounded-full bg-coffee"
            >
              <CopyIcon />
            </motion.button>
          )}

          {["Address", "Favorite Genres"].includes(label) && (
            <div
              onClick={() => {
                if (label === "Address") {
                  setShowAddressModal(true)
                } else if (label === "Favorite Genres") {
                  setShowProfileUpdateModal(true)
                }
              }}
              className="w-8 h-8 flex items-center justify-center rounded-full bg-coffee cursor-pointer"
            >
              <EllipsisHorizontalIcon className="w-5 h-5 text-tan" />
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};
