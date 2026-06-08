import React from "react";
import Modal from "./ModalContainer";
import { motion } from "framer-motion";
import Button from "../Buttons/Button";
import { useNavigate } from "react-router-dom";
import { FaRobot, FaWandMagicSparkles } from "react-icons/fa6";
import { BiCodeAlt } from "react-icons/bi";

const ComingSoonModal = ({ isOpen, onClose, message, exploreLink, onExplore }) => {
  const navigate = useNavigate();

  const defaultMessage = (exploreLink || onExplore)
    ? "This AI-powered functionality is coming soon. I’m continuously working on the backend, creating APIs, improving the logic, and preparing this feature for a better user experience. For now, you can explore the static classic UI."
    : "This AI-powered functionality is coming soon. I’m continuously working on the backend, creating APIs, improving the logic, and preparing this feature for a better user experience.";

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="relative text-center">
        <div className="relative flex flex-col items-center justify-center">
          {/* Icon section */}
          <motion.div
            initial={{ scale: 0.75, opacity: 0, rotate: -12 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            transition={{ delay: 0.1, type: "spring", stiffness: 180 }}
            className="relative mb-6 flex h-24 w-24 items-center justify-center rounded-full border border-tan/30 bg-tan/10 shadow-[0_0_40px_rgba(210,180,140,0.25)]"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 12, ease: "linear" }}
              className="absolute inset-0 rounded-full border border-dashed border-tan/30"
            />

            <FaRobot className="text-5xl text-tan drop-shadow-lg" />

            <motion.span
              animate={{ y: [0, -6, 0], opacity: [0.7, 1, 0.7] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="absolute -right-2 -top-2 rounded-full bg-tan p-2 text-coffee shadow-lg"
            >
              <FaWandMagicSparkles />
            </motion.span>
          </motion.div>

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.18 }}
            className="mb-4 inline-flex items-center gap-2 rounded-full border border-tan/30 bg-tan/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-tan/90"
          >
            <BiCodeAlt className="text-base" />
            Backend APIs in Progress
          </motion.div>

          {/* Title */}
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="mb-4 font-serif text-3xl font-bold text-tan sm:text-4xl"
          >
            AI Feature Coming Soon
          </motion.h2>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.32 }}
            className="mb-6 max-w-xl text-sm font-medium leading-7 text-tan/80 sm:text-base"
          >
            {message || defaultMessage}
          </motion.p>

          {/* Feature points */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-8 grid w-full gap-3 text-left sm:grid-cols-1"
          >
            <div className="rounded-2xl border border-tan/15 bg-white/5 p-4">
              <p className="mb-1 text-sm font-bold text-tan">AI Ready</p>
              <p className="text-[14px] leading-5 text-tan/65">
                Smart functionality is planned for better user experience.
              </p>
            </div>

            <div className="rounded-2xl border border-tan/15 bg-white/5 p-4">
              <p className="mb-1 text-sm font-bold text-tan">API Work</p>
              <p className="text-[14px] leading-5 text-tan/65">
                Backend APIs and logic are being built step by step.
              </p>
            </div>

            <div className="rounded-2xl border border-tan/15 bg-white/5 p-4">
              <p className="mb-1 text-sm font-bold text-tan">Coming Soon</p>
              <p className="text-[14px] leading-5 text-tan/65">
                This feature will be connected dynamically in future updates.
              </p>
            </div>
          </motion.div>

          {/* Buttons */}
          {(exploreLink || onExplore) ? (
            <div className="flex w-full flex-col gap-3 sm:flex-row">
              <Button variant="outline" onClick={onClose} className="flex-1">
                Back
              </Button>

              <Button
                variant="primary"
                onClick={() => {
                  onClose();
                  if (onExplore) {
                    onExplore();
                  } else if (exploreLink) {
                    navigate(exploreLink);
                  }
                }}
                className="flex-1"
              >
                Explore Static UI
              </Button>
            </div>
          ) : (
            <div className="flex w-full justify-center">
              <Button
                onClick={onClose}
                variant="primary"
                className="w-full sm:w-1/2"
              >
                Got it!
              </Button>
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default ComingSoonModal;