"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = __importDefault(require("express"));
const user_validation_1 = require("./user.validation");
const user_controller_1 = require("./user.controller");
const validationRequest_1 = require("../../utils/validationRequest");
const auth_1 = require("../../middleware/auth");
const user_utils_1 = require("./user.utils");
const route = express_1.default.Router();
route.get('/me', (0, auth_1.Auth)(user_utils_1.userRoles.ADMIN, user_utils_1.userRoles.USER), user_controller_1.userController.retrievedMe);
route.put('/update/me', (0, auth_1.Auth)(user_utils_1.userRoles.ADMIN, user_utils_1.userRoles.USER), (0, validationRequest_1.validationRequest)(user_validation_1.updateUserValidation), user_controller_1.userController.updateUser);
route.delete('/:id', (0, auth_1.Auth)(user_utils_1.userRoles.ADMIN), user_controller_1.userController.deleteUser);
route.patch('/:id/follow', (0, auth_1.Auth)(user_utils_1.userRoles.ADMIN, user_utils_1.userRoles.USER), user_controller_1.userController.followUser);
route.patch('/:id/unfollow', (0, auth_1.Auth)(user_utils_1.userRoles.ADMIN, user_utils_1.userRoles.USER), user_controller_1.userController.unFollowUser);
exports.userRouter = route;
