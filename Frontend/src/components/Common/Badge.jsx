import React from "react";

const Badge = ({ text, icon, variant = "primary", className = "", textFontSize }) => {
  const baseClasses = "inline-flex items-center justify-center gap-1.5 py-0.5 px-2.5 rounded-full font-bold uppercase tracking-wider shadow-sm transition-all duration-300";

  const variants = {
    primary: "text-cream bg-coffee border border-tan/30 text-[9px] shadow-[0_2px_4px_rgba(0,0,0,0.15)]",
    secondary: "text-coffee bg-tan border border-tan/30 text-[10px]",
    outline: "text-tan bg-tan/15 border border-tan/20 text-[10px]",
  };

  const variantClasses = variants[variant] || variants.primary;

  const renderIcon = () => {
    if (!icon) return null;
    if (React.isValidElement(icon)) {
      return React.cloneElement(icon, { className: "w-3.5 h-3.5 flex-shrink-0" });
    }
    const IconComponent = icon;
    return <IconComponent className="w-3.5 h-3.5 flex-shrink-0" />;
  };

  return (
    <span className={`${baseClasses} ${variantClasses} ${className}`}>
      {renderIcon()}
      <span className={textFontSize}>{text}</span>
    </span>
  );
};

export default Badge;
