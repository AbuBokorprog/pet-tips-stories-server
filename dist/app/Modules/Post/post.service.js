"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postServices = void 0;
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const post_model_1 = require("./post.model");
const createPost = async (payload) => {
    const res = await post_model_1.postModel.create(payload);
    if (!res) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Post created failed!');
    }
    return res;
};
const retrieveAllPosts = async () => {
    const res = await post_model_1.postModel.find();
    return res;
};
const specificPost = async (id) => {
    const res = await post_model_1.postModel.findById(id);
    return res;
};
// const votePost = async (id: string) => {};
const updatePost = async (id, payload) => {
    const res = await post_model_1.postModel.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    });
    return res;
};
const deletePost = async (id) => {
    const res = await post_model_1.postModel.findByIdAndDelete(id);
    return res;
};
exports.postServices = {
    createPost,
    retrieveAllPosts,
    updatePost,
    deletePost,
    specificPost,
    //   votePost,
};
