import React from "react";
// import Swiper core and required modules
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";
import AppImage from "../Common/AppImage";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const HomeBanner = () => {
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
          {/* Image with a gradient fade at the bottom */}
          <AppImage
            className="object-cover object-top w-full h-full"
            src="/images/Welcome_Banner.png"
            alt="Welcome Banner"
            fallbackType="default"
          />
          {/* Gradient effect */}
          <div className="absolute bottom-0 left-0 w-full h-1/5 bg-gradient-to-t from-tan to-transparent"></div>
        </SwiperSlide>
        <SwiperSlide className="relative">
          <AppImage
            className="object-cover object-top w-full h-full"
            src="/images/bannersec.png"
            alt="Second Banner"
            fallbackType="default"
          />
          {/* Gradient effect */}
          <div className="absolute bottom-0 left-0 w-full h-2/5 bg-gradient-to-t from-tan to-transparent"></div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default HomeBanner;


