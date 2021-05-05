"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
var express_1 = __importDefault(require("express"));
var controllers_1 = require("../controllers/controllers");
var userController_1 = require("../controllers/userController");
var router = express_1.default.Router();
exports.router = router;
router
    .route("/books")
    .get(function (req, res) {
    controllers_1.getAllBooks(req, res);
})
    .post(function (req, res) {
    controllers_1.addBookToDB(req, res);
});
router.get("/books/by/:author", function (req, res) {
    var authorName = "" + req.params.author;
    controllers_1.getBooksByAuthorName(req, res, authorName);
});
router.get("/books/priced/:min/:max", function (req, res) {
    var min = req.params.min;
    var max = req.params.max;
    controllers_1.getBooksInPriceRange(req, res, min, max);
});
router.get("/books/with-min-rating/:rating", function (req, res) {
    var rating = req.params.rating;
    controllers_1.getBookByRating(req, res, rating);
});
router.get("/books/matching", function (req, res) {
    var search = "" + req.query.q;
    controllers_1.getBooksBySimpleSearch(req, res, search);
});
router
    .route("/books/:id")
    .get(function (req, res) {
    controllers_1.getSpecificBook(req, res, req.params.id);
})
    .patch(userController_1.checkAuthoraiztion, function (req, res) {
    controllers_1.patchBookById(req, res, req.params.id);
})
    .put(userController_1.checkAuthoraiztion, function (req, res) {
    controllers_1.putBookById(req, res, req.params.id);
})
    .delete(userController_1.checkAuthoraiztion, function (req, res) {
    controllers_1.deleteSpecificBook(req, res, req.params.id);
});
router.post("/users/register", function (req, res) {
    userController_1.registerUser(req, res);
});
router.post("/users/login", function (req, res) {
    userController_1.loginUser(req, res);
});
