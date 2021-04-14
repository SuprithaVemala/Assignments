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
exports.addBookToJsonFile = exports.getBooksInPriceRange = exports.getBooksByAuthorName = exports.getBooksBySimpleSearch = exports.getSpecificBook = exports.deleteSpecificBook = exports.getAllBooks = exports.updateBookById = void 0;
var bookModel_1 = require("../model/bookModel");
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
                    res.writeHead(200, { 'content-type': 'application/json' });
                    res.end(JSON.stringify(books));
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _a.sent();
                    res.writeHead(404, { 'content-type': 'application/json' });
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
        var book, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, bookSchema_1.model.findById(id)];
                case 1:
                    book = _a.sent();
                    res.writeHead(200, { 'content-type': 'application/json' });
                    res.end(JSON.stringify(book));
                    return [3 /*break*/, 3];
                case 2:
                    error_2 = _a.sent();
                    res.writeHead(404, { 'content-type': 'application/json' });
                    res.end(JSON.stringify(error_2));
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
                    res.writeHead(200, { 'content-type': 'text/plain' });
                    res.end("removed");
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
function getBooksBySimpleSearch(req, res, searchText) {
    return __awaiter(this, void 0, void 0, function () {
        var book, error_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, bookSchema_1.model.find({ $or: [{ "title": searchText }, { "author": searchText }, { "description": searchText }] })];
                case 1:
                    book = _a.sent();
                    res.writeHead(200, { 'content-type': 'application/json' });
                    res.end(JSON.stringify(book));
                    return [3 /*break*/, 3];
                case 2:
                    error_4 = _a.sent();
                    res.writeHead(404, { 'content-type': 'application/json' });
                    res.end(JSON.stringify(error_4));
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.getBooksBySimpleSearch = getBooksBySimpleSearch;
function getBooksByAuthorName(req, res, authorName) {
    return __awaiter(this, void 0, void 0, function () {
        var book, error_5;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, bookSchema_1.model.find({ "author": authorName })];
                case 1:
                    book = _a.sent();
                    res.writeHead(200, { 'content-type': 'application/json' });
                    res.end(JSON.stringify(book));
                    return [3 /*break*/, 3];
                case 2:
                    error_5 = _a.sent();
                    res.writeHead(404, { 'content-type': 'application/json' });
                    res.end(JSON.stringify(error_5));
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.getBooksByAuthorName = getBooksByAuthorName;
function getBooksInPriceRange(req, res, priceArray) {
    return __awaiter(this, void 0, void 0, function () {
        var book, error_6;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, bookSchema_1.model.find({ $and: [{ "price": { $lte: priceArray[1] } }, { "price": { $gte: priceArray[0] } }] })];
                case 1:
                    book = _a.sent();
                    res.writeHead(200, { 'content-type': 'application/json' });
                    res.end(JSON.stringify(book));
                    return [3 /*break*/, 3];
                case 2:
                    error_6 = _a.sent();
                    res.writeHead(404, { 'content-type': 'application/json' });
                    res.end(JSON.stringify(error_6));
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.getBooksInPriceRange = getBooksInPriceRange;
function addBookToJsonFile(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var bookData, _a, title, author, rating, price, pages, description, votes, newBook, addedBook, error_7;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, bookModel_1.getDataFromBody(req)];
                case 1:
                    bookData = _b.sent();
                    _a = JSON.parse(bookData), title = _a.title, author = _a.author, rating = _a.rating, price = _a.price, pages = _a.pages, description = _a.description, votes = _a.votes;
                    newBook = {
                        title: title, author: author, rating: rating, price: price, pages: pages, description: description, votes: votes
                    };
                    return [4 /*yield*/, bookSchema_1.model.create(newBook)];
                case 2:
                    addedBook = _b.sent();
                    res.writeHead(201, { 'content-type': 'application/json' });
                    res.end(JSON.stringify(addedBook));
                    return [3 /*break*/, 4];
                case 3:
                    error_7 = _b.sent();
                    console.log(error_7);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.addBookToJsonFile = addBookToJsonFile;
function updateBookById(req, res, id) {
    return __awaiter(this, void 0, void 0, function () {
        var book, bookData, _a, title, author, rating, price, pages, description, votes, modifiedBook, addedBook, error_8, error_9;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 7, , 8]);
                    return [4 /*yield*/, bookSchema_1.model.findById(id)];
                case 1:
                    book = _b.sent();
                    if (!!book) return [3 /*break*/, 2];
                    res.writeHead(404, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify('Book Not Found'));
                    return [3 /*break*/, 6];
                case 2:
                    _b.trys.push([2, 5, , 6]);
                    return [4 /*yield*/, bookModel_1.getDataFromBody(req)];
                case 3:
                    bookData = _b.sent();
                    _a = JSON.parse(bookData), title = _a.title, author = _a.author, rating = _a.rating, price = _a.price, pages = _a.pages, description = _a.description, votes = _a.votes;
                    modifiedBook = {
                        title: title || book.title,
                        author: author || book.author,
                        rating: rating || book.rating,
                        price: price || book.price,
                        pages: pages || book.pages,
                        description: description || book.description,
                        votes: votes || book.votes
                    };
                    return [4 /*yield*/, bookSchema_1.model.findByIdAndUpdate(id, modifiedBook)];
                case 4:
                    addedBook = _b.sent();
                    res.writeHead(200, { 'content-type': 'application/json' });
                    res.end(JSON.stringify(addedBook));
                    return [3 /*break*/, 6];
                case 5:
                    error_8 = _b.sent();
                    console.log(error_8);
                    return [3 /*break*/, 6];
                case 6: return [3 /*break*/, 8];
                case 7:
                    error_9 = _b.sent();
                    console.log(error_9.message);
                    return [3 /*break*/, 8];
                case 8: return [2 /*return*/];
            }
        });
    });
}
exports.updateBookById = updateBookById;
