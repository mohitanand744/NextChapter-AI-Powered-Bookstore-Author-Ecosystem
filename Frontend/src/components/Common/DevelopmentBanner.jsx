import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiX } from "react-icons/fi";
import { FaLaptopCode } from "react-icons/fa6";

const DevelopmentBanner = () => {
  const [isVisible, setIsVisible] = useState(true);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
          className="fixed top-0 left-0 right-0 z-[9999] px-4 py-1.5 sm:px-6 lg:px-8 bg-gradient-to-r from-coffee via-sepia to-coffee backdrop-blur-md shadow-lg border-b border-tan/20"
        >
          <div className="flex flex-wrap items-center justify-between mx-auto max-w-7xl">
            <div className="flex items-center flex-1 w-0">
              <span className="flex p-2 border rounded-lg shadow-sm bg-tan/10 border-tan/20">
                <FaLaptopCode
                  className="w-5 h-5 text-tan"
                  aria-hidden="true"
                />
              </span>
              <p className="ml-3 text-sm font-medium leading-snug text-cream sm:text-base">
                <span className="md:hidden">
                  <strong className="text-tan">Work in Progress:</strong> Continuously working on this site to build a next-gen AI platform.
                </span>
                <span className="hidden md:inline">
                  <strong className="text-tan">✨ Work in Progress:</strong> I am <span className="underline decoration-wavy decoration-tan/50 underline-offset-4">continuously working on this site</span>, crafting an innovative AI-powered E-commerce & Social Media ecosystem.
                </span>
              </p>
            </div>
            <div className="flex-shrink-0 order-2 sm:order-3 sm:ml-3">
              <button
                type="button"
                className="flex p-2 -mr-1 transition-colors duration-200 rounded-md hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white sm:-mr-2"
                onClick={() => setIsVisible(false)}
              >
                <span className="sr-only">Dismiss</span>
                <FiX className="w-5 h-5 text-white" aria-hidden="true" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default DevelopmentBanner;
