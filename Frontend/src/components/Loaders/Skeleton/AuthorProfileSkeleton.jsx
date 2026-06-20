import React from "react";
import { FaArrowLeft, FaStar } from "react-icons/fa";
import BookCardSkeleton from "./BookCardSkeleton";
import TestimonialCardSkeleton from "./TestimonialCardSkeleton";

const AuthorProfileSkeleton = () => {
  return (
    <div className="min-h-screen bg-tan animate-pulse">
      {/* Banner Skeleton */}
      <div className="relative w-full p-2">
        <div className="w-full h-56 md:h-96 overflow-hidden rounded-3xl bg-coffee/85 border border-tan/10 relative flex items-center justify-center">
          <div className="absolute inset-0 bg-[url('/images/bgDesign.jpg')] bg-cover bg-center opacity-5 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-b from-coffee/20 via-transparent to-coffee/40" />
        </div>

        {/* Back button placeholder */}
        <div className="absolute z-10 flex bg-tan/20 backdrop-blur-sm items-center gap-2 text-sm top-4 left-5 text-tan/40 border border-tan/10 rounded-xl px-4 py-2">
          <FaArrowLeft className="opacity-40" />
          <div className="h-3 w-8 bg-tan/10 rounded" />
        </div>
      </div>

      <div className="container px-4 mx-auto">
        <div className="relative -mt-10 md:-mt-14">
          <div className="relative px-5 pt-16 pb-12 bg-coffee border border-tan/10 shadow-2xl rounded-3xl md:pt-6">
            <div className="absolute inset-0 bg-[url('/images/bgDesign.jpg')] bg-cover bg-center opacity-5 pointer-events-none" />
            
            <div className="relative z-10">
              {/* Avatar Skeleton */}
              <div className="absolute left-0 right-0 z-10 mx-auto overflow-hidden border-4 border-tan/40 bg-coffee w-28 md:w-40 h-28 md:h-40 rounded-3xl -top-28 md:-top-30 flex items-center justify-center">
                <div className="w-full h-full bg-tan/10 rounded-[inherit]" />
              </div>

              {/* Title & Info Block */}
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div className="text-center sm:text-left space-y-2">
                  {/* Name */}
                  <div className="h-8 md:h-10 w-48 bg-tan/15 rounded mx-auto sm:mx-0" />
                  {/* Tagline */}
                  <div className="h-4 w-60 bg-tan/10 rounded mx-auto sm:mx-0" />

                  {/* Location / Website / Dates */}
                  <div className="flex flex-wrap justify-center mt-2 sm:justify-start gap-4">
                    <div className="h-4 w-28 bg-tan/5 rounded" />
                    <div className="h-4 w-32 bg-tan/5 rounded" />
                    <div className="h-4 w-36 bg-tan/5 rounded" />
                  </div>

                  {/* Genres Tags */}
                  <div className="flex flex-wrap justify-center sm:justify-start gap-1.5 mt-3">
                    {[...Array(3)].map((_, i) => (
                      <div key={i} className="h-6 w-24 bg-tan/10 rounded-full border border-tan/10" />
                    ))}
                  </div>
                </div>

                {/* Follow Button Placeholder */}
                <div className="self-center mt-5 sm:mt-10 sm:self-start h-10 w-24 bg-tan/15 rounded-xl mx-auto sm:mx-0" />
              </div>

              {/* Description Paragraph */}
              <div className="mt-6 space-y-2 border-t border-tan/15 pt-4">
                <div className="h-4 w-full bg-tan/5 rounded" />
                <div className="h-4 w-5/6 bg-tan/5 rounded" />
                <div className="h-4 w-2/3 bg-tan/5 rounded" />
              </div>

              {/* Stats Grid */}
              <div className="mt-6 pt-4 border-t border-tan/10">
                <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-y sm:divide-y-0 divide-tan/10 rounded-2xl overflow-hidden border border-tan/10 bg-tan/5">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="flex flex-col items-center justify-center gap-2 py-5 px-3">
                      <div className="w-14 h-14 mb-1 rounded-2xl bg-tan/10 border border-tan/15 flex items-center justify-center" />
                      <div className="h-5 w-10 bg-tan/15 rounded" />
                      <div className="h-3.5 w-20 bg-tan/5 rounded" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Testimonials Block */}
        <div className="mt-12 mb-4 bg-coffee p-6 rounded-3xl border border-tan/10 shadow-xl relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('/images/bgDesign.jpg')] bg-cover bg-center opacity-5 pointer-events-none" />
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <FaStar className="text-tan/30" />
                <div className="h-6 w-48 bg-tan/15 rounded" />
              </div>
              <div className="flex flex-col items-end gap-1.5">
                <div className="h-4 w-24 bg-tan/10 rounded" />
                <div className="h-3 w-16 bg-tan/5 rounded" />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(3)].map((_, i) => (
                <TestimonialCardSkeleton key={i} />
              ))}
            </div>
          </div>
        </div>

        {/* Tabs Bar */}
        <div className="flex gap-2 mt-8 bg-coffee p-1.5 rounded-2xl w-fit border border-coffee/20">
          <div className="h-10 w-24 bg-tan/10 rounded-xl" />
          <div className="h-10 w-32 bg-tan/5 rounded-xl" />
        </div>

        {/* Tab Content (Books Grid) */}
        <div className="pb-16 mt-6 space-y-4">
          <div className="flex items-center justify-between">
            <div className="h-6 w-48 bg-coffee/40 rounded animate-pulse" />
            <div className="h-6 w-24 bg-coffee/20 rounded animate-pulse" />
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {[...Array(4)].map((_, i) => (
              <BookCardSkeleton key={i} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthorProfileSkeleton;
