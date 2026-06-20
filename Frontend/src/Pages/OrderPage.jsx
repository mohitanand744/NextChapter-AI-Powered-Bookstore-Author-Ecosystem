import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiPackage,
  FiTruck,
  FiCheckCircle,
  FiChevronDown,
  FiFileText,
  FiRepeat,
  FiShoppingCart,
  FiCalendar,
  FiCreditCard,
  FiDollarSign,
  FiHash,
  FiXCircle,
  FiMapPin,
} from "react-icons/fi";
import { CopyIcon } from "../components/SVGs/SVGs";

import { toast } from "sonner";
import SectionHeading from "../components/Headings/SectionHeading";
import Banners from "../components/Banners/Banners";
import { useNavigate } from "react-router-dom";
import { ordersApis } from "../utils/apis/ordersApis";
import { useEffect } from "react";
import { useLoader } from "../Hooks/useLoader";
import BooksLoader from "../components/Loaders/BooksLoader";
import SubNavbar from "../components/Common/Navbars/SubNavbar";
import Button from "../components/Buttons/Button";
import NoData from "../components/EmptyData/noData";
import AppImage from "../components/Common/AppImage";
import Breadcrumb from "../components/Common/Breadcrumb";
import Badge from "../components/Common/Badge";

const statusConfig = {
  PLACED: {
    icon: <FiPackage className="text-blue-400" />,
    color: "bg-blue-500/10 text-blue-400 border border-blue-500/20",
    progress: 1,
    estimatedText: "Est. delivery 5-7 business days",
  },
  SHIPPED: {
    icon: <FiTruck className="text-yellow-400" />,
    color: "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20",
    progress: 2,
    estimatedText: "Arriving in 2-3 business days",
  },
  DELIVERED: {
    icon: <FiCheckCircle className="text-green-400" />,
    color: "bg-green-500/10 text-green-400 border border-green-500/20",
    progress: 3,
    estimatedText: "Delivered on " + new Date().toLocaleDateString(),
  },
  OUT_FOR_DELIVERY: {
    icon: <FiTruck className="text-yellow-400" />,
    color: "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20",
    progress: 4,
    estimatedText: "Arriving in EOD",
  },
  CANCELLED: {
    icon: <FiXCircle className="text-red-400" />,
    color: "bg-red-500/10 text-red-400 border border-red-500/20",
    progress: 4,
    estimatedText: "Cancelled on " + new Date().toLocaleDateString(),
  },
};

const statusConfigOrderItems = {
  PROCESSING: {
    icon: <FiPackage className="text-blue-400" />,
    color: "bg-blue-500/10 text-blue-400 border border-blue-500/20",
    progress: 1,
    estimatedText: "Est. delivery 5-7 business days",
  },
  SHIPPED: {
    icon: <FiTruck className="text-yellow-400" />,
    color: "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20",
    progress: 2,
    estimatedText: "Arriving in 2-3 business days",
  },
  OUT_FOR_DELIVERY: {
    icon: <FiTruck className="text-yellow-400" />,
    color: "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20",
    progress: 3,
    estimatedText: "Arriving in EOD",
  },
  DELIVERED: {
    icon: <FiCheckCircle className="text-green-400" />,
    color: "bg-green-500/10 text-green-400 border border-green-500/20",
    progress: 4,
    estimatedText: "Delivered on " + new Date().toLocaleDateString(),
  },
  CANCELLED: {
    icon: <FiXCircle className="text-red-400" />,
    color: "bg-red-500/10 text-red-400 border border-red-500/20",
    progress: 5,
    estimatedText: "Cancelled on " + new Date().toLocaleDateString(),
  },
};

