import React, { useRef } from "react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, FreeMode, Autoplay } from "swiper/modules";
import "swiper/css";
import SwiperNavButtons from "../Buttons/SwiperNavButtons";
import Badge from "../Common/Badge";
import { CopyIcon } from "../SVGs/SVGs";
import { EllipsisHorizontalIcon } from "@heroicons/react/24/outline";
import { toast } from "sonner";

const ModernProfileDetail = ({
  icon,
  label,
  value,
  setShowAddressModal,
  delay,
  isCopyable,
  notProvided,
  setShowProfileUpdateModal,
  loading,
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
            {loading ? (
              <div className="h-4 w-32 bg-tan/10 rounded animate-pulse" />
            ) : Array.isArray(value) ? (
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
              className="w-[32px] h-[32px] flex items-center justify-center rounded-full bg-coffee"
            >
              <CopyIcon />
            </motion.button>
          )}

          {["Address", "Favorite Genres"].includes(label) && (
            <div
              onClick={() => {
                if (label === "Address") {
                  setShowAddressModal(true);
                } else if (label === "Favorite Genres") {
                  setShowProfileUpdateModal(true);
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

export default ModernProfileDetail;
