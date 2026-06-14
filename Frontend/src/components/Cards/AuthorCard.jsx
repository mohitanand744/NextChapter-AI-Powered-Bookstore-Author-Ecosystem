import React from "react";
import { useNavigate } from "react-router-dom";
import Ratings from "../RatingsReviews/Ratings";
import Button from "../Buttons/Button";
import { DecorativeHeader } from "../SVGs/SVGs";
import { motion } from "framer-motion";
import { useImagePreview } from "../../store/Context/ImagePreviewContext";
import { PremiumVerifiedBadge } from "../SVGs/SVGs";

const AuthorCard = ({ author, onComingSoonClick }) => {
  const navigate = useNavigate();
  const { openPreview } = useImagePreview();

  const authorImage = author?.author_image ||
    author?.author?.author_image ||
    "https://cdn.vectorstock.com/i/500p/40/53/accurate-silhouette-of-a-man-for-profile-picture-vector-14714053.jpg";
  const authorName = author?.author_name || author?.author?.author_name || "Author";

  return (
    <motion.div
      initial={{ y: 20, opacity: 0, scale: 0.67 }}
      animate={{ y: 0, opacity: 1, scale: 1 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      whileHover={{
        scale: 1.01,
        transition: { duration: 0.15 },
        boxShadow: "0 15px 40px rgba(0,0,0,0.3)",
        y: -5,
      }}
      className="relative w-full h-[280px] mx-auto overflow-hidden bg-coffee backdrop-blur-xl rounded-[2rem] border border-tan/20 group"
    >
      <div
        className="absolute inset-0 bg-[url('/images/bgDesign.jpg')] bg-cover bg-center opacity-10 pointer-events-none"
      />
      {/* Decorative Top Banner */}
      <div className="absolute top-0 left-0 w-full z-0 transition-transform duration-700 ease-in-out group-hover:scale-[1.10] origin-top">
        <DecorativeHeader />
      </div>

      <div className="relative flex flex-col items-center px-5 pt-10 h-full">
        {/* Author Avatar */}
        <div
          onClick={(e) => {
            e.stopPropagation();
            openPreview(authorImage, authorName);
          }}
          className="relative w-16 h-16 md:w-20 md:h-20 p-1 mb-2 md:mb-4 bg-tan/20 rounded-full shadow-lg z-10 transition-transform duration-500 ease-out group-hover:-translate-y-2 border border-tan/30 cursor-zoom-in"
        >
          <div className="w-full h-full overflow-hidden rounded-full">
            <img
              className="object-cover w-full h-full transition-all duration-700 grayscale-[15%] group-hover:grayscale-0 group-hover:scale-110"
              src={authorImage}
              alt={authorName}
            />
          </div>
          {/* Verified Badge */}
          <div className="absolute -bottom-1 -right-1 z-20">
            <PremiumVerifiedBadge className="w-5 h-5 md:w-6 md:h-6 drop-shadow-[0_0_8px_rgba(160,120,85,0.5)] bg-coffee rounded-full" title="Verified Author" />
          </div>
        </div>

        {/* Author Info Area */}
        <h3 className="mb-1 text-lg md:text-xl font-bold text-center text-tan line-clamp-1 px-2">
          {author?.author_name || author?.author?.author_name || "Unknown Author"}
        </h3>

        <div className="flex items-center gap-2 mb-3 text-tan">
          <Ratings ratings={author?.author_rating || author?.author?.author_rating || 5} />
        </div>

        <p className="text-[10px] md:text-xs text-center text-tan/70 line-clamp-3 transition-opacity duration-300 md:group-hover:opacity-0">
          {author?.author_description || author?.author?.author_description || "A brilliant author with captivating stories that take you on incredible journeys with every new release."}
        </p>

        {/* Floating Action Button (Revealed on Hover) */}
        <div className="absolute bottom-5 md:bottom-6 left-0 w-full px-5 md:px-6 md:opacity-0 md:translate-y-6 translate-y-3 md:group-hover:opacity-100 md:group-hover:translate-y-0 transition-all duration-500 ease-[cubic-bezier(0.175,0.885,0.32,1.275)] md:pointer-events-none md:group-hover:pointer-events-auto">
          <Button
            onClick={(e) => {
              e.stopPropagation();
              const url = `/nextChapter/author/${author?.author_id || author?.author?.author_id}`;
              if (onComingSoonClick) {
                onComingSoonClick(url);
              } else {
                navigate(url);
              }
            }}
            variant="primary"
            className="!w-full border-2 border-tan !rounded-[0.8rem] !text-[10px] md:!text-[12px] active:scale-95"
          >
            View Profile
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default AuthorCard;
