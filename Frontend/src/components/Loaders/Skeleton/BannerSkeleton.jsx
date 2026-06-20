import React from "react";

const BannerSkeleton = () => {
  return (
    <div className="relative w-full aspect-[2.2/1] sm:aspect-[2.6/1] md:aspect-[3.1/1] lg:aspect-[3.6/1] xl:aspect-[4/1] bg-coffee border border-tan/10 rounded-2xl overflow-hidden animate-pulse flex items-center">
      {/* Background design overlay */}
      <div className="absolute inset-0 bg-[url('/images/bgDesign.jpg')] bg-cover bg-center opacity-5 pointer-events-none" />
      
      {/* Gradient effect */}
      <div className="absolute bottom-0 left-0 w-full h-2/5 bg-gradient-to-t from-tan to-transparent z-10" />

      {/* Main Content Layout simulating banner texts */}
      <div className="relative z-10 w-full px-6 sm:px-12 md:px-20 lg:px-28 grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
        <div className="space-y-3 sm:space-y-4">
          {/* Tagline / Subtitle */}
          <div className="h-4 w-24 sm:w-32 bg-tan/20 rounded" />
          
          {/* Main Title */}
          <div className="space-y-2">
            <div className="h-6 sm:h-8 w-3/4 sm:w-2/3 bg-tan/15 rounded" />
            <div className="h-6 sm:h-8 w-1/2 bg-tan/15 rounded" />
          </div>
          
          {/* Description */}
          <div className="space-y-1.5 hidden sm:block">
            <div className="h-3 w-5/6 bg-tan/5 rounded" />
            <div className="h-3 w-4/5 bg-tan/5 rounded" />
          </div>
          
          {/* Button */}
          <div className="pt-2">
            <div className="h-9 sm:h-10 w-28 sm:w-32 bg-tan/15 rounded-xl" />
          </div>
        </div>

        {/* Right side graphical placeholder (e.g. simulated book stack outline) */}
        <div className="hidden md:flex justify-end pr-8">
          <div className="relative w-36 h-48 bg-tan/10 rounded-lg flex items-center justify-center border border-tan/10 shadow-lg">
            <div className="w-24 h-32 bg-tan/5 rounded" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BannerSkeleton;
