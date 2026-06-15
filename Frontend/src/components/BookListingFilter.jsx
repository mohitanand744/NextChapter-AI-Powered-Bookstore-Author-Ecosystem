import React, { useState } from "react";
import DualRangeSlider from "../components/Inputs/DualRangeSlider";
import Radio from "../components/Inputs/Radio";
import { AnimatePresence, motion } from "framer-motion";
import { defaultFilters } from "../Pages/AllBooks";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";

const BookListingFilter = ({
  openCategory,
  setOpenCategory,
  filters,
  setFilters,
  appliedFiltersCount,
  setShowFilters,
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const resetFilters = (e) => {
    e.stopPropagation();
    setFilters(defaultFilters);
    if (location.search) {
      navigate(location.pathname, { replace: true });
    }
  };

  const toggleCategory = (cat) => {
    setOpenCategory((prev) => {
      const newState = {
        PriceFilter: false,
        CategoryFilter: false,
        LanguageFilter: false,
        DiscountFilter: false,
        AvailabilityFilter: false,
        BindingFilter: false,
        RatingFilter: false,
      };
      newState[cat] = !prev[cat];
      return newState;
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: "100%" }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: "100%" }}
      transition={{ type: "tween", duration: 0.3, ease: "easeInOut" }}
      onClick={(e) => e.stopPropagation()}
      className={`relative flex flex-col h-screen md:max-h-[calc(100vh-14rem)] md:h-auto border border-tan/30 bg-coffee/95 backdrop-blur-3xl text-cream z-[9999] w-[85vw] sm:w-[24.5rem] overflow-hidden mt-20 md:mt-0 shadow-lg rounded-l-[3rem] md:rounded-[2.7rem]`}
    >
      <div className="absolute inset-0 bg-[url('/images/bgDesign.jpg')] bg-cover bg-center opacity-10 pointer-events-none" />

      <div className="relative flex-1 min-h-0 overflow-y-auto hideScroll">
        {/* Panel Header */}
        <div className="relative sticky backdrop-blur-md rounded-b-[3.5rem] shadow-2xl top-0 z-20 flex items-center justify-between px-8 pt-10 pb-6 border-b-2 border-coffee/70">

          <div className="absolute inset-0 bg-[url('/images/bgDesign.jpg')] bg-cover bg-center opacity-10 pointer-events-none" />
          <div>
            <motion.h2
              initial={{ opacity: 0, x: "-100%" }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: "100%" }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="pt-3 font-serif text-2xl tracking-tight md:text-3xl text-cream"
            >
              Curation Filters
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, x: "100%" }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: "100%" }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="text-sm uppercase tracking-[0.3em] text-tan/60 mt-1 font-bold"
            >
              Tailor Your Discovery
            </motion.p>
          </div>

          <motion.button
            onClick={(e) => {
              e.stopPropagation();
              setShowFilters(false);
            }}
            initial={{ x: "-100%", scale: 0 }}
            animate={{ x: 0, scale: 1 }}
            exit={{ x: "100%", scale: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="absolute top-0 md:left-4 rounded-b-[0.7rem] px-3 py-2 h-[35px] text-sm font-bold tracking-widest uppercase transition-all duration-300 border left-[1.6rem]  sm:text-sm border-tan/20 hover:bg-tan hover:text-coffee bg-tan/5"
          >
            <FaArrowLeft />
          </motion.button>

          <motion.button
            onClick={resetFilters}
            initial={{ x: "100%", scale: 0 }}
            animate={{ x: 0, scale: 1 }}
            exit={{ x: "100%", scale: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="absolute top-0 right-0 px-3 py-2 text-xs font-bold tracking-widest uppercase transition-all duration-300 border md:right-3.5 rounded-b-[1rem] sm:text-sm border-tan/20 hover:bg-tan hover:text-coffee bg-tan/5"
          >
            Reset All
          </motion.button>

          <AnimatePresence>
            {appliedFiltersCount > 0 && (
              <motion.div
                key="applied-filters-count"
                initial={{ x: "100%", scale: 0 }}
                animate={{ x: 0, scale: 1 }}
                exit={{ x: "100%", scale: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                className="absolute top-0 right-[7rem] md:right-[8.2rem] px-3 py-2 text-xs font-bold tracking-widest uppercase transition-all duration-300 border rounded-b-[1rem] sm:text-sm border-tan/20 bg-tan text-coffee"
              >
                {appliedFiltersCount} - Filters Applied
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="px-4 py-6 space-y-3">
          {/* Price Filter Section */}
          <div
            className={`bg-black/20 rounded-[2.8rem] ${openCategory.PriceFilter ? "border-b shadow-lg border-black/5" : ""} `}
          >
            <DualRangeSlider
              PriceFilter={openCategory.PriceFilter}
              toggleCategory={() => toggleCategory("PriceFilter")}
              filters={filters}
              setFilters={setFilters}
            />
          </div>
          {/* Dynamic Filter Sections */}
          {[
            {
              id: "DiscountFilter",
              title: "Savings & Offers",
              subtitle: "Price Reductions",
              options: [
                { id: "all-discounts", label: "All Curated Offers", value: "" },
                { id: "under10", label: "Seasonal (Up to 10%)", value: "0-10" },
                { id: "under20", label: "Limited (10-20%)", value: "10-20" },
                { id: "under30", label: "Exclusive (20-30%)", value: "20-30" },
                {
                  id: "over30",
                  label: "Premium Savings (30%+)",
                  value: "30-100",
                },
              ],
              key: "discount",
            },
            {
              id: "RatingFilter",
              title: "Reader Acclaim",
              subtitle: "Minimum Rating",
              options: [
                { id: "all-ratings", label: "All Reviews", value: 0 },
                { id: "4plus", label: "Exceptional (4.5+)", value: 4.5 },
                { id: "4only", label: "Highly Rated (4.0+)", value: 4 },
                { id: "3plus", label: "Recommended (3.5+)", value: 3.5 },
              ],
              key: "rating",
            },
            {
              id: "LanguageFilter",
              title: "Edition & Dialect",
              subtitle: "Available Languages",
              options: [
                { id: "Hindi", label: "Hindi Editions", value: "Hindi" },
                { id: "English", label: "English Editions", value: "English" },
              ],
              key: "language",
            },
            {
              id: "BindingFilter",
              title: "Format & Feel",
              subtitle: "Physical Binding",
              options: [
                {
                  id: "hardcover",
                  label: "Hardcover (Classic)",
                  value: "Hardcover",
                },
                {
                  id: "paperback",
                  label: "Paperback (Standard)",
                  value: "Paperback",
                },
                { id: "ebook", label: "Digital (E-Book)", value: "E-Book" },
              ],
              key: "binding",
            },
          ].map((section, index) => (
            <motion.div
              key={section.id}
              className={`${openCategory[section.id] ? "border-b shadow-lg border-black/5" : ""} bg-black/20 rounded-[2.8rem]`}
              initial={{
                opacity: 0,
                x: index % 2 === 0 ? -150 : 150,
              }}
              animate={{
                opacity: 1,
                x: 0,
              }}
              exit={{
                opacity: 0,
                x: index % 2 === 0 ? -150 : 150,
              }}
              transition={{
                duration: 0.7,
                delay: index * 0.02,
              }}
            >
              <div
                onClick={() => toggleCategory(section.id)}
                className={` transition-all cursor-pointer group`}
              >
                <div
                  className={`flex items-center justify-between w-full p-[1.28rem] ${openCategory[section.id] ? "border-b shadow-lg border-tan/10" : ""}  rounded-full  hover:bg-tan/5 `}
                >
                  <div className="flex flex-col">
                    <span className="text-sm font-bold tracking-widest uppercase text-tan/40">
                      {section.subtitle}
                    </span>
                    <h3 className="mt-1 font-serif text-xl transition-colors text-cream group-hover:text-tan">
                      {section.title}
                    </h3>
                  </div>

                  <motion.div
                    animate={{ rotate: openCategory[section.id] ? 180 : 0 }}
                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                    className="flex items-center justify-center w-10 h-10 transition-colors rounded-full bg-tan/10 group-hover:bg-tan/20"
                  >
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 12 12"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M2.5 4.5L6 8L9.5 4.5"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </motion.div>
                </div>
              </div>
              <ul
                className={`px-8 overflow-y-auto hideScroll flex flex-col gap-y-2  transition-all duration-300 ${openCategory[section.id] ? "max-h-[10rem] pt-4 pb-3" : "max-h-[0rem]"}`}
              >
                {section.options.map((opt) => (
                  <motion.li
                    key={opt.id}
                    whileHover={{ x: 6 }}
                    className="flex items-center"
                  >
                    <Radio
                      id={opt.id}
                      label={opt.label}
                      checked={filters[section.key] === opt.value}
                      onChange={() => handleFilterChange(section.key, opt.value)}
                    />
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default BookListingFilter;
