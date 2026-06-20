import React from "react";
import { MdOutlineMail } from "react-icons/md";
import { FiPhone } from "react-icons/fi";
import { FaRegAddressCard, FaRegHeart } from "react-icons/fa";
import { RiLogoutCircleLine } from "react-icons/ri";
import { DecorativeHeader, BagSvg, HearthSvg } from "../../SVGs/SVGs";
import BookCardSkeleton from "./BookCardSkeleton";

const UserProfileSkeleton = () => {
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
            
            {/* Profile Header Decoration */}
            <div className="relative z-10 opacity-40">
              <DecorativeHeader />
            </div>

            {/* Profile Image Circle */}
            <div className="flex relative z-10 justify-center mt-[-4.8rem]">
              <div className="w-32 h-32 rounded-full border-4 border-tan/30 bg-tan/10" />
            </div>

            {/* Profile Content */}
            <div className="relative z-10 px-6 pt-2 pb-6">
              {/* Name & Join Date */}
              <div className="mb-6 text-center space-y-2">
                <div className="h-6 w-36 bg-tan/15 rounded mx-auto" />
                <div className="h-4 w-44 bg-tan/10 rounded mx-auto" />
              </div>

              {/* Profile Details List */}
              <div className="space-y-5">
                {[
                  { icon: <MdOutlineMail className="text-xl text-tan/40" />, label: "Email" },
                  { icon: <FiPhone className="text-lg text-tan/40" />, label: "Phone" },
                  { icon: <FaRegAddressCard className="text-lg text-tan/40" />, label: "Address" },
                  { icon: <FaRegHeart className="text-lg text-tan/40" />, label: "Favorite Genres" }
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 border rounded-lg bg-tan/5 backdrop-blur-sm border-tan/15">
                    <span className="flex-shrink-0 text-xl">{item.icon}</span>
                    <div className="flex-1 min-w-0 space-y-2">
                      <div className="h-3 w-16 bg-cream/20 rounded" />
                      <div className="h-4 w-3/4 bg-tan/10 rounded" />
                    </div>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center w-full gap-4 mt-6">
                <div className="h-10 flex-1 bg-tan/15 rounded-lg" />
                <div className="h-10 flex-1 bg-red-800/10 rounded-lg flex items-center justify-center gap-1">
                  <RiLogoutCircleLine className="text-red-800/20" />
                  <div className="h-3 w-12 bg-red-800/10 rounded" />
                </div>
              </div>
            </div>
          </div>

          {/* Right Column Skeleton */}
          <div className="flex-1 h-full space-y-6">
            
            {/* Stats Cards */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {[
                { title: "Orders", icon: <BagSvg className="opacity-30" /> },
                { title: "Wishlist", icon: <HearthSvg className="opacity-30" /> }
              ].map((stat, i) => (
                <div key={i} className="bg-coffee text-tan rounded-xl shadow-md p-6 border border-tan/10 relative overflow-hidden">
                  <div className="absolute inset-0 bg-[url('/images/bgDesign.jpg')] bg-cover bg-center opacity-5 pointer-events-none" />
                  <div className="relative z-10 flex items-start justify-between">
                    <div className="space-y-2">
                      <div className="h-4 w-16 bg-tan/15 rounded" />
                      <div className="h-8 w-10 bg-tan/20 rounded" />
                    </div>
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-tan/5">
                      {stat.icon}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop Tabs Navigation */}
            <div className="hidden md:flex border-b-[3px] border-sepia/10 gap-4 pb-2">
              <div className="h-8 w-28 bg-coffee/20 rounded" />
              <div className="h-8 w-28 bg-coffee/10 rounded" />
              <div className="h-8 w-28 bg-coffee/10 rounded" />
            </div>

            {/* Mobile Bottom Navigation */}
            <div className="relative z-10 flex justify-around py-2 overflow-hidden border bg-coffee rounded-3xl border-tan/10 md:hidden">
              <div className="h-8 w-20 bg-tan/10 rounded-lg" />
              <div className="h-8 w-20 bg-tan/5 rounded-lg" />
              <div className="h-8 w-20 bg-tan/5 rounded-lg" />
            </div>

            {/* Tab Content Box */}
            <div className="relative p-6 overflow-hidden border bg-coffee rounded-2xl border-tan/10 min-h-[340px]">
              <div className="absolute inset-0 bg-[url('/images/bgDesign.jpg')] bg-cover bg-center opacity-5 pointer-events-none" />
              <div className="relative z-10 grid grid-cols-1 gap-4 md:grid-cols-2">
                {[...Array(2)].map((_, index) => (
                  <div key={index} className="relative overflow-hidden border shadow-md bg-coffee rounded-xl border-tan/10 flex flex-col sm:flex-row">
                    {/* Item Image skeleton */}
                    <div className="relative flex items-center justify-center h-40 border-r border-tan/10 rounded-r-2xl sm:w-1/4 sm:h-auto p-4">
                      <div className="w-16 h-24 bg-tan/10 rounded-lg" />
                    </div>
                    {/* Item Content skeleton */}
                    <div className="flex flex-col p-4 sm:w-3/4 space-y-3">
                      <div className="flex justify-between items-start">
                        <div className="h-5 w-28 bg-tan/15 rounded" />
                        <div className="h-3 w-16 bg-tan/10 rounded" />
                      </div>
                      <div className="space-y-1.5 flex-1">
                        <div className="h-3 w-full bg-tan/5 rounded" />
                        <div className="h-3 w-5/6 bg-tan/5 rounded" />
                      </div>
                      <div className="flex justify-end mt-auto">
                        <div className="w-10 h-10 rounded-full bg-tan/5" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* Recommended Books Section */}
        <div className="container pt-4 mt-10 border-t border-tan/10">
          <div className="mb-6 space-y-2">
            <div className="h-6 w-48 bg-coffee/30 rounded" />
            <div className="h-4 w-72 bg-coffee/20 rounded" />
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
};

export default UserProfileSkeleton;
