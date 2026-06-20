import { motion, AnimatePresence } from "framer-motion";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useImagePreview } from "../../store/Context/ImagePreviewContext";
import AppImage from "./AppImage";

const FullScreenImageModal = () => {
  const { preview, closePreview } = useImagePreview();

  return (
    <AnimatePresence>
      {preview.isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center isolate">
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 cursor-pointer bg-black/90 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closePreview}
          />

          {/* Close Button */}
          <motion.button
            className="absolute top-5 right-5 p-2 text-tan/70 hover:text-tan bg-tan/10 hover:bg-tan/20 rounded-full z-[10000]"
            onClick={closePreview}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
          >
            <XMarkIcon className="w-8 h-8" />
          </motion.button>

          {/* Image */}
          <motion.div
            className="relative z-10 w-full max-w-7xl max-h-[90vh] p-4 flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
          >
            <AppImage
              src={preview.src}
              alt={preview.alt}
              className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl"
              fallbackType="default"
            />
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default FullScreenImageModal;


