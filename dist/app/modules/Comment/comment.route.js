"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.commentRouter = void 0;
const express_1 = __importDefault(require("express"));
const validationRequest_1 = require("../../utils/validationRequest");
const comment_validation_1 = require("./comment.validation");
const comment_controller_1 = require("./comment.controller");
const auth_1 = require("../../middleware/auth");
const user_utils_1 = require("../User/user.utils");
const route = express_1.default.Router();
route.post('/create-comment', (0, auth_1.Auth)(user_utils_1.userRoles.ADMIN, user_utils_1.userRoles.USER), (0, validationRequest_1.validationRequest)(comment_validation_1.createComment), comment_controller_1.commentController.createComment);
route.post('/:id/reply', (0, auth_1.Auth)(user_utils_1.userRoles.ADMIN, user_utils_1.userRoles.USER), (0, validationRequest_1.validationRequest)(comment_validation_1.createComment), comment_controller_1.commentController.replyComment);
route.get('/', (0, auth_1.Auth)(user_utils_1.userRoles.ADMIN, user_utils_1.userRoles.USER), comment_controller_1.commentController.retrieveComment);
route.put('/:id', (0, auth_1.Auth)(user_utils_1.userRoles.ADMIN, user_utils_1.userRoles.USER), (0, validationRequest_1.validationRequest)(comment_validation_1.updateComment), comment_controller_1.commentController.updateComment);
route.delete('/:id', (0, auth_1.Auth)(user_utils_1.userRoles.ADMIN, user_utils_1.userRoles.USER), comment_controller_1.commentController.deleteComment);
exports.commentRouter = route;
