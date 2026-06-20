import React from "react";
import OrderCardSkeleton from "./OrderCardSkeleton";
import BannersSkeleton from "./BannersSkeleton";
import SubNavbarSkeleton from "./SubNavbarSkeleton";

const OrdersPageSkeleton = () => {
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

        {/* Orders List Skeleton */}
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <OrderCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrdersPageSkeleton;
