"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBooksByTitle = exports.addBookToDB = exports.getBooksInPriceRange = exports.getBooksByAuthorName = exports.getBooksLessThanGivenRating = exports.getSpecificBook = exports.deleteSpecificBook = exports.getAllBooks = exports.updateBookById = void 0;
var bookSchema_1 = require("../model/bookSchema");
function getAllBooks(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var books, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, bookSchema_1.model.find()];
                case 1:
                    books = _a.sent();
                    res.writeHead(200, { "content-type": "application/json" });
                    res.end(JSON.stringify(books));
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _a.sent();
                    res.writeHead(404, { "content-type": "application/json" });
                    res.end(JSON.stringify(error_1));
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.getAllBooks = getAllBooks;
function getSpecificBook(req, res, id) {
    return __awaiter(this, void 0, void 0, function () {
        var book, _a, _b, error_2;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _c.trys.push([0, 2, , 3]);
                    book = [];
                    _a = book;
                    _b = 0;
                    return [4 /*yield*/, bookSchema_1.model.findById(id)];
                case 1:
                    _a[_b] = _c.sent();
                    console.log(typeof book);
                    res.send(book);
                    return [3 /*break*/, 3];
                case 2:
                    error_2 = _c.sent();
                    res.send("Book not found");
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.getSpecificBook = getSpecificBook;
//description: Delete Product
function deleteSpecificBook(req, res, id) {
    return __awaiter(this, void 0, void 0, function () {
        var book, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, bookSchema_1.model.findByIdAndDelete(id)];
                case 1:
                    book = _a.sent();
                    // await book.remove(id)
                    res.writeHead(200, { "content-type": "text/plain" });
                    if (book)
                        res.end("removed");
                    else
                        res.end("Book not found");
                    return [3 /*break*/, 3];
                case 2:
                    error_3 = _a.sent();
                    console.log(error_3);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.deleteSpecificBook = deleteSpecificBook;
function getBooksLessThanGivenRating(request, response, rating) {
    return __awaiter(this, void 0, void 0, function () {
        var books, error_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, bookSchema_1.model.find({ rating: { $lte: rating } })];
                case 1:
                    books = _a.sent();
                    response.send(books);
                    return [3 /*break*/, 3];
                case 2:
                    error_4 = _a.sent();
                    console.log(error_4.message);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.getBooksLessThanGivenRating = getBooksLessThanGivenRating;
function getBooksByAuthorName(req, res, authorName) {
    return __awaiter(this, void 0, void 0, function () {
        var book, error_5;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, bookSchema_1.model.find({ author: authorName })];
                case 1:
                    book = _a.sent();
                    res.writeHead(200, { "content-type": "application/json" });
                    res.end(JSON.stringify(book));
                    return [3 /*break*/, 3];
                case 2:
                    error_5 = _a.sent();
                    res.writeHead(404, { "content-type": "application/json" });
                    res.end(JSON.stringify(error_5));
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.getBooksByAuthorName = getBooksByAuthorName;
function getBooksByTitle(req, res, bookName) {
    return __awaiter(this, void 0, void 0, function () {
        var book, error_6;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, bookSchema_1.model.find({ title: bookName })];
                case 1:
                    book = _a.sent();
                    res.writeHead(200, { "content-type": "application/json" });
                    res.end(JSON.stringify(book));
                    return [3 /*break*/, 3];
                case 2:
                    error_6 = _a.sent();
                    res.writeHead(404, { "content-type": "application/json" });
                    res.end(JSON.stringify(error_6));
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.getBooksByTitle = getBooksByTitle;
function getBooksInPriceRange(req, res, priceArray) {
    return __awaiter(this, void 0, void 0, function () {
        var book, error_7;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, bookSchema_1.model.find({
                            $and: [
                                { price: { $lte: priceArray[1] } },
                                { price: { $gte: priceArray[0] } },
                            ],
                        })];
                case 1:
                    book = _a.sent();
                    res.writeHead(200, { "content-type": "application/json" });
                    res.end(JSON.stringify(book));
                    return [3 /*break*/, 3];
                case 2:
                    error_7 = _a.sent();
                    res.writeHead(404, { "content-type": "application/json" });
                    res.end(JSON.stringify(error_7));
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.getBooksInPriceRange = getBooksInPriceRange;
function addBookToDB(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var newBook, addedBook, error_8;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    newBook = new bookSchema_1.model();
                    newBook.title = req.body.title;
                    newBook.author = req.body.author;
                    newBook.rating = req.body.rating;
                    newBook.price = req.body.price;
                    newBook.pages = req.body.pages;
                    newBook.description = req.body.description;
                    newBook.votes = req.body.votes;
                    return [4 /*yield*/, bookSchema_1.model.create(newBook)];
                case 1:
                    addedBook = _a.sent();
                    res.writeHead(201, { "content-type": "application/json" });
                    res.end(JSON.stringify(addedBook));
                    return [3 /*break*/, 3];
                case 2:
                    error_8 = _a.sent();
                    res.send("Couldnot add book");
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.addBookToDB = addBookToDB;
function updateBookById(req, res, id) {
    return __awaiter(this, void 0, void 0, function () {
        var book, modifiedBook, addedBook, error_9, error_10;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 6, , 7]);
                    return [4 /*yield*/, bookSchema_1.model.findById(id)];
                case 1:
                    book = _a.sent();
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 4, , 5]);
                    modifiedBook = new bookSchema_1.model();
                    modifiedBook._id = book._id;
                    modifiedBook.title = req.body.title || book.title;
                    modifiedBook.author = req.body.author || book.author;
                    modifiedBook.rating = req.body.rating || book.rating;
                    modifiedBook.price = req.body.price || book.price;
                    modifiedBook.pages = req.body.pages || book.pages;
                    modifiedBook.description = req.body.description || book.description;
                    modifiedBook.votes = req.body.votes || book.votes;
                    return [4 /*yield*/, bookSchema_1.model.findByIdAndUpdate(id, modifiedBook, {
                            new: true,
                        })];
                case 3:
                    addedBook = _a.sent();
                    res.writeHead(200, { "content-type": "application/json" });
                    res.end(JSON.stringify(addedBook));
                    return [3 /*break*/, 5];
                case 4:
                    error_9 = _a.sent();
                    console.log(error_9);
                    return [3 /*break*/, 5];
                case 5: return [3 /*break*/, 7];
                case 6:
                    error_10 = _a.sent();
                    res.send("Book not found");
                    return [3 /*break*/, 7];
                case 7: return [2 /*return*/];
            }
        });
    });
}
exports.updateBookById = updateBookById;
