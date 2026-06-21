import React from "react";
import BookCardSkeleton from "./BookCardSkeleton";
import AuthorCardSkeleton from "./AuthorCardSkeleton";

const BookDetailsSkeleton = () => {
  return (
    <div className="min-h-screen bg-tan text-coffee animate-pulse">
      {/* Breadcrumb Skeleton */}
      <div className="container md:block hidden mx-auto px-4 pt-10 max-w-7xl">
        <div className="flex items-center space-x-2">
          <div className="h-4 w-12 bg-coffee/10 rounded" />
          <span className="text-coffee/20">/</span>
          <div className="h-4 w-16 bg-coffee/10 rounded" />
          <span className="text-coffee/20">/</span>
          <div className="h-4 w-24 bg-coffee/15 rounded" />
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 lg:py-10 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 xl:gap-28 items-start">
          
          {/* Left Column: Elegant Image Display Skeleton */}
          <div className="w-full lg:sticky lg:top-28 lg:h-[calc(100vh-17rem)] flex flex-col justify-between">
            <div className="relative w-full h-full flex flex-col justify-between gap-4">
              
              {/* Main Image Card Skeleton (bg-coffee to match main container) */}
              <div className="relative z-10 w-full rounded-[2rem] overflow-hidden bg-coffee border border-tan/20 shadow-2xl flex items-center justify-center aspect-[3/3.5] lg:aspect-auto lg:flex-1 lg:min-h-[400px]">
                <div className="absolute inset-0 bg-[url('/images/bgDesign.jpg')] bg-cover bg-center opacity-5 pointer-events-none" />
                <div className="w-48 h-64 bg-tan/10 rounded-2xl shadow-inner" />
              </div>

              {/* Thumbnails Skeleton */}
              <div className="flex justify-center gap-5 flex-shrink-0 mt-4 lg:mt-0">
                {[...Array(3)].map((_, idx) => (
                  <div
                    key={idx}
                    className="w-20 aspect-square rounded-xl bg-coffee/10 border border-coffee/20"
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Content & Commerce Skeleton */}
          <div className="w-full relative !p-4 rounded-3xl flex flex-col pt-2 min-w-0">
            <div className="absolute inset-0 rounded-3xl bg-[url('/images/bgDesign.jpg')] bg-cover bg-center opacity-10 pointer-events-none z-0" />
            
            <div className="mb-12">
              {/* Category Badge Skeleton */}
              <div className="inline-flex items-center space-x-2 px-3 py-2 bg-coffee/10 border border-coffee/20 rounded-full mb-8 w-32 h-8">
                <div className="w-1.5 h-1.5 bg-coffee/40 rounded-full" />
                <div className="h-3 w-16 bg-coffee/20 rounded" />
              </div>

              {/* Title Skeleton */}
              <div className="space-y-4 mb-8">
                <div className="h-12 lg:h-16 w-3/4 bg-coffee/15 rounded-2xl" />
                <div className="h-12 lg:h-16 w-1/2 bg-coffee/10 rounded-2xl" />
              </div>

              {/* Author & Ratings Row Skeleton */}
              <div className="flex items-center space-x-6 pb-10 border-b border-coffee/10">
                <div className="flex items-center space-x-4">
                  <div className="w-14 h-14 rounded-full bg-coffee/15 border-2 border-coffee/20" />
                  <div className="space-y-2">
                    <div className="h-3 w-12 bg-coffee/20 rounded" />
                    <div className="h-5 w-28 bg-coffee/15 rounded" />
                  </div>
                </div>
                <div className="h-10 w-px bg-coffee/10" />
                <div className="space-y-2">
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className="w-3.5 h-3.5 bg-coffee/15 rounded-full" />
                    ))}
                  </div>
                  <div className="h-3 w-24 bg-coffee/10 rounded" />
                </div>
              </div>
            </div>

            {/* Pricing & Add to Cart Skeleton */}
            <div className="mb-16">
              <div className="flex items-baseline space-x-5 mb-10">
                <div className="h-12 w-32 bg-coffee/20 rounded-xl" />
                <div className="h-6 w-20 bg-coffee/10 line-through rounded" />
                <div className="flex-1" />
                <div className="h-10 w-32 bg-coffee/10 rounded" />
              </div>

              <div className="flex flex-col xl:flex-row gap-4">
                {/* Quantity selector skeleton */}
                <div className="w-[10rem] h-16 xl:h-20 bg-coffee/10 rounded-2xl" />
                
                {/* CTA Buttons skeleton */}
                <div className="flex flex-1 gap-4">
                  <div className="flex-1 h-16 xl:h-20 bg-coffee/20 rounded-[1rem] sm:rounded-[1.2rem]" />
                  <div className="flex-1 h-16 xl:h-20 bg-coffee/15 rounded-[1rem] sm:rounded-[1.2rem]" />
                </div>
              </div>
            </div>

            {/* Content Tabs Skeleton */}
            <div className="mb-16">
              <div className="flex space-x-10 border-b-2 border-coffee/30 mb-10 pb-5">
                <div className="h-5 w-24 bg-coffee/20 rounded" />
                <div className="h-5 w-28 bg-coffee/10 rounded" />
                <div className="h-5 w-24 bg-coffee/10 rounded" />
              </div>

              {/* Tab description text lines */}
              <div className="space-y-4">
                <div className="h-5 w-full bg-coffee/15 rounded" />
                <div className="h-5 w-full bg-coffee/10 rounded" />
                <div className="h-5 w-5/6 bg-coffee/10 rounded" />
                <div className="h-5 w-4/5 bg-coffee/10 rounded" />
              </div>
            </div>

          </div>
        </div>

        {/* Recommended for You Section Skeleton */}
        <div className="pt-4 md:pt-24 border-t border-coffee/10 mt-12">
          <div className="mb-6 space-y-2">
            <div className="h-7 w-48 bg-coffee/40 rounded" />
            <div className="h-3.5 w-96 bg-coffee/20 rounded" />
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {[...Array(4)].map((_, i) => (
              <BookCardSkeleton key={i} />
            ))}
          </div>
        </div>

        {/* Favorite Authors Section Skeleton */}
        <div className="mt-12">
          <div className="mb-6 space-y-2">
            <div className="h-7 w-48 bg-coffee/40 rounded" />
            <div className="h-3.5 w-96 bg-coffee/20 rounded" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <AuthorCardSkeleton key={i} />
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default BookDetailsSkeleton;
