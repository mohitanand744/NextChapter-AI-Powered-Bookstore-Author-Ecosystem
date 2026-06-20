// models/book.model.js
const db = require("../Config/db.connection");

const BASE_QUERY = `
  SELECT 
    B.ID,
    B.TITLE,
    B.DESCRIPTION,
    B.AUTHOR,
    B.BOOK_PRICE,
    C.name AS category_name,
    A.AUTHOR_DESCRIPTION,
    A.AUTHOR_ID,
    A.AUTHOR_IMAGE_URL,
    A.AUTHOR_RATING,
    BI.IMAGE_URL,
    B.BOOK_RATING,
    B.cover_image,

    CASE 
      WHEN W.id IS NULL THEN false
      ELSE true
    END AS isLiked

  FROM books B

  LEFT JOIN book_images BI 
    ON B.ID = BI.BOOK_ID 

  LEFT JOIN author_details A 
    ON B.AUTHOR = A.AUTHOR_NAME

  LEFT JOIN categories C 
    ON B.category_id = C.id

  LEFT JOIN wishlists W 
    ON W.book_id = B.ID
    AND W.user_id = ?
    AND W.status = 'ACTIVE'
`;

const findAllBooks = async ({
  userId = null,
  limit = 18,
  cursor,
  categories = [],
  minPrice,
  maxPrice,
  discount,
  language,
  search,
}) => {
  limit = Math.min(Number(limit), 20);

  let query = BASE_QUERY;

  let where = [];
  let params = [userId];

  if (cursor) {
    where.push("B.ID < ?");
    params.push(cursor);
  }

  if (categories.length > 0) {
    const placeholders = categories.map(() => "?").join(",");
    where.push(`c.name IN (${placeholders})`);
    params.push(...categories);
  }

  if (minPrice) {
    where.push("B.BOOK_PRICE >= ?");
    params.push(minPrice);
  }

  if (maxPrice) {
    where.push("B.BOOK_PRICE <= ?");
    params.push(maxPrice);
  }

  if (discount) {
    if (discount.includes("-")) {
      const [minD, maxD] = discount.split("-").map(Number);
      if (!isNaN(minD) && !isNaN(maxD)) {
        where.push("B.DISCOUNT BETWEEN ? AND ?");
        params.push(minD, maxD);
      }
    } else {
      where.push("B.DISCOUNT >= ?");
      params.push(Number(discount));
    }
  }

  if (language) {
    where.push("B.LANGUAGE = ?");
    params.push(language);
  }

  if (search) {
    where.push("(B.TITLE LIKE ? OR A.AUTHOR_NAME LIKE ?)");
    params.push(`%${search}%`, `%${search}%`);
  }

  if (where.length > 0) {
    query += " WHERE " + where.join(" AND ");
  }

  console.log("Query", query);

  query += `
    ORDER BY B.ID DESC
    LIMIT ?
  `;

  params.push(limit);

  console.log("params :", params);

  const [rows] = await db.query(query, params);

  let nextCursor = null;

  if (rows.length > 0) {
    nextCursor = rows[rows.length - 1].ID;
  }

  return {
    data: rows,
    nextCursor,
    hasMore: rows.length === limit,
  };
};

const getBooksSuggestions = async ({ limit = 8, search }) => {
  try {
    const query = `SELECT id, title, cover_image, book_price,  DISCOUNT,
  ROUND(BOOK_PRICE - (BOOK_PRICE * DISCOUNT / 100), 2) AS discounted_price  FROM books WHERE title LIKE ? LIMIT ?`;

    const [rows] = await db.query(query, [`%${search}%`, limit]);

    return rows;
  } catch (error) {
    throw {
      status: 500,
      message: "Error fetching book suggestions [Database error]",
    };
  }
};

const findBookById = (id, userId = null) => {
  return db.query(`${BASE_QUERY} WHERE B.ID = ?`, [id, userId]);
};

const deleteBookById = (id) => {
  return db.query("DELETE FROM books WHERE id = ?", [id]);
};

const updateBookById = (title, author, description, price, id) => {
  return db.query(
    "UPDATE books SET title = ?, author = ?, description = ?, book_price = ? WHERE id = ?",
    [title, author, description, price, id],
  );
};

const updateBookImages = (id, images) => {
  return db.query("UPDATE book_images SET image_url = ? WHERE book_id = ?", [
    JSON.stringify(images),
    id,
  ]);
};

const insertBook = (title, description, author, price, category) => {
  return db.query(
    "INSERT INTO books (title, description, author, book_price, category) VALUES (?, ?, ?, ?, ?)",
    [title, description, author, price, category],
  );
};

const insertImages = (bookId, images) => {
  return db.query(
    "INSERT INTO book_images (book_id, image_url) VALUES (?, ?)",
    [bookId, JSON.stringify(images)],
  );
};

module.exports = {
  findAllBooks,
  findBookById,
  deleteBookById,
  updateBookById,
  updateBookImages,
  insertBook,
  insertImages,
  getBooksSuggestions,
};
