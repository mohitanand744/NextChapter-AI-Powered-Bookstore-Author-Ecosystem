import React from "react";
import BookCardSkeleton from "./BookCardSkeleton";
import CategorySliderSkeleton from "./CategorySliderSkeleton";
import BannersSkeleton from "./BannersSkeleton";
import SubNavbarSkeleton from "./SubNavbarSkeleton";

const BooksPageSkeleton = () => {
  return (
    <div className="animate-pulse">
      {/* Banner Skeleton */}
      <BannersSkeleton />

      <div className="container px-4 pb-8 pt-0 mx-auto sm:px-6 lg:px-8">
        {/* SubNavbar Skeleton */}
        <SubNavbarSkeleton />

        {/* Category Slider Skeleton */}
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
};

export default BooksPageSkeleton;
