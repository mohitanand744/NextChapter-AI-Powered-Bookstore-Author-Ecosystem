// src/components/atoms/Button/Button.jsx
import React from "react";
import { motion } from "framer-motion";

const Button = ({
  children,
  type = "button",
  variant = "primary",
  className = "",
  isLoading = false,
  isUppercase = false,
  ...props
}) => {
  const baseClasses =
    "px-4 py-2 font-semibold rounded-xl transition duration-200 active:scale-95 focus:outline-none";

  const variantClasses = {
    primary: "bg-coffee border-2 border-tan text-tan hover:bg-sepia",
    secondary: "bg-tan text-coffee border-2 border-transparent hover:bg-cream",
    outline: "border-2 border-tan text-tan bg-transparent hover:!bg-sepia",
    "outline-tan": "border-2 border-tan/20 text-tan bg-tan/5 hover:bg-tan/10",
    ghost: "bg-transparent text-coffee hover:bg-sepia hover:text-tan",
    glass: "bg-transparent text-coffee hover:bg-sepia/10 hover:text-tan",
  };

  const typographyClasses = `${isUppercase ? "uppercase tracking-widest text-xs" : ""}`;

  return (
    <motion.button
      type={type}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`${baseClasses} ${variantClasses[variant]} ${typographyClasses} ${className} ${isLoading || props.disabled
        ? "opacity-50 cursor-not-allowed"
        : ""
        }`}
      disabled={isLoading}
      {...props}
    >
      {isLoading ? (
        <div className="flex items-center justify-center text-nowrap">
          <svg
            className="w-4 h-4 mr-2 -ml-1 text-tan animate-spin"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          Almost there...
        </div>
      ) : (
        children
      )}
    </motion.button>
  );
};

export default Button;


