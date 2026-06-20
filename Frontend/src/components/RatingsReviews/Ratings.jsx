import React from "react";
import { AiOutlineStar } from "react-icons/ai";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";

const Ratings = ({ ratings, textColor = "text-tan", onChange, isClickable = false }) => {
  const rating = Array.from({ length: 5 }, (_, i) => {
    let pointNumbers = i + 0.5;

    if (isClickable && onChange) {
      return (
        <button
          type="button"
          key={i}
          onClick={() => onChange(i + 1)}
          className={`transition-all hover:scale-125 ${textColor} focus:outline-none`}
        >
          {ratings >= i + 1 ? (
            <FaStar className="text-[1.2rem] sm:text-[1.4rem]" />
          ) : ratings >= pointNumbers ? (
            <FaStarHalfAlt className="text-[1.2rem] sm:text-[1.4rem]" />
          ) : (
            <AiOutlineStar className="text-[1.2rem] sm:text-[1.4rem]" />
          )}
        </button>
      );
    }

    return (
      <span key={i} className={textColor}>
        {ratings >= i + 1 ? (
          <FaStar />
        ) : ratings >= pointNumbers ? (
          <FaStarHalfAlt />
        ) : (
          <AiOutlineStar className="text-[1.1rem] mt-[0.2rem]" />
        )}
      </span>
    );
  });

  return (
    <div className={`flex items-center text-[14px] sm:text-[17px] ${textColor} gap-0.5`}>
      {rating} 
      {!isClickable && <span className="text-tan text-[1.1rem] font-semibold ml-1">{ratings}</span>}
    </div>
  );
};

export default Ratings;


