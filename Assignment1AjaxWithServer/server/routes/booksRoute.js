"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
var express_1 = __importDefault(require("express"));
var controllers_1 = require("../controllers/controllers");
var router = express_1.default.Router();
exports.router = router;
router
    .route("/books")
    .get(function (req, res) {
    if (req.query.rating) {
        var search = "" + req.query.rating;
        controllers_1.getBooksLessThanGivenRating(req, res, search);
    }
    else if (req.query.author) {
        var authorName = "" + req.query.author;
        controllers_1.getBooksByAuthorName(req, res, authorName);
    }
    else if (req.query.title) {
        var bookName = "" + req.query.title;
        controllers_1.getBooksByTitle(req, res, bookName);
    }
    else if (req.query["price"]) {
        var prices = req.query["price"];
        controllers_1.getBooksInPriceRange(req, res, prices);
    }
    else {
        controllers_1.getAllBooks(req, res);
    }
})
    .post(function (req, res) {
    controllers_1.addBookToDB(req, res);
});
router
    .route("/books/:id")
    .get(function (req, res) {
    controllers_1.getSpecificBook(req, res, req.params.id);
})
    .put(function (req, res) {
    controllers_1.updateBookById(req, res, req.params.id);
})
    .delete(function (req, res) {
    controllers_1.deleteSpecificBook(req, res, req.params.id);
});
