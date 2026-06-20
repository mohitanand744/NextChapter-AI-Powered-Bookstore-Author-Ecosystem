import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiSparkles } from "react-icons/hi2";
import { GiFeather } from "react-icons/gi";

import { useComingSoon } from "../../store/Context/ComingSoonContext";

const rotatingTexts = [
  "Consult The Archivist",
  "Meet Nexty, Your AI Librarian",
  "Unlock Your Next Story",
  "Seek Wisdom Among Books",
  "Let Nexty Guide Your Journey",
  "Every Reader Has A Next Chapter",
  "Discover Tales Meant For You",
  "Find Books Beyond Bestsellers",
  "Stories Chosen For Your Soul",
  "Enter The Library Of Possibilities",
];
const NextChapterAIBtn = ({ className = "hidden md:block w-[16rem]" }) => {
  const { openComingSoon } = useComingSoon();
  const [textIndex, setTextIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTextIndex((prev) => (prev + 1) % rotatingTexts.length);
    }, 3000); // Rotate every 4 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`relative ${className} group`}>
      <motion.button
        onClick={() => openComingSoon({
          title: "Nexty — The Intelligent Librarian of NextChapter",
          badge: "THE ARCHIVIST OF NEXTCHAPTER",
          message: "Discover books through conversations, moods, interests, and curiosity. Whether you're looking for your next adventure, a hidden gem, or a book that matches how you feel today, Nexty will help you find the perfect next chapter.",
          features: [
            "AI-powered book discovery",
            "Personalized recommendations",
            "Mood & genre exploration",
            "Book insights and reading guidance"
          ],
          logo: "/images/nextyLOGO.png",
          footer: "Coming Soon to NextChapter."
        })}
        whileHover="hover"
        whileTap={{ scale: 0.98 }}
        className="relative flex items-center justify-between w-full h-11 px-4 py-2 transition-all duration-300 border shadow-md bg-coffee/70 border-tan/30 rounded-full overflow-hidden group-hover:border-yellow-600/50 group-hover:shadow-[0_0_15px_rgba(217,160,91,0.2)]"
      >
        {/* Animated background glow on hover */}
        <motion.div
          variants={{
            hover: { opacity: 1, scale: 1.2 },
          }}
          initial={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,_rgba(217,160,91,0.15)_0%,_transparent_70%)] pointer-events-none"
        />

        {/* Left Icon (Quill/Feather) */}
        <div className="relative z-10 flex items-center justify-center w-3.5 h-6 text-tan group-hover:text-yellow-500 transition-colors duration-300">
          <motion.div
            variants={{
              hover: { rotate: [0, -10, 10, -5, 5, 0] },
            }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            <GiFeather className="text-2xl" />
          </motion.div>
        </div>

        {/* Rotating Text Content */}
        <div className="relative z-10 flex-1 h-full mx-2 overflow-hidden flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.p
              key={textIndex}
              initial={{ y: 60, opacity: 0, filter: "blur(3px)", scale: 0.50 }}
              animate={{ y: 0, opacity: 1, filter: "blur(0px)", scale: 1 }}
              exit={{ y: -60, opacity: 0, filter: "blur(3px)", scale: 0.50 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="text-[0.9rem] md:text-[0.8rem] font-medium tracking-wide text-tan whitespace-nowrap group-hover:text-cream transition-colors duration-300"
            >
              {rotatingTexts[textIndex]}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* Right Icon (Sparkles) */}
        <div className="relative z-10 flex items-center justify-center w-3.5 h-6 text-yellow-600 group-hover:text-yellow-400 transition-colors duration-300">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.7, 1, 0.7],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <HiSparkles className="text-md" />
          </motion.div>
        </div>
      </motion.button>
    </div>
  );
};

export default NextChapterAIBtn;
