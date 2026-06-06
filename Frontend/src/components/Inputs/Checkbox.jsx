import React from "react";

const Checkbox = (
  { id, label, checked, onChange, className = "", error, ...props },
  ref,
) => {
  return (
    <div className="flex flex-col gap-1">
      <div
        ref={ref}
        onClick={(e) => e.stopPropagation()}
        className="flex items-center"
      >
        <input
          type="checkbox"
          id={id}
          checked={checked}
          onChange={onChange}
          className={`w-4 h-4 border-2 md:w-5 md:h-5 bg-tan/70 border-coffee rounded-md appearance-none checked:after:content-['✓'] checked:after:text-sepia  flex justify-center items-center checked:bg-cream ${className}`}
          {...props}
        />
        <label
          htmlFor={id}
          className="ml-2 text-sm font-semibold cursor-pointer text-tan"
        >
          {label}
        </label>
      </div>

      {error && <p className="ml-2 text-sm text-red-error">{error}</p>}
    </div>
  );
};

export default React.forwardRef(Checkbox);
