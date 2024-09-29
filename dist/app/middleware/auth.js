"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Auth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const catchAsync_1 = require("../utils/catchAsync");
const AppError_1 = __importDefault(require("../errors/AppError"));
const http_status_1 = __importDefault(require("http-status"));
const user_model_1 = require("../modules/User/user.model");
const config_1 = __importDefault(require("../config"));
const Auth = (...roles) => {
    return (0, catchAsync_1.catchAsync)(async (req, res, next) => {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            throw new AppError_1.default(http_status_1.default.UNAUTHORIZED, 'The user are unauthorized!');
        }
        const decode = jsonwebtoken_1.default.verify(token, config_1.default.access_secret);
        const { email, role } = decode;
        const isExistUser = await user_model_1.userModel.findOne({ email: email });
        if (!isExistUser) {
            throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'User not found!');
        }
        if (roles && !roles.includes(role)) {
            throw new AppError_1.default(http_status_1.default.UNAUTHORIZED, 'You are unauthorized user!');
        }
        req.user = decode;
        next();
    });
};
exports.Auth = Auth;
