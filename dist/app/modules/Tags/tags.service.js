"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tagsService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const tags_model_1 = require("./tags.model");
const mongoose_1 = require("mongoose");
const createTag = async (payload) => {
    const data = await tags_model_1.tagModel.create(payload);
    return data;
};
const retrieveAllTag = async () => {
    const data = await tags_model_1.tagModel.find();
    return data;
};
const retrieveSpecificTag = async (id) => {
    const data = await tags_model_1.tagModel.findById(id);
    return data;
};
const updateTag = async (id, payload) => {
    const isExistTag = await tags_model_1.tagModel.findById(id);
    if (!isExistTag) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Tag not found!');
    }
    const data = await tags_model_1.tagModel.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    });
    return data;
};
const deleteTag = async (id) => {
    const isExistTag = await tags_model_1.tagModel.findById(id);
    if (!isExistTag) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Tag not found!');
    }
    const data = await tags_model_1.tagModel.findByIdAndDelete(id);
    return data;
};
const followTag = async (followerId, followedId) => {
    const session = await (0, mongoose_1.startSession)();
    const isExistTag = await tags_model_1.tagModel.findById(followerId);
    const isAlreadyFollow = isExistTag?.following.includes(followedId);
    if (isAlreadyFollow) {
        throw new AppError_1.default(http_status_1.default.ALREADY_REPORTED, 'Already following!');
    }
    // !follower id is Who wants to follow, and
    // !followedId is who is being followed.
    try {
        session.startTransaction();
        // * who wants to follow.
        const data = await tags_model_1.tagModel.findByIdAndUpdate(followerId, {
            $addToSet: { following: followedId },
        }, { new: true, runValidators: true, session });
        // * who is being followed.
        await tags_model_1.tagModel.findByIdAndUpdate(followedId, {
            $addToSet: { followers: followerId },
        }, { new: true, runValidators: true, session });
        await session.commitTransaction();
        await session.endSession();
        return data;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }
    catch (error) {
        await session.abortTransaction();
        await session.endSession();
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, error.message);
    }
};
const unFollowTag = async (followerId, followedId) => {
    const session = await (0, mongoose_1.startSession)();
    const isExistTag = await tags_model_1.tagModel.findById(followerId);
    const isAlreadyFollow = isExistTag?.following.includes(followedId);
    if (!isAlreadyFollow) {
        throw new AppError_1.default(http_status_1.default.ALREADY_REPORTED, 'You are not following yet!');
    }
    // !followerId is Who wants to unfollow, and
    // !followedId is who is being unfollowed.
    try {
        session.startTransaction();
        // *followerId is Who wants to unfollow.
        const data = await tags_model_1.tagModel.findByIdAndUpdate(followerId, {
            $pull: { following: followedId },
        }, { new: true, runValidators: true, session });
        // *followedId is who is being unfollowed.
        await tags_model_1.tagModel.findByIdAndUpdate(followedId, {
            $pull: { followers: followerId },
        }, { new: true, runValidators: true, session });
        await session.commitTransaction();
        await session.endSession();
        return data;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }
    catch (error) {
        await session.abortTransaction();
        await session.endSession();
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, error.message);
    }
};
exports.tagsService = {
    createTag,
    retrieveAllTag,
    updateTag,
    deleteTag,
    retrieveSpecificTag,
    followTag,
    unFollowTag,
};
