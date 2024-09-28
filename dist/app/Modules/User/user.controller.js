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
const createUser = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const user = await user_services_1.userServices.createUser(req.body);
    (0, successRespon_1.default)(res, {
        statusCode: http_status_1.default.CREATED,
        success: true,
        message: 'User created successfully',
        data: user,
    });
});
const updateUser = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const user = await user_services_1.userServices.updateUser(req.params.id, req.body);
    (0, successRespon_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'User updated successfully',
        data: user,
    });
});
const deleteUser = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const user = await user_services_1.userServices.deleteUser(req.params.id);
    (0, successRespon_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'User deleted successfully',
        data: user,
    });
});
const followUser = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const user = await user_services_1.userServices.followUser(req.params.id, req.body.followerId);
    (0, successRespon_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'User followed successfully',
        data: user,
    });
});
const unFollowUser = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const user = await user_services_1.userServices.unFollowUser(req.params.id, req.body.followerId);
    (0, successRespon_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'User unfollowed successfully',
        data: user,
    });
});
exports.userController = {
    createUser,
    updateUser,
    deleteUser,
    followUser,
    unFollowUser,
};
