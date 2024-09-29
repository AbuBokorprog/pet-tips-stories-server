"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.commentServices = void 0;
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const comment_model_1 = require("./comment.model");
const post_model_1 = require("../Post/post.model");
const mongoose_1 = require("mongoose");
const createComment = async (userId, payload) => {
    const session = await (0, mongoose_1.startSession)();
    const isExistPost = await post_model_1.postModel.findById(payload.postId);
    if (!isExistPost) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'The post not found!');
    }
    try {
        session.startTransaction();
        const id = new mongoose_1.Types.ObjectId(userId);
        payload.authorId = id;
        const res = await comment_model_1.commentModel.create([payload], { session });
        await post_model_1.postModel.findByIdAndUpdate(payload.postId, {
            $addToSet: { comments: res[0]._id },
        });
        await session.commitTransaction();
        await session.endSession();
        return res;
    }
    catch (error) {
        await session.abortTransaction();
        await session.endSession();
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Comment created failed!');
    }
};
const replyComment = async (userId, parentCommentId, payload) => {
    const session = await (0, mongoose_1.startSession)();
    const isExistPost = await post_model_1.postModel.findById(payload.postId);
    if (!isExistPost) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'The post not found!');
    }
    const isExistParentComment = await comment_model_1.commentModel.findById(parentCommentId);
    if (!isExistParentComment) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'The comment not found!');
    }
    try {
        session.startTransaction();
        const id = new mongoose_1.Types.ObjectId(userId);
        payload.authorId = id;
        payload.parentComment = [isExistParentComment._id];
        const res = await comment_model_1.commentModel.create([payload], { session });
        await comment_model_1.commentModel.findByIdAndUpdate(parentCommentId, {
            $push: { replies: res[0]._id },
        });
        await post_model_1.postModel.findByIdAndUpdate(payload.postId, {
            $addToSet: { comments: res[0]._id },
        });
        await session.commitTransaction();
        await session.endSession();
        return res;
    }
    catch (error) {
        await session.abortTransaction();
        await session.endSession();
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Comment created failed!');
    }
};
const retrieveComments = async (postId) => {
    const res = await comment_model_1.commentModel
        .find({ postId }) // Top-level comments
        .populate({
        path: 'replies',
        populate: {
            path: 'replies', // Populate nested replies recursively
        },
    })
        .populate('authorId')
        .exec();
    if (!res) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Comments retrieved failed!');
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
    retrieveComments,
    updateComment,
    deleteComment,
    replyComment,
};
