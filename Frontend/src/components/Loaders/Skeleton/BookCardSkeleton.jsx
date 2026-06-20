import React from "react";
import { FaHeart } from "react-icons/fa";
import { MdOutlineAddShoppingCart } from "react-icons/md";

const BookCardSkeleton = () => {
  return (
    <div
      className="relative flex flex-col bg-coffee border border-tan/10 justify-between shadow-2xl
      md:h-[29rem] h-[26rem] z-10 card rounded-3xl overflow-hidden animate-pulse"
    >
      {/* Background design overlay */}
      <div className="absolute inset-0 bg-[url('/images/bgDesign.jpg')] bg-cover bg-center opacity-5 pointer-events-none" />
      
      {/* Category Badge skeleton */}
      <div className="absolute top-0 right-0 px-3 py-1.5 w-20 h-6 border-b border-l bg-tan/10 rounded-bl-2xl rounded-tr-3xl border-tan/10" />

      {/* Author Avatar skeleton (top left) */}
      <div className="absolute top-0 left-0">
        <div className="w-12 h-12 border-r border-b-2 rounded-br-2xl rounded-tl-3xl border-tan/10 p-[0.1rem] bg-tan/5" />
      </div>

      {/* Book Image skeleton */}
      <div className="image w-[60%] md:w-[90%] mx-auto pt-[3.5rem] h-[15rem] flex items-center justify-center">
        <div className="w-32 h-44 bg-tan/10 rounded-lg" />
      </div>

      {/* Info Container */}
      <div className="px-4 text-xl space-y-3">
        <div className="flex items-center justify-between">
          {/* Title skeleton */}
          <div className="h-6 w-36 bg-tan/15 rounded" />
          {/* Heart icon skeleton */}
          <FaHeart className="text-tan/10 text-lg" />
        </div>

        {/* Description skeleton */}
        <div className="space-y-1.5">
          <div className="h-3 w-full bg-tan/5 rounded" />
          <div className="h-3 w-5/6 bg-tan/5 rounded" />
        </div>

        {/* Price skeleton */}
        <div className="flex gap-4 mt-3">
          <div className="h-5 w-16 bg-tan/5 rounded" />
          <div className="h-5 w-16 bg-tan/15 rounded" />
        </div>
      </div>

      {/* Bottom Bar skeleton */}
      <div className="flex items-center justify-between p-4 mt-2 border-t bottom rounded-b-2xl backdrop-blur-md bg-tan/5 border-tan/10">
        {/* Cart button skeleton */}
        <div className="flex items-center gap-2 px-4 py-2 border text-cream/35 bg-tan/5 rounded-xl border-tan/10 w-24 h-9">
          <MdOutlineAddShoppingCart className="text-[20px] text-tan/10" />
          <div className="h-3 w-8 bg-tan/10 rounded" />
        </div>

        {/* Ratings skeleton */}
        <div className="flex gap-1">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="w-3 h-3 bg-tan/10 rounded-full" />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BookCardSkeleton;
