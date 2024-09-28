"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postServices = void 0;
const post_model_1 = require("./post.model");
const createPost = async (payload) => {
    const res = await post_model_1.postModel.create(payload);
    return res;
};
exports.postServices = {
    createPost,
    updatePost,
    deletePost,
    specificPost,
};
