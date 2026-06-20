import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
import Search from "../SearchBars/Search";
import NoData from "../EmptyData/noData";

const CustomSelect = (
  {
    options,
    value,
    onChange,
    error,
    className,
    placeholder = "Select an option",
    multiple = false,
  },
  ref,
) => {
  const [isOpen, setIsOpen] = useState(false);
  const [filterQuery, setFilterQuery] = useState("");
  const selectRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const selectedOption = multiple
    ? options.filter((option) => value?.includes(option.value))
    : options.find((option) => option.value === value);

  console.log("selectedOption", selectedOption);

  return (
    <div className="relative w-full" ref={selectRef}>
      <motion.button
        ref={ref}
        type="button"
        className={`w-full h-[42px] px-4 py-3 relative rounded-lg border bg-tan text-sepia flex items-center justify-between ${error
          ? "border-red-error focus:ring-error"
          : "border-sepia focus:ring-coffee focus:border-coffee"
          } shadow-sm focus:outline-none focus:ring-2 ${className}`}
        onClick={() => setIsOpen(!isOpen)}
        whileTap={{ scale: 0.98 }}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span
          className={`block truncate text-[13px] ${error ? "text-red-error" : selectedOption ? "text-cream" : "text-cream/80"}`}
        >
          {multiple
            ? `${selectedOption?.length} selected`
            : selectedOption?.label || <span className="">{placeholder}</span>}
        </span>

        {!error && (
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
            className="mt-1 text-cream"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </motion.div>
        )}
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.ul
            className={`absolute  z-[999] w-full pb-2 px-2 mt-1 hideScroll overflow-auto bg-sepia backdrop-blur-xl text-tan rounded-2xl max-h-60 `}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            role="listbox"
          >
            {options.length > 8 && (
              <div className="mb-4 bg-sepia pt-2 mb-2 sticky top-0 z-10 border-b border-b-tan/30 rounded-xl">
                <Search
                  styling="w-full !block"
                  placeholder="Filter options..."
                  onChange={(val) => setFilterQuery(val)}
                />
              </div>
            )}

            {(() => {
              const filteredOptions = options.filter((option) =>
                option.label.toLowerCase().includes(filterQuery.toLowerCase()),
              );

              if (filteredOptions.length === 0) {
                return (
                  <div className="p-2 pt-1">
                    <NoData
                      title="No results found"
                      icon="search"
                      message="Try a different term"
                      showAction={false}
                      className="max-h-44"
                      titleClassName="text-lg"
                      messageClassName="text-[11px]"
                    />
                  </div>
                );
              }

              return filteredOptions.map((option, idx) => (
                <motion.li
                  key={option.value}
                  initial={{ opacity: 0, scale: 0.8, y: -10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 0.1, delay: 0.1 * idx }}
                  //whileHover={{ scale: 1.03}}
                  className={`px-4 py-1 border-b-2 hover:!scale-[1.03]  transition-all duration-500 rounded-2xl rounded-b-[3rem] relative cursor-pointer shadow-lg ${multiple
                    ? value?.includes(option.value)
                      ? "border-b-[3px] border-tan/50 bg-tan/10"
                      : "hover:bg-tan/5 border-tan/30"
                    : value === option.value
                      ? "border-b-[3px] border-tan/50 bg-tan/10"
                      : "hover:bg-tan/5 border-tan/30"
                    }`}
                  onClick={() => {
                    if (multiple) {
                      const currentValue = Array.isArray(value) ? value : [];
                      if (currentValue.includes(option.value)) {
                        onChange(
                          currentValue.filter((val) => val !== option.value),
                        );
                      } else {
                        onChange([...currentValue, option.value]);
                      }
                    } else {
                      onChange(option.value);
                      setIsOpen(false);
                    }
                  }}
                  role="option"
                  aria-selected={value === option.value}
                >
                  <span className="text-nowrap text-[13px]">
                    {option.label}
                  </span>

                  {(multiple
                    ? value?.includes(option.value)
                    : value === option.value) && (
                      <span className="w-4 text-[12.4px] text-tan h-4 absolute top-2.5 right-1 bg-coffee/80 flex justify-center items-center rounded-full">
                        ✓
                      </span>
                    )}
                </motion.li>
              ));
            })()}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
};

export default React.forwardRef(CustomSelect);
