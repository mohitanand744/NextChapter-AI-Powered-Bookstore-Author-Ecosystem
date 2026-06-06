// controllers/book.controllers.js
const BookService = require("../Services/bookService");
const { formatBook } = require("../utils/formatter");
const { errorResponse, successResponse } = require("../utils/response");

// ==========================
// Reusable helpers
// ==========================
const handleError = (res, err) => {
  if (err.code === "ER_DUP_ENTRY")
    return errorResponse(res, 400, "Duplicate entry", err.sqlMessage);

  return errorResponse(res, 500, "Internal Server Error", err.message);
};

const notFound = (res, msg = "Book not found") => errorResponse(res, 404, msg);

// ==========================
// 📚 Get all books
// ==========================
exports.getBooks = async (req, res, next) => {
  try {
    let {
      limit,
      cursor,
      categories,
      minPrice,
      maxPrice,
      discount,
      language,
      search,
    } = req.query;

    categories = Array.isArray(categories)
      ? categories
      : categories
        ? [categories]
        : [];

    const result = await BookService.getAllBooks(
      req?.userId,
      limit,
      cursor,
      categories,
      minPrice,
      maxPrice,
      discount,
      language,
      search,
    );
    if (!result.success) return notFound(res);

    const formattedBooks = result.data.map(formatBook);

    successResponse(res, 200, "Books fetched successfully", {
      data: formattedBooks,
      nextCursor: result.nextCursor,
      hasMore: result.hasMore,
    });
  } catch (err) {
    handleError(res, err, next);
  }
};

// ==========================
// 📖 Get Books Suggestions
// ==========================

exports.getBooksSuggestionsController = async (req, res) => {
  try {
    const userSearchPhrase =
      req.body.userSearchPhrase || req.query.userSearchPhrase;

    console.log("gg", req.body, req.query);

    if (!userSearchPhrase)
      return errorResponse(res, 400, "Please provide a search phrase");

    const result =
      await BookService.getBooksSuggestionsServices(userSearchPhrase);

    if (result.length === 0) return notFound(res);

    successResponse(res, 200, "", result);
  } catch (err) {
    handleError(res, err);
  }
};

// ==========================
// 📖 Get a book by ID
// ==========================
exports.getBookById = async (req, res) => {
  try {
    const [rows] = await BookService.getBookById(req.params.id);
    if (!rows.length) return notFound(res);

    successResponse(
      res,
      200,
      "Book fetched successfully",
      rows.map(formatBook),
    );
  } catch (err) {
    handleError(res, err);
  }
};

// ==========================
// 🗑️ Delete a book
// ==========================
exports.deleteBook = async (req, res) => {
  try {
    const result = await BookService.deleteBook(req.params.id);
    if (!result) return notFound(res);

    successResponse(res, 200, "Book deleted successfully");
  } catch (err) {
    handleError(res, err);
  }
};

// ==========================
// ✏️ Update book details
// ==========================
exports.updateBook = async (req, res) => {
  const { id } = req.params;
  const { title, author, description, price, images } = req.body;

  try {
    const updated = await BookService.updateBookWithImages(
      id,
      { title, author, description, price },
      images,
    );

    if (!updated) return notFound(res);

    successResponse(res, 200, "Book updated successfully");
  } catch (err) {
    handleError(res, err);
  }
};

// ==========================
// ➕ Add new book
// ==========================
exports.postBooks = async (req, res) => {
  if (!req.body) return errorResponse(res, 400, "Please provide a book");

  const { title, author, description, price, category, images } = req.body;

  if (!Array.isArray(images) || !images.length)
    return errorResponse(res, 400, "Please provide at least one image URL");

  try {
    const bookId = await BookService.createBookWithImages(
      { title, author, description, price, category },
      images,
    );

    successResponse(res, 201, "Book added successfully", { bookId });
  } catch (err) {
    handleError(res, err);
  }
};
