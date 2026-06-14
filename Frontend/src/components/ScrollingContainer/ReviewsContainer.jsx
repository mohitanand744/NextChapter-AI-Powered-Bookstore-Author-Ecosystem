import React, { useRef } from "react";
import TestimonialCard from "../Cards/TestimonialCard";
// import Swiper core and required modules
import { Navigation, Autoplay } from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";
import { testimonialData } from "../../../Data/mockData";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import SwiperNavButtons from "../Buttons/SwiperNavButtons";

const ReviewsContainer = () => {
  const swiperRef = useRef(null);

  return (
    <div className="relative w-full">
      {/* Custom Navigation Buttons */}
      <SwiperNavButtons
        swiperRef={swiperRef}
        position={{ top: "50%" }}
        prevButtonclassName=""
        nextButtonclassName=""
      />
      <Swiper
        className="mb-16"
        modules={[Navigation, Autoplay]}
        autoplay={{
          delay: 3500, // Auto slide change every 1.5 seconds
          disableOnInteraction: false,
        }}
        // loop={autoScroll}
        spaceBetween={30}
        // navigation
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
        breakpoints={{
          // Adjust Swiper settings based on screen size
          320: {
            slidesPerView: 1,
            spaceBetween: 10,
          },
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 25,
          },
          1440: {
            slidesPerView: 4,
            spaceBetween: 30,
          },
        }}
      >
        {testimonialData.map((item, index) => (
          <SwiperSlide key={index} className="relative h-auto pt-2 pb-6">
            <TestimonialCard data={item} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ReviewsContainer;


