import React from "react";

const CategorySliderSkeleton = () => {
  return (
    <div className="container relative mx-auto">
      <div className="flex gap-4 overflow-hidden py-2 mt-5 rounded-2xl bg-cream/5 animate-pulse">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="relative w-32 h-40 md:w-36 md:h-44 overflow-hidden rounded-2xl bg-coffee border border-tan/10 flex items-end p-3 flex-shrink-0"
          >
            <div className="absolute inset-0 bg-[url('/images/bgDesign.jpg')] bg-cover bg-center opacity-5 pointer-events-none" />
            <div className="w-full space-y-1.5 z-10">
              <div className="h-4 w-20 bg-tan/15 rounded" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategorySliderSkeleton;
