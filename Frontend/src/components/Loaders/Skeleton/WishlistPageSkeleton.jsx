import React from "react";
import BookCardSkeleton from "./BookCardSkeleton";
import BannersSkeleton from "./BannersSkeleton";
import SubNavbarSkeleton from "./SubNavbarSkeleton";

const WishlistPageSkeleton = () => {
  return (
    <div className="animate-pulse min-h-screen">
      {/* Banner Skeleton */}
      <BannersSkeleton />

      <div className="container px-4 pb-8 pt-0 mx-auto sm:px-6 lg:px-8">
        {/* SubNavbar Skeleton */}
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
};

export default WishlistPageSkeleton;
