import React, { useState } from "react";
// import Swiper core and required modules
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";
import AppImage from "../Common/AppImage";
import BannerSkeleton from "../Loaders/Skeleton/BannerSkeleton";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const HomeBanner = () => {
  const [loaded, setLoaded] = useState({
    banner1: false,
    banner2: false,
  });

  return (
    <div className="z-10 homeBanner">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        loop={true}
        spaceBetween={0}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
      >
        <SwiperSlide className="relative">
          {!loaded.banner1 && <BannerSkeleton />}
          <AppImage
            className={`w-full h-full ${!loaded.banner1 ? "hidden" : "block"}`}
            src="/images/Welcome_Banner.png"
            alt="Welcome Banner"
            fallbackType="default"
            onLoad={() => setLoaded((prev) => ({ ...prev, banner1: true }))}
          />
          {/* Gradient effect */}
          {loaded.banner1 && (
            <div className="absolute bottom-0 left-0 w-full h-1/5 bg-gradient-to-t from-tan to-transparent"></div>
          )}
        </SwiperSlide>
        <SwiperSlide className="relative">
          {!loaded.banner2 && <BannerSkeleton />}
          <AppImage
            className={`w-full h-full ${!loaded.banner2 ? "hidden" : "block"}`}
            src="/images/bannersec.png"
            alt="Second Banner"
            fallbackType="default"
            onLoad={() => setLoaded((prev) => ({ ...prev, banner2: true }))}
          />
          {/* Gradient effect */}
          {loaded.banner2 && (
            <div className="absolute bottom-0 left-0 w-full h-2/5 bg-gradient-to-t from-tan to-transparent"></div>
          )}
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default HomeBanner;


