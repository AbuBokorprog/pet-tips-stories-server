"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookmarkService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const bookmark_model_1 = require("./bookmark.model");
const createBookmark = async (payload) => {
    const data = await bookmark_model_1.bookmarkModel.create(payload);
    return data;
};
const retrieveUserAllBookmark = async (id) => {
    const data = await bookmark_model_1.bookmarkModel.find({ userId: id });
    return data;
};
const updateBookmark = async (id, payload) => {
    const isExistBookmark = await bookmark_model_1.bookmarkModel.findById(id);
    if (!isExistBookmark) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Bookmark not found!');
    }
    const data = await bookmark_model_1.bookmarkModel.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    });
    return data;
};
const deleteBookmark = async (id) => {
    const isExistBookmark = await bookmark_model_1.bookmarkModel.findById(id);
    if (!isExistBookmark) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Bookmark not found!');
    }
    const data = await bookmark_model_1.bookmarkModel.findByIdAndDelete(id);
    return data;
};
exports.bookmarkService = {
    createBookmark,
    retrieveUserAllBookmark,
    updateBookmark,
    deleteBookmark,
};
