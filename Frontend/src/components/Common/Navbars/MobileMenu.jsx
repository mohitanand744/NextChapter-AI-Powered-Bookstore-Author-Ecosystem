import { useState } from "react";
import { Link } from "react-router-dom";
import { IoIosArrowDown } from "react-icons/io";
import MegaMenu from "./MegaMenu";
import { motion, AnimatePresence } from "framer-motion";
import { NAV_LINKS } from "./NavLinksData";
import AppImage from "../../Common/AppImage";

export default function MobileMenu({ isOpen, setIsOpen }) {
  const [openMegaMenu, setOpenMegaMenu] = useState(false);

  const menuVariants = {
    hidden: {
      height: 0,
      opacity: 0,
      transition: {
        duration: 0.4,
        ease: [0.04, 0.62, 0.23, 0.98],
        when: "afterChildren",
      },
    },
    visible: {
      height: "auto",
      opacity: 1,
      transition: {
        duration: 0.4,
        ease: [0.04, 0.62, 0.23, 0.98],
        when: "beforeChildren",
        staggerChildren: 0.08,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.4, ease: "easeOut" },
    },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          variants={menuVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          className="xl:hidden relative overflow-hidden bg-coffee/95 backdrop-blur-xl border-t border-tan/20 shadow-2xl origin-top"
        >
          <div
            className="absolute inset-0 bg-[url('/images/bgDesign.jpg')] bg-cover bg-center opacity-10 pointer-events-none"
          />
          <ul className="relative z-10 px-5 pt-6 pb-8 space-y-4">
            {NAV_LINKS.map((link) => {
              if (link.type === "dropdown") {
                return (
                  <motion.li
                    key={link.key}
                    variants={itemVariants}
                    className="overflow-hidden bg-coffee/50 backdrop-blur-sm rounded-2xl shadow-sm border border-tan/10 transition-all duration-300"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenMegaMenu(!openMegaMenu)}
                      className="w-full px-5 py-3 flex justify-between items-center text-lg font-bold text-tan hover:bg-tan/10 active:bg-tan/20 transition-colors duration-300"
                    >
                      {link.name}
                      <motion.div
                        animate={{ rotate: openMegaMenu ? 180 : 0 }}
                        transition={{ duration: 0.3, ease: "backOut" }}
                      >
                        <IoIosArrowDown className="text-xl" />
                      </motion.div>
                    </button>

                    <AnimatePresence>
                      {openMegaMenu && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{
                            duration: 0.4,
                            ease: [0.04, 0.62, 0.23, 0.98],
                          }}
                          className="overflow-hidden border-t border-coffee/10"
                        >
                          <div
                            className="py-3 px-1"
                            onClick={(e) => {
                              if (e.target.tagName === "A") setIsOpen(false);
                            }}
                          >
                            <div className="transform origin-top scale-[0.85] w-[117%] -ml-[8.5%] pb-4">
                              <MegaMenu />
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.li>
                );
              }

              return (
                <motion.li
                  key={link.key}
                  variants={itemVariants}
                  className="relative"
                >
                  <Link
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-between px-5 py-3 text-lg font-bold text-tan bg-coffee/50 backdrop-blur-sm border border-tan/10 rounded-2xl hover:bg-coffee/80 active:scale-95 transition-all duration-300 shadow-sm relative overflow-hidden"
                  >
                    {link.name}
                    {link.hasTag && (
                      <span className=" relative z-10 flex items-center  justify-center">
                        <AppImage
                          src="/images/tag.avif"
                          alt="New Tag"
                          className="w-28 h-7 drop-shadow-md drop-shadow-tan"
                          fallbackType="default"
                        />
                      </span>
                    )}
                  </Link>
                </motion.li>
              );
            })}
          </ul>
        </motion.div>
      )}
    </AnimatePresence>
  );
}


