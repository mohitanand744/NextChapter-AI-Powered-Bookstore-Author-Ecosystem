import React, { useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import {
  EffectCoverflow,
  Pagination,
  Navigation,
  Autoplay,
} from "swiper/modules";
import Ratings from "../RatingsReviews/Ratings";
import SwiperNavButtons from "../Buttons/SwiperNavButtons";
import { DecorativeHeader } from "../SVGs/SVGs";
import Button from "../Buttons/Button";
import AuthorCard from "../Cards/AuthorCard";

function AuthorSlider({ books, onComingSoonClick }) {
  const swiperRef = useRef(null);

  const findUniqueAuthors = (booksArray) => {
    const uniqueAuthors = [];
    const seen = new Set();

    for (const book of booksArray) {
      const uniqueKey = book?.author?.author_id;
      if (!seen.has(uniqueKey)) {
        seen.add(uniqueKey);
        uniqueAuthors.push(book);
      }
    }

    return uniqueAuthors;
  };

  const uniqueAuthors = books ? findUniqueAuthors(books) : [];

  return (
    <div className="mx-auto relative container   authorSlider">
      {/* Custom Navigation Buttons */}
      <SwiperNavButtons
        swiperRef={swiperRef}
        position={{ top: "40%" }}
        prevButtonclassName=""
        nextButtonclassName=""
      />
      <Swiper
        loop={true}
        initialSlide={3}
        effect={"coverflow"}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        grabCursor={true}
        centeredSlides={true}

        slidesPerView={"auto"}
        coverflowEffect={{
          rotate: 20,
          stretch: 0,
          depth: 0,
          modifier: 1,
          slideShadows: false,
        }}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        modules={[EffectCoverflow, Navigation, Pagination]}
        className="w-full pt-10 pb-16"
      >
        {uniqueAuthors?.map((author, i) => (
          <SwiperSlide key={i} className="!w-[240px] py-10 md:!w-[280px]">
            <AuthorCard author={author} onComingSoonClick={(url) => { if(onComingSoonClick) onComingSoonClick(url); }} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default AuthorSlider;
