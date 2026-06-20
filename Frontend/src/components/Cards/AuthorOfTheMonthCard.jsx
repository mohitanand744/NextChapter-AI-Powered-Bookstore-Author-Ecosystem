import React from "react";
import { motion } from "framer-motion";
import { FaTrophy, FaBookOpen, FaStar, FaChevronRight } from "react-icons/fa";
import { PremiumVerifiedBadge } from "../SVGs/SVGs";
import AppImage from "../Common/AppImage";
import Button from "../Buttons/Button";
import Badge from "../Common/Badge";

const AuthorOfTheMonthCard = ({
  authorOfTheMonth,
  authorOfTheMonthBooks,
  openComingSoon,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="mb-20 relative overflow-hidden rounded-[2.5rem] sm:rounded-[3rem] bg-gradient-to-br from-[#2D241E] to-[#1A1511] p-8 sm:p-12 border border-sepia/20 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] flex flex-col xl:flex-row items-center gap-12 group"
    >
      <div className="absolute inset-0 bg-[url('/images/bgDesign.jpg')] bg-cover bg-center opacity-20 pointer-events-none" />
      <div className="absolute -top-32 -right-32 w-[30rem] h-[30rem] bg-sepia/10 rounded-full blur-[100px] pointer-events-none group-hover:bg-sepia/20 transition-all duration-1000" />

      <div className="absolute top-0 right-0 p-8 opacity-5 hidden xl:block pointer-events-none transform group-hover:scale-110 transition-all animate-pulse duration-700 ease-out">
        <FaTrophy className="text-[16rem] text-cream/50" />
      </div>

      {/* Avatar Area */}
      <div className="relative z-10 shrink-0 mt-4 xl:mt-0">
        <div className="absolute inset-0 rounded-full border-2 border-sepia/40 animate-[spin_15s_linear_infinite] scale-[1.15]" />
        <div className="absolute inset-0 rounded-full border-2 border-tan/30 border-dashed animate-[spin_20s_linear_infinite_reverse] scale-[1.3]" />
        <div className="relative w-56 h-56 sm:w-72 sm:h-72 rounded-full p-2 bg-gradient-to-br from-sepia via-tan to-coffee shadow-[0_0_50px_rgba(180,140,90,0.15)] group-hover:shadow-[0_0_70px_rgba(180,140,90,0.25)] transition-shadow duration-700">
          <div className="w-full h-full overflow-hidden rounded-full border-4 border-[#1A1511] bg-coffee">
            <AppImage
              src={authorOfTheMonth.author_image}
              alt={authorOfTheMonth.author_name}
              className="w-full h-full  transition-transform duration-1000 group-hover:scale-110"
              imgClassName="object-cover"
              fallbackType="author"
              name={authorOfTheMonth.author_name}
            />
          </div>
          {/* Verified Badge */}
          <div className="absolute bottom-5 right-5 sm:bottom-6 sm:right-6 z-20">
            <PremiumVerifiedBadge className="w-10 h-10 sm:w-12 sm:h-12 drop-shadow-[0_0_10px_rgba(160,120,85,0.6)] bg-coffee rounded-full" title="Verified Author" />
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="relative z-10 flex-1 flex flex-col items-center xl:items-start text-center xl:text-left w-full mt-6 xl:mt-0">
        <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-gradient-to-r from-sepia/20 to-transparent border border-sepia/30 text-tan/60 mb-6 shadow-inner backdrop-blur-sm">
          <FaTrophy className="text-base sm:text-lg animate-pulse" />
          <span className="text-xs sm:text-lg font-black tracking-[0.2em] uppercase">Author of the Month</span>
        </div>

        <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-tan via-cream to-sepia mb-4 drop-shadow-sm">
          {authorOfTheMonth.author_name}
        </h2>

        {/* Genre Tags */}
        {authorOfTheMonth.genres && authorOfTheMonth.genres.size > 0 && (
          <div className="flex flex-wrap justify-center xl:justify-start gap-2 mb-6">
            {Array.from(authorOfTheMonth.genres).map(genre => (
              <span key={genre} className="px-4 py-1.5 bg-black/20 backdrop-blur-md border border-tan/20 rounded-full text-[11px] sm:text-xs font-bold text-tan/90 tracking-widest uppercase shadow-inner">
                {genre}
              </span>
            ))}
          </div>
        )}

        <div className="relative mb-8 pt-4">
          <svg className="absolute top-0 left-0 w-10 h-10 text-sepia/20 -translate-x-4 -translate-y-4" fill="currentColor" viewBox="0 0 24 24"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" /></svg>
          <p className="text-tan/80 text-base sm:text-lg leading-relaxed max-w-3xl font-medium italic pl-6 border-l-2 border-sepia/40">
            "{authorOfTheMonth.author_description || "A brilliant visionary whose captivating stories transport readers to incredible new worlds. Their masterful storytelling and profound character development have captured the hearts of readers worldwide, making them a cornerstone of our literary community."}"
          </p>
        </div>

        <div className="w-full flex flex-col md:flex-row items-center justify-center xl:justify-start gap-4 mb-8">
          <span className="text-cream/50 text-lg uppercase tracking-widest font-bold">Accolades:</span>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Badge textFontSize={"text-xs"} text="Global Bestseller" />
            <Badge textFontSize={"text-xs"} text="Editor's Choice" />
            <Badge textFontSize={"text-xs"} text="Literary Award '24" />
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center xl:justify-start gap-4 mb-8 w-full">
          <div className="flex items-center gap-4 bg-black/20 backdrop-blur-md px-6 py-3.5 rounded-2xl border border-tan/10 shadow-inner hover:border-sepia/40 transition-colors duration-300">
            <FaBookOpen className="text-sepia text-2xl" />
            <div className="flex flex-col items-start">
              <span className="text-tan/50 text-[12px] uppercase font-bold tracking-widest">Published Works</span>
              <span className="text-tan font-black text-2xl leading-none mt-1">{authorOfTheMonth.bookCount}</span>
            </div>
          </div>
          <div className="flex items-center gap-4 bg-black/20 backdrop-blur-md px-6 py-3.5 rounded-2xl border border-tan/10 shadow-inner hover:border-sepia/40 transition-colors duration-300">
            <FaStar className="text-sepia text-2xl" />
            <div className="flex flex-col items-start">
              <span className="text-tan/50 text-[12px] uppercase font-bold tracking-widest">Global Rating</span>
              <span className="text-tan font-black text-2xl leading-none mt-1">{authorOfTheMonth.author_rating || 5} <span className="text-lg text-tan/50 font-medium">/ 5</span></span>
            </div>
          </div>
        </div>

        {/* Top Books Showcase */}
        {authorOfTheMonthBooks && authorOfTheMonthBooks.length > 0 ? (
          <div className="w-full pt-8 border-t border-tan/10 flex flex-col sm:flex-row items-center justify-between gap-8 mt-2">
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <span className="text-cream/50 text-[16px] font-bold uppercase tracking-widest whitespace-nowrap">Featured Works:</span>
              <div className="flex space-x-4">
                {authorOfTheMonthBooks.map((book, idx) => (
                  <div key={book.book_id} className="w-20 h-28  rounded-md overflow-hidden border-2 border-[#1A1511] shadow-[0_10px_20px_rgba(0,0,0,0.5)] hover:-translate-y-3 hover:scale-110 transition-all duration-300 z-10 hover:z-20 cursor-pointer" onClick={() => openComingSoon({ exploreLink: `/nextChapter/book/${book.book_id}` })}>
                    <AppImage src={book?.images[0]} alt={book.title} className="w-full h-full object-cover" fallbackType="book" />
                  </div>
                ))}
              </div>
            </div>

            <Button
              onClick={() => openComingSoon({ exploreLink: `/nextChapter/author/${authorOfTheMonth.author_id}` })}
              variant="primary"
              className="flex items-center gap-3 !bg-sepia hover:!bg-tan hover:!text-coffee !text-cream !rounded-xl !px-8 !py-4 shadow-[0_0_20px_rgba(180,140,90,0.2)] hover:shadow-[0_0_30px_rgba(180,140,90,0.4)] transition-all duration-300 shrink-0 group/btn"
            >
              <span className="font-bold tracking-wider text-sm">Explore Collection</span>
              <FaChevronRight className="text-sm group-hover/btn:translate-x-1 transition-transform" />
            </Button>
          </div>
        ) : (
          <div className="w-full pt-8 border-t border-tan/10 flex justify-center xl:justify-start">
            <Button
              onClick={() => openComingSoon({ exploreLink: `/nextChapter/author/${authorOfTheMonth.author_id}` })}
              variant="primary"
              className="flex items-center gap-3 !bg-sepia hover:!bg-tan hover:!text-coffee !text-cream !rounded-xl !px-8 !py-4 shadow-[0_0_20px_rgba(180,140,90,0.2)] hover:shadow-[0_0_30px_rgba(180,140,90,0.4)] transition-all duration-300 group/btn"
            >
              <span className="font-bold tracking-wider text-sm">View Full Profile</span>
              <FaChevronRight className="text-sm group-hover/btn:translate-x-1 transition-transform" />
            </Button>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default AuthorOfTheMonthCard;
