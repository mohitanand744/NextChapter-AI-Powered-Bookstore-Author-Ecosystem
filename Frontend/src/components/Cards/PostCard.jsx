import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaRegCalendarAlt,
  FaRegClock,
  FaTag,
  FaRegComment,
  FaPaperPlane,
  FaHeart,
  FaThumbsUp,
  FaFire,
  FaLightbulb,
  FaEllipsisV,
} from "react-icons/fa";
import {
  FiBookmark,
  FiLink,
  FiCode,
  FiEyeOff,
  FiSlash,
  FiFlag,
} from "react-icons/fi";
import NoData from "../EmptyData/noData";
import FloatingReaction from "../UI/FloatingReaction";
import { useImagePreview } from "../../store/Context/ImagePreviewContext";
import useAuth from "../../Hooks/useAuth";
import Input from "../Inputs/Input";
import { toast } from "sonner";
import AppImage from "../Common/AppImage";

const tagColors = {
  "Writing Tips": "bg-amber-100 text-amber-700",
  Storytelling: "bg-violet-100 text-violet-700",
  "Author Life": "bg-emerald-100 text-emerald-700",
  Process: "bg-sky-100 text-sky-700",
};

const REACTIONS = [
  {
    key: "love",
    label: "Love",
    Icon: FaHeart,
    activeGradient: "from-rose-500 to-pink-400",
    activeShadow: "shadow-rose-200",
    activeText: "text-rose-500",
  },
  {
    key: "like",
    label: "Like",
    Icon: FaThumbsUp,
    activeGradient: "from-blue-500 to-sky-400",
    activeShadow: "shadow-blue-200",
    activeText: "text-blue-500",
  },
  {
    key: "hot",
    label: "Hot",
    Icon: FaFire,
    activeGradient: "from-orange-500 to-amber-400",
    activeShadow: "shadow-orange-200",
    activeText: "text-orange",
  },
  {
    key: "insightful",
    label: "Insightful",
    Icon: FaLightbulb,
    activeGradient: "from-violet-500 to-purple-400",
    activeShadow: "shadow-violet-200",
    activeText: "text-violet-500",
  },
];

