import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { motion } from "framer-motion";

function DualRangeSlider({ toggleCategory, PriceFilter, filters, setFilters }) {
  const [value, setValue] = React.useState([
    filters.minPrice,
    filters.maxPrice,
  ]); // Initial range values
  const min = 0; // Minimum value for price filter
  const max = 10000; // Maximum value for price filter

  const handleChange = (event, newValue) => {
    event.stopPropagation();
    setValue(newValue);
  };

  const handleChangeCommitted = (event, newValue) => {
    setFilters((prev) => ({
      ...prev,
      minPrice: newValue[0],
      maxPrice: newValue[1],
    }));
  };

  useEffect(() => {
    setValue([filters.minPrice, filters.maxPrice]);
  }, [filters.minPrice, filters.maxPrice]);

  const [open, setOpen] = useState(false);

  return (
    <Box sx={{ mx: "auto" }}>
      <div
        onClick={(e) => {
          e.stopPropagation();
          toggleCategory();
        }}
        className="transition-all cursor-pointer group"
      >
        <div
          className={`flex items-center justify-between w-full p-[1.28rem] ${PriceFilter ? "border-b shadow-lg border-tan/10" : ""} rounded-full hover:bg-tan/5`}
        >
          <div className="flex flex-col">
            <span className="text-sm font-bold tracking-widest uppercase text-tan/40">
              Investment Range
            </span>
            <h3 className="mt-1 font-serif text-xl transition-colors text-cream group-hover:text-tan">
              Price Filter
            </h3>
          </div>
          <motion.div
            animate={{ rotate: PriceFilter ? 180 : 0 }}
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
      <div
        onClick={(e) => e.stopPropagation()}
        className={`${
          PriceFilter ? "h-[7rem]" : "h-[0rem]"
        } overflow-hidden flex justify-center items-center flex-col transition-all duration-300 ease-in-out w-full  rounded-lg `}
      >
        <div className="w-full p-8 pt-0">
          {/* Display Min and Max Prices */}
          <div className="flex justify-between w-full">
            <h1>₹{min}</h1>
            <h1>₹{max}</h1>
          </div>

          {/* Slider Component */}
          <Slider
            getAriaLabel={() => "Price range"}
            value={value}
            onChange={handleChange}
            onChangeCommitted={handleChangeCommitted}
            valueLabelDisplay="auto"
            min={min} // Minimum price
            max={max} // Maximum price
            step={100} // Step size for the slider
            sx={{
              "& .MuiSlider-thumb": {
                color: "#D3BD9D", // tan
                "&:hover": {
                  boxShadow: "0 0 0-10px rgba(211, 189, 157, 0.1)", // tan with low opacity
                },
              },
              "& .MuiSlider-track": {
                color: "#D3BD9D", // tan
              },
              "& .MuiSlider-rail": {
                color: "#D3BD9D80", // tan with 50% opacity
              },
              "& .MuiSlider-valueLabel": {
                backgroundColor: "#D3BD9D", // tan
                color: "#5C4C49", // coffee
              },
            }}
          />
        </div>
        {/* Display Selected Range */}
        <h1 className="-mt-10 text-xs">
          <b>Selected Range</b>: ₹{value[0]} - ₹{value[1]}
        </h1>
      </div>
    </Box>
  );
}

export default DualRangeSlider;
