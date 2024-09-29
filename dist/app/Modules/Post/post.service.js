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
    if (res && payload.premium === true) {
        payload.price = 100;
        // payload.tran_id = `tsx-${res?._id}-${Date.now()}`;
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
const toggleUpVotes = async (postId, userId) => {
    const isExistPost = await post_model_1.postModel.findById(postId);
    if (!isExistPost) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'The post not found!');
    }
    const isAlreadyUpVoted = isExistPost.upVotes.includes(userId);
    const alreadyDownVoted = isExistPost.downVotes.includes(userId);
    try {
        if (isAlreadyUpVoted) {
            const data = await post_model_1.postModel.findByIdAndUpdate(postId, {
                $pull: { upVotes: userId },
            }, { new: true, runValidators: true });
            return data;
        }
        else if (alreadyDownVoted) {
            const data = await post_model_1.postModel.findByIdAndUpdate(postId, {
                $pull: { downVotes: userId },
                $addToSet: { upVotes: userId },
            }, { new: true, runValidators: true });
            return data;
        }
        else {
            const data = await post_model_1.postModel.findByIdAndUpdate(postId, {
                $addToSet: { upVotes: userId },
            }, { new: true, runValidators: true });
            return data;
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }
    catch (error) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, error?.message);
    }
};
const toggleDownVotes = async (postId, userId) => {
    const isExistPost = await post_model_1.postModel.findById(postId);
    if (!isExistPost) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'The post not found!');
    }
    const isAlreadyDownVoted = isExistPost.downVotes.includes(userId);
    const alreadyUpVoted = isExistPost.upVotes.includes(userId);
    try {
        if (isAlreadyDownVoted) {
            const data = await post_model_1.postModel.findByIdAndUpdate(postId, {
                $pull: { downVotes: userId },
            }, { new: true, runValidators: true });
            return data;
        }
        else if (alreadyUpVoted) {
            const data = await post_model_1.postModel.findByIdAndUpdate(postId, {
                $pull: { upVotes: userId },
                $addToSet: { downVotes: userId },
            }, { new: true, runValidators: true });
            return data;
        }
        else {
            const data = await post_model_1.postModel.findByIdAndUpdate(postId, {
                $addToSet: { downVotes: userId },
            }, { new: true, runValidators: true });
            return data;
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }
    catch (error) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, error?.message);
    }
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
    toggleUpVotes,
    toggleDownVotes,
};
