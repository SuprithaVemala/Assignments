import express from "express";
import {
  addBookToDB,
  deleteSpecificBook,
  getAllBooks,
  getBooksByAuthorName,
  getBooksBySimpleSearch,
  getBooksInPriceRange,
  getSpecificBook,
  patchBookById,
  putBookById,
  getBookByRating,
} from "../controllers/controllers";

import {
  registerUser,
  loginUser,
  checkAuthoraiztion,
} from "../controllers/userController";
let router = express.Router();

router
  .route("/books")
  .get((req, res) => {
    getAllBooks(req, res);
  })
  .post((req, res) => {
    addBookToDB(req, res);
  });

router.get("/books/by/:author", (req, res) => {
  let authorName = "" + req.params.author;
  getBooksByAuthorName(req, res, authorName);
});
router.get("/books/priced/:min/:max", (req, res) => {
  let min = req.params.min;
  let max = req.params.max;
  getBooksInPriceRange(req, res, min, max);
});

router.get("/books/with-min-rating/:rating", (req, res) => {
  let rating = req.params.rating;
  getBookByRating(req, res, rating);
});

router.get("/books/matching", (req, res) => {
  let search = "" + req.query.q;
  getBooksBySimpleSearch(req, res, search);
});
router
  .route("/books/:id")
  .get((req, res) => {
    getSpecificBook(req, res, req.params.id);
  })
  .patch(checkAuthoraiztion, (req, res) => {
    patchBookById(req, res, req.params.id);
  })
  .put(checkAuthoraiztion, (req, res) => {
    putBookById(req, res, req.params.id);
  })
  .delete(checkAuthoraiztion, (req, res) => {
    deleteSpecificBook(req, res, req.params.id);
  });

router.post("/users/register", (req, res) => {
  registerUser(req, res);
});

router.post("/users/login", (req, res) => {
  loginUser(req, res);
});
export { router };
