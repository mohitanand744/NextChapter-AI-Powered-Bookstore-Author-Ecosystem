import Button from "../Buttons/Button";
import Badge from "./Badge";
import { motion } from "framer-motion";

const UnsavedChanges = ({
  onSave,
  onDiscard,
  onClose,
  isPulsing,
  title = "Unsaved Changes",
  message = "You have unsaved changes. Do you want to submit them or close without saving?",
  saveText = "Save & Submit",
  discardText = "Discard",
  showBadge = false,
  badgeText = "Check The Changes",
  containerClassName = "absolute inset-0 z-[9999] flex items-center justify-center p-4 bg-black/60 rounded-3xl",
  cardClassName = "w-full relative max-w-sm p-6 bg-coffee text-tan border border-tan/30 shadow-2xl rounded-3xl"
}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={containerClassName}
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className={`${cardClassName} transition-all duration-300 ${
          isPulsing ? "animate-pulse border-b-[3px] mb-14 bg-coffee/80" : ""
        }`}
      >
        {showBadge && (
          <div onClick={onClose} className="absolute top-2 right-2">
            <Badge
              text={badgeText}
              textFontSize="text-[12px] cursor-pointer"
              variant="primary"
            />
          </div>
        )}
        <h3 className="mb-2 text-xl font-bold text-tan">{title}</h3>
        <p className="mb-4 text-sm text-tan/70">{message}</p>

        <div className="flex gap-3">
          <Button
            variant="primary"
            className="flex-1 text-sm !py-2"
            onClick={onSave}
          >
            {saveText}
          </Button>
          <Button
            variant="outline"
            className="flex-1"
            onClick={onDiscard}
          >
            {discardText}
          </Button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default UnsavedChanges;
