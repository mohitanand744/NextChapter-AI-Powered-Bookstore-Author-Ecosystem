import React from "react";
import { motion } from "framer-motion";

export const CopyIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-5 h-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
      />
    </svg>
  );
};

export const NoRecentOrders = () => {
  return (
    <svg
      width="120"
      height="120"
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M40 30C40 27.7909 41.7909 26 44 26H76C78.2091 26 80 27.7909 80 30V40H40V30Z"
        fill="#ffe6c1"
      />
      <path
        d="M30 40H90V100C90 105.523 85.5228 110 80 110H40C34.4772 110 30 105.523 30 100V40Z"
        fill="tan"
        stroke="#D3BD9D"
        stroke-width="2"
      />

      <path
        d="M35 30C35 27.2386 37.2386 25 40 25H45C47.7614 25 50 27.2386 50 30V35H35V30Z"
        fill="#D3BD9D"
      />
      <path
        d="M70 30C70 27.2386 72.2386 25 75 25H80C82.7614 25 85 27.2386 85 30V35H70V30Z"
        fill="#D3BD9D"
      />

      <circle
        cx="60"
        cy="65"
        r="20"
        fill="none"
        stroke="#D3BD9D"
        stroke-width="2"
        stroke-dasharray="3 3"
      />
      <path
        d="M60 55V75M50 65H70"
        stroke="#D3BD9D"
        stroke-width="2"
        stroke-linecap="round"
      />
    </svg>
  );
};

export const BagSvg = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-5 h-5"
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path
        fillRule="evenodd"
        d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z"
        clipRule="evenodd"
      />
    </svg>
  );
};

export const HearthSvg = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-5 h-5"
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path
        fillRule="evenodd"
        d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
        clipRule="evenodd"
      />
    </svg>
  );
};

export const DecorativeHeader = ({ height = "h-28" }) => {
  return (
    <div className={`relative ${height} bg-coffee text-tan rounded-t-2xl overflow-hidden`}>
      {/* Subtle SVG Pattern Background */}
      <svg
        className="absolute inset-0 w-full h-full opacity-10"
        preserveAspectRatio="none"
        viewBox="0 0 100 100"
      >
        <pattern
          id="pattern-circles"
          x="0"
          y="0"
          width="20"
          height="20"
          patternUnits="userSpaceOnUse"
        >
          <circle cx="10" cy="10" r="1.5" fill="#D3BD9D" />
        </pattern>
        <rect
          x="0"
          y="0"
          width="100"
          height="100"
          fill="url(#pattern-circles)"
        />
      </svg>

      {/* Wavy SVG Divider */}
      <svg
        className="absolute bottom-1 w-full"
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
      >
        <path
          d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
          opacity=".25"
          fill="#D3BD9D"
        />
        <path
          d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
          opacity=".5"
          fill="#D3BD9D"
        />
        <path
          d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
          fill="#D3BD9D"
        />
      </svg>

      {/* Decorative Corner Elements */}
      <svg
        className="absolute top-2 left-2 w-8 h-8 "
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
      >
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
      </svg>
      <svg
        className="absolute top-2 right-2 w-8 h-8 "
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
      >
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
      </svg>

      {/* Floating Book Icons */}
      <svg
        className="absolute top-1/4 left-1/4 w-6 h-6  animate-float"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>

      <svg
        className="absolute top-1/3 right-1/4 w-5 h-5  animate-float animation-delay-100"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    </div>
  );
};

export const CalendarSvg = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-4 h-4"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={3}
        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
      />
    </svg>
  );
};

export const PencilSvg = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-5 h-5 mr-2"
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
    </svg>
  );
};

export const EyesSvg = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-5 h-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
      />
    </svg>
  );
};

export const BookSvg = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-coffee"
    >
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
    </svg>
  );
};



export const PremiumVerifiedBadge = ({ className = "w-6 h-6" }) => (
  <svg
    className={`drop-shadow-[0_0_8px_rgba(160,120,85,0.5)] bg-coffee rounded-full ${className}`}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <linearGradient id="premium-gradient" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#D3BD9D" />
        <stop offset="50%" stopColor="#A07855" />
        <stop offset="100%" stopColor="#4A3B32" />
      </linearGradient>
    </defs>
    <path
      d="M10.5213 2.62368C11.3147 1.75255 12.6853 1.75255 13.4787 2.62368L14.4989 3.74391C14.8998 4.18418 15.4761 4.42288 16.071 4.39508L17.5845 4.32435C18.7315 4.27078 19.7292 5.26846 19.6757 6.41554L19.6049 7.92905C19.5771 8.52388 19.8158 9.10016 20.2561 9.50111L21.3763 10.5213C22.2475 11.3147 22.2475 12.6853 21.3763 13.4787L20.2561 14.4989C19.8158 14.8998 19.5771 15.4761 19.6049 16.071L19.6757 17.5845C19.7292 18.7315 18.7315 19.7292 17.5845 19.6757L16.071 19.6049C15.4761 19.5771 14.8998 19.8158 14.4989 20.2561L13.4787 21.3763C12.6853 22.2475 11.3147 22.2475 10.5213 21.3763L9.50111 20.2561C9.10016 19.8158 8.52388 19.5771 7.92905 19.6049L6.41554 19.6757C5.26846 19.7292 4.27078 18.7315 4.32435 17.5845L4.39508 16.071C4.42288 15.4761 4.18418 14.8998 3.74391 14.4989L2.62368 13.4787C1.75255 12.6853 1.75255 11.3147 2.62368 10.5213L3.74391 9.50111C4.18418 9.10016 4.42288 8.52388 4.39508 7.92905L4.32435 6.41554C4.27078 5.26846 5.26846 4.27078 6.41554 4.32435L7.92905 4.39508C8.52388 4.42288 9.10016 4.18418 9.50111 3.74391L10.5213 2.62368Z"
      fill="url(#premium-gradient)"
    />
    <path
      d="M10.5 15.5L7 12L8.5 10.5L10.5 12.5L15.5 7.5L17 9L10.5 15.5Z"
      fill="#FAF3E0"
    />
  </svg>
);

export const SuccessCheckmarkSvg = ({ className = "w-10 h-10" }) => {
  return (
    <motion.svg
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: 1, opacity: 1 }}
      transition={{
        duration: 0.5,
        ease: "easeInOut",
      }}
      className={`${className} text-success`}
      viewBox="0 0 52 52"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <motion.circle
        cx="26"
        cy="26"
        r="25"
        stroke="currentColor"
        strokeWidth="2"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      />
      <motion.path
        d="M14.1 27.2l7.1 7.2 16.7-16.8"
        stroke="currentColor"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{
          delay: 0.4,
          duration: 0.4,
          ease: "easeInOut",
        }}
      />
    </motion.svg>
  );
};
