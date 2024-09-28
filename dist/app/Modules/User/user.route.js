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
const route = express_1.default.Router();
route.post('/register', (0, validationRequest_1.validationRequest)(user_validation_1.createUserValidation), user_controller_1.userController.createUser);
route.put('/:id', (0, validationRequest_1.validationRequest)(user_validation_1.updateUserValidation), user_controller_1.userController.updateUser);
route.delete('/:id', user_controller_1.userController.deleteUser);
route.post('/:id/follow', user_controller_1.userController.followUser);
route.post('/:id/unfollow', user_controller_1.userController.unFollowUser);
exports.userRouter = route;
