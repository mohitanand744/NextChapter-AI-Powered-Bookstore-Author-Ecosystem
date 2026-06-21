import React from "react";
import BannersSkeleton from "./BannersSkeleton";
import SubNavbarSkeleton from "./SubNavbarSkeleton";
import CategorySliderSkeleton from "./CategorySliderSkeleton";
import BookCardSkeleton from "./BookCardSkeleton";
import OrderCardSkeleton from "./OrderCardSkeleton";
import AuthorCardSkeleton from "./AuthorCardSkeleton";
import TestimonialCardSkeleton from "./TestimonialCardSkeleton";
import BookDetailsSkeleton from "./BookDetailsSkeleton";

const ListingPageSkeleton = ({ page }) => {
  if (page === "bookDetail") {
    return <BookDetailsSkeleton />;
  }

  if (page === "books") {
    return (
      <div className="animate-pulse bg-tan min-h-screen">
        <BannersSkeleton />
        <div className="container px-4 pb-8 pt-0 mx-auto sm:px-6 lg:px-8">
          <SubNavbarSkeleton />
          <CategorySliderSkeleton />
          
          {/* Section Heading Skeleton */}
          <div className="!py-2 !pt-10 !mb-6 space-y-2.5">
            <div className="h-7 w-48 bg-coffee/40 rounded" />
            <div className="h-3.5 w-96 bg-coffee/20 rounded" />
          </div>

          {/* Books Grid Skeleton */}
          <div className="grid grid-cols-12 gap-3 my-10">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="col-span-12 sm:col-span-6 lg:col-span-4 xl:col-span-3">
                <BookCardSkeleton />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (page === "orders") {
    return (
      <div className="animate-pulse bg-tan min-h-screen">
        <BannersSkeleton />
        <div className="container px-4 pb-8 pt-0 mx-auto sm:px-6 lg:px-8">
          <SubNavbarSkeleton />

          {/* Section Heading Skeleton */}
          <div className="!py-2 !mb-6 space-y-2.5">
            <div className="h-7 w-48 bg-coffee/40 rounded" />
            <div className="h-3.5 w-96 bg-coffee/20 rounded" />
          </div>

          {/* Orders List Skeleton */}
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <OrderCardSkeleton key={i} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (page === "wishlist") {
    return (
      <div className="animate-pulse bg-tan min-h-screen">
        <BannersSkeleton />
        <div className="container px-4 pb-8 pt-0 mx-auto sm:px-6 lg:px-8">
          <SubNavbarSkeleton />

          {/* Section Heading Skeleton */}
          <div className="!py-2 !mb-6 space-y-2.5">
            <div className="h-7 w-48 bg-coffee/40 rounded" />
            <div className="h-3.5 w-96 bg-coffee/20 rounded" />
          </div>

          {/* Books Grid Skeleton */}
          <div className="grid grid-cols-1 gap-6 pb-6 md:grid-cols-2 lg:grid-cols-4">
            {[...Array(4)].map((_, i) => (
              <BookCardSkeleton key={i} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (page === "authors") {
    return (
      <div className="animate-pulse bg-tan min-h-screen">
        <BannersSkeleton />
        <div className="container mx-auto px-4 py-8">
          {/* Author of the Month Spotlight Skeleton */}
          <div className="mb-20 relative overflow-hidden rounded-[2.5rem] sm:rounded-[3rem] bg-coffee p-8 sm:p-12 border border-tan/20 flex flex-col xl:flex-row items-center gap-12">
            <div className="absolute inset-0 bg-[url('/images/bgDesign.jpg')] bg-cover bg-center opacity-5 pointer-events-none" />
            <div className="relative shrink-0 w-56 h-56 sm:w-72 sm:h-72 rounded-full bg-tan/10 border-4 border-[#1A1511]" />
            <div className="flex-1 w-full space-y-5">
              <div className="h-9 w-44 bg-tan/15 rounded-full" />
              <div className="h-12 w-64 md:w-80 bg-tan/20 rounded" />
              <div className="flex gap-2">
                <div className="h-6 w-20 bg-tan/10 rounded-full" />
                <div className="h-6 w-24 bg-tan/10 rounded-full" />
              </div>
              <div className="space-y-2 border-l-2 border-tan/20 pl-6">
                <div className="h-4 w-full bg-tan/5 rounded" />
                <div className="h-4 w-5/6 bg-tan/5 rounded" />
                <div className="h-4 w-2/3 bg-tan/5 rounded" />
              </div>
              <div className="flex flex-wrap gap-4">
                <div className="h-16 w-36 bg-tan/10 rounded-2xl" />
                <div className="h-16 w-36 bg-tan/10 rounded-2xl" />
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
          <div className="relative z-10 -mt-16 mb-12">
            <div className="bg-coffee p-5 sm:p-8 rounded-[2rem] sm:rounded-[3rem] border border-tan/20 relative overflow-hidden">
              <div className="absolute inset-0 bg-[url('/images/bgDesign.jpg')] bg-cover bg-center opacity-5 pointer-events-none" />
              <div className="relative z-10 flex flex-col lg:flex-row gap-6 sm:gap-8 items-center justify-between">
                {/* Search input skeleton */}
                <div className="w-full lg:w-1/3 h-11 bg-tan/10 rounded-full" />
                {/* Filters dropdowns skeleton */}
                <div className="flex flex-wrap items-center gap-4 sm:gap-6 w-full lg:w-auto justify-center lg:justify-end">
                  <div className="h-10 w-full sm:w-[14rem] bg-tan/10 rounded-xl" />
                  <div className="h-10 w-full sm:w-[14rem] bg-tan/10 rounded-xl" />
                </div>
              </div>
              {/* Genres slider skeleton */}
              <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-tan/10 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
                <div className="h-4 w-16 bg-tan/20 rounded" />
                <div className="flex gap-2.5 overflow-hidden w-full">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="h-10 w-24 bg-tan/10 rounded-full shrink-0" />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Results Count Section Skeleton */}
          <div className="mb-10 w-fit px-6">
            <div className="h-8 w-44 bg-coffee/30 rounded" />
          </div>

          {/* Authors Grid Skeleton */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {[...Array(8)].map((_, i) => (
              <AuthorCardSkeleton key={i} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (page === "profile") {
    return (
      <div className="relative min-h-screen px-4 py-8 bg-tan animate-pulse">
        <div className="container mx-auto">
          {/* Header Skeleton */}
          <div className="flex flex-col items-start justify-between mb-8 md:flex-row md:items-center">
            <div className="flex-1 w-full max-w-[400px] mb-4 md:mb-0">
              <div className="h-10 w-48 bg-coffee/30 rounded-lg" />
            </div>
            <div className="flex flex-wrap justify-center gap-3 sm:justify-start">
              <div className="h-11 w-32 bg-coffee/30 rounded-lg" />
              <div className="h-11 w-36 bg-coffee/30 rounded-lg" />
            </div>
          </div>

          {/* Main Content Skeleton */}
          <div className="flex flex-col gap-6 lg:flex-row">
            {/* Profile Card Skeleton */}
            <div className="relative w-full overflow-hidden border shadow-xl lg:w-1/3 bg-coffee rounded-2xl h-fit border-tan/20">
              <div className="absolute inset-0 bg-[url('/images/bgDesign.jpg')] bg-cover bg-center opacity-5 pointer-events-none" />
              
              {/* Profile Image Circle */}
              <div className="flex justify-center mt-6">
                <div className="w-32 h-32 rounded-full border-4 border-tan/30 bg-tan/10" />
              </div>

              {/* Profile Content */}
              <div className="relative z-10 px-6 pt-2 pb-6">
                <div className="mb-6 text-center space-y-2">
                  <div className="h-6 w-36 bg-tan/15 rounded mx-auto" />
                  <div className="h-4 w-44 bg-tan/10 rounded mx-auto" />
                </div>

                {/* Profile Details List */}
                <div className="space-y-5">
                  {[...Array(4)].map((_, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 border rounded-lg bg-tan/5 border-tan/15">
                      <div className="flex-1 min-w-0 space-y-2">
                        <div className="h-3 w-16 bg-cream/20 rounded" />
                        <div className="h-4 w-3/4 bg-tan/10 rounded" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column Skeleton */}
            <div className="flex-1 h-full space-y-6">
              {/* Stats Cards */}
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {[...Array(2)].map((_, i) => (
                  <div key={i} className="bg-coffee text-tan rounded-xl shadow-md p-6 border border-tan/10 relative overflow-hidden">
                    <div className="absolute inset-0 bg-[url('/images/bgDesign.jpg')] bg-cover bg-center opacity-5 pointer-events-none" />
                    <div className="relative z-10 space-y-2">
                      <div className="h-4 w-16 bg-tan/15 rounded" />
                      <div className="h-8 w-10 bg-tan/20 rounded" />
                    </div>
                  </div>
                ))}
              </div>

              {/* Tab Content Box */}
              <div className="relative p-6 overflow-hidden border bg-coffee rounded-2xl border-tan/10 min-h-[340px]">
                <div className="absolute inset-0 bg-[url('/images/bgDesign.jpg')] bg-cover bg-center opacity-5 pointer-events-none" />
                <div className="relative z-10 grid grid-cols-1 gap-4 md:grid-cols-2">
                  {[...Array(2)].map((_, index) => (
                    <div key={index} className="relative overflow-hidden border shadow-md bg-coffee rounded-xl border-tan/10 flex flex-col sm:flex-row p-4 gap-4">
                      <div className="w-16 h-24 bg-tan/10 rounded-lg shrink-0" />
                      <div className="flex flex-col flex-1 space-y-3">
                        <div className="h-5 w-28 bg-tan/15 rounded" />
                        <div className="space-y-1.5 flex-1">
                          <div className="h-3 w-full bg-tan/5 rounded" />
                          <div className="h-3 w-5/6 bg-tan/5 rounded" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Recommended for You Section Skeleton */}
          <div className="container pt-4 mt-10 border-t border-tan/10">
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
        </div>
      </div>
    );
  }

  if (page === "authorProfile") {
    return (
      <div className="animate-pulse bg-tan min-h-screen">
        {/* Cover Banner Skeleton */}
        <div className="relative w-full p-2">
          <div className="w-full h-56 md:h-96 overflow-hidden rounded-3xl bg-coffee/40 shadow-2xl relative" />
          {/* Back button skeleton */}
          <div className="absolute z-10 w-20 h-9 bg-tan/20 rounded-lg top-4 left-5" />
        </div>
        <div className="container px-4 mx-auto">
          <div className="relative -mt-10 md:-mt-14">
            <div className="relative px-5 pt-16 pb-12 bg-coffee border border-tan/10 shadow-2xl rounded-3xl md:pt-6">
              <div className="absolute left-0 right-0 z-10 mx-auto overflow-hidden border-4 border-tan shadow-2xl -top-28 md:-top-30 w-28 md:w-40 h-28 md:h-40 rounded-3xl bg-tan/10" />
              
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between pt-10">
                <div className="text-center sm:text-left space-y-2">
                  <div className="h-8 w-48 bg-tan/20 rounded mx-auto sm:mx-0" />
                  <div className="h-4 w-64 bg-tan/10 rounded mx-auto sm:mx-0" />
                  <div className="h-3 w-80 bg-tan/5 rounded mt-2 mx-auto sm:mx-0" />
                  {/* Genre tags skeleton */}
                  <div className="flex flex-wrap justify-center sm:justify-start gap-1.5 mt-3">
                    {[...Array(3)].map((_, i) => (
                      <div key={i} className="h-5 w-24 bg-tan/10 rounded-full border border-tan/10" />
                    ))}
                  </div>
                </div>
                {/* Follow button skeleton */}
                <div className="h-10 w-28 bg-tan/20 rounded self-center mt-5 sm:mt-10 sm:self-start shrink-0" />
              </div>
              
              {/* Bio description skeleton */}
              <div className="space-y-2 mt-6 border-t border-tan/10 pt-4">
                <div className="h-4 w-full bg-tan/10 rounded" />
                <div className="h-4 w-5/6 bg-tan/10 rounded" />
                <div className="h-4 w-2/3 bg-tan/10 rounded" />
              </div>

              {/* Stats Row Skeleton */}
              <div className="mt-5 pt-4 border-t border-tan/10">
                <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-y sm:divide-y-0 divide-tan/10 rounded-2xl overflow-hidden border border-tan/10 bg-tan/5 shadow-inner">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="flex flex-col items-center justify-center gap-1.5 py-5 px-3">
                      <div className="w-16 h-16 mb-1 rounded-2xl bg-tan/10 border border-tan/20" />
                      <div className="h-6 w-12 bg-tan/20 rounded" />
                      <div className="h-3 w-20 bg-tan/10 rounded" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Testimonials Section Skeleton */}
          <div className="mt-12 mb-4 bg-coffee p-6 rounded-3xl border border-tan/10 shadow-xl relative">
            <div className="absolute inset-0 bg-[url('/images/bgDesign.jpg')] bg-cover bg-center opacity-5 pointer-events-none" />
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-6">
                <div className="h-6 w-48 bg-tan/20 rounded" />
                <div className="h-6 w-24 bg-tan/15 rounded" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(3)].map((_, i) => (
                  <TestimonialCardSkeleton key={i} />
                ))}
              </div>
            </div>
          </div>

          {/* Tabs Skeleton */}
          <div className="flex gap-2 mt-8 bg-coffee p-1.5 rounded-2xl w-fit border border-coffee/20">
            <div className="h-10 w-24 bg-tan/15 rounded-xl" />
            <div className="h-10 w-32 bg-tan/10 rounded-xl" />
          </div>

          {/* Books Tab Content Skeleton */}
          <div className="pb-16 mt-6">
            <div className="flex items-center justify-between mb-5">
              <div className="h-6 w-48 bg-coffee/30 rounded" />
              <div className="h-6 w-28 bg-coffee/20 rounded" />
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
  }

  // Default Fallback: Simple Banner + SubNavbar Skeleton
  return (
    <div className="min-h-screen bg-tan animate-pulse">
      <BannersSkeleton />
      <div className="container px-4 pb-8 pt-0 mx-auto sm:px-6 lg:px-8">
        <SubNavbarSkeleton />
      </div>
    </div>
  );
};

export default ListingPageSkeleton;
