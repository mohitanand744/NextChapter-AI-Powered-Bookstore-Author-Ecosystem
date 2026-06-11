import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaUsers, FaTimes } from "react-icons/fa";
import Button from "../Buttons/Button";
import ModalContainer from "./ModalContainer";
import Search from "../SearchBars/Search";
import NoData from "../EmptyData/noData";
import { PremiumVerifiedBadge } from "../SVGs/SVGs";

const FollowersModal = ({ isOpen, onClose, followers }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredFollowers = searchQuery
    ? followers?.filter((follower) =>
      follower.name
        ?.toLowerCase()
        .includes(searchQuery?.toLowerCase()),
    )
    : followers;

  return (
    <ModalContainer isOpen={isOpen} onClose={onClose} loading={false}>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative min-h-[300px] hideScroll max-h-[400px] overflow-y-auto w-full mx-auto"
      >
        <div className="flex sticky top-0 bg-coffee p-2 rounded-full z-30 mb-4 items-center justify-between border-b border-coffee/20">
          <h3 className="flex items-center gap-2 text-xl font-bold text-tan">
            <span className="bg-sepia p-1 rounded-full "> <FaUsers className="text-3xl" /></span> followers
          </h3>


          <Search
            styling="bg-sepia/40 rounded-full "
            placeholder="Search followers..."
            className="w-full"
            onChange={(val) => setSearchQuery(val)}
            value={searchQuery}
          />
        </div>
        <div className="px-2 space-y-3">
          {filteredFollowers.length > 0 ? filteredFollowers?.map((follower) => (
            <motion.div
              key={follower.id}
              layout
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ type: "spring", stiffness: 260, damping: 22 }}
              className="group flex relative items-center justify-between gap-4 rounded-2xl border border-coffee/15 bg-coffee/65 p-3.5 cursor-pointer hover:border-coffee/30 hover:bg-coffee/50"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="relative shrink-0">
                  <img
                    src={follower.avatar}
                    alt={follower.name}
                    className="h-11 w-11 rounded-full border-2 border-orange p-0.5 object-cover shadow-md transition-transform duration-300 group-hover:scale-105"
                  />
                  {follower.certified && (
                    <div className="absolute -bottom-1 -right-1 z-20">
                      <PremiumVerifiedBadge className="w-5 h-5 " title="Verified Author" />
                    </div>
                  )}


                </div>

                <div className="min-w-0">
                  <h4 className="truncate text-sm font-semibold tracking-wide text-cream">
                    {follower.name}
                  </h4>

                  <p className="mt-0.5 truncate text-xs font-medium text-cream/50">
                    {follower.bio}
                  </p>
                </div>
              </div>

              <div className="text-[8px] bg-black/10 py-0.5 absolute top-0 right-1/2 translate-x-1/2 rounded-b-[0.5rem] px-3 font-medium tracking-wide text-tan/60">
                {follower.role}
              </div>

              <Button
                variant="glass"
                className="flex shrink-0 h-[25px] items-center justify-center !border-t-2 !border-b-2 border-tan/20 bg-coffee/10 text-cream/60 transition-all text-[12px] duration-300 hover:bg-coffee/20 hover:text-cream"
              >
                Follow
              </Button>
            </motion.div>
          )) : <div className="mt-3">
            <NoData
              actionText="Clear Search"
              onActionClick={() => { setSearchQuery("") }}
              showAction={true}
              icon="user" title="You don't have followers yet!" />
          </div>}
        </div>
      </motion.div>
    </ModalContainer>
  );
};

export default FollowersModal;
