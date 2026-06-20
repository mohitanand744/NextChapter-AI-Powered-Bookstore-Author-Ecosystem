const db = require("../Config/db.connection");

const findWishlistEntry = async (userId, bookId) => {
  const [rows] = await db.query(
    "SELECT id, status FROM wishlists WHERE user_id = ? AND book_id = ?",
    [userId, bookId],
  );
  return rows;
};

const updateWishlistStatus = async (id, status) => {
  const [result] = await db.query(
    "UPDATE wishlists SET status = ? WHERE id = ?",
    [status, id],
  );
  return result;
};

const insertWishlist = async (userId, bookId) => {
  const [result] = await db.query(
    "INSERT INTO wishlists (user_id, book_id, status, created_at) VALUES (?, ?, 'ACTIVE', NOW())",
    [userId, bookId],
  );
  return result;
};

const WISHLIST_QUERY = `
  SELECT 
    B.ID, B.TITLE, B.DESCRIPTION, B.AUTHOR, B.BOOK_PRICE, B.BOOK_RATING , B.cover_image , C.name AS category_name,
    A.AUTHOR_DESCRIPTION, A.AUTHOR_ID, A.AUTHOR_IMAGE_URL, A.AUTHOR_RATING,
    BI.IMAGE_URL,
    true AS isLiked
  FROM wishlists W
  JOIN books B ON W.book_id = B.ID
  LEFT JOIN book_images BI ON B.ID = BI.BOOK_ID
  LEFT JOIN author_details A ON B.AUTHOR = A.AUTHOR_NAME
  LEFT JOIN categories C ON B.category_id = C.id
  WHERE W.user_id = ?
    AND W.status = 'ACTIVE'
  ORDER BY W.created_at DESC
`;

const getWishlistBooksByUserId = async (userId) => {
  const rows = await db.query(WISHLIST_QUERY, [userId]);

  console.log("elist", rows);

  return rows;
};

module.exports = {
  findWishlistEntry,
  updateWishlistStatus,
  insertWishlist,
  getWishlistBooksByUserId,
};
