import React from "react";
import Button from "../Button";
import { motion } from "framer-motion";

const SocialLoginButtons = ({ onComingSoonClick }) => {

  return (
    <>
      <div className="grid justify-center grid-cols-3 mt-6 sm:gap-3">
        <motion.div
          whileHover={{ scale: 1.03 }}
          className=""
          whileTap={{ scale: 0.98 }}
        >
          <Button
            variant="outline"
            className="flex float-right sm:float-none items-center !p-0 justify-center w-[44px] sm:w-full h-[44px]"
            onClick={() =>
              (window.location.href = `${import.meta.env.VITE_API_BASE_URL}/${import.meta.env.VITE_API_VERSION}/auth/google`)
            }
          >
            <motion.img
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.9 }}
              src="/images/google.png"
              alt="Google"
              className="w-6 h-6"
            />{" "}
            <span className="hidden ms-1 sm:block">Google</span>
          </Button>
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.03 }}
          className="mx-auto sm:mx-0"
          whileTap={{ scale: 0.98 }}
        >
          <Button
            variant="outline"
            className="flex items-center !p-0 justify-center w-[44px] sm:w-full h-[44px] "
            onClick={() => onComingSoonClick && onComingSoonClick()}
          >
            <motion.img
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.9 }}
              src="/images/fb.jpg"
              alt="Facebook"
              className="!object-cover w-6 h-6 rounded-full"
            />{" "}
            <span className="hidden ms-1 sm:block">Facebook</span>
          </Button>
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.03 }}
          className=""
          whileTap={{ scale: 0.98 }}
        >
          <Button
            variant="outline"
            className="flex float-left sm:float-none items-center !p-0 justify-center w-[44px] sm:w-full h-[44px] "
            onClick={() => onComingSoonClick && onComingSoonClick()}
          >
            <motion.img
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.9 }}
              src="/images/linkedin.webp"
              alt="LinkedIn"
              className="object-cover w-10 h-10 rounded-full"
            />{" "}
            <span className="hidden -ms-1 sm:block">LinkedIn</span>
          </Button>
        </motion.div>
      </div>
    </>
  );
};

export default SocialLoginButtons;
