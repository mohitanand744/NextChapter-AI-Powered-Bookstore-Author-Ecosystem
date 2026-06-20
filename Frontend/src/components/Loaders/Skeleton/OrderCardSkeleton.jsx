import React from "react";
import { FiCalendar, FiCreditCard, FiHash, FiChevronDown, FiPackage } from "react-icons/fi";

const OrderCardSkeleton = () => {
  return (
    <div
      className="relative overflow-hidden bg-coffee text-tan border border-tan/20 rounded-2xl shadow-xl animate-pulse"
    >
      {/* Background design overlay */}
      <div className="absolute inset-0 bg-[url('/images/bgDesign.jpg')] bg-cover bg-center opacity-5 pointer-events-none" />

      {/* Order Summary (Header) */}
      <div className="relative z-10 flex items-start sm:items-center justify-between p-4 sm:p-5 backdrop-blur-sm rounded-xl gap-4">
        <div className="grid grid-cols-2 gap-y-4 gap-x-2 sm:flex sm:flex-row sm:flex-wrap sm:gap-8 flex-1">
          {/* Order Date Skeleton */}
          <div className="flex items-start gap-2 sm:gap-3">
            <div className="p-1.5 sm:p-2 rounded-lg bg-tan/5 text-tan shrink-0">
              <FiCalendar className="opacity-30" />
            </div>
            <div className="space-y-1">
              <div className="h-3 w-16 bg-tan/10 rounded" />
              <div className="h-4 w-24 bg-tan/20 rounded" />
            </div>
          </div>

          {/* Payment Method Skeleton */}
          <div className="flex items-start gap-2 sm:gap-3">
            <div className="p-1.5 sm:p-2 rounded-lg bg-tan/5 text-tan shrink-0">
              <FiCreditCard className="opacity-30" />
            </div>
            <div className="space-y-1">
              <div className="h-3 w-12 bg-tan/10 rounded" />
              <div className="h-4 w-20 bg-tan/20 rounded" />
            </div>
          </div>

          {/* Order Total Skeleton */}
          <div className="flex items-start gap-2 sm:gap-3">
            <div className="p-1 px-2.5 sm:px-3 rounded-lg text-tan bg-tan/5 shrink-0 font-medium opacity-30">
              ₹
            </div>
            <div className="space-y-1">
              <div className="h-3 w-10 bg-tan/10 rounded" />
              <div className="flex items-center gap-1">
                <div className="h-4 w-12 bg-tan/20 rounded" />
                <div className="h-3.5 w-14 bg-tan/5 rounded" />
              </div>
            </div>
          </div>

          {/* Order Number Skeleton */}
          <div className="flex items-start gap-2 sm:gap-3">
            <div className="p-1.5 sm:p-2 rounded-lg bg-tan/5 text-tan shrink-0">
              <FiHash className="opacity-30" />
            </div>
            <div className="space-y-1">
              <div className="h-3 w-14 bg-tan/10 rounded" />
              <div className="h-4 w-28 bg-tan/20 rounded" />
            </div>
          </div>
        </div>

        {/* Status and Chevron Skeleton */}
        <div className="flex flex-col sm:flex-row items-end sm:items-center gap-2 sm:gap-4 shrink-0">
          <div className="hidden sm:block">
            <div className="h-7 w-24 bg-tan/15 rounded-full" />
            <div className="h-3 w-28 bg-tan/5 rounded mt-1.5" />
          </div>
          <div className="p-2 rounded-lg bg-tan/5 text-tan">
            <FiChevronDown className="opacity-30" />
          </div>
        </div>
      </div>

      {/* Simulated Opened Order Item Section */}
      <div className="relative z-10 px-5 py-4 border-t border-tan/10 bg-tan/5">
        <div className="space-y-4">
          <div className="flex flex-row gap-3 sm:gap-4 p-3 sm:p-4 border rounded-lg border-tan/5 bg-tan/5">
            {/* Book Cover Placeholder */}
            <div className="shrink-0 w-16 h-20 sm:w-20 sm:h-24 bg-tan/10 rounded-lg" />
            
            {/* Book Details Placeholder */}
            <div className="flex flex-col flex-1 space-y-2">
              <div className="h-4 w-1/3 bg-tan/15 rounded" />
              <div className="h-3 w-full bg-tan/5 rounded" />
              <div className="h-3 w-5/6 bg-tan/5 rounded" />
              
              <div className="flex items-center justify-between mt-2 pt-1">
                <div className="flex items-center gap-2">
                  <div className="h-6 w-20 bg-tan/10 rounded-full" />
                  <div className="h-4.5 w-24 bg-tan/5 rounded" />
                </div>
                <div className="h-4 w-12 bg-tan/10 rounded" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderCardSkeleton;
