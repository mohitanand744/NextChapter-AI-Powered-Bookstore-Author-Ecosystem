import React from "react";
import { DecorativeHeader } from "../../SVGs/SVGs";

const AuthorCardSkeleton = () => {
  return (
    <div
      className="relative w-full h-[280px] mx-auto overflow-hidden bg-coffee backdrop-blur-xl rounded-[2rem] border border-tan/20 animate-pulse"
    >
      {/* Background design overlay */}
      <div
        className="absolute inset-0 bg-[url('/images/bgDesign.jpg')] bg-cover bg-center opacity-5 pointer-events-none"
      />

      {/* Decorative Top Banner */}
      <div className="absolute top-0 left-0 w-full z-0 opacity-20 origin-top">
        <DecorativeHeader />
      </div>

      <div className="relative flex flex-col items-center px-5 pt-10 h-full z-10">
        {/* Author Avatar Skeleton */}
        <div className="relative w-16 h-16 md:w-20 md:h-20 p-1 mb-2 md:mb-4 bg-tan/10 rounded-full border border-tan/20 flex items-center justify-center">
          <div className="w-full h-full rounded-full bg-tan/10" />

          {/* Verified Badge Skeleton */}
          <div className="absolute -bottom-1 -right-1 z-20 w-5 h-5 md:w-6 md:h-6 bg-tan/20 rounded-full border border-coffee" />
        </div>

        {/* Author Name Skeleton */}
        <div className="h-6 w-32 bg-tan/15 rounded mb-2.5" />

        {/* Ratings Skeleton */}
        <div className="flex gap-1 mb-3">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="w-3.5 h-3.5 bg-tan/10 rounded-full" />
          ))}
        </div>

        {/* Description Skeleton */}
        <div className="w-full space-y-1.5 px-4 flex flex-col items-center">
          <div className="h-3 w-full bg-tan/5 rounded" />
          <div className="h-3 w-5/6 bg-tan/5 rounded" />
          <div className="h-3 w-2/3 bg-tan/5 rounded" />
        </div>
      </div>
    </div>
  );
};

export default AuthorCardSkeleton;
