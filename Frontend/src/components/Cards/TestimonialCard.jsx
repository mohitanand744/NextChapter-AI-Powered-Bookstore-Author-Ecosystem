import React from "react";
import { motion } from "framer-motion";
import Ratings from "../RatingsReviews/Ratings";
import { useImagePreview } from "../../store/Context/ImagePreviewContext";
import AppImage from "../Common/AppImage";

/**use als.
 * 
 * @param {Object} props
 * @param {Object} props.data - The review data { name, profile, rating, review, date, title }
 */
const TestimonialCard = ({ data }) => {
  const { name, profile, rating, review, date, title } = data;
  const { openPreview } = useImagePreview();

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
      className="relative flex flex-col w-full overflow-hidden bg-coffee border border-tan/20 group rounded-[2.5rem]"
    >
      <div
        className="absolute inset-0 bg-[url('/images/bgDesign.jpg')] bg-cover bg-center opacity-10 pointer-events-none"
      />
      <div className="flex justify-between px-8 pt-8 pb-6 items-center border-b border-tan/10 bg-gradient-to-br from-tan/5 to-transparent shrink-0">
        <div className="flex items-center gap-4 z-10 w-full relative">
          <div className="relative">
            <AppImage
              src={profile}
              alt={name}
              onClick={() => openPreview(profile, name)}
              className="object-cover border-[3px] border-tan/60 rounded-full shadow-md w-16 h-16 transition-transform duration-500 group-hover:scale-110 cursor-zoom-in"
              fallbackType="avatar"
              name={name}
            />
            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-tan rounded-full flex items-center justify-center border-2 border-coffee shadow-lg">
              <svg className="w-3 h-3 text-coffee" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
          <div className="flex-1">
            <h4 className="text-lg text-tan leading-tight">{name}</h4>
            <div className="flex items-center mt-1">
              <Ratings ratings={rating} textColor="text-orange" />
              <span className="text-[10px] ml-2 font-bold text-tan/40 uppercase tracking-widest">{date}</span>
            </div>
          </div>
        </div>

        {/* Decorative Quote Icon */}
        <div className="absolute top-6 right-8 w-16 h-16 text-tan/10 z-0 pointer-events-none group-hover:text-tan/20 transition-colors duration-500">
          <svg fill="currentColor" viewBox="0 0 24 24">
            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
          </svg>
        </div>
      </div>

      <div className="relative px-8 pt-6 pb-8 z-10">
        {title && (
          <h5 className="text-xl text-tan mb-3 italic leading-tight">"{title}"</h5>
        )}
        <p className="text-cream/80 leading-relaxed font-sans text-sm md:text-base">
          {review}
        </p>
      </div>

      {/* Aesthetic Progress bar at bottom */}
      <motion.div
        className="h-1.5 w-full mt-auto bg-gradient-to-r from-tan to-sepia"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
        style={{ transformOrigin: "left" }}
      />
    </motion.div>
  );
};

export default TestimonialCard;
