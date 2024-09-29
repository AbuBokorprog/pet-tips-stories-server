"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userServices = void 0;
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const user_model_1 = require("./user.model");
const bcrypt_1 = __importDefault(require("bcrypt"));
const config_1 = __importDefault(require("../../config"));
const user_utils_1 = require("./user.utils");
const mongoose_1 = require("mongoose");
const createUser = async (payload) => {
    const user = await user_model_1.userModel.create(payload);
    return user;
};
const userLogin = async (payload) => {
    const isUserExit = await user_model_1.userModel.findOne({ email: payload.email });
    if (!isUserExit) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'The user not found!');
    }
    const isMatched = bcrypt_1.default.compare(payload.password, isUserExit.password);
    if (!isMatched) {
        throw new AppError_1.default(http_status_1.default.UNAUTHORIZED, 'Password incorrect, please try again!');
    }
    const jwtPayload = {
        email: isUserExit.email,
        role: isUserExit.role,
        _id: isUserExit?._id,
        username: isUserExit.username,
        profilePicture: isUserExit?.profilePicture,
    };
    const accessToken = (0, user_utils_1.createToken)(jwtPayload, config_1.default.access_secret, config_1.default.access_expires);
    const refreshToken = (0, user_utils_1.createToken)(jwtPayload, config_1.default.refresh_secret, config_1.default.refresh_expires);
    return {
        accessToken,
        refreshToken,
        user: isUserExit,
    };
};
const retrievedMe = async (id) => {
    const res = await user_model_1.userModel.findById(id);
    if (!res) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'The user not found!');
    }
    return res;
};
const updateUser = async (id, payload) => {
    const user = await user_model_1.userModel.findByIdAndUpdate(id, payload, { new: true });
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
    createUser,
    userLogin,
    updateUser,
    deleteUser,
    followUser,
    retrievedMe,
    unFollowUser,
};
