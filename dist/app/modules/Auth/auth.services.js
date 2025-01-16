"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authServices = void 0;
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const user_model_1 = require("../User/user.model");
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_utils_1 = require("../User/user.utils");
const config_1 = __importDefault(require("../../config"));
const imageUploader_1 = require("../../utils/imageUploader");
const createUser = async (file, payload) => {
    if (file) {
        const imagePath = file.path;
        const imageName = `${payload.username}-${Date.now()}-${Math.random().toString(10).substr(2, 9)}`;
        const response = await (0, imageUploader_1.ImageUpload)(imageName, imagePath);
        payload.profilePicture = response.secure_url || file?.path;
    }
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
exports.authServices = {
    userLogin,
    createUser,
};
