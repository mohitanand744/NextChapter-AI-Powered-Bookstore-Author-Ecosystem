import React from "react";
import { AiOutlineStar } from "react-icons/ai";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";

const Ratings = ({ ratings, textColor = "text-tan" }) => {
  const rating = Array.from({ length: 5 }, (_, i) => {
    let pointNumbers = i + 0.5;

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
    <div className={`flex items-center text-[14px] sm:text-[17px] ${textColor}`}>
      {rating} <span className="text-tan text-[1.1rem] font-semibold ml-1">{ratings}</span>
    </div>
  );
};

export default Ratings;


