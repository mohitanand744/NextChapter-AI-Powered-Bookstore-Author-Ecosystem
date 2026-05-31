const express = require("express");
const router = express.Router();
const {
  getBooks,
  getBookById,
  deleteBook,
  updateBook,
  postBooks,
  getBooksSuggestionsController,
} = require("../Controllers/booksController");
const optionalVerifyToken = require("../Middleware/optionalVerifyToken");

router.get("/", optionalVerifyToken, getBooks);
router.get("/getSuggestions", getBooksSuggestionsController);
router.get("/:id", getBookById);
router.post("/", postBooks);
router.delete("/:id", deleteBook);
router.put("/:id", updateBook);

module.exports = router;