const OrdersPage = () => {
  const [expandedOrder, setExpandedOrder] = useState(null);
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const { loading } = useLoader();
  const navigate = useNavigate();
  const toggleOrder = (orderId) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  const getOrdersList = async () => {
    try {
      const response = await ordersApis.getAllOrders();
      console.log("Orders Res: ", response);

      setOrders(response.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    getOrdersList();
  }, []);

  // 'PROCESSING', 'SHIPPED', 'DELIVERED'

  const getDeliveryLabel = (status) => {
    switch (status) {
      case "PROCESSING":
        return "Est. delivery";
      case "SHIPPED":
        return "Arrives";
      case "DELIVERED":
        return "Delivered on";
      case "CANCELLED":
        return "Cancelled on";
      case "OUT_FOR_DELIVERY":
        return "Out for delivery";
      default:
        return "Processing";
    }
  };

  const getDeliveryOrderStatusLabel = (status) => {
    switch (status) {
      case "PLACED":
        return "Processing";
      case "SHIPPED":
        return "Shipped";
      case "DELIVERED":
        return "Delivered";
      case "CANCELLED":
        return "Cancelled";
      case "OUT_FOR_DELIVERY":
        return "Out for delivery";
      default:
        return "Processing";
    }
  };
  const formatDate = (date) =>
    new Date(date).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

  console.log("Orders : ", orders);

  const filteredOrders = orders?.filter((order) => {
    const query = searchTerm.toLowerCase().trim();
    return (
      order?.order_number?.toLowerCase().includes(query) ||
      order?.order_items?.some((item) =>
        item?.title?.toLowerCase().includes(query)
      )
    );
  }) || [];

  return (
    <>
      <Banners
        titleFirst={"Your"}
        titleSecond={"Orders"}
        description={"Checkout your orders"}
        items={[
          { label: "Home", path: "/nextChapter" },
          { label: "Profile", path: "/nextChapter/user/profile" },
          { label: "Orders", path: null },
        ]}
      />
      <div className="min-h-screen px-4 pb-8 pt-0 sm:px-6 lg:px-8">
        <div className="container mx-auto px-4">

          <SubNavbar
            backLabel="Back to Profile"
            backTo="/nextChapter/user/profile"
            registryLabel="Registry"
            registryCount={`${orders.length} ${orders.length === 1 ? 'Order' : 'Orders'} Total`}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            searchPlaceholder="Search by Order ID or Book Title..."
          />

          <SectionHeading
            align="left"
            className="!py-2 !mb-6"
            subtitle="A complete record of your literary acquisitions & shipping statuses"
          >
            Order Archives
          </SectionHeading>

          <div className="space-y-4">
            {loading ? (
              <BooksLoader />
            ) : (
              orders.length === 0 ? (
                <NoData
                  title="No Orders Found"
                  message="You have not placed any orders yet."
                  icon="cart"
                  showAction={true}
                  actionText="Explore More"
                  actionLink="/nextChapter/books"
                />
              ) : filteredOrders.length === 0 ? (
                <NoData
                  title="No Search Results"
                  message={`No orders found matching "${searchTerm}".`}
                  icon="search"
                  showAction={true}
                  actionText="Clear Search"
                  onActionClick={() => setSearchTerm("")}
                />
              ) : (
                filteredOrders.map((order, i) => {
                  const safeOrderStatus =
                    statusConfig[order?.order_status] || statusConfig.PLACED;

                  return (
                    <motion.div
                      key={order?.order_id}
                      initial={{ opacity: 0, scale: 0.8, y: -10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      transition={{ duration: 0.1, delay: 0.1 * i }}
                      whileHover={{ scale: 1.01 }}
                      className="relative overflow-hidden bg-coffee text-tan border border-tan/20 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300"
                    >
                      {/* Background design overlay */}
                      <div className="absolute inset-0 bg-[url('/images/bgDesign.jpg')] bg-cover bg-center opacity-10 pointer-events-none" />

                      {/* Order Summary (Clickable Header) */}
                      <div
                        onClick={() => toggleOrder(order?.order_id)}
                        className="relative z-10 flex items-start sm:items-center justify-between p-4 sm:p-5 transition cursor-pointer backdrop-blur-sm rounded-xl gap-4"
                      >
                        <div className="grid grid-cols-2 gap-y-4 gap-x-2 sm:flex sm:flex-row sm:flex-wrap sm:gap-8 flex-1">
                          {/* Order Date */}
                          <div className="flex items-start gap-2 sm:gap-3">
                            <div className="p-1.5 sm:p-2 rounded-lg bg-tan/10 text-tan shrink-0">
                              <FiCalendar className="text-tan" />
                            </div>
                            <div className="min-w-0">
                              <p className="text-[10px] sm:text-xs text-tan/75 truncate">
                                ORDER PLACED
                              </p>
                              <p className="text-xs sm:text-sm font-medium text-cream truncate">
                                {formatDate(order?.created_at)}
                              </p>
                            </div>
                          </div>

                          {/* Payment Method */}
                          <div className="flex items-start gap-2 sm:gap-3">
                            <div className="p-1.5 sm:p-2 rounded-lg bg-tan/10 text-tan shrink-0">
                              <FiCreditCard className="text-tan" />
                            </div>
                            <div className="min-w-0">
                              <p className="text-[10px] sm:text-xs text-tan/75 truncate">PAYMENT</p>
                              <p className="text-xs sm:text-sm font-medium text-cream truncate">
                                {order?.payment_method}
                              </p>
                            </div>
                          </div>

                          {/* Order Total */}
                          <div className="flex items-start gap-2 sm:gap-3">
                            <div className="p-1 px-2.5 sm:px-3 rounded-lg text-tan bg-tan/10 shrink-0 font-medium">
                              ₹
                            </div>
                            <div className="min-w-0">
                              <p className="text-[10px] sm:text-xs text-tan/75 truncate">TOTAL</p>
                              <div className="flex items-center gap-1 sm:gap-2 flex-wrap">
                                <p className="text-xs sm:text-sm font-medium text-cream">
                                  ₹{order?.total_amount}
                                </p>
                                <p className="text-[10px] sm:text-xs text-tan/60 whitespace-nowrap">
                                  ({order?.order_items.length} items)
                                </p>
                              </div>
                            </div>
                          </div>

                          {/* Order Number */}
                          <div className="flex items-start gap-2 sm:gap-3">
                            <div className="p-1.5 sm:p-2 rounded-lg bg-tan/10 text-tan shrink-0">
                              <FiHash className="text-tan" />
                            </div>
                            <div className="min-w-0">
                              <p className="text-[10px] sm:text-xs text-tan/75 truncate">ORDER ID</p>
                              <div className="flex items-center gap-1 sm:gap-2">
                                <p className="text-xs sm:text-sm font-medium text-cream truncate">
                                  {order?.order_number}
                                </p>
                                <motion.button
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    navigator.clipboard
                                      .writeText(order?.order_number)
                                      .then(() => toast.success(`Copied!`))
                                      .catch((err) => console.error(err));
                                  }}
                                  className="transition-colors text-tan/50 hover:text-tan shrink-0"
                                  title="Copy to clipboard"
                                >
                                  <CopyIcon />
                                </motion.button>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Status and Chevron */}
                        <div className="flex flex-col sm:flex-row items-end sm:items-center gap-2 sm:gap-4 shrink-0">
                          <div className="flex-col items-end hidden sm:flex">
                            <div className="flex items-center gap-2">
                              <Badge
                                text={getDeliveryOrderStatusLabel(order?.order_status)}
                                icon={safeOrderStatus.icon}
                                variant="outline"
                                className={safeOrderStatus.color}
                              />
                            </div>
                            <p className="mt-1 text-xs text-tan/75">
                              {
                                statusConfig[order?.order_status]
                                  .estimatedText
                              }
                            </p>
                          </div>

                          <motion.div
                            animate={{
                              rotate:
                                expandedOrder === order?.order_id ? 180 : 0,
                            }}
                            transition={{ duration: 0.2 }}
                            className="p-2 rounded-lg bg-tan/10 text-tan"
                          >
                            <FiChevronDown className="text-tan" />
                          </motion.div>
                        </div>
                      </div>

                      {/* Dropdown Content */}
                      <AnimatePresence>
                        {expandedOrder === order?.order_id && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.2, ease: "easeInOut" }}
                            className="relative z-10 overflow-hidden backdrop-blur-sm"
                          >
                            <div className="px-5 py-4 border-t border-tan/20">
                              {/* Order Items */}
                              <div className="space-y-4">
                                {order?.order_items.map((item, i) => {
                                  const safeItemStatus =
                                    statusConfigOrderItems[
                                    item?.item_status
                                    ] || statusConfigOrderItems.PROCESSING;

                                  return (
                                    <motion.div
                                      key={item?.order_item_id}
                                      initial={{ opacity: 0, scale: 0.8, y: -10 }}
                                      animate={{ opacity: 1, scale: 1, y: 0 }}
                                      transition={{ duration: 0.6, delay: 0.1 * i }}
                                      className="flex flex-row gap-3 sm:gap-4 p-3 sm:p-4 border rounded-lg border-tan/10 bg-tan/5"
                                    >
                                      <div className="shrink-0">
                                        <AppImage
                                          src={item?.cover_image}
                                          alt={item?.title}
                                          className="object-cover w-16 h-20 sm:w-20 sm:h-24 border border-tan/10 rounded-lg"
                                          fallbackType="book"
                                        />
                                      </div>
                                      <div className="flex flex-col flex-1 min-w-0">
                                        <h3 className="font-medium text-cream text-sm sm:text-[1.05rem] truncate">
                                          {item?.title}
                                        </h3>
                                        <p className="mt-0.5 sm:mt-1 text-xs sm:text-sm text-tan/85 line-clamp-2">
                                          {item?.description}
                                        </p>
                                        <div className="flex flex-wrap items-center mt-2 gap-x-2">
                                          <span className="font-semibold text-cream text-sm sm:text-base">
                                            ₹{item?.price}
                                          </span>
                                          {item?.original_price && (
                                            <span className="text-[10px] sm:text-xs line-through text-tan/55">
                                              ₹{item?.original_price}
                                            </span>
                                          )}
                                          <span className="ml-auto text-xs text-tan/75">
                                            Qty: {item?.quantity}
                                          </span>
                                        </div>
                                        <div className="flex flex-col gap-2 mt-3 sm:flex-row sm:items-center sm:justify-between">
                                          <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-tan/85">
                                            <Badge
                                              text={getDeliveryLabel(item?.item_status)}
                                              icon={safeItemStatus.icon}
                                              variant="outline"
                                              className={`!text-[10px] sm:!text-xs ${safeItemStatus.color}`}
                                            />
                                            {order?.expected_delivery && (
                                              <span className="text-tan/70 text-[10px] sm:text-xs whitespace-nowrap">
                                                Expected: {new Date(order.expected_delivery).toLocaleDateString(
                                                  "en-GB",
                                                  {
                                                    day: "2-digit",
                                                    month: "short",
                                                    year: "numeric",
                                                  }
                                                )}
                                              </span>
                                            )}
                                          </div>
                                          {item?.tracking_id && (
                                            <Button
                                              onClick={() =>
                                                navigate(
                                                  `/nextChapter/tracking/${item?.order_item_id}/${item?.tracking_id}`,
                                                )
                                              }
                                              variant="outline-tan"
                                              className="flex w-fit items-center gap-1 !py-1 !px-2.5 sm:!py-1.5 sm:!px-3.5 !text-[10px] sm:!text-xs !rounded-lg"
                                            >
                                              <FiMapPin /> Track
                                            </Button>
                                          )}
                                        </div>
                                      </div>
                                    </motion.div>
                                  );
                                })}
                              </div>

                              {/* Order Actions */}
                              <div className="flex flex-wrap justify-end gap-2 mt-6">
                                <Button
                                  variant="outline-tan"
                                  className="flex items-center gap-1 !py-1.5 !px-3.5 !text-xs !rounded-lg"
                                >
                                  <FiFileText /> Invoice
                                </Button>
                                <Button
                                  variant="outline-tan"
                                  className="flex items-center gap-1 !py-1.5 !px-3.5 !text-xs !rounded-lg"
                                >
                                  <FiRepeat /> Return
                                </Button>
                                <Button
                                  variant="outline-tan"
                                  className="flex items-center gap-1 !py-1.5 !px-3.5 !text-xs !rounded-lg"
                                >
                                  <FiShoppingCart /> Buy Again
                                </Button>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  );
                })
              )
            )}

          </div>
        </div>
      </div>
    </>
  );
};

export default OrdersPage;
