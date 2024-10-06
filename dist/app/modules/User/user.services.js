"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userServices = void 0;
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const user_model_1 = require("./user.model");
const mongoose_1 = require("mongoose");
const queryBuilder_1 = require("../../builder/queryBuilder");
const user_constants_1 = require("./user.constants");
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const retrievedUsers = async (query) => {
    const allUsers = new queryBuilder_1.QueryBuilder(user_model_1.userModel
        .find()
        .populate('followers')
        .populate('following')
        .populate({
        path: 'posts',
        populate: {
            path: 'authorId',
        },
    }), query)
        .search(user_constants_1.userSearchableFields)
        .filter()
        .sort()
        .paginate()
        .fields();
    const data = await allUsers.modelQuery;
    const meta = await allUsers.countTotal();
    if (!data) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'The user not found!');
    }
    return {
        data,
        meta,
    };
};
const retrieveSpecificUser = async (id) => {
    const res = await user_model_1.userModel
        .findById(id)
        .populate('followers')
        .populate('following')
        .populate({
        path: 'posts',
        populate: {
            path: 'authorId',
        },
    });
    if (!res) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'The user not found!');
    }
    return res;
};
const retrievedMe = async (id) => {
    const res = await user_model_1.userModel
        .findById(id)
        .populate('followers')
        .populate('following')
        .populate({
        path: 'posts',
        populate: {
            path: 'authorId',
        },
    });
    if (!res) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'The user not found!');
    }
    return res;
};
const updateUser = async (id, payload) => {
    const user = await user_model_1.userModel.findByIdAndUpdate(id, payload, { new: true });
    return user;
};
const updateUserRole = async (id, payload) => {
    const user = await user_model_1.userModel.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    });
    return user;
};
const deleteUser = async (id) => {
    const user = await user_model_1.userModel.findByIdAndDelete(id);
    return user;
};
const followUser = async (followerId, followedId) => {
    const session = await (0, mongoose_1.startSession)();
    const isExistUser = await user_model_1.userModel.findById(followerId);
    const isAlreadyFollow = isExistUser?.following.includes(followedId);
    if (isAlreadyFollow) {
        throw new AppError_1.default(http_status_1.default.ALREADY_REPORTED, 'Already following!');
    }
    // !follower id is Who wants to follow, and
    // !followedId is who is being followed.
    try {
        session.startTransaction();
        // * who wants to follow.
        const data = await user_model_1.userModel.findByIdAndUpdate(followerId, {
            $addToSet: { following: followedId },
        }, { new: true, runValidators: true, session });
        // * who is being followed.
        await user_model_1.userModel.findByIdAndUpdate(followedId, {
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
const unFollowUser = async (followerId, followedId) => {
    const session = await (0, mongoose_1.startSession)();
    const isExistUser = await user_model_1.userModel.findById(followerId);
    const isAlreadyFollow = isExistUser?.following.includes(followedId);
    if (!isAlreadyFollow) {
        throw new AppError_1.default(http_status_1.default.ALREADY_REPORTED, 'You are not following yet!');
    }
    // !followerId is Who wants to unfollow, and
    // !followedId is who is being unfollowed.
    try {
        session.startTransaction();
        // *followerId is Who wants to unfollow.
        const data = await user_model_1.userModel.findByIdAndUpdate(followerId, {
            $pull: { following: followedId },
        }, { new: true, runValidators: true, session });
        // *followedId is who is being unfollowed.
        await user_model_1.userModel.findByIdAndUpdate(followedId, {
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
exports.userServices = {
    updateUser,
    deleteUser,
    followUser,
    retrievedMe,
    unFollowUser,
    retrievedUsers,
    retrieveSpecificUser,
    updateUserRole,
};
