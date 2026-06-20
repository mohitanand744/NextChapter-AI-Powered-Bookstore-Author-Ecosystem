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
  const containerRef = React.useRef(null);
  const [dimensions, setDimensions] = React.useState({ width: 0, height: 0 });

  React.useEffect(() => {
    if (!containerRef.current) return;

    const observer = new ResizeObserver((entries) => {
      for (let entry of entries) {
        // Measure parent container to know how much space we have
        const parent = containerRef.current.parentElement;
        if (parent) {
          const rect = parent.getBoundingClientRect();
          setDimensions({
            width: rect.width || entry.contentRect.width,
            height: rect.height || entry.contentRect.height,
          });
        } else {
          setDimensions({
            width: entry.contentRect.width,
            height: entry.contentRect.height,
          });
        }
      }
    });

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  // Determine size mode based on observed dimensions
  const width = dimensions.width || 400;
  const height = dimensions.height || 300;

  const isVeryCompactHeight = height > 0 && height < 150;
  const isVeryCompactWidth = width > 0 && width < 220;
  const isCompactHeight = height > 0 && height < 240;
  const isCompactWidth = width > 0 && width < 340;

  const sizeMode =
    (isVeryCompactHeight || isVeryCompactWidth) ? "mini" :
      (isCompactHeight || isCompactWidth) ? "compact" :
        "normal";

  // Icon configurations
  const getIcon = (mode) => {
    if (customIcon) return customIcon;

    const iconSizeClass =
      mode === "mini" ? "w-5 h-5" :
        mode === "compact" ? "w-8 h-8" :
          "w-14 h-14";

    const iconProps = {
      xmlns: "http://www.w3.org/2000/svg",
      className: `${iconSizeClass} ${iconClassName}`,
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
          <UserGroupIcon className={`${iconSizeClass} ${iconClassName}`} />
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
        className={`group flex items-center gap-2 font-serif tracking-widest uppercase transition-all duration-300 text-tan hover:text-tan/80 ${sizeMode === "compact" || sizeMode === "mini" ? "text-[11px]" : "text-sm"
          }`}
      >
        <span className="relative pb-0.5">
          {actionText}
          <span className="absolute left-0 bottom-0 w-full h-[1px] bg-tan/40 transform scale-x-100 transition-transform duration-300 group-hover:scale-x-0 origin-right"></span>
          <span className="absolute left-0 bottom-0 w-full h-[1px] bg-tan transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100 origin-left"></span>
        </span>
        <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">
          &rarr;
        </span>
      </button>
    );

    if (actionLink && !onActionClick) {
      return <Link to={actionLink}>{buttonContent}</Link>;
    }

    return buttonContent;
  };

  // Determine scaling layout parameters
  const containerClasses =
    sizeMode === "mini" ? "w-full h-full max-w-full max-h-full p-2.5 rounded-2xl border-double border-2" :
      sizeMode === "compact" ? "w-full h-full max-w-full max-h-full p-4 rounded-3xl border-double border-2" :
        `w-full max-w-md p-8 sm:p-10 rounded-[2rem] border-double border-4 min-h-[300px]`;

  const iconContainerClass =
    sizeMode === "mini" ? "w-8 h-8 border-2 mb-1" :
      sizeMode === "compact" ? "w-11 h-11 border-2 mb-2" :
        "w-16 h-16 border-4 mb-4";

  const dividerOpacityClass =
    sizeMode === "mini" ? "mb-1 opacity-30" :
      sizeMode === "compact" ? "mb-2 opacity-50" :
        "mb-3 opacity-60";

  return (
    <AnimatePresence>
      <motion.div
        ref={containerRef}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`flex flex-col bg-coffee mx-auto border-tan/20 shadow-2xl items-center justify-center relative overflow-hidden ${containerClasses} ${className}`}
        style={{ boxSizing: "border-box" }}
      >
        <div className="absolute inset-0 bg-[url('/images/bgDesign.jpg')] bg-cover bg-center opacity-[0.15] mix-blend-overlay pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center w-full h-full  justify-center">
          <motion.div
            className={`flex items-center justify-center border-double border-tan/60 text-tan/80 rounded-full bg-tan/5 shadow-inner flex-shrink-0 ${iconContainerClass}`}
            animate={
              animateIcon
                ? {
                  scale: [1, 1.1, 1],
                  rotate: [0, 3, -3, 0],
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
            {getIcon(sizeMode)}
          </motion.div>

          <motion.h3
            className={`text-center font-serif tracking-wide font-bold text-tan ${sizeMode === "mini"
              ? "text-xs mb-0.5"
              : sizeMode === "compact"
                ? "text-sm mb-1"
                : `mb-2 ${titleClassName}`
              }`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {title}
          </motion.h3>

          {/* Vintage Divider */}
          <motion.div
            className={`flex items-center justify-center w-full ${dividerOpacityClass}`}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: sizeMode === "mini" ? 0.75 : sizeMode === "compact" ? 0.9 : 1 }}
            transition={{ delay: 0.25 }}
          >
            <div className="w-8 h-[1px] bg-gradient-to-r from-transparent to-tan/50"></div>
            <div className="w-1.5 h-1.5 mx-2 rotate-45 border border-tan/50"></div>
            <div className="w-8 h-[1px] bg-gradient-to-l from-transparent to-tan/50"></div>
          </motion.div>

          <motion.p
            className={`text-center font-serif italic tracking-wide text-tan/70 ${sizeMode === "mini"
              ? "text-[11px] leading-tight mb-1"
              : sizeMode === "compact"
                ? "text-[14px] leading-snug mb-2"
                : `text-sm mb-5 ${messageClassName}`
              }`}
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
              className={`flex justify-center text-center text-gray-500 ${sizeMode === "mini" ? "mt-1" : sizeMode === "compact" ? "mt-1.5" : "mt-2"
                }`}
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
