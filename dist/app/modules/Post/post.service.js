"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postServices = void 0;
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const post_model_1 = require("./post.model");
const mongoose_1 = require("mongoose");
const user_model_1 = require("../User/user.model");
const queryBuilder_1 = require("../../builder/queryBuilder");
const post_constants_1 = require("./post.constants");
const createPost = async (id, payload) => {
    const session = await (0, mongoose_1.startSession)();
    const isExistUser = await user_model_1.userModel.findById(id);
    if (!isExistUser) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'The user not found');
    }
    try {
        session.startTransaction();
        payload.authorId = isExistUser?._id;
        const res = await post_model_1.postModel.create([payload], { session });
        if (!res) {
            throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Post created failed!');
        }
        await user_model_1.userModel.findByIdAndUpdate(id, {
            $addToSet: { posts: res[0]?._id },
        }, { new: true, runValidators: true, session });
        if (res && payload.premium === true) {
            payload.price = 100;
            // payload.tran_id = `tsx-${res?._id}-${Date.now()}`;
        }
        await session.commitTransaction();
        await session.endSession();
        return res;
    }
    catch (error) {
        await session.abortTransaction();
        await session.endSession();
    }
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const retrieveAllPosts = async (query) => {
    const allPosts = new queryBuilder_1.QueryBuilder(post_model_1.postModel
        .find()
        .populate('authorId')
        .populate('comments')
        .populate('downVotes')
        .populate('upVotes'), query)
        .search(post_constants_1.searchableFields)
        .filter()
        .sort()
        .paginate()
        .fields();
    const data = await allPosts.modelQuery;
    const meta = await allPosts.countTotal();
    return {
        data,
        meta,
    };
};
const specificPost = async (id) => {
    const res = await post_model_1.postModel
        .findById(id)
        .populate('authorId')
        .populate('comments')
        .populate('downVotes')
        .populate('upVotes');
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
