import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiAlertCircle, FiX } from "react-icons/fi";

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
          className="fixed top-0 left-0 right-0 z-[9999] px-4 py-1 sm:px-6 lg:px-8 bg-gradient-to-r from-amber-500/90 via-orange-500/90 to-amber-600/90 backdrop-blur-md shadow-lg border-b border-white/20"
        >
          <div className="flex flex-wrap items-center justify-between mx-auto max-w-7xl">
            <div className="flex items-center flex-1 w-0">
              <span className="flex p-2 border rounded-lg shadow-sm bg-amber-800/40 border-white/10">
                <FiAlertCircle
                  className="w-6 h-6 text-white"
                  aria-hidden="true"
                />
              </span>
              <p className="ml-3 text-sm font-medium leading-snug text-white sm:text-base">
                <span className="md:hidden">
                  Backend offline. Building an AI-based E-commerce & Social
                  platform.
                </span>
                <span className="hidden md:inline">
                  <strong>Notice:</strong> The backend is currently offline. I'm
                  continuously building an AI-based E-commerce + Social Media
                  Platform for users and authors.
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
