"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userServices = void 0;
const user_model_1 = require("./user.model");
const createUser = async (payload) => {
    const user = await user_model_1.userModel.create(payload);
    return user;
};
const updateUser = async (id, payload) => {
    const user = await user_model_1.userModel.findByIdAndUpdate(id, payload, { new: true });
    return user;
};
const deleteUser = async (id) => {
    const user = await user_model_1.userModel.findByIdAndDelete(id);
    return user;
};
const followUser = async (userId, followerId) => {
    await user_model_1.userModel.findByIdAndUpdate(userId, {
        $addToSet: { following: followerId },
    });
    await user_model_1.userModel.findByIdAndUpdate(followerId, {
        $addToSet: { followers: userId },
    });
};
const unFollowUser = async (userId, followerId) => {
    await user_model_1.userModel.findByIdAndUpdate(userId, {
        $pull: { followers: followerId },
    });
    await user_model_1.userModel.findByIdAndUpdate(followerId, {
        $pull: { following: userId },
    });
};
exports.userServices = {
    createUser,
    updateUser,
    deleteUser,
    followUser,
    unFollowUser,
};
