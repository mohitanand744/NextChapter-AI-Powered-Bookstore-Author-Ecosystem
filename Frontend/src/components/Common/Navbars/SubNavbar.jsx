import React from "react";
import BackButton from "../../Buttons/BackButton";
import Search from "../../SearchBars/Search";

const SubNavbar = ({
  backLabel = "Back",
  backTo = -1,
  showBackButton = true,
  registryLabel,
  registryCount,
  searchTerm,
  setSearchTerm,
  searchPlaceholder = "Search...",
  searchStyling = "",
  enableSuggestions = false,
  suggestions = [],
  onSelectSuggestion,
  extraActions = null,
  className = "",
}) => {
  return (
    <div className={`sticky top-[4.8rem] z-[100] shadow-2xl flex flex-col md:flex-row -mt-16 mb-10 w-full justify-between items-center gap-4 p-4 md:p-6 rounded-2xl bg-coffee/95 backdrop-blur-md border border-tan/20 ${className}`}>
      {/* Background design overlay */}
      <div className="absolute inset-0 bg-[url('/images/bgDesign.jpg')] bg-cover bg-center opacity-[0.05] pointer-events-none rounded-2xl" />

      {/* Left section: Back Button & Registry Info */}
      <div className="relative z-10 flex items-center gap-4 w-full md:w-auto justify-between md:justify-start">
        {showBackButton && <BackButton label={backLabel} to={backTo} />}
        {registryLabel && (
          <div className={`hidden sm:flex flex-col ${showBackButton ? "border-l border-tan/20 pl-4" : ""}`}>
            <span className="text-[13px] uppercase tracking-[0.2em] text-tan/60 font-bold">
              {registryLabel}
            </span>
            <span className="text-sm text-tan font-semibold">
              {registryCount}
            </span>
          </div>
        )}
      </div>

      {/* Middle decorative ornament */}
      <div className="hidden lg:flex items-center gap-3 opacity-30">
        <div className="w-12 h-[1px] bg-tan"></div>
        <div className="w-1.5 h-1.5 border border-tan rotate-45"></div>
        <div className="w-12 h-[1px] bg-tan"></div>
      </div>

      {/* Right section: Search bar & optional filter buttons */}
      <div className="relative z-10 flex items-center gap-4 w-full md:w-[25rem]">
        <div className="flex-1">
          <Search
            styling={`w-full bg-coffee/40 hover:bg-coffee/60 focus-within:bg-coffee/70 border border-tan/20 focus-within:border-tan/50 rounded-full transition-all duration-300 ${searchStyling}`}
            inputStyles="rounded-full py-2.5 pl-5 pr-12 bg-transparent text-tan placeholder:text-tan/40"
            placeholder={searchPlaceholder}
            onChange={setSearchTerm}
            onSearch={setSearchTerm}
            value={searchTerm}
            enableSuggestions={enableSuggestions}
            suggestions={suggestions}
            onSelectSuggestion={onSelectSuggestion}
            nav={false}
          />
        </div>
        {extraActions}
      </div>
    </div>
  );
};

export default SubNavbar;
