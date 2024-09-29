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
const config_1 = __importDefault(require("../../config"));
const createUser = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const data = await user_services_1.userServices.createUser(req.body);
    (0, successRespon_1.default)(res, {
        statusCode: http_status_1.default.CREATED,
        success: true,
        message: 'User created successfully',
        data: data,
    });
});
const userLogin = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const data = await user_services_1.userServices.userLogin(req.body);
    res.cookie('refreshToken', data.refreshToken, {
        secure: config_1.default.node_env === 'production',
        httpOnly: true,
    });
    (0, successRespon_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'User logged in successfully',
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
    const data = await user_services_1.userServices.followUser(user && user._id, id);
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
    const data = await user_services_1.userServices.unFollowUser(user && user._id, id);
    (0, successRespon_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'User unfollow successfully',
        data: data,
    });
});
exports.userController = {
    createUser,
    userLogin,
    updateUser,
    deleteUser,
    followUser,
    retrievedMe,
    unFollowUser,
};
