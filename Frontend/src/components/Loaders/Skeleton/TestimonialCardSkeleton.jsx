import React from "react";

const TestimonialCardSkeleton = () => {
  return (
    <div
      className="relative flex flex-col w-full overflow-hidden bg-coffee border border-tan/20 rounded-[2.5rem] animate-pulse"
    >
      {/* Background design overlay */}
      <div
        className="absolute inset-0 bg-[url('/images/bgDesign.jpg')] bg-cover bg-center opacity-5 pointer-events-none"
      />
      
      {/* Header Area */}
      <div className="flex justify-between px-8 pt-8 pb-6 items-center border-b border-tan/10 bg-gradient-to-br from-tan/5 to-transparent shrink-0">
        <div className="flex items-center gap-4 z-10 w-full relative">
          <div className="relative">
            {/* Avatar Skeleton */}
            <div className="border-[3px] border-tan/40 rounded-full w-16 h-16 bg-tan/10 flex items-center justify-center">
              <div className="w-full h-full rounded-full bg-tan/5" />
            </div>
            
            {/* Badge Skeleton */}
            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-tan/20 rounded-full border-2 border-coffee flex items-center justify-center shadow-lg" />
          </div>

          <div className="flex-1 space-y-2">
            {/* Name Skeleton */}
            <div className="h-5 w-32 bg-tan/15 rounded" />
            
            {/* Rating and Date Skeleton */}
            <div className="flex items-center gap-2">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="w-3.5 h-3.5 bg-tan/10 rounded-full" />
                ))}
              </div>
              <div className="h-3 w-12 bg-tan/5 rounded" />
            </div>
          </div>
        </div>

        {/* Decorative Quote Icon Placeholder */}
        <div className="absolute top-6 right-8 w-16 h-16 text-tan/5 z-0 pointer-events-none">
          <svg fill="currentColor" viewBox="0 0 24 24">
            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
          </svg>
        </div>
      </div>

      {/* Review Content Area */}
      <div className="relative px-8 pt-6 pb-8 z-10 space-y-2.5">
        {/* Title skeleton */}
        <div className="h-5 w-1/2 bg-tan/10 rounded italic" />
        
        {/* Review body paragraphs */}
        <div className="h-4 w-full bg-tan/5 rounded" />
        <div className="h-4 w-11/12 bg-tan/5 rounded" />
        <div className="h-4 w-3/4 bg-tan/5 rounded" />
      </div>

      {/* Bottom Aesthetic Progress Bar */}
      <div className="h-1.5 w-full mt-auto bg-gradient-to-r from-tan/20 to-sepia/20" />
    </div>
  );
};

export default TestimonialCardSkeleton;
