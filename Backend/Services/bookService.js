const BookModel = require("../Models/bookModel");
const db = require("../Config/db.connection");

const getAllBooks = async (
  userId = null,
  limit,
  cursor,
  categories,
  minPrice,
  maxPrice,
  discount,
  language,
  search,
) => {
  try {
    const result = await BookModel.findAllBooks({
      userId,
      limit,
      cursor,
      categories,
      minPrice,
      maxPrice,
      discount,
      language,
      search,
    });

    return {
      success: true,
      ...result,
    };
  } catch (err) {
    console.log(err);

    throw err;
  }
};

const getBookById = (id) => {
  return BookModel.findBookById(id);
};

const getBooksSuggestionsServices = async (userSearchPhrase = "") => {
  try {
    const result = await BookModel.getBooksSuggestions({
      search: userSearchPhrase.trim(),
    });

    return result;
  } catch (error) {
    console.log(error);
    throw {
      status: 500,
      message: "Error fetching book suggestions [services error]",
    };
  }
};

const createBookWithImages = async (bookData, images) => {
  const { title, description, author, price, category } = bookData;

  const [result] = await BookModel.insertBook(
    title,
    description,
    author,
    price,
    category,
  );

  const bookId = result.insertId;

  if (images?.length) {
    await BookModel.insertImages(bookId, images);
  }

  return bookId;
};

const deleteBook = async (id) => {
  const [result] = await BookModel.deleteBookById(id);
  return result.affectedRows > 0;
};

const updateBookWithImages = async (id, bookData, images) => {
  const connection = await db.getConnection();

  try {
    await connection.beginTransaction();

    const [bookResult] = await connection.query(
      "UPDATE books SET title=?, author=?, description=?, book_price=? WHERE id=?",
      [
        bookData.title,
        bookData.author,
        bookData.description,
        bookData.price,
        id,
      ],
    );

    if (!bookResult.affectedRows) {
      await connection.rollback();
      return false;
    }

    if (images?.length) {
      await connection.query(
        "UPDATE book_images SET image_url=? WHERE book_id=?",
        [JSON.stringify(images), id],
      );
    }

    await connection.commit();
    return true;
  } catch (err) {
    await connection.rollback();
    throw err;
  } finally {
    connection.release();
  }
};

module.exports = {
  getAllBooks,
  getBookById,
  createBookWithImages,
  deleteBook,
  updateBookWithImages,
  getBooksSuggestionsServices,
};
