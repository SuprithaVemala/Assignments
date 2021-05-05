"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.model = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var bookSchema = new mongoose_1.default.Schema({
    Title: {
        type: String
    },
    Author: {
        type: String
    },
    Price: {
        type: String
    },
    Rating: {
        type: String
    },
    Description: {
        type: String
    },
    Cover: {
        type: String
    }
});
var model = mongoose_1.default.model("books", bookSchema);
exports.model = model;
