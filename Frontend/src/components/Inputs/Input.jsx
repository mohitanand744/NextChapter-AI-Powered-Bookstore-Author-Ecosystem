import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ExclamationCircleIcon,
  EyeIcon,
  EyeSlashIcon,
} from "@heroicons/react/24/outline";
import CustomSelect from "./CustomSelect";
import { toast } from "sonner";

const Input = (
  {
    label,
    labelclassname = "text-brand-label",
    type = "text",
    placeholder,
    error,
    className = "",
    containerClassName = "",
    icon,
    value,
    onChange,
    setSelectedValue,
    selectedValue,
    preventCopyPaste = false,
    options,
    multiple = false,
    as: Component = "input", // Default to 'input' if not specified
    showCounter = false,
    maxCount,
    ...props
  },
  ref,
) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleBlock = (e) => {
    if (preventCopyPaste) {
      e.preventDefault();
      toast.error("You are not allowed to Copy & Paste here.");
    }
  };

  // Determine input type based on toggle and original type
  const inputType =
    type === "password" ? (showPassword ? "text" : "password") : type;

  return (
    <motion.div layout className={`mb-4 w-full ${containerClassName}`}>
      {label && (
        <label className="flex items-center justify-between text-sm font-medium text-brand-label mb-1">
          <span className={`${labelclassname}`}>{label}</span>
          {showCounter && maxCount && (
            <span
              className={`text-[13px] ${(value?.length || 0) > maxCount
                ? "text-error"
                : "text-brand-label/60 font-normal"
                }`}
            >
              <b>{value?.length || 0}/{maxCount}</b>
            </span>
          )}
        </label>
      )}
      <div className="relative w-full">
        {Component === "select" ? (
          <CustomSelect
            ref={ref}
            options={options}
            value={selectedValue}
            onChange={onChange}
            error={error}
            className={className}
            placeholder={placeholder}
            multiple={multiple}
          />
        ) : Component === "textarea" ? (
          <textarea
            ref={ref}
            className={`w-full block bg-tan/10 text-tan/90 pr-[44px] pl-4 py-2 rounded-lg border ${error
              ? "border-red-error placeholder:text-red-error focus:ring-red-error focus:border-red-error"
              : "border-sepia placeholder:text-tan/60 focus:ring-coffee focus:border-coffee"
              }  focus:outline-none focus:ring-2 ${className}`}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            rows={3}
            {...props}
          />
        ) : (
          <input
            ref={ref}
            type={inputType}
            className={`w-full bg-tan/10 text-cream/95 h-[42px] pr-[44px] truncate px-4 py-2 rounded-lg border  ${error
              ? "border-red-error placeholder:!text-red-error focus:ring-red-error focus:border-red-error"
              : "placeholder:text-cream/70 border-sepia focus:ring-coffee focus:border-coffee"
              } shadow-sm focus:outline-none focus:ring-2 ${className}`}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            onCopy={handleBlock}
            onPaste={handleBlock}
            onCut={handleBlock}
            onDrag={handleBlock}
            onDrop={handleBlock}
            autoComplete="newPassword"
            {...props}
          />
        )}

        {/* Custom right icon: show/hide or external icon */}
        {!error && icon && (
          <div
            className={`absolute right-0 top-[0.6px] min-w-[40px] min-h-full h-[40px] flex items-center justify-center  bg-tan/10 text-cream/95 rounded-r-lg`}
          >
            {type === "password" ? (
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="focus:outline-none text-brand-label/60"
              >
                {showPassword ? (
                  <EyeSlashIcon className="w-5 h-5" />
                ) : (
                  <EyeIcon className="w-5 h-5" />
                )}
              </button>
            ) : icon ? (
              <div className="text-brand-label/60 pointer-events-none">
                {icon}
              </div>
            ) : null}
          </div>
        )}
        {error && (
          <div
            className={`absolute right-0 top-0  ${Component === "textarea" ? "border-t border-r rounded-tr-lg" : "border-y border-r rounded-r-lg"} border-red-error min-h-full h-[42px] flex items-center justify-center px-3 bg-tan/10 text-red-error `}
          >
            {type === "password" ? (
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="focus:outline-none pointer-events-auto text-brand-label/60"
              >
                {showPassword ? (
                  <EyeSlashIcon className="w-5 h-5 text-red-error" />
                ) : (
                  <EyeIcon className="w-5 h-5 text-red-error" />
                )}
              </button>
            ) : (
              <ExclamationCircleIcon
                className="w-5 h-5 text-red-error"
                aria-hidden="true"
              />
            )}
          </div>
        )}
      </div>
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="mt-1 text-sm text-red-error"
            id="input-error"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>

    </motion.div>
  );
};

Input.displayName = "Input";

export default React.forwardRef(Input);


