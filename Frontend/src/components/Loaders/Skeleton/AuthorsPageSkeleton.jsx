import React from "react";
import AuthorCardSkeleton from "./AuthorCardSkeleton";
import BannersSkeleton from "./BannersSkeleton";

const AuthorsPageSkeleton = () => {
  return (
    <div className="animate-pulse min-h-screen bg-tan">
      {/* Banner Skeleton */}
      <BannersSkeleton />

      <div className="container mx-auto px-4 py-8">
        
        {/* Author of the Month Section Skeleton */}
        <div className="mb-20 relative overflow-hidden rounded-[2.5rem] sm:rounded-[3rem] bg-coffee p-8 sm:p-12 border border-tan/20 flex flex-col xl:flex-row items-center gap-12">
          <div className="absolute inset-0 bg-[url('/images/bgDesign.jpg')] bg-cover bg-center opacity-5 pointer-events-none" />
          
          {/* Avatar Skeleton */}
          <div className="relative shrink-0 w-56 h-56 sm:w-72 sm:h-72 rounded-full bg-tan/10 border-4 border-[#1A1511]" />

          {/* Content Area Skeleton */}
          <div className="flex-1 w-full space-y-5">
            {/* Trophy Badge */}
            <div className="h-9 w-44 bg-tan/15 rounded-full" />
            
            {/* Author Name */}
            <div className="h-12 w-64 md:w-80 bg-tan/20 rounded" />
            
            {/* Genres */}
            <div className="flex gap-2">
              <div className="h-6 w-20 bg-tan/10 rounded-full" />
              <div className="h-6 w-24 bg-tan/10 rounded-full" />
            </div>

            {/* Description */}
            <div className="space-y-2 border-l-2 border-tan/20 pl-6">
              <div className="h-4 w-full bg-tan/5 rounded" />
              <div className="h-4 w-5/6 bg-tan/5 rounded" />
              <div className="h-4 w-2/3 bg-tan/5 rounded" />
            </div>

            {/* Published / Rating Cards */}
            <div className="flex flex-wrap gap-4">
              <div className="h-16 w-36 bg-tan/10 rounded-2xl" />
              <div className="h-16 w-36 bg-tan/10 rounded-2xl" />
            </div>

            {/* Featured Works Showcase */}
            <div className="pt-6 border-t border-tan/10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="h-4 w-32 bg-tan/10 rounded" />
                <div className="flex space-x-3">
                  <div className="w-16 h-24 bg-tan/10 rounded-md" />
                  <div className="w-16 h-24 bg-tan/10 rounded-md" />
                </div>
              </div>
              <div className="h-12 w-44 bg-tan/15 rounded-xl shrink-0" />
            </div>
          </div>
        </div>

        {/* Featured Authors Section Skeleton */}
        <div className="mb-20 space-y-6">
          <div className="h-8 w-48 bg-coffee/30 rounded" />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <AuthorCardSkeleton key={i} />
            ))}
          </div>
        </div>

        {/* Search and Filters Section Skeleton */}
        <div className="bg-coffee p-5 sm:p-8 rounded-[2rem] sm:rounded-[3rem] border border-tan/20 mb-12 space-y-6">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            {/* Search */}
            <div className="h-10 w-full lg:w-1/3 bg-tan/10 rounded-full" />
            
            {/* Dropdowns */}
            <div className="flex flex-wrap gap-4 justify-end w-full lg:w-auto">
              <div className="h-10 w-44 bg-tan/10 rounded-xl" />
              <div className="h-10 w-44 bg-tan/10 rounded-xl" />
            </div>
          </div>

          {/* Genre Swiper Slider Placeholder */}
          <div className="pt-6 border-t border-tan/10 flex items-center gap-4">
            <div className="h-4 w-16 bg-tan/10 rounded" />
            <div className="flex gap-2.5 overflow-hidden">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="h-9 w-24 bg-tan/10 rounded-full shrink-0" />
              ))}
            </div>
          </div>
        </div>

        {/* Results Count Section Skeleton */}
        <div className="mb-10 h-6 w-32 bg-coffee/20 rounded" />

        {/* Authors Grid Skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {[...Array(8)].map((_, i) => (
            <AuthorCardSkeleton key={i} />
          ))}
        </div>

      </div>
    </div>
  );
};

export default AuthorsPageSkeleton;
