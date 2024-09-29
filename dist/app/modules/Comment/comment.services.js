"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.commentServices = void 0;
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const comment_model_1 = require("./comment.model");
const createComment = async (payload) => {
    const res = await comment_model_1.commentModel.create(payload);
    if (!res) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Comment created failed!');
    }
    return res;
};
const retrieveComment = async () => {
    const res = await comment_model_1.commentModel.find();
    if (!res) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Comment retrieved failed!');
    }
    return res;
};
const updateComment = async (id, payload) => {
    const res = await comment_model_1.commentModel.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    });
    if (!res) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Comment update failed!');
    }
    return res;
};
const deleteComment = async (id) => {
    const res = await comment_model_1.commentModel.findByIdAndDelete(id);
    if (!res) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Comment delete failed!');
    }
    return res;
};
exports.commentServices = {
    createComment,
    retrieveComment,
    updateComment,
    deleteComment,
};
