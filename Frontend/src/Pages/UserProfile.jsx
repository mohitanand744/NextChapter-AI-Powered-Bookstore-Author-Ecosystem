import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllBooks } from "../store/Redux/Slices/BooksSlice";
import { useNavigate } from "react-router-dom";
import { MdOutlineMail } from "react-icons/md";
import { RiLogoutCircleLine } from "react-icons/ri";
import {
  FaCameraRetro,
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
import BookCardSkeleton from "../components/Loaders/Skeleton/BookCardSkeleton";
import { userApis } from "../utils/apis/userApis";
import { useProfileImage } from "../store/Context/ProfileImageContext";
import BooksLoader from "../components/Loaders/BooksLoader";
import { useImagePreview } from "../store/Context/ImagePreviewContext";
import ProfileUpdateModal from "../components/Modal/ProfileUpdateModal";
import Modal from "../components/Modal/ModalContainer";
import { useComingSoon } from "../store/Context/ComingSoonContext";
import SectionHeading from "../components/Headings/SectionHeading";
import AppImage from "../components/Common/AppImage";
import Badge from "../components/Common/Badge";
import ModernProfileDetail from "../components/UserProfile/ModernProfileDetail";
import StatCard from "../components/UserProfile/StatCard";
import { ActivityItem, ActivityItemSkeleton } from "../components/UserProfile/ActivityItem";

const UserProfile = () => {
  const [activeTab, setActiveTab] = useState("activity");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { openComingSoon } = useComingSoon();
  const { books } = useSelector((state) => state.books);
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
  const [profileDraft, setProfileDraft] = useState(null);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const { openPreview } = useImagePreview();
  const fileInputRef = useRef(null);
  const { preview, setPreview, isUploading, setIsUploading } = useProfileImage();
  const [imageError, setImageError] = useState(false);
  const hasImage = !!preview && !imageError;
  const [defaultAddress, setDefaultAddress] = useState("No Address Selected");

  useEffect(() => {
    setImageError(false);
  }, [preview]);

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

  const isProfileLoading = !userData;

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
                {isProfileLoading ? (
                  <div className="w-full h-full rounded-full border-4 border-tan/30 bg-tan/10 animate-pulse" />
                ) : (
                  <>
                    <AppImage
                      src={preview || ""}
                      alt="Profile"
                      className={`object-cover w-full h-full border-4 rounded-full shadow-lg border-tan ${hasImage ? "cursor-zoom-in" : "cursor-default"}`}
                      onClick={hasImage ? () => openPreview(preview, "Profile Image") : undefined}
                      fallbackType="avatar"
                      name={user?.name}
                      onError={() => setImageError(true)}
                    />

                    <div className="absolute bottom-0 bg-coffee w-8 h-8 rounded-full border-2 border-tan cursor-pointer duration-200 flex justify-center items-center active:scale-75 bottom-3 right-0">
                      <FaCameraRetro onClick={() => fileInputRef.current.click()} className=" w-6 h-6 rounded-full text-tan" />

                    </div>


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
                  </>
                )}
              </motion.div>
            </div>
            {/* Profile Content */}
            <div className="relative z-10 px-6 pt-2 pb-6">
              {isProfileLoading ? (
                <div className="mb-6 text-center space-y-2 animate-pulse">
                  <div className="h-6 w-36 bg-tan/15 rounded mx-auto" />
                  <div className="h-4 w-44 bg-tan/10 rounded mx-auto" />
                </div>
              ) : (
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
              )}

              {/* Profile Details */}
              <div className="space-y-5">
                <ModernProfileDetail
                  icon={<MdOutlineMail className="text-xl text-tan" />}
                  label="Email"
                  value={user?.email}
                  delay={0.4}
                  isCopyable
                  loading={isProfileLoading}
                />
                <ModernProfileDetail
                  icon={<FiPhone className="text-lg text-tan" />}
                  label="Phone"
                  value={user?.phone || "Not provided"}
                  notProvided={!user?.phone}
                  delay={0.5}
                  isCopyable
                  loading={isProfileLoading}
                />
                <ModernProfileDetail
                  icon={<FaRegAddressCard className="text-lg text-tan" />}
                  label="Address"
                  value={defaultAddress}
                  notProvided={!user?.default_address?.address}
                  setShowAddressModal={setShowAddressModal}
                  delay={0.6}
                  loading={isProfileLoading}
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
                  loading={isProfileLoading}
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
                loading={isProfileLoading}
              />
              <StatCard
                title="Wishlist"
                value={user?.wishlist}
                color="bg-coffee"
                text=""
                delay={0.2}
                icon={<HearthSvg className="" />}
                onClick={navigateToWishlist}
                loading={isProfileLoading}
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
                {isProfileLoading ? (
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    {[...Array(2)].map((_, index) => (
                      <ActivityItemSkeleton key={index} />
                    ))}
                  </div>
                ) : activeTab === "activity" ? (
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
                ) : activeTab === "orders" ? (
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
                ) : (
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
          {isProfileLoading ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {[...Array(4)].map((_, i) => (
                <BookCardSkeleton key={i} />
              ))}
            </div>
          ) : (
            <ScrollBooks autoScroll={false} books={uniqueBooks?.slice(0, 10)} onComingSoonClick={(url) => openComingSoon({ exploreLink: url })} />
          )}
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
        profileDraft={profileDraft}
        setProfileDraft={setProfileDraft}
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

export default UserProfile;
