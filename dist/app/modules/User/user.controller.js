"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = require("../../utils/catchAsync");
const successRespon_1 = __importDefault(require("../../utils/successRespon"));
const user_services_1 = require("./user.services");
const mongoose_1 = require("mongoose");
const retrievedUsers = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const data = await user_services_1.userServices.retrievedUsers(req.query);
    (0, successRespon_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'User retrieved successfully!',
        data: data,
    });
});
const retrieveSpecificUser = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const { id } = req.params;
    const data = await user_services_1.userServices.retrieveSpecificUser(id);
    (0, successRespon_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'User retrieved successfully!',
        data: data,
    });
});
const retrievedMe = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const user = req.user;
    const data = await user_services_1.userServices.retrievedMe(user && user._id);
    (0, successRespon_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'User retrieved successfully!',
        data: data,
    });
});
const updateUser = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const user = req.user;
    const data = await user_services_1.userServices.updateUser(user && user._id, req.body);
    (0, successRespon_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'User updated successfully',
        data: data,
    });
});
const updateUserRole = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const { id } = req.params;
    const data = await user_services_1.userServices.updateUserRole(id, req.body);
    (0, successRespon_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'User role updated successfully',
        data: data,
    });
});
const deleteUser = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const data = await user_services_1.userServices.deleteUser(req.params.id);
    (0, successRespon_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'User deleted successfully',
        data: data,
    });
});
const followUser = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const { id } = req.params;
    const user = req.user;
    const followedId = new mongoose_1.Types.ObjectId(id);
    const data = await user_services_1.userServices.followUser(user && user._id, followedId);
    (0, successRespon_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'User followed successfully',
        data: data,
    });
});
const unFollowUser = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const { id } = req.params;
    const user = req.user;
    const followedId = new mongoose_1.Types.ObjectId(id);
    const data = await user_services_1.userServices.unFollowUser(user && user._id, followedId);
    (0, successRespon_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'User unfollow successfully',
        data: data,
    });
});
exports.userController = {
    updateUser,
    deleteUser,
    followUser,
    retrievedMe,
    unFollowUser,
    retrievedUsers,
    retrieveSpecificUser,
    updateUserRole,
};
