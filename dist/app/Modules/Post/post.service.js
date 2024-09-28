"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postServices = void 0;
const post_model_1 = require("./post.model");
const createPost = async (payload) => {
    const res = await post_model_1.postModel.create(payload);
    //   if(!res) {
    //     throw new AppError(httpStatus.BAD_REQUEST, 'Post created failed!')
    //   }
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
};
