import React from "react";

const SubNavbarSkeleton = () => {
  return (
    <div className="sticky top-[4.8rem] z-[100] shadow-2xl flex flex-col md:flex-row -mt-16 mb-10 w-full justify-between items-center gap-4 p-4 md:p-6 rounded-2xl bg-coffee border border-tan/20 animate-pulse">
      <div className="absolute inset-0 bg-[url('/images/bgDesign.jpg')] bg-cover bg-center opacity-[0.05] pointer-events-none rounded-2xl" />

      {/* Left section: Registry Info */}
      <div className="relative z-10 flex flex-col gap-1.5 w-full md:w-auto">
        <div className="h-3.5 w-24 bg-tan/10 rounded" />
        <div className="h-4 w-28 bg-tan/15 rounded" />
      </div>

      {/* Middle decorative ornament */}
      <div className="hidden lg:flex items-center gap-3 opacity-20">
        <div className="w-12 h-[1px] bg-tan"></div>
        <div className="w-1.5 h-1.5 border border-tan rotate-45"></div>
        <div className="w-12 h-[1px] bg-tan"></div>
      </div>

      {/* Right section: Search bar & Filter */}
      <div className="relative z-10 flex items-center gap-4 w-full md:w-[25rem]">
        <div className="h-10 flex-1 bg-tan/5 rounded-full border border-tan/10" />
        <div className="h-11 w-11 bg-tan/10 rounded-2xl border border-tan/20" />
      </div>
    </div>
  );
};

export default SubNavbarSkeleton;
