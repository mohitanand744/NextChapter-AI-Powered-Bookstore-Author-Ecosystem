import React from "react";
import { motion } from "framer-motion";
import AppImage from "../Common/AppImage";
import { EyesSvg } from "../SVGs/SVGs";

export const ActivityItemSkeleton = () => (
  <div className="relative overflow-hidden border shadow-md bg-coffee rounded-xl border-tan/10 flex flex-col sm:flex-row animate-pulse">
    <div className="relative flex items-center justify-center h-40 border-r border-tan/10 rounded-r-2xl sm:w-1/4 sm:h-auto p-4">
      <div className="w-16 h-24 bg-tan/10 rounded-lg" />
    </div>
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
);

export const ActivityItem = ({
  title,
  date,
  description,
  status,
  delay,
  imageUrl,
}) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, type: "spring", stiffness: 300 }}
    whileHover={{ y: -3, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
    className="relative overflow-hidden transition-all duration-200 border shadow-md bg-coffee text-tan rounded-xl border-tan/20 hover:shadow-lg"
  >
    <div className="absolute inset-0 bg-[url('/images/bgDesign.jpg')] bg-cover bg-center opacity-10 pointer-events-none" />
    <div className="relative z-10 flex flex-col sm:flex-row">
      {/* Product Image */}
      <div className="relative flex items-center justify-center h-40 border-r rounded-r-2xl sm:w-1/4 sm:h-auto">
        <AppImage
          src={
            imageUrl ||
            "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcQwm3sKSSsqSSqtZNE_Funcouaw8XHA885zkmvnK3MUH8RxvbPpyN72hQuAMbkzP-0Dm9xpJu9JVODLh4I8p9bWbAYlDoZZWscNXeRf58yOO0jV6qffaEtq8g"
          }
          alt={title}
          className="object-contain w-full h-[9rem] p-4"
          fallbackType="book"
        />
        {status && (
          <span
            className={`absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-medium ${status === "Delivered"
              ? "bg-green-100 text-green-800"
              : status === "Shipped"
                ? "bg-blue-100 text-blue-800"
                : "bg-yellow-100 text-yellow-800"
              }`}
          >
            {status}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col p-4 sm:w-3/4">
        <div className="flex items-start justify-between mb-2">
          <h4 className="text-lg font-semibold text-tan">{title}</h4>
          <span className="text-sm text-tan opacity-70">{date}</span>
        </div>

        <p className="mb-4 text-tan opacity-90 line-clamp-2">{description}</p>

        <div className="flex items-center justify-end mt-auto">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div
              type="button"
              className="bg-coffee w-10 h-10 rounded-[4rem] font-medium flex justify-center items-center cursor-pointer"
            >
              <EyesSvg />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  </motion.div>
);
