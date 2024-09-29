"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authControllers = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = require("../../utils/catchAsync");
const successRespon_1 = __importDefault(require("../../utils/successRespon"));
const config_1 = __importDefault(require("../../config"));
const auth_services_1 = require("./auth.services");
const createUser = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const data = await auth_services_1.authServices.createUser(req.body);
    (0, successRespon_1.default)(res, {
        statusCode: http_status_1.default.CREATED,
        success: true,
        message: 'User created successfully',
        data: data,
    });
});
const userLogin = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const data = await auth_services_1.authServices.userLogin(req.body);
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
exports.authControllers = {
    userLogin,
    createUser,
};
