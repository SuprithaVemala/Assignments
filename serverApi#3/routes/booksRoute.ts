import express from "express";
import {
  addBookToDB,
  deleteSpecificBook,
  getAllBooks,
  getBooksByAuthorName,
  getBooksBySimpleSearch,
  getBooksInPriceRange,
  getSpecificBook,
  updateBookById,
} from "../controllers/controllers";

let router = express.Router();

router
  .route("/books")
  .get((req, res) => {
    if (req.query.q) {
      let search = "" + req.query.q;
      getBooksBySimpleSearch(req, res, search);
    } else if (req.query.author) {
      let authorName = "" + req.query.author;
      getBooksByAuthorName(req, res, authorName);
    } else if (req.query["price"]) {
      let prices: any = req.query["price"];
      getBooksInPriceRange(req, res, prices);
    } else {
      getAllBooks(req, res);
    }
  })
  .post((req, res) => {
    addBookToDB(req, res);
  });
router
  .route("/books/:id")
  .get((req, res) => {
    getSpecificBook(req, res, req.params.id);
  })
  .put((req, res) => {
    updateBookById(req, res, req.params.id);
  })
  .delete((req, res) => {
    deleteSpecificBook(req, res, req.params.id);
  });

export { router };
