import React from "react";
import { motion } from "framer-motion";

const StatCard = ({ title, value, color, delay, icon, onClick, loading }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay }}
    onClick={onClick}
    className={`${color} text-tan rounded-xl shadow-md p-6 cursor-pointer transition-all duration-200 hover:shadow-lg relative overflow-hidden`}
  >
    <div className="absolute inset-0 bg-[url('/images/bgDesign.jpg')] bg-cover bg-center opacity-10 pointer-events-none" />
    <div className="relative z-10 flex items-start justify-between">
      <div>
        <p className="text-lg font-medium">{title}</p>
        {loading ? (
          <div className="h-8 w-10 bg-tan/20 rounded animate-pulse mt-2" />
        ) : (
          <p className="text-3xl font-bold">{value}</p>
        )}
      </div>
      <div className="flex items-center justify-center w-10 h-10 rounded-full text-tan bg-tan/10">
        {icon}
      </div>
    </div>
  </motion.div>
);

export default StatCard;
