import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaBoxOpen,
  FaShippingFast,
  FaCheckCircle,
  FaArrowLeft,
  FaMapMarkerAlt,
  FaClock,
  FaTruck,
} from "react-icons/fa";
import { ordersApis } from "../utils/apis/ordersApis";
import { useEffect } from "react";
import { useState } from "react";

import BooksLoader from "../components/Loaders/BooksLoader";
import AppImage from "../components/Common/AppImage";
import BackButton from "../components/Buttons/BackButton";
import SectionHeading from "../components/Headings/SectionHeading";
import Button from "../components/Buttons/Button";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllBooks } from "../store/Redux/Slices/BooksSlice";
import ScrollBooks from "../components/ScrollingContainer/ScrollBooks";
import AuthorSlider from "../components/ScrollingContainer/AuthorSlider";
import { useComingSoon } from "../store/Context/ComingSoonContext";

const TrackingPage = () => {
  const { trackingId, itemId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [itemTrackingData, setItemTrackingData] = useState(null);

  const dispatch = useDispatch();
  const { books } = useSelector((state) => state.books);
  const { openComingSoon } = useComingSoon();

  /* ---------------- TRACKING STEPS ---------------- */

  const steps = [
    {
      key: "PROCESSING",
      title: "Order Placed & Processing",
      location: "Order Processing Center",
    },
    {
      key: "SHIPPED",
      title: "Shipped from Warehouse",
      location: "New Delhi Warehouse",
    },
    {
      key: "OUT_FOR_DELIVERY",
      title: "Out for Delivery",
      location: "Local Delivery Hub",
    },
    {
      key: "DELIVERED",
      title: "Delivered Successfully",
      location: itemTrackingData?.address,
    },
  ];

  /* ---------------- COMPONENT ---------------- */

  const getTrackingInfo = async (itemId, trackingId) => {
    try {
      setLoading(true);
      const response = await ordersApis.getTrackingItem(itemId, trackingId);

      setItemTrackingData(response.data);
    } catch (error) {
      console.log(error);
      setItemTrackingData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    dispatch(fetchAllBooks());
    getTrackingInfo(itemId, trackingId);
  }, [dispatch]);

  if (!loading && !itemTrackingData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-tan px-4 font-sans text-coffee">
        <div className="max-w-md mx-auto text-center">
          {/* Icon for visual appeal */}
          <div className="mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-coffee/10 text-coffee mb-4">
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </div>

          {/* Text content */}
          <h2 className="text-2xl md:text-3xl font-bold text-coffee mb-3 font-serif">
            Tracking Not Found
          </h2>
          <p className="opacity-90 mb-8 text-base leading-relaxed">
            We couldn't find any tracking details for the provided reference. Please
            check the tracking number and try again.
          </p>

          {/* Action buttons */}
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <button
              onClick={() => navigate(-1)}
              className="px-6 py-3 bg-coffee text-tan rounded-lg transition-all duration-200 font-medium font-serif shadow-sm hover:shadow hover:bg-coffee/95"
            >
              Go Back
            </button>
            <button
              onClick={() => navigate("/")}
              className="px-6 py-3 border border-coffee text-coffee rounded-lg transition-all duration-200 font-medium font-serif hover:bg-coffee/5"
            >
              Home Page
            </button>
          </div>

          {/* Help text */}
          <div className="mt-8 text-sm opacity-80 flex flex-row items-center justify-center gap-1">
            <span>Need help?</span>
            <button
              onClick={() => navigate("/nextChapter/contact")}
              className="underline hover:text-coffee font-medium transition-colors cursor-pointer font-serif"
            >
              Contact our support team
            </button>
          </div>
        </div>
      </div>
    );
  }

  const activeStep = steps.findIndex(
    (step) => step.key === itemTrackingData?.item_status,
  );

  console.log("Active Steps :", activeStep);

  return (
    <div className="min-h-screen text-coffee p-4 md:p-8 font-sans">
      <div className="container px-4">
        {loading ? (
          <BooksLoader />
        ) : (
          <>
            <BackButton label="Back to Orders" />

            <div className="grid grid-cols-1 gap-8 mx-auto lg:grid-cols-3">
              {/* Left Column: Tracking Info */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-8 lg:col-span-2"
              >
                {/* Status Header */}
                <SectionHeading
                  align="left"
                  className="!py-2 !mb-6 !px-0"
                  subtitle={
                    itemTrackingData.item_status === "DELIVERED" ? (
                      <span>
                        Your order has been{" "}
                        <b className="text-green-600 font-semibold">successfully delivered</b>{" "}
                        to your address.
                      </span>
                    ) : (
                      <>
                        <b className="font-semibold text-coffee">Expected Arrival:</b>{" "}
                        <span className="font-medium text-coffee">
                          {itemTrackingData.expected_delivery &&
                            new Date(
                              itemTrackingData.expected_delivery,
                            ).toLocaleDateString("en-GB", {
                              day: "2-digit",
                              month: "long",
                              year: "numeric",
                            })}
                        </span>
                      </>
                    )
                  }
                >
                  {itemTrackingData.item_status === "DELIVERED"
                    ? "Arrived"
                    : itemTrackingData.item_status === "SHIPPED"
                      ? "We have shipped your order"
                      : "On its way"}
                </SectionHeading>

                {/* Progress Timeline */}
                <div className="relative overflow-hidden bg-coffee text-tan border border-tan/20 rounded-3xl shadow-xl p-8">
                  {/* Background design overlay */}
                  <div className="absolute inset-0 bg-[url('/images/bgDesign.jpg')] bg-cover bg-center opacity-10 pointer-events-none" />

                  <div className="relative z-10">
                    <div className="relative z-10 flex items-start justify-between">
                      {steps.map((step, index) => {
                        const isActive =
                          step.key === itemTrackingData.item_status ||
                          activeStep >= index;

                        const isDeliveredActive =
                          step.key === "DELIVERED" &&
                          itemTrackingData.item_status === "DELIVERED";

                        const bubbleBg = isActive ? "#DCB491" : "rgba(92, 76, 73, 0.3)";
                        const bubbleColor = isActive ? "#5C4C49" : "#DCB491";
                        const bubbleBorderColor = isDeliveredActive
                          ? "#22C55E"
                          : (isActive ? "#ffe6c1" : "rgba(220, 180, 145, 0.2)");

                        return (
                          <div
                            key={step.key}
                            className="flex flex-col items-center flex-1"
                          >
                            <motion.div
                              animate={{
                                scale: isActive ? 1.1 : 1,
                                backgroundColor: bubbleBg,
                                borderColor: bubbleBorderColor,
                                borderWidth: isActive ? 2 : 1,
                                color: bubbleColor,
                              }}
                              transition={{
                                duration: 0.3,
                                type: "spring",
                                stiffness: 300,
                                damping: 20,
                              }}
                              className="w-10 h-10 rounded-full border flex items-center justify-center text-lg z-20 shadow-sm transition-colors duration-300"
                            >
                              {step.key === "PROCESSING" && <FaBoxOpen />}
                              {step.key === "SHIPPED" && <FaShippingFast />}
                              {step.key === "OUT_FOR_DELIVERY" && <FaTruck />}
                              {step.key === "DELIVERED" && (
                                <FaCheckCircle
                                  className={
                                    isDeliveredActive
                                      ? "text-green-600"
                                      : ""
                                  }
                                />
                              )}
                            </motion.div>
                            <p
                              className={`mt-2 text-xs sm:text-sm font-semibold tracking-wide font-serif ${isActive ? "text-cream opacity-100" : "text-tan/50 opacity-60"
                                }`}
                            >
                              {step.key === "OUT_FOR_DELIVERY"
                                ? "OUT FOR DELIVERY"
                                : step.key}
                            </p>
                          </div>
                        );
                      })}
                    </div>

                    <div className="absolute top-5 left-0 w-full px-[10%] z-0">
                      <div className="h-2 rounded-full bg-tan/20 w-full absolute top-0 left-0" />
                      <motion.div
                        className="h-2 rounded-full bg-tan absolute top-0 left-0"
                        initial={{ width: "0%" }}
                        animate={{
                          width: `calc(${(activeStep / (steps.length - 1)) * 100
                            }% ${itemTrackingData.item_status === "SHIPPED"
                              ? "+ 100px"
                              : ""
                            })`,
                        }}
                        transition={{ duration: 1, ease: "easeInOut" }}
                      >
                        <span className="absolute right-0 flex w-4 h-4 -top-1">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-tan opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-4 w-4 bg-tan"></span>
                        </span>
                      </motion.div>
                    </div>
                  </div>

                  {/* Detailed Updates Section */}
                  <div className="relative z-10 mt-12 space-y-6">
                    <div className="mt-12 space-y-6">
                      <h3 className="text-lg font-serif border-b border-tan/15 pb-2 mb-4 text-cream">
                        Tracking History
                      </h3>

                      {steps.map((step, index) => {
                        if (index > activeStep) return null;

                        const isLast = index === activeStep;

                        return (
                          <div key={step.key} className="flex gap-4 font-sans">
                            <div className="flex flex-col items-center">
                              <div
                                className={`w-2 h-2 rounded-full ${isLast ? "bg-cream" : "bg-tan/50"}`}
                              />
                              {!isLast && (
                                <div className="w-0.5 h-full bg-tan/15 my-1" />
                              )}
                            </div>

                            <div className="pb-4">
                              <p className={`text-sm font-medium ${isLast ? "text-cream" : "text-tan/80"}`}>
                                {step.title}
                              </p>

                              <p className="flex items-center gap-1 text-xs text-tan/60">
                                <FaClock className="text-xs" />
                                {new Date().toLocaleString()}
                              </p>

                              <p className="mt-1 text-xs text-tan/70">
                                {step.location}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Right Column: Item Details */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="lg:col-span-1"
              >
                <div className="relative overflow-hidden bg-coffee text-tan border border-tan/20 rounded-3xl p-6 sticky top-6 shadow-xl">
                  {/* Background design overlay */}
                  <div className="absolute inset-0 bg-[url('/images/bgDesign.jpg')] bg-cover bg-center opacity-10 pointer-events-none" />

                  <div className="relative z-10">
                    <h3 className="mb-6 text-xl font-bold font-serif text-cream">
                      Order Details
                    </h3>

                    {/* Product */}
                    <div className="flex gap-4 mb-6">
                      <AppImage
                        src={itemTrackingData.cover_image}
                        alt={itemTrackingData.title}
                        className="!w-40 !h-28"
                        imgClassName="object-cover !w-20 rounded-lg shadow-md !h-28 border border-tan/10"
                        fallbackType="book"
                      />
                      <div>
                        <h4 className="font-semibold leading-tight text-cream font-serif">
                          {itemTrackingData.title}
                        </h4>
                        <p className="mt-1 text-xs text-tan/80 line-clamp-2 font-sans">
                          {itemTrackingData.description}
                        </p>

                        {/* Status Badge */}
                        <span className="inline-block px-3 py-0.5 mt-2 text-xs font-semibold rounded-full bg-green-500/10 text-green-400 border border-green-500/20 font-sans">
                          {itemTrackingData.item_status}
                        </span>

                        <p className="mt-2 text-lg font-bold text-cream">
                          ₹{itemTrackingData.item_price}
                        </p>
                      </div>
                    </div>

                    {/* Order Meta */}
                    <div className="space-y-3 text-sm border-t border-tan/15 pt-4">
                      <div className="flex justify-between">
                        <span className="text-tan/75">Order ID</span>
                        <span className="font-medium text-cream font-sans">
                          {itemTrackingData.order_number}
                        </span>
                      </div>

                      <div className="flex justify-between">
                        <span className="text-tan/75">Tracking Number</span>
                        <span className="font-medium text-cream font-sans">
                          {itemTrackingData.tracking_id}
                        </span>
                      </div>

                      <div className="flex justify-between">
                        <span className="text-tan/75">Order Date</span>
                        <span className="font-medium text-cream font-sans">
                          {itemTrackingData.order_created_at &&
                            new Date(
                              itemTrackingData.order_created_at,
                            ).toLocaleDateString("en-GB", {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                            })}
                        </span>
                      </div>

                      <div className="flex justify-between">
                        <span className="text-tan/75">Payment Method</span>
                        <span className="font-medium text-cream">
                          {itemTrackingData.payment_method}
                        </span>
                      </div>

                      <div className="flex justify-between">
                        <span className="text-tan/75">Quantity</span>
                        <span className="font-medium text-cream">
                          {itemTrackingData.quantity || 1}
                        </span>
                      </div>
                    </div>

                    {/* Price Breakdown */}
                    <div className="mt-6 space-y-2 text-sm border-t border-tan/15 pt-4">
                      <div className="flex justify-between">
                        <span className="text-tan/75">Subtotal</span>
                        <span className="text-cream">₹{itemTrackingData.item_subtotal}</span>
                      </div>

                      <div className="flex justify-between">
                        <span className="text-tan/75">Shipping</span>
                        <span className="text-cream">₹{itemTrackingData.shipping_fee || 0}</span>
                      </div>

                      <div className="flex justify-between">
                        <span className="text-tan/75">Tax</span>
                        <span className="text-cream">₹{itemTrackingData.tax || 0}</span>
                      </div>

                      <div className="flex justify-between text-green-400">
                        <span>Discount</span>
                        <span>-₹{itemTrackingData.discount || 0}</span>
                      </div>

                      <div className="flex justify-between pt-3 text-base font-bold border-t border-tan/15 text-cream">
                        <span>Total</span>
                        <span>₹{itemTrackingData.item_total}</span>
                      </div>
                    </div>

                    {/* Delivery Address */}
                    <div className="mt-6 text-sm border-t border-tan/15 pt-4">
                      <p className="mb-1 font-semibold text-cream font-serif">Delivery Address</p>
                      <p className="text-xs leading-relaxed text-tan/80 font-sans">
                        {itemTrackingData.address}
                      </p>
                    </div>

                    {/* Support */}
                    <div className="mt-8 pt-6 border-t border-tan/15">
                      <p className="mb-3 text-sm text-tan/70 font-sans">
                        Need help with this order?
                      </p>
                      <Button className="!w-full">
                        Contact Support
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Recommended for You Section */}
            <div className="mt-24 pt-16 border-t border-coffee/10">
              <div className="mb-14">
                <SectionHeading subtitle="Handpicked Selection">
                  Recommended for You
                </SectionHeading>
                {books.length === 0 ? (
                  <div className="py-8 flex justify-center">
                    <BooksLoader />
                  </div>
                ) : (
                  <ScrollBooks autoScroll={false} books={books} onComingSoonClick={(url) => openComingSoon({ exploreLink: url })} />
                )}
              </div>
            </div>

            {/* Author Slider Section */}
            <div className="mt-20">
              <div className="mb-14">
                <SectionHeading subtitle="Discover Great Minds">
                  Find Your Favorite Author
                </SectionHeading>
                {books.length === 0 ? (
                  <div className="py-8 flex justify-center">
                    <BooksLoader />
                  </div>
                ) : (
                  <AuthorSlider books={books} onComingSoonClick={(url) => openComingSoon({ exploreLink: url })} />
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default TrackingPage;


