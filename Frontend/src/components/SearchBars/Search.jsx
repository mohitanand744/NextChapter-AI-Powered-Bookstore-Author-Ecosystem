import { useNavigate, useLocation } from "react-router-dom";
import { FaSearch, FaUsers } from "react-icons/fa";
import React, { useEffect, useState, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiSearch, FiX } from "react-icons/fi";
import AppImage from "../Common/AppImage";
import useDebounce from "../../Hooks/useDebounce";
import { booksApis } from "../../utils/apis/booksApis";

const Search = ({
  styling = "hidden md:block w-[15rem]",
  inputStyles = "rounded-full py-2 bg-coffee/20 text-tan",
  suggestionsStyles = "mt-1 rounded-2xl",
  onSearch,
  onChange,
  placeholder = "Search books here... ",
  value,
  nav,
  enableSuggestions = false,
  suggestions = [],
}) => {
  const [searchTerm, setSearchTerm] = useState(value || "");
  const [isBlinking, setIsBlinking] = useState(false);
  const [dynamicSuggestions, setDynamicSuggestions] = useState([]);
  const [isFocused, setIsFocused] = useState(false);
  const blurTimeoutRef = useRef(null);
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setSearchTerm(value || "");
  }, [value]);

  useEffect(() => {
    if (enableSuggestions && debouncedSearchTerm.trim()) {
      booksApis
        .getSuggestions(debouncedSearchTerm)
        .then((res) => {
          if (res && res.data) {
            setDynamicSuggestions(res.data);
          } else if (Array.isArray(res)) {
            setDynamicSuggestions(res);
          }
        })
        .catch((err) => {
          console.error("Error fetching suggestions:", err);
          setDynamicSuggestions([]);
        });
    } else {
      setDynamicSuggestions([]);
    }
  }, [debouncedSearchTerm, enableSuggestions]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setSearchTerm(params.get("search") || "");
  }, [location.search]);

  useEffect(() => {
    if (
      searchTerm.trim() === "" &&
      !onSearch &&
      !onChange &&
      location.search.includes("search=")
    ) {
      const timeoutId = setTimeout(() => {
        handleSearch();
      }, 500);

      return () => clearTimeout(timeoutId);
    }
  }, [searchTerm, onSearch, onChange, location.search]);

  useEffect(() => {
    if (!searchTerm.trim() || onSearch || onChange) {
      setIsBlinking(false);
      return;
    }

    const timeoutId = setTimeout(() => {
      setIsBlinking(true);
    }, 500);

    return () => {
      clearTimeout(timeoutId);
      setIsBlinking(false);
    };
  }, [searchTerm, onSearch, onChange]);

  useEffect(() => {
    return () => {
      if (blurTimeoutRef.current) {
        clearTimeout(blurTimeoutRef.current);
      }
    };
  }, []);

  const handleSearch = () => {
    if (onSearch) {
      onSearch(searchTerm);
      return;
    }
    if (onChange && !onSearch) {
      return;
    }

    if (nav) {
      if (searchTerm.trim()) {
        navigate(`/nextChapter/books?search=${encodeURIComponent(searchTerm)}`);
      } else {
        navigate(`/nextChapter/books`);
      }
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleHighlightedChar = (word, searchTerm) => {
    return word?.split("")?.map((l, i) =>
      searchTerm?.toLowerCase()?.trim().includes(l?.toLowerCase()) ? (
        <span key={i} className="text-coffee bg-tan/20 px-0.5 font-bold">
          {l}
        </span>
      ) : (
        l
      ),
    );
  };

  // Replaced local filtering with dynamic API suggestions
  const filteredSuggestions = dynamicSuggestions || [];

  return (
    <div className={`relative ${styling} searchbar group`}>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);

          if (onChange) onChange(e.target.value);
        }}
        onFocus={() => {
          if (blurTimeoutRef.current) {
            clearTimeout(blurTimeoutRef.current);
          }
          setIsFocused(true);
        }}
        onBlur={() => {
          blurTimeoutRef.current = setTimeout(() => {
            setIsFocused(false);
          }, 200);
        }}
        onKeyDown={handleKeyDown}
        className={`${inputStyles} w-full px-3 text-tan/80 placeholder:font-semibold placeholder:!text-tan/60 focus:outline-none`}
        placeholder={placeholder}
      />

      <AnimatePresence>
        {enableSuggestions &&
          isFocused &&
          searchTerm.trim() &&
          filteredSuggestions.length > 0 && (
            <motion.div
              initial={{ scale: 0, y: -160, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0, y: -60, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className={`absolute max-h-[20.4rem] z-[9999] ${suggestionsStyles}  overflow-y-scroll scrollbar-hide top-full left-0 bg-sepia shadow-lg w-full`}
            >
              {filteredSuggestions?.map((suggestion, index) => (
                <motion.div
                  key={index}
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -60, opacity: 0 }}
                  transition={{ duration: 0.1 }}
                  whileHover={{ scale: 0.9 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    navigate(
                      `/nextChapter/book/${suggestion?.title?.replaceAll(" ", "-")}`,
                    );
                    setSearchTerm("");
                  }}
                  className="relative flex items-center gap-3 px-4 py-2 transition-all duration-300 border-b shadow-lg cursor-pointer hover:rounded-t-2xl border-coffee/30 rounded-b-2xl hover:bg-coffee/20 hover:scale-95"
                >
                  <div className="w-8 h-10 rounded-3xl">
                    <AppImage
                      className="object-cover w-full rounded-2xl h-full"
                      src={suggestion?.cover_image}
                      alt=""
                      fallbackType="book"
                    />
                  </div>
                  <div className="">
                    <h3 className="w-40 truncate text-tan">
                      {handleHighlightedChar(suggestion?.title, searchTerm)}
                    </h3>
                    <div className="flex items-center gap-3">
                      {suggestion?.book_price && (
                        <p className="line-through text-tan/70">
                          ₹{suggestion?.book_price}
                        </p>
                      )}
                      {suggestion?.book_price && (
                        <p className="text-tan/70">
                          ₹{suggestion?.discounted_price}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="absolute bottom-0 right-0 flex items-center justify-center p-2 text-[10px] text-white rounded-tl-full rounded-br-lg h-7 bg-orange">
                    {suggestion?.DISCOUNT}% Off
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
      </AnimatePresence>

      <div className="absolute -translate-y-1/2 h-fit right-1 top-1/2">
        <motion.div
          onClick={handleSearch}
          animate={
            isBlinking
              ? {
                scale: [1, 1.1, 0.7, 1],
              }
              : { scale: 1 }
          }
          transition={
            isBlinking
              ? {
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }
              : { duration: 0.2 }
          }
          className="grid transition rounded-full cursor-pointer group-hover:text-cream active:scale-75 text-tan bg-coffee h-7 w-7 place-items-center"
        >
          <FaSearch className="block text-sm leading-none" />
        </motion.div>
      </div>
    </div>
  );
};

export default Search;
