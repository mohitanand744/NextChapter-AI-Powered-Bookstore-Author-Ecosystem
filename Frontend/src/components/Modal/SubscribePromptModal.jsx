import React from 'react';
import { motion } from 'framer-motion';
import { FaStar, FaUsers } from 'react-icons/fa';
import Button from '../Buttons/Button';
import ModalContainer from './ModalContainer';
import AppImage from '../Common/AppImage';

const SubscribePromptModal = ({ isOpen, onClose, onFollow, author, followersCount }) => {
  return (
    <ModalContainer isOpen={isOpen} onClose={onClose} loading={false}>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative w-full mx-auto text-center"
      >
        <div className="flex flex-col items-center justify-center mb-5 gap-3">
          <div className="relative">
            <AppImage
              src={author?.author_image || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"}
              alt={author?.author_name || "Author"}
              className="w-20 h-20 rounded-full object-cover border-4  shadow-md mx-auto"
              fallbackType="author"
              name={author?.author_name}
            />
            <div className="absolute -bottom-1 -right-2 bg-gradient-to-br from-coffee  text-tan px-2 py-0.5 rounded-xl border-2  shadow-sm flex items-center gap-1">
              <FaStar size={10} className="text-tan" />
              <span className="text-[10px] font-bold">{author?.author_rating || "4.5"}</span>
            </div>
          </div>
          <div>
            <h4 className=" font-extrabold text-xl">{author?.author_name || "Author"}</h4>
            <p className="text-md font-semibold text-cream/70 flex items-center justify-center gap-1.5 mt-1">
              <FaUsers className="text-tan" /> {followersCount || "12.4K"} Followers
            </p>
          </div>
        </div>

        <h3 className="text-lg font-bold text-cream mb-2">
          You're subscribed! Now follow {author?.author_name}
        </h3>
        <p className="text-cream/80 text-md mb-6 leading-relaxed">
          To be the first to know when she drops a new post, book, or update — straight to the top of your feed.
        </p>

        <div className="flex gap-3 w-full">
          <Button
            variant="outline"
            onClick={onClose}
            className="flex-1"
          >
            Back
          </Button>
          <Button
            variant="primary"
            onClick={onFollow}
            className="flex-1 bg-gradient-to-r from-coffee  !text-tan"
          >
            Follow
          </Button>
        </div>
      </motion.div>
    </ModalContainer>
  );
};

export default SubscribePromptModal;


