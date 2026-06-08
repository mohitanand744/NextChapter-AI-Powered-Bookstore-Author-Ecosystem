import React, { useRef } from "react";
import { Navigation, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import BookCard from "../Cards/BookCard";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import SwiperNavButtons from "../Buttons/SwiperNavButtons";

const ScrollBooks = ({ autoScroll = true, books, onComingSoonClick }) => {
  const swiperRef = useRef(null);

  return (
    <div className="container relative mb-15">
      {/* Custom Navigation Buttons */}
      <SwiperNavButtons
        swiperRef={swiperRef}
        position={{ top: "40%" }}
        prevButtonclassName=""
        nextButtonclassName=""
      />

      <Swiper
        modules={[Navigation, Autoplay]}
        autoplay={
          autoScroll && {
            delay: 3500,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }
        }
        loop={autoScroll}
        spaceBetween={30}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        breakpoints={{
          350: {
            slidesPerView: 1,
            spaceBetween: 10,
          },
          360: {
            slidesPerView: 1.2,
            spaceBetween: 10,
          },
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 2.5,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 3.5,
            spaceBetween: 25,
          },
          1280: {
            slidesPerView: 4,
            spaceBetween: 30,
          },
          1600: {
            slidesPerView: 5,
            spaceBetween: 30,
          },
        }}
        className="px-4 md:px-8 lg:px-14"
      >
        {books?.map((book, i) => (
          <SwiperSlide
            key={i}
            className="relative pb-8 hover:scale-[1.02] hover:z-[9999] transition-all duration-300"
          >
            <BookCard book={book} index={i} onComingSoonClick={(url) => { if(onComingSoonClick) onComingSoonClick(url); }} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ScrollBooks;


