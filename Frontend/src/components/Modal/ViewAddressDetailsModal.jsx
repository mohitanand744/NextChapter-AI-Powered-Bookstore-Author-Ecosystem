import { motion, AnimatePresence } from "framer-motion";
import { XCircleIcon } from "@heroicons/react/24/outline";
import Badge from "../Common/Badge";

const ViewAddressDetailsModal = ({ viewAddressDetails, setViewAddressDetails }) => {
  const ViewAddressDetailsIcon = viewAddressDetails?.Icon;

  return (
    <AnimatePresence>
      {viewAddressDetails && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 z-50 flex items-center justify-center p-4 bg-black/60 rounded-xl"
          onClick={() => setViewAddressDetails(null)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="w-full max-w-sm p-6 bg-coffee relative border border-tan shadow-xl rounded-xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Background Image */}
            <div className="absolute inset-0 bg-[url('/images/bgDesign.jpg')] bg-cover bg-center opacity-10 pointer-events-none" />

            {/* Close Button */}
            <motion.button
              className="absolute top-1 right-1 text-tan/70 hover:text-tan bg-black/10 hover:bg-tan/20 rounded-xl z-[10000]"
              onClick={() => setViewAddressDetails(null)}
              initial={{ scale: 0.5 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.5 }}
            >
              <XCircleIcon className="w-7 h-7" />
            </motion.button>

            <div className="flex items-center gap-2 mb-2 relative z-10">
              <h3 className="text-xl font-bold text-tan">
                Address Details
              </h3>{" "}
              <div className="flex items-center">
                 {viewAddressDetails.isDefault && (
                  <Badge text="Default" variant="secondary" className="ms-2" />
                )}
                <Badge
                  text={viewAddressDetails.type}
                  icon={ViewAddressDetailsIcon}
                  variant="outline"
                  className="ms-2"
                />
              </div>
            </div>

            <div className="mt-3 space-y-2 text-sm text-tan/80 relative z-10">
              <div className="flex gap-2 p-2 transition-all duration-200 ease-in-out border-b shadow-lg border-tan/10 rounded-b-xl hover:scale-105">
                <span className="font-medium text-tan min-w-[110px]">
                  Street Address:
                </span>
                <span className="break-words">
                  {viewAddressDetails.address}
                </span>
              </div>

              <div className="flex gap-2 p-2 transition-all duration-200 ease-in-out border-b shadow-lg border-tan/10 rounded-b-xl hover:scale-105">
                <span className="font-medium text-tan min-w-[110px]">
                  City:
                </span>
                <span>{viewAddressDetails.city}</span>
              </div>

              <div className="flex gap-2 p-2 transition-all duration-200 ease-in-out border-b shadow-lg border-tan/10 rounded-b-xl hover:scale-105">
                <span className="font-medium text-tan min-w-[110px]">
                  State:
                </span>
                <span>{viewAddressDetails.state}</span>
              </div>

              <div className="flex gap-2 p-2 transition-all duration-200 ease-in-out border-b shadow-lg border-tan/10 rounded-b-xl hover:scale-105">
                <span className="font-medium text-tan min-w-[110px]">
                  PIN:
                </span>
                <span>{viewAddressDetails.pinCode}</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ViewAddressDetailsModal;


