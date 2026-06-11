import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import { UserGroupIcon } from "@heroicons/react/24/solid";

const NoData = ({
  title = "No data found",
  message = "Looks like there's nothing to display at the moment",

  icon = "default", // 'default', 'search', 'user', 'heart', 'warning', 'custom'
  customIcon = null,

  showAction = false,
  actionText = "Explore More",
  actionLink = null,
  onActionClick = null,

  className = "",
  titleClassName = "text-xl",
  messageClassName = "",
  iconClassName = "",
  animateIcon = true,
  children,
}) => {
  // Icon configurations
  const getIcon = () => {
    if (customIcon) return customIcon;

    const iconProps = {
      xmlns: "http://www.w3.org/2000/svg",
      className: `w-14 h-14 ${iconClassName}`,
      fill: "none",
      viewBox: "0 0 24 24",
      stroke: "currentColor",
    };

    switch (icon) {
      case "search":
        return (
          <svg {...iconProps}>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        );

      case "user":
        return (
          <UserGroupIcon className="w-14 h-14" />
        );

      case "heart":
        return (
          <svg {...iconProps}>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
        );

      case "warning":
        return (
          <svg {...iconProps}>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z"
            />
          </svg>
        );

      case "cart":
        return (
          <svg {...iconProps}>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
        );

      default:
        return (
          <svg {...iconProps}>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
            />
          </svg>
        );
    }
  };

  const renderActionButton = () => {
    if (!showAction) return null;

    const buttonContent = (
      <button
        type="button"
        onClick={onActionClick}
        className="flex items-center gap-1 font-medium transition-colors duration-200 text-tan"
      >
        <span> {actionText}</span>
        <span aria-hidden="true" className="text-xl ">
          {" "}
          &rarr;
        </span>
      </button>
    );

    // If actionLink is provided, wrap with Link, otherwise use button alone
    if (actionLink && !onActionClick) {
      return <Link to={actionLink}>{buttonContent}</Link>;
    }

    return buttonContent;
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`flex flex-col bg-sepia mx-auto border border-tan/20 shadow-xl items-center justify-center max-w-md p-5 rounded-xl ${className} relative overflow-hidden`}
      >
        <div className="absolute inset-0 bg-[url('/images/bgDesign.jpg')] bg-cover bg-center opacity-10 pointer-events-none" />
        <div className="relative z-10 flex flex-col items-center">
          <motion.div
            className="flex items-center mb-3 justify-center p-0.5 w-12 h-12 border-[2.8px] border-tan/70 text-tan/70  rounded-full bg-tan/10"
            animate={
              animateIcon
                ? {
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, -5, 0],
                }
                : {}
            }
            transition={{
              duration: 2,
              ease: "easeInOut",
              repeat: animateIcon ? Infinity : 0,
              repeatDelay: 0.5,
            }}
          >
            {getIcon()}
          </motion.div>

          <motion.h3
            className={`mb-1 text-center font-semibold text-tan ${titleClassName}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {title}
          </motion.h3>

          <motion.p
            className={`mb-3 text-center text-tan/75 ${messageClassName}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {message}
          </motion.p>

          {/* Additional custom content */}
          {children}

          {/* Action button */}
          {showAction && (
            <motion.div
              className="flex justify-center mt-2 text-sm text-center text-gray-500"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              {renderActionButton()}
            </motion.div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default NoData;
