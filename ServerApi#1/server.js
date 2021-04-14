"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var http = __importStar(require("http"));
var controllers_1 = require("./controllers/controllers");
var server = http.createServer(function (req, res) {
    var _a, _b, _c, _d, _e, _f;
    if (req.url) {
        var myParams = new URLSearchParams(req.url.split('?')[1]);
        if (req.url === "/books" && req.method === "GET") {
            controllers_1.getAllBooks(req, res);
        }
        else if (req.url === "/books" && req.method === "POST") {
            controllers_1.addBookToJsonFile(req, res);
        }
        else if (((_a = req.url) === null || _a === void 0 ? void 0 : _a.match(/\/books\/[0-9]+/)) && req.method === "GET") {
            var id = (_b = req.url) === null || _b === void 0 ? void 0 : _b.split("/")[2];
            controllers_1.getSpecificBook(req, res, parseInt(id));
        }
        else if (myParams.has('q') && req.method === "GET") {
            var searchText = myParams.get("q");
            if (searchText)
                controllers_1.getBooksBySimpleSearch(req, res, searchText);
            //res.end(`simple text=${myParams.get("q")}`);
        }
        else if (myParams.has("author") && req.method === "GET") {
            var author = myParams.get("author");
            if (author)
                controllers_1.getBooksByAuthorName(req, res, author);
            //res.end(`simple text=${myParams.get("author")}`);
        }
        else if (myParams.has("price") && req.method === "GET") {
            var priceAry = myParams.getAll("price");
            if (priceAry)
                controllers_1.getBooksInPriceRange(req, res, priceAry);
            //res.end(`simple text=${myParams.getAll("price")}`);
        }
        else if (((_c = req.url) === null || _c === void 0 ? void 0 : _c.match(/\/books\/[0-9]+/)) && req.method === "PUT") {
            var id = (_d = req.url) === null || _d === void 0 ? void 0 : _d.split("/")[2];
            controllers_1.updateBookById(req, res, id);
            //res.end(`get book by id=${id}`);
        }
        else if (((_e = req.url) === null || _e === void 0 ? void 0 : _e.match(/\/books\/[0-9]+/)) && req.method === "DELETE") {
            var id = (_f = req.url) === null || _f === void 0 ? void 0 : _f.split("/")[2];
            controllers_1.deleteSpecificBook(req, res, parseInt(id));
            // res.end(`get book by id=${id}`);
        }
        else
            res.end("URL not found");
    }
});
var port = 5000;
server.on("error", function (err) { return console.log(err.message); });
server.listen(port, function () {
    return console.log("Server listening at http://localhost:" + port);
});
