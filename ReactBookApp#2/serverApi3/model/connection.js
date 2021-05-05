"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.run = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
function run() {
    return new Promise(function (resolve, reject) {
        mongoose_1.default.connect("mongodb+srv://" + process.env.user_name + ":" + process.env.pass + "@" + process.env.server + "/" + process.env.dbName + "?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: true });
        mongoose_1.default.connection.on("open", function () { return resolve("connection established"); });
        mongoose_1.default.connection.on("error", function (err) { return reject(err.message); });
    });
}
exports.run = run;
