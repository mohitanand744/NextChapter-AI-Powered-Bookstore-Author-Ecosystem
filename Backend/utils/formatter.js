exports.formatBook = (item) => ({
  book_id: item?.ID,
  title: item?.TITLE,
  description: item?.DESCRIPTION,
  isLiked: item?.isLiked,
  author: {
    author_id: item?.AUTHOR_ID,
    author_name: item?.AUTHOR,
    author_description: item?.AUTHOR_DESCRIPTION,
    author_image: item?.AUTHOR_IMAGE_URL,
    author_rating: item?.AUTHOR_RATING,
  },
  book_price: item?.BOOK_PRICE,
  category: item?.category_name,
  images: item?.IMAGE_URL,
  cover_image: item?.cover_image,
  book_rating: item?.BOOK_RATING
});

const formateName = (name) => {
  if (!name) return;
  return name
    .toLowerCase()
    .split(" ")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

// userFormatter.js
exports.formatUser = (user) => {
  console.log("User-", user);

  console.log("userrrrrrrrrrrrrrr", user);

  const date = new Date(user?.created_at);
  const formattedDate = date.toLocaleString("en-US", {
    month: "long",
    year: "numeric",
  });
  console.log("wishlist_count", user.wishlist_count);

  const name = formateName(`${user?.first_name} ${user?.last_name}`);

  return {
    name: name || "User",
    email: user?.email,
    userId: user?.id,
    profilePic:
      user?.profile_pic ||
      "https://img.freepik.com/premium-vector/human-icon_970584-3.jpg?semt=ais_hybrid&w=740&q=80",
    joinDate: formattedDate || null,
    default_address: {
      address: user?.default_address || null,
      city: user?.city || null,
      state: user?.state || null,
      pinCode: user?.pin_code || null,
    },
    phone: user?.phone_number || null,
    gender: user?.gender || null,
    orders: user?.orders_count || 0,
    wishlist: user?.wishlist_count || 0,
    favoriteGenres: user?.categories || [],
    recentOrders: [],
    recentWishlist: [],
    recentActivity: [],
    isComplete: user?.isComplete || false,
    percentage: user?.percentage || 0,
  };
};