const PostCard = ({ post, index, author }) => {
  const [reactions, setReactions] = useState(post.reactions);
  const [userReaction, setUserReaction] = useState(null);
  const [showReactionPicker, setShowReactionPicker] = useState(false);
  const [comments, setComments] = useState(post.comments);
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyText, setReplyText] = useState("");
  const [showMenu, setShowMenu] = useState(false);
  const { openPreview } = useImagePreview();
  const { userData, isAuthenticated } = useAuth();
  const totalReactions = Object.values(reactions).reduce((a, b) => a + b, 0);

  const handleReact = (emoji) => {
    if (!isAuthenticated) {
      toast.error("Authentication Required", {
        description: "Please login to react to this post",
      });
      return;
    }
    setReactions((prev) => {
      const updated = { ...prev };
      if (userReaction === emoji) {
        updated[emoji] = Math.max(0, updated[emoji] - 1);
        setUserReaction(null);
      } else {
        if (userReaction)
          updated[userReaction] = Math.max(0, updated[userReaction] - 1);
        updated[emoji] = (updated[emoji] || 0) + 1;
        setUserReaction(emoji);
      }
      return updated;
    });
    setShowReactionPicker(false);
  };

  const handleAddComment = (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      toast.error("Authentication Required", {
        description: "Please login to post a comment",
      });
      return;
    }
    if (!newComment.trim()) return;
    setComments((prev) => [
      ...prev,
      {
        id: Date.now(), // Unique ID
        user: userData?.name,
        avatar: userData?.profilePic,
        text: newComment.trim(),
        date: new Date().toISOString(),
        replies: [],
      },
    ]);
    setNewComment("");
  };

  const handleReply = (e, commentId) => {
    e.preventDefault();
    if (!isAuthenticated) {
      toast.error("Authentication Required", {
        description: "Please login to reply to this comment",
      });
      return;
    }
    if (!replyText.trim()) return;
    setComments((prev) =>
      prev.map((c) => {
        if (c.id === commentId) {
          return {
            ...c,
            replies: [
              ...(c.replies || []),
              {
                id: Date.now(),
                user: userData?.name,
                avatar: userData?.profilePic,
                text: replyText.trim(),
                date: new Date().toISOString(),
              },
            ],
          };
        }
        return c;
      })
    );
    setReplyText("");
    setReplyingTo(null);
  };

  return (
    <motion.article
      initial={{ y: 20, opacity: 0, scale: 0.67 }}
      animate={{ y: 0, opacity: 1, scale: 1 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      whileHover={{
        scale: 1.01,
        transition: { duration: 0.15 },
        boxShadow: "0 15px 40px rgba(0,0,0,0.3)",
        y: -5,
      }}
      className="group bg-coffee border border-tan/10 rounded-2xl flex flex-col relative"
    >
      <div
        className="absolute inset-0 bg-[url('/images/bgDesign.jpg')] bg-cover bg-center opacity-10 pointer-events-none"
      />
      <div className="relative z-10">
        {/* LinkedIn Style Header */}
        <div className="flex items-center gap-3 p-4">
          <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-tan/30 flex-shrink-0">
            <AppImage
              src={author?.author_image || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"}
              alt={author?.author_name}
              className="w-full h-full object-cover"
              fallbackType="author"
              name={author?.author_name}
            />
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="text-tan font-bold text-sm truncate">{author?.author_name || "Author Name"}</h4>
            <p className="text-[10px] text-tan truncate">
              Professional Author & Storyteller • {new Date(post.date).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
            </p>
          </div>

          {/* More Options Menu */}
          <div className="relative">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setShowMenu(!showMenu)}
              className="p-2 text-tan hover:text-tan hover:bg-tan/10 rounded-full !rotate-[90deg] transition-all"
            >
              <FaEllipsisV size={14} />
            </motion.button>

            <AnimatePresence>
              {showMenu && (
                <>
                  {/* Backdrop to close menu */}
                  <div
                    className="fixed inset-0 z-[100]"
                    onClick={() => setShowMenu(false)}
                  />
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: -10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: -10 }}
                    className="absolute right-0 mt-2 w-56 bg-coffee border border-tan/20 rounded-xl shadow-2xl z-[101] overflow-hidden"
                  >
                    <div className="py-1">
                      {[
                        { icon: <FiBookmark className="text-sm" />, label: "Save" },
                        { icon: <FiLink className="text-sm" />, label: "Copy link to post" },
                        {
                          icon: <FiEyeOff className="text-sm" />,
                          label: `Hide posts by ${author?.author_name?.split(" ")[0] || "Author"}`,
                        },
                        { icon: <FiSlash className="text-sm" />, label: "Not interested" },
                        { icon: <FiFlag className="text-sm" />, label: "Report post" },
                      ].map((option, idx) => (
                        <React.Fragment key={idx}>

                          <button
                            onClick={() => setShowMenu(false)}
                            className="w-full flex border-b border-coffee shadow-lg rounded-b-2xl pt-3 hover:scale-105 !transition-all duration-600 cursor-pointer items-center gap-3 px-4 py-2.5 text-xs text-tan hover:bg-tan/10 transition-colors text-left"
                          >
                            {option.icon}
                            <span>{option.label}</span>
                          </button>

                        </React.Fragment>
                      ))}
                    </div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Post Content */}
        <div className="px-4 pb-3">
          <h3 className="font-bold text-tan text-base leading-snug mb-2">
            {post.title}
          </h3>
          <p className="text-sm leading-relaxed text-tan/80 line-clamp-4">
            {post.excerpt}
          </p>
        </div>

        {/* Post Image (LinkedIn Style - after text) */}
        <div className="relative w-full h-64 overflow-hidden bg-tan/5 border-y border-tan/5">
          <AppImage
            src={post.image}
            alt={post.title}
            onClick={() => openPreview(post.image, post.title)}
            className="object-cover w-full h-full transition-transform duration-500 cursor-pointer group-hover:scale-105"
            fallbackType="default"
          />
          <span
            className={`absolute top-3 left-3 text-[10px] font-bold px-3 py-1 rounded-full flex items-center gap-1 shadow-lg backdrop-blur-md ${tagColors[post.tag] || "bg-coffee/80 text-tan"}`}
          >
            <FaTag size={8} />
            {post.tag}
          </span>
        </div>

        <div className="flex flex-col p-4">
          {/* Stats Summary */}
          <div className="flex items-center justify-between pb-3 border-b border-tan/10 mb-3 text-[11px] text-tan/40">
            <div className="flex items-center gap-1">
              <div className="flex text-lg -space-x-1">
                <FaHeart className="text-red-heart bg-coffee rounded-full p-0.5 border border-tan/10" />
                <FaThumbsUp className="text-blue-500 bg-coffee rounded-full p-0.5 border border-tan/10" />
              </div>
              <span className="text-tan">{totalReactions} reactions</span>
            </div>
            <div className="flex gap-3">
              <span className="text-tan">{comments.length} comments</span>
              <span>•</span>
              <span className="text-tan">{post.readTime} read</span>
            </div>
          </div>

          <div className="flex items-center justify-between ">
            <div className="flex items-center">
              {REACTIONS.map(
                ({
                  key,
                  label,
                  Icon,
                  activeGradient,
                  activeShadow,
                  activeText,
                }) => {
                  const isActive = userReaction === key;
                  const count = reactions[key] || 0;
                  return (
                    <div key={key} className="relative group/tip">
                      <div
                        className="absolute -bottom-8 left-1/2 -translate-x-1/2 pointer-events-none z-30
                    opacity-0 group-hover/tip:opacity-100
                    -translate-y-0.5 group-hover/tip:-translate-y-0
                    scale-90 group-hover/tip:scale-100
                    transition-all duration-200 ease-out"
                      >
                        <span className="relative flex items-center tanspace-nowrap bg-sepia text-tan text-[10px] font-semibold px-1.5 py-1 rounded-lg shadow-xl">
                          {label}
                          <span className="absolute -top-[5px] left-1/2 -translate-x-1/2 border-l-4 border-r-4 border-b-[5px] border-l-transparent border-r-transparent border-b-sepia" />
                        </span>
                      </div>

                      <motion.button
                        whileTap={{ scale: 0.82 }}
                        whileHover={{ scale: 1.1, y: -2 }}
                        onClick={() => handleReact(key)}
                        className={`relative flex items-center gap-1 px-2 py-2 rounded-lg text-xs font-semibold border transition-all duration-200 ${isActive
                          ? `bg-tan/10 text-tan border-tan/30 shadow-md`
                          : "bg-transparent text-tan/40 border-transparent hover:bg-tan/5 hover:text-tan"
                          }`}
                      >
                        {isActive && (
                          <FloatingReaction Icon={Icon} activeText={activeText} />
                        )}
                        <Icon
                          size={13}
                          className={isActive ? activeText : "text-tan"}
                        />
                        {count > 0 && (
                          <span className="text-[10px] font-bold text-tan/90 tabular-nums leading-none">
                            {count}
                          </span>
                        )}
                      </motion.button>
                    </div>
                  );
                },
              )}
            </div>

            <motion.button
              whileHover={{ scale: 1.04 }}
              onClick={() => setShowComments((v) => !v)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all duration-200 ${showComments
                ? "bg-tan/10 text-tan border border-tan/20"
                : "bg-transparent text-tan/90 hover:bg-tan/5 hover:text-tan"
                }`}
            >
              <FaRegComment size={14} />
              <span>Comment</span>
            </motion.button>
          </div>

          <AnimatePresence>
            {showComments && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <div className="mt-4 space-y-3">
                  {comments.length > 0 ? (
                    comments.map((c, ci) => (
                      <motion.div
                        key={c.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: ci * 0.06 }}
                        className="flex flex-col gap-1"
                      >
                        <div className="flex gap-3">
                          {/* Avatar with colored ring */}
                          <div className="relative flex-shrink-0">
                            <div className="w-8 h-8 rounded-full p-[2px] bg-gradient-to-br from-tan to-coffee shadow-sm">
                              <AppImage
                                src={c.avatar}
                                alt={c.user}
                                className="object-cover w-full h-full rounded-full"
                                fallbackType="avatar"
                                name={c.user}
                              />
                            </div>
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="bg-tan/5 border border-tan/10 rounded-2xl rounded-tl-sm px-4 py-2">
                              <div className="flex items-baseline justify-between mb-1">
                                <span className="text-xs font-bold text-cream">
                                  {c.user}
                                </span>
                                <span className="text-[10px] text-cream/60 ml-2 flex-shrink-0">
                                  {new Date(c.date).toLocaleDateString("en-IN", {
                                    day: "numeric",
                                    month: "short",
                                  })}
                                </span>
                              </div>
                              <p className="text-xs leading-relaxed text-cream/90">
                                {c.text}
                              </p>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex items-center gap-4 mt-1 ml-2">
                              <button
                                onClick={() => setReplyingTo(replyingTo === c.id ? null : c.id)}
                                className="text-xs font-bold text-cream/90 hover:text-cream transition-colors"
                              >
                                Reply
                              </button>
                            </div>

                            {/* Reply Form */}
                            <AnimatePresence>
                              {replyingTo === c.id && (
                                <motion.form
                                  initial={{ opacity: 0, height: 0 }}
                                  animate={{ opacity: 1, height: "auto" }}
                                  exit={{ opacity: 0, height: 0 }}
                                  onSubmit={(e) => handleReply(e, c.id)}
                                  className="flex relative items-center gap-2 mt-2 ml-2 overflow-hidden"
                                >
                                  <Input
                                    type="text"
                                    value={replyText}
                                    onChange={(e) => setReplyText(e.target.value)}
                                    placeholder="Write a reply..."
                                    containerClassName="!mb-0 flex-1"
                                    className="!h-8 text-xs bg-tan/5 border border-tan/10 rounded-full px-3 text-cream !ring-0 placeholder:text-cream/70"
                                    autoFocus
                                  />
                                  <motion.button
                                    type="submit"
                                    className="text-cream/90 absolute right-2 top-1/2 -translate-y-1/2 hover:text-cream/60 disabled:opacity-30 cursor-pointer"
                                  >
                                    <FaPaperPlane size={13} />
                                  </motion.button>
                                </motion.form>
                              )}
                            </AnimatePresence>

                            {/* Nested Replies */}
                            {c.replies && c.replies.length > 0 && (
                              <div className="mt-3 ml-2 space-y-3 border-l-2 border-tan/10 pl-4">
                                {c.replies.map((reply, ri) => (
                                  <motion.div
                                    initial={{ opacity: 0, y: 5 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    key={reply.id}
                                    className="flex gap-2"
                                  >
                                    <div className="w-7 h-7 rounded-full p-[1px] bg-tan/20 flex-shrink-0">
                                      <AppImage
                                        src={reply.avatar}
                                        alt={reply.user}
                                        className="w-full h-full rounded-full object-cover"
                                        fallbackType="avatar"
                                        name={reply.user}
                                      />
                                    </div>
                                    <div className="flex-1 bg-tan/5 border border-tan/5 rounded-xl px-3 py-1.5">
                                      <div className="flex justify-between items-center mb-0.5">
                                        <span className="text-xs font-bold text-cream">{reply.user}</span>
                                        <span className="text-[10px] text-cream/50">
                                          {new Date(reply.date).toLocaleDateString("en-IN", {
                                            day: "numeric",
                                            month: "short",
                                          })}
                                        </span>
                                      </div>
                                      <p className="text-xs leading-relaxed text-cream/70">{reply.text}</p>
                                    </div>
                                  </motion.div>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    ))
                  ) : (
                    <NoData
                      title="No comments yet"
                      message="Be the first to comment!"
                      customIcon={
                        <FaRegComment size={30} className="text-coffee" />
                      }
                    />
                  )}

                  <form
                    onSubmit={handleAddComment}
                    className="flex items-center gap-2 mt-4 bg-tan/5 border border-tan/10 rounded-full px-1 py-1"
                  >
                    <div className="w-8 h-8 rounded-full overflow-hidden border border-tan/90 flex-shrink-0">
                      <AppImage
                        src={userData?.profilePic || "https://img.freepik.com/premium-vector/human-icon_970584-3.jpg?semt=ais_hybrid&w=740&q=80"}
                        alt="You"
                        className="object-cover w-full h-full"
                        fallbackType="avatar"
                        name={userData?.name}
                      />
                    </div>
                    <div className="flex-1 h-8">
                      <Input
                        type="text"
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="Write a comment..."
                        className="flex-1 text-xs text-tan !h-8 !shadow-none !border-none !ring-0  bg-transparent focus:outline-none"
                      />
                    </div>
                    <motion.button
                      type="submit"
                      disabled={!newComment.trim()}
                      whileTap={{ scale: 0.9 }}
                      whileHover={{ scale: 1.05 }}
                      className="w-8 h-8 flex items-center justify-center rounded-full bg-sepia text-tan shadow-sm transition-opacity"
                    >
                      <FaPaperPlane size={12} />
                    </motion.button>
                  </form>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.article>
  );
};

export default PostCard;


