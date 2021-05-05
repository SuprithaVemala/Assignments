"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var connection_1 = require("./model/connection");
var booksRoute_1 = require("./routes/booksRoute");
var app = express_1.default();
var port = 5000;
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,POST,DELETE,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept,Authorization");
    next();
});
app.use("/", booksRoute_1.router);
app.on("error", function (err) { return console.log(err); });
app.listen(port, "localhost", function () {
    console.log("server listening at http://localhost:5000");
    connection_1.run();
});
