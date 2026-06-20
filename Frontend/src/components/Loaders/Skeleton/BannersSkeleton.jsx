import React from "react";

const BannersSkeleton = () => {
  return (
    <section className="relative px-4 py-24 overflow-hidden text-center sm:px-6 lg:px-8 border-b border-tan/10 bg-coffee/60 animate-pulse">
      <div className="absolute inset-0 bg-[url('/images/bgDesign.jpg')] bg-cover bg-center opacity-5 pointer-events-none" />

      {/* Breadcrumb Placeholder */}
      <div className="absolute top-8 left-8 z-20">
        <div className="h-4 w-32 bg-tan/10 rounded" />
      </div>

      <div className="relative max-w-4xl mx-auto space-y-5">
        {/* Title first & Title second */}
        <div className="h-10 sm:h-12 w-64 md:w-80 bg-tan/15 rounded mx-auto" />

        {/* Description */}
        <div className="space-y-2">
          <div className="h-4 w-96 bg-tan/5 rounded mx-auto hidden sm:block" />
          <div className="h-4 w-80 bg-tan/5 rounded mx-auto" />
        </div>

        {/* Icon */}
        <div className="w-16 h-16 bg-tan/10 rounded-full mx-auto" />
      </div>
    </section>
  );
};

export default BannersSkeleton;
